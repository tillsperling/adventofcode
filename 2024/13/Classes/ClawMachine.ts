import { Button, Prize } from "../Types/ClawMachine";

export default class ClawMachine {
    instructions: string[]
    buttonA: Button;
    buttonB: Button;
    prize: Prize;

    constructor(instructions: string[]) {
        this.instructions = instructions;
        this.buttonA = this.#createButtonA()
        this.buttonB = this.#createButtonB()
        this.prize = this.#createPrize()
    }

    solve(): number {
        const matrix = this.#createMatrix()
        const buttonPushes = this.#cramer(matrix)
        const calculatedCost = buttonPushes[0] * this.buttonA.cost + buttonPushes[1] * this.buttonB.cost
        if (buttonPushes[0] > 100 || buttonPushes[1] > 100) {
            return 0
        }
        if (!Number.isInteger(calculatedCost)) {
            return 0
        }

        return calculatedCost
    }

    solveInflated(): number {
        this.prize.x += 10000000000000
        this.prize.y += 10000000000000

        const matrix = this.#createMatrix()
        const buttonPushes = this.#cramer(matrix)
        const calculatedCost = buttonPushes[0] * this.buttonA.cost + buttonPushes[1] * this.buttonB.cost

        if (!Number.isInteger(calculatedCost)) {
            return 0
        }

        if (calculatedCost === 275000000383) {
            console.log(this.buttonA, this.buttonB, this.prize)
        }

        return calculatedCost
    }


    #createButtonA(): Button {
        const line = this.instructions[0]
        const numberRegex = /\d{1,}/g
        const values = line.match(numberRegex)
        const button = {
            x: parseInt(values[0]),
            y: parseInt(values[1]),
            cost: 3,
        }
        return button;
    }

    #createButtonB(): Button {
        const line = this.instructions[1]
        const numberRegex = /\d{1,}/g
        const values = line.match(numberRegex)
        const button = {
            x: parseInt(values[0]),
            y: parseInt(values[1]),
            cost: 1,
        }
        return button
    }

    #createPrize(): Prize {
        const line = this.instructions[2]
        const numberRegex = /\d{1,}/g
        const values = line.match(numberRegex)
        const prize = {
            x: parseInt(values[0]),
            y: parseInt(values[1])
        }
        return prize
    }

    #createMatrix(): number[][] {
        const coefficients = [
            [this.buttonA.x, this.buttonB.x],
            [this.buttonA.y, this.buttonB.y]
        ]
        const variables = ['X', 'Y']
        const results = [this.prize.x, this.prize.y]

        return [...coefficients, results]
    }

    #cramer(matrix: number[][]): number[] {
        const coefficients = matrix.slice(0, 2)
        const results = matrix[2]
        const det = this.#determinant(coefficients)
        const xMatrix = this.#replaceColumn(coefficients, results, 0)
        const yMatrix = this.#replaceColumn(coefficients, results, 1)
        const x = this.#determinant(xMatrix) / det
        const y = this.#determinant(yMatrix) / det
        if (Number.isInteger(x) && Number.isInteger(y)) {
            return [x, y]
        } else {
            return [0, 0]
        }
    }

    #determinant(matrix: number[][]) {
        const [row1, row2] = matrix
        return row1[0] * row2[1] - row1[1] * row2[0]
    }

    #replaceColumn(matrix: number[][], newColumn: number[], column: number): number[][] {
        const newMatrix = matrix.map(row => [...row])
        newMatrix.forEach((row, index) => {
            row[column] = newColumn[index]
        })
        return newMatrix
    }

}