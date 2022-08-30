// region Merging Interfaces
// Useful for external API
interface Boxx {
    height: number;
    width: number;
}

interface Boxx   {
    scale: number;
    width: string;
}

let boxx: Boxx = {height: 5, width: 6, s: 10};
// endregion



// region Merging Types
// type BoxxT = {
//     height: number;
//     width: number;
// }
//
// type BoxxT = {
//     scale: number;
//     width: string;
// }
//
// let boxxT: BoxxT = {height: 5, width: 6, s: 10};
// endregion
