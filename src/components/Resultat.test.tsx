import React from 'react';
import { render } from '@testing-library/react';
import Resultat, { summerDager } from './Resultat';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import SkjemaContext from './SkjemaContext';

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
    overføringsdager: {
      koronadager: -12,
      normaldager: -4,
    },
  };

  const sum = summerDager(omsorgsprinsipper);

  expect(sum).toEqual(94);
});

test('Rendrer riktig resultat', () => {
  const initValues: OmsorgsdagerForm = {
    barn: [
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
    ],
    foreldre: [],
  };
  const { asFragment } = render(
    <SkjemaContext initialValues={initValues}>
      <Resultat />
    </SkjemaContext>,
  );

  expect(asFragment()).toMatchSnapshot();
});
