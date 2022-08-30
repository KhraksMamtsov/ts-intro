//  @ts-nocheck

/**
 * @typedef {Object} PluginConfig - config for plugin
 * @property {string} sound
 */

class Plug {
    /**
     * @param config {PluginConfig}
     */
    constructor(config) {
        this.sound = config.sound;
    }

    makeSound() {
        console.log(this.sound);
    }
}

let plug0 = new Plug({suond: "lalala"});
plug0.makeSound();

// сделаем конфиг классом
// class PlugConfig {
//     some = 123;
//
//     /**
//      * @param sound {number}
//      */
//     constructor(sound) {
//         this.sound = "!!!" + sound + "!!!";
//     }
// }
// // ошибка при литерале
// let plug1 = new Plug({sound: "lalala", some: 123});
//
// // нет ошибки // some
// let config = {sound: "lalala", some: 123};
// let plug2 = new Plug(config);
// plug2.makeSound();
//
// // нет ошибки // some
// let plug3 = new Plug(new PlugConfig("lalala"));
// plug3.makeSound();
