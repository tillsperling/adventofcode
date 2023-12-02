import Draw from './Draw'

export default interface GameObject {
    Game: number;
    Draws: Draw[];
    Power: number;
}