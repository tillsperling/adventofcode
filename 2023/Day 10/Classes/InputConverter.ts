//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    instructions: number[][];
    constructor(input: string) {
        this.input = input;
        this.instructions = [];
    }

    convertToArray(): string[][] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        const characterArray: string[][] = [];
        for (let string of array) {
            string = '.' + string + '.'
            characterArray.push(string.split(''));
        }
        const fillerArray = Array(characterArray[0].length).fill('.')
        characterArray.push(fillerArray)
        characterArray.splice(0, 0, fillerArray)
        return characterArray
    }
}