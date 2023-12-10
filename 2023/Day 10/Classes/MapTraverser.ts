import Neighbours from "../Types/Neighbours";
import StartUtil from "./StartUtil";

type Direction = keyof Neighbours;

export default class MapTraverser {
    map: string[][];
    start: number[];
    currentPosition: number[];
    previousPosition: number[];
    previousSymbol: string;
    currentSymbol: string
    locations: number[][]
    steps: number;
    loopOver: boolean

    constructor(input: string[][]) {
        this.map = input;
        this.start = [];
        this.currentPosition = [];
        this.previousPosition = [];
        this.previousSymbol = ''
        this.currentSymbol = 'S';
        this.locations = [];
        this.steps = 0;
        this.loopOver = false;
    }

    getFarthestPoint(): number {
        const startUtil = new StartUtil()
        this.start = startUtil.findStart(this.map);
        this.currentPosition = this.start;
        this.#traverseMap();
        return this.steps / 2;
    }

    #traverseMap(): void {
        this.locations.push(this.start);
        while (true) {
            for (let i = 0; i < this.locations.length; i++) {
                // console.log('starting loop for ' + this.locations[i])
                this.steps++;
                const startUtil = new StartUtil()
                const neighbours = startUtil.findNeighbours(this.map, this.locations[i]);
                const directions = Object.keys(neighbours) as (keyof Neighbours)[];
                for (let direction of directions) {
                    if (
                        neighbours[direction] === '.') {
                        continue;
                    } else if (this.#isDirectionLegit(direction)) {
                        continue
                    } else {
                        if (this.currentSymbol === 'S' && this.steps < 2) {
                            const nextDir: number[] = this.#setNextDirection(direction);
                            this.previousSymbol = this.currentSymbol
                            this.currentSymbol = neighbours[direction]
                            this.previousPosition = this.locations[i]
                            this.currentPosition = nextDir
                            this.locations.shift()
                            this.locations.push(nextDir);
                            break

                        } else {
                            if (
                                this.#isPreviousDirection(direction)) {
                                continue;
                            }
                            if (neighbours[direction] === 'S') {
                                this.loopOver = true
                            }
                            const nextDir: number[] = this.#setNextDirection(direction);
                            this.previousSymbol = this.currentSymbol
                            this.currentSymbol = neighbours[direction]
                            this.previousPosition = this.locations[i]
                            this.currentPosition = nextDir
                            this.locations.shift()
                            this.locations.push(nextDir);
                            break
                        }
                    }
                }
                if (this.loopOver) {
                    return;
                }
            }
        }
    }

    #setNextDirection(direction: string): number[] {
        const nextPosition: number[] = [];
        switch (this.currentSymbol) {
            case 'S':
                if (direction === 'top') {
                    nextPosition.push(this.currentPosition[0] - 1)
                    nextPosition.push(this.currentPosition[1])
                } else if (direction === 'left') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] - 1)
                } else if (direction === 'right') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] + 1)
                } else if (direction === 'bottom') {
                    nextPosition.push(this.currentPosition[0] + 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
            case '-':
                if (direction === 'left') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] - 1)
                } else if (direction === 'right') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] + 1)
                }
                break;
            case '7':
                if (direction === 'left') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] - 1)
                } else if (direction === 'bottom') {
                    nextPosition.push(this.currentPosition[0] + 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
            case '|':
                if (direction === 'top') {
                    nextPosition.push(this.currentPosition[0] - 1)
                    nextPosition.push(this.currentPosition[1])
                } else if (direction === 'bottom') {
                    nextPosition.push(this.currentPosition[0] + 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
            case 'J':
                if (direction === 'left') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] - 1)
                } else if (direction === 'top') {
                    nextPosition.push(this.currentPosition[0] - 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
            case 'L':
                if (direction === 'right') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] + 1)
                } else if (direction === 'top') {
                    nextPosition.push(this.currentPosition[0] - 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
            case 'F':
                if (direction === 'right') {
                    nextPosition.push(this.currentPosition[0])
                    nextPosition.push(this.currentPosition[1] + 1)
                } else if (direction === 'bottom') {
                    nextPosition.push(this.currentPosition[0] + 1)
                    nextPosition.push(this.currentPosition[1])
                }
                break;
        }
        return nextPosition
    }

    #isPreviousDirection(direction: string): boolean {
        const testPosition: number[] = []
        if (direction === 'top') {
            testPosition.push(this.currentPosition[0] - 1)
            testPosition.push(this.currentPosition[1])
        } else if (direction === 'left') {
            testPosition.push(this.currentPosition[0])
            testPosition.push(this.currentPosition[1] - 1)
        } else if (direction === 'right') {
            testPosition.push(this.currentPosition[0])
            testPosition.push(this.currentPosition[1] + 1)
        } else if (direction === 'bottom') {
            testPosition.push(this.currentPosition[0] + 1)
            testPosition.push(this.currentPosition[1])
        }
        if (testPosition[0] === this.previousPosition[0] && testPosition[1] === this.previousPosition[1]) {
            return true
        }
        return false
    }

    #isDirectionLegit(direction: string): boolean {
        switch (this.currentSymbol) {
            case 'S':
                return false;
            case '|':
                if (direction === 'left' || direction === 'right') {
                    return true;
                }
                break;
            case '-':
                if (direction === 'top' || direction === 'bottom') {
                    return true;
                }
                break;
            case 'L':
                if (direction === 'bottom' || direction === 'left') {
                    return true;
                }
                break;
            case 'J':
                if (direction === 'bottom' || direction === 'right') {
                    return true;
                }
                break;
            case '7':
                if (direction === 'top' || direction === 'right') {
                    return true;
                }
                break;
            case 'F':
                if (direction === 'top' || direction === 'left') {
                    return true;
                }
                break;
        }
        return false;
    }
}