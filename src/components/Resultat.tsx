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
import PeriodeEnum from '../types/PeriodeEnum';
import Tabell, { TabellStyle } from './tabell/Tabell';

export const summerDager = (...omsorgsdager: Omsorgsdager[]): number =>
  omsorgsdager
    .filter(dag => !!dag)
    .reduce((sum, omsorgsdag) => sum + omsorgsdag.normaldager + omsorgsdag.koronadager, 0);

const Resultat: FunctionComponent = () => {
  const { barn, foreldre, periode } = useFormikContext<OmsorgsdagerForm>().values;
  const inkluderKoronadager = periode === PeriodeEnum.Koronaperiode;
  const omsorgsprinsipper = useMemo<Omsorgsprinsipper>(() => beregnOmsorgsdager(barn, inkluderKoronadager), [
    barn,
    inkluderKoronadager,
  ]);

  const overføringsdager = useMemo<Overføringsdager>(() => sumOverføringsdager(foreldre, inkluderKoronadager), [
    foreldre,
    inkluderKoronadager,
  ]);

  const effektivtOverført = effektiveOverføringsdager(
    overføringsdager,
    omsorgsprinsipper.grunnrett.normaldager,
    inkluderKoronadager,
  );
  const totaltAntallDager = useMemo<number>(() => summerDager(...Object.values(omsorgsprinsipper), effektivtOverført), [
    omsorgsprinsipper,
    effektivtOverført,
  ]);

  return (
    <div className="resultatContainer">
      <Tabell
        tabellStyle={TabellStyle.stripet}
        columnHeaderRows={
          <tr>
            <th />
            <th>{tekster('Resultat.Dager')}</th>
            {inkluderKoronadager && <th>{tekster('Resultat.KoronaTillegg')}</th>}
          </tr>
        }
      >
        <tr>
          <td>{tekster('Resultat.Grunnrett')}</td>
          <td>{omsorgsprinsipper?.grunnrett.normaldager || '-'}</td>
          {inkluderKoronadager && <td className="koronabakgrunn">{omsorgsprinsipper?.grunnrett.koronadager || '-'}</td>}
        </tr>
        <tr>
          <td>{tekster('Resultat.KroniskSykdom')}</td>
          <td>{omsorgsprinsipper?.kroniskSykt.normaldager || '-'}</td>
          {inkluderKoronadager && (
            <td className="koronabakgrunn">{omsorgsprinsipper?.kroniskSykt.koronadager || '-'}</td>
          )}
        </tr>
        <tr>
          <td>{tekster('Resultat.AleneKroniskSykdom')}</td>
          <td>{omsorgsprinsipper?.aleneomsorgKroniskSyke.normaldager || '-'}</td>
          {inkluderKoronadager && (
            <td className="koronabakgrunn">{omsorgsprinsipper?.aleneomsorgKroniskSyke.koronadager || '-'}</td>
          )}
        </tr>
        <tr>
          <td>{tekster('Resultat.AleneOmOmsorg')}</td>
          <td>{omsorgsprinsipper?.aleneomsorg.normaldager || '-'}</td>
          {inkluderKoronadager && (
            <td className="koronabakgrunn">{omsorgsprinsipper?.aleneomsorg.koronadager || '-'}</td>
          )}
        </tr>
        <tr>
          <td>{tekster('Resultat.OverførtMottatt')}</td>
          <td>{effektivtOverført.normaldager || '-'}</td>
          {inkluderKoronadager && <td className="koronabakgrunn">{effektivtOverført.koronadager || '-'}</td>}
        </tr>
      </Tabell>
      <OverføringAdvarsel omsorgsprinsipper={omsorgsprinsipper} overføringsdager={overføringsdager} />
      <div className="resultatHeader">
        <Element>{tekster('Resultat.HarRettPå')}</Element>
        <Element className="dagerOmsorg">{`${totaltAntallDager} ${tekster('Resultat.DagerOmsorgspenger')}`}</Element>
      </div>
    </div>
  );
};

export default Resultat;
