import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Play } from "../../models/play.model";

@Injectable({
    providedIn: 'root'
})

export class PlaysService {
    private apiUrl = 'http://localhost:3000/api/plays';
    private playsBehaviourSubject = new BehaviorSubject<Play[]>([]);
    private selectedPlayBehaviourSubject = new BehaviorSubject<Play | null>(null);

    public plays$ = this.playsBehaviourSubject.asObservable();
    public play$ = this.selectedPlayBehaviourSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    getLatestPlays(limit: number = 1): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrl + '/get-latest-plays?limit={0}'.replace('{0}', limit.toString()))
            .pipe(
                tap(plays => this.playsBehaviourSubject.next(plays))
            )
    }

    getPlays(): Observable<Play[]> {
        return this.httpClient.get<Play[]>(this.apiUrl)
            .pipe(
                tap(plays => this.playsBehaviourSubject.next(plays))
            );
    }

    getPlay(playId: string | null): Observable<Play> {
        return this.httpClient.get<Play>(`${this.apiUrl}/${playId}`).pipe(
            tap(play => this.selectedPlayBehaviourSubject.next(play))
        );
    }

    createPlay(body: Play): Observable<Play> {
        return this.httpClient.post<Play>(this.apiUrl + '/create-play', { playData: body })
            .pipe(
                tap(() => this.getPlays().subscribe())
            )
    }

    editPlay(playId: string, playData: Partial<Play>): Observable<Play> {
        //Partial -> makes all propertied of the Play optional; ideal for patching data for request
        return this.httpClient.put<Play>(`${this.apiUrl}/${playId}/edit`, { playData }).pipe(

            tap(updatedPlay => this.selectedPlayBehaviourSubject.next(updatedPlay))
        );
    }

    deletePlay(playId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${playId}/delete`);
    }

    addRating(playId: string, rating: number) {
        return this.httpClient.patch<{ message: string, averageRating: number }>(
            `${this.apiUrl}/${playId}/add-rating`,
            { rating },
            { withCredentials: true }
        );
    }

    getUserRating(playId: string) {
        return this.httpClient.get<{ hasRated: boolean, message: string }>
            (this.apiUrl + `/${playId}/user-rating`, { withCredentials: true })
    }
}