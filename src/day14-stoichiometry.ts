type Chemicals = {
    [chemical: string]: Chemical;
};
type Chemical = {
    minimalQuantity: number;
    input: {
        quantity: number;
        chemical: string;
    }[];
    inStock: number;
};
const ORE = 'ORE';
const FUEL = 'FUEL';

export function readInput(input: string) {
    return input
        .split('\n')
        .map(reactionData => {
            const [reactionInputData, reactionOutputData] = reactionData.split('=>');
            const output = parseReactionElementData(reactionOutputData);
            const input = reactionInputData.split(',').map(data => parseReactionElementData(data));
            return { output, input };
        })
        .reduce<Chemicals>((acc, val) => {
            acc[val.output.chemical] = { minimalQuantity: val.output.quantity, input: val.input, inStock: 0 };
            return acc;
        }, {});
}
function parseReactionElementData(inputData: string) {
    const quantityChemical = inputData.trim().split(' ');
    if (quantityChemical.length !== 2) {
        throw new Error(`Input data "${inputData}" can not be split into chemical and data`);
    }
    const [quantity, chemical] = quantityChemical;
    return { quantity: parseInt(quantity), chemical };
}

export function calculateRequiredOre(chemicalId: string, quantityRequired: number, chemicals: Chemicals) {
    const quantityToProduce = quantityRequired - chemicals[chemicalId].inStock;
    const quantitiesRequired = Object.entries(calculateQuantitiesRequired(chemicalId, quantityToProduce, chemicals));
    if (quantitiesRequired.length === 0) {
        const chemical = chemicals[chemicalId];
        return calculateRequiredOreForChemicalWithOnlyOreAsInput(chemical, quantityToProduce);
    }
    return quantitiesRequired.reduce((acc, val) => {
        const chemical = chemicals[val[0]];
        return acc + calculateRequiredOreForChemicalWithOnlyOreAsInput(chemical, val[1]);
    }, 0);
}
function calculateRequiredOreForChemicalWithOnlyOreAsInput(chemical: Chemical, quantityToProduce: number) {
    if (chemical.input.length !== 1) {
        throw new Error(`We expect only ORE as input but we have received ${JSON.stringify(chemical.input, null, 2)}`);
    }
    const numberOfReactionsRequired = calculateNumberOfReactions(quantityToProduce, chemical.minimalQuantity);
    return numberOfReactionsRequired * chemical.input[0].quantity;
}

export function calculateQuantitiesRequired(
    chemicalId: string,
    quantityRequired: number,
    chemicals: Chemicals,
    quantitiesOfElementsRequired: { [elementId: string]: number } = {},
) {
    const chemical = chemicals[chemicalId];
    const nonOreInputElements = chemical.input.filter(e => e.chemical !== ORE);
    const oreInput = chemical.input.find(e => e.chemical === ORE);
    const quantityToProduce = quantityRequired > chemical.inStock ? quantityRequired - chemical.inStock : 0;
    chemical.inStock = quantityRequired > chemical.inStock ? 0 : chemical.inStock - quantityRequired;
    const numberOrReactionsRequired = calculateNumberOfReactions(quantityToProduce, chemical.minimalQuantity);
    const remainder = numberOrReactionsRequired * chemical.minimalQuantity - quantityToProduce;
    chemical.inStock = chemical.inStock + remainder;
    if (oreInput && nonOreInputElements.length > 0) {
        throw new Error(
            `We do not expect to have ORE as input element together with other elements as in the formula for ${chemicalId}`,
        );
    }
    if (nonOreInputElements.length > 0) {
        nonOreInputElements.forEach(element => {
            const _chem = chemicals[element.chemical];
            const quantityRequired = element.quantity * numberOrReactionsRequired;
            if (isChemicalMadeOnlyOfOre(_chem)) {
                quantitiesOfElementsRequired[element.chemical] = quantitiesOfElementsRequired[element.chemical]
                    ? quantitiesOfElementsRequired[element.chemical] + quantityRequired
                    : quantityRequired;
            } else {
                calculateQuantitiesRequired(
                    element.chemical,
                    quantityRequired,
                    chemicals,
                    quantitiesOfElementsRequired,
                );
            }
        });
    }
    return quantitiesOfElementsRequired;
}

export function calculateNumberOfReactions(quantityRequired: number, minimalQuantity: number) {
    const isMultiple = quantityRequired % minimalQuantity === 0;
    const integerPart = Math.floor(quantityRequired / minimalQuantity);
    return isMultiple ? integerPart : integerPart + 1;
}

export function calculateRequiredOreForOneFuel(chemicals: Chemicals) {
    return calculateRequiredOre(FUEL, 1, chemicals);
}

function isChemicalMadeOnlyOfOre(chemical: Chemical) {
    return !!chemical.input.find(e => e.chemical === ORE);
}
