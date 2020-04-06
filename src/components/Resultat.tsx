import React, { FunctionComponent, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Element } from 'nav-frontend-typografi';
import 'nav-frontend-tabell-style';
import AlertStripe from 'nav-frontend-alertstriper';
import { omsorgsdager as beregnOmsorgsdager, overføringsdager } from './kalkulerOmsorgsdager';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import tekster from '../tekster';
import Omsorgsdager from '../types/Omsorgsdager';

export const summerDager = (...omsorgsdager: Omsorgsdager[]): number =>
  omsorgsdager
    .filter(dag => !!dag)
    .reduce((sum, omsorgsdag) => sum + omsorgsdag.normaldager + omsorgsdag.koronadager, 0);

export const summerOmsorgsdager = (omsorgsprinsipper: Omsorgsprinsipper): Omsorgsdager =>
  Object.values(omsorgsprinsipper)
    .filter(dag => !!dag)
    .reduce(
      ({ normaldager, koronadager }, omsorgsdag) => ({
        normaldager: normaldager + omsorgsdag.normaldager,
        koronadager: koronadager + omsorgsdag.koronadager,
      }),
      { normaldager: 0, koronadager: 0 },
    );

const Resultat: FunctionComponent = () => {
  const { barn, foreldre } = useFormikContext<OmsorgsdagerForm>().values;
  const omsorgsdager = useMemo<Omsorgsprinsipper>(() => beregnOmsorgsdager(barn), [barn]);
  const overføring: Omsorgsdager = overføringsdager(foreldre, omsorgsdager.grunnrett.normaldager);

  const sumDager = useMemo<number>(() => summerDager(...Object.values(omsorgsdager), overføring), [
    omsorgsdager,
    overføring,
  ]);

  const sumOmsorgsdager = useMemo<Omsorgsdager>(() => summerOmsorgsdager(omsorgsdager), [omsorgsdager]);

  return (
    <div className="resultatContainer">
      {-overføring.normaldager > sumOmsorgsdager.normaldager && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselNormal', {
            overførteDager: `${-overføring.normaldager}`,
            tilgjengeligeDager: `${sumOmsorgsdager.normaldager}`,
          })}
        </AlertStripe>
      )}
      {-overføring.koronadager > sumOmsorgsdager.koronadager && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselKorona', {
            overførteDager: `${-overføring.koronadager}`,
            tilgjengeligeDager: `${sumOmsorgsdager.koronadager}`,
          })}
        </AlertStripe>
      )}
      <div className="resultatHeader">
        <Element>{tekster('SøkerInput.HarRettPå')}</Element>
        <Element className="dagerOmsorg">
          {omsorgsdager ? `${sumDager} ${tekster('SøkerInput.DagerOmsorgspenger')}` : '-'}
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
            <td>{omsorgsdager?.grunnrett.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsdager?.grunnrett.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.KroniskSykdom')}</td>
            <td>{omsorgsdager?.kroniskSykt.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsdager?.kroniskSykt.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.AleneKroniskSykdom')}</td>
            <td>{omsorgsdager?.aleneomsorgKroniskSyke.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsdager?.aleneomsorgKroniskSyke.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.AleneOmOmsorg')}</td>
            <td>{omsorgsdager?.aleneomsorg.normaldager || '-'}</td>
            <td className="koronabakgrunn">{omsorgsdager?.aleneomsorg.koronadager || '-'}</td>
          </tr>
          <tr>
            <td>{tekster('SøkerInput.OverførtMottatt')}</td>
            <td>{overføring.normaldager || '-'}</td>
            <td className="koronabakgrunn">{overføring.koronadager || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resultat;
