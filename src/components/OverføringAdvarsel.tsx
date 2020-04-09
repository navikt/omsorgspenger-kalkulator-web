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
  const totaltAntallDager = useMemo<number>(() => {
    return Object.values(omsorgsprinsipper).reduce(
      (sum, { normaldager, koronadager }) => sum + normaldager + koronadager,
      0,
    );
  }, [omsorgsprinsipper]);

  const overførteDager = overføringsdager.fordelteNormaldager + overføringsdager.overførteKoronadager;
  const harOveførtFlereDagerEnnTilgjengelig = overførteDager > totaltAntallDager;

  return (
    <>
      {harOveførtFlereDagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselNormal', {
            overførteDager: `${overførteDager}`,
            tilgjengeligeDager: `${totaltAntallDager}`,
          })}
        </AlertStripe>
      )}
    </>
  );
};

export default OverføringAdvarsel;
