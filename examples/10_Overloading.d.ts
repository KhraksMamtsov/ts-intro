declare function overload1(): number;
declare function overload0(fn: (arr: number[]) => number): number;
declare function overload2(el: number): Array<number> | number[];
declare class UnreachableCaseError extends Error {
    constructor(val: never);
}
/**
 * Return array length
 */
declare function overload(): number;
/**
 * Manipulate array
 * @param fn Some Function
 */
declare function overload(fn: (arr: number[]) => number): number;
/**
 * Push el to an array
 * @param el some number
 * @param order of el
 */
declare function overload(el: number, order: number): number[];
