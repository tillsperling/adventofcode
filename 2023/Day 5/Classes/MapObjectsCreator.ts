import ObjectFactory from "./ObjectFactory";

export default class MapObjectsCreator {
    input: string[];
    dataArray: string[][];
    constructor(input: string[]) {
        this.input = input;
        this.dataArray = [];
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
            console.log(object);
        }
    }
}