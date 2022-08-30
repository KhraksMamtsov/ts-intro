//region Identity naive

let identityNumber = (x: number): number => {
    return x;
};

let identityBoolean = (x: boolean): boolean => {
    return x;
};

let identityAny = (x: any): any => {
    return x;
};

let n = identityNumber(20);     // number
let b = identityBoolean(false); // boolean
let a = identityAny("string");  // drop types

//endregion


// region Generic identity

let identity = <T>(arg: T): T => arg;

// function signature types
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity: <U>(arg: U) => U = identity;
let myIdentityInterface: GenericIdentityFn = identity;
let myIdentityObjLiteral: {<T>(arg: T): T} = identity; //call signature of an object literal type

let s = identity("string");
let b = myIdentity(false);
let n = myIdentityInterface(2);
let ss = myIdentityObjLiteral<string>("string");

// endregion


//region pick property
let getProperty = function <T, K extends keyof T>(obj: T, key: K) { //: T[K] {
    return 123;
    // return obj[key];
};

let x11 = {a: 1, b: 2, c: 3, d: 4};

getProperty(x11, "a"); // okay
getProperty(x11, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
//endregion


// region Wrappers

// Components Tree
type Tree<T> = {
    _value: T;
    left?: Tree<T>;
    right?: Tree<T>;
}
type Component = { name: string; }
type Application = Tree<Component>;


// Person Queue
type LinkedList<T> = T & { next: LinkedList<T> | null };

interface Person {
    name: string;
}

let people: LinkedList<Person> = {
    name: "Mike",
    next: {
        name: "Kile",
        next: null
    }
};

type personName = LinkedList<Person>["name"];

console.log(people.name);
if (people.next !== null) {
    people = people.next;
}
console.log(people.name);

// endregion

// region DOM
// приведение типов
let inputsTypeTextList = document.querySelectorAll("input[type=text]");// as NodeListOf<HTMLInputElement>;
console.log(inputsTypeTextList[0].value);

let inputsList = document.querySelectorAll("input");
console.log(inputsList[0].value);
// endregion
