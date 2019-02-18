
exports.parse = content => {
  function kv(prop){
    return prop
    .split(/;/g)
    .filter(x => !!x.trim())
    .reduce((obj, rule) => {
      const [ k, v ] = rule.split(':');
      obj[k] = v;
      return obj;
    }, {});
  }
  return content
    .replace(/\n/g, '')
    .replace(/\}/g, '}\n')
    .split(/\n/g)
    .filter(x => !!x.trim())
    .map(line => {
      const tokens = line.match(/^(.+)\{(.+)\}$/);
      let [ _, selector, content ] = tokens;
      selector = selector.split(',');
      content = content.replace(/\s/g, '');
      return {
        raw: _, selector, content, props: kv(content)
      };
  });
};