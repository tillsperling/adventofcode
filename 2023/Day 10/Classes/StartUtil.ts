import Neighbours from "../Types/Neighbours";

export default class StartUtil {
    startLocation: number[]

    constructor() {
        this.startLocation = []
    }

    findStart(array: string[][]): number[] {
        let start: number[] = [];
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 'S') {
                    this.startLocation = [i, j];
                    start = this.startLocation
                }

            }
        }
        return start;
    }

    findNeighbours(array: string[][], start: number[]): Neighbours {
        const neighbours: Neighbours = {
            top: array[start[0] - 1][start[1]],
            left: array[start[0]][start[1] - 1],
            right: array[start[0]][start[1] + 1],
            bottom: array[start[0] + 1][start[1]],
        }
        return neighbours;
    }
}