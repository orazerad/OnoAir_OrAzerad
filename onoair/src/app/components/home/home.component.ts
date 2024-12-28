import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];
  allFlights: Flight[] = [];
  displayedColumns: string[] = ['flightNumber', 'departure', 'arrival', 'departureTime', 'arrivalTime', 'seats', 'actions'];

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.flightService.getAll().subscribe(flights => {
      this.allFlights = flights;
      // Filter last minute flights (this week)
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      this.lastMinuteFlights = flights.filter(flight => {
        const flightDate = new Date(flight.departureDateTime);
        return flightDate >= today && flightDate <= nextWeek;
      });
    });
  }

  bookFlight(flightNumber: string) {
    console.log('Booking flight:', flightNumber);
  }
}