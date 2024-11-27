
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
    if (fromSelect && toSelect){
        destinations.forEach(dest => {
            fromSelect.innerHTML += `<option value="${dest.code}">${dest.name}</option>`;
            toSelect.innerHTML += `<option value="${dest.code}">${dest.name}</option>`;
        });
    }
    
  
  }
  
  function filterFlights() {
    const from = document.getElementById('fromDestination');
    if (from) {
    const FromValue = from.value
    const to = document.getElementById('toDestination').value;
    
        const filteredFlights = flights.filter(flight => 
            (!from || flight.departureCode === from) &&
            (!to || flight.arrivalCode === to)
        );
        
        displayFlights(filteredFlights);
    }
  
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
  
  function getFlightDetails(flightNumber) {
    const flight = flights.find(f => f.flightNumber === flightNumber);
    if (!flight) return null;
  
    const departure = destinations.find(d => d.code === flight.departureCode);
    const arrival = destinations.find(d => d.code === flight.arrivalCode);
  
    return {
        origin: departure?.name || flight.departureCode,
        destination: arrival?.name || flight.arrivalCode,
        boardingDate: new Date(flight.departureDateTime).toLocaleDateString(),
        boardingTime: new Date(flight.departureDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        landingDate: new Date(flight.arrivalDateTime).toLocaleDateString(),
        landingTime: new Date(flight.arrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
  
  
  
  function createBookingCard(booking) {
    const flightDetails = getFlightDetails(booking.flightNumber);
    if (!flightDetails) return ''; // Handle case where flight isn't found
  
    return `
        <div class="booking-card">
            <div class="destination-image">
                Destination Image
            </div>
            <div class="booking-details">
                <p>Flight Number: ${booking.flightNumber}</p>
                <p>Origin: ${flightDetails.origin} Boarding: ${flightDetails.boardingDate} ${flightDetails.boardingTime}</p>
                <p>Destination: ${flightDetails.destination} Landing: ${flightDetails.landingDate} ${flightDetails.landingTime}</p>
                <p>No. of passengers: ${booking.totalPassengers}</p>
                <p>Passengers:</p>
                <ul>
                    ${booking.passengers.map(p => `
                        <li>${p.name} (Passport: ${p.passportNumber})</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
  }
  
  
  function displayBookings() {
    console.log('a');
    const container = document.getElementById('bookings-container');
    if(container) {
        console.log('B');
        const bookingsHTML = bookings.map(booking => createBookingCard(booking)).join('');
        container.innerHTML = bookingsHTML;
    }
  
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
  
  
  
  displayDestinations();
  
  populateDestinations();
  filterFlights();
  displayBookings();