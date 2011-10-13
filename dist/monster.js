/*!
  * Cookie Monster - A javascript cookie library 
  * v0.0.1
  * https://github.com/jgallen23/cookie-monster
  * copyright JGA 2011
  * MIT License
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('monster', function() {

var monster = function() {
  return {
    set: function(name, value, days, path) {
      var date = new Date(),
          expires = '';
      path = path || "/";
      if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      document.cookie = name + "=" + value + expires + "; path=" + path;
    },
    get: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    remove: function(name) {
      this.set(name, "", -1);
    }
  };
}();

  return monster;
});
