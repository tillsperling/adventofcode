import ObjectFactory from "./ObjectFactory";
import MapObject from "../types/MapObject";

export default class MapObjectsCreator {
    input: string[];
    dataArray: string[][];
    allObjects: MapObject[];

    constructor(input: string[]) {
        this.input = input;
        this.dataArray = [];
        this.allObjects = [];
    }

    createMapObjects() {
        const stringRegex = /[a-z]/g;
        let arrayPlaceholder: string[] = []
        for (let i = 0; i < this.input.length; i++) {
            const line = this.input[i];
            if (i > 0 && line.match(stringRegex)) {
                this.dataArray.push(arrayPlaceholder);
                arrayPlaceholder = [];
            }
            if (i === this.input.length - 1) {
                this.dataArray.push(arrayPlaceholder);
            }
            arrayPlaceholder.push(line);
        }
        for (let line of this.dataArray) {
            const object = new ObjectFactory(line).createObject();
            this.allObjects.push(object);
        }
        return this.allObjects;
    }
}