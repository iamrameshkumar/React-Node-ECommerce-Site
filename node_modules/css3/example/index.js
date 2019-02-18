const fs = require('fs');
const css = require('..');

const content = fs.readFileSync(__dirname + '/demo.css', 'utf8');

const rules = css.parse(content);

console.log(rules);

