import { ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { randomBytes }  from 'crypto';
import { CreatePlacesDto } from './dto/create-places.dto';
import { PlacesRepository } from './places.repository';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { GetPlacesQueryDto } from '../commun/dto/get-places-query.dto';

@Injectable()
export class PlacesService {
    constructor(
        private readonly placeRepo: PlacesRepository,
    ){}


    async create(dto : CreatePlacesDto) {
        const customId = randomBytes(4).toString('hex');

        const newPlace = {
            id: `plc_${customId}`,
            ...dto,
            averageRating: null,
            reviewCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()

        };

        
        return this.placeRepo.create(newPlace);
    }

    // TODO : revisit
    async findAll(query: GetPlacesQueryDto) {
        let places = await this.placeRepo.findAll();

        if (query.category) {
            places = places.filter(p => p.category === query.category);
        }

        const page = query.page || 1;
        const limit = query.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedPlaces = places.slice(startIndex, endIndex);
        const totalItems = places.length;
        const totalPages = Math.ceil(totalItems / limit) || 1;

        return {
            "data": paginatedPlaces, 
            "pagination": { 
                "page": Number(page), 
                "limit": Number(limit), 
                "totalItems": totalItems, 
                "totalPages": totalPages, 
            }
        };

    }

    // async findById(id: string) {
    //     const data = await this.dbService.readDatabase();
    //     const place = data.places.find(p => p.id === id); 

    //     if (!place) {
    //         throw new NotFoundException(`L'endroit ou le service avec l'id ${id} n'existe pas`);
    //     }

    //     return place;
    // }

    // async update(id: string, dto : UpdatePlacesDto) {
    //     const place = await this.findById(id);

    //     const data = await this.dbService.readDatabase();

    //     const updatePlace = {
    //         ...place,
    //         ...dto,
    //         updatedAt: new Date().toISOString()
    //     };

    //     data.places = data.places.map(p => p.id === id ? updatePlace : p);

    //     await this.dbService.writeDatabase(data);

    //     return updatePlace;
    // }

    // async remove(id : string) {
    //     const data = await this.dbService.readDatabase();
    //     const hasAppreciations = data.appreciations.some(p => p.placeId === id);

    //     if (hasAppreciations) {
    //         throw new ConflictException("Impossible de supprimer cet endroit ou service, car il possède des appréciations");
    //     }
        
    //     data.places = data.places.filter(p => p.id !== id);
    //     await this.dbService.writeDatabase(data);

    //     return;
    // }
}
