import { sumUpArray } from "../../../utils/utils"

export default class SimilarityCalculator {
    arrays: number[][]
    similiarityArray: number[]

    constructor(arrays: number[][]) {
        this.arrays = arrays
        this.similiarityArray = []
    }

    getSimiliarityScore() {
        for (let i = 0; i < this.arrays[0].length; i++) {
            const checkNumber: number = this.arrays[0][i];
            let amountInRightArray: number = 0;
            for (let j = 0; j < this.arrays[0].length; j++) {
                if (this.arrays[1][j] == checkNumber)
                    amountInRightArray++;
            }
            const similiartyScore = checkNumber * amountInRightArray;
            this.similiarityArray.push(similiartyScore)
        }
        const sumOfSimiliarities = sumUpArray(this.similiarityArray);
        console.log(sumOfSimiliarities)
        return sumOfSimiliarities
    }
}