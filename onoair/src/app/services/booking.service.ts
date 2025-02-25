import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Booking} from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private bookings: Booking[] = [
        {
            bookingId: 'B1001',
            flightNumber: 'OA101',
            passengers: [
                {
                    id: 1,
                    lastName: 'Doe',
                    name: 'John Doe',
                    passportNumber: 'AB123456'
                }
            ],
            totalPassengers: 1
        },
        {
            bookingId: 'B1002',
            flightNumber: 'OA102',
            passengers: [
                {
                    id: 2,
                    lastName: 'Smith',
                    name: 'Jane Smith',
                    passportNumber: 'CD789012'
                },
                {
                    id: 3,
                    lastName: 'Smith',
                    name: 'Mike Smith',
                    passportNumber: 'CD789013'
                }
            ],
            totalPassengers: 2
        },
        {
            bookingId: 'B1003',
            flightNumber: 'OA103',
            passengers: [
                {
                    id: 4,
                    lastName: 'Johnson',
                    name: 'Alice Johnson',
                    passportNumber: 'EF345678'
                },
                {
                    id: 5,
                    lastName: 'Johnson',
                    name: 'Bob Johnson',
                    passportNumber: 'EF345679'
                },
                {
                    id: 6,
                    lastName: 'Johnson',
                    name: 'Charlie Johnson',
                    passportNumber: 'EF345680'
                }
            ],
            totalPassengers: 3
        },
        {
            bookingId: 'B1004',
            flightNumber: 'OA104',
            passengers: [
                {
                    id: 7,
                    lastName: 'Brown',
                    name: 'David Brown',
                    passportNumber: 'GH901234'
                }
            ],
            totalPassengers: 1
        },
        {
            bookingId: 'B1005',
            flightNumber: 'OA105',
            passengers: [
                {
                    id: 8,
                    lastName: 'Wilson',
                    name: 'Emma Wilson',
                    passportNumber: 'IJ567890'
                },
                {
                    id: 9,
                    lastName: 'Wilson',
                    name: 'James Wilson',
                    passportNumber: 'IJ567891'
                }
            ],
            totalPassengers: 2
        }
    ];

    constructor() {
    }

    getAll(): Observable<Booking[]> {
        return of(this.bookings);
    }

    getById(bookingId: string): Observable<Booking | undefined> {
        return of(this.bookings.find(booking => booking.bookingId === bookingId));
    }

    getByFlightNumber(flightNumber: string): Observable<Booking[]> {
        return of(this.bookings.filter(booking => booking.flightNumber === flightNumber));
    }

    create(booking: Booking): Observable<Booking> {
        this.bookings.push(booking);
        return of(booking);
    }

    update(bookingId: string, booking: Booking): Observable<Booking | undefined> {
        const index = this.bookings.findIndex(b => b.bookingId === bookingId);
        if (index !== -1) {
            this.bookings[index] = booking;
            return of(booking);
        }
        return of(undefined);
    }

    delete(bookingId: string): Observable<boolean> {
        const index = this.bookings.findIndex(b => b.bookingId === bookingId);
        if (index !== -1) {
            this.bookings.splice(index, 1);
            return of(true);
        }
        return of(false);
    }
}
