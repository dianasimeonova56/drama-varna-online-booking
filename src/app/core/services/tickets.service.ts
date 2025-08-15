import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Ticket } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class TicketsService {
    private apiUrl = 'http://localhost:3000/api/tickets';
    private ticketBehaviourSubject = new BehaviorSubject<Ticket[]>([]);
    private selectedTicketBehaviourSubject = new BehaviorSubject<Ticket | null>(null);

    public tickets$ = this.ticketBehaviourSubject.asObservable();
    public ticket$ = this.selectedTicketBehaviourSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    getTickets(userId: string | null): Observable<Ticket[]> {
        return this.httpClient.get<Ticket[]>(`${this.apiUrl}/${userId}`, { withCredentials: true })
            .pipe(
                tap(tickets => this.ticketBehaviourSubject.next(tickets))
            );
    }

    getTicket(ticketId: string | null): Observable<Ticket> {
        return this.httpClient.get<Ticket>(`${this.apiUrl}/${ticketId}`).pipe(
            tap(ticket => this.selectedTicketBehaviourSubject.next(ticket))
        );
    }
}