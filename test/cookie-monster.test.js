/* global suite,test,monster */
var cookieName = 'cookiemonster';

suite('monster', function() {

  //basic function to get cookie value
  var get = function(cookieName) {
    var cs = document.cookie.split(';');
    for (var i = 0, c = cs.length; i < c; i++) {
      var cookie = cs[i].split('=');
      var name = cookie[0].replace(/ /g, '');
      var value = cookie[1];
      if (cookieName == name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  setup(function(done) {
    setTimeout(function() {
      document.cookie = cookieName + "=0; expires=-1; path=/";
      done();
    }, 10);
  });

  suite('#set', function() {

    test('should set string', function() {
      var value = 'value';
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), value);
    });

    test('should set string with comma', function() {
      var value = 'value, value2';
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(decodeURIComponent(get(cookieName)), value);
    });

    test('should set number', function() {
      var value = 1;
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), value.toString());
    });

    test('should set object', function() {
      var value = { test: 1 };
      monster.set(cookieName, value);
      assert.equal(get(cookieName), '{"v":{"test":1}}');
    });

    test('should set array', function(){
      var value = ['some','value'];
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), '{"v":["some","value"]}');
    });

    test('should set null', function(){
      var value = null;
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), '{"v":null}');
    });

    test('should set string edge case string starting with "["', function(){
      var value = "[something edgy";
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), '[something edgy');
    });

    test('should set string edge case string starting with "{"', function(){
      var value = '{something edgy';
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(get(cookieName), '{something edgy');
    });

    test('should try to set an object in a browser that dont have window.JSON', function(){
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
      var value = 'value';
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(monster.get(cookieName), value);
    });

    test('should get number', function() {
      var value = 1;
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(monster.get(cookieName), value.toString());
    });

    test('should get object', function() {
      var value = { test: 1 };
      monster.set(cookieName, value);
      assert.deepEqual(monster.get(cookieName), value);
    });

    test('should get array', function(){
      var value = ['some','value'];
      var days = 1;
      monster.set(cookieName, value, days);
      assert.deepEqual(monster.get(cookieName), value);
    });

    test('should get object with a comma in it', function() {
      var value = { location: 'Hermosa Beach, CA' };
      var days = 1;
      monster.set(cookieName, value, days);
      assert.deepEqual(monster.get(cookieName), value);
    });

    test('should get null', function(){
      var value = null;
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(monster.get(cookieName), value);
    });

    test('should get string edge case string starting with "["', function(){
      var value = "[something edgy";
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(monster.get(cookieName), value);
    });

    test('should get string edge case string starting with "{"', function(){
      var value = '{something edgy';
      var days = 1;
      monster.set(cookieName, value, days);
      assert.equal(monster.get(cookieName), value);
    });

    test('should try to set an object in a browser that dont have window.JSON', function(){
      var value = {some:"value"};
      var days = 1;
      var aux = window.JSON;
      window.JSON = null;
      assert.throws(function(){
        monster.set(cookieName, value, days);
      });
      window.JSON = aux;
    });
  });

  suite('#remove', function() {
    test('should remove cookie', function() {
      var value = 'value';
      var days = 1;
      monster.set(cookieName, value, days);
      monster.remove(cookieName);
      assert.equal(get(cookieName), null);
    });
  });

  suite('#increment', function() {
    test('should set cookie value to 1 if cookie doesnt exist', function() {
      monster.increment(cookieName);
      assert.equal(get(cookieName), 1);
    });

    test('should increment if cookie exists', function() {
      monster.increment(cookieName);
      assert.equal(get(cookieName), 1);
      monster.increment(cookieName);
      assert.equal(get(cookieName), 2);
    });
  });

  suite('#decrement', function() {
    test('should set cookie value to -1 if cookie doesnt exist', function() {
      monster.decrement(cookieName);
      assert.equal(get(cookieName), -1);
    });


    test('should decrement cookie if cookie exists', function() {
      monster.set(cookieName, 2);
      monster.decrement(cookieName);
      assert.equal(get(cookieName), 1);
    });
  });
});
