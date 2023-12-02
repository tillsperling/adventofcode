export default class WeirdAssStringDigit {
    stringArray: string[];
    arrayOfDoubleDigits: number[];
    placeholderString: string;
    arrayOfValidStringNumbers: string[];
    arrayOfValidBackwardsString: string[];

    constructor(array: Array<string>) {
        this.stringArray = array;
        this.arrayOfDoubleDigits = [];
        this.placeholderString = '';
        this.arrayOfValidStringNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        this.arrayOfValidBackwardsString = ['eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin']
    }

    getSolution() {
        this.#createDoubleDigitArray();
        const arraybums = this.#mergeArray();
        let sum = 0;
        for (let i = 0; i < arraybums.length; i++) {
            sum += arraybums[i];
        }
        return sum;
    }

    #createDoubleDigitArray() {
        for (let i = 0; i < this.stringArray.length; i++) {
            // forward loop
            for (let j = 0; j <= this.stringArray.length; j++) {
                const check = this.#checkIfStringIsInWeirdForwardArray(this.placeholderString);
                if (check) {
                    this.arrayOfDoubleDigits.push(check);
                    this.placeholderString = '';
                    break;
                }
                const current = this.stringArray[i][j];
                if (!parseInt(current)) {
                    this.placeholderString = this.placeholderString.concat('', current);
                } else if (parseInt(current)) {
                    this.arrayOfDoubleDigits.push(parseInt(current));
                    this.placeholderString = '';
                    break;
                }
            }
            // backwards loop
            for (let j = this.stringArray[i].length - 1; j >= 0; j--) {
                const check = this.#checkIfStringIsInWeirdBackwardsArray(this.placeholderString);
                if (check) {
                    this.arrayOfDoubleDigits.push(check);
                    this.placeholderString = '';
                    break;
                }
                const current = this.stringArray[i][j];
                if (!parseInt(current)) {
                    this.placeholderString = this.placeholderString.concat('', current);
                } else if (parseInt(current)) {
                    this.arrayOfDoubleDigits.push(parseInt(current));
                    this.placeholderString = '';
                    break;
                }
            }
        }
    }

    #mergeArray(): number[] {
        let mergedArray: number[] = [];
        let doubleBoy: string[] = [];
        for (let i = 0; i < this.arrayOfDoubleDigits.length; i++) {
            if (doubleBoy.length == 2) {
                mergedArray.push(parseInt(doubleBoy[0].concat('', doubleBoy[1])));
                doubleBoy = [];
                doubleBoy.push(this.arrayOfDoubleDigits[i].toString());
            } else if (i == this.arrayOfDoubleDigits.length - 1) {
                doubleBoy.push(this.arrayOfDoubleDigits[i].toString());
                mergedArray.push(parseInt(doubleBoy[0].concat('', doubleBoy[1])));
            } else {
                doubleBoy.push(this.arrayOfDoubleDigits[i].toString());
            }
        }
        return mergedArray;
    }

    #checkIfStringIsInWeirdForwardArray(string: string) {
        for (let i = 0; i < this.arrayOfValidStringNumbers.length; i++) {
            if (string.includes(this.arrayOfValidStringNumbers[i])) {
                return this.arrayOfValidStringNumbers.indexOf(this.arrayOfValidStringNumbers[i]) + 1;
            }
        }
        return false
    }

    #checkIfStringIsInWeirdBackwardsArray(string: string) {
        for (let i = 0; i < this.arrayOfValidBackwardsString.length; i++) {
            if (string.includes(this.arrayOfValidBackwardsString[i])) {
                return this.arrayOfValidBackwardsString.indexOf(this.arrayOfValidBackwardsString[i]) + 1;
            }
        }
        return false
    }


}