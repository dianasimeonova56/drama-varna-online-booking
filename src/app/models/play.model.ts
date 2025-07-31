import { Rating } from "./rating.model";

export interface Play {
    _id: string;
    director: Array<string>;
    playName: string;
    description: string;
    playDate: string;
    place: string;
    imageUrl: string;
    //cast - collection of actors
    ratings: Array<Rating>; // users add rating for play; only if watched?
}