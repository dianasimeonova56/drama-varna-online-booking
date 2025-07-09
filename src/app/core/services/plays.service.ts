import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Play } from "../../models/play.model";

@Injectable({
    providedIn: 'root'
})

export class PlaysService {
    private apiUrlForLatest = 'http://localhost:3000/api/plays/get-latest-plays?limit={0}';
    private apiUrl = 'http://localhost:3000/api/plays';

    constructor(private httpClient:HttpClient) {}

    getLatestPlays(limit: number = 1): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrlForLatest.replace('{0}', limit.toString()) )
    }

    getPlays(): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrl);
    }
}