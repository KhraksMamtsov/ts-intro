// region Class Decorator
// Decorators are a stage 2 proposal for JavaScript
// "experimentalDecorators": true

const registry = new WeakMap<object, string>(); // object === non primitive value

class BaseComponent {
    tagName: string = "div";
    static asd = "asd";
}

const logClass = (fn: (...args: any) => void): any => (klass: {
    new (...args: any): any;
}) => {
    fn("CLASS init");
    return class __TransparentWrapper__ extends klass {
        constructor(...args: any) {
            fn("Before", args);
            super(...args);
            fn("After", this);
        }
    };
};

const logMethod = (fn: (...args: any) => void): any => (
    target: Object, // class prototype
    propertyName: string, //
    propertyDesciptor: PropertyDescriptor
): PropertyDescriptor => {
    // target === Employee.prototype
    // propertyName === "onClick"
    // propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "onClick")
    fn("METHOD init");
    const originalMethod = propertyDesciptor.value;

    propertyDesciptor.value = function(...args: any[]) {
        fn("LogMethod:Before", propertyName, args);
        const result = originalMethod.apply(this, args);
        fn("LogMethod:After", result);
        return result;
    };
    return propertyDesciptor;
};

const logProperty = (fn: (...args: any) => void) => function logProperty(target: any, key: string) {
    fn("PROPERTY init");
    // property value
    let _val = target[key];

    // property getter
    const getter = function() {
        fn("get ", key, _val);
        return _val;
    };

    // property setter
    const setter = function(newVal: any) {
        fn("Set", key, newVal);
        _val = newVal;
    };

    // Delete property. The delete operator throws
    // in strict mode if the property is an own
    // non-configurable property and returns
    // false in non-strict mode.
    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
};

@logClass(console.info)
@logClass(console.warn)
@logClass(console.error)
class Btn extends BaseComponent {
    @logProperty(console.info)
    @logProperty(console.warn)
    @logProperty(console.error)
    public btn?: number;

    @logMethod(console.info)
    @logMethod(console.warn)
    @logMethod(console.error)
    onClick(...args: number[]) {
        // : number  metageneration
        alert("clicked");
        console.log(this);
        return args.reduce((a, b) => a + b, 0);
    }

    constructor(m: string) {
        super();
        console.log("Do BTN initialization");
    }
}

let btn = new Btn("world");
console.log(btn);
console.log(btn instanceof BaseComponent);
console.log(btn instanceof Btn);

console.log("______________________________");

btn.onClick(1, 2, 3);
console.log(JSON.stringify(btn));
// endregion
