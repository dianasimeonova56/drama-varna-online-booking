import { Rating } from "./rating.model";

export interface Play {
    _id: string;
    director: Array<string>;
    playName: string;
    description: string;
    playDate: string;
    place: string;
    imageUrl: string;
    totalSeats: number;
    availableSeats: number;
    ratings: Array<Rating>;
}