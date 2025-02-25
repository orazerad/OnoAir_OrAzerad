import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking, Passenger } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { LuggageDialogComponent } from '../luggage-dialog/luggage-dialog.component';
import { LuggageService } from '../../../services/luggage.service';
import { LUGGAGE_TYPES, LuggageItem } from '../../../models/luggage.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];
  isLoading = true;
  luggageTypes = LUGGAGE_TYPES;

  constructor(
      private router: Router,
      private bookingService: BookingService,
      private luggageService: LuggageService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getAll().subscribe(
        (bookings) => {
          const currentDate = new Date();

          // Filter bookings into upcoming and past based on departure date


          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading bookings:', error);
          this.snackBar.open('Error loading bookings', 'Close', {
            duration: 3000
          });
          this.isLoading = false;
        }
    );
  }

  editPassengerLuggage(bookingId: string, passenger: Passenger): void {
    const dialogRef = this.dialog.open(LuggageDialogComponent, {
      width: '600px',
      data: {
        passenger: passenger,
        luggageItems: passenger.luggage?.items || []
      },
      direction: 'rtl'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePassengerLuggage(bookingId, passenger, result);
      }
    });
  }

  updatePassengerLuggage(bookingId: string, passenger: Passenger, luggageItems: LuggageItem[]): void {
    // First update the local passenger object
    passenger.luggage = this.luggageService.prepareLuggageData(
        passenger.id,
        passenger.name,
        luggageItems
    );

    // Then update the booking
    this.bookingService.updatePassengerLuggage(
        bookingId,
        passenger.id,
        luggageItems
    ).subscribe(
        (updatedBooking) => {
          if (updatedBooking) {
            // Refresh the booking lists
            this.loadBookings();

            this.snackBar.open('Luggage updated successfully', 'Close', {
              duration: 3000
            });
          }
        },
        (error) => {
          console.error('Error updating luggage:', error);
          this.snackBar.open('Error updating luggage', 'Close', {
            duration: 3000
          });
        }
    );
  }

  manageLuggage(booking: Booking): void {
    // Navigate to booking details page with luggage management tab active
    this.router.navigate(['/user/booking', booking.bookingId], { queryParams: { tab: 'luggage' } });
  }

  getTotalLuggageItems(passenger: Passenger): number {
    if (!passenger.luggage || !passenger.luggage.items) {
      return 0;
    }

    return passenger.luggage.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalBookingLuggageItems(booking: Booking): number {
    if (!booking.passengers) {
      return 0;
    }

    return booking.passengers.reduce((total, passenger) => {
      return total + this.getTotalLuggageItems(passenger);
    }, 0);
  }

  getLuggageSummary(passenger: Passenger): string {
    if (!passenger.luggage || !passenger.luggage.items || passenger.luggage.items.length === 0) {
      return 'No luggage';
    }

    const descriptions: string[] = [];

    passenger.luggage.items.forEach(item => {
      const luggageType = this.luggageTypes.find(type => type.type === item.type);
      if (luggageType && item.quantity > 0) {
        descriptions.push(`${luggageType.label}: ${item.quantity}`);
      }
    });

    return descriptions.join(', ');
  }

  getLuggageCost(booking: Booking): number {
    if (!booking.passengers) {
      return 0;
    }

    return booking.passengers.reduce((total, passenger) => {
      if (!passenger.luggage || !passenger.luggage.items) {
        return total;
      }

      return total + this.bookingService.calculateLuggageCost(passenger.luggage.items);
    }, 0);
  }
}