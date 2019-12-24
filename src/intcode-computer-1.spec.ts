import { expect } from 'chai';

import { intcodeComputer } from './intcode-computer-1';

describe('A - jump-if-true instruction', () => {
    it('A.1 - should jump to the next instruction with position mode', () => {
        const program = [5, 2, 5, 4, 99, 4];
        const _intcodeComputer = intcodeComputer(program);
        const resp = _intcodeComputer();
        expect(resp.exitCode).to.equal('END');
    });
    it('A.1.1 - should jump to the next instruction with position mode', () => {
        const program = [5, 2, 5, 4, 99, 4];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        const _intcodeComputer = intcodeComputer(program, outputFunction);
        const resp = _intcodeComputer();
        expect(resp.exitCode).to.equal('END');
        expect(output).to.be.undefined;
    });
});
