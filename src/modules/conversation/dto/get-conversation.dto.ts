import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetConversationDto {
    @ApiPropertyOptional({
        description: 'Search by keyword',
        example: 'Test',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Number of records to skip and then return the remainder',
        example: 0,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    skip: number = 0;

    @ApiPropertyOptional({
        description: 'Number of records to return and then skip over the remainder',
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    take: number = 10;
}