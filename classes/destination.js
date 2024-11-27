class Destination {
    constructor(id, name, code, airportName, airportWebsite, email, imageUrl) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.airportName = airportName;
        this.airportWebsite = airportWebsite;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    static createDestination(destinationData) {
        return new Destination(
            destinationData.id,
            destinationData.name,
            destinationData.code,
            destinationData.airportName,
            destinationData.airportWebsite,
            destinationData.email,
            destinationData.imageUrl
        );
    }
}