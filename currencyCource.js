const axios = require('axios');
const _ = require('lodash');
const apiKey = 'b97a75b1967c433e52423d5c84e0ea60';
//Depends on data.fixer plan, now available only EUR
var baseCurrency = 'EUR';

//Add &base=${baseCurrency} when plan is purchased
const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

//Saving rates not to make a lot of api calls
var rates = [];

//Getting array of currency rates
axios.get(url)
  .then(function (response) {

    //If array is not empty - save items
    if (rates.length === 0)
      rates.push(response.data.rates);
  })

  //Processing errors
  .catch(function (error) {
    console.log(error);
  });

var getTotalCurrency = (baseCurr, arr) => {

  //baseCurrency = baseCurr;
  var totalAmountOneCurrency = 0;

  //Getting amount in base currency
  arr.forEach(element => {
    totalAmountOneCurrency += parseFloat(element.amount) / getCurrencyCource(element.currency, rates);
  });

  //Leaving 2 decimals after coma sign
  return totalAmountOneCurrency.toFixed(2);
}

//Getting current course related to base currency 
var getCurrencyCource = (currency, currencyArray) => {

  //Checking if entered currensy exists
  let currencyChecker = 0;
  for (key in currencyArray[0]) {
    if (key === currency.toUpperCase()) {
      currencyChecker++;
      return currencyArray[0][key];
    }
  }

  //If not - get message back
  if (currencyChecker === 0) {
    return 'Wrong currency, please, try again!';
  }
}

module.exports = {
  getTotalCurrency
};