declare enum Animals {
    Cat = "cat",
    Dog = "dog",
    Parrot = 1
}
declare function ident(animal: Animals): Animals;
declare let an: Animals;
declare const keys: string[];
declare const values: any;
declare const enum TokenWords {
    QWE = "qwe",
    ASD = "asd",
    ZXC = "zxc"
}
declare function identTW(tw: TokenWords): TokenWords;
declare let identTw: TokenWords;
declare const keysTW: string[];
declare const valuesTW: any;
declare const getNumberFrom: (i?: number) => () => number;
declare const getNumber: () => number;
declare enum Numbers {
    One = 1,
    Two,
    Three = 3,
    Four,
    Six = 6,
    Seven = 7
}
declare let one: Numbers;
declare let one1: Numbers;
declare let one2: string;
declare let Entries: any;
declare enum UserGroup {
    Guest = 1,
    User = 2,
    Admin = 4
}
declare function readFile(path: string, $string?: number): string;
declare let accessDecorator: <FN extends (...args: any) => any>(accessRole: UserGroup, fn: FN) => (userRole: UserGroup, ...args: Parameters<FN>) => void | ReturnType<FN>;
declare let protectReadFile: (userRole: UserGroup, path: string, $string?: number | undefined) => string | void;
