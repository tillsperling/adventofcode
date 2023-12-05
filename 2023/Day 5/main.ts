import InputConverter from "./Classes/InputConverter";
import LocationFinder from "./Classes/LocationFinder";
import MapObjectsCreator from "./Classes/MapObjectsCreator";
import SeedArrayCreator from "./Classes/SeedArrayCreator";

const input = new InputConverter('./input.txt').convertToArray();
const seedArray = new SeedArrayCreator(input).createSeedsArray();
const mapObjects = new MapObjectsCreator(input).createMapObjects();
const closestLocation = new LocationFinder(seedArray, mapObjects).findClosestLocation();

function solvePart1() {
    console.log(closestLocation);
}
function solvePart2() {

}

solvePart1();
// solvePart2();
