/**
 * PART 1
 * put away paper rolls @ with a forklift
 * we have to check a 2d array if the paper towel is surrounded (8 spots)
 * by less than 4 other towels
 *
 * if so we can move it out of the way
 *
 * to avoid negative lookups we create an extra row of emptys in the first and last line
 * and also we push one in the last of each line
 * and we unshift one at the beginning of each line
 *
 * we parse the input and split at \n
 * then we split at ''
 * we push and unshift
 * and we unshift a new array of length of index 0
 * and we push a new array of length of index 0
 *
 * create result = 0
 * bruteforce iterate through the array and check all adjacents for @
 * if that adjacentCheck function returns < 3 we can result++
 *
 * less bruteforcy
 *
 * iterate through the whole thing and create a map?
 * map key position in map to value . or @
 * figure out the map lookup for all 8 adjacent in the map
 *
 * for the lookup we only wanna check paper rolls, so we
 *
 * we need to find
 *
 * the one above (+1 and -1)
 * the one we are at (+1 and -1)
 * the one below (+1 and -1)
 *
 * the one above is current - length
 * the one below is current + length
 *
 * 1   2   3   4   5   6
 * 7   8   9   10  11  12
 */

/**
 * PART 2
 *
 * we now gonna update both maps after we removed the rolls
 * we have to keep track of the removed rolls, and set their values as we are done
 */

import * as fs from 'fs';

type Input = Map<number, '.' | '@'>

const input: string[][]
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((row) => (`.${row}.`))
    .map((row) => row.split(''));

const rowLength = input[0].length;
const rowOfBlanks = Array.from(Array(rowLength)).fill('.');
input.push(rowOfBlanks);
input.unshift(rowOfBlanks);


const part1 = () => {
    const [fullMap, paperMap] = createMapAndSet(input);
    const [, result] = findAdjacents(fullMap, paperMap);
    console.log(result);
};

console.time('part1');
part1();
console.timeEnd('part1');

const part2 = () => {
    const [fullMap, paperMap] = createMapAndSet(input);

    let movedRolls: number[] = [];
    let result = 0;

    do {
        const [newMovedRolls, newResult] = findAdjacents(fullMap, paperMap);
        movedRolls = newMovedRolls;
        result += newResult;

        for (const roll of movedRolls) {
            paperMap.delete(roll);
            fullMap.set(roll, '.');
        }
    } while (movedRolls.length > 0);

    console.log(result);
};

console.time('part2');
part2();
console.timeEnd('part2');

const createMapAndSet = (arr: string[][]): Input[] => {
    const fullMap = new Map();
    const paperMap = new Map();

    let i = 1;
    for (const row of arr) {
        for (let j = 0; j < row.length; j++) {
            fullMap.set(i, row[j]);

            if (row[j] === '@') paperMap.set(i, row[j]);

            i++;
        }
    }
    return [fullMap, paperMap];
};

const findAdjacents = (fullMap: Input, paperMap: Input): [number[], number] => {
    let res = 0;
    const movedRolls: number[] = [];

    paperMap.forEach((value, key) => {
        let amount = 0;
        const lookupArray: number[] = createLookupArray(key);

        for (const key of lookupArray) {
            if (fullMap.get(key) === '@') amount++;
        }

        if (amount < 4) {
            res++;
            movedRolls.push(key);
        }

    });

    return [movedRolls, res];
};

const createLookupArray = (key: number) => {
    const above = key - rowLength;
    const aboveLeft = above - 1;
    const aboveRight = above + 1;
    const left = key - 1;
    const right = key + 1;
    const below = key + rowLength;
    const belowLeft = below - 1;
    const belowRight = below + 1;

    return [aboveLeft, above, aboveRight, left, right, belowLeft, below, belowRight];
};
