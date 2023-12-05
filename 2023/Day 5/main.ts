import InputConverter from "./Classes/InputConverter";
import LocationFinder from "./Classes/LocationFinder";
import MapObjectsCreator from "./Classes/MapObjectsCreator";
import SeedArrayCreator from "./Classes/SeedArrayCreator";
import SeedRangeCreator from "./Classes/SeedRangeCreator";

// const seedArray = new SeedArrayCreator(input).createSeedsArray();
// const mapObjects = new MapObjectsCreator(input).createMapObjects();
// const closestLocation = new LocationFinder(seedArray, mapObjects).findClosestLocation();

const input = new InputConverter('./input.txt').convertToArray();
const seedRanges = new SeedRangeCreator(input).createSeedsArray();

// function solvePart1() {
//     // console.log(closestLocation);
// }

function solvePart2() {
    console.log(seedRanges);
}

// solvePart1();
solvePart2();
