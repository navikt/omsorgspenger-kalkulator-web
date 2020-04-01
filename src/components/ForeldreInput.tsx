import React, { BaseSyntheticEvent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as AddCircle } from '../images/add-circle.svg';
import { initForelderValue } from './KalkulatorInput';

const ForeldreInput = () => {
  const foreldre = useFormikContext<OmsorgsdagerForm>().values.foreldre;
  const markerTekstVedFokus = (event: BaseSyntheticEvent) => event.target.select();
  const inputFelt = (name: string) => (
    <Field name={name}>
      {({ field }: FieldProps) => <Input {...field} mini onFocus={markerTekstVedFokus} type="number" />}
    </Field>
  );

  return (
    <div className="foreldreInput">
      <Undertittel>Foreldre - overførte dager</Undertittel>
      <FieldArray
        name="foreldre"
        render={arrayHelpers => (
          <>
            <table className="tabell tabell--stripet">
              <thead>
                <tr>
                  <th />
                  <th>Dager mottatt (normal forskrift)</th>
                  <th>Dager fordelt (normal forskrift)</th>
                  <th>Dager mottatt (midlertidig forskrift)</th>
                  <th>Dager fordelt (midlertidig forskrift)</th>
                </tr>
              </thead>
              <tbody>
                {foreldre.map((forelder, index) => (
                  <tr key={forelder.id}>
                    <td>{`Forelder #${index + 1}`}</td>
                    <td>{inputFelt(`foreldre[${index}].normaldager.dagerFått`)}</td>
                    <td>{inputFelt(`foreldre[${index}].normaldager.dagerTildelt`)}</td>
                    <td>{inputFelt(`foreldre[${index}].koronadager.dagerFått`)}</td>
                    <td>{inputFelt(`foreldre[${index}].koronadager.dagerTildelt`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flexJustifyCenter">
              <Flatknapp htmlType="button" onClick={() => arrayHelpers.push(initForelderValue())} mini form="kompakt">
                <AddCircle className="buttonIcon" />
                <span>Legg til flere foreldre</span>
              </Flatknapp>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default ForeldreInput;
