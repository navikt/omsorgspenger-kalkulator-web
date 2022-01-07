import React, { BaseSyntheticEvent, FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { initForelderValue } from './KalkulatorInput';
import tekster from '../tekster';
import { kunPositiveHeltall } from './validators';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import Tabell, { TabellStyle } from './tabell/Tabell';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';
import PeriodeEnum from '@navikt/kalkuler-omsorgsdager/lib/types/PeriodeEnum';
import { AddCircle } from '../images/add-circle';

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
  const { foreldre, periode } = useFormikContext<OmsorgsdagerForm>().values;

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
            <Tabell
              noBorder
              className="foreldertabell"
              tabellStyle={TabellStyle.stripet}
              columnHeaderRows={
                <>
                  {periode === PeriodeEnum.Koronaperiode && (
                    <>
                      <tr>
                        <th />
                        <th className="noTextWrap">{tekster('ForeldreInput.NormalForskrift')}</th>
                        <th />
                        <th className="noTextWrap">{tekster('ForeldreInput.MidlertidigForskrift')}</th>
                        <th />
                      </tr>
                    </>
                  )}

                  <tr>
                    <td />
                    <td>{tekster('ForeldreInput.DagerMottatt')}</td>
                    <td>{tekster('ForeldreInput.DagerFordelt')}</td>
                    {periode === PeriodeEnum.Koronaperiode && (
                      <>
                        <td>{tekster('ForeldreInput.DagerMottatt')}</td>
                        <td>{tekster('ForeldreInput.DagerOverført')}</td>
                      </>
                    )}
                  </tr>
                </>
              }
            >
              {foreldre.map((forelder, index) => (
                <tr key={forelder.id}>
                  <td valign="top">{`${tekster('ForeldreInput.Forelder')} #${index + 1}`}</td>
                  <td valign="top">
                    <AntallDagerInputFelt name={`foreldre[${index}].normaldager.dagerFått`} />
                  </td>
                  <td valign="top">
                    <AntallDagerInputFelt name={`foreldre[${index}].normaldager.dagerTildelt`} />
                  </td>
                  {periode === PeriodeEnum.Koronaperiode && (
                    <>
                      <td valign="top" className="koronabakgrunn">
                        <AntallDagerInputFelt name={`foreldre[${index}].koronadager.dagerFått`} />
                      </td>
                      <td valign="top" className="koronabakgrunn">
                        <AntallDagerInputFelt name={`foreldre[${index}].koronadager.dagerTildelt`} />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </Tabell>
            <div className="flex flex--justifyCenter">
              <Flatknapp htmlType="button" onClick={() => arrayHelpers.push(initForelderValue())} mini form="kompakt">
                <AddCircle height={24} width={24} />
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
