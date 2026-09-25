import { ApiProperty } from "@nestjs/swagger";
import { randomBytes } from "crypto";

export class Appreciations {
    @ApiProperty({ 
        description: "Identifiant unique de l'appréciation",
        example: "rev_01JXYZ789"
    })
    id: string;

    @ApiProperty({ 
        description: "Identifiant unique de l'endroit ou le service",
        example: "plc_01JABC123"
    })
    placeId: string;

    @ApiProperty({
        description: "Le nom ou pseudonyme de la personne",
        example: "Samira",
    })
    authorName: string;

    @ApiProperty({
        description: "La valeur de l'appréciation 1 à 5",
        example: 4
    })
    rating: number;

    @ApiProperty({
        description: "Le commentaire de l'endroit ou le service",
        example: "Calme et Wi-Fi stable"
    })
    comment: string;

    @ApiProperty({ 
        description: 'La date de création',
        format: 'ISO 8601'
    })
    createdAt: Date;

    @ApiProperty({ 
        description: 'La date de la dernière modification',
        format: 'ISO 8601'
    })
    updatedAt: Date;


    constructor(
    placeId: string,
    authorName: string,
    rating: number,
    comment: string
    ) {
        this.id = randomBytes(4).toString('hex');
        this.placeId = placeId;
        this.authorName = authorName;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}