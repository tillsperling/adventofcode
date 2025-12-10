/**
 * PART 1
 *
 * we have a 2d array with red tiles and other tiles but row and col are changed?
 *
 * parse into correct order and switch them
 *
 * we want to find the biggest rectangle with red tiles as their corner
 *
 * so we check every red tile with other rectangles and compute their size
 * the checked combination or corners are added to an vet of visited
 * we can push the combination of [a][b] and [b][a] to avoid checkin it again
 *
 * we can also need to find the way to compute the size between corners
 *
 * e.g
 * col, row
 * 5,2 and 7,9 is 24
 *
 * cols = 2 - 9 + 1 = 8 (just make negatives positive)
 * rows = 7 - 5 + 1 = 3
 *
 * 8*3 = 24
 *
 */


import * as fs from 'fs';

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((cord) => {
        return cord.split(',').map((number) => parseInt(number));
    })
    .map((cords) => cords.reverse());


const part1 = () => {
    const length = input.length;
    let biggestArea: number = 0;
    
    for (let i = 0; i < length; i++) {
        const cornerA = input[i];
        const rowA = cornerA[0];
        const colA = cornerA[1];
        
        for (let j = 0; j < length; j++) {
            const cornerB = input[j];
            
            const rowB = cornerB[0];
            const colB = cornerB[1];
            
            const columnDifference = Math.abs(colA - colB) + 1;
            const rowDifference = Math.abs(rowA - rowB) + 1;
            
            const area = columnDifference * rowDifference;
            
            if (area > biggestArea) biggestArea = area;
        }
    }
    
    console.log(biggestArea);
};

console.time('part1');
part1();
console.timeEnd('part1');

const part2 = () => {
};

console.time('part2');
part2();
console.timeEnd('part2');
