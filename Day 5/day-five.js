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
    .replace(/\r/g, " ")
    .split("\n");

// each line has this amount of spaces, each array will have its part at the same space
// we gotta count the last line for number of arrays and also positions where crates are defined in each line

// function part1(arr) {
//     const positionOfCrates = [];
//     const lastArray = arr[arr.length - 1]; // used to define the amount of arrays needed
//     const workingArray = [];

//     let amountOfStacks = 0

//     // define positions where crate definitions are to be found
//     for (i = 0; i < lastArray.length; i++) {
//         if ((lastArray[i]) != " ") {
//             amountOfStacks++;
//             positionOfCrates.push(lastArray.indexOf(lastArray[i]));
//             workingArray.push([]);
//         }
//     }
//     // push letters into arrays and reverse
//     for (i = 0; i < arr.length - 1; i++) {
//         for (j = 0; j < positionOfCrates.length; j++) {
//             if (arr[i][positionOfCrates[j]] !== ' ') {
//                 workingArray[j].push(arr[i][positionOfCrates[j]]);
//             }
//         }
//     }
//     for (i = 0; i < amountOfStacks; i++) {
//         workingArray[i].reverse();
//     }
//     // read input for assignments
//     let assignments = fs.readFileSync("input.txt")
//         .toString()
//         .replace(/\r/g, "")
//         .replace(/move/g, " ")
//         .replace(/from/g, " ")
//         .replace(/to/g, " ")
//         .split("\n");
//     const map = assignments.map((assignment) => {
//         // create map with arrow func
//         const [amount, from, to] = assignment // create array inside map with amount from and to
//             .split(' ').filter(element => element)
//             .map((amount) => amount.split(" ").map(Number)); // each substring is split at -
//         // pop 'amount' times 'from' and .push 'to' 
//         if (amount[0] > 0) {
//             for (i = 0; i < amount[0]; i++) {
//                 workingArray[to[0] - 1].push(workingArray[from[0] - 1].pop());
//                 // workingArray[to].push(workingArray[from]);
//                 // workingArray[from].pop()
//             }
//         }

//     });
//     // SOLUTION returning last of each array in working array 
//     let finalString = "";
//     for (i = 0; i < workingArray.length; i++) {
//         finalString = finalString + workingArray[i].pop();
//     }
//     console.log(finalString);

// }
// part1(crates);
function part2(arr) {
    const positionOfCrates = [];
    const lastArray = arr[arr.length - 1]; // used to define the amount of arrays needed
    const workingArray = [];

    let amountOfStacks = 0

    // define positions where crate definitions are to be found
    for (i = 0; i < lastArray.length; i++) {
        if ((lastArray[i]) != " ") {
            amountOfStacks++;
            positionOfCrates.push(lastArray.indexOf(lastArray[i]));
            workingArray.push([]);
        }
    }
    // push letters into arrays and reverse
    for (i = 0; i < arr.length - 1; i++) {
        for (j = 0; j < positionOfCrates.length; j++) {
            if (arr[i][positionOfCrates[j]] !== ' ') {
                workingArray[j].push(arr[i][positionOfCrates[j]]);
            }
        }
    }
    for (i = 0; i < amountOfStacks; i++) {
        workingArray[i].reverse();
    }
    // read input for assignments
    let assignments = fs.readFileSync("input.txt")
        .toString()
        .replace(/\r/g, "")
        .replace(/move/g, " ")
        .replace(/from/g, " ")
        .replace(/to/g, " ")
        .split("\n");
    const map = assignments.map((assignment) => {
        // create map with arrow func
        const [amount, from, to] = assignment // create array inside map with amount from and to
            .split(' ').filter(element => element)
            .map((amount) => amount.split(" ").map(Number)); // each substring is split at -
        // pop 'amount' times 'from' and .push 'to' 
        if (amount[0] === 1) {
            workingArray[to[0] - 1].push(workingArray[from[0] - 1].pop());
        } else if (amount[0] > 1) {
            // store new array
            let newArr = [];
            for (i = 0; i < amount[0]; i++) {
                newArr.push(workingArray[from[0] - 1].pop());

            }
            newArr.reverse()
            for (i = 0; i < newArr.length; i++) {
                workingArray[to[0] - 1].push(newArr[i]);
            }
        }
    });

    // SOLUTION returning last of each array in working array 
    let finalString = "";
    for (i = 0; i < workingArray.length; i++) {
        finalString = finalString + workingArray[i].pop();
    }
    console.log(finalString);
}
part2(crates);