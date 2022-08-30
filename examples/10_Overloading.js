"use strict";
function overload1() {
    let arr = [1, 2, 3, 4, 5];
    return arr.length;
}
function overload0(fn) {
    let arr = [1, 2, 3, 4, 5];
    return fn(arr);
}
function overload2(el) {
    let arr = [1, 2, 3, 4, 5];
    arr.push(el);
    return arr;
}
// region function overloading
class UnreachableCaseError extends Error {
    constructor(val) {
        super(`Unreachable case: ${val}`);
    }
}
function overload(some, order) {
    let arr = [1, 2, 3, 4, 5];
    switch (typeof some) {
        case "function": {
            return some(arr);
        }
        case "number": {
            if (order !== undefined) {
                arr.splice(order, 0, some);
            }
            return arr;
        }
        case "undefined": {
            return arr.length;
        }
        default: {
            throw new UnreachableCaseError(some);
        }
    }
}
// let overResult0: number = overload();
// let overResult1: number = overload((arr) => arr.reduce((acc, cur) => acc += cur, 0));
// let overResult2: number[] = overload(6); // ,2
// endregion
