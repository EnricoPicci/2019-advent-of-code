import { allDirectIndirectOrbits } from './day6-universal-orbit-map';
import { InputData } from './day6-universal-orbit-map.input-data';

const allOrbits = allDirectIndirectOrbits(InputData);

console.log('the number of all direct and indirect orbits is', allOrbits.length);
