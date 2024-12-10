/**
 * Notes
 * 
 * take the input string and generate the file system
 * for each even index we have to increment the index counter as empty spaces dont have an index
 * each EVEN index creates a block with its corresponding INDEX as ID
 * each ODD index creates a block with empty .
 * 
 * 12345
 * 
 * we can visualize this in a map, 
 * index 0 creates a map 0 => new Array(1).fill(0)
 * index 1 creates a map 1 => new Array(2).fill(.)
 * index 2 creates a map 2 => new Array(3).fill(1)
 * index 3 creates a map 3 => new Array(4).fill(.)
 * index 4 creates a map 4 => new Array(5).fill(2)
 * 
 * for the next step we can take the arrays of each map and chain them in a new array
 * 
 * [0, '.', '.', 1,1,1, '.', '.', '.', '.', 2 ,2, 2, 2, 2]
 * 
 * now we need to defragment this array
 * 
 * we iterate it with i < arr.length and if we encounter a '.' we are gonna replace it with the last number we can find
 * iterating backwards over the arr
 * 
 * we then iterate over the array and push i * arr[i] (if thats a numebr) in another array of which we get the stum
 * 
 * Part 2
 * 
 * We can use our map to generate the smart fragmentation
 * with the last even element of the map we check if its length is < than the first odd element
 * 
 * if it is true we fill the first odd array from the beginning with the last even array
 * 
 * we then check the 2nd to last even array and the 2nd odd doing the same if it doesnt fit
 * we continue and check the 3rd to last even array and compare it witht the 3rd odd 
 * 
 * 
 */

import InputConverter from "./Classes/InputConverter";
import FileSystemHandler from "./Classes/FileSystemHandler";
import GigaFileSystemHandler from "./Classes/GigaFileSystemHandler";

const inputPartOne = new InputConverter('./input.txt').createInputMap()
const fileSystemHandler = new FileSystemHandler(inputPartOne);
const gigaFileSystemHandler = new GigaFileSystemHandler(inputPartOne)

function solvePart1() {
    const start = Date.now();
    console.log(fileSystemHandler.createAndDefragment())
    console.log(`Time Part 1: ${Date.now() - start}ms`)
};
function solvePart2() {
    const start = Date.now();
    console.log(gigaFileSystemHandler.createAndDefragment())
    console.log(`Time Part 2: ${Date.now() - start}ms`)
};

solvePart1();
solvePart2();