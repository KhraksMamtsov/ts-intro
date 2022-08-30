"use strict";
class Person {
    constructor() {
        this.name = "";
    }
}
let p = new Person();
// OK, because of structural typing
//_______________
let x = (a) => 0;
let y = (b, s) => 0;
y = x; // OK
// x = y; // Error
//________________
let x1 = () => ({ name: "Alice" });
let y1 = () => ({ name: "Alice", location: "Seattle" });
x1 = y1; // OK
// y1 = x1; // Error, because x1() lacks a location property
