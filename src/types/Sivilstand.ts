import stringEnum from '../utils';

export const SivilstandEnum = stringEnum({
    GIFT: 'GIFT',
    SAMBOER: 'SAMBOER',
    ALENE: 'ALENE'
});

type SivilstandType = typeof SivilstandEnum[keyof typeof SivilstandEnum];

export default SivilstandType;
