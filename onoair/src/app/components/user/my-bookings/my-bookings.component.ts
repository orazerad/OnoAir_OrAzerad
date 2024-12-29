import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { FlightService } from '../../../services/flight.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  imports: [
    MatCardModule,
    MatButton,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAll().subscribe(bookings => {
      const now = new Date();

      bookings.forEach(booking => {
        this.flightService.getById(booking.flightNumber).subscribe(flight => {
          if (flight) {
            const flightDate = new Date(flight.departureDateTime);
            if (flightDate > now) {
              this.upcomingBookings.push(booking);
            } else {
              this.pastBookings.push(booking);
            }
          }
        });
      });
    });
  }

  viewFlightDetails(flightNumber: string) {
    this.router.navigate(['/flight-details', flightNumber]);
  }
}
