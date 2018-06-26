const fs = require('fs');
const currencyOperation = require('./currencyCource');

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
    var expense = {
        date,
        amount,
        currency,
        item
    };

    expenses.push(expense);
    saveExpenses(expenses);
    return expense;
}

var getAllExpenses = () => {
    return fetchExpenses();
}

var removeExpense = (date) => {
    var expenses = fetchExpenses();
    var removedItems = [];
    var arrayWithoutExpense = expenses.filter((expense)=>{
        if(expense.date === date){
            removedItems.push(expense);
        }
        else {
            return true;
        }
    });
    saveExpenses(arrayWithoutExpense);
    return removedItems;
}

var getTotalExpenses = (currency) => {
    var expenses = fetchExpenses();
    var totalSpendings = currencyOperation.getTotalCurrency(currency, expenses);
    return totalSpendings;
}

module.exports = {
    addExpense,
    getAllExpenses,
    removeExpense,
    getTotalExpenses
};