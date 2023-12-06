//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    instructions: number[][];
    constructor(input: string) {
        this.input = input;
        this.instructions = [];
    }

    convertToArray(): number[][] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        // remove everything but numbers
        const regex = /[^0-9]/g;
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].replace(regex, ' ');
        }
        // parse to int
        let parsedArray: number[] = []
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.split(' ').length > 1) {
                const split = element.split(' ');
                for (let j = 0; j < split.length; j++) {
                    const num = parseInt(split[j]);
                    if (!isNaN(num)) {
                        parsedArray.push(num);
                    }
                }
                this.instructions.push(parsedArray);
                parsedArray = [];
            }
        }   
        return this.instructions;
    }
    convertToArrayPart2(): number[][] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        // remove everything but numbers
        const regex = /[^0-9]/g;
        const numberArray: number[][] = [];
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].replace(regex, '');
            numberArray.push([parseInt(array[i])]);
        }
        return numberArray;
    }
}