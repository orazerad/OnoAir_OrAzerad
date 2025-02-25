import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Booking, Passenger } from '../models/booking.model';
import { LuggageItem, PassengerLuggage, LUGGAGE_TYPES } from '../models/luggage.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private bookings: Booking[] = [
        {
            bookingId: 'B1001',
            flightNumber: 'OA101',
            passengers: [
                {
                    id: 1,
                    name: 'John',
                    lastName: 'Doe',
                    passportNumber: 'AB123456',
                    luggage: {
                        passengerId: 1,
                        passengerName: 'John Doe',
                        items: [
                            {
                                type: 'personal_item',
                                weight: 5,
                                quantity: 1,
                                maxAllowed: 1
                            },
                            {
                                type: 'cabin_baggage',
                                weight: 10,
                                quantity: 1,
                                maxAllowed: 2
                            }
                        ]
                    }
                }
            ],
            totalPassengers: 1
        },
        {
            bookingId: 'B1002',
            flightNumber: 'OA102',
            passengers: [
                {
                    id: 2,
                    name: 'Jane',
                    lastName: 'Smith',
                    passportNumber: 'CD789012',
                    luggage: {
                        passengerId: 2,
                        passengerName: 'Jane Smith',
                        items: [
                            {
                                type: 'personal_item',
                                weight: 5,
                                quantity: 1,
                                maxAllowed: 1
                            },
                            {
                                type: 'checked_baggage',
                                weight: 23,
                                quantity: 2,
                                maxAllowed: 6
                            }
                        ]
                    }
                },
                {
                    id: 3,
                    name: 'Mike',
                    lastName: 'Smith',
                    passportNumber: 'CD789013',
                    luggage: {
                        passengerId: 3,
                        passengerName: 'Mike Smith',
                        items: [
                            {
                                type: 'personal_item',
                                weight: 5,
                                quantity: 1,
                                maxAllowed: 1
                            },
                            {
                                type: 'cabin_baggage',
                                weight: 10,
                                quantity: 1,
                                maxAllowed: 2
                            },
                            {
                                type: 'checked_baggage',
                                weight: 23,
                                quantity: 1,
                                maxAllowed: 6
                            }
                        ]
                    }
                }
            ],
            totalPassengers: 2
        },
        {
            bookingId: 'B1003',
            flightNumber: 'OA103',

            passengers: [
                {
                    id: 4,
                    name: 'Alice',
                    lastName: 'Johnson',
                    passportNumber: 'EF345678',
                    luggage: null // No luggage selected yet
                },
                {
                    id: 5,
                    name: 'Bob',
                    lastName: 'Johnson',
                    passportNumber: 'EF345679',
                    luggage: null // No luggage selected yet
                },
                {
                    id: 6,
                    name: 'Charlie',
                    lastName: 'Johnson',
                    passportNumber: 'EF345680',
                    luggage: null // No luggage selected yet
                }
            ],
            totalPassengers: 3
        },
        {
            bookingId: 'B1004',
            flightNumber: 'OA104',

            passengers: [
                {
                    id: 7,
                    name: 'David',
                    lastName: 'Brown',
                    passportNumber: 'GH901234',
                    luggage: {
                        passengerId: 7,
                        passengerName: 'David Brown',
                        items: [] // Empty luggage items array (no luggage)
                    }
                }
            ],
            totalPassengers: 1
        },
        {
            bookingId: 'B1005',
            flightNumber: 'OA105',

            passengers: [
                {
                    id: 8,
                    name: 'Emma',
                    lastName: 'Wilson',
                    passportNumber: 'IJ567890',

                    luggage: {
                        passengerId: 8,
                        passengerName: 'Emma Wilson',
                        items: [
                            {
                                type: 'cabin_baggage',
                                weight: 10,
                                quantity: 2,
                                maxAllowed: 2
                            }
                        ]
                    }
                },
                {
                    id: 9,
                    name: 'James',
                    lastName: 'Wilson',
                    passportNumber: 'IJ567891',
                    luggage: {
                        passengerId: 9,
                        passengerName: 'James Wilson',
                        items: [
                            {
                                type: 'personal_item',
                                weight: 5,
                                quantity: 1,
                                maxAllowed: 1
                            }
                        ]
                    }
                }
            ],
            totalPassengers: 2
        }
    ];

    constructor() {}

    getAll(): Observable<Booking[]> {
        return of(this.bookings);
    }

    getById(bookingId: string): Observable<Booking | undefined> {
        return of(this.bookings.find(booking => booking.bookingId === bookingId));
    }

    getByFlightNumber(flightNumber: string): Observable<Booking[]> {
        return of(this.bookings.filter(booking => booking.flightNumber === flightNumber));
    }

    create(booking: Booking): Observable<Booking> {
        // Generate a simple ID (in a real app, this would be done by the backend)
        const newId = `B${1000 + this.bookings.length + 1}`;
        booking.bookingId = newId;


        // Initialize luggage for each passenger if not already set
        booking.passengers.forEach(passenger => {
            if (!passenger.luggage) {
                passenger.luggage = {
                    passengerId: passenger.id,
                    passengerName: `${passenger.name} ${passenger.lastName}`,
                    items: []
                };
            }
        });

        this.bookings.push(booking);
        return of(booking);
    }

    update(bookingId: string, booking: Booking): Observable<Booking | undefined> {
        const index = this.bookings.findIndex(b => b.bookingId === bookingId);
        if (index !== -1) {
            this.bookings[index] = booking;
            return of(booking);
        }
        return of(undefined);
    }

    delete(bookingId: string): Observable<boolean> {
        const index = this.bookings.findIndex(b => b.bookingId === bookingId);
        if (index !== -1) {
            this.bookings.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    /**
     * Update luggage for a passenger in a booking
     * @param bookingId Booking ID
     * @param passengerId Passenger ID
     * @param luggageItems Luggage items
     */
    updatePassengerLuggage(
        bookingId: string,
        passengerId: number,
        luggageItems: LuggageItem[]
    ): Observable<Booking | undefined> {
        const booking = this.bookings.find(b => b.bookingId === bookingId);

        if (!booking) {
            return of(undefined);
        }

        const passenger = booking.passengers.find(p => p.id === passengerId);

        if (!passenger) {
            return of(undefined);
        }

        // Update the passenger's luggage
        passenger.luggage = {
            passengerId: passenger.id,
            passengerName: `${passenger.name} ${passenger.lastName}`,
            items: [...luggageItems]
        };

        // Recalculate total price based on luggage
        this.recalculateTotalPrice(booking);

        return of(booking);
    }

    /**
     * Calculate luggage cost based on selected items
     * @param luggageItems Luggage items array
     * @returns Total cost
     */
    calculateLuggageCost(luggageItems: LuggageItem[]): number {
        if (!luggageItems || luggageItems.length === 0) {
            return 0;
        }

        let totalCost = 0;

        // These are example prices, adjust as needed
        const priceMap = {
            'personal_item': 0, // Free personal item
            'cabin_baggage': 50, // 50 ILS per cabin bag
            'checked_baggage': 120 // 120 ILS per checked bag
        };

        const lagguagePrice = 100

        luggageItems.forEach(item => {
            const cost = lagguagePrice * item.quantity;
            totalCost += cost;
        });

        return totalCost;
    }

    /**
     * Recalculate the total price of a booking including luggage costs
     * @param booking The booking to recalculate
     */
    private recalculateTotalPrice(booking: Booking): void {
        // Base price (without luggage)
        const basePrice =  500 * booking.totalPassengers; // Default base price

        // Calculate total luggage cost
        let totalLuggageCost = 0;

        booking.passengers.forEach(passenger => {
            if (passenger.luggage && passenger.luggage.items) {
                totalLuggageCost += this.calculateLuggageCost(passenger.luggage.items);
            }
        });


    }

    /**
     * Get the total luggage cost for a booking
     * @param bookingId Booking ID
     */
    getTotalLuggageCost(bookingId: string): Observable<number> {
        const booking = this.bookings.find(b => b.bookingId === bookingId);

        if (!booking) {
            return of(0);
        }

        let totalCost = 0;

        booking.passengers.forEach(passenger => {
            if (passenger.luggage && passenger.luggage.items) {
                totalCost += this.calculateLuggageCost(passenger.luggage.items);
            }
        });

        return of(totalCost);
    }

    /**
     * Get the luggage cost for a specific passenger
     * @param bookingId Booking ID
     * @param passengerId Passenger ID
     */
    getPassengerLuggageCost(bookingId: string, passengerId: number): Observable<number> {
        const booking = this.bookings.find(b => b.bookingId === bookingId);

        if (!booking) {
            return of(0);
        }

        const passenger = booking.passengers.find(p => p.id === passengerId);

        if (!passenger || !passenger.luggage || !passenger.luggage.items) {
            return of(0);
        }

        return of(this.calculateLuggageCost(passenger.luggage.items));
    }
}