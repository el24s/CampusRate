import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppreciationsDto } from './dto/create-appreciations.dto';
import { PlacesService } from '../places/places.service';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../commun/service/database.service';
import { UpdateAppreciationsDto } from './dto/update-appreciations.dto';

@Injectable()
export class AppreciationsService {

    constructor (
        private readonly placesService : PlacesService,
        private readonly dbService : DatabaseService
    ) {}

    private async updatePlaceInfos(placeId: string, data : any) {
        const placeApp = data.appreciations.filter(p => p.placeId === placeId);

        const reviewCount = placeApp.length;

        let averageRating = null;

        if (reviewCount > 0) {
            const sum = placeApp.reduce((acc, curr) => acc + curr.rating, 0);
            averageRating = Number((sum / reviewCount).toFixed(2));
        }

        data.places = data.places.map(p => {
            if (p.id === placeId) {
                return {
                    ...p,
                    averageRating,
                    reviewCount,
                    updatedAt: new Date().toISOString()
                };
            }
            return p;
        });
    }

    async create(placeId : string, dto :CreateAppreciationsDto) {

        const place = await this.placesService.findById(placeId);

        const data = await this.dbService.readDatabase();

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

        data.appreciations.push(newAppreciation);
        await this.updatePlaceInfos(placeId, data);
        await this.dbService.writeDatabase(data);

        return newAppreciation;
    }


    async findAllByPlace(placeId : string) {
        await this.placesService.findById(placeId);
        const data = await this.dbService.readDatabase();
        const results = data.appreciations.filter(p => p.placeId === placeId);

        return results;
    }

    async findById(id : string) {
        const data = await this.dbService.readDatabase();
        const appreciation =data.appreciations.find(p => p.id === id);

        if (!appreciation) {
            throw new NotFoundException(`L'appréciation avec l'id ${id} n'existe pas`)
        }

        return appreciation;

    }

    async update(id: string, dto : UpdateAppreciationsDto) {
        const appreciation = await this.findById(id);
        const data = await this.dbService.readDatabase();

        const updateApppreciation = {
            ...appreciation,
            ...dto,
            updatedAt: new Date().toISOString()
        };

        data.appreciations = data.appreciations.map(p => p.id === id ? updateApppreciation : p);
        await this.updatePlaceInfos(appreciation.placeId, data);
        await this.dbService.writeDatabase(data);

        return updateApppreciation;

    }

    async remove(id : string) {
        const appreciation = await this.findById(id);
        const data = await this.dbService.readDatabase();
    
        data.appreciations = data.appreciations.filter(p => p.id !== id);
        await this.updatePlaceInfos(appreciation.placeId, data);
        await this.dbService.writeDatabase(data);

        return;
    }
}
