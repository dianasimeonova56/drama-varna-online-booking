export interface Booking {
  _id?: string;
  userId: string;
  playId: string;
  seats: number;
  bookedAt?: Date;
}