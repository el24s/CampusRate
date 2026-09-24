import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppreciationssDto } from './dto/create-Appreciations.dto';
import { PlacesService } from 'src/places/places.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AppreciationsService {

    constructor (
        private readonly placesService : PlacesService
    ) {}

    async create(placeId : string, dto :CreateAppreciationssDto) {
        const place = await this.placesService.findById(placeId);
        if(!place) {
            throw new NotFoundException(`L'endroit ou le service avec l'id ${placeId} n'existe pas`);
        } 

        const newAppreciation = {
            id: `rev_${randomUUID()}`,
            placeId: placeId,
            ...dto,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // save dans fichier JSON

        // this.placesService.update(placeId, {averageRating, reviewCount})

        return newAppreciation;
    }
}
