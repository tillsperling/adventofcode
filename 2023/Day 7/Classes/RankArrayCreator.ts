import Hand from "../types/Hand";

export default class RankArrayCreator {
    objects: Hand[];
    rankArray: any[];
    amountOfHands: number;

    constructor(objects: Hand[]) {
        this.objects = objects;
        this.rankArray = [[], [], [], [], [], [], []];
        this.amountOfHands = this.objects.length;
    }

    fillRankArray() {
        for (let hand of this.objects) {
            // console.log(hand)
            if (hand.type === "Five of a kind") {
                this.rankArray[0].push(hand);
            } else if (hand.type === "Four of a kind") {
                this.rankArray[1].push(hand);
            } else if (hand.type === "Full house") {
                this.rankArray[2].push(hand);
            } else if (hand.type === "Three of a kind") {
                this.rankArray[3].push(hand);
            } else if (hand.type === "Two pairs") {
                this.rankArray[4].push(hand);
            } else if (hand.type === "One pair") {
                this.rankArray[5].push(hand);
            } else if (hand.type === "High card") {
                this.rankArray[6].push(hand);
            }
        }
        return this.rankArray;
    }
}