import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { UserModule } from "../user";
import { JobApplyService } from "./jobApply.service";
import { JobApplyController } from "./jobApply.controller";

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [JobApplyController],
    providers: [JobApplyService],
    exports: [JobApplyService],
})
export class JobApplyModule { }