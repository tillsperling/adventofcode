import InputConverter from "./input/inputConverter";
import ArrayCreator from "./input/arrayCreator";

const cleanArray = new InputConverter('./input1.txt').convertToString()
const drawn = new ArrayCreator(cleanArray).createDrawnArray();
const bingoCards = new ArrayCreator(cleanArray).createBingoCards();

console.log(bingoCards);