/**
 * Notes
 */

import InputConverter from "./Classes/InputConverter";
import RuleChecker from "./Classes/RuleChecker";

const inputConverter = new InputConverter('./input.txt')
const input = inputConverter.init();
const ruleChecker = new RuleChecker(input)
const partOne = ruleChecker.init();


function solvePart1() {
    console.log(partOne)
};
function solvePart2() { };

solvePart1();
// solvePart2();