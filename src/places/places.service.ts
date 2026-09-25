import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes }  from 'crypto';
import { CreatePlacesDto } from './dto/create-places.dto';
import { DatabaseService } from '../commun/service/database.service';
import { UpdatePlacesDto } from './dto/update-places.dto';

@Injectable()
export class PlacesService {
    constructor(
        private readonly dbService : DatabaseService,
    ){}


    async create(dto : CreatePlacesDto) {
        const customId = randomBytes(4).toString('hex');
        const data = await this.dbService.readDatabase();

        const newPlace = {
            id: `plc_${customId}`,
            ...dto,
            averageRating: null,
            reviewCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()

        };

        data.places.push(newPlace);
        await this.dbService.writeDatabase(data);

        return newPlace;
    }

    async findAll() {
        const data = await this.dbService.readDatabase();

        return data.places;

    }

    async findById(id: string) {
        const places = await this.findAll();
        const place = places.find(p => p.id === id); 

        if (!place) {
            throw new NotFoundException(`L'endroit ou le service avec l'id ${id} n'existe pas`);
        }

        return place;
    }

    async update(id: string, dto : UpdatePlacesDto) {
        const place = await this.findById(id);

        const data = await this.dbService.readDatabase();

        const updatePlace = {
            ...place,
            ...dto,
            updatedAt: new Date().toISOString()
        };

        data.places = data.places.map(p => p.id === id ? updatePlace : p);

        await this.dbService.writeDatabase(data);

        return updatePlace;
    }

    async remove(id : string) {
        const data = await this.dbService.readDatabase();
        const hasAppreciations = data.appreciations.some(p => p.placeId === id);

        if (hasAppreciations) {
            throw new ConflictException("Impossible de supprimer cet endroit ou service, car il possède des appréciations");
        }
        
        data.places = data.places.filter(p => p.id !== id);
        await this.dbService.writeDatabase(data);

        return;
    }
}
