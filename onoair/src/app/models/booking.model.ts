import { PassengerLuggage } from './luggage.model';


export interface Booking {
    bookingId: string;
    flightNumber: string;
    passengers: Passenger[];
    totalPassengers: number;
}

export interface Passenger {
    id: number;
    lastName: string;
    name: string;
    passportNumber: string;
    luggage?: PassengerLuggage;
}