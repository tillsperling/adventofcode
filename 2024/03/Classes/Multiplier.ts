import { sumUpArray } from "../../../utils/utils";

export default class Multiplier {
    input: number[][]
    sumArray: number[]

    constructor(input: number[][]) {
        this.input = input;
        this.sumArray = [];
    }

    init() {
        this.#multiplyAndAdd()
        return sumUpArray(this.sumArray)
    }

    #multiplyAndAdd() {
        for (let command of this.input) {
            const sum = command[0] * command[1];
            this.sumArray.push(sum);
        }
    }
}