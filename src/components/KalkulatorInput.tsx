import React from 'react';
import './kalkulatorInputStyle.css';
import BarnInput from './BarnInput';
import SøkerInput from './SøkerInput';
import { Form, Formik } from 'formik';
import Resultat from './Resultat';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

const initialValues: OmsorgsdagerForm = {
  søker: {},
  barn: [{}],
};

const KalkulatorInput = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="inputContainer">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <SøkerInput />
            <BarnInput />
            <Resultat />
            <button type="submit">Verdier</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default KalkulatorInput;
