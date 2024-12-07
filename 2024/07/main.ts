/**
 * Notes Part1
 * Arranging the input in a way that gives us back an array of number arrays for each line
 * the first array is the result and the second array are all the equation parameters
 * 
 * for each array of the input we need to check every possible combination of operators inbetween the numbers
 * we need to do this in a way that lets us mark which operators we did already
 * 
 * if we have 4 numbers 1 2 3 4 then we have a max of 3 possible operators
 * we could then get the max amount of possibilies per line if we do 2 power(arr.length - 1)
 * the amount is the time we need to loop and maybe also log which operator combinations we had by chaining them in a string like this
 * +*+
 * 
 * if we loop the amount of possible convertions to its binary e.g. 0 = 0000, = 0001, 2 = 0010 we can map the string where each 0 becomes a plus and each 1 becomes a * 
 * this will result in a map containing every possible combination
 * 
 * we then have to use the operator array we created with the .map to use the possible combinations on the the numbers in input[1] to see if the result is === input[0]
 * so IF one equtions returns the number we stop the loop completetly and at that number to an workingResults array
 * 
 * we return the sum of the workingResults array
 * 
 * 
 */

import InputConverter from "./Classes/InputConverter";
import CorrectEquationsFinder from "./Classes/CorrectEquationsFinder";

const inputPartOne = new InputConverter('./input.txt')
const correctEquationsFinder = new CorrectEquationsFinder(inputPartOne.createArrays())

function solve() {
    const start = Date.now();
    const solutions = correctEquationsFinder.init()
    console.log(`Part 1: ${solutions[0]}`)
    console.log(`Part 2: ${solutions[1]}`)
    console.log(`Total Time: ${Date.now() - start}ms`)
}

solve();