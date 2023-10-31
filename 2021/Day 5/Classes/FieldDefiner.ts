export default class DefineField {
    coordinates: number[][];
    field: number[][];
    map: number[][];

    constructor(coordinates: number[][]) {
        this.coordinates = coordinates;
        this.field = [];
        this.map = [];
    }

    parseData() {
        this.field = this.#createField(this.coordinates);
        return this.field;
    }

    #createField(coordinates: number[][]): number[][] {
        let field: number[][] = [];
        let highestX = 0;
        let highestY = 0;
        for (let i = 0; i < coordinates.length; i++) {
            for (let j = 0; j < coordinates[i].length; j++) {
                if (j % 2 === 0) {
                    if (coordinates[i][j] > highestX) {
                        highestX = coordinates[i][j];
                    }
                } else {
                    if (coordinates[i][j] > highestY) {
                        highestY = coordinates[i][j];
                    }
                }
            }
        }
        for (let i = 0; i <= highestY; i++) {
            field.push(new Array(highestX + 1).fill(0));
        }
        return field;
    }
}