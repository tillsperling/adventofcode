import BingoData from "../interface/bingoData";
import CardInfo from "../interface/cardInfo";
import SolveProblem from "./SolveProblem";

export default class PlayBingo {

    drawn: number[];
    bingoCards: number[][][];
    lowestDrawnToFinish: number;
    bingoData: BingoData;
    amountOfCards: number;
    cardInfo: CardInfo;

    constructor(drawn: number[], bingoCards: number[][][], highestDrawnToFinish: number) {
        this.drawn = drawn;
        this.bingoCards = bingoCards;
        this.lowestDrawnToFinish = highestDrawnToFinish;
        this.bingoData = {
            bingo: false,
            lowestDrawnToFinish: this.lowestDrawnToFinish,
            type: '',
            array: []
        }
        this.amountOfCards = bingoCards.length;
        this.cardInfo = {
            lowestToBingo: 0,
            bingo: false,
            array: [],
            type: ''
        };
    }

    play(): number {
        for (const card of this.bingoCards) {
            let cardInfo = {
                lowestToBingo: 9999999999,
                bingo: false,
                array: [],
                type: ''
            }
            // play horizontal
            this.#playHorizontal(card, cardInfo);
            // play vertical
            this.#playVertical(card, cardInfo);
            if (cardInfo.lowestToBingo > this.cardInfo.lowestToBingo) {
                this.cardInfo = cardInfo;
            }
        }
        return this.#solveProblem(this.bingoData);
    }

    #playHorizontal(card: number[][], cardInfo: CardInfo) {
        const type = 'horizontal';
        for (let i = 0; i < card.length; i++) {
            this.#checkForBingo(card[i], type, cardInfo);
        }
    }

    #playVertical(card: number[][], cardInfo: CardInfo) {
        const type = 'vertical';
        for (let col = 0; col < card[0].length; col++) {
            const colArray: number[] = []; // Create a new array for each column
            for (let row = 0; row < card.length; row++) {
                colArray.push(card[row][col]);
            }
            this.#checkForBingo(colArray, type, cardInfo);
        }
    }

    #solveProblem(bingoData: BingoData) {
        const solve = new SolveProblem(bingoData, this.bingoCards, this.drawn, this.cardInfo).solve();
        return solve;
    }

    #checkForBingo(array: number[], type: string, cardInfo: CardInfo) {
        let bingoCounter = 0;
        for (let i = 0; i < this.drawn.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (this.drawn[i] == array[j]) {
                    bingoCounter++;
                    if (bingoCounter == 5) {
                        if (i < cardInfo.lowestToBingo) {
                            cardInfo.lowestToBingo = i + 1;
                            cardInfo.bingo = true;
                            cardInfo.array = array;
                            cardInfo.type = type;
                        }
                        if (i < this.lowestDrawnToFinish) {
                            this.lowestDrawnToFinish = i + 1;
                            this.bingoData.lowestDrawnToFinish = this.lowestDrawnToFinish;
                            this.bingoData.bingo = true;
                            this.bingoData.type = type;
                            this.bingoData.array = array;

                        }
                    } else {
                        continue
                    }
                }
            }
        }
    }
}