import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createProfileCvDto {
    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    dateOfBirth: Date;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    facebook?: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    linkedin?: string;


}