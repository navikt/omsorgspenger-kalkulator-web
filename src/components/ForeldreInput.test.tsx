import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SkjemaContext from './SkjemaContext';
import { initialValues } from './KalkulatorInput';
import ForeldreInput from './ForeldreInput';

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

  await wait(() => {
    const toRader = hentForelderrader();
    expect(toRader).toHaveLength(2);
  });
});
