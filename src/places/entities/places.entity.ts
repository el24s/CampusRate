import { ApiProperty } from "@nestjs/swagger";
import { randomBytes } from "crypto";
import { PlaceStatus, PlacesCategories, PlacesServiceType } from "../places.enum";
 
export class Places {
    @ApiProperty({ 
        description: "Identifiant unique de l'endroit ou le service",
        example: "plc_01JABC123"
    })
    id: string;

    @ApiProperty({ 
        description: "Nom de l'endroit ou le service",
        example: "Bibliothèque principale"
    })
    name: string;

    @ApiProperty({ 
        description: "La description d'un endroit",
        example: "Espace calme avec prises"
    })
    description: string;

   @ApiProperty({ 
        description: "La catégorie d'un endroit",
        example: PlacesCategories.STUDY_SPACE
    })
    category: string;

    @ApiProperty({ 
        description: "L'addresse d'un endroit",
        example: "Pavillon A, local A-210"
    })
    address: string;

    @ApiProperty({ 
        description: "Le type de service",
        enum: PlacesServiceType,
        isArray: true,
        example: [PlacesServiceType.WIFI, PlacesServiceType.POWER_OUTLETS],
    })
    services?: PlacesServiceType[];

    @ApiProperty({ 
        description: "Le statut d'un endroit",
        example: "ACTIVE"
    })
    status?: PlaceStatus;

    @ApiProperty({ 
        description: 'La moyenne des notes',
        example: 4.25
    })
    averageRating: number | null;

    @ApiProperty({ 
        description: 'Le nombre de notes au total pour cet endroit',
        example: 12
    })
    reviewCount: number;

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
    name: string,
    description: string,
    category: string,
    address: string,
    averageRating: number | null,
    reviewCount: number,
    services?: PlacesServiceType[],
    status?: PlaceStatus,
    ) {

        this.id = randomBytes(4).toString('hex');
        this.name = name;
        this.description = description;
        this.category = category;
        this.address = address;

        this.services = services;
        this.status = status;

        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.createdAt = new Date();
        this.updatedAt = new Date();       
    }
}