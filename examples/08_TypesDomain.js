"use strict";
// region MAPPED TYPES
let setExternalConfig1 = (config) => {
    config.prop11 = 2; // Cannot assign to 'prop11' because it is a read-only property.
};
let setExternalConfig2 = (config) => {
    config.prop21.toString(); //Object is possibly 'undefined'.
    console.log(config.prop21 + config.prop22.join(""));
};
setExternalConfig1({ prop11: "null", prop12: 2 });
setExternalConfig2({ prop21: false, prop22: [2] });
class Box {
    constructor(value, some) {
        this.value = value;
        this.some = some;
    }
}
class BoxStringNumber extends Box {
}
let asd = {
    fn(string) {
        return "fafafa";
    },
    value: "fafafa"
};
let qwe = {
    fn(number) {
        return false;
    },
    value: false
};
let cpObj = {
    data: { x: 0, y: "0" },
    hook() {
        this.moveBy(this.x, this.y);
    },
    methods: {
        moveBy(dx, dy) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
            this.y = dy; // Strongly typed this
        }
    }
};
function makeObjectComponent(desc) {
    const data = desc.data;
    const methods = desc.methods;
    const hook = desc.hook || (function () {
    });
    const resultCpObject = Object.assign({}, data, methods);
    hook.bind(resultCpObject);
    return Object.assign({}, data, methods, { hook });
}
let component = makeObjectComponent(cpObj);
// endregion
