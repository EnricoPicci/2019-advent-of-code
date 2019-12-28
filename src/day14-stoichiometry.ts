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
    return Math.ceil(quantityRequired / minimalQuantity);
}

export function calculateRequiredOreForOneFuel(chemicals: Chemicals) {
    return calculateRequiredOre(FUEL, 1, chemicals);
}

function isChemicalMadeOnlyOfOre(chemical: Chemical) {
    return !!chemical.input.find(e => e.chemical === ORE);
}

export function calculateFuelProduced(quantityOfOre: number, chemicals: Chemicals) {
    const oreRequiredToProduceFirstFuel = calculateRequiredOreForOneFuel(chemicals);
    if (oreRequiredToProduceFirstFuel > quantityOfOre) {
        return 0;
    }
    let oreRequiredToEmptyStock = oreRequiredToProduceFirstFuel;
    let fuelProducedInOneCycleToEmptyStock = 1;
    let counter = 0;
    while (!isStockEmpty(chemicals)) {
        counter++;
        if (counter % 1000000 === 0) {
            console.log(counter);
        }
        oreRequiredToEmptyStock = oreRequiredToEmptyStock + calculateRequiredOreForOneFuel(chemicals);
        if (oreRequiredToEmptyStock > quantityOfOre) {
            return fuelProducedInOneCycleToEmptyStock;
        }
        fuelProducedInOneCycleToEmptyStock++;
    }
    const numberOfCycles = Math.floor(quantityOfOre / oreRequiredToEmptyStock);
    let lastFuelProduced = 0;
    let oreLeft = quantityOfOre - oreRequiredToEmptyStock * numberOfCycles;
    console.log('Ore left', oreLeft);
    console.log('Number of cycles', numberOfCycles);
    console.log('Fuel produced in one cycle', fuelProducedInOneCycleToEmptyStock);
    if (oreLeft < oreRequiredToProduceFirstFuel) {
        return fuelProducedInOneCycleToEmptyStock * numberOfCycles;
    }
    while (oreLeft > 0) {
        lastFuelProduced++;
        oreLeft = oreLeft - calculateRequiredOreForOneFuel(chemicals);
    }
    return fuelProducedInOneCycleToEmptyStock * numberOfCycles + lastFuelProduced;
}

export function isStockEmpty(chemicals: Chemicals) {
    return (
        Object.values(chemicals)
            .map(c => c.inStock)
            .reduce((acc, val) => acc + val, 0) === 0
    );
}
