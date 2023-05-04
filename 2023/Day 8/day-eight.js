const fs = require("fs");
const allItems = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r\n/g, "")
    .split("");
const allArrays = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r\n/g, " ")
    .split(" ");

const matrixLength = allArrays.length;

/*
    Find element that is higher / visible than its surrounding elements
    matrix[0] is valid (top)
    matrix[i][0] is valid (left)
    matrix[i][matrix[i].length - 1] is invalid (right)
    matrix[matrix[i].length - 1] is invalid (bottom)

    first go left to right if its valid go up and down
    ans++ if its valid

*/

// setup matrix
var matrix = [];
let count = 0;
for (var i = 0; i < matrixLength; i++) {
    matrix[i] = [];
    for (var j = 0; j < matrixLength; j++) {
        matrix[i][j] = allItems[j + count];
    }
    count += matrixLength;
}

// create horizontal arrays
const amountHorizontal = 0;
let topAndBottom = -4; // init with -4 to substract all for corners
let ans = 0;

for (i = 0; i < matrixLength; i++) {
    // init empty array
    let horizontalArr = [];
    let verticalArr = [];
    // filling empty array horizontally and vertically
    for (j = 0; j < matrix[i].length; j++) {
        horizontalArr.push(matrix[i][j]);
        verticalArr.push(matrix[j][i]);
    }
    // counting top and bottom and left and right
    if (i === 0 || i === matrix.length - 1) {
        for (num in horizontalArr) {
            topAndBottom++;
        }
        for (num in verticalArr) {
            topAndBottom++;
        }
    }
    for (j = 0; j < horizontalArr.length; j++) {
        let check = horizontalArr[j];
        // console.log(horizontalArr);
        let lol = 0;
        for (k = 0; k < horizontalArr.length; k++) {
            if (check > horizontalArr[k]) {
                if (
                    i === 0 ||
                    i === matrix.length - 1 ||
                    j === 0 ||
                    j === horizontalArr.length - 1
                ) {
                    continue;
                } else {
                    console.log(check + " groesser als " + horizontalArr[k]);
                    ans++;
                    break;
                }
            }
        }
    }
}
// console.log(topAndBottom);
console.log(ans + topAndBottom);