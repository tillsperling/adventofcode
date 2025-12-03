import * as fs from 'fs';

export default class InputConverter {
    input: string;

    constructor(input: string) {
        this.input = input;
    }

    convert() {
        const string = this.#turnInputIntoString();
        const [stringGrid, coords] = string.replace(/\r/g, '').split('\n\n');
        const coordinateArray = coords.split('');
        const wallMap = new Map();
        const boxMap = new Map();
        const emptyMap = new Map();
        const robotPosition: number[] = [];

        const arrayGrid = stringGrid.split('\n').map(element => element.split(''));

        for (let i = 0; i < arrayGrid.length; i++) {
            for (let j = 0; j < arrayGrid[i].length; j++) {
                if (arrayGrid[i][j] === '#') {
                    wallMap.set(JSON.stringify([i, j]), true);
                }
                if (arrayGrid[i][j] === 'O') {
                    boxMap.set(JSON.stringify([i, j]), true);
                }
                if (arrayGrid[i][j] === '.') {
                    emptyMap.set(JSON.stringify([i, j]), true);
                }
                if (arrayGrid[i][j] === '@') {
                    robotPosition.push(i);
                    robotPosition.push(j);
                }
            }
        }

        return [coordinateArray, wallMap, boxMap, emptyMap, robotPosition];
    }

    convertPartTwo() {
        const string = this.#turnInputIntoString();
        const [stringGrid, coords] = string.replace(/\r/g, '').split('\n\n');
        const coordinateArray = coords.split('');

        // create doubleSizedStringGrid
        const doubleSizedStringGrid = stringGrid.split('\n').map(element => {
            let newElement = '.';
            for (let i = 0; i < element.length; i++) {
                if (element[i] === '#') {
                    newElement += '##';
                }
                if (element[i] === 'O') {
                    newElement += '[]';
                }
                if (element[i] === '.') {
                    newElement += '..';
                }
                if (element[i] === '@') {
                    newElement += '@.';
                }
            }
            return newElement;
        });

        const wallMap = new Map();
        const boxMap = new Map();
        const emptyMap = new Map();
        const robotPosition: number[] = [];

        const arrayGrid = doubleSizedStringGrid.map(element => element.split(''));


        for (let i = 0; i < arrayGrid.length; i++) {
            arrayGrid[i].shift();
        }

        for (let i = 0; i < arrayGrid.length; i++) {
            for (let j = 0; j < arrayGrid[i].length; j++) {
                if (arrayGrid[i][j] === '#') {
                    wallMap.set(JSON.stringify([i, j]), true);
                }
                if (arrayGrid[i][j] === '[') {
                    boxMap.set(JSON.stringify([i, j]), 'left');
                }
                if (arrayGrid[i][j] === ']') {
                    boxMap.set(JSON.stringify([i, j]), 'right');
                }
                if (arrayGrid[i][j] === '.') {
                    emptyMap.set(JSON.stringify([i, j]), true);
                }
                if (arrayGrid[i][j] === '@') {
                    robotPosition.push(i);
                    robotPosition.push(j);
                }
            }
        }

        return [coordinateArray, wallMap, boxMap, emptyMap, robotPosition];
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }
}