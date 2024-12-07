//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    solutionsAndEquation: number[][][]

    constructor(input: string) {
        this.input = input;
        this.solutionsAndEquation = []
    }

    createArrays(): number[][][] {
        const string = this.#turnInputIntoString();
        const arrays = string.replace(/\r|:/g, "").split("\n")
        const subArrays = arrays.map((element) => element.split(' '))

        for (let arr of subArrays) {
            const equation: number[][] = [];
            let result = [parseInt(arr.shift())];
            let numbers = arr.map((element) => parseInt(element))

            equation.push(result)
            equation.push(numbers)

            this.solutionsAndEquation.push(equation)
        }

        return this.solutionsAndEquation
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }
}
