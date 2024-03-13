
const lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
const long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;

const latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
const longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;


/**
 * @func
 * Check if the given string is Lat Long or not.
 * @param  {String} str Lat Long in comma separated string
 * @param  {boolean} isInDecimal Is the lat long value in string provided in decimal
 * @return {boolean}  true/false based on lat long.
 * 
 * @example
 *
 *      const isValidLatLong = ("11.770570, -162.949219");
 *          /// With degrees minutes and seconds
 *       const isValidLatLong = ("40° 89′ 46″ S, 79° 58′ 100″ E", false);
 */
function isLatLong(str, isInDecimal = true) {
    
    str = str.toString();
    if (!str.includes(',')) return false;
    const pair = str.split(',');
    if ((pair[0].startsWith('(') && !pair[1].endsWith(')'))
      || (pair[1].endsWith(')') && !pair[0].startsWith('('))) return false;
  
    if (!isInDecimal) {
      return latDMS.test(pair[0]) && longDMS.test(pair[1]);
    }
    return lat.test(pair[0]) && long.test(pair[1]);
  }

  module.exports = isLatLong;
  
  