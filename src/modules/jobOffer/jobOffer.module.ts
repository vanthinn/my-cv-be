import { Module, forwardRef } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { JobOfferService } from "./jobOffer.service";
import { JobOfferController } from "./jobOffer.controller";
import { UserModule } from "../user";
import { CompanyModule } from "../company";

@Module({
    imports: [DatabaseModule, UserModule, forwardRef(() => CompanyModule)],
    controllers: [JobOfferController],
    providers: [JobOfferService],
    exports: [JobOfferService],
})
export class JobOfferModule { }