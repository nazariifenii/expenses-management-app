const readline = require('readline');
const expenses = require("./expenses.js");
const _ = require('lodash');

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
            fullItemName = fullItemName.slice(1).slice(0, -1);
        }
        console.log(fullItemName);
        
        var expense = expenses.addExpense(inputString[1], inputString[2], inputString[3], fullItemName);
        if (expense) {
            var allExpenses = expenses.getAllExpenses();
            console.log('\n' + showStringClear(allExpenses));
        } else {
            console.log('Falied adding expence!');
        }
    }
    
    else if (command == 'list') {
        var allExpenses = expenses.getAllExpenses();
        console.log('\n' + showStringClear(allExpenses));
    }
    
    else if (command === 'clear') {
        expenses.removeExpense(inputString[1]);
        var allExpenses = expenses.getAllExpenses();
        console.log('\n' + showStringClear(allExpenses));
    } 
    
    else if (command === 'total') {
        var totalSpendings = expenses.getTotalExpenses(inputString[1]);
        console.log(totalSpendings);
    }
    
    else {
        console.log(`Command ${command} is not recognized! \n Please, choose one command from list \n" + 
        "- add <YYYY-MM-DD> <amount> <currency> <item>\n" +
        "- clear <YYYY-MM-DD> \n" +
        "- list \n" +
        "- total <currency>`);
    };
});

var occurrenceDay = (occurrence) => {
    return occurrence.date;
};

var groupToDay = (group, day) => {
    return {
        day: day,
        items: group
    }
};

var showStringClear = (arr) => {
    var result = _.chain(arr)
        .groupBy(occurrenceDay)
        .map(groupToDay)
        .sortBy('day')
        .value();
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