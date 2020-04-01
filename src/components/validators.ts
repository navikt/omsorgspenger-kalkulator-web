import tekster from '../tekster';

export const kunPositiveHeltall = (value: number): string | null => {
  if (!value) {
    return null;
  }
  if (value < 0) {
    return tekster('ForeldreInput.Feil.Minustall');
  }
  if (value % 1 !== 0) {
    return tekster('ForeldreInput.Feil.Desimaltall');
  }
  return null;
};
