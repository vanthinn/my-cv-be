import { EducationDto } from './../../../generated/education.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { createEducationDto } from './ceateEducation.dto';
import { type } from 'os';
import { Type } from 'class-transformer';
import { createProfileCvDto } from './createProfileCv.dto';
import { createExperienceDto } from './creatExperience.dto';
import { createLanguageDto } from './createLangue.dto';
import { createCertificationDto } from './createCertification.dto';


export class CreateCVDto {
    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    template: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    fontStyle?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    fontSize?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    skills?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    summary?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    interest?: string;


    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsBoolean()
    state: boolean;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => createEducationDto)
    education: createEducationDto

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => createProfileCvDto)
    profile: createProfileCvDto

    @IsOptional()
    @ValidateNested()
    @Type(() => Array<createExperienceDto>)
    experiences: createExperienceDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => Array<createLanguageDto>)
    languages: createLanguageDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => Array<createCertificationDto>)
    certifications: createCertificationDto[]
}