const expect = require('expect');
const expenses = require('./../expenses');
const fs = require('fs');

var expensesArray = [];
  
describe('App tests', ()=>{
    it('should fetch all expenses', (done) => {
        var expensesArray = expenses.fetchExpenses();
        var expensesString = fs.readFileSync('expences-data.json');
        var dataFromFile = JSON.parse(expensesString);
        expect(expensesArray).toEqual(dataFromFile);
        done();
    });

    it('should get total of expences', (done)=>{
        fs.writeFileSync('expences-data.json', '');
        expenses.addExpense('2017-04-25', '2', 'USD', 'Jogurt');
        expenses.addExpense('2017-04-25', '3', 'EUR', 'French Fries');
        expenses.addExpense('2017-04-26', '2.5', 'PLN', 'Sweets');
        var expensesTotal = expenses.getTotalExpenses()
            
        setTimeout(() => {
            //Change to current currency cource
                expect(expensesTotal).toEqual('5.29');
        }, 1500)
        done();
    });
})