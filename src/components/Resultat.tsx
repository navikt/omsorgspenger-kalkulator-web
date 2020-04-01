import React, { FunctionComponent, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Element } from 'nav-frontend-typografi';
import 'nav-frontend-tabell-style';
import { omsorgsdager } from './kalkulerOmsorgsdager';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';

const summerDager = (omsorgsprinsipper: Omsorgsprinsipper): number => {
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
        <Element>Søkeren har rett på</Element>
        <Element className="dagerOmsorg">
          {totaltAntallDager ? `${summerDager(totaltAntallDager)} dager med omsorgspenger` : '-'}
        </Element>
      </div>
      <table className="tabell tabell--stripet">
        <thead>
          <tr>
            <th />
            <th>Dager</th>
            <th>Korona-tillegg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grunnrett</td>
            <td>{totaltAntallDager?.grunnrett.normaldager || '-'}</td>
            <td>{totaltAntallDager?.grunnrett.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>Barn med kronisk sykdom</td>
            <td>{totaltAntallDager?.kroniskSykt.normaldager || '-'}</td>
            <td>{totaltAntallDager?.kroniskSykt.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>Aleneomsorg for barn med kronisk sykdom</td>
            <td>{totaltAntallDager?.aleneomsorgKroniskSyke.normaldager || '-'}</td>
            <td>{totaltAntallDager?.aleneomsorgKroniskSyke.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>Alene om omsorgen</td>
            <td>{totaltAntallDager?.aleneomsorg.normaldager || '-'}</td>
            <td>{totaltAntallDager?.aleneomsorg.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>Overført/Mottatt</td>
            <td>{totaltAntallDager?.overføringsdager.normaldager || '-'}</td>
            <td>{totaltAntallDager?.overføringsdager.koronadager || '-'}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Resultat;
