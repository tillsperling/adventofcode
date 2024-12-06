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
        return this.loops;
    }

    #moveGuard(start, direction) {
        const stack = [{ position: start, direction }];

        this.pathAlreadyWalked.add(`${start[0]}:${start[1]}`)
        while (stack.length > 0) {
            const { position, direction } = stack.pop();

            let [row, col] = position;
            let [rowMove, colMove] = this.directionCoordinates[direction];
            let newRow = row + rowMove;
            let newCol = col + colMove;
            let newCoordinates = [newRow, newCol];

            if (this.#isOutOfBounds(newCoordinates)) {
                continue;
            }

            this.visitedPositions = new Set();
            this.loopDirection = this.currentDirection;
            this.#placeObstruction(position, this.currentDirection);
            this.#checkIfLoop(position, this.currentDirection);

            let nextIsWall = this.#checkForWall(newCoordinates);
            while (nextIsWall) {
                this.#turnDirection(this.currentDirection);
                [rowMove, colMove] = this.directionCoordinates[this.currentDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                nextIsWall = this.#checkForWall(newCoordinates);
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

        let nextIsWall = this.#checkForWall(newCoordinates);

        while (nextIsWall) {
            this.#turnLoopDirection(this.loopDirection);
            [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
            newRow = row + rowMove;
            newCol = col + colMove;
            newCoordinates = [newRow, newCol];
            nextIsWall = this.#checkForWall(newCoordinates);
        }

        if (this.pathAlreadyWalked.has(`${newRow}:${newCol}`)) {
            return;
        }

        if (this.initialGuardPosition[0] === newRow && this.initialGuardPosition[1] === newCol) {
            return;
        }

        this.obstructionCoordinates = newCoordinates;
        if (this.arrays[newRow][newCol] != "^") {
            this.arrays[newRow][newCol] = "#";
        }
    }

    #removeObstruction(coordinates) {
        let [row, col] = coordinates;
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

            if (this.#isOutOfBounds(newCoordinates)) {
                continue;
            }

            let nextIsWall = this.#checkForWall(newCoordinates);
            while (nextIsWall) {
                this.#turnLoopDirection(this.loopDirection);
                [rowMove, colMove] = this.directionCoordinates[this.loopDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                nextIsWall = this.#checkForWall(newCoordinates);
            }

            const positionString = `${position[0]}:${position[1]}:${direction}`
            if (this.visitedPositions.has(positionString)) {
                this.loops++;
                continue;
            }

            this.visitedPositions.add(positionString);

            if (!this.#isOutOfBounds(newCoordinates)) {
                stack.push({ position: newCoordinates, direction: this.loopDirection });
            }
        }
        this.#removeObstruction(this.obstructionCoordinates);
    }


}