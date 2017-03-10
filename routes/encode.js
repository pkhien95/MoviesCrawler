var request = require('request');
var crypto = require('crypto');
var ep = 587722;
var thfq6jcc6pj85tez = 'n1sqcua67bcq9826avrbi6m49vd7shxkn985mhodk06twz87wwxtp3dqiicks2dfyud213k6ygiomq01s94e4tr9v0k887bkyud213k6ygiomq01s94e4tr9v0k887bkqocxzw39esdyfhvtkpzq9n4e7at4kc6k8sxom08bl4dukp16h09oplu7zov4m5f8';
var cookie = '';

function bkyud213() {
    var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var b = 16;
    var c = '';
    for (var i = 0; i < b; i++) {
        var d = Math.floor(Math.random() * a.length);
        c += a.substring(d, d + 1)
    }
    return c
}

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}

function uvtxptrsqfhkympr(epId) {
    var a = bkyud213(epId);
    var b = md5(epId + thfq6jcc6pj85tez.substring(46, 58));
    return a
}
function encode64(a) {
    var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, cur, prev, byteNum, result = [];
    while (i < a.length) {
        cur = a.charCodeAt(i);
        byteNum = i % 3;
        switch (byteNum) {
            case 0:
                result.push(b.charAt(cur >> 2));
                break;
            case 1:
                result.push(b.charAt((prev & 3) << 4 | (cur >> 4)));
                break;
            case 2:
                result.push(b.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                result.push(b.charAt(cur & 0x3f));
                break
        }
        prev = cur;
        i++
    }
    if (byteNum == 0) {
        result.push(b.charAt((prev & 3) << 4));
        result.push("==")
    } else if (byteNum == 1) {
        result.push(b.charAt((prev & 0x0f) << 2));
        result.push("=")
    }
    return result.join("")
}
function jav(a) {
    var b = a + '', code = b.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) {
        var c = code;
        if (b.length === 1) {
            return code
        }
        var d = b.charCodeAt(1);
        return ((c - 0xD800) * 0x400) + (d - 0xDC00) + 0x10000
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        return code
    }
    return code
}
function uncensored(a, b) {
    var c = "";
    var i = 0;
    for (i = 0; i < a.length; i++) {
        var d = a.substr(i, 1);
        var e = b.substr(i % b.length - 1, 1);
        d = Math.floor(jav(d) + jav(e));
        d = String.fromCharCode(d);
        c = c + d
    }
    return encode64(c)
}

function getHash(epId) {
    var b = createCookie(epId);
    var c = uncensored(epId + thfq6jcc6pj85tez.substring(8, 40), b);
    console.log(encodeURIComponent(c));
    return encodeURIComponent(c);
}

function createCookie(epId) {
    var a = bkyud213(epId);
    var b = md5(epId + thfq6jcc6pj85tez.substring(46, 58));
    cookie = b + '=' + a;
    console.log(cookie);
    return a;
}

function getCookie() {
    return cookie;
}


var b = uvtxptrsqfhkympr();
var c = uncensored(ep + thfq6jcc6pj85tez.substring(8, 40), b);

exports.getHash = getHash;
exports.getCookie = getCookie;


