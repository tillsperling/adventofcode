import { RulesAndPages } from "../Types/RulesAndPages"
import { sumUpArray, getCenterOfArray } from "../../../utils/utils"

export default class RuleChecker {
    input: RulesAndPages
    faultyPageBlocks: number[][]
    centerOfArrays: number[]
    centerOfCorrectedArrays: number[];

    constructor(input) {
        this.input = input
        this.faultyPageBlocks = [];
        this.centerOfArrays = []
        this.centerOfCorrectedArrays = []
    }

    init(): number[] {
        this.#iteratePagesAndCheckRules()
        this.#reorderFaultyPageBlocks()
        return [sumUpArray(this.centerOfArrays), sumUpArray(this.centerOfCorrectedArrays)];
    }

    #iteratePagesAndCheckRules() {
        for (let pageBlock of this.input.pages) {
            let rulesApply: boolean = true;
            for (let i = 0; i < pageBlock.length; i++) {
                const currentPage = pageBlock[i];
                const currentPageRules = this.input.rules.get(currentPage);

                let needToCheck = false;


                if (currentPageRules) {
                    // check if pageBlock contains any of the in the rules specified numbers otherwise continue
                    for (let number of currentPageRules) {
                        if (pageBlock.find((element) => element === number)) {
                            needToCheck = true;
                        }
                    }
                    needToCheck ? rulesApply = this.#checkForRules(i, pageBlock, currentPageRules) : null;
                }

                if (!rulesApply) {
                    this.faultyPageBlocks.push(pageBlock)
                    break;
                }
            }
            if (rulesApply) this.centerOfArrays.push(getCenterOfArray(pageBlock));
        }
    }

    #checkForRules(index, pages, rules) {
        let rulesApply: boolean = true;
        // check rules after the current index in the pageBlock if the the index is in the rules they apply
        for (let i = index + 1; i < pages.length; i++) {
            if (rules.find((element) => element === pages[i])) {
                rulesApply = true;
            }
        }
        // check rules before the current index in the pageBlock if the the index is in the rules they do not apply
        for (let i = index; i > 0; i--) {
            if (rules.find((element) => element === pages[index - 1])) {
                rulesApply = false;
                return;
            }
        }
        return rulesApply;
    }

    #reorderFaultyPageBlocks() {
        /**
         * take fault block and start finding the first index thats wrong
         * move the index 1 slot to the right and check it again
         * recurse
         * if the index is the last of the array we pop the element and unshift it to the array continuning the recursion
         * if the block is valid we end the recursion
         * */
        for (let block of this.faultyPageBlocks) {
            let [faultyIndex, isFaulty] = this.#findFaultAndIndex(block);
            this.#recursion(this.#moveFaultyIndexToNextIndex(block, faultyIndex), isFaulty);
        }
    }

    #recursion(arr, isFaulty) {
        if (isFaulty) {
            let [faultyIndex, isFaulty] = this.#findFaultAndIndex(arr);
            const movedArray = this.#moveFaultyIndexToNextIndex(arr, faultyIndex);
            this.#recursion(movedArray, isFaulty);
        } else {
            this.centerOfCorrectedArrays.push(getCenterOfArray(arr));
        }
    }

    #findFaultAndIndex(arr): [number, boolean] {
        let isFaulty: boolean = true;
        let faultyIndex: number = undefined;
        for (let i = 0; i < arr.length; i++) {
            const currentPage = arr[i];
            const currentRules = this.input.rules.get(currentPage);
            for (let j = i; j >= 0; j--) {
                if (currentRules) {
                    if (currentRules.find((element) => element === arr[j])) {
                        faultyIndex = j;
                        return [faultyIndex, isFaulty];
                    }
                }
            }
        }
        if (faultyIndex === undefined) {
            isFaulty = false;
            return [faultyIndex, isFaulty];
        }
    }


    #moveFaultyIndexToNextIndex(arr, i) {
        if (i < arr.length - 1) {
            const temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
        return arr;
    }

}