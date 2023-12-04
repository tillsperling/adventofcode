import CardCreator from "./Classes/CardCreator";
import CardCreatorPart2 from "./Classes/CardCreatorPart2";
import InputConverter from "./Classes/InputConverter";
import ResultsGetter from "./Classes/ResultsGetter";
import AmountGenerator from "./Classes/AmountGenerator";

const input = new InputConverter('./input.txt').convertToArray();
const cards = new CardCreator(input).createCards();
const cardsPartTwo = new CardCreatorPart2(input).createCards();
const results = new ResultsGetter(cards).sum();
const cachedAmount = new AmountGenerator(cardsPartTwo).generateAmount();

function solvePart1() {
    console.log(results);
}
function solvePart2() {
    console.log(cachedAmount)
}

// solvePart1();
solvePart2();
