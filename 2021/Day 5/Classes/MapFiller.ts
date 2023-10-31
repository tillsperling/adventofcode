export default class MapFiller {
    map: number[][];
    coordinates: number[][];

    constructor(field: number[][], coordinates: number[][]) {
        this.map = field;
        this.coordinates = coordinates;
    }

    createMap() {
        for (let i = 0; i < this.coordinates.length; i++) {
            const x1 = this.coordinates[i][0];
            const y1 = this.coordinates[i][1];
            const x2 = this.coordinates[i][2];
            const y2 = this.coordinates[i][3];
            if (y1 === y2) {
                this.#createHorizontalLine(this.coordinates[i]);
            } else if (x1 === x2) {
                this.#createVerticalLine(this.coordinates[i]);
            } else {
                this.#createDiagonalLine(this.coordinates[i]);
            }
        }
        return this.map;
    }
    #createHorizontalLine(array: number[]) {
        const x1 = array[0];
        const y1 = array[1];
        const x2 = array[2];
        const y2 = array[3];

        const rowToModify = this.map[y1].slice();

        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                rowToModify[i]++;
            }
        } else {
            for (let i = x2; i <= x1; i++) {
                rowToModify[i]++;
            }
        }
        this.map[y1] = rowToModify;
    }
    #createVerticalLine(array: number[]) {
        const x1 = array[0];
        const y1 = array[1];
        const x2 = array[2];
        const y2 = array[3];

        const colToModify = this.#createColumnArray(x1, y1, y2);

        for (let i = 0; i < colToModify.length; i++) {
            colToModify[i]++;
        }
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                this.map[i][x1] = colToModify[i - y1];
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                this.map[i][x1] = colToModify[i - y2];
            }
        }
    }

    #createDiagonalLine(array: number[]) {
        const x1 = array[0];
        const y1 = array[1];
        const x2 = array[2];
        const y2 = array[3];

        const diagonalToModify = this.#createDiagonalArray(x1, y1, x2, y2);

        for (let i = 0; i < diagonalToModify.length; i++) {
            diagonalToModify[i]++;
        }
        let y = y1
        if (x1 > x2 && y1 < y2) {
            let counter = diagonalToModify.length - diagonalToModify.length;
            for (let xachse = x1; xachse >= x2; xachse--) {
                if (diagonalToModify[xachse] === undefined) {
                    // console.log('x1 > x2, y1 < y2')
                    // console.log(`err ${array}`)
                }
                this.map[y][xachse] = diagonalToModify[counter]
                y++
                counter++
            }
        } else if (x1 > x2 && y1 > y2) {
            let counter = diagonalToModify.length - diagonalToModify.length;
            for (let xachse = x1; xachse >= x2; xachse--) {
                if (diagonalToModify[counter] === undefined) {
                    // console.log('x1 > x2, y1 > y2')
                    // console.log(`err ${array}`)
                }
                this.map[y][xachse] = diagonalToModify[counter]
                y--
                counter++;
            }
        } else if (x1 < x2 && y1 < y2) {
            let counter = diagonalToModify.length - diagonalToModify.length;
            for (let xachse = x1; xachse <= x2; xachse++) {
                if (diagonalToModify[xachse] === undefined) {
                    // console.log('x1 < x2, y1 < y2')
                    // console.log(`err ${array}`)
                }
                this.map[y][xachse] = diagonalToModify[counter]
                y++
                counter++
            }
        } else if (x1 < x2 && y1 > y2) {
            let counter = diagonalToModify.length - diagonalToModify.length;
            for (let xachse = x1; xachse <= x2; xachse++) {
                if (diagonalToModify[counter] === undefined) {
                    console.log('x1 < x2, y1 > y2')
                    console.log(`err ${array}`)
                }
                this.map[y][xachse] = diagonalToModify[counter]
                y--
                counter++;
            }
        }
    }

    #createColumnArray(col: number, y1: number, y2: number): number[] {
        const colToModify: number[] = [];
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                colToModify.push(this.map[i][col]);
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                colToModify.push(this.map[i][col]);
            }
        }
        return colToModify;
    }

    #createDiagonalArray(x1: number, y1: number, x2: number, y2: number): number[] {
        const diagonalToModify: number[] = [];

        if (x1 > x2 && y1 < y2) {
            for (let i = x1; i >= x2; i--) {
                diagonalToModify.push(this.map[y1][i]);
                y1++;
            }
        } else if (x1 > x2 && y1 > y2) {
            for (let i = x1; i >= x2; i--) {
                diagonalToModify.push(this.map[y1][i]);
                y1--;
            }
        } else if (x1 < x2 && y1 < y2) {
            for (let i = x1; i <= x2; i++) {
                diagonalToModify.push(this.map[y1][i]);
                y1++;
            }
        } else if (x1 < x2 && y1 > y2) {
            for (let i = x1; i <= x2; i++) {
                diagonalToModify.push(this.map[y1][i]);
                y1--
            }
        }
        return diagonalToModify;
    }
}