import { sumUpArray } from "../../../utils/utils";

export default class FileSystemHandler {
    map: Map<number, (string | number)[]>;
    fileSystem: (string | number)[];
    emptySpaces: number;
    mapSize: number;

    constructor(map: Map<number, number[]>) {
        this.map = map;
        this.fileSystem = []
        this.emptySpaces = 0;
        this.mapSize = map.size
    }

    createAndDefragment(): number {
        this.#createFilesystem()
        this.#defragment();
        return this.#calculateResult();
    }

    #createFilesystem() {
        for (let i = 0; i < this.map.size; i++) {
            this.map.get(i).map(element => {
                this.fileSystem.push(element);
            })
        }
    }

    #defragment() {
        for (let i = 0; i < this.fileSystem.length; i++) {
            if (this.fileSystem[i] === '.') {
                for (let k = this.fileSystem.length - 1; k > i; k--) {
                    if (typeof this.fileSystem[k] === 'number') {
                        this.fileSystem[i] = this.fileSystem[k];
                        this.fileSystem[k] = '.';
                        break;
                    }
                }
            }
        }
    }

    #calculateResult(): number {
        const resultArr: number[] = [];
        for (let i = 0; i < this.fileSystem.length; i++) {
            if (typeof this.fileSystem[i] === 'number') {
                resultArr.push(i * Number(this.fileSystem[i]))
            }
        }

        return sumUpArray(resultArr);
    }
}