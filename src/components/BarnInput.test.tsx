import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SkjemaContext from './SkjemaContext';
import BarnInput from './BarnInput';
import { treBarnEttKroniskOgAleneomsorg } from './testdata';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';

test('Fjerner og legger til barn', async () => {
  const skjemaverdier: OmsorgsdagerForm = {
    barn: treBarnEttKroniskOgAleneomsorg,
    foreldre: [],
  };

  const { getAllByText, getByText } = render(
    <SkjemaContext initialValues={skjemaverdier}>
      <BarnInput />
    </SkjemaContext>,
  );

  const hentBarn = () => getAllByText('Hvor gammelt er barnet?');
  const treBarn = hentBarn();
  expect(treBarn).toHaveLength(3);

  const fjernknapp = getAllByText('Fjern')[0];
  fireEvent.click(fjernknapp);

  await waitFor(() => {
    const toBarn = hentBarn();
    expect(toBarn).toHaveLength(2);
  });

  const leggTilKnapp = getByText('Legg til flere barn');
  fireEvent.click(leggTilKnapp);

  await waitFor(() => {
    const barn = hentBarn();
    expect(barn).toHaveLength(3);
  });
});
