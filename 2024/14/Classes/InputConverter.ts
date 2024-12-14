//@ts-ignore
import * as fs from "fs";
import Robot from "./Robot";
import RobotType from "../Types/Robot"

export default class InputConverter {
    input: string;
    cols: number;
    rows: number;
    grid: number[][];
    robots: RobotType[]

    constructor(input: string, cols: number, rows: number) {
        this.input = input;
        this.cols = cols;
        this.rows = rows;
        this.grid = this.#createGridArray()
        this.robots = [];
    }

    createInput(): [RobotType[], number[][]] {
        const string = this.#turnInputIntoString();
        const arrayOfInstructions = string.replace(/\r/g, "").split('\n').map((element) => element.split(' '))
        this.#createRobots(arrayOfInstructions);
        return [this.robots, this.grid]
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString("utf-8");
    }

    #createRobots(instuctionsArr: string[][]) {
        for (let line of instuctionsArr) {
            const robot = new Robot(line, this.grid);
            this.robots.push(robot);
        }
    }

    #createGridArray(): number[][] {
        const gridArr: number[][] = []
        for (let i = 0; i < this.rows; i++) {
            const arr: number[] = new Array(this.cols).fill(0)
            gridArr.push(arr);
        }

        return gridArr
    }
}