import * as fs from 'fs';
import { RulesAndPages } from '../Types/RulesAndPages';

export default class InputConverter {
    input: string;
    rulesMap: Map<number, number[]>;
    rulesAndPages: RulesAndPages;

    constructor(input: string) {
        this.input = input;
        this.rulesMap = new Map();
        this.rulesAndPages = {
            rules: null,
            pages: [],
        };
    }

    init() {
        const string: string = this.#turnInputIntoString();
        const [rules, pages] = string.replace(/\r/g, '').split('\n\n');
        const rulesArray = this.#createRulesArray(rules);
        this.#createRulesMapping(rulesArray);
        this.rulesAndPages.rules = this.rulesMap;
        this.rulesAndPages.pages = this.#createPagesArray(pages);
        return this.rulesAndPages;
    }

    #createRulesArray(rules: string): number[][] {
        const rulesArr: number[][] = [];
        const arr = rules.split('\n');
        for (const rule of arr) {
            const newRule: number[] = rule.split('|').map(element => parseInt(element));
            rulesArr.push(newRule);
        }
        return rulesArr;
    }

    #createPagesArray(pages: string): number[][] {
        const pagesArr: number[][] = [];
        const arr = pages.split('\n');
        for (const page of arr) {
            const lineOfPages = page.split('\n');
            for (const page of lineOfPages) {
                const pageBlock = page.split(',').map(element => parseInt(element));
                pagesArr.push(pageBlock);
            }
        }
        return pagesArr;
    }

    #createRulesMapping(rules: number[][]) {
        for (let i = 0; i < rules.length; i++) {
            const rulesFor: number = rules[i][0];
            const setOfRules: number[] = [];

            for (let j = 0; j < rules.length; j++) {
                if (rules[j][0] === rulesFor) {
                    setOfRules.push(rules[j][1]);
                }
            }

            this.rulesMap.set(rulesFor, setOfRules);
        }
    }

    #turnInputIntoString(): string {
        return fs.readFileSync(this.input).toString('utf-8');
    }
}