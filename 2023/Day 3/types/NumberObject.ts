export default interface NumberObject {
    number: number,
    numberString: string,
    lineBefore: number,
    lineCurrent: number,
    lineAfter: number,
    firstIndexToCheck: number,
    lastIndexToCheck: number,
    isPartNumber: boolean,
    originalString: string,
    occurenceOfNumberInThisString: number;
}