import InputConverter from "./Classes/InputConverter";
import DataStructure from "./Classes/DataStructure";
// import MapTraverser from "./Classes/MapTraverser";
import GhostMapTraverser from "./Classes/GhostMapTraverser";

const input = new InputConverter('./input.txt').convertToArray();
const data = new DataStructure(input).extractData();
// const solution = new MapTraverser(data[0], data[1]).traverseMap();
const ghostSolution = new GhostMapTraverser(data[0], data[1]).traverseMap();

// function solvePart1() {
//     console.log(solution);
// }

function solvePart2() {
    console.log(ghostSolution)
}

// solvePart1();
solvePart2();
