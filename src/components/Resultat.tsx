import React, { FunctionComponent, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Element } from 'nav-frontend-typografi';
import 'nav-frontend-tabell-style';
import AlertStripe from 'nav-frontend-alertstriper';
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

  const overføringsdager = useMemo<Overføringsdager>(() => sumOverføringsdager(foreldre), [foreldre]);

  const effektivtOverført = effektiveOverføringsdager(overføringsdager, omsorgsdager.grunnrett.normaldager);
  const totaltAntallDager = useMemo<number>(() => summerDager(...Object.values(omsorgsdager), effektivtOverført), [
    omsorgsdager,
    effektivtOverført,
  ]);
  const sumOmsorgsdager = useMemo<Omsorgsdager>(() => summerOmsorgsdager(omsorgsdager), [omsorgsdager]);

  const harOverførtFlerNormaldagerEnnTilgjengelig =
    overføringsdager.fordelteNormaldager > sumOmsorgsdager.normaldager - omsorgsdager.grunnrett.normaldager;
  const harOverførtFlerKoronadagerEnnTilgjengelig = overføringsdager.overførteKoronadager > sumOmsorgsdager.koronadager;

  return (
    <div className="resultatContainer">
      {harOverførtFlerNormaldagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselNormal', {
            overførteDager: `${overføringsdager.fordelteNormaldager}`,
            tilgjengeligeDager: `${sumOmsorgsdager.normaldager - omsorgsdager.grunnrett.normaldager}`,
          })}
        </AlertStripe>
      )}
      {harOverførtFlerKoronadagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselKorona', {
            overførteDager: `${overføringsdager.overførteKoronadager}`,
            tilgjengeligeDager: `${sumOmsorgsdager.koronadager}`,
          })}
        </AlertStripe>
      )}
      <div className="resultatHeader">
        <Element>{tekster('SøkerInput.HarRettPå')}</Element>
        <Element className="dagerOmsorg">{`${totaltAntallDager} ${tekster('SøkerInput.DagerOmsorgspenger')}`}</Element>
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
            <td>{effektivtOverført.normaldager || '-'}</td>
            <td className="koronabakgrunn">{effektivtOverført.koronadager || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resultat;
