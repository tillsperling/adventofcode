import GalaxyMeasurement from "./Classes/GalaxyMeasurement";
import InputConverter from "./Classes/InputConverter";

const input = new InputConverter('./input.txt').convertToArray();
const solution = new GalaxyMeasurement(input).getLengths();

function solvePart1() {
    console.log(solution);
}

function solvePart2() {

}

solvePart1();
// solvePart2();
