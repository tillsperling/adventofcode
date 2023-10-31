import ConverInput from "./Classes/ConvertInput";
import LanternFishFactory from "./Classes/LanternFishFactory";

const input = new ConverInput('./input.txt').convertToArray();
const fishies = new LanternFishFactory(input).convertToLanternFish();

console.log(fishies);