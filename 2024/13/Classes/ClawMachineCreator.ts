import ClawMachine from "./ClawMachine";

export default class ClawMachineCreator {

    static createClawMachineObject(instructions: string[]) {
        // console.log(`create called with ${instructions}`)
        return new ClawMachine(instructions)
    }
}