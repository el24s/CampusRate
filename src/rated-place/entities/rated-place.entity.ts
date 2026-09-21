import { randomUUID } from "crypto";
 
export class RatedPlaceEntity {
    id: string;
    name: string;
    description: string;
    category: string;
    address: string;
    services?: string[];
    status?: string;
    averageRating: number | null;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;


    constructor(
    name: string,
    description: string,
    category: string,
    address: string,
    averageRating: number | null,
    reviewCount: number,
    services?: string[],
    status?: string,
    ) {

        this.id = randomUUID();
        this.name = name;
        this.description = description;
        this.category = category;
        this.address = address;

        this.services = services;
        this.status = status;

        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.createdAt = new Date();
        this.updatedAt = new Date();       
    }
}