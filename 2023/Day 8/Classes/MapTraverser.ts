import Node from "../Types/Node";

export default class MapTraverser {
    route: string | undefined;
    routeLength: number | undefined;
    nodes: Node[];
    steps: number;

    constructor(route: string | undefined, nodes: Node[]) {
        this.route = route;
        this.routeLength = this.route?.length;
        this.nodes = nodes;
        this.steps = 0;
    }

    traverseMap(): void | number {
        let currentNode = this.nodes.find(node => node.location === 'AAA');
        if (this.route === undefined) {
            return;
        } else {
            for (let i = 0; i < this.route.length; i++) {
                const direction = this.route[i]
                if (currentNode?.location === 'ZZZ') {
                    break;
                }
                if (direction === 'L') {
                    currentNode = this.nodes.find(node => node.location === currentNode!.left);
                } else {
                    currentNode = this.nodes.find(node => node.location === currentNode!.right);
                }
                this.steps++;
                if (i === this.route.length - 1) {
                    i = -1;
                }
            }
        }
        return this.steps;
    }
}