require('dotenv').config()

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
  });


// Will there be a delay from BRU to FRA? If so how much delay?
amadeus.travel.predictions.flightDelay.get({
    originLocationCode: 'NCE',
    destinationLocationCode: 'IST',
    departureDate: '2022-08-01',
    departureTime: '18:20:00',
    arrivalDate: '2022-08-01',
    arrivalTime: '22:15:00',
    aircraftCode: '321',
    carrierCode: 'TK',
    flightNumber: '1816',
    duration: 'PT31H10M'
  }).then(function (response) {
    console.log(response);
  }).catch(function (response) {
    console.error(response);
  });


/* 
//   amadeus.airport.predictions.onTime.get({
//     airportCode: 'SAN',
//     date: '2023-09-01'
//   }).then(function (response) {
//     console.log(response);
//   }).catch(function (response) {
//     console.error(response);
//   });

*/

