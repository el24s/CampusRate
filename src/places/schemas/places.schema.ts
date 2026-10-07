import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlacesCategories, PlaceStatus, PlacesServiceType } from '../places.enum';
import { IsDate, IsEmpty, IsEnum, IsISO8601, IsMongoId, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

@Schema({ timestamps: true })
export class Place extends Document {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @Prop({ required: true, unique: true})
    id: string

    @IsString()
    @IsNotEmpty()
    @Max(30)
    @Prop({ required: true })
    name: string

    @IsString()
    @IsNotEmpty()
    @Max(50)
    @Prop({ required: true })
    description: string

    @IsEnum(PlacesCategories)
    @IsNotEmpty()
    @Prop({ required: true })
    category: PlacesCategories

    @IsString()
    @IsNotEmpty()
    @Max(30)
    @Prop({ required: true })
    address: string

    @IsEnum(PlacesServiceType)
    @IsEmpty()
    @Prop({ required: false })
    services?: PlacesServiceType[]

    @IsEnum(PlaceStatus)
    @IsEmpty()
    @Prop({ required: false })
    status?: PlaceStatus

    @IsNumber()
    @IsNotEmpty()
    @Prop({ required: true })
    averageRating: number | null

    @IsNumber()
    @IsNotEmpty()
    @Prop({ required: true })
    reviewCount: number

    @IsDate()
    @IsISO8601()
    @Prop({ default: () => new Date()})
    createdAt: Date

    @IsDate()
    @IsISO8601()
    @Prop({ default: () => new Date()})
    updatedAt: Date
}

export const PlacesSchema = SchemaFactory.createForClass(Place)