import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    IsUrl,
} from 'class-validator';
import { uniq } from 'lodash';

export class CreateConversationDto {
    @ApiPropertyOptional({
        description: 'name of the conversation',
        example: '20TCLC_DT4',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    displayName?: string;

    @ApiProperty({
        description: 'An array uuid userId',
        example: [
            '0288b413-c607-43d8-a1d4-c653d2ecb768',
            '0288b413-c607-43d8-a1d4-c653d2ecb768',
        ],
    })
    @IsUUID('4', { each: true })
    @ArrayMinSize(1)
    @IsArray()
    @Transform(({ value }) => uniq(value))
    userIds: string[];

    @ApiPropertyOptional({
        description: 'Url of avatar',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    avatarUrl?: string;
}