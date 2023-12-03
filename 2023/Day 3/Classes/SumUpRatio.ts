import GearObject from "../types/GearObject";

export default class SumUpRatio {

    array: GearObject[];
    sum: number;

    constructor(array: GearObject[]) {
        this.array = array
        this.sum = 0
    }

    add(): number {
        for (let object of this.array) {
            if (object.isGear) {
                this.sum += object.ratio
            }
        }
        return this.sum;
    }
}