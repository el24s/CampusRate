import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PlaceStatus, PlacesServiceType } from "../places.enum";

export class CreatePlacesDto {
    @ApiProperty({
        description: "Le nom d'un endroit",
        example: "Bibliothèque principale",
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: "La description d'un endroit",
        example: "Espace calme avec prises"
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: "La catégorie d'un endroit",
        example: "STUDY_SPACE"
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        description: "L'addresse d'un endroit",
        example: "Pavillon A, local A-210"
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: "Le type de service",
        enum: PlacesServiceType,
        isArray: true,
        example: [PlacesServiceType.WIFI, PlacesServiceType.POWER_OUTLETS],
    })
    @IsArray()
    @IsEnum(PlacesServiceType, { each: true})
    services!: PlacesServiceType[];

    @ApiProperty({
        description: "Le statut d'un endroit",
        example: "ACTIVE"
    })
    @IsEnum(PlaceStatus)
    status: PlaceStatus;
}