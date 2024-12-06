export default class InfiniteLoopCreator {
    input: [string[][], number[]]
    arrays: string[][];
    initialGuardPosition: number[];
    currentDirection: string;
    loopDirection: string;
    directionCoordinates: { [key: string]: number[] };
    loops: number;
    moves: number;
    visitedPositions: Set<string>;
    pathAlreadyWalked: Set<string>;
    obstructionCoordinates: number[][];

    constructor(input) {
        this.input = input;
        this.arrays = input[0];
        this.initialGuardPosition = input[1];
        this.currentDirection = "up";
        this.loopDirection = "up";
        this.directionCoordinates = {
            up: [-1, 0],
            down: [1, 0],
            left: [0, -1],
            right: [0, 1]
        };
        this.loops = 0;
        this.moves = 0;
        this.visitedPositions = new Set();
        this.pathAlreadyWalked = new Set();
        this.obstructionCoordinates = [];
    }

    init() {
        this.#moveGuard(this.initialGuardPosition, this.currentDirection);
        // console.log(this.visitedPositions)
        console.log(`Total Loops Part Two: ${this.loops}`);
    }

    #moveGuard(start, direction) {
        const stack = [{ position: start, direction }];

        this.pathAlreadyWalked.add(`${start[0]}:${start[1]}`)
        while (stack.length > 0) {
            const { position, direction } = stack.pop();
            // this.#markPosition(position);

            let [row, col] = position;
            let [rowMove, colMove] = this.directionCoordinates[direction];
            let newRow = row + rowMove;
            let newCol = col + colMove;
            let newCoordinates = [newRow, newCol];

            if (this.#isOutOfBounds(newCoordinates)) {
                continue;
            }

            this.visitedPositions = new Set();
            this.#placeObstruction(position, this.currentDirection);
            this.#checkIfLoop(position, this.currentDirection);

            if (this.#checkForWall(newCoordinates)) {
                this.#turnDirection(this.currentDirection);
                [rowMove, colMove] = this.directionCoordinates[this.currentDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                if (this.#checkForWall(newCoordinates)) {
                    // console.log(`wall in front and to the right at ${newRow}, ${newCol}`)
                    this.#turnDirection(this.currentDirection);
                    [rowMove, colMove] = this.directionCoordinates[this.currentDirection];
                    newRow = row + rowMove;
                    newCol = col + colMove;
                    newCoordinates = [newRow, newCol];
                }

            }

            this.pathAlreadyWalked.add(`${row}:${col}`)

            if (!this.#isOutOfBounds(newCoordinates)) {
                stack.push({ position: newCoordinates, direction: this.currentDirection });
            }
        }
    }

    #markPosition(start) {
        let [row, col] = start;
        if (this.arrays[row][col] != "X") {
            this.moves++;
        }
        this.arrays[row][col] = "X";
    }

    #isOutOfBounds(coordinates) {
        let [row, col] = coordinates;
        return row < 0 || row >= this.arrays.length || col < 0 || col >= this.arrays[0].length;
    }

    #checkForWall(coordinates) {
        let [row, col] = coordinates;
        if (this.arrays[row][col] === "#") {
            return true;
        }
    }

    #turnDirection(currentDirection) {
        if (currentDirection === "up") {
            this.currentDirection = "right";
        } else if (currentDirection === "right") {
            this.currentDirection = "down";
        } else if (currentDirection === "down") {
            this.currentDirection = "left";
        } else {
            this.currentDirection = "up";
        }
        // console.log(`Turning to ${this.currentDirection}`);
    }

    #turnLoopDirection(currentDirection) {
        if (currentDirection === "up") {
            this.loopDirection = "right";
        } else if (currentDirection === "right") {
            this.loopDirection = "down";
        } else if (currentDirection === "down") {
            this.loopDirection = "left";
        } else {
            this.loopDirection = "up";
        }
    }


    #checkIfLoop(coordinates, direction) {
        this.loopDirection = direction;
        // console.log(`starting loop with initial direction ${direction}`)
        // we place an obstruction at the next position of the guard

        // we move the guard to the next position
        this.#moveGuardInLoop(coordinates, direction);

        // we remove the obstruction
        this.#removeObstruction(this.obstructionCoordinates);
    }


    #placeObstruction(coordinates, direction) {
        let [row, col] = coordinates;
        let [rowMove, colMove] = this.directionCoordinates[direction];
        let newRow = row + rowMove;
        let newCol = col + colMove;
        let newCoordinates = [newRow, newCol];

        if (this.initialGuardPosition[0] === newRow && this.initialGuardPosition[1] === newCol) {
            console.log(`initial guard position at ${newRow}, ${newCol}`)
            return;
        }


        if (this.pathAlreadyWalked.has(`${newRow}:${newCol}`)) {
            console.log(`path already walked at ${newRow}, ${newCol}`)
            return;
        }

        if (this.arrays[newRow][newCol] === "#") {
            // console.log(`wall at ${newRow}, ${newCol}`)
            this.#turnLoopDirection(this.loopDirection);
            [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
            newRow = row + rowMove;
            newCol = col + colMove;
            newCoordinates = [newRow, newCol];
            if (this.arrays[newRow][newCol] === "#") {
                // console.log(`wall at ${newRow}, ${newCol}`)
                this.#turnLoopDirection(this.loopDirection);
                [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                if (this.arrays[newRow][newCol] === "#") {
                    // console.log(`wall at ${newRow}, ${newCol}`)
                    this.#turnLoopDirection(this.loopDirection);
                    [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                    newRow = row + rowMove;
                    newCol = col + colMove;
                    newCoordinates = [newRow, newCol];
                    if (this.arrays[newRow][newCol] === "#") {
                        // console.log(`wall at ${newRow}, ${newCol}`)
                        this.#turnLoopDirection(this.loopDirection);
                        [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                        newRow = row + rowMove;
                        newCol = col + colMove;
                        newCoordinates = [newRow, newCol];
                    }
                }
            }
        }

        this.obstructionCoordinates = newCoordinates;
        this.arrays[newRow][newCol] = "#";
        console.log(`placing obstruction at ${newRow}, ${newCol}`)
    }

    #removeObstruction(coordinates) {
        let [row, col] = coordinates;
        // console.log(`removing obstruction at ${row}, ${col}`)
        this.arrays[row][col] = ".";
    }

    #moveGuardInLoop(start, direction) {
        const stack = [{ position: start, direction }];


        while (stack.length > 0) {
            const { position, direction } = stack.pop();


            let [row, col] = position;
            let [rowMove, colMove] = this.directionCoordinates[direction];
            let newRow = row + rowMove;
            let newCol = col + colMove;
            let newCoordinates = [newRow, newCol];

            // if we go out of bounds we end the loop and remove the obstruction
            if (this.#isOutOfBounds(newCoordinates)) {
                // console.log(`out of bounds, removing obstruction ar ${this.obstructionCoordinates}`)
                continue;
            }

            const positionString = `${position[0]}:${position[1]}:${direction}`
            // console.log(`checking ${this.visitedPositions} for ${positionString}`)
            if (this.visitedPositions.has(positionString)) {
                console.log(`loop detected at ${positionString}`)
                console.log('obstruction coordinates', this.obstructionCoordinates)
                this.loops++;
                continue;
            }

            this.visitedPositions.add(positionString);

            if (this.#checkForWall(newCoordinates)) {
                // console.log(`wall atta ${newRow}, ${newCol}`)
                this.#turnLoopDirection(this.loopDirection);
                [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                if (this.#checkForWall(newCoordinates)) {
                    // console.log(`wall already at ${newRow}, ${newCol}`)
                    this.#turnLoopDirection(this.loopDirection);
                    [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                    newRow = row + rowMove;
                    newCol = col + colMove;
                    newCoordinates = [newRow, newCol];
                    if (this.#checkForWall(newCoordinates)) {
                        // console.log(`wall already at ${newRow}, ${newCol}`)
                        this.#turnLoopDirection(this.loopDirection);
                        [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                        newRow = row + rowMove;
                        newCol = col + colMove;
                        newCoordinates = [newRow, newCol];
                        if (this.#checkForWall(newCoordinates)) {
                            // console.log(`wall already at ${newRow}, ${newCol}`)
                            this.#turnLoopDirection(this.loopDirection);
                            [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                            newRow = row + rowMove;
                            newCol = col + colMove;
                            newCoordinates = [newRow, newCol];
                        }
                    }
                }
            }

            if (!this.#isOutOfBounds(newCoordinates)) {
                stack.push({ position: newCoordinates, direction: this.loopDirection });
            }
        }
    }

}