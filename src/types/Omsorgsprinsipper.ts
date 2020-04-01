import Omsorgsdager from './Omsorgsdager';

interface Omsorgsprinsipper {
  grunnrett: Omsorgsdager;
  kroniskSykt: Omsorgsdager;
  aleneomsorgKroniskSyke: Omsorgsdager;
  aleneomsorg: Omsorgsdager;
  overføringsdager: Omsorgsdager;
}

export default Omsorgsprinsipper;
