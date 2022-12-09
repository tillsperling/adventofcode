const fs = require("fs");
let input = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r/g, " ")
    .split("");

function part1() {
    const originalInputLength = input.length; // defining original Input Length cause we change the array
    let ans = 0;
    let messageLength = 14;
    let ansArr = [];
    for (i = 0; i < originalInputLength; i++) {
        for (j = 0; j < messageLength; j++) {
            // create array with a length of "messageLength" filled with the first "messageLength" characters of input
            if (ansArr.length < messageLength) {
                ansArr.push(input.shift());
                ans++; // counts up towards the last push so we know at which char we are at
            }
        }
        if (containsDuplicates(ansArr) == true) {
            ansArr.shift();
        } else {
            console.log(ans);
            return;
        }
    }
}

function containsDuplicates(arr) {
    const result = arr.some((element) => {
        if (arr.indexOf(element) !== arr.lastIndexOf(element)) {
            return true;
        }

        return false;
    });

    return result;
}

part1();