import { PartialType } from "@nestjs/swagger";
import { CreateJobOfferDto } from "./createJobOffer.dto";

export class UpdateJobOfferDto extends PartialType(CreateJobOfferDto) { }