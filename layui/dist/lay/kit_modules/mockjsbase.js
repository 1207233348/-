/** kitadmin-v2.1.0 MIT License By http://kit.zhengjinfan.cn Author Van Zheng */
("use strict");
var _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
              return typeof t;
          }
        : function(t) {
              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
          };
layui.define(function(exports) {
    var py, qy;
    (py = this),
        (qy = function() {
            return (function(t) {
                function e(r) {
                    if (n[r]) return n[r].exports;
                    var a = (n[r] = { exports: {}, id: r, loaded: !1 });
                    return t[r].call(a.exports, a, a.exports, e), (a.loaded = !0), a.exports;
                }
                var n = {};
                return (e.m = t), (e.c = n), (e.p = ""), e(0);
            })([
                function(t, e, n) {
                    var r,
                        a = n(1),
                        o = n(3),
                        i = n(5),
                        u = n(20),
                        l = n(23),
                        s = n(25);
                    "undefined" != typeof window && (r = n(27));
                    var c = {
                        Handler: a,
                        Random: i,
                        Util: o,
                        XHR: r,
                        RE: u,
                        toJSONSchema: l,
                        valid: s,
                        heredoc: o.heredoc,
                        setup: function(t) {
                            return r.setup(t);
                        },
                        _mocked: {},
                        version: "1.0.1-beta3"
                    };
                    r && (r.Mock = c),
                        (c.mock = function(t, e, n) {
                            return 1 === arguments.length
                                ? a.gen(t)
                                : (2 === arguments.length && ((n = e), (e = void 0)),
                                  r && (window.XMLHttpRequest = r),
                                  (c._mocked[t + (e || "")] = { rurl: t, rtype: e, template: n }),
                                  c);
                        }),
                        (t.exports = c);
                },
                function(module, exports, __webpack_require__) {
                    var Constant = __webpack_require__(2),
                        Util = __webpack_require__(3),
                        Parser = __webpack_require__(4),
                        Random = __webpack_require__(5),
                        RE = __webpack_require__(20),
                        Handler = {
                            extend: Util.extend,
                            gen: function(t, e, n) {
                                (e = void 0 == e ? "" : e + ""),
                                    (n = {
                                        path: (n = n || {}).path || [Constant.GUID],
                                        templatePath: n.templatePath || [Constant.GUID++],
                                        currentContext: n.currentContext,
                                        templateCurrentContext: n.templateCurrentContext || t,
                                        root: n.root || n.currentContext,
                                        templateRoot: n.templateRoot || n.templateCurrentContext || t
                                    });
                                var r,
                                    a = Parser.parse(e),
                                    o = Util.type(t);
                                return Handler[o]
                                    ? ((r = Handler[o]({
                                          type: o,
                                          template: t,
                                          name: e,
                                          parsedName: e ? e.replace(Constant.RE_KEY, "$1") : e,
                                          rule: a,
                                          context: n
                                      })),
                                      n.root || (n.root = r),
                                      r)
                                    : t;
                            }
                        };
                    Handler.extend({
                        array: function(t) {
                            var e,
                                n,
                                r = [];
                            if (0 === t.template.length) return r;
                            if (t.rule.parameters)
                                if (1 === t.rule.min && void 0 === t.rule.max)
                                    t.context.path.push(t.name),
                                        t.context.templatePath.push(t.name),
                                        (r = Random.pick(
                                            Handler.gen(t.template, void 0, {
                                                path: t.context.path,
                                                templatePath: t.context.templatePath,
                                                currentContext: r,
                                                templateCurrentContext: t.template,
                                                root: t.context.root || r,
                                                templateRoot: t.context.templateRoot || t.template
                                            })
                                        )),
                                        t.context.path.pop(),
                                        t.context.templatePath.pop();
                                else if (t.rule.parameters[2])
                                    (t.template.__order_index = t.template.__order_index || 0),
                                        t.context.path.push(t.name),
                                        t.context.templatePath.push(t.name),
                                        (r = Handler.gen(t.template, void 0, {
                                            path: t.context.path,
                                            templatePath: t.context.templatePath,
                                            currentContext: r,
                                            templateCurrentContext: t.template,
                                            root: t.context.root || r,
                                            templateRoot: t.context.templateRoot || t.template
                                        })[t.template.__order_index % t.template.length]),
                                        (t.template.__order_index += +t.rule.parameters[2]),
                                        t.context.path.pop(),
                                        t.context.templatePath.pop();
                                else
                                    for (e = 0; e < t.rule.count; e++)
                                        for (n = 0; n < t.template.length; n++)
                                            t.context.path.push(r.length),
                                                t.context.templatePath.push(n),
                                                r.push(
                                                    Handler.gen(t.template[n], r.length, {
                                                        path: t.context.path,
                                                        templatePath: t.context.templatePath,
                                                        currentContext: r,
                                                        templateCurrentContext: t.template,
                                                        root: t.context.root || r,
                                                        templateRoot: t.context.templateRoot || t.template
                                                    })
                                                ),
                                                t.context.path.pop(),
                                                t.context.templatePath.pop();
                            else
                                for (e = 0; e < t.template.length; e++)
                                    t.context.path.push(e),
                                        t.context.templatePath.push(e),
                                        r.push(
                                            Handler.gen(t.template[e], e, {
                                                path: t.context.path,
                                                templatePath: t.context.templatePath,
                                                currentContext: r,
                                                templateCurrentContext: t.template,
                                                root: t.context.root || r,
                                                templateRoot: t.context.templateRoot || t.template
                                            })
                                        ),
                                        t.context.path.pop(),
                                        t.context.templatePath.pop();
                            return r;
                        },
                        object: function(t) {
                            var e,
                                n,
                                r,
                                a,
                                o,
                                i,
                                u = {};
                            if (void 0 != t.rule.min)
                                for (
                                    e = Util.keys(t.template),
                                        e = (e = Random.shuffle(e)).slice(0, t.rule.count),
                                        i = 0;
                                    i < e.length;
                                    i++
                                )
                                    (a = (r = e[i]).replace(Constant.RE_KEY, "$1")),
                                        t.context.path.push(a),
                                        t.context.templatePath.push(r),
                                        (u[a] = Handler.gen(t.template[r], r, {
                                            path: t.context.path,
                                            templatePath: t.context.templatePath,
                                            currentContext: u,
                                            templateCurrentContext: t.template,
                                            root: t.context.root || u,
                                            templateRoot: t.context.templateRoot || t.template
                                        })),
                                        t.context.path.pop(),
                                        t.context.templatePath.pop();
                            else {
                                for (r in ((e = []), (n = []), t.template))
                                    ("function" == typeof t.template[r] ? n : e).push(r);
                                for (e = e.concat(n), i = 0; i < e.length; i++)
                                    (a = (r = e[i]).replace(Constant.RE_KEY, "$1")),
                                        t.context.path.push(a),
                                        t.context.templatePath.push(r),
                                        (u[a] = Handler.gen(t.template[r], r, {
                                            path: t.context.path,
                                            templatePath: t.context.templatePath,
                                            currentContext: u,
                                            templateCurrentContext: t.template,
                                            root: t.context.root || u,
                                            templateRoot: t.context.templateRoot || t.template
                                        })),
                                        t.context.path.pop(),
                                        t.context.templatePath.pop(),
                                        (o = r.match(Constant.RE_KEY)) &&
                                            o[2] &&
                                            "number" === Util.type(t.template[r]) &&
                                            (t.template[r] += parseInt(o[2], 10));
                            }
                            return u;
                        },
                        number: function(t) {
                            var e, n;
                            if (t.rule.decimal) {
                                for (
                                    t.template += "",
                                        (n = t.template.split("."))[0] = t.rule.range ? t.rule.count : n[0],
                                        n[1] = (n[1] || "").slice(0, t.rule.dcount);
                                    n[1].length < t.rule.dcount;

                                )
                                    n[1] +=
                                        n[1].length < t.rule.dcount - 1
                                            ? Random.character("number")
                                            : Random.character("123456789");
                                e = parseFloat(n.join("."), 10);
                            } else e = t.rule.range && !t.rule.parameters[2] ? t.rule.count : t.template;
                            return e;
                        },
                        boolean: function(t) {
                            return t.rule.parameters ? Random.bool(t.rule.min, t.rule.max, t.template) : t.template;
                        },
                        string: function(t) {
                            var e,
                                n,
                                r,
                                a,
                                o = "";
                            if (t.template.length) {
                                for (void 0 == t.rule.count && (o += t.template), e = 0; e < t.rule.count; e++)
                                    o += t.template;
                                for (n = o.match(Constant.RE_PLACEHOLDER) || [], e = 0; e < n.length; e++)
                                    if (((r = n[e]), /^\\/.test(r))) n.splice(e--, 1);
                                    else {
                                        if (
                                            ((a = Handler.placeholder(
                                                r,
                                                t.context.currentContext,
                                                t.context.templateCurrentContext,
                                                t
                                            )),
                                            1 === n.length &&
                                                r === o &&
                                                (void 0 === a ? "undefined" : _typeof(a)) !=
                                                    (void 0 === o ? "undefined" : _typeof(o)))
                                        ) {
                                            o = a;
                                            break;
                                        }
                                        o = o.replace(r, a);
                                    }
                            } else o = t.rule.range ? Random.string(t.rule.count) : t.template;
                            return o;
                        },
                        function: function(t) {
                            return t.template.call(t.context.currentContext, t);
                        },
                        regexp: function(t) {
                            var e = "";
                            void 0 == t.rule.count && (e += t.template.source);
                            for (var n = 0; n < t.rule.count; n++) e += t.template.source;
                            return RE.Handler.gen(RE.Parser.parse(e));
                        }
                    }),
                        Handler.extend({
                            _all: function() {
                                var t = {};
                                for (var e in Random) t[e.toLowerCase()] = e;
                                return t;
                            },
                            placeholder: function placeholder(_placeholder, obj, templateContext, options) {
                                Constant.RE_PLACEHOLDER.exec("");
                                var parts = Constant.RE_PLACEHOLDER.exec(_placeholder),
                                    key = parts && parts[1],
                                    lkey = key && key.toLowerCase(),
                                    okey = this._all()[lkey],
                                    params = (parts && parts[2]) || "",
                                    pathParts = this.splitPathToArray(key);
                                try {
                                    params = eval(
                                        "(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")"
                                    );
                                } catch (t) {
                                    params = parts[2].split(/,\s*/);
                                }
                                if (obj && key in obj) return obj[key];
                                if ("/" === key.charAt(0) || pathParts.length > 1)
                                    return this.getValueByKeyPath(key, options);
                                if (
                                    templateContext &&
                                    "object" == (void 0 === templateContext ? "undefined" : _typeof(templateContext)) &&
                                    key in templateContext &&
                                    _placeholder !== templateContext[key]
                                )
                                    return (
                                        (templateContext[key] = Handler.gen(templateContext[key], key, {
                                            currentContext: obj,
                                            templateCurrentContext: templateContext
                                        })),
                                        templateContext[key]
                                    );
                                if (!(key in Random || lkey in Random || okey in Random)) return _placeholder;
                                for (var i = 0; i < params.length; i++)
                                    Constant.RE_PLACEHOLDER.exec(""),
                                        Constant.RE_PLACEHOLDER.test(params[i]) &&
                                            (params[i] = Handler.placeholder(params[i], obj, templateContext, options));
                                var handle = Random[key] || Random[lkey] || Random[okey];
                                switch (Util.type(handle)) {
                                    case "array":
                                        return Random.pick(handle);
                                    case "function":
                                        handle.options = options;
                                        var re = handle.apply(Random, params);
                                        return void 0 === re && (re = ""), delete handle.options, re;
                                }
                            },
                            getValueByKeyPath: function(t, e) {
                                var n = t,
                                    r = this.splitPathToArray(t),
                                    a = [];
                                "/" === t.charAt(0)
                                    ? (a = [e.context.path[0]].concat(this.normalizePath(r)))
                                    : r.length > 1 &&
                                      ((a = e.context.path.slice(0)).pop(), (a = this.normalizePath(a.concat(r)))),
                                    (t = r[r.length - 1]);
                                for (var o = e.context.root, i = e.context.templateRoot, u = 1; u < a.length - 1; u++)
                                    (o = o[a[u]]), (i = i[a[u]]);
                                return o && t in o
                                    ? o[t]
                                    : i && "object" == (void 0 === i ? "undefined" : _typeof(i)) && t in i && n !== i[t]
                                    ? ((i[t] = Handler.gen(i[t], t, { currentContext: o, templateCurrentContext: i })),
                                      i[t])
                                    : void 0;
                            },
                            normalizePath: function(t) {
                                for (var e = [], n = 0; n < t.length; n++)
                                    switch (t[n]) {
                                        case "..":
                                            e.pop();
                                            break;
                                        case ".":
                                            break;
                                        default:
                                            e.push(t[n]);
                                    }
                                return e;
                            },
                            splitPathToArray: function(t) {
                                var e = t.split(/\/+/);
                                return e[e.length - 1] || (e = e.slice(0, -1)), e[0] || (e = e.slice(1)), e;
                            }
                        }),
                        (module.exports = Handler);
                },
                function(t, e) {
                    t.exports = {
                        GUID: 1,
                        RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
                        RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
                        RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
                    };
                },
                function(t, e) {
                    var n = {
                        extend: function() {
                            var t,
                                e,
                                r,
                                a,
                                o,
                                i = arguments[0] || {},
                                u = 1,
                                l = arguments.length;
                            for (1 === l && ((i = this), (u = 0)); l > u; u++)
                                if ((t = arguments[u]))
                                    for (e in t)
                                        (r = i[e]),
                                            i !== (a = t[e]) &&
                                                void 0 !== a &&
                                                (n.isArray(a) || n.isObject(a)
                                                    ? (n.isArray(a) && (o = r && n.isArray(r) ? r : []),
                                                      n.isObject(a) && (o = r && n.isObject(r) ? r : {}),
                                                      (i[e] = n.extend(o, a)))
                                                    : (i[e] = a));
                            return i;
                        },
                        each: function(t, e, n) {
                            var r, a;
                            if ("number" === this.type(t)) for (r = 0; t > r; r++) e(r, r);
                            else if (t.length === +t.length)
                                for (r = 0; r < t.length && !1 !== e.call(n, t[r], r, t); r++);
                            else for (a in t) if (!1 === e.call(n, t[a], a, t)) break;
                        },
                        type: function(t) {
                            return null === t || void 0 === t
                                ? String(t)
                                : Object.prototype.toString
                                      .call(t)
                                      .match(/\[object (\w+)\]/)[1]
                                      .toLowerCase();
                        }
                    };
                    n.each("String Object Array RegExp Function".split(" "), function(t) {
                        n["is" + t] = function(e) {
                            return n.type(e) === t.toLowerCase();
                        };
                    }),
                        (n.isObjectOrArray = function(t) {
                            return n.isObject(t) || n.isArray(t);
                        }),
                        (n.isNumeric = function(t) {
                            return !isNaN(parseFloat(t)) && isFinite(t);
                        }),
                        (n.keys = function(t) {
                            var e = [];
                            for (var n in t) t.hasOwnProperty(n) && e.push(n);
                            return e;
                        }),
                        (n.values = function(t) {
                            var e = [];
                            for (var n in t) t.hasOwnProperty(n) && e.push(t[n]);
                            return e;
                        }),
                        (n.heredoc = function(t) {
                            return t
                                .toString()
                                .replace(/^[^\/]+\/\*!?/, "")
                                .replace(/\*\/[^\/]+$/, "")
                                .replace(/^[\s\xA0]+/, "")
                                .replace(/[\s\xA0]+$/, "");
                        }),
                        (n.noop = function() {}),
                        (t.exports = n);
                },
                function(t, e, n) {
                    var r = n(2),
                        a = n(5);
                    t.exports = {
                        parse: function(t) {
                            var e = ((t = void 0 == t ? "" : t + "") || "").match(r.RE_KEY),
                                n = e && e[3] && e[3].match(r.RE_RANGE),
                                o = n && n[1] && parseInt(n[1], 10),
                                i = n && n[2] && parseInt(n[2], 10),
                                u = n ? (n[2] ? a.integer(o, i) : parseInt(n[1], 10)) : void 0,
                                l = e && e[4] && e[4].match(r.RE_RANGE),
                                s = l && l[1] && parseInt(l[1], 10),
                                c = l && l[2] && parseInt(l[2], 10),
                                h = {
                                    parameters: e,
                                    range: n,
                                    min: o,
                                    max: i,
                                    count: u,
                                    decimal: l,
                                    dmin: s,
                                    dmax: c,
                                    dcount: l ? (!l[2] && parseInt(l[1], 10)) || a.integer(s, c) : void 0
                                };
                            for (var p in h) if (void 0 != h[p]) return h;
                            return {};
                        }
                    };
                },
                function(t, e, n) {
                    var r = { extend: n(3).extend };
                    r.extend(n(6)),
                        r.extend(n(7)),
                        r.extend(n(8)),
                        r.extend(n(10)),
                        r.extend(n(13)),
                        r.extend(n(15)),
                        r.extend(n(16)),
                        r.extend(n(17)),
                        r.extend(n(14)),
                        r.extend(n(19)),
                        (t.exports = r);
                },
                function(t, e) {
                    t.exports = {
                        boolean: function(t, e, n) {
                            return void 0 !== n
                                ? ((t = void 0 === t || isNaN(t) ? 1 : parseInt(t, 10)),
                                  (e = void 0 === e || isNaN(e) ? 1 : parseInt(e, 10)),
                                  Math.random() > (1 / (t + e)) * t ? !n : n)
                                : Math.random() >= 0.5;
                        },
                        bool: function(t, e, n) {
                            return this.boolean(t, e, n);
                        },
                        natural: function(t, e) {
                            return (
                                (t = void 0 !== t ? parseInt(t, 10) : 0),
                                (e = void 0 !== e ? parseInt(e, 10) : 9007199254740992),
                                Math.round(Math.random() * (e - t)) + t
                            );
                        },
                        integer: function(t, e) {
                            return (
                                (t = void 0 !== t ? parseInt(t, 10) : -9007199254740992),
                                (e = void 0 !== e ? parseInt(e, 10) : 9007199254740992),
                                Math.round(Math.random() * (e - t)) + t
                            );
                        },
                        int: function(t, e) {
                            return this.integer(t, e);
                        },
                        float: function(t, e, n, r) {
                            (n = void 0 === n ? 0 : n),
                                (n = Math.max(Math.min(n, 17), 0)),
                                (r = void 0 === r ? 17 : r),
                                (r = Math.max(Math.min(r, 17), 0));
                            for (var a = this.integer(t, e) + ".", o = 0, i = this.natural(n, r); i > o; o++)
                                a += i - 1 > o ? this.character("number") : this.character("123456789");
                            return parseFloat(a, 10);
                        },
                        character: function(t) {
                            var e = {
                                lower: "abcdefghijklmnopqrstuvwxyz",
                                upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                number: "0123456789",
                                symbol: "!@#$%^&*()[]"
                            };
                            return (
                                (e.alpha = e.lower + e.upper),
                                (e.undefined = e.lower + e.upper + e.number + e.symbol),
                                (t = e[("" + t).toLowerCase()] || t).charAt(this.natural(0, t.length - 1))
                            );
                        },
                        char: function(t) {
                            return this.character(t);
                        },
                        string: function(t, e, n) {
                            var r;
                            switch (arguments.length) {
                                case 0:
                                    r = this.natural(3, 7);
                                    break;
                                case 1:
                                    (r = t), (t = void 0);
                                    break;
                                case 2:
                                    "string" == typeof arguments[0]
                                        ? (r = e)
                                        : ((r = this.natural(t, e)), (t = void 0));
                                    break;
                                case 3:
                                    r = this.natural(e, n);
                            }
                            for (var a = "", o = 0; r > o; o++) a += this.character(t);
                            return a;
                        },
                        str: function() {
                            return this.string.apply(this, arguments);
                        },
                        range: function(t, e, n) {
                            arguments.length <= 1 && ((e = t || 0), (t = 0)),
                                (t = +t),
                                (e = +e),
                                (n = +(n = arguments[2] || 1));
                            for (var r = Math.max(Math.ceil((e - t) / n), 0), a = 0, o = new Array(r); r > a; )
                                (o[a++] = t), (t += n);
                            return o;
                        }
                    };
                },
                function(t, e) {
                    var n = {
                        yyyy: "getFullYear",
                        yy: function(t) {
                            return ("" + t.getFullYear()).slice(2);
                        },
                        y: "yy",
                        MM: function(t) {
                            var e = t.getMonth() + 1;
                            return 10 > e ? "0" + e : e;
                        },
                        M: function(t) {
                            return t.getMonth() + 1;
                        },
                        dd: function(t) {
                            var e = t.getDate();
                            return 10 > e ? "0" + e : e;
                        },
                        d: "getDate",
                        HH: function(t) {
                            var e = t.getHours();
                            return 10 > e ? "0" + e : e;
                        },
                        H: "getHours",
                        hh: function(t) {
                            var e = t.getHours() % 12;
                            return 10 > e ? "0" + e : e;
                        },
                        h: function(t) {
                            return t.getHours() % 12;
                        },
                        mm: function(t) {
                            var e = t.getMinutes();
                            return 10 > e ? "0" + e : e;
                        },
                        m: "getMinutes",
                        ss: function(t) {
                            var e = t.getSeconds();
                            return 10 > e ? "0" + e : e;
                        },
                        s: "getSeconds",
                        SS: function(t) {
                            var e = t.getMilliseconds();
                            return (10 > e && "00" + e) || (100 > e && "0" + e) || e;
                        },
                        S: "getMilliseconds",
                        A: function(t) {
                            return t.getHours() < 12 ? "AM" : "PM";
                        },
                        a: function(t) {
                            return t.getHours() < 12 ? "am" : "pm";
                        },
                        T: "getTime"
                    };
                    t.exports = {
                        _patternLetters: n,
                        _rformat: new RegExp(
                            (function() {
                                var t = [];
                                for (var e in n) t.push(e);
                                return "(" + t.join("|") + ")";
                            })(),
                            "g"
                        ),
                        _formatDate: function(t, e) {
                            return e.replace(this._rformat, function e(r, a) {
                                return "function" == typeof n[a] ? n[a](t) : n[a] in n ? e(r, n[a]) : t[n[a]]();
                            });
                        },
                        _randomDate: function(t, e) {
                            return (
                                (t = void 0 === t ? new Date(0) : t),
                                (e = void 0 === e ? new Date() : e),
                                new Date(Math.random() * (e.getTime() - t.getTime()))
                            );
                        },
                        date: function(t) {
                            return (t = t || "yyyy-MM-dd"), this._formatDate(this._randomDate(), t);
                        },
                        time: function(t) {
                            return (t = t || "HH:mm:ss"), this._formatDate(this._randomDate(), t);
                        },
                        datetime: function(t) {
                            return (t = t || "yyyy-MM-dd HH:mm:ss"), this._formatDate(this._randomDate(), t);
                        },
                        now: function(t, e) {
                            1 === arguments.length &&
                                (/year|month|day|hour|minute|second|week/.test(t) || ((e = t), (t = ""))),
                                (t = (t || "").toLowerCase()),
                                (e = e || "yyyy-MM-dd HH:mm:ss");
                            var n = new Date();
                            switch (t) {
                                case "year":
                                    n.setMonth(0);
                                case "month":
                                    n.setDate(1);
                                case "week":
                                case "day":
                                    n.setHours(0);
                                case "hour":
                                    n.setMinutes(0);
                                case "minute":
                                    n.setSeconds(0);
                                case "second":
                                    n.setMilliseconds(0);
                            }
                            switch (t) {
                                case "week":
                                    n.setDate(n.getDate() - n.getDay());
                            }
                            return this._formatDate(n, e);
                        }
                    };
                },
                function(t, e, n) {
                    (function(t) {
                        t.exports = {
                            _adSize: [
                                "300x250",
                                "250x250",
                                "240x400",
                                "336x280",
                                "180x150",
                                "720x300",
                                "468x60",
                                "234x60",
                                "88x31",
                                "120x90",
                                "120x60",
                                "120x240",
                                "125x125",
                                "728x90",
                                "160x600",
                                "120x600",
                                "300x600"
                            ],
                            _screenSize: [
                                "320x200",
                                "320x240",
                                "640x480",
                                "800x480",
                                "800x480",
                                "1024x600",
                                "1024x768",
                                "1280x800",
                                "1440x900",
                                "1920x1200",
                                "2560x1600"
                            ],
                            _videoSize: ["720x480", "768x576", "1280x720", "1920x1080"],
                            image: function(t, e, n, r, a) {
                                return (
                                    4 === arguments.length && ((a = r), (r = void 0)),
                                    3 === arguments.length && ((a = n), (n = void 0)),
                                    t || (t = this.pick(this._adSize)),
                                    e && ~e.indexOf("#") && (e = e.slice(1)),
                                    n && ~n.indexOf("#") && (n = n.slice(1)),
                                    "http://dummyimage.com/" +
                                        t +
                                        (e ? "/" + e : "") +
                                        (n ? "/" + n : "") +
                                        (r ? "." + r : "") +
                                        (a ? "&text=" + a : "")
                                );
                            },
                            img: function() {
                                return this.image.apply(this, arguments);
                            },
                            _brandColors: {
                                "4ormat": "#fb0a2a",
                                "500px": "#02adea",
                                "About.me (blue)": "#00405d",
                                "About.me (yellow)": "#ffcc33",
                                Addvocate: "#ff6138",
                                Adobe: "#ff0000",
                                Aim: "#fcd20b",
                                Amazon: "#e47911",
                                Android: "#a4c639",
                                "Angie's List": "#7fbb00",
                                AOL: "#0060a3",
                                Atlassian: "#003366",
                                Behance: "#053eff",
                                "Big Cartel": "#97b538",
                                bitly: "#ee6123",
                                Blogger: "#fc4f08",
                                Boeing: "#0039a6",
                                "Booking.com": "#003580",
                                Carbonmade: "#613854",
                                Cheddar: "#ff7243",
                                "Code School": "#3d4944",
                                Delicious: "#205cc0",
                                Dell: "#3287c1",
                                Designmoo: "#e54a4f",
                                Deviantart: "#4e6252",
                                "Designer News": "#2d72da",
                                Devour: "#fd0001",
                                DEWALT: "#febd17",
                                "Disqus (blue)": "#59a3fc",
                                "Disqus (orange)": "#db7132",
                                Dribbble: "#ea4c89",
                                Dropbox: "#3d9ae8",
                                Drupal: "#0c76ab",
                                Dunked: "#2a323a",
                                eBay: "#89c507",
                                Ember: "#f05e1b",
                                Engadget: "#00bdf6",
                                Envato: "#528036",
                                Etsy: "#eb6d20",
                                Evernote: "#5ba525",
                                "Fab.com": "#dd0017",
                                Facebook: "#3b5998",
                                Firefox: "#e66000",
                                "Flickr (blue)": "#0063dc",
                                "Flickr (pink)": "#ff0084",
                                Forrst: "#5b9a68",
                                Foursquare: "#25a0ca",
                                Garmin: "#007cc3",
                                GetGlue: "#2d75a2",
                                Gimmebar: "#f70078",
                                GitHub: "#171515",
                                "Google Blue": "#0140ca",
                                "Google Green": "#16a61e",
                                "Google Red": "#dd1812",
                                "Google Yellow": "#fcca03",
                                "Google+": "#dd4b39",
                                Grooveshark: "#f77f00",
                                Groupon: "#82b548",
                                "Hacker News": "#ff6600",
                                HelloWallet: "#0085ca",
                                "Heroku (light)": "#c7c5e6",
                                "Heroku (dark)": "#6567a5",
                                HootSuite: "#003366",
                                Houzz: "#73ba37",
                                HTML5: "#ec6231",
                                IKEA: "#ffcc33",
                                IMDb: "#f3ce13",
                                Instagram: "#3f729b",
                                Intel: "#0071c5",
                                Intuit: "#365ebf",
                                Kickstarter: "#76cc1e",
                                kippt: "#e03500",
                                Kodery: "#00af81",
                                LastFM: "#c3000d",
                                LinkedIn: "#0e76a8",
                                Livestream: "#cf0005",
                                Lumo: "#576396",
                                Mixpanel: "#a086d3",
                                Meetup: "#e51937",
                                Nokia: "#183693",
                                NVIDIA: "#76b900",
                                Opera: "#cc0f16",
                                Path: "#e41f11",
                                "PayPal (dark)": "#1e477a",
                                "PayPal (light)": "#3b7bbf",
                                Pinboard: "#0000e6",
                                Pinterest: "#c8232c",
                                PlayStation: "#665cbe",
                                Pocket: "#ee4056",
                                Prezi: "#318bff",
                                Pusha: "#0f71b4",
                                Quora: "#a82400",
                                "QUOTE.fm": "#66ceff",
                                Rdio: "#008fd5",
                                Readability: "#9c0000",
                                "Red Hat": "#cc0000",
                                Resource: "#7eb400",
                                Rockpack: "#0ba6ab",
                                Roon: "#62b0d9",
                                RSS: "#ee802f",
                                Salesforce: "#1798c1",
                                Samsung: "#0c4da2",
                                Shopify: "#96bf48",
                                Skype: "#00aff0",
                                Snagajob: "#f47a20",
                                Softonic: "#008ace",
                                SoundCloud: "#ff7700",
                                "Space Box": "#f86960",
                                Spotify: "#81b71a",
                                Sprint: "#fee100",
                                Squarespace: "#121212",
                                StackOverflow: "#ef8236",
                                Staples: "#cc0000",
                                "Status Chart": "#d7584f",
                                Stripe: "#008cdd",
                                StudyBlue: "#00afe1",
                                StumbleUpon: "#f74425",
                                "T-Mobile": "#ea0a8e",
                                Technorati: "#40a800",
                                "The Next Web": "#ef4423",
                                Treehouse: "#5cb868",
                                Trulia: "#5eab1f",
                                Tumblr: "#34526f",
                                "Twitch.tv": "#6441a5",
                                Twitter: "#00acee",
                                TYPO3: "#ff8700",
                                Ubuntu: "#dd4814",
                                Ustream: "#3388ff",
                                Verizon: "#ef1d1d",
                                Vimeo: "#86c9ef",
                                Vine: "#00a478",
                                Virb: "#06afd8",
                                "Virgin Media": "#cc0000",
                                Wooga: "#5b009c",
                                "WordPress (blue)": "#21759b",
                                "WordPress (orange)": "#d54e21",
                                "WordPress (grey)": "#464646",
                                Wunderlist: "#2b88d9",
                                XBOX: "#9bc848",
                                XING: "#126567",
                                "Yahoo!": "#720e9e",
                                Yandex: "#ffcc00",
                                Yelp: "#c41200",
                                YouTube: "#c4302b",
                                Zalongo: "#5498dc",
                                Zendesk: "#78a300",
                                Zerply: "#9dcc7a",
                                Zootool: "#5e8b1d"
                            },
                            _brandNames: function() {
                                var t = [];
                                for (var e in this._brandColors) t.push(e);
                                return t;
                            },
                            dataImage: function(e, n) {
                                var r;
                                "undefined" != typeof document
                                    ? (r = document.createElement("canvas"))
                                    : (r = new (t.require("canvas"))());
                                var a = r && r.getContext && r.getContext("2d");
                                if (!r || !a) return "";
                                e || (e = this.pick(this._adSize)), (n = void 0 !== n ? n : e), (e = e.split("x"));
                                var o = parseInt(e[0], 10),
                                    i = parseInt(e[1], 10),
                                    u = this._brandColors[this.pick(this._brandNames())];
                                return (
                                    (r.width = o),
                                    (r.height = i),
                                    (a.textAlign = "center"),
                                    (a.textBaseline = "middle"),
                                    (a.fillStyle = u),
                                    a.fillRect(0, 0, o, i),
                                    (a.fillStyle = "#FFF"),
                                    (a.font = "bold 14px sans-serif"),
                                    a.fillText(n, o / 2, i / 2, o),
                                    r.toDataURL("image/png")
                                );
                            }
                        };
                    }.call(e, n(9)(t)));
                },
                function(t, e) {
                    t.exports = function(t) {
                        return (
                            t.webpackPolyfill ||
                                ((t.deprecate = function() {}),
                                (t.paths = []),
                                (t.children = []),
                                (t.webpackPolyfill = 1)),
                            t
                        );
                    };
                },
                function(t, e, n) {
                    var r = n(11),
                        a = n(12);
                    t.exports = {
                        color: function(t) {
                            return t || a[t] ? a[t].nicer : this.hex();
                        },
                        hex: function() {
                            var t = this._goldenRatioColor(),
                                e = r.hsv2rgb(t);
                            return r.rgb2hex(e[0], e[1], e[2]);
                        },
                        rgb: function() {
                            var t = this._goldenRatioColor(),
                                e = r.hsv2rgb(t);
                            return (
                                "rgb(" +
                                parseInt(e[0], 10) +
                                ", " +
                                parseInt(e[1], 10) +
                                ", " +
                                parseInt(e[2], 10) +
                                ")"
                            );
                        },
                        rgba: function() {
                            var t = this._goldenRatioColor(),
                                e = r.hsv2rgb(t);
                            return (
                                "rgba(" +
                                parseInt(e[0], 10) +
                                ", " +
                                parseInt(e[1], 10) +
                                ", " +
                                parseInt(e[2], 10) +
                                ", " +
                                Math.random().toFixed(2) +
                                ")"
                            );
                        },
                        hsl: function() {
                            var t = this._goldenRatioColor(),
                                e = r.hsv2hsl(t);
                            return (
                                "hsl(" +
                                parseInt(e[0], 10) +
                                ", " +
                                parseInt(e[1], 10) +
                                ", " +
                                parseInt(e[2], 10) +
                                ")"
                            );
                        },
                        _goldenRatioColor: function(t, e) {
                            return (
                                (this._goldenRatio = 0.618033988749895),
                                (this._hue = this._hue || Math.random()),
                                (this._hue += this._goldenRatio),
                                (this._hue %= 1),
                                "number" != typeof t && (t = 0.5),
                                "number" != typeof e && (e = 0.95),
                                [360 * this._hue, 100 * t, 100 * e]
                            );
                        }
                    };
                },
                function(t, e) {
                    t.exports = {
                        rgb2hsl: function(t) {
                            var e,
                                n,
                                r = t[0] / 255,
                                a = t[1] / 255,
                                o = t[2] / 255,
                                i = Math.min(r, a, o),
                                u = Math.max(r, a, o),
                                l = u - i;
                            return (
                                u == i
                                    ? (e = 0)
                                    : r == u
                                    ? (e = (a - o) / l)
                                    : a == u
                                    ? (e = 2 + (o - r) / l)
                                    : o == u && (e = 4 + (r - a) / l),
                                0 > (e = Math.min(60 * e, 360)) && (e += 360),
                                (n = (i + u) / 2),
                                [e, 100 * (u == i ? 0 : 0.5 >= n ? l / (u + i) : l / (2 - u - i)), 100 * n]
                            );
                        },
                        rgb2hsv: function(t) {
                            var e,
                                n,
                                r = t[0],
                                a = t[1],
                                o = t[2],
                                i = Math.min(r, a, o),
                                u = Math.max(r, a, o),
                                l = u - i;
                            return (
                                (n = 0 === u ? 0 : ((l / u) * 1e3) / 10),
                                u == i
                                    ? (e = 0)
                                    : r == u
                                    ? (e = (a - o) / l)
                                    : a == u
                                    ? (e = 2 + (o - r) / l)
                                    : o == u && (e = 4 + (r - a) / l),
                                0 > (e = Math.min(60 * e, 360)) && (e += 360),
                                [e, n, ((u / 255) * 1e3) / 10]
                            );
                        },
                        hsl2rgb: function(t) {
                            var e,
                                n,
                                r,
                                a,
                                o,
                                i = t[0] / 360,
                                u = t[1] / 100,
                                l = t[2] / 100;
                            if (0 === u) return [(o = 255 * l), o, o];
                            (e = 2 * l - (n = 0.5 > l ? l * (1 + u) : l + u - l * u)), (a = [0, 0, 0]);
                            for (var s = 0; 3 > s; s++)
                                0 > (r = i + (1 / 3) * -(s - 1)) && r++,
                                    r > 1 && r--,
                                    (o =
                                        1 > 6 * r
                                            ? e + 6 * (n - e) * r
                                            : 1 > 2 * r
                                            ? n
                                            : 2 > 3 * r
                                            ? e + (n - e) * (2 / 3 - r) * 6
                                            : e),
                                    (a[s] = 255 * o);
                            return a;
                        },
                        hsl2hsv: function(t) {
                            var e = t[0],
                                n = t[1] / 100,
                                r = t[2] / 100;
                            return [e, 100 * ((2 * (n *= 1 >= (r *= 2) ? r : 2 - r)) / (r + n)), 100 * ((r + n) / 2)];
                        },
                        hsv2rgb: function(t) {
                            var e = t[0] / 60,
                                n = t[1] / 100,
                                r = t[2] / 100,
                                a = Math.floor(e) % 6,
                                o = e - Math.floor(e),
                                i = 255 * r * (1 - n),
                                u = 255 * r * (1 - n * o),
                                l = 255 * r * (1 - n * (1 - o));
                            switch (((r *= 255), a)) {
                                case 0:
                                    return [r, l, i];
                                case 1:
                                    return [u, r, i];
                                case 2:
                                    return [i, r, l];
                                case 3:
                                    return [i, u, r];
                                case 4:
                                    return [l, i, r];
                                case 5:
                                    return [r, i, u];
                            }
                        },
                        hsv2hsl: function(t) {
                            var e,
                                n,
                                r = t[0],
                                a = t[1] / 100,
                                o = t[2] / 100;
                            return (e = a * o), [r, 100 * (e /= 1 >= (n = (2 - a) * o) ? n : 2 - n), 100 * (n /= 2)];
                        },
                        rgb2hex: function(t, e, n) {
                            return "#" + (((((256 + t) << 8) | e) << 8) | n).toString(16).slice(1);
                        },
                        hex2rgb: function(t) {
                            return [
                                (t = ("0x" + t.slice(1).replace(t.length > 4 ? t : /./g, "$&$&")) | 0) >> 16,
                                (t >> 8) & 255,
                                255 & t
                            ];
                        }
                    };
                },
                function(t, e) {
                    t.exports = {
                        navy: { value: "#000080", nicer: "#001F3F" },
                        blue: { value: "#0000ff", nicer: "#0074D9" },
                        aqua: { value: "#00ffff", nicer: "#7FDBFF" },
                        teal: { value: "#008080", nicer: "#39CCCC" },
                        olive: { value: "#008000", nicer: "#3D9970" },
                        green: { value: "#008000", nicer: "#2ECC40" },
                        lime: { value: "#00ff00", nicer: "#01FF70" },
                        yellow: { value: "#ffff00", nicer: "#FFDC00" },
                        orange: { value: "#ffa500", nicer: "#FF851B" },
                        red: { value: "#ff0000", nicer: "#FF4136" },
                        maroon: { value: "#800000", nicer: "#85144B" },
                        fuchsia: { value: "#ff00ff", nicer: "#F012BE" },
                        purple: { value: "#800080", nicer: "#B10DC9" },
                        silver: { value: "#c0c0c0", nicer: "#DDDDDD" },
                        gray: { value: "#808080", nicer: "#AAAAAA" },
                        black: { value: "#000000", nicer: "#111111" },
                        white: { value: "#FFFFFF", nicer: "#FFFFFF" }
                    };
                },
                function(t, e, n) {
                    function r(t, e, n, r) {
                        return void 0 === n
                            ? a.natural(t, e)
                            : void 0 === r
                            ? n
                            : a.natural(parseInt(n, 10), parseInt(r, 10));
                    }
                    var a = n(6),
                        o = n(14);
                    t.exports = {
                        paragraph: function(t, e) {
                            for (var n = r(3, 7, t, e), a = [], o = 0; n > o; o++) a.push(this.sentence());
                            return a.join(" ");
                        },
                        cparagraph: function(t, e) {
                            for (var n = r(3, 7, t, e), a = [], o = 0; n > o; o++) a.push(this.csentence());
                            return a.join("");
                        },
                        sentence: function(t, e) {
                            for (var n = r(12, 18, t, e), a = [], i = 0; n > i; i++) a.push(this.word());
                            return o.capitalize(a.join(" ")) + ".";
                        },
                        csentence: function(t, e) {
                            for (var n = r(12, 18, t, e), a = [], o = 0; n > o; o++) a.push(this.cword());
                            return a.join("") + "。";
                        },
                        word: function(t, e) {
                            for (var n = r(3, 10, t, e), o = "", i = 0; n > i; i++) o += a.character("lower");
                            return o;
                        },
                        cword: function(t, e, n) {
                            var r,
                                a =
                                    "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞";
                            switch (arguments.length) {
                                case 0:
                                    (t = a), (r = 1);
                                    break;
                                case 1:
                                    "string" == typeof arguments[0] ? (r = 1) : ((r = t), (t = a));
                                    break;
                                case 2:
                                    "string" == typeof arguments[0] ? (r = e) : ((r = this.natural(t, e)), (t = a));
                                    break;
                                case 3:
                                    r = this.natural(e, n);
                            }
                            for (var o = "", i = 0; r > i; i++) o += t.charAt(this.natural(0, t.length - 1));
                            return o;
                        },
                        title: function(t, e) {
                            for (var n = r(3, 7, t, e), a = [], o = 0; n > o; o++) a.push(this.capitalize(this.word()));
                            return a.join(" ");
                        },
                        ctitle: function(t, e) {
                            for (var n = r(3, 7, t, e), a = [], o = 0; n > o; o++) a.push(this.cword());
                            return a.join("");
                        }
                    };
                },
                function(t, e, n) {
                    var r = n(3);
                    t.exports = {
                        capitalize: function(t) {
                            return (t + "").charAt(0).toUpperCase() + (t + "").substr(1);
                        },
                        upper: function(t) {
                            return (t + "").toUpperCase();
                        },
                        lower: function(t) {
                            return (t + "").toLowerCase();
                        },
                        pick: function(t, e, n) {
                            return (
                                r.isArray(t)
                                    ? (void 0 === e && (e = 1), void 0 === n && (n = e))
                                    : ((t = [].slice.call(arguments)), (e = 1), (n = 1)),
                                1 === e && 1 === n ? t[this.natural(0, t.length - 1)] : this.shuffle(t, e, n)
                            );
                        },
                        shuffle: function(t, e, n) {
                            for (var r = (t = t || []).slice(0), a = [], o = 0, i = r.length, u = 0; i > u; u++)
                                (o = this.natural(0, r.length - 1)), a.push(r[o]), r.splice(o, 1);
                            switch (arguments.length) {
                                case 0:
                                case 1:
                                    return a;
                                case 2:
                                    n = e;
                                case 3:
                                    return (e = parseInt(e, 10)), (n = parseInt(n, 10)), a.slice(0, this.natural(e, n));
                            }
                        },
                        order: function t(e) {
                            (t.cache = t.cache || {}), arguments.length > 1 && (e = [].slice.call(arguments, 0));
                            var n = t.options.context.templatePath.join("."),
                                r = (t.cache[n] = t.cache[n] || { index: 0, array: e });
                            return r.array[r.index++ % r.array.length];
                        }
                    };
                },
                function(t, e) {
                    t.exports = {
                        first: function() {
                            var t = [
                                "James",
                                "John",
                                "Robert",
                                "Michael",
                                "William",
                                "David",
                                "Richard",
                                "Charles",
                                "Joseph",
                                "Thomas",
                                "Christopher",
                                "Daniel",
                                "Paul",
                                "Mark",
                                "Donald",
                                "George",
                                "Kenneth",
                                "Steven",
                                "Edward",
                                "Brian",
                                "Ronald",
                                "Anthony",
                                "Kevin",
                                "Jason",
                                "Matthew",
                                "Gary",
                                "Timothy",
                                "Jose",
                                "Larry",
                                "Jeffrey",
                                "Frank",
                                "Scott",
                                "Eric"
                            ].concat([
                                "Mary",
                                "Patricia",
                                "Linda",
                                "Barbara",
                                "Elizabeth",
                                "Jennifer",
                                "Maria",
                                "Susan",
                                "Margaret",
                                "Dorothy",
                                "Lisa",
                                "Nancy",
                                "Karen",
                                "Betty",
                                "Helen",
                                "Sandra",
                                "Donna",
                                "Carol",
                                "Ruth",
                                "Sharon",
                                "Michelle",
                                "Laura",
                                "Sarah",
                                "Kimberly",
                                "Deborah",
                                "Jessica",
                                "Shirley",
                                "Cynthia",
                                "Angela",
                                "Melissa",
                                "Brenda",
                                "Amy",
                                "Anna"
                            ]);
                            return this.pick(t);
                        },
                        last: function() {
                            return this.pick([
                                "Smith",
                                "Johnson",
                                "Williams",
                                "Brown",
                                "Jones",
                                "Miller",
                                "Davis",
                                "Garcia",
                                "Rodriguez",
                                "Wilson",
                                "Martinez",
                                "Anderson",
                                "Taylor",
                                "Thomas",
                                "Hernandez",
                                "Moore",
                                "Martin",
                                "Jackson",
                                "Thompson",
                                "White",
                                "Lopez",
                                "Lee",
                                "Gonzalez",
                                "Harris",
                                "Clark",
                                "Lewis",
                                "Robinson",
                                "Walker",
                                "Perez",
                                "Hall",
                                "Young",
                                "Allen"
                            ]);
                        },
                        name: function(t) {
                            return this.first() + " " + (t ? this.first() + " " : "") + this.last();
                        },
                        cfirst: function() {
                            var t = "王 李 张 刘 陈 杨 赵 黄 周 吴 徐 孙 胡 朱 高 林 何 郭 马 罗 梁 宋 郑 谢 韩 唐 冯 于 董 萧 程 曹 袁 邓 许 傅 沈 曾 彭 吕 苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 余 潘 杜 戴 夏 锺 汪 田 任 姜 范 方 石 姚 谭 廖 邹 熊 金 陆 郝 孔 白 崔 康 毛 邱 秦 江 史 顾 侯 邵 孟 龙 万 段 雷 钱 汤 尹 黎 易 常 武 乔 贺 赖 龚 文".split(
                                " "
                            );
                            return this.pick(t);
                        },
                        clast: function() {
                            var t = "伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英".split(
                                " "
                            );
                            return this.pick(t);
                        },
                        cname: function() {
                            return this.cfirst() + this.clast();
                        }
                    };
                },
                function(t, e) {
                    t.exports = {
                        url: function(t, e) {
                            return (t || this.protocol()) + "://" + (e || this.domain()) + "/" + this.word();
                        },
                        protocol: function() {
                            return this.pick(
                                "http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais".split(" ")
                            );
                        },
                        domain: function(t) {
                            return this.word() + "." + (t || this.tld());
                        },
                        tld: function() {
                            return this.pick(
                                "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn 中国 中国互联.公司 中国互联.网络 tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(
                                    " "
                                )
                            );
                        },
                        email: function(t) {
                            return (
                                this.character("lower") +
                                "." +
                                this.word() +
                                "@" +
                                (t || this.word() + "." + this.tld())
                            );
                        },
                        ip: function() {
                            return (
                                this.natural(0, 255) +
                                "." +
                                this.natural(0, 255) +
                                "." +
                                this.natural(0, 255) +
                                "." +
                                this.natural(0, 255)
                            );
                        }
                    };
                },
                function(t, e, n) {
                    var r = n(18),
                        a = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
                    t.exports = {
                        region: function() {
                            return this.pick(a);
                        },
                        province: function() {
                            return this.pick(r).name;
                        },
                        city: function(t) {
                            var e = this.pick(r),
                                n = this.pick(e.children);
                            return t ? [e.name, n.name].join(" ") : n.name;
                        },
                        county: function(t) {
                            var e = this.pick(r),
                                n = this.pick(e.children),
                                a = this.pick(n.children) || { name: "-" };
                            return t ? [e.name, n.name, a.name].join(" ") : a.name;
                        },
                        zip: function(t) {
                            for (var e = "", n = 0; (t || 6) > n; n++) e += this.natural(0, 9);
                            return e;
                        }
                    };
                },
                function(t, e) {
                    var n = {
                            110000: "北京",
                            110100: "北京市",
                            110101: "东城区",
                            110102: "西城区",
                            110105: "朝阳区",
                            110106: "丰台区",
                            110107: "石景山区",
                            110108: "海淀区",
                            110109: "门头沟区",
                            110111: "房山区",
                            110112: "通州区",
                            110113: "顺义区",
                            110114: "昌平区",
                            110115: "大兴区",
                            110116: "怀柔区",
                            110117: "平谷区",
                            110228: "密云县",
                            110229: "延庆县",
                            110230: "其它区",
                            120000: "天津",
                            120100: "天津市",
                            120101: "和平区",
                            120102: "河东区",
                            120103: "河西区",
                            120104: "南开区",
                            120105: "河北区",
                            120106: "红桥区",
                            120110: "东丽区",
                            120111: "西青区",
                            120112: "津南区",
                            120113: "北辰区",
                            120114: "武清区",
                            120115: "宝坻区",
                            120116: "滨海新区",
                            120221: "宁河县",
                            120223: "静海县",
                            120225: "蓟县",
                            120226: "其它区",
                            130000: "河北省",
                            130100: "石家庄市",
                            130102: "长安区",
                            130103: "桥东区",
                            130104: "桥西区",
                            130105: "新华区",
                            130107: "井陉矿区",
                            130108: "裕华区",
                            130121: "井陉县",
                            130123: "正定县",
                            130124: "栾城县",
                            130125: "行唐县",
                            130126: "灵寿县",
                            130127: "高邑县",
                            130128: "深泽县",
                            130129: "赞皇县",
                            130130: "无极县",
                            130131: "平山县",
                            130132: "元氏县",
                            130133: "赵县",
                            130181: "辛集市",
                            130182: "藁城市",
                            130183: "晋州市",
                            130184: "新乐市",
                            130185: "鹿泉市",
                            130186: "其它区",
                            130200: "唐山市",
                            130202: "路南区",
                            130203: "路北区",
                            130204: "古冶区",
                            130205: "开平区",
                            130207: "丰南区",
                            130208: "丰润区",
                            130223: "滦县",
                            130224: "滦南县",
                            130225: "乐亭县",
                            130227: "迁西县",
                            130229: "玉田县",
                            130230: "曹妃甸区",
                            130281: "遵化市",
                            130283: "迁安市",
                            130284: "其它区",
                            130300: "秦皇岛市",
                            130302: "海港区",
                            130303: "山海关区",
                            130304: "北戴河区",
                            130321: "青龙满族自治县",
                            130322: "昌黎县",
                            130323: "抚宁县",
                            130324: "卢龙县",
                            130398: "其它区",
                            130400: "邯郸市",
                            130402: "邯山区",
                            130403: "丛台区",
                            130404: "复兴区",
                            130406: "峰峰矿区",
                            130421: "邯郸县",
                            130423: "临漳县",
                            130424: "成安县",
                            130425: "大名县",
                            130426: "涉县",
                            130427: "磁县",
                            130428: "肥乡县",
                            130429: "永年县",
                            130430: "邱县",
                            130431: "鸡泽县",
                            130432: "广平县",
                            130433: "馆陶县",
                            130434: "魏县",
                            130435: "曲周县",
                            130481: "武安市",
                            130482: "其它区",
                            130500: "邢台市",
                            130502: "桥东区",
                            130503: "桥西区",
                            130521: "邢台县",
                            130522: "临城县",
                            130523: "内丘县",
                            130524: "柏乡县",
                            130525: "隆尧县",
                            130526: "任县",
                            130527: "南和县",
                            130528: "宁晋县",
                            130529: "巨鹿县",
                            130530: "新河县",
                            130531: "广宗县",
                            130532: "平乡县",
                            130533: "威县",
                            130534: "清河县",
                            130535: "临西县",
                            130581: "南宫市",
                            130582: "沙河市",
                            130583: "其它区",
                            130600: "保定市",
                            130602: "新市区",
                            130603: "北市区",
                            130604: "南市区",
                            130621: "满城县",
                            130622: "清苑县",
                            130623: "涞水县",
                            130624: "阜平县",
                            130625: "徐水县",
                            130626: "定兴县",
                            130627: "唐县",
                            130628: "高阳县",
                            130629: "容城县",
                            130630: "涞源县",
                            130631: "望都县",
                            130632: "安新县",
                            130633: "易县",
                            130634: "曲阳县",
                            130635: "蠡县",
                            130636: "顺平县",
                            130637: "博野县",
                            130638: "雄县",
                            130681: "涿州市",
                            130682: "定州市",
                            130683: "安国市",
                            130684: "高碑店市",
                            130699: "其它区",
                            130700: "张家口市",
                            130702: "桥东区",
                            130703: "桥西区",
                            130705: "宣化区",
                            130706: "下花园区",
                            130721: "宣化县",
                            130722: "张北县",
                            130723: "康保县",
                            130724: "沽源县",
                            130725: "尚义县",
                            130726: "蔚县",
                            130727: "阳原县",
                            130728: "怀安县",
                            130729: "万全县",
                            130730: "怀来县",
                            130731: "涿鹿县",
                            130732: "赤城县",
                            130733: "崇礼县",
                            130734: "其它区",
                            130800: "承德市",
                            130802: "双桥区",
                            130803: "双滦区",
                            130804: "鹰手营子矿区",
                            130821: "承德县",
                            130822: "兴隆县",
                            130823: "平泉县",
                            130824: "滦平县",
                            130825: "隆化县",
                            130826: "丰宁满族自治县",
                            130827: "宽城满族自治县",
                            130828: "围场满族蒙古族自治县",
                            130829: "其它区",
                            130900: "沧州市",
                            130902: "新华区",
                            130903: "运河区",
                            130921: "沧县",
                            130922: "青县",
                            130923: "东光县",
                            130924: "海兴县",
                            130925: "盐山县",
                            130926: "肃宁县",
                            130927: "南皮县",
                            130928: "吴桥县",
                            130929: "献县",
                            130930: "孟村回族自治县",
                            130981: "泊头市",
                            130982: "任丘市",
                            130983: "黄骅市",
                            130984: "河间市",
                            130985: "其它区",
                            131000: "廊坊市",
                            131002: "安次区",
                            131003: "广阳区",
                            131022: "固安县",
                            131023: "永清县",
                            131024: "香河县",
                            131025: "大城县",
                            131026: "文安县",
                            131028: "大厂回族自治县",
                            131081: "霸州市",
                            131082: "三河市",
                            131083: "其它区",
                            131100: "衡水市",
                            131102: "桃城区",
                            131121: "枣强县",
                            131122: "武邑县",
                            131123: "武强县",
                            131124: "饶阳县",
                            131125: "安平县",
                            131126: "故城县",
                            131127: "景县",
                            131128: "阜城县",
                            131181: "冀州市",
                            131182: "深州市",
                            131183: "其它区",
                            140000: "山西省",
                            140100: "太原市",
                            140105: "小店区",
                            140106: "迎泽区",
                            140107: "杏花岭区",
                            140108: "尖草坪区",
                            140109: "万柏林区",
                            140110: "晋源区",
                            140121: "清徐县",
                            140122: "阳曲县",
                            140123: "娄烦县",
                            140181: "古交市",
                            140182: "其它区",
                            140200: "大同市",
                            140202: "城区",
                            140203: "矿区",
                            140211: "南郊区",
                            140212: "新荣区",
                            140221: "阳高县",
                            140222: "天镇县",
                            140223: "广灵县",
                            140224: "灵丘县",
                            140225: "浑源县",
                            140226: "左云县",
                            140227: "大同县",
                            140228: "其它区",
                            140300: "阳泉市",
                            140302: "城区",
                            140303: "矿区",
                            140311: "郊区",
                            140321: "平定县",
                            140322: "盂县",
                            140323: "其它区",
                            140400: "长治市",
                            140421: "长治县",
                            140423: "襄垣县",
                            140424: "屯留县",
                            140425: "平顺县",
                            140426: "黎城县",
                            140427: "壶关县",
                            140428: "长子县",
                            140429: "武乡县",
                            140430: "沁县",
                            140431: "沁源县",
                            140481: "潞城市",
                            140482: "城区",
                            140483: "郊区",
                            140485: "其它区",
                            140500: "晋城市",
                            140502: "城区",
                            140521: "沁水县",
                            140522: "阳城县",
                            140524: "陵川县",
                            140525: "泽州县",
                            140581: "高平市",
                            140582: "其它区",
                            140600: "朔州市",
                            140602: "朔城区",
                            140603: "平鲁区",
                            140621: "山阴县",
                            140622: "应县",
                            140623: "右玉县",
                            140624: "怀仁县",
                            140625: "其它区",
                            140700: "晋中市",
                            140702: "榆次区",
                            140721: "榆社县",
                            140722: "左权县",
                            140723: "和顺县",
                            140724: "昔阳县",
                            140725: "寿阳县",
                            140726: "太谷县",
                            140727: "祁县",
                            140728: "平遥县",
                            140729: "灵石县",
                            140781: "介休市",
                            140782: "其它区",
                            140800: "运城市",
                            140802: "盐湖区",
                            140821: "临猗县",
                            140822: "万荣县",
                            140823: "闻喜县",
                            140824: "稷山县",
                            140825: "新绛县",
                            140826: "绛县",
                            140827: "垣曲县",
                            140828: "夏县",
                            140829: "平陆县",
                            140830: "芮城县",
                            140881: "永济市",
                            140882: "河津市",
                            140883: "其它区",
                            140900: "忻州市",
                            140902: "忻府区",
                            140921: "定襄县",
                            140922: "五台县",
                            140923: "代县",
                            140924: "繁峙县",
                            140925: "宁武县",
                            140926: "静乐县",
                            140927: "神池县",
                            140928: "五寨县",
                            140929: "岢岚县",
                            140930: "河曲县",
                            140931: "保德县",
                            140932: "偏关县",
                            140981: "原平市",
                            140982: "其它区",
                            141000: "临汾市",
                            141002: "尧都区",
                            141021: "曲沃县",
                            141022: "翼城县",
                            141023: "襄汾县",
                            141024: "洪洞县",
                            141025: "古县",
                            141026: "安泽县",
                            141027: "浮山县",
                            141028: "吉县",
                            141029: "乡宁县",
                            141030: "大宁县",
                            141031: "隰县",
                            141032: "永和县",
                            141033: "蒲县",
                            141034: "汾西县",
                            141081: "侯马市",
                            141082: "霍州市",
                            141083: "其它区",
                            141100: "吕梁市",
                            141102: "离石区",
                            141121: "文水县",
                            141122: "交城县",
                            141123: "兴县",
                            141124: "临县",
                            141125: "柳林县",
                            141126: "石楼县",
                            141127: "岚县",
                            141128: "方山县",
                            141129: "中阳县",
                            141130: "交口县",
                            141181: "孝义市",
                            141182: "汾阳市",
                            141183: "其它区",
                            150000: "内蒙古自治区",
                            150100: "呼和浩特市",
                            150102: "新城区",
                            150103: "回民区",
                            150104: "玉泉区",
                            150105: "赛罕区",
                            150121: "土默特左旗",
                            150122: "托克托县",
                            150123: "和林格尔县",
                            150124: "清水河县",
                            150125: "武川县",
                            150126: "其它区",
                            150200: "包头市",
                            150202: "东河区",
                            150203: "昆都仑区",
                            150204: "青山区",
                            150205: "石拐区",
                            150206: "白云鄂博矿区",
                            150207: "九原区",
                            150221: "土默特右旗",
                            150222: "固阳县",
                            150223: "达尔罕茂明安联合旗",
                            150224: "其它区",
                            150300: "乌海市",
                            150302: "海勃湾区",
                            150303: "海南区",
                            150304: "乌达区",
                            150305: "其它区",
                            150400: "赤峰市",
                            150402: "红山区",
                            150403: "元宝山区",
                            150404: "松山区",
                            150421: "阿鲁科尔沁旗",
                            150422: "巴林左旗",
                            150423: "巴林右旗",
                            150424: "林西县",
                            150425: "克什克腾旗",
                            150426: "翁牛特旗",
                            150428: "喀喇沁旗",
                            150429: "宁城县",
                            150430: "敖汉旗",
                            150431: "其它区",
                            150500: "通辽市",
                            150502: "科尔沁区",
                            150521: "科尔沁左翼中旗",
                            150522: "科尔沁左翼后旗",
                            150523: "开鲁县",
                            150524: "库伦旗",
                            150525: "奈曼旗",
                            150526: "扎鲁特旗",
                            150581: "霍林郭勒市",
                            150582: "其它区",
                            150600: "鄂尔多斯市",
                            150602: "东胜区",
                            150621: "达拉特旗",
                            150622: "准格尔旗",
                            150623: "鄂托克前旗",
                            150624: "鄂托克旗",
                            150625: "杭锦旗",
                            150626: "乌审旗",
                            150627: "伊金霍洛旗",
                            150628: "其它区",
                            150700: "呼伦贝尔市",
                            150702: "海拉尔区",
                            150703: "扎赉诺尔区",
                            150721: "阿荣旗",
                            150722: "莫力达瓦达斡尔族自治旗",
                            150723: "鄂伦春自治旗",
                            150724: "鄂温克族自治旗",
                            150725: "陈巴尔虎旗",
                            150726: "新巴尔虎左旗",
                            150727: "新巴尔虎右旗",
                            150781: "满洲里市",
                            150782: "牙克石市",
                            150783: "扎兰屯市",
                            150784: "额尔古纳市",
                            150785: "根河市",
                            150786: "其它区",
                            150800: "巴彦淖尔市",
                            150802: "临河区",
                            150821: "五原县",
                            150822: "磴口县",
                            150823: "乌拉特前旗",
                            150824: "乌拉特中旗",
                            150825: "乌拉特后旗",
                            150826: "杭锦后旗",
                            150827: "其它区",
                            150900: "乌兰察布市",
                            150902: "集宁区",
                            150921: "卓资县",
                            150922: "化德县",
                            150923: "商都县",
                            150924: "兴和县",
                            150925: "凉城县",
                            150926: "察哈尔右翼前旗",
                            150927: "察哈尔右翼中旗",
                            150928: "察哈尔右翼后旗",
                            150929: "四子王旗",
                            150981: "丰镇市",
                            150982: "其它区",
                            152200: "兴安盟",
                            152201: "乌兰浩特市",
                            152202: "阿尔山市",
                            152221: "科尔沁右翼前旗",
                            152222: "科尔沁右翼中旗",
                            152223: "扎赉特旗",
                            152224: "突泉县",
                            152225: "其它区",
                            152500: "锡林郭勒盟",
                            152501: "二连浩特市",
                            152502: "锡林浩特市",
                            152522: "阿巴嘎旗",
                            152523: "苏尼特左旗",
                            152524: "苏尼特右旗",
                            152525: "东乌珠穆沁旗",
                            152526: "西乌珠穆沁旗",
                            152527: "太仆寺旗",
                            152528: "镶黄旗",
                            152529: "正镶白旗",
                            152530: "正蓝旗",
                            152531: "多伦县",
                            152532: "其它区",
                            152900: "阿拉善盟",
                            152921: "阿拉善左旗",
                            152922: "阿拉善右旗",
                            152923: "额济纳旗",
                            152924: "其它区",
                            210000: "辽宁省",
                            210100: "沈阳市",
                            210102: "和平区",
                            210103: "沈河区",
                            210104: "大东区",
                            210105: "皇姑区",
                            210106: "铁西区",
                            210111: "苏家屯区",
                            210112: "东陵区",
                            210113: "新城子区",
                            210114: "于洪区",
                            210122: "辽中县",
                            210123: "康平县",
                            210124: "法库县",
                            210181: "新民市",
                            210184: "沈北新区",
                            210185: "其它区",
                            210200: "大连市",
                            210202: "中山区",
                            210203: "西岗区",
                            210204: "沙河口区",
                            210211: "甘井子区",
                            210212: "旅顺口区",
                            210213: "金州区",
                            210224: "长海县",
                            210281: "瓦房店市",
                            210282: "普兰店市",
                            210283: "庄河市",
                            210298: "其它区",
                            210300: "鞍山市",
                            210302: "铁东区",
                            210303: "铁西区",
                            210304: "立山区",
                            210311: "千山区",
                            210321: "台安县",
                            210323: "岫岩满族自治县",
                            210381: "海城市",
                            210382: "其它区",
                            210400: "抚顺市",
                            210402: "新抚区",
                            210403: "东洲区",
                            210404: "望花区",
                            210411: "顺城区",
                            210421: "抚顺县",
                            210422: "新宾满族自治县",
                            210423: "清原满族自治县",
                            210424: "其它区",
                            210500: "本溪市",
                            210502: "平山区",
                            210503: "溪湖区",
                            210504: "明山区",
                            210505: "南芬区",
                            210521: "本溪满族自治县",
                            210522: "桓仁满族自治县",
                            210523: "其它区",
                            210600: "丹东市",
                            210602: "元宝区",
                            210603: "振兴区",
                            210604: "振安区",
                            210624: "宽甸满族自治县",
                            210681: "东港市",
                            210682: "凤城市",
                            210683: "其它区",
                            210700: "锦州市",
                            210702: "古塔区",
                            210703: "凌河区",
                            210711: "太和区",
                            210726: "黑山县",
                            210727: "义县",
                            210781: "凌海市",
                            210782: "北镇市",
                            210783: "其它区",
                            210800: "营口市",
                            210802: "站前区",
                            210803: "西市区",
                            210804: "鲅鱼圈区",
                            210811: "老边区",
                            210881: "盖州市",
                            210882: "大石桥市",
                            210883: "其它区",
                            210900: "阜新市",
                            210902: "海州区",
                            210903: "新邱区",
                            210904: "太平区",
                            210905: "清河门区",
                            210911: "细河区",
                            210921: "阜新蒙古族自治县",
                            210922: "彰武县",
                            210923: "其它区",
                            211000: "辽阳市",
                            211002: "白塔区",
                            211003: "文圣区",
                            211004: "宏伟区",
                            211005: "弓长岭区",
                            211011: "太子河区",
                            211021: "辽阳县",
                            211081: "灯塔市",
                            211082: "其它区",
                            211100: "盘锦市",
                            211102: "双台子区",
                            211103: "兴隆台区",
                            211121: "大洼县",
                            211122: "盘山县",
                            211123: "其它区",
                            211200: "铁岭市",
                            211202: "银州区",
                            211204: "清河区",
                            211221: "铁岭县",
                            211223: "西丰县",
                            211224: "昌图县",
                            211281: "调兵山市",
                            211282: "开原市",
                            211283: "其它区",
                            211300: "朝阳市",
                            211302: "双塔区",
                            211303: "龙城区",
                            211321: "朝阳县",
                            211322: "建平县",
                            211324: "喀喇沁左翼蒙古族自治县",
                            211381: "北票市",
                            211382: "凌源市",
                            211383: "其它区",
                            211400: "葫芦岛市",
                            211402: "连山区",
                            211403: "龙港区",
                            211404: "南票区",
                            211421: "绥中县",
                            211422: "建昌县",
                            211481: "兴城市",
                            211482: "其它区",
                            220000: "吉林省",
                            220100: "长春市",
                            220102: "南关区",
                            220103: "宽城区",
                            220104: "朝阳区",
                            220105: "二道区",
                            220106: "绿园区",
                            220112: "双阳区",
                            220122: "农安县",
                            220181: "九台市",
                            220182: "榆树市",
                            220183: "德惠市",
                            220188: "其它区",
                            220200: "吉林市",
                            220202: "昌邑区",
                            220203: "龙潭区",
                            220204: "船营区",
                            220211: "丰满区",
                            220221: "永吉县",
                            220281: "蛟河市",
                            220282: "桦甸市",
                            220283: "舒兰市",
                            220284: "磐石市",
                            220285: "其它区",
                            220300: "四平市",
                            220302: "铁西区",
                            220303: "铁东区",
                            220322: "梨树县",
                            220323: "伊通满族自治县",
                            220381: "公主岭市",
                            220382: "双辽市",
                            220383: "其它区",
                            220400: "辽源市",
                            220402: "龙山区",
                            220403: "西安区",
                            220421: "东丰县",
                            220422: "东辽县",
                            220423: "其它区",
                            220500: "通化市",
                            220502: "东昌区",
                            220503: "二道江区",
                            220521: "通化县",
                            220523: "辉南县",
                            220524: "柳河县",
                            220581: "梅河口市",
                            220582: "集安市",
                            220583: "其它区",
                            220600: "白山市",
                            220602: "浑江区",
                            220621: "抚松县",
                            220622: "靖宇县",
                            220623: "长白朝鲜族自治县",
                            220625: "江源区",
                            220681: "临江市",
                            220682: "其它区",
                            220700: "松原市",
                            220702: "宁江区",
                            220721: "前郭尔罗斯蒙古族自治县",
                            220722: "长岭县",
                            220723: "乾安县",
                            220724: "扶余市",
                            220725: "其它区",
                            220800: "白城市",
                            220802: "洮北区",
                            220821: "镇赉县",
                            220822: "通榆县",
                            220881: "洮南市",
                            220882: "大安市",
                            220883: "其它区",
                            222400: "延边朝鲜族自治州",
                            222401: "延吉市",
                            222402: "图们市",
                            222403: "敦化市",
                            222404: "珲春市",
                            222405: "龙井市",
                            222406: "和龙市",
                            222424: "汪清县",
                            222426: "安图县",
                            222427: "其它区",
                            230000: "黑龙江省",
                            230100: "哈尔滨市",
                            230102: "道里区",
                            230103: "南岗区",
                            230104: "道外区",
                            230106: "香坊区",
                            230108: "平房区",
                            230109: "松北区",
                            230111: "呼兰区",
                            230123: "依兰县",
                            230124: "方正县",
                            230125: "宾县",
                            230126: "巴彦县",
                            230127: "木兰县",
                            230128: "通河县",
                            230129: "延寿县",
                            230181: "阿城区",
                            230182: "双城市",
                            230183: "尚志市",
                            230184: "五常市",
                            230186: "其它区",
                            230200: "齐齐哈尔市",
                            230202: "龙沙区",
                            230203: "建华区",
                            230204: "铁锋区",
                            230205: "昂昂溪区",
                            230206: "富拉尔基区",
                            230207: "碾子山区",
                            230208: "梅里斯达斡尔族区",
                            230221: "龙江县",
                            230223: "依安县",
                            230224: "泰来县",
                            230225: "甘南县",
                            230227: "富裕县",
                            230229: "克山县",
                            230230: "克东县",
                            230231: "拜泉县",
                            230281: "讷河市",
                            230282: "其它区",
                            230300: "鸡西市",
                            230302: "鸡冠区",
                            230303: "恒山区",
                            230304: "滴道区",
                            230305: "梨树区",
                            230306: "城子河区",
                            230307: "麻山区",
                            230321: "鸡东县",
                            230381: "虎林市",
                            230382: "密山市",
                            230383: "其它区",
                            230400: "鹤岗市",
                            230402: "向阳区",
                            230403: "工农区",
                            230404: "南山区",
                            230405: "兴安区",
                            230406: "东山区",
                            230407: "兴山区",
                            230421: "萝北县",
                            230422: "绥滨县",
                            230423: "其它区",
                            230500: "双鸭山市",
                            230502: "尖山区",
                            230503: "岭东区",
                            230505: "四方台区",
                            230506: "宝山区",
                            230521: "集贤县",
                            230522: "友谊县",
                            230523: "宝清县",
                            230524: "饶河县",
                            230525: "其它区",
                            230600: "大庆市",
                            230602: "萨尔图区",
                            230603: "龙凤区",
                            230604: "让胡路区",
                            230605: "红岗区",
                            230606: "大同区",
                            230621: "肇州县",
                            230622: "肇源县",
                            230623: "林甸县",
                            230624: "杜尔伯特蒙古族自治县",
                            230625: "其它区",
                            230700: "伊春市",
                            230702: "伊春区",
                            230703: "南岔区",
                            230704: "友好区",
                            230705: "西林区",
                            230706: "翠峦区",
                            230707: "新青区",
                            230708: "美溪区",
                            230709: "金山屯区",
                            230710: "五营区",
                            230711: "乌马河区",
                            230712: "汤旺河区",
                            230713: "带岭区",
                            230714: "乌伊岭区",
                            230715: "红星区",
                            230716: "上甘岭区",
                            230722: "嘉荫县",
                            230781: "铁力市",
                            230782: "其它区",
                            230800: "佳木斯市",
                            230803: "向阳区",
                            230804: "前进区",
                            230805: "东风区",
                            230811: "郊区",
                            230822: "桦南县",
                            230826: "桦川县",
                            230828: "汤原县",
                            230833: "抚远县",
                            230881: "同江市",
                            230882: "富锦市",
                            230883: "其它区",
                            230900: "七台河市",
                            230902: "新兴区",
                            230903: "桃山区",
                            230904: "茄子河区",
                            230921: "勃利县",
                            230922: "其它区",
                            231000: "牡丹江市",
                            231002: "东安区",
                            231003: "阳明区",
                            231004: "爱民区",
                            231005: "西安区",
                            231024: "东宁县",
                            231025: "林口县",
                            231081: "绥芬河市",
                            231083: "海林市",
                            231084: "宁安市",
                            231085: "穆棱市",
                            231086: "其它区",
                            231100: "黑河市",
                            231102: "爱辉区",
                            231121: "嫩江县",
                            231123: "逊克县",
                            231124: "孙吴县",
                            231181: "北安市",
                            231182: "五大连池市",
                            231183: "其它区",
                            231200: "绥化市",
                            231202: "北林区",
                            231221: "望奎县",
                            231222: "兰西县",
                            231223: "青冈县",
                            231224: "庆安县",
                            231225: "明水县",
                            231226: "绥棱县",
                            231281: "安达市",
                            231282: "肇东市",
                            231283: "海伦市",
                            231284: "其它区",
                            232700: "大兴安岭地区",
                            232702: "松岭区",
                            232703: "新林区",
                            232704: "呼中区",
                            232721: "呼玛县",
                            232722: "塔河县",
                            232723: "漠河县",
                            232724: "加格达奇区",
                            232725: "其它区",
                            310000: "上海",
                            310100: "上海市",
                            310101: "黄浦区",
                            310104: "徐汇区",
                            310105: "长宁区",
                            310106: "静安区",
                            310107: "普陀区",
                            310108: "闸北区",
                            310109: "虹口区",
                            310110: "杨浦区",
                            310112: "闵行区",
                            310113: "宝山区",
                            310114: "嘉定区",
                            310115: "浦东新区",
                            310116: "金山区",
                            310117: "松江区",
                            310118: "青浦区",
                            310120: "奉贤区",
                            310230: "崇明县",
                            310231: "其它区",
                            320000: "江苏省",
                            320100: "南京市",
                            320102: "玄武区",
                            320104: "秦淮区",
                            320105: "建邺区",
                            320106: "鼓楼区",
                            320111: "浦口区",
                            320113: "栖霞区",
                            320114: "雨花台区",
                            320115: "江宁区",
                            320116: "六合区",
                            320124: "溧水区",
                            320125: "高淳区",
                            320126: "其它区",
                            320200: "无锡市",
                            320202: "崇安区",
                            320203: "南长区",
                            320204: "北塘区",
                            320205: "锡山区",
                            320206: "惠山区",
                            320211: "滨湖区",
                            320281: "江阴市",
                            320282: "宜兴市",
                            320297: "其它区",
                            320300: "徐州市",
                            320302: "鼓楼区",
                            320303: "云龙区",
                            320305: "贾汪区",
                            320311: "泉山区",
                            320321: "丰县",
                            320322: "沛县",
                            320323: "铜山区",
                            320324: "睢宁县",
                            320381: "新沂市",
                            320382: "邳州市",
                            320383: "其它区",
                            320400: "常州市",
                            320402: "天宁区",
                            320404: "钟楼区",
                            320405: "戚墅堰区",
                            320411: "新北区",
                            320412: "武进区",
                            320481: "溧阳市",
                            320482: "金坛市",
                            320483: "其它区",
                            320500: "苏州市",
                            320505: "虎丘区",
                            320506: "吴中区",
                            320507: "相城区",
                            320508: "姑苏区",
                            320581: "常熟市",
                            320582: "张家港市",
                            320583: "昆山市",
                            320584: "吴江区",
                            320585: "太仓市",
                            320596: "其它区",
                            320600: "南通市",
                            320602: "崇川区",
                            320611: "港闸区",
                            320612: "通州区",
                            320621: "海安县",
                            320623: "如东县",
                            320681: "启东市",
                            320682: "如皋市",
                            320684: "海门市",
                            320694: "其它区",
                            320700: "连云港市",
                            320703: "连云区",
                            320705: "新浦区",
                            320706: "海州区",
                            320721: "赣榆县",
                            320722: "东海县",
                            320723: "灌云县",
                            320724: "灌南县",
                            320725: "其它区",
                            320800: "淮安市",
                            320802: "清河区",
                            320803: "淮安区",
                            320804: "淮阴区",
                            320811: "清浦区",
                            320826: "涟水县",
                            320829: "洪泽县",
                            320830: "盱眙县",
                            320831: "金湖县",
                            320832: "其它区",
                            320900: "盐城市",
                            320902: "亭湖区",
                            320903: "盐都区",
                            320921: "响水县",
                            320922: "滨海县",
                            320923: "阜宁县",
                            320924: "射阳县",
                            320925: "建湖县",
                            320981: "东台市",
                            320982: "大丰市",
                            320983: "其它区",
                            321000: "扬州市",
                            321002: "广陵区",
                            321003: "邗江区",
                            321023: "宝应县",
                            321081: "仪征市",
                            321084: "高邮市",
                            321088: "江都区",
                            321093: "其它区",
                            321100: "镇江市",
                            321102: "京口区",
                            321111: "润州区",
                            321112: "丹徒区",
                            321181: "丹阳市",
                            321182: "扬中市",
                            321183: "句容市",
                            321184: "其它区",
                            321200: "泰州市",
                            321202: "海陵区",
                            321203: "高港区",
                            321281: "兴化市",
                            321282: "靖江市",
                            321283: "泰兴市",
                            321284: "姜堰区",
                            321285: "其它区",
                            321300: "宿迁市",
                            321302: "宿城区",
                            321311: "宿豫区",
                            321322: "沭阳县",
                            321323: "泗阳县",
                            321324: "泗洪县",
                            321325: "其它区",
                            330000: "浙江省",
                            330100: "杭州市",
                            330102: "上城区",
                            330103: "下城区",
                            330104: "江干区",
                            330105: "拱墅区",
                            330106: "西湖区",
                            330108: "滨江区",
                            330109: "萧山区",
                            330110: "余杭区",
                            330122: "桐庐县",
                            330127: "淳安县",
                            330182: "建德市",
                            330183: "富阳市",
                            330185: "临安市",
                            330186: "其它区",
                            330200: "宁波市",
                            330203: "海曙区",
                            330204: "江东区",
                            330205: "江北区",
                            330206: "北仑区",
                            330211: "镇海区",
                            330212: "鄞州区",
                            330225: "象山县",
                            330226: "宁海县",
                            330281: "余姚市",
                            330282: "慈溪市",
                            330283: "奉化市",
                            330284: "其它区",
                            330300: "温州市",
                            330302: "鹿城区",
                            330303: "龙湾区",
                            330304: "瓯海区",
                            330322: "洞头县",
                            330324: "永嘉县",
                            330326: "平阳县",
                            330327: "苍南县",
                            330328: "文成县",
                            330329: "泰顺县",
                            330381: "瑞安市",
                            330382: "乐清市",
                            330383: "其它区",
                            330400: "嘉兴市",
                            330402: "南湖区",
                            330411: "秀洲区",
                            330421: "嘉善县",
                            330424: "海盐县",
                            330481: "海宁市",
                            330482: "平湖市",
                            330483: "桐乡市",
                            330484: "其它区",
                            330500: "湖州市",
                            330502: "吴兴区",
                            330503: "南浔区",
                            330521: "德清县",
                            330522: "长兴县",
                            330523: "安吉县",
                            330524: "其它区",
                            330600: "绍兴市",
                            330602: "越城区",
                            330621: "绍兴县",
                            330624: "新昌县",
                            330681: "诸暨市",
                            330682: "上虞市",
                            330683: "嵊州市",
                            330684: "其它区",
                            330700: "金华市",
                            330702: "婺城区",
                            330703: "金东区",
                            330723: "武义县",
                            330726: "浦江县",
                            330727: "磐安县",
                            330781: "兰溪市",
                            330782: "义乌市",
                            330783: "东阳市",
                            330784: "永康市",
                            330785: "其它区",
                            330800: "衢州市",
                            330802: "柯城区",
                            330803: "衢江区",
                            330822: "常山县",
                            330824: "开化县",
                            330825: "龙游县",
                            330881: "江山市",
                            330882: "其它区",
                            330900: "舟山市",
                            330902: "定海区",
                            330903: "普陀区",
                            330921: "岱山县",
                            330922: "嵊泗县",
                            330923: "其它区",
                            331000: "台州市",
                            331002: "椒江区",
                            331003: "黄岩区",
                            331004: "路桥区",
                            331021: "玉环县",
                            331022: "三门县",
                            331023: "天台县",
                            331024: "仙居县",
                            331081: "温岭市",
                            331082: "临海市",
                            331083: "其它区",
                            331100: "丽水市",
                            331102: "莲都区",
                            331121: "青田县",
                            331122: "缙云县",
                            331123: "遂昌县",
                            331124: "松阳县",
                            331125: "云和县",
                            331126: "庆元县",
                            331127: "景宁畲族自治县",
                            331181: "龙泉市",
                            331182: "其它区",
                            340000: "安徽省",
                            340100: "合肥市",
                            340102: "瑶海区",
                            340103: "庐阳区",
                            340104: "蜀山区",
                            340111: "包河区",
                            340121: "长丰县",
                            340122: "肥东县",
                            340123: "肥西县",
                            340192: "其它区",
                            340200: "芜湖市",
                            340202: "镜湖区",
                            340203: "弋江区",
                            340207: "鸠江区",
                            340208: "三山区",
                            340221: "芜湖县",
                            340222: "繁昌县",
                            340223: "南陵县",
                            340224: "其它区",
                            340300: "蚌埠市",
                            340302: "龙子湖区",
                            340303: "蚌山区",
                            340304: "禹会区",
                            340311: "淮上区",
                            340321: "怀远县",
                            340322: "五河县",
                            340323: "固镇县",
                            340324: "其它区",
                            340400: "淮南市",
                            340402: "大通区",
                            340403: "田家庵区",
                            340404: "谢家集区",
                            340405: "八公山区",
                            340406: "潘集区",
                            340421: "凤台县",
                            340422: "其它区",
                            340500: "马鞍山市",
                            340503: "花山区",
                            340504: "雨山区",
                            340506: "博望区",
                            340521: "当涂县",
                            340522: "其它区",
                            340600: "淮北市",
                            340602: "杜集区",
                            340603: "相山区",
                            340604: "烈山区",
                            340621: "濉溪县",
                            340622: "其它区",
                            340700: "铜陵市",
                            340702: "铜官山区",
                            340703: "狮子山区",
                            340711: "郊区",
                            340721: "铜陵县",
                            340722: "其它区",
                            340800: "安庆市",
                            340802: "迎江区",
                            340803: "大观区",
                            340811: "宜秀区",
                            340822: "怀宁县",
                            340823: "枞阳县",
                            340824: "潜山县",
                            340825: "太湖县",
                            340826: "宿松县",
                            340827: "望江县",
                            340828: "岳西县",
                            340881: "桐城市",
                            340882: "其它区",
                            341000: "黄山市",
                            341002: "屯溪区",
                            341003: "黄山区",
                            341004: "徽州区",
                            341021: "歙县",
                            341022: "休宁县",
                            341023: "黟县",
                            341024: "祁门县",
                            341025: "其它区",
                            341100: "滁州市",
                            341102: "琅琊区",
                            341103: "南谯区",
                            341122: "来安县",
                            341124: "全椒县",
                            341125: "定远县",
                            341126: "凤阳县",
                            341181: "天长市",
                            341182: "明光市",
                            341183: "其它区",
                            341200: "阜阳市",
                            341202: "颍州区",
                            341203: "颍东区",
                            341204: "颍泉区",
                            341221: "临泉县",
                            341222: "太和县",
                            341225: "阜南县",
                            341226: "颍上县",
                            341282: "界首市",
                            341283: "其它区",
                            341300: "宿州市",
                            341302: "埇桥区",
                            341321: "砀山县",
                            341322: "萧县",
                            341323: "灵璧县",
                            341324: "泗县",
                            341325: "其它区",
                            341400: "巢湖市",
                            341421: "庐江县",
                            341422: "无为县",
                            341423: "含山县",
                            341424: "和县",
                            341500: "六安市",
                            341502: "金安区",
                            341503: "裕安区",
                            341521: "寿县",
                            341522: "霍邱县",
                            341523: "舒城县",
                            341524: "金寨县",
                            341525: "霍山县",
                            341526: "其它区",
                            341600: "亳州市",
                            341602: "谯城区",
                            341621: "涡阳县",
                            341622: "蒙城县",
                            341623: "利辛县",
                            341624: "其它区",
                            341700: "池州市",
                            341702: "贵池区",
                            341721: "东至县",
                            341722: "石台县",
                            341723: "青阳县",
                            341724: "其它区",
                            341800: "宣城市",
                            341802: "宣州区",
                            341821: "郎溪县",
                            341822: "广德县",
                            341823: "泾县",
                            341824: "绩溪县",
                            341825: "旌德县",
                            341881: "宁国市",
                            341882: "其它区",
                            350000: "福建省",
                            350100: "福州市",
                            350102: "鼓楼区",
                            350103: "台江区",
                            350104: "仓山区",
                            350105: "马尾区",
                            350111: "晋安区",
                            350121: "闽侯县",
                            350122: "连江县",
                            350123: "罗源县",
                            350124: "闽清县",
                            350125: "永泰县",
                            350128: "平潭县",
                            350181: "福清市",
                            350182: "长乐市",
                            350183: "其它区",
                            350200: "厦门市",
                            350203: "思明区",
                            350205: "海沧区",
                            350206: "湖里区",
                            350211: "集美区",
                            350212: "同安区",
                            350213: "翔安区",
                            350214: "其它区",
                            350300: "莆田市",
                            350302: "城厢区",
                            350303: "涵江区",
                            350304: "荔城区",
                            350305: "秀屿区",
                            350322: "仙游县",
                            350323: "其它区",
                            350400: "三明市",
                            350402: "梅列区",
                            350403: "三元区",
                            350421: "明溪县",
                            350423: "清流县",
                            350424: "宁化县",
                            350425: "大田县",
                            350426: "尤溪县",
                            350427: "沙县",
                            350428: "将乐县",
                            350429: "泰宁县",
                            350430: "建宁县",
                            350481: "永安市",
                            350482: "其它区",
                            350500: "泉州市",
                            350502: "鲤城区",
                            350503: "丰泽区",
                            350504: "洛江区",
                            350505: "泉港区",
                            350521: "惠安县",
                            350524: "安溪县",
                            350525: "永春县",
                            350526: "德化县",
                            350527: "金门县",
                            350581: "石狮市",
                            350582: "晋江市",
                            350583: "南安市",
                            350584: "其它区",
                            350600: "漳州市",
                            350602: "芗城区",
                            350603: "龙文区",
                            350622: "云霄县",
                            350623: "漳浦县",
                            350624: "诏安县",
                            350625: "长泰县",
                            350626: "东山县",
                            350627: "南靖县",
                            350628: "平和县",
                            350629: "华安县",
                            350681: "龙海市",
                            350682: "其它区",
                            350700: "南平市",
                            350702: "延平区",
                            350721: "顺昌县",
                            350722: "浦城县",
                            350723: "光泽县",
                            350724: "松溪县",
                            350725: "政和县",
                            350781: "邵武市",
                            350782: "武夷山市",
                            350783: "建瓯市",
                            350784: "建阳市",
                            350785: "其它区",
                            350800: "龙岩市",
                            350802: "新罗区",
                            350821: "长汀县",
                            350822: "永定县",
                            350823: "上杭县",
                            350824: "武平县",
                            350825: "连城县",
                            350881: "漳平市",
                            350882: "其它区",
                            350900: "宁德市",
                            350902: "蕉城区",
                            350921: "霞浦县",
                            350922: "古田县",
                            350923: "屏南县",
                            350924: "寿宁县",
                            350925: "周宁县",
                            350926: "柘荣县",
                            350981: "福安市",
                            350982: "福鼎市",
                            350983: "其它区",
                            360000: "江西省",
                            360100: "南昌市",
                            360102: "东湖区",
                            360103: "西湖区",
                            360104: "青云谱区",
                            360105: "湾里区",
                            360111: "青山湖区",
                            360121: "南昌县",
                            360122: "新建县",
                            360123: "安义县",
                            360124: "进贤县",
                            360128: "其它区",
                            360200: "景德镇市",
                            360202: "昌江区",
                            360203: "珠山区",
                            360222: "浮梁县",
                            360281: "乐平市",
                            360282: "其它区",
                            360300: "萍乡市",
                            360302: "安源区",
                            360313: "湘东区",
                            360321: "莲花县",
                            360322: "上栗县",
                            360323: "芦溪县",
                            360324: "其它区",
                            360400: "九江市",
                            360402: "庐山区",
                            360403: "浔阳区",
                            360421: "九江县",
                            360423: "武宁县",
                            360424: "修水县",
                            360425: "永修县",
                            360426: "德安县",
                            360427: "星子县",
                            360428: "都昌县",
                            360429: "湖口县",
                            360430: "彭泽县",
                            360481: "瑞昌市",
                            360482: "其它区",
                            360483: "共青城市",
                            360500: "新余市",
                            360502: "渝水区",
                            360521: "分宜县",
                            360522: "其它区",
                            360600: "鹰潭市",
                            360602: "月湖区",
                            360622: "余江县",
                            360681: "贵溪市",
                            360682: "其它区",
                            360700: "赣州市",
                            360702: "章贡区",
                            360721: "赣县",
                            360722: "信丰县",
                            360723: "大余县",
                            360724: "上犹县",
                            360725: "崇义县",
                            360726: "安远县",
                            360727: "龙南县",
                            360728: "定南县",
                            360729: "全南县",
                            360730: "宁都县",
                            360731: "于都县",
                            360732: "兴国县",
                            360733: "会昌县",
                            360734: "寻乌县",
                            360735: "石城县",
                            360781: "瑞金市",
                            360782: "南康市",
                            360783: "其它区",
                            360800: "吉安市",
                            360802: "吉州区",
                            360803: "青原区",
                            360821: "吉安县",
                            360822: "吉水县",
                            360823: "峡江县",
                            360824: "新干县",
                            360825: "永丰县",
                            360826: "泰和县",
                            360827: "遂川县",
                            360828: "万安县",
                            360829: "安福县",
                            360830: "永新县",
                            360881: "井冈山市",
                            360882: "其它区",
                            360900: "宜春市",
                            360902: "袁州区",
                            360921: "奉新县",
                            360922: "万载县",
                            360923: "上高县",
                            360924: "宜丰县",
                            360925: "靖安县",
                            360926: "铜鼓县",
                            360981: "丰城市",
                            360982: "樟树市",
                            360983: "高安市",
                            360984: "其它区",
                            361000: "抚州市",
                            361002: "临川区",
                            361021: "南城县",
                            361022: "黎川县",
                            361023: "南丰县",
                            361024: "崇仁县",
                            361025: "乐安县",
                            361026: "宜黄县",
                            361027: "金溪县",
                            361028: "资溪县",
                            361029: "东乡县",
                            361030: "广昌县",
                            361031: "其它区",
                            361100: "上饶市",
                            361102: "信州区",
                            361121: "上饶县",
                            361122: "广丰县",
                            361123: "玉山县",
                            361124: "铅山县",
                            361125: "横峰县",
                            361126: "弋阳县",
                            361127: "余干县",
                            361128: "鄱阳县",
                            361129: "万年县",
                            361130: "婺源县",
                            361181: "德兴市",
                            361182: "其它区",
                            370000: "山东省",
                            370100: "济南市",
                            370102: "历下区",
                            370103: "市中区",
                            370104: "槐荫区",
                            370105: "天桥区",
                            370112: "历城区",
                            370113: "长清区",
                            370124: "平阴县",
                            370125: "济阳县",
                            370126: "商河县",
                            370181: "章丘市",
                            370182: "其它区",
                            370200: "青岛市",
                            370202: "市南区",
                            370203: "市北区",
                            370211: "黄岛区",
                            370212: "崂山区",
                            370213: "李沧区",
                            370214: "城阳区",
                            370281: "胶州市",
                            370282: "即墨市",
                            370283: "平度市",
                            370285: "莱西市",
                            370286: "其它区",
                            370300: "淄博市",
                            370302: "淄川区",
                            370303: "张店区",
                            370304: "博山区",
                            370305: "临淄区",
                            370306: "周村区",
                            370321: "桓台县",
                            370322: "高青县",
                            370323: "沂源县",
                            370324: "其它区",
                            370400: "枣庄市",
                            370402: "市中区",
                            370403: "薛城区",
                            370404: "峄城区",
                            370405: "台儿庄区",
                            370406: "山亭区",
                            370481: "滕州市",
                            370482: "其它区",
                            370500: "东营市",
                            370502: "东营区",
                            370503: "河口区",
                            370521: "垦利县",
                            370522: "利津县",
                            370523: "广饶县",
                            370591: "其它区",
                            370600: "烟台市",
                            370602: "芝罘区",
                            370611: "福山区",
                            370612: "牟平区",
                            370613: "莱山区",
                            370634: "长岛县",
                            370681: "龙口市",
                            370682: "莱阳市",
                            370683: "莱州市",
                            370684: "蓬莱市",
                            370685: "招远市",
                            370686: "栖霞市",
                            370687: "海阳市",
                            370688: "其它区",
                            370700: "潍坊市",
                            370702: "潍城区",
                            370703: "寒亭区",
                            370704: "坊子区",
                            370705: "奎文区",
                            370724: "临朐县",
                            370725: "昌乐县",
                            370781: "青州市",
                            370782: "诸城市",
                            370783: "寿光市",
                            370784: "安丘市",
                            370785: "高密市",
                            370786: "昌邑市",
                            370787: "其它区",
                            370800: "济宁市",
                            370802: "市中区",
                            370811: "任城区",
                            370826: "微山县",
                            370827: "鱼台县",
                            370828: "金乡县",
                            370829: "嘉祥县",
                            370830: "汶上县",
                            370831: "泗水县",
                            370832: "梁山县",
                            370881: "曲阜市",
                            370882: "兖州市",
                            370883: "邹城市",
                            370884: "其它区",
                            370900: "泰安市",
                            370902: "泰山区",
                            370903: "岱岳区",
                            370921: "宁阳县",
                            370923: "东平县",
                            370982: "新泰市",
                            370983: "肥城市",
                            370984: "其它区",
                            371000: "威海市",
                            371002: "环翠区",
                            371081: "文登市",
                            371082: "荣成市",
                            371083: "乳山市",
                            371084: "其它区",
                            371100: "日照市",
                            371102: "东港区",
                            371103: "岚山区",
                            371121: "五莲县",
                            371122: "莒县",
                            371123: "其它区",
                            371200: "莱芜市",
                            371202: "莱城区",
                            371203: "钢城区",
                            371204: "其它区",
                            371300: "临沂市",
                            371302: "兰山区",
                            371311: "罗庄区",
                            371312: "河东区",
                            371321: "沂南县",
                            371322: "郯城县",
                            371323: "沂水县",
                            371324: "苍山县",
                            371325: "费县",
                            371326: "平邑县",
                            371327: "莒南县",
                            371328: "蒙阴县",
                            371329: "临沭县",
                            371330: "其它区",
                            371400: "德州市",
                            371402: "德城区",
                            371421: "陵县",
                            371422: "宁津县",
                            371423: "庆云县",
                            371424: "临邑县",
                            371425: "齐河县",
                            371426: "平原县",
                            371427: "夏津县",
                            371428: "武城县",
                            371481: "乐陵市",
                            371482: "禹城市",
                            371483: "其它区",
                            371500: "聊城市",
                            371502: "东昌府区",
                            371521: "阳谷县",
                            371522: "莘县",
                            371523: "茌平县",
                            371524: "东阿县",
                            371525: "冠县",
                            371526: "高唐县",
                            371581: "临清市",
                            371582: "其它区",
                            371600: "滨州市",
                            371602: "滨城区",
                            371621: "惠民县",
                            371622: "阳信县",
                            371623: "无棣县",
                            371624: "沾化县",
                            371625: "博兴县",
                            371626: "邹平县",
                            371627: "其它区",
                            371700: "菏泽市",
                            371702: "牡丹区",
                            371721: "曹县",
                            371722: "单县",
                            371723: "成武县",
                            371724: "巨野县",
                            371725: "郓城县",
                            371726: "鄄城县",
                            371727: "定陶县",
                            371728: "东明县",
                            371729: "其它区",
                            410000: "河南省",
                            410100: "郑州市",
                            410102: "中原区",
                            410103: "二七区",
                            410104: "管城回族区",
                            410105: "金水区",
                            410106: "上街区",
                            410108: "惠济区",
                            410122: "中牟县",
                            410181: "巩义市",
                            410182: "荥阳市",
                            410183: "新密市",
                            410184: "新郑市",
                            410185: "登封市",
                            410188: "其它区",
                            410200: "开封市",
                            410202: "龙亭区",
                            410203: "顺河回族区",
                            410204: "鼓楼区",
                            410205: "禹王台区",
                            410211: "金明区",
                            410221: "杞县",
                            410222: "通许县",
                            410223: "尉氏县",
                            410224: "开封县",
                            410225: "兰考县",
                            410226: "其它区",
                            410300: "洛阳市",
                            410302: "老城区",
                            410303: "西工区",
                            410304: "瀍河回族区",
                            410305: "涧西区",
                            410306: "吉利区",
                            410307: "洛龙区",
                            410322: "孟津县",
                            410323: "新安县",
                            410324: "栾川县",
                            410325: "嵩县",
                            410326: "汝阳县",
                            410327: "宜阳县",
                            410328: "洛宁县",
                            410329: "伊川县",
                            410381: "偃师市",
                            410400: "平顶山市",
                            410402: "新华区",
                            410403: "卫东区",
                            410404: "石龙区",
                            410411: "湛河区",
                            410421: "宝丰县",
                            410422: "叶县",
                            410423: "鲁山县",
                            410425: "郏县",
                            410481: "舞钢市",
                            410482: "汝州市",
                            410483: "其它区",
                            410500: "安阳市",
                            410502: "文峰区",
                            410503: "北关区",
                            410505: "殷都区",
                            410506: "龙安区",
                            410522: "安阳县",
                            410523: "汤阴县",
                            410526: "滑县",
                            410527: "内黄县",
                            410581: "林州市",
                            410582: "其它区",
                            410600: "鹤壁市",
                            410602: "鹤山区",
                            410603: "山城区",
                            410611: "淇滨区",
                            410621: "浚县",
                            410622: "淇县",
                            410623: "其它区",
                            410700: "新乡市",
                            410702: "红旗区",
                            410703: "卫滨区",
                            410704: "凤泉区",
                            410711: "牧野区",
                            410721: "新乡县",
                            410724: "获嘉县",
                            410725: "原阳县",
                            410726: "延津县",
                            410727: "封丘县",
                            410728: "长垣县",
                            410781: "卫辉市",
                            410782: "辉县市",
                            410783: "其它区",
                            410800: "焦作市",
                            410802: "解放区",
                            410803: "中站区",
                            410804: "马村区",
                            410811: "山阳区",
                            410821: "修武县",
                            410822: "博爱县",
                            410823: "武陟县",
                            410825: "温县",
                            410881: "济源市",
                            410882: "沁阳市",
                            410883: "孟州市",
                            410884: "其它区",
                            410900: "濮阳市",
                            410902: "华龙区",
                            410922: "清丰县",
                            410923: "南乐县",
                            410926: "范县",
                            410927: "台前县",
                            410928: "濮阳县",
                            410929: "其它区",
                            411000: "许昌市",
                            411002: "魏都区",
                            411023: "许昌县",
                            411024: "鄢陵县",
                            411025: "襄城县",
                            411081: "禹州市",
                            411082: "长葛市",
                            411083: "其它区",
                            411100: "漯河市",
                            411102: "源汇区",
                            411103: "郾城区",
                            411104: "召陵区",
                            411121: "舞阳县",
                            411122: "临颍县",
                            411123: "其它区",
                            411200: "三门峡市",
                            411202: "湖滨区",
                            411221: "渑池县",
                            411222: "陕县",
                            411224: "卢氏县",
                            411281: "义马市",
                            411282: "灵宝市",
                            411283: "其它区",
                            411300: "南阳市",
                            411302: "宛城区",
                            411303: "卧龙区",
                            411321: "南召县",
                            411322: "方城县",
                            411323: "西峡县",
                            411324: "镇平县",
                            411325: "内乡县",
                            411326: "淅川县",
                            411327: "社旗县",
                            411328: "唐河县",
                            411329: "新野县",
                            411330: "桐柏县",
                            411381: "邓州市",
                            411382: "其它区",
                            411400: "商丘市",
                            411402: "梁园区",
                            411403: "睢阳区",
                            411421: "民权县",
                            411422: "睢县",
                            411423: "宁陵县",
                            411424: "柘城县",
                            411425: "虞城县",
                            411426: "夏邑县",
                            411481: "永城市",
                            411482: "其它区",
                            411500: "信阳市",
                            411502: "浉河区",
                            411503: "平桥区",
                            411521: "罗山县",
                            411522: "光山县",
                            411523: "新县",
                            411524: "商城县",
                            411525: "固始县",
                            411526: "潢川县",
                            411527: "淮滨县",
                            411528: "息县",
                            411529: "其它区",
                            411600: "周口市",
                            411602: "川汇区",
                            411621: "扶沟县",
                            411622: "西华县",
                            411623: "商水县",
                            411624: "沈丘县",
                            411625: "郸城县",
                            411626: "淮阳县",
                            411627: "太康县",
                            411628: "鹿邑县",
                            411681: "项城市",
                            411682: "其它区",
                            411700: "驻马店市",
                            411702: "驿城区",
                            411721: "西平县",
                            411722: "上蔡县",
                            411723: "平舆县",
                            411724: "正阳县",
                            411725: "确山县",
                            411726: "泌阳县",
                            411727: "汝南县",
                            411728: "遂平县",
                            411729: "新蔡县",
                            411730: "其它区",
                            420000: "湖北省",
                            420100: "武汉市",
                            420102: "江岸区",
                            420103: "江汉区",
                            420104: "硚口区",
                            420105: "汉阳区",
                            420106: "武昌区",
                            420107: "青山区",
                            420111: "洪山区",
                            420112: "东西湖区",
                            420113: "汉南区",
                            420114: "蔡甸区",
                            420115: "江夏区",
                            420116: "黄陂区",
                            420117: "新洲区",
                            420118: "其它区",
                            420200: "黄石市",
                            420202: "黄石港区",
                            420203: "西塞山区",
                            420204: "下陆区",
                            420205: "铁山区",
                            420222: "阳新县",
                            420281: "大冶市",
                            420282: "其它区",
                            420300: "十堰市",
                            420302: "茅箭区",
                            420303: "张湾区",
                            420321: "郧县",
                            420322: "郧西县",
                            420323: "竹山县",
                            420324: "竹溪县",
                            420325: "房县",
                            420381: "丹江口市",
                            420383: "其它区",
                            420500: "宜昌市",
                            420502: "西陵区",
                            420503: "伍家岗区",
                            420504: "点军区",
                            420505: "猇亭区",
                            420506: "夷陵区",
                            420525: "远安县",
                            420526: "兴山县",
                            420527: "秭归县",
                            420528: "长阳土家族自治县",
                            420529: "五峰土家族自治县",
                            420581: "宜都市",
                            420582: "当阳市",
                            420583: "枝江市",
                            420584: "其它区",
                            420600: "襄阳市",
                            420602: "襄城区",
                            420606: "樊城区",
                            420607: "襄州区",
                            420624: "南漳县",
                            420625: "谷城县",
                            420626: "保康县",
                            420682: "老河口市",
                            420683: "枣阳市",
                            420684: "宜城市",
                            420685: "其它区",
                            420700: "鄂州市",
                            420702: "梁子湖区",
                            420703: "华容区",
                            420704: "鄂城区",
                            420705: "其它区",
                            420800: "荆门市",
                            420802: "东宝区",
                            420804: "掇刀区",
                            420821: "京山县",
                            420822: "沙洋县",
                            420881: "钟祥市",
                            420882: "其它区",
                            420900: "孝感市",
                            420902: "孝南区",
                            420921: "孝昌县",
                            420922: "大悟县",
                            420923: "云梦县",
                            420981: "应城市",
                            420982: "安陆市",
                            420984: "汉川市",
                            420985: "其它区",
                            421000: "荆州市",
                            421002: "沙市区",
                            421003: "荆州区",
                            421022: "公安县",
                            421023: "监利县",
                            421024: "江陵县",
                            421081: "石首市",
                            421083: "洪湖市",
                            421087: "松滋市",
                            421088: "其它区",
                            421100: "黄冈市",
                            421102: "黄州区",
                            421121: "团风县",
                            421122: "红安县",
                            421123: "罗田县",
                            421124: "英山县",
                            421125: "浠水县",
                            421126: "蕲春县",
                            421127: "黄梅县",
                            421181: "麻城市",
                            421182: "武穴市",
                            421183: "其它区",
                            421200: "咸宁市",
                            421202: "咸安区",
                            421221: "嘉鱼县",
                            421222: "通城县",
                            421223: "崇阳县",
                            421224: "通山县",
                            421281: "赤壁市",
                            421283: "其它区",
                            421300: "随州市",
                            421302: "曾都区",
                            421321: "随县",
                            421381: "广水市",
                            421382: "其它区",
                            422800: "恩施土家族苗族自治州",
                            422801: "恩施市",
                            422802: "利川市",
                            422822: "建始县",
                            422823: "巴东县",
                            422825: "宣恩县",
                            422826: "咸丰县",
                            422827: "来凤县",
                            422828: "鹤峰县",
                            422829: "其它区",
                            429004: "仙桃市",
                            429005: "潜江市",
                            429006: "天门市",
                            429021: "神农架林区",
                            430000: "湖南省",
                            430100: "长沙市",
                            430102: "芙蓉区",
                            430103: "天心区",
                            430104: "岳麓区",
                            430105: "开福区",
                            430111: "雨花区",
                            430121: "长沙县",
                            430122: "望城区",
                            430124: "宁乡县",
                            430181: "浏阳市",
                            430182: "其它区",
                            430200: "株洲市",
                            430202: "荷塘区",
                            430203: "芦淞区",
                            430204: "石峰区",
                            430211: "天元区",
                            430221: "株洲县",
                            430223: "攸县",
                            430224: "茶陵县",
                            430225: "炎陵县",
                            430281: "醴陵市",
                            430282: "其它区",
                            430300: "湘潭市",
                            430302: "雨湖区",
                            430304: "岳塘区",
                            430321: "湘潭县",
                            430381: "湘乡市",
                            430382: "韶山市",
                            430383: "其它区",
                            430400: "衡阳市",
                            430405: "珠晖区",
                            430406: "雁峰区",
                            430407: "石鼓区",
                            430408: "蒸湘区",
                            430412: "南岳区",
                            430421: "衡阳县",
                            430422: "衡南县",
                            430423: "衡山县",
                            430424: "衡东县",
                            430426: "祁东县",
                            430481: "耒阳市",
                            430482: "常宁市",
                            430483: "其它区",
                            430500: "邵阳市",
                            430502: "双清区",
                            430503: "大祥区",
                            430511: "北塔区",
                            430521: "邵东县",
                            430522: "新邵县",
                            430523: "邵阳县",
                            430524: "隆回县",
                            430525: "洞口县",
                            430527: "绥宁县",
                            430528: "新宁县",
                            430529: "城步苗族自治县",
                            430581: "武冈市",
                            430582: "其它区",
                            430600: "岳阳市",
                            430602: "岳阳楼区",
                            430603: "云溪区",
                            430611: "君山区",
                            430621: "岳阳县",
                            430623: "华容县",
                            430624: "湘阴县",
                            430626: "平江县",
                            430681: "汨罗市",
                            430682: "临湘市",
                            430683: "其它区",
                            430700: "常德市",
                            430702: "武陵区",
                            430703: "鼎城区",
                            430721: "安乡县",
                            430722: "汉寿县",
                            430723: "澧县",
                            430724: "临澧县",
                            430725: "桃源县",
                            430726: "石门县",
                            430781: "津市市",
                            430782: "其它区",
                            430800: "张家界市",
                            430802: "永定区",
                            430811: "武陵源区",
                            430821: "慈利县",
                            430822: "桑植县",
                            430823: "其它区",
                            430900: "益阳市",
                            430902: "资阳区",
                            430903: "赫山区",
                            430921: "南县",
                            430922: "桃江县",
                            430923: "安化县",
                            430981: "沅江市",
                            430982: "其它区",
                            431000: "郴州市",
                            431002: "北湖区",
                            431003: "苏仙区",
                            431021: "桂阳县",
                            431022: "宜章县",
                            431023: "永兴县",
                            431024: "嘉禾县",
                            431025: "临武县",
                            431026: "汝城县",
                            431027: "桂东县",
                            431028: "安仁县",
                            431081: "资兴市",
                            431082: "其它区",
                            431100: "永州市",
                            431102: "零陵区",
                            431103: "冷水滩区",
                            431121: "祁阳县",
                            431122: "东安县",
                            431123: "双牌县",
                            431124: "道县",
                            431125: "江永县",
                            431126: "宁远县",
                            431127: "蓝山县",
                            431128: "新田县",
                            431129: "江华瑶族自治县",
                            431130: "其它区",
                            431200: "怀化市",
                            431202: "鹤城区",
                            431221: "中方县",
                            431222: "沅陵县",
                            431223: "辰溪县",
                            431224: "溆浦县",
                            431225: "会同县",
                            431226: "麻阳苗族自治县",
                            431227: "新晃侗族自治县",
                            431228: "芷江侗族自治县",
                            431229: "靖州苗族侗族自治县",
                            431230: "通道侗族自治县",
                            431281: "洪江市",
                            431282: "其它区",
                            431300: "娄底市",
                            431302: "娄星区",
                            431321: "双峰县",
                            431322: "新化县",
                            431381: "冷水江市",
                            431382: "涟源市",
                            431383: "其它区",
                            433100: "湘西土家族苗族自治州",
                            433101: "吉首市",
                            433122: "泸溪县",
                            433123: "凤凰县",
                            433124: "花垣县",
                            433125: "保靖县",
                            433126: "古丈县",
                            433127: "永顺县",
                            433130: "龙山县",
                            433131: "其它区",
                            440000: "广东省",
                            440100: "广州市",
                            440103: "荔湾区",
                            440104: "越秀区",
                            440105: "海珠区",
                            440106: "天河区",
                            440111: "白云区",
                            440112: "黄埔区",
                            440113: "番禺区",
                            440114: "花都区",
                            440115: "南沙区",
                            440116: "萝岗区",
                            440183: "增城市",
                            440184: "从化市",
                            440189: "其它区",
                            440200: "韶关市",
                            440203: "武江区",
                            440204: "浈江区",
                            440205: "曲江区",
                            440222: "始兴县",
                            440224: "仁化县",
                            440229: "翁源县",
                            440232: "乳源瑶族自治县",
                            440233: "新丰县",
                            440281: "乐昌市",
                            440282: "南雄市",
                            440283: "其它区",
                            440300: "深圳市",
                            440303: "罗湖区",
                            440304: "福田区",
                            440305: "南山区",
                            440306: "宝安区",
                            440307: "龙岗区",
                            440308: "盐田区",
                            440309: "其它区",
                            440320: "光明新区",
                            440321: "坪山新区",
                            440322: "大鹏新区",
                            440323: "龙华新区",
                            440400: "珠海市",
                            440402: "香洲区",
                            440403: "斗门区",
                            440404: "金湾区",
                            440488: "其它区",
                            440500: "汕头市",
                            440507: "龙湖区",
                            440511: "金平区",
                            440512: "濠江区",
                            440513: "潮阳区",
                            440514: "潮南区",
                            440515: "澄海区",
                            440523: "南澳县",
                            440524: "其它区",
                            440600: "佛山市",
                            440604: "禅城区",
                            440605: "南海区",
                            440606: "顺德区",
                            440607: "三水区",
                            440608: "高明区",
                            440609: "其它区",
                            440700: "江门市",
                            440703: "蓬江区",
                            440704: "江海区",
                            440705: "新会区",
                            440781: "台山市",
                            440783: "开平市",
                            440784: "鹤山市",
                            440785: "恩平市",
                            440786: "其它区",
                            440800: "湛江市",
                            440802: "赤坎区",
                            440803: "霞山区",
                            440804: "坡头区",
                            440811: "麻章区",
                            440823: "遂溪县",
                            440825: "徐闻县",
                            440881: "廉江市",
                            440882: "雷州市",
                            440883: "吴川市",
                            440884: "其它区",
                            440900: "茂名市",
                            440902: "茂南区",
                            440903: "茂港区",
                            440923: "电白县",
                            440981: "高州市",
                            440982: "化州市",
                            440983: "信宜市",
                            440984: "其它区",
                            441200: "肇庆市",
                            441202: "端州区",
                            441203: "鼎湖区",
                            441223: "广宁县",
                            441224: "怀集县",
                            441225: "封开县",
                            441226: "德庆县",
                            441283: "高要市",
                            441284: "四会市",
                            441285: "其它区",
                            441300: "惠州市",
                            441302: "惠城区",
                            441303: "惠阳区",
                            441322: "博罗县",
                            441323: "惠东县",
                            441324: "龙门县",
                            441325: "其它区",
                            441400: "梅州市",
                            441402: "梅江区",
                            441421: "梅县",
                            441422: "大埔县",
                            441423: "丰顺县",
                            441424: "五华县",
                            441426: "平远县",
                            441427: "蕉岭县",
                            441481: "兴宁市",
                            441482: "其它区",
                            441500: "汕尾市",
                            441502: "城区",
                            441521: "海丰县",
                            441523: "陆河县",
                            441581: "陆丰市",
                            441582: "其它区",
                            441600: "河源市",
                            441602: "源城区",
                            441621: "紫金县",
                            441622: "龙川县",
                            441623: "连平县",
                            441624: "和平县",
                            441625: "东源县",
                            441626: "其它区",
                            441700: "阳江市",
                            441702: "江城区",
                            441721: "阳西县",
                            441723: "阳东县",
                            441781: "阳春市",
                            441782: "其它区",
                            441800: "清远市",
                            441802: "清城区",
                            441821: "佛冈县",
                            441823: "阳山县",
                            441825: "连山壮族瑶族自治县",
                            441826: "连南瑶族自治县",
                            441827: "清新区",
                            441881: "英德市",
                            441882: "连州市",
                            441883: "其它区",
                            441900: "东莞市",
                            442000: "中山市",
                            442101: "东沙群岛",
                            445100: "潮州市",
                            445102: "湘桥区",
                            445121: "潮安区",
                            445122: "饶平县",
                            445186: "其它区",
                            445200: "揭阳市",
                            445202: "榕城区",
                            445221: "揭东区",
                            445222: "揭西县",
                            445224: "惠来县",
                            445281: "普宁市",
                            445285: "其它区",
                            445300: "云浮市",
                            445302: "云城区",
                            445321: "新兴县",
                            445322: "郁南县",
                            445323: "云安县",
                            445381: "罗定市",
                            445382: "其它区",
                            450000: "广西壮族自治区",
                            450100: "南宁市",
                            450102: "兴宁区",
                            450103: "青秀区",
                            450105: "江南区",
                            450107: "西乡塘区",
                            450108: "良庆区",
                            450109: "邕宁区",
                            450122: "武鸣县",
                            450123: "隆安县",
                            450124: "马山县",
                            450125: "上林县",
                            450126: "宾阳县",
                            450127: "横县",
                            450128: "其它区",
                            450200: "柳州市",
                            450202: "城中区",
                            450203: "鱼峰区",
                            450204: "柳南区",
                            450205: "柳北区",
                            450221: "柳江县",
                            450222: "柳城县",
                            450223: "鹿寨县",
                            450224: "融安县",
                            450225: "融水苗族自治县",
                            450226: "三江侗族自治县",
                            450227: "其它区",
                            450300: "桂林市",
                            450302: "秀峰区",
                            450303: "叠彩区",
                            450304: "象山区",
                            450305: "七星区",
                            450311: "雁山区",
                            450321: "阳朔县",
                            450322: "临桂区",
                            450323: "灵川县",
                            450324: "全州县",
                            450325: "兴安县",
                            450326: "永福县",
                            450327: "灌阳县",
                            450328: "龙胜各族自治县",
                            450329: "资源县",
                            450330: "平乐县",
                            450331: "荔浦县",
                            450332: "恭城瑶族自治县",
                            450333: "其它区",
                            450400: "梧州市",
                            450403: "万秀区",
                            450405: "长洲区",
                            450406: "龙圩区",
                            450421: "苍梧县",
                            450422: "藤县",
                            450423: "蒙山县",
                            450481: "岑溪市",
                            450482: "其它区",
                            450500: "北海市",
                            450502: "海城区",
                            450503: "银海区",
                            450512: "铁山港区",
                            450521: "合浦县",
                            450522: "其它区",
                            450600: "防城港市",
                            450602: "港口区",
                            450603: "防城区",
                            450621: "上思县",
                            450681: "东兴市",
                            450682: "其它区",
                            450700: "钦州市",
                            450702: "钦南区",
                            450703: "钦北区",
                            450721: "灵山县",
                            450722: "浦北县",
                            450723: "其它区",
                            450800: "贵港市",
                            450802: "港北区",
                            450803: "港南区",
                            450804: "覃塘区",
                            450821: "平南县",
                            450881: "桂平市",
                            450882: "其它区",
                            450900: "玉林市",
                            450902: "玉州区",
                            450903: "福绵区",
                            450921: "容县",
                            450922: "陆川县",
                            450923: "博白县",
                            450924: "兴业县",
                            450981: "北流市",
                            450982: "其它区",
                            451000: "百色市",
                            451002: "右江区",
                            451021: "田阳县",
                            451022: "田东县",
                            451023: "平果县",
                            451024: "德保县",
                            451025: "靖西县",
                            451026: "那坡县",
                            451027: "凌云县",
                            451028: "乐业县",
                            451029: "田林县",
                            451030: "西林县",
                            451031: "隆林各族自治县",
                            451032: "其它区",
                            451100: "贺州市",
                            451102: "八步区",
                            451119: "平桂管理区",
                            451121: "昭平县",
                            451122: "钟山县",
                            451123: "富川瑶族自治县",
                            451124: "其它区",
                            451200: "河池市",
                            451202: "金城江区",
                            451221: "南丹县",
                            451222: "天峨县",
                            451223: "凤山县",
                            451224: "东兰县",
                            451225: "罗城仫佬族自治县",
                            451226: "环江毛南族自治县",
                            451227: "巴马瑶族自治县",
                            451228: "都安瑶族自治县",
                            451229: "大化瑶族自治县",
                            451281: "宜州市",
                            451282: "其它区",
                            451300: "来宾市",
                            451302: "兴宾区",
                            451321: "忻城县",
                            451322: "象州县",
                            451323: "武宣县",
                            451324: "金秀瑶族自治县",
                            451381: "合山市",
                            451382: "其它区",
                            451400: "崇左市",
                            451402: "江州区",
                            451421: "扶绥县",
                            451422: "宁明县",
                            451423: "龙州县",
                            451424: "大新县",
                            451425: "天等县",
                            451481: "凭祥市",
                            451482: "其它区",
                            460000: "海南省",
                            460100: "海口市",
                            460105: "秀英区",
                            460106: "龙华区",
                            460107: "琼山区",
                            460108: "美兰区",
                            460109: "其它区",
                            460200: "三亚市",
                            460300: "三沙市",
                            460321: "西沙群岛",
                            460322: "南沙群岛",
                            460323: "中沙群岛的岛礁及其海域",
                            469001: "五指山市",
                            469002: "琼海市",
                            469003: "儋州市",
                            469005: "文昌市",
                            469006: "万宁市",
                            469007: "东方市",
                            469025: "定安县",
                            469026: "屯昌县",
                            469027: "澄迈县",
                            469028: "临高县",
                            469030: "白沙黎族自治县",
                            469031: "昌江黎族自治县",
                            469033: "乐东黎族自治县",
                            469034: "陵水黎族自治县",
                            469035: "保亭黎族苗族自治县",
                            469036: "琼中黎族苗族自治县",
                            471005: "其它区",
                            500000: "重庆",
                            500100: "重庆市",
                            500101: "万州区",
                            500102: "涪陵区",
                            500103: "渝中区",
                            500104: "大渡口区",
                            500105: "江北区",
                            500106: "沙坪坝区",
                            500107: "九龙坡区",
                            500108: "南岸区",
                            500109: "北碚区",
                            500110: "万盛区",
                            500111: "双桥区",
                            500112: "渝北区",
                            500113: "巴南区",
                            500114: "黔江区",
                            500115: "长寿区",
                            500222: "綦江区",
                            500223: "潼南县",
                            500224: "铜梁县",
                            500225: "大足区",
                            500226: "荣昌县",
                            500227: "璧山县",
                            500228: "梁平县",
                            500229: "城口县",
                            500230: "丰都县",
                            500231: "垫江县",
                            500232: "武隆县",
                            500233: "忠县",
                            500234: "开县",
                            500235: "云阳县",
                            500236: "奉节县",
                            500237: "巫山县",
                            500238: "巫溪县",
                            500240: "石柱土家族自治县",
                            500241: "秀山土家族苗族自治县",
                            500242: "酉阳土家族苗族自治县",
                            500243: "彭水苗族土家族自治县",
                            500381: "江津区",
                            500382: "合川区",
                            500383: "永川区",
                            500384: "南川区",
                            500385: "其它区",
                            510000: "四川省",
                            510100: "成都市",
                            510104: "锦江区",
                            510105: "青羊区",
                            510106: "金牛区",
                            510107: "武侯区",
                            510108: "成华区",
                            510112: "龙泉驿区",
                            510113: "青白江区",
                            510114: "新都区",
                            510115: "温江区",
                            510121: "金堂县",
                            510122: "双流县",
                            510124: "郫县",
                            510129: "大邑县",
                            510131: "蒲江县",
                            510132: "新津县",
                            510181: "都江堰市",
                            510182: "彭州市",
                            510183: "邛崃市",
                            510184: "崇州市",
                            510185: "其它区",
                            510300: "自贡市",
                            510302: "自流井区",
                            510303: "贡井区",
                            510304: "大安区",
                            510311: "沿滩区",
                            510321: "荣县",
                            510322: "富顺县",
                            510323: "其它区",
                            510400: "攀枝花市",
                            510402: "东区",
                            510403: "西区",
                            510411: "仁和区",
                            510421: "米易县",
                            510422: "盐边县",
                            510423: "其它区",
                            510500: "泸州市",
                            510502: "江阳区",
                            510503: "纳溪区",
                            510504: "龙马潭区",
                            510521: "泸县",
                            510522: "合江县",
                            510524: "叙永县",
                            510525: "古蔺县",
                            510526: "其它区",
                            510600: "德阳市",
                            510603: "旌阳区",
                            510623: "中江县",
                            510626: "罗江县",
                            510681: "广汉市",
                            510682: "什邡市",
                            510683: "绵竹市",
                            510684: "其它区",
                            510700: "绵阳市",
                            510703: "涪城区",
                            510704: "游仙区",
                            510722: "三台县",
                            510723: "盐亭县",
                            510724: "安县",
                            510725: "梓潼县",
                            510726: "北川羌族自治县",
                            510727: "平武县",
                            510781: "江油市",
                            510782: "其它区",
                            510800: "广元市",
                            510802: "利州区",
                            510811: "昭化区",
                            510812: "朝天区",
                            510821: "旺苍县",
                            510822: "青川县",
                            510823: "剑阁县",
                            510824: "苍溪县",
                            510825: "其它区",
                            510900: "遂宁市",
                            510903: "船山区",
                            510904: "安居区",
                            510921: "蓬溪县",
                            510922: "射洪县",
                            510923: "大英县",
                            510924: "其它区",
                            511000: "内江市",
                            511002: "市中区",
                            511011: "东兴区",
                            511024: "威远县",
                            511025: "资中县",
                            511028: "隆昌县",
                            511029: "其它区",
                            511100: "乐山市",
                            511102: "市中区",
                            511111: "沙湾区",
                            511112: "五通桥区",
                            511113: "金口河区",
                            511123: "犍为县",
                            511124: "井研县",
                            511126: "夹江县",
                            511129: "沐川县",
                            511132: "峨边彝族自治县",
                            511133: "马边彝族自治县",
                            511181: "峨眉山市",
                            511182: "其它区",
                            511300: "南充市",
                            511302: "顺庆区",
                            511303: "高坪区",
                            511304: "嘉陵区",
                            511321: "南部县",
                            511322: "营山县",
                            511323: "蓬安县",
                            511324: "仪陇县",
                            511325: "西充县",
                            511381: "阆中市",
                            511382: "其它区",
                            511400: "眉山市",
                            511402: "东坡区",
                            511421: "仁寿县",
                            511422: "彭山县",
                            511423: "洪雅县",
                            511424: "丹棱县",
                            511425: "青神县",
                            511426: "其它区",
                            511500: "宜宾市",
                            511502: "翠屏区",
                            511521: "宜宾县",
                            511522: "南溪区",
                            511523: "江安县",
                            511524: "长宁县",
                            511525: "高县",
                            511526: "珙县",
                            511527: "筠连县",
                            511528: "兴文县",
                            511529: "屏山县",
                            511530: "其它区",
                            511600: "广安市",
                            511602: "广安区",
                            511603: "前锋区",
                            511621: "岳池县",
                            511622: "武胜县",
                            511623: "邻水县",
                            511681: "华蓥市",
                            511683: "其它区",
                            511700: "达州市",
                            511702: "通川区",
                            511721: "达川区",
                            511722: "宣汉县",
                            511723: "开江县",
                            511724: "大竹县",
                            511725: "渠县",
                            511781: "万源市",
                            511782: "其它区",
                            511800: "雅安市",
                            511802: "雨城区",
                            511821: "名山区",
                            511822: "荥经县",
                            511823: "汉源县",
                            511824: "石棉县",
                            511825: "天全县",
                            511826: "芦山县",
                            511827: "宝兴县",
                            511828: "其它区",
                            511900: "巴中市",
                            511902: "巴州区",
                            511903: "恩阳区",
                            511921: "通江县",
                            511922: "南江县",
                            511923: "平昌县",
                            511924: "其它区",
                            512000: "资阳市",
                            512002: "雁江区",
                            512021: "安岳县",
                            512022: "乐至县",
                            512081: "简阳市",
                            512082: "其它区",
                            513200: "阿坝藏族羌族自治州",
                            513221: "汶川县",
                            513222: "理县",
                            513223: "茂县",
                            513224: "松潘县",
                            513225: "九寨沟县",
                            513226: "金川县",
                            513227: "小金县",
                            513228: "黑水县",
                            513229: "马尔康县",
                            513230: "壤塘县",
                            513231: "阿坝县",
                            513232: "若尔盖县",
                            513233: "红原县",
                            513234: "其它区",
                            513300: "甘孜藏族自治州",
                            513321: "康定县",
                            513322: "泸定县",
                            513323: "丹巴县",
                            513324: "九龙县",
                            513325: "雅江县",
                            513326: "道孚县",
                            513327: "炉霍县",
                            513328: "甘孜县",
                            513329: "新龙县",
                            513330: "德格县",
                            513331: "白玉县",
                            513332: "石渠县",
                            513333: "色达县",
                            513334: "理塘县",
                            513335: "巴塘县",
                            513336: "乡城县",
                            513337: "稻城县",
                            513338: "得荣县",
                            513339: "其它区",
                            513400: "凉山彝族自治州",
                            513401: "西昌市",
                            513422: "木里藏族自治县",
                            513423: "盐源县",
                            513424: "德昌县",
                            513425: "会理县",
                            513426: "会东县",
                            513427: "宁南县",
                            513428: "普格县",
                            513429: "布拖县",
                            513430: "金阳县",
                            513431: "昭觉县",
                            513432: "喜德县",
                            513433: "冕宁县",
                            513434: "越西县",
                            513435: "甘洛县",
                            513436: "美姑县",
                            513437: "雷波县",
                            513438: "其它区",
                            520000: "贵州省",
                            520100: "贵阳市",
                            520102: "南明区",
                            520103: "云岩区",
                            520111: "花溪区",
                            520112: "乌当区",
                            520113: "白云区",
                            520121: "开阳县",
                            520122: "息烽县",
                            520123: "修文县",
                            520151: "观山湖区",
                            520181: "清镇市",
                            520182: "其它区",
                            520200: "六盘水市",
                            520201: "钟山区",
                            520203: "六枝特区",
                            520221: "水城县",
                            520222: "盘县",
                            520223: "其它区",
                            520300: "遵义市",
                            520302: "红花岗区",
                            520303: "汇川区",
                            520321: "遵义县",
                            520322: "桐梓县",
                            520323: "绥阳县",
                            520324: "正安县",
                            520325: "道真仡佬族苗族自治县",
                            520326: "务川仡佬族苗族自治县",
                            520327: "凤冈县",
                            520328: "湄潭县",
                            520329: "余庆县",
                            520330: "习水县",
                            520381: "赤水市",
                            520382: "仁怀市",
                            520383: "其它区",
                            520400: "安顺市",
                            520402: "西秀区",
                            520421: "平坝县",
                            520422: "普定县",
                            520423: "镇宁布依族苗族自治县",
                            520424: "关岭布依族苗族自治县",
                            520425: "紫云苗族布依族自治县",
                            520426: "其它区",
                            522200: "铜仁市",
                            522201: "碧江区",
                            522222: "江口县",
                            522223: "玉屏侗族自治县",
                            522224: "石阡县",
                            522225: "思南县",
                            522226: "印江土家族苗族自治县",
                            522227: "德江县",
                            522228: "沿河土家族自治县",
                            522229: "松桃苗族自治县",
                            522230: "万山区",
                            522231: "其它区",
                            522300: "黔西南布依族苗族自治州",
                            522301: "兴义市",
                            522322: "兴仁县",
                            522323: "普安县",
                            522324: "晴隆县",
                            522325: "贞丰县",
                            522326: "望谟县",
                            522327: "册亨县",
                            522328: "安龙县",
                            522329: "其它区",
                            522400: "毕节市",
                            522401: "七星关区",
                            522422: "大方县",
                            522423: "黔西县",
                            522424: "金沙县",
                            522425: "织金县",
                            522426: "纳雍县",
                            522427: "威宁彝族回族苗族自治县",
                            522428: "赫章县",
                            522429: "其它区",
                            522600: "黔东南苗族侗族自治州",
                            522601: "凯里市",
                            522622: "黄平县",
                            522623: "施秉县",
                            522624: "三穗县",
                            522625: "镇远县",
                            522626: "岑巩县",
                            522627: "天柱县",
                            522628: "锦屏县",
                            522629: "剑河县",
                            522630: "台江县",
                            522631: "黎平县",
                            522632: "榕江县",
                            522633: "从江县",
                            522634: "雷山县",
                            522635: "麻江县",
                            522636: "丹寨县",
                            522637: "其它区",
                            522700: "黔南布依族苗族自治州",
                            522701: "都匀市",
                            522702: "福泉市",
                            522722: "荔波县",
                            522723: "贵定县",
                            522725: "瓮安县",
                            522726: "独山县",
                            522727: "平塘县",
                            522728: "罗甸县",
                            522729: "长顺县",
                            522730: "龙里县",
                            522731: "惠水县",
                            522732: "三都水族自治县",
                            522733: "其它区",
                            530000: "云南省",
                            530100: "昆明市",
                            530102: "五华区",
                            530103: "盘龙区",
                            530111: "官渡区",
                            530112: "西山区",
                            530113: "东川区",
                            530121: "呈贡区",
                            530122: "晋宁县",
                            530124: "富民县",
                            530125: "宜良县",
                            530126: "石林彝族自治县",
                            530127: "嵩明县",
                            530128: "禄劝彝族苗族自治县",
                            530129: "寻甸回族彝族自治县",
                            530181: "安宁市",
                            530182: "其它区",
                            530300: "曲靖市",
                            530302: "麒麟区",
                            530321: "马龙县",
                            530322: "陆良县",
                            530323: "师宗县",
                            530324: "罗平县",
                            530325: "富源县",
                            530326: "会泽县",
                            530328: "沾益县",
                            530381: "宣威市",
                            530382: "其它区",
                            530400: "玉溪市",
                            530402: "红塔区",
                            530421: "江川县",
                            530422: "澄江县",
                            530423: "通海县",
                            530424: "华宁县",
                            530425: "易门县",
                            530426: "峨山彝族自治县",
                            530427: "新平彝族傣族自治县",
                            530428: "元江哈尼族彝族傣族自治县",
                            530429: "其它区",
                            530500: "保山市",
                            530502: "隆阳区",
                            530521: "施甸县",
                            530522: "腾冲县",
                            530523: "龙陵县",
                            530524: "昌宁县",
                            530525: "其它区",
                            530600: "昭通市",
                            530602: "昭阳区",
                            530621: "鲁甸县",
                            530622: "巧家县",
                            530623: "盐津县",
                            530624: "大关县",
                            530625: "永善县",
                            530626: "绥江县",
                            530627: "镇雄县",
                            530628: "彝良县",
                            530629: "威信县",
                            530630: "水富县",
                            530631: "其它区",
                            530700: "丽江市",
                            530702: "古城区",
                            530721: "玉龙纳西族自治县",
                            530722: "永胜县",
                            530723: "华坪县",
                            530724: "宁蒗彝族自治县",
                            530725: "其它区",
                            530800: "普洱市",
                            530802: "思茅区",
                            530821: "宁洱哈尼族彝族自治县",
                            530822: "墨江哈尼族自治县",
                            530823: "景东彝族自治县",
                            530824: "景谷傣族彝族自治县",
                            530825: "镇沅彝族哈尼族拉祜族自治县",
                            530826: "江城哈尼族彝族自治县",
                            530827: "孟连傣族拉祜族佤族自治县",
                            530828: "澜沧拉祜族自治县",
                            530829: "西盟佤族自治县",
                            530830: "其它区",
                            530900: "临沧市",
                            530902: "临翔区",
                            530921: "凤庆县",
                            530922: "云县",
                            530923: "永德县",
                            530924: "镇康县",
                            530925: "双江拉祜族佤族布朗族傣族自治县",
                            530926: "耿马傣族佤族自治县",
                            530927: "沧源佤族自治县",
                            530928: "其它区",
                            532300: "楚雄彝族自治州",
                            532301: "楚雄市",
                            532322: "双柏县",
                            532323: "牟定县",
                            532324: "南华县",
                            532325: "姚安县",
                            532326: "大姚县",
                            532327: "永仁县",
                            532328: "元谋县",
                            532329: "武定县",
                            532331: "禄丰县",
                            532332: "其它区",
                            532500: "红河哈尼族彝族自治州",
                            532501: "个旧市",
                            532502: "开远市",
                            532522: "蒙自市",
                            532523: "屏边苗族自治县",
                            532524: "建水县",
                            532525: "石屏县",
                            532526: "弥勒市",
                            532527: "泸西县",
                            532528: "元阳县",
                            532529: "红河县",
                            532530: "金平苗族瑶族傣族自治县",
                            532531: "绿春县",
                            532532: "河口瑶族自治县",
                            532533: "其它区",
                            532600: "文山壮族苗族自治州",
                            532621: "文山市",
                            532622: "砚山县",
                            532623: "西畴县",
                            532624: "麻栗坡县",
                            532625: "马关县",
                            532626: "丘北县",
                            532627: "广南县",
                            532628: "富宁县",
                            532629: "其它区",
                            532800: "西双版纳傣族自治州",
                            532801: "景洪市",
                            532822: "勐海县",
                            532823: "勐腊县",
                            532824: "其它区",
                            532900: "大理白族自治州",
                            532901: "大理市",
                            532922: "漾濞彝族自治县",
                            532923: "祥云县",
                            532924: "宾川县",
                            532925: "弥渡县",
                            532926: "南涧彝族自治县",
                            532927: "巍山彝族回族自治县",
                            532928: "永平县",
                            532929: "云龙县",
                            532930: "洱源县",
                            532931: "剑川县",
                            532932: "鹤庆县",
                            532933: "其它区",
                            533100: "德宏傣族景颇族自治州",
                            533102: "瑞丽市",
                            533103: "芒市",
                            533122: "梁河县",
                            533123: "盈江县",
                            533124: "陇川县",
                            533125: "其它区",
                            533300: "怒江傈僳族自治州",
                            533321: "泸水县",
                            533323: "福贡县",
                            533324: "贡山独龙族怒族自治县",
                            533325: "兰坪白族普米族自治县",
                            533326: "其它区",
                            533400: "迪庆藏族自治州",
                            533421: "香格里拉县",
                            533422: "德钦县",
                            533423: "维西傈僳族自治县",
                            533424: "其它区",
                            540000: "西藏自治区",
                            540100: "拉萨市",
                            540102: "城关区",
                            540121: "林周县",
                            540122: "当雄县",
                            540123: "尼木县",
                            540124: "曲水县",
                            540125: "堆龙德庆县",
                            540126: "达孜县",
                            540127: "墨竹工卡县",
                            540128: "其它区",
                            542100: "昌都地区",
                            542121: "昌都县",
                            542122: "江达县",
                            542123: "贡觉县",
                            542124: "类乌齐县",
                            542125: "丁青县",
                            542126: "察雅县",
                            542127: "八宿县",
                            542128: "左贡县",
                            542129: "芒康县",
                            542132: "洛隆县",
                            542133: "边坝县",
                            542134: "其它区",
                            542200: "山南地区",
                            542221: "乃东县",
                            542222: "扎囊县",
                            542223: "贡嘎县",
                            542224: "桑日县",
                            542225: "琼结县",
                            542226: "曲松县",
                            542227: "措美县",
                            542228: "洛扎县",
                            542229: "加查县",
                            542231: "隆子县",
                            542232: "错那县",
                            542233: "浪卡子县",
                            542234: "其它区",
                            542300: "日喀则地区",
                            542301: "日喀则市",
                            542322: "南木林县",
                            542323: "江孜县",
                            542324: "定日县",
                            542325: "萨迦县",
                            542326: "拉孜县",
                            542327: "昂仁县",
                            542328: "谢通门县",
                            542329: "白朗县",
                            542330: "仁布县",
                            542331: "康马县",
                            542332: "定结县",
                            542333: "仲巴县",
                            542334: "亚东县",
                            542335: "吉隆县",
                            542336: "聂拉木县",
                            542337: "萨嘎县",
                            542338: "岗巴县",
                            542339: "其它区",
                            542400: "那曲地区",
                            542421: "那曲县",
                            542422: "嘉黎县",
                            542423: "比如县",
                            542424: "聂荣县",
                            542425: "安多县",
                            542426: "申扎县",
                            542427: "索县",
                            542428: "班戈县",
                            542429: "巴青县",
                            542430: "尼玛县",
                            542431: "其它区",
                            542432: "双湖县",
                            542500: "阿里地区",
                            542521: "普兰县",
                            542522: "札达县",
                            542523: "噶尔县",
                            542524: "日土县",
                            542525: "革吉县",
                            542526: "改则县",
                            542527: "措勤县",
                            542528: "其它区",
                            542600: "林芝地区",
                            542621: "林芝县",
                            542622: "工布江达县",
                            542623: "米林县",
                            542624: "墨脱县",
                            542625: "波密县",
                            542626: "察隅县",
                            542627: "朗县",
                            542628: "其它区",
                            610000: "陕西省",
                            610100: "西安市",
                            610102: "新城区",
                            610103: "碑林区",
                            610104: "莲湖区",
                            610111: "灞桥区",
                            610112: "未央区",
                            610113: "雁塔区",
                            610114: "阎良区",
                            610115: "临潼区",
                            610116: "长安区",
                            610122: "蓝田县",
                            610124: "周至县",
                            610125: "户县",
                            610126: "高陵县",
                            610127: "其它区",
                            610200: "铜川市",
                            610202: "王益区",
                            610203: "印台区",
                            610204: "耀州区",
                            610222: "宜君县",
                            610223: "其它区",
                            610300: "宝鸡市",
                            610302: "渭滨区",
                            610303: "金台区",
                            610304: "陈仓区",
                            610322: "凤翔县",
                            610323: "岐山县",
                            610324: "扶风县",
                            610326: "眉县",
                            610327: "陇县",
                            610328: "千阳县",
                            610329: "麟游县",
                            610330: "凤县",
                            610331: "太白县",
                            610332: "其它区",
                            610400: "咸阳市",
                            610402: "秦都区",
                            610403: "杨陵区",
                            610404: "渭城区",
                            610422: "三原县",
                            610423: "泾阳县",
                            610424: "乾县",
                            610425: "礼泉县",
                            610426: "永寿县",
                            610427: "彬县",
                            610428: "长武县",
                            610429: "旬邑县",
                            610430: "淳化县",
                            610431: "武功县",
                            610481: "兴平市",
                            610482: "其它区",
                            610500: "渭南市",
                            610502: "临渭区",
                            610521: "华县",
                            610522: "潼关县",
                            610523: "大荔县",
                            610524: "合阳县",
                            610525: "澄城县",
                            610526: "蒲城县",
                            610527: "白水县",
                            610528: "富平县",
                            610581: "韩城市",
                            610582: "华阴市",
                            610583: "其它区",
                            610600: "延安市",
                            610602: "宝塔区",
                            610621: "延长县",
                            610622: "延川县",
                            610623: "子长县",
                            610624: "安塞县",
                            610625: "志丹县",
                            610626: "吴起县",
                            610627: "甘泉县",
                            610628: "富县",
                            610629: "洛川县",
                            610630: "宜川县",
                            610631: "黄龙县",
                            610632: "黄陵县",
                            610633: "其它区",
                            610700: "汉中市",
                            610702: "汉台区",
                            610721: "南郑县",
                            610722: "城固县",
                            610723: "洋县",
                            610724: "西乡县",
                            610725: "勉县",
                            610726: "宁强县",
                            610727: "略阳县",
                            610728: "镇巴县",
                            610729: "留坝县",
                            610730: "佛坪县",
                            610731: "其它区",
                            610800: "榆林市",
                            610802: "榆阳区",
                            610821: "神木县",
                            610822: "府谷县",
                            610823: "横山县",
                            610824: "靖边县",
                            610825: "定边县",
                            610826: "绥德县",
                            610827: "米脂县",
                            610828: "佳县",
                            610829: "吴堡县",
                            610830: "清涧县",
                            610831: "子洲县",
                            610832: "其它区",
                            610900: "安康市",
                            610902: "汉滨区",
                            610921: "汉阴县",
                            610922: "石泉县",
                            610923: "宁陕县",
                            610924: "紫阳县",
                            610925: "岚皋县",
                            610926: "平利县",
                            610927: "镇坪县",
                            610928: "旬阳县",
                            610929: "白河县",
                            610930: "其它区",
                            611000: "商洛市",
                            611002: "商州区",
                            611021: "洛南县",
                            611022: "丹凤县",
                            611023: "商南县",
                            611024: "山阳县",
                            611025: "镇安县",
                            611026: "柞水县",
                            611027: "其它区",
                            620000: "甘肃省",
                            620100: "兰州市",
                            620102: "城关区",
                            620103: "七里河区",
                            620104: "西固区",
                            620105: "安宁区",
                            620111: "红古区",
                            620121: "永登县",
                            620122: "皋兰县",
                            620123: "榆中县",
                            620124: "其它区",
                            620200: "嘉峪关市",
                            620300: "金昌市",
                            620302: "金川区",
                            620321: "永昌县",
                            620322: "其它区",
                            620400: "白银市",
                            620402: "白银区",
                            620403: "平川区",
                            620421: "靖远县",
                            620422: "会宁县",
                            620423: "景泰县",
                            620424: "其它区",
                            620500: "天水市",
                            620502: "秦州区",
                            620503: "麦积区",
                            620521: "清水县",
                            620522: "秦安县",
                            620523: "甘谷县",
                            620524: "武山县",
                            620525: "张家川回族自治县",
                            620526: "其它区",
                            620600: "武威市",
                            620602: "凉州区",
                            620621: "民勤县",
                            620622: "古浪县",
                            620623: "天祝藏族自治县",
                            620624: "其它区",
                            620700: "张掖市",
                            620702: "甘州区",
                            620721: "肃南裕固族自治县",
                            620722: "民乐县",
                            620723: "临泽县",
                            620724: "高台县",
                            620725: "山丹县",
                            620726: "其它区",
                            620800: "平凉市",
                            620802: "崆峒区",
                            620821: "泾川县",
                            620822: "灵台县",
                            620823: "崇信县",
                            620824: "华亭县",
                            620825: "庄浪县",
                            620826: "静宁县",
                            620827: "其它区",
                            620900: "酒泉市",
                            620902: "肃州区",
                            620921: "金塔县",
                            620922: "瓜州县",
                            620923: "肃北蒙古族自治县",
                            620924: "阿克塞哈萨克族自治县",
                            620981: "玉门市",
                            620982: "敦煌市",
                            620983: "其它区",
                            621000: "庆阳市",
                            621002: "西峰区",
                            621021: "庆城县",
                            621022: "环县",
                            621023: "华池县",
                            621024: "合水县",
                            621025: "正宁县",
                            621026: "宁县",
                            621027: "镇原县",
                            621028: "其它区",
                            621100: "定西市",
                            621102: "安定区",
                            621121: "通渭县",
                            621122: "陇西县",
                            621123: "渭源县",
                            621124: "临洮县",
                            621125: "漳县",
                            621126: "岷县",
                            621127: "其它区",
                            621200: "陇南市",
                            621202: "武都区",
                            621221: "成县",
                            621222: "文县",
                            621223: "宕昌县",
                            621224: "康县",
                            621225: "西和县",
                            621226: "礼县",
                            621227: "徽县",
                            621228: "两当县",
                            621229: "其它区",
                            622900: "临夏回族自治州",
                            622901: "临夏市",
                            622921: "临夏县",
                            622922: "康乐县",
                            622923: "永靖县",
                            622924: "广河县",
                            622925: "和政县",
                            622926: "东乡族自治县",
                            622927: "积石山保安族东乡族撒拉族自治县",
                            622928: "其它区",
                            623000: "甘南藏族自治州",
                            623001: "合作市",
                            623021: "临潭县",
                            623022: "卓尼县",
                            623023: "舟曲县",
                            623024: "迭部县",
                            623025: "玛曲县",
                            623026: "碌曲县",
                            623027: "夏河县",
                            623028: "其它区",
                            630000: "青海省",
                            630100: "西宁市",
                            630102: "城东区",
                            630103: "城中区",
                            630104: "城西区",
                            630105: "城北区",
                            630121: "大通回族土族自治县",
                            630122: "湟中县",
                            630123: "湟源县",
                            630124: "其它区",
                            632100: "海东市",
                            632121: "平安县",
                            632122: "民和回族土族自治县",
                            632123: "乐都区",
                            632126: "互助土族自治县",
                            632127: "化隆回族自治县",
                            632128: "循化撒拉族自治县",
                            632129: "其它区",
                            632200: "海北藏族自治州",
                            632221: "门源回族自治县",
                            632222: "祁连县",
                            632223: "海晏县",
                            632224: "刚察县",
                            632225: "其它区",
                            632300: "黄南藏族自治州",
                            632321: "同仁县",
                            632322: "尖扎县",
                            632323: "泽库县",
                            632324: "河南蒙古族自治县",
                            632325: "其它区",
                            632500: "海南藏族自治州",
                            632521: "共和县",
                            632522: "同德县",
                            632523: "贵德县",
                            632524: "兴海县",
                            632525: "贵南县",
                            632526: "其它区",
                            632600: "果洛藏族自治州",
                            632621: "玛沁县",
                            632622: "班玛县",
                            632623: "甘德县",
                            632624: "达日县",
                            632625: "久治县",
                            632626: "玛多县",
                            632627: "其它区",
                            632700: "玉树藏族自治州",
                            632721: "玉树市",
                            632722: "杂多县",
                            632723: "称多县",
                            632724: "治多县",
                            632725: "囊谦县",
                            632726: "曲麻莱县",
                            632727: "其它区",
                            632800: "海西蒙古族藏族自治州",
                            632801: "格尔木市",
                            632802: "德令哈市",
                            632821: "乌兰县",
                            632822: "都兰县",
                            632823: "天峻县",
                            632824: "其它区",
                            640000: "宁夏回族自治区",
                            640100: "银川市",
                            640104: "兴庆区",
                            640105: "西夏区",
                            640106: "金凤区",
                            640121: "永宁县",
                            640122: "贺兰县",
                            640181: "灵武市",
                            640182: "其它区",
                            640200: "石嘴山市",
                            640202: "大武口区",
                            640205: "惠农区",
                            640221: "平罗县",
                            640222: "其它区",
                            640300: "吴忠市",
                            640302: "利通区",
                            640303: "红寺堡区",
                            640323: "盐池县",
                            640324: "同心县",
                            640381: "青铜峡市",
                            640382: "其它区",
                            640400: "固原市",
                            640402: "原州区",
                            640422: "西吉县",
                            640423: "隆德县",
                            640424: "泾源县",
                            640425: "彭阳县",
                            640426: "其它区",
                            640500: "中卫市",
                            640502: "沙坡头区",
                            640521: "中宁县",
                            640522: "海原县",
                            640523: "其它区",
                            650000: "新疆维吾尔自治区",
                            650100: "乌鲁木齐市",
                            650102: "天山区",
                            650103: "沙依巴克区",
                            650104: "新市区",
                            650105: "水磨沟区",
                            650106: "头屯河区",
                            650107: "达坂城区",
                            650109: "米东区",
                            650121: "乌鲁木齐县",
                            650122: "其它区",
                            650200: "克拉玛依市",
                            650202: "独山子区",
                            650203: "克拉玛依区",
                            650204: "白碱滩区",
                            650205: "乌尔禾区",
                            650206: "其它区",
                            652100: "吐鲁番地区",
                            652101: "吐鲁番市",
                            652122: "鄯善县",
                            652123: "托克逊县",
                            652124: "其它区",
                            652200: "哈密地区",
                            652201: "哈密市",
                            652222: "巴里坤哈萨克自治县",
                            652223: "伊吾县",
                            652224: "其它区",
                            652300: "昌吉回族自治州",
                            652301: "昌吉市",
                            652302: "阜康市",
                            652323: "呼图壁县",
                            652324: "玛纳斯县",
                            652325: "奇台县",
                            652327: "吉木萨尔县",
                            652328: "木垒哈萨克自治县",
                            652329: "其它区",
                            652700: "博尔塔拉蒙古自治州",
                            652701: "博乐市",
                            652702: "阿拉山口市",
                            652722: "精河县",
                            652723: "温泉县",
                            652724: "其它区",
                            652800: "巴音郭楞蒙古自治州",
                            652801: "库尔勒市",
                            652822: "轮台县",
                            652823: "尉犁县",
                            652824: "若羌县",
                            652825: "且末县",
                            652826: "焉耆回族自治县",
                            652827: "和静县",
                            652828: "和硕县",
                            652829: "博湖县",
                            652830: "其它区",
                            652900: "阿克苏地区",
                            652901: "阿克苏市",
                            652922: "温宿县",
                            652923: "库车县",
                            652924: "沙雅县",
                            652925: "新和县",
                            652926: "拜城县",
                            652927: "乌什县",
                            652928: "阿瓦提县",
                            652929: "柯坪县",
                            652930: "其它区",
                            653000: "克孜勒苏柯尔克孜自治州",
                            653001: "阿图什市",
                            653022: "阿克陶县",
                            653023: "阿合奇县",
                            653024: "乌恰县",
                            653025: "其它区",
                            653100: "喀什地区",
                            653101: "喀什市",
                            653121: "疏附县",
                            653122: "疏勒县",
                            653123: "英吉沙县",
                            653124: "泽普县",
                            653125: "莎车县",
                            653126: "叶城县",
                            653127: "麦盖提县",
                            653128: "岳普湖县",
                            653129: "伽师县",
                            653130: "巴楚县",
                            653131: "塔什库尔干塔吉克自治县",
                            653132: "其它区",
                            653200: "和田地区",
                            653201: "和田市",
                            653221: "和田县",
                            653222: "墨玉县",
                            653223: "皮山县",
                            653224: "洛浦县",
                            653225: "策勒县",
                            653226: "于田县",
                            653227: "民丰县",
                            653228: "其它区",
                            654000: "伊犁哈萨克自治州",
                            654002: "伊宁市",
                            654003: "奎屯市",
                            654021: "伊宁县",
                            654022: "察布查尔锡伯自治县",
                            654023: "霍城县",
                            654024: "巩留县",
                            654025: "新源县",
                            654026: "昭苏县",
                            654027: "特克斯县",
                            654028: "尼勒克县",
                            654029: "其它区",
                            654200: "塔城地区",
                            654201: "塔城市",
                            654202: "乌苏市",
                            654221: "额敏县",
                            654223: "沙湾县",
                            654224: "托里县",
                            654225: "裕民县",
                            654226: "和布克赛尔蒙古自治县",
                            654227: "其它区",
                            654300: "阿勒泰地区",
                            654301: "阿勒泰市",
                            654321: "布尔津县",
                            654322: "富蕴县",
                            654323: "福海县",
                            654324: "哈巴河县",
                            654325: "青河县",
                            654326: "吉木乃县",
                            654327: "其它区",
                            659001: "石河子市",
                            659002: "阿拉尔市",
                            659003: "图木舒克市",
                            659004: "五家渠市",
                            710000: "台湾",
                            710100: "台北市",
                            710101: "中正区",
                            710102: "大同区",
                            710103: "中山区",
                            710104: "松山区",
                            710105: "大安区",
                            710106: "万华区",
                            710107: "信义区",
                            710108: "士林区",
                            710109: "北投区",
                            710110: "内湖区",
                            710111: "南港区",
                            710112: "文山区",
                            710113: "其它区",
                            710200: "高雄市",
                            710201: "新兴区",
                            710202: "前金区",
                            710203: "芩雅区",
                            710204: "盐埕区",
                            710205: "鼓山区",
                            710206: "旗津区",
                            710207: "前镇区",
                            710208: "三民区",
                            710209: "左营区",
                            710210: "楠梓区",
                            710211: "小港区",
                            710212: "其它区",
                            710241: "苓雅区",
                            710242: "仁武区",
                            710243: "大社区",
                            710244: "冈山区",
                            710245: "路竹区",
                            710246: "阿莲区",
                            710247: "田寮区",
                            710248: "燕巢区",
                            710249: "桥头区",
                            710250: "梓官区",
                            710251: "弥陀区",
                            710252: "永安区",
                            710253: "湖内区",
                            710254: "凤山区",
                            710255: "大寮区",
                            710256: "林园区",
                            710257: "鸟松区",
                            710258: "大树区",
                            710259: "旗山区",
                            710260: "美浓区",
                            710261: "六龟区",
                            710262: "内门区",
                            710263: "杉林区",
                            710264: "甲仙区",
                            710265: "桃源区",
                            710266: "那玛夏区",
                            710267: "茂林区",
                            710268: "茄萣区",
                            710300: "台南市",
                            710301: "中西区",
                            710302: "东区",
                            710303: "南区",
                            710304: "北区",
                            710305: "安平区",
                            710306: "安南区",
                            710307: "其它区",
                            710339: "永康区",
                            710340: "归仁区",
                            710341: "新化区",
                            710342: "左镇区",
                            710343: "玉井区",
                            710344: "楠西区",
                            710345: "南化区",
                            710346: "仁德区",
                            710347: "关庙区",
                            710348: "龙崎区",
                            710349: "官田区",
                            710350: "麻豆区",
                            710351: "佳里区",
                            710352: "西港区",
                            710353: "七股区",
                            710354: "将军区",
                            710355: "学甲区",
                            710356: "北门区",
                            710357: "新营区",
                            710358: "后壁区",
                            710359: "白河区",
                            710360: "东山区",
                            710361: "六甲区",
                            710362: "下营区",
                            710363: "柳营区",
                            710364: "盐水区",
                            710365: "善化区",
                            710366: "大内区",
                            710367: "山上区",
                            710368: "新市区",
                            710369: "安定区",
                            710400: "台中市",
                            710401: "中区",
                            710402: "东区",
                            710403: "南区",
                            710404: "西区",
                            710405: "北区",
                            710406: "北屯区",
                            710407: "西屯区",
                            710408: "南屯区",
                            710409: "其它区",
                            710431: "太平区",
                            710432: "大里区",
                            710433: "雾峰区",
                            710434: "乌日区",
                            710435: "丰原区",
                            710436: "后里区",
                            710437: "石冈区",
                            710438: "东势区",
                            710439: "和平区",
                            710440: "新社区",
                            710441: "潭子区",
                            710442: "大雅区",
                            710443: "神冈区",
                            710444: "大肚区",
                            710445: "沙鹿区",
                            710446: "龙井区",
                            710447: "梧栖区",
                            710448: "清水区",
                            710449: "大甲区",
                            710450: "外埔区",
                            710451: "大安区",
                            710500: "金门县",
                            710507: "金沙镇",
                            710508: "金湖镇",
                            710509: "金宁乡",
                            710510: "金城镇",
                            710511: "烈屿乡",
                            710512: "乌坵乡",
                            710600: "南投县",
                            710614: "南投市",
                            710615: "中寮乡",
                            710616: "草屯镇",
                            710617: "国姓乡",
                            710618: "埔里镇",
                            710619: "仁爱乡",
                            710620: "名间乡",
                            710621: "集集镇",
                            710622: "水里乡",
                            710623: "鱼池乡",
                            710624: "信义乡",
                            710625: "竹山镇",
                            710626: "鹿谷乡",
                            710700: "基隆市",
                            710701: "仁爱区",
                            710702: "信义区",
                            710703: "中正区",
                            710704: "中山区",
                            710705: "安乐区",
                            710706: "暖暖区",
                            710707: "七堵区",
                            710708: "其它区",
                            710800: "新竹市",
                            710801: "东区",
                            710802: "北区",
                            710803: "香山区",
                            710804: "其它区",
                            710900: "嘉义市",
                            710901: "东区",
                            710902: "西区",
                            710903: "其它区",
                            711100: "新北市",
                            711130: "万里区",
                            711131: "金山区",
                            711132: "板桥区",
                            711133: "汐止区",
                            711134: "深坑区",
                            711135: "石碇区",
                            711136: "瑞芳区",
                            711137: "平溪区",
                            711138: "双溪区",
                            711139: "贡寮区",
                            711140: "新店区",
                            711141: "坪林区",
                            711142: "乌来区",
                            711143: "永和区",
                            711144: "中和区",
                            711145: "土城区",
                            711146: "三峡区",
                            711147: "树林区",
                            711148: "莺歌区",
                            711149: "三重区",
                            711150: "新庄区",
                            711151: "泰山区",
                            711152: "林口区",
                            711153: "芦洲区",
                            711154: "五股区",
                            711155: "八里区",
                            711156: "淡水区",
                            711157: "三芝区",
                            711158: "石门区",
                            711200: "宜兰县",
                            711214: "宜兰市",
                            711215: "头城镇",
                            711216: "礁溪乡",
                            711217: "壮围乡",
                            711218: "员山乡",
                            711219: "罗东镇",
                            711220: "三星乡",
                            711221: "大同乡",
                            711222: "五结乡",
                            711223: "冬山乡",
                            711224: "苏澳镇",
                            711225: "南澳乡",
                            711226: "钓鱼台",
                            711300: "新竹县",
                            711314: "竹北市",
                            711315: "湖口乡",
                            711316: "新丰乡",
                            711317: "新埔镇",
                            711318: "关西镇",
                            711319: "芎林乡",
                            711320: "宝山乡",
                            711321: "竹东镇",
                            711322: "五峰乡",
                            711323: "横山乡",
                            711324: "尖石乡",
                            711325: "北埔乡",
                            711326: "峨眉乡",
                            711400: "桃园县",
                            711414: "中坜市",
                            711415: "平镇市",
                            711416: "龙潭乡",
                            711417: "杨梅市",
                            711418: "新屋乡",
                            711419: "观音乡",
                            711420: "桃园市",
                            711421: "龟山乡",
                            711422: "八德市",
                            711423: "大溪镇",
                            711424: "复兴乡",
                            711425: "大园乡",
                            711426: "芦竹乡",
                            711500: "苗栗县",
                            711519: "竹南镇",
                            711520: "头份镇",
                            711521: "三湾乡",
                            711522: "南庄乡",
                            711523: "狮潭乡",
                            711524: "后龙镇",
                            711525: "通霄镇",
                            711526: "苑里镇",
                            711527: "苗栗市",
                            711528: "造桥乡",
                            711529: "头屋乡",
                            711530: "公馆乡",
                            711531: "大湖乡",
                            711532: "泰安乡",
                            711533: "铜锣乡",
                            711534: "三义乡",
                            711535: "西湖乡",
                            711536: "卓兰镇",
                            711700: "彰化县",
                            711727: "彰化市",
                            711728: "芬园乡",
                            711729: "花坛乡",
                            711730: "秀水乡",
                            711731: "鹿港镇",
                            711732: "福兴乡",
                            711733: "线西乡",
                            711734: "和美镇",
                            711735: "伸港乡",
                            711736: "员林镇",
                            711737: "社头乡",
                            711738: "永靖乡",
                            711739: "埔心乡",
                            711740: "溪湖镇",
                            711741: "大村乡",
                            711742: "埔盐乡",
                            711743: "田中镇",
                            711744: "北斗镇",
                            711745: "田尾乡",
                            711746: "埤头乡",
                            711747: "溪州乡",
                            711748: "竹塘乡",
                            711749: "二林镇",
                            711750: "大城乡",
                            711751: "芳苑乡",
                            711752: "二水乡",
                            711900: "嘉义县",
                            711919: "番路乡",
                            711920: "梅山乡",
                            711921: "竹崎乡",
                            711922: "阿里山乡",
                            711923: "中埔乡",
                            711924: "大埔乡",
                            711925: "水上乡",
                            711926: "鹿草乡",
                            711927: "太保市",
                            711928: "朴子市",
                            711929: "东石乡",
                            711930: "六脚乡",
                            711931: "新港乡",
                            711932: "民雄乡",
                            711933: "大林镇",
                            711934: "溪口乡",
                            711935: "义竹乡",
                            711936: "布袋镇",
                            712100: "云林县",
                            712121: "斗南镇",
                            712122: "大埤乡",
                            712123: "虎尾镇",
                            712124: "土库镇",
                            712125: "褒忠乡",
                            712126: "东势乡",
                            712127: "台西乡",
                            712128: "仑背乡",
                            712129: "麦寮乡",
                            712130: "斗六市",
                            712131: "林内乡",
                            712132: "古坑乡",
                            712133: "莿桐乡",
                            712134: "西螺镇",
                            712135: "二仑乡",
                            712136: "北港镇",
                            712137: "水林乡",
                            712138: "口湖乡",
                            712139: "四湖乡",
                            712140: "元长乡",
                            712400: "屏东县",
                            712434: "屏东市",
                            712435: "三地门乡",
                            712436: "雾台乡",
                            712437: "玛家乡",
                            712438: "九如乡",
                            712439: "里港乡",
                            712440: "高树乡",
                            712441: "盐埔乡",
                            712442: "长治乡",
                            712443: "麟洛乡",
                            712444: "竹田乡",
                            712445: "内埔乡",
                            712446: "万丹乡",
                            712447: "潮州镇",
                            712448: "泰武乡",
                            712449: "来义乡",
                            712450: "万峦乡",
                            712451: "崁顶乡",
                            712452: "新埤乡",
                            712453: "南州乡",
                            712454: "林边乡",
                            712455: "东港镇",
                            712456: "琉球乡",
                            712457: "佳冬乡",
                            712458: "新园乡",
                            712459: "枋寮乡",
                            712460: "枋山乡",
                            712461: "春日乡",
                            712462: "狮子乡",
                            712463: "车城乡",
                            712464: "牡丹乡",
                            712465: "恒春镇",
                            712466: "满州乡",
                            712500: "台东县",
                            712517: "台东市",
                            712518: "绿岛乡",
                            712519: "兰屿乡",
                            712520: "延平乡",
                            712521: "卑南乡",
                            712522: "鹿野乡",
                            712523: "关山镇",
                            712524: "海端乡",
                            712525: "池上乡",
                            712526: "东河乡",
                            712527: "成功镇",
                            712528: "长滨乡",
                            712529: "金峰乡",
                            712530: "大武乡",
                            712531: "达仁乡",
                            712532: "太麻里乡",
                            712600: "花莲县",
                            712615: "花莲市",
                            712616: "新城乡",
                            712617: "太鲁阁",
                            712618: "秀林乡",
                            712619: "吉安乡",
                            712620: "寿丰乡",
                            712621: "凤林镇",
                            712622: "光复乡",
                            712623: "丰滨乡",
                            712624: "瑞穗乡",
                            712625: "万荣乡",
                            712626: "玉里镇",
                            712627: "卓溪乡",
                            712628: "富里乡",
                            712700: "澎湖县",
                            712707: "马公市",
                            712708: "西屿乡",
                            712709: "望安乡",
                            712710: "七美乡",
                            712711: "白沙乡",
                            712712: "湖西乡",
                            712800: "连江县",
                            712805: "南竿乡",
                            712806: "北竿乡",
                            712807: "莒光乡",
                            712808: "东引乡",
                            810000: "香港特别行政区",
                            810100: "香港岛",
                            810101: "中西区",
                            810102: "湾仔",
                            810103: "东区",
                            810104: "南区",
                            810200: "九龙",
                            810201: "九龙城区",
                            810202: "油尖旺区",
                            810203: "深水埗区",
                            810204: "黄大仙区",
                            810205: "观塘区",
                            810300: "新界",
                            810301: "北区",
                            810302: "大埔区",
                            810303: "沙田区",
                            810304: "西贡区",
                            810305: "元朗区",
                            810306: "屯门区",
                            810307: "荃湾区",
                            810308: "葵青区",
                            810309: "离岛区",
                            820000: "澳门特别行政区",
                            820100: "澳门半岛",
                            820200: "离岛",
                            990000: "海外",
                            990100: "海外"
                        },
                        r = (function() {
                            var t = [];
                            for (var e in n) {
                                var r =
                                    "0000" === e.slice(2, 6)
                                        ? void 0
                                        : "00" == e.slice(4, 6)
                                        ? e.slice(0, 2) + "0000"
                                        : e.slice(0, 4) + "00";
                                t.push({ id: e, pid: r, name: n[e] });
                            }
                            return (function(t) {
                                for (var e, n = {}, r = 0; r < t.length; r++) (e = t[r]) && e.id && (n[e.id] = e);
                                for (var a = [], o = 0; o < t.length; o++)
                                    if ((e = t[o]))
                                        if (void 0 != e.pid || void 0 != e.parentId) {
                                            var i = n[e.pid] || n[e.parentId];
                                            i && (i.children || (i.children = []), i.children.push(e));
                                        } else a.push(e);
                                return a;
                            })(t);
                        })();
                    t.exports = r;
                },
                function(t, e, n) {
                    var r,
                        a = n(18);
                    t.exports = {
                        d4: function() {
                            return this.natural(1, 4);
                        },
                        d6: function() {
                            return this.natural(1, 6);
                        },
                        d8: function() {
                            return this.natural(1, 8);
                        },
                        d12: function() {
                            return this.natural(1, 12);
                        },
                        d20: function() {
                            return this.natural(1, 20);
                        },
                        d100: function() {
                            return this.natural(1, 100);
                        },
                        guid: function() {
                            var t = "abcdefABCDEF1234567890";
                            return (
                                this.string(t, 8) +
                                "-" +
                                this.string(t, 4) +
                                "-" +
                                this.string(t, 4) +
                                "-" +
                                this.string(t, 4) +
                                "-" +
                                this.string(t, 12)
                            );
                        },
                        uuid: function() {
                            return this.guid();
                        },
                        id: function() {
                            var t,
                                e = 0,
                                n = [
                                    "7",
                                    "9",
                                    "10",
                                    "5",
                                    "8",
                                    "4",
                                    "2",
                                    "1",
                                    "6",
                                    "3",
                                    "7",
                                    "9",
                                    "10",
                                    "5",
                                    "8",
                                    "4",
                                    "2"
                                ];
                            t = this.pick(a).id + this.date("yyyyMMdd") + this.string("number", 3);
                            for (var r = 0; r < t.length; r++) e += t[r] * n[r];
                            return t + ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"][e % 11];
                        },
                        increment: ((r = 0),
                        function(t) {
                            return (r += +t || 1);
                        }),
                        inc: function(t) {
                            return this.increment(t);
                        }
                    };
                },
                function(t, e, n) {
                    var r = n(21),
                        a = n(22);
                    t.exports = { Parser: r, Handler: a };
                },
                function(t, e) {
                    function n(t) {
                        (this.type = t), (this.offset = n.offset()), (this.text = n.text());
                    }
                    function r(t, e) {
                        n.call(this, t), (this.body = e);
                    }
                    function a(t, e) {
                        n.call(this, "quantifier"), (this.min = t), (this.max = e), (this.greedy = !0);
                    }
                    var o = (function() {
                            function t(t, e, n, r, a) {
                                (this.expected = t),
                                    (this.found = e),
                                    (this.offset = n),
                                    (this.line = r),
                                    (this.column = a),
                                    (this.name = "SyntaxError"),
                                    (this.message = (function(t, e) {
                                        var n;
                                        switch (t.length) {
                                            case 0:
                                                n = "end of input";
                                                break;
                                            case 1:
                                                n = t[0];
                                                break;
                                            default:
                                                n = t.slice(0, -1).join(", ") + " or " + t[t.length - 1];
                                        }
                                        return (
                                            "Expected " +
                                            n +
                                            " but " +
                                            (e
                                                ? '"' +
                                                  (function(t) {
                                                      function e(t) {
                                                          return t
                                                              .charCodeAt(0)
                                                              .toString(16)
                                                              .toUpperCase();
                                                      }
                                                      return t
                                                          .replace(/\\/g, "\\\\")
                                                          .replace(/"/g, '\\"')
                                                          .replace(/\x08/g, "\\b")
                                                          .replace(/\t/g, "\\t")
                                                          .replace(/\n/g, "\\n")
                                                          .replace(/\f/g, "\\f")
                                                          .replace(/\r/g, "\\r")
                                                          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(t) {
                                                              return "\\x0" + e(t);
                                                          })
                                                          .replace(/[\x10-\x1F\x80-\xFF]/g, function(t) {
                                                              return "\\x" + e(t);
                                                          })
                                                          .replace(/[\u0180-\u0FFF]/g, function(t) {
                                                              return "\\u0" + e(t);
                                                          })
                                                          .replace(/[\u1080-\uFFFF]/g, function(t) {
                                                              return "\\u" + e(t);
                                                          });
                                                  })(e) +
                                                  '"'
                                                : "end of input") +
                                            " found."
                                        );
                                    })(t, e));
                            }
                            return (
                                (function(t, e) {
                                    function n() {
                                        this.constructor = t;
                                    }
                                    (n.prototype = e.prototype), (t.prototype = new n());
                                })(t, Error),
                                {
                                    SyntaxError: t,
                                    parse: function(e) {
                                        function o(t) {
                                            return (
                                                dn !== t &&
                                                    (dn > t && ((dn = 0), (mn = { line: 1, column: 1, seenCR: !1 })),
                                                    (function(t, n, r) {
                                                        var a, o;
                                                        for (a = n; r > a; a++)
                                                            "\n" === (o = e.charAt(a))
                                                                ? (t.seenCR || t.line++,
                                                                  (t.column = 1),
                                                                  (t.seenCR = !1))
                                                                : "\r" === o || "\u2028" === o || "\u2029" === o
                                                                ? (t.line++, (t.column = 1), (t.seenCR = !0))
                                                                : (t.column++, (t.seenCR = !1));
                                                    })(mn, dn, t),
                                                    (dn = t)),
                                                mn
                                            );
                                        }
                                        function l(t) {
                                            gn > pn || (pn > gn && ((gn = pn), (vn = [])), vn.push(t));
                                        }
                                        function s() {
                                            var t, n, r, a, o;
                                            return (
                                                (t = pn),
                                                null !==
                                                (n = (function() {
                                                    var t, n, r, a, o, i, u, s, f;
                                                    if (
                                                        ((t = pn),
                                                        null ===
                                                            ((s = pn),
                                                            94 === e.charCodeAt(pn)
                                                                ? ((f = B), pn++)
                                                                : ((f = null), 0 === xn && l(G)),
                                                            null !== f && ((fn = s), (f = X())),
                                                            null === f ? ((pn = s), (s = f)) : (s = f),
                                                            (n = s)) && (n = I),
                                                        null !== n)
                                                    )
                                                        if (
                                                            ((r = pn),
                                                            xn++,
                                                            (a = p()),
                                                            xn--,
                                                            null === a ? (r = I) : ((pn = r), (r = O)),
                                                            null !== r)
                                                        ) {
                                                            for (a = [], null === (o = h()) && (o = c()); null !== o; )
                                                                a.push(o), null === (o = h()) && (o = c());
                                                            null !== a
                                                                ? ((i = pn),
                                                                  36 === e.charCodeAt(pn)
                                                                      ? ((u = K), pn++)
                                                                      : ((u = null), 0 === xn && l(W)),
                                                                  null !== u && ((fn = i), (u = Y())),
                                                                  null === u ? ((pn = i), (i = u)) : (i = u),
                                                                  null === (o = i) && (o = I),
                                                                  null !== o
                                                                      ? ((fn = t),
                                                                        null === (n = U(n, a, o))
                                                                            ? ((pn = t), (t = n))
                                                                            : (t = n))
                                                                      : ((pn = t), (t = O)))
                                                                : ((pn = t), (t = O));
                                                        } else (pn = t), (t = O);
                                                    else (pn = t), (t = O);
                                                    return t;
                                                })())
                                                    ? ((r = pn),
                                                      124 === e.charCodeAt(pn)
                                                          ? ((a = j), pn++)
                                                          : ((a = null), 0 === xn && l(N)),
                                                      null !== a && null !== (o = s())
                                                          ? (r = a = [a, o])
                                                          : ((pn = r), (r = O)),
                                                      null === r && (r = I),
                                                      null !== r
                                                          ? ((fn = t),
                                                            null === (n = z(n, r)) ? ((pn = t), (t = n)) : (t = n))
                                                          : ((pn = t), (t = O)))
                                                    : ((pn = t), (t = O)),
                                                t
                                            );
                                        }
                                        function c() {
                                            var t,
                                                n,
                                                r,
                                                a,
                                                o,
                                                i,
                                                u,
                                                c,
                                                h,
                                                p,
                                                f,
                                                q,
                                                D,
                                                F,
                                                L,
                                                j,
                                                N,
                                                z,
                                                U,
                                                X,
                                                K,
                                                W,
                                                Y,
                                                $,
                                                J,
                                                V,
                                                Z,
                                                Q,
                                                tt;
                                            return (
                                                (L = pn),
                                                40 === e.charCodeAt(pn)
                                                    ? ((j = wt), pn++)
                                                    : ((j = null), 0 === xn && l(Ct)),
                                                null !== j
                                                    ? (null ===
                                                          ((Z = pn),
                                                          e.substr(pn, 2) === St
                                                              ? ((Q = St), (pn += 2))
                                                              : ((Q = null), 0 === xn && l(Tt)),
                                                          null !== Q && null !== (tt = s())
                                                              ? ((fn = Z),
                                                                null === (Q = Ht(tt)) ? ((pn = Z), (Z = Q)) : (Z = Q))
                                                              : ((pn = Z), (Z = O)),
                                                          (N = Z)) &&
                                                          null ===
                                                              (($ = pn),
                                                              e.substr(pn, 2) === qt
                                                                  ? ((J = qt), (pn += 2))
                                                                  : ((J = null), 0 === xn && l(Dt)),
                                                              null !== J && null !== (V = s())
                                                                  ? ((fn = $),
                                                                    null === (J = Ft(V))
                                                                        ? ((pn = $), ($ = J))
                                                                        : ($ = J))
                                                                  : ((pn = $), ($ = O)),
                                                              (N = $)) &&
                                                          null ===
                                                              ((K = pn),
                                                              e.substr(pn, 2) === _t
                                                                  ? ((W = _t), (pn += 2))
                                                                  : ((W = null), 0 === xn && l(Mt)),
                                                              null !== W && null !== (Y = s())
                                                                  ? ((fn = K),
                                                                    null === (W = Pt(Y))
                                                                        ? ((pn = K), (K = W))
                                                                        : (K = W))
                                                                  : ((pn = K), (K = O)),
                                                              (N = K)) &&
                                                          ((U = pn),
                                                          null !== (X = s()) && ((fn = U), (X = At(X))),
                                                          null === X ? ((pn = U), (U = X)) : (U = X),
                                                          (N = U)),
                                                      null !== N
                                                          ? (41 === e.charCodeAt(pn)
                                                                ? ((z = kt), pn++)
                                                                : ((z = null), 0 === xn && l(Et)),
                                                            null !== z
                                                                ? ((fn = L),
                                                                  null === (j = Rt(N)) ? ((pn = L), (L = j)) : (L = j))
                                                                : ((pn = L), (L = O)))
                                                          : ((pn = L), (L = O)))
                                                    : ((pn = L), (L = O)),
                                                null === (t = L) &&
                                                    null ===
                                                        (t = (function() {
                                                            var t, n, r, a, o;
                                                            if (
                                                                (xn++,
                                                                (t = pn),
                                                                91 === e.charCodeAt(pn)
                                                                    ? ((n = Ot), pn++)
                                                                    : ((n = null), 0 === xn && l(It)),
                                                                null !== n)
                                                            )
                                                                if (
                                                                    (94 === e.charCodeAt(pn)
                                                                        ? ((r = B), pn++)
                                                                        : ((r = null), 0 === xn && l(G)),
                                                                    null === r && (r = I),
                                                                    null !== r)
                                                                ) {
                                                                    for (
                                                                        a = [], null === (o = d()) && (o = m());
                                                                        null !== o;

                                                                    )
                                                                        a.push(o), null === (o = d()) && (o = m());
                                                                    null !== a
                                                                        ? (93 === e.charCodeAt(pn)
                                                                              ? ((o = jt), pn++)
                                                                              : ((o = null), 0 === xn && l(Nt)),
                                                                          null !== o
                                                                              ? ((fn = t),
                                                                                null === (n = zt(r, a))
                                                                                    ? ((pn = t), (t = n))
                                                                                    : (t = n))
                                                                              : ((pn = t), (t = O)))
                                                                        : ((pn = t), (t = O));
                                                                } else (pn = t), (t = O);
                                                            else (pn = t), (t = O);
                                                            return (
                                                                xn--, null === t && ((n = null), 0 === xn && l(Lt)), t
                                                            );
                                                        })()) &&
                                                    (null ===
                                                        ((D = pn),
                                                        46 === e.charCodeAt(pn)
                                                            ? ((F = Jt), pn++)
                                                            : ((F = null), 0 === xn && l(Vt)),
                                                        null !== F && ((fn = D), (F = Zt())),
                                                        null === F ? ((pn = D), (D = F)) : (D = F),
                                                        (n = D)) &&
                                                        null ===
                                                            (null ===
                                                                ((f = pn),
                                                                e.substr(pn, 2) === ne
                                                                    ? ((q = ne), (pn += 2))
                                                                    : ((q = null), 0 === xn && l(re)),
                                                                null !== q && ((fn = f), (q = oe())),
                                                                null === q ? ((pn = f), (f = q)) : (f = q),
                                                                (o = f)) &&
                                                                null ===
                                                                    ((h = pn),
                                                                    e.substr(pn, 2) === ie
                                                                        ? ((p = ie), (pn += 2))
                                                                        : ((p = null), 0 === xn && l(ue)),
                                                                    null !== p && ((fn = h), (p = le())),
                                                                    null === p ? ((pn = h), (h = p)) : (h = p),
                                                                    (o = h)) &&
                                                                null === (o = _()) &&
                                                                null === (o = g()) &&
                                                                null === (o = v()) &&
                                                                null === (o = x()) &&
                                                                null === (o = y()) &&
                                                                null === (o = b()) &&
                                                                null === (o = w()) &&
                                                                null === (o = C()) &&
                                                                null === (o = k()) &&
                                                                null === (o = E()) &&
                                                                null === (o = R()) &&
                                                                null === (o = A()) &&
                                                                null ===
                                                                    ((i = pn),
                                                                    92 === e.charCodeAt(pn)
                                                                        ? ((u = Ke), pn++)
                                                                        : ((u = null), 0 === xn && l(We)),
                                                                    null !== u
                                                                        ? (Ye.test(e.charAt(pn))
                                                                              ? ((c = e.charAt(pn)), pn++)
                                                                              : ((c = null), 0 === xn && l($e)),
                                                                          null !== c
                                                                              ? ((fn = i),
                                                                                null === (u = Je(c))
                                                                                    ? ((pn = i), (i = u))
                                                                                    : (i = u))
                                                                              : ((pn = i), (i = O)))
                                                                        : ((pn = i), (i = O)),
                                                                    (o = i)) &&
                                                                null === (o = M()) &&
                                                                null === (o = P()) &&
                                                                null === (o = S()) &&
                                                                null === (o = T()) &&
                                                                (o = H()),
                                                            (n = o)) &&
                                                        (xn++,
                                                        (r = pn),
                                                        te.test(e.charAt(pn))
                                                            ? ((a = e.charAt(pn)), pn++)
                                                            : ((a = null), 0 === xn && l(ee)),
                                                        null !== a && ((fn = r), (a = $t(a))),
                                                        null === a ? ((pn = r), (r = a)) : (r = a),
                                                        xn--,
                                                        null === r && ((a = null), 0 === xn && l(Qt)),
                                                        (n = r)),
                                                    (t = n)),
                                                t
                                            );
                                        }
                                        function h() {
                                            var t, e, n;
                                            return (
                                                (t = pn),
                                                null !== (e = c()) && null !== (n = p())
                                                    ? ((fn = t), null === (e = $(e, n)) ? ((pn = t), (t = e)) : (t = e))
                                                    : ((pn = t), (t = O)),
                                                t
                                            );
                                        }
                                        function p() {
                                            var t,
                                                n,
                                                r,
                                                a,
                                                o,
                                                i,
                                                u,
                                                s,
                                                c,
                                                h,
                                                p,
                                                d,
                                                m,
                                                g,
                                                v,
                                                x,
                                                y,
                                                b,
                                                w,
                                                C,
                                                k,
                                                E,
                                                R,
                                                A,
                                                _;
                                            return (
                                                xn++,
                                                (t = pn),
                                                null ===
                                                    ((C = pn),
                                                    123 === e.charCodeAt(pn)
                                                        ? ((k = Z), pn++)
                                                        : ((k = null), 0 === xn && l(Q)),
                                                    null !== k && null !== (E = f())
                                                        ? (44 === e.charCodeAt(pn)
                                                              ? ((R = tt), pn++)
                                                              : ((R = null), 0 === xn && l(et)),
                                                          null !== R && null !== (A = f())
                                                              ? (125 === e.charCodeAt(pn)
                                                                    ? ((_ = nt), pn++)
                                                                    : ((_ = null), 0 === xn && l(rt)),
                                                                null !== _
                                                                    ? ((fn = C),
                                                                      null === (k = at(E, A))
                                                                          ? ((pn = C), (C = k))
                                                                          : (C = k))
                                                                    : ((pn = C), (C = O)))
                                                              : ((pn = C), (C = O)))
                                                        : ((pn = C), (C = O)),
                                                    (o = C)) &&
                                                    null ===
                                                        ((x = pn),
                                                        123 === e.charCodeAt(pn)
                                                            ? ((y = Z), pn++)
                                                            : ((y = null), 0 === xn && l(Q)),
                                                        null !== y && null !== (b = f())
                                                            ? (e.substr(pn, 2) === ot
                                                                  ? ((w = ot), (pn += 2))
                                                                  : ((w = null), 0 === xn && l(it)),
                                                              null !== w
                                                                  ? ((fn = x),
                                                                    null === (y = ut(b))
                                                                        ? ((pn = x), (x = y))
                                                                        : (x = y))
                                                                  : ((pn = x), (x = O)))
                                                            : ((pn = x), (x = O)),
                                                        (o = x)) &&
                                                    null ===
                                                        ((d = pn),
                                                        123 === e.charCodeAt(pn)
                                                            ? ((m = Z), pn++)
                                                            : ((m = null), 0 === xn && l(Q)),
                                                        null !== m && null !== (g = f())
                                                            ? (125 === e.charCodeAt(pn)
                                                                  ? ((v = nt), pn++)
                                                                  : ((v = null), 0 === xn && l(rt)),
                                                              null !== v
                                                                  ? ((fn = d),
                                                                    null === (m = lt(g))
                                                                        ? ((pn = d), (d = m))
                                                                        : (d = m))
                                                                  : ((pn = d), (d = O)))
                                                            : ((pn = d), (d = O)),
                                                        (o = d)) &&
                                                    null ===
                                                        ((h = pn),
                                                        43 === e.charCodeAt(pn)
                                                            ? ((p = st), pn++)
                                                            : ((p = null), 0 === xn && l(ct)),
                                                        null !== p && ((fn = h), (p = ht())),
                                                        null === p ? ((pn = h), (h = p)) : (h = p),
                                                        (o = h)) &&
                                                    null ===
                                                        ((s = pn),
                                                        42 === e.charCodeAt(pn)
                                                            ? ((c = pt), pn++)
                                                            : ((c = null), 0 === xn && l(ft)),
                                                        null !== c && ((fn = s), (c = dt())),
                                                        null === c ? ((pn = s), (s = c)) : (s = c),
                                                        (o = s)) &&
                                                    ((i = pn),
                                                    63 === e.charCodeAt(pn)
                                                        ? ((u = mt), pn++)
                                                        : ((u = null), 0 === xn && l(gt)),
                                                    null !== u && ((fn = i), (u = vt())),
                                                    null === u ? ((pn = i), (i = u)) : (i = u),
                                                    (o = i)),
                                                null !== (n = o)
                                                    ? (63 === e.charCodeAt(pn)
                                                          ? ((a = mt), pn++)
                                                          : ((a = null), 0 === xn && l(gt)),
                                                      null === (r = a) && (r = I),
                                                      null !== r
                                                          ? ((fn = t),
                                                            null === (n = V(n, r)) ? ((pn = t), (t = n)) : (t = n))
                                                          : ((pn = t), (t = O)))
                                                    : ((pn = t), (t = O)),
                                                xn--,
                                                null === t && ((n = null), 0 === xn && l(J)),
                                                t
                                            );
                                        }
                                        function f() {
                                            var t, n, r;
                                            if (
                                                ((t = pn),
                                                (n = []),
                                                xt.test(e.charAt(pn))
                                                    ? ((r = e.charAt(pn)), pn++)
                                                    : ((r = null), 0 === xn && l(yt)),
                                                null !== r)
                                            )
                                                for (; null !== r; )
                                                    n.push(r),
                                                        xt.test(e.charAt(pn))
                                                            ? ((r = e.charAt(pn)), pn++)
                                                            : ((r = null), 0 === xn && l(yt));
                                            else n = O;
                                            return (
                                                null !== n && ((fn = t), (n = bt(n))),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function d() {
                                            var t, n, r, a;
                                            return (
                                                xn++,
                                                (t = pn),
                                                null !== (n = m())
                                                    ? (45 === e.charCodeAt(pn)
                                                          ? ((r = Bt), pn++)
                                                          : ((r = null), 0 === xn && l(Gt)),
                                                      null !== r && null !== (a = m())
                                                          ? ((fn = t),
                                                            null === (n = Xt(n, a)) ? ((pn = t), (t = n)) : (t = n))
                                                          : ((pn = t), (t = O)))
                                                    : ((pn = t), (t = O)),
                                                xn--,
                                                null === t && ((n = null), 0 === xn && l(Ut)),
                                                t
                                            );
                                        }
                                        function m() {
                                            var t, n, r, a, o, i;
                                            return (
                                                xn++,
                                                null ===
                                                    ((o = pn),
                                                    e.substr(pn, 2) === ne
                                                        ? ((i = ne), (pn += 2))
                                                        : ((i = null), 0 === xn && l(re)),
                                                    null !== i && ((fn = o), (i = ae())),
                                                    null === i ? ((pn = o), (o = i)) : (o = i),
                                                    (a = o)) &&
                                                    null === (a = _()) &&
                                                    null === (a = g()) &&
                                                    null === (a = v()) &&
                                                    null === (a = x()) &&
                                                    null === (a = y()) &&
                                                    null === (a = b()) &&
                                                    null === (a = w()) &&
                                                    null === (a = C()) &&
                                                    null === (a = k()) &&
                                                    null === (a = E()) &&
                                                    null === (a = R()) &&
                                                    null === (a = A()) &&
                                                    null === (a = M()) &&
                                                    null === (a = P()) &&
                                                    null === (a = S()) &&
                                                    null === (a = T()) &&
                                                    (a = H()),
                                                null === (t = a) &&
                                                    ((n = pn),
                                                    Wt.test(e.charAt(pn))
                                                        ? ((r = e.charAt(pn)), pn++)
                                                        : ((r = null), 0 === xn && l(Yt)),
                                                    null !== r && ((fn = n), (r = $t(r))),
                                                    null === r ? ((pn = n), (n = r)) : (n = r),
                                                    (t = n)),
                                                xn--,
                                                null === t && 0 === xn && l(Kt),
                                                t
                                            );
                                        }
                                        function g() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === se
                                                    ? ((n = se), (pn += 2))
                                                    : ((n = null), 0 === xn && l(ce)),
                                                null !== n && ((fn = t), (n = he())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function v() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === pe
                                                    ? ((n = pe), (pn += 2))
                                                    : ((n = null), 0 === xn && l(fe)),
                                                null !== n && ((fn = t), (n = de())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function x() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === me
                                                    ? ((n = me), (pn += 2))
                                                    : ((n = null), 0 === xn && l(ge)),
                                                null !== n && ((fn = t), (n = ve())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function y() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === xe
                                                    ? ((n = xe), (pn += 2))
                                                    : ((n = null), 0 === xn && l(ye)),
                                                null !== n && ((fn = t), (n = be())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function b() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === we
                                                    ? ((n = we), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Ce)),
                                                null !== n && ((fn = t), (n = ke())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function w() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === Ee
                                                    ? ((n = Ee), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Re)),
                                                null !== n && ((fn = t), (n = Ae())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function C() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === _e
                                                    ? ((n = _e), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Me)),
                                                null !== n && ((fn = t), (n = Pe())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function k() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === Se
                                                    ? ((n = Se), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Te)),
                                                null !== n && ((fn = t), (n = He())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function E() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === qe
                                                    ? ((n = qe), (pn += 2))
                                                    : ((n = null), 0 === xn && l(De)),
                                                null !== n && ((fn = t), (n = Fe())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function R() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === Le
                                                    ? ((n = Le), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Oe)),
                                                null !== n && ((fn = t), (n = Ie())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function A() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === je
                                                    ? ((n = je), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Ne)),
                                                null !== n && ((fn = t), (n = ze())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function _() {
                                            var t, n, r;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === Ue
                                                    ? ((n = Ue), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Be)),
                                                null !== n
                                                    ? (e.length > pn
                                                          ? ((r = e.charAt(pn)), pn++)
                                                          : ((r = null), 0 === xn && l(Ge)),
                                                      null !== r
                                                          ? ((fn = t),
                                                            null === (n = Xe(r)) ? ((pn = t), (t = n)) : (t = n))
                                                          : ((pn = t), (t = O)))
                                                    : ((pn = t), (t = O)),
                                                t
                                            );
                                        }
                                        function M() {
                                            var t, n, r, a;
                                            if (
                                                ((t = pn),
                                                e.substr(pn, 2) === Ve
                                                    ? ((n = Ve), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Ze)),
                                                null !== n)
                                            ) {
                                                if (
                                                    ((r = []),
                                                    Qe.test(e.charAt(pn))
                                                        ? ((a = e.charAt(pn)), pn++)
                                                        : ((a = null), 0 === xn && l(tn)),
                                                    null !== a)
                                                )
                                                    for (; null !== a; )
                                                        r.push(a),
                                                            Qe.test(e.charAt(pn))
                                                                ? ((a = e.charAt(pn)), pn++)
                                                                : ((a = null), 0 === xn && l(tn));
                                                else r = O;
                                                null !== r
                                                    ? ((fn = t), null === (n = en(r)) ? ((pn = t), (t = n)) : (t = n))
                                                    : ((pn = t), (t = O));
                                            } else (pn = t), (t = O);
                                            return t;
                                        }
                                        function P() {
                                            var t, n, r, a;
                                            if (
                                                ((t = pn),
                                                e.substr(pn, 2) === nn
                                                    ? ((n = nn), (pn += 2))
                                                    : ((n = null), 0 === xn && l(rn)),
                                                null !== n)
                                            ) {
                                                if (
                                                    ((r = []),
                                                    an.test(e.charAt(pn))
                                                        ? ((a = e.charAt(pn)), pn++)
                                                        : ((a = null), 0 === xn && l(on)),
                                                    null !== a)
                                                )
                                                    for (; null !== a; )
                                                        r.push(a),
                                                            an.test(e.charAt(pn))
                                                                ? ((a = e.charAt(pn)), pn++)
                                                                : ((a = null), 0 === xn && l(on));
                                                else r = O;
                                                null !== r
                                                    ? ((fn = t), null === (n = un(r)) ? ((pn = t), (t = n)) : (t = n))
                                                    : ((pn = t), (t = O));
                                            } else (pn = t), (t = O);
                                            return t;
                                        }
                                        function S() {
                                            var t, n, r, a;
                                            if (
                                                ((t = pn),
                                                e.substr(pn, 2) === ln
                                                    ? ((n = ln), (pn += 2))
                                                    : ((n = null), 0 === xn && l(sn)),
                                                null !== n)
                                            ) {
                                                if (
                                                    ((r = []),
                                                    an.test(e.charAt(pn))
                                                        ? ((a = e.charAt(pn)), pn++)
                                                        : ((a = null), 0 === xn && l(on)),
                                                    null !== a)
                                                )
                                                    for (; null !== a; )
                                                        r.push(a),
                                                            an.test(e.charAt(pn))
                                                                ? ((a = e.charAt(pn)), pn++)
                                                                : ((a = null), 0 === xn && l(on));
                                                else r = O;
                                                null !== r
                                                    ? ((fn = t), null === (n = cn(r)) ? ((pn = t), (t = n)) : (t = n))
                                                    : ((pn = t), (t = O));
                                            } else (pn = t), (t = O);
                                            return t;
                                        }
                                        function T() {
                                            var t, n;
                                            return (
                                                (t = pn),
                                                e.substr(pn, 2) === Ve
                                                    ? ((n = Ve), (pn += 2))
                                                    : ((n = null), 0 === xn && l(Ze)),
                                                null !== n && ((fn = t), (n = hn())),
                                                null === n ? ((pn = t), (t = n)) : (t = n),
                                                t
                                            );
                                        }
                                        function H() {
                                            var t, n, r;
                                            return (
                                                (t = pn),
                                                92 === e.charCodeAt(pn)
                                                    ? ((n = Ke), pn++)
                                                    : ((n = null), 0 === xn && l(We)),
                                                null !== n
                                                    ? (e.length > pn
                                                          ? ((r = e.charAt(pn)), pn++)
                                                          : ((r = null), 0 === xn && l(Ge)),
                                                      null !== r
                                                          ? ((fn = t),
                                                            null === (n = $t(r)) ? ((pn = t), (t = n)) : (t = n))
                                                          : ((pn = t), (t = O)))
                                                    : ((pn = t), (t = O)),
                                                t
                                            );
                                        }
                                        var q,
                                            D = arguments.length > 1 ? arguments[1] : {},
                                            F = { regexp: s },
                                            L = s,
                                            O = null,
                                            I = "",
                                            j = "|",
                                            N = '"|"',
                                            z = function(t, e) {
                                                return e
                                                    ? new function(t, e) {
                                                          n.call(this, "alternate"), (this.left = t), (this.right = e);
                                                      }(t, e[1])
                                                    : t;
                                            },
                                            U = function(t, e, r) {
                                                return new function(t) {
                                                    n.call(this, "match"), (this.body = t.filter(Boolean));
                                                }([t].concat(e).concat([r]));
                                            },
                                            B = "^",
                                            G = '"^"',
                                            X = function() {
                                                return new n("start");
                                            },
                                            K = "$",
                                            W = '"$"',
                                            Y = function() {
                                                return new n("end");
                                            },
                                            $ = function(t, e) {
                                                return new function(t, e) {
                                                    n.call(this, "quantified"), (this.body = t), (this.quantifier = e);
                                                }(t, e);
                                            },
                                            J = "Quantifier",
                                            V = function(t, e) {
                                                return e && (t.greedy = !1), t;
                                            },
                                            Z = "{",
                                            Q = '"{"',
                                            tt = ",",
                                            et = '","',
                                            nt = "}",
                                            rt = '"}"',
                                            at = function(t, e) {
                                                return new a(t, e);
                                            },
                                            ot = ",}",
                                            it = '",}"',
                                            ut = function(t) {
                                                return new a(t, 1 / 0);
                                            },
                                            lt = function(t) {
                                                return new a(t, t);
                                            },
                                            st = "+",
                                            ct = '"+"',
                                            ht = function() {
                                                return new a(1, 1 / 0);
                                            },
                                            pt = "*",
                                            ft = '"*"',
                                            dt = function() {
                                                return new a(0, 1 / 0);
                                            },
                                            mt = "?",
                                            gt = '"?"',
                                            vt = function() {
                                                return new a(0, 1);
                                            },
                                            xt = /^[0-9]/,
                                            yt = "[0-9]",
                                            bt = function(t) {
                                                return +t.join("");
                                            },
                                            wt = "(",
                                            Ct = '"("',
                                            kt = ")",
                                            Et = '")"',
                                            Rt = function(t) {
                                                return t;
                                            },
                                            At = function(t) {
                                                return new function(t) {
                                                    r.call(this, "capture-group"),
                                                        (this.index = u[this.offset] || (u[this.offset] = i++)),
                                                        (this.body = t);
                                                }(t);
                                            },
                                            _t = "?:",
                                            Mt = '"?:"',
                                            Pt = function(t) {
                                                return new r("non-capture-group", t);
                                            },
                                            St = "?=",
                                            Tt = '"?="',
                                            Ht = function(t) {
                                                return new r("positive-lookahead", t);
                                            },
                                            qt = "?!",
                                            Dt = '"?!"',
                                            Ft = function(t) {
                                                return new r("negative-lookahead", t);
                                            },
                                            Lt = "CharacterSet",
                                            Ot = "[",
                                            It = '"["',
                                            jt = "]",
                                            Nt = '"]"',
                                            zt = function(t, e) {
                                                return new function(t, e) {
                                                    n.call(this, "charset"), (this.invert = t), (this.body = e);
                                                }(!!t, e);
                                            },
                                            Ut = "CharacterRange",
                                            Bt = "-",
                                            Gt = '"-"',
                                            Xt = function(t, e) {
                                                return new function(t, e) {
                                                    n.call(this, "range"), (this.start = t), (this.end = e);
                                                }(t, e);
                                            },
                                            Kt = "Character",
                                            Wt = /^[^\\\]]/,
                                            Yt = "[^\\\\\\]]",
                                            $t = function(t) {
                                                return new function(t) {
                                                    n.call(this, "literal"),
                                                        (this.body = t),
                                                        (this.escaped = this.body != this.text);
                                                }(t);
                                            },
                                            Jt = ".",
                                            Vt = '"."',
                                            Zt = function() {
                                                return new n("any-character");
                                            },
                                            Qt = "Literal",
                                            te = /^[^|\\\/.[()?+*$\^]/,
                                            ee = "[^|\\\\\\/.[()?+*$\\^]",
                                            ne = "\\b",
                                            re = '"\\\\b"',
                                            ae = function() {
                                                return new n("backspace");
                                            },
                                            oe = function() {
                                                return new n("word-boundary");
                                            },
                                            ie = "\\B",
                                            ue = '"\\\\B"',
                                            le = function() {
                                                return new n("non-word-boundary");
                                            },
                                            se = "\\d",
                                            ce = '"\\\\d"',
                                            he = function() {
                                                return new n("digit");
                                            },
                                            pe = "\\D",
                                            fe = '"\\\\D"',
                                            de = function() {
                                                return new n("non-digit");
                                            },
                                            me = "\\f",
                                            ge = '"\\\\f"',
                                            ve = function() {
                                                return new n("form-feed");
                                            },
                                            xe = "\\n",
                                            ye = '"\\\\n"',
                                            be = function() {
                                                return new n("line-feed");
                                            },
                                            we = "\\r",
                                            Ce = '"\\\\r"',
                                            ke = function() {
                                                return new n("carriage-return");
                                            },
                                            Ee = "\\s",
                                            Re = '"\\\\s"',
                                            Ae = function() {
                                                return new n("white-space");
                                            },
                                            _e = "\\S",
                                            Me = '"\\\\S"',
                                            Pe = function() {
                                                return new n("non-white-space");
                                            },
                                            Se = "\\t",
                                            Te = '"\\\\t"',
                                            He = function() {
                                                return new n("tab");
                                            },
                                            qe = "\\v",
                                            De = '"\\\\v"',
                                            Fe = function() {
                                                return new n("vertical-tab");
                                            },
                                            Le = "\\w",
                                            Oe = '"\\\\w"',
                                            Ie = function() {
                                                return new n("word");
                                            },
                                            je = "\\W",
                                            Ne = '"\\\\W"',
                                            ze = function() {
                                                return new n("non-word");
                                            },
                                            Ue = "\\c",
                                            Be = '"\\\\c"',
                                            Ge = "any character",
                                            Xe = function(t) {
                                                return new function(t) {
                                                    n.call(this, "control-character"), (this.code = t.toUpperCase());
                                                }(t);
                                            },
                                            Ke = "\\",
                                            We = '"\\\\"',
                                            Ye = /^[1-9]/,
                                            $e = "[1-9]",
                                            Je = function(t) {
                                                return new function(t) {
                                                    n.call(this, "back-reference"), (this.code = t.toUpperCase());
                                                }(t);
                                            },
                                            Ve = "\\0",
                                            Ze = '"\\\\0"',
                                            Qe = /^[0-7]/,
                                            tn = "[0-7]",
                                            en = function(t) {
                                                return new function(t) {
                                                    n.call(this, "octal"), (this.code = t.toUpperCase());
                                                }(t.join(""));
                                            },
                                            nn = "\\x",
                                            rn = '"\\\\x"',
                                            an = /^[0-9a-fA-F]/,
                                            on = "[0-9a-fA-F]",
                                            un = function(t) {
                                                return new function(t) {
                                                    n.call(this, "hex"), (this.code = t.toUpperCase());
                                                }(t.join(""));
                                            },
                                            ln = "\\u",
                                            sn = '"\\\\u"',
                                            cn = function(t) {
                                                return new function(t) {
                                                    n.call(this, "unicode"), (this.code = t.toUpperCase());
                                                }(t.join(""));
                                            },
                                            hn = function() {
                                                return new n("null-character");
                                            },
                                            pn = 0,
                                            fn = 0,
                                            dn = 0,
                                            mn = { line: 1, column: 1, seenCR: !1 },
                                            gn = 0,
                                            vn = [],
                                            xn = 0;
                                        if ("startRule" in D) {
                                            if (!(D.startRule in F))
                                                throw new Error(
                                                    "Can't start parsing from rule \"" + D.startRule + '".'
                                                );
                                            L = F[D.startRule];
                                        }
                                        if (
                                            ((n.offset = function() {
                                                return fn;
                                            }),
                                            (n.text = function() {
                                                return e.substring(fn, pn);
                                            }),
                                            null !== (q = L()) && pn === e.length)
                                        )
                                            return q;
                                        throw ((function(t) {
                                            var e = 0;
                                            for (t.sort(); e < t.length; ) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
                                        })(vn),
                                        (fn = Math.max(pn, gn)),
                                        new t(vn, fn < e.length ? e.charAt(fn) : null, fn, o(fn).line, o(fn).column));
                                    }
                                }
                            );
                        })(),
                        i = 1,
                        u = {};
                    t.exports = o;
                },
                function(t, e, n) {
                    function r(t, e) {
                        for (var n = "", r = t; e >= r; r++) n += String.fromCharCode(r);
                        return n;
                    }
                    var a = n(3),
                        o = n(5),
                        i = { extend: a.extend },
                        u = r(97, 122),
                        l = r(65, 90),
                        s = r(48, 57),
                        c = r(32, 47) + r(58, 64) + r(91, 96) + r(123, 126),
                        h = r(32, 126),
                        p = " \f\n\r\t\v \u2028\u2029",
                        f = {
                            "\\w": u + l + s + "_",
                            "\\W": c.replace("_", ""),
                            "\\s": p,
                            "\\S": (function() {
                                for (var t = h, e = 0; e < p.length; e++) t = t.replace(p[e], "");
                                return t;
                            })(),
                            "\\d": s,
                            "\\D": u + l + c
                        };
                    (i.gen = function(t, e, n) {
                        return (n = n || { guid: 1 }), i[t.type] ? i[t.type](t, e, n) : i.token(t, e, n);
                    }),
                        i.extend({
                            token: function(t, e, n) {
                                switch (t.type) {
                                    case "start":
                                    case "end":
                                        return "";
                                    case "any-character":
                                        return o.character();
                                    case "backspace":
                                    case "word-boundary":
                                        return "";
                                    case "non-word-boundary":
                                        break;
                                    case "digit":
                                        return o.pick(s.split(""));
                                    case "non-digit":
                                        return o.pick((u + l + c).split(""));
                                    case "form-feed":
                                        break;
                                    case "line-feed":
                                        return t.body || t.text;
                                    case "carriage-return":
                                        break;
                                    case "white-space":
                                        return o.pick(p.split(""));
                                    case "non-white-space":
                                        return o.pick((u + l + s).split(""));
                                    case "tab":
                                    case "vertical-tab":
                                        break;
                                    case "word":
                                        return o.pick((u + l + s).split(""));
                                    case "non-word":
                                        return o.pick(c.replace("_", "").split(""));
                                }
                                return t.body || t.text;
                            },
                            alternate: function(t, e, n) {
                                return this.gen(o.boolean() ? t.left : t.right, e, n);
                            },
                            match: function(t, e, n) {
                                e = "";
                                for (var r = 0; r < t.body.length; r++) e += this.gen(t.body[r], e, n);
                                return e;
                            },
                            "capture-group": function(t, e, n) {
                                return (e = this.gen(t.body, e, n)), (n[n.guid++] = e), e;
                            },
                            "non-capture-group": function(t, e, n) {
                                return this.gen(t.body, e, n);
                            },
                            "positive-lookahead": function(t, e, n) {
                                return this.gen(t.body, e, n);
                            },
                            "negative-lookahead": function(t, e, n) {
                                return "";
                            },
                            quantified: function(t, e, n) {
                                e = "";
                                for (var r = this.quantifier(t.quantifier), a = 0; r > a; a++)
                                    e += this.gen(t.body, e, n);
                                return e;
                            },
                            quantifier: function(t, e, n) {
                                var r = Math.max(t.min, 0),
                                    a = isFinite(t.max) ? t.max : r + o.integer(3, 7);
                                return o.integer(r, a);
                            },
                            charset: function(t, e, n) {
                                if (t.invert) return this["invert-charset"](t, e, n);
                                var r = o.pick(t.body);
                                return this.gen(r, e, n);
                            },
                            "invert-charset": function(t, e, n) {
                                for (var r, a = h, i = 0; i < t.body.length; i++)
                                    switch ((r = t.body[i]).type) {
                                        case "literal":
                                            a = a.replace(r.body, "");
                                            break;
                                        case "range":
                                            for (
                                                var u = this.gen(r.start, e, n).charCodeAt(),
                                                    l = this.gen(r.end, e, n).charCodeAt(),
                                                    s = u;
                                                l >= s;
                                                s++
                                            )
                                                a = a.replace(String.fromCharCode(s), "");
                                        default:
                                            var c = f[r.text];
                                            if (c) for (var p = 0; p <= c.length; p++) a = a.replace(c[p], "");
                                    }
                                return o.pick(a.split(""));
                            },
                            range: function(t, e, n) {
                                var r = this.gen(t.start, e, n).charCodeAt(),
                                    a = this.gen(t.end, e, n).charCodeAt();
                                return String.fromCharCode(o.integer(r, a));
                            },
                            literal: function(t, e, n) {
                                return t.escaped ? t.body : t.text;
                            },
                            unicode: function(t, e, n) {
                                return String.fromCharCode(parseInt(t.code, 16));
                            },
                            hex: function(t, e, n) {
                                return String.fromCharCode(parseInt(t.code, 16));
                            },
                            octal: function(t, e, n) {
                                return String.fromCharCode(parseInt(t.code, 8));
                            },
                            "back-reference": function(t, e, n) {
                                return n[t.code] || "";
                            },
                            CONTROL_CHARACTER_MAP: (function() {
                                for (
                                    var t = "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(
                                            " "
                                        ),
                                        e = "\0        \b \t \n \v \f \r                  ".split(" "),
                                        n = {},
                                        r = 0;
                                    r < t.length;
                                    r++
                                )
                                    n[t[r]] = e[r];
                                return n;
                            })(),
                            "control-character": function(t, e, n) {
                                return this.CONTROL_CHARACTER_MAP[t.code];
                            }
                        }),
                        (t.exports = i);
                },
                function(t, e, n) {
                    t.exports = n(24);
                },
                function(t, e, n) {
                    var r = n(2),
                        a = n(3),
                        o = n(4);
                    t.exports = function t(e, n, i) {
                        i = i || [];
                        var u = {
                            name: "string" == typeof n ? n.replace(r.RE_KEY, "$1") : n,
                            template: e,
                            type: a.type(e),
                            rule: o.parse(n)
                        };
                        switch (((u.path = i.slice(0)), u.path.push(void 0 === n ? "ROOT" : u.name), u.type)) {
                            case "array":
                                (u.items = []),
                                    a.each(e, function(e, n) {
                                        u.items.push(t(e, n, u.path));
                                    });
                                break;
                            case "object":
                                (u.properties = []),
                                    a.each(e, function(e, n) {
                                        u.properties.push(t(e, n, u.path));
                                    });
                        }
                        return u;
                    };
                },
                function(t, e, n) {
                    t.exports = n(26);
                },
                function(t, e, n) {
                    function r(t, e) {
                        for (var n = i(t), r = u.diff(n, e), a = 0; a < r.length; a++);
                        return r;
                    }
                    var a = n(2),
                        o = n(3),
                        i = n(23),
                        u = {
                            diff: function(t, e, n) {
                                var r = [];
                                return (
                                    this.name(t, e, n, r) &&
                                        this.type(t, e, n, r) &&
                                        (this.value(t, e, n, r), this.properties(t, e, n, r), this.items(t, e, n, r)),
                                    r
                                );
                            },
                            name: function(t, e, n, r) {
                                var a = r.length;
                                return l.equal("name", t.path, n + "", t.name + "", r), r.length === a;
                            },
                            type: function(t, e, n, r) {
                                var i = r.length;
                                switch (t.type) {
                                    case "string":
                                        if (t.template.match(a.RE_PLACEHOLDER)) return !0;
                                        break;
                                    case "array":
                                        if (t.rule.parameters) {
                                            if (void 0 !== t.rule.min && void 0 === t.rule.max && 1 === t.rule.count)
                                                return !0;
                                            if (t.rule.parameters[2]) return !0;
                                        }
                                        break;
                                    case "function":
                                        return !0;
                                }
                                return l.equal("type", t.path, o.type(e), t.type, r), r.length === i;
                            },
                            value: function(t, e, n, r) {
                                var o,
                                    i = r.length,
                                    u = t.rule,
                                    s = t.type;
                                if ("object" === s || "array" === s || "function" === s) return !0;
                                if (!u.parameters) {
                                    switch (s) {
                                        case "regexp":
                                            return l.match("value", t.path, e, t.template, r), r.length === i;
                                        case "string":
                                            if (t.template.match(a.RE_PLACEHOLDER)) return r.length === i;
                                    }
                                    return l.equal("value", t.path, e, t.template, r), r.length === i;
                                }
                                switch (s) {
                                    case "number":
                                        var c = (e + "").split(".");
                                        (c[0] = +c[0]),
                                            void 0 !== u.min &&
                                                void 0 !== u.max &&
                                                (l.greaterThanOrEqualTo(
                                                    "value",
                                                    t.path,
                                                    c[0],
                                                    Math.min(u.min, u.max),
                                                    r
                                                ),
                                                l.lessThanOrEqualTo("value", t.path, c[0], Math.max(u.min, u.max), r)),
                                            void 0 !== u.min &&
                                                void 0 === u.max &&
                                                l.equal("value", t.path, c[0], u.min, r, "[value] " + n),
                                            u.decimal &&
                                                (void 0 !== u.dmin &&
                                                    void 0 !== u.dmax &&
                                                    (l.greaterThanOrEqualTo("value", t.path, c[1].length, u.dmin, r),
                                                    l.lessThanOrEqualTo("value", t.path, c[1].length, u.dmax, r)),
                                                void 0 !== u.dmin &&
                                                    void 0 === u.dmax &&
                                                    l.equal("value", t.path, c[1].length, u.dmin, r));
                                        break;
                                    case "boolean":
                                        break;
                                    case "string":
                                        (o = (o = e.match(new RegExp(t.template, "g"))) ? o.length : 0),
                                            void 0 !== u.min &&
                                                void 0 !== u.max &&
                                                (l.greaterThanOrEqualTo("repeat count", t.path, o, u.min, r),
                                                l.lessThanOrEqualTo("repeat count", t.path, o, u.max, r)),
                                            void 0 !== u.min &&
                                                void 0 === u.max &&
                                                l.equal("repeat count", t.path, o, u.min, r);
                                        break;
                                    case "regexp":
                                        (o = (o = e.match(new RegExp(t.template.source.replace(/^\^|\$$/g, ""), "g")))
                                            ? o.length
                                            : 0),
                                            void 0 !== u.min &&
                                                void 0 !== u.max &&
                                                (l.greaterThanOrEqualTo("repeat count", t.path, o, u.min, r),
                                                l.lessThanOrEqualTo("repeat count", t.path, o, u.max, r)),
                                            void 0 !== u.min &&
                                                void 0 === u.max &&
                                                l.equal("repeat count", t.path, o, u.min, r);
                                }
                                return r.length === i;
                            },
                            properties: function(t, e, n, r) {
                                var a = r.length,
                                    i = t.rule,
                                    u = o.keys(e);
                                if (t.properties) {
                                    if (
                                        (t.rule.parameters
                                            ? (void 0 !== i.min &&
                                                  void 0 !== i.max &&
                                                  (l.greaterThanOrEqualTo(
                                                      "properties length",
                                                      t.path,
                                                      u.length,
                                                      Math.min(i.min, i.max),
                                                      r
                                                  ),
                                                  l.lessThanOrEqualTo(
                                                      "properties length",
                                                      t.path,
                                                      u.length,
                                                      Math.max(i.min, i.max),
                                                      r
                                                  )),
                                              void 0 !== i.min &&
                                                  void 0 === i.max &&
                                                  1 !== i.count &&
                                                  l.equal("properties length", t.path, u.length, i.min, r))
                                            : l.equal("properties length", t.path, u.length, t.properties.length, r),
                                        r.length !== a)
                                    )
                                        return !1;
                                    for (var s = 0; s < u.length; s++)
                                        r.push.apply(
                                            r,
                                            this.diff(
                                                (function() {
                                                    var e;
                                                    return (
                                                        o.each(t.properties, function(t) {
                                                            t.name === u[s] && (e = t);
                                                        }),
                                                        e || t.properties[s]
                                                    );
                                                })(),
                                                e[u[s]],
                                                u[s]
                                            )
                                        );
                                    return r.length === a;
                                }
                            },
                            items: function(t, e, n, r) {
                                var a = r.length;
                                if (t.items) {
                                    var o = t.rule;
                                    if (t.rule.parameters) {
                                        if (
                                            (void 0 !== o.min &&
                                                void 0 !== o.max &&
                                                (l.greaterThanOrEqualTo(
                                                    "items",
                                                    t.path,
                                                    e.length,
                                                    Math.min(o.min, o.max) * t.items.length,
                                                    r,
                                                    "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
                                                ),
                                                l.lessThanOrEqualTo(
                                                    "items",
                                                    t.path,
                                                    e.length,
                                                    Math.max(o.min, o.max) * t.items.length,
                                                    r,
                                                    "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
                                                )),
                                            void 0 !== o.min && void 0 === o.max)
                                        ) {
                                            if (1 === o.count) return r.length === a;
                                            l.equal("items length", t.path, e.length, o.min * t.items.length, r);
                                        }
                                        if (o.parameters[2]) return r.length === a;
                                    } else l.equal("items length", t.path, e.length, t.items.length, r);
                                    if (r.length !== a) return !1;
                                    for (var i = 0; i < e.length; i++)
                                        r.push.apply(
                                            r,
                                            this.diff(t.items[i % t.items.length], e[i], i % t.items.length)
                                        );
                                    return r.length === a;
                                }
                            }
                        },
                        l = {
                            message: function(t) {
                                return (
                                    t.message || "[{utype}] Expect {path}'{ltype} {action} {expected}, but is {actual}"
                                )
                                    .replace("{utype}", t.type.toUpperCase())
                                    .replace("{ltype}", t.type.toLowerCase())
                                    .replace("{path}", (o.isArray(t.path) && t.path.join(".")) || t.path)
                                    .replace("{action}", t.action)
                                    .replace("{expected}", t.expected)
                                    .replace("{actual}", t.actual);
                            },
                            equal: function(t, e, n, r, a, o) {
                                if (n === r) return !0;
                                switch (t) {
                                    case "type":
                                        if ("regexp" === r && "string" === n) return !0;
                                }
                                var i = { path: e, type: t, actual: n, expected: r, action: "is equal to", message: o };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            match: function(t, e, n, r, a, o) {
                                if (r.test(n)) return !0;
                                var i = { path: e, type: t, actual: n, expected: r, action: "matches", message: o };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            notEqual: function(t, e, n, r, a, o) {
                                if (n !== r) return !0;
                                var i = {
                                    path: e,
                                    type: t,
                                    actual: n,
                                    expected: r,
                                    action: "is not equal to",
                                    message: o
                                };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            greaterThan: function(t, e, n, r, a, o) {
                                if (n > r) return !0;
                                var i = {
                                    path: e,
                                    type: t,
                                    actual: n,
                                    expected: r,
                                    action: "is greater than",
                                    message: o
                                };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            lessThan: function(t, e, n, r, a, o) {
                                if (r > n) return !0;
                                var i = { path: e, type: t, actual: n, expected: r, action: "is less to", message: o };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            greaterThanOrEqualTo: function(t, e, n, r, a, o) {
                                if (n >= r) return !0;
                                var i = {
                                    path: e,
                                    type: t,
                                    actual: n,
                                    expected: r,
                                    action: "is greater than or equal to",
                                    message: o
                                };
                                return (i.message = l.message(i)), a.push(i), !1;
                            },
                            lessThanOrEqualTo: function(t, e, n, r, a, o) {
                                if (r >= n) return !0;
                                var i = {
                                    path: e,
                                    type: t,
                                    actual: n,
                                    expected: r,
                                    action: "is less than or equal to",
                                    message: o
                                };
                                return (i.message = l.message(i)), a.push(i), !1;
                            }
                        };
                    (r.Diff = u), (r.Assert = l), (t.exports = r);
                },
                function(t, e, n) {
                    t.exports = n(28);
                },
                function(t, e, n) {
                    function r() {
                        this.custom = { events: {}, requestHeaders: {}, responseHeaders: {} };
                    }
                    var a = n(3);
                    (window._XMLHttpRequest = window.XMLHttpRequest), (window._ActiveXObject = window.ActiveXObject);
                    try {
                        new window.Event("custom");
                    } catch (t) {
                        window.Event = function(t, e, n, r) {
                            var a = document.createEvent("CustomEvent");
                            return a.initCustomEvent(t, e, n, r), a;
                        };
                    }
                    var o = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 },
                        i = "readystatechange loadstart progress abort error load timeout loadend".split(" "),
                        u = "timeout withCredentials".split(" "),
                        l = "readyState responseURL status statusText responseType response responseText responseXML".split(
                            " "
                        ),
                        s = {
                            100: "Continue",
                            101: "Switching Protocols",
                            200: "OK",
                            201: "Created",
                            202: "Accepted",
                            203: "Non-Authoritative Information",
                            204: "No Content",
                            205: "Reset Content",
                            206: "Partial Content",
                            300: "Multiple Choice",
                            301: "Moved Permanently",
                            302: "Found",
                            303: "See Other",
                            304: "Not Modified",
                            305: "Use Proxy",
                            307: "Temporary Redirect",
                            400: "Bad Request",
                            401: "Unauthorized",
                            402: "Payment Required",
                            403: "Forbidden",
                            404: "Not Found",
                            405: "Method Not Allowed",
                            406: "Not Acceptable",
                            407: "Proxy Authentication Required",
                            408: "Request Timeout",
                            409: "Conflict",
                            410: "Gone",
                            411: "Length Required",
                            412: "Precondition Failed",
                            413: "Request Entity Too Large",
                            414: "Request-URI Too Long",
                            415: "Unsupported Media Type",
                            416: "Requested Range Not Satisfiable",
                            417: "Expectation Failed",
                            422: "Unprocessable Entity",
                            500: "Internal Server Error",
                            501: "Not Implemented",
                            502: "Bad Gateway",
                            503: "Service Unavailable",
                            504: "Gateway Timeout",
                            505: "HTTP Version Not Supported"
                        };
                    (r._settings = { timeout: "10-100" }),
                        (r.setup = function(t) {
                            return a.extend(r._settings, t), r._settings;
                        }),
                        a.extend(r, o),
                        a.extend(r.prototype, o),
                        (r.prototype.mock = !0),
                        (r.prototype.match = !1),
                        a.extend(r.prototype, {
                            open: function(t, e, n, o, s) {
                                function c(t) {
                                    for (var e = 0; e < l.length; e++)
                                        try {
                                            h[l[e]] = f[l[e]];
                                        } catch (t) {}
                                    h.dispatchEvent(new Event(t.type));
                                }
                                var h = this;
                                a.extend(this.custom, {
                                    method: t,
                                    url: e,
                                    async: "boolean" != typeof n || n,
                                    username: o,
                                    password: s,
                                    options: { url: e, type: t }
                                }),
                                    (this.custom.timeout = (function(t) {
                                        if ("number" == typeof t) return t;
                                        if ("string" == typeof t && !~t.indexOf("-")) return parseInt(t, 10);
                                        if ("string" == typeof t && ~t.indexOf("-")) {
                                            var e = t.split("-"),
                                                n = parseInt(e[0], 10),
                                                r = parseInt(e[1], 10);
                                            return Math.round(Math.random() * (r - n)) + n;
                                        }
                                    })(r._settings.timeout));
                                var p = (function(t) {
                                    function e(t, e) {
                                        return "string" === a.type(t)
                                            ? t === e
                                            : "regexp" === a.type(t)
                                            ? t.test(e)
                                            : void 0;
                                    }
                                    for (var n in r.Mock._mocked) {
                                        var o = r.Mock._mocked[n];
                                        if (
                                            (!o.rurl || e(o.rurl, t.url)) &&
                                            (!o.rtype || e(o.rtype, t.type.toLowerCase()))
                                        )
                                            return o;
                                    }
                                })(this.custom.options);
                                if (p)
                                    (this.match = !0),
                                        (this.custom.template = p),
                                        (this.readyState = r.OPENED),
                                        this.dispatchEvent(new Event("readystatechange"));
                                else {
                                    var f = (function() {
                                        function t() {
                                            try {
                                                return new window._XMLHttpRequest();
                                            } catch (t) {}
                                        }
                                        var e,
                                            n,
                                            r = ((e = location.href),
                                            (n =
                                                /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/.exec(e.toLowerCase()) ||
                                                []),
                                            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(n[1]));
                                        return window.ActiveXObject
                                            ? (!r && t()) ||
                                                  (function() {
                                                      try {
                                                          return new window._ActiveXObject("Microsoft.XMLHTTP");
                                                      } catch (t) {}
                                                  })()
                                            : t();
                                    })();
                                    this.custom.xhr = f;
                                    for (var d = 0; d < i.length; d++) f.addEventListener(i[d], c);
                                    o ? f.open(t, e, n, o, s) : f.open(t, e, n);
                                    for (var m = 0; m < u.length; m++)
                                        try {
                                            f[u[m]] = h[u[m]];
                                        } catch (t) {}
                                }
                            },
                            setRequestHeader: function(t, e) {
                                if (this.match) {
                                    var n = this.custom.requestHeaders;
                                    n[t] ? (n[t] += "," + e) : (n[t] = e);
                                } else this.custom.xhr.setRequestHeader(t, e);
                            },
                            timeout: 0,
                            withCredentials: !1,
                            upload: {},
                            send: function(t) {
                                function e() {
                                    var t, e;
                                    (n.readyState = r.HEADERS_RECEIVED),
                                        n.dispatchEvent(new Event("readystatechange")),
                                        (n.readyState = r.LOADING),
                                        n.dispatchEvent(new Event("readystatechange")),
                                        (n.status = 200),
                                        (n.statusText = s[200]),
                                        (n.response = n.responseText = JSON.stringify(
                                            ((t = n.custom.template),
                                            (e = n.custom.options),
                                            a.isFunction(t.template) ? t.template(e) : r.Mock.mock(t.template)),
                                            null,
                                            4
                                        )),
                                        (n.readyState = r.DONE),
                                        n.dispatchEvent(new Event("readystatechange")),
                                        n.dispatchEvent(new Event("load")),
                                        n.dispatchEvent(new Event("loadend"));
                                }
                                var n = this;
                                return (
                                    (this.custom.options.body = t),
                                    this.match
                                        ? (this.setRequestHeader("X-Requested-With", "MockXMLHttpRequest"),
                                          this.dispatchEvent(new Event("loadstart")),
                                          void (this.custom.async ? setTimeout(e, this.custom.timeout) : e()))
                                        : void this.custom.xhr.send(t)
                                );
                            },
                            abort: function() {
                                return this.match
                                    ? ((this.readyState = r.UNSENT),
                                      this.dispatchEvent(new Event("abort", !1, !1, this)),
                                      void this.dispatchEvent(new Event("error", !1, !1, this)))
                                    : void this.custom.xhr.abort();
                            }
                        }),
                        a.extend(r.prototype, {
                            responseURL: "",
                            status: r.UNSENT,
                            statusText: "",
                            getResponseHeader: function(t) {
                                return this.match
                                    ? this.custom.responseHeaders[t.toLowerCase()]
                                    : this.custom.xhr.getResponseHeader(t);
                            },
                            getAllResponseHeaders: function() {
                                if (!this.match) return this.custom.xhr.getAllResponseHeaders();
                                var t = this.custom.responseHeaders,
                                    e = "";
                                for (var n in t) t.hasOwnProperty(n) && (e += n + ": " + t[n] + "\r\n");
                                return e;
                            },
                            overrideMimeType: function() {},
                            responseType: "",
                            response: null,
                            responseText: "",
                            responseXML: null
                        }),
                        a.extend(r.prototype, {
                            addEventListener: function(t, e) {
                                var n = this.custom.events;
                                n[t] || (n[t] = []), n[t].push(e);
                            },
                            removeEventListener: function(t, e) {
                                for (var n = this.custom.events[t] || [], r = 0; r < n.length; r++)
                                    n[r] === e && n.splice(r--, 1);
                            },
                            dispatchEvent: function(t) {
                                for (var e = this.custom.events[t.type] || [], n = 0; n < e.length; n++)
                                    e[n].call(this, t);
                                var r = "on" + t.type;
                                this[r] && this[r](t);
                            }
                        }),
                        (t.exports = r);
                }
            ]);
        }),
        "object" == (void 0 === exports ? "undefined" : _typeof(exports)) &&
        "object" == ("undefined" == typeof module ? "undefined" : _typeof(module))
            ? (module.exports = qy())
            : "function" == typeof define && define.amd
            ? define([], qy)
            : "object" == (void 0 === exports ? "undefined" : _typeof(exports))
            ? (exports.Mock = qy())
            : (py.Mock = qy()),
        exports("mockjsbase", Mock);
});
//# sourceMappingURL=mockjsbase.js.map
