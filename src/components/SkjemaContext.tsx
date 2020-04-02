import React from 'react';
import { Formik } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

interface SkjemaProps {
  initialValues: OmsorgsdagerForm;
}

const noop = () => {};

const SkjemaContext: React.FunctionComponent<SkjemaProps> = ({ initialValues, children }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={noop}>
      {children}
    </Formik>
  );
};

export default SkjemaContext;
