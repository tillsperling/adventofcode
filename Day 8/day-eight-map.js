const fs = require("fs");
const inputs = fs
    .readFileSync("input.txt", { encoding: "utf-8" }) // read day??.txt content
    .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
    .trim() // Remove starting/ending whitespace
    .split("\n") // Split on newline
    .map((input) => [...input].map(Number));
console.log(inputs);