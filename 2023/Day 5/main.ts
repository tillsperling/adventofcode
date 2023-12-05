import InputConverter from "./Classes/InputConverter";
import MapObjectsCreator from "./Classes/MapObjectsCreator";
import SeedArrayCreator from "./Classes/SeedArrayCreator";

const input = new InputConverter('./input.txt').convertToArray();
const seedArray = new SeedArrayCreator(input).createSeedsArray();
const mapObjects = new MapObjectsCreator(input).createMapObjects();
function solvePart1() {
    console.log(mapObjects);
}
function solvePart2() {

}

solvePart1();
// solvePart2();
