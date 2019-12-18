import { InputData } from './day8-space-image-format.input-data';
import { decodedImageToStrings } from './day8-space-image-format';

const width = 25;
const height = 6;
const decodedImageStrings = decodedImageToStrings(width, height, InputData);

console.log('');
console.log('');
console.log('');
console.log('The image below should be read as BCPZB - maybe you have to read it from some distance');
console.log('');
console.log('');
console.log('');

decodedImageStrings.forEach(s => console.log(s));

console.log('');
console.log('');
console.log('');
