import NumberObject from "../types/NumberObject";

export default class SumGetter {

    array: NumberObject[];
    sum: number;

    constructor(array: NumberObject[]) {
        this.array = array
        this.sum = 0
    }

    add(): number {
        for (let object of this.array) {
            if (object.isPartNumber) {
                this.sum += object.number
            }
        }
        return this.sum;
    }
}