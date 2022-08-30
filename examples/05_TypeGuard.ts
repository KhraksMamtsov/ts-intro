//region Cast | "IN" type guard | User-Defined Type Guards
interface IRectangle {
    width: number;
    height: number;
}

interface ICircle {
    radius: string;
}

type Shape = IRectangle | ICircle;
type GetArea = (shape: Shape) => number;

// Cast
let getArea: GetArea = (shape) => {
    if ((<ICircle>shape).radius !== undefined) {
        const radius = parseInt((<ICircle>shape).radius, 10);
        return (radius ** 2) * Math.PI;
    } else {
        const {width, height} = shape as IRectangle;
        return width * height;
    }
};

// "IN" type guard

let getArea: GetArea = (shape) => {
    if ("radius" in shape) {
        const radius = parseInt(shape.radius, 10);
        return (radius ** 2) * Math.PI;
    } else {
        return shape.height * shape.width;
    }
};


// User-Defined Type Guards
//
function isCircle(shape: Shape): shape is ICircle {
    return "radius" in shape;
}

let getArea: GetArea = function (shape: Shape) {
    if (isCircle(shape)) {
        return (parseInt(shape.radius) ** 2) * Math.PI;
    } else {
        const {width, height} = shape;
        return width * height;
    }
};
//endregion

//region TYPEOF Guard
function formatMoney(amount: string | number): string {
    let value: number; // value type is number or string
    if (typeof amount === "string") {
        value = parseInt(amount, 10); // amount type is string
    } else {
        value = amount
    }
    return value + " $"; // value type is number
}
//endregion

// region INSTANCEOF Guard

class Qwe {
    qwe = 123;
    common = '123';
}

class Asd {
    asd = 123;
    common = '123';
}

class Zxc {
    zxc = 123;
    common = '123';
}

function doStuff(arg: Qwe | Asd | Zxc) {
    if (arg instanceof Qwe) {
        console.log(arg.qwe); // OK
        console.log(arg.asd); // Error!
        console.log(arg.zxc); // Error!
    } else if (arg instanceof Zxc) {
        console.log(arg.qwe); // Error!
        console.log(arg.asd); // Error!
        console.log(arg.zxc); // OK
    } else {
        console.log(arg.qwe); // Error!
        console.log(arg.asd); // OK
        console.log(arg.zxc); // Error!
    }

    console.log(arg.common); // OK
    console.log(arg.qwe); // Error!
    console.log(arg.asd); // Error!
    console.log(arg.zxc); // Error!
}

// endregion

//region Discriminated Unions and Exhaustive check

enum ShapeKind {
    SQUARE = "square",
    RECTANGLE = "rectangle",
    CIRCLE = "circle",
    TRIANGLE = "triangle",
}

interface Square {
    kind: ShapeKind.SQUARE;
    size: number;
}

interface Rectangle {
    kind: ShapeKind.RECTANGLE;
    width: number;
    height: number;
}

interface Circle {
    kind: ShapeKind.CIRCLE;
    radius: number;
}

interface Triangle {
    kind: ShapeKind.TRIANGLE;
    radius: number;
}

type Shape1 = Square | Rectangle | Circle;// | Triangle;

export class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}

function area(s: Shape1) {
    switch (s.kind) {
        case ShapeKind.SQUARE:
            return s.size * s.size;
        case ShapeKind.RECTANGLE:
            return s.height * s.width;
        case ShapeKind.CIRCLE:
            return Math.PI * s.radius ** 2;
        // default: throw new UnreachableCaseError(s); // 0
    }
    // should error here - we didn't handle case "triangle"
    // let exhaustiveCheck: never = s; // 1
}

//endregion
