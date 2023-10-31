import FieldDefiner from "./Classes/FieldDefiner";
import MapFiller from "./Classes/MapFiller";
import InputConverter from "./Classes/InputConverter";
import SpotCounter from "./Classes/SpotCounter";

const input = new InputConverter('./input.txt').convertToString();
const defineField = new FieldDefiner(input).parseData();
const fillMap = new MapFiller(defineField, input).createMap();
const countDangerousSpots = new SpotCounter(fillMap).countSpots();

function solve() {
    return countDangerousSpots;
}

console.log(solve());