import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { Field, FieldProps } from 'formik';
import { ArbeidsstatusEnum } from '../types/Arbeidsstatus';
import { SivilstandEnum } from '../types/Sivilstand';

const SøkerInput = () => (
  <div>
    <Field name="søker.arbeidsstatus">
      {({ field }: FieldProps) => (
        <Select label="Arbeidsstatus" {...field}>
          <option value="">Velg</option>
          <option value={ArbeidsstatusEnum.ARBEIDSTAKER}>Arbeidstaker</option>
          <option value={ArbeidsstatusEnum.FRILANSER}>Frilanser</option>
          <option value={ArbeidsstatusEnum.SELVSTENDIG_NÆRINGSDRIVENDE}>Selvstendig næringsdrivende</option>
          <option value={ArbeidsstatusEnum.ARBEIDSLEDIG}>Arbeidsledig</option>
        </Select>
      )}
    </Field>

    <Field name="søker.sivilstand">
      {({ field }: FieldProps) => (
        <Select label="Sivilstand" {...field}>
          <option value={SivilstandEnum.GIFT}>Gift</option>
          <option value={SivilstandEnum.SAMBOER}>Samboer</option>
          <option value={SivilstandEnum.ALENE}>Alene</option>
        </Select>
      )}
    </Field>
  </div>
);

export default SøkerInput;
