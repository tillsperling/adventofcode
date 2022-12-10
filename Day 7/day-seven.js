// Read Input and create Variables
const { timeStamp } = require("console");
const fs = require("fs");
let inputs = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r/g, "")
    .split("\n");

console.log(inputs);
// Function
function part1() {
    // check if cd or ls
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i][0] == "$") {
            if (inputs[i][2] == "c") {
                console.log("cd");
            } else {
                console.log("ls");
            }
        }
    }
}
part1();