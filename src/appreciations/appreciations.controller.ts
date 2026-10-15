import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNoContentResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AppreciationsService } from './appreciations.service';
import { CreateAppreciationsDto } from './dto/create-appreciations.dto';
import { UpdateAppreciationsDto } from './dto/update-appreciations.dto';
import { Appreciation } from './schemas/appreciations.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/role.enum';

@ApiTags('Appreciations')
@Controller({path:'places/:placeId/appreciations', version: '1'})
export class AppreciationsController {
    
    constructor(
        private readonly appreciationsService : AppreciationsService
    ) {}

    @ApiOperation({
        summary: 'Créer une appréciation lié à un endroit ou un service',
        description: 'Crée une appréciation lié à un endroit ou un service dans la collection courante'
    })
    @ApiCreatedResponse({
        description: 'Création d\'une appréciation lié à un endroit ou un service avec succès',
        type: Appreciation,
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
    @Roles(Role.USER, Role.ADMIN)
    @Post()
    @ApiParam({
        name: 'placeId',
        description: 'Identifiant de l\'endroit ou le service évalué',
        example: '6501b2c3d4e5f6a7b8c9d0e1',
    })
    create(@Param('placeId') placeId : string, @Body() dto: CreateAppreciationsDto, @Request() req) {
        return this.appreciationsService.create(placeId, dto, req.user.userId);
    }

    @ApiOperation({
        summary: 'Lister tous les appréciations liés à des endroits ou des services spécifiques',
        description: 'Liste les appréciations liés aux endroits et aux services spécifiques dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Liste d\'appréciation liés à des endroits ou des services spécifiques avec succès',
        type: [Appreciation],
    })
    @Get()
    @ApiParam({
        name: 'placeId',
        description: 'Identifiant de l\'endroit ou le service évalué',
        example: '6501b2c3d4e5f6a7b8c9d0e1',
    })
    findAllByPlace(@Param('placeId') placeId : string) {
        return this.appreciationsService.findAllByPlace(placeId);
    }

    @ApiOperation({
        summary: 'Lister tous les appréciations liés à des endroits ou des services',
        description: 'Liste les appréciations liés aux endroits et aux services dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Liste d\'appréciation liés à des endroits ou des services avec succès',
        type: Appreciation,
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'Identifiant UUID de l\'appréciation',
        format: 'uuid',
    })
    findById(@Param('id') id : string) {
        return this.appreciationsService.findById(id);
    }

    @ApiOperation({
        summary: 'Modifier une appréciation lié à un endroit ou un service',
        description: 'Modifie l\'appréciation lié à un endroit ou un service dans la collection courante'
    })
    @ApiOkResponse({
        description: 'Modification d\'une appréciation liés à un endroit ou un service avec succès',
        type: Appreciation,
    })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Token manquant ou invalide'
    })
    @ApiForbiddenResponse({
        description: 'Rôle insuffisant ou appréciation d\'un autre utilisateur'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER, Role.ADMIN)
    @Patch(':id')
    update(@Param('id') id : string, @Body() updateAppreciationsDto : UpdateAppreciationsDto, @Request() req) {
        return this.appreciationsService.update(id, updateAppreciationsDto, req.user);
    }

    @ApiOperation({
        summary: 'Supprimer une appréciation lié à un endroit ou un service',
        description: 'Supprime l\'appréciation lié à un endroit ou un service dans la collection courante'
    })
    @ApiNoContentResponse({
        description: 'Suppression d\'une appréciation liés à un endroit ou un service avec succès',
    })
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Identifiant UUID de l\'appréciation',
        format: 'uuid',
    }) 
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Token manquant ou invalide'
    })
    @ApiForbiddenResponse({
        description: 'Rôle insuffisant ou appréciation d\'un autre utilisateur'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER, Role.ADMIN)
    remove(@Param('id') id : string, @Request() req) {
        return this.appreciationsService.remove(id, req.user);
    }
}
