import InputConverter from "./Classes/InputConverter";
import DoubleDigit from "./Classes/DoubleDigit";
import WeirdAssStringDigit from "./Classes/WeirdAssStringDigit"

const input = new InputConverter('./input.txt').convertToArray();
const doubleDigitArrayCreator = new DoubleDigit(input);
const weirdAssStringDigitCreator = new WeirdAssStringDigit(input);

function solvePart1() {
    console.log(doubleDigitArrayCreator.getSolution());
}
function solvePart2() {
    console.log(weirdAssStringDigitCreator.getSolution())
}

// solvePart1();
solvePart2();
