import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
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
  barn: [initBarnValue()],
  foreldre: [initForelderValue()],
};

const KalkulatorInput = () => (
  <SkjemaContext initialValues={initialValues}>
    <Form>
      <AlertStripeInfo className="nytt-regelverk-infoboks">
        Omsorgsdagerkalkulatoren regner antall dager basert på regelverket til og med 30.juni 2020. Kalkulatoren er enda
        ikke oppdatert med de nye reglene som gjelder fra 1.juli 2020.
      </AlertStripeInfo>
      <div className="inputContainer">
        <div className="kalkulatorInput">
          <KalkulatorHeader />
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
