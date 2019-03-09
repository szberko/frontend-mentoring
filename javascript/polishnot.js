"use strict";

var input = "+ 3 + 4 / 20 4";
var symbolArray = getSymbolArray(input);

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

var currentOpLevel = 1;

function resolve(operationTree){
    let oneLevelDeeperOp;
    if(operationTree.operation == undefined){
        oneLevelDeeperOp = operationTree;
    }else{
        oneLevelDeeperOp = resolve(operationTree.rightOperand);
        
        if(operationTree.operationPriority == currentOpLevel){
            let currentOperation = definedOperations[operationTree.operation];
            let calculatedValue = currentOperation(operationTree.leftOperand, operationTree.rightOperand.rightOperand);
            operationTree.rightOperand = calculatedValue;

            oneLevelDeeperOp = operationTree;
        }

        
    }
    return oneLevelDeeperOp;
}

var operationTree = compute(symbolArray, operationTree);

console.log(operationTree);

var operationTree1 = resolve(operationTree);
currentOpLevel++;
var operationTree2 = resolve(operationTree1);

console.log(operationTree2);

