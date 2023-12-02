import GameObject from "../types/GameObject";
import Draw from "../types/Draw";

export default class Validator {
    input: GameObject[];
    sum: number;
    drawValidator: Draw;

    constructor(input: GameObject[]) {
        this.input = input
        this.sum = 0;
        this.drawValidator = {
            Red: 12,
            Green: 13,
            Blue: 14,
        }
    }

    validate() {
        for (let game of this.input) {
            let possible = true;
            for (let i = 0; i < game.Draws.length; i++) {
                if (game.Draws[i].Red > this.drawValidator.Red ||
                    game.Draws[i].Blue > this.drawValidator.Blue ||
                    game.Draws[i].Green > this.drawValidator.Green) {
                    possible = false;
                }
            }
            if (possible) {
                this.sum += game.Game;
            }
        }
        return this.sum;
    }
}