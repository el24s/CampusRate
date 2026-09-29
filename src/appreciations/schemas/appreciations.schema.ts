import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Appreciations extends Document {
    @Prop({ required: true, unique: true})
    id: string

    @Prop({ required: true, unique: true })
    placeId: string

    @Prop({ required: true })
    authorName: string

    @Prop({ required: true })
    rating: number

    @Prop({ required: true })
    comment: string

    @Prop({ default: () => new Date()})
    createdAt: Date

    @Prop({ default: () => new Date()})
    updatedAt: Date
}

export const AppreciationsSchema = SchemaFactory.createForClass(Appreciations);