"use strict";
//region Identity naive
// let identityNumber = (x: number): number => {
//     return x;
// };
//
// let identityBoolean = (x: boolean): boolean => {
//     return x;
// };
//
// let identityAny = (x: any): any => {
//     return x;
// };
//
// let n = identityNumber(20);     // number
// let b = identityBoolean(false); // boolean
// let a = identityAny("string");  // drop types
//endregion
// region Generic identity
// let identity = <T>(arg: T): T => arg;
//
// // function signature types
// interface GenericIdentityFn {
//     <T>(arg: T): T;
// }
// let myIdentity: <U>(arg: U) => U = identity;
// let myIdentityInterface: GenericIdentityFn = identity;
// let myIdentityObjLiteral: {<T>(arg: T): T} = identity; //call signature of an object literal type
//
// let s = identity("string");
// let b = myIdentity(false);
// let n = myIdentityInterface(2);
// let ss = myIdentityObjLiteral<string>("string");
// endregion
//region pick property
let getProperty = function (obj, key) {
    return 123;
    // return obj[key];
};
let x11 = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x11, "a"); // okay
getProperty(x11, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
let people = {
    name: "Mike",
    next: {
        name: "Kile",
        next: null
    }
};
console.log(people.name);
if (people.next !== null) {
    people = people.next;
}
console.log(people.name);
// endregion
// region DOM
let inputsTypeTextList = document.querySelectorAll("input[type=text]"); // as NodeListOf<HTMLInputElement>;
console.log(inputsTypeTextList[0].value);
// let inputsList = document.querySelectorAll("input");
// console.log(inputsList[0].value);
// endregion
