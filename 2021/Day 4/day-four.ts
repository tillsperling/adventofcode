//@ts-ignore
import * as fs from "fs";

/*  Notes Part 1

    put first string into array which is used to check for matches

    put each 5x5 into a single array consisting of 10 arrays

    each element has to be a number and a 0 for unmarked and 1 for marked

    if one array is all ones put that array of 10 into a winner array
    also mark the number that made it win 

    sum of all unmarked numbers in that array times the number that made it win

*/

/*  Notes Part 2
*/

// Handle input.txt and create array.
const text = fs.readFileSync("./input1.txt").toString("utf-8");

function part1(input: string) {
    // splitting into array of each number
    let textArr = input.toString().replace(/\r/g, "").split("\n")
    // console.log(textArr);
    let drawnNumbers: any = [textArr.shift()];
    let bingoSheets: any = [];
    let bingoSheetsClean: any = [];
    let placeholderArr: any = [];
    // create subarray for each sheet
    for (let i = 0; i < textArr.length; i++) {
        // remove empty lines between arrays
        if (textArr[i] == '') {
            textArr.splice(i, 1);
        }
        // push placeholder if it has 5 inputs, is not null or is the last iteration
        if (i === textArr.length - 1) {
            placeholderArr.push(textArr[i]);
            bingoSheets.push(placeholderArr);
            break;
        } else if (i % 5 === 0 && i != 0) {
            bingoSheets.push(placeholderArr);
            placeholderArr = [];
            placeholderArr.push(textArr[i]);

        } else if (i % 5 != 0 || i == 0) { // fill placeholder up to 5 entries
            placeholderArr.push(textArr[i]);
        }
    }
    // convert every part to a number
    for (let i = 0; i < bingoSheets.length; i++) {
        for (let j = 0; j < bingoSheets[i].length; j++) {
            // splice the part where at and replace with a split string map number
            bingoSheets[i].splice(j, 1, bingoSheets[i][j].trim().split(/\s+/).map(Number));
            // console.log(bingoSheets[i][j])
        }
    }
    console.log(bingoSheets);
    // console.log(drawnNumbers);
    // console.log(bingoSheets);
}


function part2(input: string) {
    // creating array
    let textArr = input.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")
}



console.log(part1(text));
// console.log(part2(text));
