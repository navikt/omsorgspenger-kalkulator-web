import {grunnrettsdager} from './kalkulerOmsorgsdager';
import Barn from '../types/Barn';

describe('grunnrettsdager', () => {
    test('barn uten verdier gir null', () => {
        expect(grunnrettsdager([])).toBeNull();
        expect(grunnrettsdager([{}, {}])).toBeNull();
    });

    test('1 eller 2 barn under 12 gir 10*2 dager', () => {
        const barn: Barn = {
            alder: 'under12',

        }
    });
});
