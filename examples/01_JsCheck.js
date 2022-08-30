// @ts-nocheck
// включить настройки в компиляторе

/* // add *
 * Greeter constructor
 *
 * @param greeting {string}
 * @constructor
 */
function Greeter(greeting) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
};

let greeter = new Greeter({ message: "world" });

console.log(greeter.greet());
// "Hello, [object Object]" instead of "Hello, world" without error.
