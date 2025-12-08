/**
 * PART 1
 *
 * implement DFS
 *
 * parse input
 * split at \n
 * remove all empty lines
 *
 * we create an array of splitters
 *
 * we need to have a function that traverses down it takes a starting cord
 * for every step down we check if we hit a cord of splitters
 * if we hit a cord of splitters we push the posistion of left and right to a queue
 * we work through that queue
 */


import * as fs from 'fs';
import { sumUpArray } from '../../utils/utils';

interface Crossing {
    coordinates: number[];
    startLeft: number[];
    startRight: number[];
    doneLeft: boolean;
    doneRight: boolean;
    isStart: boolean;
}

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((line) => line.split(''));

let splitters: number[][] = [];
let crossings: Crossing[];

const grid: (string | number)[][] = input.map((line) =>
    line.map((char) => (char === '.' ? 0 : char)),
);

let res = 0;
const res2 = 0;

const part1 = () => {
    splitters = createArrayOfSplitters(input);
    const start = splitters[0];
    const queue = [];
    const visitedSplitters = new Set<string>();
    queue.push(start);
    
    while (queue.length) {
        const startPos = queue.shift();
        if (!startPos) continue;
        
        const [left, right] = traverseDown(startPos, visitedSplitters);
        
        if (left) queue.push(left);
        if (right) queue.push(right);
    }
    console.log(res);
};

const traverseDown = (start: number[], visitedSplitters: Set<string>) => {
    const length = input.length;
    const width = input[0].length;
    const newPositions = [];
    
    for (let i = 1; i < length; i++) {
        const pos = [start[0] + i, start[1]];
        
        if (pos[0] >= length) break;
        
        const key = `${pos[0]},${pos[1]}`;
        
        const isSplitter = splitters.some(([x, y]) => x === pos[0] && y === pos[1]);
        
        if (isSplitter && !visitedSplitters.has(key)) {
            visitedSplitters.add(key);
            const left = [pos[0], pos[1] - 1];
            const right = [pos[0], pos[1] + 1];
            
            if (left[1] >= 0) newPositions.push(left);
            if (right[1] < width) newPositions.push(right);
            
            res++;
            break;
        } else if (isSplitter && visitedSplitters.has(key)) {
            break;
        }
    }
    
    return newPositions;
};

const createArrayOfSplitters = (input: string[][]) => {
    const tree = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === 'S' || line[j] === '^') {
                tree.push([i, j]);
            }
        }
    }
    return tree;
};

console.time('part1');
part1();
console.timeEnd('part1');

const part2 = () => {
    const colCounter: number[] = Array.from(
        { length: input[0].length },
        () => 0,
    );
    
    for (const line of input) {
        for (let i = 0; i < line.length; i++) {
            const currentColValue = colCounter[i];
            if (line[i] === 'S') {
                colCounter[i]++;
            }
            if (line[i] === '^') {
                colCounter[i] = 0;
                colCounter[i + 1] += currentColValue;
                colCounter[i - 1] += currentColValue;
            }
        }
    }
    
    console.log(sumUpArray(colCounter));
};
console.time('part2');
part2(
);
console.timeEnd('part2');
