import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatCardModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    DatePipe,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];
  allFlights: Flight[] = [];
  displayedColumns: string[] = ['flightNumber', 'departure', 'arrival', 'departureTime', 'arrivalTime', 'seats', 'actions'];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLastMinuteFlights();
  }

  loadLastMinuteFlights() {
    this.flightService.getLastMinuteFlights().subscribe(flights => {
      this.lastMinuteFlights = flights;
    });
  }

  bookFlight(flightNumber: string) {
    this.router.navigate(['/search-flights'], { queryParams: { flight: flightNumber } });
  }
}
