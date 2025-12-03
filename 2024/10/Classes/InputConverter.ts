import * as fs from 'fs';

export default class InputConverter {
    input: string;
    grid: number[][];
    trailheadMap: Map<number, number[]>;
    peakMap: Map<number, number[]>;

    constructor(input: string) {
        this.input = input;
        this.grid = [];
        this.trailheadMap = new Map();
        this.peakMap = new Map();
    }

    createGrid(): [number[][], Map<number, number[]>, Map<number, number[]>] {
        const string = this.#turnInputIntoString();
        this.grid = string.replace(/\r/g, '').split('\n').map(element => (element.split('').map(Number)));
        this.#fillMaps();
        return [this.grid, this.trailheadMap, this.peakMap];
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }

    #fillMaps() {
        let trailheadCount = 0;
        let peakCount = 0;
        for (let i = 0; i < this.grid.length; i++) {
            for (let k = 0; k < this.grid[i].length; k++) {
                if (this.grid[i][k] === 0) {
                    this.trailheadMap.set(trailheadCount, [i, k]);
                    trailheadCount++;
                } else if (this.grid[i][k] === 9) {
                    this.peakMap.set(peakCount, [i, k]);
                    peakCount++;
                }
            }
        }
    }
}