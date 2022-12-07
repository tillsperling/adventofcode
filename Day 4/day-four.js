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
c >= a, d <= b
a >= c, b <= d

True  
<-a------------b->
    <-c-----d->

True
    <-a-----b->
<-c------------d->

True
<-a------------b->
<-c------------d->


False
<-a--b-> 
        <-c--d->

False
        <-a--b->
<-c--d->

False
    <-a-----b->
<-c-----d->

False
<-a-----b->
    <-c-----d->
    
*/

/*
    Take string up until linebreak
    convert string up to '-' OR ',' to number
    first number a, 2nd b, third c, fourth d
*/

// Read Input and create Variables
const { timeStamp } = require("console");
const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().replace(/(\r)/gm, "");
let inputArray = input.split("");
const workingArray = [];
let result = 0;
let tempString = "";
let tempArray = [];

let schminput = input.split(/(,|-|\n)/);
const remove1 = ",";
const remove2 = "-";
for (i = 0; i < schminput.length; i++) {
    if (schminput[i] === remove1 || schminput[i] === remove2) {
        schminput.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
    }
}
console.log(schminput);

// Function

// Call Function and Log Result