import * as fs from 'fs';

export default class InputConverter {
    input: string;
    instructions: number[][];

    constructor(input: string) {
        this.input = input;
    }

    convertToArray(): [string[][], Map<string, string>] {
        const string = fs.readFileSync(this.input).toString('utf-8');
        const array = string.replace(/\r/g, '').split('\n');
        const characterArray: string[][] = [];
        for (let string of array) {
            string = '.' + string + '.';
            characterArray.push(string.split(''));
        }
        const fillerArray = Array(characterArray[0].length).fill('.');
        characterArray.push(fillerArray);
        characterArray.splice(0, 0, fillerArray);
        const dotMap = this.createMap(characterArray);
        return [characterArray, dotMap];
    }

    createMap(array: string[][]): Map<string, string> {
        const mapOfDots = new Map();
        for (let i = 0; i < array.length; i++) {
            let canBeInside = false;
            const row = array[i];
            for (let j = 0; j < row.length; j++) {
                const element = row[j];
                if (canBeInside && element === '.' && j === row.length - 1) {
                    const key = [i, j];
                    const keyString = key.toString();
                    mapOfDots.set(keyString, 'O');
                } else if (canBeInside && element === '.') {
                    const key = [i, j];
                    const keyString = key.toString();
                    mapOfDots.set(keyString, '.');
                } else if (element === '.' && canBeInside) {
                    const key = [i, j];
                    const keyString = key.toString();
                    mapOfDots.set(keyString, 'O');
                } else if (!canBeInside && element !== '.') {
                    canBeInside = true;
                } else {
                    mapOfDots.set([i, j].toString(), 'O');
                }
            }
        }
        console.log(mapOfDots);
        return mapOfDots;
    }
}