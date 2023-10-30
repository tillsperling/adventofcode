import BingoData from "../interface/bingoData";
import SolveProblem from "./SolveProblem";

export default class PlayBingo {

    drawn: number[];
    bingoCards: number[][][];
    lowestDrawnToFinish: number;
    bingoData: BingoData;

    constructor(drawn: number[], bingoCards: number[][][], lowestDrawnToFinish: number) {
        this.drawn = drawn;
        this.bingoCards = bingoCards;
        this.lowestDrawnToFinish = lowestDrawnToFinish;
        this.bingoData = {
            bingo: false,
            lowestDrawnToFinish: this.lowestDrawnToFinish,
            type: '',
            array: []
        }
    }

    play(): number {
        for (const card of this.bingoCards) {
            // play horizontal
            this.#playHorizontal(card);
            // play vertical
            this.#playVertical(card);
        }
        return this.#solveProblem(this.bingoData);
    }

    #playHorizontal(card: number[][]) {
        const type = 'horizontal';
        for (let i = 0; i < card.length; i++) {
            this.#checkForBingo(card[i], type);
        }
    }

    #playVertical(card: number[][]) {
        const type = 'vertical';
        const colArray: number[] = [];

        for (let col = 0; col < card[0].length; col++) {
            for (let row = 0; row < card.length; row++) {
                colArray.push(card[row][col]);

                if (colArray.length == 5) {
                    this.#checkForBingo(colArray, type);
                    colArray.length = 0;
                }
            }
        }
    }

    #solveProblem(bingoData: BingoData) {
        const solve = new SolveProblem(bingoData, this.bingoCards, this.drawn).solve();
        return solve;
    }

    #checkForBingo(array: number[], type: string) {
        let bingoCounter = 0;
        for (let i = 0; i < this.drawn.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (this.drawn[i] == array[j]) {
                    bingoCounter++;
                    if (bingoCounter == 5) {
                        if (i < this.lowestDrawnToFinish) {
                            this.lowestDrawnToFinish = i + 1;
                            this.bingoData.lowestDrawnToFinish = this.lowestDrawnToFinish;
                            this.bingoData.bingo = true;
                            this.bingoData.type = type;
                            this.bingoData.array = array;
                        }
                    }
                }
            }
        }
    }
}