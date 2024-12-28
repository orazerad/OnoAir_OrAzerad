import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private destinations = [
    {
      id: 1,
      name: 'London',
      code: 'LHR',
      airportName: 'Heathrow Airport',
      airportWebsite: 'https://www.heathrow.com',
      email: 'info@heathrow.com',
      imageUrl: '/api/placeholder/400/300'
    },
    // Add your other destinations here
  ];

  getAll(): Observable<Destination[]> {
    return of(this.destinations);
  }

  getById(id: number): Observable<Destination | undefined> {
    return of(this.destinations.find(d => d.id === id));
  }
}