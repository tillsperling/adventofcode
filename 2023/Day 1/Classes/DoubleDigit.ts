export default class DoubleDigit {

    stringArray: string[];
    arrayOfDoubleDigits: number[];
    placeholderString: string;

    constructor(array: Array<string>) {
        this.stringArray = array;
        this.arrayOfDoubleDigits = [];
        this.placeholderString = '';
    }

    getSolution(): number {
        this.#createDoubleDigitArray();
        let sum = 0;

        for (let i = 0; i < this.arrayOfDoubleDigits.length; i++) {
            sum += this.arrayOfDoubleDigits[i];
        }
        return sum;
    }

    #createDoubleDigitArray() {
        for (let i = 0; i < this.stringArray.length; i++) {
            for (let j = 0; j <= this.stringArray.length; j++) {
                const current = this.stringArray[i][j];
                if (this.placeholderString.length == 0) {
                    if (parseInt(current)) {
                        this.placeholderString = current;
                    }
                }
            }
            for (let j = this.stringArray[i].length - 1; j >= 0; j--) {
                const current = this.stringArray[i][j];
                if (parseInt(current)) {
                    this.arrayOfDoubleDigits.push(parseInt(this.placeholderString.concat('', current)));
                    break
                }
            }
            this.placeholderString = '';
        }
    }
}