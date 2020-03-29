import Omsorgsdager from '../types/Omsorgsdager';
import Barn from '../types/Barn';
import Omsorgsprinsipper from '../types/Omsorgsprinsipper';

export const GRUNNRETTSDAGER_1_2_BARN: number = 10;
export const GRUNNRETTSDAGER_3_ELLER_FLER_BARN: number = 15;

export const KRONISK_SYKT_BARN_DAGER: number = 10;
export const ALENEOMSORG_KRONISK_SYKT_BARN_DAGER: number = KRONISK_SYKT_BARN_DAGER * 2;

export const ALENEOMSORGDAGER: number = 10; // Eller midlertidig aleneomsorg

export const grunnrettsdager = (barn: Barn[]): Omsorgsdager => {
  const antallTellendeBarn = barn.filter(b => b.alder === 'under12' || b.kroniskSykt).length;
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

export const aleneomsorgsdager = (barn: Barn[]) => {
  return barn.filter(b => b.alder === 'under12' || b.kroniskSykt).some(b => b.søkerHarAleneomsorgFor)
    ? { normaldager: ALENEOMSORGDAGER, koronadager: ALENEOMSORGDAGER }
    : { normaldager: 0, koronadager: 0 };
};

export const omsorgsdager = (barn: Barn[]): Omsorgsprinsipper | null => {
  if (!barn || !barn.length) {
    return null;
  }
  const barnMinimumUtfylt: Barn[] = barn.filter(b => b.alder);
  if (!barnMinimumUtfylt.length) {
    return null;
  }

  return {
    grunnrett: grunnrettsdager(barnMinimumUtfylt),
    kroniskSykt: kroniskSyktDager(barnMinimumUtfylt),
    aleneomsorg: aleneomsorgsdager(barnMinimumUtfylt),
    aleneomsorgKroniskSyke: aleneomsorgKroniskSykeDager(barnMinimumUtfylt),
  };
};
