import * as fs from 'fs';
import { ArrayAndXPositions } from '../Types/ArrayAndXPositions';

export default class InputConverter {
    input: string;
    resultArray: string[][];
    xPositions: Map<number, number[]>;
    aPositions: Map<number, number[]>;

    constructor(input: string) {
        this.input = input;
        this.resultArray = [];
        this.xPositions = new Map();
        this.aPositions = new Map();
    }

    convertToArrays(): ArrayAndXPositions {
        const string = this.#turnInputIntoString();
        const arrays = string.replace(/\r/g, '').split('\n');
        for (const arr of arrays) {
            this.resultArray.push(arr.split(''));
        }
        this.#fillXPositions();
        this.#fillAPositions();
        return {
            arrays: this.resultArray,
            xPositions: this.xPositions,
            aPositions: this.aPositions,
        };
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }

    #fillXPositions() {
        let count = 0;
        for (let i = 0; i < this.resultArray.length; i++) {
            for (let j = 0; j < this.resultArray[i].length; j++) {
                if (this.resultArray[i][j] === 'X') {
                    count++;
                    this.xPositions.set(count, [i, j]);
                }
                
            }
        }
    }

    #fillAPositions() {
        let count = 0;
        for (let i = 0; i < this.resultArray.length; i++) {
            for (let j = 0; j < this.resultArray[i].length; j++) {
                if (this.resultArray[i][j] === 'A') {
                    count++;
                    this.aPositions.set(count, [i, j]);
                }
                
            }
        }
    }
}