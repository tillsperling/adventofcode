import Directions from "../Types/Directions";
import { sumUpArray } from "../../../utils/utils";

export default class Pathfinder {
    grid: number[][];
    trailheadMap: Map<number, number[]>;
    peakMap: Map<number, number[]>;
    directions: Directions;
    trailheadScores: number[];
    trailheadRatings: number[];
    additionalTrailsCounter: number;

    constructor(input: [number[][], Map<number, number[]>, Map<number, number[]>]) {
        this.grid = input[0];
        this.trailheadMap = input[1]
        this.peakMap = input[2];
        this.directions = {
            up: [-1, 0],
            right: [0, 1],
            down: [1, 0],
            left: [0, -1]
        }
        this.trailheadScores = []
        this.trailheadRatings = []
        this.additionalTrailsCounter = 0
    }

    findTrails(): number[] {
        for (let i = 0; i < this.trailheadMap.size; i++) {
            this.additionalTrailsCounter = 0
            const peakMap: Map<number[], boolean> = new Map();
            const start = this.trailheadMap.get(i);
            this.#startWalking(start, 0, peakMap);
            this.trailheadScores.push(peakMap.size)
            this.trailheadRatings.push(peakMap.size + this.additionalTrailsCounter)
        }
        return [sumUpArray(this.trailheadScores), sumUpArray(this.trailheadRatings)]
    }

    #startWalking(coordinates: number[], step: number, peakMap: Map<number[], boolean>) {
        let steps = step;
        this.#takeStep(coordinates, steps, peakMap)
    }

    #takeStep(currentCoordinates: number[], step: number, peakMap: Map<number[], boolean>, additionalTrails: number = 0) {
        step++
        const nextStepArray = []
        const stepUp = [currentCoordinates[0] + this.directions.up[0], currentCoordinates[1] + this.directions.up[1]]
        const stepRight = [currentCoordinates[0] + this.directions.right[0], currentCoordinates[1] + this.directions.right[1]]
        const stepDown = [currentCoordinates[0] + this.directions.down[0], currentCoordinates[1] + this.directions.down[1]]
        const stepLeft = [currentCoordinates[0] + this.directions.left[0], currentCoordinates[1] + this.directions.left[1]]
        nextStepArray.push(stepUp, stepRight, stepDown, stepLeft)

        for (let i = 0; i < nextStepArray.length; i++) {
            if (
                step === 9
                && !this.#isOutOfBounds(nextStepArray[i])
                && this.grid[nextStepArray[i][0]][nextStepArray[i][1]] === 9
            ) {
                const key = nextStepArray[i].toString();
                if (peakMap.get(key)) {
                    this.additionalTrailsCounter++
                    continue
                } else {
                    peakMap.set(key, true)
                    continue
                }
            }
            if (
                !this.#isOutOfBounds(nextStepArray[i]) 
                && this.grid[nextStepArray[i][0]][nextStepArray[i][1]] === step
            ) {
                this.#startWalking(nextStepArray[i], step, peakMap)
            }
        }
    }

    #isOutOfBounds(coordinates: number[]) {
        return coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= this.grid.length || coordinates[1] >= this.grid[0].length
    }
}