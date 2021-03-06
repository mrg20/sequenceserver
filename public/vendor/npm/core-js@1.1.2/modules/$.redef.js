/* */ 
var global = require('./$.global'),
    hide = require('./$.hide'),
    SRC = require('./$.uid')('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);
require('./$.core').inspectSource = function(it) {
  return $toString.call(it);
};
(module.exports = function(O, key, val, safe) {
  if (typeof val == 'function') {
    hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (!('name' in val))
      val.name = key;
  }
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe)
      delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
