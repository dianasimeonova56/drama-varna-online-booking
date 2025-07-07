export interface Play {
    id: string;
    name: string;
    description: string;
    date: string;
    //cast - collection of actors
    //director
    averageRating: number; // users add rating for play; only if watched?
}