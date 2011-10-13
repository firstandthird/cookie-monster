module('Monster', { });

test('set', function() {
  var name = 'name';
  var value = 'value';
  var days = 1;
  monster.set(name, value, days);
  equal(monster.get(name), value);
});
test('remove', function() {
  var name = 'name';
  var value = 'value';
  var days = 1;
  monster.set(name, value, days);
  monster.remove(name);
  equal(monster.get(name), null);
});
