//@ts-ignore
import * as fs from "fs";

export default class ConverInput {
    input: string;

    constructor(input: string) {
        this.input = input;
    }

    convertToArray(): number[] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.split(',').map(item => parseInt(item));
        return array;
    }
}