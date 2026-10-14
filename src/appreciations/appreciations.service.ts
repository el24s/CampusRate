import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppreciationsDto } from './dto/create-appreciations.dto';
import { randomBytes }  from 'crypto';
import { UpdateAppreciationsDto } from './dto/update-appreciations.dto';
import { AppreciationsRepository } from './appreciations.repository';
import { PlacesRepository } from '../places/places.repository';


@Injectable()
export class AppreciationsService {

    constructor (
        private readonly placesRepo : PlacesRepository,
        private readonly appreciationsRepo : AppreciationsRepository,
    ) {}

    private async updatePlaceInfos(placeId: string) {

        const placeApp = await this.findAllByPlace(placeId);

        const reviewCount = placeApp.length;

        let averageRating = null;

        if (reviewCount > 0) {
            const sum = placeApp.reduce((acc, curr) => acc + curr.rating, 0);
            averageRating = Number((sum / reviewCount).toFixed(2));
        }

        await this.placesRepo.update(placeId, {
            reviewCount,
            averageRating,
            updatedAt: new Date()
        });
    }

    async create(placeId : string, dto :CreateAppreciationsDto) {
        const customId = randomBytes(4).toString('hex');

        const place = await this.placesRepo.findById(placeId);

        if(!place) {
            throw new NotFoundException(`L'endroit ou le service avec l'id ${placeId} n'existe pas`);
        } 

        const newAppreciation = {
            id: `rev_${customId}`,
            placeId: placeId,
            ...dto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.appreciationsRepo.create(newAppreciation);        
        await this.updatePlaceInfos(placeId);

        return newAppreciation;
    }


    async findAllByPlace(placeId : string) {
        await this.placesRepo.findById(placeId);
        
        const results = await this.appreciationsRepo.findAllbyPlace(placeId);

        return results;
    }

    async findById(id : string) {
        const appreciation = await this.appreciationsRepo.findById(id);

        if (!appreciation) {
            throw new NotFoundException(`L'appréciation avec l'id ${id} n'existe pas`)
        }

        return appreciation;
    }

    async update(id: string, dto : UpdateAppreciationsDto) {
        const appreciation = await this.findById(id);

        const updateApppreciation = {
            ...appreciation,
            ...dto,
            updatedAt: new Date()
        };

        await this.updatePlaceInfos(appreciation.placeId);

        return updateApppreciation;
    }

    async remove(id : string) {
        const appreciation = await this.findById(id);
    
        await this.appreciationsRepo.delete(id);
        await this.updatePlaceInfos(appreciation.placeId);

        return;
    }
}
