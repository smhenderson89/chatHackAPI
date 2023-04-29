// Environment Variables
require('dotenv').config()

// Boilerplate info
const express = require('express');
var cors = require('cors');
app = express();

var hostname = process.env.YOUR_HOST || "127.0.0.1";
var PORT = process.env.PORT || 4000;
// Console log hosting info

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
app.use(express.json())

// Amadeus Info
var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

// Routing Brances
const testRoute = require('./routes/routeTest')
const inspiration = require('./routes/inspriation')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/function', (req, res) => {
    airportCode = req.body.code
    date = req.body.date
    console.log(`DEBUG: Received paramaters ${airportCode}, ${date}`);
    inspirationFunc(airportCode, date)
})

app.get('/cheapest', (req, res) => {
    cheapestFlights(origin)
})

app.listen(PORT, hostname, (req, res) => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
})


function inspirationFunc(airportCode, date) {
    // find flights leaving from an aiport
    /* Example:         
        airportCode: 'SAN',
        date: '2023-09-01' */
    amadeus.airport.predictions.onTime.get({
        airportCode: airportCode,
        date: date
    }).then(function (response) {
    console.log(response);
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

