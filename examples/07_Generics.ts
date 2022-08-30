class Maybe<T> {
    constructor(private readonly _value?: T) {
    }

    map<U>(fn: (value: Required<T>) => U): Maybe<NonNullable<U>> {
        if (this._value == undefined) {
            return Maybe.of<NonNullable<U>>();
        } else {
            return Maybe.of(fn(this._value as Required<T>) as NonNullable<U>);
        }
    }

    getOrDefault(defaultValue: T): T {
        return this._value == undefined ? defaultValue : this._value;
    }

    static of<T>(value?: T): Maybe<T> {
        return new Maybe(value);
    }
}

interface IAsd {
    asd?: {
        asd?: IAsd | null;
        qwe?: {
            zxc?: number;
        };
    };
}

let asd1: IAsd = {
    asd: {
        asd: null
    }
};

let m123 = Maybe.of(asd1)
    .map(v => v.asd)
    .map(v => v.asd)
    .map(v => v.asd)
    .map(v => v.qwe)
    .map(v => v.zxc)
    .getOrDefault(222);

console.log(m123);
