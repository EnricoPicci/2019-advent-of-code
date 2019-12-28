import { expect } from 'chai';
import {
    readInput,
    calculateNumberOfReactions,
    calculateRequiredOre,
    calculateRequiredOreForOneFuel,
    calculateQuantitiesRequired,
    calculateFuelProduced,
    isStockEmpty,
} from './day14-stoichiometry';
import { ListOfReactions } from './day14-stoichiometry.input-data';

describe('1 - readInput', () => {
    it('1.1 - should read the input and create the expected dictionary of chemicals', () => {
        const input = `9 ORE => 2 A
        8 ORE => 3 B
        7 ORE => 5 C
        3 A, 4 B => 1 AB
        5 B, 7 C => 1 BC
        4 C, 1 A => 1 CA
        2 AB, 3 BC, 4 CA => 1 FUEL`;
        const chemicals = readInput(input);
        expect(Object.values(chemicals).length).to.equal(7);
        const fuel = chemicals['FUEL'];
        expect(fuel.minimalQuantity).to.equal(1);
        expect(fuel.input.length).to.equal(3);
    });
});

describe('2 - calculateNumberOfReactions', () => {
    const input = `9 ORE => 2 A
    8 ORE => 3 B
    7 ORE => 5 C
    3 A, 4 B => 1 AB
    5 B, 7 C => 1 BC
    4 C, 1 A => 1 CA
    2 AB, 3 BC, 4 CA => 1 FUEL`;
    it('2.1 - we need 1 reaction to generate 5 of C, with C having minimal quantity of 5', () => {
        const chemicals = readInput(input);
        const c = chemicals['C'];
        const numberOfReactions = calculateNumberOfReactions(5, c.minimalQuantity);
        expect(numberOfReactions).to.equal(1);
    });
    it('2.2 - we need 2 reactions to generate 7 of C, with C having minimal quantity of 5', () => {
        const chemicals = readInput(input);
        const c = chemicals['C'];
        const numberOfReactions = calculateNumberOfReactions(7, c.minimalQuantity);
        expect(numberOfReactions).to.equal(2);
    });
    it('2.3 - we need 1 reaction to generate 3 of C, with C having minimal quantity of 5', () => {
        const chemicals = readInput(input);
        const c = chemicals['C'];
        const numberOfReactions = calculateNumberOfReactions(3, c.minimalQuantity);
        expect(numberOfReactions).to.equal(1);
    });
    it('2.4 - we need 2 reactions to generate 10 of C, with C having minimal quantity of 5', () => {
        const chemicals = readInput(input);
        const c = chemicals['C'];
        const numberOfReactions = calculateNumberOfReactions(10, c.minimalQuantity);
        expect(numberOfReactions).to.equal(2);
    });
});

describe('3 - calculateQuantitiesRequired', () => {
    const input = `9 ORE => 2 A
    8 ORE => 3 B
    7 ORE => 5 C
    3 A, 4 B => 1 AB
    5 B, 7 C => 1 BC
    4 C, 1 A => 1 CA
    2 AB, 3 BC, 4 CA => 1 FUEL`;
    it('3.1 - calculates the required chemicals which are not ORE for an element whose reaction contains only ORE', () => {
        const chemicals = readInput(input);
        let quantities = calculateQuantitiesRequired('B', 3, chemicals);
        expect(Object.values(quantities).length).to.equal(0);
        quantities = calculateQuantitiesRequired('B', 4, chemicals);
        expect(Object.values(quantities).length).to.equal(0);
        quantities = calculateQuantitiesRequired('B', 2, chemicals);
        expect(Object.values(quantities).length).to.equal(0);
    });
    it('3.2 - calculates the required chemicals which are not ORE for an element whose reaction contains elements which are not ORE', () => {
        const chemicals = readInput(input);
        let quantities = calculateQuantitiesRequired('AB', 1, chemicals);
        expect(Object.values(quantities).length).to.equal(2);
        expect(quantities['A']).to.equal(3);
        expect(quantities['B']).to.equal(4);
    });
    it(`3.3 - calculates the required chemicals which are not ORE to create a quantity of 2 of an element
     whose reaction contains elements which are not ORE`, () => {
        const chemicals = readInput(input);
        let quantities = calculateQuantitiesRequired('BC', 2, chemicals);
        expect(Object.values(quantities).length).to.equal(2);
        expect(quantities['B']).to.equal(10);
        expect(quantities['C']).to.equal(14);
    });
    it(`3.4 - calculates the required chemicals which are not ORE to create a quantity of 1 of FUEL`, () => {
        const chemicals = readInput(input);
        let quantities = calculateQuantitiesRequired('FUEL', 1, chemicals);
        expect(Object.values(quantities).length).to.equal(3);
        expect(quantities['A']).to.equal(10);
        expect(quantities['B']).to.equal(23);
        expect(quantities['C']).to.equal(37);
    });
});

describe('4 - calculateRequiredOre', () => {
    const input = `9 ORE => 2 A
    8 ORE => 3 B
    7 ORE => 5 C
    3 A, 4 B => 1 AB
    5 B, 7 C => 1 BC
    4 C, 1 A => 1 CA
    2 AB, 3 BC, 4 CA => 1 FUEL`;
    it('4.1.1 - calculates the required ORE for an element whose reaction contains only ORE', () => {
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOre('B', 3, chemicals);
        expect(requiredOre).to.equal(8);
    });
    it('4.1.2 - calculates the required ORE for an element whose reaction contains only ORE', () => {
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOre('B', 4, chemicals);
        expect(requiredOre).to.equal(16);
    });
    it('4.1.3 - calculates the required ORE for an element whose reaction contains only ORE', () => {
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOre('B', 2, chemicals);
        expect(requiredOre).to.equal(8);
    });
    it('4.2 - calculates the required ORE for an element whose reaction contains elements which are not ORE', () => {
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOre('AB', 1, chemicals);
        expect(requiredOre).to.equal(34);
    });
});

describe('5 - calculate the required quantity of ORE to produce 1 FUEL - calculateRequiredOreForOneFuel', () => {
    it('5.1 - example 1', () => {
        const input = `10 ORE => 10 A
        1 ORE => 1 B
        7 A, 1 B => 1 C
        7 A, 1 C => 1 D
        7 A, 1 D => 1 E
        7 A, 1 E => 1 FUEL`;
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(31);
    });
    it('5.2 - example 2', () => {
        const input = `9 ORE => 2 A
        8 ORE => 3 B
        7 ORE => 5 C
        3 A, 4 B => 1 AB
        5 B, 7 C => 1 BC
        4 C, 1 A => 1 CA
        2 AB, 3 BC, 4 CA => 1 FUEL`;
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(165);
    });
    it('5.3 - example 3', () => {
        const input = `157 ORE => 5 NZVS
        165 ORE => 6 DCFZ
        44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
        12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
        179 ORE => 7 PSHF
        177 ORE => 5 HKGWZ
        7 DCFZ, 7 PSHF => 2 XJWVT
        165 ORE => 2 GPVTF
        3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(13312);
    });
    it('5.4 - example 4', () => {
        const input = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
        17 NVRVD, 3 JNWZP => 8 VPVL
        53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
        22 VJHF, 37 MNCFX => 5 FWMGM
        139 ORE => 4 NVRVD
        144 ORE => 7 JNWZP
        5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
        5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
        145 ORE => 6 MNCFX
        1 NVRVD => 8 CXFTF
        1 VJHF, 6 MNCFX => 4 RFSQX
        176 ORE => 6 VJHF`;
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(180697);
    });
    it('5.5 - example 5', () => {
        const input = `171 ORE => 8 CNZTR
        7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
        114 ORE => 4 BHXH
        14 VRPVC => 6 BMBT
        6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
        6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
        15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
        13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
        5 BMBT => 4 WPTQ
        189 ORE => 9 KTJDG
        1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
        12 VRPVC, 27 CNZTR => 2 XDBXC
        15 KTJDG, 12 BHXH => 5 XCVML
        3 BHXH, 2 VRPVC => 7 MZWV
        121 ORE => 7 VRPVC
        7 XCVML => 6 RJRHP
        5 BHXH, 4 VRPVC => 5 LTCX`;
        const chemicals = readInput(input);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(2210736);
    });
});

describe('f - quizs', () => {
    it('f.1 - first quiz', () => {
        const chemicals = readInput(ListOfReactions);
        let requiredOre = calculateRequiredOreForOneFuel(chemicals);
        expect(requiredOre).to.equal(261960);
    });
});

describe('6 - calculateFuelProduced', () => {
    const input = `157 ORE => 5 NZVS
    165 ORE => 6 DCFZ
    44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
    12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
    179 ORE => 7 PSHF
    177 ORE => 5 HKGWZ
    7 DCFZ, 7 PSHF => 2 XJWVT
    165 ORE => 2 GPVTF
    3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
    it('6.1 - no fuel should be produced since the ORE is not enough to produce even 1 FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(1000, chemicals);
        expect(fuelProduced).to.equal(0);
    });
    it('6.2 - 1 FUEL should be produced since the ORE is just enough to produce 1 FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13312, chemicals);
        expect(fuelProduced).to.equal(1);
    });
    it('6.3 - 1 FUEL should be produced since the ORE is a bit more than enough to produce 1 FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13313, chemicals);
        expect(fuelProduced).to.equal(1);
    });
    it('6.4 - 2 FUELs should be produced since the ORE is enough to produce 2 FUELs', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13312 * 2, chemicals);
        expect(fuelProduced).to.equal(2);
    });
    it('6.4.1 - 16 FUELs should be produced since the ORE is enough to produce 16 FUELs', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13312 * 15, chemicals);
        expect(fuelProduced).to.equal(16);
    });
    it('6.4.2 - 21 FUELs should be produced since the ORE is enough to produce 21 FUELs', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13312 * 20, chemicals);
        expect(fuelProduced).to.equal(21);
    });
    it('6.4.3 - 22 FUELs should be produced since the ORE is enough to produce 22 FUELs', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(13312 * 21, chemicals);
        expect(fuelProduced).to.equal(22);
    });
    it('6.5 - 72 FUELs should be produced since the ORE is enough to produce that FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(897511, chemicals);
        expect(fuelProduced).to.equal(72);
        expect(isStockEmpty(chemicals)).to.be.true;
    });
    it('6.6 - 72 FUELs should be produced since the ORE is enough to produce that FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(897511 + 10, chemicals);
        expect(fuelProduced).to.equal(72);
        expect(isStockEmpty(chemicals)).to.be.true;
    });
    it('6.7 - 2 times 72 FUELs should be produced since the ORE is enough to produce that FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(897511 * 2, chemicals);
        expect(fuelProduced).to.equal(72 * 2);
        expect(isStockEmpty(chemicals)).to.be.true;
    });
    it('6.8 - 2 times 72 FUELs should be produced since the ORE is enough to produce that FUEL', () => {
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(897511 * 2 + 100, chemicals);
        expect(fuelProduced).to.equal(72 * 2);
        expect(isStockEmpty(chemicals)).to.be.true;
    });
});

describe('7 - isStockEmpty', () => {
    const input = `157 ORE => 5 NZVS
    165 ORE => 6 DCFZ
    44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
    12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
    179 ORE => 7 PSHF
    177 ORE => 5 HKGWZ
    7 DCFZ, 7 PSHF => 2 XJWVT
    165 ORE => 2 GPVTF
    3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
    it('7.1 - at start the stock is empty', () => {
        const chemicals = readInput(input);
        expect(isStockEmpty(chemicals)).to.be.true;
    });
    it('7.2 - after 72 cycles the stock is empty again', () => {
        const chemicals = readInput(input);
        for (let i = 0; i < 72; i++) {
            calculateRequiredOreForOneFuel(chemicals);
        }
        expect(isStockEmpty(chemicals)).to.be.true;
    });
    it('7.3 - after 73 cycles the stock is not empty any more', () => {
        const chemicals = readInput(input);
        for (let i = 0; i < 73; i++) {
            calculateRequiredOreForOneFuel(chemicals);
        }
        expect(isStockEmpty(chemicals)).to.be.false;
    });
    it('7.4 - after 73 cycles the stock is in the same state as after 1 cycle', () => {
        const chemicals1 = readInput(input);
        calculateRequiredOreForOneFuel(chemicals1);
        const chemicals73 = readInput(input);
        for (let i = 0; i < 73; i++) {
            calculateRequiredOreForOneFuel(chemicals73);
        }
        Object.keys(chemicals73).forEach(k => expect(chemicals1[k].inStock).to.equal(chemicals73[k].inStock));
    });
    it('7.5 - after 72 cycles some ORE has been consumed', () => {
        const chemicals = readInput(input);
        let ore = 0;
        for (let i = 0; i < 72; i++) {
            ore = ore + calculateRequiredOreForOneFuel(chemicals);
        }
        expect(ore).to.equal(897511);
        expect(Math.floor(1000000000000 / ore) * 72).to.equal(80221824);
        expect(1000000000000 - Math.floor(1000000000000 / ore) * ore).to.equal(423888);
    });
});

describe('8 - calculate the fuel produced by 1 trillion ORE - calculateFuelProduced', () => {
    // it('8.1 - example 1 part 2', () => {
    //     const input = `157 ORE => 5 NZVS
    //     165 ORE => 6 DCFZ
    //     44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
    //     12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
    //     179 ORE => 7 PSHF
    //     177 ORE => 5 HKGWZ
    //     7 DCFZ, 7 PSHF => 2 XJWVT
    //     165 ORE => 2 GPVTF
    //     3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
    //     const chemicals = readInput(input);
    //     let fuelProduced = calculateFuelProduced(1000000000000, chemicals);
    //     expect(fuelProduced).to.equal(82892753);
    // });
    // it('8.2 - example 2 part 2', () => {
    //     const input = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
    //     17 NVRVD, 3 JNWZP => 8 VPVL
    //     53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
    //     22 VJHF, 37 MNCFX => 5 FWMGM
    //     139 ORE => 4 NVRVD
    //     144 ORE => 7 JNWZP
    //     5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
    //     5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
    //     145 ORE => 6 MNCFX
    //     1 NVRVD => 8 CXFTF
    //     1 VJHF, 6 MNCFX => 4 RFSQX
    //     176 ORE => 6 VJHF`;
    //     const chemicals = readInput(input);
    //     let fuelProduced = calculateFuelProduced(1000000000000, chemicals);
    //     expect(fuelProduced).to.equal(5586022);
    // });
    it('8.3 - example 3 part 2', () => {
        const input = `171 ORE => 8 CNZTR
        7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
        114 ORE => 4 BHXH
        14 VRPVC => 6 BMBT
        6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
        6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
        15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
        13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
        5 BMBT => 4 WPTQ
        189 ORE => 9 KTJDG
        1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
        12 VRPVC, 27 CNZTR => 2 XDBXC
        15 KTJDG, 12 BHXH => 5 XCVML
        3 BHXH, 2 VRPVC => 7 MZWV
        121 ORE => 7 VRPVC
        7 XCVML => 6 RJRHP
        5 BHXH, 4 VRPVC => 5 LTCX`;
        const chemicals = readInput(input);
        let fuelProduced = calculateFuelProduced(1000000000000, chemicals);
        expect(fuelProduced).to.equal(460664);
    });
});

describe('g - quizs', () => {
    it.only('g.1 - second quiz', () => {
        const chemicals = readInput(ListOfReactions);
        const fuelProduced = calculateFuelProduced(1000000000000, chemicals);
        expect(fuelProduced).to.equal(0);
        // expect(fuelProduced).to.equal(4364361);
    });
});
