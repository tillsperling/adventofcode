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
let res2 = 0;

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

// console.time('part1');
// part1();
// console.timeEnd('part1');

const part2 = () => {
    crossings = createArrayOfCrossings(input);
    
    const crossingMap = new Map();
    crossings.forEach(c => {
        crossingMap.set(`${c.coordinates[0]},${c.coordinates[1]}`, c);
    });
    
    // Build a boolean grid of splitters (only '^') and record S separately
    let startRow = -1, startCol = -1;
    const isSplitter: boolean[][] = input.map((row, r) =>
        row.map((ch, c) => {
            if (ch === 'S') {
                startRow = r;
                startCol = c;
                return false;
            }
            return ch === '^';
        }),
    );

// nextBelow[r][c] = row index of the next '^' strictly below r in column c, or -1 if none
    const nextBelow: number[][] = Array.from({ length: input.length }, () => Array(input[0].length).fill(-1));
    for (let c = 0; c < input[0].length; c++) {
        let next = -1;
        for (let r = input.length - 1; r >= 0; r--) {
            nextBelow[r][c] = next;
            if (isSplitter[r][c]) next = r;
        }
    }
    
    const start = crossings.find(c => c.isStart);
    const queue = [start];
    
    while (queue.length) {
        const current = queue.shift();
        if (!current) continue;
        
        if (current.isStart) {
            const newPos = traverseAndAlterGrid(current.coordinates, crossingMap);
            queue.push(newPos);
        }
        
        if (!current.doneLeft) {
            const newPos = traverseAndAlterGrid(current.startLeft, crossingMap);
            queue.push(newPos);
        }
        
        if (!current.doneRight) {
            const newPos = traverseAndAlterGrid(current.startRight, crossingMap);
            queue.push(newPos);
        }
    }
    
    const lastGridLine = grid[grid.length - 1];
    console.log(lastGridLine);
    console.log(res2);
};

const traverseAndAlterGrid = (start: number[], crossingMap: Map<string, Crossing>) => {
    const length = input.length;
    // const width = input[0].length;
    
    for (let i = 1; i < length; i++) {
        const posRow = start[0] + i;
        const posCol = start[1];
        
        if (posRow >= length) break;
        
        // console.log('checking pos', [posRow, posCol]);
        
        // const value = grid[posRow][posCol];
        //
        // if (typeof value === 'number') {
        //     grid[posRow][posCol] = value + 1;
        // }
        
        const key = `${posRow},${posCol}`;
        const crossing = crossingMap.get(key);
        
        if (crossing) {
            res2++;
            return crossing;
            
        }
    }
};

const createArrayOfCrossings = (input: string[][]) => {
    const crossings = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === 'S' || line[j] === '^') {
                const crossing: Crossing = {
                    coordinates: [i, j],
                    startLeft: [i, j - 1],
                    startRight: [i, j + 1],
                    doneLeft: false,
                    doneRight: false,
                    isStart: false,
                };
                
                if (line[j] === 'S') {
                    crossing.startLeft = [i, j];
                    crossing.startRight = [i, j];
                    crossing.doneLeft = true;
                    crossing.doneRight = true;
                    crossing.isStart = true;
                }
                
                crossings.push(crossing);
            }
        }
    }
    
    return crossings;
};

console.time('part2');
part2(
);
console.timeEnd('part2');
