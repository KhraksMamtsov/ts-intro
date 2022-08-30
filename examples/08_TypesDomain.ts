// region MAPPED TYPES

// внутри плагинный конфиг, которрый собирается по частям
interface IConfigInternal {
    //1
    prop11: Extract<string | null | boolean | symbol, // union type
        string | null>;
    prop12: number;
    // 2
    prop21?: Exclude<boolean | number,
        number>;
    prop22?: number[];
}

// первая частькоторую нужно принять
type IExternalConfig1 = Pick<IConfigInternal, "prop11" | "prop12">; // union type

// region helpers
type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>; // T - U
type NonNullableProps<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
// endregion helpers

// вторая частькоторую нужно принять = внутриплагинный тип - тип первой части
type IExternalConfig2 = Diff<IConfigInternal, IExternalConfig1>;

let setExternalConfig1 = (config: Readonly<NonNullableProps<IExternalConfig1>>) => {
    config.prop11 = 2; // Cannot assign to 'prop11' because it is a read-only property.
};

let setExternalConfig2 = (config: Required<IExternalConfig2>) => {
    config.prop21.toString(); //Object is possibly 'undefined'.
    console.log(config.prop21 + config.prop22.join(""));
};

setExternalConfig1({prop11: "null", prop12: 2});
setExternalConfig2({prop21: false, prop22: [2]});

// endregion

// region infer type Box<T, U>
interface IBox<T, U> {
    value: T;
    some: U;
}

class Box<T, U> implements IBox<T, U> {
    constructor(public value: T, public some: U) {
    }
}

class BoxStringNumber extends Box<string, number> {
}

// infer - выводит тип из закрытого generic

type BoxValueType<B> = B extends Box<infer P, infer U> ? [P, U] : never;
// type BoxValueType<B> = B extends Box<infer P, infer P> ? P : never;
// type BoxValueType<B> = B extends Box<infer P, any> ? P : never;

type asd = BoxValueType<BoxStringNumber>;

// endregion

// region infer type usage 1

// сложная связь типов


interface IInfer<T = string> {
    fn(value: T): T extends string ? "fafafa" : false;

    value: ReturnType<IInfer<T>["fn"]>
}

let asd: IInfer = {
    fn(string) {
        return "fafafa";
    },
    value: "fafafa"
};

let qwe: IInfer<number> = {
    fn(number) {
        return false;
    },
    value: false
};

// endregion

// region infer type usage 2
type Lion = { meow(): void };
type Tiger = { meow(): string };
type Zebra = { borr(): string };
type Shark = { silentlyKill(): void };

// union type
type Animal = Lion | Zebra | Tiger | Shark;

type ExtractCat<A> = A extends { meow(...args: any): any } ? A : never

type Cat = ExtractCat<Animal>; // разворачивается в

type Cat1 =
    | ExtractCat<Lion> // Lion
    | ExtractCat<Zebra>// never -
    | ExtractCat<Tiger>// Tiger
    | ExtractCat<Shark>;// never -

// endregion

// region Marker for contextual 'this' type

// сложная связь контекстов this
type ObjectComponent<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
    hook?: (this: D & M) => void;
}

let cpObj: ObjectComponent<{ x: number, y: string }, { moveBy(dx: number, as: number): void }> = {
    data: {x: 0, y: "0"},
    hook() {
        this.moveBy(this.x, this.y);
    },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx;  // Strongly typed this
            this.y += dy;  // Strongly typed this
            this.y = dy;  // Strongly typed this
        }
    }
};

function makeObjectComponent<D, M>(desc: ObjectComponent<D, M>): D & M & { hook: NonNullable<ObjectComponent<D, M>["hook"]> } {
    const data = desc.data;
    const methods = desc.methods;
    const hook = desc.hook || (function () {
    });
    const resultCpObject = {...data, ...methods} as D & M;
    hook.bind(resultCpObject);
    return {...data, ...methods, hook} as D & M & { hook: NonNullable<ObjectComponent<D, M>["hook"]> };
}

let component = makeObjectComponent(cpObj);
// endregion
