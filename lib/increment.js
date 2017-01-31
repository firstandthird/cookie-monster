import get from './get';
import set from './set';

function increment(name, days) {
  const value = get(name) || 0;
  set(name, ~~value + 1, days);
}

export default increment;
