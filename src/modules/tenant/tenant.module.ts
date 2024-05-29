import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { TenantService } from "./tenant.service";
import { TenantController } from "./tenant.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [TenantController],
    providers: [TenantService],
    exports: [TenantService],
})
export class TenantModule { }
