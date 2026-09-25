import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProblemDetailsDto {
    @ApiProperty({ example: 'about:blank'})
    type!: string;

    @ApiProperty({ example: 'Not Found'})
    title!: string;

    @ApiProperty({ example: 404})
    status!: number;

    @ApiProperty({example: 'La ressource demandée est introuvable'})
    detail!: string;

    @ApiProperty({ example: '/api/places/123'})
    instance!:string;

    @ApiPropertyOptional({ type:[String], example: ['Le champ nom est obligatoire']})
    errors?: string[];
}