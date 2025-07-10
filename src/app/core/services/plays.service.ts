import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Play } from "../../models/play.model";

@Injectable({
    providedIn: 'root'
})

export class PlaysService {
    // TODO : polish calling apiURL for different routes
    // private apiUrlForLatest = 'http://localhost:3000/api';
    private apiUrl = 'http://localhost:3000/api/plays';

    constructor(private httpClient:HttpClient) {}

    getLatestPlays(limit: number = 1): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrl + '/get-latest-plays?limit={0}'.replace('{0}', limit.toString()) )
    }

    getPlays(): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrl);
    }

    getPlay(playId: string): Observable<Play> {
        return this.httpClient.get<Play>(this.apiUrl + `/${playId}`);
    }
}