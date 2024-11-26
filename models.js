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