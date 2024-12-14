/**
 * Notes
 * 
 * We have a input of lines which each describe a robots positions and its velocity per second
 * 
 * we create an array filled with dots, where the length of rows and the amount of columns is given by aoc
 * 
 * we create a robot object with these lines and the empty array and fill in the data of position, which we can keep track of and
 * also a move method which will be called 100 times
 * 
 * with the teleport we have to move the bot, 
 * if row < 0 we have to take the value and substract it from amout of rows in the array
 * if row > amount of rows we have to substract amount of rows from it and add it to 0 of rows
 * 
 * if col < 0 we have to tak ethe value and substract it from col.length
 * if col > col.length we have to substract col.len from it 
 * 
 * we will return the objects position on the array and move them to a map where the position is key and value is 1
 * we check if the position already exists in the map and updates its value if its overlapped
 * 
 * with all robots updated we can take the input array and create quadrants from it 
 * the quadrants ignore the middle lines if odd number of cols or rows
 * 
 * then we have a defined stretch of array points
 * for each quadrant of the array we check the map and its values and count up its values, we later multiply these values 
 */

import InputConverter from "./Classes/InputConverter";
import PositionCounter from "./Classes/PositionCounter";
import Robot from "./Classes/Robot";

const inputConverter = new InputConverter('./input.txt', 101, 103)
const [robots, grid] = inputConverter.createInput();
const positionCounter = new PositionCounter(robots, grid)
const treeFinder = new PositionCounter(robots, grid)

function solvePart1() {
    // const start = Date.now();
    console.log(positionCounter.fillGridAndCount())
    // console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    // const start = Date.now();
    console.log(treeFinder.findTheFuckinTree())
    // console.log(`Time Part 2: ${Date.now() - start}ms`)
};

// solvePart1();
solvePart2();