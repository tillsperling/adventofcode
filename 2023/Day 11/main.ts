import InputConverter from "./Classes/InputConverter";
import GalaxyMeasurement from "./Classes/GalaxyMeasurement";
import InputConverterPart2 from "./Classes/InputConverterPart2";
import GalaxyMeasurementPart2 from "./Classes/GalaxyMeasurementPart2";

const input1 = new InputConverter('./input.txt').convertToArray();
const solution1 = new GalaxyMeasurement(input1).getLengths();
const input = new InputConverterPart2('./input.txt').convertToArray();
const map: Map<string, string> = input[0];
const expandedRows: number[] = input[1];
const expandedColumns: number[] = input[2];
const solution = new GalaxyMeasurementPart2(map, expandedRows, expandedColumns).getLengths();


// function solvePart1() {
//     console.log(solution1);
// }

function solvePart2() {
    console.log(solution);
}

// solvePart1();
solvePart2();
