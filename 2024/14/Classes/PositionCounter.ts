import RobotType from "../Types/Robot";
import Robot from "./Robot";
import { sumUpArray } from "../../../utils/utils";
export default class PositionCounter {
    robots: RobotType[];
    grid: number[][]

    constructor(robots: RobotType[], grid: number[][]) {
        this.robots = robots;
        this.grid = grid;
    }

    fillGridAndCount() {
        for (let robot of this.robots) {
            robot.simulatePosition(100);
            const pos = robot.newPos;
            this.grid[pos[0]][pos[1]] += 1;
        }
        this.#printMap(this.grid.length, this.grid[0].length);
        this.#removeMiddleLines();
        this.#createQuadrants();
        return this.#multiplyQuadrantCount();
    }

    findTheFuckinTree() {
        let seconds = 1;
        while (true) {
            console.log(`Seconds: ${seconds}`);
            for (let robot of this.robots) {
                robot.simulateJustOneSecond();
                const oldPos = robot.oldPos;
                if (this.grid[oldPos[0]][oldPos[1]] > 0) {
                    this.grid[oldPos[0]][oldPos[1]] -= 1;
                }
                const pos = robot.newPos;
                this.grid[pos[0]][pos[1]] += 1;
            }
            const check = this.#checkConsecutive(10);
            console.log(check)
            if (check) {
                this.#printMap(this.grid.length, this.grid[0].length);
                return seconds;
            }
            seconds++;
        }
    }

    #removeMiddleLines() {
        const rows = this.grid.length;
        const cols = this.grid[0].length;
        const middleRow = Math.floor(rows / 2);
        const middleCol = Math.floor(cols / 2);

        if (rows % 2 === 1) {
            this.grid.splice(middleRow, 1);
        }
        if (cols % 2 === 1) {
            for (let i = 0; i < this.grid.length; i++) {
                this.grid[i].splice(middleCol, 1);
            }
        }
    }

    #createQuadrants() {
        const rows = this.grid.length;
        const cols = this.grid[0].length;
        const middleRow = Math.floor(rows / 2);
        const middleCol = Math.floor(cols / 2);

        const topLeft = [];
        const topRight = [];
        const bottomLeft = [];
        const bottomRight = [];

        for (let i = 0; i < middleRow; i++) {
            for (let j = 0; j < middleCol; j++) {
                topLeft.push(this.grid[i][j]);
            }
            for (let j = middleCol; j < cols; j++) {
                topRight.push(this.grid[i][j]);
            }
        }
        for (let i = middleRow; i < rows; i++) {
            for (let j = 0; j < middleCol; j++) {
                bottomLeft.push(this.grid[i][j]);
            }
            for (let j = middleCol; j < cols; j++) {
                bottomRight.push(this.grid[i][j]);
            }
        }
        this.grid = [topLeft, topRight, bottomLeft, bottomRight];
    }

    #multiplyQuadrantCount() {
        let result = 1;
        for (let quadrant of this.grid) {
            let sum = 0;
            for (let i = 0; i < quadrant.length; i++) {
                sum += quadrant[i];
            }
            result *= sum;
        }
        return result;
    }

    #checkConsecutive(x) {
        const rows = this.grid.length;
        const cols = this.grid[0].length;

        // Helper function to check an array for x consecutive non-zero values
        function hasConsecutive(arr, numba) {
            let count = 0;
            for (const val of arr) {
                if (val !== 0) {
                    // console.log('countted up')
                    count++;
                    if (count === numba) {
                        // console.log("Consecutive", numba);
                        // console.log(arr);
                        return true;
                    }
                } else {
                    // console.log(`value reset`)
                    count = 0;
                }
            }
            if (count == 0) {
                return false;
            }
        }

        // Check rows
        for (let i = 0; i < rows; i++) {
            // console.log("Row:", i, this.grid[i]);
            if (hasConsecutive(this.grid[i], x)) {
                console.log("Row:", i, this.grid[i]);
                return true;
            }
        }

        return false;
    }

    #printMap(rows: number, cols: number) {
        for (let r = 0; r < rows; r++) {
            let str = "";
            for (let c = 0; c < cols; c++) {
                // Check if any robot is at (r, c)
                const matches = this.robots.filter(robot => robot.newPos[0] === r && robot.newPos[1] === c);
                str += matches.length > 0 ? "X" : ".";
            }
            console.log(str);
        }
    }
}