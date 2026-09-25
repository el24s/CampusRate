import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt, MaxLength, Max, Min } from 'class-validator';

export class UpdateAppreciationsDto {
    @ApiProperty({
        description: "Le nom ou pseudonyme de la personne",
        example: "Samira",
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    authorName: string;
    @ApiProperty({
        description: "La valeur de l'appréciation 1 à 5",
        example: 4,
        maximum: 5,
        minimum: 1
    })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
    
    @ApiProperty({
        description: "Le commentaire de l'endroit ou le service",
        example: "Calme et Wi-Fi stable",
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    comment: string;
}