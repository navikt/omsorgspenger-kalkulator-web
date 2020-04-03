import React, { useCallback } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe, Checkbox } from 'nav-frontend-skjema';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { ReactComponent as AddCircle } from '../images/add-circle.svg';
import { ReactComponent as TrashCan } from '../images/trash-can.svg';
import tekster from '../tekster';
import { initBarnValue } from './KalkulatorInput';

const BarnInput = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();
  const radios = useCallback(
    (index: number) => [
      { label: 'Under 12', value: 'under12', id: `barn[${index}].under12` },
      { label: 'Over 12', value: 'over12', id: `barn[${index}].over12` },
    ],
    [],
  );

  return (
    <div className="søkerensBarn">
      <Undertittel>{tekster('BarnInput.Overskrift')}</Undertittel>
      <FieldArray
        name="barn"
        render={arrayHelpers => (
          <div>
            {values.barn.map((barn, index) => (
              <div key={barn.id} className="ettBarn marginBetween">
                {values.barn.length > 1 && (
                  <Flatknapp
                    htmlType="button"
                    onClick={() => arrayHelpers.remove(index)}
                    mini
                    form="kompakt"
                    className="høyreHjørne"
                  >
                    <TrashCan className="buttonIcon" />
                    <span>{tekster('BarnInput.Fjern')}</span>
                  </Flatknapp>
                )}
                <Field name={`barn[${index}].alder`}>
                  {({ field }: FieldProps) => (
                    <>
                      <RadioPanelGruppe
                        name="barnetsAlder"
                        legend={tekster('BarnInput.Alder')}
                        radios={radios(index)}
                        checked={field.value}
                        {...field}
                      />
                    </>
                  )}
                </Field>
                <Field name={`barn[${index}].kroniskSykt`}>
                  {({ field }: FieldProps) => (
                    <Checkbox label={tekster('BarnInput.KroniskSykt')} checked={field.value} {...field} />
                  )}
                </Field>
                <Field name={`barn[${index}].søkerHarAleneomsorgFor`}>
                  {({ field }: FieldProps) => (
                    <Checkbox label={tekster('BarnInput.Aleneomsorg')} checked={field.value} {...field} />
                  )}
                </Field>
                {index < values.barn.length - 1 && <div className="verticalLine" />}
              </div>
            ))}
            <div className="flexJustifyCenter">
              <Flatknapp
                htmlType="button"
                onClick={() => arrayHelpers.push(initBarnValue())}
                mini
                form="kompakt"
                className="marginTop"
              >
                <AddCircle className="buttonIcon" />
                <span>{tekster('BarnInput.LeggTilBarn')}</span>
              </Flatknapp>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default BarnInput;
