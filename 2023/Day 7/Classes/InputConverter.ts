//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    instructions: number[][];
    constructor(input: string) {
        this.input = input;
    }

    convertToArray(): any[][] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const stringArray = string.replace(/\r/g, "").split('\n');
        const cardArray: any[][] = [];
        for (let i = 0; i < stringArray.length; i++) {
            const element: string[] = stringArray[i].split(' ');
            cardArray.push(element);
        }
        for (let i = 0; i < cardArray.length; i++) {
            const handArray: number[] = [];
            for (let card of cardArray[i][0]) {
                if (card === 'T') {
                    card = '10';
                } else if (card === 'J') {
                    card = '11';
                } else if (card === 'Q') {
                    card = '12';
                }
                else if (card === 'K') {
                    card = '13';
                }
                else if (card === 'A') {
                    card = '14';
                }
                handArray.push(parseInt(card));
            }
            cardArray[i][0] = handArray;
            const bid = cardArray[i].pop();
            cardArray[i].push(parseInt(bid));
        }
        return cardArray;
    }
}