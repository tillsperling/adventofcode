export default class LeewayGetter {
    input: number[][];
    length: number;
    leewayArray: number[];
    sum: number;

    constructor(input: number[][]) {
        this.input = input;
        this.length = input[0].length
        this.leewayArray = [];
        this.sum = 0;
    }

    getLeeway(): number {
        for (let i = 0; i < this.length; i++) {
            let hold = -1;
            let traveled = -1;
            let leeway = 0;
            for (let j = 0; j < this.input[0][i]; j++) {
                hold++;
                const timeToTravel = this.input[0][i] - hold;
                traveled = timeToTravel * hold;
                // console.log(`hold: ${hold}, traveled: ${traveled}`)
                if (traveled > this.input[1][i]) {
                    leeway++;
                }
            }
            this.leewayArray.push(leeway);
        }
        this.sum = this.leewayArray.reduce( (a, b) => a * b );
        return this.sum;
    }
}