export default class SeedRangeCreator {
    input: string[];

    constructor(input: string[]) {
        this.input = input;
    }

    createSeedsArray() {
        const seedString = this.input.shift()?.replace('seeds: ', '').split(' ');
        const seedArray = seedString?.map((seed) => { return parseInt(seed) });
        const seedRanges: number[][] = [];
        if (seedArray != undefined) {
            for (let i = 0; i < seedArray.length; i += 2) {
                seedRanges.push([seedArray[i], seedArray[i] + seedArray[i + 1]]);
            }
        }
        return seedRanges
    }
}