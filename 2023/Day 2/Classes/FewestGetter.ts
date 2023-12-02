import GameObject from "../types/GameObject";
import Draw from "../types/Draw";

export default class FewestGetter {
    input: GameObject[];
    power: number;

    constructor(input: GameObject[]) {
        this.input = input
        this.power = 0;

    }

    check(): number {
        for (let game of this.input) {
            let drawCheck = {
                Red: 0,
                Blue: 0,
                Green: 0,
            }
            for (let i = 0; i < game.Draws.length; i++) {
                if (game.Draws[i].Red > drawCheck.Red) {
                    drawCheck.Red = game.Draws[i].Red;
                }
                if (game.Draws[i].Blue > drawCheck.Blue) {
                    drawCheck.Blue = game.Draws[i].Blue;
                }
                if (game.Draws[i].Green > drawCheck.Green) {
                    drawCheck.Green = game.Draws[i].Green;
                }
            }
            game.Power = drawCheck.Red * drawCheck.Blue * drawCheck.Green;
            this.power += game.Power
        }
        return this.power;
    }
} 