import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { FlightService } from '../../../services/flight.service';
import { DestinationService } from '../../../services/destination.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
  imports: [
    MatCardModule,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    MatTableModule,
    DatePipe,
    MatButton,
    MatInputModule
  ],
  standalone: true
})
export class SearchFlightsComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  destinations: any[] = [];
  displayedColumns: string[] = [
    'flightNumber',
    'departureCode',
    'arrivalCode',
    'departureDateTime',
    'arrivalDateTime',
    'availableSeats',
    'actions'
  ];

  selectedOrigin: string = '';
  selectedDestination: string = '';

  constructor(
    private flightService: FlightService,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDestinations();
    this.loadFlights();
  }

  loadDestinations() {
    this.destinationService.getAll().subscribe(destinations => {
      this.destinations = destinations;
    });
  }

  loadFlights() {
    this.flightService.getAll().subscribe(flights => {
      this.flights = flights;
      this.filteredFlights = flights;
    });
  }

  applyFilter() {
    this.filteredFlights = this.flights.filter(flight => {
      const matchOrigin = !this.selectedOrigin || flight.departureCode === this.selectedOrigin;
      const matchDestination = !this.selectedDestination || flight.arrivalCode === this.selectedDestination;
      return matchOrigin && matchDestination;
    });
  }

  bookFlight(flightNumber: string) {
    this.router.navigate(['/booking-form'], { queryParams: { flight: flightNumber } });
  }
}
