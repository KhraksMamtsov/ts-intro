interface IPlugTSConfig {
    sound: string;
}
declare class PlugTS {
    sound: number;
    constructor(config: IPlugTSConfig);
    makeSound(): void;
}
