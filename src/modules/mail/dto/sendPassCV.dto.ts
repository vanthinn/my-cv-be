import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendMailPassCVDto {
    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    applicantName: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    jobPosition: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsString()
    senderName: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    senderTitle: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    link: string;

}