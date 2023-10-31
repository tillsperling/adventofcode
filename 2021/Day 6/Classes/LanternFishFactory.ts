import LanternFishLifecycle from "./LanternFishLifecycle";

export default class LanternFishFactory {
    array: number[];

    constructor(array: number[]) {
        this.array = array;
    }

    convertToLanternFish(): number {
        const lanternFishes = new LanternFishLifecycle(this.array, 80).startCycle();
        return lanternFishes.length;
    }
}