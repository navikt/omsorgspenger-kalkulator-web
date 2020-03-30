import {
  ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
  ALENEOMSORGDAGER_1_2_BARN,
  ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
  GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
  omsorgsdager,
} from './kalkulerOmsorgsdager';
import Barn from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import Omsorgsdager from '../types/Omsorgsdager';

describe('omsorgsdager', () => {
  test('3 barn derav ett man har aleneomsorg for og er kronisk sykt', () => {
    const barn: Barn[] = [
      {
        søkerHarAleneomsorgFor: true,
        kroniskSykt: true,
        alder: 'under12',
        id: '1',
      },
      {
        alder: 'under12',
        id: '2',
      },
      {
        alder: 'under12',
        id: '3',
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

    expect(aleneomsorg.normaldager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
    expect(aleneomsorg.koronadager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
  });

  test('Man får ekstra dager hvis man har aleneomsorg for minst ett barn under 12, eller minst ett kronisk sykt barn', () => {
    const ettBarnOver12: Barn[] = [
      {
        alder: 'over12',
        søkerHarAleneomsorgFor: true,
        id: '1',
      },
    ];
    const aleneomsorg1 = omsorgsdager(ettBarnOver12)?.aleneomsorg;
    expect(aleneomsorg1?.normaldager).toEqual(0);
    expect(aleneomsorg1?.koronadager).toEqual(0);

    const ettKroniskSyktBarnOver12: Barn[] = [
      {
        alder: 'over12',
        kroniskSykt: true,
        søkerHarAleneomsorgFor: true,
        id: '2',
      },
    ];
    const aleneomsorg2 = omsorgsdager(ettKroniskSyktBarnOver12)?.aleneomsorg;
    expect(aleneomsorg2?.normaldager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
    expect(aleneomsorg2?.koronadager).toEqual(ALENEOMSORGDAGER_1_2_BARN);

    const ettBarnUnder12: Barn[] = [
      {
        alder: 'under12',
        søkerHarAleneomsorgFor: true,
        id: '3',
      },
    ];
    const aleneomsorg3 = omsorgsdager(ettBarnUnder12)?.aleneomsorg;
    expect(aleneomsorg3?.normaldager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
    expect(aleneomsorg3?.koronadager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
  });

  test('Man får ekstra aleneomsorgsdager hvis man har 3 barn eller mer', () => {
    const barn: Barn[] = [
      {
        søkerHarAleneomsorgFor: true,
        alder: 'under12',
        id: '1',
      },
      {
        søkerHarAleneomsorgFor: true,
        alder: 'under12',
        id: '2',
      },
      {
        søkerHarAleneomsorgFor: true,
        alder: 'under12',
        id: '3',
      },
    ];

    // @ts-ignore
    const { aleneomsorg }: Omsorgsprinsipper = omsorgsdager(barn);

    expect(aleneomsorg?.normaldager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
    expect(aleneomsorg?.koronadager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
  });
});
