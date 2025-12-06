/**
 * PART 1
 *
 * we get a 2 parted input the database
 * ranges and ids
 * ranges determine fresh ingredients
 * we need to check the ids against ranges and find the fresh ingredients
 *
 * parse input up until the break
 * split at \n to get each range
 *
 * approach
 *
 * create array of 2 numbers begin and end
 * loop all arrays and create 1 map of fresh
 *
 * create one array of ingredients
 * in a loop lookup the set value, if its fresh count up result
 *
 * well fuck the input is gigantic lol
 * checking if lodash inRange does the trick
 *
 * bit too easy
 *
 * what does lodash in range to
 *
 * it takes number, start, end and checks if number is inbetween?
 * number > start && number < end
 *
 *
 */


import * as fs from 'fs';

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n\n')
    .map((element) => element.split('\n'));

const ranges = input[0]
    .map((range) => range.split('-'))
    .map((range) => range.map((number) => parseInt(number)));

const ingredients = input[1]
    .map((ingredient) => parseInt(ingredient));

const part1 = () => {
    let res = 0;
    for (const ingredient of ingredients) {
        for (const range of ranges) {
            if (ingredient >= range[0] && ingredient <= range[1]) {
                res++;
                break;
            }
        }
    }
    console.log(res);
};

console.time('part1');
part1();
console.timeEnd('part1');

/**
 * PART 2
 *
 * now we wont get away this easy
 * we need the amount of ids that are considered fresh
 * the map we created would list that but is too long
 *
 * we need to find a way to make the computation of this number easier
 * the problem are the overlaps we kinda need to get rid of them
 *
 * what is gonna happen if we sort starts
 *
 *  3    5
 *  10  14
 *  12  18
 *
 *  12 is in 10-14 so we just catch that and set the end to 18
 *
 *  16 - 20
 *
 *  16 is in 12-18 so we just cath that and set the end to 20
 *
 *  if all ranges are normalized we just take every range and go
 *  end - (start - 1) these are the ids that are fresh add them up and go
 *
 */

const part2 = () => {
    const sortedRanges = sortRangesByStart();
    const normalizedRanges = normalizeRanges(sortedRanges);
    let res = 0;
    for (const range of normalizedRanges) {
        res += range[1] - (range[0] - 1);
    }

    console.log(res);
};

const sortRangesByStart = () => {
    return ranges.sort((a, b) => a[0] - b[0]);
};

const normalizeRanges = (ranges: number[][]) => {
    const normalizedRanges: number[][] = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const range = ranges[i];
        let inBounds = false;
        
        for (const normalizedRange of normalizedRanges) {
            if (range[0] >= normalizedRange[0] && range[0] <= normalizedRange[1]) {
                inBounds = true;
                if (range[1] > normalizedRange[1]) {
                    normalizedRange[1] = range[1];
                }

            }
        }
        if (!inBounds) normalizedRanges.push(range);
    }
    return normalizedRanges;
};

console.time('part2');
part2();
console.timeEnd('part2');
