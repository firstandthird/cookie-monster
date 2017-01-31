import set from './set';

function remove(name) {
  set(name, '', -1);
}

export default remove;
