import Node from "../Types/Node";
import { lcm } from '../../../utils/utils';

export default class GhostMapTraverser {
    route: string | undefined;
    routeCounter: number;
    routeLength: number | undefined;
    nodes: Node[];
    steps: number;
    routePositions: any[];
    endRoutes: any[];
    prev: any[];
    next: any[];
    zNodes: any[];

    constructor(route: string | undefined, nodes: Node[]) {
        this.route = route;
        this.routeCounter = 0;
        this.routeLength = this.route?.length;
        this.nodes = nodes;
        this.steps = 0;
        this.routePositions = [];
        this.prev = [];
        this.next = [];
        this.endRoutes = [];
        this.zNodes = [];
    }

    traverseMap(): void | number {
        this.routePositions = this.#fillStartingRoutes();
        // console.log(this.startingRoutes)
        const solution = this.#timeShenanigans(this.routePositions)
        return solution;
    }

    #timeShenanigans(array: Node[]): any {
        while (true) {
            // count up steps
            this.steps++;
            // start loop of starting Routes
            for (let i = 0; i < array.length; i++) {
                const next: any = this.#findNextNode(array[i]);
                this.routePositions[i] = next;

                if (next.location[2] === 'Z') {
                    this.zNodes.push(next);
                    if (!this.endRoutes.includes(this.steps)) {
                        // console.log(`found the node ${next.location} at ${this.steps}`)
                        this.endRoutes.push(this.steps);
                    }
                } else if (this.steps % 2 === 0) {
                    // console.log(`this step is even so we are going to set the prev as ${next.location}`)
                    this.prev[i] = next;
                } else {
                    // console.log(`this step is odd so we are going to set the next as ${next.location}`)
                    this.next[i] = next;
                }

            }

            if (this.endRoutes.length === this.routePositions.length) {
                // console.log(`logging end routes`)
                // console.log(this.endRoutes);
                let result = this.endRoutes.reduce(lcm)
                return result
            }

            // counting up the route counter
            this.routeCounter++;
            // if the counter is at the end of route, reset it to go agane
            if (this.routeCounter === this.routeLength) {
                this.routeCounter = 0;
            }
        }
    }

    #fillStartingRoutes(): Node[] {
        const startingRoutes: Node[] = [];
        for (let node of this.nodes) {
            if (node.location[2] === 'A') {
                startingRoutes.push(node);
            }
        }
        return startingRoutes;
    }

    #findNextNode(node: any): any {
        const current = node;
        if (this.route![this.routeCounter] === 'L') {
            return this.nodes.find(node => node.location === current.left);
        } else {
            return this.nodes.find(node => node.location === current.right);
        }
    }
}