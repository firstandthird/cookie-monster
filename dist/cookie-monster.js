(function (exports) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function set(name, value) {
  var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var secure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var date = new Date();
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  var expires = '';
  var valueToUse = '';
  var secureFlag = '';

  if (days) {
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  if (type === 'object' && type !== 'undefined') {
    valueToUse = encodeURIComponent(JSON.stringify({ value: value }));
  } else {
    valueToUse = encodeURIComponent(value);
  }

  if (secure) {
    secureFlag = '; secure';
  }

  document.cookie = name + '=' + valueToUse + expires + '; path=' + path + secureFlag;
}

function get(name) {
  var nameEQ = name + '=';
  var split = document.cookie.split(';');
  var value = null;

  split.forEach(function (item) {
    var cleaned = item.trim();

    if (cleaned.indexOf(nameEQ) === 0) {
      value = decodeURIComponent(cleaned.substring(nameEQ.length, cleaned.length));

      if (value.substring(0, 1) === '{') {
        try {
          value = JSON.parse(value);
          value = value.value || null;
        } catch (e) {
          return;
        }
      }

      if (value === 'undefined') {
        value = undefined;
      }
    }
  });

  return value;
}

function remove(name) {
  set(name, '', -1);
}

function increment(name, days) {
  var value = get(name) || 0;
  set(name, ~~value + 1, days);
}

function decrement(name, days) {
  var value = get(name) || 0;
  set(name, ~~value - 1, days);
}

var cookieMonster_default = {
  set: set,
  get: get,
  remove: remove,
  increment: increment,
  decrement: decrement
};

exports.set = set;
exports.get = get;
exports.remove = remove;
exports.increment = increment;
exports.decrement = decrement;
exports['default'] = cookieMonster_default;

}((this.FirstandthirdCookieMonster = this.FirstandthirdCookieMonster || {})));

//# sourceMappingURL=cookie-monster.js.map