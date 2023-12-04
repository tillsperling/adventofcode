import Card from "../types/Card";

export default class ResultsGetter {
    array: Card[];

    constructor(array: Card[]) {
        this.array = array
    }

    sum(): number {
        let sum = 0;
        for (let card of this.array) {
            sum += card.result;
        }
        return sum;
    }
}