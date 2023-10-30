export default class ArrayCreator {
    array: Array<string>;

    constructor(array: Array<string>) {
        this.array = array;
    }

    createDrawnArray() {
        const drawnArrayOfStrings = (this.array[0].split(','))
        const drawnArrayOfNumbers: number[] = [];
        for (let i = 0; i < drawnArrayOfStrings.length; i++) {
            drawnArrayOfNumbers.push(parseInt(drawnArrayOfStrings[i]))
        }
        this.removeDrawnArray();
        return drawnArrayOfNumbers;
    }

    removeDrawnArray() {
        this.array.shift();
    }

    createBingoCards() {
        const bingoCards: number[][][] = [];
        let cardRow: any[] = [];
        let eachCard: any[] = [];
        for (let i = 0; i < this.array.length; i++) {
            const splitDown = this.array[i].split(' ');
            if (splitDown.length > 1) {
                splitDown.forEach(element => {
                    if (eachCard.length == 5) {
                        bingoCards.push(eachCard);
                        eachCard = []
                    }
                    if (cardRow.length == 5) {
                        eachCard.push(cardRow);
                        cardRow = []
                    }
                    if (element !== '') {
                        cardRow.push(parseInt(element))
                    }
                });
            }
        }
        eachCard.push(cardRow)
        bingoCards.push(eachCard);
        return bingoCards;
    }
}