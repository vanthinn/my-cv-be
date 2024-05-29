import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database';
import { RoleModule } from '../role';
import { JobApplyModule } from '../jobApply';

@Module({
  imports: [DatabaseModule, RoleModule, forwardRef(() => JobApplyModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
