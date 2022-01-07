import React from 'react';
import { render, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import SkjemaContext from './SkjemaContext';
import { initialValues } from './KalkulatorInput';
import ForeldreInput from './ForeldreInput';
import { barnUnder12 } from './testdata';
import PeriodeEnum from '@navikt/kalkuler-omsorgsdager/lib/types/PeriodeEnum';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';

describe('Visning av Forelder med/uten koronafelter', () => {
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
        <ForeldreInput />
      </SkjemaContext>,
    );
  };

  test('Legger til forelder', async () => {
    const { getAllByText, getByText } = render(
      <SkjemaContext initialValues={initialValues}>
        <ForeldreInput />
      </SkjemaContext>,
    );

    const hentForelderrader = () => getAllByText(/Forelder #/);

    const forelderrader = hentForelderrader();
    expect(forelderrader).toHaveLength(1);

    const leggTilKnapp = getByText(/Legg til/);
    fireEvent.click(leggTilKnapp);

    await waitFor(() => {
      const toRader = hentForelderrader();
      expect(toRader).toHaveLength(2);
    });
  });


  test('Periode innen korona viser koronafelter', () => {
    const { getByText } = rendered(PeriodeEnum.Koronaperiode);
    expect(getByText('Midlertidig forskrift (korona)')).toBeDefined();
  });

  test('Periode utenfor korona viser ikke koronafelter', () => {
    const { queryByText } = rendered(PeriodeEnum.UtenomKoronaperiode);
    expect(queryByText('Midlertidig forskrift (korona)')).toBeNull();
  });
});
