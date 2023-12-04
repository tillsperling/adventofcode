import Card from "../types/Card";

export default class AmountGenerator {
    cards: Card[];
    arrayLength: number;
    cardsBeingPulled: number[][];

    constructor(cards: Card[]) {
        this.cards = cards;
        this.arrayLength = this.cards.length;
        this.cardsBeingPulled = [];
    }

    generateAmount() {
        const cardsAmountArray: number[] = new Array(this.arrayLength).fill(0);
        // fill array with amount of cards that we have
        for (let card of this.cards) {
            cardsAmountArray[card.card - 1]++
            if (card.winsCards !== undefined && card.winsCards.length > 0) {
                this.cardsBeingPulled?.push(card.winsCards)
            } else {
                this.cardsBeingPulled?.push([0])
            }
        }

        for (let i = 0; i < this.arrayLength; i++) {
            const current = this.cardsBeingPulled[i];
            for (let card of current) {
                if (card !== 0) {
                    cardsAmountArray[card - 1] += cardsAmountArray[i]
                }
            }
        }

        console.log(cardsAmountArray.reduce((a, b) => a + b, 0));
    }
}