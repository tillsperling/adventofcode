//@ts-ignore
import * as fs from "fs";

// Handle input.txt and create array.
const text = fs.readFileSync("./input1.txt").toString("utf-8");

function part1(input: string) {
    // splitting instruction in array [direction, value], [direction, value]
    let textArr = input.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")
    let placeholderArr: any = [];
    let finalArr: any = [];
    // putting each command in a single array
    for (let i: number = 0; i < textArr.length; i++) {
        // wenn placeholder leer push string
        if (placeholderArr.length == 0) {
            placeholderArr.push(textArr[i]);
            // wenn placeholder 1 push number
        } else if (placeholderArr.length == 1) {
            placeholderArr.push(Number(textArr[i]));

            // wenn placeholderArr hier voll wird und i == arr.length - 1 ist push
            if (i == (textArr.length - 1) && placeholderArr.length == 2) {
                finalArr.push(placeholderArr);
                placeholderArr = [];
            }

            // wenn placeholder 2 push es in finalArr und leere und fuelle
        } else if (placeholderArr.length == 2) {
            finalArr.push(placeholderArr);
            placeholderArr = [];
            placeholderArr.push(textArr[i]);
        }
    }

    // define horizontal and depth variable and fill them with the values in the finalArr
    let horizontal: number = 0;
    let depth: number = 0;

    for (let i: number = 0; i < finalArr.length; i++) {
        if (finalArr[i][0] == 'forward') {
            horizontal += finalArr[i][1];
        }
        if (finalArr[i][0] == 'down') {
            depth += finalArr[i][1];
        }
        if (finalArr[i][0] == 'up') {
            depth -= finalArr[i][1];
        }
    }
    return horizontal * depth;
}



function part2(input: string) {
    // splitting instruction in array [direction, value], [direction, value]
    let textArr = input.toString().replace(/\r/g, " ").replace(/\n/g, "").split(" ")
    let placeholderArr: any = [];
    let finalArr: any = [];
    // putting each command in a single array
    for (let i: number = 0; i < textArr.length; i++) {
        // wenn placeholder leer push string
        if (placeholderArr.length == 0) {
            placeholderArr.push(textArr[i]);
            // wenn placeholder 1 push number
        } else if (placeholderArr.length == 1) {
            placeholderArr.push(Number(textArr[i]));

            // wenn placeholderArr hier voll wird und i == arr.length - 1 ist push
            if (i == (textArr.length - 1) && placeholderArr.length == 2) {
                finalArr.push(placeholderArr);
                placeholderArr = [];
            }

            // wenn placeholder 2 push es in finalArr und leere und fuelle
        } else if (placeholderArr.length == 2) {
            finalArr.push(placeholderArr);
            placeholderArr = [];
            placeholderArr.push(textArr[i]);
        }
    }

    // define horizontal and depth variable and fill them with the values in the finalArr
    let horizontal: number = 0;
    let depth: number = 0;
    let aim: number = 0;

    for (let i: number = 0; i < finalArr.length; i++) {
        if (finalArr[i][0] == 'forward') {
            horizontal += finalArr[i][1];
            depth += (aim * finalArr[i][1]);
        }
        if (finalArr[i][0] == 'down') {
            aim += finalArr[i][1];
        }
        if (finalArr[i][0] == 'up') {
            aim -= finalArr[i][1];
        }
    }
    return horizontal * depth;
}



// console.log(part1(text));
console.log(part2(text));