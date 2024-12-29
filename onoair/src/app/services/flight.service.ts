import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [
    {
      flightNumber: 'OA101',
      departureCode: 'TLV',
      arrivalCode: 'LHR',
      departureDateTime: '2024-12-01T10:00:00',
      arrivalDateTime: '2024-12-01T14:00:00',
      totalSeats: 180,
      availableSeats: 150
    },
    {
      flightNumber: 'OA102',
      departureCode: 'JFK',
      arrivalCode: 'CDG',
      departureDateTime: '2024-12-02T08:30:00',
      arrivalDateTime: '2024-12-02T22:00:00',
      totalSeats: 200,
      availableSeats: 180
    },
    {
      flightNumber: 'OA103',
      departureCode: 'DXB',
      arrivalCode: 'SIN',
      departureDateTime: '2024-12-03T23:00:00',
      arrivalDateTime: '2024-12-04T11:30:00',
      totalSeats: 300,
      availableSeats: 250
    },
    {
      flightNumber: 'OA104',
      departureCode: 'AMS',
      arrivalCode: 'FCO',
      departureDateTime: '2024-12-04T14:15:00',
      arrivalDateTime: '2024-12-04T16:45:00',
      totalSeats: 150,
      availableSeats: 100
    },
    {
      flightNumber: 'OA105',
      departureCode: 'HND',
      arrivalCode: 'SYD',
      departureDateTime: '2024-12-05T00:30:00',
      arrivalDateTime: '2024-12-05T11:45:00',
      totalSeats: 250,
      availableSeats: 200
    },
    {
      flightNumber: 'OA106',
      departureCode: 'LHR',
      arrivalCode: 'TLV',
      departureDateTime: '2024-12-06T15:20:00',
      arrivalDateTime: '2024-12-06T22:30:00',
      totalSeats: 180,
      availableSeats: 120
    },
    {
      flightNumber: 'OA107',
      departureCode: 'CDG',
      arrivalCode: 'DXB',
      departureDateTime: '2024-12-07T11:00:00',
      arrivalDateTime: '2024-12-07T19:15:00',
      totalSeats: 220,
      availableSeats: 190
    },
    {
      flightNumber: 'OA108',
      departureCode: 'SIN',
      arrivalCode: 'HND',
      departureDateTime: '2024-12-08T06:45:00',
      arrivalDateTime: '2024-12-08T14:30:00',
      totalSeats: 280,
      availableSeats: 230
    },
    {
      flightNumber: 'OA109',
      departureCode: 'FCO',
      arrivalCode: 'JFK',
      departureDateTime: '2024-12-09T09:20:00',
      arrivalDateTime: '2024-12-09T22:45:00',
      totalSeats: 200,
      availableSeats: 160
    },
    {
      flightNumber: 'OA110',
      departureCode: 'SYD',
      arrivalCode: 'AMS',
      departureDateTime: '2024-12-10T19:00:00',
      arrivalDateTime: '2024-12-11T06:30:00',
      totalSeats: 240,
      availableSeats: 210
    }  ];

  constructor() {}

  getAll(): Observable<Flight[]> {
    return of(this.flights);
  }

  getById(flightNumber: string): Observable<Flight | undefined> {
    return of(this.flights.find(f => f.flightNumber === flightNumber));
  }

  getLastMinuteFlights(): Observable<Flight[]> {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return of(this.flights.filter(flight => {
      const flightDate = new Date(flight.departureDateTime);
      return flightDate >= today && flightDate <= nextWeek;
    }));
  }
}
