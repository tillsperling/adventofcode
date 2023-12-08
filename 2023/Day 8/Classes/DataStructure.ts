import Node from "../Types/Node";

export default class DataStructure {
    data: string[];
    route: string | undefined;
    nodes: Node[];

    constructor(data: string[]) {
        this.data = data;
        this.route = '';
        this.nodes = [];
    }

    extractData(): [string | undefined, Node[]] {
        this.route = this.data.shift();
        for (let line of this.data) {
            line = line.replace(/ /g, '')
            line = line.replace('=', ' ')
            line = line.replace('(', '')
            line = line.replace(')', '')
            line = line.replace(',', ' ')
            const [location, left, right] = line.split(' ');
            const node: Node = {
                location,
                left,
                right
            }
            this.nodes.push(node);
        }
        return [this.route, this.nodes];
    }
}