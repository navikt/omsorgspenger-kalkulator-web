import {
  ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
  ALENEOMSORGDAGER_1_2_BARN,
  ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
  GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
  omsorgsdager,
  overføringsdager as beregnOverføringsdager,
} from './kalkulerOmsorgsdager';
import Barn, { AlderEnum } from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Forelder from '../types/Forelder';

describe('omsorgsdager', () => {
  test('3 barn derav ett man har aleneomsorg for og er kronisk sykt', () => {
    const barn: Barn[] = [
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
        alder: AlderEnum.OVER12,
        søkerHarAleneomsorgFor: true,
        id: '1',
      },
    ];
    const aleneomsorg1 = omsorgsdager(ettBarnOver12)?.aleneomsorg;
    expect(aleneomsorg1?.normaldager).toEqual(0);
    expect(aleneomsorg1?.koronadager).toEqual(0);

    const ettKroniskSyktBarnOver12: Barn[] = [
      {
        alder: AlderEnum.OVER12,
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
        alder: AlderEnum.UNDER12,
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
        alder: AlderEnum.UNDER12,
        id: '1',
      },
      {
        søkerHarAleneomsorgFor: true,
        alder: AlderEnum.UNDER12,
        id: '2',
      },
      {
        søkerHarAleneomsorgFor: true,
        alder: AlderEnum.UNDER12,
        id: '3',
      },
    ];

    const { aleneomsorg }: Omsorgsprinsipper = omsorgsdager(barn);

    expect(aleneomsorg?.normaldager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
    expect(aleneomsorg?.koronadager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
  });

  test('Overførte koronadager legges rett til i totalen', () => {
    const overføringsdager = [
      {
        id: '1',
        koronadager: {
          dagerTildelt: 10,
          dagerFått: 20,
        },
      },
      {
        id: '2',
        koronadager: {
          dagerTildelt: 5,
          dagerFått: 7,
        },
      },
    ];

    const dager = beregnOverføringsdager(overføringsdager, 10);

    expect(dager.koronadager).toEqual(12);
  });

  test('Man får mellomlegget av tildelte dager og grunnretten, dersom tildelte dager er større enn grunnretten', () => {
    const barn: Barn[] = [
      {
        id: '1',
        alder: AlderEnum.UNDER12,
      },
    ];
    const mottattFlereDagerEnnGrunnrett: Forelder[] = [
      {
        id: '1',
        normaldager: {
          dagerFått: 6,
        },
      },
      {
        id: '2',
        normaldager: {
          dagerFått: 6,
        },
      },
    ];

    const { grunnrett } = omsorgsdager(barn);
    const overførteNormaldager_flere = beregnOverføringsdager(mottattFlereDagerEnnGrunnrett, grunnrett.normaldager);
    expect(overførteNormaldager_flere.normaldager).toEqual(2);

    const mottattFærreDagerEnnGrunnrett = [
      {
        id: '1',
        normaldager: {
          dagerFått: 8,
        },
      },
    ];

    const overførteNormaldager_færre = beregnOverføringsdager(mottattFærreDagerEnnGrunnrett, grunnrett.normaldager);
    expect(overførteNormaldager_færre.normaldager).toEqual(0);
  });

  test('Fordelte dager trekkes fra', () => {
    const ettBarnUnder12: Barn[] = [{ id: '3943339a-b27f-4e25-bcb3-a33581c71232', alder: AlderEnum.UNDER12 }];
    const fordeltMerEnnMottatt = [
      {
        id: '695d5c9b-dbb2-4c74-810a-7aff411d123d',
        normaldager: { dagerFått: 3, dagerTildelt: 8 },
        koronadager: { dagerFått: 2, dagerTildelt: 4 },
      },
    ];

    const { grunnrett } = omsorgsdager(ettBarnUnder12);
    const overføringsdager = beregnOverføringsdager(fordeltMerEnnMottatt, grunnrett.normaldager);
    expect(overføringsdager.normaldager).toEqual(-8);
    expect(overføringsdager.koronadager).toEqual(-2);
  });

  test('Ignorerer forelder som ikke bare har positive heltall som input', () => {
    const inputverdier: OmsorgsdagerForm = {
      barn: [{ id: '1', alder: AlderEnum.UNDER12 }],
      foreldre: [
        {
          id: '1',
          normaldager: { dagerFått: -1, dagerTildelt: 3 },
          koronadager: { dagerFått: 10, dagerTildelt: 0 },
        },
        {
          id: '2',
          normaldager: { dagerFått: 0, dagerTildelt: 0 },
          koronadager: { dagerFått: 5, dagerTildelt: 0 },
        },
      ],
    };

    const { grunnrett } = omsorgsdager(inputverdier.barn);
    const overføringsdager = beregnOverføringsdager(inputverdier.foreldre, grunnrett.normaldager);

    expect(overføringsdager.normaldager).toEqual(0);
    expect(overføringsdager.koronadager).toEqual(5);
  });

  test('Overføringsdager beregnes selv om ingen barn er gyldig utfylt', () => {
    const ingenBarnUtfylt: OmsorgsdagerForm = {
      barn: [{ id: '1' }],
      foreldre: [
        {
          id: '1',
          normaldager: {
            dagerTildelt: 0,
            dagerFått: 5,
          },
          koronadager: {
            dagerTildelt: 0,
            dagerFått: 10,
          },
        },
      ],
    };

    const { grunnrett } = omsorgsdager(ingenBarnUtfylt.barn);
    const overføringsdager = beregnOverføringsdager(ingenBarnUtfylt.foreldre, grunnrett.normaldager);

    expect(overføringsdager.normaldager).toEqual(5);
    expect(overføringsdager.koronadager).toEqual(10);
  });
});
