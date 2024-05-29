import { Module, forwardRef } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { DatabaseModule } from "src/database";
import { CompanyController } from "./company.controller";
import { UserModule } from "../user";
import { JobOfferModule } from "../jobOffer";

@Module({
    imports: [DatabaseModule, UserModule, forwardRef(() => JobOfferModule)],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})
export class CompanyModule { }