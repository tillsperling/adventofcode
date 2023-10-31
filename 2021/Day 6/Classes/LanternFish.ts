import LanternFishObject from "./Interface/LanternFishObject"

export default class LanternFish {
    fishId: number;
    initiated: number;
    age: number;

    constructor(fishId: number, initiated: number, age: number) {
        this.fishId = fishId;
        this.initiated = initiated;
        this.age = age;
    }

    newLanternFish(): LanternFishObject {
        const lanternFish = {
            fishId: this.fishId,
            initiatedOnDay: this.initiated,
            age: this.age,
        }
        return lanternFish;
    }
}