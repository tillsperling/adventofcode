const fs = require("fs");
const input1 = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r\n/g, "")
    .split("");
const input2 = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r\n/g, " ")
    .split(" ");

const length = input2.length;

var matrix = [];
let count = 0;
for (var i = 0; i < length; i++) {
    matrix[i] = [];
    for (var j = 0; j < length; j++) {
        console.log(count);
        matrix[i][j] = input1[j + count];

    }
    count += length;
}

console.log(matrix);