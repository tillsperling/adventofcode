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