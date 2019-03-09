"use strict";

var input = "+ 3 + 4 / 20 4";
var symbolArray = getSymbolArray(input);


function Operation(operation, leftOperand, rightOperand){
    this.operation = operation;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
}

function getSymbolArray(input){
    return input.split(" ");
}


function compute(input){
    if(input.length == 0){
        return;
    }

    let operand;
    let leftOperand;
    let rightOperand;

    if(input.length != 1){
        operand = input[0];
        input.shift();
        leftOperand = input[0];
        input.shift();
        rightOperand = compute(input);
    }else{
        rightOperand = input[0];
    }
    
    return new Operation(operand, leftOperand, rightOperand);
}

var operation = compute(symbolArray, operation);

console.log(operation);

