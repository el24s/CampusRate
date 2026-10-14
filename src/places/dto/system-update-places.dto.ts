import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmpty, IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class SystemUpdatePlacesDto {
    @ApiProperty({
        description: "Le nombre total d'appréciations",
        example: 10,
        default: 0
    })
    @IsNumber()
    @IsEmpty()
    reviewCount?: number;

    @ApiProperty({
        description: "La moyenne des notes d'appréciations",
        example: 4.5,
        default: 0
    })
    @IsNumber()
    @IsEmpty()
    averageRating?: number;

    @ApiProperty({ 
        description: 'La date de la dernière modification',
        format: 'ISO 8601'
    })
    @IsDate()
    @IsISO8601()
    @IsNotEmpty()
    updatedAt: Date;
}