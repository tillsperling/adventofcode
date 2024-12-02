//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    turnInputIntoArrays() {
        const string = this.#turnInputIntoString();
        const lines = string.replace(/\r/g, "").split("\n");
        const arrayOfStrings: string[][] = []
        const arrayOfNumbers: number[][] = []
        for (let line of lines) {
            const lineArray = line.split(" ").map(element => parseInt(element));
            arrayOfNumbers.push(lineArray);
        }
        return arrayOfNumbers;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}