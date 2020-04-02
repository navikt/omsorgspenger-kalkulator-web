import React, { FunctionComponent, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Element } from 'nav-frontend-typografi';
import 'nav-frontend-tabell-style';
import { omsorgsdager } from './kalkulerOmsorgsdager';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import tekster from '../tekster';

export const summerDager = (omsorgsprinsipper: Omsorgsprinsipper): number => {
  return Object.values(omsorgsprinsipper)
    .filter(dag => !!dag)
    .reduce((sum, omsorgsdag) => sum + omsorgsdag.normaldager + omsorgsdag.koronadager, 0);
};

const Resultat: FunctionComponent = () => {
  const { values } = useFormikContext<OmsorgsdagerForm>();
  const totaltAntallDager = useMemo(() => omsorgsdager(values), [values]);

  return (
    <>
      <div className="arrowUp" />
      <div className="resultatHeader">
        <Element>{tekster('SøkerInput.HarRettPå')}</Element>
        <Element className="dagerOmsorg">
          {totaltAntallDager ? `${summerDager(totaltAntallDager)} ${tekster('SøkerInput.DagerOmsorgspenger')}` : '-'}
        </Element>
      </div>
      <table className="tabell tabell--stripet">
        <thead>
          <tr>
            <th />
            <th>{tekster('SøkerInput.Dager')}</th>
            <th>{tekster('SøkerInput.KoronaTillegg')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tekster('SøkerInput.Grunnrett')}</td>
            <td>{totaltAntallDager?.grunnrett.normaldager || '-'}</td>
            <td className="koronabakgrunn">{totaltAntallDager?.grunnrett.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.KroniskSykdom')}</td>
            <td>{totaltAntallDager?.kroniskSykt.normaldager || '-'}</td>
            <td className="koronabakgrunn">{totaltAntallDager?.kroniskSykt.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.AleneKroniskSykdom')}</td>
            <td>{totaltAntallDager?.aleneomsorgKroniskSyke.normaldager || '-'}</td>
            <td className="koronabakgrunn">{totaltAntallDager?.aleneomsorgKroniskSyke.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.AleneOmOmsorg')}</td>
            <td>{totaltAntallDager?.aleneomsorg.normaldager || '-'}</td>
            <td className="koronabakgrunn">{totaltAntallDager?.aleneomsorg.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.OverførtMottatt')}</td>
            <td>{totaltAntallDager?.overføringsdager.normaldager || '-'}</td>
            <td className="koronabakgrunn">{totaltAntallDager?.overføringsdager.koronadager || '-'}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Resultat;
