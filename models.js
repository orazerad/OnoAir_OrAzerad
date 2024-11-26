// The data model

const destinations = [
    {
        id: 1,
        name: 'London',
        code: 'LHR',
        airportName: 'Heathrow Airport',
        airportWebsite: 'https://www.heathrow.com',
        email: 'info@heathrow.com',
        imageUrl: '/api/placeholder/400/300'
      },
    {
        id: 2,
        name: 'Tel Aviv'
    }
]

const flights = [
    {
        flightNumber: 'OA101',
        departureCode: 'TLV',
        arrivalCode: 'LHR', 
        departureDateTime: '2024-12-01T10:00:00',
        arrivalDateTime: '2024-12-01T14:00:00',
        totalSeats: 180,
        availableSeats: 150
      },
  ];


const bookings = [
{
    bookingId: 'B1001',
    flightNumber: 'OA101',
    passengers: [
    {
        name: 'John Doe',
        passportNumber: 'AB123456'
    }
    ],
    totalPassengers: 1
},
];


  function updatePassengerFields() {
    const count = document.getElementById('passengerCount').value;
    const container = document.getElementById('passengerFields');
    container.innerHTML = '';
    
    for(let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="passenger-group">
                <h4>Passenger ${i + 1}</h4>
                <div class="form-group">
                    <label for="name${i}">Name:</label>
                    <input type="text" id="name${i}" required>
                </div>
                <div class="form-group">
                    <label for="passport${i}">Passport Number:</label>
                    <input type="text" id="passport${i}" required>
                </div>
            </div>
        `;
    }
}


function handleBookingSubmit(event) {
    event.preventDefault();
    const count = document.getElementById('passengerCount').value;
    const passengers = [];
    
    for(let i = 0; i < count; i++) {
        passengers.push({
            name: document.getElementById(`name${i}`).value,
            passport: document.getElementById(`passport${i}`).value
        });
    }
    
    alert('Booking would be created:\n' + JSON.stringify(passengers, null, 2));
    return false;
}


function displayDestinations() {
    const tbody = document.getElementById('destinationsBody');
    if (tbody) {
        tbody.innerHTML = '';
        destinations.forEach(dest => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dest.code}</td>
                <td>${dest.name}</td>
                <td>${dest.airportName}</td>
                <td><a href="${dest.airportWebsite}" target="_blank">${dest.airportWebsite}</a></td>
                <td>${dest.email}</td>
            `;
            tbody.appendChild(row);
        });
    }

}

function handleDestinationSubmit(event) {
    event.preventDefault();
    const formData = {
        code: document.getElementById('code').value,
        name: document.getElementById('name').value,
        airportName: document.getElementById('airport').value,
        airportWebsite: document.getElementById('website').value,
        email: document.getElementById('email').value
    };
    alert('New destination would be added:\n' + JSON.stringify(formData, null, 2));
    event.target.reset();
    return false;
}


function populateDestinations() {
    const fromSelect = document.getElementById('fromDestination');
    const toSelect = document.getElementById('toDestination');
    
    destinations.forEach(dest => {
        fromSelect.innerHTML += `<option value="${dest.code}">${dest.name}</option>`;
        toSelect.innerHTML += `<option value="${dest.code}">${dest.name}</option>`;
    });
}

function filterFlights() {
    const from = document.getElementById('fromDestination').value;
    const to = document.getElementById('toDestination').value;
    
    const filteredFlights = flights.filter(flight => 
        (!from || flight.departureCode === from) &&
        (!to || flight.arrivalCode === to)
    );
    
    displayFlights(filteredFlights);
}


function displayFlights(flightsList) {
    const tbody = document.getElementById('flightsBody');
    tbody.innerHTML = '';
    
    flightsList.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flightNumber}</td>
            <td>${flight.departureCode}</td>
            <td>${flight.arrivalCode}</td>
            <td>${new Date(flight.departureDateTime).toLocaleString()}</td>
            <td>${new Date(flight.arrivalDateTime).toLocaleString()}</td>
            <td>${flight.availableSeats}</td>
            <td><button onclick="bookFlight('${flight.flightNumber}')">Book</button></td>
        `;
        tbody.appendChild(row);
    });
}


function bookFlight(flightNumber) {
    location.href = `booking-form.html?flight=${flightNumber}`;
}



displayDestinations();

populateDestinations();
        filterFlights();