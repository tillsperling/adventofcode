import Hand from "../types/Hand";

export default class SumUpRanks {
    ranks: Hand[];
    sum: number;

    constructor(ranks: Hand[]) {
        this.ranks = ranks;
        this.sum = 0;
    }

    sumRanks() {
        for (let i = 0; i < this.ranks.length; i++) {
            const rank = this.ranks[i].rank;
            const bid = this.ranks[i].bid;
            this.sum += bid * rank;
        }
        return this.sum;
    }
}