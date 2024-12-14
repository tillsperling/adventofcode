export default interface RobotType {
    pos: number[];
    newPos: number[];
    oldPos: number[];
    simulatePosition(number);
    simulateJustOneSecond();
}