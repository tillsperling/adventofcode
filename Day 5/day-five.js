/*

9 Stacks
Each Stack reversed Array
Pop from array attach to other
line by line

Create Array with commands
A = first number (amount)
B = second number (from)
C = third number (two)
*/

// Interpreting map

const fs = require("fs");
let crates = fs
    .readFileSync("crates.txt")
    .toString()
    .replace(/\r/g, "")
    .split("\n");

// each line has this amount of spaces, each array will have its part at the same space
// we gotta count the last line for number of arrays and also positions where crates are defined in each line

let positions = [];

function fillPositions(arr) {
    const lineLength = arr[0].length;
    for (i = 0; i < lineLength; i++) {
        console.log(arr);
    }
}
fillPositions(crates);

// CREATE ARRAYS FROM

// RUN CHANGES FROM INPUT