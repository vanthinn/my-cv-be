import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createExperienceDto {
    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    company: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    endDate: Date;
}