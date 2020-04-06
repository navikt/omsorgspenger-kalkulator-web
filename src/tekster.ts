interface StringMap {
  [nøkkel: string]: string;
}

const tekstMap: StringMap = {
  'KalkulatorHeader.Overskrift': 'Omsorgsdagerkalkulator',
  'KalkulatorHeader.Nullstill': 'Nullstill',
  'BarnInput.Overskrift': 'Barn som bor hos søker',
  'BarnInput.Fjern': 'Fjern',
  'BarnInput.Alder': 'Hvor gammelt er barnet?',
  'BarnInput.KroniskSykt': 'Barnet er kronisk sykt',
  'BarnInput.Aleneomsorg': 'Søker har aleneomsorg for barnet',
  'BarnInput.Aleneomsorg.Hjelpetekst':
    '(inkl. de som har vedtak om å bli regnet som alene om omsorgen og de som skal anses å være alene med særkullsbarn)',
  'BarnInput.LeggTilBarn': 'Legg til flere barn',
  'ForeldreInput.Overskrift': 'Foreldre - overførte og fordelte dager',
  'ForeldreInput.NormalForskrift': 'Opprinnelige regler',
  'ForeldreInput.MidlertidigForskrift': 'Midlertidig forskrift (korona)',
  'ForeldreInput.DagerMottatt': 'Dager mottatt',
  'ForeldreInput.DagerFordelt': 'Dager fordelt/overført',
  'ForeldreInput.DagerOverført': 'Dager overført',
  'ForeldreInput.Forelder': 'Forelder',
  'ForeldreInput.LeggTilForelder': 'Legg til flere foreldre',
  'ForeldreInput.Feil.Minustall': 'Kan ikke være minustall',
  'ForeldreInput.Feil.Desimaltall': 'Kan ikke være desimaltall',
  'SøkerInput.HarRettPå': 'Søkeren har rett på',
  'SøkerInput.DagerOmsorgspenger': 'dager med omsorgspenger',
  'SøkerInput.Dager': 'Dager',
  'SøkerInput.KoronaTillegg': 'Korona-tillegg',
  'SøkerInput.Grunnrett': 'Grunnrett',
  'SøkerInput.KroniskSykdom': 'Barn med kronisk sykdom',
  'SøkerInput.AleneKroniskSykdom': 'Aleneomsorg for barn med kronisk sykdom',
  'SøkerInput.AleneOmOmsorg': 'Alene om omsorgen',
  'SøkerInput.OverførtMottatt': 'Overført/Mottatt',
};

const tekster = (tekstnøkkel: string): string => tekstMap[tekstnøkkel];

export default tekster;
