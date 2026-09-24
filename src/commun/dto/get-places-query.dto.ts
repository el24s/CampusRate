import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";


export class GetPlacesQueryDto {
    @ApiPropertyOptional({
        description: "Filtrer par catégorie exacte",
        example: "STUDY_SPACE",
        enum: ['STUDY_SPACE', 'LIBRARY', 'FOOD_SERVICE', 'SPORTS', 'STUDENT_SERVICE', 'COMPUTER_LAB', 'OTHER'],
    })
    @IsOptional()
    @IsString()
    @IsEnum(['STUDY_SPACE', 'LIBRARY', 'FOOD_SERVICE', 'SPORTS', 'STUDENT_SERVICE', 'COMPUTER_LAB', 'OTHER'], {
        message: "La catégorie spécifiée n'est pas valide.",
    })
    category?: string;

    @ApiPropertyOptional({
        description: "Numéro de la page demandée",
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({message: "Le paramètre page doit être un nombre entier."})
    @Min(1, {message: "La page minimale est 1."})
    page: number = 1;

    @ApiPropertyOptional({
        description: "Nombre d'éléments par page",
        example: 10,
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({message: "Le paramètre limite doit être un nombre entier"})
    @Min(1, {message: "La limite minimale est 1."})
    @Max(50, {message: "La limite maximale par page est de 50."})
    limit: number = 10;
}