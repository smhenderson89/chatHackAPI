// Environment Variables
require('dotenv').config()

// Boilerplate info
const express = require('express');
var cors = require('cors');
// var bodyParser =  require('body-parser')
app = express();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Console log hosting info
var hostname = process.env.YOUR_HOST || "127.0.0.1";
var PORT = process.env.PORT || 4000;


// CORS
app.use(cors())
app.options('*', cors(
  {origin: "http://127.0.0.1:5500"}
))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Amadeus Info
var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('This is a test')
})

// Test arguments
app.post('/body', (req, res) => {
    var bodyTest = req.body
    console.log(bodyTest);
});

app.get('/nearbyAirport', (req, res) => {
    console.log(req.body);
    let city = req.body.city
    nearbyAirport(city)
})

app.get('/cheapest', (req, res) => {
    cheapestFlights(origin)
})

app.listen(PORT, hostname, (req, res) => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
})

function nearbyAirport(location) {

    console.log(`Searched City Name: ${location}`)

    // Which airport is nearby enter city name 
    amadeus.referenceData.locations.get({
    keyword: location,
    subType: Amadeus.location.airport
    }).then(function (response) {
        let data = response.data[0];
        let airCode = data.iataCode;
        let airName = data.name
        console.log(`Traveling to ${airName} (${airCode})`);
    }).catch(function (response) {
        console.error(response);
    });
}



// origin must be 3 Letter acroymn of Airport
function cheapestFlights(airport) {
    
    // Find cheapest destinations from Madrid => MAD
    amadeus.shopping.flightDestinations.get({
        origin: origin
    }).then(function (response) {
        console.log(response);
        res.send(response)
    }).catch(function (response) {
    console.error(response);
    });
}


