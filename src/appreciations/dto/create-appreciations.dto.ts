import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAppreciationssDto {
    @ApiProperty({
        description: "Le nom ou pseudonyme de la personne",
        example: "Samira",
        maxLength: 50
    })
    authorName: string;
    @ApiProperty({
        description: "La valeur de l'appréciation 1 à 5",
        example: 4,
        maximum: 5,
        minimum: 1
    })
    rating: number;
    
    @ApiProperty({
        description: "Le commentaire de l'endroit ou le service",
        example: "Calme et Wi-Fi stable",
        maxLength: 50
    })
    comment: string;
}