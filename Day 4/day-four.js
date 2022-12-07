/*

Every section is an ID
Each Elv has a range of IDs assigned
Many assignments overlap though
Elves pair up in twos 
The assignments range from a single section to multiple sections

Find out which pair as an assignment completely contained in the other ones.
Count these.

Thoughts:

each elv has 2 values, so 4 per pair

elv1 a b
elv2 c d

pair is only inside if 
a <= c, b >= d
a >= c, b <= d
*/

// Read Input and create Variables
const { timeStamp } = require("console");
const fs = require("fs");
let inputs = fs.readFileSync("input.txt")
    .toString()
    .replace(/\r/g, "")
    .split('\n');
// Function
function part1() {
    let ans = 0;
    const map = inputs.map((input) => {
        const [elv1, elv2] = input
            .split(",")
            .map(elv => elv.split("-").map(Number));

        const contains = elv1[0] <= elv2[0] && elv1[1] >= elv2[1] || elv1[0] >= elv2[0] && elv1[1] <= elv2[1];
        contains ? ans++ : 0;
    });
    console.log(ans);

}
part1()

function part2() {

}
part2()