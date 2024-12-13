export default interface ClawMachine {
    buttonA: Button;
    buttonB: Button;
    prize: Prize;
}

export interface Button {
    x: number;
    y: number;
    cost: number;
}

export interface Prize {
    x: number;
    y: number;
}