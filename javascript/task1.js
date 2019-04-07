"use strict";

var convertStringToInt = element => { return Number.parseInt(element) };

function reverse(input){
    return input.split(" ").reverse().join(" ");
}

function ascending(input){
    return input.split(" ")
                    .map(convertStringToInt)
                    .sort((num1, num2) => num1 - num2)
                    .join(" ");
}

function negative(input){
    return input.split(" ")
                    .map(convertStringToInt)
                    .filter(number => number < 0)
                    .join(" ")
}

function sum(input){
    return input.split(" ")
                    .map(convertStringToInt)
                    .reduce((num1, num2) => num1 + num2);
}

function minmax(input){
    let numberArray = input.split(" ")
                        .map(convertStringToInt)
                        
    let min = numberArray.reduce((num1, num2) => Math.min(num1, num2));
    let max = numberArray.reduce((num1, num2) => Math.max(num1, num2));

    return min + " " + max;
}

function sqrLess100(input){
    return input.split(" ")
                    .map(convertStringToInt)
                    .filter(num => Math.pow(num, 2) < 100)
                    .join(" ");
}

var task1_1 = reverse("5 2 9 12 28 14 -5 42 0 11 -20");
var task1_2 = ascending("5 2 9 12 28 14 -5 42 0 11 -20");
var task1_3 = negative("5 2 9 12 28 14 -5 42 0 11 -20");
var task1_4 = sum("5 2 9 12 28 14 -5 42 0 11 -20");
var task1_5 = minmax("5 2 9 12 28 14 -5 42 0 11 -20");
var task1_6 = sqrLess100("5 2 9 12 28 14 -5 42 0 11 -20");


console.log("Task 1.1: " + task1_1);
console.log("Task 1.2: " + task1_2);
console.log("Task 1.3: " + task1_3);
console.log("Task 1.4: " + task1_4);
console.log("Task 1.5: " + task1_5);
console.log("Task 1.6: " + task1_6);