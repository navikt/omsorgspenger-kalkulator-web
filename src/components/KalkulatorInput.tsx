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
  søker: {},
  barn: [initBarnValue()],
  foreldre: [initForelderValue()],
};

const KalkulatorInput = () => (
  <div className="inputContainer">
    <SkjemaContext initialValues={initialValues}>
      {() => (
        <Form>
          <KalkulatorHeader />
          <BarnInput />
          <ForeldreInput />
          <Resultat />
        </Form>
      )}
    </SkjemaContext>
  </div>
);

export default KalkulatorInput;
