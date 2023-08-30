import { atom, useAtomValue, useSetAtom, useAtom, Provider } from 'jotai';
export { atom, useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useCallback, useMemo, memo } from 'react';
import { nanoid } from 'nanoid';
export { nanoid } from 'nanoid';
export { isHotkeyPressed, useHotkeys } from 'react-hotkeys-hook';
import { createStore } from '@udecode/zustood';
export { createStore } from '@udecode/zustood';
import { isDefined, IS_APPLE } from '@udecode/utils';
import { useDeepCompareMemo } from 'use-deep-compare';
import { queryNode, isAncestor, getAboveNode, isStartPoint, isExpanded, getMarks, removeEditorMark, withoutNormalizing, isElement, isText, normalizeEditor, createTEditor, someNode, setElements } from '@udecode/slate';
import { withHistory } from 'slate-history';
import { withReact, DefaultElement, useSlateStatic, useSlate, Editable, Slate } from 'slate-react';
import clsx from 'clsx';
import { isComposing } from '@udecode/slate-react';
import { Range, Node as Node$1, Text, createEditor as createEditor$1, Element } from 'slate';

/* eslint-disable react-hooks/rules-of-hooks */

const capitalizeFirstLetter = (str = '') => str.length ? str[0].toUpperCase() + str.slice(1) : '';

const getStoreIndex = (name = '') => name.length ? `${name}Store` : 'store';

const getUseStoreIndex = (name = '') => `use${capitalizeFirstLetter(name)}Store`;

/**
 * Create an atom store from an initial value.
 * Each property will have a getter and setter.
 *
 * @example
 * const { exampleStore, useExampleStore } = createAtomStore({ count: 1, say: 'hello' }, { name: 'example' as const })
 * const [count, setCount] = useExampleStore().use.count()
 * const say = useExampleStore().get.say()
 * const setSay = useExampleStore().set.say()
 * setSay('world')
 * const countAtom = exampleStore.atom.count
 */
const createAtomStore = (initialState, {
  scope: storeScope,
  initialStore,
  name = ''
} = {}) => {
  const useInitialStoreIndex = getUseStoreIndex(initialStore === null || initialStore === void 0 ? void 0 : initialStore.name);
  const initialStoreIndex = getStoreIndex(initialStore === null || initialStore === void 0 ? void 0 : initialStore.name);
  const useStoreIndex = getUseStoreIndex(name);
  const storeIndex = getStoreIndex(name);
  const getAtoms = initialStore ? initialStore[useInitialStoreIndex]().get : {};
  const setAtoms = initialStore ? initialStore[useInitialStoreIndex]().set : {};
  const useAtoms = initialStore ? initialStore[useInitialStoreIndex]().use : {};
  const atoms = initialStore ? initialStore[initialStoreIndex].atom : {};
  Object.keys(initialState).forEach(key => {
    const atomConfig = atom(initialState[key]);
    atoms[key] = atomConfig;

    getAtoms[key] = scope => {
      return useAtomValue(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };

    setAtoms[key] = scope => {
      return useSetAtom(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };

    useAtoms[key] = scope => {
      return useAtom(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };
  });
  const api = {
    [useStoreIndex]: scope => {
      if (scope) {
        const getAtomsHook = { ...getAtoms
        };
        const setAtomsHook = { ...setAtoms
        };
        const useAtomsHook = { ...useAtoms
        };
        Object.keys(getAtomsHook).forEach(key => {
          const get = getAtomsHook[key];

          getAtomsHook[key] = _scope => {
            var _ref;

            return get((_ref = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref !== void 0 ? _ref : storeScope);
          };
        });
        Object.keys(setAtomsHook).forEach(key => {
          const set = setAtomsHook[key];

          setAtomsHook[key] = _scope => {
            var _ref2;

            return set((_ref2 = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref2 !== void 0 ? _ref2 : storeScope);
          };
        });
        Object.keys(useAtomsHook).forEach(key => {
          const use = useAtomsHook[key];

          useAtomsHook[key] = _scope => {
            var _ref3;

            return use((_ref3 = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref3 !== void 0 ? _ref3 : storeScope);
          };
        });
        return {
          get: getAtomsHook,
          set: setAtomsHook,
          use: useAtomsHook
        };
      }

      return {
        get: getAtoms,
        set: setAtoms,
        use: useAtoms
      };
    },
    [storeIndex]: {
      atom: atoms
    },
    name
  };
  return { ...api,
    [storeIndex]: { ...api[storeIndex],
      scope: storeScope,
      extend: (extendedState, options) => createAtomStore(extendedState, {
        scope: storeScope,
        initialStore: api,
        ...options
      })
    }
  };
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

const JotaiProvider = Provider;

const SCOPE_ELEMENT = 'element';
const {
  elementStore,
  useElementStore
} = createAtomStore({
  element: null
}, {
  name: 'element'
});
const ElementProviderChild = ({
  element,
  scope,
  children
}) => {
  const setElement = useElementStore().set.element(scope);
  const setGlobalElement = useElementStore().set.element(SCOPE_ELEMENT);
  useEffect(() => {
    setElement(element);
    setGlobalElement(element);
  }, [element, setElement, setGlobalElement]);
  return children;
};
/**
 * Global and scoped provider above element.
 */

const ElementProvider = ({
  element,
  scope,
  children,
  ...props
}) => /*#__PURE__*/React.createElement(JotaiProvider, _extends({
  initialValues: [[elementStore.atom.element, element]],
  scope: SCOPE_ELEMENT
}, props), /*#__PURE__*/React.createElement(JotaiProvider, _extends({
  initialValues: [[elementStore.atom.element, element]],
  scope: scope
}, props), /*#__PURE__*/React.createElement(ElementProviderChild, {
  element: element,
  scope: scope
}, children)));

/**
 * Get the element by plugin key.
 * If no element is found in the context, it will return an empty object.
 */

const useElement = (pluginKey = SCOPE_ELEMENT) => {
  const value = useElementStore().get.element(pluginKey);

  if (!value) {
    console.warn(`The \`useElement(pluginKey)\` hook must be used inside the node component's context`);
    return {};
  }

  return value;
};

const DefaultLeaf = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}) => /*#__PURE__*/React.createElement("span", _extends({}, attributes, props), children);

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$f = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$f.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$f.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$e.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$d = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$9.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty$1 = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty$1) {
    _defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$3;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$5 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$4 = '[object Object]',
    regexpTag$3 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$3 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] =
typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] =
typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] =
typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap$1;

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]',
    objectTag$3 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$4 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$3 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
    (_Map && getTag(new _Map) != mapTag$4) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$4) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$3 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$3;
        case mapCtorString: return mapTag$4;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$4;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$3.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    mapTag$3 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$2 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$3 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return _cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$2:
      return _cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$3:
      return new Ctor;

    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);

    case regexpTag$2:
      return _cloneRegExp(object);

    case setTag$3:
      return new Ctor;

    case symbolTag$3:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$2;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */
var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

var isMap_1 = isMap;

/** `Object#toString` result references. */
var setTag$2 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$2;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */
var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

var isSet_1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$2 = 1,
    CLONE_FLAT_FLAG$1 = 2,
    CLONE_SYMBOLS_FLAG$2 = 4;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$2 = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] =
cloneableTags[boolTag$1] = cloneableTags[dateTag$1] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag$1] =
cloneableTags[numberTag$1] = cloneableTags[objectTag$2] =
cloneableTags[regexpTag$1] = cloneableTags[setTag$1] =
cloneableTags[stringTag$1] = cloneableTags[symbolTag$2] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$2,
      isFlat = bitmask & CLONE_FLAT_FLAG$1,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$1 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn_1 : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice;

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
}

var _parent = parent;

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = _castPath(path, object);
  object = _parent(object, path);
  return object == null || delete object[_toKey(last_1(path))];
}

var _baseUnset = baseUnset;

/** `Object#toString` result references. */
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject$1;

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject_1(value) ? undefined : value;
}

var _customOmitClone = customOmitClone;

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? _baseFlatten(array, 1) : [];
}

var flatten_1 = flatten;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty$1 ? identity_1 : function(func, string) {
  return _defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return _setToString(_overRest(func, undefined, flatten_1), func + '');
}

var _flatRest = flatRest;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = _flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = _arrayMap(paths, function(path) {
    path = _castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  _copyObject(object, _getAllKeysIn(object), result);
  if (isDeep) {
    result = _baseClone(result, CLONE_DEEP_FLAG$1 | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG$1, _customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    _baseUnset(result, paths[length]);
  }
  return result;
});

var omit_1 = omit;

/**
 * Store where the keys are event names and the values are editor ids.
 */
const eventEditorStore = createStore('event-editor')({
  blur: null,
  focus: null,
  last: null
});
const eventEditorActions = eventEditorStore.set;
const eventEditorSelectors = eventEditorStore.get;
const useEventEditorSelectors = eventEditorStore.use;

const PLATE_SCOPE = 'plate';
const GLOBAL_PLATE_SCOPE = Symbol('global-plate');
const plateIdAtom = atom(PLATE_SCOPE);
/**
 * Get the closest `Plate` id.
 */

const usePlateId = () => useAtom(plateIdAtom, GLOBAL_PLATE_SCOPE)[0];
const createPlateStore = ({
  decorate = null,
  editor = null,
  id,
  isRendered = false,
  keyDecorate = '1',
  keyEditor = '1',
  keySelection = '1',
  onChange = null,
  editorRef = null,
  plugins = [],
  rawPlugins = [],
  readOnly = false,
  renderElement = null,
  renderLeaf = null,
  value = null,
  ...state
} = {}) => {
  const stores = createAtomStore({
    decorate,
    editor,
    id,
    isRendered,
    keyDecorate,
    keyEditor,
    keySelection,
    onChange,
    editorRef,
    plugins,
    rawPlugins,
    readOnly,
    renderElement,
    renderLeaf,
    value,
    ...state
  }, {
    scope: PLATE_SCOPE,
    name: 'plate'
  });
  return {
    plateStore: stores.plateStore,
    usePlateStore: _id => {
      const closestId = usePlateId(); // get targeted store if id defined or if the store is found

      if (isDefined(_id) || stores.usePlateStore(_id).get.id(_id)) {
        return stores.usePlateStore(_id);
      }

      return stores.usePlateStore(closestId);
    }
  };
};
const {
  plateStore,
  usePlateStore
} = createPlateStore();
const usePlateSelectors = id => usePlateStore(id).get;
const usePlateActions = id => usePlateStore(id).set;
const usePlateStates = id => usePlateStore(id).use;

const useUpdatePlateKey = (key, id) => {
  const set = usePlateActions(id)[key]();
  return useCallback(() => {
    set(nanoid());
  }, [set]);
};

const useRedecorate = id => {
  const updateDecorate = useUpdatePlateKey('keyDecorate', id);
  return useCallback(() => {
    updateDecorate();
  }, [updateDecorate]);
};

/**
 * Recursively apply an operation to children nodes with a query.
 */
const applyDeepToNodes = ({
  node,
  path = [],
  source,
  apply,
  query
}) => {
  const entry = [node, path];

  if (queryNode(entry, query)) {
    if (source instanceof Function) {
      apply(node, source());
    } else {
      apply(node, source);
    }
  }

  if (!isAncestor(node)) return;
  node.children.forEach((child, index) => {
    applyDeepToNodes({
      node: child,
      path: path.concat([index]),
      source,
      apply,
      query
    });
  });
};

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq_1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}

var toPlainObject_1 = toPlainObject;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray_1(srcValue),
        isBuff = !isArr && isBuffer_1(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;
      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      }
      else if (!isObject_1(objValue) || isFunction_1(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    stack || (stack = new _Stack);
    if (isObject_1(srcValue)) {
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}

var _baseMerge = baseMerge;

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_1(objValue) && isObject_1(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    _baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

var _customDefaultsMerge = customDefaultsMerge;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner;

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = _createAssigner(function(object, source, srcIndex, customizer) {
  _baseMerge(object, source, srcIndex, customizer);
});

var mergeWith_1 = mergeWith;

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = _baseRest(function(args) {
  args.push(undefined, _customDefaultsMerge);
  return _apply(mergeWith_1, undefined, args);
});

var defaultsDeep_1 = defaultsDeep;

/**
 * Recursive deep merge of each plugin from `overrideByKey`
 * into plugin with same key (plugin > plugin.plugins).
 */
const overridePluginsByKey = (plugin, overrideByKey = {}, nested) => {
  var _overrideByKey$plugin;

  if (overrideByKey[plugin.key]) {
    const {
      plugins: pluginOverridesPlugins,
      then: pluginOverridesThen,
      ...pluginOverrides
    } = overrideByKey[plugin.key]; // override plugin

    plugin = defaultsDeep_1(pluginOverrides, plugin);

    if (!nested) {
      // concat new pluginOverrides.plugins to plugin.plugins
      pluginOverridesPlugins === null || pluginOverridesPlugins === void 0 ? void 0 : pluginOverridesPlugins.forEach(pOverrides => {
        if (!plugin.plugins) plugin.plugins = [];
        const found = plugin.plugins.find(p => p.key === pOverrides.key);
        if (!found) plugin.plugins.push(pOverrides);
      });
    }
  }

  if (plugin.plugins) {
    // override plugin.plugins
    plugin.plugins = plugin.plugins.map(p => overridePluginsByKey(p, overrideByKey, true));
  }

  const {
    then
  } = plugin;

  if (then) {
    if (typeof plugin._thenReplaced === 'undefined') {
      plugin._thenReplaced = 0;
    } // Limit the number of times that `then` can be replaced.
    // otherwise we will accidentally create a stack overflow.
    // There is probably a better solution for this.


    if (plugin._thenReplaced < 3) {
      // override plugin.then
      plugin.then = (editor, p) => {
        const pluginThen = {
          key: plugin.key,
          ...then(editor, p)
        };
        return defaultsDeep_1(overridePluginsByKey(pluginThen, overrideByKey), pluginThen);
      };

      plugin._thenReplaced++;
    }
  } else if ((_overrideByKey$plugin = overrideByKey[plugin.key]) !== null && _overrideByKey$plugin !== void 0 && _overrideByKey$plugin.then) {
    // TODO: recursvie
    plugin.then = overrideByKey[plugin.key].then;
  }

  return plugin;
};

/**
 * Create plugin factory with a default plugin.
 * - first param is the default plugin.
 * - the only required property of the default plugin is `key`.
 * - returns a plugin factory:
 *   - first param `override` can be used to (deeply) override the default plugin.
 *   - second param `overrideByKey` can be used to (deeply) override by key a nested plugin (in plugin.plugins).
 */

const createPluginFactory = defaultPlugin => (override, overrideByKey = {}) => {
  overrideByKey[defaultPlugin.key] = override;
  return overridePluginsByKey({ ...defaultPlugin
  }, overrideByKey);
};

const KEY_DESERIALIZE_AST = 'deserializeAst';
/**
 * Enables support for deserializing inserted content from Slate Ast format to Slate format
 * while apply a small bug fix.
 */

const createDeserializeAstPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_AST,
  editor: {
    insertData: {
      format: 'application/x-slate-fragment',
      getFragment: ({
        data
      }) => {
        const decoded = decodeURIComponent(window.atob(data));
        let parsed;

        try {
          parsed = JSON.parse(decoded);
        } catch (err) {}

        return parsed;
      }
    }
  }
});

const getBlockAbove = (editor, options = {}) => getAboveNode(editor, { ...options,
  block: true
});

const isSelectionAtBlockStart = (editor, options) => {
  var _getBlockAbove;

  const {
    selection
  } = editor;
  if (!selection) return false;
  const path = (_getBlockAbove = getBlockAbove(editor, options)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  if (!path) return false;
  return isStartPoint(editor, selection.focus, path) || isExpanded(editor.selection) && isStartPoint(editor, selection.anchor, path);
};

const removeSelectionMark = editor => {
  const marks = getMarks(editor);
  if (!marks) return; // remove all marks

  Object.keys(marks).forEach(key => {
    removeEditorMark(editor, key);
  });
};

const KEY_EDITOR_PROTOCOL = 'editorProtocol';
const withEditorProtocol = editor => {
  const {
    deleteBackward,
    deleteForward,
    deleteFragment
  } = editor;

  const resetMarks = () => {
    if (isSelectionAtBlockStart(editor)) {
      removeSelectionMark(editor);
    }
  };

  editor.deleteBackward = unit => {
    deleteBackward(unit);
    resetMarks();
  };

  editor.deleteForward = unit => {
    deleteForward(unit);
    resetMarks();
  };

  editor.deleteFragment = direction => {
    deleteFragment(direction);
    resetMarks();
  };

  return editor;
};
const createEditorProtocolPlugin = createPluginFactory({
  key: KEY_EDITOR_PROTOCOL,
  withOverrides: withEditorProtocol
});

const KEY_EVENT_EDITOR = 'event-editor';
const createEventEditorPlugin = createPluginFactory({
  key: KEY_EVENT_EDITOR,
  handlers: {
    onFocus: editor => () => {
      eventEditorActions.focus(editor.id);
    },
    onBlur: editor => () => {
      const focus = eventEditorSelectors.focus();

      if (focus === editor.id) {
        eventEditorActions.focus(null);
      }

      eventEditorActions.blur(editor.id);
    }
  }
});

const withTHistory = editor => withHistory(editor);
/**
 * @see {@link withHistory}
 */

const createHistoryPlugin = createPluginFactory({
  key: 'history',
  withOverrides: withTHistory
});

const KEY_INLINE_VOID = 'inline-void';
/**
 * Merge and register all the inline types and void types from the plugins and options,
 * using `editor.isInline` and `editor.isVoid`
 */

const withInlineVoid = editor => {
  const {
    isInline
  } = editor;
  const {
    isVoid
  } = editor;
  const inlineTypes = [];
  const voidTypes = [];
  editor.plugins.forEach(plugin => {
    if (plugin.isInline) {
      inlineTypes.push(plugin.type);
    }

    if (plugin.isVoid) {
      voidTypes.push(plugin.type);
    }
  });

  editor.isInline = element => {
    return inlineTypes.includes(element.type) ? true : isInline(element);
  };

  editor.isVoid = element => voidTypes.includes(element.type) ? true : isVoid(element);

  return editor;
};
/**
 * @see {@link withInlineVoid}
 */

const createInlineVoidPlugin = createPluginFactory({
  key: KEY_INLINE_VOID,
  withOverrides: withInlineVoid
});

/**
 * Get all plugins having a defined `inject.pluginsByKey[plugin.key]`.
 * It includes `plugin` itself.
 */
const getInjectedPlugins = (editor, plugin) => {
  const injectedPlugins = [];
  [...editor.plugins].reverse().forEach(p => {
    var _p$inject$pluginsByKe;

    const injectedPlugin = (_p$inject$pluginsByKe = p.inject.pluginsByKey) === null || _p$inject$pluginsByKe === void 0 ? void 0 : _p$inject$pluginsByKe[plugin.key];
    if (injectedPlugin) injectedPlugins.push(injectedPlugin);
  });
  return [plugin, ...injectedPlugins];
};

/**
 * Is the plugin disabled by another plugin.
 */
const pipeInsertDataQuery = (plugins, {
  data,
  dataTransfer
}) => plugins.every(p => {
  var _p$editor, _p$editor$insertData;

  const query = (_p$editor = p.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.query;
  return !query || query({
    data,
    dataTransfer
  });
});

/**
 * Pipe preInsert then insertFragment.
 */
const pipeInsertFragment = (editor, injectedPlugins, {
  fragment,
  ...options
}) => {
  withoutNormalizing(editor, () => {
    injectedPlugins.some(p => {
      var _p$editor, _p$editor$insertData, _p$editor$insertData$;

      return ((_p$editor = p.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : (_p$editor$insertData$ = _p$editor$insertData.preInsert) === null || _p$editor$insertData$ === void 0 ? void 0 : _p$editor$insertData$.call(_p$editor$insertData, fragment, options)) === true;
    });
    editor.insertFragment(fragment);
  });
};

/**
 * Pipe editor.insertData.transformData
 */
const pipeTransformData = (plugins, {
  data,
  dataTransfer
}) => {
  plugins.forEach(p => {
    var _p$editor, _p$editor$insertData;

    const transformData = (_p$editor = p.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.transformData;
    if (!transformData) return;
    data = transformData(data, {
      dataTransfer
    });
  });
  return data;
};

/**
 * Pipe editor.insertData.transformFragment
 */
const pipeTransformFragment = (plugins, {
  fragment,
  ...options
}) => {
  plugins.forEach(p => {
    var _p$editor, _p$editor$insertData;

    const transformFragment = (_p$editor = p.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.transformFragment;
    if (!transformFragment) return;
    fragment = transformFragment(fragment, options);
  });
  return fragment;
};

const withInsertData = editor => {
  const {
    insertData
  } = editor;

  editor.insertData = dataTransfer => {
    const inserted = [...editor.plugins].reverse().some(plugin => {
      var _fragment;

      const insertDataOptions = plugin.editor.insertData;
      if (!insertDataOptions) return false;
      const injectedPlugins = getInjectedPlugins(editor, plugin);
      const {
        format,
        getFragment
      } = insertDataOptions;
      if (!format) return false;
      let data = dataTransfer.getData(format);
      if (!data) return;

      if (!pipeInsertDataQuery(injectedPlugins, {
        data,
        dataTransfer
      })) {
        return false;
      }

      data = pipeTransformData(injectedPlugins, {
        data,
        dataTransfer
      });
      let fragment = getFragment === null || getFragment === void 0 ? void 0 : getFragment({
        data,
        dataTransfer
      });
      if (!((_fragment = fragment) !== null && _fragment !== void 0 && _fragment.length)) return false;
      fragment = pipeTransformFragment(injectedPlugins, {
        fragment,
        data,
        dataTransfer
      });
      if (!fragment.length) return false;
      pipeInsertFragment(editor, injectedPlugins, {
        fragment,
        data,
        dataTransfer
      });
      return true;
    });
    if (inserted) return;
    insertData(dataTransfer);
  };

  return editor;
};
const KEY_INSERT_DATA = 'insertData';
const createInsertDataPlugin = createPluginFactory({
  key: KEY_INSERT_DATA,
  withOverrides: withInsertData
});

const ELEMENT_DEFAULT = 'p';

const KEY_NODE_FACTORY = 'nodeFactory';
const createNodeFactoryPlugin = createPluginFactory({
  key: KEY_NODE_FACTORY,
  withOverrides: editor => {
    editor.blockFactory = node => ({
      type: getPluginType(editor, ELEMENT_DEFAULT),
      children: [{
        text: ''
      }],
      ...node
    });

    editor.childrenFactory = () => [editor.blockFactory()];

    return editor;
  }
});

const KEY_PREV_SELECTION = 'prevSelection';
const createPrevSelectionPlugin = createPluginFactory({
  key: KEY_PREV_SELECTION,
  handlers: {
    onKeyDown: editor => e => {
      // React 16.x needs this event to be persistented due to it's event pooling implementation.
      // https://reactjs.org/docs/legacy-event-pooling.html
      e.persist();
      editor.currentKeyboardEvent = e;
    }
  },
  withOverrides: editor => {
    const {
      apply
    } = editor;

    editor.apply = operation => {
      if (operation.type === 'set_selection') {
        const {
          properties
        } = operation;
        editor.prevSelection = properties;
        apply(operation);
        editor.currentKeyboardEvent = null;
        return;
      }

      apply(operation);
    };

    return editor;
  }
});

const withTReact = editor => withReact(editor);

/**
 * @see {@link withReact}
 */

const createReactPlugin = createPluginFactory({
  key: 'react',
  withOverrides: withTReact
});

const CARRIAGE_RETURN = '\u000D';
const LINE_FEED = '\u000A';
const NO_BREAK_SPACE = '\u00A0';
const SPACE = '\u0020';
const TAB = '\u0009';
const ZERO_WIDTH_SPACE = '\u200B';

/**
 * Get `editor.pluginsByKey`
 */
const getPluginsByKey = editor => {
  var _ref;

  return (_ref = editor === null || editor === void 0 ? void 0 : editor.pluginsByKey) !== null && _ref !== void 0 ? _ref : {};
};

/**
 * Get plugin options by plugin key.
 */

const getPlugin = (editor, key) => {
  var _getPluginsByKey$key;

  return (_getPluginsByKey$key = getPluginsByKey(editor)[key]) !== null && _getPluginsByKey$key !== void 0 ? _getPluginsByKey$key : {
    key
  };
};

/**
 * Get plugin type option by plugin key.
 */

const getPluginType = (editor, key) => {
  var _ref, _getPlugin$type;

  return (_ref = (_getPlugin$type = getPlugin(editor, key).type) !== null && _getPlugin$type !== void 0 ? _getPlugin$type : key) !== null && _ref !== void 0 ? _ref : '';
};

const isInlineNode = editor => node => isText(node) || isElement(node) && editor.isInline(node);

const makeBlockLazy = type => () => ({
  type,
  children: []
});

const hasDifferentChildNodes = (descendants, isInline) => {
  return descendants.some((descendant, index, arr) => {
    const prevDescendant = arr[index - 1];

    if (index !== 0) {
      return isInline(descendant) !== isInline(prevDescendant);
    }

    return false;
  });
};
/**
 * Handles 3rd constraint: "Block nodes can only contain other blocks, or inline and text nodes."
 */


const normalizeDifferentNodeTypes = (descendants, isInline, makeDefaultBlock) => {
  const hasDifferentNodes = hasDifferentChildNodes(descendants, isInline);
  const {
    fragment
  } = descendants.reduce((memo, node) => {
    if (hasDifferentNodes && isInline(node)) {
      let block = memo.precedingBlock;

      if (!block) {
        block = makeDefaultBlock();
        memo.precedingBlock = block;
        memo.fragment.push(block);
      }

      block.children.push(node);
    } else {
      memo.fragment.push(node);
      memo.precedingBlock = null;
    }

    return memo;
  }, {
    fragment: [],
    precedingBlock: null
  });
  return fragment;
};
/**
 * Handles 1st constraint: "All Element nodes must contain at least one Text descendant."
 */


const normalizeEmptyChildren = descendants => {
  if (!descendants.length) {
    return [{
      text: ''
    }];
  }

  return descendants;
};

const normalize = (descendants, isInline, makeDefaultBlock) => {
  descendants = normalizeEmptyChildren(descendants);
  descendants = normalizeDifferentNodeTypes(descendants, isInline, makeDefaultBlock);
  descendants = descendants.map(node => {
    if (isElement(node)) {
      return { ...node,
        children: normalize(node.children, isInline, makeDefaultBlock)
      };
    }

    return node;
  });
  return descendants;
};
/**
 * Normalize the descendants to a valid document fragment.
 */


const normalizeDescendantsToDocumentFragment = (editor, {
  descendants
}) => {
  const isInline = isInlineNode(editor);
  const defaultType = getPluginType(editor, ELEMENT_DEFAULT);
  const makeDefaultBlock = makeBlockLazy(defaultType);
  return normalize(descendants, isInline, makeDefaultBlock);
};

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
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

/**
 * A weak map to hold anchor tokens.
 */
var ANCHOR = new WeakMap();
/**
 * A weak map to hold focus tokens.
 */

var FOCUS = new WeakMap();
/**
 * All tokens inherit from a single constructor for `instanceof` checking.
 */

class Token {}
/**
 * Anchor tokens represent the selection's anchor point.
 */

class AnchorToken extends Token {
  constructor() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    var {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }

}
/**
 * Focus tokens represent the selection's focus point.
 */

class FocusToken extends Token {
  constructor() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    var {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }

}
/**
 * Add an anchor token to the end of a text node.
 */

var addAnchorToken = (text, token) => {
  var offset = text.text.length;
  ANCHOR.set(text, [offset, token]);
};
/**
 * Get the offset if a text node has an associated anchor token.
 */

var getAnchorOffset = text => {
  return ANCHOR.get(text);
};
/**
 * Add a focus token to the end of a text node.
 */

var addFocusToken = (text, token) => {
  var offset = text.text.length;
  FOCUS.set(text, [offset, token]);
};
/**
 * Get the offset if a text node has an associated focus token.
 */

var getFocusOffset = text => {
  return FOCUS.get(text);
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Resolve the descedants of a node by normalizing the children that can be
 * passed into a hyperscript creator function.
 */

var STRINGS = new WeakSet();

var resolveDescendants = children => {
  var nodes = [];

  var addChild = child => {
    if (child == null) {
      return;
    }

    var prev = nodes[nodes.length - 1];

    if (typeof child === 'string') {
      var text = {
        text: child
      };
      STRINGS.add(text);
      child = text;
    }

    if (Text.isText(child)) {
      var c = child; // HACK: fix typescript complaining

      if (Text.isText(prev) && STRINGS.has(prev) && STRINGS.has(c) && Text.equals(prev, c, {
        loose: true
      })) {
        prev.text += c.text;
      } else {
        nodes.push(c);
      }
    } else if (Element.isElement(child)) {
      nodes.push(child);
    } else if (child instanceof Token) {
      var n = nodes[nodes.length - 1];

      if (!Text.isText(n)) {
        addChild('');
        n = nodes[nodes.length - 1];
      }

      if (child instanceof AnchorToken) {
        addAnchorToken(n, child);
      } else if (child instanceof FocusToken) {
        addFocusToken(n, child);
      }
    } else {
      throw new Error("Unexpected hyperscript child object: ".concat(child));
    }
  };

  for (var child of children.flat(Infinity)) {
    addChild(child);
  }

  return nodes;
};
/**
 * Create an anchor token.
 */


function createAnchor(tagName, attributes, children) {
  return new AnchorToken(attributes);
}
/**
 * Create an anchor and a focus token.
 */

function createCursor(tagName, attributes, children) {
  return [new AnchorToken(attributes), new FocusToken(attributes)];
}
/**
 * Create an `Element` object.
 */

function createElement(tagName, attributes, children) {
  return _objectSpread$1(_objectSpread$1({}, attributes), {}, {
    children: resolveDescendants(children)
  });
}
/**
 * Create a focus token.
 */

function createFocus(tagName, attributes, children) {
  return new FocusToken(attributes);
}
/**
 * Create a fragment.
 */

function createFragment(tagName, attributes, children) {
  return resolveDescendants(children);
}
/**
 * Create a `Selection` object.
 */

function createSelection(tagName, attributes, children) {
  var anchor = children.find(c => c instanceof AnchorToken);
  var focus = children.find(c => c instanceof FocusToken);

  if (!anchor || anchor.offset == null || anchor.path == null) {
    throw new Error("The <selection> hyperscript tag must have an <anchor> tag as a child with `path` and `offset` attributes defined.");
  }

  if (!focus || focus.offset == null || focus.path == null) {
    throw new Error("The <selection> hyperscript tag must have a <focus> tag as a child with `path` and `offset` attributes defined.");
  }

  return _objectSpread$1({
    anchor: {
      offset: anchor.offset,
      path: anchor.path
    },
    focus: {
      offset: focus.offset,
      path: focus.path
    }
  }, attributes);
}
/**
 * Create a `Text` object.
 */

function createText(tagName, attributes, children) {
  var nodes = resolveDescendants(children);

  if (nodes.length > 1) {
    throw new Error("The <text> hyperscript tag must only contain a single node's worth of children.");
  }

  var [node] = nodes;

  if (node == null) {
    node = {
      text: ''
    };
  }

  if (!Text.isText(node)) {
    throw new Error("\n    The <text> hyperscript tag can only contain text content as children.");
  } // COMPAT: If they used the <text> tag we want to guarantee that it won't be
  // merge with other string children.


  STRINGS.delete(node);
  Object.assign(node, attributes);
  return node;
}
/**
 * Create a top-level `Editor` object.
 */

var createEditor = makeEditor => (tagName, attributes, children) => {
  var otherChildren = [];
  var selectionChild;

  for (var child of children) {
    if (Range.isRange(child)) {
      selectionChild = child;
    } else {
      otherChildren.push(child);
    }
  }

  var descendants = resolveDescendants(otherChildren);
  var selection = {};
  var editor = makeEditor();
  Object.assign(editor, attributes);
  editor.children = descendants; // Search the document's texts to see if any of them have tokens associated
  // that need incorporated into the selection.

  for (var [node, path] of Node$1.texts(editor)) {
    var anchor = getAnchorOffset(node);
    var focus = getFocusOffset(node);

    if (anchor != null) {
      var [offset] = anchor;
      selection.anchor = {
        path,
        offset
      };
    }

    if (focus != null) {
      var [_offset] = focus;
      selection.focus = {
        path,
        offset: _offset
      };
    }
  }

  if (selection.anchor && !selection.focus) {
    throw new Error("Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<anchor />`. For collapsed selections, use `<cursor />` instead.");
  }

  if (!selection.anchor && selection.focus) {
    throw new Error("Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<focus />`. For collapsed selections, use `<cursor />` instead.");
  }

  if (selectionChild != null) {
    editor.selection = selectionChild;
  } else if (Range.isRange(selection)) {
    editor.selection = selection;
  }

  return editor;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * The default creators for Slate objects.
 */

var DEFAULT_CREATORS = {
  anchor: createAnchor,
  cursor: createCursor,
  editor: createEditor(createEditor$1),
  element: createElement,
  focus: createFocus,
  fragment: createFragment,
  selection: createSelection,
  text: createText
};
/**
 * Create a Slate hyperscript function with `options`.
 */

var createHyperscript = function createHyperscript() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var {
    elements = {}
  } = options;
  var elementCreators = normalizeElements(elements);

  var creators = _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_CREATORS), elementCreators), options.creators);

  var jsx = createFactory(creators);
  return jsx;
};
/**
 * Create a Slate hyperscript function with `options`.
 */


var createFactory = creators => {
  var jsx = function jsx(tagName, attributes) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var creator = creators[tagName];

    if (!creator) {
      throw new Error("No hyperscript creator found for tag: <".concat(tagName, ">"));
    }

    if (attributes == null) {
      attributes = {};
    }

    if (!isPlainObject(attributes)) {
      children = [attributes].concat(children);
      attributes = {};
    }

    children = children.filter(child => Boolean(child)).flat();
    var ret = creator(tagName, attributes, children);
    return ret;
  };

  return jsx;
};
/**
 * Normalize a dictionary of element shorthands into creator functions.
 */


var normalizeElements = elements => {
  var creators = {};

  var _loop = function _loop(tagName) {
    var props = elements[tagName];

    if (typeof props !== 'object') {
      throw new Error("Properties specified for a hyperscript shorthand should be an object, but for the custom element <".concat(tagName, ">  tag you passed: ").concat(props));
    }

    creators[tagName] = (tagName, attributes, children) => {
      return createElement('element', _objectSpread(_objectSpread({}, props), attributes), children);
    };
  };

  for (var tagName in elements) {
    _loop(tagName);
  }

  return creators;
};

/**
 * The default hyperscript factory that ships with Slate, without custom tags.
 */

var jsx = createHyperscript();

const deserializeHtmlNodeChildren = (editor, node) => Array.from(node.childNodes).map(deserializeHtmlNode(editor)).flat();

/**
 * Deserialize HTML body element to Fragment.
 */

const htmlBodyToFragment = (editor, element) => {
  if (element.nodeName === 'BODY') {
    return jsx('fragment', {}, deserializeHtmlNodeChildren(editor, element));
  }
};

/**
 * Deserialize HTML to break line.
 */
const htmlBrToNewLine = node => {
  if (node.nodeName === 'BR') {
    return '\n';
  }
};

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

/**
 * Get a deserializer by type, node names, class names and styles.
 */

const pluginDeserializeHtml = (editor, plugin, {
  element: el,
  deserializeLeaf
}) => {
  var _getNode;

  const {
    deserializeHtml,
    isElement: isElementRoot,
    isLeaf: isLeafRoot,
    type
  } = plugin;
  if (!deserializeHtml) return;
  const {
    attributeNames,
    query,
    isLeaf: isLeafRule,
    isElement: isElementRule,
    rules
  } = deserializeHtml;
  let {
    getNode
  } = deserializeHtml;
  const isElement = isElementRule || isElementRoot;
  const isLeaf = isLeafRule || isLeafRoot;

  if (!deserializeLeaf && !isElement) {
    return;
  }

  if (deserializeLeaf && !isLeaf) {
    return;
  }

  if (rules) {
    const isValid = rules.some(({
      validNodeName = '*',
      validStyle,
      validClassName,
      validAttribute
    }) => {
      if (validNodeName) {
        const validNodeNames = castArray_1(validNodeName); // Ignore if el nodeName is not included in rule validNodeNames (except *).

        if (validNodeNames.length && !validNodeNames.includes(el.nodeName) && validNodeName !== '*') return false;
      } // Ignore if the rule className is not in el class list.


      if (validClassName && !el.classList.contains(validClassName)) return false;

      if (validStyle) {
        for (const [key, value] of Object.entries(validStyle)) {
          var _plugin$inject$props;

          const values = castArray_1(value); // Ignore if el style value is not included in rule style values (except *)

          if (!values.includes(el.style[key]) && value !== '*') return; // Ignore if el style value is falsy (for value *)

          if (value === '*' && !el.style[key]) return;
          const defaultNodeValue = (_plugin$inject$props = plugin.inject.props) === null || _plugin$inject$props === void 0 ? void 0 : _plugin$inject$props.defaultNodeValue; // Ignore if the style value = plugin.inject.props.defaultNodeValue

          if (defaultNodeValue && defaultNodeValue === el.style[key]) {
            return false;
          }
        }
      }

      if (validAttribute) {
        if (typeof validAttribute === 'string') {
          if (!el.getAttributeNames().includes(validAttribute)) return false;
        } else {
          for (const [attributeName, attributeValue] of Object.entries(validAttribute)) {
            const attributeValues = castArray_1(attributeValue);
            const elAttribute = el.getAttribute(attributeName);
            if (!isDefined(elAttribute) || !attributeValues.includes(elAttribute)) return false;
          }
        }
      }

      return true;
    });
    if (!isValid) return;
  }

  if (query && !query(el)) {
    return;
  }

  if (!getNode) {
    if (isElement) {
      getNode = () => ({
        type
      });
    } else if (isLeaf) {
      getNode = () => ({
        [type]: true
      });
    } else {
      return;
    }
  }

  let node = (_getNode = getNode(el, {})) !== null && _getNode !== void 0 ? _getNode : {};
  if (!Object.keys(node).length) return;
  const injectedPlugins = getInjectedPlugins(editor, plugin);
  injectedPlugins.forEach(injectedPlugin => {
    var _injectedPlugin$deser, _injectedPlugin$deser2;

    const res = (_injectedPlugin$deser = injectedPlugin.deserializeHtml) === null || _injectedPlugin$deser === void 0 ? void 0 : (_injectedPlugin$deser2 = _injectedPlugin$deser.getNode) === null || _injectedPlugin$deser2 === void 0 ? void 0 : _injectedPlugin$deser2.call(_injectedPlugin$deser, el, node);

    if (res) {
      node = { ...node,
        ...res
      };
    }
  });

  if (attributeNames) {
    const elementAttributes = {};
    const elementAttributeNames = el.getAttributeNames();

    for (const elementAttributeName of elementAttributeNames) {
      if (attributeNames.includes(elementAttributeName)) {
        elementAttributes[elementAttributeName] = el.getAttribute(elementAttributeName);
      }
    }

    if (Object.keys(elementAttributes).length) {
      node.attributes = elementAttributes;
    }
  }

  return { ...deserializeHtml,
    node
  };
};

const pipeDeserializeHtmlElement = (editor, element) => {
  let result;
  [...editor.plugins].reverse().some(plugin => {
    result = pluginDeserializeHtml(editor, plugin, {
      element
    });
    return !!result;
  });
  return result;
};

/**
 * Deserialize HTML to Element.
 */

const htmlElementToElement = (editor, element) => {
  const deserialized = pipeDeserializeHtmlElement(editor, element);

  if (deserialized) {
    var _node$children;

    const {
      node,
      withoutChildren
    } = deserialized;
    let descendants = (_node$children = node.children) !== null && _node$children !== void 0 ? _node$children : deserializeHtmlNodeChildren(editor, element);

    if (!descendants.length || withoutChildren) {
      descendants = [{
        text: ''
      }];
    }

    return jsx('element', node, descendants);
  }
};

const pipeDeserializeHtmlLeaf = (editor, element) => {
  let node = {};
  [...editor.plugins].reverse().forEach(plugin => {
    const deserialized = pluginDeserializeHtml(editor, plugin, {
      element,
      deserializeLeaf: true
    });
    if (!deserialized) return;
    node = { ...node,
      ...deserialized.node
    };
  });
  return node;
};

/**
 * Deserialize HTML to TDescendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */

const htmlElementToLeaf = (editor, element) => {
  const node = pipeDeserializeHtmlLeaf(editor, element);
  return deserializeHtmlNodeChildren(editor, element).reduce((arr, child) => {
    if (!child) return arr;

    if (isElement(child)) {
      if (Object.keys(node).length) {
        mergeDeepToNodes({
          node: child,
          source: node,
          query: {
            filter: ([n]) => isText(n)
          }
        });
      }

      arr.push(child);
    } else {
      const attributes = { ...node
      }; // attributes should not override child attributes

      if (isText(child) && child.text) {
        Object.keys(attributes).forEach(key => {
          if (attributes[key] && child[key]) {
            attributes[key] = child[key];
          }
        });
      }

      arr.push(jsx('text', attributes, child));
    }

    return arr;
  }, []);
};

const isHtmlText = node => node.nodeType === Node.TEXT_NODE;

/**
 * Deserialize HTML text node to text.
 */
const htmlTextNodeToString = node => {
  if (isHtmlText(node)) {
    var _node$textContent$rep, _node$textContent;

    const trimmedText = (_node$textContent$rep = (_node$textContent = node.textContent) === null || _node$textContent === void 0 ? void 0 : _node$textContent.replace(/^\n+|\n+$/g, '')) !== null && _node$textContent$rep !== void 0 ? _node$textContent$rep : '';
    return trimmedText.length > 0 ? trimmedText : null;
  }
};

const isHtmlElement = node => node.nodeType === Node.ELEMENT_NODE;

/**
 * Deserialize HTML element or child node.
 */

const deserializeHtmlNode = editor => node => {
  const textNode = htmlTextNodeToString(node);
  if (textNode) return textNode;
  if (!isHtmlElement(node)) return null; // break line

  const breakLine = htmlBrToNewLine(node);
  if (breakLine) return breakLine; // body

  const fragment = htmlBodyToFragment(editor, node);
  if (fragment) return fragment; // element

  const element = htmlElementToElement(editor, node);
  if (element) return element; // leaf

  return htmlElementToLeaf(editor, node);
};

/**
 * Deserialize HTML element to fragment.
 */

const deserializeHtmlElement = (editor, element) => {
  return deserializeHtmlNode(editor)(element);
};

/**
 * Convert HTML string into HTML element.
 */
const htmlStringToDOMNode = (rawHtml, stripWhitespace = true) => {
  const node = document.createElement('body');
  node.innerHTML = rawHtml;

  if (stripWhitespace) {
    node.innerHTML = node.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, '');
  }

  return node;
};

/**
 * Deserialize HTML element to a valid document fragment.
 */

const deserializeHtml = (editor, {
  element,
  stripWhitespace = true
}) => {
  // for serializer
  if (typeof element === 'string') {
    element = htmlStringToDOMNode(element, stripWhitespace);
  }

  const fragment = deserializeHtmlElement(editor, element);
  return normalizeDescendantsToDocumentFragment(editor, {
    descendants: fragment
  });
};

const parseHtmlDocument = html => {
  return new DOMParser().parseFromString(html, 'text/html');
};

const KEY_DESERIALIZE_HTML = 'deserializeHtml';
/**
 * Enables support for deserializing inserted content from HTML format to Slate format.
 */

const createDeserializeHtmlPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_HTML,
  then: editor => ({
    editor: {
      insertData: {
        format: 'text/html',
        getFragment: ({
          data
        }) => {
          const document = parseHtmlDocument(data);
          return deserializeHtml(editor, {
            element: document.body
          });
        }
      }
    }
  })
});

/**
 * Depth-first pre-order tree traverse the given HTML node and calls the given callback for each node.
 * see: https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)
 *
 * @param callback returns a boolean indicating whether traversal should be continued
 */
const traverseHtmlNode = (node, callback) => {
  const keepTraversing = callback(node);

  if (!keepTraversing) {
    return;
  }

  let child = node.firstChild;

  while (child) {
    const currentChild = child;
    const previousChild = child.previousSibling;
    child = child.nextSibling;
    traverseHtmlNode(currentChild, callback);

    if ( // An unwrap was made. Need to compute the next child again.
    !currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && previousChild !== child.previousSibling && child.parentNode) {
      if (previousChild) {
        child = previousChild.nextSibling;
      } else {
        child = node.firstChild;
      }
    } else if ( // A list was created. Need to compute the next child again.
    !currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && !child.previousSibling && !child.nextSibling && !child.parentNode) {
      if (previousChild) {
        if (previousChild.nextSibling) {
          child = previousChild.nextSibling.nextSibling;
        } else {
          child = null;
        }
      } else if (node.firstChild) {
        child = node.firstChild.nextSibling;
      }
    }
  }
};

/**
 * Traverse the HTML elements of the given HTML node.
 * @param rootNode The root HTML node to traverse.
 * @param callback The callback to call for each HTML element.
 */
const traverseHtmlElements = (rootNode, callback) => {
  traverseHtmlNode(rootNode, node => {
    if (!isHtmlElement(node)) {
      return true;
    }

    return callback(node);
  });
};

/**
 * Replace BR elements with line feeds.
 */

const cleanHtmlBrElements = rootNode => {
  traverseHtmlElements(rootNode, element => {
    if (element.tagName !== 'BR') {
      return true;
    }

    const replacementTextNode = document.createTextNode(LINE_FEED);

    if (element.parentElement) {
      element.parentElement.replaceChild(replacementTextNode, element);
    }

    return false;
  });
};

/**
 * Replace \r\n and \r with \n
 */
const cleanHtmlCrLf = html => {
  return html.replace(/(\r\n|\r)/gm, '\n');
};

const ALLOWED_EMPTY_ELEMENTS = ['BR', 'IMG', 'TH', 'TD'];

const isEmpty = element => {
  return !ALLOWED_EMPTY_ELEMENTS.includes(element.nodeName) && !element.innerHTML.trim();
};

const removeIfEmpty = element => {
  if (isEmpty(element)) {
    const {
      parentElement
    } = element;
    element.remove();

    if (parentElement) {
      removeIfEmpty(parentElement);
    }
  }
};
/**
 * Remove empty elements from rootNode.
 * Allowed empty elements: BR, IMG.
 */


const cleanHtmlEmptyElements = rootNode => {
  traverseHtmlElements(rootNode, element => {
    removeIfEmpty(element);
    return true;
  });
};

/**
 * Replace `element` tag name by `tagName`.
 * Attributes, innerHTML and parent relationship is kept.
 */
const replaceTagName = (element, tagName) => {
  const newElement = document.createElement(tagName);
  newElement.innerHTML = element.innerHTML;

  for (const {
    name
  } of element.attributes) {
    const value = element.getAttribute(name);

    if (value) {
      newElement.setAttribute(name, value);
    }
  }

  if (element.parentNode) {
    element.parentNode.replaceChild(newElement, element);
  }

  return newElement;
};

/**
 * Replace FONT elements with SPAN elements if there is textContent (remove otherwise).
 */

const cleanHtmlFontElements = rootNode => {
  traverseHtmlElements(rootNode, element => {
    if (element.tagName === 'FONT') {
      if (element.textContent) {
        replaceTagName(element, 'span');
      } else {
        element.remove();
      }
    }

    return true;
  });
};

/**
 * If href starts with '#'.
 */
const isHtmlFragmentHref = href => href.startsWith('#');

/**
 * Unwrap the given HTML element.
 */
const unwrapHtmlElement = element => {
  element.outerHTML = element.innerHTML;
};

/**
 * Remove fragment hrefs and spans without inner text.
 */

const cleanHtmlLinkElements = rootNode => {
  traverseHtmlElements(rootNode, element => {
    if (element.tagName !== 'A') {
      return true;
    }

    const href = element.getAttribute('href');

    if (!href || isHtmlFragmentHref(href)) {
      unwrapHtmlElement(element);
    }

    if (href && element.querySelector('img')) {
      for (const span of element.querySelectorAll('span')) {
        if (!span.innerText) {
          unwrapHtmlElement(span);
        }
      }
    }

    return true;
  });
};

const traverseHtmlTexts = (rootNode, callback) => {
  traverseHtmlNode(rootNode, node => {
    if (!isHtmlText(node)) {
      return true;
    }

    return callback(node);
  });
};

const cleanHtmlTextNodes = rootNode => {
  traverseHtmlTexts(rootNode, textNode => {
    if (/^\n\s*$/.test(textNode.data) && (textNode.previousElementSibling || textNode.nextElementSibling)) {
      textNode.remove();
      return true;
    }

    textNode.data = textNode.data.replace(/\n\s*/g, '\n');

    if (textNode.data.includes(CARRIAGE_RETURN) || textNode.data.includes(LINE_FEED) || textNode.data.includes(NO_BREAK_SPACE)) {
      const hasSpace = textNode.data.includes(SPACE);
      const hasNonWhitespace = /\S/.test(textNode.data);
      const hasLineFeed = textNode.data.includes(LINE_FEED);

      if (!(hasSpace || hasNonWhitespace) && !hasLineFeed) {
        if (textNode.data === NO_BREAK_SPACE) {
          textNode.data = SPACE;
          return true;
        }

        textNode.remove();
        return true;
      }

      if (textNode.previousSibling && textNode.previousSibling.nodeName === 'BR' && textNode.parentElement) {
        textNode.parentElement.removeChild(textNode.previousSibling);
        const matches = textNode.data.match(/^[\r\n]+/);
        const offset = matches ? matches[0].length : 0;
        textNode.data = textNode.data.substring(offset).replace(new RegExp(LINE_FEED, 'g'), SPACE).replace(new RegExp(CARRIAGE_RETURN, 'g'), SPACE);
        textNode.data = `\n${textNode.data}`;
      } else {
        textNode.data = textNode.data.replace(new RegExp(LINE_FEED, 'g'), SPACE).replace(new RegExp(CARRIAGE_RETURN, 'g'), SPACE);
      }
    }

    return true;
  });
};

/**
 * Is the element a block element?
 */
const isHtmlBlockElement = element => {
  const blockRegex = /^(address|blockquote|body|center|dir|div|dl|fieldset|form|h[1-6]|hr|isindex|menu|noframes|noscript|ol|p|pre|table|ul|dd|dt|frameset|li|tbody|td|tfoot|th|thead|tr|html)$/i;
  return blockRegex.test(element.nodeName);
};

const isHtmlTable = element => element.nodeName === 'TABLE';

/**
 * Set HTML blocks mark styles to a new child span element if any.
 * This allows Plate to use block marks.
 */

const copyBlockMarksToSpanChild = rootNode => {
  traverseHtmlElements(rootNode, element => {
    const el = element;
    const styleAttribute = element.getAttribute('style');
    if (!styleAttribute) return true;

    if (isHtmlBlockElement(el) && !isHtmlTable(el)) {
      const {
        style: {
          backgroundColor,
          color,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          textDecoration
        }
      } = el;

      if (backgroundColor || color || fontFamily || fontSize || fontStyle || fontWeight || textDecoration) {
        const span = document.createElement('span');

        if (!['initial', 'inherit'].includes(color)) {
          span.style.color = color;
        }

        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;

        if (!['normal', 'initial', 'inherit'].includes(color)) {
          span.style.fontStyle = fontStyle;
        }

        if (!['normal', 400].includes(fontWeight)) {
          span.style.fontWeight = fontWeight;
        }

        span.style.textDecoration = textDecoration;
        span.innerHTML = el.innerHTML;
        element.innerHTML = span.outerHTML;
      }
    }

    return true;
  });
};

/**
 * Find the first HTML element that matches the given selector.
 * @param rootNode
 * @param predicate
 */

const findHtmlElement = (rootNode, predicate) => {
  let res = null;
  traverseHtmlElements(rootNode, node => {
    if (predicate(node)) {
      res = node;
      return false;
    }

    return true;
  });
  return res;
};
const someHtmlElement = (rootNode, predicate) => {
  return !!findHtmlElement(rootNode, predicate);
};

const acceptNode = () => NodeFilter.FILTER_ACCEPT;

const getHtmlComments = node => {
  const comments = [];
  const iterator = document.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
    acceptNode
  });
  let currentNode = iterator.nextNode();

  while (currentNode) {
    if (currentNode.nodeValue) {
      comments.push(currentNode.nodeValue);
    }

    currentNode = iterator.nextNode();
  }

  return comments;
};

const isHtmlComment = node => node.nodeType === Node.COMMENT_NODE;

const isOlSymbol = symbol => {
  return /[0-9a-np-z]\S/g.test(symbol.toLowerCase());
};

const parseHtmlElement = html => {
  const {
    body
  } = parseHtmlDocument(html);
  return body.firstElementChild;
};

/**
 * Trim the html and remove zero width spaces,
 * then wrap it with a body element.
 */

const postCleanHtml = html => {
  const cleanHtml = html.trim().replace(new RegExp(ZERO_WIDTH_SPACE, 'g'), '');
  return `<body>${cleanHtml}</body>`;
};

/**
 * Remove string before <html
 */
const removeBeforeHtml = html => {
  const index = html.indexOf('<html');

  if (index === -1) {
    return html;
  }

  return html.substring(index);
};
/**
 * Remove string after </html>
 */


const removeAfterHtml = html => {
  const index = html.lastIndexOf('</html>');

  if (index === -1) {
    return html;
  }

  return html.substring(0, index + '</html>'.length);
};
/**
 * Remove string before <html and after </html>
 */


const removeHtmlSurroundings = html => {
  return removeBeforeHtml(removeAfterHtml(html));
};

const cleaners = [removeHtmlSurroundings, cleanHtmlCrLf];
/**
 * Remove HTML surroundings and clean HTML from CR/LF
 */

const preCleanHtml = html => {
  return cleaners.reduce((result, clean) => clean(result), html);
};

/**
 * Traverse HTML comments.
 */
const traverseHtmlComments = (rootNode, callback) => {
  traverseHtmlNode(rootNode, node => {
    if (!isHtmlComment(node)) {
      return true;
    }

    return callback(node);
  });
};

/**
 * Removes HTML nodes between HTML comments.
 */

const removeHtmlNodesBetweenComments = (rootNode, start, end) => {
  const isClosingComment = node => isHtmlComment(node) && node.data === end;

  traverseHtmlComments(rootNode, comment => {
    if (comment.data === start) {
      let node = comment.nextSibling;
      comment.remove();

      while (node && !isClosingComment(node)) {
        const {
          nextSibling
        } = node;
        node.remove();
        node = nextSibling;
      }

      if (node && isClosingComment(node)) {
        node.remove();
      }
    }

    return true;
  });
};

/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}

var _arrayAggregator = arrayAggregator;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(collection, setter, iteratee, accumulator) {
  _baseEach(collection, function(value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

var _baseAggregator = baseAggregator;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag : _getTag(object),
      othTag = othIsArr ? arrayTag : _getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, _baseIteratee(iteratee), accumulator);
  };
}

var _createAggregator = createAggregator;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.keyBy(array, function(o) {
 *   return String.fromCharCode(o.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */
var keyBy = _createAggregator(function(result, value, key) {
  _baseAssignValue(result, key, value);
});

var keyBy_1 = keyBy;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

var merge_1 = merge;

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return _arrayMap(props, function(key) {
    return object[key];
  });
}

var _baseValues = baseValues;

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : _baseValues(object, keys_1(object));
}

var values_1 = values;

/**
 * Recursively merge nested plugins into the root plugins
 */
const mergeDeepPlugins = (editor, _plugin) => {
  const plugin = { ..._plugin
  };
  const {
    then
  } = plugin;

  if (then) {
    delete plugin.then;
    const {
      plugins: pluginPlugins
    } = plugin;
    const pluginThen = mergeDeepPlugins(editor, defaultsDeep_1(then(editor, plugin), plugin)); // merge plugins by key

    if (pluginPlugins && pluginThen.plugins) {
      const merged = merge_1(keyBy_1(pluginPlugins, 'key'), keyBy_1(pluginThen.plugins, 'key'));
      pluginThen.plugins = values_1(merged);
    }

    return pluginThen;
  }

  return plugin;
};

const setDefaultPlugin = plugin => {
  if (plugin.type === undefined) plugin.type = plugin.key;
  if (!plugin.options) plugin.options = {};
  if (!plugin.inject) plugin.inject = {};
  if (!plugin.editor) plugin.editor = {};
  return plugin;
};

/**
 * Recursively merge plugin.plugins into editor.plugins and editor.pluginsByKey
 */

const flattenDeepPlugins = (editor, plugins) => {
  if (!plugins) return;
  plugins.forEach(plugin => {
    let p = setDefaultPlugin(plugin);
    p = mergeDeepPlugins(editor, p);

    if (!editor.pluginsByKey[p.key]) {
      editor.plugins.push(p);
      editor.pluginsByKey[p.key] = p;
    } else {
      const index = editor.plugins.indexOf(editor.pluginsByKey[p.key]);
      const mergedPlugin = defaultsDeep_1(p, editor.pluginsByKey[p.key]);

      if (index >= 0) {
        editor.plugins[index] = mergedPlugin;
      }

      editor.pluginsByKey[p.key] = mergedPlugin;
    }

    flattenDeepPlugins(editor, p.plugins);
  });
};

/**
 * Flatten deep plugins then set editor.plugins and editor.pluginsByKey
 */

const setPlatePlugins = (editor, {
  disableCorePlugins,
  plugins: _plugins = []
}) => {
  let plugins = [];

  if (disableCorePlugins !== true) {
    const dcp = disableCorePlugins;

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.react)) {
      var _ref, _editor$pluginsByKey;

      plugins.push((_ref = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey = editor.pluginsByKey) === null || _editor$pluginsByKey === void 0 ? void 0 : _editor$pluginsByKey.react) !== null && _ref !== void 0 ? _ref : createReactPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.history)) {
      var _ref2, _editor$pluginsByKey2;

      plugins.push((_ref2 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey2 = editor.pluginsByKey) === null || _editor$pluginsByKey2 === void 0 ? void 0 : _editor$pluginsByKey2.history) !== null && _ref2 !== void 0 ? _ref2 : createHistoryPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.nodeFactory)) {
      var _ref3, _editor$pluginsByKey3;

      plugins.push((_ref3 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey3 = editor.pluginsByKey) === null || _editor$pluginsByKey3 === void 0 ? void 0 : _editor$pluginsByKey3[KEY_NODE_FACTORY]) !== null && _ref3 !== void 0 ? _ref3 : createNodeFactoryPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.eventEditor)) {
      var _ref4, _editor$pluginsByKey4;

      plugins.push((_ref4 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey4 = editor.pluginsByKey) === null || _editor$pluginsByKey4 === void 0 ? void 0 : _editor$pluginsByKey4[KEY_EVENT_EDITOR]) !== null && _ref4 !== void 0 ? _ref4 : createEventEditorPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.inlineVoid)) {
      var _ref5, _editor$pluginsByKey5;

      plugins.push((_ref5 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey5 = editor.pluginsByKey) === null || _editor$pluginsByKey5 === void 0 ? void 0 : _editor$pluginsByKey5[KEY_INLINE_VOID]) !== null && _ref5 !== void 0 ? _ref5 : createInlineVoidPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.insertData)) {
      var _ref6, _editor$pluginsByKey6;

      plugins.push((_ref6 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey6 = editor.pluginsByKey) === null || _editor$pluginsByKey6 === void 0 ? void 0 : _editor$pluginsByKey6[KEY_INSERT_DATA]) !== null && _ref6 !== void 0 ? _ref6 : createInsertDataPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.selection)) {
      var _ref7, _editor$pluginsByKey7;

      plugins.push((_ref7 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey7 = editor.pluginsByKey) === null || _editor$pluginsByKey7 === void 0 ? void 0 : _editor$pluginsByKey7[KEY_PREV_SELECTION]) !== null && _ref7 !== void 0 ? _ref7 : createPrevSelectionPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.deserializeHtml)) {
      var _ref8, _editor$pluginsByKey8;

      plugins.push((_ref8 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey8 = editor.pluginsByKey) === null || _editor$pluginsByKey8 === void 0 ? void 0 : _editor$pluginsByKey8[KEY_DESERIALIZE_HTML]) !== null && _ref8 !== void 0 ? _ref8 : createDeserializeHtmlPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.deserializeAst)) {
      var _ref9, _editor$pluginsByKey9;

      plugins.push((_ref9 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey9 = editor.pluginsByKey) === null || _editor$pluginsByKey9 === void 0 ? void 0 : _editor$pluginsByKey9[KEY_DESERIALIZE_AST]) !== null && _ref9 !== void 0 ? _ref9 : createDeserializeAstPlugin());
    }

    if (typeof dcp !== 'object' || !(dcp !== null && dcp !== void 0 && dcp.editorProtocol)) {
      var _ref10, _editor$pluginsByKey10;

      plugins.push((_ref10 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey10 = editor.pluginsByKey) === null || _editor$pluginsByKey10 === void 0 ? void 0 : _editor$pluginsByKey10[KEY_EDITOR_PROTOCOL]) !== null && _ref10 !== void 0 ? _ref10 : createEditorProtocolPlugin());
    }
  }

  plugins = [...plugins, ..._plugins];
  editor.plugins = [];
  editor.pluginsByKey = {};
  flattenDeepPlugins(editor, plugins); // override all the plugins one by one, so plugin.overrideByKey effects can be overridden by the next plugin

  editor.plugins.forEach(plugin => {
    if (plugin.overrideByKey) {
      const newPlugins = editor.plugins.map(p => {
        return overridePluginsByKey(p, plugin.overrideByKey);
      });
      editor.plugins = [];
      editor.pluginsByKey = {}; // flatten again the overrides

      flattenDeepPlugins(editor, newPlugins);
    }
  });
};

const shouldHaveBeenOverridden = fnName => () => {
  console.warn(`editor.${fnName} should have been overriden but was not. Please report this issue here: https://github.com/udecode/plate/issues`);
};

/**
 * Apply `withInlineVoid` and all plate plugins `withOverrides`.
 * Overrides:
 * - `id`: id of the editor.
 * - `key`: random key for the <Slate> component so each time the editor is created, the component resets.
 * - `options`: Plate options
 */
const withPlate = (e, {
  id,
  plugins = [],
  disableCorePlugins
} = {}) => {
  let editor = e; // Override incremental id generated by slate

  editor.id = id !== null && id !== void 0 ? id : editor.id;
  editor.prevSelection = null;
  editor.currentKeyboardEvent = null; // Editor methods

  editor.reset = () => shouldHaveBeenOverridden('reset');

  editor.redecorate = () => shouldHaveBeenOverridden('redecorate');

  editor.plate = {
    get set() {
      return null;
    }

  };

  if (!editor.key) {
    editor.key = Math.random();
  }

  setPlatePlugins(editor, {
    plugins: plugins,
    disableCorePlugins
  }); // withOverrides

  editor.plugins.forEach(plugin => {
    if (plugin.withOverrides) {
      editor = plugin.withOverrides(editor, plugin);
    }
  });
  return editor;
};

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

var cloneDeep_1 = cloneDeep;

/**
 * Creates a new array of plugins by overriding the plugins in the original array.
 * Components can be overridden by key using `components` in the second param.
 * Any other properties can be overridden by key using `overrideByKey` in the second param.
 */

const createPlugins = (plugins, {
  components,
  overrideByKey
} = {}) => {
  let allOverrideByKey = {};

  if (overrideByKey) {
    allOverrideByKey = cloneDeep_1(overrideByKey);
  }

  if (components) {
    Object.keys(components).forEach(key => {
      if (!allOverrideByKey[key]) allOverrideByKey[key] = {};
      allOverrideByKey[key].component = components[key];
    });
  }

  if (Object.keys(allOverrideByKey).length) {
    return plugins.map(plugin => {
      return overridePluginsByKey(plugin, allOverrideByKey);
    });
  }

  return plugins;
};

/**
 * Create a plate editor with:
 * - `createTEditor` or custom `editor`
 * - `withPlate`
 * - custom `components`
 */
const createPlateEditor = ({
  editor = createTEditor(),
  plugins = [],
  components,
  overrideByKey,
  normalizeInitialValue: shouldNormalizeInitialValue,
  ...withPlateOptions
} = {}) => {
  plugins = createPlugins(plugins, {
    components,
    overrideByKey
  });
  const e = withPlate(editor, {
    plugins,
    ...withPlateOptions
  });

  if (shouldNormalizeInitialValue) {
    normalizeEditor(e, {
      force: true
    });
  }

  return e;
};

/**
 * Get plugin keys by types
 */
const getKeysByTypes = (editor, type) => {
  const types = castArray_1(type);

  const found = Object.values(editor.pluginsByKey).filter(plugin => {
    return types.includes(plugin.type);
  });
  return found.map(p => p.key);
};

/**
 * Get plugin key by type
 */

const getKeyByType = (editor, type) => {
  return getKeysByTypes(editor, type)[0];
};

const getPluginInjectProps = (editor, key) => {
  var _getPlugin$inject$pro, _getPlugin$inject;

  return (_getPlugin$inject$pro = (_getPlugin$inject = getPlugin(editor, key).inject) === null || _getPlugin$inject === void 0 ? void 0 : _getPlugin$inject.props) !== null && _getPlugin$inject$pro !== void 0 ? _getPlugin$inject$pro : {};
};

const getPluginOptions = (editor, key) => {
  var _getPlugin$options;

  return (_getPlugin$options = getPlugin(editor, key).options) !== null && _getPlugin$options !== void 0 ? _getPlugin$options : {};
};

/**
 * Get plugin types option by plugin keys.
 */

const getPluginTypes = (editor, keys) => keys.map(key => getPluginType(editor, key));

/**
 * Get `editor.plugins`
 */
const getPlugins = editor => {
  var _ref;

  return (_ref = editor === null || editor === void 0 ? void 0 : editor.plugins) !== null && _ref !== void 0 ? _ref : [];
};

/**
 * Get slate class name: slate-<type>
 */
const getSlateClass = type => `slate-${type}`;

/**
 * Override node props with plugin props.
 * `props.element.attributes` are passed as `nodeProps`.
 * Extend the class name with the node type.
 */

const getRenderNodeProps = ({
  attributes,
  nodeProps,
  props,
  type
}) => {
  let newProps = {};

  if (props) {
    var _ref;

    newProps = (_ref = typeof props === 'function' ? props(nodeProps) : props) !== null && _ref !== void 0 ? _ref : {};
  }

  if (!newProps.nodeProps && attributes) {
    newProps.nodeProps = attributes;
  }

  nodeProps = { ...nodeProps,
    ...newProps
  };

  if (nodeProps.nodeProps) {
    // remove attributes values that are undefined
    Object.keys(nodeProps.nodeProps).forEach(key => {
      var _nodeProps$nodeProps;

      if (((_nodeProps$nodeProps = nodeProps.nodeProps) === null || _nodeProps$nodeProps === void 0 ? void 0 : _nodeProps$nodeProps[key]) === undefined) {
        var _nodeProps$nodeProps2;

        (_nodeProps$nodeProps2 = nodeProps.nodeProps) === null || _nodeProps$nodeProps2 === void 0 ? true : delete _nodeProps$nodeProps2[key];
      }
    });
  }

  const {
    className
  } = nodeProps;
  return { ...nodeProps,
    className: clsx(getSlateClass(type), className)
  };
};

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

// We make this a function so it can be tested in describe block mocks with Jest.
var IS_MAC = () => typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

// We make this a function so it can be tested in describe block mocks with Jest.
var ALIASES = () => ({
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC() ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
});

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES()[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
var lib_3 = lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;

/**
 * Hotkey mappings for each platform.
 */

const HOTKEYS = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  insertSoftBreak: 'shift+enter',
  italic: 'mod+i',
  moveBackward: 'left',
  moveForward: 'right',
  moveWordBackward: 'ctrl+left',
  moveWordForward: 'ctrl+right',
  splitBlock: 'enter',
  tab: 'tab',
  untab: 'shift+tab',
  undo: 'mod+z'
};
const APPLE_HOTKEYS = {
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  moveWordBackward: 'opt+left',
  moveWordForward: 'opt+right',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t'
};
const WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: ['ctrl+y', 'ctrl+shift+z']
};
/**
 * Create a platform-aware hotkey checker.
 */

const create = key => {
  const generic = HOTKEYS[key];
  const apple = APPLE_HOTKEYS[key];
  const windows = WINDOWS_HOTKEYS[key];
  const isGeneric = generic && lib_3(generic);
  const isApple = apple && lib_3(apple);
  const isWindows = windows && lib_3(windows);
  return event => {
    if (isGeneric && isGeneric(event)) return true;
    if (IS_APPLE && isApple && isApple(event)) return true;
    if (!IS_APPLE && isWindows && isWindows(event)) return true;
    return false;
  };
};

const createComposing = key => (editor, event, {
  composing
} = {}) => {
  if (!create(key)(event)) return false;
  if (!!composing !== isComposing(editor)) return false;
  return true;
};

const Hotkeys = {
  isBold: create('bold'),
  isCompose: create('compose'),
  isMoveBackward: create('moveBackward'),
  isMoveForward: create('moveForward'),
  isDeleteBackward: create('deleteBackward'),
  isDeleteForward: create('deleteForward'),
  isDeleteLineBackward: create('deleteLineBackward'),
  isDeleteLineForward: create('deleteLineForward'),
  isDeleteWordBackward: create('deleteWordBackward'),
  isDeleteWordForward: create('deleteWordForward'),
  isExtendBackward: create('extendBackward'),
  isExtendForward: create('extendForward'),
  isExtendLineBackward: create('extendLineBackward'),
  isExtendLineForward: create('extendLineForward'),
  isItalic: create('italic'),
  isMoveLineBackward: create('moveLineBackward'),
  isMoveLineForward: create('moveLineForward'),
  isMoveWordBackward: create('moveWordBackward'),
  isMoveWordForward: create('moveWordForward'),
  isRedo: create('redo'),
  isSoftBreak: create('insertSoftBreak'),
  isSplitBlock: create('splitBlock'),
  isTab: createComposing('tab'),
  isTransposeCharacter: create('transposeCharacter'),
  isUndo: create('undo'),
  isUntab: createComposing('untab')
};

/**
 * Map plugin inject props to injected plugin
 */

const mapInjectPropsToPlugin = (editor, plugin, injectedPlugin) => {
  var _plugin$inject$props;

  const validTypes = (_plugin$inject$props = plugin.inject.props) === null || _plugin$inject$props === void 0 ? void 0 : _plugin$inject$props.validTypes;
  if (!validTypes) return;
  const keys = getKeysByTypes(editor, validTypes);
  const injected = {};
  keys.forEach(key => {
    injected[key] = injectedPlugin;
  });
  return {
    inject: {
      pluginsByKey: injected
    }
  };
};

/**
 * Recursively merge a source object to children nodes with a query.
 */

const mergeDeepToNodes = options => {
  applyDeepToNodes({ ...options,
    apply: merge_1
  });
};

const mockPlugin = plugin => ({
  key: '',
  type: '',
  editor: {},
  inject: {},
  options: {},
  ...plugin
});

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

/**
 * Normalize initial value from editor plugins. Set into plate store if diff.
 */
const normalizeInitialValue = (editor, value) => {
  let normalizedValue = cloneDeep_1(value);

  editor.plugins.forEach(p => {
    var _p$normalizeInitialVa;

    const _normalizedValue = (_p$normalizeInitialVa = p.normalizeInitialValue) === null || _p$normalizeInitialVa === void 0 ? void 0 : _p$normalizeInitialVa.call(p, normalizedValue);

    if (_normalizedValue) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      normalizedValue = _normalizedValue;
    }
  });

  if (!isEqual_1(value, normalizedValue)) {
    return normalizedValue;
  }
};

/**
 * @see {@link Decorate}.
 * Optimization: return undefined if empty list so Editable uses a memo.
 */
const pipeDecorate = (editor, decorateProp) => {
  const decorates = editor.plugins.flatMap(plugin => {
    var _plugin$decorate, _plugin$decorate2;

    return (_plugin$decorate = (_plugin$decorate2 = plugin.decorate) === null || _plugin$decorate2 === void 0 ? void 0 : _plugin$decorate2.call(plugin, editor, plugin)) !== null && _plugin$decorate !== void 0 ? _plugin$decorate : [];
  });

  if (decorateProp) {
    decorates.push(decorateProp);
  }

  if (!decorates.length) return;
  return entry => {
    let ranges = [];

    const addRanges = newRanges => {
      if (newRanges !== null && newRanges !== void 0 && newRanges.length) ranges = [...ranges, ...newRanges];
    };

    decorates.forEach(decorate => {
      addRanges(decorate(entry));
    });
    return ranges;
  };
};

/**
 * Check if an event is overrided by a handler.
 */
const isEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  } // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.


  const shouldTreatEventAsHandled = handler(event);

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }

  return event.isPropagationStopped();
};
/**
 * Generic pipe for handlers.
 * - Get all the plugins handlers by `handlerKey`.
 * - If there is no plugin handler or editable prop handler for this key, return `undefined`.
 * - Return a handler calling all the plugins handlers then the prop handler.
 * - Any handler returning true will stop the next handlers to be called, including slate internal handler.
 */

const pipeHandler = (editor, {
  editableProps,
  handlerKey
}) => {
  let pluginsHandlers = [];
  pluginsHandlers = editor.plugins.flatMap(plugin => {
    var _plugin$handlers$hand, _plugin$handlers, _plugin$handlers$hand2;

    return (_plugin$handlers$hand = (_plugin$handlers = plugin.handlers) === null || _plugin$handlers === void 0 ? void 0 : (_plugin$handlers$hand2 = _plugin$handlers[handlerKey]) === null || _plugin$handlers$hand2 === void 0 ? void 0 : _plugin$handlers$hand2.call(_plugin$handlers, editor, plugin)) !== null && _plugin$handlers$hand !== void 0 ? _plugin$handlers$hand : [];
  });
  const propsHandler = editableProps === null || editableProps === void 0 ? void 0 : editableProps[handlerKey];
  if (!pluginsHandlers.length && !propsHandler) return;
  return event => {
    const eventIsHandled = pluginsHandlers.some(handler => isEventHandled(event, handler));
    if (eventIsHandled) return true;
    return isEventHandled(event, propsHandler);
  };
};

/**
 * Return if `element`, `text`, `nodeKey` is defined.
 * Return if `node.type` is not in `validTypes` (if defined).
 * Return if `value = node[nodeKey]` is not in `validNodeValues` (if defined).
 * If `classNames[value]` is defined, override `className` with it.
 * If `styleKey` is defined, override `style` with `[styleKey]: value`.
 */
const pluginInjectProps = (editor, {
  key,
  inject: {
    props
  }
}, nodeProps) => {
  var _transformNodeValue;

  const {
    element,
    text,
    className,
    style
  } = nodeProps;
  const node = element !== null && element !== void 0 ? element : text;
  if (!node) return;
  if (!props) return;
  const {
    nodeKey = key,
    styleKey = nodeKey,
    validTypes,
    classNames,
    transformClassName,
    transformNodeValue,
    transformStyle,
    validNodeValues,
    defaultNodeValue
  } = props;

  if (validTypes && isElement(node) && node.type && !validTypes.includes(node.type)) {
    return;
  }

  const nodeValue = node[nodeKey]; // early return if there is now reason to add styles

  if (!nodeValue || validNodeValues && !validNodeValues.includes(nodeValue) || nodeValue === defaultNodeValue) {
    return;
  }

  const res = {};
  const transformOptions = { ...nodeProps,
    nodeValue
  };
  const value = (_transformNodeValue = transformNodeValue === null || transformNodeValue === void 0 ? void 0 : transformNodeValue(transformOptions)) !== null && _transformNodeValue !== void 0 ? _transformNodeValue : nodeValue;

  if (element) {
    res.className = clsx(className, `slate-${nodeKey}-${nodeValue}`);
  }

  if (classNames !== null && classNames !== void 0 && classNames[nodeValue] || transformClassName) {
    var _transformClassName;

    res.className = (_transformClassName = transformClassName === null || transformClassName === void 0 ? void 0 : transformClassName(transformOptions)) !== null && _transformClassName !== void 0 ? _transformClassName : clsx(className, classNames === null || classNames === void 0 ? void 0 : classNames[value]);
  }

  if (styleKey) {
    var _transformStyle;

    res.style = (_transformStyle = transformStyle === null || transformStyle === void 0 ? void 0 : transformStyle(transformOptions)) !== null && _transformStyle !== void 0 ? _transformStyle : { ...style,
      [styleKey]: value
    };
  }

  return res;
};

/**
 * Inject plugin props, editor.
 */

const pipeInjectProps = (editor, nodeProps) => {
  editor.plugins.forEach(plugin => {
    if (plugin.inject.props) {
      const props = pluginInjectProps(editor, plugin, nodeProps);

      if (props) {
        nodeProps = { ...nodeProps,
          ...props
        };
      }
    }
  });
  return { ...nodeProps,
    editor
  };
};

const pipeOnChange = editor => {
  const onChanges = editor.plugins.flatMap(plugin => {
    var _plugin$handlers$onCh, _plugin$handlers, _plugin$handlers$onCh2;

    return (_plugin$handlers$onCh = (_plugin$handlers = plugin.handlers) === null || _plugin$handlers === void 0 ? void 0 : (_plugin$handlers$onCh2 = _plugin$handlers.onChange) === null || _plugin$handlers$onCh2 === void 0 ? void 0 : _plugin$handlers$onCh2.call(_plugin$handlers, editor, plugin)) !== null && _plugin$handlers$onCh !== void 0 ? _plugin$handlers$onCh : [];
  });
  return nodes => {
    return onChanges.some(handler => {
      if (!handler) {
        return false;
      } // The custom event handler may return a boolean to specify whether the event
      // shall be treated as being handled or not.


      const shouldTreatEventAsHandled = handler(nodes);

      if (shouldTreatEventAsHandled != null) {
        return shouldTreatEventAsHandled;
      }

      return false;
    });
  };
};

/**
 * Get a `Editable.renderElement` handler for `options.type`.
 * If the type is equals to the slate element type, render `options.component`.
 * Else, return `undefined` so the pipeline can check the next plugin.
 */

const pluginRenderElement = (editor, {
  key,
  type,
  component: _component,
  props
}) => nodeProps => {
  const {
    element,
    children: _children
  } = nodeProps;

  if (element.type === type) {
    const Element = _component !== null && _component !== void 0 ? _component : DefaultElement;
    const injectAboveComponents = editor.plugins.flatMap(o => {
      var _o$inject$aboveCompon, _o$inject;

      return (_o$inject$aboveCompon = (_o$inject = o.inject) === null || _o$inject === void 0 ? void 0 : _o$inject.aboveComponent) !== null && _o$inject$aboveCompon !== void 0 ? _o$inject$aboveCompon : [];
    });
    const injectBelowComponents = editor.plugins.flatMap(o => {
      var _o$inject$belowCompon, _o$inject2;

      return (_o$inject$belowCompon = (_o$inject2 = o.inject) === null || _o$inject2 === void 0 ? void 0 : _o$inject2.belowComponent) !== null && _o$inject$belowCompon !== void 0 ? _o$inject$belowCompon : [];
    });
    nodeProps = getRenderNodeProps({
      attributes: element.attributes,
      nodeProps: nodeProps,
      props,
      type: type
    });
    let children = _children;
    injectBelowComponents.forEach(withHOC => {
      const hoc = withHOC({ ...nodeProps,
        key
      });

      if (hoc) {
        children = hoc({ ...nodeProps,
          children
        });
      }
    });
    let component = /*#__PURE__*/React.createElement(Element, nodeProps, children);
    injectAboveComponents.forEach(withHOC => {
      const hoc = withHOC({ ...nodeProps,
        key
      });

      if (hoc) {
        component = hoc({ ...nodeProps,
          children: component
        });
      }
    });
    return /*#__PURE__*/React.createElement(ElementProvider, {
      element: element,
      scope: key
    }, component);
  }
};

/**
 * @see {@link RenderElement}
 */

const pipeRenderElement = (editor, renderElementProp) => {
  const renderElements = [];
  editor.plugins.forEach(plugin => {
    if (plugin.isElement) {
      renderElements.push(pluginRenderElement(editor, plugin));
    }
  });
  return nodeProps => {
    const props = pipeInjectProps(editor, nodeProps);
    let element;
    renderElements.some(renderElement => {
      element = renderElement(props);
      return !!element;
    });
    if (element) return element;

    if (renderElementProp) {
      return renderElementProp(props);
    }

    return /*#__PURE__*/React.createElement(DefaultElement, props);
  };
};

/**
 * Get a `Editable.renderLeaf` handler for `options.type`.
 * If the type is equals to the slate leaf type, render `options.component`.
 * Else, return `children`.
 */

const pluginRenderLeaf = (editor, {
  key,
  type = key,
  component,
  props
}) => nodeProps => {
  const {
    leaf,
    children
  } = nodeProps;

  if (leaf[type]) {
    const Leaf = component !== null && component !== void 0 ? component : DefaultLeaf;
    nodeProps = getRenderNodeProps({
      attributes: leaf.attributes,
      props,
      nodeProps: nodeProps,
      type
    });
    return /*#__PURE__*/React.createElement(Leaf, nodeProps, children);
  }

  return children;
};

/**
 * @see {@link RenderLeaf}
 */

const pipeRenderLeaf = (editor, renderLeafProp) => {
  const renderLeafs = [];
  editor.plugins.forEach(plugin => {
    if (plugin.isLeaf && plugin.key) {
      renderLeafs.push(pluginRenderLeaf(editor, plugin));
    }
  });
  return nodeProps => {
    const props = pipeInjectProps(editor, nodeProps);
    renderLeafs.forEach(renderLeaf => {
      const newChildren = renderLeaf(props);

      if (newChildren !== undefined) {
        props.children = newChildren;
      }
    });

    if (renderLeafProp) {
      return renderLeafProp(props);
    }

    return /*#__PURE__*/React.createElement(DefaultLeaf, props);
  };
};

const withHOC = (HOC, Component, hocProps) => props => /*#__PURE__*/React.createElement(HOC, hocProps, /*#__PURE__*/React.createElement(Component, props));

const getJotaiProviderInitialValues = (store, props) => {
  const initialValues = [];
  Object.keys(props).forEach(key => {
    if (key in store.atom) {
      initialValues.push([store.atom[key], props[key]]);
    }
  });
  return initialValues;
};

/**
 * Set a new editor with plate.
 */

const useResetPlateEditor = id => {
  const editor = usePlateSelectors(id).editor();
  const setEditor = usePlateActions(id).editor();
  return useCallback(() => {
    const newEditor = createPlateEditor({
      id: editor.id,
      plugins: editor.plugins,
      // disable core plugins as it's already included
      disableCorePlugins: true
    });
    setEditor(newEditor);
  }, [editor, setEditor]);
};

/**
 * Get editor ref which is never updated.
 */

const usePlateEditorRef = id => usePlateSelectors(id).editor();

/**
 * Get editor state which is updated on editor change.
 */

const usePlateEditorState = id => {
  usePlateSelectors(id).keyEditor();
  return usePlateEditorRef(id);
};

/**
 * Get the editor readOnly.
 */

const usePlateReadOnly = id => {
  return usePlateSelectors(id).readOnly();
};

/**
 * Get the editor selection which is updated on editor change.
 */

const usePlateSelection = id => {
  usePlateSelectors(id).keySelection();
  return usePlateEditorRef(id).selection;
};

const getEventPlateId = id => {
  var _eventEditorSelectors;

  if (id) return id;
  const focus = eventEditorSelectors.focus();
  if (focus) return focus;
  const blur = eventEditorSelectors.blur();
  if (blur) return blur;
  return (_eventEditorSelectors = eventEditorSelectors.last()) !== null && _eventEditorSelectors !== void 0 ? _eventEditorSelectors : PLATE_SCOPE;
};

/**
 * Get last event editor id: focus, blur or last.
 */

const useEventPlateId = id => {
  var _ref;

  const focus = useEventEditorSelectors.focus();
  const blur = useEventEditorSelectors.blur();
  const last = useEventEditorSelectors.last();
  const providerId = usePlateSelectors().id();
  if (id) return id;
  if (focus) return focus;
  if (blur) return blur;
  return (_ref = last !== null && last !== void 0 ? last : providerId) !== null && _ref !== void 0 ? _ref : PLATE_SCOPE;
};

const DOM_HANDLERS = [// Clipboard Events
'onCopy', 'onCopyCapture', 'onCut', 'onCutCapture', 'onPaste', 'onPasteCapture', // Composition Events
'onCompositionEnd', 'onCompositionEndCapture', 'onCompositionStart', 'onCompositionStartCapture', 'onCompositionUpdate', 'onCompositionUpdateCapture', // Focus Events
'onFocus', 'onFocusCapture', 'onBlur', 'onBlurCapture', // Form Events
'onDOMBeforeInput', 'onBeforeInput', 'onBeforeInputCapture', 'onInput', 'onInputCapture', 'onReset', 'onResetCapture', 'onSubmit', 'onSubmitCapture', 'onInvalid', 'onInvalidCapture', // Image Events
'onLoad', 'onLoadCapture', // Keyboard Events
'onKeyDown', 'onKeyDownCapture', 'onKeyPress', 'onKeyPressCapture', 'onKeyUp', 'onKeyUpCapture', // Media Events
'onAbort', 'onAbortCapture', 'onCanPlay', 'onCanPlayCapture', 'onCanPlayThrough', 'onCanPlayThroughCapture', 'onDurationChange', 'onDurationChangeCapture', 'onEmptied', 'onEmptiedCapture', 'onEncrypted', 'onEncryptedCapture', 'onEnded', 'onEndedCapture', 'onLoadedData', 'onLoadedDataCapture', 'onLoadedMetadata', 'onLoadedMetadataCapture', 'onLoadStart', 'onLoadStartCapture', 'onPause', 'onPauseCapture', 'onPlay', 'onPlayCapture', 'onPlaying', 'onPlayingCapture', 'onProgress', 'onProgressCapture', 'onRateChange', 'onRateChangeCapture', 'onSeeked', 'onSeekedCapture', 'onSeeking', 'onSeekingCapture', 'onStalled', 'onStalledCapture', 'onSuspend', 'onSuspendCapture', 'onTimeUpdate', 'onTimeUpdateCapture', 'onVolumeChange', 'onVolumeChangeCapture', 'onWaiting', 'onWaitingCapture', // MouseEvents
'onAuxClick', 'onAuxClickCapture', 'onClick', 'onClickCapture', 'onContextMenu', 'onContextMenuCapture', 'onDoubleClick', 'onDoubleClickCapture', 'onDrag', 'onDragCapture', 'onDragEnd', 'onDragEndCapture', 'onDragEnter', 'onDragEnterCapture', 'onDragExit', 'onDragExitCapture', 'onDragLeave', 'onDragLeaveCapture', 'onDragOver', 'onDragOverCapture', 'onDragStart', 'onDragStartCapture', 'onDrop', 'onDropCapture', 'onMouseDown', 'onMouseDownCapture', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseMoveCapture', 'onMouseOut', 'onMouseOutCapture', 'onMouseOver', 'onMouseOverCapture', 'onMouseUp', 'onMouseUpCapture', // Selection Events
'onSelect', 'onSelectCapture', // Touch Events
'onTouchCancel', 'onTouchCancelCapture', 'onTouchEnd', 'onTouchEndCapture', 'onTouchMove', 'onTouchMoveCapture', 'onTouchStart', 'onTouchStartCapture', // Pointer Events
'onPointerDown', 'onPointerDownCapture', 'onPointerMove', 'onPointerMoveCapture', 'onPointerUp', 'onPointerUpCapture', 'onPointerCancel', 'onPointerCancelCapture', 'onPointerEnter', 'onPointerEnterCapture', 'onPointerLeave', 'onPointerLeaveCapture', 'onPointerOver', 'onPointerOverCapture', 'onPointerOut', 'onPointerOutCapture', 'onGotPointerCapture', 'onGotPointerCaptureCapture', 'onLostPointerCapture', 'onLostPointerCaptureCapture', // UI Events
'onScroll', 'onScrollCapture', // Wheel Events
'onWheel', 'onWheelCapture', // Animation Events
'onAnimationStart', 'onAnimationStartCapture', 'onAnimationEnd', 'onAnimationEndCapture', 'onAnimationIteration', 'onAnimationIterationCapture', // Transition Events
'onTransitionEnd', 'onTransitionEndCapture'];

const useEditableProps = ({
  id,
  ...editableProps
} = {}) => {
  var _selectors$decorate, _selectors$renderLeaf, _selectors$renderElem;

  const editor = usePlateEditorRef(id);
  const selectors = usePlateSelectors(id);
  const keyDecorate = selectors.keyDecorate();
  const readOnly = selectors.readOnly();
  const storeDecorate = (_selectors$decorate = selectors.decorate()) === null || _selectors$decorate === void 0 ? void 0 : _selectors$decorate.fn;
  const storeRenderLeaf = (_selectors$renderLeaf = selectors.renderLeaf()) === null || _selectors$renderLeaf === void 0 ? void 0 : _selectors$renderLeaf.fn;
  const storeRenderElement = (_selectors$renderElem = selectors.renderElement()) === null || _selectors$renderElem === void 0 ? void 0 : _selectors$renderElem.fn;
  const decorateMemo = useMemo(() => {
    return pipeDecorate(editor, storeDecorate !== null && storeDecorate !== void 0 ? storeDecorate : editableProps === null || editableProps === void 0 ? void 0 : editableProps.decorate);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.decorate, editor, storeDecorate]);
  const decorate = useMemo(() => {
    if (!keyDecorate || !decorateMemo) return;
    return entry => decorateMemo(entry);
  }, [decorateMemo, keyDecorate]);
  const renderElement = useMemo(() => {
    return pipeRenderElement(editor, storeRenderElement !== null && storeRenderElement !== void 0 ? storeRenderElement : editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderElement);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderElement, editor, storeRenderElement]);
  const renderLeaf = useMemo(() => {
    return pipeRenderLeaf(editor, storeRenderLeaf !== null && storeRenderLeaf !== void 0 ? storeRenderLeaf : editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderLeaf);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderLeaf, editor, storeRenderLeaf]);
  const props = useDeepCompareMemo(() => {
    const _props = {
      decorate,
      renderElement,
      renderLeaf
    };

    if (isDefined(readOnly)) {
      _props.readOnly = readOnly;
    }

    DOM_HANDLERS.forEach(handlerKey => {
      const handler = pipeHandler(editor, {
        editableProps,
        handlerKey
      });

      if (handler) {
        _props[handlerKey] = handler;
      }
    });
    return _props;
  }, [decorate, editableProps, renderElement, renderLeaf, readOnly]);
  return useDeepCompareMemo(() => ({ ...omit_1(editableProps, [...DOM_HANDLERS, 'renderElement', 'renderLeaf']),
    ...props
  }), [editableProps, props]);
};

/**
 * Typed {@link useSlateStatic} & PlateEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `usePlateEditorRef`.
 */
const useEditorRef = () => useSlateStatic();

/**
 * Typed {@link useSlate} & PlateEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `usePlateEditorState`.
 */
const useEditorState = () => useSlate();

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined;

/**
 * A hook to update the store when the props changes.
 * Undefined props are ignored.
 */
const usePlateStoreOnChange = ({
  setState,
  state,
  nextState,
  nextStateValue = nextState
}) => {
  useEffect(() => {
    if (nextState !== state && !isUndefined_1(nextState)) {
      setState(nextStateValue);
    }
  }, [setState, state, nextState, nextStateValue]);
};

const usePlateEffects = ({
  id,
  disableCorePlugins,
  value: valueProp,
  onChange: onChangeProp,
  plugins: pluginsProp,
  editorRef: editorRefProp,
  decorate: decorateProp,
  renderElement: renderElementProp,
  renderLeaf: renderLeafProp,
  readOnly: readOnlyProp
}) => {
  const editor = usePlateEditorRef(id);
  const states = usePlateStates(id);
  const [value, setValue] = states.value();
  const [editorRef, setEditorRef] = states.editorRef();
  const [decorate, setDecorate] = states.decorate();
  const [renderElement, setRenderElement] = states.renderElement();
  const [renderLeaf, setRenderLeaf] = states.renderLeaf();
  const [rawPlugins, setRawPlugins] = states.rawPlugins();
  const [, setPlugins] = states.plugins();
  const [onChange, setOnChange] = states.onChange();
  const [readOnly, setReadOnly] = states.readOnly(); // Store Slate.value

  usePlateStoreOnChange({
    state: value,
    setState: setValue,
    nextState: valueProp
  });
  usePlateStoreOnChange({
    state: readOnly,
    setState: setReadOnly,
    nextState: readOnlyProp
  });
  usePlateStoreOnChange({
    state: rawPlugins,
    setState: setPlugins,
    nextState: pluginsProp,
    nextStateValue: pluginsProp !== null && pluginsProp !== void 0 ? pluginsProp : []
  });
  usePlateStoreOnChange({
    state: onChange === null || onChange === void 0 ? void 0 : onChange.fn,
    setState: setOnChange,
    nextState: onChangeProp,
    nextStateValue: onChangeProp ? {
      fn: onChangeProp
    } : null
  });
  usePlateStoreOnChange({
    state: editorRef === null || editorRef === void 0 ? void 0 : editorRef.ref,
    setState: setEditorRef,
    nextState: editorRefProp,
    nextStateValue: editorRefProp ? {
      ref: editorRefProp
    } : null
  });
  usePlateStoreOnChange({
    state: decorate === null || decorate === void 0 ? void 0 : decorate.fn,
    setState: setDecorate,
    nextState: decorateProp,
    nextStateValue: decorateProp ? {
      fn: decorateProp
    } : null
  });
  usePlateStoreOnChange({
    state: renderElement === null || renderElement === void 0 ? void 0 : renderElement.fn,
    setState: setRenderElement,
    nextState: renderElementProp,
    nextStateValue: renderElementProp ? {
      fn: renderElementProp
    } : null
  });
  usePlateStoreOnChange({
    state: renderLeaf === null || renderLeaf === void 0 ? void 0 : renderLeaf.fn,
    setState: setRenderLeaf,
    nextState: renderLeafProp,
    nextStateValue: renderLeafProp ? {
      fn: renderLeafProp
    } : null
  });
  useEffect(() => {
    if (pluginsProp !== rawPlugins) {
      setRawPlugins(rawPlugins);
      setPlatePlugins(editor, {
        plugins: pluginsProp,
        disableCorePlugins
      });
      setPlugins(editor.plugins);
    }
  }, [disableCorePlugins, editor, rawPlugins, pluginsProp, setPlugins, setRawPlugins]);
};

/**
 * Get Slate props stored in a global store.
 */

const useSlateProps = ({
  id
}) => {
  var _usePlateSelectors$on;

  const editor = usePlateEditorRef(id);
  const value = usePlateSelectors(id).value();
  const setValue = usePlateActions(id).value();
  const onChangeProp = (_usePlateSelectors$on = usePlateSelectors(id).onChange()) === null || _usePlateSelectors$on === void 0 ? void 0 : _usePlateSelectors$on.fn;
  const onChange = useCallback(newValue => {
    const eventIsHandled = pipeOnChange(editor)(newValue);

    if (!eventIsHandled) {
      onChangeProp === null || onChangeProp === void 0 ? void 0 : onChangeProp(newValue);
    }

    setValue(newValue);
  }, [editor, setValue, onChangeProp]);
  return useMemo(() => {
    return {
      key: editor.key,
      editor,
      onChange,
      value,
      initialValue: value
    };
  }, [editor, onChange, value]);
};

// A list of store keys to be exposed in `editor.plate.set`.
const EXPOSED_STORE_KEYS = ['readOnly', 'plugins', 'onChange', 'decorate', 'renderElement', 'renderLeaf'];

const EditorMethodsEffect = ({
  id
}) => {
  const editor = useEditorRef();
  const resetEditor = useResetPlateEditor(id);
  const redecorate = useRedecorate(id);
  const plateStore = usePlateStore(id); // Must be in a scope where hooks can be called.

  const storeSetters = Object.fromEntries(EXPOSED_STORE_KEYS.map(key => [key, plateStore.set[key]()])); // eslint-disable-next-line react-hooks/exhaustive-deps

  const memorizedStoreSetters = useMemo(() => storeSetters, []);
  useEffect(() => {
    editor.reset = resetEditor;
    editor.redecorate = redecorate;
    editor.plate = {
      set: memorizedStoreSetters
    };
  }, [editor, resetEditor, redecorate, memorizedStoreSetters]);
  return null;
};

const EditorRefPluginEffect = ({
  plugin
}) => {
  var _plugin$useHooks;

  const editor = useEditorRef();
  (_plugin$useHooks = plugin.useHooks) === null || _plugin$useHooks === void 0 ? void 0 : _plugin$useHooks.call(plugin, editor, plugin);
  return null;
};
const EditorRefEffect = ({
  id
}) => {
  var _usePlateSelectors$ed;

  const setIsRendered = usePlateActions(id).isRendered();
  const plugins = usePlateSelectors(id).plugins();
  const editorState = useEditorRef();
  const editorRef = (_usePlateSelectors$ed = usePlateSelectors(id).editorRef()) === null || _usePlateSelectors$ed === void 0 ? void 0 : _usePlateSelectors$ed.ref;
  useEffect(() => {
    setIsRendered(true);
    return () => {
      setIsRendered(false);
    };
  }, [setIsRendered]);
  /**
   * Pass `editorState` to `editorRef` when the editor mounts. Since the editor
   * instance is mutable, we don't need to update it on every change, although
   * consumers will need to manually trigger a re-render inside `onChange` if
   * they want to use `editorRef` with `useState`.
   */

  useEffect(() => {
    if (typeof editorRef === 'function') {
      editorRef(editorState);
      return () => editorRef(null);
    }

    if (editorRef) {
      editorRef.current = editorState;
      return () => {
        editorRef.current = null;
      };
    }
  }, [editorRef, editorState]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, plugins.map(plugin => /*#__PURE__*/React.createElement(EditorRefPluginEffect, {
    key: plugin.key,
    plugin: plugin
  })));
};

const EditorStateEffect = /*#__PURE__*/memo(({
  id
}) => {
  const editorState = useEditorState();
  const updateKeyEditor = useUpdatePlateKey('keyEditor', id);
  const updateKeySelection = useUpdatePlateKey('keySelection', id);
  useEffect(() => {
    updateKeyEditor();
  });
  useEffect(() => {
    updateKeySelection();
  }, [editorState.selection, updateKeySelection]);
  return null;
});

const PlateEditable = ({
  children,
  renderEditable,
  editableRef,
  firstChildren,
  ...props
}) => {
  const {
    id
  } = props;
  const editor = useEditorRef();
  const {
    plugins
  } = editor;
  const editableProps = useEditableProps(props);
  const editable = /*#__PURE__*/React.createElement(Editable, _extends({
    ref: editableRef
  }, editableProps));
  let afterEditable = null;
  let beforeEditable = null;
  plugins.forEach(plugin => {
    const {
      renderBeforeEditable,
      renderAfterEditable
    } = plugin;

    if (renderAfterEditable) {
      afterEditable = /*#__PURE__*/React.createElement(React.Fragment, null, afterEditable, renderAfterEditable(editableProps));
    }

    if (renderBeforeEditable) {
      beforeEditable = /*#__PURE__*/React.createElement(React.Fragment, null, beforeEditable, renderBeforeEditable(editableProps));
    }
  });
  let aboveEditable = /*#__PURE__*/React.createElement(React.Fragment, null, firstChildren, beforeEditable, renderEditable ? renderEditable(editable) : editable, /*#__PURE__*/React.createElement(EditorMethodsEffect, {
    id: id
  }), /*#__PURE__*/React.createElement(EditorStateEffect, {
    id: id
  }), /*#__PURE__*/React.createElement(EditorRefEffect, {
    id: id
  }), afterEditable, children);
  plugins.forEach(plugin => {
    const {
      renderAboveEditable
    } = plugin;
    if (renderAboveEditable) aboveEditable = renderAboveEditable({
      children: aboveEditable
    });
  });
  return aboveEditable;
};

const PlateProviderEffects = ({
  children,
  ...props
}) => {
  usePlateEffects(props);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};

const PlateProviderContent = ({
  normalizeInitialValue: shouldNormalizeInitialValue,
  ...props
}) => {
  const {
    id = PLATE_SCOPE,
    editor: _editor,
    initialValue,
    value: _value,
    children,
    plugins: _plugins,
    disableCorePlugins,
    onChange,
    editorRef,
    decorate,
    renderElement,
    renderLeaf,
    readOnly
  } = props;
  const editor = useMemo(() => _editor !== null && _editor !== void 0 ? _editor : createPlateEditor({
    id,
    plugins: _plugins,
    disableCorePlugins
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  const value = useMemo(() => {
    let currValue = initialValue !== null && initialValue !== void 0 ? initialValue : _value;

    if (!currValue) {
      currValue = editor.children.length ? editor.children : editor.childrenFactory();
    }

    const normalizedValue = normalizeInitialValue(editor, currValue);

    if (normalizedValue) {
      currValue = normalizedValue;
    }

    editor.children = currValue;

    if (shouldNormalizeInitialValue) {
      normalizeEditor(editor, {
        force: true
      });
    }

    return editor.children;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return /*#__PURE__*/React.createElement(JotaiProvider, {
    initialValues: [[plateStore.atom.id, id], [plateStore.atom.editor, editor], [plateStore.atom.plugins, editor.plugins], [plateStore.atom.rawPlugins, _plugins], [plateStore.atom.readOnly, readOnly], [plateStore.atom.value, value], [plateStore.atom.decorate, {
      fn: decorate
    }], [plateStore.atom.onChange, {
      fn: onChange
    }], [plateStore.atom.editorRef, {
      ref: editorRef
    }], [plateStore.atom.renderElement, {
      fn: renderElement
    }], [plateStore.atom.renderLeaf, {
      fn: renderLeaf
    }]],
    scope: id
  }, /*#__PURE__*/React.createElement(JotaiProvider, {
    initialValues: [[plateIdAtom, id]],
    scope: GLOBAL_PLATE_SCOPE
  }, /*#__PURE__*/React.createElement(PlateProviderEffects, props, children)));
};

const PlateProvider = props => {
  const {
    id
  } = props;
  return /*#__PURE__*/React.createElement(PlateProviderContent, _extends({
    key: id === null || id === void 0 ? void 0 : id.toString()
  }, props));
};
const withPlateProvider = (Component, hocProps) => withHOC(PlateProvider, Component, hocProps);

const PlateSlate = ({
  id,
  children
}) => {
  const slateProps = useSlateProps({
    id
  });
  const {
    plugins
  } = usePlateSelectors(id).editor();
  let aboveSlate = /*#__PURE__*/React.createElement(Slate, slateProps, children);
  plugins === null || plugins === void 0 ? void 0 : plugins.forEach(plugin => {
    const {
      renderAboveSlate
    } = plugin;
    if (renderAboveSlate) aboveSlate = renderAboveSlate({
      children: aboveSlate
    });
  });
  return aboveSlate;
};

const Plate = ({
  children,
  editableRef,
  firstChildren,
  renderEditable,
  editableProps,
  ...props
}) => {
  const {
    id = PLATE_SCOPE
  } = props;
  const providerId = usePlateSelectors(id).id();
  const editable = /*#__PURE__*/React.createElement(PlateSlate, {
    id: id
  }, /*#__PURE__*/React.createElement(PlateEditable, _extends({
    id: id,
    editableRef: editableRef,
    firstChildren: firstChildren,
    renderEditable: renderEditable
  }, editableProps), children));
  return providerId ? editable : /*#__PURE__*/React.createElement(PlateProvider, props, editable);
};

const PlateTest = ({
  variant = 'wordProcessor',
  editableProps,
  normalizeInitialValue,
  ...props
}) => {
  const {
    editor: _editor,
    id,
    plugins
  } = props;
  let editor = _editor;

  if (editor && !editor.plugins) {
    editor = createPlateEditor({
      editor,
      plugins,
      id,
      normalizeInitialValue
    });
  }

  return /*#__PURE__*/React.createElement(Plate, _extends({}, props, {
    editor: editor,
    editableProps: {
      'data-variant': variant,
      'data-testid': 'slate-content-editable',
      autoFocus: true,
      ...editableProps
    }
  }));
};

/**
 * Toggle the type of the selected node.
 * Don't do anything if activeType === inactiveType.
 */
const toggleNodeType = (editor, options, editorNodesOptions) => {
  const {
    activeType,
    inactiveType = getPluginType(editor, ELEMENT_DEFAULT)
  } = options;
  if (!activeType || !editor.selection) return;
  const isActive = someNode(editor, { ...editorNodesOptions,
    match: {
      type: activeType
    }
  });
  if (isActive && activeType === inactiveType) return;
  setElements(editor, {
    type: isActive ? inactiveType : activeType
  });
};

export { CARRIAGE_RETURN, DOM_HANDLERS, DefaultLeaf, ELEMENT_DEFAULT, EXPOSED_STORE_KEYS, EditorMethodsEffect, EditorRefEffect, EditorRefPluginEffect, EditorStateEffect, ElementProvider, ElementProviderChild, GLOBAL_PLATE_SCOPE, Hotkeys, JotaiProvider, KEY_DESERIALIZE_AST, KEY_DESERIALIZE_HTML, KEY_EDITOR_PROTOCOL, KEY_EVENT_EDITOR, KEY_INLINE_VOID, KEY_INSERT_DATA, KEY_NODE_FACTORY, KEY_PREV_SELECTION, LINE_FEED, NO_BREAK_SPACE, PLATE_SCOPE, Plate, PlateEditable, PlateProvider, PlateProviderEffects, PlateSlate, PlateTest, SCOPE_ELEMENT, SPACE, TAB, ZERO_WIDTH_SPACE, applyDeepToNodes, cleanHtmlBrElements, cleanHtmlCrLf, cleanHtmlEmptyElements, cleanHtmlFontElements, cleanHtmlLinkElements, cleanHtmlTextNodes, copyBlockMarksToSpanChild, createAtomStore, createDeserializeAstPlugin, createDeserializeHtmlPlugin, createEditorProtocolPlugin, createEventEditorPlugin, createHistoryPlugin, createInlineVoidPlugin, createInsertDataPlugin, createNodeFactoryPlugin, createPlateEditor, createPlateStore, createPluginFactory, createPlugins, createPrevSelectionPlugin, createReactPlugin, deserializeHtml, deserializeHtmlElement, deserializeHtmlNode, deserializeHtmlNodeChildren, elementStore, eventEditorActions, eventEditorSelectors, eventEditorStore, findHtmlElement, flattenDeepPlugins, getEventPlateId, getHtmlComments, getInjectedPlugins, getJotaiProviderInitialValues, getKeyByType, getKeysByTypes, getPlugin, getPluginInjectProps, getPluginOptions, getPluginType, getPluginTypes, getPlugins, getPluginsByKey, getRenderNodeProps, getSlateClass, htmlBodyToFragment, htmlBrToNewLine, htmlElementToElement, htmlElementToLeaf, htmlStringToDOMNode, htmlTextNodeToString, isEventHandled, isHtmlBlockElement, isHtmlComment, isHtmlElement, isHtmlFragmentHref, isHtmlText, isOlSymbol, mapInjectPropsToPlugin, mergeDeepPlugins, mergeDeepToNodes, mockPlugin, normalizeDescendantsToDocumentFragment, normalizeInitialValue, overridePluginsByKey, parseHtmlDocument, parseHtmlElement, pipeDecorate, pipeDeserializeHtmlElement, pipeDeserializeHtmlLeaf, pipeHandler, pipeInjectProps, pipeInsertDataQuery, pipeInsertFragment, pipeOnChange, pipeRenderElement, pipeRenderLeaf, pipeTransformData, pipeTransformFragment, plateIdAtom, plateStore, pluginDeserializeHtml, pluginInjectProps, pluginRenderElement, pluginRenderLeaf, postCleanHtml, preCleanHtml, removeHtmlNodesBetweenComments, removeHtmlSurroundings, replaceTagName, setDefaultPlugin, setPlatePlugins, someHtmlElement, toggleNodeType, traverseHtmlComments, traverseHtmlElements, traverseHtmlNode, traverseHtmlTexts, unwrapHtmlElement, useEditableProps, useEditorRef, useEditorState, useElement, useElementStore, useEventEditorSelectors, useEventPlateId, usePlateActions, usePlateEditorRef, usePlateEditorState, usePlateEffects, usePlateId, usePlateReadOnly, usePlateSelection, usePlateSelectors, usePlateStates, usePlateStore, useRedecorate, useResetPlateEditor, useSlateProps, useUpdatePlateKey, withEditorProtocol, withHOC, withInlineVoid, withInsertData, withPlate, withPlateProvider, withTHistory, withTReact };
//# sourceMappingURL=index.es.js.map
