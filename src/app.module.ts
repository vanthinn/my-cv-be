import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { RoleModule } from './modules/role';
import { CVModule } from './modules/cv';
import { CompanyModule } from './modules/company';
import { JobOfferModule } from './modules/jobOffer';
import { JobApplyModule } from './modules/jobApply';
import { CloudinaryModule } from './modules/cloudinary';
import { TenantModule } from './modules/tenant';
import { BookmarkModule } from './modules/bookmark';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    CVModule,
    CompanyModule,
    JobOfferModule,
    JobApplyModule,
    CloudinaryModule,
    TenantModule,
    CompanyModule,
    BookmarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
