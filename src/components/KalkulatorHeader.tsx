import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { useFormikContext } from 'formik';
import tekster from '../tekster';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';
import { Calculator } from '../images/calculator';

const KalkulatorHeader = () => {
  const { resetForm } = useFormikContext<OmsorgsdagerForm>();
  return (
    <div className="kalkulatorHeader">
      <span className="kalkulatorTitle">
        <Calculator height={24} width={17} />
        <Systemtittel tag="h1">{tekster('KalkulatorHeader.Overskrift')}</Systemtittel>
      </span>
      <Flatknapp mini kompakt onClick={() => resetForm()}>
        {tekster('KalkulatorHeader.Nullstill')}
      </Flatknapp>
    </div>
  );
};

export default KalkulatorHeader;
