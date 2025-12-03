import * as fs from 'fs';

interface Rotation {
    direction: string;
    amount: number;
}

const input: string[] = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r/g, ' ').split('\n');
const cords: Rotation[] = [];

for (const element of input) {
    const rotation: Rotation = {
        direction: element[0],
        amount: parseInt(element.slice(1)),
    };

    cords.push(rotation);
}

const part1 = () => {
    let dialNumber = 50;
    let result = 0;

    for (const rotation of cords) {
        if (rotation.direction === 'R') {
            for (let i = 0; i < rotation.amount; i++) {
                dialNumber += 1;
                if (dialNumber > 99) dialNumber = 0;
            }
        } else {
            for (let i = 0; i < rotation.amount; i++) {
                dialNumber -= 1;
                if (dialNumber < 0) dialNumber = 99;
            }
        }

        if (dialNumber === 0) result++;
    }

    console.log(result);
};

const part2 = () => {
    let dialNumber = 50;
    let result = 0;

    for (const rotation of cords) {
        if (rotation.direction === 'R') {
            for (let i = 0; i < rotation.amount; i++) {
                dialNumber += 1;
                if (dialNumber > 99) dialNumber = 0;
                if (dialNumber === 0) result++;
            }
        } else {
            for (let i = 0; i < rotation.amount; i++) {
                dialNumber -= 1;
                if (dialNumber < 0) dialNumber = 99;
                if (dialNumber === 0) result++;
            }
        }
    }

    console.log(result);
};

part1();
part2();