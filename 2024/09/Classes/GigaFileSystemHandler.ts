import { sumUpArray } from "../../../utils/utils";

export default class GigaFileSystemHandler {
    map: Map<number, (string | number)[]>;
    fileSystem: (string | number)[];
    mapSize: number;
    idArray: (string | number)[][]
    idHandled: number[]

    constructor(map: Map<number, (string | number)[]>) {
        this.map = map
        this.mapSize = this.map.size
        this.idArray = []
        this.idHandled = []
        this.fileSystem = []
    }

    createAndDefragment(): number {
        this.#filterOutAllIds()
        this.#createFilesystem()
        this.#recurseThroughIdArray()
        return this.#calculateResult()
    }

    /**
     * get the first array of idArray and search in fileSystem for the first occurence of its id number
     * from there take the length of idArray[i] and get the indices in the filesystem in case it fits you know which * indices have to be replaced
     * 
     * we now have to find out if somewhere in the filesystem is enough space to fit our idArray[i].length inside so * we write a function to parse the array from the beginning if we encounter a '.' we log its index until
     * we encounter a number
     * 
     * we check if the array of dots its >= idArray.length and if so we exchange or splice both
     * 
     * whether or not it works we remove the id from idArray after its done
     * 
     * we recurse through this function until idarray is empty
     */

    #filterOutAllIds() {
        for (let i = this.mapSize - 1; i > 0; i -= 2) {
            const value = this.map.get(i)
            this.idArray.push(value)
        }
    }

    #createFilesystem() {
        for (let i = 0; i < this.map.size; i++) {
            this.map.get(i).map(element => {
                this.fileSystem.push(element);
            })
        }
    }

    #recurseThroughIdArray() {
        const recurseArrayCopy = [...this.idArray]
        while (this.idArray.length > 0) {
            for (let i = 0; i < recurseArrayCopy.length; i++) {
                const idArray = recurseArrayCopy[i];
                const indices = this.#findIdArraysIndices(idArray)
                const [emptySpace, emptySpaceIndices] = this.#findFittingEmptySpace(indices)
                if (emptySpace.length >= idArray.length) {
                    this.#spliceInFileSystem(idArray, indices, emptySpaceIndices)
                }
                this.idArray.pop()
            }
        }
    }

    #findIdArraysIndices(arr: any[]) {
        const indices: number[] = []
        if (arr.length === 0) return indices;
        for (let i = this.fileSystem.length - 1; i > this.map.get(0).length; i--) {
            if (indices.length === arr.length) {
                break;
            }
            if (this.fileSystem[i] === arr[0]) {
                for (let j = 0; j < arr.length; j++) {
                    indices.push(i - j)
                }
            }
        }
        return indices;
    }

    #findFittingEmptySpace(indices: number[]): [(string | number)[], number[]] {
        const emptySpace: (string | number)[] = []
        const emptySpaceIndices: number[] = []
        const firstIndex = indices[indices.length - 1]
        for (let i = 0; i < this.fileSystem.length; i++) {
            if (i >= firstIndex) {
                break;
            }
            if (emptySpace.length >= indices.length) {
                break;
            }
            if (this.fileSystem[i] === '.') {
                emptySpace.push(this.fileSystem[i])
                emptySpaceIndices.push(i)
            } else {
                emptySpace.length = 0
                emptySpaceIndices.length = 0
            }
        }

        return [emptySpace, emptySpaceIndices]
    }

    #spliceInFileSystem(idArray, idArrayIndices, emptySpaceIndices) {
        for (let i = 0; i < emptySpaceIndices.length; i++) {
            this.fileSystem[emptySpaceIndices[i]] = idArray[i]
        }

        for (let i = 0; i < idArrayIndices.length; i++) {
            this.fileSystem[idArrayIndices[i]] = '.'
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