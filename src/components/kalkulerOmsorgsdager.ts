import Omsorgsdager from '../types/Omsorgsdager';
import Barn from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import Forelder from '../types/Forelder';
import { kunPositiveHeltall } from './validators';

export const GRUNNRETTSDAGER_1_2_BARN: number = 10;
export const GRUNNRETTSDAGER_3_ELLER_FLER_BARN: number = 15;

export const KRONISK_SYKT_BARN_DAGER: number = 10;
export const ALENEOMSORG_KRONISK_SYKT_BARN_DAGER: number = KRONISK_SYKT_BARN_DAGER * 2;

export const ALENEOMSORGDAGER_1_2_BARN: number = 10; // Eller midlertidig aleneomsorg
export const ALENEOMSORGDAGER_3_ELLER_FLERE_BARN: number = 15; // Eller midlertidig aleneomsorg

const harOmsorg = (barn: Barn): boolean => !!(barn.alder === 'under12' || barn.kroniskSykt);

export const grunnrettsdager = (barn: Barn[]): Omsorgsdager => {
  const antallTellendeBarn = barn.filter(harOmsorg).length;
  if (antallTellendeBarn === 0) {
    return { normaldager: 0, koronadager: 0 };
  }
  if (antallTellendeBarn < 3) {
    return { normaldager: GRUNNRETTSDAGER_1_2_BARN, koronadager: GRUNNRETTSDAGER_1_2_BARN };
  }
  return { normaldager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN, koronadager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN };
};

export const kroniskSyktDager = (barn: Barn[]): Omsorgsdager => {
  const kroniskOgDeltOmsorg = barn.filter(b => b.kroniskSykt && !b.søkerHarAleneomsorgFor);
  const dager = KRONISK_SYKT_BARN_DAGER * kroniskOgDeltOmsorg.length;

  return { normaldager: dager, koronadager: dager };
};

export const aleneomsorgKroniskSykeDager = (barn: Barn[]): Omsorgsdager => {
  const kroniskOgAleneomsorg = barn.filter(b => b.kroniskSykt && b.søkerHarAleneomsorgFor);
  const dager = ALENEOMSORG_KRONISK_SYKT_BARN_DAGER * kroniskOgAleneomsorg.length;

  return { normaldager: dager, koronadager: dager };
};

export const aleneomsorgsdager = (barn: Barn[]): Omsorgsdager => {
  const antallTellendeBarn = barn.filter(harOmsorg).filter(b => b.søkerHarAleneomsorgFor).length;

  if (antallTellendeBarn === 0) {
    return { normaldager: 0, koronadager: 0 };
  }
  if (antallTellendeBarn < 3) {
    return { normaldager: ALENEOMSORGDAGER_1_2_BARN, koronadager: ALENEOMSORGDAGER_1_2_BARN };
  }
  return { normaldager: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN, koronadager: ALENEOMSORGDAGER_3_ELLER_FLERE_BARN };
};

const bareGyldigeDager = (forelder: Forelder): boolean =>
  [
    forelder.normaldager?.dagerTildelt,
    forelder.normaldager?.dagerFått,
    forelder.koronadager?.dagerFått,
    forelder.koronadager?.dagerTildelt,
  ].every(dager => !kunPositiveHeltall(dager || 0));

const overføringsdager = (foreldre: Forelder[], grunnrettsdager: number): Omsorgsdager => {
  const { koronadager, mottatteNormaldager, fordelteNormaldager } = foreldre.filter(bareGyldigeDager).reduce(
    (tmpDager, forelder) => ({
      koronadager:
        tmpDager.koronadager + (forelder.koronadager?.dagerFått || 0) - (forelder.koronadager?.dagerTildelt || 0),
      mottatteNormaldager: tmpDager.mottatteNormaldager + (forelder.normaldager?.dagerFått || 0),
      fordelteNormaldager: tmpDager.fordelteNormaldager + (forelder.normaldager?.dagerTildelt || 0),
    }),
    {
      koronadager: 0,
      mottatteNormaldager: 0,
      fordelteNormaldager: 0,
    },
  );

  const dagerMottattEtterGrunnretten =
    mottatteNormaldager > grunnrettsdager ? mottatteNormaldager - grunnrettsdager : 0;

  return {
    koronadager,
    normaldager: dagerMottattEtterGrunnretten - fordelteNormaldager,
  };
};

export const omsorgsdager = ({ barn = [], foreldre }: OmsorgsdagerForm): Omsorgsprinsipper | null => {
  const barnMinimumUtfylt: Barn[] = barn.filter(b => b.alder);

  const grunnrett = grunnrettsdager(barnMinimumUtfylt);

  return {
    grunnrett,
    kroniskSykt: kroniskSyktDager(barnMinimumUtfylt),
    aleneomsorg: aleneomsorgsdager(barnMinimumUtfylt),
    aleneomsorgKroniskSyke: aleneomsorgKroniskSykeDager(barnMinimumUtfylt),
    overføringsdager: overføringsdager(foreldre, grunnrett.normaldager),
  };
};
