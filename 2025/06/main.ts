/**
 * PART 1
 *
 * input is a little wweird
 *
 * we split at '\n'
 * after that we have arrays for each step of the problems
 * so we have to go through each step and fill the problems step after step
 *
 * map and split at each white space?
 
 */


import * as fs from 'fs';
import { sumUpArray } from '../../utils/utils';

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((problem) => problem.split(/\s/))
    .map((problem) => problem.filter((element) => element !== ''));

const maxLengths: number[][] = Array.from({ length: input[0].length }, () => [0]);

const part1 = () => {
    const sol = [];
    const problems = createProblems();
    
    for (const problem of problems) {
        let res = 0;
        const operator = problem.pop();
        
        if (operator === '*') res = 1;
        
        for (let i = 0; i < problem.length; i++) {
            if (operator === '*') {
                res *= problem[i] as number;
            } else {
                res += problem[i] as number;
            }
        }
        
        sol.push(res);
    }
    console.log(sumUpArray(sol));
};

const createProblems = () => {
    const problems: string[][] = Array.from({ length: input[0].length }, () => []);
    
    for (let i = 0; i < input[0].length; i++) {
        for (const problem of input) {
            if (problem[i].length > maxLengths[i][0]) maxLengths[i] = [problem[i].length];
            problems[i].push(problem[i]);
        }
    }
    
    return problems.map((problem) =>
        problem.map((element) => {
            if (isNaN(parseInt(element))) {
                return element;
            } else {
                return parseInt(element);
            }
        }),
    );
};

console.time('part1');
part1();
console.timeEnd('part1');

/**
 * PART 2
 *
 * reparse the input
 * count amount of columns by amount of operators
 *
 */

const input2 = fs.readFileSync('./input.txt', 'utf-8')
    .replace(/\r/g, '')
    .split('\n');

const grid = input2.map(line => line.trim().split(/\s+/));
const operators = grid.pop();
input2.pop();

/**
 * each input line is exactly the same length, we can create our array by just pushing each line in a new array
 */

const part2 = () => {
    const length = input2[0].length;
    const columns: string[][] = Array.from({ length: length }, () => []);
    const turnedColumns: string[][][] = Array.from(
        { length: grid[0].length },
        () => [],
    );
    
    
    for (const line of input2) {
        for (let i = 0; i < length; i++) {
            columns[i].push(line[i]);
        }
    }
    
    let index = 0;
    for (const column of columns) {
        if (column.some((element) => /\d/.test(element))) {
            turnedColumns[index].push(column);
        } else {
            index++;
        }
    }
    
    const solutionArr = [];
    let operatorIndex = 0;
    for (const problem of turnedColumns) {
        const numbers = [];
        for (const subSet of problem) {
            const numberArr = subSet.filter((element) => /\d/.test(element));
            const number = turnStringToNumber(numberArr);
            numbers.push(number);
        }
        
        let sum = 0;
        const operator = operators![operatorIndex];
        if (operator === '*') sum = 1;
        for (const number of numbers) {
            if (operator === '*') {
                sum *= number;
            } else {
                sum += number;
            }
        }
        solutionArr.push(sum);
        operatorIndex++;
    }
    
    console.log(sumUpArray(solutionArr));
};

const turnStringToNumber = (arr: string[]) => {
    let str = '';
    for (const char of arr) {
        str += char;
    }
    return parseInt(str);
};

console.time('part2');
part2();
console.timeEnd('part2');
