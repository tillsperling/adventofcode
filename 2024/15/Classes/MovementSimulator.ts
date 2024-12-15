import { sumUpArray } from '../../../utils/utils'

export default class MovementSimulator {
    coordinates: string[];
    wallMap: Map<string, boolean>;
    boxMap: Map<string, boolean>;
    emptyMap: Map<string, boolean>;
    robotPos: number[];
    directions: number[][]
    up: number[]
    right: number[]
    down: number[]
    left: number[]
    boxesPlaceholder: [number[], string][]
    emptyFound: boolean;

    constructor(
        coordinates,
        wallMap,
        boxMap,
        emptyMap,
        robotPos
    ) {
        this.coordinates = coordinates
        this.wallMap = wallMap
        this.boxMap = boxMap
        this.emptyMap = emptyMap
        this.robotPos = robotPos
        this.directions = [[-1, 0], [0, +1], [+1, 0], [0, -1]]
        this.up = this.directions[0]
        this.right = this.directions[1]
        this.down = this.directions[2]
        this.left = this.directions[3]
        this.boxesPlaceholder = []
    }

    simulateMoves() {
        while (this.coordinates.length > 0) {
            this.boxesPlaceholder.length = 0;
            if (this.coordinates[0] == '^') {
                this.#checkNextPos(this.robotPos, this.up)
            }
            if (this.coordinates[0] == '>') {
                this.#checkNextPos(this.robotPos, this.right)
            }
            if (this.coordinates[0] == 'v') {
                this.#checkNextPos(this.robotPos, this.down)
            }
            if (this.coordinates[0] == '<') {
                this.#checkNextPos(this.robotPos, this.left)
            }
            this.coordinates.shift()
        }
        return this.#sumUpBoxPositions();
    }

    #checkNextPos(pos: number[], direction: number[]) {
        const nextPos: number[] = [pos[0] + direction[0], pos[1] + direction[1]]
        const stringified: string = JSON.stringify(nextPos);


        if (this.wallMap.get(stringified)) {
            this.boxesPlaceholder.length = 0;
            return;
        }

        if (this.boxMap.get(stringified)) {
            this.boxesPlaceholder.push([nextPos, stringified])
            this.#checkNextPos(nextPos, direction)
        }

        if (this.emptyMap.get(stringified)) {
            this.emptyFound = true;
            this.#moveAllInPlaceholder(direction);
            this.emptyMap.delete(stringified)
            this.emptyMap.set(JSON.stringify(this.robotPos), true)
            this.robotPos = [this.robotPos[0] + direction[0], this.robotPos[1] + direction[1]]
        }

    }

    #sumUpBoxPositions(): number {
        const arr = []
        const numberRegex = /\d{1,}/g
        for (const [pos, value] of this.boxMap.entries()) {
            const values = pos.match(numberRegex)?.map(element => parseInt(element))
            arr.push(values[0] * 100 + values[1])
        }
        return sumUpArray(arr)
    }

    #moveAllInPlaceholder(direction) {
        for (let i = this.boxesPlaceholder.length - 1; i >= 0; i--) {
            let box = this.boxesPlaceholder[i];
            this.boxMap.delete(box[1]);
            this.boxMap.set(JSON.stringify([box[0][0] + direction[0], box[0][1] + direction[1]]), true);
        }
    }
}