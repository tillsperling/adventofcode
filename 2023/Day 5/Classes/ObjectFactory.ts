import RangeObject from "../types/RangeObject";
import MapObject from "../types/MapObject";

export default class ObjectFactory {
    array: string[];

    constructor(array: string[]) {
        this.array = array;
    }

    createObject(): MapObject {
        const object: MapObject = {
            name: this.array[0],
            ranges: []
        }
        for (let i = 1; i < this.array.length; i++) {
            const splitted = this.array[i].split(' ');
            const range: RangeObject = {
                source: parseInt(splitted[1]),
                destination: parseInt(splitted[0]),
                range: parseInt(splitted[2])
            }
            object.ranges.push(range);
        }
        return object;
    }
}