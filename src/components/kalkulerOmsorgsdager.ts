import Omsorgsdager from '../types/Omsorgsdager';
import Barn from '../types/Barn';

const GRUNNRETTSDAGER_1_2_BARN: number = 10;
const GRUNNRETTSDAGER_3_ELLER_FLER_BARN: number = 15;

export const grunnrettsdager = (barn: Barn[]): Omsorgsdager | null => {
  if (!barn || !barn.length) {
    return null;
  }
  const antallTellendeBarn = barn.filter(b => b.alder === 'under12' || b.kroniskSykt).length;
  if (antallTellendeBarn === 0) {
    return null;
  }
  if (antallTellendeBarn < 3) {
    return { normaldager: GRUNNRETTSDAGER_1_2_BARN, koronadager: GRUNNRETTSDAGER_1_2_BARN };
  }
  return { normaldager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN, koronadager: GRUNNRETTSDAGER_3_ELLER_FLER_BARN };
};
