export interface Play {
    id: string;
    playName: string;
    description: string;
    date: string;
    image: string;
    //cast - collection of actors
    director: Array<string>;
    averageRating: number; // users add rating for play; only if watched?
}