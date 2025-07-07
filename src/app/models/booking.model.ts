export interface Booking {
    id: string;
    ticketId : string;
    userId: string;
    bookingDate: string;
    paid: number;
    paymentMethod: string; // card or in-person
}