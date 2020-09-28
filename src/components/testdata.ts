import Barn, { AlderType } from '@navikt/kalkuler-omsorgsdager/lib/types/Barn';

export const barnUnder12: Barn = {
  alder: AlderType.UNDER12,
  id: '1',
};

export const treBarnEttKroniskOgAleneomsorg: Barn[] = [
  {
    søkerHarAleneomsorgFor: true,
    kroniskSykt: true,
    alder: AlderType.UNDER12,
    id: '1',
  },
  {
    alder: AlderType.UNDER12,
    id: '2',
  },
  {
    alder: AlderType.UNDER12,
    id: '3',
  },
];
