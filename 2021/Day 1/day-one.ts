//@ts-ignore
import * as fs from "fs";

// Handle input.txt and create array.
const text = fs.readFileSync("./input1.txt").toString("utf-8");
// Sonar detects the depths around the submarine. 
// Count how often the depths gets deeper than the deepest before. 
// Return amount of times

// Put depths in array
function part1(input: string) {
    let textArr = input.toString().replace(/\r/g, "").split("\n");
    let ans: number = 0;
    let placeholder: number = 0;
    for (let i = 0; i < textArr.length; i++) {
        if (i === 0) {
            console.log('first iteration');
            placeholder = Number(textArr[i]);
            continue;
        } else if (Number(textArr[i]) == placeholder) {
            continue;
        } else if (Number(textArr[i]) > placeholder) {
            console.log(Number(textArr[i]) + ' is bigger than ' + placeholder);
            ans++;
        }
        placeholder = Number(textArr[i]);
    }
    return ans;
}

function part2(input: string) {
    let textArr = text.toString().replace(/\r/g, "").split("\n");
    let ans: number = 0;
    let placeholder1: number = 0;
    let placeholder2: number = 0;
    for (let i = 3; i < textArr.length; i++) {
        placeholder1 = Number(textArr[i - 1]) + Number(textArr[i - 2]) + Number(textArr[i - 3]);
        placeholder2 = Number(textArr[i]) + Number(textArr[i - 1]) + Number(textArr[i - 2]);
        if (placeholder1 < placeholder2) {
            ans++;
        }
    }

    return ans;
}
// console.log(part1(text1));
console.log(part2(text));