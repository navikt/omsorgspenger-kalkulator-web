interface StringMap {
  [nøkkel: string]: string;
}

const tekstMap: StringMap = {
  'KalkulatorHeader.Overskrift': 'Omsorgspengerkalkulator',
  'KalkulatorHeader.Nullstill': 'Nullstill',
  'BarnInput.Overskrift': 'Barn som bor hos søker',
  'BarnInput.Fjern': 'Fjern',
  'BarnInput.Alder': 'Hvor gammelt er barnet?',
  'BarnInput.KroniskSykt': 'Barnet er kronisk sykt',
  'BarnInput.Aleneomsorg': 'Søker har aleneomsorg for barnet',
  'BarnInput.LeggTilBarn': 'Legg til flere barn',
  'ForeldreInput.Overskrift': 'Foreldre - overførte dager',
  'ForeldreInput.NormalForskrift': 'Normal forskrift',
  'ForeldreInput.MidlertidigForskrift': 'Midlertidig forskrift',
  'ForeldreInput.DagerMottatt': 'Dager mottatt',
  'ForeldreInput.DagerFordelt': 'Dager fordelt',
  'ForeldreInput.DagerOverført': 'Dager overført',
  'ForeldreInput.Forelder': 'Forelder',
  'ForeldreInput.LeggTilForelder': 'Legg til flere foreldre',
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
