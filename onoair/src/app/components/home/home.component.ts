import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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