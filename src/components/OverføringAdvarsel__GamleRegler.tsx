import React, { FunctionComponent, useMemo } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import tekster from '../tekster';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import Overføringsdager from '@navikt/kalkuler-omsorgsdager/lib/types/Overføringsdager';

interface OverføringAdvarselProps {
  omsorgsprinsipper: Omsorgsprinsipper;
  overføringsdager: Overføringsdager;
}

const OverføringAdvarsel__GamleRegler: FunctionComponent<OverføringAdvarselProps> = ({
  omsorgsprinsipper,
  overføringsdager,
}) => {
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

export default OverføringAdvarsel__GamleRegler;
