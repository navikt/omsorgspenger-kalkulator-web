import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Resultat, { summerDager } from './Resultat';
import SkjemaContext from './SkjemaContext';
import { barnUnder12, treBarnEttKroniskOgAleneomsorg } from './testdata';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import Omsorgsdager from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsdager';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';
import PeriodeEnum from '@navikt/kalkuler-omsorgsdager/lib/types/PeriodeEnum';

test('Summerer alle omsorgsprinsipper', () => {
  const omsorgsprinsipper: Omsorgsprinsipper = {
    grunnrett: {
      normaldager: 15,
      koronadager: 15,
    },
    kroniskSykt: {
      normaldager: 10,
      koronadager: 10,
    },
    aleneomsorg: {
      normaldager: 10,
      koronadager: 10,
    },
    aleneomsorgKroniskSyke: {
      normaldager: 20,
      koronadager: 20,
    },
  };

  const overføringsdager: Omsorgsdager = {
    koronadager: -12,
    normaldager: -4,
  };
  const sum = summerDager(...Object.values(omsorgsprinsipper), overføringsdager);

  expect(sum).toEqual(94);
});

test('Rendrer riktig resultat', () => {
  const initValues: OmsorgsdagerForm = {
    barn: treBarnEttKroniskOgAleneomsorg,
    foreldre: [],
    periode: PeriodeEnum.Koronaperiode,
  };

  const { asFragment } = render(
    <SkjemaContext initialValues={initValues}>
      <Resultat />
    </SkjemaContext>,
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Rendrer advarsel hvis man overfører fler dager enn man kan', () => {
  const initValues: OmsorgsdagerForm = {
    barn: [barnUnder12],
    foreldre: [
      {
        id: '1',
        normaldager: {
          dagerFått: 0,
          dagerTildelt: 11,
        },
        koronadager: {
          dagerTildelt: 11,
          dagerFått: 0,
        },
      },
    ],
    periode: PeriodeEnum.Koronaperiode,
  };

  const { asFragment } = render(
    <SkjemaContext initialValues={initValues}>
      <Resultat />
    </SkjemaContext>,
  );

  expect(asFragment()).toMatchSnapshot();
});

describe('Visning av Resultat med/uten koronafelter', () => {
  const rendered = (periode: PeriodeEnum): RenderResult => {
    const contextValues: OmsorgsdagerForm = {
      barn: [barnUnder12],
      foreldre: [
        {
          id: '1',
          normaldager: {
            dagerFått: 0,
            dagerTildelt: 11,
          },
          koronadager: {
            dagerTildelt: 11,
            dagerFått: 0,
          },
        },
      ],
      periode,
    };

    return render(
      <SkjemaContext initialValues={contextValues}>
        <Resultat />
      </SkjemaContext>,
    );
  };

  test('Periode innen korona viser koronafelter', () => {
    const { getByText } = rendered(PeriodeEnum.Koronaperiode);
    expect(getByText('Korona-tillegg')).toBeDefined();
  });

  test('Periode utenfor korona viser ikke koronafelter', () => {
    const { queryByText } = rendered(PeriodeEnum.UtenomKoronaperiode);
    expect(queryByText('Korona-tillegg')).toBeNull();
  });
});
