import React, { FunctionComponent } from 'react';
import Omsorgsdager from '../types/Omsorgsdager';
import { useFormikContext } from 'formik';
import { grunnrettsdager } from './kalkulerOmsorgsdager';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

interface ResultatProps {
  grunnrettsdager?: Omsorgsdager;
}

const summerDager = (...omsorgsdager: Omsorgsdager[]): number => {
  return omsorgsdager
    .filter(dag => !!dag)
    .reduce((sum, omsorgsdag) => sum + omsorgsdag.normaldager + omsorgsdag.koronadager, 0);
};

const Resultat: FunctionComponent<ResultatProps> = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();

  const antallGrunnrettsdager = grunnrettsdager(values.barn);

  return (
    <div>
      <span className="alignTextCenter">Søkeren har rett på:</span>
      <span className="alignTextCenter">
        {antallGrunnrettsdager ? ` ${summerDager(antallGrunnrettsdager)} dager` : ' -'}
      </span>
    </div>
  );
};

export default Resultat;
