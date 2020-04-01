import React from 'react';
import { ReactComponent as KalkulatorIkon } from '../images/calculator.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

const KalkulatorHeader = () => {
  const { resetForm } = useFormikContext<OmsorgsdagerForm>();
  return (
    <div className="kalkulatorHeader">
      <span className="kalkulatorTitle">
        <KalkulatorIkon />
        <Systemtittel tag="h1">Omsorgspengerkalkulator</Systemtittel>
      </span>
      <Flatknapp mini kompakt onClick={() => resetForm()}>
        Nullstill
      </Flatknapp>
    </div>
  );
};

export default KalkulatorHeader;
