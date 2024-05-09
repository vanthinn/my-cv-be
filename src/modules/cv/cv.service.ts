import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/services";
import { CreateCVDto } from "./dto/createCV.dto";
import { RequestUser } from "src/common";
import { createLanguageDto } from "./dto/createLangue.dto";
import { createCertificationDto } from "./dto/createCertification.dto";
import { createExperienceDto } from "./dto/creatExperience.dto";

@Injectable()
export class CVService {
    constructor(private dbContext: PrismaService) { }



    async createCV(user: RequestUser, data: CreateCVDto) {
        const { education, profile, languages, certifications, experiences, ...other } = data
        const cv = await this.dbContext.cV.create({
            data: { ...other, userId: user.id },
        });

        const educationCV = await this.dbContext.education.create({
            data: {
                ...education,
                CVId: cv.id,
                startDate: new Date(education.startDate).toISOString(),
                endDate: new Date(education.endDate).toISOString()
            }
        })

        const projectCV = await this.dbContext.profileCV.create({
            data: {
                ...profile,
                CVId: cv.id,
                dateOfBirth: new Date(profile.dateOfBirth).toISOString()
            }
        })

        const createManyLanguage = languages.map((language: createLanguageDto) => ({
            displayName: language.displayName,
            level: language.level,
            CVId: cv.id,
        }))

        const language = await this.dbContext.language.createMany({ data: createManyLanguage })

        const createManyCertification = certifications.map((certification: createCertificationDto) => ({
            displayName: certification.displayName,
            date: new Date(certification.date),
            CVId: cv.id,
        }))

        const certification = await this.dbContext.certification.createMany({ data: createManyCertification })

        const createManyExperience = experiences.map((experience: createExperienceDto) => ({
            position: experience.position,
            company: experience.company,
            location: experience.location,
            state: experience.state,
            startDate: new Date(experience.startDate),
            endDate: experience.state ? new Date(experience.endDate) : null,
            CVId: cv.id
        }))

        const experience = await this.dbContext.experience.createMany({ data: createManyExperience })

    }
}

