/**
 * Notes
 * 
 * We get a map containing lowercase, uppercase letters and digits
 * each digit or letter has pairs we need to map all different 
 * digits and letters we now where its pairs are
 * 
 * these pairs have antinodes corresponding to their positions
 * the antinode is the mirrored position of the pair 
 * 
 * . . . . . . 
 * . # . . . .
 * . . a . . .
 * . . . a . .
 * . . . . # .
 * . . . . . .
 * 
 * To calculate the antinode we are gonna take the position of our initial antenna e.g [2, 2]
 * and subtract the position of the pair [2,2] - [3,3] = [-1, -1] 
 * this is how we move from [2,2] this results in a antinode at [1, 1]
 * 
 * the second antinode is [3, 3] - [2, 2] = [1, 1] 
 * antinode at [4,4]
 * 
 * to solve the problem we need to count all unique antinodes to make this easier we copy the input array / graph and have it filled with dots
 * when we have an antinode figured out we change the mirrored graph and add a #
 * 
 * 
 * [2, 5] - [4, 4] = [-2, 1] // [0, 6]
 * [4, 4] - [2, 5] = [2, -1] // [6, 3]
 * 
 * 
 * PART 2
 * 
 * if we have 2 antennas in line they create nodes behind the ones they initially created
 * for the above exampe we would fill the whole line with antinodes in the same spacing definition
 * 
 * [0, 6] & [-2, 1] = [-2, 7]
 * [6. 3] & [2, -1] = [8, 2]
 * 
 * 
 */

import InputConverter from "./Classes/InputConverter";
import AntiNodesFiller from "./Classes/AntiNodesFiller";

const inputPartOne = new InputConverter('./input.txt')
const [maps, mirror] = inputPartOne.init()

const antiNodesFiller = new AntiNodesFiller(maps, mirror)
const antiNodesFillerTwo = new AntiNodesFiller(maps, mirror)

function solvePart1() {
    const start = Date.now();
    console.log(antiNodesFiller.init(1))
    console.log(`Time Part 1: ${Date.now() - start}ms`)
};


function solvePart2() {
    const start = Date.now();
    console.log(antiNodesFillerTwo.init(2))
    console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
solvePart2();