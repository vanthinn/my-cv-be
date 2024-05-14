import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobOfferDto {
    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    experience: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    salary: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsString()
    education: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    jobType: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    deadline: Date;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsArray()
    skills?: string[];

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsString()
    status?: string;
}