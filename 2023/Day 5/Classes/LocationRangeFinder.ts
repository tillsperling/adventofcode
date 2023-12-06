import MapObject from "../types/MapObject";

export default class LocationRangeFinder {
    seedArray: number[][] | undefined;
    mapObjects: MapObject[];
    rangesToStillCheck: any
    locationArray: number[][];
    counter: number;

    constructor(seedArray: number[][] | undefined, mapObjects: MapObject[]) {
        this.seedArray = seedArray;
        this.mapObjects = mapObjects;
        this.rangesToStillCheck = [];
        this.locationArray = [];
        this.counter = 0;
    }

    findClosestLocation() {
        if (this.seedArray != undefined) {
            for (let seedRange of this.seedArray) {
                this.#getNextSeedRange(seedRange, 0);
            }

        }
        for (let range of this.rangesToStillCheck) {
            // console.log(range[0], range[1])
            this.#getNextSeedRange(range[0], range[1])
        }
        return this.locationArray
    }

    #getNextSeedRange(seedRange: number[], counter: number): any {
        let returnRange: number[] = [];
        let rangesCounter = 0;
        let recursionCounter = counter;
        for (let range of this.mapObjects[counter].ranges) {
            const rangeStart = range.source;
            const rangeEnd = range.source + range.range;
            const amountOfRanges = this.mapObjects[counter].ranges.length;
            // console.log(`checking seedrange ${seedRange} in ${this.mapObjects[counter].name} range start is ${rangeStart} and range end ist ${rangeEnd}`)

            if (seedRange[0] >= rangeStart && seedRange[1] <= rangeEnd) {
                // console.log(`seedrange ${seedRange} completely inbetween ${rangeStart} and ${rangeEnd}`)
                returnRange.push(seedRange[0] + range.destination - range.source);
                returnRange.push(seedRange[1] + range.destination - range.source);
                if (recursionCounter === 6) {
                    // console.log(`counted through returnin ${returnRange}`)
                    this.locationArray.push(returnRange)
                } else {
                    recursionCounter++
                    return this.#getNextSeedRange(returnRange, recursionCounter)
                }
            } else if (seedRange[1] <= rangeStart || seedRange[0] >= rangeEnd) {
                rangesCounter++
                // console.log(`not inside rangesCounter at ${rangesCounter} of ${amountOfRanges}`)
                if (rangesCounter === amountOfRanges) {
                    // console.log(`not in any ranges handing range through`)
                    if (recursionCounter === 6) {
                        // console.log(`counted through returnin ${returnRange}`)
                        this.locationArray.push(seedRange)
                    } else {
                        recursionCounter++
                        return this.#getNextSeedRange(seedRange, recursionCounter)
                    }
                }
                continue
            } else {
                // console.log(`seedrange ${seedRange} partially fits ${rangeStart} and ${rangeEnd}`)
                const createNewRanges = this.#createSubRanges(seedRange, [rangeStart, rangeEnd])
                if (createNewRanges != undefined) {
                    for (let range of createNewRanges) {
                        this.rangesToStillCheck.push([range, counter])
                    }
                    break
                }
            }
        }
    }

    #createSubRanges(inputRange: number[], checkRange: number[]) {
        const newRanges: number[][] = [];
        // console.log(`creating new range from inputRange ${inputRange} and checkRange ${checkRange}`);
        if (inputRange[0] <= checkRange[0]) {
            newRanges.push([inputRange[0], inputRange[0] + checkRange[0] - inputRange[0]])
            newRanges.push([checkRange[0], inputRange[1]]);
            // console.log(`new ranges are ${newRanges}`)
            return newRanges
        } else if (inputRange[0] > checkRange[0]) {
            newRanges.push([checkRange[0], inputRange[0] - 1])
            newRanges.push([inputRange[0], checkRange[1]])
            newRanges.push([checkRange[1] + 1, inputRange[1]])
            // console.log(`new ranges are ${newRanges}`)
            return newRanges
        }
    }
    // #goThroughMapObject(number: number | undefined): any {
    //     if (number == undefined) {
    //         return;
    //     }
    //     let returnValue = -1;
    //     for (let range of this.mapObjects[this.counter].ranges) {
    //         if (number >= range.source && number <= range.source + range.range) {
    //             returnValue = number + range.destination - range.source;
    //             break
    //         }
    //     }
    //     this.counter++;
    //     if (this.counter < this.mapObjects.length) {
    //         return returnValue >= 0 ? this.#goThroughMapObject(returnValue) : this.#goThroughMapObject(number);
    //     } else {
    //         this.counter = 0;
    //         return returnValue >= 0 ? returnValue : number;
    //     }
    // }
}