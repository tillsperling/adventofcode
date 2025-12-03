import * as fs from 'fs';

export default class InputConverter {
    input: string;

    constructor(input: string) {
        this.input = input;
    }

    arrangeInputPartOne(): number[][] {
        const string = this.#turnInputIntoString();
        const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;
        const commands = string.match(regex);
        return this.#returnMultiplyArrays(commands);
    }

    arrangeInputPartTwo(): number[][] {
        const string = this.#turnInputIntoString();
        const regex = /don't\(\)(.*?)do\(\)/g;
        const stringWithIgnore = string.replace(regex, 'ignore');
        const mulRegex = /mul\(\d{1,3}\,\d{1,3}\)/g;
        const commands = stringWithIgnore.match(mulRegex);
        return this.#returnMultiplyArrays(commands);

    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8').replace(/(\r\n|\n|\r)/gm, '');
        
    }

    #returnMultiplyArrays(arr): number[][] {
        const commandArr: number[][] = [];
        for (const command of arr) {
            const cleanCommand = command.replace(/mul\((.*?)\)/, '$1');
            const singleCommand = cleanCommand.split(',').map(element => parseInt(element));
            commandArr.push(singleCommand);
        }
        return commandArr;
    }
}