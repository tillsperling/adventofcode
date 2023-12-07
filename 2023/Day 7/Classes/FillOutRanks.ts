import Hand from "../types/Hand";

export default class FillOutRanks {
    rankArray: Hand[][];
    ranks: number;
    filledOutRanks: Hand[];

    constructor(rankArray: Hand[][], ranks: number) {
        this.rankArray = rankArray;
        this.ranks = 1;
        this.filledOutRanks = [];
    }

    fillOutRanks() {
        // console.log(this.rankArray)
        for (let i = this.rankArray.length - 1; i >= 0; i--) {
            const typeCollection: Hand[] = this.rankArray[i];
            if (typeCollection.length > 0) {
                this.#getRanksPerType(typeCollection);
            }
        }
        return this.filledOutRanks;
    }

    #getRanksPerType(typeCollection: Hand[]): void {
        // we have an amount of hands
        // we need to find the lowest rank by going through the cards
        // if we found the lowest hand we can  give it a rank value remove it and go again
        // if the collection is empty we return
        let lowestHand: Hand = typeCollection[0];
        // console.log(`starting loop lowest hand is ${lowestHand.cards}`);

        let cardCounter = 0;

        for (let i = 1; i < typeCollection.length; i++) {
            const hand = typeCollection[i];
            // console.log(`checking ${hand.cards} against currenct lowest ${lowestHand.cards}`);
            for (let i = 0; i < 5; i++) {
                if (hand.cards === lowestHand.cards) {
                    continue;
                } else if (hand.cards[cardCounter] === lowestHand.cards[cardCounter]) {
                    cardCounter++;
                    continue;
                } else if (hand.cards[cardCounter] < lowestHand.cards[cardCounter]) {
                    // console.log(`${hand.cards[cardCounter]} is lower than ${lowestHand.cards[cardCounter]} new lowest is ${hand.cards}`)
                    lowestHand = hand;
                    cardCounter = 0;
                    break
                } else if (hand.cards[cardCounter] > lowestHand.cards[cardCounter]) {
                    // console.log(`${hand.cards[cardCounter]} is higher than ${lowestHand.cards[cardCounter]} lowest stays ${lowestHand.cards}`)
                    cardCounter = 0;
                    break
                }
            }
        }
        lowestHand.rank = this.ranks;
        // console.log('lowestHand.cards', lowestHand.cards);
        this.filledOutRanks.push(lowestHand);
        this.ranks++;
        typeCollection.splice(typeCollection.indexOf(lowestHand), 1);
        if (typeCollection.length > 0) {
            return this.#getRanksPerType(typeCollection);
        }
        return
    }
}