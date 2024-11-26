// The data model

const destinations = [
    {
        id: 1,
        name: 'London'
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