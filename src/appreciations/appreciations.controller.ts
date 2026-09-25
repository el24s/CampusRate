import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNoContentResponse } from '@nestjs/swagger';
import { Appreciations } from './entities/appreciations.entity';
import { AppreciationsService } from './appreciations.service';
import { CreateAppreciationsDto } from './dto/create-appreciations.dto';
import { UpdateAppreciationsDto } from './dto/update-appreciations.dto';

@ApiTags('Appreciations')
@Controller({path:'places/:placeId/appreciations', version: '1'})
export class AppreciationsController {
    
    constructor(
        private readonly appreciationsService : AppreciationsService
    ) {}

    // publier Appreciations lie endroit
    @ApiOperation({
        summary: "Créer une appréciation lié à un endroit ou un service",
        description: "Crée une appréciation lié à un endroit ou un service dans la collection courante"
    })
    @ApiCreatedResponse({
        description: "Création d'une appréciation lié à un endroit ou un service avec succès",
        type: Appreciations,
        headers: {
            Location: {
                description: "URI de la nouvelle ressource",
                schema: { type: 'string' },
            },
        },
    })
    @Post()
    @ApiParam({
        name: 'placeId',
        description: "Identifiant de l'endroit ou le service évalué",
        example: 'plc_01JABC123',
    })
    create(@Param('placeId') placeId : string, @Body() dto: CreateAppreciationsDto) {
        return this.appreciationsService.create(placeId, dto);
    }

    // lister appreciaiton lie a endroit
    @ApiOperation({
        summary: "Lister tous les appréciations liés à des endroits ou des services spécifiques",
        description: "Liste les appréciations liés aux endroits et aux services spécifiques dans la collection courante"
    })
    @ApiOkResponse({
        description: "Liste d'appréciation liés à des endroits ou des services spécifiques avec succès",
        type: [Appreciations],
    })
    @Get()
    @ApiParam({
        name: 'placeId',
        description: "Identifiant de l'endroit ou le service évalué",
        example: 'plc_01JABC123',
    })
    findAll(@Param('placeId') placeId : string) {
        return this.appreciationsService.findAllByPlace(placeId);
    }

    // consulter une Appreciations
    @ApiOperation({
        summary: "Lister tous les appréciations liés à des endroits ou des services",
        description: "Liste les appréciations liés aux endroits et aux services dans la collection courante"
    })
    @ApiOkResponse({
        description: "Liste d'appréciation liés à des endroits ou des services avec succès",
        type: Appreciations,
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'appréciation",
        format: 'uuid',
    })
    findById(@Param('id') id : string) {
        return this.appreciationsService.findById(id);
    }

    // modifier partiellement une Appreciations
    @ApiOperation({
        summary: "Modifier une appréciation lié à un endroit ou un service",
        description: "Modifie l'appréciation lié à un endroit ou un service dans la collection courante"
    })
    @ApiOkResponse({
        description: "Modification d'une appréciation liés à un endroit ou un service avec succès",
        type: Appreciations,
    })
    @Patch(':id')
    update(@Param('id') id : string, @Body() updateAppreciationsDto : UpdateAppreciationsDto) {
        return this.appreciationsService.update(id, updateAppreciationsDto)
    }

    // supprimer une Appreciations
    @ApiOperation({
        summary: "Supprimer une appréciation lié à un endroit ou un service",
        description: "Supprime l'appréciation lié à un endroit ou un service dans la collection courante"
    })
    @ApiNoContentResponse({
        description: "Suppression d'une appréciation liés à un endroit ou un service avec succès",
    })
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'appréciation",
        format: 'uuid',
    }) 
    remove(@Param('id') id : string) {
        return this.appreciationsService.remove(id);
    }
}
