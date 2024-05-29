import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class updateStatusDto {
    @ApiPropertyOptional({
        description: 'id jobApply',
    })
    @IsString()
    id: string;

    @ApiPropertyOptional({
        description: 'id jobApply',
    })
    @IsString()
    status: string;
}