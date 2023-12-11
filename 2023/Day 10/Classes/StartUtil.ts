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

    alterMap(
        map: Map<string, string>,
        symbol: string,
        direction: string,
        indexToCheck: number[]
    ): Map<string, string> {
        let keyOut: number[] = [];
        let stringKeyOut: string = '';
        let keyIn: number[] = [];
        let stringKeyIn: string = '';
        switch (symbol) {
            case '-':
                if (direction === 'right') {
                    keyOut = [indexToCheck[0] - 1, indexToCheck[1]]
                    keyIn = [indexToCheck[0] + 1, indexToCheck[1]]
                } else if (direction === 'left') {
                    keyOut = [indexToCheck[0] + 1, indexToCheck[1]]
                    keyIn = [indexToCheck[0] - 1, indexToCheck[1]]
                }
                stringKeyOut = keyOut.toString()
                stringKeyIn = keyIn.toString()
                if (stringKeyIn === '7,8' || stringKeyOut === '7,8' || stringKeyIn === '7,9' || stringKeyOut === '7,9') {
                    console.log(`Symbol: ${symbol}, direction: ${direction}`)
                }
                if (map.get(stringKeyOut) === '.') {
                    map.set(stringKeyOut, 'O')
                }
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case '|':
                if (direction === 'bottom') {
                    keyOut = [indexToCheck[0], indexToCheck[1] + 1]
                    keyIn = [indexToCheck[0], indexToCheck[1] - 1]
                } else if (direction === 'top') {
                    keyOut = [indexToCheck[0], indexToCheck[1] - 1]
                    keyIn = [indexToCheck[0], indexToCheck[1] + 1]
                }
                stringKeyOut = keyOut.toString()
                stringKeyIn = keyIn.toString()
                if (stringKeyIn === '7,8' || stringKeyOut === '7,8' || stringKeyIn === '7,9' || stringKeyOut === '7,9') {
                    console.log(`Symbol: ${symbol}, direction: ${direction}`)
                }

                if (map.get(stringKeyOut) === '.') {
                    map.set(stringKeyOut, 'O')
                }
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case 'L':
                keyIn = [indexToCheck[0] - 1, indexToCheck[1] + 1]
                stringKeyIn = keyIn.toString()
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case 'F':
                keyIn = [indexToCheck[0] + 1, indexToCheck[1] + 1]
                stringKeyIn = keyIn.toString()
                if (stringKeyIn === '7,8' || stringKeyOut === '7,8' || stringKeyIn === '7,9' || stringKeyOut === '7,9') {
                    console.log(`Symbol: ${symbol}, direction: ${direction}`)
                }
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case 'J':
                keyIn = [indexToCheck[0] - 1, indexToCheck[1] - 1]
                stringKeyIn = keyIn.toString()
                if (stringKeyIn === '7,8' || stringKeyOut === '7,8' || stringKeyIn === '7,9' || stringKeyOut === '7,9') {
                    console.log(`Symbol: ${symbol}, direction: ${direction}`)
                }
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case '7':
                keyIn = [indexToCheck[0] + 1, indexToCheck[1] - 1]
                stringKeyIn = keyIn.toString()
                if (stringKeyIn === '7,8' || stringKeyOut === '7,8' || stringKeyIn === '7,9' || stringKeyOut === '7,9') {
                    console.log(`Symbol: ${symbol}, direction: ${direction}`)
                }
                if (map.get(stringKeyIn) === '.') {
                    map.set(stringKeyIn, 'I')
                }
                break;
            case 'S':
                break
        }
        return map
    }
}