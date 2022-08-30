interface IPlugTSConfig {
    sound: string;
}

class PlugTS {
    public sound = 123; // Type inference
    // private _sound: string = "";
    // protected __sound: string = "";


    constructor(config: IPlugTSConfig) {
        this.sound = config.sound;
    }

    makeSound(): void {
        console.log(this.sound);
    }
}

// let plugTs0 = new PlugTS({sound: "lalala"});
// plugTs0.makeSound();
// console.log(plugTs0.sound);
// console.log(plugTs0._sound);
// console.log(plugTs0.__sound);

// let config = {sound: "lalala", asd: 123};
// let plug1 = new Plug(config);
// plug1.makeSound();


// class PlugTSEnhanced extends PlugTS {
//     constructor(config: IPlugTSConfig) {
//         super(config);
//     }
//
//     makeAnotherSounds() {
//         console.log(this._sound);
//         console.log(this.__sound);
//     }
// }
