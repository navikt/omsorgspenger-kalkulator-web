import tekster from './tekster';

test('Erstatter value key med oppgitt verdi', () => {
  const tekst = tekster('Resultat.AdvarselNormal', {
    overførteDager: '20',
    tilgjengeligeDager: '10',
  });

  expect(tekst).toEqual(
    'Brukeren har overført/fordelt 20 normaldager, men har kun 10 dager som kan fordeles/overføres. Vennligst sjekk antallet',
  );
});

test('Returnerer tekstnøkkel hvis det ikke finnes tekst for nøkkelen', () => {
  const tekstnøkkel = 'sanhdkbhibnhdcibhs,sh';

  expect(tekster(tekstnøkkel)).toEqual(tekstnøkkel);
});
