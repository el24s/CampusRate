import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppreciationsDto } from './dto/create-appreciations.dto';
import { UpdateAppreciationsDto } from './dto/update-appreciations.dto';
import { AppreciationsRepository } from './appreciations.repository';
import { PlacesRepository } from '../places/places.repository';
import { Role } from '../auth/enum/role.enum';


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

    async create(placeId: string, dto: CreateAppreciationsDto, userId: number) {

        const place = await this.placesRepo.findById(placeId);

        if(!place) {
            throw new NotFoundException(`L'endroit ou le service avec l'id ${placeId} n'existe pas`);
        } 

        const newAppreciation = {
            placeId: placeId,
            ...dto,
            userId,
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

    async update(id: string, dto : UpdateAppreciationsDto, user: { userId: number; role: Role}) {
        const appreciation = await this.findById(id);
        this.verifierProprietaire(appreciation, user);

        const updateApppreciation = await this.appreciationsRepo.update(id, { ...dto} );
        await this.updatePlaceInfos(appreciation.placeId);
        return updateApppreciation;
    }

    async remove(id : string, user: { userId: number; role: Role}) {
        const appreciation = await this.findById(id);
        this.verifierProprietaire(appreciation, user);
        
        await this.appreciationsRepo.delete(id);
        await this.updatePlaceInfos(appreciation.placeId);

        return;
    }

    private verifierProprietaire(appreciation: { userId: number }, user: { userId: number; role: Role }) {
        const estProprietaire = appreciation.userId === user.userId;
        const estAdmin = user.role === Role.ADMIN;

        if(!estProprietaire && !estAdmin) {
            throw new ForbiddenException('Ce n\'est pas votre appréciation');
        }
    }
}
