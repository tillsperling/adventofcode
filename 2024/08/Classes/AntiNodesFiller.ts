export default class AntiNodesFiller {
    maps: Map<string, number[][]>[];
    mirror: string[][];
    mirrorTwo: string[][];
    antinodeCoordinates: number[][]
    uniqueNodes: number;
    part: number;

    constructor(maps, mirror) {
        this.maps = maps;
        this.mirror = mirror;
        this.mirrorTwo = mirror;
        this.antinodeCoordinates = []
        this.uniqueNodes = 0;
        this.part = 0;
    }

    init(part: number) {
        this.part = part;
        this.#calculateEachMapsAntiNodes();
        this.#fillMirror();
        this.#countUniqueAntinodes();
        return this.uniqueNodes
    }

    #calculateEachMapsAntiNodes() {
        for (let map of this.maps) {
            for (let coordinates of map) {
                this.#getCoordinates(coordinates[1]);
            }
        }
    }

    #getCoordinates(coordinates: number[][]) {
        for (let i = 0; i < coordinates.length; i++) {
            for (let k = 0; k < coordinates.length; k++) {
                if (coordinates[i] === coordinates[k]) {
                    continue;
                } else {
                    const a = coordinates[i][0]
                    const b = coordinates[i][1]
                    const c = coordinates[k][0]
                    const d = coordinates[k][1]

                    const e = a - c
                    const f = b - d

                    const node = [a + e, b + f]
                    const antenna = [a, b]
                    this.antinodeCoordinates.push(node)

                    if (this.part === 2) {
                        this.antinodeCoordinates.push(antenna)
                        this.#fillFullLine(node, e, f)
                    }
                }
            }
        }
    }

    #fillFullLine(node, a, b) {
        let isTrue = true
        while (isTrue) {
            node = [node[0] + a, node[1] + b]
            if (this.#isOutoFBounds(node)) {
                isTrue = false
                break;
            }
            this.antinodeCoordinates.push(node)
        }
    }

    #fillMirror() {
        for (let coordinates of this.antinodeCoordinates) {
            if (this.#isOutoFBounds(coordinates)) {
                continue;
            }
            this.mirror[coordinates[0]][coordinates[1]] = '#'
        }
    }

    #isOutoFBounds(coordinates: number[]) {
        return coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] > this.mirror.length - 1 || coordinates[1] > this.mirror[0].length - 1
    }

    #countUniqueAntinodes() {
        for (let coordinates of this.mirror) {
            for (let coordinate of coordinates) {
                if (coordinate === '#') {
                    this.uniqueNodes++
                }
            }
        }
    }
}