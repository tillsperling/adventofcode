import Card from "../types/Card";

export default class CardCreator {
    array: number[][][];

    constructor(array: number[][][]) {
        this.array = array;
    }
    createCards(): Card[] {
        const cards: Card[] = [];
        for (let i = 0; i < this.array.length; i++) {
            const card: Card = {
                card: i + 1,
                winningNumbers: this.array[i][0],
                drawnNumbers: this.array[i][1],
                result: this.#getResults(this.array[i][0], this.array[i][1])
            }
            cards.push(card);
        }
        return cards;
    }

    #getResults(winning: number[], drawn: number[]): number {
        let res = 0;
        for (let number of drawn) {
            for (let win of winning) {
                if (number === win) {
                    if (res === 0) {
                        res = 1;
                    } else {
                        res = res * 2;
                    }
                }
            }
        }
        return res;
    }
}