import { buildCatalogueOfOjects, minimumOrbitalTransfers } from './day6-universal-orbit-map';
import { InputData } from './day6-universal-orbit-map.input-data';

const catalogue = buildCatalogueOfOjects(InputData);
const fromName = 'YOU';
const toName = 'SAN';
const _minimumOrbitalTransfers = minimumOrbitalTransfers(fromName, toName, catalogue);

console.log('the minimum orbit transfers from YOU to SAN is', _minimumOrbitalTransfers.length);
