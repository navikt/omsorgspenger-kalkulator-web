import React from 'react';
import { render } from '@testing-library/react';
import OverføringAdvarsel from './OverføringAdvarsel';
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

test('Overført flere dager enn totalt tilgjengelig gir advarsel', () => {
  const overføringsdager: Overføringsdager = {
    fordelteNormaldager: 31,
    mottatteNormaldager: 0,
    overførteKoronadager: 10,
    mottatteKoronadager: 0,
  };

  const { getByText } = render(
    <OverføringAdvarsel omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
  );
  const advarsel = getByText(/Brukeren har overført\/fordelt/);

  expect(advarsel).toBeDefined();
});

test('Ingen advarsel hvis overørt færre dager eller likt enn totalt tilgjengelig', () => {
  const overføringsdager: Overføringsdager = {
    fordelteNormaldager: 30,
    mottatteNormaldager: 0,
    overførteKoronadager: 10,
    mottatteKoronadager: 0,
  };

  const { queryByText } = render(
    <OverføringAdvarsel omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
  );
  const advarsel = queryByText(/Brukeren har overført\/fordelt/);

  expect(advarsel).toBeNull();
});
