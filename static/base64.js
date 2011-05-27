/* Base64 conversion methods.
 * Copyright (c) 2006 by Ali Farhadi.
 * released under the terms of the Gnu Public License.
 * see the GPL for details.
 *
 * Email: ali[at]farhadi[dot]ir
 * Website: http://farhadi.ir/
 */
encode = function(data)
{
    if (typeof(btoa) == 'function') return btoa(data); //use internal base64 functions if available (gecko only)
    var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var byte1, byte2, byte3;
    var ch1, ch2, ch3, ch4;
    var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
    var j = 0;
    for (var i = 0; i < data.length; i += 3) {
        byte1 = data.charCodeAt(i);
        byte2 = data.charCodeAt(i + 1);
        byte3 = data.charCodeAt(i + 2);
        ch1 = byte1 >> 2;
        ch2 = ((byte1 & 3) << 4) | (byte2 >> 4);
        ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
        ch4 = byte3 & 63;

        if (isNaN(byte2)) {
            ch3 = ch4 = 64;
        } else if (isNaN(byte3)) {
            ch4 = 64;
        }

        result[j++] = b64_map.charAt(ch1) + b64_map.charAt(ch2) + b64_map.charAt(ch3) + b64_map.charAt(ch4);
    }

    return result.join('');
}
