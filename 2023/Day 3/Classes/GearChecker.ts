import GearObject from "../types/GearObject";
import AddedOn from "../types/addedOn";

export default class GearChecker {
    array: GearObject[];

    constructor(array: GearObject[]) {
        this.array = array;
    }

    checkIfGearAndFillOutRatio() {
        for (let gearObject of this.array) {
            const numberArr: number[] = [];
            const addedOn: AddedOn[] = [];
            for (let i = 0; i < gearObject.lines.length; i++) {
                if (gearObject.lines[i] === undefined) {
                    continue;
                } else {
                    let coordinateIndexCount = -1;
                    for (let coordinate of gearObject.coordinates) {
                        coordinateIndexCount = coordinateIndexCount + 1;
                        const number = this.#getNumber(gearObject.lines[i], coordinate);
                        if (addedOn.length > 0) {
                            // if (number === 12 && number > 0) {
                            //     console.log(coordinateIndexCount, number, addedOn.length)
                            // }
                            // parsing checks
                            // if added on 0 and count is 1 and number is true dont do anything
                            // if added on 1 and number is same dont do anything

                            // if count is 1 and number added on 0 is the same dont do anything
                            if (addedOn[0].coordinateCount === 0 && coordinateIndexCount === 1 && addedOn[0].number === number) {
                                const addedInfo: AddedOn = {
                                    coordinateCount: coordinateIndexCount,
                                    line: i,
                                    number: number,
                                }
                                addedOn.push(addedInfo);
                                continue;
                            } else if (addedOn[0].coordinateCount === 1 && addedOn[0].number === number) {
                                const addedInfo: AddedOn = {
                                    coordinateCount: coordinateIndexCount,
                                    line: i,
                                    number: number,
                                }
                                addedOn.push(addedInfo);
                                continue;

                            } else {
                                const addedInfo: AddedOn = {
                                    coordinateCount: coordinateIndexCount,
                                    line: i,
                                    number: number,
                                }
                                addedOn.push(addedInfo);
                            }

                        } else if (number > 0) {
                            const addedInfo: AddedOn = {
                                coordinateCount: coordinateIndexCount,
                                line: i,
                                number: number,
                            }
                            addedOn.push(addedInfo);
                        }
                    }
                }
            }
            for (let element of addedOn) {
                if (element.number === -1) {
                    continue;
                } else if (element.line === 0) {
                    if (element.coordinateCount === 0) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 2 && element.number === addedOn[0].number && element.number == addedOn[1].number) {
                        continue
                    } else if (element.coordinateCount === 2 && numberArr.length === 1 && element.number === addedOn[0].number) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 2 && numberArr.length === 1 && element.number != addedOn[0].number) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 1 && numberArr.length === 0) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 2 && numberArr.length === 0) {
                        numberArr.push(element.number)
                    }
                } else if (element.line === 1) {
                    numberArr.push(element.number)
                } else if (element.line === 2) {
                    if (element.coordinateCount === 0) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 2 &&
                        numberArr.length === 1 && numberArr[numberArr.length - 1] != element.number) {
                        numberArr.push(element.number)
                    } else if (
                        addedOn[addedOn.length - 2] &&
                        addedOn[addedOn.length - 1] &&
                        element.coordinateCount === 2 &&
                        element.number === addedOn[addedOn.length - 2].number &&
                        element.number == addedOn[addedOn.length - 1].number) {
                        continue
                    } else if (
                        element.coordinateCount === 2 &&
                        numberArr.length > 1 &&
                        element.number === addedOn[6].number) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 1 && numberArr.length === 1 && numberArr[numberArr.length - 1] != element.number) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 1 && numberArr.length === 0) {
                        numberArr.push(element.number)
                    } else if (element.coordinateCount === 2 && numberArr.length === 0) {
                        numberArr.push(element.number)
                    } else if (numberArr.length === 1 && element.coordinateCount === 2 && element.number === addedOn[addedOn.length - 1].number) {
                        numberArr.push(element.number)
                    }
                }
            }


            for (let i = 0; i < numberArr.length; i++) {
                gearObject.ratio = numberArr[0]
                if (i > 0) {
                    gearObject.ratio = gearObject.ratio * numberArr[i]
                }
            }
            if (numberArr.length === 2) {
                gearObject.isGear = true;
            }
            console.log(numberArr, gearObject.isGear)
        }
        return this.array
    }
    #getNumber(line: string, index: number): number {
        // Check if the index is within the bounds of the string
        if (index >= 0 && index < line.length) {
            // Initialize variables to store the left and right substrings
            let leftSubstring = "";
            let rightSubstring = "";

            // Extract the number at the specified index
            const targetNumber = parseInt(line[index], 10);

            // Traverse to the left of the index
            for (let i = index - 1; i >= 0; i--) {
                if (!isNaN(parseInt(line[i], 10))) {
                    leftSubstring = line[i] + leftSubstring;
                } else {
                    break;
                }
            }

            // Traverse to the right of the index
            for (let i = index + 1; i < line.length; i++) {
                if (!isNaN(parseInt(line[i], 10))) {
                    rightSubstring += line[i];
                } else {
                    break;
                }
            }

            // Return the number with the left and right substrings
            if (isNaN(targetNumber)) {
                return -1;
            } else {
                const number = parseInt(leftSubstring.concat(targetNumber.toString(), rightSubstring))
                return number
            }

        } else {
            return -1;
        }
    }
}
