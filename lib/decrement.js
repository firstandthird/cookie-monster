import get from './get';
import set from './set';

function decrement(name, days) {
  const value = get(name) || 0;
  set(name, ~~value - 1, days);
}

export default decrement;
