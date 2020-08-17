import React from 'react';
import './kalkulatorInputStyle.less';
import BarnInput from './BarnInput';
import { Form } from 'formik';
import Resultat from './Resultat';
import KalkulatorHeader from './KalkulatorHeader';
import ForeldreInput from './ForeldreInput';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { uuidv4 } from '../utils';
import SkjemaContext from './SkjemaContext';
import PeriodeInput from './PeriodeInput';

export const initBarnValue = () => ({
  id: uuidv4(),
  søkerHarAleneomsorgFor: false,
  kroniskSykt: false,
});

export const initForelderValue = () => ({
  id: uuidv4(),
  normaldager: {
    dagerFått: 0,
    dagerTildelt: 0,
  },
  koronadager: {
    dagerFått: 0,
    dagerTildelt: 0,
  },
});

export const initialValues: OmsorgsdagerForm = {
  barn: [initBarnValue()],
  foreldre: [initForelderValue()],
};

const KalkulatorInput = () => (
  <SkjemaContext initialValues={initialValues}>
    <Form>
      <div className="inputContainer">
        <div className="kalkulatorInput">
          <KalkulatorHeader />
          <PeriodeInput />
          <BarnInput />
          <ForeldreInput />
        </div>
        <div className="resultat">
          <Resultat />
        </div>
      </div>
    </Form>
  </SkjemaContext>
);

export default KalkulatorInput;
