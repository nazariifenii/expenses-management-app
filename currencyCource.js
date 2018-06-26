const axios = require('axios');
const _ = require('lodash');
const apiKey = 'b97a75b1967c433e52423d5c84e0ea60';
var baseCurrency = 'EUR';

const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

var rates = [];

axios.get(url)
  .then(function (response) {
    if (rates.length === 0)
      rates.push(response.data.rates);
  })
  .catch(function (error) {
    console.log(error);
  });

var getTotalCurrency = (baseCurr, arr) => {
  baseCurrency = baseCurr;
  var totalAmountOneCurrency = 0;
  arr.forEach(element => {
    totalAmountOneCurrency += parseFloat(element.amount) / getCurrencyCource(element.currency, rates);
  });
  return totalAmountOneCurrency.toFixed(2);
}

var getCurrencyCource = (currency, currencyArray) => {
  let currencyChecker = 0;
  for (key in currencyArray[0]) {
    if (key === currency.toUpperCase()) {
      currencyChecker++;
      return currencyArray[0][key];
    }
  }
  if (currencyChecker === 0) {
    return 'Wrong currency, please, try again!';
  }
}

module.exports = {
  getTotalCurrency
};