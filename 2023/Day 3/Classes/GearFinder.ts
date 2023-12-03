import GearObject from "../types/GearObject";

export default class GearFinder {
    input: string[];
    gearArray: GearObject[];

    constructor(input: string[]) {
        this.input = input;
        this.gearArray = [];
    }

    findGears(): GearObject[] {
        for (let i = 0; i < this.input.length; i++) {
            const line = this.input[i];
            const regex = /\*/;
            const regexConstructor = new RegExp(regex, 'g');
            const matches = Array.from(line.matchAll(regexConstructor));

            for (let match of matches) {
                let index = -1;
                if (match.index !== undefined) {
                    index = match.index;
                } else {
                    index = -1;
                }

                const gearObject = {
                    gearIndex: index,
                    lines: [this.input[i - 1] ? this.input[i - 1] : undefined, this.input[i], this.input[i + 1] ? this.input[i + 1] : undefined],
                    coordinates: [index - 1, index, index + 1],
                    isGear: false,
                    ratio: 0,
                }
                this.gearArray.push(gearObject)
            }
        }
        return this.gearArray
    }
}