import React, { BaseSyntheticEvent, useCallback } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as AddCircle } from '../images/add-circle.svg';
import { initForelderValue } from './KalkulatorInput';
import tekster from '../tekster';

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
      <Undertittel>{tekster('ForeldreInput.Overskrift')}</Undertittel>
      <FieldArray
        name="foreldre"
        render={arrayHelpers => (
          <>
            <table className="tabell tabell--reverse-stripet borderless">
              <thead>
                <tr>
                  <th />
                  <th>{tekster('ForeldreInput.NormalForskrift')}</th>
                  <th />
                  <th>{tekster('ForeldreInput.MidlertidigForskrift')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td />
                  <td>{tekster('ForeldreInput.DagerMottatt')}</td>
                  <td>{tekster('ForeldreInput.DagerFordelt')}</td>
                  <td>{tekster('ForeldreInput.DagerMottatt')}</td>
                  <td>{tekster('ForeldreInput.DagerOverført')}</td>
                </tr>
                {foreldre.map((forelder, index) => (
                  <tr key={forelder.id}>
                    <td>{`${tekster('ForeldreInput.Forelder')} #${index + 1}`}</td>
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
                <span>{tekster('ForeldreInput.LeggTilForelder')}</span>
              </Flatknapp>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default ForeldreInput;
