import FillOutRanks from "./Classes/FillOutRanks";
import HandObjectCreator from "./Classes/HandObjectCreator";
import InputConverter from "./Classes/InputConverter";
import RankArrayCreator from "./Classes/RankArrayCreator";
import SumUpRanks from "./Classes/SumUpRanks";

const input = new InputConverter('./input.txt').convertToArray();
const objects = new HandObjectCreator(input).createObjects();
const rankArray = new RankArrayCreator(objects).fillRankArray();
const ranks = new FillOutRanks(rankArray, objects.length).fillOutRanks();
const solution = new SumUpRanks(ranks).sumRanks();

function solvePart2() {
    console.log(solution);
}

solvePart2();
