import Søker from './Søker';
import Barn from './Barn';
import Forelder from './Forelder';

interface OmsorgsdagerForm {
  søker?: Søker;
  barn: Barn[];
  foreldre: Forelder[];
}

export default OmsorgsdagerForm;
