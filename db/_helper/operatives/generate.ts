import path from "path";

const dataPath = path.join(__dirname, "data");
console.log(dataPath);

// filter characterData first column where it's don't have '_'
// const characterDataFiltered = characterData.filter((character:string) => {
//   return character[0].indexOf('_') !== -1;
// });

// console.log(characterDataFiltered);
