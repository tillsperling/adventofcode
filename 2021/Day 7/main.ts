import InputConverter from "./Classes/InputConverter";
import PositionCalculator1 from "./Classes/PositionCalculator1";
import PositionCalculator2 from "./Classes/PositionCalculator2";

const input = new InputConverter('./input.txt').convertToArray();
const calculationPart1 = new PositionCalculator1(input).startCalculation();
const calculationPart2 = new PositionCalculator2(input).startCalculation();
function solvePart1() {
    console.log(calculationPart1)
}
function solvePart2() {
    console.log(calculationPart2)
}

solvePart2();
