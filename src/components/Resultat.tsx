import React, { FunctionComponent, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Element } from 'nav-frontend-typografi';
import 'nav-frontend-tabell-style';
import {
  effektiveOverføringsdager,
  omsorgsdager as beregnOmsorgsdager,
  sumOverføringsdager,
} from './kalkulerOmsorgsdager';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import tekster from '../tekster';
import Omsorgsdager from '../types/Omsorgsdager';
import Overføringsdager from '../types/Overføringsdager';
import OverføringAdvarsel from './OverføringAdvarsel';

export const summerDager = (...omsorgsdager: Omsorgsdager[]): number =>
  omsorgsdager
    .filter(dag => !!dag)
    .reduce((sum, omsorgsdag) => sum + omsorgsdag.normaldager + omsorgsdag.koronadager, 0);

const Resultat: FunctionComponent = () => {
  const { barn, foreldre } = useFormikContext<OmsorgsdagerForm>().values;
  const omsorgsprinsipper = useMemo<Omsorgsprinsipper>(() => beregnOmsorgsdager(barn), [barn]);

  const overføringsdager = useMemo<Overføringsdager>(() => sumOverføringsdager(foreldre), [foreldre]);

  const effektivtOverført = effektiveOverføringsdager(overføringsdager, omsorgsprinsipper.grunnrett.normaldager);
  const totaltAntallDager = useMemo<number>(() => summerDager(...Object.values(omsorgsprinsipper), effektivtOverført), [
    omsorgsprinsipper,
    effektivtOverført,
  ]);

  return (
    <div className="resultatContainer">
      <OverføringAdvarsel omsorgsprinsipper={omsorgsprinsipper} overføringsdager={overføringsdager} />
      <div className="resultatHeader">
        <Element>{tekster('Resultat.HarRettPå')}</Element>
        <Element className="dagerOmsorg">{`${totaltAntallDager} ${tekster('Resultat.DagerOmsorgspenger')}`}</Element>
      </div>
      <table className="tabell tabell--stripet">
        <thead>
          <tr>
            <th />
            <th>{tekster('Resultat.Dager')}</th>
            <th>{tekster('Resultat.KoronaTillegg')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tekster('Resultat.Grunnrett')}</td>
            <td>{omsorgsprinsipper?.grunnrett.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsprinsipper?.grunnrett.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('Resultat.KroniskSykdom')}</td>
            <td>{omsorgsprinsipper?.kroniskSykt.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsprinsipper?.kroniskSykt.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('Resultat.AleneKroniskSykdom')}</td>
            <td>{omsorgsprinsipper?.aleneomsorgKroniskSyke.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsprinsipper?.aleneomsorgKroniskSyke.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('Resultat.AleneOmOmsorg')}</td>
            <td>{omsorgsprinsipper?.aleneomsorg.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsprinsipper?.aleneomsorg.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('Resultat.OverførtMottatt')}</td>
            <td>{effektivtOverført.normaldager || '-'}</td>
            <td className="koronabakgrunn">{effektivtOverført.koronadager || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resultat;
