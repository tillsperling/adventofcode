export default class GalaxyMeasurement {
    map: Map<string, string>;
    expandedRows: number[];
    expandedColumns: number[];
    expansionMultiplier: number;
    allGalaxies: number[][];
    lengths: number[];
    sum: number;
    constructor(map: Map<string, string>, expandedRows: number[], expandedColumns: number[]) {
        this.map = map;
        this.expandedRows = expandedRows;
        this.expandedColumns = expandedColumns;
        this.expansionMultiplier = 999999;
        this.allGalaxies = [];
        this.lengths = [];
        this.sum = 0;
    }

    getLengths(): number {
        this.#fillAllGalaxies();
        for (let i = 0; i < this.allGalaxies.length; i++) {
            for (let j = i + 1; j < this.allGalaxies.length; j++) {
                let hasPassed = false;
                const currentGalaxy = this.allGalaxies[i];
                const nextGalaxy = this.allGalaxies[j];
                let verticalLength = 0;
                if (currentGalaxy[0] === nextGalaxy[0]) {
                    verticalLength = 0;
                } else if (nextGalaxy[0] > currentGalaxy[0]) {
                    verticalLength = nextGalaxy[0] - currentGalaxy[0];
                }
                let horizontalLength = 0;
                if (currentGalaxy[1] === nextGalaxy[1]) {
                    horizontalLength = 0;
                } else if (nextGalaxy[1] > currentGalaxy[1]) {
                    horizontalLength = nextGalaxy[1] - currentGalaxy[1];
                } else if (currentGalaxy[1] > nextGalaxy[1]) {
                    horizontalLength = currentGalaxy[1] - nextGalaxy[1];
                }
                for (let row of this.expandedRows) {
                    if (nextGalaxy[1] > currentGalaxy[1]) {
                        if (row > currentGalaxy[1] && row < nextGalaxy[1]) {
                            horizontalLength += this.expansionMultiplier;
                        }
                    } else if (currentGalaxy[1] > nextGalaxy[1]) {
                        if (row > nextGalaxy[1] && row < currentGalaxy[1]) {
                            horizontalLength += this.expansionMultiplier;
                        }
                    }
                }
                for (let column of this.expandedColumns) {
                    if (nextGalaxy[0] > currentGalaxy[0]) {
                        if (column > currentGalaxy[0] && column < nextGalaxy[0]) {
                            verticalLength += this.expansionMultiplier;
                        }
                    } else if (currentGalaxy[0] > nextGalaxy[0]) {
                        if (column > nextGalaxy[0] && column < currentGalaxy[0]) {
                            verticalLength += this.expansionMultiplier;
                        }
                    }
                }
                const length = verticalLength + horizontalLength
                this.lengths.push(length);
            }
        }
        // console.log(this.lengths)
        this.sum = this.lengths.reduce((a, b) => a + b, 0);
        return this.sum;
    }

    #fillAllGalaxies() {
        for (let [key] of this.map) {
            const parsedKey = this.#parseKey(key);
            this.allGalaxies.push(parsedKey);
        }
    }

    #getLength(galaxy1: number[], galaxy2: number[]): number {
        const [x1, y1] = galaxy1;
        const [x2, y2] = galaxy2;
        const length = Math.abs(x1 - x2) + Math.abs(y1 - y2);
        return length;
    }

    #parseKey(key: string): number[] {
        const [x, y] = key.split(',').map(Number);
        return [x, y];
    }

}