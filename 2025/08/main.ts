/**
 * PART 1
 *
 * we have a list of junction box
 *
 *  box = {
 *      x: number
 *      y: number
 *      z: number
 *  }
 *
 *  we have to find for each box in this list the closest junction box in 3d space
 *  for this we need to use the straight-line distance
 *
 * example for that
 * box1 x: 1 y: 1 z:-1
 * box2 x: 2 y: 2 z: +1
 *
 * we need squareRoot Math.sqrt()
 * and Math.pow or just a * a
 *
 * d = √[(x–x)² + (y–y)² + (z–z)²]
 * with js
 *
 * we take 3 consts
 * distanceX box1.x - box2.x
 * distanceY box1.x - box2.x
 * distanceZ box1.z - box2.z
 *
 * Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
 *
 * it maybe is needed to calculate the closest box for every box and safe that so that we can sort
 * and always connect the shortest possible connection
 *
 * we then take the box with the closest box in distance and we have to link them in a circuit
 * understanding the problem correctly from the beginning every box is in its own circuit
 * with the first loop done we have 1 circuit of 2 and 18 circuits of one (20 boxes to begin with)
 *
 * now we need to recompute the closest boxes and for our first box need to skip the box we just have
 * in a circuit with them
 *
 * we then resort our array of boxes and find that the next closes box is anohter box around box 1
 * we add that to the already existing circuit and have a circuit of 3 and 17 of 1
 *
 * we have to recalculate again and sort
 *
 * the next closest boxes are boxes not yet in a circuit
 * we connect them and have a circuit of 3, one of 2, and 15 of 1
 *
 * the next two closes boxes are the two boxes that are in a circuit with box 1
 * so we skip them as we cant connect them anymore we maybe could clear that aswell while recalculating
 *
 * after we did 10 connections we have to give results and multiply the 3 largest circuits
 *
 * SO TO SIMPLIFY THE JSUT WRITTEN BULLSHIT
 *
 * we need functions to
 * calculate the closest box to a box (this needs to be redone after a circuit is build
 * sort the boxes for the 1 with the least distance to another box coming first
 * distance function that takes two boxes and their cords and returns their distance
 * a DSU function or class that creates sets / circuits of boxes which we can look up fastly (dsu.ts)
 *
 */


import * as fs from 'fs';
import { DSU } from './dsu';
import { multiplyArrayValues } from '../../utils/utils';

interface Box {
    id: number;
    x: number;
    y: number;
    z: number;
}

const boxMap: Map<number, Box> = new Map();
const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((box, i) => {
        const mapEntry = box.split(',').map((cord) => parseInt(cord));
        boxMap.set(i, {
            id: i,
            x: mapEntry[0],
            y: mapEntry[1],
            z: mapEntry[2],
        });
        return box.split(',').map((cord) => parseInt(cord));
    });


const part1 = (boxAmount: number, circuitAmount: number) => {
    const allDistances: { box1: number, box2: number, distance: number }[] = [];
    
    for (let i = 0; i < input.length; i++) {
        const box1 = boxMap.get(i)!;
        
        for (let j = i + 1; j < input.length; j++) {
            const box2 = boxMap.get(j)!;
            const dist = distance(box1, box2);
            
            allDistances.push({
                box1: i,
                box2: j,
                distance: dist,
            });
        }
    }
    
    allDistances.sort((a, b) => a.distance - b.distance);
    const cutOffBoxes = allDistances.slice(0, boxAmount);
    
    const dsu = new DSU(boxMap.size);
    
    for (let i = 0; i < cutOffBoxes.length; i++) {
        dsu.union(cutOffBoxes[i].box1, cutOffBoxes[i].box2);
    }
    
    const circuits = getCircuits(dsu);
    
    const arrayOfCircuitsLengths = circuits.map((circuit) => circuit.length);
    arrayOfCircuitsLengths.sort((a, b) => b - a);
    arrayOfCircuitsLengths.length = circuitAmount;
    console.log(multiplyArrayValues(arrayOfCircuitsLengths));
};

const distance = (box1: Box, box2: Box) => {
    const distanceX = box1.x - box2.x;
    const distanceY = box1.y - box2.y;
    const distanceZ = box1.z - box2.z;
    
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
};

const getCircuits = (dsu: DSU): Box[][] => {
    const circuits = new Map<number, Box[]>;
    
    for (let i = 0; i < input.length; i++) {
        const root = dsu.find(i);
        
        if (!circuits.has(root)) {
            circuits.set(root, []);
        }
        
        circuits.get(root)!.push(boxMap.get(i)!);
    }
    
    return Array.from(circuits.values());
};

console.time('part1');
// part1(10, 3);
part1(1000, 3);
console.timeEnd('part1');

const part2 = () => {
    const allDistances: { box1: number, box2: number, distance: number }[] = [];
    
    for (let i = 0; i < input.length; i++) {
        const box1 = boxMap.get(i)!;
        
        for (let j = i + 1; j < input.length; j++) {
            const box2 = boxMap.get(j)!;
            const dist = distance(box1, box2);
            
            allDistances.push({
                box1: i,
                box2: j,
                distance: dist,
            });
        }
    }
    
    allDistances.sort((a, b) => a.distance - b.distance);
    const dsu = new DSU(boxMap.size);
    
    const boxOrder = [];
    let fullCircuit = false;
    let i = 0;
    while (!fullCircuit) {
        dsu.union(allDistances[i].box1, allDistances[i].box2);
        
        const circuits = getCircuits(dsu);
        if (circuits.length === 1) fullCircuit = true;
        
        boxOrder.push([allDistances[i].box1, allDistances[i].box2]);
        
        i++;
    }
    
    const lastConnectionX1 = boxMap.get(boxOrder[boxOrder.length - 1][0]);
    const lastConnectionX2 = boxMap.get(boxOrder[boxOrder.length - 1][1]);
    
    if (!lastConnectionX1 || !lastConnectionX2) return;
    
    console.log(lastConnectionX1.x * lastConnectionX2?.x);
    
};

console.time('part2');
part2();
console.timeEnd('part2');
