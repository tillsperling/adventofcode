/**
 * Notes
 */

import InputConverter from "./Classes/InputConverter";
import Multiplier from "./Classes/Multiplier";

const inputPartOne = new InputConverter('./input.txt').arrangeInputPartOne()
const inputPartTwo = new InputConverter('./input.txt').arrangeInputPartTwo()
const multiplierOne = new Multiplier(inputPartOne);
const multiplierTwo = new Multiplier(inputPartTwo);

function solvePart1() {
    console.log(multiplierOne.init());
};
function solvePart2() {
    console.log(multiplierTwo.init());
};

solvePart1();
solvePart2();