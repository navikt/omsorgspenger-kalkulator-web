import tekster from '../tekster';

test('Erstatter value key med oppgitt verdi', () => {
  const tekst = tekster('Resultat.AdvarselNormal', {
    overførteDager: '20',
    tilgjengeligeDager: '10',
  });

  expect(tekst).toEqual(
    'Du har overført/fordelt 20 normaldager, men har kun 10 tilgjengelig. Vennligst sjekk antallet',
  );
});
