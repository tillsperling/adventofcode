//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    convertToArray(): number[][][] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        const stringArray: string[][] = [];
        for (let i = 0; i < array.length; i++) {
            stringArray.push(array[i].replace(/^.*?:\s/, '').replace(' | ', '*').split('*'))
    
        }
        const singleStringArray: string[][] = [];
        for (let i = 0; i < stringArray.length; i++) {
            for (let j = 0; j < stringArray[i].length; j++) {
                singleStringArray.push(stringArray[i][j].split(' '))
            }
    
        }
        const game: number[][][] = [];
        let card: number[][] = [];
        for (let i = 0; i < singleStringArray.length; i++) {
            const temp: number[] = [];
            for (let j = 0; j < singleStringArray[i].length; j++) {
                if (singleStringArray[i][j] === '') continue;
                temp.push(parseInt(singleStringArray[i][j]))
            }
            if (card.length === 2) {
                game.push(card);
                card = [];
            } else if (i === singleStringArray.length - 1 && card.length === 1) {
                card.push(temp);
                game.push(card);
                card = [];
            }
            card.push(temp);
        }
        // console.log(game)
        return game;
    }
}