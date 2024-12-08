//@ts-ignore
import * as fs from "fs";

export default class InputConverter {
    input: string;
    maps: Map<string, number[][]>[]
    mirror: string[][]

    constructor(input: string) {
        this.input = input
        this.maps = []
        this.mirror = []
    }

    init(): [Map<string, number[][]>[], string[][]] {
        const string: string = this.#turnInputIntoString();
        const arrays: string[][] = string.replace(/\r/g, "").split("\n").map(element => element.split(''));
        this.#createMaps(arrays);
        this.#createMirror(arrays);
        return [this.maps, this.mirror]
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }

    #createMaps(arr: string[][]) {
        for (let subArr of arr) {
            for (let i = 0; i < subArr.length; i++) {
                const element = subArr[i];
                if (element.match(/[a-zA-Z0-9]/)) {
                    if (this.maps.some(map => map.has(element))) {
                        const map = this.maps.find(map => map.has(element));
                        map.set(element, [...map.get(element), [arr.indexOf(subArr), i]])
                    } else {
                        this.maps.push(new Map([[element, [[arr.indexOf(subArr), i]]]]))
                    }
                }
            }
        }
    }

    #createMirror(arr: string[][]) {
        for (let i = 0; i < arr.length; i++) {
            const newArr = new Array(arr[i].length).fill('.');
            this.mirror.push(newArr);
        }
    }
}