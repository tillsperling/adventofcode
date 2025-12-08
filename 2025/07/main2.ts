import fs from 'fs';

interface Splitter {
    row: number;
    col: number;
    nextSplitter?: string;
    nextSplitterLeft?: string;
    nextSplitterRight?: string;
}

const input
    = fs.readFileSync('./input.txt', 'utf-8')
    .toString()
    .replace(/\r/g, ' ')
    .split('\n')
    .map((line) => line.split(''));

const start = {
    row: 0,
    col: input.shift()?.indexOf('S'),
    nextSplitter: `1,7`,
};

const splitterMap = new Map();

const fillSplitterMap = () => {
    let row = 0;
    for (const line of input) {
        for (let col = 0; col < line.length; col++) {
            const char = line[col];
            if (char === '^') {
                const [nextLeft, nextRight] = findNextSplitters(row, col);
                splitterMap.set(`${row},${col}`, {
                    row,
                    col,
                    nextSplitterLeft: nextLeft,
                    nextSplitterRight: nextRight,
                });
            }
        }
        row++;
    }
};

const findNextSplitters = (row: number, col: number) => {
    let splitterLeftFound = false;
    let splitterRightFound = false;
    
    let indexLeft = 1;
    let indexRight = 1;
    
    let nextLeft = '';
    let nextRight = '';
    
    while (!splitterLeftFound) {
        const r = row + indexLeft;
        const c = col - 1;
        
        if (r < 0 || r >= input.length
            || c < 0 || c >= input[0].length
        ) {
            nextLeft = 'exit';
            splitterLeftFound = true;
            break;
        }
        
        const cell = input[r][c];
        
        if (cell === '^') {
            nextLeft = `${r},${c}`;
            splitterLeftFound = true;
            break;
        }
        
        indexLeft++;
    }
    
    while (!splitterRightFound) {
        const r = row + indexRight;
        const c = col + 1;
        
        if (r < 0 || r >= input.length || c < 0 || c >= input[0].length) {
            nextRight = 'exit';
            splitterRightFound = true;
            break;
        }
        
        const cell = input[r][c];
        
        if (cell === '^') {
            nextRight = `${r},${c}`;
            splitterRightFound = true;
            break;
        }
        
        indexRight++;
    }
    
    return [nextLeft, nextRight];
};

const part2 = () => {
    fillSplitterMap();
    const colCounter = Array.from({ length: input[0].length }).fill(0);
    colCounter[start.col] += 1;
    const visited = new Set();
    
    const queue: Array<{ splitter: Splitter, fromDirection: string }> = [
        { splitter: start, fromDirection: 'start' },
    ];
    
    while (queue.length) {
        const current = queue.shift();
        const currentCol = current?.splitter.col;
        // console.log(current);
        if (!current) continue;
        
        const { splitter, fromDirection } = current;
        const stateKey = `${splitter.row},${splitter.col},${fromDirection}`;
        
        if (visited.has(stateKey)) {
            continue;
        }
        visited.add(stateKey);
        
        if (current.fromDirection != 'start') {
            console.log('removing 1 from col ', currentCol);
            colCounter[currentCol] -= 1;
        }
        
        if ('nextSplitter' in splitter && splitter.nextSplitter) {
            const next = splitterMap.get(splitter.nextSplitter);
            if (next) {
                queue.push({ splitter: next, fromDirection: 'down' });
            }
        }
        
        if ('nextSplitterLeft' in splitter && splitter.nextSplitterLeft) {
            const next = splitterMap.get(splitter.nextSplitterLeft);
            if (next) {
                console.log('nextSplitter', splitterMap.get(splitter.nextSplitterLeft));
                // add 1 to nextSplitter left and nextSplitterRightCOl
                queue.push({ splitter: next, fromDirection: 'left' });
            }
        }
        
        if ('nextSplitterRight' in splitter && splitter.nextSplitterRight) {
            const next = splitterMap.get(splitter.nextSplitterRight);
            if (next) {
                console.log('nextSplitter', splitterMap.get(splitter.nextSplitterRight));
                // add 1 to nextSplitter left and nextSplitterRightCOl
                queue.push({ splitter: next, fromDirection: 'right' });
            }
        }
    }
    
};

/**
 * just do it by going through the splitter map from start
 *
 * start add 1 to 7
 * next splitter remove 1 from seven add 1 to 6 add 1 to 8
 * nex splitter left remove one from 6 add 1 to 5 add 1 to 7
 * etc
 */


part2();