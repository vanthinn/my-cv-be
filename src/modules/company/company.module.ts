import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { DatabaseModule } from "src/database";
import { CompanyController } from "./company.controller";
import { UserModule } from "../user";

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})
export class CompanyModule { }