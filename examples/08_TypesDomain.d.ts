interface IConfigInternal {
    prop11: Extract<string | null | boolean | symbol, // union type
    // union type
    string | null>;
    prop12: number;
    prop21?: Exclude<boolean | number, number>;
    prop22?: number[];
}
declare type IExternalConfig1 = Pick<IConfigInternal, "prop11" | "prop12">;
declare type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
declare type NonNullableProps<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
declare type IExternalConfig2 = Diff<IConfigInternal, IExternalConfig1>;
declare let setExternalConfig1: (config: Readonly<NonNullableProps<Pick<IConfigInternal, "prop11" | "prop12">>>) => void;
declare let setExternalConfig2: (config: Required<Pick<IConfigInternal, "prop21" | "prop22">>) => void;
interface IBox<T, U> {
    value: T;
    some: U;
}
declare class Box<T, U> implements IBox<T, U> {
    value: T;
    some: U;
    constructor(value: T, some: U);
}
declare class BoxStringNumber extends Box<string, number> {
}
declare type BoxValueType<B> = B extends Box<infer P, infer U> ? [P, U] : never;
declare type asd = BoxValueType<BoxStringNumber>;
interface IInfer<T = string> {
    fn(value: T): T extends string ? "fafafa" : false;
    value: ReturnType<IInfer<T>["fn"]>;
}
declare let asd: IInfer;
declare let qwe: IInfer<number>;
declare type Lion = {
    meow(): void;
};
declare type Tiger = {
    meow(): string;
};
declare type Zebra = {
    borr(): string;
};
declare type Shark = {
    silentlyKill(): void;
};
declare type Animal = Lion | Zebra | Tiger | Shark;
declare type ExtractCat<A> = A extends {
    meow(...args: any): any;
} ? A : never;
declare type Cat = ExtractCat<Animal>;
declare type Cat1 = ExtractCat<Lion> | ExtractCat<Zebra> | ExtractCat<Tiger> | ExtractCat<Shark>;
declare type ObjectComponent<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;
    hook?: (this: D & M) => void;
};
declare let cpObj: ObjectComponent<{
    x: number;
    y: string;
}, {
    moveBy(dx: number, as: number): void;
}>;
declare function makeObjectComponent<D, M>(desc: ObjectComponent<D, M>): D & M & {
    hook: NonNullable<ObjectComponent<D, M>["hook"]>;
};
declare let component: {
    x: number;
    y: string;
} & {
    moveBy(dx: number, as: number): void;
} & {
    hook: (this: {
        x: number;
        y: string;
    } & {
        moveBy(dx: number, as: number): void;
    }) => void;
};
