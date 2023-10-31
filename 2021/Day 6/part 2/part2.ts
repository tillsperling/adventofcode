//@ts-ignore
import * as fs from "fs";

const fishArray = fs.readFileSync("../input.txt").toString("utf-8").split(',').map(item => parseInt(item));
const lifecycle = 6;

const queue = Array(9).fill(0);


for (const fish of fishArray) {
    queue[fish]++;
}

for (let i = 0; i < 256; i++) {
    const current = queue.shift();
    queue.push(current);
    queue[lifecycle] += current;
}
console.log(queue.reduce((a, b) => a + b, 0));
