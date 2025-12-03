/**
 * We have a fabric field of 1000 inches on each side
 * the input specifies sole patterns and the inches they occupy
 * we need to find how many square inches have more than 1 claim
 *
 * we cant use an array here gets to weird, maybe a MAP that holds each array coordinate
 * so e.g. [0,0] or [900,900] if the fabrics pattern occupies one of these points
 * we count up the value of that point
 *
 * so what we need to do is get the input and create an array which holds objects for each pattern
 *
 * {
 *     starting point (value after @)
 *     wideness (before x)
 *     tallness (after x)
 * }
 *
 * then we set every point from SP + wideness + 1
 * then we set every point from there vertically + 1 but also go for the wideness + 1
 *
 * after that we go through the map and count values > 1
 */

import * as fs from 'fs';


interface coordinate {
    sp: string;
    w: number | null;
    t: number | null;
    c: number;
    o: boolean;
}

interface mapValue {
    value: number;
    claim: number[];
}

const coordinates: string[] = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r/g, ' ').split('\n');
const coordinateObjects: coordinate[] = [];
let cordCount = 1;

const formStringIntoCoordinate = (string: string) => {
    const coordinate: coordinate = {
        sp: string,
        w: null,
        t: null,
        c: 0,
        o: false,
    };

    const spRegex = /\d+,\d+/;
    const sp = string.match(spRegex)!;
    const wtRegex = /\d+x\d+/;
    const wt = string.match(wtRegex)!;

    coordinate.sp = sp[0].split(',').reverse().join(',');
    coordinate.w = wt[0].split('x').map(n => parseInt(n))[0];
    coordinate.t = wt[0].split('x').map(n => parseInt(n))[1];
    coordinate.c = cordCount++;

    return coordinate;
};

const createMap = (inches: number) => {
    const map = new Map();

    for (let x = 0; x <= inches; x++) {
        for (let y = 0; y <= inches; y++) {
            map.set(`${x},${y}`, {
                value: 0,
                claim: [],
            });
        }
    }

    return map;
};

const createKeyArray = (start: string, w: number, t: number) => {
    const arr: string[] = [];
    const [startX, startY] = start.split(',').map(n => parseInt(n));

    for (let i = 0; i < t; i++) {
        for (let j = 0; j < w; j++) {
            arr.push(`${startX + i},${startY + j}`);
        }
    }

    return arr;
};

const setMapValues = (map: Map<string, mapValue>, coordinates: coordinate[]) => {
    for (const coordinate of coordinates) {
        const keyArr = createKeyArray(coordinate.sp, coordinate.w!, coordinate.t!);
        for (const key of keyArr) {
            const current = map.get(key);
            map.set(
                key,
                {
                    value: current!.value + 1,
                    claim: [...current!.claim, coordinate.c],
                },
            );
        }
    }
};

const getMapValuesGreaterThan = (map: Map<string, mapValue>, n: number) => {
    let sum = 0;

    for (const [key, value] of map.entries()) {
        if (value.value > n) sum++;
    }

    return sum;
};

const getMapValuesWhereAllAreOne = (map: Map<string, mapValue>) => {
    for (const value of map.values()) {
        if (value.claim.length > 1) {
            for (const claim of value.claim) {
                const obj = coordinateObjects.find(element => element.c === claim);
                if (obj) obj.o = true;
            }
        }
    }
};

const solution = () => {
    const amountOfInches = 1000;
    const map: Map<string, mapValue> = createMap(amountOfInches);

    for (const coordinate of coordinates) {
        coordinateObjects.push(formStringIntoCoordinate(coordinate));
    }

    setMapValues(map, coordinateObjects);

    const sum = getMapValuesGreaterThan(map, 1);

    getMapValuesWhereAllAreOne(map, amountOfInches);

    const part2Solution = () => {
        const found = coordinateObjects.find(element => element.o === false);
        return found ? found.c : undefined;
    };

    console.log(`Part 1: ${sum}`);
    console.log(`Part 2: ${part2Solution()}`);
};

solution();
