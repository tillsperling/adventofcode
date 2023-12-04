export default interface Card {
    card: number,
    winningNumbers: number[];
    drawnNumbers: number[];
    result: number;
    winsCards?: number[];
}