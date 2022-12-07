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
let input = fs.readFileSync("input.txt").toString();
let inputArray = input.split("");
const workingArray = [];
let result = 0;
let tempString = "";
let tempArray = [];

for (i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "-") {
        tempArray.push(tempString);
        tempString = "";
    } else if (inputArray[i] == ",") {
        workingArray.push(tempArray);
        tempArray = [];
        tempString = "";
    } else {
        tempString = tempString + inputArray[i];
        tempString = tempString.replace(/(\r\n|\n|\r)/gm, "");
    }
}
console.log(workingArray);

// Function

// Call Function and Log Result