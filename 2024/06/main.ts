/**
 * Notes
 */

import InputConverter from "./Classes/InputConverter";
import PositionMapper from "./Classes/PositionMapper";
import InfiniteLoopCreator from "./Classes/InfiniteLoopCreator";

const input = new InputConverter('./input.txt')
const partOne = input.createInputOne();
const positionMapperOne = new PositionMapper(partOne);
const infiniteLoopCreator = new InfiniteLoopCreator(partOne);


function solvePart1() {
    console.log(`Total Positions Visited Part One: ${positionMapperOne.init()}`);

};
function solvePart2() {
    console.log(`Total Loops Part Two: ${infiniteLoopCreator.init()}`);
};

solvePart1();
solvePart2();