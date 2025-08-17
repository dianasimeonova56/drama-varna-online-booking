export interface PopulatedBooking {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  playId: {
    _id: string;
    playName: string;
    place: string;
    imageUrl: string;
    playDate: Date;
  };
  seats: number;
  bookedAt?: Date;
}