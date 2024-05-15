import { PartialType } from "@nestjs/swagger";
import { CreateJobApplyDto } from "./createJobApply.dto";

export class UpdateJobApply extends PartialType(CreateJobApplyDto) { }