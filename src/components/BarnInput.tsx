import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe, Checkbox } from 'nav-frontend-skjema';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { ReactComponent as AddCircle } from '../images/add-circle.svg';
import { ReactComponent as TrashCan } from '../images/trash-can.svg';

const radios = (index: number) => [
  { label: 'Under 12', value: 'under12', id: `barn[${index}].under12` },
  { label: 'Over 12', value: 'over12', id: `barn[${index}].over12` },
];

const BarnInput = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();

  return (
    <div className="søkerensBarn">
      <Undertittel>Om søkerens barn</Undertittel>
      <FieldArray
        name="barn"
        render={arrayHelpers => (
          <div>
            {values.barn.map((barn, index) => (
              <div key={barn.id} className="marginTop marginBetween relativePosition">
                {values.barn.length > 1 && (
                  <Flatknapp
                    htmlType="button"
                    onClick={() => arrayHelpers.remove(index)}
                    mini
                    form="kompakt"
                    className="høyreHjørne"
                  >
                    <TrashCan className="buttonIcon" />
                    <span>Fjern</span>
                  </Flatknapp>
                )}
                <Field name={`barn[${index}].alder`}>
                  {({ field }: FieldProps) => (
                    <>
                      <RadioPanelGruppe
                        className="lolo"
                        name="barnetsAlder"
                        legend="Hvor gammelt er barnet?"
                        radios={radios(index)}
                        checked={field.value}
                        {...field}
                      />
                    </>
                  )}
                </Field>
                <Field name={`barn[${index}].kroniskSykt`}>
                  {({ field }: FieldProps) => <Checkbox label="Barnet er kronisk sykt" {...field} />}
                </Field>
                <Field name={`barn[${index}].søkerHarAleneomsorgFor`}>
                  {({ field }: FieldProps) => <Checkbox label="Søker har aleneomsorg for barnet" {...field} />}
                </Field>
                {index < values.barn.length - 1 && <div className="verticalLine" />}
              </div>
            ))}
            <div className="justifyFlexEnd">
              <Flatknapp
                htmlType="button"
                onClick={() => arrayHelpers.push({ id: new Date().toString() })}
                mini
                form="kompakt"
                className="marginTop"
              >
                <AddCircle className="buttonIcon" />
                <span>Legg til flere barn</span>
              </Flatknapp>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default BarnInput;
