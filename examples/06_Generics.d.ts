declare let getProperty: <T, K extends keyof T>(obj: T, key: K) => number;
declare let x11: {
    a: number;
    b: number;
    c: number;
    d: number;
};
declare type Tree<T> = {
    _value: T;
    left?: Tree<T>;
    right?: Tree<T>;
};
declare type Component = {
    name: string;
};
declare type Application = Tree<Component>;
declare type LinkedList<T> = T & {
    next: LinkedList<T> | null;
};
interface Person {
    name: string;
}
declare let people: LinkedList<Person>;
declare type personName = LinkedList<Person>["name"];
declare let inputsTypeTextList: NodeListOf<Element>;
