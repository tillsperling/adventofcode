//@ts-ignore
import * as fs from "fs";

/*  Notes Part 1
    
    With the binary input we need to generate 2 new binary numbers
    gamma rate and epsilon rate

    Gamma Rate
    Most Common value of the verticals / rows of the number

    Epsilon Rate
    Least Common value of the verticals / rows of the number

    Return the Consumption of Both
    Gamma * Epsilon

    We have to create x (length of textArr[0]) Arrays
    We push in the first array the index 0 of the line
    We push in the second array the index 1 of the line

    For each of the five arrays we count which bit is most common > this goes to gamma, the opposite likewise to epsilon

    we then convert the two variables gamma and epsilon to decimal
*/

/*  Notes Part 2
    
    We now need to multiply oxygen generator raing with CO2 scrubber rating

    To get the oxygen rating we need to check the most common in the first number
    keep all the other numbers that start with the most common number

    With the remaining numbers check the 2nd bit and keep only the numbers that have that bit in the second position

    and so on

    if its the same amount keep the number with a 1


    co2 is the same process but with the least appearing number
*/

// Handle input.txt and create array.
const text = fs.readFileSync("./input1.txt").toString("utf-8");

function part1(input: string) {
    // splitting into array of each number
    let textArr = input.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")
    const numberOfArraysNeeded: number = textArr[0].length;
    let gammaArr: any = [];
    let epsilonArr: any = [];

    // creating a array that holds all the created arrays
    let horizontalArr: any = createArray(numberOfArraysNeeded);

    // fill horizontals array
    for (let i = 0; i < textArr.length; i++) {
        for (let j = 0; j < horizontalArr.length; j++) {
            horizontalArr[j].push(textArr[i][j]);
        }
    }

    // each array in horizontal array should be 1 string
    for (let i = 0; i < horizontalArr.length; i++) {
        let string = horizontalArr[i].join('');
        horizontalArr.splice(i, 1, string);
        string = '';
    }

    // count which is more common 0 or 1
    for (let i = 0; i < horizontalArr.length; i++) {
        let count0 = 0;
        let count1 = 0;
        for (let j = 0; j < horizontalArr[i].length; j++) {
            if (horizontalArr[i][j] == 0) {
                count0++;
            } else {
                count1++;
            }
        }

        if (count0 > count1) {
            gammaArr.push('0');
            epsilonArr.push('1');
        } else {
            gammaArr.push('1');
            epsilonArr.push('0');
        }
    }

    let gamma = parseInt(gammaArr.join(''), 2);
    let epsilon = parseInt(epsilonArr.join(''), 2);

    return gamma * epsilon;
}

function part2(input: string) {
    // creating array
    let textArr = input.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")
    let oxygen: any = [];
    let co2: any = [];

    // check the most common number in nth palce
    let zeros: number = 0;
    let ones: number = 0;
    let counter: number = 0;

    // oxygen loop
    while (textArr.length > 1) {
        for (let i = 0; i < textArr.length; i++) {
            textArr[i][counter] == '1' ? ones++ : zeros++;
        }

        ones >= zeros ? textArr = createO2Array('1', counter, textArr) : textArr = createO2Array('0', counter, textArr)

        counter++;
        zeros = 0;
        ones = 0;
    }
    oxygen = parseInt(textArr[0], 2);

    console.log(textArr[0])
    console.log(oxygen);
    textArr = text.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")

    // co2 loop

    zeros = 0;
    ones = 0;
    counter = 0;

    while (textArr.length > 1) {
        for (let i = 0; i < textArr.length; i++) {
            textArr[i][counter] == '1' ? ones++ : zeros++;
        }

        ones >= zeros ? textArr = createO2Array('0', counter, textArr) : textArr = createO2Array('1', counter, textArr)

        counter++;
        zeros = 0;
        ones = 0;
    }

    console.log(textArr[0]);

    co2 = parseInt(textArr[0], 2);
    console.log(co2);
    return co2 * oxygen;
}



// console.log(part1(text));
console.log(part2(text));



function createArray(number: number) {
    let arr: any = [];

    for (let i = 0; i < number; i++) {
        arr.push([]);
    }

    return arr;
}

function createO2Array(string: string, position: number, array: any) {
    let returnArr: any = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][position] == string) {
            returnArr.push(array[i]);
        }
    }
    return returnArr;
}