import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class TenantEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  code: string;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  users?: UserEntity[];
}
