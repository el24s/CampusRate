import { ApiProperty } from "@nestjs/swagger";

export class CreateRatedPlaceDto {
    @ApiProperty({
        description: "Le nom d'un endroit",
        example: "Bibliothèque principale",
        maxLength: 50
    })
    name: string;

    @ApiProperty({
        description: "La description d'un endroit",
        example: "Espace calme avec prises"
    })
    description: string;

    @ApiProperty({
        description: "La catégorie d'un endroit",
        example: "STUDY_SPACE"
    })
    category: string;

    @ApiProperty({
        description: "L'addresse d'un endroit",
        example: "Pavilllon A, local A-210"
    })
    address: string;

    @ApiProperty({
        description: "Le type de service",
        example: ["WIFI", "POWER_OUTLETS"]
    })
    services!: string[];

    @ApiProperty({
        description: "Le statut d'un endroit",
        example: "ACTIVE"
    })
    status: string;
}