import stringHash from 'string-hash';
import asap from 'asap';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/* @flow */
/* ::
type ObjectMap = { [id:string]: any };
*/

var UPPERCASE_RE = /([A-Z])/g;

var UPPERCASE_RE_TO_KEBAB = function UPPERCASE_RE_TO_KEBAB(match
/* : string */
) {
  return (
    /* : string */
    "-".concat(match.toLowerCase())
  );
};

var kebabifyStyleName = function kebabifyStyleName(string
/* : string */
)
/* : string */
{
  var result = string.replace(UPPERCASE_RE, UPPERCASE_RE_TO_KEBAB);

  if (result[0] === 'm' && result[1] === 's' && result[2] === '-') {
    return "-".concat(result);
  }

  return result;
};
/**
 * CSS properties which accept numbers but are not in units of "px".
 * Taken from React's CSSProperty.js
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
/**
 * Taken from React's CSSProperty.js
 *
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 * Taken from React's CSSProperty.js
 */


var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
// Taken from React's CSSProperty.js

Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});
var stringifyValue = function stringifyValue(key
/* : string */
, prop
/* : any */
)
/* : string */
{
  if (typeof prop === "number") {
    if (isUnitlessNumber[key]) {
      return "" + prop;
    } else {
      return prop + "px";
    }
  } else {
    return '' + prop;
  }
};
var stringifyAndImportantifyValue = function stringifyAndImportantifyValue(key
/* : string */
, prop
/* : any */
) {
  return (
    /* : string */
    importantify(stringifyValue(key, prop))
  );
}; // Turn a string into a hash string of base-36 values (using letters and numbers)
// eslint-disable-next-line no-unused-vars

var hashString = function hashString(string
/* : string */
, key
/* : ?string */
) {
  return (
    /* string */
    stringHash(string).toString(36)
  );
}; // Hash a javascript object using JSON.stringify. This is very fast, about 3
// microseconds on my computer for a sample object:
// http://jsperf.com/test-hashfnv32a-hash/5
//
// Note that this uses JSON.stringify to stringify the objects so in order for
// this to produce consistent hashes browsers need to have a consistent
// ordering of objects. Ben Alpert says that Facebook depends on this, so we
// can probably depend on this too.

var hashObject = function hashObject(object
/* : ObjectMap */
) {
  return (
    /* : string */
    hashString(JSON.stringify(object))
  );
}; // Given a single style value string like the "b" from "a: b;", adds !important
// to generate "b !important".

var importantify = function importantify(string
/* : string */
) {
  return (
    /* : string */
    // Bracket string character access is very fast, and in the default case we
    // normally don't expect there to be "!important" at the end of the string
    // so we can use this simple check to take an optimized path. If there
    // happens to be a "!" in this position, we follow up with a more thorough
    // check.
    string[string.length - 10] === '!' && string.slice(-11) === ' !important' ? string : "".concat(string, " !important")
  );
};

/* @flow */
var MAP_EXISTS = typeof Map !== 'undefined';

var OrderedElements = /*#__PURE__*/function () {
  /* ::
  elements: {[string]: any};
  keyOrder: string[];
  */
  function OrderedElements() {
    this.elements = {};
    this.keyOrder = [];
  }

  var _proto = OrderedElements.prototype;

  _proto.forEach = function forEach(callback
  /* : (string, any) => void */
  ) {
    for (var i = 0; i < this.keyOrder.length; i++) {
      // (value, key) to match Map's API
      callback(this.elements[this.keyOrder[i]], this.keyOrder[i]);
    }
  };

  _proto.set = function set(key
  /* : string */
  , value
  /* : any */
  , shouldReorder
  /* : ?boolean */
  ) {
    if (!this.elements.hasOwnProperty(key)) {
      this.keyOrder.push(key);
    } else if (shouldReorder) {
      var index = this.keyOrder.indexOf(key);
      this.keyOrder.splice(index, 1);
      this.keyOrder.push(key);
    }

    if (value == null) {
      this.elements[key] = value;
      return;
    }

    if (MAP_EXISTS && value instanceof Map || value instanceof OrderedElements) {
      // We have found a nested Map, so we need to recurse so that all
      // of the nested objects and Maps are merged properly.
      var nested = this.elements.hasOwnProperty(key) ? this.elements[key] : new OrderedElements();
      value.forEach(function (value, key) {
        nested.set(key, value, shouldReorder);
      });
      this.elements[key] = nested;
      return;
    }

    if (!Array.isArray(value) && _typeof(value) === 'object') {
      // We have found a nested object, so we need to recurse so that all
      // of the nested objects and Maps are merged properly.
      var _nested = this.elements.hasOwnProperty(key) ? this.elements[key] : new OrderedElements();

      var keys = Object.keys(value);

      for (var i = 0; i < keys.length; i += 1) {
        _nested.set(keys[i], value[keys[i]], shouldReorder);
      }

      this.elements[key] = _nested;
      return;
    }

    this.elements[key] = value;
  };

  _proto.get = function get(key
  /* : string */
  )
  /* : any */
  {
    return this.elements[key];
  };

  _proto.has = function has(key
  /* : string */
  )
  /* : boolean */
  {
    return this.elements.hasOwnProperty(key);
  };

  _proto.addStyleType = function addStyleType(styleType
  /* : any */
  )
  /* : void */
  {
    var _this = this;

    if (MAP_EXISTS && styleType instanceof Map || styleType instanceof OrderedElements) {
      styleType.forEach(function (value, key) {
        _this.set(key, value, true);
      });
    } else {
      var keys = Object.keys(styleType);

      for (var i = 0; i < keys.length; i++) {
        this.set(keys[i], styleType[keys[i]], true);
      }
    }
  };

  return OrderedElements;
}();

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var capitalizeString_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
});

unwrapExports(capitalizeString_1);

var prefixProperty_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var newStyle = {};
    var requiredPrefixes = prefixProperties[property];
    var capitalizedProperty = (0, _capitalizeString2.default)(property);
    var keys = Object.keys(style);
    for (var i = 0; i < keys.length; i++) {
      var styleProperty = keys[i];
      if (styleProperty === property) {
        for (var j = 0; j < requiredPrefixes.length; j++) {
          newStyle[requiredPrefixes[j] + capitalizedProperty] = style[property];
        }
      }
      newStyle[styleProperty] = style[styleProperty];
    }
    return newStyle;
  }
  return style;
}
});

unwrapExports(prefixProperty_1);

var prefixValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
});

unwrapExports(prefixValue_1);

var addNewValuesOnly_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
});

unwrapExports(addNewValuesOnly_1);

var isObject_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
});

unwrapExports(isObject_1);

var createPrefixer_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;



var _prefixProperty2 = _interopRequireDefault(prefixProperty_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);



var _addNewValuesOnly2 = _interopRequireDefault(addNewValuesOnly_1);



var _isObject2 = _interopRequireDefault(isObject_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  return function prefix(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefix(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        style = (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  };
}
});

var createPrefixer = unwrapExports(createPrefixer_1);

var backgroundClip_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backgroundClip;

// https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#Browser_compatibility
function backgroundClip(property, value) {
  if (typeof value === 'string' && value === 'text') {
    return ['-webkit-text', 'text'];
  }
}
});

var backgroundClip = unwrapExports(backgroundClip_1);

var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;
var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
});

unwrapExports(isPrefixedValue_1);

var calc_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];
function calc(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
});

var calc = unwrapExports(calc_1);

var crossFade_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
});

var crossFade = unwrapExports(crossFade_1);

var cursor_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
});

var cursor = unwrapExports(cursor_1);

var filter_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
});

var filter = unwrapExports(filter_1);

var flex_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
});

var flex = unwrapExports(flex_1);

var flexboxIE_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;
var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msFlexPreferredSize'
  // Full expanded syntax is flex-grow | flex-shrink | flex-basis.
};var flexShorthandMappings = {
  auto: '1 1 auto',
  inherit: 'inherit',
  initial: '0 1 auto',
  none: '0 0 auto',
  unset: 'unset'
};
var isUnitlessNumber = /^\d+(\.\d+)?$/;

function flexboxIE(property, value, style) {
  if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
  if (property === 'flex') {
    // For certain values we can do straight mappings based on the spec
    // for the expansions.
    if (Object.prototype.hasOwnProperty.call(flexShorthandMappings, value)) {
      style.msFlex = flexShorthandMappings[value];
      return;
    }
    // Here we have no direct mapping, so we favor looking for a
    // unitless positive number as that will be the most common use-case.
    if (isUnitlessNumber.test(value)) {
      style.msFlex = value + ' 1 0%';
      return;
    }

    // The next thing we can look for is if there are multiple values.
    var flexValues = value.split(/\s/);
    // If we only have a single value that wasn't a positive unitless
    // or a pre-mapped value, then we can assume it is a unit value.
    switch (flexValues.length) {
      case 1:
        style.msFlex = '1 1 ' + value;
        return;
      case 2:
        // If we have 2 units, then we expect that the first will
        // always be a unitless number and represents flex-grow.
        // The second unit will represent flex-shrink for a unitless
        // value, or flex-basis otherwise.
        if (isUnitlessNumber.test(flexValues[1])) {
          style.msFlex = flexValues[0] + ' ' + flexValues[1] + ' 0%';
        } else {
          style.msFlex = flexValues[0] + ' 1 ' + flexValues[1];
        }
        return;
      default:
        style.msFlex = value;
    }
  }
}
});

var flexboxIE = unwrapExports(flexboxIE_1);

var flexboxOld_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines',
  flexGrow: 'WebkitBoxFlex'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
});

var flexboxOld = unwrapExports(flexboxOld_1);

var gradient_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/gi;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return value.replace(values, function (grad) {
        return prefix + grad;
      });
    });
  }
}
});

var gradient = unwrapExports(gradient_1);

var grid_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = grid;
function isSimplePositionValue(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isComplexSpanValue(value) {
  return typeof value === 'string' && value.includes('/');
}

var alignmentValues = ['center', 'end', 'start', 'stretch'];

var displayValues = {
  'inline-grid': ['-ms-inline-grid', 'inline-grid'],
  grid: ['-ms-grid', 'grid']
};

var propertyConverters = {
  alignSelf: function alignSelf(value, style) {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridRowAlign = value;
    }
  },

  gridColumn: function gridColumn(value, style) {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value;
    } else if (isComplexSpanValue(value)) {
      var _value$split = value.split('/'),
          _value$split2 = _slicedToArray(_value$split, 2),
          start = _value$split2[0],
          end = _value$split2[1];

      propertyConverters.gridColumnStart(+start, style);

      var _end$split = end.split(/ ?span /),
          _end$split2 = _slicedToArray(_end$split, 2),
          maybeSpan = _end$split2[0],
          maybeNumber = _end$split2[1];

      if (maybeSpan === '') {
        propertyConverters.gridColumnEnd(+start + +maybeNumber, style);
      } else {
        propertyConverters.gridColumnEnd(+end, style);
      }
    } else {
      propertyConverters.gridColumnStart(value, style);
    }
  },

  gridColumnEnd: function gridColumnEnd(value, style) {
    var msGridColumn = style.msGridColumn;

    if (isSimplePositionValue(value) && isSimplePositionValue(msGridColumn)) {
      style.msGridColumnSpan = value - msGridColumn;
    }
  },

  gridColumnStart: function gridColumnStart(value, style) {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value;
    }
  },

  gridRow: function gridRow(value, style) {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value;
    } else if (isComplexSpanValue(value)) {
      var _value$split3 = value.split('/'),
          _value$split4 = _slicedToArray(_value$split3, 2),
          start = _value$split4[0],
          end = _value$split4[1];

      propertyConverters.gridRowStart(+start, style);

      var _end$split3 = end.split(/ ?span /),
          _end$split4 = _slicedToArray(_end$split3, 2),
          maybeSpan = _end$split4[0],
          maybeNumber = _end$split4[1];

      if (maybeSpan === '') {
        propertyConverters.gridRowEnd(+start + +maybeNumber, style);
      } else {
        propertyConverters.gridRowEnd(+end, style);
      }
    } else {
      propertyConverters.gridRowStart(value, style);
    }
  },

  gridRowEnd: function gridRowEnd(value, style) {
    var msGridRow = style.msGridRow;

    if (isSimplePositionValue(value) && isSimplePositionValue(msGridRow)) {
      style.msGridRowSpan = value - msGridRow;
    }
  },

  gridRowStart: function gridRowStart(value, style) {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value;
    }
  },

  gridTemplateColumns: function gridTemplateColumns(value, style) {
    style.msGridColumns = value;
  },

  gridTemplateRows: function gridTemplateRows(value, style) {
    style.msGridRows = value;
  },

  justifySelf: function justifySelf(value, style) {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridColumnAlign = value;
    }
  }
};

function grid(property, value, style) {
  if (property === 'display' && value in displayValues) {
    return displayValues[value];
  }

  if (property in propertyConverters) {
    var propertyConverter = propertyConverters[property];
    propertyConverter(value, style);
  }
}
});

var grid = unwrapExports(grid_1);

var imageSet_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
});

var imageSet = unwrapExports(imageSet_1);

var logical_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logical;
var alternativeProps = {
  marginBlockStart: ['WebkitMarginBefore'],
  marginBlockEnd: ['WebkitMarginAfter'],
  marginInlineStart: ['WebkitMarginStart', 'MozMarginStart'],
  marginInlineEnd: ['WebkitMarginEnd', 'MozMarginEnd'],
  paddingBlockStart: ['WebkitPaddingBefore'],
  paddingBlockEnd: ['WebkitPaddingAfter'],
  paddingInlineStart: ['WebkitPaddingStart', 'MozPaddingStart'],
  paddingInlineEnd: ['WebkitPaddingEnd', 'MozPaddingEnd'],
  borderBlockStart: ['WebkitBorderBefore'],
  borderBlockStartColor: ['WebkitBorderBeforeColor'],
  borderBlockStartStyle: ['WebkitBorderBeforeStyle'],
  borderBlockStartWidth: ['WebkitBorderBeforeWidth'],
  borderBlockEnd: ['WebkitBorderAfter'],
  borderBlockEndColor: ['WebkitBorderAfterColor'],
  borderBlockEndStyle: ['WebkitBorderAfterStyle'],
  borderBlockEndWidth: ['WebkitBorderAfterWidth'],
  borderInlineStart: ['WebkitBorderStart', 'MozBorderStart'],
  borderInlineStartColor: ['WebkitBorderStartColor', 'MozBorderStartColor'],
  borderInlineStartStyle: ['WebkitBorderStartStyle', 'MozBorderStartStyle'],
  borderInlineStartWidth: ['WebkitBorderStartWidth', 'MozBorderStartWidth'],
  borderInlineEnd: ['WebkitBorderEnd', 'MozBorderEnd'],
  borderInlineEndColor: ['WebkitBorderEndColor', 'MozBorderEndColor'],
  borderInlineEndStyle: ['WebkitBorderEndStyle', 'MozBorderEndStyle'],
  borderInlineEndWidth: ['WebkitBorderEndWidth', 'MozBorderEndWidth']
};

function logical(property, value, style) {
  if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {
    var alternativePropList = alternativeProps[property];
    for (var i = 0, len = alternativePropList.length; i < len; ++i) {
      style[alternativePropList[i]] = value;
    }
  }
}
});

var logical = unwrapExports(logical_1);

var position_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
});

var position = unwrapExports(position_1);

var sizing_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
});

var sizing = unwrapExports(sizing_1);

/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

var hyphenateStyleName$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': hyphenateStyleName
});

var _hyphenateStyleName = getCjsExportFromNamespace(hyphenateStyleName$1);

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;



var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

unwrapExports(hyphenateProperty_1);

var transition_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
});

var transition = unwrapExports(transition_1);

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];
var staticData = {
  plugins: [backgroundClip, calc, crossFade, cursor, filter, flex, flexboxIE, flexboxOld, gradient, grid, imageSet, logical, position, sizing, transition],
  prefixMap: {
    "transform": wms,
    "transformOrigin": wms,
    "transformOriginX": wms,
    "transformOriginY": wms,
    "backfaceVisibility": w,
    "perspective": w,
    "perspectiveOrigin": w,
    "transformStyle": w,
    "transformOriginZ": w,
    "animation": w,
    "animationDelay": w,
    "animationDirection": w,
    "animationFillMode": w,
    "animationDuration": w,
    "animationIterationCount": w,
    "animationName": w,
    "animationPlayState": w,
    "animationTimingFunction": w,
    "appearance": wmms,
    "userSelect": wmms,
    "fontKerning": w,
    "textEmphasisPosition": wms,
    "textEmphasis": wms,
    "textEmphasisStyle": wms,
    "textEmphasisColor": wms,
    "boxDecorationBreak": wms,
    "clipPath": w,
    "maskImage": wms,
    "maskMode": wms,
    "maskRepeat": wms,
    "maskPosition": wms,
    "maskClip": wms,
    "maskOrigin": wms,
    "maskSize": wms,
    "maskComposite": wms,
    "mask": wms,
    "maskBorderSource": wms,
    "maskBorderMode": wms,
    "maskBorderSlice": wms,
    "maskBorderWidth": wms,
    "maskBorderOutset": wms,
    "maskBorderRepeat": wms,
    "maskBorder": wms,
    "maskType": wms,
    "textDecorationStyle": wm,
    "textDecorationSkip": wm,
    "textDecorationLine": wm,
    "textDecorationColor": wm,
    "filter": w,
    "fontFeatureSettings": wm,
    "breakAfter": wmms,
    "breakBefore": wmms,
    "breakInside": wmms,
    "columnCount": wm,
    "columnFill": wm,
    "columnGap": wm,
    "columnRule": wm,
    "columnRuleColor": wm,
    "columnRuleStyle": wm,
    "columnRuleWidth": wm,
    "columns": wm,
    "columnSpan": wm,
    "columnWidth": wm,
    "writingMode": w,
    "flex": wms,
    "flexBasis": w,
    "flexDirection": wms,
    "flexGrow": w,
    "flexFlow": wms,
    "flexShrink": w,
    "flexWrap": wms,
    "alignContent": w,
    "alignItems": w,
    "alignSelf": w,
    "justifyContent": w,
    "order": w,
    "transitionDelay": w,
    "transitionDuration": w,
    "transitionProperty": w,
    "transitionTimingFunction": w,
    "backdropFilter": w,
    "scrollSnapType": wms,
    "scrollSnapPointsX": wms,
    "scrollSnapPointsY": wms,
    "scrollSnapDestination": wms,
    "scrollSnapCoordinate": wms,
    "shapeImageThreshold": w,
    "shapeImageMargin": w,
    "shapeImageOutside": w,
    "hyphens": wmms,
    "flowInto": wms,
    "flowFrom": wms,
    "regionFragment": wms,
    "textOrientation": w,
    "boxSizing": m,
    "textAlignLast": m,
    "tabSize": m,
    "wrapFlow": ms,
    "wrapThrough": ms,
    "wrapMargin": ms,
    "touchAction": ms,
    "textSizeAdjust": ["ms", "Webkit"],
    "borderImage": w,
    "borderImageOutset": w,
    "borderImageRepeat": w,
    "borderImageSlice": w,
    "borderImageSource": w,
    "borderImageWidth": w
  }
};

var prefixAll = createPrefixer(staticData);
/* ::
import type { SheetDefinition } from './index.js';
type StringHandlers = { [id:string]: Function };
type SelectorCallback = (selector: string) => string[];
export type SelectorHandler = (
    selector: string,
    baseSelector: string,
    callback: SelectorCallback
) => string[] | string | null;
*/

/**
 * `selectorHandlers` are functions which handle special selectors which act
 * differently than normal style definitions. These functions look at the
 * current selector and can generate CSS for the styles in their subtree by
 * calling the callback with a new selector.
 *
 * For example, when generating styles with a base selector of '.foo' and the
 * following styles object:
 *
 *   {
 *     ':nth-child(2n)': {
 *       ':hover': {
 *         color: 'red'
 *       }
 *     }
 *   }
 *
 * when we reach the ':hover' style, we would call our selector handlers like
 *
 *   handler(':hover', '.foo:nth-child(2n)', callback)
 *
 * Since our `pseudoSelectors` handles ':hover' styles, that handler would call
 * the callback like
 *
 *   callback('.foo:nth-child(2n):hover')
 *
 * to generate its subtree `{ color: 'red' }` styles with a
 * '.foo:nth-child(2n):hover' selector. The callback would return an array of CSS
 * rules like
 *
 *   ['.foo:nth-child(2n):hover{color:red !important;}']
 *
 * and the handler would then return that resulting CSS.
 *
 * `defaultSelectorHandlers` is the list of default handlers used in a call to
 * `generateCSS`.
 *
 * @name SelectorHandler
 * @function
 * @param {string} selector: The currently inspected selector. ':hover' in the
 *     example above.
 * @param {string} baseSelector: The selector of the parent styles.
 *     '.foo:nth-child(2n)' in the example above.
 * @param {function} generateSubtreeStyles: A function which can be called to
 *     generate CSS for the subtree of styles corresponding to the selector.
 *     Accepts a new baseSelector to use for generating those styles.
 * @returns {string[] | string | null} The generated CSS for this selector, or
 *     null if we don't handle this selector.
 */

var defaultSelectorHandlers
/* : SelectorHandler[] */
= [// Handle pseudo-selectors, like :hover and :nth-child(3n)
function pseudoSelectors(selector, baseSelector, generateSubtreeStyles) {
  if (selector[0] !== ":") {
    return null;
  }

  return generateSubtreeStyles(baseSelector + selector);
}, // Handle media queries (or font-faces)
function mediaQueries(selector, baseSelector, generateSubtreeStyles) {
  if (selector[0] !== "@") {
    return null;
  } // Generate the styles normally, and then wrap them in the media query.


  var generated = generateSubtreeStyles(baseSelector);
  return ["".concat(selector, "{").concat(generated.join(''), "}")];
}];
/**
 * Generate CSS for a selector and some styles.
 *
 * This function handles the media queries and pseudo selectors that can be used
 * in aphrodite styles.
 *
 * @param {string} selector: A base CSS selector for the styles to be generated
 *     with.
 * @param {Object} styleTypes: A list of properties of the return type of
 *     StyleSheet.create, e.g. [styles.red, styles.blue].
 * @param {Array.<SelectorHandler>} selectorHandlers: A list of selector
 *     handlers to use for handling special selectors. See
 *     `defaultSelectorHandlers`.
 * @param stringHandlers: See `generateCSSRuleset`
 * @param useImportant: See `generateCSSRuleset`
 *
 * To actually generate the CSS special-construct-less styles are passed to
 * `generateCSSRuleset`.
 *
 * For instance, a call to
 *
 *     generateCSS(".foo", [{
 *       color: "red",
 *       "@media screen": {
 *         height: 20,
 *         ":hover": {
 *           backgroundColor: "black"
 *         }
 *       },
 *       ":active": {
 *         fontWeight: "bold"
 *       }
 *     }], defaultSelectorHandlers);
 *
 * with the default `selectorHandlers` will make 5 calls to
 * `generateCSSRuleset`:
 *
 *     generateCSSRuleset(".foo", { color: "red" }, ...)
 *     generateCSSRuleset(".foo:active", { fontWeight: "bold" }, ...)
 *     // These 2 will be wrapped in @media screen {}
 *     generateCSSRuleset(".foo", { height: 20 }, ...)
 *     generateCSSRuleset(".foo:hover", { backgroundColor: "black" }, ...)
 */

var generateCSS = function generateCSS(selector
/* : string */
, styleTypes
/* : SheetDefinition[] */
, selectorHandlers
/* : SelectorHandler[] */
, stringHandlers
/* : StringHandlers */
, useImportant
/* : boolean */
)
/* : string[] */
{
  var merged = new OrderedElements();

  for (var i = 0; i < styleTypes.length; i++) {
    merged.addStyleType(styleTypes[i]);
  }

  var plainDeclarations = new OrderedElements();
  var generatedStyles = []; // TODO(emily): benchmark this to see if a plain for loop would be faster.

  merged.forEach(function (val, key) {
    // For each key, see if one of the selector handlers will handle these
    // styles.
    var foundHandler = selectorHandlers.some(function (handler) {
      var result = handler(key, selector, function (newSelector) {
        return generateCSS(newSelector, [val], selectorHandlers, stringHandlers, useImportant);
      });

      if (result != null) {
        // If the handler returned something, add it to the generated
        // CSS and stop looking for another handler.
        if (Array.isArray(result)) {
          generatedStyles.push.apply(generatedStyles, _toConsumableArray(result));
        } else {
          // eslint-disable-next-line
          console.warn('WARNING: Selector handlers should return an array of rules.' + 'Returning a string containing multiple rules is deprecated.', handler);
          generatedStyles.push("@media all {".concat(result, "}"));
        }

        return true;
      }
    }); // If none of the handlers handled it, add it to the list of plain
    // style declarations.

    if (!foundHandler) {
      plainDeclarations.set(key, val, true);
    }
  });
  var generatedRuleset = generateCSSRuleset(selector, plainDeclarations, stringHandlers, useImportant, selectorHandlers);

  if (generatedRuleset) {
    generatedStyles.unshift(generatedRuleset);
  }

  return generatedStyles;
};
/**
 * Helper method of generateCSSRuleset to facilitate custom handling of certain
 * CSS properties. Used for e.g. font families.
 *
 * See generateCSSRuleset for usage and documentation of paramater types.
 */

var runStringHandlers = function runStringHandlers(declarations
/* : OrderedElements */
, stringHandlers
/* : StringHandlers */
, selectorHandlers
/* : SelectorHandler[] */
)
/* : void */
{
  if (!stringHandlers) {
    return;
  }

  var stringHandlerKeys = Object.keys(stringHandlers);

  for (var i = 0; i < stringHandlerKeys.length; i++) {
    var key = stringHandlerKeys[i];

    if (declarations.has(key)) {
      // A declaration exists for this particular string handler, so we
      // need to let the string handler interpret the declaration first
      // before proceeding.
      //
      // TODO(emily): Pass in a callback which generates CSS, similar to
      // how our selector handlers work, instead of passing in
      // `selectorHandlers` and have them make calls to `generateCSS`
      // themselves. Right now, this is impractical because our string
      // handlers are very specialized and do complex things.
      declarations.set(key, stringHandlers[key](declarations.get(key), selectorHandlers), // Preserve order here, since we are really replacing an
      // unprocessed style with a processed style, not overriding an
      // earlier style
      false);
    }
  }
};

var transformRule = function transformRule(key
/* : string */
, value
/* : string */
, transformValue
/* : function */
) {
  return (
    /* : string */
    "".concat(kebabifyStyleName(key), ":").concat(transformValue(key, value), ";")
  );
};

var arrayToObjectKeysReducer = function arrayToObjectKeysReducer(acc, val) {
  acc[val] = true;
  return acc;
};
/**
 * Generate a CSS ruleset with the selector and containing the declarations.
 *
 * This function assumes that the given declarations don't contain any special
 * children (such as media queries, pseudo-selectors, or descendant styles).
 *
 * Note that this method does not deal with nesting used for e.g.
 * psuedo-selectors or media queries. That responsibility is left to  the
 * `generateCSS` function.
 *
 * @param {string} selector: the selector associated with the ruleset
 * @param {Object} declarations: a map from camelCased CSS property name to CSS
 *     property value.
 * @param {Object.<string, function>} stringHandlers: a map from camelCased CSS
 *     property name to a function which will map the given value to the value
 *     that is output.
 * @param {bool} useImportant: A boolean saying whether to append "!important"
 *     to each of the CSS declarations.
 * @returns {string} A string of raw CSS.
 *
 * Examples:
 *
 *    generateCSSRuleset(".blah", { color: "red" })
 *    -> ".blah{color: red !important;}"
 *    generateCSSRuleset(".blah", { color: "red" }, {}, false)
 *    -> ".blah{color: red}"
 *    generateCSSRuleset(".blah", { color: "red" }, {color: c => c.toUpperCase})
 *    -> ".blah{color: RED}"
 *    generateCSSRuleset(".blah:hover", { color: "red" })
 *    -> ".blah:hover{color: red}"
 */


var generateCSSRuleset = function generateCSSRuleset(selector
/* : string */
, declarations
/* : OrderedElements */
, stringHandlers
/* : StringHandlers */
, useImportant
/* : boolean */
, selectorHandlers
/* : SelectorHandler[] */
)
/* : string */
{
  // Mutates declarations
  runStringHandlers(declarations, stringHandlers, selectorHandlers);
  var originalElements = Object.keys(declarations.elements).reduce(arrayToObjectKeysReducer, Object.create(null)); // NOTE(emily): This mutates handledDeclarations.elements.

  var prefixedElements = prefixAll(declarations.elements);
  var elementNames = Object.keys(prefixedElements);

  if (elementNames.length !== declarations.keyOrder.length) {
    // There are some prefixed values, so we need to figure out how to sort
    // them.
    //
    // Loop through prefixedElements, looking for anything that is not in
    // sortOrder, which means it was added by prefixAll. This means that we
    // need to figure out where it should appear in the sortOrder.
    for (var i = 0; i < elementNames.length; i++) {
      if (!originalElements[elementNames[i]]) {
        // This element is not in the sortOrder, which means it is a prefixed
        // value that was added by prefixAll. Let's try to figure out where it
        // goes.
        var originalStyle = void 0;

        if (elementNames[i][0] === 'W') {
          // This is a Webkit-prefixed style, like "WebkitTransition". Let's
          // find its original style's sort order.
          originalStyle = elementNames[i][6].toLowerCase() + elementNames[i].slice(7);
        } else if (elementNames[i][1] === 'o') {
          // This is a Moz-prefixed style, like "MozTransition". We check
          // the second character to avoid colliding with Ms-prefixed
          // styles. Let's find its original style's sort order.
          originalStyle = elementNames[i][3].toLowerCase() + elementNames[i].slice(4);
        } else {
          // if (elementNames[i][1] === 's') {
          // This is a Ms-prefixed style, like "MsTransition".
          originalStyle = elementNames[i][2].toLowerCase() + elementNames[i].slice(3);
        }

        if (originalStyle && originalElements[originalStyle]) {
          var originalIndex = declarations.keyOrder.indexOf(originalStyle);
          declarations.keyOrder.splice(originalIndex, 0, elementNames[i]);
        } else {
          // We don't know what the original style was, so sort it to
          // top. This can happen for styles that are added that don't
          // have the same base name as the original style.
          declarations.keyOrder.unshift(elementNames[i]);
        }
      }
    }
  }

  var transformValue = useImportant === false ? stringifyValue : stringifyAndImportantifyValue;
  var rules = [];

  for (var _i = 0; _i < declarations.keyOrder.length; _i++) {
    var key = declarations.keyOrder[_i];
    var value = prefixedElements[key];

    if (Array.isArray(value)) {
      // inline-style-prefixer returns an array when there should be
      // multiple rules for the same key. Here we flatten to multiple
      // pairs with the same key.
      for (var j = 0; j < value.length; j++) {
        rules.push(transformRule(key, value[j], transformValue));
      }
    } else {
      rules.push(transformRule(key, value, transformValue));
    }
  }

  if (rules.length) {
    return "".concat(selector, "{").concat(rules.join(""), "}");
  } else {
    return "";
  }
};

/* ::
import type { SheetDefinition, SheetDefinitions } from './index.js';
import type { MaybeSheetDefinition } from './exports.js';
import type { SelectorHandler } from './generate.js';
*/
// The current <style> tag we are inserting into, or null if we haven't
// inserted anything yet. We could find this each time using
// `document.querySelector("style[data-aphrodite"])`, but holding onto it is
// faster.

var styleTag
/* : ?HTMLStyleElement */
= null; // Inject a set of rules into a <style> tag in the head of the document. This
// will automatically create a style tag and then continue to use it for
// multiple injections. It will also use a style tag with the `data-aphrodite`
// tag on it if that exists in the DOM. This could be used for e.g. reusing the
// same style tag that server-side rendering inserts.

var injectStyleTag = function injectStyleTag(cssRules
/* : string[] */
) {
  if (styleTag == null) {
    // Try to find a style tag with the `data-aphrodite` attribute first.
    styleTag = document.querySelector("style[data-aphrodite]")
    /* : any */
    ; // If that doesn't work, generate a new style tag.

    if (styleTag == null) {
      // Taken from
      // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
      var head = document.head || document.getElementsByTagName('head')[0];
      styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.setAttribute("data-aphrodite", "");
      head.appendChild(styleTag);
    }
  } // $FlowFixMe


  var sheet = styleTag.styleSheet || styleTag.sheet
  /* : any */
  ;

  if (process.env.NODE_ENV === 'production' && sheet.insertRule) {
    var numRules = sheet.cssRules.length;
    cssRules.forEach(function (rule) {
      try {
        sheet.insertRule(rule, numRules);
        numRules += 1;
      } catch (e) {// The selector for this rule wasn't compatible with the browser
      }
    });
  } else {
    styleTag.innerText = (styleTag.innerText || '') + cssRules.join('');
  }
}; // Custom handlers for stringifying CSS values that have side effects
// (such as fontFamily, which can cause @font-face rules to be injected)


var stringHandlers = {
  // With fontFamily we look for objects that are passed in and interpret
  // them as @font-face rules that we need to inject. The value of fontFamily
  // can either be a string (as normal), an object (a single font face), or
  // an array of objects and strings.
  fontFamily: function fontFamily(val) {
    if (Array.isArray(val)) {
      var nameMap = {};
      val.forEach(function (v) {
        nameMap[fontFamily(v)] = true;
      });
      return Object.keys(nameMap).join(",");
    } else if (_typeof(val) === "object") {
      injectStyleOnce(val.src, "@font-face", [val], false);
      return "\"".concat(val.fontFamily, "\"");
    } else {
      return val;
    }
  },
  // With animationName we look for an object that contains keyframes and
  // inject them as an `@keyframes` block, returning a uniquely generated
  // name. The keyframes object should look like
  //  animationName: {
  //    from: {
  //      left: 0,
  //      top: 0,
  //    },
  //    '50%': {
  //      left: 15,
  //      top: 5,
  //    },
  //    to: {
  //      left: 20,
  //      top: 20,
  //    }
  //  }
  // TODO(emily): `stringHandlers` doesn't let us rename the key, so I have
  // to use `animationName` here. Improve that so we can call this
  // `animation` instead of `animationName`.
  animationName: function animationName(val, selectorHandlers) {
    if (Array.isArray(val)) {
      return val.map(function (v) {
        return animationName(v, selectorHandlers);
      }).join(",");
    } else if (_typeof(val) === "object") {
      // Generate a unique name based on the hash of the object. We can't
      // just use the hash because the name can't start with a number.
      // TODO(emily): this probably makes debugging hard, allow a custom
      // name?
      var name = "keyframe_".concat(hashObject(val)); // Since keyframes need 3 layers of nesting, we use `generateCSS` to
      // build the inner layers and wrap it in `@keyframes` ourselves.

      var finalVal = "@keyframes ".concat(name, "{"); // TODO see if we can find a way where checking for OrderedElements
      // here is not necessary. Alternatively, perhaps we should have a
      // utility method that can iterate over either a plain object, an
      // instance of OrderedElements, or a Map, and then use that here and
      // elsewhere.

      if (val instanceof OrderedElements) {
        val.forEach(function (valVal, valKey) {
          finalVal += generateCSS(valKey, [valVal], selectorHandlers, stringHandlers, false).join('');
        });
      } else {
        Object.keys(val).forEach(function (key) {
          finalVal += generateCSS(key, [val[key]], selectorHandlers, stringHandlers, false).join('');
        });
      }

      finalVal += '}';
      injectGeneratedCSSOnce(name, [finalVal]);
      return name;
    } else {
      return val;
    }
  }
}; // This is a map from Aphrodite's generated class names to `true` (acting as a
// set of class names)

var alreadyInjected = {}; // This is the buffer of styles which have not yet been flushed.

var injectionBuffer
/* : string[] */
= []; // A flag to tell if we are already buffering styles. This could happen either
// because we scheduled a flush call already, so newly added styles will
// already be flushed, or because we are statically buffering on the server.

var isBuffering = false;

var injectGeneratedCSSOnce = function injectGeneratedCSSOnce(key, generatedCSS) {
  var _injectionBuffer;

  if (alreadyInjected[key]) {
    return;
  }

  if (!isBuffering) {
    // We should never be automatically buffering on the server (or any
    // place without a document), so guard against that.
    if (typeof document === "undefined") {
      throw new Error("Cannot automatically buffer without a document");
    } // If we're not already buffering, schedule a call to flush the
    // current styles.


    isBuffering = true;
    asap(flushToStyleTag);
  }

  (_injectionBuffer = injectionBuffer).push.apply(_injectionBuffer, _toConsumableArray(generatedCSS));

  alreadyInjected[key] = true;
};

var injectStyleOnce = function injectStyleOnce(key
/* : string */
, selector
/* : string */
, definitions
/* : SheetDefinition[] */
, useImportant
/* : boolean */
) {
  var selectorHandlers
  /* : SelectorHandler[] */
  = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (alreadyInjected[key]) {
    return;
  }

  var generated = generateCSS(selector, definitions, selectorHandlers, stringHandlers, useImportant);
  injectGeneratedCSSOnce(key, generated);
};
var reset = function reset() {
  injectionBuffer = [];
  alreadyInjected = {};
  isBuffering = false;
  styleTag = null;
};
var resetInjectedStyle = function resetInjectedStyle(key
/* : string */
) {
  delete alreadyInjected[key];
};
var getBufferedStyles = function getBufferedStyles() {
  return injectionBuffer;
};
var startBuffering = function startBuffering() {
  if (isBuffering) {
    throw new Error("Cannot buffer while already buffering");
  }

  isBuffering = true;
};

var flushToArray = function flushToArray() {
  isBuffering = false;
  var ret = injectionBuffer;
  injectionBuffer = [];
  return ret;
};

var flushToString = function flushToString() {
  return flushToArray().join('');
};
var flushToStyleTag = function flushToStyleTag() {
  var cssRules = flushToArray();

  if (cssRules.length > 0) {
    injectStyleTag(cssRules);
  }
};
var getRenderedClassNames = function getRenderedClassNames()
/* : string[] */
{
  return Object.keys(alreadyInjected);
};
var addRenderedClassNames = function addRenderedClassNames(classNames
/* : string[] */
) {
  classNames.forEach(function (className) {
    alreadyInjected[className] = true;
  });
};

var isValidStyleDefinition = function isValidStyleDefinition(def
/* : Object */
) {
  return "_definition" in def && "_name" in def && "_len" in def;
};

var processStyleDefinitions = function processStyleDefinitions(styleDefinitions
/* : any[] */
, classNameBits
/* : string[] */
, definitionBits
/* : Object[] */
, length
/* : number */
)
/* : number */
{
  for (var i = 0; i < styleDefinitions.length; i += 1) {
    // Filter out falsy values from the input, to allow for
    // `css(a, test && c)`
    if (styleDefinitions[i]) {
      if (Array.isArray(styleDefinitions[i])) {
        // We've encountered an array, so let's recurse
        length += processStyleDefinitions(styleDefinitions[i], classNameBits, definitionBits, length);
      } else if (isValidStyleDefinition(styleDefinitions[i])) {
        classNameBits.push(styleDefinitions[i]._name);
        definitionBits.push(styleDefinitions[i]._definition);
        length += styleDefinitions[i]._len;
      } else {
        throw new Error("Invalid Style Definition: Styles should be defined using the StyleSheet.create method.");
      }
    }
  }

  return length;
};
/**
 * Inject styles associated with the passed style definition objects, and return
 * an associated CSS class name.
 *
 * @param {boolean} useImportant If true, will append !important to generated
 *     CSS output. e.g. {color: red} -> "color: red !important".
 * @param {(Object|Object[])[]} styleDefinitions style definition objects, or
 *     arbitrarily nested arrays of them, as returned as properties of the
 *     return value of StyleSheet.create().
 */


var injectAndGetClassName = function injectAndGetClassName(useImportant
/* : boolean */
, styleDefinitions
/* : MaybeSheetDefinition[] */
, selectorHandlers
/* : SelectorHandler[] */
)
/* : string */
{
  var classNameBits = [];
  var definitionBits = []; // Mutates classNameBits and definitionBits and returns a length which we
  // will append to the hash to decrease the chance of hash collisions.

  var length = processStyleDefinitions(styleDefinitions, classNameBits, definitionBits, 0); // Break if there aren't any valid styles.

  if (classNameBits.length === 0) {
    return "";
  }

  var className;

  if (process.env.NODE_ENV === 'production') {
    className = classNameBits.length === 1 ? "_".concat(classNameBits[0]) : "_".concat(hashString(classNameBits.join())).concat((length % 36).toString(36));
  } else {
    className = classNameBits.join("-o_O-");
  }

  injectStyleOnce(className, ".".concat(className), definitionBits, useImportant, selectorHandlers);
  return className;
};

/* ::
import type { SelectorHandler } from './generate.js';
export type SheetDefinition = { [id:string]: any };
export type SheetDefinitions = SheetDefinition | SheetDefinition[];
type RenderFunction = () => string;
type Extension = {
    selectorHandler: SelectorHandler
};
export type MaybeSheetDefinition = SheetDefinition | false | null | void
*/

var unminifiedHashFn = function unminifiedHashFn(str
/* : string */
, key
/* : string */
) {
  return "".concat(key, "_").concat(hashString(str));
}; // StyleSheet.create is in a hot path so we want to keep as much logic out of it
// as possible. So, we figure out which hash function to use once, and only
// switch it out via minify() as necessary.
//
// This is in an exported function to make it easier to test.


var initialHashFn = function initialHashFn() {
  return process.env.NODE_ENV === 'production' ? hashString : unminifiedHashFn;
};
var hashFn = initialHashFn();
var StyleSheet = {
  create: function create(sheetDefinition
  /* : SheetDefinition */
  )
  /* : Object */
  {
    var mappedSheetDefinition = {};
    var keys = Object.keys(sheetDefinition);

    for (var i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      var val = sheetDefinition[key];
      var stringVal = JSON.stringify(val);
      mappedSheetDefinition[key] = {
        _len: stringVal.length,
        _name: hashFn(stringVal, key),
        _definition: val
      };
    }

    return mappedSheetDefinition;
  },
  rehydrate: function rehydrate() {
    var renderedClassNames
    /* : string[] */
    = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    addRenderedClassNames(renderedClassNames);
  }
};
/**
 * Utilities for using Aphrodite server-side.
 *
 * This can be minified out in client-only bundles by replacing `typeof window`
 * with `"object"`, e.g. via Webpack's DefinePlugin:
 *
 *   new webpack.DefinePlugin({
 *     "typeof window": JSON.stringify("object")
 *   })
 */

var StyleSheetServer = typeof window !== 'undefined' ? null : {
  renderStatic: function renderStatic(renderFunc
  /* : RenderFunction */
  ) {
    reset();
    startBuffering();
    var html = renderFunc();
    var cssContent = flushToString();
    return {
      html: html,
      css: {
        content: cssContent,
        renderedClassNames: getRenderedClassNames()
      }
    };
  }
};
/**
 * Utilities for using Aphrodite in tests.
 *
 * Not meant to be used in production.
 */

var StyleSheetTestUtils = process.env.NODE_ENV === 'production' ? null : {
  /**
  * Prevent styles from being injected into the DOM.
  *
  * This is useful in situations where you'd like to test rendering UI
  * components which use Aphrodite without any of the side-effects of
  * Aphrodite happening. Particularly useful for testing the output of
  * components when you have no DOM, e.g. testing in Node without a fake DOM.
  *
  * Should be paired with a subsequent call to
  * clearBufferAndResumeStyleInjection.
  */
  suppressStyleInjection: function suppressStyleInjection() {
    reset();
    startBuffering();
  },

  /**
  * Opposite method of preventStyleInject.
  */
  clearBufferAndResumeStyleInjection: function clearBufferAndResumeStyleInjection() {
    reset();
  },

  /**
  * Returns a string of buffered styles which have not been flushed
  *
  * @returns {string}  Buffer of styles which have not yet been flushed.
  */
  getBufferedStyles: function getBufferedStyles$1() {
    return getBufferedStyles();
  }
};
/**
 * Generate the Aphrodite API exports, with given `selectorHandlers` and
 * `useImportant` state.
 */

function makeExports(useImportant
/* : boolean */
) {
  var selectorHandlers
  /* : SelectorHandler[] */
  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSelectorHandlers;
  return {
    StyleSheet: _objectSpread2({}, StyleSheet, {
      /**
       * Returns a version of the exports of Aphrodite (i.e. an object
       * with `css` and `StyleSheet` properties) which have some
       * extensions included.
       *
       * @param {Array.<Object>} extensions: An array of extensions to
       *     add to this instance of Aphrodite. Each object should have a
       *     single property on it, defining which kind of extension to
       *     add.
       * @param {SelectorHandler} [extensions[].selectorHandler]: A
       *     selector handler extension. See `defaultSelectorHandlers` in
       *     generate.js.
       *
       * @returns {Object} An object containing the exports of the new
       *     instance of Aphrodite.
       */
      extend: function extend(extensions
      /* : Extension[] */
      ) {
        var extensionSelectorHandlers = extensions // Pull out extensions with a selectorHandler property
        .map(function (extension) {
          return extension.selectorHandler;
        }) // Remove nulls (i.e. extensions without a selectorHandler property).
        .filter(function (handler) {
          return handler;
        });
        return makeExports(useImportant, selectorHandlers.concat(extensionSelectorHandlers));
      }
    }),
    StyleSheetServer: StyleSheetServer,
    StyleSheetTestUtils: StyleSheetTestUtils,
    minify: function minify(shouldMinify
    /* : boolean */
    ) {
      hashFn = shouldMinify ? hashString : unminifiedHashFn;
    },
    css: function css()
    /* : MaybeSheetDefinition[] */
    {
      for (var _len = arguments.length, styleDefinitions = new Array(_len), _key = 0; _key < _len; _key++) {
        styleDefinitions[_key] = arguments[_key];
      }

      return injectAndGetClassName(useImportant, styleDefinitions, selectorHandlers);
    },
    flushToStyleTag: flushToStyleTag,
    injectAndGetClassName: injectAndGetClassName,
    defaultSelectorHandlers: defaultSelectorHandlers,
    reset: reset,
    resetInjectedStyle: resetInjectedStyle
  };
}

export { makeExports as m };
