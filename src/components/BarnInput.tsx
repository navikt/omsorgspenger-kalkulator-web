import React, { useCallback } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { Checkbox, RadioPanelGruppe } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import tekster from '../tekster';
import { initBarnValue } from './KalkulatorInput';
import OmsorgsdagerForm from '@navikt/kalkuler-omsorgsdager/lib/types/OmsorgsdagerForm';
import { AlderType } from '@navikt/kalkuler-omsorgsdager/lib/types/Barn';
import { AddCircle } from '../images/add-circle';
import { TrashCan } from '../images/trashCan';

const BarnInput = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();
  const radios = useCallback(
    (index: number) => [
      { label: 'Under 12', value: AlderType.UNDER12, id: `barn[${index}].under12` },
      { label: 'Over 12', value: AlderType.OVER12, id: `barn[${index}].over12` },
    ],
    [],
  );

  return (
    <div className="søkerensBarn">
      <div className="flex flex--marg">
        <Undertittel>{tekster('BarnInput.Overskrift')}</Undertittel>
        <Hjelpetekst type={PopoverOrientering.Hoyre}>{tekster('BarnInput.Hjelpetekst')}</Hjelpetekst>
      </div>
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
                    <TrashCan height={24} width={24}/>
                    <span>{tekster('BarnInput.Fjern')}</span>
                  </Flatknapp>
                )}
                <Field name={`barn[${index}].alder`}>
                  {({ field }: FieldProps) => (
                    <>
                      <RadioPanelGruppe
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
                <div className="flex flex--marg">
                  <Field name={`barn[${index}].søkerHarAleneomsorgFor`}>
                    {({ field }: FieldProps) => (
                      <Checkbox label={tekster('BarnInput.Aleneomsorg')} checked={field.value} {...field} />
                    )}
                  </Field>
                  <Hjelpetekst type={PopoverOrientering.Hoyre}>
                    <span>{tekster('BarnInput.Aleneomsorg.Hjelpetekst1')}</span>
                    <ul>
                      <li>{tekster('BarnInput.Aleneomsorg.Hjelpetekst2')}</li>
                      <li>{tekster('BarnInput.Aleneomsorg.Hjelpetekst3')}</li>
                      <li>{tekster('BarnInput.Aleneomsorg.Hjelpetekst4')}</li>
                    </ul>
                  </Hjelpetekst>
                </div>
                {index < values.barn.length - 1 && <div className="verticalLine" />}
              </div>
            ))}
            <div className="flex flex--justifyCenter">
              <Flatknapp
                htmlType="button"
                onClick={() => arrayHelpers.push(initBarnValue())}
                mini
                form="kompakt"
                className="marginTop"
              >
                <AddCircle height={24} width={24} />
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
