import { ArrayAndXPositions } from "../Types/ArrayAndXPositions";

export default class DimensionParser {
    input: ArrayAndXPositions
    xmasCount: number;
    xDashMasCount: number;
    xmasParseLength: number;

    constructor(input) {
        this.input = input;
        this.xmasCount = 0;
        this.xDashMasCount = 0;
        this.xmasParseLength = "xmas".length
    }

    init() {
        this.input.xPositions.forEach((values, keys) => {
            this.#parseRight(values, keys);
            this.#parseLeft(values, keys);
            this.#parseDown(values, keys);
            this.#parseUp(values, keys);
            this.#parseLeftDown(values, keys);
            this.#parseLeftUp(values, keys);
            this.#parseRightDown(values, keys);
            this.#parseRightUP(values, keys);
        })
        return this.xmasCount;
    }

    initTwo() {
        this.input.aPositions.forEach((values, keys) => {
            let works: boolean;
            works = this.#parseDiagonalUpperLeftToLowerRight(values, keys);
            if (!works) return;
            works = this.#parseDiagonalUpperRightToLowerLeft(values, keys);
            works == true ? this.xDashMasCount++ : null;
        })
        return this.xDashMasCount;
    }


    #parseRight(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0]][values[1] + i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;
        } catch (error) {
        }
    }
    #parseLeft(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0]][values[1] - i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;
        } catch (error) {
        }
    }
    #parseDown(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] + i][values[1]]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;
        } catch (error) {
        }
    }
    #parseUp(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] - i][values[1]]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;

        } catch (error) {
        }
    }
    #parseLeftUp(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] - i][values[1] - i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;

        } catch (error) {
        }
    }
    #parseRightUP(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] - i][values[1] + i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;

        } catch (error) {
        }
    }
    #parseRightDown(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] + i][values[1] + i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;

        } catch (error) {
        }
    }
    #parseLeftDown(values: number[], keys: number) {
        try {
            let testString: string = '';
            for (let i = 0; i < this.xmasParseLength; i++) {
                const currentLetter: string = this.input.arrays[values[0] + i][values[1] - i]
                if (currentLetter != undefined) {
                    testString += currentLetter;
                }
            }
            testString == 'XMAS' ? this.xmasCount++ : null;
        } catch (error) {
        }
    }
    #parseDiagonalUpperLeftToLowerRight(values: number[], keys): boolean {
        let diagonalString: string = '';

        try {
            diagonalString += this.input.arrays[values[0] - 1][values[1] - 1]
            diagonalString += this.input.arrays[values[0] + 1][values[1] + 1]
        } catch (error) { }


        if (diagonalString == 'SM' || diagonalString == "MS") {
            return true;
        } else {
            return false;
        }
    }
    #parseDiagonalUpperRightToLowerLeft(values: number[], keys): boolean {
        let diagonalString: string = '';

        try {
            diagonalString += this.input.arrays[values[0] - 1][values[1] + 1]
            diagonalString += this.input.arrays[values[0] + 1][values[1] - 1]
        } catch (error) { }

        if (diagonalString == 'SM' || diagonalString == "MS") {
            return true;
        } else {
            return false;
        }
    }
}