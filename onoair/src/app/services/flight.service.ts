import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [
    // Your 10 flights from Part A
  ];

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