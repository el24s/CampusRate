import { PartialType } from "@nestjs/swagger";
import { CreateAppreciationsDto } from "./create-appreciations.dto";

export class UpdateAppreciationsDto extends PartialType(CreateAppreciationsDto){
}