import GameObject from "../types/GameObject";
import Draw from "../types/Draw";

export default class GamesCreator {
    array: string[]
    gameObjectArray: GameObject[] = [];

    constructor(array: string[]) {
        this.array = array
        this.gameObjectArray = [];
    }

    createGameObjectArray() {
        for (let i = 0; i < this.array.length; i++) {
            const gameObject = this.#createGameObject(this.array[i]);
            this.gameObjectArray.push(gameObject)
        }
        return this.gameObjectArray;
    }

    #createGameObject(string: string): GameObject {
        // split up array[i] in game, and draws
        const split = string.split(':');
        const gameId = parseInt(split[0].replace('Game ', ''));
        const draws = split[1].replace('Game ', '').split(';');
        const drawArray: Draw[] = this.#createCorrectDrawArrays(draws)

        let game: GameObject = {
            Game: gameId,
            Draws: drawArray,
            Power: 0,
        }
        return game;
    }

    #createCorrectDrawArrays(drawString: string[]): Draw[] {
        const allDraws: Draw[] = [];
        for (let game of drawString) {
            let red = 0;
            let green = 0;
            let blue = 0;

            const eachGame = game.split(',');
            for (let draw of eachGame) {
                if (draw.includes('red')) {
                    red = parseInt(draw.replace(' red', ''))
                } else if (draw.includes('green')) {
                    green = parseInt(draw.replace(' green', ''))
                } else if (draw.includes('blue')) {
                    blue = parseInt(draw.replace(' blue', ''))
                }
            }
            const drawObject: Draw = {
                Red: red,
                Green: green,
                Blue: blue,
            }
            allDraws.push(drawObject);
        }
        return allDraws;
    }

}