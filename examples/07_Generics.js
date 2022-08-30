"use strict";
class Maybe {
    constructor(_value) {
        this._value = _value;
    }
    map(fn) {
        if (this._value == undefined) {
            return Maybe.of();
        }
        else {
            return Maybe.of(fn(this._value));
        }
    }
    getOrDefault(defaultValue) {
        return this._value == undefined ? defaultValue : this._value;
    }
    static of(value) {
        return new Maybe(value);
    }
}
let asd1 = {
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
