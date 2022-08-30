interface Named {
    name: string;
}

class Person {
    name: string = "";
}

let p: Named = new Person();
// OK, because of structural typing


//_______________

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error

//________________
let x1 = () => ({name: "Alice"});
let y1 = () => ({name: "Alice", location: "Seattle"});

x1 = y1; // OK
y1 = x1; // Error, because x1() lacks a location property
