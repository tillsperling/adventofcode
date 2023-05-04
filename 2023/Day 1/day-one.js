// Handle input.txt and create array.
const fs = require("fs");
const text = fs.readFileSync("./input.txt").toString("utf-8");
// pushes contents of input.txt as strings into array
const stringArray = text.split("\n");
const numberArray = [];
const finalArray = [];

// convert stringArray into numberArray
for (i = 0; i < stringArray.length; i++) {
    numberArray.push(Number(stringArray[i]));
}

// function to push each calories of the
function pushInNewArray(arr) {
    let tempArr = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            tempArr.push(arr[i]);
        } else {
            finalArray.push(tempArr);
            tempArr = [];
        }
    }
}

// Call function to fill number array
pushInNewArray(numberArray);

// Add each subarray to get calories per person and add values to map
const map = new Map();
let temp = 0;

for (i = 0; i < finalArray.length; i++) {
    for (j = 0; j < finalArray[i].length; j++) {
        temp = temp + finalArray[i][j];
    }
    map.set(i + 1, temp);
    temp = 0;
}

// find highest value in map

const max = [...map.entries()].reduce((a, e) => (e[1] > a[1] ? e : a));
console.log(max);

// sort map from highest to lower

const mapSort = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

// pushing first 3 entry values of sorted map to new array

const highestThree = [];
for (i = 0; i < 3; i++) {
    highestThree.push(Array.from(mapSort.values())[i]);
}

console.log(highestThree);

// logging the added value of the first 3 in sorted map
let threecombined = 0;
for (i = 0; i < highestThree.length; i++) {
    threecombined = threecombined + highestThree[i];
}

console.log(threecombined);