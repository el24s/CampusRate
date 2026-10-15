import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Le nom ou pseudonyme de la personne',
        example: 'Samira',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Le mot de passe',
        example: 'motDePasseSUPERCOMPLIQUE123456789-%$',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}