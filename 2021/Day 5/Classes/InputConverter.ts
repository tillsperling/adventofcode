//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }
    convertToString() {
        const text = fs.readFileSync(this.input).toString("utf-8");
        const cleanOutput = this.#inputCleaner(text);
        return cleanOutput;
    }
    #inputCleaner(text: string) {
        const lines = text.split("\n");
        const arrays = lines.map((line) => line.split(/,| -> /)).map((line) => line.map((item) => Number(item.trim())));
        return arrays;
    }
}