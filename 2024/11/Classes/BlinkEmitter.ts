export default class BlinkEmitter {
    stones: number[];
    stoneMap: Map<number, number>
    placeholderMap: Map<number, number>
    amountOfStones: number;

    constructor(stones) {
        this.stones = stones;
        this.stoneMap = new Map()
        this.placeholderMap = new Map();
        this.amountOfStones = 0;
    }

    blink(blinks: number) {
        for (let stone of this.stones) {
            this.stoneMap.set(stone, (this.stoneMap.get(stone) || 0) + 1)
        }

        let blinkCounter = 1;
        while (blinkCounter <= blinks) {
            this.placeholderMap.clear();
            for (const [stone, count] of this.stoneMap.entries()) {
                this.#applyBlinkingRules(stone, count)
            }
            this.stoneMap.clear();
            for (const [stone, count] of this.placeholderMap.entries()) {
                this.#moveToStoneMap(stone, count);
            }
            blinkCounter++
        }
        this.#countStoneValues()
        return this.amountOfStones;
    }

    #applyBlinkingRules(stone, count) {
        if (stone === 0) {
            const newStone = 1
            this.placeholderMap.set(newStone, (this.placeholderMap.get(newStone) || 0) + count)
        } else if (stone.toString().length % 2 == 0) {
            const zeroRegex = /[^0]/g
            const stoneString = stone.toString()
            const stoneLength = stoneString.length
            let leftStone = stoneString.slice(0, stoneLength / 2)
            let rightStone;
            if (zeroRegex.test(stoneString.slice(stoneLength / 2))) {
                rightStone = stoneString.slice(stoneLength / 2);
            } else {
                rightStone = '0';
            }
            this.placeholderMap.set(parseInt(leftStone), (this.placeholderMap.get(parseInt(leftStone)) || 0) + count)
            this.placeholderMap.set(parseInt(rightStone), (this.placeholderMap.get(parseInt(rightStone)) || 0) + count)
        } else {
            const newStone = stone * 2024
            this.placeholderMap.set(newStone, (this.placeholderMap.get(newStone) || 0) + count)
        }
    }

    #moveToStoneMap(stone, count) {
        this.stoneMap.set(stone, count)
    }

    #countStoneValues() {
        for (const [stone, count] of this.stoneMap.entries()) {
            this.amountOfStones += count;
        }
    }
}