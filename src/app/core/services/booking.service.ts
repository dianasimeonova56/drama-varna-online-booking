import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Booking } from "../../models/booking.model";

@Injectable({
    providedIn: 'root'
})

export class BookingService {
    private apiUrl = 'http://localhost:3000/api/bookings';
    private bookingsBehaviourSubject = new BehaviorSubject<Booking[]>([]);
    private selectedBookingBehaviourSubject = new BehaviorSubject<Booking | null>(null);

    public bookings$ = this.bookingsBehaviourSubject.asObservable();
    public booking$ = this.selectedBookingBehaviourSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    getBookings(userId: string | null): Observable<Booking[]> {
        return this.httpClient.get<Booking[]>(`${this.apiUrl}/${userId}/`)
            .pipe(
                tap(bookings => this.bookingsBehaviourSubject.next(bookings))
            );
    }

    getBooking(bookingId: string | null): Observable<Booking> {
        return this.httpClient.get<Booking>(`${this.apiUrl}/${bookingId}`).pipe(
            tap(booking => this.selectedBookingBehaviourSubject.next(booking))
        );
    }

    createBooking(body: Booking): Observable<Booking> {
        return this.httpClient.post<Booking>(this.apiUrl + '/create-booking', { bookingData: body })
            .pipe(
                tap(() => this.getBookings(body.userId).subscribe())
            )
    }

    editBooking(bookingId: string, bookingData: Partial<Booking>): Observable<Booking> {
        //Partial -> makes all propertied of the Booking optional; ideal for patching data for request
        return this.httpClient.put<Booking>(`${this.apiUrl}/${bookingId}/edit`, { bookingData }).pipe(

            tap(updatedBooking => this.selectedBookingBehaviourSubject.next(updatedBooking))
        );
    }

    deleteBooking(bookingId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${bookingId}/delete`);
    }
}