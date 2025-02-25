import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking, Passenger } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { LuggageItem, LUGGAGE_TYPES } from '../../../models/luggage.model';

@Component({
    selector: 'app-user-bookings',
    templateUrl: './user-bookings.component.html',
    standalone: true,
    styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
    bookings: Booking[] = [];
    isLoading = true;
    luggageTypes = LUGGAGE_TYPES;

    constructor(
        private router: Router,
        private bookingService: BookingService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadUserBookings();
    }

    loadUserBookings(): void {
        this.isLoading = true;
        this.bookingService.getUserBookings().subscribe(
            (bookings) => {
                this.bookings = bookings;
                this.isLoading = false;
            },
            (error) => {
                console.error('Error loading bookings:', error);
                this.snackBar.open('שגיאה בטעינת ההזמנות', 'סגור', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        );
    }

    viewBookingDetails(bookingId: string): void {
        this.router.navigate(['/user/booking', bookingId]);
    }

    editBooking(bookingId: string): void {
        this.router.navigate(['/user/booking/edit', bookingId]);
    }

    getTotalPassengers(booking: Booking): number {
        return booking.passengers ? booking.passengers.length : 0;
    }

    getTotalLuggageItems(booking: Booking): number {
        if (!booking.passengers) {
            return 0;
        }

        return booking.passengers.reduce((total, passenger) => {
            if (!passenger.luggage || !passenger.luggage.items) {
                return total;
            }

            return total + passenger.luggage.items.reduce((sum, item) => sum + item.quantity, 0);
        }, 0);
    }

    getLuggageSummary(booking: Booking): string {
        if (!booking.passengers) {
            return 'אין מטען';
        }

        const totalItems = this.getTotalLuggageItems(booking);
        if (totalItems === 0) {
            return 'אין מטען';
        }

        // Count luggage by type across all passengers
        const luggageCount: Record<string, any> = {};

        booking.passengers.forEach(passenger => {
            if (passenger.luggage && passenger.luggage.items) {
                passenger.luggage.items.forEach(item => {
                    if (!luggageCount[item.type]) {
                        luggageCount[item.type] = 0;
                    }
                    luggageCount[item.type] += item.quantity;
                });
            }
        });

        // Create summary string
        const summary = Object.keys(luggageCount).map(type => {
            const luggageType = this.luggageTypes.find(t => t.type === type);
            const label = luggageType ? luggageType.label : type;
            return `${label}: ${luggageCount[type]}`;
        }).join(', ');

        return summary;
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