/**
 * created by Claude >_<
 * but how the shit would i know what a DSU is
 * the more u know
 */

export class DSU {
    private parent: number[];
    private rank: number[];
    
    constructor(size: number) {
        // Initially, each element is its own parent (its own set)
        this.parent = Array.from({ length: size }, (_, i) => i);
        // Rank is used for optimization (union by rank)
        this.rank = Array(size).fill(0);
    }
    
    // Find the root/representative of the set containing x
    // Uses path compression for optimization
    find(x: number): number {
        if (this.parent[x] !== x) {
            // Path compression: make every node point directly to root
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    // Union two sets containing x and y
    // Uses union by rank for optimization
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        // Already in the same set
        if (rootX === rootY) return false;
        
        // Union by rank: attach smaller tree under larger tree
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
    
    // Check if x and y are in the same set
    isConnected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
}