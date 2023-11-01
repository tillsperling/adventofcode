export default class PositionCalculator1 {
    positionArray: number[];
    highestPosition: number;
    lowestPosition: number;
    favorablePosition: {
        position: number;
        value: number;
    };

    constructor(positionArray: number[]) {
        this.positionArray = positionArray;
        this.highestPosition = -1;
        this.lowestPosition = -1;
        this.favorablePosition = {
            position: 0,
            value: -1
        }
    }

    startCalculation(): any {
        this.#getMaxPosition(this.positionArray);
        this.#getMinPosition(this.positionArray);
        this.#fillFavorablePositionWithHighest();
        this.#getFavorablePosition();
        return this.favorablePosition;
    }

    #getMaxPosition(positionArray: number[]): void {
        this.highestPosition = Math.max(...positionArray);
    }
    #getMinPosition(positionArray: number[]): void {
        this.lowestPosition = Math.min(...positionArray);
    }
    #fillFavorablePositionWithHighest() {
        this.favorablePosition.value = this.highestPosition * this.highestPosition;
    }
    #getFavorablePosition() {
        for (let i = this.lowestPosition; i <= this.highestPosition; i++) {
            let difference: number = 0;
            // console.log('new round checking for ', i)
            for (const submarine of this.positionArray) {
                if (submarine < i) {
                    const submarineDifference = i - submarine;
                    difference = difference + (submarineDifference)
                    // console.log(`We move ${submarine} to ${i} and it takes ${submarineDifference} fuel.`)
                } else if (submarine > i) {
                    const submarineDifference = submarine - i;
                    difference = difference + (submarineDifference)
                    // console.log(`We move ${submarine} to ${i} and it takes ${submarineDifference} fuel.`)
                }
            }
            // console.log(`for a total of ${difference} fuel while, the value we need to get better than is ${this.favorablePosition.value}`)
            if (difference < this.favorablePosition.value) {
                this.favorablePosition.value = difference;
                this.favorablePosition.position = i;
            }
        }
    }
}