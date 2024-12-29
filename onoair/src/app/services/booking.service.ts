import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';

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
          name: 'Jane Smith',
          passportNumber: 'CD789012'
        },
        {
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
          name: 'Alice Johnson',
          passportNumber: 'EF345678'
        },
        {
          name: 'Bob Johnson',
          passportNumber: 'EF345679'
        },
        {
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
          name: 'Emma Wilson',
          passportNumber: 'IJ567890'
        },
        {
          name: 'James Wilson',
          passportNumber: 'IJ567891'
        }
      ],
      totalPassengers: 2
    }
  ];

  constructor() { }

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
