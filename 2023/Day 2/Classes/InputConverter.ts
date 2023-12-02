//@ts-ignore
import * as fs from "fs";
import GameObject from "../types/GameObject";
import GamesCreator from "./GamesCreator";

export default class InputConverter {
    input: string;
    constructor(input: string) {
        this.input = input;
    }

    convertToArray(): GameObject[] {
        const string = fs.readFileSync(this.input).toString("utf-8");
        const array = string.replace(/\r/g, "").split('\n');
        const gameObjects = this.#convertToObject(array);
        return gameObjects;
    }

    #convertToObject(array: string[]): GameObject[] {
        const games = new GamesCreator(array).createGameObjectArray();
        return games
    }
}