"use strict";

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


class Operation {
    constructor(operator, operatorPriority, leftOperand, rightOperand) {
        this.operator = operator;
        this.operatorPriority = operatorPriority;
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
    }
}

function getSymbolArray(input){
    return input.split(" ");
}

function convertPNToOperationTree(input){
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
        rightOperand = convertPNToOperationTree(input);
    }else{
        rightOperand = input[0];
    }
    
    return new Operation(operator, operatorPriority, leftOperand, rightOperand);
}

function resolveOperationTree(input, operatorLvl){
    if(input.operator == undefined){
        return;
    }else{
        resolveOperationTree(input.rightOperand, operatorLvl);
        
        if(input.operatorPriority == operatorLvl){
            let currentOperator = definedOperators[input.operator];
            let calculatedValue = currentOperator(input.leftOperand, input.rightOperand.rightOperand);
            input.rightOperand = calculatedValue;
        }
    }
    return input;
}

function calcSolution(input){
    let operationTree = input;

    for(let operatorLvl = 1; operatorLvl <= maxOperatorLvl; operatorLvl++){
        operationTree = resolveOperationTree(operationTree, operatorLvl);
    }
    return operationTree.rightOperand;
}

var polishNotation = "+ 3 + 4 / 20 4";
var polishNotationArray = getSymbolArray(polishNotation);

var operationTree = convertPNToOperationTree(polishNotationArray);
console.log(operationTree);
var solution = calcSolution(operationTree);
console.log(solution)
