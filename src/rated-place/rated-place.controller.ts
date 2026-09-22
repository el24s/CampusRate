import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from'@nestjs/swagger';
import { RatedPlaceService } from './rated-place.service';
import { RatedPlace } from './entities/rated-place.entity';
import { CreateRatedPlaceDto } from './dto/create-rated-place.dto';

@ApiTags('RatedPlace')
@Controller({path:'rated-place', version: '1'})
export class RatedPlaceController {

    constructor(
        private readonly ratedPlaceService : RatedPlaceService
    ) {}

    // create
    @ApiOperation({
        summary: "Créer un endroit ou un service",
        description: "Crée un endroit ou un service dans la collection courante"
    })
    @ApiCreatedResponse({
        description: "Création d'un endroit ou d'un service",
        type: RatedPlace,
        headers: {
            Location: {
                description: "URI de la nouvelle ressource",
                schema: { type: 'string' },
            },
        },
    })
    @Post()
    create(@Body() dto : CreateRatedPlaceDto) {
        return this.ratedPlaceService.create(dto.name, dto.description, dto.category, dto.address, dto.services, dto.status);
    }

    // lister?

    // findAll

    // modifier partiellemnt

    // supprimer endroit

    // publier appreciation lie endroit


    // lister appreciaiton lie a endroit

    
}
