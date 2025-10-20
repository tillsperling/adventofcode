/**
 * we are getting a string with letters in lower and uppercase
 * each letter is a unit, the size of the letter is its polarity
 * if two equal units of different polarity are next to each other
 * they cancel themself out and are removed from the string
 *
 * if no two equal units of different polorization are adjacent in the string
 * we return the length of the string as the solution
 *
 * we can solve this with regex but im for now too stupid to build the regex
 *
 * we can also take the string, iterate over it take the current iterration
 * if current iteration is upperCase we check if next iteration is the same in lowercase,
 * if so we remove the part
 *
 * var str = "Hello World";
 * str = str.slice(0, 3) + str.slice(4);
 * console.log(str) Helo World
 *
 * we also need to do this in a recursive function where the break condition is if no adjacent pairs are present
 * in the string
 *
 * this is a bruteforce of the task
 * a better solution seems to be to avoid regex and avoid replacing in a loop
 * i could just use a function that pushes the current char into an array and checks if the next char reacts
 * to it as decribed in the problem. if so it gets popped, after that is done the array containing chars
 * gets joined to a string
 *
 */
//@ts-ignore
import * as fs from "fs";

const input: string = fs
    .readFileSync('./input.txt', 'utf-8')
    .replace(/\r?\n/g, '')
    .trim();

let part1Solution: number = 0;

const removeFirstAdjacentPolarity = (string: string) => {
    let newString = string;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;

    for (let i = 0; i < string.length; i++) {
        const isUpperCase = upperCaseRegex.test(string[i]);
        const isLowerCase = lowerCaseRegex.test(string[i]);

        if (string[i + 1] == undefined) {
            break
        }

        if (isUpperCase) {
            if (lowerCaseRegex.test(string[i + 1]) && string[i].toLowerCase() == string[i + 1].toLowerCase()) {
                newString = newString.slice(0, i) + newString.slice(i + 2);
                break
            }
        } else if (isLowerCase) {
            if (upperCaseRegex.test(string[i + 1]) && string[i].toLowerCase() == string[i + 1].toLowerCase()) {
                newString = newString.slice(0, i) + newString.slice(i + 2);
                break
            }
        }
    }
    return newString
}

const findAdjacentPolarity = (string: string) => {
    let adjacentPolarity: boolean = false;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    for (let i = 0; i < string.length; i++) {
        const isUpperCase = upperCaseRegex.test(string[i]);
        const isLowerCase = lowerCaseRegex.test(string[i]);


        if (string[i + 1] == undefined) {
            break
        }

        if (isUpperCase) {
            if (lowerCaseRegex.test(string[i + 1]) && string[i].toLowerCase() == string[i + 1].toLowerCase()) {
                adjacentPolarity = true
                break
            }
        } else if (isLowerCase) {
            if (upperCaseRegex.test(string[i + 1]) && string[i].toLowerCase() == string[i + 1].toLowerCase()) {
                adjacentPolarity = true
                break
            }
        }
    }

    return adjacentPolarity;
}

const isAdjacentPolarityAvailable = (string: string): boolean => {
    return findAdjacentPolarity(string)
}

const part1 = (input: string): string => {
    let pairAvailable: boolean = true;
    let string: string = input;

    while (pairAvailable) {
        pairAvailable = isAdjacentPolarityAvailable(string)
        string = removeFirstAdjacentPolarity(string)
    }

    return string;
}

const createAllPolymerPairs = () => {
    const allPairs: string[][] = [];
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    for (const letter of alphabet) {
        const arr = []
        const upperCase = letter.toUpperCase()
        const lowerCase = letter.toLowerCase()

        arr.push(upperCase)
        arr.push(lowerCase)

        allPairs.push(arr)
    }

    return allPairs;
}

const part2 = () => {
    let string = input;
    const allPairs: string[][] = createAllPolymerPairs()
    let shortestLength = 999999999999;

    for (const pair of allPairs) {
        string = string.replace(new RegExp(pair[0], 'gi'), '').replace(new RegExp(pair[1], 'gi'), '');

        string = part1(string)

        if (string.length < shortestLength) {
            shortestLength = string.length;
        }
        string = input;
    }

    return shortestLength;
}

console.log(`Part 1: ${part1(input).length}`)
console.log(`Part 2: ${part2()}`)