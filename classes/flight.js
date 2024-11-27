class Flight {
    constructor(flightNumber, departureCode, arrivalCode, departureDateTime, arrivalDateTime, totalSeats, availableSeats) {
        this.flightNumber = flightNumber;
        this.departureCode = departureCode;
        this.arrivalCode = arrivalCode;
        this.departureDateTime = departureDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    static createFlight(flightData) {
        return new Flight(
            flightData.flightNumber,
            flightData.departureCode,
            flightData.arrivalCode,
            flightData.departureDateTime,
            flightData.arrivalDateTime,
            flightData.totalSeats,
            flightData.availableSeats
        );
    }
}