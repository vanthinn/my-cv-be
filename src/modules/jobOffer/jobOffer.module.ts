import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { JobOfferService } from "./jobOffer.service";
import { JobOfferController } from "./jobOffer.controller";
import { UserModule } from "../user";

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [JobOfferController],
    providers: [JobOfferService],
    exports: [JobOfferService],
})
export class JobOfferModule { }