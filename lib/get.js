function get(name) {
  const nameEQ = `${name}=`;
  const split = document.cookie.split(';');
  let value = null;

  split.forEach(item => {
    const cleaned = item.trim();

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

export default get;
