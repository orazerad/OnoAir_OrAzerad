class Passenger {
    constructor(name, passportNumber) {
        this.name = name;
        this.passportNumber = passportNumber;
    }

    static createPassenger(passengerData) {
        return new Passenger(
            passengerData.name,
            passengerData.passportNumber
        );
    }
}