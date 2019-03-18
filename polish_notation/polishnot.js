"use strict";

function evalPolishNotation(input){
    let inputArray = input.split(" ").reverse();
    let resolutionStack = [];
    let isNumeric = symbol => !isNaN(parseFloat(symbol)) && isFinite(symbol);

    const definedOperators = {
        "*" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) * Number.parseInt(rightOperand),
        "/" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) / Number.parseInt(rightOperand),
        "-" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) - Number.parseInt(rightOperand),
        "+" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) + Number.parseInt(rightOperand)
    }

    inputArray.forEach( symbol => {
        if(isNumeric(symbol)){
            resolutionStack.push(Number.parseFloat(symbol));
        }else{
            let operation = definedOperators[symbol];

            let leftOperand = resolutionStack[resolutionStack.length - 1];
            resolutionStack.pop();
            let rightOperand = resolutionStack[resolutionStack.length - 1];
            resolutionStack.pop();

            let result = operation(leftOperand, rightOperand);
            resolutionStack.push(result);
        }
    });

    return resolutionStack[0];
}

var result = evalPolishNotation("+ 3 + 4 / 20 4");
console.log(result);