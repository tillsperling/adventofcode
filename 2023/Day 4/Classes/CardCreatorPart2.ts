import Card from "../types/Card";

export default class CardCreatorPart2 {
    array: number[][][];
    cards: Card[];
    recursionArray: Card[];

    constructor(array: number[][][]) {
        this.array = array;
        this.cards = [];
        this.recursionArray = [];
    }
    createCards() {
        for (let i = 0; i < this.array.length; i++) {
            const card: Card = {
                card: i + 1,
                winningNumbers: this.array[i][0],
                drawnNumbers: this.array[i][1],
                result: this.#getResults(this.array[i][0], this.array[i][1])
            }
            this.cards.push(card);
        }
        this.#fillWinningCardsProp(this.cards);
        return this.cards;
    }

    #getResults(winning: number[], drawn: number[]): number {
        let res = 0;
        for (let number of drawn) {
            for (let win of winning) {
                if (number === win) {
                    res++
                }
            }
        }
        return res;
    }

    #fillWinningCardsProp(array: Card[]) {
        for (let card of array) {
            card.winsCards = [];
            for (let i = 0; i < card.result; i++) {
                const numberOfNewCard = card.card + 1 + i
                const winningCard = this.#searchCardObject(numberOfNewCard)
                card.winsCards.push(winningCard.card);
            }
        }
    }

    #searchCardObject(number: number): Card {
        const win = this.cards.filter(object => {
            return object.card === number
        })
        // console.log(`winning card = ${win[0].card}`)
        return win[0]
    }
}