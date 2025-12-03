import * as fs from 'fs';
import { sortArrayLowToHigh } from '../../../utils/utils';

export default class InputConverter {
    input: string;

    constructor(input: string) {
        this.input = input;
    }


    splitInputIntoArraysAndSort() {
        const string = this.#turnInputIntoString();
        const lines = string.replace(/\r/g, '').split('\n');
        const arrays: number[][] = [[], []];
        for (let i = 0; i < lines.length; i++) {
            const linesArray = lines[i].split(' ');
            for (let j = 0; j < linesArray.length; j++) {
                if (j % 2 != 0) {
                    if (parseInt(linesArray[j])) {
                        arrays[1].push(parseInt(linesArray[j]));
                    }
                } else {
                    if (parseInt(linesArray[j])) {
                        arrays[0].push(parseInt(linesArray[j]));
                    }
                }
            }
        }
        for (const array of arrays) {
            sortArrayLowToHigh(array);
        }
        return arrays;
    }

    splitInputIntoArrays() {
        const string = this.#turnInputIntoString();
        const lines = string.replace(/\r/g, '').split('\n');
        const arrays: number[][] = [[], []];
        for (let i = 0; i < lines.length; i++) {
            const linesArray = lines[i].split(' ');
            for (let j = 0; j < linesArray.length; j++) {
                if (j % 2 != 0) {
                    if (parseInt(linesArray[j])) {
                        arrays[1].push(parseInt(linesArray[j]));
                    }
                } else {
                    if (parseInt(linesArray[j])) {
                        arrays[0].push(parseInt(linesArray[j]));
                    }
                }
            }
        }
        return arrays;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }
}