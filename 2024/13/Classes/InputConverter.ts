import * as fs from 'fs';
import ClawMachineCreator from './ClawMachineCreator';
import ClawMachine from './ClawMachine';

export default class InputConverter {
    input: string;
    groupOfClawMachines: ClawMachine[];

    constructor(input: string) {
        this.input = input;
        this.groupOfClawMachines = [];
    }

    createClawMachineArray() {
        const string = this.#turnInputIntoString();
        const instructionArray = string.replace(/\r/g, '').split('\n\n');
        this.#createClawMachineObject(instructionArray);
        return this.groupOfClawMachines;
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }

    #createClawMachineObject(instructions) {
        for (const instructionSet of instructions) {
            const clawMachineCreator = ClawMachineCreator.createClawMachineObject(instructionSet.split('\n'));
            this.groupOfClawMachines.push(clawMachineCreator);
        }
    }
}