import React, { BaseSyntheticEvent, useCallback } from 'react';
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
  const inputFelt = useCallback(
    (name: string) => (
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Input {...field} mini onFocus={markerTekstVedFokus} type="number" className="dagerInput" />
        )}
      </Field>
    ),
    [],
  );

  return (
    <div className="foreldreInput">
      <Undertittel>Foreldre - overførte dager</Undertittel>
      <FieldArray
        name="foreldre"
        render={arrayHelpers => (
          <>
            <table className="tabell tabell--reverse-stripet borderless">
              <thead>
                <tr>
                  <th />
                  <th>Normal forskrift</th>
                  <th />
                  <th>Midlertidig forskrift</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td />
                  <td>Dager mottatt</td>
                  <td>Dager fordelt</td>
                  <td>Dager mottatt</td>
                  <td>Dager overført</td>
                </tr>
                {foreldre.map((forelder, index) => (
                  <tr key={forelder.id}>
                    <td>{`Forelder #${index + 1}`}</td>
                    <td>{inputFelt(`foreldre[${index}].normaldager.dagerFått`)}</td>
                    <td>{inputFelt(`foreldre[${index}].normaldager.dagerTildelt`)}</td>
                    <td className="koronabakgrunn">{inputFelt(`foreldre[${index}].koronadager.dagerFått`)}</td>
                    <td className="koronabakgrunn">{inputFelt(`foreldre[${index}].koronadager.dagerTildelt`)}</td>
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
