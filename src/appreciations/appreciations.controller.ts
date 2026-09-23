import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNoContentResponse } from '@nestjs/swagger';
import { Appreciationss } from './entities/Appreciationss.entity';
import { AppreciationssService } from './Appreciationss.service';
import { CreateAppreciationssDto } from './dto/create-Appreciationss.dto';
import { Places } from 'src/places/entities/places.entity';

@ApiTags('Appreciations')
@Controller({path:'Appreciations', version: '1'})
export class AppreciationsController {
    
    constructor(
        private readonly AppreciationssService : AppreciationssService
    ) {}

    // publier Appreciationss lie endroit
    @ApiOperation({
        summary: "Créer une appréciation lié à un endroit ou un service",
        description: "Crée une appréciation lié à un endroit ou un service dans la collection courante"
    })
    @ApiCreatedResponse({
        description: "Création d'une appréciation lié à un endroit ou un service avec succès",
        type: Appreciationss,
        headers: {
            Location: {
                description: "URI de la nouvelle ressource",
                schema: { type: 'string' },
            },
        },
    })
    @Post()
    create(@Body() dto: CreateAppreciationssDto) {
        return this.AppreciationssService.create(dto.authorName, dto.rating, dto.comment);
    }

    // lister appreciaiton lie a endroit
    @ApiOperation({
        summary: "Lister tous les appréciations liés à des endroits ou des services",
        description: "Liste les appréciations liés aux endroits et aux services dans la collection courante"
    })
    @ApiOkResponse({
        description: "Liste d'appréciation liés à des endroits ou des services avec succès",
        type: [Places],
    })
    @Get()
    findAll() {
        return this.AppreciationssService.findAll();
    }

    // consulter une Appreciationss
    @ApiOperation({
        summary: "Lister tous les appréciations liés à des endroits ou des services",
        description: "Liste les appréciations liés aux endroits et aux services dans la collection courante"
    })
    @ApiOkResponse({
        description: "Liste d'appréciation liés à des endroits ou des services avec succès",
        type: Places,
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: "Identifiant UUID de l'appréciation",
        format: 'uuid',
    })
    findById(@Param('id') id : string) {
        return this.AppreciationssService.findById(id);
    }

    // modifier partiellement une Appreciationss
    @ApiOperation({
        summary: "Modifier une appréciation lié à un endroit ou un service",
        description: "Modifie l'appréciation lié à un endroit ou un service dans la collection courante"
    })
    @ApiOkResponse({
        description: "Modification d'une appréciation liés à un endroit ou un service avec succès",
        type: Places,
    })
    @Patch(':id')
    update(@Param('id') id : string, @Body() updateAppreciationssDto : UpdateAppreciationssDto) {
        return this.AppreciationssService.update(id, updateAppreciationssDto)
    }

    // supprimer une Appreciationss
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
        return this.AppreciationssService.remove(id);
    }
}
