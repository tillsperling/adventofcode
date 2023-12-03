import GearFinder from "./Classes/GearFinder";
import GearChecker from "./Classes/GearChecker"
import InputConverter from "./Classes/InputConverter";
import NumberObjectCreator from "./Classes/NumberObjectCreator";
import PartNumberValidator from "./Classes/PartNumberValidator";
import SumGetter from "./Classes/SumGetter";
import SumUpRatio from "./Classes/SumUpRatio";

const input = new InputConverter('./input.txt').convertToArray();
const numberObjectArray = new NumberObjectCreator(input).createNumberObjectsArray()
const validate = new PartNumberValidator(input, numberObjectArray).startValidationProcess();
const sum = new SumGetter(validate).add();

const gears = new GearFinder(input).findGears();
const gearChecker = new GearChecker(gears).checkIfGearAndFillOutRatio();
const sum2 = new SumUpRatio(gearChecker).add();

function solvePart1() {
    console.log(sum);
}
function solvePart2() {
    console.log(sum2)
}

// solvePart1();
solvePart2();
