import { sumUpArray } from "../../../utils/utils"

export default class DistanceCalculator {
    arrays: number[][]
    distances: number[]

    constructor(arrays: number[][]) {
        this.arrays = arrays
        this.distances = []
    }

    getDistances() {
        for (let i = 0; i < this.arrays[0].length; i++) {
            const a = this.arrays[0][i]
            const b = this.arrays[1][i]

            // get whichever is bigger and subtract the smaller from it
            const distance = a > b ? a - b : b - a;
            this.distances.push(distance)
        }
        const sum = sumUpArray(this.distances)
        return sum
    }
}