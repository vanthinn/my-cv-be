import { Module, forwardRef } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { UserModule } from "../user";
import { JobApplyService } from "./jobApply.service";
import { JobApplyController } from "./jobApply.controller";
import { MailModule } from "../mail/mail.module";
import { JobOfferModule } from "../jobOffer";

@Module({
    imports: [DatabaseModule, forwardRef(() => UserModule), MailModule, forwardRef(() => JobOfferModule)],
    controllers: [JobApplyController],
    providers: [JobApplyService],
    exports: [JobApplyService],
})
export class JobApplyModule { }