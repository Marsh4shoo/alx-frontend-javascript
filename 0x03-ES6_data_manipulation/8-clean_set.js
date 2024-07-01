
export default function cleanSet(set, startString) {
  if (startString === '' || startString === undefined) {
    return '';
  }
  const result = [];
  set.forEach(value => {
    if (value.startsWith(startString)) {
      result.push(value.slice(startString.length));
    }
  });
  return result.join('-');
}

