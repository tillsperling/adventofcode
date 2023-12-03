import NumberObject from "../types/NumberObject";

export default class PartNumberValidator {

    input: string[]
    numberObjectArray: NumberObject[]

    constructor(input: string[], numberObjectArray: NumberObject[]) {
        this.input = input;
        this.numberObjectArray = numberObjectArray;
    }

    startValidationProcess(): NumberObject[] {
        const symbolRegex = /[^a-zA-Z0-9.]/;
        for (let numberObject of this.numberObjectArray) {
            // check if indices in given range have a symbol
            for (let i = numberObject.firstIndexToCheck; i <= numberObject.lastIndexToCheck; i++) {
                // first line conditional
                if (numberObject.lineBefore === -1) {
                    if (
                        symbolRegex.test(this.input[numberObject.lineAfter][i]) ||
                        symbolRegex.test(this.input[numberObject.lineCurrent][i])) {
                        numberObject.isPartNumber = true;
                    }
                    // last line conditional
                } else if (numberObject.lineAfter === this.input.length) {
                    if (
                        symbolRegex.test(this.input[numberObject.lineBefore][i]) ||
                        symbolRegex.test(this.input[numberObject.lineCurrent][i])) {
                        numberObject.isPartNumber = true;
                    }
                } else {
                    if (
                        symbolRegex.test(this.input[numberObject.lineBefore][i]) ||
                        symbolRegex.test(this.input[numberObject.lineAfter][i]) ||
                        symbolRegex.test(this.input[numberObject.lineCurrent][i])) {
                        numberObject.isPartNumber = true;
                    }
                }
            }
            if (symbolRegex.test(numberObject.numberString)) {
                numberObject.isPartNumber = true;
            }
        }
        console.log(this.numberObjectArray)
        return this.numberObjectArray
    }
}