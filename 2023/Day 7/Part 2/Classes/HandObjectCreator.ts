import Hand from "../types/Hand";

export default class HandObjectCreator {
    input: any[][];
    objects: Hand[];

    constructor(input: any[][]) {
        this.input = input;
        this.objects = [];
    }

    createObjects() {
        for (let i = 0; i < this.input.length; i++) {
            this.#createHandObject(this.input[i][0], this.input[i][1]);
        }
        return this.objects;
    }

    #createHandObject(hand: number[], bid: number) {
        const type = this.#findType(hand);
        const newHandObject: Hand = {
            type: type,
            cards: hand,
            bid: bid,
            rank: -1
        }
        this.objects.push(newHandObject);
    }

    #findType(hand: number[]): string {
        const fullString = hand.flat();


        const charCount: { [key: number]: number } = {};
        fullString.forEach((char: number) => {
            charCount[char] = (charCount[char] || 0) + 1;
        });

        const countCount: { [key: number]: number } = {};
        Object.values(charCount).forEach((count: number) => {
            countCount[count] = (countCount[count] || 0) + 1;
        });
        if (countCount[2] >= 1 || countCount[3] >= 1 || countCount[4] >= 1 || countCount[2] === 2) {
            if (charCount['1'] === 1) {
                if (countCount[4] === 1) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 4) {
                            charCount[char]++;
                            break;
                        }
                    }
                    return "Five of a kind";
                } else if (countCount[3]) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 1) {
                            charCount[char]++;
                            break;
                        }
                    }
                    return "Four of a kind";
                } else if (countCount[2] === 2) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 2) {
                            charCount[char] + 1;
                            break;
                        }
                    }
                    return "Full house";
                } else if (countCount[2] === 1) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 2) {
                            charCount[char]++;
                            break;
                        }
                    }
                    return "Three of a kind";
                } else {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 1) {
                            charCount[char]++;
                            break;
                        }
                    }
                    return "One pair";
                }
            } else if (charCount['1'] === 2) {
                if (countCount[3]) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 3) {
                            charCount[char] + 2;
                            break;
                        }
                    }
                    return "Five of a kind";
                } else if (countCount[2] === 1) {
                    if (charCount['1'] === 2) { }
                    if (charCount['1'] === 2) {
                        for (const char in charCount) {
                            delete charCount['1'];
                            if (charCount[char] === 1) {
                                charCount[char] + 2;
                                break;
                            }
                            return "Three of a kind";
                        }
                    }
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 2) {
                            charCount[char] + 2;
                            break;
                        }
                    }
                    return "Four of a kind";
                } else if (countCount[2] === 2) {
                    // one pair cause joker is the other
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 2) {
                            charCount[char] + 2;
                            break;
                        }
                    }
                    return "Four of a kind";
                } else {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 1) {
                            charCount[char] + 2;
                            break;
                        }
                    }
                    return "Three of a kind";
                }
            } else if (charCount['1'] === 3) {
                if (countCount[2] === 1) {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 2) {
                            charCount[char] + 3;
                            break;
                        }
                    }
                    return "Five of a kind";
                } else {
                    for (const char in charCount) {
                        delete charCount['1'];
                        if (charCount[char] === 1) {
                            charCount[char] + 3;
                            break;
                        }
                    }
                    return "Four of a kind";
                }
            } else if (charCount['1'] === 4) {
                for (const char in charCount) {
                    if (charCount[char] === 1) {
                        charCount[char] + 4;
                        break;
                    }
                }
                return "Five of a kind";
            } else if (charCount['1'] === 5) {
                return "Five of a kind";
            } else {
                if (countCount[5]) {
                    return "Five of a kind";
                } else if (countCount[4]) {
                    return "Four of a kind";
                } else if (countCount[3] && countCount[2]) {
                    return "Full house";
                } else if (countCount[3]) {
                    return "Three of a kind";
                } else if (countCount[2] === 2) {
                    return "Two pairs";
                } else if (countCount[2] === 1) {
                    return "One pair";
                } else {
                    return "High card";
                }
            }
        } else if (charCount['1'] === 1) {
            for (const char in charCount) {
                delete charCount['1'];
                if (charCount[char] === 1) {
                    charCount[char]++;
                    break;
                }
            }
            return "One pair";
        } else {
            if (countCount[5]) {
                return "Five of a kind";
            } else if (countCount[4]) {
                return "Four of a kind";
            } else if (countCount[3] && countCount[2]) {
                return "Full house";
            } else if (countCount[3]) {
                return "Three of a kind";
            } else if (countCount[2] === 2) {
                return "Two pairs";
            } else if (countCount[2] === 1) {
                return "One pair";
            } else {
                return "High card";
            }
        }


    }
}