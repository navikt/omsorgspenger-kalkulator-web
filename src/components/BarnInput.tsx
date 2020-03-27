import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';

const BarnInput = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();
  let radios = (index: number) => [
    { label: 'Under 12', value: 'under12', id: `barn[${index}].under12` },
    { label: 'Over 12', value: 'over12', id: `barn[${index}].over12` },
  ];
  return (
    <div>
      <Undertittel>Søkerens barn</Undertittel>
      <FieldArray
        name="barn"
        render={arrayHelpers => (
          <div>
            {values.barn.map((barn, index) => (
              <div key={index}>
                <Field name={`barn[${index}].alder`}>
                  {({ field }: FieldProps) => (
                    <RadioPanelGruppe
                      name="barnetsAlder"
                      legend="Hvor gammelt er barnet?"
                      radios={radios(index)}
                      checked={field.value}
                      {...field}
                    />
                  )}
                </Field>
              </div>
            ))}
            <button onClick={() => arrayHelpers.push({})}>Legg til barn</button>
          </div>
        )}
      />
    </div>
  );
};

export default BarnInput;
