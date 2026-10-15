import { Controller, Post, Body, Get, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiParam, ApiOkResponse, ApiNoContentResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from'@nestjs/swagger';
import { PlacesService } from './places.service';
import { CreatePlacesDto } from './dto/create-places.dto';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { GetPlacesQueryDto } from '../commun/dto/get-places-query.dto';
import { Place } from './schemas/places.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/role.enum';

@ApiTags('Places')
@Controller({path:'places', version: '1'})
export class PlacesController {

    constructor(
        private readonly placesService : PlacesService
    ) {}

    @ApiOperation({
        summary: 'Créer un endroit ou un service',
        description: 'Crée un endroit ou un service dans la collection courante'
    })
    @ApiCreatedResponse({
        description: 'Création d\'un endroit ou d\'un service avec succès',
        type: Place,
        headers: {
            Location: {
                description: 'URI de la nouvelle ressource',
                schema: { type: 'string' },
            },
        },
    })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Token manquant ou invalide'
    })
    @ApiForbiddenResponse({
        description: 'Rôle insuffisant ou appréciation d\'un autre utilisateur'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto : CreatePlacesDto) {
        return this.placesService.create(dto);
    }

    @ApiOperation({
        summary: 'Lister tous les endroits et les services',
        description: 'Liste les endroits et les services dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Liste des endroits et des services avec succès',
        type: [Place],
    })
    @Get()
    findAll(@Query() query : GetPlacesQueryDto) {
        return this.placesService.findAll(query);
    }

    @ApiOperation({
        summary: 'Rechercher un endroit ou un service',
        description: 'Recherche un endroit ou un service dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Recherche d\'un endroit ou d\'un service avec succès',
        type: Place,
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'Identifiant UUID de l\'endroit ou le service',
        format: 'uuid',
    })
    findById(@Param('id') id : string) {
        return this.placesService.findById(id);
    }

    @ApiOperation({
        summary: 'Modifier des éléments d\'un endroit ou d\'un service',
        description: 'Modifie des éléments d\'un endroit ou d\'un service dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Modification des éléments d\'un endroit ou d\'un service réussi',
        type: Place,
    })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Token manquant ou invalide'
    })
    @ApiForbiddenResponse({
        description: 'Rôle insuffisant ou appréciation d\'un autre utilisateur'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    @ApiParam({
        name: 'id',
        description: 'Identifiant UUID de l\'endroit ou le service',
        format: 'uuid',
    })
    update(@Param('id') id : string, @Body() updatePlacesDto: UpdatePlacesDto){
        return this.placesService.update(id, updatePlacesDto);
    }

    @ApiOperation({
        summary: 'Supprimer un endroit ou un service',
        description: 'Supprime un endroit ou un service dans la collection courante'
    })
    @ApiNoContentResponse({
        description: 'Endroit ou service supprimé avec succès',
    })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Token manquant ou invalide'
    })
    @ApiForbiddenResponse({
        description: 'Rôle insuffisant ou appréciation d\'un autre utilisateur'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Identifiant UUID de l\'endroit ou le service',
        format: 'uuid',
    })
    remove(@Param('id') id : string) {
        return this.placesService.remove(id);
    }
}