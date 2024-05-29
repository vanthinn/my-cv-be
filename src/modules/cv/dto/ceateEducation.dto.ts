import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsGPA(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isGPA',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === null || value === undefined) return true;
                    return typeof value === 'number' && value >= 0 && value <= 4 && /^\d+(\.\d{1,2})?$/.test(value.toString());
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a number between 0 and 4 with up to two decimal places`;
                }
            },
        });
    };
}

export class createEducationDto {
    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    schoolName: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    fieldOfStudy: string;

    @ApiProperty({
        description: 'GPA of the user',
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    @IsGPA()
    GPA?: number;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'username of the user',
    })
    @IsString()
    @IsNotEmpty()
    endDate: Date;
}