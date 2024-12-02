//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}