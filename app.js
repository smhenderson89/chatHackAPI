var Amadeus = require('amadeus');

var amadeus = new Amadeus();

amadeus.referenceData.urls.checkinLinks.get({ airlineCode: 'BA' }).then(function (response) {
    console.log(response.data);
}).catch(function (responseError) {
    console.log(responseError.code);
});