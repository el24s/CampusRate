import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from'@nestjs/swagger';
import { RatedPlaceService } from './rated-place.service';
import { RatedPlace } from './entities/rated-place.entity';

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
        type: RatedPlace
    })

    // lister?

    // findAll
}
