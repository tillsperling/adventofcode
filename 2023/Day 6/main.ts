import InputConverter from "./Classes/InputConverter";
import LeewayGetter from "./Classes/LeewayGetter";

const input = new InputConverter('./input.txt').convertToArray();
const input2 = new InputConverter('./input.txt').convertToArrayPart2();
const leeway = new LeewayGetter(input).getLeeway();
const leeway2 = new LeewayGetter(input2).getLeeway();

function solvePart1() {
    console.log(leeway);
}

function solvePart2() {
    console.log(leeway2);
}

// solvePart1();
solvePart2();
