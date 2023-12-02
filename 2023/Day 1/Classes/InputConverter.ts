//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }
    convertToArray(): string[] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        return array;
    }
}