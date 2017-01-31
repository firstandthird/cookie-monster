function set(name, value, days = null, path = '/', secure = false) {
  const date = new Date();
  const type = typeof(value);

  let expires = '';
  let valueToUse = '';
  let secureFlag = '';

  if (days) {
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  if (type === 'object' && type !== 'undefined') {
    valueToUse = encodeURIComponent(JSON.stringify({ value }));
  } else {
    valueToUse = encodeURIComponent(value);
  }

  if (secure) {
    secureFlag = '; secure';
  }

  document.cookie = `${name}=${valueToUse}${expires}; path=${path}${secureFlag}`;
}

export default set;
