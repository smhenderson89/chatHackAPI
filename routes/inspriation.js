const express = require('express');
const router = express.Router()

// Environment Variables
require('dotenv').config()
var Amadeus = require("amadeus");
var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

router.get('/', (req, res) => {
    // Find cheapest destinations from Madrid
    amadeus.shopping.flightDestinations.get({
    origin: 'MAD'
    }).then(function (response) {
    console.log(response);
    res.send(response)
    }).catch(function (response) {
    console.error(response);
    res.send(response)
    });
})

module.exports = router;