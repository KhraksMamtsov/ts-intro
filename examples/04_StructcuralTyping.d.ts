interface Named {
    name: string;
}
declare class Person {
    name: string;
}
declare let p: Named;
declare let x: (a: number) => number;
declare let y: (b: number, s: string) => number;
declare let x1: () => {
    name: string;
};
declare let y1: () => {
    name: string;
    location: string;
};
