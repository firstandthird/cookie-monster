if (typeof window === 'undefined') {
  var assert = require('assert');
}

suite('monster', function() {

  //basic function to get cookie value
  var get = function(cookieName) {
    var cs = document.cookie.split(';');
    for (var i = 0, c = cs.length; i < c; i++) {
      var cookie = cs[i].split('=');
      var name = cookie[0].replace(/ /g, '');
      var value = cookie[1];
      if (cookieName == name) {
        return value;
      }
    }
    return null;
  };

  suite('#set', function() {

    test('should set string', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), value);
    });

    test('should set number', function() {
      var name = 'name';
      var value = 1;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), value.toString());
    });

    test('should set object', function() {
      var name = 'name';
      var value = { test: 1 };
      monster.set(name, value);
      assert.equal(get(name), '{"v":{"test":1}}');
    });

    test('should set array', function(){
      var name = 'name';
      var value = ['some','value'];
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), '{"v":["some","value"]}');
    });

    test('should set undefined', function(){
      var name = 'name';
      var value = undefined;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), 'undefined');
    });

    test('should set null', function(){
      var name = 'name';
      var value = null;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), '{"v":null}');
    });

    test('should set string edge case string starting with "["', function(){
      var name = 'name';
      var value = "[something edgy";
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), '%5Bsomething%20edgy');
    });

    test('should set string edge case string starting with "{"', function(){
      var name = 'name';
      var value = '{something edgy';
      var days = 1;
      monster.set(name, value, days);
      assert.equal(get(name), '%7Bsomething%20edgy');
    });

    test('should try to set an object in a browser that dont have window.JSON', function(){
      var name = 'name';
      var value = {some:"value"};
      var days = 1;
      var aux = window.JSON;
      window.JSON = null;
      //assert.throws(function(){
        //monster.set(name, value, days);
      //});
      window.JSON = aux;
    });
  });

  suite('#get', function() {
    test('should get string', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value);
    });

    test('should get number', function() {
      var name = 'name';
      var value = 1;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value.toString());
    });

    test('should get object', function() {
      var name = 'name';
      var value = { test: 1 };
      monster.set(name, value);
      assert.deepEqual(monster.get(name), value);
    });

    test('should get array', function(){
      var name = 'name';
      var value = ['some','value'];
      var days = 1;
      monster.set(name, value, days);
      assert.deepEqual(monster.get(name), value);
    });
    test('should get undefined', function(){
      var name = 'name';
      var value = undefined;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value);
    });
    test('should get null', function(){
      var name = 'name';
      var value = null;
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value);
    });
    test('should get string edge case string starting with "["', function(){
      var name = 'name';
      var value = "[something edgy";
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value);
    });
    test('should get string edge case string starting with "{"', function(){
      var name = 'name';
      var value = '{something edgy';
      var days = 1;
      monster.set(name, value, days);
      assert.equal(monster.get(name), value);
    });
    test('should try to set an object in a browser that dont have window.JSON', function(){
      var name = 'name';
      var value = {some:"value"};
      var days = 1;
      var aux = window.JSON;
      window.JSON = null;
      assert.throws(function(){
        monster.set(name, value, days);
      });
      window.JSON = aux;
    });
  });

  suite('#remove', function() {
    test('should remove cookie', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      monster.remove(name);
      assert.equal(get(name), null);
    });
  });
});
