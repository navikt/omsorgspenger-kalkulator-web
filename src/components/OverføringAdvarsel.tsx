import React, { FunctionComponent, useMemo } from 'react';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import Omsorgsdager from '../types/Omsorgsdager';
import Overføringsdager from '../types/Overføringsdager';
import AlertStripe from 'nav-frontend-alertstriper';
import tekster from '../tekster';

const summerOmsorgsdager = (omsorgsprinsipper: Omsorgsprinsipper): Omsorgsdager =>
  Object.values(omsorgsprinsipper)
    .filter(dag => !!dag)
    .reduce(
      ({ normaldager, koronadager }, omsorgsdag) => ({
        normaldager: normaldager + omsorgsdag.normaldager,
        koronadager: koronadager + omsorgsdag.koronadager,
      }),
      { normaldager: 0, koronadager: 0 },
    );

interface OverføringAdvarselProps {
  omsorgsprinsipper: Omsorgsprinsipper;
  overføringsdager: Overføringsdager;
}

const OverføringAdvarsel: FunctionComponent<OverføringAdvarselProps> = ({ omsorgsprinsipper, overføringsdager }) => {
  const sumOmsorgsdager = useMemo<Omsorgsdager>(() => summerOmsorgsdager(omsorgsprinsipper), [omsorgsprinsipper]);

  const harOverførtFlerNormaldagerEnnTilgjengelig =
    overføringsdager.fordelteNormaldager > sumOmsorgsdager.normaldager - omsorgsprinsipper.grunnrett.normaldager;
  const harOverførtFlerKoronadagerEnnTilgjengelig = overføringsdager.overførteKoronadager > sumOmsorgsdager.koronadager;

  return (
    <>
      {harOverførtFlerNormaldagerEnnTilgjengelig && (
        <AlertStripe type="advarsel">
          {tekster('Resultat.AdvarselNormal', {
            overførteDager: `${overføringsdager.fordelteNormaldager}`,
            tilgjengeligeDager: `${sumOmsorgsdager.normaldager - omsorgsprinsipper.grunnrett.normaldager}`,
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
    </>
  );
};

export default OverføringAdvarsel;
