import React, { FunctionComponent, useMemo } from 'react';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import Overføringsdager from '../types/Overføringsdager';
import AlertStripe from 'nav-frontend-alertstriper';
import tekster from '../tekster';

interface OverføringAdvarselProps {
  omsorgsprinsipper: Omsorgsprinsipper;
  overføringsdager: Overføringsdager;
}

const OverføringAdvarsel: FunctionComponent<OverføringAdvarselProps> = ({ omsorgsprinsipper, overføringsdager }) => {
  const antallKoronadager = useMemo<number>(
    () => Object.values(omsorgsprinsipper).reduce((sum, dag) => sum + dag.koronadager, 0),
    [omsorgsprinsipper],
  );
  const { aleneomsorg, aleneomsorgKroniskSyke } = omsorgsprinsipper;
  const aleneomsorgsdager = useMemo(() => aleneomsorgKroniskSyke.normaldager + aleneomsorg.normaldager, [
    aleneomsorg,
    aleneomsorgKroniskSyke,
  ]);

  const harOverførtFlerNormaldagerEnnTilgjengelig = overføringsdager.fordelteNormaldager > aleneomsorgsdager;
  const harOverførtFlerKoronadagerEnnTilgjengelig = overføringsdager.overførteKoronadager > antallKoronadager;

  return (
    <>
      {harOverførtFlerNormaldagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselNormal', {
            overførteDager: `${overføringsdager.fordelteNormaldager}`,
            tilgjengeligeDager: `${aleneomsorgsdager}`,
          })}
        </AlertStripe>
      )}
      {harOverførtFlerKoronadagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselKorona', {
            overførteDager: `${overføringsdager.overførteKoronadager}`,
            tilgjengeligeDager: `${antallKoronadager}`,
          })}
        </AlertStripe>
      )}
    </>
  );
};

export default OverføringAdvarsel;
