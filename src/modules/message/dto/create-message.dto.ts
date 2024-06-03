import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({
        description: 'Content of the message',
        example: 'Hello world',
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Type of the message',
    })
    @IsString()
    type: string;
}