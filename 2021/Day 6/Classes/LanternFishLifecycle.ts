import LanternFishObject from "./Interface/LanternFishObject";
import LanternFish from "./Lanternfish";

export default class LanternFishLifeCycle {
    fishArray: number[];
    amountOfDays: number;

    constructor(fishArray: number[], amountOfDays: number) {
        this.fishArray = fishArray;
        this.amountOfDays = amountOfDays;
    }

    startCycle(): LanternFishObject[] {
        let fishId = 0;
        const updatedFishArray: LanternFishObject[] = [];
        for (let j = 0; j < this.fishArray.length; j++) {
            fishId++;
            const lanternFish = new LanternFish(fishId, 0, this.fishArray[j]);
            const newLanternFish = lanternFish.newLanternFish();
            updatedFishArray.push(newLanternFish);
        }
        for (let i = 1; i < this.amountOfDays + 1; i++) {
            console.log(`After ${i} Day`);
            for (let j = 0; j < updatedFishArray.length; j++) {
                const fish: LanternFishObject = updatedFishArray[j];
                if (fish.initiatedOnDay === i) {
                    continue;
                }
                if (fish.age > -1) {
                    fish.age--;
                }
                if (fish.age === -1) {
                    fish.age = 6;
                    const newFish = new LanternFish(fishId, i, 8);
                    fishId++;
                    updatedFishArray.push(newFish.newLanternFish());
                }
            }
            console.log(updatedFishArray);
        }
        return updatedFishArray
    }
}