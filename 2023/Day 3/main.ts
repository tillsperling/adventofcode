import InputConverter from "./Classes/InputConverter";
import NumberObjectCreator from "./Classes/NumberObjectCreator";
import PartNumberValidator from "./Classes/PartNumberValidator";
import SumGetter from "./Classes/SumGetter";

const input = new InputConverter('./input.txt').convertToArray();
const numberObjectArray = new NumberObjectCreator(input).createNumberObjectsArray()
const validate = new PartNumberValidator(input, numberObjectArray).startValidationProcess();
const sum = new SumGetter(validate).add();

function solvePart1() {
    console.log(sum);
}
function solvePart2() {
}

solvePart1();
// solvePart2();
