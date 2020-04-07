import React from 'react';
import { render } from '@testing-library/react';
import OverføringAdvarsel from './OverføringAdvarsel';
import Overføringsdager from '../types/Overføringsdager';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';

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
    <OverføringAdvarsel omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
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
    <OverføringAdvarsel omsorgsprinsipper={grunnrettOgAleneomsorg} overføringsdager={overføringsdager} />,
  );

  const advarsel = getByText(/Brukeren har overført 21 koronadager/);

  expect(advarsel).toBeDefined();
});
