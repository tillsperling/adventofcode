/**
 * We have a 2D Map of garden patches. 
 * 
 * There are multiple flowers growing, identified by a letter A-Z
 * 
 * We need to create patches with the information about how many flowers are in that patch: AREA
 * and the perimeter of the patches fence which is every side that doesnt touch a flower of the same patch: PERIMETER
 * 
 * In the end we need to calculate the fence pricing by multiplying every patches area by its fence perimeter
 * 
 * We parse the input and create the 2D array.
 * 
 * Looping over the input we have to create a Map for every patch
 * 
 * Map <id, Object containing Flower, Area, Perimeter>
 * 
 * To create the map we check the content of the first index
 * we look into every direction of the index and check if the neighbour is the same flower if so 
 * we add its index to the array for that patch and continue
 * 
 * for every neighbouring flower of the same type we have to do that again until we dont have a neighbour 
 * 
 * to check for the perimeter
 * 
 * we have to count up every time in that loop check of a flower where we encounter something different than the flower, be it OOB
 * or another patch
 * 
 * Map gets pushed into map array
 * 
 * we loop over the map array and multiply te area x perimeter
 * 
 * PART2
 * 
 * we can calculate the sides by finding non shared sides of each flower
 * 
 */

import InputConverter from "./Classes/InputConverter";
import PatchParser from "./Classes/PatchParser";

const inputPartOne = new InputConverter('./input.txt')
const patchParser = new PatchParser(inputPartOne.createGrid());

function solvePart1() {
    // const start = Date.now();
    console.log(patchParser.findPatches())
    // console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    // const start = Date.now();

    // console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
// solvePart2();