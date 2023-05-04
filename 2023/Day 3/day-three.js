/*

1 rucksack
2 compartments
each line one rucksack
X items
x / 2 each
first half second half

1 item type cant be in both compartments
but 1 is
find the one
add priority of the one
if all is fine continue

Priorities
abcdefghijklmnopqrstuvwxyz 1-26
ABCDEFGHIJKLMNOPQRSTUVWXYZ 27-52

*/

// Read Input
const fs = require("fs");
let input = fs.readFileSync('input.txt').toString().split("\n");

// Variables
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const priorityMap = new Map();
let prioritySum = 0;

// Filling Maps with Value being Prio
for (i = 1; i < alphabet.length + 1; i++) {
    priorityMap.set(alphabet[i - 1], i);
}

// Function Part 1
function filterOutItem(arr) {
    for (i = 0; i < arr.length; i++) {
        // split up rucksack contents in half
        let first = arr[i].slice(0, arr[i].length / 2);
        let second = arr[i].slice(arr[i].length / 2, arr[i].length);

        // find similiar letter in both strings
        let letter;

        for (let i in first) {
            if (second.includes(first[i])) {
                letter = first[i];
            }
        }
        prioritySum = prioritySum + priorityMap.get(letter);
    }
}

/*

Groups of 3 elves
3 lines = 1 group
every line has a common item

New array with 3 lines each which is a group
parse this group with include for common item

*/

// create part 2 array
const inputArrayPartTwo = [];
let tempArray = [];

for (i = 0; i < input.length + 1; i++) {
    if (tempArray.length < 4) {
        tempArray.push(input[i]);
        if (tempArray.length == 3) {
            inputArrayPartTwo.push(tempArray);
            tempArray = [];
        }
    }
}

// Function Part 2
function findBadge(arr) {
    for (i = 0; i < arr.length; i++) {
        let first = arr[i][0].replace(/(\r\n|\n|\r)/gm, "");;
        let second = arr[i][1].replace(/(\r\n|\n|\r)/gm, "");;
        let third = arr[i][2].replace(/(\r\n|\n|\r)/gm, "");;

        // find similiar letter in all strings
        let letter;
        let tempLetter;

        for (let i in first) {
            if (second.includes(first[i])) {
                if (third.includes(first[i])) {
                    letter = first[i];
                }
            }
        }
        prioritySum = prioritySum + priorityMap.get(letter);
    }
}

findBadge(inputArrayPartTwo);
console.log(prioritySum);
// filterOutItem(input);
// console.log(prioritySum);
