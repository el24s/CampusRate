import { PartialType } from "@nestjs/swagger";
import { CreatePlacesDto } from "./create-places.dto";

export class UpdatePlacesDto extends PartialType(CreatePlacesDto){
    
}