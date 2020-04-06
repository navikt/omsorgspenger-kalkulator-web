import Barn, { AlderEnum } from '../types/Barn';

export const barnUnder12: Barn = {
  alder: AlderEnum.UNDER12,
  id: '1',
};

export const treBarnEttKroniskOgAleneomsorg: Barn[] = [
  {
    søkerHarAleneomsorgFor: true,
    kroniskSykt: true,
    alder: AlderEnum.UNDER12,
    id: '1',
  },
  {
    alder: AlderEnum.UNDER12,
    id: '2',
  },
  {
    alder: AlderEnum.UNDER12,
    id: '3',
  },
];
