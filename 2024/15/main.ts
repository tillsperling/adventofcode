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

import InputConverter from "./Classes/InputConverter";
import MovementSimulator from "./Classes/MovementSimulator";

const inputConverter = new InputConverter('./input.txt')
const [coordinates, walls, boxes, empty, robot] = inputConverter.convert();
const movementSimulator = new MovementSimulator(coordinates, walls, boxes, empty, robot)

function solvePart1() {
    // const start = Date.now();
    console.log(movementSimulator.simulateMoves())
    // console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    // const start = Date.now();

    // console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
// solvePart2();