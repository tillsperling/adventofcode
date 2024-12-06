/**
 * Returns the greatest common divisor of 2 numbers
 *
 * @param a
 * @param b
 */
export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

/**
 * Returns the least common multiple of 2 numbers
 *
 * @param a 
 * @param b
 */
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

/**
 * Sorts a number array from lowest to highest number and returns it
 * @param arr: number[]
 * @returns number[]
 */
export function sortArrayLowToHigh(arr: number[]) {
    return arr.sort((a, b) => a - b);
}

export function sumUpArray(arr: number[]) {
    return arr.reduce((acc, curr) => acc + curr)
}

export function getCenterOfArray(arr): number {
    const center = arr[Math.floor(arr.length / 2)];
    return center
}