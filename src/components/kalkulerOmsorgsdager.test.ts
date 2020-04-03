import {
  ALENEOMSORG_KRONISK_SYKT_BARN_DAGER,
  ALENEOMSORGDAGER_1_2_BARN,
  ALENEOMSORGDAGER_3_ELLER_FLERE_BARN,
  GRUNNRETTSDAGER_3_ELLER_FLER_BARN,
  omsorgsdager,
} from './kalkulerOmsorgsdager';
import Barn, { AlderEnum } from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

const omsorgsdagerForm = (barn: Barn[]): OmsorgsdagerForm => ({
  barn,
  foreldre: [],
});

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

    // @ts-ignore
    const { aleneomsorgKroniskSyke, kroniskSykt, grunnrett, aleneomsorg }: Omsorgsprinsipper = omsorgsdager(
      omsorgsdagerForm(barn),
    );

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
    const aleneomsorg1 = omsorgsdager(omsorgsdagerForm(ettBarnOver12))?.aleneomsorg;
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
    const aleneomsorg2 = omsorgsdager(omsorgsdagerForm(ettKroniskSyktBarnOver12))?.aleneomsorg;
    expect(aleneomsorg2?.normaldager).toEqual(ALENEOMSORGDAGER_1_2_BARN);
    expect(aleneomsorg2?.koronadager).toEqual(ALENEOMSORGDAGER_1_2_BARN);

    const ettBarnUnder12: Barn[] = [
      {
        alder: AlderEnum.UNDER12,
        søkerHarAleneomsorgFor: true,
        id: '3',
      },
    ];
    const aleneomsorg3 = omsorgsdager(omsorgsdagerForm(ettBarnUnder12))?.aleneomsorg;
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

    // @ts-ignore
    const { aleneomsorg }: Omsorgsprinsipper = omsorgsdager(omsorgsdagerForm(barn));

    expect(aleneomsorg?.normaldager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
    expect(aleneomsorg?.koronadager).toEqual(ALENEOMSORGDAGER_3_ELLER_FLERE_BARN);
  });

  test('Overførte koronadager legges rett til i totalen', () => {
    const input: OmsorgsdagerForm = {
      barn: [
        {
          id: '1',
          alder: AlderEnum.UNDER12,
        },
      ],
      foreldre: [
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
      ],
    };

    // @ts-ignore
    const { overføringsdager } = omsorgsdager(input);

    expect(overføringsdager?.koronadager).toEqual(12);
  });

  test('Man får mellomlegget av tildelte dager og grunnretten, dersom tildelte dager er større enn grunnretten', () => {
    const barn: Barn[] = [
      {
        id: '1',
        alder: AlderEnum.UNDER12,
      },
    ];
    const fårFlereDagerEnnGrunnrett: OmsorgsdagerForm = {
      barn,
      foreldre: [
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
      ],
    };
    // @ts-ignore
    const overførteNormaldager_flere = omsorgsdager(fårFlereDagerEnnGrunnrett)?.overføringsdager.normaldager;
    expect(overførteNormaldager_flere).toEqual(2);

    const fårFærreDagerEnnGrunnrett: OmsorgsdagerForm = {
      barn,
      foreldre: [
        {
          id: '1',
          normaldager: {
            dagerFått: 8,
          },
        },
      ],
    };
    // @ts-ignore
    const overførteNormaldager_færre = omsorgsdager(fårFærreDagerEnnGrunnrett)?.overføringsdager.normaldager;
    expect(overførteNormaldager_færre).toEqual(0);
  });

  test('Fordelte dager trekkes fra', () => {
    const fordelteNormaldagerTrekkesFra: OmsorgsdagerForm = {
      barn: [{ id: '3943339a-b27f-4e25-bcb3-a33581c71232', alder: AlderEnum.UNDER12 }],
      foreldre: [
        {
          id: '695d5c9b-dbb2-4c74-810a-7aff411d123d',
          normaldager: { dagerFått: 3, dagerTildelt: 8 },
          koronadager: { dagerFått: 2, dagerTildelt: 4 },
        },
      ],
    };

    const overføringsdager = omsorgsdager(fordelteNormaldagerTrekkesFra)?.overføringsdager;
    expect(overføringsdager?.normaldager).toEqual(-8);
    expect(overføringsdager?.koronadager).toEqual(-2);
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

    const overføringsdager = omsorgsdager(inputverdier)?.overføringsdager;

    expect(overføringsdager?.normaldager).toEqual(0);
    expect(overføringsdager?.koronadager).toEqual(5);
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

    const overføringsdager = omsorgsdager(ingenBarnUtfylt)?.overføringsdager;

    expect(overføringsdager?.normaldager).toEqual(5);
    expect(overføringsdager?.koronadager).toEqual(10);
  });
});
