import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createCertificationDto {
    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    displayName: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    date: Date;
}