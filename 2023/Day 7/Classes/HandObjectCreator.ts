import Hand from "../types/Hand";

export default class HandObjectCreator {
    input: any[][];
    objects: Hand[];

    constructor(input: any[][]) {
        this.input = input;
        this.objects = [];
    }

    createObjects() {
        for (let i = 0; i < this.input.length; i++) {
            const newHandObject = this.#createHandObject(this.input[i][0], this.input[i][1]);
        }
        return this.objects;
    }

    #createHandObject(hand: number[], bid: number) {
        const type = this.#findType(hand);
        const newHandObject: Hand = {
            type: type,
            cards: hand,
            bid: bid,
            rank: -1
        }
        this.objects.push(newHandObject);
    }

    #findType(hand: number[]): string {
        const fullString = hand.flat();


        const charCount: { [key: number]: number } = {};
        fullString.forEach((char: number) => {
            charCount[char] = (charCount[char] || 0) + 1;
        });

        const countCount: { [key: number]: number } = {};
        Object.values(charCount).forEach((count: number) => {
            countCount[count] = (countCount[count] || 0) + 1;
        });

        if (countCount[5]) {
            return "Five of a kind";
          } else if (countCount[4]) {
            return "Four of a kind";
          } else if (countCount[3] && countCount[2]) {
            return "Full house";
          } else if (countCount[3]) {
            return "Three of a kind";
          } else if (countCount[2] === 2) {
            return "Two pairs";
          } else if (countCount[2] === 1) {
            return "One pair";
          } else {
            return "High card";
          }
    }
}