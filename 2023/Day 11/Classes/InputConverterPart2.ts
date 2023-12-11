//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    expandedRows: number[];
    expandedColumns: number[];

    constructor(input: string) {
        this.input = input;
        this.expandedRows = []
        this.expandedColumns = []
    }

    convertToArray(): [Map<string, string>, number[], number[]] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array: string[] = string.replace(/\r/g, "").split('\n');
        const stringArray: string[][] = [];
        for (let string of array) {
            stringArray.push(string.split(''));
        }
        this.#expand(stringArray)
        const galaxyMap = this.#createGalaxyMap(stringArray)
        return [galaxyMap, this.expandedRows, this.expandedColumns];
    }

    #expand(array: string[][]) {
        // expand horizontally
        for (let i = 0; i < array.length; i++) {
            const row = array[i];
            let empty = true;
            for (let j = 0; j < row.length; j++) {
                const element = row[j];
                if (element === '#') {
                    empty = false;
                }
            }
            if (empty) {
                this.expandedColumns.push(i)
                i++
            }
        }
        // expand vertically
        for (let i = 0; i < array[0].length; i++) {
            let empty = true;
            for (let j = 0; j < array.length; j++) {
                const element = array[j][i];
                if (element === '#') {
                    empty = false;
                }
            }
            if (empty) {
                this.expandedRows.push(i)
                i++
            }
        }
    }

    #createGalaxyMap(array: string[][]): Map<string, string> {
        const galaxyMap: Map<string, string> = new Map();
        for (let i = 0; i < array.length; i++) {
            const row = array[i];
            for (let j = 0; j < row.length; j++) {
                const element = row[j];
                if (element === '#') {
                    galaxyMap.set(`${i},${j}`, element);
                }
            }
        }
        return galaxyMap;
    }
}