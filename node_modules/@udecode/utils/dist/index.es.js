const IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);

const escapeRegExp = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
};

const findHtmlParentElement = (el, nodeName) => {
  if (!el || el.nodeName === nodeName) {
    return el;
  }

  return findHtmlParentElement(el.parentElement, nodeName);
};

/**
 * Call a handler if defined
 */
const getHandler = (cb, ...args) => () => {
  cb === null || cb === void 0 ? void 0 : cb(...args);
};

const hexToBase64 = hex => {
  const hexPairs = hex.match(/\w{2}/g) || [];
  const binary = hexPairs.map(hexPair => String.fromCharCode(parseInt(hexPair, 16)));
  return btoa(binary.join(''));
};

/**
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 */
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const emailLintRE = /mailto:([^\\?]+)/;
const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;
/**
 * Loosely validate a URL `string`.
 */

const isUrl = string => {
  if (typeof string !== 'string') {
    return false;
  }

  const generalMatch = string.match(protocolAndDomainRE);
  const emailLinkMatch = string.match(emailLintRE);
  const match = generalMatch || emailLinkMatch;

  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];

  if (!everythingAfterProtocol) {
    return false;
  }

  try {
    new URL(string);
  } catch (err) {
    return false;
  }

  return localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol);
};

/**
 * Merge props by composing handlers.
 */
const mergeProps = (props, overrideProps, {
  handlerKeys,
  handlerQuery = key => key.indexOf('on') === 0
} = {}) => {
  const map = new Map();
  const acc = {};

  const mapProps = _props => {
    if (!_props) return;
    Object.entries(_props).forEach(([key, value]) => {
      if ((!handlerKeys || handlerKeys.includes(key)) && (!handlerQuery || handlerQuery(key)) && typeof value === 'function') {
        var _map$get;

        if (!map.has(key)) {
          map.set(key, []);
        }

        (_map$get = map.get(key)) === null || _map$get === void 0 ? void 0 : _map$get.push(value);

        acc[key] = (...args) => {
          var _map$get2;

          (_map$get2 = map.get(key)) === null || _map$get2 === void 0 ? void 0 : _map$get2.forEach(fn => fn(...args));
        };
      } else {
        acc[key] = value;
      }
    });
  };

  mapProps(props);
  mapProps(overrideProps);
  return acc;
};

const sanitizeUrl = (url, {
  allowedSchemes,
  permitInvalid = false
}) => {
  if (!url) return null;
  let parsedUrl = null;

  try {
    parsedUrl = new URL(url);
  } catch (error) {
    return permitInvalid ? url : null;
  }

  if (allowedSchemes && !allowedSchemes.includes(parsedUrl.protocol.slice(0, -1))) {
    return null;
  }

  return parsedUrl.href;
};

/**
 * @returns whether the provided parameter is undefined.
 */
const isUndefined = obj => typeof obj === 'undefined';
const isNull = obj => obj === null;
/**
 * @returns whether the provided parameter is undefined or null.
 */

const isUndefinedOrNull = obj => isUndefined(obj) || isNull(obj);
/**
 * @returns whether the provided parameter is defined.
 */

const isDefined = arg => !isUndefinedOrNull(arg);

export { IS_APPLE, escapeRegExp, findHtmlParentElement, getHandler, hexToBase64, isDefined, isNull, isUndefined, isUndefinedOrNull, isUrl, mergeProps, sanitizeUrl };
//# sourceMappingURL=index.es.js.map
