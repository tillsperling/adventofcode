//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input;
    constructor(input) {
        this.input = input;
    }
    convertToString() {
        const text = fs.readFileSync(this.input).toString("utf-8");
        const cleanOutput = this.#inputCleaner(text);
        return cleanOutput;
    }
    #inputCleaner(text) {
        return text.replace(/''|\r/g, "").split("\n");
    }
}