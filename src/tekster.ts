type Map = {
  [nøkkel in string | number]: string;
};

const tekstMap: Map = {
  'KalkulatorHeader.Overskrift': 'Omsorgsdagerkalkulator',
  'KalkulatorHeader.Nullstill': 'Nullstill',
  'BarnInput.Overskrift': 'Barn som bor hos bruker',
  'BarnInput.Hjelpetekst':
    'I denne delen fører du opp aktuell informasjon om barna som bor fast hos brukeren, dvs de barna brukeren har omsorgen for. Legg inn opplysninger per barn.',
  'BarnInput.Fjern': 'Fjern',
  'BarnInput.Alder': 'Hvor gammelt er barnet?',
  'BarnInput.KroniskSykt': 'Barnet er kronisk sykt',
  'BarnInput.Aleneomsorg': 'Bruker har aleneomsorg for barnet',
  'BarnInput.Aleneomsorg.Hjelpetekst1': 'Med aleneomsorg menes:',
  'BarnInput.Aleneomsorg.Hjelpetekst2': 'Bruker som bor alene med barn',
  'BarnInput.Aleneomsorg.Hjelpetekst3':
    'Bruker som har omsorgen for særkullsbarn, selv om han/hun har nytt barn med ny samboer eller ektefelle',
  'BarnInput.Aleneomsorg.Hjelpetekst4': 'Bruker som har vedtak fra NAV om å bli ansett som alene om omsorgen',
  'BarnInput.LeggTilBarn': 'Legg til flere barn',
  'ForeldreInput.Overskrift': 'Foreldre - overførte og fordelte dager',
  'ForeldreInput.Hjelpetekst1':
    'Denne delen benyttes kun hvis det finnes vedtak om fordeling eller overføring av dager. Antall dager finner du i tidligere vedtak.',
  'ForeldreInput.Hjelpetekst2':
    'I det grå feltet fører du opp dager som er fordelt eller overført etter ordinære regler. Har bruker mottatt dager, er det feltet Dager mottatt som skal benyttes. Har bruker gitt fra seg dager, skal disse føres i feltet Dager fordelt/overført.',
  'ForeldreInput.Hjelpetekst3': 'Det oransje feltet gjelder korona-dager.',
  'ForeldreInput.NormalForskrift': 'Opprinnelige regler',
  'ForeldreInput.MidlertidigForskrift': 'Midlertidig forskrift (korona)',
  'ForeldreInput.DagerMottatt': 'Dager mottatt',
  'ForeldreInput.DagerFordelt': 'Dager fordelt/overført',
  'ForeldreInput.DagerOverført': 'Dager overført',
  'ForeldreInput.Forelder': 'Forelder',
  'ForeldreInput.LeggTilForelder': 'Legg til flere foreldre',
  'ForeldreInput.Feil.Minustall': 'Kan ikke være minustall',
  'ForeldreInput.Feil.Desimaltall': 'Kan ikke være desimaltall',
  'Resultat.HarRettPå': 'Brukeren har rett på',
  'Resultat.DagerOmsorgspenger': 'dager med omsorgspenger',
  'Resultat.Dager': 'Dager',
  'Resultat.KoronaTillegg': 'Korona-tillegg',
  'Resultat.Grunnrett': 'Grunnrett',
  'Resultat.KroniskSykdom': 'Barn med kronisk sykdom',
  'Resultat.AleneKroniskSykdom': 'Aleneomsorg for barn med kronisk sykdom',
  'Resultat.AleneOmOmsorg': 'Alene om omsorgen',
  'Resultat.OverførtMottatt': 'Overført/Mottatt',
  'Resultat.AdvarselKorona':
    'Brukeren har overført $overførteDager koronadager, men har kun $tilgjengeligeDager koronadager som kan overføres. Vennligst sjekk antallet',
  'Resultat.AdvarselNormal':
    'Brukeren har overført/fordelt $overførteDager normaldager, men har kun $tilgjengeligeDager dager som kan fordeles/overføres. Vennligst sjekk antallet',
};

const tekster = (tekstnøkkel: string, values?: Map): string => {
  if (values) {
    return Object.entries(values).reduce((str, [key, value]) => str.replace(`$${key}`, value), tekstMap[tekstnøkkel]);
  }

  return tekstMap[tekstnøkkel];
};

export default tekster;
