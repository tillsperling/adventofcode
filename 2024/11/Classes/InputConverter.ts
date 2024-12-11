//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    createArrayFromInput(): number[] {
        const string = this.#turnInputIntoString();
        const array = string.split(' ').map(item => parseInt(item));
        return array;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}