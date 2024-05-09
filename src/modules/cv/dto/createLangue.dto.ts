import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createLanguageDto {
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
    level: string;
}