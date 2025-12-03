import * as fs from 'fs';

const part1 = () => {
    const input: string[] = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r\n/g, ' ').split(' ');
    const arraysOfCodes: string[][] = [];
    const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let twos: number = 0;
    let threes: number = 0;

    input.map((element: string) => {
        arraysOfCodes.push(element.split(''));
    });

    for (const element of arraysOfCodes) {
        let twoCounted: boolean = false;
        let threeCounted: boolean = false;
        for (const char of alphabet) {
            const count = element.filter(amount => amount === char).length;
            if (count === 2 && !twoCounted) {
                twoCounted = true;
                twos++;
            }
            if (count === 3 && !threeCounted) {
                threeCounted = true;
                threes++;
            }
        }
    }
    console.log(`Part 1: ${twos * threes}`);
};

// part1();

const part2 = () => {
    const input: string[] = fs.readFileSync('./input2.txt', 'utf-8').toString().replace(/\r\n/g, ' ').split(' ');
    const arraysOfCodes: string[][] = [];
    const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const finalStringsArray: string[] = [];

    input.map((element: string) => {
        arraysOfCodes.push(element.split(''));
    });

    for (const element of arraysOfCodes) {
        arraysOfCodes.map((mapElement) => {
            const indexOfNotMatching: number[] = [];
            for (let i = 0; i < element.length; ++i) {
                if (mapElement[i] !== element[i]) {
                    indexOfNotMatching.push(i);
                }
            }
            if (indexOfNotMatching.length === 1) {
                const string: string = element.toSpliced(indexOfNotMatching[0], 1).join('');
                if (!finalStringsArray.includes(string)) {
                    finalStringsArray.push(string);
                    console.log(finalStringsArray);
                }
            }
        });
    }
};

part2();