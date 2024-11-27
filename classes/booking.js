class Booking {
    constructor(bookingId, flightNumber, passengers, totalPassengers) {
        this.bookingId = bookingId;
        this.flightNumber = flightNumber;
        this.passengers = passengers;
        this.totalPassengers = totalPassengers;
    }

    static createBooking(bookingData) {
        return new Booking(
            bookingData.bookingId,
            bookingData.flightNumber,
            bookingData.passengers,
            bookingData.totalPassengers
        );
    }
}