/**
 * Notes
 * 
 * prase input and create arrays with every line break split(\n\n)
 * 
 * with the arrays we get from this we have to parse som more,
 * we create a object ClawMachine with buttonA, buttonB, prize, where every property has x and y for value button A cost 3 and button b cost 1
 * 
 * splitting at \n gives us every line in an array
 * 
 * for every line we can now define a regex that finds the numbers we need
 * 
 * with the collection of ClawMachine Objects we hand them over to EquationSolver which will use cramers rule
 * 
 */

import InputConverter from "./Classes/InputConverter";

const inputPartOne = new InputConverter('./input.txt')
const inputPartTwo = new InputConverter('./input.txt')
const clawMachineArray = inputPartOne.createClawMachineArray()
const clawMachineArrayForBigCalculations = inputPartTwo.createClawMachineArray()

function solvePart1() {
    const start = Date.now();
    let token = 0;
    for (let clawMachine of clawMachineArray) {
        token += clawMachine.solve()
    }
    console.log(token)
    console.log(`Time Part 1: ${Date.now() - start}ms`)
};

function solvePart2() {
    const start = Date.now();
    let token = 0;
    for (let clawMachine of clawMachineArrayForBigCalculations) {
        token += clawMachine.solveInflated()
    }
    console.log(token)
    console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
solvePart2();