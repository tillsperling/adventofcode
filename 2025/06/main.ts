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

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((problem) => problem.split(/\s/))
    .map((problem) => problem.filter((element) => element !== ''));

const maxLengths: number[][] = Array.from({ length: input[0].length }, () => [0]);

const input2
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ');

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
    // console.log(sumUpArray(sol));
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
 *
 */

const part2 = () => {
    console.log(input2);
};


console.time('part2');
part2();
console.timeEnd('part2');
