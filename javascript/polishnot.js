"use strict";

var input = "+ 3 + 4 / 20 4";
var symbolArray = getSymbolArray(input);

const minOperationLvl = 1
const maxOperationLvl = 2;
const definedOperationPriority = {
    "/" : 1,
    "*" : 1,
    "-" : 2,
    "+" : 2
}

const definedOperations = {
    "*" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) * Number.parseInt(rightOperand),
    "/" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) / Number.parseInt(rightOperand),
    "-" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) - Number.parseInt(rightOperand),
    "+" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) + Number.parseInt(rightOperand)
}


function Operation(operation, operationPriority, leftOperand, rightOperand){
    this.operation = operation;
    this.operationPriority = operationPriority;
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

    let operation;
    let leftOperand;
    let rightOperand;
    let operationPriority;

    if(input.length != 1){
        operation = input[0];
        operationPriority = definedOperationPriority[operation];
        input.shift();
        leftOperand = input[0];
        input.shift();
        rightOperand = compute(input);
    }else{
        rightOperand = input[0];
    }
    
    return new Operation(operation, operationPriority, leftOperand, rightOperand);
}

function resolve(input, operationLvl){
    if(input.operation == undefined){
        return;
    }else{
        resolve(input.rightOperand, operationLvl);
        
        if(input.operationPriority == operationLvl){
            let currentOperation = definedOperations[input.operation];
            let calculatedValue = currentOperation(input.leftOperand, input.rightOperand.rightOperand);
            input.rightOperand = calculatedValue;
        }
    }
    return input;
}

function getSolution(input){
    let operationTree = input;

    for(let operationLvl = 1; operationLvl <= maxOperationLvl; operationLvl++){
        operationTree = resolve(operationTree, operationLvl);
    }
    return operationTree.rightOperand;
}

var operationTree = compute(symbolArray, operationTree);
console.log(operationTree);
var solution = getSolution(operationTree);
console.log(solution)
