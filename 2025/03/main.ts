/**
 * PART 1
 *
 * joltage rating
 * parse input split at /n
 * map into INT
 * each array is a battery bank
 *
 * a banks max power is build by the
 *
 * we need to find the highest power out of 2 possible batteries, where we can rearrange the block
 *
 * numbers range from 1 to 9
 * we could start a loop with 9 find its occurence and get that index
 * we splice the bank up to that index
 *
 * from there we loop again from 9 down find the highest number and remove the rest of the bank
 * the part between index 0 and the found index and everything after
 *
 * for removing the parts we dont want we can just filter everything not in a set so all numbers
 * that are not the ones we found
 *
 * finally we merge the numbers a x 10 + b
 *
 */

import * as fs from 'fs';
import { sumUpArray } from '../../utils/utils';

const input: number[][]
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((bank) => bank.split('')
        .map((joltage) => parseInt(joltage)),
    );

const part1 = () => {
    const totalJoltage: number[] = [];

    for (const bank of input) {
        const [firstIndex, firstIndexNumber] = findHighestIndex(bank, bank.length, false);

        const slicedArr = bank.slice(firstIndex + 1);
        const [, secondIndexNumber] = findHighestIndex(slicedArr, slicedArr.length, true);

        const filteredArr = [firstIndexNumber, secondIndexNumber];

        totalJoltage.push(mergeArray(filteredArr));
    }

    console.log(sumUpArray(totalJoltage));
};

const findHighestIndex = (bank: number[], length: number, isSecondIndex: boolean): number[] => {
    let index: number = -1;
    let number: number = -1;

    for (let i = 9; i > 0; i--) {
        index = bank.indexOf(i);

        if (isSecondIndex) {
            if (index !== -1) {
                number = i;
                break;
            }
        }

        if (index !== -1 && index !== length - 1) {
            number = i;
            break;
        }
    }
    return [index, number];
};

const mergeArray = (arr: number[]) => {
    return arr[0] * 10 + arr[1];
};

console.time('part1');
part1();
console.timeEnd('part1');

/**
 * PART 2
 *
 * OH NOES
 *
 * it is basically the same as before ...
 * we had a check that for the first index we need the index not to be the last index
 * that was basically to check that we have 1 more number to find
 *
 * now we need to cut that off at length -12
 * and for every iteration we need to lower that number
 *
 * so lets try the same as before
 * we introduce a counter that guarantees getting 12 indices
 *
 * if the length of the bank we search a index is is === 12 we can return the whole thing basically
 *
 */

const part2 = () => {
    const totalJoltage: number[] = [];
    for (let bank of input) {
        const filteredArr: number[] = [];
        let indicesToFill: number = 12;

        while (indicesToFill > 0) {
            const [index, number] = findHighestIndexPart2(bank, bank.length, indicesToFill);
            filteredArr.push(number);

            bank = bank.slice(index + 1);

            indicesToFill--;
        }

        totalJoltage.push(mergeArrayPart2(filteredArr));
    }
    console.log(sumUpArray(totalJoltage));
};

const findHighestIndexPart2 = (bank: number[], length: number, indicesToFill: number) => {
    let index: number = -1;
    let number: number = -1;

    const maxIndex = length - indicesToFill;

    for (let i = 9; i > 0; i--) {
        index = bank.indexOf(i);

        if (index !== -1 && index < maxIndex) {
            number = i;
            break;
        }
    }

    return [index, number];
};

const mergeArrayPart2 = (arr: number[]) => {
    const merged = Number(arr.join(''));
    return (merged);
};

console.time('part2');
part2();
console.timeEnd('part2');