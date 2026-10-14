import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsISO8601, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Appreciation extends Document {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @Prop({ required: true, unique: true})
    id: string

    @IsString()
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    placeId: string

    @IsString()
    @IsNotEmpty()
    @Max(20)
    @Prop({ required: true })
    authorName: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    @Prop({ required: true })
    rating: number

    @IsString()
    @IsNotEmpty()
    @Max(50)
    @Prop({ required: true })
    comment: string

    @IsDate()
    @IsISO8601()
    @Prop({ default: () => new Date()})
    createdAt: Date

    @IsDate()
    @IsISO8601()
    @Prop({ default: () => new Date()})
    updatedAt: Date
}

export const AppreciationsSchema = SchemaFactory.createForClass(Appreciation);