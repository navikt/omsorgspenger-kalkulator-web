import React from 'react';
import { render } from '@testing-library/react';
import OverføringAdvarselGamleRegler from './OverføringAdvarsel__GamleRegler';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import Overføringsdager from '@navikt/kalkuler-omsorgsdager/lib/types/Overføringsdager';

const grunnrettOgAleneomsorg: Omsorgsprinsipper = {
  grunnrett: {
    normaldager: 10,
    koronadager: 10,
  },
  aleneomsorg: {
    normaldager: 10,
    koronadager: 10,
  },
  kroniskSykt: {
    koronadager: 0,
    normaldager: 0,
  },
  aleneomsorgKroniskSyke: {
    koronadager: 0,
    normaldager: 0,
  },
};

test('Overført flere normaldager enn tilgjengelig gir advarsel', () => {
  const overføringsdager: Overføringsdager = {
    fordelteNormaldager: 11,
    mottatteNormaldager: 0,
    overførteKoronadager: 0,
    mottatteKoronadager: 0,
  };

  const { getByText } = render(
    <OverføringAdvarselGamleRegler omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
  );
  const advarsel = getByText(/Brukeren har overført\/fordelt/);

  expect(advarsel).toBeDefined();
});

test('Overført flere koronadager enn tilgjengelig gir advarsel', () => {
  const overføringsdager: Overføringsdager = {
    fordelteNormaldager: 0,
    mottatteNormaldager: 0,
    overførteKoronadager: 21,
    mottatteKoronadager: 0,
  };
  const { getByText } = render(
    <OverføringAdvarselGamleRegler omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
  );

  const advarsel = getByText(/Brukeren har overført 21 koronadager/);

  expect(advarsel).toBeDefined();
});
