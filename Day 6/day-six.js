const fs = require("fs");
let input = fs
    .readFileSync("input.txt")
    .toString()
    .replace(/\r/g, " ")
    .split("");

function part1() {
    const map = new Map();
    let ans = 0;
    for (i = 0; i < input.length; i++) {
        let a = input[i];
        let b = input[i + 1];
        let c = input[i + 2];
        let d = input[i + 3];

        if (a == b || a == c | a == d || b == c || b == d || c == d) {
            continue;
        } else {
            console.log(a, b, c, d);
            ans = i + 4;
            break;
        }
    }
    console.log(ans);
}

function part2() {
    const map = new Map();
    let ans = 0;
    for (i = 0; i < input.length; i++) {
        let a = input[i];
        let b = input[i + 1];
        let c = input[i + 2];
        let d = input[i + 3];

        if (a == b || a == c | a == d || b == c || b == d || c == d) {
            continue;
        } else {
            console.log(a, b, c, d);
            ans = i + 4;
            break;
        }
    }
    console.log(ans);
}

part1();
