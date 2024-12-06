//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    createInputOne(): [string[][], number[]] {
        const string = this.#turnInputIntoString();
        const arrays = string.replace(/\r/g, "").split("\n");
        const splitArrays = arrays.map((arr) => arr.split(""));
        const initialGuardPosition = this.#getGuardPosition(splitArrays);
        return [splitArrays, initialGuardPosition];
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }

    #getGuardPosition(arr: string[][]): number[] {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes("^")) {
                return [i, arr[i].indexOf("^")];
            }
        }
    };
}