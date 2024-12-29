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
    {
      id: 2,
      name: 'New York',
      code: 'JFK',
      airportName: 'John F. Kennedy International Airport',
      airportWebsite: 'https://www.jfkairport.com',
      email: 'info@jfkairport.com',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 3,
      name: 'Tel Aviv',
      code: 'TLV',
      airportName: 'Ben Gurion Airport',
      airportWebsite: 'https://www.iaa.gov.il',
      email: 'info@iaa.gov.il',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 4,
      name: 'Paris',
      code: 'CDG',
      airportName: 'Charles de Gaulle Airport',
      airportWebsite: 'https://www.parisaeroport.fr',
      email: 'contact@parisaeroport.fr',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 5,
      name: 'Tokyo',
      code: 'HND',
      airportName: 'Haneda Airport',
      airportWebsite: 'https://www.tokyo-airport-bldg.co.jp',
      email: 'info@haneda-airport.jp',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'Dubai',
      code: 'DXB',
      airportName: 'Dubai International Airport',
      airportWebsite: 'https://www.dubaiairports.ae',
      email: 'contact@dubaiairports.ae',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 7,
      name: 'Sydney',
      code: 'SYD',
      airportName: 'Sydney Airport',
      airportWebsite: 'https://www.sydneyairport.com.au',
      email: 'info@sydneyairport.com.au',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 8,
      name: 'Rome',
      code: 'FCO',
      airportName: 'Leonardo da Vinci International Airport',
      airportWebsite: 'https://www.adr.it',
      email: 'info@adr.it',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 9,
      name: 'Singapore',
      code: 'SIN',
      airportName: 'Changi Airport',
      airportWebsite: 'https://www.changiairport.com',
      email: 'enquiry@changiairport.com',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 10,
      name: 'Amsterdam',
      code: 'AMS',
      airportName: 'Amsterdam Airport Schiphol',
      airportWebsite: 'https://www.schiphol.nl',
      email: 'info@schiphol.nl',
      imageUrl: '/api/placeholder/400/300'
    }
  ];

  getAll(): Observable<Destination[]> {
    return of(this.destinations);
  }

  getById(id: number): Observable<Destination | undefined> {
    return of(this.destinations.find(d => d.id === id));
  }
}
