import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Booking, Passenger } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { LuggageDialogComponent } from '../luggage-dialog/luggage-dialog.component';
import { LuggageService } from '../../../services/luggage.service';
import { LUGGAGE_TYPES, LuggageItem } from '../../../models/luggage.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PassengerLuggageComponent } from '../passenger-luggage/passenger-luggage.component';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        PassengerLuggageComponent
    ]
})
export class BookingDetailsComponent implements OnInit {
    booking: Booking | undefined;
    isLoading = true;
    luggageTypes = LUGGAGE_TYPES;
    selectedTabIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private bookingService: BookingService,
        private luggageService: LuggageService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const bookingId = this.route.snapshot.paramMap.get('id');

        // Check if there's a tab query parameter to select a specific tab
        this.route.queryParams.subscribe(params => {
            if (params['tab'] === 'luggage') {
                this.selectedTabIndex = 1; // Select the luggage management tab
            }
        });

        if (bookingId) {
            this.loadBookingDetails(bookingId);
        } else {
            this.router.navigate(['/user/bookings']);
        }
    }

    loadBookingDetails(bookingId: string): void {
        this.isLoading = true;
        this.bookingService.getById(bookingId).subscribe(
            (booking) => {
                if (booking) {
                    this.booking = booking;
                    this.isLoading = false;
                } else {
                    this.snackBar.open('Booking not found', 'Close', {
                        duration: 3000
                    });
                    this.router.navigate(['/user/bookings']);
                }
            },
            (error) => {
                console.error('Error loading booking details:', error);
                this.snackBar.open('Error loading booking details', 'Close', {
                    duration: 3000
                });
                this.isLoading = false;
                this.router.navigate(['/user/bookings']);
            }
        );
    }

    editPassengerLuggage(passenger: Passenger): void {
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
                this.updatePassengerLuggage(passenger, result);
            }
        });
    }

    updatePassengerLuggage(passenger: Passenger, luggageItems: LuggageItem[]): void {
        // First update the local passenger object
        passenger.luggage = this.luggageService.prepareLuggageData(
            passenger.id,
            passenger.name,
            luggageItems
        );

        // Then update the booking
        this.bookingService.updatePassengerLuggage(
            this.booking!.bookingId,
            passenger.id,
            luggageItems
        ).subscribe(
            (updatedBooking) => {
                if (updatedBooking) {
                    this.booking = updatedBooking;
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
                // Reload booking to ensure data consistency
                this.loadBookingDetails(this.booking!.bookingId);
            }
        );
    }

    goBack(): void {
        this.location.back();
    }

    editBooking(): void {
        this.router.navigate(['/user/booking/edit', this.booking!.bookingId]);
    }

    canEdit(): boolean {
        // Check if booking can be edited (e.g., not in the past, not cancelled)
        if (!this.booking) return false;



        return true;
    }

    getTotalLuggageItems(passenger: Passenger): number {
        if (!passenger.luggage || !passenger.luggage.items) {
            return 0;
        }

        return passenger.luggage.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalBookingLuggageItems(): number {
        if (!this.booking || !this.booking.passengers) {
            return 0;
        }

        return this.booking.passengers.reduce((total, passenger) => {
            return total + this.getTotalLuggageItems(passenger);
        }, 0);
    }

    getLuggageItemsDescription(passenger: Passenger): string {
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

    getLuggageCost(passenger: Passenger): number {
        if (!passenger.luggage || !passenger.luggage.items) {
            return 0;
        }

        return this.bookingService.calculateLuggageCost(passenger.luggage.items);
    }

    getTotalLuggageCost(): number {
        if (!this.booking || !this.booking.passengers) {
            return 0;
        }

        return this.booking.passengers.reduce((total, passenger) => {
            return total + this.getLuggageCost(passenger);
        }, 0);
    }
}