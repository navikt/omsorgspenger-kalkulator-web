import React from 'react';
import './kalkulatorInputStyle.less';
import BarnInput from './BarnInput';
import { Form, Formik } from 'formik';
import Resultat from './Resultat';
import KalkulatorHeader from './KalkulatorHeader';
import ForeldreInput from './ForeldreInput';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { uuidv4 } from '../utils';

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

const initialValues: OmsorgsdagerForm = {
  søker: {},
  barn: [{ id: uuidv4() }],
  foreldre: [initForelderValue()],
};

const noop = () => {};

const KalkulatorInput = () => (
  <div className="inputContainer">
    <Formik initialValues={initialValues} onSubmit={noop}>
      {() => (
        <Form>
          <KalkulatorHeader />
          <ForeldreInput />
          <BarnInput />
          <Resultat />
        </Form>
      )}
    </Formik>
  </div>
);

export default KalkulatorInput;
