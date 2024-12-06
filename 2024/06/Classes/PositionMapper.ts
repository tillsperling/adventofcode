export default class PositionMapper {
    input: [string[][], number[]]
    arrays: string[][];
    initialGuardPosition: number[];
    currentDirection: string;
    directionCoordinates: { [key: string]: number[] };
    moves: number;

    constructor(input) {
        this.input = input;
        this.arrays = input[0];
        this.initialGuardPosition = input[1];
        this.currentDirection = "up";
        this.directionCoordinates = {
            up: [-1, 0],
            down: [1, 0],
            left: [0, -1],
            right: [0, 1]
        };
        this.moves = 0;
    }

    init() {
        this.#moveGuard(this.initialGuardPosition, this.currentDirection);
        console.log(`Total Positions Visited Part One: ${this.moves}`);
    }

    #moveGuard(start, direction) {
        const stack = [{ position: start, direction }];


        while (stack.length > 0) {
            const { position, direction } = stack.pop();
            this.#markPosition(position);

            let [row, col] = position;
            let [rowMove, colMove] = this.directionCoordinates[direction];
            let newRow = row + rowMove;
            let newCol = col + colMove;
            let newCoordinates = [newRow, newCol];

            if (this.#isOutOfBounds(newCoordinates)) {
                continue;
            }

            if (this.#checkForWall(newCoordinates)) {
                this.#turnDirection(this.currentDirection);
                [rowMove, colMove] = this.directionCoordinates[this.currentDirection];
                newRow = row + rowMove;
                newCol = col + colMove;
                newCoordinates = [newRow, newCol];
                if (this.#checkForWall(newCoordinates)) {
                    this.#turnDirection(this.currentDirection);
                    [rowMove, colMove] = this.directionCoordinates[this.currentDirection];
                    newRow = row + rowMove;
                    newCol = col + colMove;
                    newCoordinates = [newRow, newCol];
                }
            }

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
            // console.log(`Wall at ${row}, ${col}`);
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
}