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
        name: 'New York',
        code: 'JFK',
        airportName: 'John F. Kennedy International Airport',
        airportWebsite: 'https://www.jfkairport.com',
        email: 'info@jfkairport.com',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 3,
        name: 'Tel Aviv',
        code: 'TLV',
        airportName: 'Ben Gurion Airport',
        airportWebsite: 'https://www.iaa.gov.il',
        email: 'info@iaa.gov.il',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 4,
        name: 'Paris',
        code: 'CDG',
        airportName: 'Charles de Gaulle Airport',
        airportWebsite: 'https://www.parisaeroport.fr',
        email: 'contact@parisaeroport.fr',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 5,
        name: 'Tokyo',
        code: 'HND',
        airportName: 'Haneda Airport',
        airportWebsite: 'https://www.tokyo-airport-bldg.co.jp',
        email: 'info@haneda-airport.jp',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 6,
        name: 'Dubai',
        code: 'DXB',
        airportName: 'Dubai International Airport',
        airportWebsite: 'https://www.dubaiairports.ae',
        email: 'contact@dubaiairports.ae',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 7,
        name: 'Sydney',
        code: 'SYD',
        airportName: 'Sydney Airport',
        airportWebsite: 'https://www.sydneyairport.com.au',
        email: 'info@sydneyairport.com.au',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 8,
        name: 'Rome',
        code: 'FCO',
        airportName: 'Leonardo da Vinci International Airport',
        airportWebsite: 'https://www.adr.it',
        email: 'info@adr.it',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 9,
        name: 'Singapore',
        code: 'SIN',
        airportName: 'Changi Airport',
        airportWebsite: 'https://www.changiairport.com',
        email: 'enquiry@changiairport.com',
        imageUrl: '/api/placeholder/400/300'
    },
    {
        id: 10,
        name: 'Amsterdam',
        code: 'AMS',
        airportName: 'Amsterdam Airport Schiphol',
        airportWebsite: 'https://www.schiphol.nl',
        email: 'info@schiphol.nl',
        imageUrl: '/api/placeholder/400/300'
    }
  ];
  
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
    {
        flightNumber: 'OA102', 
        departureCode: 'JFK',
        arrivalCode: 'CDG',
        departureDateTime: '2024-12-02T08:30:00',
        arrivalDateTime: '2024-12-02T22:00:00',
        totalSeats: 200,
        availableSeats: 180
    },
    {
        flightNumber: 'OA103',
        departureCode: 'DXB',
        arrivalCode: 'SIN',
        departureDateTime: '2024-12-03T23:00:00',
        arrivalDateTime: '2024-12-04T11:30:00',
        totalSeats: 300,
        availableSeats: 250
    },
    {
        flightNumber: 'OA104',
        departureCode: 'AMS',
        arrivalCode: 'FCO',
        departureDateTime: '2024-12-04T14:15:00',
        arrivalDateTime: '2024-12-04T16:45:00',
        totalSeats: 150,
        availableSeats: 100
    },
    {
        flightNumber: 'OA105',
        departureCode: 'HND',
        arrivalCode: 'SYD',
        departureDateTime: '2024-12-05T00:30:00',
        arrivalDateTime: '2024-12-05T11:45:00',
        totalSeats: 250,
        availableSeats: 200
    },
    {
        flightNumber: 'OA106',
        departureCode: 'LHR',
        arrivalCode: 'TLV',
        departureDateTime: '2024-12-06T15:20:00',
        arrivalDateTime: '2024-12-06T22:30:00',
        totalSeats: 180,
        availableSeats: 120
    },
    {
        flightNumber: 'OA107',
        departureCode: 'CDG',
        arrivalCode: 'DXB',
        departureDateTime: '2024-12-07T11:00:00',
        arrivalDateTime: '2024-12-07T19:15:00',
        totalSeats: 220,
        availableSeats: 190
    },
    {
        flightNumber: 'OA108',
        departureCode: 'SIN',
        arrivalCode: 'HND',
        departureDateTime: '2024-12-08T06:45:00',
        arrivalDateTime: '2024-12-08T14:30:00',
        totalSeats: 280,
        availableSeats: 230
    },
    {
        flightNumber: 'OA109',
        departureCode: 'FCO',
        arrivalCode: 'JFK',
        departureDateTime: '2024-12-09T09:20:00',
        arrivalDateTime: '2024-12-09T22:45:00',
        totalSeats: 200,
        availableSeats: 160
    },
    {
        flightNumber: 'OA110',
        departureCode: 'SYD',
        arrivalCode: 'AMS',
        departureDateTime: '2024-12-10T19:00:00',
        arrivalDateTime: '2024-12-11T06:30:00',
        totalSeats: 240,
        availableSeats: 210
    }
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
    {
        bookingId: 'B1002',
        flightNumber: 'OA102',
        passengers: [
            {
                name: 'Emma Wilson',
                passportNumber: 'CD789012'
            },
            {
                name: 'James Wilson',
                passportNumber: 'CD789013'
            }
        ],
        totalPassengers: 2
    },
    {
        bookingId: 'B1003',
        flightNumber: 'OA103',
        passengers: [
            {
                name: 'Sarah Chen',
                passportNumber: 'EF345678'
            },
            {
                name: 'Michael Chen',
                passportNumber: 'EF345679'
            },
            {
                name: 'Lucy Chen',
                passportNumber: 'EF345680'
            }
        ],
        totalPassengers: 3
    },
    {
        bookingId: 'B1004',
        flightNumber: 'OA104',
        passengers: [
            {
                name: 'David Smith',
                passportNumber: 'GH901234'
            }
        ],
        totalPassengers: 1
    },
    {
        bookingId: 'B1005',
        flightNumber: 'OA105',
        passengers: [
            {
                name: 'Maria Garcia',
                passportNumber: 'IJ567890'
            },
            {
                name: 'Carlos Garcia',
                passportNumber: 'IJ567891'
            }
        ],
        totalPassengers: 2
    },
    {
        bookingId: 'B1006',
        flightNumber: 'OA106',
        passengers: [
            {
                name: 'Anna Kowalski',
                passportNumber: 'KL123789'
            },
            {
                name: 'Jan Kowalski',
                passportNumber: 'KL123790'
            },
            {
                name: 'Eva Kowalski',
                passportNumber: 'KL123791'
            },
            {
                name: 'Adam Kowalski',
                passportNumber: 'KL123792'
            }
        ],
        totalPassengers: 4
    },
    {
        bookingId: 'B1007',
        flightNumber: 'OA107',
        passengers: [
            {
                name: 'Thomas Mueller',
                passportNumber: 'MN456123'
            }
        ],
        totalPassengers: 1
    },
    {
        bookingId: 'B1008',
        flightNumber: 'OA108',
        passengers: [
            {
                name: 'Yuki Tanaka',
                passportNumber: 'OP789456'
            },
            {
                name: 'Akiko Tanaka',
                passportNumber: 'OP789457'
            }
        ],
        totalPassengers: 2
    },
    {
        bookingId: 'B1009',
        flightNumber: 'OA109',
        passengers: [
            {
                name: 'Sophie Martin',
                passportNumber: 'QR234567'
            },
            {
                name: 'Pierre Martin',
                passportNumber: 'QR234568'
            },
            {
                name: 'Louis Martin',
                passportNumber: 'QR234569'
            }
        ],
        totalPassengers: 3
    },
    {
        bookingId: 'B1010',
        flightNumber: 'OA110',
        passengers: [
            {
                name: 'Oliver Brown',
                passportNumber: 'ST890123'
            },
            {
                name: 'Emily Brown',
                passportNumber: 'ST890124'
            }
        ],
        totalPassengers: 2
    }
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
    console.log('a')
    const container = document.getElementById('bookings-container');
    console.log('b')
    if(container) {
      console.log('c')
        const bookingsHTML = bookings.map(booking => createBookingCard(booking)).join('');
        container.innerHTML = bookingsHTML;
    }
  
  }
  
  
  
  displayDestinations();
  
  populateDestinations();
  filterFlights();
  displayBookings();