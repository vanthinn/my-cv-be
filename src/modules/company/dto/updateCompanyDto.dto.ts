import { PartialType } from "@nestjs/swagger";
import { CreateCompanyDto } from "./createCompanyDto.dto";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) { }