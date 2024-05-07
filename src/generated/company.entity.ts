import { ApiProperty } from '@nestjs/swagger';
import { EmployerEntity } from './employer.entity';

export class CompanyEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  displayName: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  logoUrl: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  phoneNumber: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  filedOfActivity: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  scale: number | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    required: false,
  })
  employerId: string;
  @ApiProperty({
    required: false,
  })
  employer?: EmployerEntity;
}
