/**
 * Notes
 * Each Line has two numbers, parse strings and put the first number in array 1 the second in array 2
 * sort both arrays low to high
 * give both arrays to a comparer function that throws the distance in the distance array
 * sum up the distance array
 */

import InputConverter from "./Classes/InputConverter";
import DistanceCalculator from "./Classes/DistanceCalculator";
import SimilarityCalculator from "./Classes/SimiliarityCalculator";

const inputPartOne = new InputConverter('./input.txt').splitInputIntoArraysAndSort()
const inputPartTwo = new InputConverter('./input.txt').splitInputIntoArrays()
const distances = new DistanceCalculator(inputPartOne).getDistances()
const similiarities = new SimilarityCalculator(inputPartTwo).getSimiliarityScore()

function solvePart1() {
    console.log('Solution of Part 1 is ' + distances);
};

function solvePart2() {
    console.log('Solution of Part 2 is ' + similiarities);
};

solvePart1();
solvePart2();