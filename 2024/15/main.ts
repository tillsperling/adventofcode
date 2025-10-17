/**
 * Notes
 * 
 * We get an input of a grid with walls, boxes, empty tiles and a robot.
 * We also get directions the bot attempts to move
 * 
 * We parse the input into just the grid
 * 
 * a map of boxes, a map of walls and the bots position in an array
 * 
 * we are now creating a move simulator that loops over the coordinates in a while coordrinate lenght > 0 loop
 * with every loop it shifts the first element
 * 
 * we are taking the robots positions and apply [0][-1] for left if whatever comes after this
 * is an empty tile we move
 * if its a box we check in a loop for whats after the box until we find an empty tile, while looping we add all boxes coordinates to another array
 * if we found the empty tile we update all boxes we encountered with [0][-1]
 * 
 * if we dont find the empty tile we break and start with the next
 * 
 * after all directions are done we iterate over the map of boxes and calculate 100 x distance to top edge [THIS][X] + [X][THIS]
 * we push that sum into an array and sum it up to return
 * 
 */

/**
 * Notes 2 
 * 
 * Input stays the same, but the interpretation changes and the handling of moving crates
 * 
 * each element except for the robot doubles in size
 * 
 * if for every wall encountered another wall is put into map next to it we will have all the walls
 * 
 * if for every empty space we encounter another empty space is put next to it we have all empty spaces
 * 
 * we have to add one extra empty space after our robot
 * 
 * for the boxes its gonna be harder as one box is a pair now and they cnat disconnect
 * 
 * boxes now get a key of boxPos1 and boxPos2,
 * in all the checks for the movementsimulator we have to check if any of boxPos1 or boxPost2 + nextpos affects anohters boxPos1 or boxPos2
 * 
 */

import InputConverter from "./Classes/InputConverter";
import MovementSimulator from "./Classes/MovementSimulator";
import BiggerMovementSimulator from "./Classes/BiggerMovementSimulator";

const inputConverter = new InputConverter('./input.txt')
const [coordinates, walls, boxes, empty, robot] = inputConverter.convert();
const movementSimulator = new MovementSimulator(coordinates, walls, boxes, empty, robot)

const inputConverterPartTwo = new InputConverter('./input.txt')
const [coordinatesTwo, wallsTwo, boxesTwo, emptyTwo, robotTwo] = inputConverterPartTwo.convertPartTwo();
const biggerMovementSimulator = new BiggerMovementSimulator(coordinatesTwo, wallsTwo, boxesTwo, emptyTwo, robotTwo)

function solvePart1() {
    // const start = Date.now();
    console.log(movementSimulator.simulateMoves())
    // console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    // const start = Date.now();
    console.log(biggerMovementSimulator.simulateMoves())
    // console.log(`Time Part 2: ${Date.now() - start}ms`)
};

// solvePart1();
solvePart2();