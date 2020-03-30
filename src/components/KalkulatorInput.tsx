import React from 'react';
import './kalkulatorInputStyle.less';
import BarnInput from './BarnInput';
import { Form, Formik } from 'formik';
import Resultat from './Resultat';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

const initialValues: OmsorgsdagerForm = {
  søker: {},
  barn: [{ id: new Date().toString() }],
};

const KalkulatorInput = () => {
  const noop = () => {};
  return (
    <div className="inputContainer">
      <Formik initialValues={initialValues} onSubmit={noop}>
        {() => (
          <Form>
            <BarnInput />
            <Resultat />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default KalkulatorInput;
