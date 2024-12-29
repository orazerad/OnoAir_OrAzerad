import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { FlightService } from '../../../services/flight.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';



@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
  imports: [
    MatCardModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    DatePipe,
    MatIcon
  ],
  standalone: true
})
export class ManageFlightsComponent implements OnInit {
  flights: Flight[] = [];
  displayedColumns: string[] = [
    'flightNumber',
    'departureCode',
    'arrivalCode',
    'departureDateTime',
    'arrivalDateTime',
    'totalSeats',
    'availableSeats',
    'actions'
  ];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAll().subscribe(flights => {
      this.flights = flights;
    });
  }

  viewFlight(flightNumber: string) {
    // Will be implemented in Part C
    console.log('Viewing flight:', flightNumber);
  }
}
