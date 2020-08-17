import React from 'react';
import tekster from '../tekster';
import { Field, FieldProps } from 'formik';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import PeriodeEnum from '../types/PeriodeEnum';

const PeriodeInput: React.FunctionComponent = () => {
  return (
    <section className="periodeinput">
      <Field name="periode">
        {({ field }: FieldProps) => (
          <>
            <RadioPanelGruppe
              legend={tekster('Periode.RadioLabel')}
              radios={[
                { label: tekster('Periode.Ja'), value: PeriodeEnum.Koronaperiode, id: 'periode.ja' },
                { label: tekster('Periode.Nei'), value: PeriodeEnum.UtenomKoronaperiode, id: 'periode.nei' },
              ]}
              checked={field.value}
              {...field}
            />
          </>
        )}
      </Field>
    </section>
  );
};

export default PeriodeInput;
