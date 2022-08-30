declare class Maybe<T> {
    private readonly _value?;
    constructor(_value?: T | undefined);
    map<U>(fn: (value: Required<T>) => U): Maybe<NonNullable<U>>;
    getOrDefault(defaultValue: T): T;
    static of<T>(value?: T): Maybe<T>;
}
interface IAsd {
    asd?: {
        asd?: IAsd | null;
        qwe?: {
            zxc?: number;
        };
    };
}
declare let asd1: IAsd;
declare let m123: number;
