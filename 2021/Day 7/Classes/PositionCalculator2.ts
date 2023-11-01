export default class PositionCalculator2 {
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
        this.favorablePosition.value = this.highestPosition * (this.highestPosition * this.highestPosition);
    }
    #getFavorablePosition() {
        for (let i = this.lowestPosition; i <= this.highestPosition; i++) {
            let difference: number = 0;
            // console.log('new round checking for ', i)
            for (const submarine of this.positionArray) {
                const subMarineFuelNeeded = this.#calculateSubmarineFuelCost(submarine, i, difference);
                difference = subMarineFuelNeeded;
            }

            if (difference < this.favorablePosition.value) {
                this.favorablePosition.value = difference;
                this.favorablePosition.position = i;
            }
        }
    }
    #calculateSubmarineFuelCost(submarine: number, i: number, difference: number): number {
        let currentPosition = submarine;
        let currentFuel = 0;
        let totalFuel = 0;
        let iteration = 0;
        let combinedFuel = difference;

        if (submarine > i) {
            while (currentPosition > i) {
                iteration++
                currentFuel = iteration;
                totalFuel += currentFuel
                currentPosition--
                currentFuel++
            }
        } else if (submarine < i) {
            while (currentPosition < i) {
                iteration++
                currentFuel = iteration;
                totalFuel += currentFuel
                currentPosition++
                currentFuel++
            }
        }
        combinedFuel = combinedFuel + totalFuel;
        return combinedFuel
    }
}