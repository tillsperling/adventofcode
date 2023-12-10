import InputConverter from "./Classes/InputConverter";
import MapTraverser from "./Classes/MapTraverser";

const input = new InputConverter('./input.txt').convertToArray();
const solution = new MapTraverser(input).getFarthestPoint();

function solvePart1() {
    console.log(solution);
}

function solvePart2() {

}

solvePart1();
// solvePart2();
