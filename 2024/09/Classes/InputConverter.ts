//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    indexCounter: number;
    inputMap: Map<number, number[]>

    constructor(input: string) {
        this.input = input;
        this.indexCounter = 0;
        this.inputMap = new Map();
    }

    createInputMap(): Map<number, number[]> {
        const string = this.#turnInputIntoString()
        const arr = string.replace(/\r/g, "").split("").map(element => parseInt(element))
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 != 0) {
                this.inputMap.set(i, new Array(arr[i]).fill('.'))
            } else {
                this.inputMap.set(i, new Array(arr[i]).fill(this.indexCounter))
                this.indexCounter++
            }
        }
        return this.inputMap;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}