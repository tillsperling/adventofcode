const fs = require("fs");
const { type } = require("os");
const internal = require("stream");
const inputs = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
    .trim();
// console.log(inputs);

function input1() {
    return inputs.split("\n\n").map((group) => {
        const [left, right] = group.split("\n").map((line) => JSON.parse(line));
        return {
            left,
            right,
        };
    });
}

console.log(input1());

function orderCheck(left, right) {
    console.log(left);
    console.log(right);
}

function checkForNumber(left, right) {
    let leftLength = left.length;
    let rightLength = right.length;
    let amountLeft = 0;
    let amountRight = 0;
    console.log(left, right);
    for (num in left) {
        if (typeof left[num] === "number") {
            amountLeft++;
        } else {
            return;
        }
    }
    for (num in right) {
        if (typeof right[num] === "number") {
            amountRight++;
        } else {
            return;
        }
    }
    if (amountLeft === leftLength && amountRight === rightLength) {
        if (amountLeft <= amountRight) {
            return "isright";
        }
    } else {
        return false;
    }
}