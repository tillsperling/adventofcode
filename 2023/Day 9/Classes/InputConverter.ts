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
        const numberArray = array.map((value): any => {
            const split = value.split(' ');
            const parsed = split.map((value): number => {
                return parseInt(value);
            });
            return parsed;
        });
        return numberArray;
    }
}