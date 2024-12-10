/**
 * Notes
 * 
 * We need to find the trailhead scores of each starting position 0
 * The score is determined by how many 9s are reachable from a 0
 * the 9 does only count once
 * 
 * we put the lines into arrays and create a map of starting positions 0 with incrementing keys and the indices
 * we create a map for all peaks (9s) with incrementing keys and indices
 * 
 * we have possible directions up, right, down, left
 *  -1 0
 *  0 +1
 *  +1 0
 *  0 -1
 * 
 * We now start from the first 0 starting point checking all directions any direction where the value of index isnt +1 (1) is dropped
 * we could recurse from the index we are at and continue the checking the next directions if we are at 9 interations we have to mark that 9 as reached
 * 
 * we push the index of the reached 9 in a new map where THE INDEX IS THE KEY and the value is a bool or something
 * 
 * the score of the trailhead is now its 9map size
 */

import InputConverter from "./Classes/InputConverter";
import Pathfinder from "./Classes/PathFinder";

const inputPartOne = new InputConverter('./input.txt')
const pathFinder = new Pathfinder(inputPartOne.createGrid());

function solvePart1() {
    const start = Date.now();
    console.log(pathFinder.findTrails())
    console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    // const start = Date.now();

    // console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
// solvePart2();