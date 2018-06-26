const readline = require('readline');
const expenses = require("./expenses.js");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdin.setEncoding('utf8');

//Waiting for user input
rl.on('line', (data) => {
    var inputString = data.toString();
    inputString = data.split(" ");
    
    var command = inputString[0];
    if (command == 'add') {
        //Loking for complex item consists from >1 words
        var fullItemName = inputString[4] + " ";
        if (inputString[4].indexOf('\"') >= 0 || inputString[4].indexOf('\“') >= 0 || inputString[4].indexOf("\'") >= 0)
        {
            for (i = 5; i < inputString.length; i++) { 
                if(inputString[i].indexOf('\"') >= 0 || inputString[i].indexOf('\”') >= 0 || inputString[i].indexOf("\'") >= 0) {
                    fullItemName += inputString[i];
                    break;
                }
                else{
                    fullItemName += inputString[i] + " ";
                }
            }
            //Removing \' elements
            fullItemName = fullItemName.slice(1).slice(0, -1);
        }
        
        //Adding a new expence
        var expense = expenses.addExpense(inputString[1], inputString[2], inputString[3], fullItemName);
        if (expense) {
            var allExpenses = expenses.getAllExpenses();
            console.log('\n' + expenses.showStringClear(allExpenses));
        } else {
            console.log('Falied adding expence!');
        }
    }
    
    else if (command == 'list') {
        var allExpenses = expenses.getAllExpenses();
        console.log('\n' + expenses.showStringClear(allExpenses));
    }
    
    else if (command === 'clear') {
        var allExpenses = expenses.getAllExpenses();
        allExpenses = expenses.removeExpense(inputString[1]);
        console.log('\n' + expenses.showStringClear(allExpenses));
    } 
    
    else if (command === 'total') {
        var totalSpendings = expenses.getTotalExpenses(inputString[1]);
        console.log(totalSpendings);
    }
    
    else {
        console.log(`Command "${command}" is not recognized! \n Please, choose one command from list \n` + 
        "- add <YYYY-MM-DD> <amount> <currency> <item>\n" +
        "- clear <YYYY-MM-DD> \n" +
        "- list \n" +
        "- total <currency>");
    };
});