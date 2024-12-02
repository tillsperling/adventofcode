/**
 * Notes
 */

import InputConverter from "./Classes/InputConverter";
import SafetyCounter from "./Classes/SafetyCounter";

const inputPartOne = new InputConverter('./input.txt').turnInputIntoArrays()
const safetyCounter = new SafetyCounter(inputPartOne)


function solvePart1() {
    console.log(safetyCounter.init())
};
function solvePart2() {
    console.log(safetyCounter.initTwo())
};

// solvePart1();
solvePart2();