import NumberObject from "../types/NumberObject";
import IndexObject from "../types/IndexObject";

export default class NumberObjectCreator {
    input: string[];
    numberObjectArray: NumberObject[];

    constructor(input: string[]) {
        this.input = input;
        this.numberObjectArray = [];
    }

    createNumberObjectsArray(): NumberObject[] {
        let currentLine = 0;
        for (let line of this.input) {
            this.#createNumberObject(line, currentLine)
            currentLine++
        }
        this.#fillIndicesByOccurecneInString();
        // console.log(this.numberObjectArray)
        return this.numberObjectArray
    }
    #createNumberObject(string: string, line: number) {
        const regex = /\d+/g
        const match = string.match(regex)
        const arrayOfNumbers: any[] = match?.map(Number) || [];
        let arrayOfOccurencs: any[] = [];

        for (let i = 0; i < arrayOfNumbers?.length; i++) {
            // const indices = this.#defineIndices(string, arrayOfNumbers[i]);

            arrayOfOccurencs.push(arrayOfNumbers[i])

            const numberObject = {
                number: arrayOfNumbers[i],
                numberString: '',
                lineBefore: line - 1,
                lineCurrent: line,
                lineAfter: line + 1,
                firstIndexToCheck: 0,
                lastIndexToCheck: 0,
                isPartNumber: false,
                originalString: string,
                occurenceOfNumberInThisString: this.#findOccurences(arrayOfOccurencs, arrayOfNumbers[i])
            }
            this.numberObjectArray.push(numberObject);
        }
        arrayOfOccurencs = [];
    }

    #fillIndicesByOccurecneInString() {
        // we need to loop over over object and find the first and last index of the number but the number can occure multiple times in the string so we use the occurenceOfNumberInThisString property to find the correct index
        for (let numberObject of this.numberObjectArray) {
            let count = 0;
            const searchTerm = `(?:\\b|_)${numberObject.number.toString()}(?:\\b|_)`;
            const regex = new RegExp(searchTerm, 'g');
            const matches = Array.from(numberObject.originalString.matchAll(regex));

            const indexArray: any[] = [];
            for (let match of matches) {
                indexArray.push(match.index)
            }


            const occurence = numberObject.occurenceOfNumberInThisString;
            const indexOfFirst = numberObject.originalString.indexOf(searchTerm);

            if (occurence === 1) {
                numberObject.firstIndexToCheck = indexArray[0] - 1;
                numberObject.lastIndexToCheck = numberObject.firstIndexToCheck + numberObject.number.toString().length + 1;

            } else {
                numberObject.firstIndexToCheck = indexArray[occurence - 1] - 1;
                numberObject.lastIndexToCheck = numberObject.firstIndexToCheck + numberObject.number.toString().length + 1;
            }
            count++
        }
    }

    // #defineIndices(string: string, number: number): IndexObject {
    //     const numberStr = number.toString();
    //     const regex = new RegExp(`(?:\\b|_)${numberStr}(?:\\b|_)`, 'g');

    //     const match = regex.exec(string);

    //     if (match) {
    //         const firstIndex = match.index;
    //         const lastIndex = firstIndex + numberStr.length;
    //         return { firstIndex: firstIndex - 1, lastIndex: lastIndex + 1 };
    //     } else {
    //         return { firstIndex: -1, lastIndex: -1 };
    //     }
    // }

    #findOccurences(array: any[], number: number): number {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === number) {
                count++;
            }
        }
        return count;
    }
}