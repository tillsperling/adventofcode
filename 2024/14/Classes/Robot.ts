export default class Robot {
    instructions: string[];
    grid: number[][]
    pos: number[]
    vel: number[]
    newPos: number[]
    oldPos: number[]

    constructor(instructions: string[], grid: number[][]) {
        this.instructions = instructions;
        this.grid = grid;
        this.pos = this.#getPos();
        this.vel = this.#getVel();
        this.newPos = [];
        this.oldPos = [];
    }

    simulatePosition(seconds: number) {
        const amountOfRows = this.grid.length  // X
        const amountOfCols = this.grid[0].length; // Y

        for (let i = 0; i < seconds; i++) {
            this.pos[0] += this.vel[0];
            this.pos[1] += this.vel[1];

            this.pos[0] = (this.pos[0] + amountOfRows) % amountOfRows;
            this.pos[1] = (this.pos[1] + amountOfCols) % amountOfCols;

            if (this.pos[0] < 0) {
                this.pos[0] = amountOfRows + this.pos[0]
            }
            if (this.pos[0] > amountOfRows) {
                this.pos[0] = amountOfRows - this.pos[0]
            }

            if (this.pos[1] < 0) {
                this.pos[1] = amountOfCols + this.pos[1]
            }
            if (this.pos[1] > amountOfCols) {
                this.pos[1] = this.pos[1] - amountOfCols
            }
            // console.log(this.pos)
        }
        this.newPos = this.pos
    };

    simulateJustOneSecond() {

        const amountOfRows = this.grid.length  // X
        const amountOfCols = this.grid[0].length; // Y

        this.oldPos = [...this.pos]

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];

        this.pos[0] = (this.pos[0] + amountOfRows) % amountOfRows;
        this.pos[1] = (this.pos[1] + amountOfCols) % amountOfCols;

        if (this.pos[0] < 0) {
            this.pos[0] = amountOfRows + this.pos[0]
        }
        if (this.pos[0] > amountOfRows) {
            this.pos[0] = amountOfRows - this.pos[0]
        }

        if (this.pos[1] < 0) {
            this.pos[1] = amountOfCols + this.pos[1]
        }
        if (this.pos[1] > amountOfCols) {
            this.pos[1] = this.pos[1] - amountOfCols
        }

        this.newPos = this.pos
    }

    #getPos(): number[] {
        let positionInstruction = this.instructions[0].split('=').pop()
        const arr = positionInstruction?.split(',').map(element => parseInt(element))
        return arr?.reverse() ?? []
    }
    #getVel(): number[] {
        let velocityInstructions = this.instructions[1].split('=').pop()
        const arr = velocityInstructions?.split(',').map(element => parseInt(element))
        return arr?.reverse() ?? []
    }
}