/**
 * Notes
 */

import InputConverter from "./Classes/InputConverter";
import DimensionParser from "./Classes/DimensionParser";

const inputConverter = new InputConverter('./input.txt')
const input = inputConverter.convertToArrays();
const dimensionParser = new DimensionParser(input);

function solvePart1() {
    // console.log(dimensionParser.initOne())
};
function solvePart2() {
    // console.log(input);
    console.log(dimensionParser.initTwo());
};

// solvePart1();
solvePart2();