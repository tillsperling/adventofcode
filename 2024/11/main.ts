/**
 * Notes
 * 
 * We get an array as input in which different numbers are present. They represent the stones
 * 
 * If we blink all stones will change following these rules
 * 
 * All 0 become a 1
 * All stones with double digit split e.g. 24 > 2 4  IF one part of these is just 000, it will become a single 0
 * All stones with an uneven number are multiplied with 2024
 * 
 * We will blink 25 times and count the amount of stones we have by that point.
 * The longer the input the bigger this amount of stones will be, storing them in an array
 * will be super inefficient and probably not even countable
 * 
 * We can map the stones and their values into a map, this map will then contain amount of stones
 * for zeroStones, OneStones, 2024Stones, differentValues of even stones
 * 
 * the key is always the number, the value is the amount
 * 
 * we iterate over the contents of the map and push the results in a newMap, after we iterated
 * we clear the initialMap and set the contents of the new map
 * 
 * this essentially removes all the load from the numbers which are happening a lot 
 * 0,1,2024 
 * 
 * when we blinked a lot we can just iterate through the map and sum up the values (amount of stones per stonenumber)
 * 
 */

import InputConverter from "./Classes/InputConverter";
import BlinkEmitter from "./Classes/BlinkEmitter";

const inputConverter = new InputConverter('./input.txt')
const input = inputConverter.createArrayFromInput();
const blinkEmitterPartOne = new BlinkEmitter(input);
const blinkEmitterPartTwo = new BlinkEmitter(input);

function solvePart1() {
    const start = Date.now();
    console.log(blinkEmitterPartOne.blink(25));
    console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    const start = Date.now();
    console.log(blinkEmitterPartTwo.blink(75));
    console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
solvePart2();