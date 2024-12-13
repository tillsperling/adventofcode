import { sumUpArray } from "../../../utils/utils";
import Directions from "../../10/Types/Directions";
import Patch from "../Types/Patch";
import CornerFinder from "./CornerFinder";

export default class PatchParser {
    grid: string[][];
    handledIndices: string[];
    patchMap: Map<number, Patch>;
    directions: Directions;
    currentPatch: Patch;
    patchCounter: number;
    currentFlower: string;

    constructor(input: string[][]) {
        this.grid = input;
        this.handledIndices = [];
        this.patchMap = new Map();
        this.directions = {
            up: [-1, 0],
            right: [0, 1],
            down: [1, 0],
            left: [0, -1]
        };
        this.currentPatch = {
            flower: '',
            area: 0,
            indices: [],
            perimeter: 0,
            corners: 0
        };
        this.patchCounter = 0;
        this.currentFlower = '';
    }

    findPatches(): number[] {
        for (let i = 0; i < this.grid.length; i++) {
            for (let k = 0; k < this.grid[i].length; k++) {
                this.currentFlower = this.grid[i][k];
                this.#handleIndex(this.grid[i][k], [i, k]);
                this.#pushCurrentPatchToMap();
            }
        }
        // console.log(this.patchMap);
        const price = this.#calculateFencePrice();
        const cornerPrise = this.#calculateCornerPrice();
        return [price, cornerPrise];
    }

    #handleIndex(flower: string, index: number[], direction = undefined) {
        if (this.handledIndices.includes(JSON.stringify(index))) {
            return;
        }
        if (
            this.currentFlower != ''
            && this.currentPatch.flower != ''
            && this.currentFlower != this.currentPatch.flower
        ) {
            this.#pushCurrentPatchToMap();
        }

        this.handledIndices.push(JSON.stringify(index));
        this.currentPatch.flower = flower;
        this.currentPatch.indices.push(index); // Store as array of numbers
        this.currentPatch.area += 1;
        this.#lookUpDirections(index);
    }

    #pushCurrentPatchToMap() {
        if (this.currentPatch.flower != '') {
            this.#calculateCorners()
            this.patchMap.set(this.patchCounter, { ...this.currentPatch });
            this.#resetCurrentPatch();
            this.patchCounter++;
        }
    }

    #lookUpDirections(index: number[]) {
        const up = [index[0] + this.directions.up[0], index[1] + this.directions.up[1]];
        const right = [index[0] + this.directions.right[0], index[1] + this.directions.right[1]];
        const down = [index[0] + this.directions.down[0], index[1] + this.directions.down[1]];
        const left = [index[0] + this.directions.left[0], index[1] + this.directions.left[1]];

        const surroundings = [];
        surroundings.push(up, right, down, left);

        for (let i = 0; i < surroundings.length; i++) {

            if (this.#isOutOfBounds(surroundings[i])) {
                this.currentPatch.perimeter += 1;
                continue;
            }

            if (this.grid[surroundings[i][0]][surroundings[i][1]] != this.currentPatch.flower) {
                this.currentPatch.perimeter += 1;
            }

            if (this.grid[surroundings[i][0]][surroundings[i][1]] == this.currentPatch.flower && !this.handledIndices.includes(JSON.stringify(surroundings[i]))) {
                this.#handleIndex(this.grid[surroundings[i][0]][surroundings[i][1]], surroundings[i]);
            }
        }
    }

    #isOutOfBounds(coordinates: number[]) {
        return coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= this.grid.length || coordinates[1] >= this.grid[0].length;
    }

    #calculateCorners() {
        const indices = this.currentPatch.indices;
        for (let i = 0; i < indices.length; i++) {
            const cornerFinder = new CornerFinder(this.grid, indices[i], this.currentPatch.flower, indices);
            this.currentPatch.corners += cornerFinder.findCorners();
        }
        // console.log(`corners for ${this.currentPatch.flower}: ${this.currentPatch.corners}`);
        // console.log(`area for ${this.currentPatch.flower}: ${this.currentPatch.area}`);
    }

    #resetCurrentPatch() {
        this.currentPatch.flower = '';
        this.currentPatch.area = 0;
        this.currentPatch.indices = [];
        this.currentPatch.perimeter = 0;
        this.currentPatch.corners = 0;
    }

    #calculateFencePrice() {
        const priceArray: number[] = [];
        for (const [key, patch] of this.patchMap.entries()) {
            const fencePrice = patch.area * patch.perimeter;
            priceArray.push(fencePrice);
        }

        return sumUpArray(priceArray);
    }

    #calculateCornerPrice() {
        const priceArray: number[] = [];
        for (const [key, patch] of this.patchMap.entries()) {
            const cornerPrice = patch.area * patch.corners;
            priceArray.push(cornerPrice);
        }

        return sumUpArray(priceArray);
    }
}