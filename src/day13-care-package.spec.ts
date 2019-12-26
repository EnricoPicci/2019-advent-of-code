import { expect } from 'chai';

import { Screen, countBlockTilesOnScreen, playArcadeGame } from './day13-care-package';
import { printArea } from './utils';
import { IntcodeProgramForArcadeGame, IntcodeProgramForArcadeGame_2_quarters } from './day13-care-package.input-data';

describe('1 - countBlockTilesOnScreen', () => {
    it('1.1 - should read the input and create the expected coordinates', () => {
        const screen: Screen = {
            0: {
                1: 1,
                2: 2,
            },
            1: {
                1: 1,
            },
        };
        const tileCount = countBlockTilesOnScreen(screen);
        expect(tileCount).to.equal(1);
    });
});

describe('2 - print screen', () => {
    it('2.1 - prints the screen of the arcade game', () => {
        const res = playArcadeGame(IntcodeProgramForArcadeGame);
        const determineCharToPrint = id => {
            return id === 0 ? ' ' : id === 1 ? 'X' : id === 2 ? '=' : id === 3 ? '_' : id === 4 ? 'o' : 'A';
        };
        printArea(res.screen, determineCharToPrint);
    });
});

describe('f - quizs', () => {
    it('f.1 - first quiz for day 13', () => {
        const tileCount = countBlockTilesOnScreen(playArcadeGame(IntcodeProgramForArcadeGame).screen);
        expect(tileCount).to.equal(205);
    });
    it('f.2 - second quiz for day 13', () => {
        const res = playArcadeGame(IntcodeProgramForArcadeGame_2_quarters, [0]);
        expect(res.score).to.equal(10292);
    });
});
