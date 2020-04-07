import React, { BaseSyntheticEvent, FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as AddCircle } from '../images/add-circle.svg';
import { initForelderValue } from './KalkulatorInput';
import tekster from '../tekster';
import { kunPositiveHeltall } from './validators';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';

const AntallDagerInputFelt: FunctionComponent<{ name: string }> = ({ name }) => {
  const markerTekstVedFokus = (event: BaseSyntheticEvent) => event.target.select();
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        const feil = kunPositiveHeltall(field.value);
        return <Input {...field} mini onFocus={markerTekstVedFokus} type="number" className="dagerInput" feil={feil} />;
      }}
    </Field>
  );
};

const ForeldreInput = () => {
  const foreldre = useFormikContext<OmsorgsdagerForm>().values.foreldre;

  return (
    <div className="foreldreInput">
      <div className="flex flex--marg">
        <Undertittel>{tekster('ForeldreInput.Overskrift')}</Undertittel>
        <Hjelpetekst type={PopoverOrientering.Hoyre}>
          <div>{tekster('ForeldreInput.Hjelpetekst1')}</div>
          <div>{tekster('ForeldreInput.Hjelpetekst2')}</div>
          <div>{tekster('ForeldreInput.Hjelpetekst3')}</div>
        </Hjelpetekst>
      </div>
      <FieldArray
        name="foreldre"
        render={arrayHelpers => (
          <>
            <table className="tabell tabell--reverse-stripet borderless foreldertabell">
              <thead>
                <tr>
                  <th />
                  <th className="noTextWrap">{tekster('ForeldreInput.NormalForskrift')}</th>
                  <th />
                  <th className="noTextWrap">{tekster('ForeldreInput.MidlertidigForskrift')}</th>
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
                    <td valign="top">{`${tekster('ForeldreInput.Forelder')} #${index + 1}`}</td>
                    <td valign="top">
                      <AntallDagerInputFelt name={`foreldre[${index}].normaldager.dagerFått`} />
                    </td>
                    <td valign="top">
                      <AntallDagerInputFelt name={`foreldre[${index}].normaldager.dagerTildelt`} />
                    </td>
                    <td valign="top" className="koronabakgrunn">
                      <AntallDagerInputFelt name={`foreldre[${index}].koronadager.dagerFått`} />
                    </td>
                    <td valign="top" className="koronabakgrunn">
                      <AntallDagerInputFelt name={`foreldre[${index}].koronadager.dagerTildelt`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex--justifyCenter">
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
