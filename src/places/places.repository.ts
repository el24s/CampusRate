import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Place } from "./schemas/places.schema";
import { CreatePlacesDto } from "./dto/create-places.dto";


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
        return this.placeModel.create(dto);
    }

    async update(id: string, dto: CreatePlacesDto): Promise<Place | null> {
        return this.placeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    
    async delete(id : string): Promise<Place | null> {
        return this.placeModel.findByIdAndDelete(id, { new: true }).exec();
    }
}