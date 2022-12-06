/* 

Enemy

    A = Rock
    B = Paper
    C = Scissor

You

    X = Rock
        Defeats: C

    Y = Paper
        Defeats: A

    Z = Scissor
        Defeats: B

Points

    Rock 1
    Paper 2
    Scissor 3

    Loss 0
    Draw 3
    Win 6

*/

// read input

var fs = require("fs");
let input = fs.readFileSync("./input.txt").toString("utf-8");

// define variables

let score = 0;
let tempArray = [];
const workingArray = [];

// push lines in input array
var inputArray = input.split("");

// remove line breaks and spaces from inputArray

for (var i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].replace(/(\r\n|\n|\r)/gm, "");
}

inputArray = inputArray.filter((item) => item);

// put each pairing in sub Array
for (i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == " ") {
        continue;
    }
    if (tempArray.length <= 2) {
        tempArray.push(inputArray[i]);
        if (tempArray.length == 2) {
            workingArray.push(tempArray);
            tempArray = [];
        }
    }
}

// function to calculate points
function calculatePoints(arr) {
    for (i = 0; i < arr.length; i++) {
        // if enemy plays rock
        if (arr[i][0] === "A") {
            if (arr[i][1] === "X") {
                score = score + 4;
            }
            if (arr[i][1] === "Y") {
                score = score + 8;
            }
            if (arr[i][1] === "Z") {
                score = score + 3;
            }
        }
        // if enemy plays paper
        if (arr[i][0] === "B") {
            if (arr[i][1] === "X") {
                score = score + 1;
            }
            if (arr[i][1] === "Y") {
                score = score + 5;
            }
            if (arr[i][1] === "Z") {
                score = score + 9;
            }
        }
        // if enemy plays scissor
        if (arr[i][0] === "C") {
            if (arr[i][1] == "X") {
                score = score + 7;
            }
            if (arr[i][1] == "Y") {
                score = score + 2;
            }
            if (arr[i][1] == "Z") {
                score = score + 6;
            }
        }
    }
}

/* 

Enemy

    A = Rock
    B = Paper
    C = Scissor

You

    X = Loss
        Defeats: C

    Y = Draw
        Defeats: A

    Z = Win
        Defeats: B

Points

    Rock 1
    Paper 2
    Scissor 3

    Loss 0
    Draw 3
    Win 6

*/

// function to calculate points
function calculateHand(arr) {
    for (i = 0; i < arr.length; i++) {
        // if u need lose
        if (arr[i][1] === "X") {
            score = score + 0;
            if (arr[i][0] === "A") {
                score = score + 3;
            }
            if (arr[i][0] === "B") {
                score = score + 1;
            }
            if (arr[i][0] === "C") {
                score = score + 2;
            }
        }
        // if u need draw
        if (arr[i][1] === "Y") {
            score = score + 3;
            if (arr[i][0] === "A") {
                score = score + 1;
            }
            if (arr[i][0] === "B") {
                score = score + 2;
            }
            if (arr[i][0] === "C") {
                score = score + 3;
            }
        }
        // if u need win
        if (arr[i][1] === "Z") {
            score = score + 6;
            if (arr[i][0] == "A") {
                score = score + 2;
            }
            if (arr[i][0] == "B") {
                score = score + 3;
            }
            if (arr[i][0] == "C") {
                score = score + 1;
            }
        }
    }
}

calculateHand(workingArray);
console.log(score);