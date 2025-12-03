/**
 * split input by comma
 * create arrays of id ranges
 * create array of invalid ids where we push to if found
 * make strings ToInt and sum up
 */
import * as fs from 'fs';
import { sumUpArray } from '../../utils/utils';

const input: [number, number][]
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split(',')
    .map((range: string) => range.split('-'))
    .map(([min, max]: string[]): [number, number] => [parseInt(min), parseInt(max)]);


const part1 = () => {
    const result: number[] = [];

    for (const [min, max] of input) {
        let number: number = min;

        for (let i: number = min; i <= max; i++) {

            const string: string = turnNumberToString(number);
            const invalid: boolean = isInvalid(string);

            if (invalid) result.push(number);

            number++;
        }
    }

    console.log(sumUpArray(result));
};

const turnNumberToString = (number: number) => {
    return number.toString();
};

const isInvalid = (string: string) => {
    const length: number = string.length;
    const validationArr: string[] = [];
    const left = string.slice(0, Math.round(length / 2));
    const right = string.slice(Math.round(length / 2));

    validationArr.push(left);
    validationArr.push(right);

    return validationArr[0] === validationArr[1];

};
console.time('part1');
part1();
console.timeEnd('part1');

/**
 * part 2
 *
 * we can maybe follow the same pattern but cant just split in middle and check if same for validity
 * we need to create a pattern
 *
 * the pattern can only be of length / 2  of the string
 * so we have to create patterns for the first half of the string
 *
 * so we could create a pattern for every part of the string up until that threshold and test the
 * rest of the string for it
 *
 */

const part2 = () => {
    const result: number[] = [];

    for (const [min, max] of input) {
        let number: number = min;

        for (let i: number = min; i <= max; i++) {
            const string: string = turnNumberToString(number);

            if (isInvalidEven(string))
                if (number > 10)
                    result.push(number);

            number++;
        }
    }

    console.log(sumUpArray(result));
};

const isInvalidEven = (string: string): boolean => {
    const length: number = string.length;
    const middle: number = Math.round(length / 2);

    for (let i = 1; i <= middle; i++) {
        const pattern = string.slice(0, i);
        const regex = new RegExp(String.raw`^(${pattern})+$`, 'g');

        if (regex.test(string)) return true;
    }

    return false;

};

console.time('part2');
part2();
console.timeEnd('part2');