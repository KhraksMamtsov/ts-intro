function overload1(): number {
    let arr = [1, 2, 3, 4, 5];
    return arr.length;
}

function overload0(fn: (arr: number[]) => number): number {
    let arr = [1, 2, 3, 4, 5];
    return fn(arr);
}

function overload2(el: number): Array<number> | number[] {
    let arr = [1, 2, 3, 4, 5];
    arr.push(el);
    return arr;
}

// region function overloading

class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}

/**
 * Return array length
 */
function overload(): number;
/**
 * Manipulate array
 * @param fn Some Function
 */
function overload(fn: (arr: number[]) => number): number;
/**
 * Push el to an array
 * @param el some number
 * @param order of el
 */
function overload(el: number, order: number): number[];
function overload(fnOrEl?: ((arr: number[]) => number) | number, order?: number): number | number[] {
    let arr = [1, 2, 3, 4, 5];
    switch (typeof fnOrEl) {
        case "function" : {
            return fnOrEl(arr);
        }
        case "number": {
            if(order !== undefined) {
                arr.splice(order, 0, fnOrEl);
            }
            return arr;
        }
        case "undefined": {
            return arr.length;
        }
        default: {
            throw new UnreachableCaseError(fnOrEl);
        }
    }
}

// let overResult0: number = overload();
// let overResult1: number = overload((arr) => arr.reduce((acc, cur) => acc += cur, 0));
// let overResult2: number[] = overload(6); // ,2


// endregion
