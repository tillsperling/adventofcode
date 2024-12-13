export default class CornerFinder {
    grid: string[][];
    indices: number[][];
    index: number[];
    flower: string;
    rows: number;
    cols: number;
    upperLeft: string;
    upperCenter: string;
    upperRight: string;
    middleLeft: string;
    middleCenter: string;
    middleRight: string;
    lowerLeft: string;
    lowerCenter: string;
    lowerRight: string;
    corners: number


    constructor(grid: string[][], index: number[], flower: string, indices: number[][]) {
        this.grid = grid;
        this.indices = indices;
        this.index = index;
        this.flower = flower;
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.upperLeft = (index[0] > 0 && index[1] > 0) ? this.grid[index[0] - 1][index[1] - 1] : undefined;
        this.upperCenter = (index[0] > 0) ? this.grid[index[0] - 1][index[1]] : undefined;
        this.upperRight = (index[0] > 0 && index[1] < this.cols - 1) ? this.grid[index[0] - 1][index[1] + 1] : undefined;
        this.middleLeft = (index[1] > 0) ? this.grid[index[0]][index[1] - 1] : undefined;
        this.middleCenter = this.grid[index[0]][index[1]];
        this.middleRight = (index[1] < this.cols - 1) ? this.grid[index[0]][index[1] + 1] : undefined;
        this.lowerLeft = (index[0] < this.rows - 1 && index[1] > 0) ? this.grid[index[0] + 1][index[1] - 1] : undefined;
        this.lowerCenter = (index[0] < this.rows - 1) ? this.grid[index[0] + 1][index[1]] : undefined;
        this.lowerRight = (index[0] < this.rows - 1 && index[1] < this.cols - 1) ? this.grid[index[0] + 1][index[1] + 1] : undefined;
        this.corners = 0;
    }

    findCorners() {
        // console.log(this.indices)
        // console.log(`finding corners for ${this.flower} at ${this.index}`);
        this.#getUpperLeft();
        this.#getUpperRight();
        this.#getLowerLeft();
        this.#getLowerRight();
        return this.corners;
    }

    #getUpperLeft() {
        const upperLeftIndex = [this.index[0] - 1, this.index[1] - 1];
        if (this.indices.some(index => JSON.stringify(index) === JSON.stringify(upperLeftIndex))) {
            this.upperLeft = this.grid[this.index[0] - 1][this.index[1] - 1];
        } else {
            this.upperLeft = '.';
        }
        if (
            this.upperCenter === this.flower
            && this.upperLeft != this.flower
            && this.middleLeft != this.flower
        ) {
            return;
        } else if (
            this.upperCenter === this.flower
            && this.upperLeft != this.flower
            && this.middleLeft == this.flower
        ) {
            // console.log(`upper left corner found at ${this.index}`);
            this.corners++;
        } else if (this.upperLeft != this.flower && this.middleLeft != this.flower) {
            // console.log(`upper left corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.upperLeft === this.flower
            && this.upperCenter != this.flower
            && this.middleLeft != this.flower
            && this.upperRight != this.flower
        ) {
            // console.log(`upper left corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.upperLeft === this.flower
            && this.middleLeft != this.flower
            && this.upperCenter != this.flower
        ) {
            // console.log(`lower right corner found at ${this.index}`);
            this.corners++;
        }

    }

    #getUpperRight() {
        const upperRightIndex = [this.index[0] - 1, this.index[1] + 1];
        if (this.indices.some(index => JSON.stringify(index) === JSON.stringify(upperRightIndex))) {
            this.upperRight = this.grid[this.index[0] - 1][this.index[1] + 1];
        } else {
            this.upperRight = '.';
        }
        if (
            this.upperCenter === this.flower
            && this.upperRight != this.flower
            && this.middleRight != this.flower
        ) {
            return;
        } else if (
            this.upperCenter === this.flower
            && this.upperRight != this.flower
            && this.middleRight == this.flower
        ) {
            // console.log(`upper right corner found at ${this.index}`);
            this.corners++;
        } else if (this.upperRight != this.flower && this.middleRight != this.flower) {
            // console.log(`upper right corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.upperRight === this.flower
            && this.upperCenter != this.flower
            && this.middleRight != this.flower
            && this.upperLeft != this.flower
        ) {
            // console.log(`upper left corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.upperRight === this.flower
            && this.middleRight != this.flower
            && this.upperCenter != this.flower
        ) {
            // console.log(`lower right corner found at ${this.index}`);
            this.corners++;
        }
    }

    #getLowerLeft() {
        const lowerLeftIndex = [this.index[0] + 1, this.index[1] - 1];
        if (this.indices.some(index => JSON.stringify(index) === JSON.stringify(lowerLeftIndex))) {
            this.lowerLeft = this.grid[this.index[0] + 1][this.index[1] - 1];
        } else {
            this.lowerLeft = '.';
        }
        if (
            this.lowerCenter === this.flower
            && this.lowerLeft != this.flower
            && this.middleLeft != this.flower
        ) {
            return;
        } else if (
            this.lowerCenter === this.flower
            && this.lowerLeft != this.flower
            && this.middleLeft == this.flower
        ) {
            // console.log(`lower left corner found at ${this.index}`);
            this.corners++;
        } else if (this.lowerLeft != this.flower && this.middleLeft != this.flower) {
            // console.log(`lower left corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.lowerLeft === this.flower
            && this.middleLeft != this.flower
            && this.lowerCenter != this.flower
        ) {
            // console.log(`lower left corner found at ${this.index}`);
            this.corners++;
        }

    }

    #getLowerRight() {
        const lowerRightIndex = [this.index[0] + 1, this.index[1] + 1];
        if (this.indices.some(index => JSON.stringify(index) === JSON.stringify(lowerRightIndex))) {
            this.lowerRight = this.grid[this.index[0] + 1][this.index[1] + 1];
        } else {
            this.lowerRight = '.';
        }
        if (
            this.lowerCenter === this.flower
            && this.lowerRight != this.flower
            && this.middleRight != this.flower

        ) {
            return;
        } else if (
            this.lowerCenter === this.flower
            && this.lowerRight != this.flower
            && this.middleRight == this.flower
        ) {
            // console.log(`lower right corner found at ${this.index}`);
            this.corners++;
        } else if (this.lowerRight != this.flower && this.middleRight != this.flower) {
            // console.log(`lower right corner found at ${this.index}`);
            this.corners++;
        } else if (
            this.lowerRight === this.flower
            && this.middleRight != this.flower
            && this.lowerCenter != this.flower
        ) {
            // console.log(`lower right corner found at ${this.index}`);
            this.corners++;
        }
    }

}