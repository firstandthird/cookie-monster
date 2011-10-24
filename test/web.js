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
test('set object', function(){
  var name = 'name';
  var value = {some:'value'};
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
test('set array', function(){
  var name = 'name';
  var value = ['some','value'];
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
test('set undefined', function(){
  var name = 'name';
  var value = undefined;
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
test('set null', function(){
  var name = 'name';
  var value = null;
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
test('set string edge case string starting with "["', function(){
  var name = 'name';
  var value = "[something edgy";
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
test('set string edge case string starting with "{"', function(){
  var name = 'name';
  var value = '{something edgy';
  var days = 1;
  monster.set(name, value, days);
  deepEqual(monster.get(name), value);
});
