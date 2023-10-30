import BingoData from "../interface/bingoData";
import CardInfo from "../interface/cardInfo";

export default class SolveProblem {
    bingoData: BingoData;
    bingoCards: number[][][];
    drawn: number[];
    winningDraw: number;
    cardInfo: CardInfo;

    constructor(bingoData: BingoData, bingoCards: number[][][], drawn: number[], cardInfo: CardInfo) {
        this.bingoData = bingoData;
        this.bingoCards = bingoCards;
        this.drawn = drawn;
        this.winningDraw = drawn[cardInfo.lowestToBingo - 1]
        this.cardInfo = cardInfo;
    }

    solve(): number {
        // if horizontal
        if (this.cardInfo.type == 'horizontal') {
            return this.#getFinalScore(this.#findHorizontal());
        } else {
            return this.#getFinalScore(this.#findVertical());
        }
    }

    #findHorizontal(): number[][] {
        let losingCard: number[][] = [];
        for (const card of this.bingoCards) {
            for (let i = 0; i < card.length; i++) {
                if (card[i] == this.cardInfo.array) {
                    losingCard = card;
                }
            }
        }
        return losingCard;
    }

    #findVertical(): number[][] {
        let losingCard: number[][] = [];
        for (const card of this.bingoCards) {
            // create vertical array and compare
            const colArray: number[] = [];
            for (let col = 0; col < card[0].length; col++) {
                for (let row = 0; row < card.length; row++) {
                    colArray.push(card[row][col]);
                    if (colArray.length == 5) {
                        if (JSON.stringify(colArray) === JSON.stringify(this.cardInfo.array)) {
                            losingCard = card;
                        }
                        colArray.length = 0;
                    }
                }
            }
        }
        return losingCard;
    }

    #getFinalScore(array: number[][]): number {
        const splicedArray = this.#spliceArray(array);
        return this.#sumArrayContent(splicedArray) * this.winningDraw;
    }

    #spliceArray(array: number[][]) {
        const amount = this.cardInfo.lowestToBingo;
        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < array.length; j++) {
                for (let k = 0; k < array[j].length; k++) {
                    if (array[j][k] == this.drawn[i]) {
                        array[j].splice(k, 1);
                    }
                }
            }
        }
        return array;
    }

    #sumArrayContent(array: number[][]) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                sum += array[i][j];
            }
        }
        return sum;
    }
}