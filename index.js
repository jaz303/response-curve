/**
 * Create a linear interpolating response curve.
 *
 * When the fourth parameter is omitted, the third will be interpreted
 * as the slope of the line.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} x2
 * @param {number} y2
 */
function linear(x, y, x2, y2) {
  if (typeof y2 === 'undefined') {
    var m = x2;
  } else {
    var m = (x2 - x) / (y2 - y);
  }

  return function(v) {
    return y + (v - x * m);
  };
}

/**
 * Create an array interpolating response curve 
 *
 * @param {number} min
 * @param {number} max
 * @param {number|Array} numSamples
 * @param {function} [sampler]
 */
function array(min, max, numSamples, sampler) {

  if (Array.isArray(numSamples)) {
    var samples = numSamples,
        step    = (max - min) / samples.length;
  } else {
    var samples = [],
        step    = (max - min) / numSamples;

    for (var i = 0; i < numSamples; ++i) {
      samples.push(sampler(min + (i * step)));
    }
  }

  return function(v) {
    var baseIndex = ((v - min) / step) | 0;

    if (baseIndex <= 0) {
      return samples[0];
    } else if (baseIndex >= samples.length) {
      return samples[samples.length - 1];
    }

    var t = (v - (baseIndex * step)) / step;
    return ((1 - t) * samples[baseIndex]) + (t * samples[baseIndex + 1]);
  };

}

exports.linear = linear;