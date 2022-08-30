// region Enum
enum Animals { // String, Number, Heterogenous
    Cat = "cat",
    Dog = "dog",
    Parrot = 1,
}

Animals.Cat = "DUCK"; // Error readonly

function ident(animal: Animals) { // :string {
    return animal
}

let an = ident(Animals.Cat);

const keys = Object.keys(Animals); // [Cat, Dog, Parrot]
const values = Object.values(Animals); // ["cat", "dog", 1]
// endregion

//region Const Enum
// https://www.typescriptlang.org/play/#src=enumHere%3B%0D%0Aconst%20enum%20TokenWords%20%7B%0D%0A%20%20%20%20QWE%20%3D%20%22qwe%22%2C%0D%0A%20%20%20%20ASD%20%3D%20%22asd%22%2C%0D%0A%20%20%20%20ZXC%20%3D%20%22zxc%22%0D%0A%7D%0D%0AenumWasHere%3B%0D%0A%0D%0Afunction%20identTW(tw%3A%20TokenWords)%20%7B%0D%0A%20%20%20%20return%20tw%3B%0D%0A%7D%0D%0A%0D%0Alet%20identTw%20%3D%20identTW(TokenWords.ASD)%3B%0D%0A%0D%0Aconst%20keysTW%20%3D%20Object.keys(TokenWords)%3B%20%2F%2F%20Error%0D%0Aconst%20valuesTW%20%3D%20Object.values(TokenWords)%3B%20%2F%2F%20Error
const enum TokenWords {
    QWE = "qwe",
    ASD = "asd",
    ZXC = "zxc"
}

function identTW(tw: TokenWords) {
    return tw;
}

let identTw = identTW(TokenWords.ASD);

const keysTW = Object.keys(TokenWords); // Error
const valuesTW = Object.values(TokenWords); // Error
// endregion

//region Dynamic Value
//https://www.typescriptlang.org/play/#src=%0D%0Aconst%20getNumberFrom%20%3D%20(i%20%3D%200)%20%3D%3E%20()%20%3D%3E%20%2B%2Bi%3B%0D%0Aconst%20getNumber%20%3D%20getNumberFrom(1)%3B%20%0D%0Aenum%20Numbers%20%7B%20%2F%2F%20const%0D%0A%20%20%20%20One%20%3D%201%2C%0D%0A%20%20%20%20Two%20%3D%20getNumber()%2C%0D%0A%20%20%20%20Three%20%3D%203%2C%0D%0A%20%20%20%20Four%20%3D%20Two%20**%202%2C%0D%0A%20%20%20%20Six%20%3D%206%2C%0D%0A%20%20%20%20Seven%20%2F%2F%207%20automagically%0D%0A%7D%0D%0A%0D%0Alet%20one%20%3D%20Numbers.One%3B%0D%0Alet%20one1%20%3D%20Numbers%5B%22One%22%5D%3B%0D%0Alet%20one2%20%3D%20Numbers%5B1%5D%3B%0D%0Aconsole.log(one%2C%20one1%2C%20one2)%3B%0D%0Alet%20Entries%20%3D%20Object.entries(Numbers)%3B%0D%0Aconsole.log(Entries)%3B%0D%0Aconsole.log(Numbers)%3B

const getNumberFrom = (i = 0) => () => ++i;
const getNumber = getNumberFrom(1);
enum Numbers { // const
    One = 1,
    Two = getNumber(),
    Three = 3,
    Four = Two ** 2,
    Six = 6,
    Seven // 7 auto magically
}

let one = Numbers.One;    // 1
let one1 = Numbers["One"];// 1
let one2 = Numbers[1];    // "One"
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
const enum UserGroup { // const works
    /* 001 */Guest = 1 << 0, // 1
    /* 010 */User  = 1 << 1, // 2
    /* 100 */Admin = 1 << 2, // 4
}

function readFile(path: string, $string?: number) {
    return path + "<" + $string +">" + ": TS exist!";
}


let accessDecorator = <FN extends (...args: any) => any>(
    accessRole: UserGroup,
    fn: FN) => (userRole: UserGroup, ...args: Parameters<FN>): ReturnType<FN> | void =>
{
    if (accessRole & userRole) {
        return fn(...args); // as any странность spread Tuple type
    } else {
        throw new Error("Can't access.");
    }
};

let protectReadFile = accessDecorator(
    UserGroup.User | UserGroup.Admin, 
    readFile);
/* 101 */

try {
    alert(protectReadFile(UserGroup.User, "SecretFile.txt", false));
    alert(protectReadFile(UserGroup.User, "SecretFile.txt"));
    alert(protectReadFile(UserGroup.User, "SecretFile.txt", 108));
} catch (error) {
    alert(Error.name);
}

// endregion


