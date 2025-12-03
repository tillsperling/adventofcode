import * as fs from 'fs';

interface Guard {
    totalSleep: number;
    minutesAsleep: number[];
}

const list: string[] = fs.readFileSync('./input.txt', 'utf-8').toString().replace(/\r/g, ' ').split('\n');

const sortList = () => {
    list.sort((a, b) => {
        const timeA = new Date(a.slice(1, 17));
        const timeB = new Date(b.slice(1, 17));
        return timeA.getTime() - timeB.getTime();
    });
};

const computeAllMinutesAsleep = (sleepArr: number[]): number[] => {
    const arr: number[] = [];

    for (let i = 0; i < sleepArr.length; i++) {
        if (i % 2 != 0) continue;
        for (let j = sleepArr[i]; j < sleepArr[i + 1]; j++) {
            arr.push(j);
        }
    }

    return arr;
};

const createGuards = (): { [id: number]: Guard } => {
    const guards: { [id: number]: Guard } = {};
    let guardId: number = 0;
    const guard: Guard = {
        totalSleep: 0,
        minutesAsleep: [],
    };
    let sleepArr: number[] = [];

    for (const entry of list) {

        const idRegex = /(#\d*)/;

        if (idRegex.test(entry)) {
            if (sleepArr.length > 0) {
                let sleepTime = 0;
                for (let i = sleepArr.length - 1; i >= 1; i--) {
                    if (i % 2 === 0) continue;
                    sleepTime += sleepArr[i] - sleepArr[i - 1];
                }
                const minutes = computeAllMinutesAsleep(sleepArr);
                if (guards[guardId]) {
                    guards[guardId].totalSleep += sleepTime;
                    guards[guardId].minutesAsleep = [...guards[guardId].minutesAsleep, ...minutes];
                } else {
                    guards[guardId] = { totalSleep: sleepTime, minutesAsleep: minutes };
                }
                sleepArr = [];
            }

            const id = entry.match(idRegex)!;
            guardId = parseInt(id[0].match(/(\d+)/)![0]);
        }

        if (entry.includes('falls asleep')) {
            sleepArr.push(parseInt(entry.slice(15, 17)));
        }

        if (entry.includes('wakes up')) {
            sleepArr.push(parseInt(entry.slice(15, 17)));
        }
    }

    if (guardId != 0) {
        if (sleepArr.length > 0) {
            let sleepTime = 0;
            for (let i = sleepArr.length - 1; i >= 1; i--) {
                if (i % 2 === 0) continue;
                sleepTime += sleepArr[i] - sleepArr[i - 1];
            }
            const minutes = computeAllMinutesAsleep(sleepArr);
            if (guards[guardId]) {
                guards[guardId].totalSleep += sleepTime;
                guards[guardId].minutesAsleep = [...guards[guardId].minutesAsleep, ...minutes];
            } else {
                guards[guardId] = { totalSleep: sleepTime, minutesAsleep: minutes };
            }
        }
    }

    return guards;
};

const findHighestAmountOfMinutes = (arr: number[]) => {
    let minute: number = 0;
    let amount: number = 0;

    for (const entry of arr) {
        const occurences = arr.filter(element => element === entry);
        if (occurences.length > amount) {
            amount = occurences.length;
            minute = entry;
        }
    }

    return { minute, amount };
};

const findGuardAsleepAtTheSameTimeMostFuckFunctionNames = (guards: { [id: number]: Guard }): {
    guardId: number,
    minute: number
    amount: number
} => {
    let minute: number = 0;
    let guardId: number = 0;
    let amount: number = 0;
    for (const [key, value] of Object.entries(guards)) {
        const { minute: check, amount: checkAmount } = findHighestAmountOfMinutes(value.minutesAsleep);
        if (checkAmount > amount) {
            minute = check;
            guardId = parseInt(key);
            amount = checkAmount;
        }
    }
    return { guardId, minute, amount };
};

const part1And2 = () => {
    const solutionArrPart1: number[] = [0, 0];
    let solution: number = 0;

    sortList();

    const guards: { [id: number]: Guard } = createGuards();

    for (const [key, value] of Object.entries(guards)) {
        const id = parseInt(key);
        const totalSleep = value.totalSleep;
        if (totalSleep > solutionArrPart1[1]) {
            solutionArrPart1[0] = id;
            solutionArrPart1[1] = totalSleep;
        }
    }

    const guardThatsMostAsleep = guards[solutionArrPart1[0]];
    const { minute } = findHighestAmountOfMinutes(guardThatsMostAsleep.minutesAsleep);

    solution = solutionArrPart1[0] * minute;
    console.log(`Part 1: ${solution}`);

    const { guardId, minute: minutePart2 } = findGuardAsleepAtTheSameTimeMostFuckFunctionNames(guards);
    console.log(`Part 2: ${guardId * minutePart2}`);
};

part1And2();
