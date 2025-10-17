//@ts-ignore
import * as fs from "fs";

let res = 0;
const frequencyArray: number[] = [];
const input: string = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r\n/g, ' ')
    .split(' ')
    .map((element: string) => parseInt(element))
    .map((number: number): number => frequencyArray.push(res += number));

const input2: number[] = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r\n/g, ' ')
    .split(' ')
    .map((element: string) => parseInt(element))

const recursive = (arr: number[]) => {
    let duplicateFound = false;
    let res = 0;
    const set = new Set<number>();
    set.add(res)
    let duplicate: number = -1

    while (!duplicateFound) {
        console.log(set)
        for (let j = 0; j < arr.length; j++) {

            if (set.has(res + arr[j])) {
                duplicateFound = true;
                duplicate = res + arr[j];
                break;
            }
            set.add(res += arr[j])
        }
    }
    console.log(duplicate);
}

recursive(input2)