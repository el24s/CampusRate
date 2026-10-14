import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes }  from 'crypto';
import { CreatePlacesDto } from './dto/create-places.dto';
import { PlacesRepository } from './places.repository';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { GetPlacesQueryDto } from '../commun/dto/get-places-query.dto';
import { AppreciationsRepository } from '../appreciations/appreciations.repository';

@Injectable()
export class PlacesService {
    constructor(
        private readonly placeRepo: PlacesRepository,
        private readonly appreciationRepo: AppreciationsRepository,
    ){}


    async create(dto : CreatePlacesDto) {
        const customId = randomBytes(4).toString('hex');

        const newPlace = {
            id: `plc_${customId}`,
            ...dto,
            averageRating: null,
            reviewCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()

        };
        
        return this.placeRepo.create(newPlace);
    }

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

    async findById(id: string) {
        const place = await this.placeRepo.findById(id);

        if (!place) {
            throw new NotFoundException(`L'endroit ou le service avec l'id ${id} n'existe pas`);
        }

        return place;
    }

    async update(id: string, dto : UpdatePlacesDto) {
        const place = await this.placeRepo.findById(id);

        const updatePlace = {
            ...place,
            ...dto,
            updatedAt: new Date()
        };

        await this.placeRepo.update(id, updatePlace);

        return updatePlace;
    }

    async remove(id : string) {
        await this.placeRepo.findById(id);
        const hasAppreciations = await this.appreciationRepo.findAllbyPlace(id);

        if (hasAppreciations.length > 0) {
            throw new ConflictException("Impossible de supprimer cet endroit ou service, car il possède des appréciations");
        }
        
        await this.placeRepo.delete(id);

        return;
    }
}
