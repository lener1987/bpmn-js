import { isFunction } from 'min-dash';

// Wraps APIs to check:
// 1) If a callback is passed -> Warn users about callback deprecation.
// 2) If Promise class is implemented in current environment.
export function wrapForCompatibility(api) {

  return function() {

    if (!window.Promise) {
      throw new Error('Promises is not supported in this environment. Consider polyfilling.');
    }

    var argLen = arguments.length;
    if (argLen >= 1 && isFunction(arguments[argLen - 1])) {
      console.warn(
        'Passing callbacks to ' + api.name + ' is deprecated and will be removed in a future major release.' +
        'Please switch to promises, cf. https://bpmn.io/l/moving-to-promises.html'
      );
    }

    return api.apply(this, arguments);
  };
}
