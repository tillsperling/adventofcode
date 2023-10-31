export default class SpotCounter {
    map: number[][];

    constructor(map: number[][]) {
        this.map = map;
    }

    countSpots(): number {
        let counter: number = 0;
        for (let i = 0; i < this.map.length; i++) {
            const row = this.map[i];
            for (let j = 0; j < row.length; j++) {
                const spot = row[j];
                if (spot >= 2) {
                    counter++;
                }
            }
        }
        return counter;
    }
}