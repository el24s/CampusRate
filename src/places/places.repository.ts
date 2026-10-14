import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Place } from "./schemas/places.schema";
import { CreatePlacesDto } from "./dto/create-places.dto";
import { UpdatePlacesDto } from "./dto/update-places.dto";
import { SystemUpdatePlacesDto } from "./dto/system-update-places.dto";


@Injectable()
export class PlacesRepository {
    constructor (
        @InjectModel(Place.name) private readonly placeModel: Model<Place>
    ) {}

    async findAll(): Promise<Place[]> {
        return this.placeModel.find().exec();
    }

    async findById(id: string): Promise<Place | null> {
        return this.placeModel.findById(id).exec();
    }

    async create(dto: CreatePlacesDto):Promise<Place> {
        const newPlace = new this.placeModel(dto);
        return newPlace.save();
    }

    async update(id: string, dto: UpdatePlacesDto | SystemUpdatePlacesDto): Promise<Place | null> {
        return this.placeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    
    async delete(id : string): Promise<Place | null> {
        return this.placeModel.findByIdAndDelete(id, { new: true }).exec();
    }
}