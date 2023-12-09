import HistoryGenerator from "./Classes/HistoryGenerator";
import InputConverter from "./Classes/InputConverter";

const input = new InputConverter('./input.txt').convertToArray();
// const history = new HistoryGenerator(input).handleInput();
const backwards = new HistoryGenerator(input).handleInputBackwards();

function solvePart1() {
    // console.log(history);
}

function solvePart2() {
    console.log(backwards);
}

// solvePart1();
solvePart2();
