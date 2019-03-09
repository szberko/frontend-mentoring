"use strict";

var input = "+ 3 + 4 / 20 4";
var symbolArray = getSymbolArray(input);

const minOperatorLvl = 1
const maxOperatorLvl = 2;
const definedOperatorPriority = {
    "/" : 1,
    "*" : 1,
    "-" : 2,
    "+" : 2
}

const definedOperators = {
    "*" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) * Number.parseInt(rightOperand),
    "/" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) / Number.parseInt(rightOperand),
    "-" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) - Number.parseInt(rightOperand),
    "+" : (leftOperand, rightOperand) => Number.parseInt(leftOperand) + Number.parseInt(rightOperand)
}


function Operation(operator, operatorPriority, leftOperand, rightOperand){
    this.operator = operator;
    this.operatorPriority = operatorPriority;
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

    let operator;
    let leftOperand;
    let rightOperand;
    let operatorPriority;

    if(input.length != 1){
        operator = input[0];
        operatorPriority = definedOperatorPriority[operator];
        input.shift();
        leftOperand = input[0];
        input.shift();
        rightOperand = compute(input);
    }else{
        rightOperand = input[0];
    }
    
    return new Operation(operator, operatorPriority, leftOperand, rightOperand);
}

function resolve(input, operatorLvl){
    if(input.operator == undefined){
        return;
    }else{
        resolve(input.rightOperand, operatorLvl);
        
        if(input.operatorPriority == operatorLvl){
            let currentOperator = definedOperators[input.operator];
            let calculatedValue = currentOperator(input.leftOperand, input.rightOperand.rightOperand);
            input.rightOperand = calculatedValue;
        }
    }
    return input;
}

function getSolution(input){
    let operationTree = input;

    for(let operatorLvl = 1; operatorLvl <= maxOperatorLvl; operatorLvl++){
        operationTree = resolve(operationTree, operatorLvl);
    }
    return operationTree.rightOperand;
}

var operationTree = compute(symbolArray, operationTree);
console.log(operationTree);
var solution = getSolution(operationTree);
console.log(solution)
