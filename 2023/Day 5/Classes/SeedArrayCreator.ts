export default class SeedArrayCreator {
    input: string[];

    constructor(input: string[]) {
        this.input = input;
    }

    createSeedsArray(): number[] | undefined {
        const seedString = this.input.shift()?.replace('seeds: ', '').split(' ');
        const seedArray = seedString?.map((seed) => { return parseInt(seed) });
        return seedArray;
    }
}