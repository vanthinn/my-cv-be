import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    displayName: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    logoUrl: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    fieldOfActivity: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsNotEmpty()
    @IsString()
    scale: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({
        description: 'Name of role',
        example: 'USER',
    })
    @IsOptional()
    @IsString()
    description: string;
}