var expect = chai.expect;

describe('monster', function() {

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

  describe('#set', function() {

    it('should set string', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal(value);
    });

    it('should set number', function() {
      var name = 'name';
      var value = 1;
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal(value.toString());
    });

    it('should set object', function() {
      var name = 'name';
      var value = { test: 1 };
      monster.set(name, value);
      expect(get(name)).to.equal('{"v":{"test":1}}');
    });

    it('should set array', function(){
      var name = 'name';
      var value = ['some','value'];
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal('{"v":["some","value"]}');
    });
    it('should set undefined', function(){
      var name = 'name';
      var value = undefined;
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal('undefined');
    });
    it('should set null', function(){
      var name = 'name';
      var value = null;
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal('{"v":null}');
    });
    it('should set string edge case string starting with "["', function(){
      var name = 'name';
      var value = "[something edgy";
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal('%5Bsomething%20edgy');
    });
    it('should set string edge case string starting with "{"', function(){
      var name = 'name';
      var value = '{something edgy';
      var days = 1;
      monster.set(name, value, days);
      expect(get(name)).to.equal('%7Bsomething%20edgy');
    });
    it('should try to set an object in a browser that dont have window.JSON', function(){
      var name = 'name';
      var value = {some:"value"};
      var days = 1;
      var aux = window.JSON;
      delete window.JSON;
      expect(function(){
        monster.set(name, value, days);
      }).to.throw();
      window.JSON = aux;
    });
  });

  describe('#get', function() {
    it('should get string', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value);
    });

    it('should get number', function() {
      var name = 'name';
      var value = 1;
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value.toString());
    });

    it('should get object', function() {
      var name = 'name';
      var value = { test: 1 };
      monster.set(name, value);
      expect(monster.get(name)).to.eql(value);
    });

    it('should get array', function(){
      var name = 'name';
      var value = ['some','value'];
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.eql(value);
    });
    it('should get undefined', function(){
      var name = 'name';
      var value = undefined;
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value);
    });
    it('should get null', function(){
      var name = 'name';
      var value = null;
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value);
    });
    it('should get string edge case string starting with "["', function(){
      var name = 'name';
      var value = "[something edgy";
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value);
    });
    it('should get string edge case string starting with "{"', function(){
      var name = 'name';
      var value = '{something edgy';
      var days = 1;
      monster.set(name, value, days);
      expect(monster.get(name)).to.equal(value);
    });
    it('should try to set an object in a browser that dont have window.JSON', function(){
      var name = 'name';
      var value = {some:"value"};
      var days = 1;
      var aux = window.JSON;
      delete window.JSON;
      expect(function(){
        monster.set(name, value, days);
      }).to.throw();
      window.JSON = aux;
    });
  });

  describe('#remove', function() {
    it('should remove cookie', function() {
      var name = 'name';
      var value = 'value';
      var days = 1;
      monster.set(name, value, days);
      monster.remove(name);
      expect(get(name)).to.equal(null);
    });
  });
});
