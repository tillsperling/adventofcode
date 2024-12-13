//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    createGrid(): string[][] {
        const string: string = this.#turnInputIntoString()
        const array: string[][] = string.replace(/\r/g, "").split('\n').map(element => element.split(''))
        return array
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}