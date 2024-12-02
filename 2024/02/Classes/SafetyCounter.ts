export default class SafetyCounter {
    input: number[][];
    safetyCount: number;
    toleranceArray: number[][]

    constructor(input: number[][]) {
        this.input = input;
        this.safetyCount = 0;
        this.toleranceArray = []
    }

    init(): number {
        console.log('Starting Init for Part 1')
        this.#loopAndCount(this.input);
        return this.safetyCount;
    }

    initTwo(): number {
        console.log('Starting Init for Part 2')
        this.#loopAndCountWithTolerance()
        this.#doubleCheckToleranceArray();
        return this.safetyCount;
    }

    #loopAndCount(arrays) {
        for (let arr of arrays) {
            if (arr[0] > arr[1]) {
                this.#decrease(arr);
            } else {
                this.#increase(arr);
            }
        }
    }

    #loopAndCountWithTolerance() {
        for (let arr of this.input) {
            if (arr[0] > arr[1]) {
                this.#decreaseWithTolerance(arr);
            } else {
                this.#increaseWithTolerance(arr);
            }
        }
    }

    #doubleCheckToleranceArray() {
        for (let arr of this.toleranceArray) {
            for (let i = 0; i < arr.length; i++) {
                const splicedArr = arr.toSpliced(i, 1);
                if (splicedArr[0] > splicedArr[1]) {
                    const check = this.#decreaseWithReturn(splicedArr);
                    if (!check) {
                        this.safetyCount++
                        break;
                    } else {
                        continue
                    }
                } else {
                    const check = this.#increaseWithReturn(splicedArr);
                    if (!check) {
                        this.safetyCount++
                        break;
                    } else {
                        continue
                    }
                }
            }
        }
    }

    #decrease(arr) {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if increase break
            if (arr[i] > arr[i - 1]) {
                breakCondition = true;
            }
            // if decrease > 3 break
            if (arr[i - 1] - arr[i] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }
        }
        breakCondition ? null : this.safetyCount++;
    }

    #increase(arr) {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if decrease break
            if (arr[i] < arr[i - 1]) {
                breakCondition = true;
            }
            // if inrease > 3 break
            if (arr[i] - arr[i - 1] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }

        }
        breakCondition ? null : this.safetyCount++;
    }

    #decreaseWithTolerance(arr) {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if increase break
            if (arr[i] > arr[i - 1]) {
                breakCondition = true;
            }
            // if decrease > 3 break
            if (arr[i - 1] - arr[i] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }
        }
        if (breakCondition) {
            this.toleranceArray.push(arr);
        }
        breakCondition ? null : this.safetyCount++;
    }

    #increaseWithTolerance(arr) {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if decrease break
            if (arr[i] < arr[i - 1]) {
                breakCondition = true;
            }
            // if inrease > 3 break
            if (arr[i] - arr[i - 1] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }
        }
        if (breakCondition) {
            this.toleranceArray.push(arr);
        }
        breakCondition ? null : this.safetyCount++;
    }

    #decreaseWithReturn(arr): boolean {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if increase break
            if (arr[i] > arr[i - 1]) {
                breakCondition = true;
            }
            // if decrease > 3 break
            if (arr[i - 1] - arr[i] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }
        }
        return breakCondition
    }

    #increaseWithReturn(arr) {
        let breakCondition: boolean = false;
        for (let i = 1; i < arr.length; i++) {
            // if decrease break
            if (arr[i] < arr[i - 1]) {
                breakCondition = true;
            }
            // if inrease > 3 break
            if (arr[i] - arr[i - 1] > 3) {
                breakCondition = true;
            }
            // if equal break
            if (arr[i - 1] === arr[i]) {
                breakCondition = true;
            }

        }
        return breakCondition
    }
}