import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/database/services";
import { CreateCVDto } from "./dto/createCV.dto";
import { RequestUser } from "src/common";
import { createLanguageDto } from "./dto/createLangue.dto";
import { createCertificationDto } from "./dto/createCertification.dto";
import { createExperienceDto } from "./dto/creatExperience.dto";
import { UpdateCVDto } from "./dto/updateCV.dto";


@Injectable()
export class CVService {
    constructor(private dbContext: PrismaService) { }

    private readonly logger: Logger = new Logger(CVService.name);

    async getCVById(user: RequestUser, id: string) {
        const cv = await this.dbContext.cV.findUnique({
            where: { id }, select: {
                id: true,
                fontSize: true,
                fontStyle: true,
                image: true,
                template: true,
                title: true,
                color: true,
                profile: true,
                education: true,
                certificates: true,
                createdAt: true,
                updatedAt: true,
                experiences: true,
                state: true,
                languages: true,
                skills: true,
                interests: true,
                summary: true,

            }
        })
        return cv
    }

    async createCV(user: RequestUser, data: CreateCVDto) {
        const { education, profile, languages, certificates, experiences, ...other } = data

        const checkCV = await this.dbContext.cV.findFirst({ where: { userId: user.id } })

        const cv = await this.dbContext.cV.create({
            data: { ...other, userId: user.id, state: checkCV ? false : true },
        });


        const educationCV = await this.dbContext.education.create({
            data: {
                ...education,
                CVId: cv.id,
                startDate: new Date(education.startDate),
                endDate: new Date(education.endDate)
            }
        })

        const projectCV = await this.dbContext.profileCV.create({
            data: {
                ...profile,
                dateOfBirth: new Date(profile.dateOfBirth),
                CVId: cv.id
            }
        })
        if (languages && languages.length > 0) {
            const createManyLanguage = languages.map((language: createLanguageDto) => ({
                displayName: language.displayName,
                level: language.level,
                CVId: cv.id,
            }))

            const language = await this.dbContext.language.createMany({ data: createManyLanguage })
        }

        if (certificates && certificates.length > 0) {
            const createManyCertification = certificates.map((certification: createCertificationDto) => ({
                displayName: certification.displayName,
                date: new Date(certification.date),
                CVId: cv.id,
            }))

            const certification = await this.dbContext.certification.createMany({ data: createManyCertification })
        }

        if (experiences && experiences.length > 0) {

            const createManyExperience = experiences.map((experience: createExperienceDto) => ({
                ...experience,
                startDate: new Date(experience.startDate),
                endDate: new Date(experience.endDate),
                CVId: cv.id
            }))

            console.log(createManyExperience)

            const experience = await this.dbContext.experience.createMany({ data: createManyExperience })
        }

        return cv

    }

    async updateCV(user: RequestUser, id: string, data: UpdateCVDto) {
        const { profile, education, experiences, languages, certificates, ...other } = data

        await this.dbContext.$transaction(async (tx) => {
            await tx.experience.deleteMany({ where: { CVId: id } })
            if (experiences && experiences.length > 0) {
                const createManyExperience = experiences.map((experience: createExperienceDto) => ({
                    ...experience,
                    startDate: new Date(experience.startDate),
                    endDate: new Date(experience.endDate),
                    CVId: id
                }))
                await tx.experience.createMany({ data: createManyExperience })
            }

            await tx.language.deleteMany({ where: { CVId: id } })
            if (languages && languages.length > 0) {
                const createManyLanguage = languages.map((language: createLanguageDto) => ({
                    displayName: language.displayName,
                    level: language.level,
                    CVId: id,
                }))
                await tx.language.createMany({ data: createManyLanguage })
            }

            await tx.certification.deleteMany({ where: { CVId: id } })
            if (certificates && certificates.length > 0) {
                const createManyCertification = certificates.map((certification: createCertificationDto) => ({
                    displayName: certification.displayName,
                    date: new Date(certification.date),
                    CVId: id,
                }))
                await tx.certification.createMany({ data: createManyCertification })
            }

            await tx.cV.update({
                where: { id },
                data: {
                    ...other,
                    profile: {
                        update: {
                            ...profile,
                            dateOfBirth: new Date(profile.dateOfBirth)
                        }
                    },
                    education: {
                        update: {
                            ...education,
                            startDate: new Date(education.startDate),
                            endDate: new Date(education.endDate)
                        }
                    }
                }
            })
        })

        this.logger.log('Update the cv records', {});
    }

    async deleteCVById(user: RequestUser, id: string) {
        const cv = await this.getCVById(user, id)
        if (cv.state) {
            throw new BadRequestException('Main CV do not deleted');
        }

        const deleteCV = await this.dbContext.cV.delete({ where: { id } })
        this.logger.log('Deleted the cv records', { deleteCV });
    }

    async patchCVById(user: RequestUser, id: string, data: UpdateCVDto) {
        const { profile, education, experiences, languages, certificates, ...other } = data

        await this.dbContext.$transaction(async (tx) => {
            if (other.state) {
                await tx.cV.updateMany({
                    where: {
                        userId: user.id,
                    },
                    data: {
                        state: false,
                    },
                });
            }
            const updateCV = await tx.cV.update({
                where: { id },
                data: { ...other },
            });
        })

    }
}

