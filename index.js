// Environment Variables
require('dotenv').config()

// Boilerplate info
const express = require('express');
var cors = require('cors');
var bodyParser =  require('body-parser')
app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));

// Console log hosting info
var hostname = process.env.YOUR_HOST || "127.0.0.1";
var PORT = process.env.PORT || 4000;


// CORS
app.use(cors({ origin: "*" }));
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

app.post('/body', (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body);
})

app.get('/AirCode/:city', async (req, res) => {
    //City must be a string
    let city = req.params.city
    console.log(`Searched City Name: ${city}`)

    // Amadeus API call
    amadeus.referenceData.locations.get({
        keyword: city,
        subType: Amadeus.location.airport
        }).then(function (response) {
            let data = response.data[0];
            let airCode = data.iataCode;
            let airName = data.name
            returnData = [airCode, airName]
            console.log(`Information found, ${returnData}`)
            res.status(200).json({
                'Status': true,
                'data' : returnData})
        }).catch(function (response) {
            // console.log(response)
            res.status(404).json({
                'Status': false,
                'data' : 'Airport not found'
            })
        });
})

app.get('/flights', async (req, res) => {
    
    startCode = req.body.start // Must be 3 Letter Code
    endCode = req.body.end // Must be 3 Letter Code
    date = req.body.date // Must be YYYY-MM-DD Format

    // Amaedus API call for Flight
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: startCode,
        destinationLocationCode: endCode,
        departureDate: date,
        adults: '2'
    }).then(function (response) {
        // console.log(response);

        // Grab next 5 flights in order of results to reduce 
        // Down list of flights
        let flightCount = response.result.meta.count
        let flightOptions = response.result.data;
        let trimFlights = [];
        if (flightCount >= 5) {
            for (let i = 0; i < 5; i++) {
                trimFlights.push(flightOptions[i])
            }
        } else {
            trimFlights = response.result.data
        }

        console.log(trimFlights)
        res.status(200).json({
            'Status': true,
            'data' : trimFlights})
    }).catch(function (response) {
        let error = response.description
        console.error(response);
        res.status(404).json({
            'Status' : false,
            'data' : 'Invalid city code'
        })
    });
})

app.listen(PORT, hostname, (req, res) => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
})

// Export the Express API
module.exports = app

/*
// origin and destination must be 3 number codes
function cheapestFlights() {
// Find the cheapest flights from SFO to DEL
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SFO',
        destinationLocationCode: 'SAN',
        departureDate: '2023-08-01',
        adults: '2'
    }).then(function (response) {
        // console.log(response);
        

        

        console.log('Promise for API results')
        return response
    }).catch(function (response) {
        console.error(response);
    });
}
*/