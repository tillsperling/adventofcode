import InputConverter from "./Classes/InputConverter";
import LocationFinder from "./Classes/LocationFinder";
import LocationRangeFinder from "./Classes/LocationRangeFinder";
import MapObjectsCreator from "./Classes/MapObjectsCreator";
import SeedArrayCreator from "./Classes/SeedArrayCreator";
import SeedFinder from "./Classes/SeedFinder";
import SeedRangeCreator from "./Classes/SeedRangeCreator";

// const seedArray = new SeedArrayCreator(input).createSeedsArray();
// const closestLocation = new LocationFinder(seedArray, mapObjects).findClosestLocation();

const input = new InputConverter('./input.txt').convertToArray();
const seedRanges = new SeedRangeCreator(input).createSeedsArray();
const mapObjects = new MapObjectsCreator(input).createMapObjects();

const findClosestSeed = new SeedFinder(seedRanges, mapObjects).findClosestSeed();

// function solvePart1() {
//     // console.log(closestLocation);
// }

function solvePart2() {
    console.log(findClosestSeed);
}

// solvePart1();
solvePart2();
