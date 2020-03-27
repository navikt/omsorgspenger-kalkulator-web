import stringEnum from '../utils';

export const ArbeidsstatusEnum = stringEnum({
  ARBEIDSTAKER: 'ARBEIDSTAKER',
  FRILANSER: 'FRILANSER',
  SELVSTENDIG_NÆRINGSDRIVENDE: 'SELVSTENDIG_NÆRINGSDRIVENDE',
  ARBEIDSLEDIG: 'ARBEIDSLEDIG',
});

type ArbeidsstatusType = typeof ArbeidsstatusEnum[keyof typeof ArbeidsstatusEnum];

export default ArbeidsstatusType;
