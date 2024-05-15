import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobApplyDto {
    @ApiProperty({
        description: 'Username of the user',
    })
    @IsString()
    @IsNotEmpty()
    jobId: string;

    @ApiProperty({
        description: 'Username of the user',
    })
    @IsOptional()
    @IsNotEmpty()
    status?: string;
}