import { PartialType } from "@nestjs/swagger";
import { CreateCVDto } from "./createCV.dto";

export class UpdateCVDto extends PartialType(CreateCVDto) { }