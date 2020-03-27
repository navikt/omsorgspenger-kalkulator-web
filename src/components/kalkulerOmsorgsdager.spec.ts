import {
  ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
  ALENEOMSORGDAGER,
  GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
  omsorgsdager,
} from './kalkulerOmsorgsdager';
import Barn from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';

describe('omsorgsdager', () => {
  test('3 barn derav ett man har aleneomsorg for og er kronisk sykt', () => {
    const barn: Barn[] = [
      {
        søkerHarAleneomsorgFor: true,
        kroniskSykt: true,
        alder: 'under12',
      },
      {
        alder: 'under12',
      },
      {
        alder: 'under12',
      },
    ];

    // @ts-ignore
    const { aleneomsorgKroniskSyke, kroniskSykt, grunnrett, aleneomsorg }: Omsorgsprinsipper = omsorgsdager(barn);

    expect(grunnrett.normaldager).toEqual(GRUNNRETTSDAGER_3_ELLER_FLER_BARN);
    expect(grunnrett.koronadager).toEqual(GRUNNRETTSDAGER_3_ELLER_FLER_BARN);

    expect(aleneomsorgKroniskSyke.normaldager).toEqual(ALENEOMSORG_KRONISK_SYKT_BARN_DAGER);
    expect(aleneomsorgKroniskSyke.koronadager).toEqual(ALENEOMSORG_KRONISK_SYKT_BARN_DAGER);

    expect(kroniskSykt.normaldager).toEqual(0);
    expect(kroniskSykt.koronadager).toEqual(0);

    expect(aleneomsorg.normaldager).toEqual(ALENEOMSORGDAGER);
    expect(aleneomsorg.koronadager).toEqual(ALENEOMSORGDAGER);
  });
});
