import InputConverter from "./Classes/InputConverter";
import Validator from "./Classes/Validator";
import FewestGetter from "./Classes/FewestGetter";

const input = new InputConverter('./input.txt').convertToArray();
const validate = new Validator(input).validate();
const fewest = new FewestGetter(input).check();

function solvePart1() {
    console.log(validate);
}
function solvePart2() {
    console.log(fewest)
}

// solvePart1();
solvePart2();
