export default class HistoryGenerator {
    input: number[][];
    historyHolder: number[][];
    predictions: number[];
    sum: number;

    constructor(input: number[][]) {
        this.input = input;
        this.historyHolder = [];
        this.predictions = [];
        this.sum = 0;
    }

    handleInput(): number {
        for (let i = 0; i < this.input.length; i++) {
            this.historyHolder = [];
            this.historyHolder.push(this.input[i])
            this.#generateHistory(this.input[i]);
            this.#generateNextPrediction(this.historyHolder)
        }
        this.#sumPredictions();
        return this.sum;
    }

    handleInputBackwards(): number {
        for (let i = 0; i < this.input.length; i++) {
            this.historyHolder = [];
            this.historyHolder.push(this.input[i])
            this.#generateHistory(this.input[i]);
            this.#generateBackwardsPrediction(this.historyHolder)
        }
        this.#sumPredictions();
        return this.sum
    }

    #generateHistory(array: number[]): void {
        const newHistory: number[] = [];
        let prev = -1;
        for (let i = 0; i < array.length; i++) {
            let difference: number = 0;
            if (i === 0) {
                prev = array[i]
            } else {
                difference = array[i] - prev;
                newHistory.push(difference);
                prev = array[i];

            }
        }
        // console.log(newHistory)
        if (!this.#checkIfAllZeros(newHistory)) {
            this.historyHolder.push(newHistory);
            return this.#generateHistory(newHistory);
        } else {
            this.historyHolder.push(newHistory);
            return
        }
    }

    #generateNextPrediction(array: number[][]) {
        let prevPredicted;
        let nextPredicted = -1;
        for (let i = array.length - 1; i >= 0; i--) {
            const last = array[i].length - 1;
            if (prevPredicted === undefined) {
                prevPredicted = array[i][last];
            } else {
                nextPredicted = array[i][last] + prevPredicted
                prevPredicted = nextPredicted;
            }
        }
        this.predictions.push(nextPredicted);
    }

    #generateBackwardsPrediction(array: number[][]) {
        let prevPredicted;
        let nextPredicted = -1;
        for (let i = array.length - 1; i >= 0; i--) {
            if (prevPredicted === undefined) {
                prevPredicted = array[i][0];
            } else {
                nextPredicted = array[i][0] - prevPredicted
                prevPredicted = nextPredicted;
            }
        }
        this.predictions.push(nextPredicted);
    }


    #sumPredictions() {
        this.sum = this.predictions.reduce((a, b) => a + b, 0);
    }

    #checkIfAllZeros(array: number[]): boolean {
        for (let number of array) {
            if (number != 0) {
                return false
            }
        }
        return true;
    }
}