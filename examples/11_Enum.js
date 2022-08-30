"use strict";
// region Enum
var Animals;
(function (Animals) {
    Animals["Cat"] = "cat";
    Animals["Dog"] = "dog";
    Animals[Animals["Parrot"] = 1] = "Parrot";
})(Animals || (Animals = {}));
Animals.Cat = "DUCK"; // Error readonly
function ident(animal) {
    return animal;
}
let an = ident(Animals.Cat);
const keys = Object.keys(Animals); // [Cat, Dog, Parrot]
const values = Object.values(Animals); // ["cat", "dog", 1]
function identTW(tw) {
    return tw;
}
let identTw = identTW("asd" /* ASD */);
const keysTW = Object.keys(TokenWords); // Error
const valuesTW = Object.values(TokenWords); // Error
// endregion
//region Dynamic Value
//https://www.typescriptlang.org/play/#src=%0D%0Aconst%20getNumberFrom%20%3D%20(i%20%3D%200)%20%3D%3E%20()%20%3D%3E%20%2B%2Bi%3B%0D%0Aconst%20getNumber%20%3D%20getNumberFrom(1)%3B%20%0D%0Aenum%20Numbers%20%7B%20%2F%2F%20const%0D%0A%20%20%20%20One%20%3D%201%2C%0D%0A%20%20%20%20Two%20%3D%20getNumber()%2C%0D%0A%20%20%20%20Three%20%3D%203%2C%0D%0A%20%20%20%20Four%20%3D%20Two%20**%202%2C%0D%0A%20%20%20%20Six%20%3D%206%2C%0D%0A%20%20%20%20Seven%20%2F%2F%207%20automagically%0D%0A%7D%0D%0A%0D%0Alet%20one%20%3D%20Numbers.One%3B%0D%0Alet%20one1%20%3D%20Numbers%5B%22One%22%5D%3B%0D%0Alet%20one2%20%3D%20Numbers%5B1%5D%3B%0D%0Aconsole.log(one%2C%20one1%2C%20one2)%3B%0D%0Alet%20Entries%20%3D%20Object.entries(Numbers)%3B%0D%0Aconsole.log(Entries)%3B%0D%0Aconsole.log(Numbers)%3B
const getNumberFrom = (i = 0) => () => ++i;
const getNumber = getNumberFrom(1);
var Numbers;
(function (Numbers) {
    Numbers[Numbers["One"] = 1] = "One";
    Numbers[Numbers["Two"] = getNumber()] = "Two";
    Numbers[Numbers["Three"] = 3] = "Three";
    Numbers[Numbers["Four"] = Math.pow(Numbers.Two, 2)] = "Four";
    Numbers[Numbers["Six"] = 6] = "Six";
    Numbers[Numbers["Seven"] = 7] = "Seven"; // 7 auto magically
})(Numbers || (Numbers = {}));
let one = Numbers.One; // 1
let one1 = Numbers["One"]; // 1
let one2 = Numbers[1]; // "One"
console.log(one, one1, one2);
let Entries = Object.entries(Numbers);
console.log(Entries);
console.log(Numbers);
// ["1", "One"]
// ["2", "Two"]
// ["3", "Three"]
// ["4", "Four"]
// ["6", "Six"]
// ["7", "Seven"]
// ["One", 1]
// ["Two", 2]
// ["Three", 3]
// ["Four", 4]
//  ["Six", 6]
//  ["Seven", 7]
//endregion
// region Enum bit logic + decorator access
var UserGroup;
(function (UserGroup) {
    /* 001 */ UserGroup[UserGroup["Guest"] = 1] = "Guest";
    /* 010 */ UserGroup[UserGroup["User"] = 2] = "User";
    /* 100 */ UserGroup[UserGroup["Admin"] = 4] = "Admin";
})(UserGroup || (UserGroup = {}));
function readFile(path, $string) {
    return path + "<" + $string + ">" + ": TS exist!";
}
let accessDecorator = (accessRole, fn) => (userRole, ...args) => {
    if (accessRole & userRole) { // не пересекаются
        return fn(...args); // as any странность spread Tuple type
    }
    else {
        throw new Error("Can't access.");
    }
};
let protectReadFile = accessDecorator(UserGroup.User | UserGroup.Admin, readFile);
/* 101 */
try {
    alert(protectReadFile(UserGroup.User, "SecretFile.txt", false));
    alert(protectReadFile(UserGroup.User, "SecretFile.txt"));
    alert(protectReadFile(UserGroup.User, "SecretFile.txt", 108));
}
catch (error) {
    alert(Error.name);
}
// endregion
