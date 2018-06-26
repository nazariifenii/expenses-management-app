const fs = require('fs');
const currencyOperation = require('./currencyCource');
const _ = require('lodash');

var fetchExpenses = () => {
    try {
        var expensesString = fs.readFileSync('expences-data.json');
        return JSON.parse(expensesString);
    } catch (e) {
        return [];
    }
};

var saveExpenses = (expenses) => {
    fs.writeFileSync('expences-data.json', JSON.stringify(expenses));
}

var addExpense = (date, amount, currency, item) => {
    var expenses = fetchExpenses();
    //Creating new expense
    var expense = {
        date,
        amount,
        currency,
        item
    };

    //Moving expense to array
    expenses.push(expense);
    saveExpenses(expenses);
    return expense;
}

var getAllExpenses = () => {
    return fetchExpenses();
}

var removeExpense = (date) => {
    var expenses = fetchExpenses();

    //Filtering array: if the date is not as we need to delete - save to new array
    var arrayWithoutExpense = expenses.filter((expense)=> expense.date !== date);

    //Saving new aaray without deleted date and their items
    saveExpenses(arrayWithoutExpense);
    return arrayWithoutExpense;
}

var getTotalExpenses = (currency) => {
    var expenses = fetchExpenses();
    
    //Asking currencyCource.js to translate total amount in needed currency
    var totalSpendings = currencyOperation.getTotalCurrency(currency, expenses);
    return totalSpendings;
}


//Returning only date
var occurrenceDay = (occurrence) => {
    return occurrence.date;
};

//Grouping to date
var groupToDay = (group, day) => {
    return {
        day: day,
        items: group
    }
};

//Showing items grouped by date and sorted 
var showStringClear = (arr) => {
    var result = _.chain(arr)
        .groupBy(occurrenceDay)
        .map(groupToDay)
        .sortBy('day')
        .value();

    //Getting final string 
    var resultView = "";
    result.forEach(element => {
        resultView += element.day + '\n';
        element.items.forEach(value => {
            resultView += value.item + " " + value.amount + " " + value.currency + "\n";
        });
        resultView += "\n"
    });
    return resultView;
}

module.exports = {
    showStringClear,
    fetchExpenses,
    addExpense,
    getAllExpenses,
    removeExpense,
    getTotalExpenses
};