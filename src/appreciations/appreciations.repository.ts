import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appreciation } from "./schemas/appreciations.schema";
import { CreateAppreciationsDto } from "./dto/create-appreciations.dto";
import { Model } from "mongoose";
import { UpdateAppreciationsDto } from "./dto/update-appreciations.dto";


@Injectable()
export class AppreciationsRepository {

    constructor(
        @InjectModel(Appreciation.name) private readonly appreciationModel : Model<Appreciation>
    ){}


    async findAll(): Promise<Appreciation[]> {
        return this.appreciationModel.find().exec();
    }

    async findById(id: string): Promise<Appreciation | null> {
        return this.appreciationModel.findById(id).exec();
    }

    async create(dto: CreateAppreciationsDto): Promise<Appreciation> {
        return this.appreciationModel.create(dto);
    }

    async update(id: string, dto: UpdateAppreciationsDto): Promise<Appreciation | null> {
        return this.appreciationModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async delete(id: string): Promise<Appreciation | null> {
        return this.appreciationModel.findByIdAndDelete(id, {  new:true }).exec();
    }
}
