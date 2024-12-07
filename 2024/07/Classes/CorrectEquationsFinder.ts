import { sumUpArray } from "../../../utils/utils";

export default class CorrectEquationsFinder {
    input: number[][][]
    possibleResultsOne: number[];
    possibleResultsTwo: number[];

    constructor(input) {
        this.input = input
        this.possibleResultsOne = [];
        this.possibleResultsTwo = [];
    }

    init() {
        for (let arr of this.input) {
            this.#solvePartOne(arr)
            this.#solvePartTwo(arr)
        }
        const sumOne = sumUpArray(this.possibleResultsOne)
        const sumTwo = sumUpArray(this.possibleResultsTwo)
        return [sumOne, sumTwo]
    }

    #solvePartOne(arr: number[][]) {

        const result: number[] = arr[0]
        const equationParameter: number[] = arr[1]
        const operatorCombinations = this.#defineBinaryOperatorCombinations(equationParameter);

        const equateDifferentCombinations = this.#equate(result, operatorCombinations, equationParameter)
        this.possibleResultsOne.push(...equateDifferentCombinations)
    }

    #solvePartTwo(arr: number[][]) {
        const result: number[] = arr[0]
        const equationParameter: number[] = arr[1]
        const operatorCombinations = this.#defineTertiaryOperatorCombinations(equationParameter);

        const equateDifferentCombinations = this.#equate(result, operatorCombinations, equationParameter)
        this.possibleResultsTwo.push(...equateDifferentCombinations)
    }

    #defineBinaryOperatorCombinations(arr: number[]): string[][] {
        const gaps: number = arr.length - 1
        const possibilities: number = Math.pow(2, gaps)
        const combinations: string[][] = [];

        for (let i = 0; i < possibilities; i++) {
            const binary = i.toString(2).padStart(gaps, '0')

            const operators = binary.split('').map(element => (element === "0" ? '+' : '*'))

            combinations.push(operators);
        }
        return combinations;
    }

    #defineTertiaryOperatorCombinations(arr: number[]): string[][] {
        const gaps: number = arr.length - 1
        const possibilities: number = Math.pow(3, gaps)
        const combinations: string[][] = [];

        for (let i = 0; i < possibilities; i++) {
            const base3 = i.toString(3).padStart(gaps, '0')

            const operators = base3.split('').map(element => {
                if (element === "0") {
                    return '+'
                } else if (element === "1") {
                    return '*'
                } else if (element === "2") {
                    return '||'
                }
            });

            combinations.push(operators);
        }
        return combinations;
    }

    #equate(targetResult: number[], combinations: string[][], equationParameter: number[]): number[] {
        const possibleResults = [];
        for (let i = 0; i < combinations.length; i++) {
            const result = this.#calculateOnTheFly(combinations[i], equationParameter);
            if (result == targetResult[0]) {
                possibleResults.push(targetResult[0]);
                break
            }
        }
        return possibleResults;
    }

    #calculateOnTheFly(combination: string[], equationParameter: number[]): number {
        let currentResult = equationParameter[0];
        for (let i = 0; i < combination.length; i++) {
            if (combination[i] === '+') {
                currentResult += equationParameter[i + 1];
            } else if (combination[i] === '*') {
                currentResult *= equationParameter[i + 1];
            } else if (combination[i] === '||') {
                // if the operator is || we join the current result with the next number
                currentResult = parseInt(currentResult.toString() + equationParameter[i + 1].toString());
            }
        }
        return currentResult;
    }
}