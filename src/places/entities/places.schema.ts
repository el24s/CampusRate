import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlacesCategories, PlaceStatus } from '../places.enum';
import { PlacesService } from '../places.service';

@Schema({ timestamps: true })
export class Places extends Document {
    @Prop({ required: true, unique: true})
    id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    category: PlacesCategories

    @Prop({ required: true })
    address: string

    @Prop({ required: false })
    services?: PlacesService[]

    @Prop({ required: false })
    status?: PlaceStatus

    @Prop({ required: true })
    averageRating: number | null

    @Prop({ required: true })
    reviewCount: number

    @Prop({ default: () => new Date()})
    createdAt: Date

    @Prop({ default: () => new Date()})
    updatedAt: Date
}