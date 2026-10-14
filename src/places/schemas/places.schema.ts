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
    @Prop({ required: true, type: String, enum: ['STUDY_SPACE','LIBRARY','FOOD_SERVICE','SPORTS','STUDENT_SERVICE','COMPUTER_LAB','OTHER']})
    category: PlacesCategories

    @IsString()
    @IsNotEmpty()
    @Max(30)
    @Prop({ required: true })
    address: string

    @IsEnum(PlacesServiceType)
    @IsEmpty()
    @Prop({ required: false, type: [String], enum: ['WIFI', 'POWER_OUTLETS', 'PRINTER', 'CAFE'] })
    services?: PlacesServiceType[]

    @IsEnum(PlaceStatus)
    @IsEmpty()
    @Prop({ required: false, type: String, enum: ['ACTIVE','INACTIVE','PENDING'] })
    status?: PlaceStatus

    @IsNumber()
    @IsEmpty()
    @Prop({ required: false, default: 0})
    averageRating: number | null

    @IsNumber()
    @IsEmpty()
    @Prop({ required: false, default: 0 })
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