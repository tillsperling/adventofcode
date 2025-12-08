/**
 * PART 1
 *
 * we have a list of junction box
 *
 *  box = {
 *      x: number
 *      y: number
 *      z: number
 *  }
 *
 *  we have to find for each box in this list the closest junction box in 3d space
 *  for this we need to use the straight-line distance
 *
 * example for that
 * box1 x: 1 y: 1 z:-1
 * box2 x: 2 y: 2 z: +1
 *
 * we need squareRoot Math.sqrt()
 * and Math.pow or just a * a
 *
 * d = √[(x–x)² + (y–y)² + (z–z)²]
 * with js
 *
 * we take 3 consts
 * distanceX box1.x - box2.x
 * distanceY box1.x - box2.x
 * distanceZ box1.z - box2.z
 *
 * Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
 *
 * it maybe is needed to calculate the closest box for every box and safe that so that we can sort
 * and always connect the shortest possible connection
 *
 * when we found the next closest junction box by going through all junctions boxes
 * this needs to be a function called in a loop
 * we have to link them in a circuit
 * understanding the problem correctly from the beginning every box is in its own circuit
 * with the first loop done we have 1 circuit of 2 and 18 circuits of one (20 boxes to begin with)
 *
 * now we need to recompute the closest boxes and for our first box need to skip the box we just have
 * in a circuit with them
 *
 * we then resort our array of boxes and find that the next closes box is anohter box around box 1
 * we add that to the already existing circuit and have a circuit of 3 and 17 of 1
 *
 * we have to recalculate again and sort
 *
 * the next closest boxes are boxes not yet in a circuit
 * we connect them and have a circuit of 3, one of 2, and 15 of 1
 *
 * the next two closes boxes are the two boxes that are in a circuit with box 1
 * so we skip them as we cant connect them anymore we maybe could clear that aswell while recalculating
 *
 * after we did 10 connections we have to give results and multiply the 3 largest circuits
 *
 *
 *
 */


import * as fs from 'fs';

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ');

const part1 = () => {
};

console.time('part1');
part1();
console.timeEnd('part1');

const part2 = () => {
};

console.time('part2');
part2();
console.timeEnd('part2');
