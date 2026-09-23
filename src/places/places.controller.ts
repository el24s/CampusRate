import { Controller, Post, Body, Get, Patch, Delete, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiParam, ApiOkResponse, ApiBadRequestResponse, ApiNoContentResponse } from'@nestjs/swagger';
import { PlacesService } from './places.service';
import { Places } from './entities/places.entity';
import { CreatePlacesDto } from './dto/create-places.dto';

@ApiTags('Place')
@Controller({path:'places', version: '1'})
export class PlacesController {

    constructor(
        private readonly placesService : PlacesService
    ) {}

    // create
    @ApiOperation({
        summary: "Créer un endroit ou un service",
        description: "Crée un endroit ou un service dans la collection courante"
    })
    @ApiCreatedResponse({
        description: "Création d'un endroit ou d'un service avec succès",
        type: Places,
        headers: {
            Location: {
                description: "URI de la nouvelle ressource",
                schema: { type: 'string' },
            },
        },
    })
    // @ApiBadRequestResponse({
    //     description: 'Données invalides.',
    //     type: ProblemDetailsDto,
    // })
    @Post()
    create(@Body() dto : CreatePlacesDto) {
        return this.placesService.create(dto.name, dto.description, dto.category, dto.address, dto.services, dto.status);
    }

    // lister/findAll
    @ApiOperation({
        summary: "Lister tous les endroits et les services",
        description: "Liste les endroits et les services dans la collection courante"
    })
    @ApiOkResponse({
        description: "Liste des endroits et des services avec succès",
        type: [Places],
    })
    @Get()
    findAll() {
        return this.placesService.findAll();
    }

    // findById
    @ApiOperation({
        summary: "Rechercher un endroit ou un service",
        description: "Recherche un endroit ou un service dans la collection courante"
    })
    @ApiOkResponse({
        description: "Recherche d'un endroit ou d'un service avec succès",
        type: Places,
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'endroit ou le service",
        format: 'uuid',
    })
    findById(@Param('id') id : string) {
        return this.placesService.findById(id);
    }

    // modifier partiellemnt
    @ApiOperation({
        summary: "Modifier des éléments d'un endroit ou d'un service",
        description: "Modifie des éléments d'un endroit ou d'un service dans la collection courante"
    })
    @ApiOkResponse({
        description: "Modification des éléments d'un endroit ou d'un service réussi",
        type: Places,
    })
    @Patch(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'endroit ou le service",
        format: 'uuid',
    })
    update(@Param('id') id : string, @Body() updatePlacesDto: UpdatePlacesDto){
        return this.placesService.update(id, updatePlacesDto);
    }
    // supprimer endroit
    @ApiOperation({
        summary: "Supprimer un endroit ou un service",
        description: "Supprime un endroit ou un service dans la collection courante"
    })
    @ApiNoContentResponse({
        description: "Endroit ou service supprimé avec succès",
    })
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'endroit ou le service",
        format: 'uuid',
    })
    remove(@Param('id') id : string) {
        return this.placesService.remove(id);
    }

    // filter
    @ApiOperation({
        summary: "Modifier des éléments d'un endroit ou d'un service",
        description: "Modifie des éléments d'un endroit ou d'un service dans la collection courante"
    })
    @ApiOkResponse({
        description: "Modification des éléments d'un endroit ou d'un service réussi",
        type: Places,
    })
    @Get()
    @Query()
    filter() {
        return this.placesService.filter();
    }
}