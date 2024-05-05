/**
 * easymde v2.18.0
 * Copyright Jeroen Akkerman
 * @link https://github.com/ionaru/easy-markdown-editor
 * @license MIT
 */
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).EasyMDE = e();
  }
})(function () {
  return (function e(t, n, i) {
    function r(a, l) {
      if (!n[a]) {
        if (!t[a]) {
          var s = "function" == typeof require && require;
          if (!l && s) return s(a, !0);
          if (o) return o(a, !0);
          var u = new Error("Cannot find module '" + a + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var c = (n[a] = { exports: {} });
        t[a][0].call(
          c.exports,
          function (e) {
            return r(t[a][1][e] || e);
          },
          c,
          c.exports,
          e,
          t,
          n,
          i
        );
      }
      return n[a].exports;
    }
    for (
      var o = "function" == typeof require && require, a = 0;
      a < i.length;
      a++
    )
      r(i[a]);
    return r;
  })(
    {
      1: [function (e, t, n) {}, {}],
      2: [
        function (e, t, n) {
          "use strict";
          var i = e("typo-js");
          function r(e) {
            "function" == typeof (e = e || {}).codeMirrorInstance &&
            "function" == typeof e.codeMirrorInstance.defineMode
              ? (String.prototype.includes ||
                  (String.prototype.includes = function () {
                    return (
                      -1 !== String.prototype.indexOf.apply(this, arguments)
                    );
                  }),
                e.codeMirrorInstance.defineMode("spell-checker", function (t) {
                  if (!r.aff_loading) {
                    r.aff_loading = !0;
                    var n = new XMLHttpRequest();
                    n.open(
                      "GET",
                      "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff",
                      !0
                    ),
                      (n.onload = function () {
                        4 === n.readyState &&
                          200 === n.status &&
                          ((r.aff_data = n.responseText),
                          r.num_loaded++,
                          2 == r.num_loaded &&
                            (r.typo = new i("en_US", r.aff_data, r.dic_data, {
                              platform: "any",
                            })));
                      }),
                      n.send(null);
                  }
                  if (!r.dic_loading) {
                    r.dic_loading = !0;
                    var o = new XMLHttpRequest();
                    o.open(
                      "GET",
                      "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic",
                      !0
                    ),
                      (o.onload = function () {
                        4 === o.readyState &&
                          200 === o.status &&
                          ((r.dic_data = o.responseText),
                          r.num_loaded++,
                          2 == r.num_loaded &&
                            (r.typo = new i("en_US", r.aff_data, r.dic_data, {
                              platform: "any",
                            })));
                      }),
                      o.send(null);
                  }
                  var a = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
                    l = {
                      token: function (e) {
                        var t = e.peek(),
                          n = "";
                        if (a.includes(t)) return e.next(), null;
                        for (; null != (t = e.peek()) && !a.includes(t); )
                          (n += t), e.next();
                        return r.typo && !r.typo.check(n)
                          ? "spell-error"
                          : null;
                      },
                    },
                    s = e.codeMirrorInstance.getMode(
                      t,
                      t.backdrop || "text/plain"
                    );
                  return e.codeMirrorInstance.overlayMode(s, l, !0);
                }))
              : console.log(
                  "CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`"
                );
          }
          (r.num_loaded = 0),
            (r.aff_loading = !1),
            (r.dic_loading = !1),
            (r.aff_data = ""),
            (r.dic_data = ""),
            r.typo,
            (t.exports = r);
        },
        { "typo-js": 16 },
      ],
      3: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            function t(t, n) {
              clearTimeout(n.timeout),
                e.off(window, "mouseup", n.hurry),
                e.off(window, "keyup", n.hurry);
            }
            e.defineOption("autoRefresh", !1, function (n, i) {
              n.state.autoRefresh &&
                (t(0, n.state.autoRefresh), (n.state.autoRefresh = null)),
                i &&
                  0 == n.display.wrapper.offsetHeight &&
                  (function (n, i) {
                    function r() {
                      n.display.wrapper.offsetHeight
                        ? (t(0, i),
                          n.display.lastWrapHeight !=
                            n.display.wrapper.clientHeight && n.refresh())
                        : (i.timeout = setTimeout(r, i.delay));
                    }
                    (i.timeout = setTimeout(r, i.delay)),
                      (i.hurry = function () {
                        clearTimeout(i.timeout),
                          (i.timeout = setTimeout(r, 50));
                      }),
                      e.on(window, "mouseup", i.hurry),
                      e.on(window, "keyup", i.hurry);
                  })(n, (n.state.autoRefresh = { delay: i.delay || 250 }));
            });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      4: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            e.defineOption("fullScreen", !1, function (t, n, i) {
              i == e.Init && (i = !1),
                !i != !n &&
                  (n
                    ? (function (e) {
                        var t = e.getWrapperElement();
                        (e.state.fullScreenRestore = {
                          scrollTop: window.pageYOffset,
                          scrollLeft: window.pageXOffset,
                          width: t.style.width,
                          height: t.style.height,
                        }),
                          (t.style.width = ""),
                          (t.style.height = "auto"),
                          (t.className += " CodeMirror-fullscreen"),
                          (document.documentElement.style.overflow = "hidden"),
                          e.refresh();
                      })(t)
                    : (function (e) {
                        var t = e.getWrapperElement();
                        (t.className = t.className.replace(
                          /\s*CodeMirror-fullscreen\b/,
                          ""
                        )),
                          (document.documentElement.style.overflow = "");
                        var n = e.state.fullScreenRestore;
                        (t.style.width = n.width),
                          (t.style.height = n.height),
                          window.scrollTo(n.scrollLeft, n.scrollTop),
                          e.refresh();
                      })(t));
            });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      5: [
        function (e, t, n) {
          (function (e) {
            function t(e) {
              e.state.placeholder &&
                (e.state.placeholder.parentNode.removeChild(
                  e.state.placeholder
                ),
                (e.state.placeholder = null));
            }
            function n(e) {
              t(e);
              var n = (e.state.placeholder = document.createElement("pre"));
              (n.style.cssText = "height: 0; overflow: visible"),
                (n.style.direction = e.getOption("direction")),
                (n.className = "CodeMirror-placeholder CodeMirror-line-like");
              var i = e.getOption("placeholder");
              "string" == typeof i && (i = document.createTextNode(i)),
                n.appendChild(i),
                e.display.lineSpace.insertBefore(
                  n,
                  e.display.lineSpace.firstChild
                );
            }
            function i(e) {
              o(e) && n(e);
            }
            function r(e) {
              var i = e.getWrapperElement(),
                r = o(e);
              (i.className =
                i.className.replace(" CodeMirror-empty", "") +
                (r ? " CodeMirror-empty" : "")),
                r ? n(e) : t(e);
            }
            function o(e) {
              return 1 === e.lineCount() && "" === e.getLine(0);
            }
            e.defineOption("placeholder", "", function (o, a, l) {
              var s = l && l != e.Init;
              if (a && !s)
                o.on("blur", i),
                  o.on("change", r),
                  o.on("swapDoc", r),
                  e.on(
                    o.getInputField(),
                    "compositionupdate",
                    (o.state.placeholderCompose = function () {
                      !(function (e) {
                        setTimeout(function () {
                          var i = !1;
                          if (1 == e.lineCount()) {
                            var r = e.getInputField();
                            i =
                              "TEXTAREA" == r.nodeName
                                ? !e.getLine(0).length
                                : !/[^\u200b]/.test(
                                    r.querySelector(".CodeMirror-line")
                                      .textContent
                                  );
                          }
                          i ? n(e) : t(e);
                        }, 20);
                      })(o);
                    })
                  ),
                  r(o);
              else if (!a && s) {
                o.off("blur", i),
                  o.off("change", r),
                  o.off("swapDoc", r),
                  e.off(
                    o.getInputField(),
                    "compositionupdate",
                    o.state.placeholderCompose
                  ),
                  t(o);
                var u = o.getWrapperElement();
                u.className = u.className.replace(" CodeMirror-empty", "");
              }
              a && !o.hasFocus() && i(o);
            });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      6: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            var t = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
              n = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
              i = /[*+-]\s/;
            function r(e, n) {
              var i = n.line,
                r = 0,
                o = 0,
                a = t.exec(e.getLine(i)),
                l = a[1];
              do {
                var s = i + (r += 1),
                  u = e.getLine(s),
                  c = t.exec(u);
                if (c) {
                  var d = c[1],
                    h = parseInt(a[3], 10) + r - o,
                    f = parseInt(c[3], 10),
                    p = f;
                  if (l !== d || isNaN(f)) {
                    if (l.length > d.length) return;
                    if (l.length < d.length && 1 === r) return;
                    o += 1;
                  } else
                    h === f && (p = f + 1),
                      h > f && (p = h + 1),
                      e.replaceRange(
                        u.replace(t, d + p + c[4] + c[5]),
                        { line: s, ch: 0 },
                        { line: s, ch: u.length }
                      );
                }
              } while (c);
            }
            e.commands.newlineAndIndentContinueMarkdownList = function (o) {
              if (o.getOption("disableInput")) return e.Pass;
              for (
                var a = o.listSelections(), l = [], s = 0;
                s < a.length;
                s++
              ) {
                var u = a[s].head,
                  c = o.getStateAfter(u.line),
                  d = e.innerMode(o.getMode(), c);
                if (
                  "markdown" !== d.mode.name &&
                  "markdown" !== d.mode.helperType
                )
                  return void o.execCommand("newlineAndIndent");
                var h = !1 !== (c = d.state).list,
                  f = 0 !== c.quote,
                  p = o.getLine(u.line),
                  m = t.exec(p),
                  g = /^\s*$/.test(p.slice(0, u.ch));
                if (!a[s].empty() || (!h && !f) || !m || g)
                  return void o.execCommand("newlineAndIndent");
                if (n.test(p)) {
                  var v = f && />\s*$/.test(p),
                    x = !/>\s*$/.test(p);
                  (v || x) &&
                    o.replaceRange(
                      "",
                      { line: u.line, ch: 0 },
                      { line: u.line, ch: u.ch + 1 }
                    ),
                    (l[s] = "\n");
                } else {
                  var y = m[1],
                    b = m[5],
                    D = !(i.test(m[2]) || m[2].indexOf(">") >= 0),
                    C = D
                      ? parseInt(m[3], 10) + 1 + m[4]
                      : m[2].replace("x", " ");
                  (l[s] = "\n" + y + C + b), D && r(o, u);
                }
              }
              o.replaceSelections(l);
            };
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      7: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            e.overlayMode = function (t, n, i) {
              return {
                startState: function () {
                  return {
                    base: e.startState(t),
                    overlay: e.startState(n),
                    basePos: 0,
                    baseCur: null,
                    overlayPos: 0,
                    overlayCur: null,
                    streamSeen: null,
                  };
                },
                copyState: function (i) {
                  return {
                    base: e.copyState(t, i.base),
                    overlay: e.copyState(n, i.overlay),
                    basePos: i.basePos,
                    baseCur: null,
                    overlayPos: i.overlayPos,
                    overlayCur: null,
                  };
                },
                token: function (e, r) {
                  return (
                    (e != r.streamSeen ||
                      Math.min(r.basePos, r.overlayPos) < e.start) &&
                      ((r.streamSeen = e),
                      (r.basePos = r.overlayPos = e.start)),
                    e.start == r.basePos &&
                      ((r.baseCur = t.token(e, r.base)), (r.basePos = e.pos)),
                    e.start == r.overlayPos &&
                      ((e.pos = e.start),
                      (r.overlayCur = n.token(e, r.overlay)),
                      (r.overlayPos = e.pos)),
                    (e.pos = Math.min(r.basePos, r.overlayPos)),
                    null == r.overlayCur
                      ? r.baseCur
                      : (null != r.baseCur && r.overlay.combineTokens) ||
                        (i && null == r.overlay.combineTokens)
                      ? r.baseCur + " " + r.overlayCur
                      : r.overlayCur
                  );
                },
                indent:
                  t.indent &&
                  function (e, n, i) {
                    return t.indent(e.base, n, i);
                  },
                electricChars: t.electricChars,
                innerMode: function (e) {
                  return { state: e.base, mode: t };
                },
                blankLine: function (e) {
                  var r, o;
                  return (
                    t.blankLine && (r = t.blankLine(e.base)),
                    n.blankLine && (o = n.blankLine(e.overlay)),
                    null == o ? r : i && null != r ? r + " " + o : o
                  );
                },
              };
            };
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      8: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            var t,
              n,
              i = e.Pos;
            function r(e, t) {
              for (
                var n = (function (e) {
                    var t = e.flags;
                    return null != t
                      ? t
                      : (e.ignoreCase ? "i" : "") +
                          (e.global ? "g" : "") +
                          (e.multiline ? "m" : "");
                  })(e),
                  i = n,
                  r = 0;
                r < t.length;
                r++
              )
                -1 == i.indexOf(t.charAt(r)) && (i += t.charAt(r));
              return n == i ? e : new RegExp(e.source, i);
            }
            function o(e) {
              return /\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source);
            }
            function a(e, t, n) {
              t = r(t, "g");
              for (
                var o = n.line, a = n.ch, l = e.lastLine();
                o <= l;
                o++, a = 0
              ) {
                t.lastIndex = a;
                var s = e.getLine(o),
                  u = t.exec(s);
                if (u)
                  return {
                    from: i(o, u.index),
                    to: i(o, u.index + u[0].length),
                    match: u,
                  };
              }
            }
            function l(e, t, n) {
              if (!o(t)) return a(e, t, n);
              t = r(t, "gm");
              for (var l, s = 1, u = n.line, c = e.lastLine(); u <= c; ) {
                for (var d = 0; d < s && !(u > c); d++) {
                  var h = e.getLine(u++);
                  l = null == l ? h : l + "\n" + h;
                }
                (s *= 2), (t.lastIndex = n.ch);
                var f = t.exec(l);
                if (f) {
                  var p = l.slice(0, f.index).split("\n"),
                    m = f[0].split("\n"),
                    g = n.line + p.length - 1,
                    v = p[p.length - 1].length;
                  return {
                    from: i(g, v),
                    to: i(
                      g + m.length - 1,
                      1 == m.length ? v + m[0].length : m[m.length - 1].length
                    ),
                    match: f,
                  };
                }
              }
            }
            function s(e, t, n) {
              for (var i, r = 0; r <= e.length; ) {
                t.lastIndex = r;
                var o = t.exec(e);
                if (!o) break;
                var a = o.index + o[0].length;
                if (a > e.length - n) break;
                (!i || a > i.index + i[0].length) && (i = o), (r = o.index + 1);
              }
              return i;
            }
            function u(e, t, n) {
              t = r(t, "g");
              for (
                var o = n.line, a = n.ch, l = e.firstLine();
                o >= l;
                o--, a = -1
              ) {
                var u = e.getLine(o),
                  c = s(u, t, a < 0 ? 0 : u.length - a);
                if (c)
                  return {
                    from: i(o, c.index),
                    to: i(o, c.index + c[0].length),
                    match: c,
                  };
              }
            }
            function c(e, t, n) {
              if (!o(t)) return u(e, t, n);
              t = r(t, "gm");
              for (
                var a,
                  l = 1,
                  c = e.getLine(n.line).length - n.ch,
                  d = n.line,
                  h = e.firstLine();
                d >= h;

              ) {
                for (var f = 0; f < l && d >= h; f++) {
                  var p = e.getLine(d--);
                  a = null == a ? p : p + "\n" + a;
                }
                l *= 2;
                var m = s(a, t, c);
                if (m) {
                  var g = a.slice(0, m.index).split("\n"),
                    v = m[0].split("\n"),
                    x = d + g.length,
                    y = g[g.length - 1].length;
                  return {
                    from: i(x, y),
                    to: i(
                      x + v.length - 1,
                      1 == v.length ? y + v[0].length : v[v.length - 1].length
                    ),
                    match: m,
                  };
                }
              }
            }
            function d(e, t, n, i) {
              if (e.length == t.length) return n;
              for (var r = 0, o = n + Math.max(0, e.length - t.length); ; ) {
                if (r == o) return r;
                var a = (r + o) >> 1,
                  l = i(e.slice(0, a)).length;
                if (l == n) return a;
                l > n ? (o = a) : (r = a + 1);
              }
            }
            function h(e, r, o, a) {
              if (!r.length) return null;
              var l = a ? t : n,
                s = l(r).split(/\r|\n\r?/);
              e: for (
                var u = o.line, c = o.ch, h = e.lastLine() + 1 - s.length;
                u <= h;
                u++, c = 0
              ) {
                var f = e.getLine(u).slice(c),
                  p = l(f);
                if (1 == s.length) {
                  var m = p.indexOf(s[0]);
                  if (-1 == m) continue e;
                  return (
                    (o = d(f, p, m, l) + c),
                    {
                      from: i(u, d(f, p, m, l) + c),
                      to: i(u, d(f, p, m + s[0].length, l) + c),
                    }
                  );
                }
                var g = p.length - s[0].length;
                if (p.slice(g) == s[0]) {
                  for (var v = 1; v < s.length - 1; v++)
                    if (l(e.getLine(u + v)) != s[v]) continue e;
                  var x = e.getLine(u + s.length - 1),
                    y = l(x),
                    b = s[s.length - 1];
                  if (y.slice(0, b.length) == b)
                    return {
                      from: i(u, d(f, p, g, l) + c),
                      to: i(u + s.length - 1, d(x, y, b.length, l)),
                    };
                }
              }
            }
            function f(e, r, o, a) {
              if (!r.length) return null;
              var l = a ? t : n,
                s = l(r).split(/\r|\n\r?/);
              e: for (
                var u = o.line, c = o.ch, h = e.firstLine() - 1 + s.length;
                u >= h;
                u--, c = -1
              ) {
                var f = e.getLine(u);
                c > -1 && (f = f.slice(0, c));
                var p = l(f);
                if (1 == s.length) {
                  var m = p.lastIndexOf(s[0]);
                  if (-1 == m) continue e;
                  return {
                    from: i(u, d(f, p, m, l)),
                    to: i(u, d(f, p, m + s[0].length, l)),
                  };
                }
                var g = s[s.length - 1];
                if (p.slice(0, g.length) == g) {
                  var v = 1;
                  for (o = u - s.length + 1; v < s.length - 1; v++)
                    if (l(e.getLine(o + v)) != s[v]) continue e;
                  var x = e.getLine(u + 1 - s.length),
                    y = l(x);
                  if (y.slice(y.length - s[0].length) == s[0])
                    return {
                      from: i(
                        u + 1 - s.length,
                        d(x, y, x.length - s[0].length, l)
                      ),
                      to: i(u, d(f, p, g.length, l)),
                    };
                }
              }
            }
            function p(e, t, n, o) {
              var s;
              (this.atOccurrence = !1),
                (this.afterEmptyMatch = !1),
                (this.doc = e),
                (n = n ? e.clipPos(n) : i(0, 0)),
                (this.pos = { from: n, to: n }),
                "object" == typeof o ? (s = o.caseFold) : ((s = o), (o = null)),
                "string" == typeof t
                  ? (null == s && (s = !1),
                    (this.matches = function (n, i) {
                      return (n ? f : h)(e, t, i, s);
                    }))
                  : ((t = r(t, "gm")),
                    o && !1 === o.multiline
                      ? (this.matches = function (n, i) {
                          return (n ? u : a)(e, t, i);
                        })
                      : (this.matches = function (n, i) {
                          return (n ? c : l)(e, t, i);
                        }));
            }
            String.prototype.normalize
              ? ((t = function (e) {
                  return e.normalize("NFD").toLowerCase();
                }),
                (n = function (e) {
                  return e.normalize("NFD");
                }))
              : ((t = function (e) {
                  return e.toLowerCase();
                }),
                (n = function (e) {
                  return e;
                })),
              (p.prototype = {
                findNext: function () {
                  return this.find(!1);
                },
                findPrevious: function () {
                  return this.find(!0);
                },
                find: function (t) {
                  var n = this.doc.clipPos(t ? this.pos.from : this.pos.to);
                  if (
                    this.afterEmptyMatch &&
                    this.atOccurrence &&
                    ((n = i(n.line, n.ch)),
                    t
                      ? (n.ch--,
                        n.ch < 0 &&
                          (n.line--,
                          (n.ch = (this.doc.getLine(n.line) || "").length)))
                      : (n.ch++,
                        n.ch > (this.doc.getLine(n.line) || "").length &&
                          ((n.ch = 0), n.line++)),
                    0 != e.cmpPos(n, this.doc.clipPos(n)))
                  )
                    return (this.atOccurrence = !1);
                  var r = this.matches(t, n);
                  if (
                    ((this.afterEmptyMatch = r && 0 == e.cmpPos(r.from, r.to)),
                    r)
                  )
                    return (
                      (this.pos = r),
                      (this.atOccurrence = !0),
                      this.pos.match || !0
                    );
                  var o = i(
                    t ? this.doc.firstLine() : this.doc.lastLine() + 1,
                    0
                  );
                  return (
                    (this.pos = { from: o, to: o }), (this.atOccurrence = !1)
                  );
                },
                from: function () {
                  if (this.atOccurrence) return this.pos.from;
                },
                to: function () {
                  if (this.atOccurrence) return this.pos.to;
                },
                replace: function (t, n) {
                  if (this.atOccurrence) {
                    var r = e.splitLines(t);
                    this.doc.replaceRange(r, this.pos.from, this.pos.to, n),
                      (this.pos.to = i(
                        this.pos.from.line + r.length - 1,
                        r[r.length - 1].length +
                          (1 == r.length ? this.pos.from.ch : 0)
                      ));
                  }
                },
              }),
              e.defineExtension("getSearchCursor", function (e, t, n) {
                return new p(this.doc, e, t, n);
              }),
              e.defineDocExtension("getSearchCursor", function (e, t, n) {
                return new p(this, e, t, n);
              }),
              e.defineExtension("selectMatches", function (t, n) {
                for (
                  var i = [],
                    r = this.getSearchCursor(t, this.getCursor("from"), n);
                  r.findNext() && !(e.cmpPos(r.to(), this.getCursor("to")) > 0);

                )
                  i.push({ anchor: r.from(), head: r.to() });
                i.length && this.setSelections(i, 0);
              });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      9: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            function t(e) {
              e.state.markedSelection &&
                e.operation(function () {
                  !(function (e) {
                    if (!e.somethingSelected()) return a(e);
                    if (e.listSelections().length > 1) return l(e);
                    var t = e.getCursor("start"),
                      n = e.getCursor("end"),
                      i = e.state.markedSelection;
                    if (!i.length) return o(e, t, n);
                    var s = i[0].find(),
                      u = i[i.length - 1].find();
                    if (
                      !s ||
                      !u ||
                      n.line - t.line <= 8 ||
                      r(t, u.to) >= 0 ||
                      r(n, s.from) <= 0
                    )
                      return l(e);
                    for (; r(t, s.from) > 0; )
                      i.shift().clear(), (s = i[0].find());
                    for (
                      r(t, s.from) < 0 &&
                      (s.to.line - t.line < 8
                        ? (i.shift().clear(), o(e, t, s.to, 0))
                        : o(e, t, s.from, 0));
                      r(n, u.to) < 0;

                    )
                      i.pop().clear(), (u = i[i.length - 1].find());
                    r(n, u.to) > 0 &&
                      (n.line - u.from.line < 8
                        ? (i.pop().clear(), o(e, u.from, n))
                        : o(e, u.to, n));
                  })(e);
                });
            }
            function n(e) {
              e.state.markedSelection &&
                e.state.markedSelection.length &&
                e.operation(function () {
                  a(e);
                });
            }
            e.defineOption("styleSelectedText", !1, function (i, r, o) {
              var s = o && o != e.Init;
              r && !s
                ? ((i.state.markedSelection = []),
                  (i.state.markedSelectionStyle =
                    "string" == typeof r ? r : "CodeMirror-selectedtext"),
                  l(i),
                  i.on("cursorActivity", t),
                  i.on("change", n))
                : !r &&
                  s &&
                  (i.off("cursorActivity", t),
                  i.off("change", n),
                  a(i),
                  (i.state.markedSelection = i.state.markedSelectionStyle =
                    null));
            });
            var i = e.Pos,
              r = e.cmpPos;
            function o(e, t, n, o) {
              if (0 != r(t, n))
                for (
                  var a = e.state.markedSelection,
                    l = e.state.markedSelectionStyle,
                    s = t.line;
                  ;

                ) {
                  var u = s == t.line ? t : i(s, 0),
                    c = s + 8,
                    d = c >= n.line,
                    h = d ? n : i(c, 0),
                    f = e.markText(u, h, { className: l });
                  if ((null == o ? a.push(f) : a.splice(o++, 0, f), d)) break;
                  s = c;
                }
            }
            function a(e) {
              for (var t = e.state.markedSelection, n = 0; n < t.length; ++n)
                t[n].clear();
              t.length = 0;
            }
            function l(e) {
              a(e);
              for (var t = e.listSelections(), n = 0; n < t.length; n++)
                o(e, t[n].from(), t[n].to());
            }
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      10: [
        function (e, t, n) {
          !(function (e, i) {
            "object" == typeof n && void 0 !== t
              ? (t.exports = i())
              : ((e = e || self).CodeMirror = i());
          })(this, function () {
            "use strict";
            var e = navigator.userAgent,
              t = navigator.platform,
              n = /gecko\/\d/i.test(e),
              i = /MSIE \d/.test(e),
              r = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
              o = /Edge\/(\d+)/.exec(e),
              a = i || r || o,
              l = a && (i ? document.documentMode || 6 : +(o || r)[1]),
              s = !o && /WebKit\//.test(e),
              u = s && /Qt\/\d+\.\d+/.test(e),
              c = !o && /Chrome\/(\d+)/.exec(e),
              d = c && +c[1],
              h = /Opera\//.test(e),
              f = /Apple Computer/.test(navigator.vendor),
              p = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
              m = /PhantomJS/.test(e),
              g = f && (/Mobile\/\w+/.test(e) || navigator.maxTouchPoints > 2),
              v = /Android/.test(e),
              x =
                g ||
                v ||
                /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
              y = g || /Mac/.test(t),
              b = /\bCrOS\b/.test(e),
              D = /win/i.test(t),
              C = h && e.match(/Version\/(\d*\.\d*)/);
            C && (C = Number(C[1])), C && C >= 15 && ((h = !1), (s = !0));
            var w = y && (u || (h && (null == C || C < 12.11))),
              k = n || (a && l >= 9);
            function S(e) {
              return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
            }
            var F,
              A = function (e, t) {
                var n = e.className,
                  i = S(t).exec(n);
                if (i) {
                  var r = n.slice(i.index + i[0].length);
                  e.className = n.slice(0, i.index) + (r ? i[1] + r : "");
                }
              };
            function E(e) {
              for (var t = e.childNodes.length; t > 0; --t)
                e.removeChild(e.firstChild);
              return e;
            }
            function L(e, t) {
              return E(e).appendChild(t);
            }
            function T(e, t, n, i) {
              var r = document.createElement(e);
              if (
                (n && (r.className = n),
                i && (r.style.cssText = i),
                "string" == typeof t)
              )
                r.appendChild(document.createTextNode(t));
              else if (t)
                for (var o = 0; o < t.length; ++o) r.appendChild(t[o]);
              return r;
            }
            function M(e, t, n, i) {
              var r = T(e, t, n, i);
              return r.setAttribute("role", "presentation"), r;
            }
            function B(e, t) {
              if ((3 == t.nodeType && (t = t.parentNode), e.contains))
                return e.contains(t);
              do {
                if ((11 == t.nodeType && (t = t.host), t == e)) return !0;
              } while ((t = t.parentNode));
            }
            function N(e) {
              var t;
              try {
                t = e.activeElement;
              } catch (n) {
                t = e.body || null;
              }
              for (; t && t.shadowRoot && t.shadowRoot.activeElement; )
                t = t.shadowRoot.activeElement;
              return t;
            }
            function O(e, t) {
              var n = e.className;
              S(t).test(n) || (e.className += (n ? " " : "") + t);
            }
            function I(e, t) {
              for (var n = e.split(" "), i = 0; i < n.length; i++)
                n[i] && !S(n[i]).test(t) && (t += " " + n[i]);
              return t;
            }
            F = document.createRange
              ? function (e, t, n, i) {
                  var r = document.createRange();
                  return r.setEnd(i || e, n), r.setStart(e, t), r;
                }
              : function (e, t, n) {
                  var i = document.body.createTextRange();
                  try {
                    i.moveToElementText(e.parentNode);
                  } catch (e) {
                    return i;
                  }
                  return (
                    i.collapse(!0),
                    i.moveEnd("character", n),
                    i.moveStart("character", t),
                    i
                  );
                };
            var z = function (e) {
              e.select();
            };
            function H(e) {
              return e.display.wrapper.ownerDocument;
            }
            function R(e) {
              return H(e).defaultView;
            }
            function P(e) {
              var t = Array.prototype.slice.call(arguments, 1);
              return function () {
                return e.apply(null, t);
              };
            }
            function _(e, t, n) {
              for (var i in (t || (t = {}), e))
                !e.hasOwnProperty(i) ||
                  (!1 === n && t.hasOwnProperty(i)) ||
                  (t[i] = e[i]);
              return t;
            }
            function W(e, t, n, i, r) {
              null == t &&
                -1 == (t = e.search(/[^\s\u00a0]/)) &&
                (t = e.length);
              for (var o = i || 0, a = r || 0; ; ) {
                var l = e.indexOf("\t", o);
                if (l < 0 || l >= t) return a + (t - o);
                (a += l - o), (a += n - (a % n)), (o = l + 1);
              }
            }
            g
              ? (z = function (e) {
                  (e.selectionStart = 0), (e.selectionEnd = e.value.length);
                })
              : a &&
                (z = function (e) {
                  try {
                    e.select();
                  } catch (e) {}
                });
            var j = function () {
              (this.id = null),
                (this.f = null),
                (this.time = 0),
                (this.handler = P(this.onTimeout, this));
            };
            function q(e, t) {
              for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
              return -1;
            }
            (j.prototype.onTimeout = function (e) {
              (e.id = 0),
                e.time <= +new Date()
                  ? e.f()
                  : setTimeout(e.handler, e.time - +new Date());
            }),
              (j.prototype.set = function (e, t) {
                this.f = t;
                var n = +new Date() + e;
                (!this.id || n < this.time) &&
                  (clearTimeout(this.id),
                  (this.id = setTimeout(this.handler, e)),
                  (this.time = n));
              });
            var U = {
                toString: function () {
                  return "CodeMirror.Pass";
                },
              },
              $ = { scroll: !1 },
              G = { origin: "*mouse" },
              V = { origin: "+move" };
            function X(e, t, n) {
              for (var i = 0, r = 0; ; ) {
                var o = e.indexOf("\t", i);
                -1 == o && (o = e.length);
                var a = o - i;
                if (o == e.length || r + a >= t) return i + Math.min(a, t - r);
                if (((r += o - i), (i = o + 1), (r += n - (r % n)) >= t))
                  return i;
              }
            }
            var K = [""];
            function Z(e) {
              for (; K.length <= e; ) K.push(Y(K) + " ");
              return K[e];
            }
            function Y(e) {
              return e[e.length - 1];
            }
            function Q(e, t) {
              for (var n = [], i = 0; i < e.length; i++) n[i] = t(e[i], i);
              return n;
            }
            function J() {}
            function ee(e, t) {
              var n;
              return (
                Object.create
                  ? (n = Object.create(e))
                  : ((J.prototype = e), (n = new J())),
                t && _(t, n),
                n
              );
            }
            var te =
              /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
            function ne(e) {
              return (
                /\w/.test(e) ||
                (e > "" && (e.toUpperCase() != e.toLowerCase() || te.test(e)))
              );
            }
            function ie(e, t) {
              return t
                ? !!(t.source.indexOf("\\w") > -1 && ne(e)) || t.test(e)
                : ne(e);
            }
            function re(e) {
              for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
              return !0;
            }
            var oe =
              /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
            function ae(e) {
              return e.charCodeAt(0) >= 768 && oe.test(e);
            }
            function le(e, t, n) {
              for (; (n < 0 ? t > 0 : t < e.length) && ae(e.charAt(t)); )
                t += n;
              return t;
            }
            function se(e, t, n) {
              for (var i = t > n ? -1 : 1; ; ) {
                if (t == n) return t;
                var r = (t + n) / 2,
                  o = i < 0 ? Math.ceil(r) : Math.floor(r);
                if (o == t) return e(o) ? t : n;
                e(o) ? (n = o) : (t = o + i);
              }
            }
            var ue = null;
            function ce(e, t, n) {
              var i;
              ue = null;
              for (var r = 0; r < e.length; ++r) {
                var o = e[r];
                if (o.from < t && o.to > t) return r;
                o.to == t &&
                  (o.from != o.to && "before" == n ? (i = r) : (ue = r)),
                  o.from == t &&
                    (o.from != o.to && "before" != n ? (i = r) : (ue = r));
              }
              return null != i ? i : ue;
            }
            var de = (function () {
              var e = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                t = /[stwN]/,
                n = /[LRr]/,
                i = /[Lb1n]/,
                r = /[1n]/;
              function o(e, t, n) {
                (this.level = e), (this.from = t), (this.to = n);
              }
              return function (a, l) {
                var s = "ltr" == l ? "L" : "R";
                if (0 == a.length || ("ltr" == l && !e.test(a))) return !1;
                for (var u, c = a.length, d = [], h = 0; h < c; ++h)
                  d.push(
                    (u = a.charCodeAt(h)) <= 247
                      ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(
                          u
                        )
                      : 1424 <= u && u <= 1524
                      ? "R"
                      : 1536 <= u && u <= 1785
                      ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(
                          u - 1536
                        )
                      : 1774 <= u && u <= 2220
                      ? "r"
                      : 8192 <= u && u <= 8203
                      ? "w"
                      : 8204 == u
                      ? "b"
                      : "L"
                  );
                for (var f = 0, p = s; f < c; ++f) {
                  var m = d[f];
                  "m" == m ? (d[f] = p) : (p = m);
                }
                for (var g = 0, v = s; g < c; ++g) {
                  var x = d[g];
                  "1" == x && "r" == v
                    ? (d[g] = "n")
                    : n.test(x) && ((v = x), "r" == x && (d[g] = "R"));
                }
                for (var y = 1, b = d[0]; y < c - 1; ++y) {
                  var D = d[y];
                  "+" == D && "1" == b && "1" == d[y + 1]
                    ? (d[y] = "1")
                    : "," != D ||
                      b != d[y + 1] ||
                      ("1" != b && "n" != b) ||
                      (d[y] = b),
                    (b = D);
                }
                for (var C = 0; C < c; ++C) {
                  var w = d[C];
                  if ("," == w) d[C] = "N";
                  else if ("%" == w) {
                    var k = void 0;
                    for (k = C + 1; k < c && "%" == d[k]; ++k);
                    for (
                      var S =
                          (C && "!" == d[C - 1]) || (k < c && "1" == d[k])
                            ? "1"
                            : "N",
                        F = C;
                      F < k;
                      ++F
                    )
                      d[F] = S;
                    C = k - 1;
                  }
                }
                for (var A = 0, E = s; A < c; ++A) {
                  var L = d[A];
                  "L" == E && "1" == L ? (d[A] = "L") : n.test(L) && (E = L);
                }
                for (var T = 0; T < c; ++T)
                  if (t.test(d[T])) {
                    var M = void 0;
                    for (M = T + 1; M < c && t.test(d[M]); ++M);
                    for (
                      var B = "L" == (T ? d[T - 1] : s),
                        N =
                          B == ("L" == (M < c ? d[M] : s))
                            ? B
                              ? "L"
                              : "R"
                            : s,
                        O = T;
                      O < M;
                      ++O
                    )
                      d[O] = N;
                    T = M - 1;
                  }
                for (var I, z = [], H = 0; H < c; )
                  if (i.test(d[H])) {
                    var R = H;
                    for (++H; H < c && i.test(d[H]); ++H);
                    z.push(new o(0, R, H));
                  } else {
                    var P = H,
                      _ = z.length,
                      W = "rtl" == l ? 1 : 0;
                    for (++H; H < c && "L" != d[H]; ++H);
                    for (var j = P; j < H; )
                      if (r.test(d[j])) {
                        P < j && (z.splice(_, 0, new o(1, P, j)), (_ += W));
                        var q = j;
                        for (++j; j < H && r.test(d[j]); ++j);
                        z.splice(_, 0, new o(2, q, j)), (_ += W), (P = j);
                      } else ++j;
                    P < H && z.splice(_, 0, new o(1, P, H));
                  }
                return (
                  "ltr" == l &&
                    (1 == z[0].level &&
                      (I = a.match(/^\s+/)) &&
                      ((z[0].from = I[0].length),
                      z.unshift(new o(0, 0, I[0].length))),
                    1 == Y(z).level &&
                      (I = a.match(/\s+$/)) &&
                      ((Y(z).to -= I[0].length),
                      z.push(new o(0, c - I[0].length, c)))),
                  "rtl" == l ? z.reverse() : z
                );
              };
            })();
            function he(e, t) {
              var n = e.order;
              return null == n && (n = e.order = de(e.text, t)), n;
            }
            var fe = [],
              pe = function (e, t, n) {
                if (e.addEventListener) e.addEventListener(t, n, !1);
                else if (e.attachEvent) e.attachEvent("on" + t, n);
                else {
                  var i = e._handlers || (e._handlers = {});
                  i[t] = (i[t] || fe).concat(n);
                }
              };
            function me(e, t) {
              return (e._handlers && e._handlers[t]) || fe;
            }
            function ge(e, t, n) {
              if (e.removeEventListener) e.removeEventListener(t, n, !1);
              else if (e.detachEvent) e.detachEvent("on" + t, n);
              else {
                var i = e._handlers,
                  r = i && i[t];
                if (r) {
                  var o = q(r, n);
                  o > -1 && (i[t] = r.slice(0, o).concat(r.slice(o + 1)));
                }
              }
            }
            function ve(e, t) {
              var n = me(e, t);
              if (n.length)
                for (
                  var i = Array.prototype.slice.call(arguments, 2), r = 0;
                  r < n.length;
                  ++r
                )
                  n[r].apply(null, i);
            }
            function xe(e, t, n) {
              return (
                "string" == typeof t &&
                  (t = {
                    type: t,
                    preventDefault: function () {
                      this.defaultPrevented = !0;
                    },
                  }),
                ve(e, n || t.type, e, t),
                ke(t) || t.codemirrorIgnore
              );
            }
            function ye(e) {
              var t = e._handlers && e._handlers.cursorActivity;
              if (t)
                for (
                  var n =
                      e.curOp.cursorActivityHandlers ||
                      (e.curOp.cursorActivityHandlers = []),
                    i = 0;
                  i < t.length;
                  ++i
                )
                  -1 == q(n, t[i]) && n.push(t[i]);
            }
            function be(e, t) {
              return me(e, t).length > 0;
            }
            function De(e) {
              (e.prototype.on = function (e, t) {
                pe(this, e, t);
              }),
                (e.prototype.off = function (e, t) {
                  ge(this, e, t);
                });
            }
            function Ce(e) {
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
            }
            function we(e) {
              e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
            }
            function ke(e) {
              return null != e.defaultPrevented
                ? e.defaultPrevented
                : 0 == e.returnValue;
            }
            function Se(e) {
              Ce(e), we(e);
            }
            function Fe(e) {
              return e.target || e.srcElement;
            }
            function Ae(e) {
              var t = e.which;
              return (
                null == t &&
                  (1 & e.button
                    ? (t = 1)
                    : 2 & e.button
                    ? (t = 3)
                    : 4 & e.button && (t = 2)),
                y && e.ctrlKey && 1 == t && (t = 3),
                t
              );
            }
            var Ee,
              Le,
              Te = (function () {
                if (a && l < 9) return !1;
                var e = T("div");
                return "draggable" in e || "dragDrop" in e;
              })();
            function Me(e) {
              if (null == Ee) {
                var t = T("span", "​");
                L(e, T("span", [t, document.createTextNode("x")])),
                  0 != e.firstChild.offsetHeight &&
                    (Ee =
                      t.offsetWidth <= 1 &&
                      t.offsetHeight > 2 &&
                      !(a && l < 8));
              }
              var n = Ee
                ? T("span", "​")
                : T(
                    "span",
                    " ",
                    null,
                    "display: inline-block; width: 1px; margin-right: -1px"
                  );
              return n.setAttribute("cm-text", ""), n;
            }
            function Be(e) {
              if (null != Le) return Le;
              var t = L(e, document.createTextNode("AخA")),
                n = F(t, 0, 1).getBoundingClientRect(),
                i = F(t, 1, 2).getBoundingClientRect();
              return (
                E(e), !(!n || n.left == n.right) && (Le = i.right - n.right < 3)
              );
            }
            var Ne,
              Oe =
                3 != "\n\nb".split(/\n/).length
                  ? function (e) {
                      for (var t = 0, n = [], i = e.length; t <= i; ) {
                        var r = e.indexOf("\n", t);
                        -1 == r && (r = e.length);
                        var o = e.slice(t, "\r" == e.charAt(r - 1) ? r - 1 : r),
                          a = o.indexOf("\r");
                        -1 != a
                          ? (n.push(o.slice(0, a)), (t += a + 1))
                          : (n.push(o), (t = r + 1));
                      }
                      return n;
                    }
                  : function (e) {
                      return e.split(/\r\n?|\n/);
                    },
              Ie = window.getSelection
                ? function (e) {
                    try {
                      return e.selectionStart != e.selectionEnd;
                    } catch (e) {
                      return !1;
                    }
                  }
                : function (e) {
                    var t;
                    try {
                      t = e.ownerDocument.selection.createRange();
                    } catch (e) {}
                    return (
                      !(!t || t.parentElement() != e) &&
                      0 != t.compareEndPoints("StartToEnd", t)
                    );
                  },
              ze =
                "oncopy" in (Ne = T("div")) ||
                (Ne.setAttribute("oncopy", "return;"),
                "function" == typeof Ne.oncopy),
              He = null;
            var Re = {},
              Pe = {};
            function _e(e, t) {
              arguments.length > 2 &&
                (t.dependencies = Array.prototype.slice.call(arguments, 2)),
                (Re[e] = t);
            }
            function We(e) {
              if ("string" == typeof e && Pe.hasOwnProperty(e)) e = Pe[e];
              else if (
                e &&
                "string" == typeof e.name &&
                Pe.hasOwnProperty(e.name)
              ) {
                var t = Pe[e.name];
                "string" == typeof t && (t = { name: t }),
                  ((e = ee(t, e)).name = t.name);
              } else {
                if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
                  return We("application/xml");
                if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
                  return We("application/json");
              }
              return "string" == typeof e ? { name: e } : e || { name: "null" };
            }
            function je(e, t) {
              t = We(t);
              var n = Re[t.name];
              if (!n) return je(e, "text/plain");
              var i = n(e, t);
              if (qe.hasOwnProperty(t.name)) {
                var r = qe[t.name];
                for (var o in r)
                  r.hasOwnProperty(o) &&
                    (i.hasOwnProperty(o) && (i["_" + o] = i[o]), (i[o] = r[o]));
              }
              if (
                ((i.name = t.name),
                t.helperType && (i.helperType = t.helperType),
                t.modeProps)
              )
                for (var a in t.modeProps) i[a] = t.modeProps[a];
              return i;
            }
            var qe = {};
            function Ue(e, t) {
              _(t, qe.hasOwnProperty(e) ? qe[e] : (qe[e] = {}));
            }
            function $e(e, t) {
              if (!0 === t) return t;
              if (e.copyState) return e.copyState(t);
              var n = {};
              for (var i in t) {
                var r = t[i];
                r instanceof Array && (r = r.concat([])), (n[i] = r);
              }
              return n;
            }
            function Ge(e, t) {
              for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e; )
                (t = n.state), (e = n.mode);
              return n || { mode: e, state: t };
            }
            function Ve(e, t, n) {
              return !e.startState || e.startState(t, n);
            }
            var Xe = function (e, t, n) {
              (this.pos = this.start = 0),
                (this.string = e),
                (this.tabSize = t || 8),
                (this.lastColumnPos = this.lastColumnValue = 0),
                (this.lineStart = 0),
                (this.lineOracle = n);
            };
            function Ke(e, t) {
              if ((t -= e.first) < 0 || t >= e.size)
                throw new Error(
                  "There is no line " + (t + e.first) + " in the document."
                );
              for (var n = e; !n.lines; )
                for (var i = 0; ; ++i) {
                  var r = n.children[i],
                    o = r.chunkSize();
                  if (t < o) {
                    n = r;
                    break;
                  }
                  t -= o;
                }
              return n.lines[t];
            }
            function Ze(e, t, n) {
              var i = [],
                r = t.line;
              return (
                e.iter(t.line, n.line + 1, function (e) {
                  var o = e.text;
                  r == n.line && (o = o.slice(0, n.ch)),
                    r == t.line && (o = o.slice(t.ch)),
                    i.push(o),
                    ++r;
                }),
                i
              );
            }
            function Ye(e, t, n) {
              var i = [];
              return (
                e.iter(t, n, function (e) {
                  i.push(e.text);
                }),
                i
              );
            }
            function Qe(e, t) {
              var n = t - e.height;
              if (n) for (var i = e; i; i = i.parent) i.height += n;
            }
            function Je(e) {
              if (null == e.parent) return null;
              for (
                var t = e.parent, n = q(t.lines, e), i = t.parent;
                i;
                t = i, i = i.parent
              )
                for (var r = 0; i.children[r] != t; ++r)
                  n += i.children[r].chunkSize();
              return n + t.first;
            }
            function et(e, t) {
              var n = e.first;
              e: do {
                for (var i = 0; i < e.children.length; ++i) {
                  var r = e.children[i],
                    o = r.height;
                  if (t < o) {
                    e = r;
                    continue e;
                  }
                  (t -= o), (n += r.chunkSize());
                }
                return n;
              } while (!e.lines);
              for (var a = 0; a < e.lines.length; ++a) {
                var l = e.lines[a].height;
                if (t < l) break;
                t -= l;
              }
              return n + a;
            }
            function tt(e, t) {
              return t >= e.first && t < e.first + e.size;
            }
            function nt(e, t) {
              return String(e.lineNumberFormatter(t + e.firstLineNumber));
            }
            function it(e, t, n) {
              if ((void 0 === n && (n = null), !(this instanceof it)))
                return new it(e, t, n);
              (this.line = e), (this.ch = t), (this.sticky = n);
            }
            function rt(e, t) {
              return e.line - t.line || e.ch - t.ch;
            }
            function ot(e, t) {
              return e.sticky == t.sticky && 0 == rt(e, t);
            }
            function at(e) {
              return it(e.line, e.ch);
            }
            function lt(e, t) {
              return rt(e, t) < 0 ? t : e;
            }
            function st(e, t) {
              return rt(e, t) < 0 ? e : t;
            }
            function ut(e, t) {
              return Math.max(e.first, Math.min(t, e.first + e.size - 1));
            }
            function ct(e, t) {
              if (t.line < e.first) return it(e.first, 0);
              var n = e.first + e.size - 1;
              return t.line > n
                ? it(n, Ke(e, n).text.length)
                : (function (e, t) {
                    var n = e.ch;
                    return null == n || n > t
                      ? it(e.line, t)
                      : n < 0
                      ? it(e.line, 0)
                      : e;
                  })(t, Ke(e, t.line).text.length);
            }
            function dt(e, t) {
              for (var n = [], i = 0; i < t.length; i++) n[i] = ct(e, t[i]);
              return n;
            }
            (Xe.prototype.eol = function () {
              return this.pos >= this.string.length;
            }),
              (Xe.prototype.sol = function () {
                return this.pos == this.lineStart;
              }),
              (Xe.prototype.peek = function () {
                return this.string.charAt(this.pos) || void 0;
              }),
              (Xe.prototype.next = function () {
                if (this.pos < this.string.length)
                  return this.string.charAt(this.pos++);
              }),
              (Xe.prototype.eat = function (e) {
                var t = this.string.charAt(this.pos);
                if (
                  "string" == typeof e
                    ? t == e
                    : t && (e.test ? e.test(t) : e(t))
                )
                  return ++this.pos, t;
              }),
              (Xe.prototype.eatWhile = function (e) {
                for (var t = this.pos; this.eat(e); );
                return this.pos > t;
              }),
              (Xe.prototype.eatSpace = function () {
                for (
                  var e = this.pos;
                  /[\s\u00a0]/.test(this.string.charAt(this.pos));

                )
                  ++this.pos;
                return this.pos > e;
              }),
              (Xe.prototype.skipToEnd = function () {
                this.pos = this.string.length;
              }),
              (Xe.prototype.skipTo = function (e) {
                var t = this.string.indexOf(e, this.pos);
                if (t > -1) return (this.pos = t), !0;
              }),
              (Xe.prototype.backUp = function (e) {
                this.pos -= e;
              }),
              (Xe.prototype.column = function () {
                return (
                  this.lastColumnPos < this.start &&
                    ((this.lastColumnValue = W(
                      this.string,
                      this.start,
                      this.tabSize,
                      this.lastColumnPos,
                      this.lastColumnValue
                    )),
                    (this.lastColumnPos = this.start)),
                  this.lastColumnValue -
                    (this.lineStart
                      ? W(this.string, this.lineStart, this.tabSize)
                      : 0)
                );
              }),
              (Xe.prototype.indentation = function () {
                return (
                  W(this.string, null, this.tabSize) -
                  (this.lineStart
                    ? W(this.string, this.lineStart, this.tabSize)
                    : 0)
                );
              }),
              (Xe.prototype.match = function (e, t, n) {
                if ("string" != typeof e) {
                  var i = this.string.slice(this.pos).match(e);
                  return i && i.index > 0
                    ? null
                    : (i && !1 !== t && (this.pos += i[0].length), i);
                }
                var r = function (e) {
                  return n ? e.toLowerCase() : e;
                };
                if (r(this.string.substr(this.pos, e.length)) == r(e))
                  return !1 !== t && (this.pos += e.length), !0;
              }),
              (Xe.prototype.current = function () {
                return this.string.slice(this.start, this.pos);
              }),
              (Xe.prototype.hideFirstChars = function (e, t) {
                this.lineStart += e;
                try {
                  return t();
                } finally {
                  this.lineStart -= e;
                }
              }),
              (Xe.prototype.lookAhead = function (e) {
                var t = this.lineOracle;
                return t && t.lookAhead(e);
              }),
              (Xe.prototype.baseToken = function () {
                var e = this.lineOracle;
                return e && e.baseToken(this.pos);
              });
            var ht = function (e, t) {
                (this.state = e), (this.lookAhead = t);
              },
              ft = function (e, t, n, i) {
                (this.state = t),
                  (this.doc = e),
                  (this.line = n),
                  (this.maxLookAhead = i || 0),
                  (this.baseTokens = null),
                  (this.baseTokenPos = 1);
              };
            function pt(e, t, n, i) {
              var r = [e.state.modeGen],
                o = {};
              wt(
                e,
                t.text,
                e.doc.mode,
                n,
                function (e, t) {
                  return r.push(e, t);
                },
                o,
                i
              );
              for (
                var a = n.state,
                  l = function (i) {
                    n.baseTokens = r;
                    var l = e.state.overlays[i],
                      s = 1,
                      u = 0;
                    (n.state = !0),
                      wt(
                        e,
                        t.text,
                        l.mode,
                        n,
                        function (e, t) {
                          for (var n = s; u < e; ) {
                            var i = r[s];
                            i > e && r.splice(s, 1, e, r[s + 1], i),
                              (s += 2),
                              (u = Math.min(e, i));
                          }
                          if (t)
                            if (l.opaque)
                              r.splice(n, s - n, e, "overlay " + t),
                                (s = n + 2);
                            else
                              for (; n < s; n += 2) {
                                var o = r[n + 1];
                                r[n + 1] = (o ? o + " " : "") + "overlay " + t;
                              }
                        },
                        o
                      ),
                      (n.state = a),
                      (n.baseTokens = null),
                      (n.baseTokenPos = 1);
                  },
                  s = 0;
                s < e.state.overlays.length;
                ++s
              )
                l(s);
              return {
                styles: r,
                classes: o.bgClass || o.textClass ? o : null,
              };
            }
            function mt(e, t, n) {
              if (!t.styles || t.styles[0] != e.state.modeGen) {
                var i = gt(e, Je(t)),
                  r =
                    t.text.length > e.options.maxHighlightLength &&
                    $e(e.doc.mode, i.state),
                  o = pt(e, t, i);
                r && (i.state = r),
                  (t.stateAfter = i.save(!r)),
                  (t.styles = o.styles),
                  o.classes
                    ? (t.styleClasses = o.classes)
                    : t.styleClasses && (t.styleClasses = null),
                  n === e.doc.highlightFrontier &&
                    (e.doc.modeFrontier = Math.max(
                      e.doc.modeFrontier,
                      ++e.doc.highlightFrontier
                    ));
              }
              return t.styles;
            }
            function gt(e, t, n) {
              var i = e.doc,
                r = e.display;
              if (!i.mode.startState) return new ft(i, !0, t);
              var o = (function (e, t, n) {
                  for (
                    var i,
                      r,
                      o = e.doc,
                      a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100),
                      l = t;
                    l > a;
                    --l
                  ) {
                    if (l <= o.first) return o.first;
                    var s = Ke(o, l - 1),
                      u = s.stateAfter;
                    if (
                      u &&
                      (!n ||
                        l + (u instanceof ht ? u.lookAhead : 0) <=
                          o.modeFrontier)
                    )
                      return l;
                    var c = W(s.text, null, e.options.tabSize);
                    (null == r || i > c) && ((r = l - 1), (i = c));
                  }
                  return r;
                })(e, t, n),
                a = o > i.first && Ke(i, o - 1).stateAfter,
                l = a ? ft.fromSaved(i, a, o) : new ft(i, Ve(i.mode), o);
              return (
                i.iter(o, t, function (n) {
                  vt(e, n.text, l);
                  var i = l.line;
                  (n.stateAfter =
                    i == t - 1 ||
                    i % 5 == 0 ||
                    (i >= r.viewFrom && i < r.viewTo)
                      ? l.save()
                      : null),
                    l.nextLine();
                }),
                n && (i.modeFrontier = l.line),
                l
              );
            }
            function vt(e, t, n, i) {
              var r = e.doc.mode,
                o = new Xe(t, e.options.tabSize, n);
              for (
                o.start = o.pos = i || 0, "" == t && xt(r, n.state);
                !o.eol();

              )
                yt(r, o, n.state), (o.start = o.pos);
            }
            function xt(e, t) {
              if (e.blankLine) return e.blankLine(t);
              if (e.innerMode) {
                var n = Ge(e, t);
                return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0;
              }
            }
            function yt(e, t, n, i) {
              for (var r = 0; r < 10; r++) {
                i && (i[0] = Ge(e, n).mode);
                var o = e.token(t, n);
                if (t.pos > t.start) return o;
              }
              throw new Error("Mode " + e.name + " failed to advance stream.");
            }
            (ft.prototype.lookAhead = function (e) {
              var t = this.doc.getLine(this.line + e);
              return (
                null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
              );
            }),
              (ft.prototype.baseToken = function (e) {
                if (!this.baseTokens) return null;
                for (; this.baseTokens[this.baseTokenPos] <= e; )
                  this.baseTokenPos += 2;
                var t = this.baseTokens[this.baseTokenPos + 1];
                return {
                  type: t && t.replace(/( |^)overlay .*/, ""),
                  size: this.baseTokens[this.baseTokenPos] - e,
                };
              }),
              (ft.prototype.nextLine = function () {
                this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
              }),
              (ft.fromSaved = function (e, t, n) {
                return t instanceof ht
                  ? new ft(e, $e(e.mode, t.state), n, t.lookAhead)
                  : new ft(e, $e(e.mode, t), n);
              }),
              (ft.prototype.save = function (e) {
                var t = !1 !== e ? $e(this.doc.mode, this.state) : this.state;
                return this.maxLookAhead > 0 ? new ht(t, this.maxLookAhead) : t;
              });
            var bt = function (e, t, n) {
              (this.start = e.start),
                (this.end = e.pos),
                (this.string = e.current()),
                (this.type = t || null),
                (this.state = n);
            };
            function Dt(e, t, n, i) {
              var r,
                o,
                a = e.doc,
                l = a.mode,
                s = Ke(a, (t = ct(a, t)).line),
                u = gt(e, t.line, n),
                c = new Xe(s.text, e.options.tabSize, u);
              for (i && (o = []); (i || c.pos < t.ch) && !c.eol(); )
                (c.start = c.pos),
                  (r = yt(l, c, u.state)),
                  i && o.push(new bt(c, r, $e(a.mode, u.state)));
              return i ? o : new bt(c, r, u.state);
            }
            function Ct(e, t) {
              if (e)
                for (;;) {
                  var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                  if (!n) break;
                  e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                  var i = n[1] ? "bgClass" : "textClass";
                  null == t[i]
                    ? (t[i] = n[2])
                    : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[i]) ||
                      (t[i] += " " + n[2]);
                }
              return e;
            }
            function wt(e, t, n, i, r, o, a) {
              var l = n.flattenSpans;
              null == l && (l = e.options.flattenSpans);
              var s,
                u = 0,
                c = null,
                d = new Xe(t, e.options.tabSize, i),
                h = e.options.addModeClass && [null];
              for ("" == t && Ct(xt(n, i.state), o); !d.eol(); ) {
                if (
                  (d.pos > e.options.maxHighlightLength
                    ? ((l = !1),
                      a && vt(e, t, i, d.pos),
                      (d.pos = t.length),
                      (s = null))
                    : (s = Ct(yt(n, d, i.state, h), o)),
                  h)
                ) {
                  var f = h[0].name;
                  f && (s = "m-" + (s ? f + " " + s : f));
                }
                if (!l || c != s) {
                  for (; u < d.start; ) r((u = Math.min(d.start, u + 5e3)), c);
                  c = s;
                }
                d.start = d.pos;
              }
              for (; u < d.pos; ) {
                var p = Math.min(d.pos, u + 5e3);
                r(p, c), (u = p);
              }
            }
            var kt = !1,
              St = !1;
            function Ft(e, t, n) {
              (this.marker = e), (this.from = t), (this.to = n);
            }
            function At(e, t) {
              if (e)
                for (var n = 0; n < e.length; ++n) {
                  var i = e[n];
                  if (i.marker == t) return i;
                }
            }
            function Et(e, t) {
              for (var n, i = 0; i < e.length; ++i)
                e[i] != t && (n || (n = [])).push(e[i]);
              return n;
            }
            function Lt(e, t) {
              if (t.full) return null;
              var n = tt(e, t.from.line) && Ke(e, t.from.line).markedSpans,
                i = tt(e, t.to.line) && Ke(e, t.to.line).markedSpans;
              if (!n && !i) return null;
              var r = t.from.ch,
                o = t.to.ch,
                a = 0 == rt(t.from, t.to),
                l = (function (e, t, n) {
                  var i;
                  if (e)
                    for (var r = 0; r < e.length; ++r) {
                      var o = e[r],
                        a = o.marker;
                      if (
                        null == o.from ||
                        (a.inclusiveLeft ? o.from <= t : o.from < t) ||
                        (o.from == t &&
                          "bookmark" == a.type &&
                          (!n || !o.marker.insertLeft))
                      ) {
                        var l =
                          null == o.to ||
                          (a.inclusiveRight ? o.to >= t : o.to > t);
                        (i || (i = [])).push(
                          new Ft(a, o.from, l ? null : o.to)
                        );
                      }
                    }
                  return i;
                })(n, r, a),
                s = (function (e, t, n) {
                  var i;
                  if (e)
                    for (var r = 0; r < e.length; ++r) {
                      var o = e[r],
                        a = o.marker;
                      if (
                        null == o.to ||
                        (a.inclusiveRight ? o.to >= t : o.to > t) ||
                        (o.from == t &&
                          "bookmark" == a.type &&
                          (!n || o.marker.insertLeft))
                      ) {
                        var l =
                          null == o.from ||
                          (a.inclusiveLeft ? o.from <= t : o.from < t);
                        (i || (i = [])).push(
                          new Ft(
                            a,
                            l ? null : o.from - t,
                            null == o.to ? null : o.to - t
                          )
                        );
                      }
                    }
                  return i;
                })(i, o, a),
                u = 1 == t.text.length,
                c = Y(t.text).length + (u ? r : 0);
              if (l)
                for (var d = 0; d < l.length; ++d) {
                  var h = l[d];
                  if (null == h.to) {
                    var f = At(s, h.marker);
                    f
                      ? u && (h.to = null == f.to ? null : f.to + c)
                      : (h.to = r);
                  }
                }
              if (s)
                for (var p = 0; p < s.length; ++p) {
                  var m = s[p];
                  if ((null != m.to && (m.to += c), null == m.from))
                    At(l, m.marker) ||
                      ((m.from = c), u && (l || (l = [])).push(m));
                  else (m.from += c), u && (l || (l = [])).push(m);
                }
              l && (l = Tt(l)), s && s != l && (s = Tt(s));
              var g = [l];
              if (!u) {
                var v,
                  x = t.text.length - 2;
                if (x > 0 && l)
                  for (var y = 0; y < l.length; ++y)
                    null == l[y].to &&
                      (v || (v = [])).push(new Ft(l[y].marker, null, null));
                for (var b = 0; b < x; ++b) g.push(v);
                g.push(s);
              }
              return g;
            }
            function Tt(e) {
              for (var t = 0; t < e.length; ++t) {
                var n = e[t];
                null != n.from &&
                  n.from == n.to &&
                  !1 !== n.marker.clearWhenEmpty &&
                  e.splice(t--, 1);
              }
              return e.length ? e : null;
            }
            function Mt(e) {
              var t = e.markedSpans;
              if (t) {
                for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
                e.markedSpans = null;
              }
            }
            function Bt(e, t) {
              if (t) {
                for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
                e.markedSpans = t;
              }
            }
            function Nt(e) {
              return e.inclusiveLeft ? -1 : 0;
            }
            function Ot(e) {
              return e.inclusiveRight ? 1 : 0;
            }
            function It(e, t) {
              var n = e.lines.length - t.lines.length;
              if (0 != n) return n;
              var i = e.find(),
                r = t.find(),
                o = rt(i.from, r.from) || Nt(e) - Nt(t);
              if (o) return -o;
              var a = rt(i.to, r.to) || Ot(e) - Ot(t);
              return a || t.id - e.id;
            }
            function zt(e, t) {
              var n,
                i = St && e.markedSpans;
              if (i)
                for (var r = void 0, o = 0; o < i.length; ++o)
                  (r = i[o]).marker.collapsed &&
                    null == (t ? r.from : r.to) &&
                    (!n || It(n, r.marker) < 0) &&
                    (n = r.marker);
              return n;
            }
            function Ht(e) {
              return zt(e, !0);
            }
            function Rt(e) {
              return zt(e, !1);
            }
            function Pt(e, t) {
              var n,
                i = St && e.markedSpans;
              if (i)
                for (var r = 0; r < i.length; ++r) {
                  var o = i[r];
                  o.marker.collapsed &&
                    (null == o.from || o.from < t) &&
                    (null == o.to || o.to > t) &&
                    (!n || It(n, o.marker) < 0) &&
                    (n = o.marker);
                }
              return n;
            }
            function _t(e, t, n, i, r) {
              var o = Ke(e, t),
                a = St && o.markedSpans;
              if (a)
                for (var l = 0; l < a.length; ++l) {
                  var s = a[l];
                  if (s.marker.collapsed) {
                    var u = s.marker.find(0),
                      c = rt(u.from, n) || Nt(s.marker) - Nt(r),
                      d = rt(u.to, i) || Ot(s.marker) - Ot(r);
                    if (
                      !((c >= 0 && d <= 0) || (c <= 0 && d >= 0)) &&
                      ((c <= 0 &&
                        (s.marker.inclusiveRight && r.inclusiveLeft
                          ? rt(u.to, n) >= 0
                          : rt(u.to, n) > 0)) ||
                        (c >= 0 &&
                          (s.marker.inclusiveRight && r.inclusiveLeft
                            ? rt(u.from, i) <= 0
                            : rt(u.from, i) < 0)))
                    )
                      return !0;
                  }
                }
            }
            function Wt(e) {
              for (var t; (t = Ht(e)); ) e = t.find(-1, !0).line;
              return e;
            }
            function jt(e, t) {
              var n = Ke(e, t),
                i = Wt(n);
              return n == i ? t : Je(i);
            }
            function qt(e, t) {
              if (t > e.lastLine()) return t;
              var n,
                i = Ke(e, t);
              if (!Ut(e, i)) return t;
              for (; (n = Rt(i)); ) i = n.find(1, !0).line;
              return Je(i) + 1;
            }
            function Ut(e, t) {
              var n = St && t.markedSpans;
              if (n)
                for (var i = void 0, r = 0; r < n.length; ++r)
                  if ((i = n[r]).marker.collapsed) {
                    if (null == i.from) return !0;
                    if (
                      !i.marker.widgetNode &&
                      0 == i.from &&
                      i.marker.inclusiveLeft &&
                      $t(e, t, i)
                    )
                      return !0;
                  }
            }
            function $t(e, t, n) {
              if (null == n.to) {
                var i = n.marker.find(1, !0);
                return $t(e, i.line, At(i.line.markedSpans, n.marker));
              }
              if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
              for (var r = void 0, o = 0; o < t.markedSpans.length; ++o)
                if (
                  (r = t.markedSpans[o]).marker.collapsed &&
                  !r.marker.widgetNode &&
                  r.from == n.to &&
                  (null == r.to || r.to != n.from) &&
                  (r.marker.inclusiveLeft || n.marker.inclusiveRight) &&
                  $t(e, t, r)
                )
                  return !0;
            }
            function Gt(e) {
              for (
                var t = 0, n = (e = Wt(e)).parent, i = 0;
                i < n.lines.length;
                ++i
              ) {
                var r = n.lines[i];
                if (r == e) break;
                t += r.height;
              }
              for (var o = n.parent; o; o = (n = o).parent)
                for (var a = 0; a < o.children.length; ++a) {
                  var l = o.children[a];
                  if (l == n) break;
                  t += l.height;
                }
              return t;
            }
            function Vt(e) {
              if (0 == e.height) return 0;
              for (var t, n = e.text.length, i = e; (t = Ht(i)); ) {
                var r = t.find(0, !0);
                (i = r.from.line), (n += r.from.ch - r.to.ch);
              }
              for (i = e; (t = Rt(i)); ) {
                var o = t.find(0, !0);
                (n -= i.text.length - o.from.ch),
                  (n += (i = o.to.line).text.length - o.to.ch);
              }
              return n;
            }
            function Xt(e) {
              var t = e.display,
                n = e.doc;
              (t.maxLine = Ke(n, n.first)),
                (t.maxLineLength = Vt(t.maxLine)),
                (t.maxLineChanged = !0),
                n.iter(function (e) {
                  var n = Vt(e);
                  n > t.maxLineLength &&
                    ((t.maxLineLength = n), (t.maxLine = e));
                });
            }
            var Kt = function (e, t, n) {
              (this.text = e), Bt(this, t), (this.height = n ? n(this) : 1);
            };
            function Zt(e) {
              (e.parent = null), Mt(e);
            }
            (Kt.prototype.lineNo = function () {
              return Je(this);
            }),
              De(Kt);
            var Yt = {},
              Qt = {};
            function Jt(e, t) {
              if (!e || /^\s*$/.test(e)) return null;
              var n = t.addModeClass ? Qt : Yt;
              return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
            }
            function en(e, t) {
              var n = M("span", null, null, s ? "padding-right: .1px" : null),
                i = {
                  pre: M("pre", [n], "CodeMirror-line"),
                  content: n,
                  col: 0,
                  pos: 0,
                  cm: e,
                  trailingSpace: !1,
                  splitSpaces: e.getOption("lineWrapping"),
                };
              t.measure = {};
              for (var r = 0; r <= (t.rest ? t.rest.length : 0); r++) {
                var o = r ? t.rest[r - 1] : t.line,
                  a = void 0;
                (i.pos = 0),
                  (i.addToken = nn),
                  Be(e.display.measure) &&
                    (a = he(o, e.doc.direction)) &&
                    (i.addToken = rn(i.addToken, a)),
                  (i.map = []),
                  an(o, i, mt(e, o, t != e.display.externalMeasured && Je(o))),
                  o.styleClasses &&
                    (o.styleClasses.bgClass &&
                      (i.bgClass = I(o.styleClasses.bgClass, i.bgClass || "")),
                    o.styleClasses.textClass &&
                      (i.textClass = I(
                        o.styleClasses.textClass,
                        i.textClass || ""
                      ))),
                  0 == i.map.length &&
                    i.map.push(
                      0,
                      0,
                      i.content.appendChild(Me(e.display.measure))
                    ),
                  0 == r
                    ? ((t.measure.map = i.map), (t.measure.cache = {}))
                    : ((t.measure.maps || (t.measure.maps = [])).push(i.map),
                      (t.measure.caches || (t.measure.caches = [])).push({}));
              }
              if (s) {
                var l = i.content.lastChild;
                (/\bcm-tab\b/.test(l.className) ||
                  (l.querySelector && l.querySelector(".cm-tab"))) &&
                  (i.content.className = "cm-tab-wrap-hack");
              }
              return (
                ve(e, "renderLine", e, t.line, i.pre),
                i.pre.className &&
                  (i.textClass = I(i.pre.className, i.textClass || "")),
                i
              );
            }
            function tn(e) {
              var t = T("span", "•", "cm-invalidchar");
              return (
                (t.title = "\\u" + e.charCodeAt(0).toString(16)),
                t.setAttribute("aria-label", t.title),
                t
              );
            }
            function nn(e, t, n, i, r, o, s) {
              if (t) {
                var u,
                  c = e.splitSpaces
                    ? (function (e, t) {
                        if (e.length > 1 && !/  /.test(e)) return e;
                        for (var n = t, i = "", r = 0; r < e.length; r++) {
                          var o = e.charAt(r);
                          " " != o ||
                            !n ||
                            (r != e.length - 1 && 32 != e.charCodeAt(r + 1)) ||
                            (o = " "),
                            (i += o),
                            (n = " " == o);
                        }
                        return i;
                      })(t, e.trailingSpace)
                    : t,
                  d = e.cm.state.specialChars,
                  h = !1;
                if (d.test(t)) {
                  u = document.createDocumentFragment();
                  for (var f = 0; ; ) {
                    d.lastIndex = f;
                    var p = d.exec(t),
                      m = p ? p.index - f : t.length - f;
                    if (m) {
                      var g = document.createTextNode(c.slice(f, f + m));
                      a && l < 9
                        ? u.appendChild(T("span", [g]))
                        : u.appendChild(g),
                        e.map.push(e.pos, e.pos + m, g),
                        (e.col += m),
                        (e.pos += m);
                    }
                    if (!p) break;
                    f += m + 1;
                    var v = void 0;
                    if ("\t" == p[0]) {
                      var x = e.cm.options.tabSize,
                        y = x - (e.col % x);
                      (v = u.appendChild(
                        T("span", Z(y), "cm-tab")
                      )).setAttribute("role", "presentation"),
                        v.setAttribute("cm-text", "\t"),
                        (e.col += y);
                    } else
                      "\r" == p[0] || "\n" == p[0]
                        ? ((v = u.appendChild(
                            T(
                              "span",
                              "\r" == p[0] ? "␍" : "␤",
                              "cm-invalidchar"
                            )
                          )).setAttribute("cm-text", p[0]),
                          (e.col += 1))
                        : ((v = e.cm.options.specialCharPlaceholder(
                            p[0]
                          )).setAttribute("cm-text", p[0]),
                          a && l < 9
                            ? u.appendChild(T("span", [v]))
                            : u.appendChild(v),
                          (e.col += 1));
                    e.map.push(e.pos, e.pos + 1, v), e.pos++;
                  }
                } else
                  (e.col += t.length),
                    (u = document.createTextNode(c)),
                    e.map.push(e.pos, e.pos + t.length, u),
                    a && l < 9 && (h = !0),
                    (e.pos += t.length);
                if (
                  ((e.trailingSpace = 32 == c.charCodeAt(t.length - 1)),
                  n || i || r || h || o || s)
                ) {
                  var b = n || "";
                  i && (b += i), r && (b += r);
                  var D = T("span", [u], b, o);
                  if (s)
                    for (var C in s)
                      s.hasOwnProperty(C) &&
                        "style" != C &&
                        "class" != C &&
                        D.setAttribute(C, s[C]);
                  return e.content.appendChild(D);
                }
                e.content.appendChild(u);
              }
            }
            function rn(e, t) {
              return function (n, i, r, o, a, l, s) {
                r = r ? r + " cm-force-border" : "cm-force-border";
                for (var u = n.pos, c = u + i.length; ; ) {
                  for (
                    var d = void 0, h = 0;
                    h < t.length && !((d = t[h]).to > u && d.from <= u);
                    h++
                  );
                  if (d.to >= c) return e(n, i, r, o, a, l, s);
                  e(n, i.slice(0, d.to - u), r, o, null, l, s),
                    (o = null),
                    (i = i.slice(d.to - u)),
                    (u = d.to);
                }
              };
            }
            function on(e, t, n, i) {
              var r = !i && n.widgetNode;
              r && e.map.push(e.pos, e.pos + t, r),
                !i &&
                  e.cm.display.input.needsContentAttribute &&
                  (r ||
                    (r = e.content.appendChild(document.createElement("span"))),
                  r.setAttribute("cm-marker", n.id)),
                r &&
                  (e.cm.display.input.setUneditable(r),
                  e.content.appendChild(r)),
                (e.pos += t),
                (e.trailingSpace = !1);
            }
            function an(e, t, n) {
              var i = e.markedSpans,
                r = e.text,
                o = 0;
              if (i)
                for (
                  var a,
                    l,
                    s,
                    u,
                    c,
                    d,
                    h,
                    f = r.length,
                    p = 0,
                    m = 1,
                    g = "",
                    v = 0;
                  ;

                ) {
                  if (v == p) {
                    (s = u = c = l = ""), (h = null), (d = null), (v = 1 / 0);
                    for (var x = [], y = void 0, b = 0; b < i.length; ++b) {
                      var D = i[b],
                        C = D.marker;
                      if ("bookmark" == C.type && D.from == p && C.widgetNode)
                        x.push(C);
                      else if (
                        D.from <= p &&
                        (null == D.to ||
                          D.to > p ||
                          (C.collapsed && D.to == p && D.from == p))
                      ) {
                        if (
                          (null != D.to &&
                            D.to != p &&
                            v > D.to &&
                            ((v = D.to), (u = "")),
                          C.className && (s += " " + C.className),
                          C.css && (l = (l ? l + ";" : "") + C.css),
                          C.startStyle &&
                            D.from == p &&
                            (c += " " + C.startStyle),
                          C.endStyle &&
                            D.to == v &&
                            (y || (y = [])).push(C.endStyle, D.to),
                          C.title && ((h || (h = {})).title = C.title),
                          C.attributes)
                        )
                          for (var w in C.attributes)
                            (h || (h = {}))[w] = C.attributes[w];
                        C.collapsed && (!d || It(d.marker, C) < 0) && (d = D);
                      } else D.from > p && v > D.from && (v = D.from);
                    }
                    if (y)
                      for (var k = 0; k < y.length; k += 2)
                        y[k + 1] == v && (u += " " + y[k]);
                    if (!d || d.from == p)
                      for (var S = 0; S < x.length; ++S) on(t, 0, x[S]);
                    if (d && (d.from || 0) == p) {
                      if (
                        (on(
                          t,
                          (null == d.to ? f + 1 : d.to) - p,
                          d.marker,
                          null == d.from
                        ),
                        null == d.to)
                      )
                        return;
                      d.to == p && (d = !1);
                    }
                  }
                  if (p >= f) break;
                  for (var F = Math.min(f, v); ; ) {
                    if (g) {
                      var A = p + g.length;
                      if (!d) {
                        var E = A > F ? g.slice(0, F - p) : g;
                        t.addToken(
                          t,
                          E,
                          a ? a + s : s,
                          c,
                          p + E.length == v ? u : "",
                          l,
                          h
                        );
                      }
                      if (A >= F) {
                        (g = g.slice(F - p)), (p = F);
                        break;
                      }
                      (p = A), (c = "");
                    }
                    (g = r.slice(o, (o = n[m++]))),
                      (a = Jt(n[m++], t.cm.options));
                  }
                }
              else
                for (var L = 1; L < n.length; L += 2)
                  t.addToken(
                    t,
                    r.slice(o, (o = n[L])),
                    Jt(n[L + 1], t.cm.options)
                  );
            }
            function ln(e, t, n) {
              (this.line = t),
                (this.rest = (function (e) {
                  for (var t, n; (t = Rt(e)); )
                    (e = t.find(1, !0).line), (n || (n = [])).push(e);
                  return n;
                })(t)),
                (this.size = this.rest ? Je(Y(this.rest)) - n + 1 : 1),
                (this.node = this.text = null),
                (this.hidden = Ut(e, t));
            }
            function sn(e, t, n) {
              for (var i, r = [], o = t; o < n; o = i) {
                var a = new ln(e.doc, Ke(e.doc, o), o);
                (i = o + a.size), r.push(a);
              }
              return r;
            }
            var un = null;
            var cn = null;
            function dn(e, t) {
              var n = me(e, t);
              if (n.length) {
                var i,
                  r = Array.prototype.slice.call(arguments, 2);
                un
                  ? (i = un.delayedCallbacks)
                  : cn
                  ? (i = cn)
                  : ((i = cn = []), setTimeout(hn, 0));
                for (
                  var o = function (e) {
                      i.push(function () {
                        return n[e].apply(null, r);
                      });
                    },
                    a = 0;
                  a < n.length;
                  ++a
                )
                  o(a);
              }
            }
            function hn() {
              var e = cn;
              cn = null;
              for (var t = 0; t < e.length; ++t) e[t]();
            }
            function fn(e, t, n, i) {
              for (var r = 0; r < t.changes.length; r++) {
                var o = t.changes[r];
                "text" == o
                  ? gn(e, t)
                  : "gutter" == o
                  ? xn(e, t, n, i)
                  : "class" == o
                  ? vn(e, t)
                  : "widget" == o && yn(e, t, i);
              }
              t.changes = null;
            }
            function pn(e) {
              return (
                e.node == e.text &&
                  ((e.node = T("div", null, null, "position: relative")),
                  e.text.parentNode &&
                    e.text.parentNode.replaceChild(e.node, e.text),
                  e.node.appendChild(e.text),
                  a && l < 8 && (e.node.style.zIndex = 2)),
                e.node
              );
            }
            function mn(e, t) {
              var n = e.display.externalMeasured;
              return n && n.line == t.line
                ? ((e.display.externalMeasured = null),
                  (t.measure = n.measure),
                  n.built)
                : en(e, t);
            }
            function gn(e, t) {
              var n = t.text.className,
                i = mn(e, t);
              t.text == t.node && (t.node = i.pre),
                t.text.parentNode.replaceChild(i.pre, t.text),
                (t.text = i.pre),
                i.bgClass != t.bgClass || i.textClass != t.textClass
                  ? ((t.bgClass = i.bgClass),
                    (t.textClass = i.textClass),
                    vn(e, t))
                  : n && (t.text.className = n);
            }
            function vn(e, t) {
              !(function (e, t) {
                var n = t.bgClass
                  ? t.bgClass + " " + (t.line.bgClass || "")
                  : t.line.bgClass;
                if ((n && (n += " CodeMirror-linebackground"), t.background))
                  n
                    ? (t.background.className = n)
                    : (t.background.parentNode.removeChild(t.background),
                      (t.background = null));
                else if (n) {
                  var i = pn(t);
                  (t.background = i.insertBefore(
                    T("div", null, n),
                    i.firstChild
                  )),
                    e.display.input.setUneditable(t.background);
                }
              })(e, t),
                t.line.wrapClass
                  ? (pn(t).className = t.line.wrapClass)
                  : t.node != t.text && (t.node.className = "");
              var n = t.textClass
                ? t.textClass + " " + (t.line.textClass || "")
                : t.line.textClass;
              t.text.className = n || "";
            }
            function xn(e, t, n, i) {
              if (
                (t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)),
                t.gutterBackground &&
                  (t.node.removeChild(t.gutterBackground),
                  (t.gutterBackground = null)),
                t.line.gutterClass)
              ) {
                var r = pn(t);
                (t.gutterBackground = T(
                  "div",
                  null,
                  "CodeMirror-gutter-background " + t.line.gutterClass,
                  "left: " +
                    (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) +
                    "px; width: " +
                    i.gutterTotalWidth +
                    "px"
                )),
                  e.display.input.setUneditable(t.gutterBackground),
                  r.insertBefore(t.gutterBackground, t.text);
              }
              var o = t.line.gutterMarkers;
              if (e.options.lineNumbers || o) {
                var a = pn(t),
                  l = (t.gutter = T(
                    "div",
                    null,
                    "CodeMirror-gutter-wrapper",
                    "left: " +
                      (e.options.fixedGutter
                        ? i.fixedPos
                        : -i.gutterTotalWidth) +
                      "px"
                  ));
                if (
                  (l.setAttribute("aria-hidden", "true"),
                  e.display.input.setUneditable(l),
                  a.insertBefore(l, t.text),
                  t.line.gutterClass &&
                    (l.className += " " + t.line.gutterClass),
                  !e.options.lineNumbers ||
                    (o && o["CodeMirror-linenumbers"]) ||
                    (t.lineNumber = l.appendChild(
                      T(
                        "div",
                        nt(e.options, n),
                        "CodeMirror-linenumber CodeMirror-gutter-elt",
                        "left: " +
                          i.gutterLeft["CodeMirror-linenumbers"] +
                          "px; width: " +
                          e.display.lineNumInnerWidth +
                          "px"
                      )
                    )),
                  o)
                )
                  for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                    var u = e.display.gutterSpecs[s].className,
                      c = o.hasOwnProperty(u) && o[u];
                    c &&
                      l.appendChild(
                        T(
                          "div",
                          [c],
                          "CodeMirror-gutter-elt",
                          "left: " +
                            i.gutterLeft[u] +
                            "px; width: " +
                            i.gutterWidth[u] +
                            "px"
                        )
                      );
                  }
              }
            }
            function yn(e, t, n) {
              t.alignable && (t.alignable = null);
              for (
                var i = S("CodeMirror-linewidget"),
                  r = t.node.firstChild,
                  o = void 0;
                r;
                r = o
              )
                (o = r.nextSibling),
                  i.test(r.className) && t.node.removeChild(r);
              Dn(e, t, n);
            }
            function bn(e, t, n, i) {
              var r = mn(e, t);
              return (
                (t.text = t.node = r.pre),
                r.bgClass && (t.bgClass = r.bgClass),
                r.textClass && (t.textClass = r.textClass),
                vn(e, t),
                xn(e, t, n, i),
                Dn(e, t, i),
                t.node
              );
            }
            function Dn(e, t, n) {
              if ((Cn(e, t.line, t, n, !0), t.rest))
                for (var i = 0; i < t.rest.length; i++)
                  Cn(e, t.rest[i], t, n, !1);
            }
            function Cn(e, t, n, i, r) {
              if (t.widgets)
                for (var o = pn(n), a = 0, l = t.widgets; a < l.length; ++a) {
                  var s = l[a],
                    u = T(
                      "div",
                      [s.node],
                      "CodeMirror-linewidget" +
                        (s.className ? " " + s.className : "")
                    );
                  s.handleMouseEvents ||
                    u.setAttribute("cm-ignore-events", "true"),
                    wn(s, u, n, i),
                    e.display.input.setUneditable(u),
                    r && s.above
                      ? o.insertBefore(u, n.gutter || n.text)
                      : o.appendChild(u),
                    dn(s, "redraw");
                }
            }
            function wn(e, t, n, i) {
              if (e.noHScroll) {
                (n.alignable || (n.alignable = [])).push(t);
                var r = i.wrapperWidth;
                (t.style.left = i.fixedPos + "px"),
                  e.coverGutter ||
                    ((r -= i.gutterTotalWidth),
                    (t.style.paddingLeft = i.gutterTotalWidth + "px")),
                  (t.style.width = r + "px");
              }
              e.coverGutter &&
                ((t.style.zIndex = 5),
                (t.style.position = "relative"),
                e.noHScroll ||
                  (t.style.marginLeft = -i.gutterTotalWidth + "px"));
            }
            function kn(e) {
              if (null != e.height) return e.height;
              var t = e.doc.cm;
              if (!t) return 0;
              if (!B(document.body, e.node)) {
                var n = "position: relative;";
                e.coverGutter &&
                  (n +=
                    "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
                  e.noHScroll &&
                    (n += "width: " + t.display.wrapper.clientWidth + "px;"),
                  L(t.display.measure, T("div", [e.node], null, n));
              }
              return (e.height = e.node.parentNode.offsetHeight);
            }
            function Sn(e, t) {
              for (var n = Fe(t); n != e.wrapper; n = n.parentNode)
                if (
                  !n ||
                  (1 == n.nodeType &&
                    "true" == n.getAttribute("cm-ignore-events")) ||
                  (n.parentNode == e.sizer && n != e.mover)
                )
                  return !0;
            }
            function Fn(e) {
              return e.lineSpace.offsetTop;
            }
            function An(e) {
              return e.mover.offsetHeight - e.lineSpace.offsetHeight;
            }
            function En(e) {
              if (e.cachedPaddingH) return e.cachedPaddingH;
              var t = L(e.measure, T("pre", "x", "CodeMirror-line-like")),
                n = window.getComputedStyle
                  ? window.getComputedStyle(t)
                  : t.currentStyle,
                i = {
                  left: parseInt(n.paddingLeft),
                  right: parseInt(n.paddingRight),
                };
              return (
                isNaN(i.left) || isNaN(i.right) || (e.cachedPaddingH = i), i
              );
            }
            function Ln(e) {
              return 50 - e.display.nativeBarWidth;
            }
            function Tn(e) {
              return (
                e.display.scroller.clientWidth - Ln(e) - e.display.barWidth
              );
            }
            function Mn(e) {
              return (
                e.display.scroller.clientHeight - Ln(e) - e.display.barHeight
              );
            }
            function Bn(e, t, n) {
              if (e.line == t)
                return { map: e.measure.map, cache: e.measure.cache };
              if (e.rest) {
                for (var i = 0; i < e.rest.length; i++)
                  if (e.rest[i] == t)
                    return {
                      map: e.measure.maps[i],
                      cache: e.measure.caches[i],
                    };
                for (var r = 0; r < e.rest.length; r++)
                  if (Je(e.rest[r]) > n)
                    return {
                      map: e.measure.maps[r],
                      cache: e.measure.caches[r],
                      before: !0,
                    };
              }
            }
            function Nn(e, t, n, i) {
              return zn(e, In(e, t), n, i);
            }
            function On(e, t) {
              if (t >= e.display.viewFrom && t < e.display.viewTo)
                return e.display.view[fi(e, t)];
              var n = e.display.externalMeasured;
              return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0;
            }
            function In(e, t) {
              var n = Je(t),
                i = On(e, n);
              i && !i.text
                ? (i = null)
                : i &&
                  i.changes &&
                  (fn(e, i, n, si(e)), (e.curOp.forceUpdate = !0)),
                i ||
                  (i = (function (e, t) {
                    var n = Je((t = Wt(t))),
                      i = (e.display.externalMeasured = new ln(e.doc, t, n));
                    i.lineN = n;
                    var r = (i.built = en(e, i));
                    return (i.text = r.pre), L(e.display.lineMeasure, r.pre), i;
                  })(e, t));
              var r = Bn(i, t, n);
              return {
                line: t,
                view: i,
                rect: null,
                map: r.map,
                cache: r.cache,
                before: r.before,
                hasHeights: !1,
              };
            }
            function zn(e, t, n, i, r) {
              t.before && (n = -1);
              var o,
                s = n + (i || "");
              return (
                t.cache.hasOwnProperty(s)
                  ? (o = t.cache[s])
                  : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
                    t.hasHeights ||
                      (!(function (e, t, n) {
                        var i = e.options.lineWrapping,
                          r = i && Tn(e);
                        if (!t.measure.heights || (i && t.measure.width != r)) {
                          var o = (t.measure.heights = []);
                          if (i) {
                            t.measure.width = r;
                            for (
                              var a = t.text.firstChild.getClientRects(), l = 0;
                              l < a.length - 1;
                              l++
                            ) {
                              var s = a[l],
                                u = a[l + 1];
                              Math.abs(s.bottom - u.bottom) > 2 &&
                                o.push((s.bottom + u.top) / 2 - n.top);
                            }
                          }
                          o.push(n.bottom - n.top);
                        }
                      })(e, t.view, t.rect),
                      (t.hasHeights = !0)),
                    (o = (function (e, t, n, i) {
                      var r,
                        o = Pn(t.map, n, i),
                        s = o.node,
                        u = o.start,
                        c = o.end,
                        d = o.collapse;
                      if (3 == s.nodeType) {
                        for (var h = 0; h < 4; h++) {
                          for (
                            ;
                            u && ae(t.line.text.charAt(o.coverStart + u));

                          )
                            --u;
                          for (
                            ;
                            o.coverStart + c < o.coverEnd &&
                            ae(t.line.text.charAt(o.coverStart + c));

                          )
                            ++c;
                          if (
                            (r =
                              a &&
                              l < 9 &&
                              0 == u &&
                              c == o.coverEnd - o.coverStart
                                ? s.parentNode.getBoundingClientRect()
                                : _n(F(s, u, c).getClientRects(), i)).left ||
                            r.right ||
                            0 == u
                          )
                            break;
                          (c = u), (u -= 1), (d = "right");
                        }
                        a &&
                          l < 11 &&
                          (r = (function (e, t) {
                            if (
                              !window.screen ||
                              null == screen.logicalXDPI ||
                              screen.logicalXDPI == screen.deviceXDPI ||
                              !(function (e) {
                                if (null != He) return He;
                                var t = L(e, T("span", "x")),
                                  n = t.getBoundingClientRect(),
                                  i = F(t, 0, 1).getBoundingClientRect();
                                return (He = Math.abs(n.left - i.left) > 1);
                              })(e)
                            )
                              return t;
                            var n = screen.logicalXDPI / screen.deviceXDPI,
                              i = screen.logicalYDPI / screen.deviceYDPI;
                            return {
                              left: t.left * n,
                              right: t.right * n,
                              top: t.top * i,
                              bottom: t.bottom * i,
                            };
                          })(e.display.measure, r));
                      } else {
                        var f;
                        u > 0 && (d = i = "right"),
                          (r =
                            e.options.lineWrapping &&
                            (f = s.getClientRects()).length > 1
                              ? f["right" == i ? f.length - 1 : 0]
                              : s.getBoundingClientRect());
                      }
                      if (a && l < 9 && !u && (!r || (!r.left && !r.right))) {
                        var p = s.parentNode.getClientRects()[0];
                        r = p
                          ? {
                              left: p.left,
                              right: p.left + li(e.display),
                              top: p.top,
                              bottom: p.bottom,
                            }
                          : Rn;
                      }
                      for (
                        var m = r.top - t.rect.top,
                          g = r.bottom - t.rect.top,
                          v = (m + g) / 2,
                          x = t.view.measure.heights,
                          y = 0;
                        y < x.length - 1 && !(v < x[y]);
                        y++
                      );
                      var b = y ? x[y - 1] : 0,
                        D = x[y],
                        C = {
                          left: ("right" == d ? r.right : r.left) - t.rect.left,
                          right: ("left" == d ? r.left : r.right) - t.rect.left,
                          top: b,
                          bottom: D,
                        };
                      r.left || r.right || (C.bogus = !0);
                      e.options.singleCursorHeightPerLine ||
                        ((C.rtop = m), (C.rbottom = g));
                      return C;
                    })(e, t, n, i)),
                    o.bogus || (t.cache[s] = o)),
                {
                  left: o.left,
                  right: o.right,
                  top: r ? o.rtop : o.top,
                  bottom: r ? o.rbottom : o.bottom,
                }
              );
            }
            var Hn,
              Rn = { left: 0, right: 0, top: 0, bottom: 0 };
            function Pn(e, t, n) {
              for (var i, r, o, a, l, s, u = 0; u < e.length; u += 3)
                if (
                  ((l = e[u]),
                  (s = e[u + 1]),
                  t < l
                    ? ((r = 0), (o = 1), (a = "left"))
                    : t < s
                    ? (o = (r = t - l) + 1)
                    : (u == e.length - 3 || (t == s && e[u + 3] > t)) &&
                      ((r = (o = s - l) - 1), t >= s && (a = "right")),
                  null != r)
                ) {
                  if (
                    ((i = e[u + 2]),
                    l == s && n == (i.insertLeft ? "left" : "right") && (a = n),
                    "left" == n && 0 == r)
                  )
                    for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
                      (i = e[2 + (u -= 3)]), (a = "left");
                  if ("right" == n && r == s - l)
                    for (
                      ;
                      u < e.length - 3 &&
                      e[u + 3] == e[u + 4] &&
                      !e[u + 5].insertLeft;

                    )
                      (i = e[(u += 3) + 2]), (a = "right");
                  break;
                }
              return {
                node: i,
                start: r,
                end: o,
                collapse: a,
                coverStart: l,
                coverEnd: s,
              };
            }
            function _n(e, t) {
              var n = Rn;
              if ("left" == t)
                for (
                  var i = 0;
                  i < e.length && (n = e[i]).left == n.right;
                  i++
                );
              else
                for (
                  var r = e.length - 1;
                  r >= 0 && (n = e[r]).left == n.right;
                  r--
                );
              return n;
            }
            function Wn(e) {
              if (
                e.measure &&
                ((e.measure.cache = {}), (e.measure.heights = null), e.rest)
              )
                for (var t = 0; t < e.rest.length; t++)
                  e.measure.caches[t] = {};
            }
            function jn(e) {
              (e.display.externalMeasure = null), E(e.display.lineMeasure);
              for (var t = 0; t < e.display.view.length; t++)
                Wn(e.display.view[t]);
            }
            function qn(e) {
              jn(e),
                (e.display.cachedCharWidth =
                  e.display.cachedTextHeight =
                  e.display.cachedPaddingH =
                    null),
                e.options.lineWrapping || (e.display.maxLineChanged = !0),
                (e.display.lineNumChars = null);
            }
            function Un(e) {
              return c && v
                ? -(
                    e.body.getBoundingClientRect().left -
                    parseInt(getComputedStyle(e.body).marginLeft)
                  )
                : e.defaultView.pageXOffset ||
                    (e.documentElement || e.body).scrollLeft;
            }
            function $n(e) {
              return c && v
                ? -(
                    e.body.getBoundingClientRect().top -
                    parseInt(getComputedStyle(e.body).marginTop)
                  )
                : e.defaultView.pageYOffset ||
                    (e.documentElement || e.body).scrollTop;
            }
            function Gn(e) {
              var t = Wt(e).widgets,
                n = 0;
              if (t)
                for (var i = 0; i < t.length; ++i)
                  t[i].above && (n += kn(t[i]));
              return n;
            }
            function Vn(e, t, n, i, r) {
              if (!r) {
                var o = Gn(t);
                (n.top += o), (n.bottom += o);
              }
              if ("line" == i) return n;
              i || (i = "local");
              var a = Gt(t);
              if (
                ("local" == i
                  ? (a += Fn(e.display))
                  : (a -= e.display.viewOffset),
                "page" == i || "window" == i)
              ) {
                var l = e.display.lineSpace.getBoundingClientRect();
                a += l.top + ("window" == i ? 0 : $n(H(e)));
                var s = l.left + ("window" == i ? 0 : Un(H(e)));
                (n.left += s), (n.right += s);
              }
              return (n.top += a), (n.bottom += a), n;
            }
            function Xn(e, t, n) {
              if ("div" == n) return t;
              var i = t.left,
                r = t.top;
              if ("page" == n) (i -= Un(H(e))), (r -= $n(H(e)));
              else if ("local" == n || !n) {
                var o = e.display.sizer.getBoundingClientRect();
                (i += o.left), (r += o.top);
              }
              var a = e.display.lineSpace.getBoundingClientRect();
              return { left: i - a.left, top: r - a.top };
            }
            function Kn(e, t, n, i, r) {
              return (
                i || (i = Ke(e.doc, t.line)), Vn(e, i, Nn(e, i, t.ch, r), n)
              );
            }
            function Zn(e, t, n, i, r, o) {
              function a(t, a) {
                var l = zn(e, r, t, a ? "right" : "left", o);
                return (
                  a ? (l.left = l.right) : (l.right = l.left), Vn(e, i, l, n)
                );
              }
              (i = i || Ke(e.doc, t.line)), r || (r = In(e, i));
              var l = he(i, e.doc.direction),
                s = t.ch,
                u = t.sticky;
              if (
                (s >= i.text.length
                  ? ((s = i.text.length), (u = "before"))
                  : s <= 0 && ((s = 0), (u = "after")),
                !l)
              )
                return a("before" == u ? s - 1 : s, "before" == u);
              function c(e, t, n) {
                return a(n ? e - 1 : e, (1 == l[t].level) != n);
              }
              var d = ce(l, s, u),
                h = ue,
                f = c(s, d, "before" == u);
              return null != h && (f.other = c(s, h, "before" != u)), f;
            }
            function Yn(e, t) {
              var n = 0;
              (t = ct(e.doc, t)),
                e.options.lineWrapping || (n = li(e.display) * t.ch);
              var i = Ke(e.doc, t.line),
                r = Gt(i) + Fn(e.display);
              return { left: n, right: n, top: r, bottom: r + i.height };
            }
            function Qn(e, t, n, i, r) {
              var o = it(e, t, n);
              return (o.xRel = r), i && (o.outside = i), o;
            }
            function Jn(e, t, n) {
              var i = e.doc;
              if ((n += e.display.viewOffset) < 0)
                return Qn(i.first, 0, null, -1, -1);
              var r = et(i, n),
                o = i.first + i.size - 1;
              if (r > o)
                return Qn(
                  i.first + i.size - 1,
                  Ke(i, o).text.length,
                  null,
                  1,
                  1
                );
              t < 0 && (t = 0);
              for (var a = Ke(i, r); ; ) {
                var l = ii(e, a, r, t, n),
                  s = Pt(a, l.ch + (l.xRel > 0 || l.outside > 0 ? 1 : 0));
                if (!s) return l;
                var u = s.find(1);
                if (u.line == r) return u;
                a = Ke(i, (r = u.line));
              }
            }
            function ei(e, t, n, i) {
              i -= Gn(t);
              var r = t.text.length,
                o = se(
                  function (t) {
                    return zn(e, n, t - 1).bottom <= i;
                  },
                  r,
                  0
                );
              return {
                begin: o,
                end: (r = se(
                  function (t) {
                    return zn(e, n, t).top > i;
                  },
                  o,
                  r
                )),
              };
            }
            function ti(e, t, n, i) {
              return (
                n || (n = In(e, t)),
                ei(e, t, n, Vn(e, t, zn(e, n, i), "line").top)
              );
            }
            function ni(e, t, n, i) {
              return (
                !(e.bottom <= n) && (e.top > n || (i ? e.left : e.right) > t)
              );
            }
            function ii(e, t, n, i, r) {
              r -= Gt(t);
              var o = In(e, t),
                a = Gn(t),
                l = 0,
                s = t.text.length,
                u = !0,
                c = he(t, e.doc.direction);
              if (c) {
                var d = (e.options.lineWrapping ? oi : ri)(e, t, n, o, c, i, r);
                (l = (u = 1 != d.level) ? d.from : d.to - 1),
                  (s = u ? d.to : d.from - 1);
              }
              var h,
                f,
                p = null,
                m = null,
                g = se(
                  function (t) {
                    var n = zn(e, o, t);
                    return (
                      (n.top += a),
                      (n.bottom += a),
                      !!ni(n, i, r, !1) &&
                        (n.top <= r && n.left <= i && ((p = t), (m = n)), !0)
                    );
                  },
                  l,
                  s
                ),
                v = !1;
              if (m) {
                var x = i - m.left < m.right - i,
                  y = x == u;
                (g = p + (y ? 0 : 1)),
                  (f = y ? "after" : "before"),
                  (h = x ? m.left : m.right);
              } else {
                u || (g != s && g != l) || g++,
                  (f =
                    0 == g
                      ? "after"
                      : g == t.text.length
                      ? "before"
                      : zn(e, o, g - (u ? 1 : 0)).bottom + a <= r == u
                      ? "after"
                      : "before");
                var b = Zn(e, it(n, g, f), "line", t, o);
                (h = b.left), (v = r < b.top ? -1 : r >= b.bottom ? 1 : 0);
              }
              return Qn(n, (g = le(t.text, g, 1)), f, v, i - h);
            }
            function ri(e, t, n, i, r, o, a) {
              var l = se(
                  function (l) {
                    var s = r[l],
                      u = 1 != s.level;
                    return ni(
                      Zn(
                        e,
                        it(n, u ? s.to : s.from, u ? "before" : "after"),
                        "line",
                        t,
                        i
                      ),
                      o,
                      a,
                      !0
                    );
                  },
                  0,
                  r.length - 1
                ),
                s = r[l];
              if (l > 0) {
                var u = 1 != s.level,
                  c = Zn(
                    e,
                    it(n, u ? s.from : s.to, u ? "after" : "before"),
                    "line",
                    t,
                    i
                  );
                ni(c, o, a, !0) && c.top > a && (s = r[l - 1]);
              }
              return s;
            }
            function oi(e, t, n, i, r, o, a) {
              var l = ei(e, t, i, a),
                s = l.begin,
                u = l.end;
              /\s/.test(t.text.charAt(u - 1)) && u--;
              for (var c = null, d = null, h = 0; h < r.length; h++) {
                var f = r[h];
                if (!(f.from >= u || f.to <= s)) {
                  var p = zn(
                      e,
                      i,
                      1 != f.level ? Math.min(u, f.to) - 1 : Math.max(s, f.from)
                    ).right,
                    m = p < o ? o - p + 1e9 : p - o;
                  (!c || d > m) && ((c = f), (d = m));
                }
              }
              return (
                c || (c = r[r.length - 1]),
                c.from < s && (c = { from: s, to: c.to, level: c.level }),
                c.to > u && (c = { from: c.from, to: u, level: c.level }),
                c
              );
            }
            function ai(e) {
              if (null != e.cachedTextHeight) return e.cachedTextHeight;
              if (null == Hn) {
                Hn = T("pre", null, "CodeMirror-line-like");
                for (var t = 0; t < 49; ++t)
                  Hn.appendChild(document.createTextNode("x")),
                    Hn.appendChild(T("br"));
                Hn.appendChild(document.createTextNode("x"));
              }
              L(e.measure, Hn);
              var n = Hn.offsetHeight / 50;
              return n > 3 && (e.cachedTextHeight = n), E(e.measure), n || 1;
            }
            function li(e) {
              if (null != e.cachedCharWidth) return e.cachedCharWidth;
              var t = T("span", "xxxxxxxxxx"),
                n = T("pre", [t], "CodeMirror-line-like");
              L(e.measure, n);
              var i = t.getBoundingClientRect(),
                r = (i.right - i.left) / 10;
              return r > 2 && (e.cachedCharWidth = r), r || 10;
            }
            function si(e) {
              for (
                var t = e.display,
                  n = {},
                  i = {},
                  r = t.gutters.clientLeft,
                  o = t.gutters.firstChild,
                  a = 0;
                o;
                o = o.nextSibling, ++a
              ) {
                var l = e.display.gutterSpecs[a].className;
                (n[l] = o.offsetLeft + o.clientLeft + r),
                  (i[l] = o.clientWidth);
              }
              return {
                fixedPos: ui(t),
                gutterTotalWidth: t.gutters.offsetWidth,
                gutterLeft: n,
                gutterWidth: i,
                wrapperWidth: t.wrapper.clientWidth,
              };
            }
            function ui(e) {
              return (
                e.scroller.getBoundingClientRect().left -
                e.sizer.getBoundingClientRect().left
              );
            }
            function ci(e) {
              var t = ai(e.display),
                n = e.options.lineWrapping,
                i =
                  n &&
                  Math.max(
                    5,
                    e.display.scroller.clientWidth / li(e.display) - 3
                  );
              return function (r) {
                if (Ut(e.doc, r)) return 0;
                var o = 0;
                if (r.widgets)
                  for (var a = 0; a < r.widgets.length; a++)
                    r.widgets[a].height && (o += r.widgets[a].height);
                return n ? o + (Math.ceil(r.text.length / i) || 1) * t : o + t;
              };
            }
            function di(e) {
              var t = e.doc,
                n = ci(e);
              t.iter(function (e) {
                var t = n(e);
                t != e.height && Qe(e, t);
              });
            }
            function hi(e, t, n, i) {
              var r = e.display;
              if (!n && "true" == Fe(t).getAttribute("cm-not-content"))
                return null;
              var o,
                a,
                l = r.lineSpace.getBoundingClientRect();
              try {
                (o = t.clientX - l.left), (a = t.clientY - l.top);
              } catch (e) {
                return null;
              }
              var s,
                u = Jn(e, o, a);
              if (
                i &&
                u.xRel > 0 &&
                (s = Ke(e.doc, u.line).text).length == u.ch
              ) {
                var c = W(s, s.length, e.options.tabSize) - s.length;
                u = it(
                  u.line,
                  Math.max(
                    0,
                    Math.round((o - En(e.display).left) / li(e.display)) - c
                  )
                );
              }
              return u;
            }
            function fi(e, t) {
              if (t >= e.display.viewTo) return null;
              if ((t -= e.display.viewFrom) < 0) return null;
              for (var n = e.display.view, i = 0; i < n.length; i++)
                if ((t -= n[i].size) < 0) return i;
            }
            function pi(e, t, n, i) {
              null == t && (t = e.doc.first),
                null == n && (n = e.doc.first + e.doc.size),
                i || (i = 0);
              var r = e.display;
              if (
                (i &&
                  n < r.viewTo &&
                  (null == r.updateLineNumbers || r.updateLineNumbers > t) &&
                  (r.updateLineNumbers = t),
                (e.curOp.viewChanged = !0),
                t >= r.viewTo)
              )
                St && jt(e.doc, t) < r.viewTo && gi(e);
              else if (n <= r.viewFrom)
                St && qt(e.doc, n + i) > r.viewFrom
                  ? gi(e)
                  : ((r.viewFrom += i), (r.viewTo += i));
              else if (t <= r.viewFrom && n >= r.viewTo) gi(e);
              else if (t <= r.viewFrom) {
                var o = vi(e, n, n + i, 1);
                o
                  ? ((r.view = r.view.slice(o.index)),
                    (r.viewFrom = o.lineN),
                    (r.viewTo += i))
                  : gi(e);
              } else if (n >= r.viewTo) {
                var a = vi(e, t, t, -1);
                a
                  ? ((r.view = r.view.slice(0, a.index)), (r.viewTo = a.lineN))
                  : gi(e);
              } else {
                var l = vi(e, t, t, -1),
                  s = vi(e, n, n + i, 1);
                l && s
                  ? ((r.view = r.view
                      .slice(0, l.index)
                      .concat(sn(e, l.lineN, s.lineN))
                      .concat(r.view.slice(s.index))),
                    (r.viewTo += i))
                  : gi(e);
              }
              var u = r.externalMeasured;
              u &&
                (n < u.lineN
                  ? (u.lineN += i)
                  : t < u.lineN + u.size && (r.externalMeasured = null));
            }
            function mi(e, t, n) {
              e.curOp.viewChanged = !0;
              var i = e.display,
                r = e.display.externalMeasured;
              if (
                (r &&
                  t >= r.lineN &&
                  t < r.lineN + r.size &&
                  (i.externalMeasured = null),
                !(t < i.viewFrom || t >= i.viewTo))
              ) {
                var o = i.view[fi(e, t)];
                if (null != o.node) {
                  var a = o.changes || (o.changes = []);
                  -1 == q(a, n) && a.push(n);
                }
              }
            }
            function gi(e) {
              (e.display.viewFrom = e.display.viewTo = e.doc.first),
                (e.display.view = []),
                (e.display.viewOffset = 0);
            }
            function vi(e, t, n, i) {
              var r,
                o = fi(e, t),
                a = e.display.view;
              if (!St || n == e.doc.first + e.doc.size)
                return { index: o, lineN: n };
              for (var l = e.display.viewFrom, s = 0; s < o; s++)
                l += a[s].size;
              if (l != t) {
                if (i > 0) {
                  if (o == a.length - 1) return null;
                  (r = l + a[o].size - t), o++;
                } else r = l - t;
                (t += r), (n += r);
              }
              for (; jt(e.doc, n) != n; ) {
                if (o == (i < 0 ? 0 : a.length - 1)) return null;
                (n += i * a[o - (i < 0 ? 1 : 0)].size), (o += i);
              }
              return { index: o, lineN: n };
            }
            function xi(e) {
              for (var t = e.display.view, n = 0, i = 0; i < t.length; i++) {
                var r = t[i];
                r.hidden || (r.node && !r.changes) || ++n;
              }
              return n;
            }
            function yi(e) {
              e.display.input.showSelection(e.display.input.prepareSelection());
            }
            function bi(e, t) {
              void 0 === t && (t = !0);
              var n = e.doc,
                i = {},
                r = (i.cursors = document.createDocumentFragment()),
                o = (i.selection = document.createDocumentFragment()),
                a = e.options.$customCursor;
              a && (t = !0);
              for (var l = 0; l < n.sel.ranges.length; l++)
                if (t || l != n.sel.primIndex) {
                  var s = n.sel.ranges[l];
                  if (
                    !(
                      s.from().line >= e.display.viewTo ||
                      s.to().line < e.display.viewFrom
                    )
                  ) {
                    var u = s.empty();
                    if (a) {
                      var c = a(e, s);
                      c && Di(e, c, r);
                    } else
                      (u || e.options.showCursorWhenSelecting) &&
                        Di(e, s.head, r);
                    u || wi(e, s, o);
                  }
                }
              return i;
            }
            function Di(e, t, n) {
              var i = Zn(
                  e,
                  t,
                  "div",
                  null,
                  null,
                  !e.options.singleCursorHeightPerLine
                ),
                r = n.appendChild(T("div", " ", "CodeMirror-cursor"));
              if (
                ((r.style.left = i.left + "px"),
                (r.style.top = i.top + "px"),
                (r.style.height =
                  Math.max(0, i.bottom - i.top) * e.options.cursorHeight +
                  "px"),
                /\bcm-fat-cursor\b/.test(e.getWrapperElement().className))
              ) {
                var o = Kn(e, t, "div", null, null),
                  a = o.right - o.left;
                r.style.width = (a > 0 ? a : e.defaultCharWidth()) + "px";
              }
              if (i.other) {
                var l = n.appendChild(
                  T("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")
                );
                (l.style.display = ""),
                  (l.style.left = i.other.left + "px"),
                  (l.style.top = i.other.top + "px"),
                  (l.style.height =
                    0.85 * (i.other.bottom - i.other.top) + "px");
              }
            }
            function Ci(e, t) {
              return e.top - t.top || e.left - t.left;
            }
            function wi(e, t, n) {
              var i = e.display,
                r = e.doc,
                o = document.createDocumentFragment(),
                a = En(e.display),
                l = a.left,
                s =
                  Math.max(i.sizerWidth, Tn(e) - i.sizer.offsetLeft) - a.right,
                u = "ltr" == r.direction;
              function c(e, t, n, i) {
                t < 0 && (t = 0),
                  (t = Math.round(t)),
                  (i = Math.round(i)),
                  o.appendChild(
                    T(
                      "div",
                      null,
                      "CodeMirror-selected",
                      "position: absolute; left: " +
                        e +
                        "px;\n                             top: " +
                        t +
                        "px; width: " +
                        (null == n ? s - e : n) +
                        "px;\n                             height: " +
                        (i - t) +
                        "px"
                    )
                  );
              }
              function d(t, n, i) {
                var o,
                  a,
                  d = Ke(r, t),
                  h = d.text.length;
                function f(n, i) {
                  return Kn(e, it(t, n), "div", d, i);
                }
                function p(t, n, i) {
                  var r = ti(e, d, null, t),
                    o = ("ltr" == n) == ("after" == i) ? "left" : "right";
                  return f(
                    "after" == i
                      ? r.begin
                      : r.end - (/\s/.test(d.text.charAt(r.end - 1)) ? 2 : 1),
                    o
                  )[o];
                }
                var m = he(d, r.direction);
                return (
                  (function (e, t, n, i) {
                    if (!e) return i(t, n, "ltr", 0);
                    for (var r = !1, o = 0; o < e.length; ++o) {
                      var a = e[o];
                      ((a.from < n && a.to > t) || (t == n && a.to == t)) &&
                        (i(
                          Math.max(a.from, t),
                          Math.min(a.to, n),
                          1 == a.level ? "rtl" : "ltr",
                          o
                        ),
                        (r = !0));
                    }
                    r || i(t, n, "ltr");
                  })(m, n || 0, null == i ? h : i, function (e, t, r, d) {
                    var g = "ltr" == r,
                      v = f(e, g ? "left" : "right"),
                      x = f(t - 1, g ? "right" : "left"),
                      y = null == n && 0 == e,
                      b = null == i && t == h,
                      D = 0 == d,
                      C = !m || d == m.length - 1;
                    if (x.top - v.top <= 3) {
                      var w = (u ? b : y) && C,
                        k = (u ? y : b) && D ? l : (g ? v : x).left,
                        S = w ? s : (g ? x : v).right;
                      c(k, v.top, S - k, v.bottom);
                    } else {
                      var F, A, E, L;
                      g
                        ? ((F = u && y && D ? l : v.left),
                          (A = u ? s : p(e, r, "before")),
                          (E = u ? l : p(t, r, "after")),
                          (L = u && b && C ? s : x.right))
                        : ((F = u ? p(e, r, "before") : l),
                          (A = !u && y && D ? s : v.right),
                          (E = !u && b && C ? l : x.left),
                          (L = u ? p(t, r, "after") : s)),
                        c(F, v.top, A - F, v.bottom),
                        v.bottom < x.top && c(l, v.bottom, null, x.top),
                        c(E, x.top, L - E, x.bottom);
                    }
                    (!o || Ci(v, o) < 0) && (o = v),
                      Ci(x, o) < 0 && (o = x),
                      (!a || Ci(v, a) < 0) && (a = v),
                      Ci(x, a) < 0 && (a = x);
                  }),
                  { start: o, end: a }
                );
              }
              var h = t.from(),
                f = t.to();
              if (h.line == f.line) d(h.line, h.ch, f.ch);
              else {
                var p = Ke(r, h.line),
                  m = Ke(r, f.line),
                  g = Wt(p) == Wt(m),
                  v = d(h.line, h.ch, g ? p.text.length + 1 : null).end,
                  x = d(f.line, g ? 0 : null, f.ch).start;
                g &&
                  (v.top < x.top - 2
                    ? (c(v.right, v.top, null, v.bottom),
                      c(l, x.top, x.left, x.bottom))
                    : c(v.right, v.top, x.left - v.right, v.bottom)),
                  v.bottom < x.top && c(l, v.bottom, null, x.top);
              }
              n.appendChild(o);
            }
            function ki(e) {
              if (e.state.focused) {
                var t = e.display;
                clearInterval(t.blinker);
                var n = !0;
                (t.cursorDiv.style.visibility = ""),
                  e.options.cursorBlinkRate > 0
                    ? (t.blinker = setInterval(function () {
                        e.hasFocus() || Ei(e),
                          (t.cursorDiv.style.visibility = (n = !n)
                            ? ""
                            : "hidden");
                      }, e.options.cursorBlinkRate))
                    : e.options.cursorBlinkRate < 0 &&
                      (t.cursorDiv.style.visibility = "hidden");
              }
            }
            function Si(e) {
              e.hasFocus() ||
                (e.display.input.focus(), e.state.focused || Ai(e));
            }
            function Fi(e) {
              (e.state.delayingBlurEvent = !0),
                setTimeout(function () {
                  e.state.delayingBlurEvent &&
                    ((e.state.delayingBlurEvent = !1),
                    e.state.focused && Ei(e));
                }, 100);
            }
            function Ai(e, t) {
              e.state.delayingBlurEvent &&
                !e.state.draggingText &&
                (e.state.delayingBlurEvent = !1),
                "nocursor" != e.options.readOnly &&
                  (e.state.focused ||
                    (ve(e, "focus", e, t),
                    (e.state.focused = !0),
                    O(e.display.wrapper, "CodeMirror-focused"),
                    e.curOp ||
                      e.display.selForContextMenu == e.doc.sel ||
                      (e.display.input.reset(),
                      s &&
                        setTimeout(function () {
                          return e.display.input.reset(!0);
                        }, 20)),
                    e.display.input.receivedFocus()),
                  ki(e));
            }
            function Ei(e, t) {
              e.state.delayingBlurEvent ||
                (e.state.focused &&
                  (ve(e, "blur", e, t),
                  (e.state.focused = !1),
                  A(e.display.wrapper, "CodeMirror-focused")),
                clearInterval(e.display.blinker),
                setTimeout(function () {
                  e.state.focused || (e.display.shift = !1);
                }, 150));
            }
            function Li(e) {
              for (
                var t = e.display,
                  n = t.lineDiv.offsetTop,
                  i = Math.max(0, t.scroller.getBoundingClientRect().top),
                  r = t.lineDiv.getBoundingClientRect().top,
                  o = 0,
                  s = 0;
                s < t.view.length;
                s++
              ) {
                var u = t.view[s],
                  c = e.options.lineWrapping,
                  d = void 0,
                  h = 0;
                if (!u.hidden) {
                  if (((r += u.line.height), a && l < 8)) {
                    var f = u.node.offsetTop + u.node.offsetHeight;
                    (d = f - n), (n = f);
                  } else {
                    var p = u.node.getBoundingClientRect();
                    (d = p.bottom - p.top),
                      !c &&
                        u.text.firstChild &&
                        (h =
                          u.text.firstChild.getBoundingClientRect().right -
                          p.left -
                          1);
                  }
                  var m = u.line.height - d;
                  if (
                    (m > 0.005 || m < -0.005) &&
                    (r < i && (o -= m), Qe(u.line, d), Ti(u.line), u.rest)
                  )
                    for (var g = 0; g < u.rest.length; g++) Ti(u.rest[g]);
                  if (h > e.display.sizerWidth) {
                    var v = Math.ceil(h / li(e.display));
                    v > e.display.maxLineLength &&
                      ((e.display.maxLineLength = v),
                      (e.display.maxLine = u.line),
                      (e.display.maxLineChanged = !0));
                  }
                }
              }
              Math.abs(o) > 2 && (t.scroller.scrollTop += o);
            }
            function Ti(e) {
              if (e.widgets)
                for (var t = 0; t < e.widgets.length; ++t) {
                  var n = e.widgets[t],
                    i = n.node.parentNode;
                  i && (n.height = i.offsetHeight);
                }
            }
            function Mi(e, t, n) {
              var i =
                n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
              i = Math.floor(i - Fn(e));
              var r =
                  n && null != n.bottom ? n.bottom : i + e.wrapper.clientHeight,
                o = et(t, i),
                a = et(t, r);
              if (n && n.ensure) {
                var l = n.ensure.from.line,
                  s = n.ensure.to.line;
                l < o
                  ? ((o = l),
                    (a = et(t, Gt(Ke(t, l)) + e.wrapper.clientHeight)))
                  : Math.min(s, t.lastLine()) >= a &&
                    ((o = et(t, Gt(Ke(t, s)) - e.wrapper.clientHeight)),
                    (a = s));
              }
              return { from: o, to: Math.max(a, o + 1) };
            }
            function Bi(e, t) {
              var n = e.display,
                i = ai(e.display);
              t.top < 0 && (t.top = 0);
              var r =
                  e.curOp && null != e.curOp.scrollTop
                    ? e.curOp.scrollTop
                    : n.scroller.scrollTop,
                o = Mn(e),
                a = {};
              t.bottom - t.top > o && (t.bottom = t.top + o);
              var l = e.doc.height + An(n),
                s = t.top < i,
                u = t.bottom > l - i;
              if (t.top < r) a.scrollTop = s ? 0 : t.top;
              else if (t.bottom > r + o) {
                var c = Math.min(t.top, (u ? l : t.bottom) - o);
                c != r && (a.scrollTop = c);
              }
              var d = e.options.fixedGutter ? 0 : n.gutters.offsetWidth,
                h =
                  e.curOp && null != e.curOp.scrollLeft
                    ? e.curOp.scrollLeft
                    : n.scroller.scrollLeft - d,
                f = Tn(e) - n.gutters.offsetWidth,
                p = t.right - t.left > f;
              return (
                p && (t.right = t.left + f),
                t.left < 10
                  ? (a.scrollLeft = 0)
                  : t.left < h
                  ? (a.scrollLeft = Math.max(0, t.left + d - (p ? 0 : 10)))
                  : t.right > f + h - 3 &&
                    (a.scrollLeft = t.right + (p ? 0 : 10) - f),
                a
              );
            }
            function Ni(e, t) {
              null != t &&
                (zi(e),
                (e.curOp.scrollTop =
                  (null == e.curOp.scrollTop
                    ? e.doc.scrollTop
                    : e.curOp.scrollTop) + t));
            }
            function Oi(e) {
              zi(e);
              var t = e.getCursor();
              e.curOp.scrollToPos = {
                from: t,
                to: t,
                margin: e.options.cursorScrollMargin,
              };
            }
            function Ii(e, t, n) {
              (null == t && null == n) || zi(e),
                null != t && (e.curOp.scrollLeft = t),
                null != n && (e.curOp.scrollTop = n);
            }
            function zi(e) {
              var t = e.curOp.scrollToPos;
              t &&
                ((e.curOp.scrollToPos = null),
                Hi(e, Yn(e, t.from), Yn(e, t.to), t.margin));
            }
            function Hi(e, t, n, i) {
              var r = Bi(e, {
                left: Math.min(t.left, n.left),
                top: Math.min(t.top, n.top) - i,
                right: Math.max(t.right, n.right),
                bottom: Math.max(t.bottom, n.bottom) + i,
              });
              Ii(e, r.scrollLeft, r.scrollTop);
            }
            function Ri(e, t) {
              Math.abs(e.doc.scrollTop - t) < 2 ||
                (n || hr(e, { top: t }), Pi(e, t, !0), n && hr(e), ar(e, 100));
            }
            function Pi(e, t, n) {
              (t = Math.max(
                0,
                Math.min(
                  e.display.scroller.scrollHeight -
                    e.display.scroller.clientHeight,
                  t
                )
              )),
                (e.display.scroller.scrollTop != t || n) &&
                  ((e.doc.scrollTop = t),
                  e.display.scrollbars.setScrollTop(t),
                  e.display.scroller.scrollTop != t &&
                    (e.display.scroller.scrollTop = t));
            }
            function _i(e, t, n, i) {
              (t = Math.max(
                0,
                Math.min(
                  t,
                  e.display.scroller.scrollWidth -
                    e.display.scroller.clientWidth
                )
              )),
                ((n
                  ? t == e.doc.scrollLeft
                  : Math.abs(e.doc.scrollLeft - t) < 2) &&
                  !i) ||
                  ((e.doc.scrollLeft = t),
                  mr(e),
                  e.display.scroller.scrollLeft != t &&
                    (e.display.scroller.scrollLeft = t),
                  e.display.scrollbars.setScrollLeft(t));
            }
            function Wi(e) {
              var t = e.display,
                n = t.gutters.offsetWidth,
                i = Math.round(e.doc.height + An(e.display));
              return {
                clientHeight: t.scroller.clientHeight,
                viewHeight: t.wrapper.clientHeight,
                scrollWidth: t.scroller.scrollWidth,
                clientWidth: t.scroller.clientWidth,
                viewWidth: t.wrapper.clientWidth,
                barLeft: e.options.fixedGutter ? n : 0,
                docHeight: i,
                scrollHeight: i + Ln(e) + t.barHeight,
                nativeBarWidth: t.nativeBarWidth,
                gutterWidth: n,
              };
            }
            var ji = function (e, t, n) {
              this.cm = n;
              var i = (this.vert = T(
                  "div",
                  [T("div", null, null, "min-width: 1px")],
                  "CodeMirror-vscrollbar"
                )),
                r = (this.horiz = T(
                  "div",
                  [T("div", null, null, "height: 100%; min-height: 1px")],
                  "CodeMirror-hscrollbar"
                ));
              (i.tabIndex = r.tabIndex = -1),
                e(i),
                e(r),
                pe(i, "scroll", function () {
                  i.clientHeight && t(i.scrollTop, "vertical");
                }),
                pe(r, "scroll", function () {
                  r.clientWidth && t(r.scrollLeft, "horizontal");
                }),
                (this.checkedZeroWidth = !1),
                a &&
                  l < 8 &&
                  (this.horiz.style.minHeight = this.vert.style.minWidth =
                    "18px");
            };
            (ji.prototype.update = function (e) {
              var t = e.scrollWidth > e.clientWidth + 1,
                n = e.scrollHeight > e.clientHeight + 1,
                i = e.nativeBarWidth;
              if (n) {
                (this.vert.style.display = "block"),
                  (this.vert.style.bottom = t ? i + "px" : "0");
                var r = e.viewHeight - (t ? i : 0);
                this.vert.firstChild.style.height =
                  Math.max(0, e.scrollHeight - e.clientHeight + r) + "px";
              } else
                (this.vert.scrollTop = 0),
                  (this.vert.style.display = ""),
                  (this.vert.firstChild.style.height = "0");
              if (t) {
                (this.horiz.style.display = "block"),
                  (this.horiz.style.right = n ? i + "px" : "0"),
                  (this.horiz.style.left = e.barLeft + "px");
                var o = e.viewWidth - e.barLeft - (n ? i : 0);
                this.horiz.firstChild.style.width =
                  Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
              } else
                (this.horiz.style.display = ""),
                  (this.horiz.firstChild.style.width = "0");
              return (
                !this.checkedZeroWidth &&
                  e.clientHeight > 0 &&
                  (0 == i && this.zeroWidthHack(),
                  (this.checkedZeroWidth = !0)),
                { right: n ? i : 0, bottom: t ? i : 0 }
              );
            }),
              (ji.prototype.setScrollLeft = function (e) {
                this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
                  this.disableHoriz &&
                    this.enableZeroWidthBar(
                      this.horiz,
                      this.disableHoriz,
                      "horiz"
                    );
              }),
              (ji.prototype.setScrollTop = function (e) {
                this.vert.scrollTop != e && (this.vert.scrollTop = e),
                  this.disableVert &&
                    this.enableZeroWidthBar(
                      this.vert,
                      this.disableVert,
                      "vert"
                    );
              }),
              (ji.prototype.zeroWidthHack = function () {
                var e = y && !p ? "12px" : "18px";
                (this.horiz.style.height = this.vert.style.width = e),
                  (this.horiz.style.visibility = this.vert.style.visibility =
                    "hidden"),
                  (this.disableHoriz = new j()),
                  (this.disableVert = new j());
              }),
              (ji.prototype.enableZeroWidthBar = function (e, t, n) {
                (e.style.visibility = ""),
                  t.set(1e3, function i() {
                    var r = e.getBoundingClientRect();
                    ("vert" == n
                      ? document.elementFromPoint(
                          r.right - 1,
                          (r.top + r.bottom) / 2
                        )
                      : document.elementFromPoint(
                          (r.right + r.left) / 2,
                          r.bottom - 1
                        )) != e
                      ? (e.style.visibility = "hidden")
                      : t.set(1e3, i);
                  });
              }),
              (ji.prototype.clear = function () {
                var e = this.horiz.parentNode;
                e.removeChild(this.horiz), e.removeChild(this.vert);
              });
            var qi = function () {};
            function Ui(e, t) {
              t || (t = Wi(e));
              var n = e.display.barWidth,
                i = e.display.barHeight;
              $i(e, t);
              for (
                var r = 0;
                (r < 4 && n != e.display.barWidth) || i != e.display.barHeight;
                r++
              )
                n != e.display.barWidth && e.options.lineWrapping && Li(e),
                  $i(e, Wi(e)),
                  (n = e.display.barWidth),
                  (i = e.display.barHeight);
            }
            function $i(e, t) {
              var n = e.display,
                i = n.scrollbars.update(t);
              (n.sizer.style.paddingRight = (n.barWidth = i.right) + "px"),
                (n.sizer.style.paddingBottom = (n.barHeight = i.bottom) + "px"),
                (n.heightForcer.style.borderBottom =
                  i.bottom + "px solid transparent"),
                i.right && i.bottom
                  ? ((n.scrollbarFiller.style.display = "block"),
                    (n.scrollbarFiller.style.height = i.bottom + "px"),
                    (n.scrollbarFiller.style.width = i.right + "px"))
                  : (n.scrollbarFiller.style.display = ""),
                i.bottom &&
                e.options.coverGutterNextToScrollbar &&
                e.options.fixedGutter
                  ? ((n.gutterFiller.style.display = "block"),
                    (n.gutterFiller.style.height = i.bottom + "px"),
                    (n.gutterFiller.style.width = t.gutterWidth + "px"))
                  : (n.gutterFiller.style.display = "");
            }
            (qi.prototype.update = function () {
              return { bottom: 0, right: 0 };
            }),
              (qi.prototype.setScrollLeft = function () {}),
              (qi.prototype.setScrollTop = function () {}),
              (qi.prototype.clear = function () {});
            var Gi = { native: ji, null: qi };
            function Vi(e) {
              e.display.scrollbars &&
                (e.display.scrollbars.clear(),
                e.display.scrollbars.addClass &&
                  A(e.display.wrapper, e.display.scrollbars.addClass)),
                (e.display.scrollbars = new Gi[e.options.scrollbarStyle](
                  function (t) {
                    e.display.wrapper.insertBefore(
                      t,
                      e.display.scrollbarFiller
                    ),
                      pe(t, "mousedown", function () {
                        e.state.focused &&
                          setTimeout(function () {
                            return e.display.input.focus();
                          }, 0);
                      }),
                      t.setAttribute("cm-not-content", "true");
                  },
                  function (t, n) {
                    "horizontal" == n ? _i(e, t) : Ri(e, t);
                  },
                  e
                )),
                e.display.scrollbars.addClass &&
                  O(e.display.wrapper, e.display.scrollbars.addClass);
            }
            var Xi = 0;
            function Ki(e) {
              var t;
              (e.curOp = {
                cm: e,
                viewChanged: !1,
                startHeight: e.doc.height,
                forceUpdate: !1,
                updateInput: 0,
                typing: !1,
                changeObjs: null,
                cursorActivityHandlers: null,
                cursorActivityCalled: 0,
                selectionChanged: !1,
                updateMaxLine: !1,
                scrollLeft: null,
                scrollTop: null,
                scrollToPos: null,
                focus: !1,
                id: ++Xi,
                markArrays: null,
              }),
                (t = e.curOp),
                un
                  ? un.ops.push(t)
                  : (t.ownsGroup = un = { ops: [t], delayedCallbacks: [] });
            }
            function Zi(e) {
              var t = e.curOp;
              t &&
                (function (e, t) {
                  var n = e.ownsGroup;
                  if (n)
                    try {
                      !(function (e) {
                        var t = e.delayedCallbacks,
                          n = 0;
                        do {
                          for (; n < t.length; n++) t[n].call(null);
                          for (var i = 0; i < e.ops.length; i++) {
                            var r = e.ops[i];
                            if (r.cursorActivityHandlers)
                              for (
                                ;
                                r.cursorActivityCalled <
                                r.cursorActivityHandlers.length;

                              )
                                r.cursorActivityHandlers[
                                  r.cursorActivityCalled++
                                ].call(null, r.cm);
                          }
                        } while (n < t.length);
                      })(n);
                    } finally {
                      (un = null), t(n);
                    }
                })(t, function (e) {
                  for (var t = 0; t < e.ops.length; t++)
                    e.ops[t].cm.curOp = null;
                  !(function (e) {
                    for (var t = e.ops, n = 0; n < t.length; n++) Yi(t[n]);
                    for (var i = 0; i < t.length; i++) Qi(t[i]);
                    for (var r = 0; r < t.length; r++) Ji(t[r]);
                    for (var o = 0; o < t.length; o++) er(t[o]);
                    for (var a = 0; a < t.length; a++) tr(t[a]);
                  })(e);
                });
            }
            function Yi(e) {
              var t = e.cm,
                n = t.display;
              !(function (e) {
                var t = e.display;
                !t.scrollbarsClipped &&
                  t.scroller.offsetWidth &&
                  ((t.nativeBarWidth =
                    t.scroller.offsetWidth - t.scroller.clientWidth),
                  (t.heightForcer.style.height = Ln(e) + "px"),
                  (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
                  (t.sizer.style.borderRightWidth = Ln(e) + "px"),
                  (t.scrollbarsClipped = !0));
              })(t),
                e.updateMaxLine && Xt(t),
                (e.mustUpdate =
                  e.viewChanged ||
                  e.forceUpdate ||
                  null != e.scrollTop ||
                  (e.scrollToPos &&
                    (e.scrollToPos.from.line < n.viewFrom ||
                      e.scrollToPos.to.line >= n.viewTo)) ||
                  (n.maxLineChanged && t.options.lineWrapping)),
                (e.update =
                  e.mustUpdate &&
                  new sr(
                    t,
                    e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
                    e.forceUpdate
                  ));
            }
            function Qi(e) {
              e.updatedDisplay = e.mustUpdate && cr(e.cm, e.update);
            }
            function Ji(e) {
              var t = e.cm,
                n = t.display;
              e.updatedDisplay && Li(t),
                (e.barMeasure = Wi(t)),
                n.maxLineChanged &&
                  !t.options.lineWrapping &&
                  ((e.adjustWidthTo =
                    Nn(t, n.maxLine, n.maxLine.text.length).left + 3),
                  (t.display.sizerWidth = e.adjustWidthTo),
                  (e.barMeasure.scrollWidth = Math.max(
                    n.scroller.clientWidth,
                    n.sizer.offsetLeft +
                      e.adjustWidthTo +
                      Ln(t) +
                      t.display.barWidth
                  )),
                  (e.maxScrollLeft = Math.max(
                    0,
                    n.sizer.offsetLeft + e.adjustWidthTo - Tn(t)
                  ))),
                (e.updatedDisplay || e.selectionChanged) &&
                  (e.preparedSelection = n.input.prepareSelection());
            }
            function er(e) {
              var t = e.cm;
              null != e.adjustWidthTo &&
                ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
                e.maxScrollLeft < t.doc.scrollLeft &&
                  _i(
                    t,
                    Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft),
                    !0
                  ),
                (t.display.maxLineChanged = !1));
              var n = e.focus && e.focus == N(H(t));
              e.preparedSelection &&
                t.display.input.showSelection(e.preparedSelection, n),
                (e.updatedDisplay || e.startHeight != t.doc.height) &&
                  Ui(t, e.barMeasure),
                e.updatedDisplay && pr(t, e.barMeasure),
                e.selectionChanged && ki(t),
                t.state.focused &&
                  e.updateInput &&
                  t.display.input.reset(e.typing),
                n && Si(e.cm);
            }
            function tr(e) {
              var t = e.cm,
                n = t.display,
                i = t.doc;
              if (
                (e.updatedDisplay && dr(t, e.update),
                null == n.wheelStartX ||
                  (null == e.scrollTop &&
                    null == e.scrollLeft &&
                    !e.scrollToPos) ||
                  (n.wheelStartX = n.wheelStartY = null),
                null != e.scrollTop && Pi(t, e.scrollTop, e.forceScroll),
                null != e.scrollLeft && _i(t, e.scrollLeft, !0, !0),
                e.scrollToPos)
              ) {
                var r = (function (e, t, n, i) {
                  var r;
                  null == i && (i = 0),
                    e.options.lineWrapping ||
                      t != n ||
                      ((n =
                        "before" == t.sticky
                          ? it(t.line, t.ch + 1, "before")
                          : t),
                      (t = t.ch
                        ? it(
                            t.line,
                            "before" == t.sticky ? t.ch - 1 : t.ch,
                            "after"
                          )
                        : t));
                  for (var o = 0; o < 5; o++) {
                    var a = !1,
                      l = Zn(e, t),
                      s = n && n != t ? Zn(e, n) : l,
                      u = Bi(
                        e,
                        (r = {
                          left: Math.min(l.left, s.left),
                          top: Math.min(l.top, s.top) - i,
                          right: Math.max(l.left, s.left),
                          bottom: Math.max(l.bottom, s.bottom) + i,
                        })
                      ),
                      c = e.doc.scrollTop,
                      d = e.doc.scrollLeft;
                    if (
                      (null != u.scrollTop &&
                        (Ri(e, u.scrollTop),
                        Math.abs(e.doc.scrollTop - c) > 1 && (a = !0)),
                      null != u.scrollLeft &&
                        (_i(e, u.scrollLeft),
                        Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)),
                      !a)
                    )
                      break;
                  }
                  return r;
                })(
                  t,
                  ct(i, e.scrollToPos.from),
                  ct(i, e.scrollToPos.to),
                  e.scrollToPos.margin
                );
                !(function (e, t) {
                  if (!xe(e, "scrollCursorIntoView")) {
                    var n = e.display,
                      i = n.sizer.getBoundingClientRect(),
                      r = null,
                      o = n.wrapper.ownerDocument;
                    if (
                      (t.top + i.top < 0
                        ? (r = !0)
                        : t.bottom + i.top >
                            (o.defaultView.innerHeight ||
                              o.documentElement.clientHeight) && (r = !1),
                      null != r && !m)
                    ) {
                      var a = T(
                        "div",
                        "​",
                        null,
                        "position: absolute;\n                         top: " +
                          (t.top - n.viewOffset - Fn(e.display)) +
                          "px;\n                         height: " +
                          (t.bottom - t.top + Ln(e) + n.barHeight) +
                          "px;\n                         left: " +
                          t.left +
                          "px; width: " +
                          Math.max(2, t.right - t.left) +
                          "px;"
                      );
                      e.display.lineSpace.appendChild(a),
                        a.scrollIntoView(r),
                        e.display.lineSpace.removeChild(a);
                    }
                  }
                })(t, r);
              }
              var o = e.maybeHiddenMarkers,
                a = e.maybeUnhiddenMarkers;
              if (o)
                for (var l = 0; l < o.length; ++l)
                  o[l].lines.length || ve(o[l], "hide");
              if (a)
                for (var s = 0; s < a.length; ++s)
                  a[s].lines.length && ve(a[s], "unhide");
              n.wrapper.offsetHeight &&
                (i.scrollTop = t.display.scroller.scrollTop),
                e.changeObjs && ve(t, "changes", t, e.changeObjs),
                e.update && e.update.finish();
            }
            function nr(e, t) {
              if (e.curOp) return t();
              Ki(e);
              try {
                return t();
              } finally {
                Zi(e);
              }
            }
            function ir(e, t) {
              return function () {
                if (e.curOp) return t.apply(e, arguments);
                Ki(e);
                try {
                  return t.apply(e, arguments);
                } finally {
                  Zi(e);
                }
              };
            }
            function rr(e) {
              return function () {
                if (this.curOp) return e.apply(this, arguments);
                Ki(this);
                try {
                  return e.apply(this, arguments);
                } finally {
                  Zi(this);
                }
              };
            }
            function or(e) {
              return function () {
                var t = this.cm;
                if (!t || t.curOp) return e.apply(this, arguments);
                Ki(t);
                try {
                  return e.apply(this, arguments);
                } finally {
                  Zi(t);
                }
              };
            }
            function ar(e, t) {
              e.doc.highlightFrontier < e.display.viewTo &&
                e.state.highlight.set(t, P(lr, e));
            }
            function lr(e) {
              var t = e.doc;
              if (!(t.highlightFrontier >= e.display.viewTo)) {
                var n = +new Date() + e.options.workTime,
                  i = gt(e, t.highlightFrontier),
                  r = [];
                t.iter(
                  i.line,
                  Math.min(t.first + t.size, e.display.viewTo + 500),
                  function (o) {
                    if (i.line >= e.display.viewFrom) {
                      var a = o.styles,
                        l =
                          o.text.length > e.options.maxHighlightLength
                            ? $e(t.mode, i.state)
                            : null,
                        s = pt(e, o, i, !0);
                      l && (i.state = l), (o.styles = s.styles);
                      var u = o.styleClasses,
                        c = s.classes;
                      c ? (o.styleClasses = c) : u && (o.styleClasses = null);
                      for (
                        var d =
                            !a ||
                            a.length != o.styles.length ||
                            (u != c &&
                              (!u ||
                                !c ||
                                u.bgClass != c.bgClass ||
                                u.textClass != c.textClass)),
                          h = 0;
                        !d && h < a.length;
                        ++h
                      )
                        d = a[h] != o.styles[h];
                      d && r.push(i.line),
                        (o.stateAfter = i.save()),
                        i.nextLine();
                    } else
                      o.text.length <= e.options.maxHighlightLength &&
                        vt(e, o.text, i),
                        (o.stateAfter = i.line % 5 == 0 ? i.save() : null),
                        i.nextLine();
                    if (+new Date() > n) return ar(e, e.options.workDelay), !0;
                  }
                ),
                  (t.highlightFrontier = i.line),
                  (t.modeFrontier = Math.max(t.modeFrontier, i.line)),
                  r.length &&
                    nr(e, function () {
                      for (var t = 0; t < r.length; t++) mi(e, r[t], "text");
                    });
              }
            }
            var sr = function (e, t, n) {
              var i = e.display;
              (this.viewport = t),
                (this.visible = Mi(i, e.doc, t)),
                (this.editorIsHidden = !i.wrapper.offsetWidth),
                (this.wrapperHeight = i.wrapper.clientHeight),
                (this.wrapperWidth = i.wrapper.clientWidth),
                (this.oldDisplayWidth = Tn(e)),
                (this.force = n),
                (this.dims = si(e)),
                (this.events = []);
            };
            function ur(e) {
              if (e.hasFocus()) return null;
              var t = N(H(e));
              if (!t || !B(e.display.lineDiv, t)) return null;
              var n = { activeElt: t };
              if (window.getSelection) {
                var i = R(e).getSelection();
                i.anchorNode &&
                  i.extend &&
                  B(e.display.lineDiv, i.anchorNode) &&
                  ((n.anchorNode = i.anchorNode),
                  (n.anchorOffset = i.anchorOffset),
                  (n.focusNode = i.focusNode),
                  (n.focusOffset = i.focusOffset));
              }
              return n;
            }
            function cr(e, t) {
              var n = e.display,
                i = e.doc;
              if (t.editorIsHidden) return gi(e), !1;
              if (
                !t.force &&
                t.visible.from >= n.viewFrom &&
                t.visible.to <= n.viewTo &&
                (null == n.updateLineNumbers ||
                  n.updateLineNumbers >= n.viewTo) &&
                n.renderedView == n.view &&
                0 == xi(e)
              )
                return !1;
              gr(e) && (gi(e), (t.dims = si(e)));
              var r = i.first + i.size,
                o = Math.max(
                  t.visible.from - e.options.viewportMargin,
                  i.first
                ),
                a = Math.min(r, t.visible.to + e.options.viewportMargin);
              n.viewFrom < o &&
                o - n.viewFrom < 20 &&
                (o = Math.max(i.first, n.viewFrom)),
                n.viewTo > a &&
                  n.viewTo - a < 20 &&
                  (a = Math.min(r, n.viewTo)),
                St && ((o = jt(e.doc, o)), (a = qt(e.doc, a)));
              var l =
                o != n.viewFrom ||
                a != n.viewTo ||
                n.lastWrapHeight != t.wrapperHeight ||
                n.lastWrapWidth != t.wrapperWidth;
              !(function (e, t, n) {
                var i = e.display;
                0 == i.view.length || t >= i.viewTo || n <= i.viewFrom
                  ? ((i.view = sn(e, t, n)), (i.viewFrom = t))
                  : (i.viewFrom > t
                      ? (i.view = sn(e, t, i.viewFrom).concat(i.view))
                      : i.viewFrom < t && (i.view = i.view.slice(fi(e, t))),
                    (i.viewFrom = t),
                    i.viewTo < n
                      ? (i.view = i.view.concat(sn(e, i.viewTo, n)))
                      : i.viewTo > n && (i.view = i.view.slice(0, fi(e, n)))),
                  (i.viewTo = n);
              })(e, o, a),
                (n.viewOffset = Gt(Ke(e.doc, n.viewFrom))),
                (e.display.mover.style.top = n.viewOffset + "px");
              var u = xi(e);
              if (
                !l &&
                0 == u &&
                !t.force &&
                n.renderedView == n.view &&
                (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)
              )
                return !1;
              var c = ur(e);
              return (
                u > 4 && (n.lineDiv.style.display = "none"),
                (function (e, t, n) {
                  var i = e.display,
                    r = e.options.lineNumbers,
                    o = i.lineDiv,
                    a = o.firstChild;
                  function l(t) {
                    var n = t.nextSibling;
                    return (
                      s && y && e.display.currentWheelTarget == t
                        ? (t.style.display = "none")
                        : t.parentNode.removeChild(t),
                      n
                    );
                  }
                  for (
                    var u = i.view, c = i.viewFrom, d = 0;
                    d < u.length;
                    d++
                  ) {
                    var h = u[d];
                    if (h.hidden);
                    else if (h.node && h.node.parentNode == o) {
                      for (; a != h.node; ) a = l(a);
                      var f = r && null != t && t <= c && h.lineNumber;
                      h.changes &&
                        (q(h.changes, "gutter") > -1 && (f = !1),
                        fn(e, h, c, n)),
                        f &&
                          (E(h.lineNumber),
                          h.lineNumber.appendChild(
                            document.createTextNode(nt(e.options, c))
                          )),
                        (a = h.node.nextSibling);
                    } else {
                      var p = bn(e, h, c, n);
                      o.insertBefore(p, a);
                    }
                    c += h.size;
                  }
                  for (; a; ) a = l(a);
                })(e, n.updateLineNumbers, t.dims),
                u > 4 && (n.lineDiv.style.display = ""),
                (n.renderedView = n.view),
                (function (e) {
                  if (
                    e &&
                    e.activeElt &&
                    e.activeElt != N(e.activeElt.ownerDocument) &&
                    (e.activeElt.focus(),
                    !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) &&
                      e.anchorNode &&
                      B(document.body, e.anchorNode) &&
                      B(document.body, e.focusNode))
                  ) {
                    var t = e.activeElt.ownerDocument,
                      n = t.defaultView.getSelection(),
                      i = t.createRange();
                    i.setEnd(e.anchorNode, e.anchorOffset),
                      i.collapse(!1),
                      n.removeAllRanges(),
                      n.addRange(i),
                      n.extend(e.focusNode, e.focusOffset);
                  }
                })(c),
                E(n.cursorDiv),
                E(n.selectionDiv),
                (n.gutters.style.height = n.sizer.style.minHeight = 0),
                l &&
                  ((n.lastWrapHeight = t.wrapperHeight),
                  (n.lastWrapWidth = t.wrapperWidth),
                  ar(e, 400)),
                (n.updateLineNumbers = null),
                !0
              );
            }
            function dr(e, t) {
              for (var n = t.viewport, i = !0; ; i = !1) {
                if (i && e.options.lineWrapping && t.oldDisplayWidth != Tn(e))
                  i && (t.visible = Mi(e.display, e.doc, n));
                else if (
                  (n &&
                    null != n.top &&
                    (n = {
                      top: Math.min(
                        e.doc.height + An(e.display) - Mn(e),
                        n.top
                      ),
                    }),
                  (t.visible = Mi(e.display, e.doc, n)),
                  t.visible.from >= e.display.viewFrom &&
                    t.visible.to <= e.display.viewTo)
                )
                  break;
                if (!cr(e, t)) break;
                Li(e);
                var r = Wi(e);
                yi(e), Ui(e, r), pr(e, r), (t.force = !1);
              }
              t.signal(e, "update", e),
                (e.display.viewFrom == e.display.reportedViewFrom &&
                  e.display.viewTo == e.display.reportedViewTo) ||
                  (t.signal(
                    e,
                    "viewportChange",
                    e,
                    e.display.viewFrom,
                    e.display.viewTo
                  ),
                  (e.display.reportedViewFrom = e.display.viewFrom),
                  (e.display.reportedViewTo = e.display.viewTo));
            }
            function hr(e, t) {
              var n = new sr(e, t);
              if (cr(e, n)) {
                Li(e), dr(e, n);
                var i = Wi(e);
                yi(e), Ui(e, i), pr(e, i), n.finish();
              }
            }
            function fr(e) {
              var t = e.gutters.offsetWidth;
              (e.sizer.style.marginLeft = t + "px"), dn(e, "gutterChanged", e);
            }
            function pr(e, t) {
              (e.display.sizer.style.minHeight = t.docHeight + "px"),
                (e.display.heightForcer.style.top = t.docHeight + "px"),
                (e.display.gutters.style.height =
                  t.docHeight + e.display.barHeight + Ln(e) + "px");
            }
            function mr(e) {
              var t = e.display,
                n = t.view;
              if (
                t.alignWidgets ||
                (t.gutters.firstChild && e.options.fixedGutter)
              ) {
                for (
                  var i = ui(t) - t.scroller.scrollLeft + e.doc.scrollLeft,
                    r = t.gutters.offsetWidth,
                    o = i + "px",
                    a = 0;
                  a < n.length;
                  a++
                )
                  if (!n[a].hidden) {
                    e.options.fixedGutter &&
                      (n[a].gutter && (n[a].gutter.style.left = o),
                      n[a].gutterBackground &&
                        (n[a].gutterBackground.style.left = o));
                    var l = n[a].alignable;
                    if (l)
                      for (var s = 0; s < l.length; s++) l[s].style.left = o;
                  }
                e.options.fixedGutter && (t.gutters.style.left = i + r + "px");
              }
            }
            function gr(e) {
              if (!e.options.lineNumbers) return !1;
              var t = e.doc,
                n = nt(e.options, t.first + t.size - 1),
                i = e.display;
              if (n.length != i.lineNumChars) {
                var r = i.measure.appendChild(
                    T(
                      "div",
                      [T("div", n)],
                      "CodeMirror-linenumber CodeMirror-gutter-elt"
                    )
                  ),
                  o = r.firstChild.offsetWidth,
                  a = r.offsetWidth - o;
                return (
                  (i.lineGutter.style.width = ""),
                  (i.lineNumInnerWidth =
                    Math.max(o, i.lineGutter.offsetWidth - a) + 1),
                  (i.lineNumWidth = i.lineNumInnerWidth + a),
                  (i.lineNumChars = i.lineNumInnerWidth ? n.length : -1),
                  (i.lineGutter.style.width = i.lineNumWidth + "px"),
                  fr(e.display),
                  !0
                );
              }
              return !1;
            }
            function vr(e, t) {
              for (var n = [], i = !1, r = 0; r < e.length; r++) {
                var o = e[r],
                  a = null;
                if (
                  ("string" != typeof o && ((a = o.style), (o = o.className)),
                  "CodeMirror-linenumbers" == o)
                ) {
                  if (!t) continue;
                  i = !0;
                }
                n.push({ className: o, style: a });
              }
              return (
                t &&
                  !i &&
                  n.push({ className: "CodeMirror-linenumbers", style: null }),
                n
              );
            }
            function xr(e) {
              var t = e.gutters,
                n = e.gutterSpecs;
              E(t), (e.lineGutter = null);
              for (var i = 0; i < n.length; ++i) {
                var r = n[i],
                  o = r.className,
                  a = r.style,
                  l = t.appendChild(T("div", null, "CodeMirror-gutter " + o));
                a && (l.style.cssText = a),
                  "CodeMirror-linenumbers" == o &&
                    ((e.lineGutter = l),
                    (l.style.width = (e.lineNumWidth || 1) + "px"));
              }
              (t.style.display = n.length ? "" : "none"), fr(e);
            }
            function yr(e) {
              xr(e.display), pi(e), mr(e);
            }
            function br(e, t, i, r) {
              var o = this;
              (this.input = i),
                (o.scrollbarFiller = T(
                  "div",
                  null,
                  "CodeMirror-scrollbar-filler"
                )),
                o.scrollbarFiller.setAttribute("cm-not-content", "true"),
                (o.gutterFiller = T("div", null, "CodeMirror-gutter-filler")),
                o.gutterFiller.setAttribute("cm-not-content", "true"),
                (o.lineDiv = M("div", null, "CodeMirror-code")),
                (o.selectionDiv = T(
                  "div",
                  null,
                  null,
                  "position: relative; z-index: 1"
                )),
                (o.cursorDiv = T("div", null, "CodeMirror-cursors")),
                (o.measure = T("div", null, "CodeMirror-measure")),
                (o.lineMeasure = T("div", null, "CodeMirror-measure")),
                (o.lineSpace = M(
                  "div",
                  [
                    o.measure,
                    o.lineMeasure,
                    o.selectionDiv,
                    o.cursorDiv,
                    o.lineDiv,
                  ],
                  null,
                  "position: relative; outline: none"
                ));
              var u = M("div", [o.lineSpace], "CodeMirror-lines");
              (o.mover = T("div", [u], null, "position: relative")),
                (o.sizer = T("div", [o.mover], "CodeMirror-sizer")),
                (o.sizerWidth = null),
                (o.heightForcer = T(
                  "div",
                  null,
                  null,
                  "position: absolute; height: 50px; width: 1px;"
                )),
                (o.gutters = T("div", null, "CodeMirror-gutters")),
                (o.lineGutter = null),
                (o.scroller = T(
                  "div",
                  [o.sizer, o.heightForcer, o.gutters],
                  "CodeMirror-scroll"
                )),
                o.scroller.setAttribute("tabIndex", "-1"),
                (o.wrapper = T(
                  "div",
                  [o.scrollbarFiller, o.gutterFiller, o.scroller],
                  "CodeMirror"
                )),
                c && d >= 105 && (o.wrapper.style.clipPath = "inset(0px)"),
                o.wrapper.setAttribute("translate", "no"),
                a &&
                  l < 8 &&
                  ((o.gutters.style.zIndex = -1),
                  (o.scroller.style.paddingRight = 0)),
                s || (n && x) || (o.scroller.draggable = !0),
                e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)),
                (o.viewFrom = o.viewTo = t.first),
                (o.reportedViewFrom = o.reportedViewTo = t.first),
                (o.view = []),
                (o.renderedView = null),
                (o.externalMeasured = null),
                (o.viewOffset = 0),
                (o.lastWrapHeight = o.lastWrapWidth = 0),
                (o.updateLineNumbers = null),
                (o.nativeBarWidth = o.barHeight = o.barWidth = 0),
                (o.scrollbarsClipped = !1),
                (o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null),
                (o.alignWidgets = !1),
                (o.cachedCharWidth =
                  o.cachedTextHeight =
                  o.cachedPaddingH =
                    null),
                (o.maxLine = null),
                (o.maxLineLength = 0),
                (o.maxLineChanged = !1),
                (o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null),
                (o.shift = !1),
                (o.selForContextMenu = null),
                (o.activeTouch = null),
                (o.gutterSpecs = vr(r.gutters, r.lineNumbers)),
                xr(o),
                i.init(o);
            }
            (sr.prototype.signal = function (e, t) {
              be(e, t) && this.events.push(arguments);
            }),
              (sr.prototype.finish = function () {
                for (var e = 0; e < this.events.length; e++)
                  ve.apply(null, this.events[e]);
              });
            var Dr = 0,
              Cr = null;
            function wr(e) {
              var t = e.wheelDeltaX,
                n = e.wheelDeltaY;
              return (
                null == t &&
                  e.detail &&
                  e.axis == e.HORIZONTAL_AXIS &&
                  (t = e.detail),
                null == n && e.detail && e.axis == e.VERTICAL_AXIS
                  ? (n = e.detail)
                  : null == n && (n = e.wheelDelta),
                { x: t, y: n }
              );
            }
            function kr(e) {
              var t = wr(e);
              return (t.x *= Cr), (t.y *= Cr), t;
            }
            function Sr(e, t) {
              c &&
                102 == d &&
                (null == e.display.chromeScrollHack
                  ? (e.display.sizer.style.pointerEvents = "none")
                  : clearTimeout(e.display.chromeScrollHack),
                (e.display.chromeScrollHack = setTimeout(function () {
                  (e.display.chromeScrollHack = null),
                    (e.display.sizer.style.pointerEvents = "");
                }, 100)));
              var i = wr(t),
                r = i.x,
                o = i.y,
                a = Cr;
              0 === t.deltaMode && ((r = t.deltaX), (o = t.deltaY), (a = 1));
              var l = e.display,
                u = l.scroller,
                f = u.scrollWidth > u.clientWidth,
                p = u.scrollHeight > u.clientHeight;
              if ((r && f) || (o && p)) {
                if (o && y && s)
                  e: for (
                    var m = t.target, g = l.view;
                    m != u;
                    m = m.parentNode
                  )
                    for (var v = 0; v < g.length; v++)
                      if (g[v].node == m) {
                        e.display.currentWheelTarget = m;
                        break e;
                      }
                if (r && !n && !h && null != a)
                  return (
                    o && p && Ri(e, Math.max(0, u.scrollTop + o * a)),
                    _i(e, Math.max(0, u.scrollLeft + r * a)),
                    (!o || (o && p)) && Ce(t),
                    void (l.wheelStartX = null)
                  );
                if (o && null != a) {
                  var x = o * a,
                    b = e.doc.scrollTop,
                    D = b + l.wrapper.clientHeight;
                  x < 0
                    ? (b = Math.max(0, b + x - 50))
                    : (D = Math.min(e.doc.height, D + x + 50)),
                    hr(e, { top: b, bottom: D });
                }
                Dr < 20 &&
                  0 !== t.deltaMode &&
                  (null == l.wheelStartX
                    ? ((l.wheelStartX = u.scrollLeft),
                      (l.wheelStartY = u.scrollTop),
                      (l.wheelDX = r),
                      (l.wheelDY = o),
                      setTimeout(function () {
                        if (null != l.wheelStartX) {
                          var e = u.scrollLeft - l.wheelStartX,
                            t = u.scrollTop - l.wheelStartY,
                            n =
                              (t && l.wheelDY && t / l.wheelDY) ||
                              (e && l.wheelDX && e / l.wheelDX);
                          (l.wheelStartX = l.wheelStartY = null),
                            n && ((Cr = (Cr * Dr + n) / (Dr + 1)), ++Dr);
                        }
                      }, 200))
                    : ((l.wheelDX += r), (l.wheelDY += o)));
              }
            }
            a
              ? (Cr = -0.53)
              : n
              ? (Cr = 15)
              : c
              ? (Cr = -0.7)
              : f && (Cr = -1 / 3);
            var Fr = function (e, t) {
              (this.ranges = e), (this.primIndex = t);
            };
            (Fr.prototype.primary = function () {
              return this.ranges[this.primIndex];
            }),
              (Fr.prototype.equals = function (e) {
                if (e == this) return !0;
                if (
                  e.primIndex != this.primIndex ||
                  e.ranges.length != this.ranges.length
                )
                  return !1;
                for (var t = 0; t < this.ranges.length; t++) {
                  var n = this.ranges[t],
                    i = e.ranges[t];
                  if (!ot(n.anchor, i.anchor) || !ot(n.head, i.head)) return !1;
                }
                return !0;
              }),
              (Fr.prototype.deepCopy = function () {
                for (var e = [], t = 0; t < this.ranges.length; t++)
                  e[t] = new Ar(
                    at(this.ranges[t].anchor),
                    at(this.ranges[t].head)
                  );
                return new Fr(e, this.primIndex);
              }),
              (Fr.prototype.somethingSelected = function () {
                for (var e = 0; e < this.ranges.length; e++)
                  if (!this.ranges[e].empty()) return !0;
                return !1;
              }),
              (Fr.prototype.contains = function (e, t) {
                t || (t = e);
                for (var n = 0; n < this.ranges.length; n++) {
                  var i = this.ranges[n];
                  if (rt(t, i.from()) >= 0 && rt(e, i.to()) <= 0) return n;
                }
                return -1;
              });
            var Ar = function (e, t) {
              (this.anchor = e), (this.head = t);
            };
            function Er(e, t, n) {
              var i = e && e.options.selectionsMayTouch,
                r = t[n];
              t.sort(function (e, t) {
                return rt(e.from(), t.from());
              }),
                (n = q(t, r));
              for (var o = 1; o < t.length; o++) {
                var a = t[o],
                  l = t[o - 1],
                  s = rt(l.to(), a.from());
                if (i && !a.empty() ? s > 0 : s >= 0) {
                  var u = st(l.from(), a.from()),
                    c = lt(l.to(), a.to()),
                    d = l.empty() ? a.from() == a.head : l.from() == l.head;
                  o <= n && --n, t.splice(--o, 2, new Ar(d ? c : u, d ? u : c));
                }
              }
              return new Fr(t, n);
            }
            function Lr(e, t) {
              return new Fr([new Ar(e, t || e)], 0);
            }
            function Tr(e) {
              return e.text
                ? it(
                    e.from.line + e.text.length - 1,
                    Y(e.text).length + (1 == e.text.length ? e.from.ch : 0)
                  )
                : e.to;
            }
            function Mr(e, t) {
              if (rt(e, t.from) < 0) return e;
              if (rt(e, t.to) <= 0) return Tr(t);
              var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                i = e.ch;
              return e.line == t.to.line && (i += Tr(t).ch - t.to.ch), it(n, i);
            }
            function Br(e, t) {
              for (var n = [], i = 0; i < e.sel.ranges.length; i++) {
                var r = e.sel.ranges[i];
                n.push(new Ar(Mr(r.anchor, t), Mr(r.head, t)));
              }
              return Er(e.cm, n, e.sel.primIndex);
            }
            function Nr(e, t, n) {
              return e.line == t.line
                ? it(n.line, e.ch - t.ch + n.ch)
                : it(n.line + (e.line - t.line), e.ch);
            }
            function Or(e) {
              (e.doc.mode = je(e.options, e.doc.modeOption)), Ir(e);
            }
            function Ir(e) {
              e.doc.iter(function (e) {
                e.stateAfter && (e.stateAfter = null),
                  e.styles && (e.styles = null);
              }),
                (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
                ar(e, 100),
                e.state.modeGen++,
                e.curOp && pi(e);
            }
            function zr(e, t) {
              return (
                0 == t.from.ch &&
                0 == t.to.ch &&
                "" == Y(t.text) &&
                (!e.cm || e.cm.options.wholeLineUpdateBefore)
              );
            }
            function Hr(e, t, n, i) {
              function r(e) {
                return n ? n[e] : null;
              }
              function o(e, n, r) {
                !(function (e, t, n, i) {
                  (e.text = t),
                    e.stateAfter && (e.stateAfter = null),
                    e.styles && (e.styles = null),
                    null != e.order && (e.order = null),
                    Mt(e),
                    Bt(e, n);
                  var r = i ? i(e) : 1;
                  r != e.height && Qe(e, r);
                })(e, n, r, i),
                  dn(e, "change", e, t);
              }
              function a(e, t) {
                for (var n = [], o = e; o < t; ++o)
                  n.push(new Kt(u[o], r(o), i));
                return n;
              }
              var l = t.from,
                s = t.to,
                u = t.text,
                c = Ke(e, l.line),
                d = Ke(e, s.line),
                h = Y(u),
                f = r(u.length - 1),
                p = s.line - l.line;
              if (t.full)
                e.insert(0, a(0, u.length)),
                  e.remove(u.length, e.size - u.length);
              else if (zr(e, t)) {
                var m = a(0, u.length - 1);
                o(d, d.text, f),
                  p && e.remove(l.line, p),
                  m.length && e.insert(l.line, m);
              } else if (c == d)
                if (1 == u.length)
                  o(c, c.text.slice(0, l.ch) + h + c.text.slice(s.ch), f);
                else {
                  var g = a(1, u.length - 1);
                  g.push(new Kt(h + c.text.slice(s.ch), f, i)),
                    o(c, c.text.slice(0, l.ch) + u[0], r(0)),
                    e.insert(l.line + 1, g);
                }
              else if (1 == u.length)
                o(c, c.text.slice(0, l.ch) + u[0] + d.text.slice(s.ch), r(0)),
                  e.remove(l.line + 1, p);
              else {
                o(c, c.text.slice(0, l.ch) + u[0], r(0)),
                  o(d, h + d.text.slice(s.ch), f);
                var v = a(1, u.length - 1);
                p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, v);
              }
              dn(e, "change", e, t);
            }
            function Rr(e, t, n) {
              !(function e(i, r, o) {
                if (i.linked)
                  for (var a = 0; a < i.linked.length; ++a) {
                    var l = i.linked[a];
                    if (l.doc != r) {
                      var s = o && l.sharedHist;
                      (n && !s) || (t(l.doc, s), e(l.doc, i, s));
                    }
                  }
              })(e, null, !0);
            }
            function Pr(e, t) {
              if (t.cm) throw new Error("This document is already in use.");
              (e.doc = t),
                (t.cm = e),
                di(e),
                Or(e),
                _r(e),
                (e.options.direction = t.direction),
                e.options.lineWrapping || Xt(e),
                (e.options.mode = t.modeOption),
                pi(e);
            }
            function _r(e) {
              ("rtl" == e.doc.direction
                ? O
                : A)(e.display.lineDiv, "CodeMirror-rtl");
            }
            function Wr(e) {
              (this.done = []),
                (this.undone = []),
                (this.undoDepth = e ? e.undoDepth : 1 / 0),
                (this.lastModTime = this.lastSelTime = 0),
                (this.lastOp = this.lastSelOp = null),
                (this.lastOrigin = this.lastSelOrigin = null),
                (this.generation = this.maxGeneration =
                  e ? e.maxGeneration : 1);
            }
            function jr(e, t) {
              var n = {
                from: at(t.from),
                to: Tr(t),
                text: Ze(e, t.from, t.to),
              };
              return (
                Vr(e, n, t.from.line, t.to.line + 1),
                Rr(
                  e,
                  function (e) {
                    return Vr(e, n, t.from.line, t.to.line + 1);
                  },
                  !0
                ),
                n
              );
            }
            function qr(e) {
              for (; e.length; ) {
                if (!Y(e).ranges) break;
                e.pop();
              }
            }
            function Ur(e, t, n, i) {
              var r = e.history;
              r.undone.length = 0;
              var o,
                a,
                l = +new Date();
              if (
                (r.lastOp == i ||
                  (r.lastOrigin == t.origin &&
                    t.origin &&
                    (("+" == t.origin.charAt(0) &&
                      r.lastModTime >
                        l - (e.cm ? e.cm.options.historyEventDelay : 500)) ||
                      "*" == t.origin.charAt(0)))) &&
                (o = (function (e, t) {
                  return t
                    ? (qr(e.done), Y(e.done))
                    : e.done.length && !Y(e.done).ranges
                    ? Y(e.done)
                    : e.done.length > 1 && !e.done[e.done.length - 2].ranges
                    ? (e.done.pop(), Y(e.done))
                    : void 0;
                })(r, r.lastOp == i))
              )
                (a = Y(o.changes)),
                  0 == rt(t.from, t.to) && 0 == rt(t.from, a.to)
                    ? (a.to = Tr(t))
                    : o.changes.push(jr(e, t));
              else {
                var s = Y(r.done);
                for (
                  (s && s.ranges) || Gr(e.sel, r.done),
                    o = { changes: [jr(e, t)], generation: r.generation },
                    r.done.push(o);
                  r.done.length > r.undoDepth;

                )
                  r.done.shift(), r.done[0].ranges || r.done.shift();
              }
              r.done.push(n),
                (r.generation = ++r.maxGeneration),
                (r.lastModTime = r.lastSelTime = l),
                (r.lastOp = r.lastSelOp = i),
                (r.lastOrigin = r.lastSelOrigin = t.origin),
                a || ve(e, "historyAdded");
            }
            function $r(e, t, n, i) {
              var r = e.history,
                o = i && i.origin;
              n == r.lastSelOp ||
              (o &&
                r.lastSelOrigin == o &&
                ((r.lastModTime == r.lastSelTime && r.lastOrigin == o) ||
                  (function (e, t, n, i) {
                    var r = t.charAt(0);
                    return (
                      "*" == r ||
                      ("+" == r &&
                        n.ranges.length == i.ranges.length &&
                        n.somethingSelected() == i.somethingSelected() &&
                        new Date() - e.history.lastSelTime <=
                          (e.cm ? e.cm.options.historyEventDelay : 500))
                    );
                  })(e, o, Y(r.done), t)))
                ? (r.done[r.done.length - 1] = t)
                : Gr(t, r.done),
                (r.lastSelTime = +new Date()),
                (r.lastSelOrigin = o),
                (r.lastSelOp = n),
                i && !1 !== i.clearRedo && qr(r.undone);
            }
            function Gr(e, t) {
              var n = Y(t);
              (n && n.ranges && n.equals(e)) || t.push(e);
            }
            function Vr(e, t, n, i) {
              var r = t["spans_" + e.id],
                o = 0;
              e.iter(
                Math.max(e.first, n),
                Math.min(e.first + e.size, i),
                function (n) {
                  n.markedSpans &&
                    ((r || (r = t["spans_" + e.id] = {}))[o] = n.markedSpans),
                    ++o;
                }
              );
            }
            function Xr(e) {
              if (!e) return null;
              for (var t, n = 0; n < e.length; ++n)
                e[n].marker.explicitlyCleared
                  ? t || (t = e.slice(0, n))
                  : t && t.push(e[n]);
              return t ? (t.length ? t : null) : e;
            }
            function Kr(e, t) {
              var n = (function (e, t) {
                  var n = t["spans_" + e.id];
                  if (!n) return null;
                  for (var i = [], r = 0; r < t.text.length; ++r)
                    i.push(Xr(n[r]));
                  return i;
                })(e, t),
                i = Lt(e, t);
              if (!n) return i;
              if (!i) return n;
              for (var r = 0; r < n.length; ++r) {
                var o = n[r],
                  a = i[r];
                if (o && a)
                  e: for (var l = 0; l < a.length; ++l) {
                    for (var s = a[l], u = 0; u < o.length; ++u)
                      if (o[u].marker == s.marker) continue e;
                    o.push(s);
                  }
                else a && (n[r] = a);
              }
              return n;
            }
            function Zr(e, t, n) {
              for (var i = [], r = 0; r < e.length; ++r) {
                var o = e[r];
                if (o.ranges) i.push(n ? Fr.prototype.deepCopy.call(o) : o);
                else {
                  var a = o.changes,
                    l = [];
                  i.push({ changes: l });
                  for (var s = 0; s < a.length; ++s) {
                    var u = a[s],
                      c = void 0;
                    if ((l.push({ from: u.from, to: u.to, text: u.text }), t))
                      for (var d in u)
                        (c = d.match(/^spans_(\d+)$/)) &&
                          q(t, Number(c[1])) > -1 &&
                          ((Y(l)[d] = u[d]), delete u[d]);
                  }
                }
              }
              return i;
            }
            function Yr(e, t, n, i) {
              if (i) {
                var r = e.anchor;
                if (n) {
                  var o = rt(t, r) < 0;
                  o != rt(n, r) < 0
                    ? ((r = t), (t = n))
                    : o != rt(t, n) < 0 && (t = n);
                }
                return new Ar(r, t);
              }
              return new Ar(n || t, t);
            }
            function Qr(e, t, n, i, r) {
              null == r && (r = e.cm && (e.cm.display.shift || e.extend)),
                io(e, new Fr([Yr(e.sel.primary(), t, n, r)], 0), i);
            }
            function Jr(e, t, n) {
              for (
                var i = [], r = e.cm && (e.cm.display.shift || e.extend), o = 0;
                o < e.sel.ranges.length;
                o++
              )
                i[o] = Yr(e.sel.ranges[o], t[o], null, r);
              io(e, Er(e.cm, i, e.sel.primIndex), n);
            }
            function eo(e, t, n, i) {
              var r = e.sel.ranges.slice(0);
              (r[t] = n), io(e, Er(e.cm, r, e.sel.primIndex), i);
            }
            function to(e, t, n, i) {
              io(e, Lr(t, n), i);
            }
            function no(e, t, n) {
              var i = e.history.done,
                r = Y(i);
              r && r.ranges
                ? ((i[i.length - 1] = t), ro(e, t, n))
                : io(e, t, n);
            }
            function io(e, t, n) {
              ro(e, t, n), $r(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
            }
            function ro(e, t, n) {
              (be(e, "beforeSelectionChange") ||
                (e.cm && be(e.cm, "beforeSelectionChange"))) &&
                (t = (function (e, t, n) {
                  var i = {
                    ranges: t.ranges,
                    update: function (t) {
                      this.ranges = [];
                      for (var n = 0; n < t.length; n++)
                        this.ranges[n] = new Ar(
                          ct(e, t[n].anchor),
                          ct(e, t[n].head)
                        );
                    },
                    origin: n && n.origin,
                  };
                  return (
                    ve(e, "beforeSelectionChange", e, i),
                    e.cm && ve(e.cm, "beforeSelectionChange", e.cm, i),
                    i.ranges != t.ranges
                      ? Er(e.cm, i.ranges, i.ranges.length - 1)
                      : t
                  );
                })(e, t, n));
              var i =
                (n && n.bias) ||
                (rt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
              oo(e, lo(e, t, i, !0)),
                (n && !1 === n.scroll) ||
                  !e.cm ||
                  "nocursor" == e.cm.getOption("readOnly") ||
                  Oi(e.cm);
            }
            function oo(e, t) {
              t.equals(e.sel) ||
                ((e.sel = t),
                e.cm &&
                  ((e.cm.curOp.updateInput = 1),
                  (e.cm.curOp.selectionChanged = !0),
                  ye(e.cm)),
                dn(e, "cursorActivity", e));
            }
            function ao(e) {
              oo(e, lo(e, e.sel, null, !1));
            }
            function lo(e, t, n, i) {
              for (var r, o = 0; o < t.ranges.length; o++) {
                var a = t.ranges[o],
                  l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                  s = uo(e, a.anchor, l && l.anchor, n, i),
                  u = a.head == a.anchor ? s : uo(e, a.head, l && l.head, n, i);
                (r || s != a.anchor || u != a.head) &&
                  (r || (r = t.ranges.slice(0, o)), (r[o] = new Ar(s, u)));
              }
              return r ? Er(e.cm, r, t.primIndex) : t;
            }
            function so(e, t, n, i, r) {
              var o = Ke(e, t.line);
              if (o.markedSpans)
                for (var a = 0; a < o.markedSpans.length; ++a) {
                  var l = o.markedSpans[a],
                    s = l.marker,
                    u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                    c = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
                  if (
                    (null == l.from || (u ? l.from <= t.ch : l.from < t.ch)) &&
                    (null == l.to || (c ? l.to >= t.ch : l.to > t.ch))
                  ) {
                    if (
                      r &&
                      (ve(s, "beforeCursorEnter"), s.explicitlyCleared)
                    ) {
                      if (o.markedSpans) {
                        --a;
                        continue;
                      }
                      break;
                    }
                    if (!s.atomic) continue;
                    if (n) {
                      var d = s.find(i < 0 ? 1 : -1),
                        h = void 0;
                      if (
                        ((i < 0 ? c : u) &&
                          (d = co(e, d, -i, d && d.line == t.line ? o : null)),
                        d &&
                          d.line == t.line &&
                          (h = rt(d, n)) &&
                          (i < 0 ? h < 0 : h > 0))
                      )
                        return so(e, d, t, i, r);
                    }
                    var f = s.find(i < 0 ? -1 : 1);
                    return (
                      (i < 0 ? u : c) &&
                        (f = co(e, f, i, f.line == t.line ? o : null)),
                      f ? so(e, f, t, i, r) : null
                    );
                  }
                }
              return t;
            }
            function uo(e, t, n, i, r) {
              var o = i || 1,
                a =
                  so(e, t, n, o, r) ||
                  (!r && so(e, t, n, o, !0)) ||
                  so(e, t, n, -o, r) ||
                  (!r && so(e, t, n, -o, !0));
              return a || ((e.cantEdit = !0), it(e.first, 0));
            }
            function co(e, t, n, i) {
              return n < 0 && 0 == t.ch
                ? t.line > e.first
                  ? ct(e, it(t.line - 1))
                  : null
                : n > 0 && t.ch == (i || Ke(e, t.line)).text.length
                ? t.line < e.first + e.size - 1
                  ? it(t.line + 1, 0)
                  : null
                : new it(t.line, t.ch + n);
            }
            function ho(e) {
              e.setSelection(it(e.firstLine(), 0), it(e.lastLine()), $);
            }
            function fo(e, t, n) {
              var i = {
                canceled: !1,
                from: t.from,
                to: t.to,
                text: t.text,
                origin: t.origin,
                cancel: function () {
                  return (i.canceled = !0);
                },
              };
              return (
                n &&
                  (i.update = function (t, n, r, o) {
                    t && (i.from = ct(e, t)),
                      n && (i.to = ct(e, n)),
                      r && (i.text = r),
                      void 0 !== o && (i.origin = o);
                  }),
                ve(e, "beforeChange", e, i),
                e.cm && ve(e.cm, "beforeChange", e.cm, i),
                i.canceled
                  ? (e.cm && (e.cm.curOp.updateInput = 2), null)
                  : { from: i.from, to: i.to, text: i.text, origin: i.origin }
              );
            }
            function po(e, t, n) {
              if (e.cm) {
                if (!e.cm.curOp) return ir(e.cm, po)(e, t, n);
                if (e.cm.state.suppressEdits) return;
              }
              if (
                !(
                  be(e, "beforeChange") ||
                  (e.cm && be(e.cm, "beforeChange"))
                ) ||
                (t = fo(e, t, !0))
              ) {
                var i =
                  kt &&
                  !n &&
                  (function (e, t, n) {
                    var i = null;
                    if (
                      (e.iter(t.line, n.line + 1, function (e) {
                        if (e.markedSpans)
                          for (var t = 0; t < e.markedSpans.length; ++t) {
                            var n = e.markedSpans[t].marker;
                            !n.readOnly ||
                              (i && -1 != q(i, n)) ||
                              (i || (i = [])).push(n);
                          }
                      }),
                      !i)
                    )
                      return null;
                    for (var r = [{ from: t, to: n }], o = 0; o < i.length; ++o)
                      for (
                        var a = i[o], l = a.find(0), s = 0;
                        s < r.length;
                        ++s
                      ) {
                        var u = r[s];
                        if (!(rt(u.to, l.from) < 0 || rt(u.from, l.to) > 0)) {
                          var c = [s, 1],
                            d = rt(u.from, l.from),
                            h = rt(u.to, l.to);
                          (d < 0 || (!a.inclusiveLeft && !d)) &&
                            c.push({ from: u.from, to: l.from }),
                            (h > 0 || (!a.inclusiveRight && !h)) &&
                              c.push({ from: l.to, to: u.to }),
                            r.splice.apply(r, c),
                            (s += c.length - 3);
                        }
                      }
                    return r;
                  })(e, t.from, t.to);
                if (i)
                  for (var r = i.length - 1; r >= 0; --r)
                    mo(e, {
                      from: i[r].from,
                      to: i[r].to,
                      text: r ? [""] : t.text,
                      origin: t.origin,
                    });
                else mo(e, t);
              }
            }
            function mo(e, t) {
              if (
                1 != t.text.length ||
                "" != t.text[0] ||
                0 != rt(t.from, t.to)
              ) {
                var n = Br(e, t);
                Ur(e, t, n, e.cm ? e.cm.curOp.id : NaN), xo(e, t, n, Lt(e, t));
                var i = [];
                Rr(e, function (e, n) {
                  n ||
                    -1 != q(i, e.history) ||
                    (Co(e.history, t), i.push(e.history)),
                    xo(e, t, null, Lt(e, t));
                });
              }
            }
            function go(e, t, n) {
              var i = e.cm && e.cm.state.suppressEdits;
              if (!i || n) {
                for (
                  var r,
                    o = e.history,
                    a = e.sel,
                    l = "undo" == t ? o.done : o.undone,
                    s = "undo" == t ? o.undone : o.done,
                    u = 0;
                  u < l.length &&
                  ((r = l[u]), n ? !r.ranges || r.equals(e.sel) : r.ranges);
                  u++
                );
                if (u != l.length) {
                  for (o.lastOrigin = o.lastSelOrigin = null; ; ) {
                    if (!(r = l.pop()).ranges) {
                      if (i) return void l.push(r);
                      break;
                    }
                    if ((Gr(r, s), n && !r.equals(e.sel)))
                      return void io(e, r, { clearRedo: !1 });
                    a = r;
                  }
                  var c = [];
                  Gr(a, s),
                    s.push({ changes: c, generation: o.generation }),
                    (o.generation = r.generation || ++o.maxGeneration);
                  for (
                    var d =
                        be(e, "beforeChange") ||
                        (e.cm && be(e.cm, "beforeChange")),
                      h = function (n) {
                        var i = r.changes[n];
                        if (((i.origin = t), d && !fo(e, i, !1)))
                          return (l.length = 0), {};
                        c.push(jr(e, i));
                        var o = n ? Br(e, i) : Y(l);
                        xo(e, i, o, Kr(e, i)),
                          !n &&
                            e.cm &&
                            e.cm.scrollIntoView({ from: i.from, to: Tr(i) });
                        var a = [];
                        Rr(e, function (e, t) {
                          t ||
                            -1 != q(a, e.history) ||
                            (Co(e.history, i), a.push(e.history)),
                            xo(e, i, null, Kr(e, i));
                        });
                      },
                      f = r.changes.length - 1;
                    f >= 0;
                    --f
                  ) {
                    var p = h(f);
                    if (p) return p.v;
                  }
                }
              }
            }
            function vo(e, t) {
              if (
                0 != t &&
                ((e.first += t),
                (e.sel = new Fr(
                  Q(e.sel.ranges, function (e) {
                    return new Ar(
                      it(e.anchor.line + t, e.anchor.ch),
                      it(e.head.line + t, e.head.ch)
                    );
                  }),
                  e.sel.primIndex
                )),
                e.cm)
              ) {
                pi(e.cm, e.first, e.first - t, t);
                for (var n = e.cm.display, i = n.viewFrom; i < n.viewTo; i++)
                  mi(e.cm, i, "gutter");
              }
            }
            function xo(e, t, n, i) {
              if (e.cm && !e.cm.curOp) return ir(e.cm, xo)(e, t, n, i);
              if (t.to.line < e.first)
                vo(e, t.text.length - 1 - (t.to.line - t.from.line));
              else if (!(t.from.line > e.lastLine())) {
                if (t.from.line < e.first) {
                  var r = t.text.length - 1 - (e.first - t.from.line);
                  vo(e, r),
                    (t = {
                      from: it(e.first, 0),
                      to: it(t.to.line + r, t.to.ch),
                      text: [Y(t.text)],
                      origin: t.origin,
                    });
                }
                var o = e.lastLine();
                t.to.line > o &&
                  (t = {
                    from: t.from,
                    to: it(o, Ke(e, o).text.length),
                    text: [t.text[0]],
                    origin: t.origin,
                  }),
                  (t.removed = Ze(e, t.from, t.to)),
                  n || (n = Br(e, t)),
                  e.cm
                    ? (function (e, t, n) {
                        var i = e.doc,
                          r = e.display,
                          o = t.from,
                          a = t.to,
                          l = !1,
                          s = o.line;
                        e.options.lineWrapping ||
                          ((s = Je(Wt(Ke(i, o.line)))),
                          i.iter(s, a.line + 1, function (e) {
                            if (e == r.maxLine) return (l = !0), !0;
                          }));
                        i.sel.contains(t.from, t.to) > -1 && ye(e);
                        Hr(i, t, n, ci(e)),
                          e.options.lineWrapping ||
                            (i.iter(s, o.line + t.text.length, function (e) {
                              var t = Vt(e);
                              t > r.maxLineLength &&
                                ((r.maxLine = e),
                                (r.maxLineLength = t),
                                (r.maxLineChanged = !0),
                                (l = !1));
                            }),
                            l && (e.curOp.updateMaxLine = !0));
                        (function (e, t) {
                          if (
                            ((e.modeFrontier = Math.min(e.modeFrontier, t)),
                            !(e.highlightFrontier < t - 10))
                          ) {
                            for (var n = e.first, i = t - 1; i > n; i--) {
                              var r = Ke(e, i).stateAfter;
                              if (
                                r &&
                                (!(r instanceof ht) || i + r.lookAhead < t)
                              ) {
                                n = i + 1;
                                break;
                              }
                            }
                            e.highlightFrontier = Math.min(
                              e.highlightFrontier,
                              n
                            );
                          }
                        })(i, o.line),
                          ar(e, 400);
                        var u = t.text.length - (a.line - o.line) - 1;
                        t.full
                          ? pi(e)
                          : o.line != a.line ||
                            1 != t.text.length ||
                            zr(e.doc, t)
                          ? pi(e, o.line, a.line + 1, u)
                          : mi(e, o.line, "text");
                        var c = be(e, "changes"),
                          d = be(e, "change");
                        if (d || c) {
                          var h = {
                            from: o,
                            to: a,
                            text: t.text,
                            removed: t.removed,
                            origin: t.origin,
                          };
                          d && dn(e, "change", e, h),
                            c &&
                              (
                                e.curOp.changeObjs || (e.curOp.changeObjs = [])
                              ).push(h);
                        }
                        e.display.selForContextMenu = null;
                      })(e.cm, t, i)
                    : Hr(e, t, i),
                  ro(e, n, $),
                  e.cantEdit &&
                    uo(e, it(e.firstLine(), 0)) &&
                    (e.cantEdit = !1);
              }
            }
            function yo(e, t, n, i, r) {
              var o;
              i || (i = n),
                rt(i, n) < 0 && ((n = (o = [i, n])[0]), (i = o[1])),
                "string" == typeof t && (t = e.splitLines(t)),
                po(e, { from: n, to: i, text: t, origin: r });
            }
            function bo(e, t, n, i) {
              n < e.line
                ? (e.line += i)
                : t < e.line && ((e.line = t), (e.ch = 0));
            }
            function Do(e, t, n, i) {
              for (var r = 0; r < e.length; ++r) {
                var o = e[r],
                  a = !0;
                if (o.ranges) {
                  o.copied || ((o = e[r] = o.deepCopy()).copied = !0);
                  for (var l = 0; l < o.ranges.length; l++)
                    bo(o.ranges[l].anchor, t, n, i),
                      bo(o.ranges[l].head, t, n, i);
                } else {
                  for (var s = 0; s < o.changes.length; ++s) {
                    var u = o.changes[s];
                    if (n < u.from.line)
                      (u.from = it(u.from.line + i, u.from.ch)),
                        (u.to = it(u.to.line + i, u.to.ch));
                    else if (t <= u.to.line) {
                      a = !1;
                      break;
                    }
                  }
                  a || (e.splice(0, r + 1), (r = 0));
                }
              }
            }
            function Co(e, t) {
              var n = t.from.line,
                i = t.to.line,
                r = t.text.length - (i - n) - 1;
              Do(e.done, n, i, r), Do(e.undone, n, i, r);
            }
            function wo(e, t, n, i) {
              var r = t,
                o = t;
              return (
                "number" == typeof t ? (o = Ke(e, ut(e, t))) : (r = Je(t)),
                null == r ? null : (i(o, r) && e.cm && mi(e.cm, r, n), o)
              );
            }
            function ko(e) {
              (this.lines = e), (this.parent = null);
              for (var t = 0, n = 0; n < e.length; ++n)
                (e[n].parent = this), (t += e[n].height);
              this.height = t;
            }
            function So(e) {
              this.children = e;
              for (var t = 0, n = 0, i = 0; i < e.length; ++i) {
                var r = e[i];
                (t += r.chunkSize()), (n += r.height), (r.parent = this);
              }
              (this.size = t), (this.height = n), (this.parent = null);
            }
            (Ar.prototype.from = function () {
              return st(this.anchor, this.head);
            }),
              (Ar.prototype.to = function () {
                return lt(this.anchor, this.head);
              }),
              (Ar.prototype.empty = function () {
                return (
                  this.head.line == this.anchor.line &&
                  this.head.ch == this.anchor.ch
                );
              }),
              (ko.prototype = {
                chunkSize: function () {
                  return this.lines.length;
                },
                removeInner: function (e, t) {
                  for (var n = e, i = e + t; n < i; ++n) {
                    var r = this.lines[n];
                    (this.height -= r.height), Zt(r), dn(r, "delete");
                  }
                  this.lines.splice(e, t);
                },
                collapse: function (e) {
                  e.push.apply(e, this.lines);
                },
                insertInner: function (e, t, n) {
                  (this.height += n),
                    (this.lines = this.lines
                      .slice(0, e)
                      .concat(t)
                      .concat(this.lines.slice(e)));
                  for (var i = 0; i < t.length; ++i) t[i].parent = this;
                },
                iterN: function (e, t, n) {
                  for (var i = e + t; e < i; ++e)
                    if (n(this.lines[e])) return !0;
                },
              }),
              (So.prototype = {
                chunkSize: function () {
                  return this.size;
                },
                removeInner: function (e, t) {
                  this.size -= t;
                  for (var n = 0; n < this.children.length; ++n) {
                    var i = this.children[n],
                      r = i.chunkSize();
                    if (e < r) {
                      var o = Math.min(t, r - e),
                        a = i.height;
                      if (
                        (i.removeInner(e, o),
                        (this.height -= a - i.height),
                        r == o &&
                          (this.children.splice(n--, 1), (i.parent = null)),
                        0 == (t -= o))
                      )
                        break;
                      e = 0;
                    } else e -= r;
                  }
                  if (
                    this.size - t < 25 &&
                    (this.children.length > 1 ||
                      !(this.children[0] instanceof ko))
                  ) {
                    var l = [];
                    this.collapse(l),
                      (this.children = [new ko(l)]),
                      (this.children[0].parent = this);
                  }
                },
                collapse: function (e) {
                  for (var t = 0; t < this.children.length; ++t)
                    this.children[t].collapse(e);
                },
                insertInner: function (e, t, n) {
                  (this.size += t.length), (this.height += n);
                  for (var i = 0; i < this.children.length; ++i) {
                    var r = this.children[i],
                      o = r.chunkSize();
                    if (e <= o) {
                      if (
                        (r.insertInner(e, t, n), r.lines && r.lines.length > 50)
                      ) {
                        for (
                          var a = (r.lines.length % 25) + 25, l = a;
                          l < r.lines.length;

                        ) {
                          var s = new ko(r.lines.slice(l, (l += 25)));
                          (r.height -= s.height),
                            this.children.splice(++i, 0, s),
                            (s.parent = this);
                        }
                        (r.lines = r.lines.slice(0, a)), this.maybeSpill();
                      }
                      break;
                    }
                    e -= o;
                  }
                },
                maybeSpill: function () {
                  if (!(this.children.length <= 10)) {
                    var e = this;
                    do {
                      var t = new So(
                        e.children.splice(e.children.length - 5, 5)
                      );
                      if (e.parent) {
                        (e.size -= t.size), (e.height -= t.height);
                        var n = q(e.parent.children, e);
                        e.parent.children.splice(n + 1, 0, t);
                      } else {
                        var i = new So(e.children);
                        (i.parent = e), (e.children = [i, t]), (e = i);
                      }
                      t.parent = e.parent;
                    } while (e.children.length > 10);
                    e.parent.maybeSpill();
                  }
                },
                iterN: function (e, t, n) {
                  for (var i = 0; i < this.children.length; ++i) {
                    var r = this.children[i],
                      o = r.chunkSize();
                    if (e < o) {
                      var a = Math.min(t, o - e);
                      if (r.iterN(e, a, n)) return !0;
                      if (0 == (t -= a)) break;
                      e = 0;
                    } else e -= o;
                  }
                },
              });
            var Fo = function (e, t, n) {
              if (n) for (var i in n) n.hasOwnProperty(i) && (this[i] = n[i]);
              (this.doc = e), (this.node = t);
            };
            function Ao(e, t, n) {
              Gt(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) &&
                Ni(e, n);
            }
            (Fo.prototype.clear = function () {
              var e = this.doc.cm,
                t = this.line.widgets,
                n = this.line,
                i = Je(n);
              if (null != i && t) {
                for (var r = 0; r < t.length; ++r)
                  t[r] == this && t.splice(r--, 1);
                t.length || (n.widgets = null);
                var o = kn(this);
                Qe(n, Math.max(0, n.height - o)),
                  e &&
                    (nr(e, function () {
                      Ao(e, n, -o), mi(e, i, "widget");
                    }),
                    dn(e, "lineWidgetCleared", e, this, i));
              }
            }),
              (Fo.prototype.changed = function () {
                var e = this,
                  t = this.height,
                  n = this.doc.cm,
                  i = this.line;
                this.height = null;
                var r = kn(this) - t;
                r &&
                  (Ut(this.doc, i) || Qe(i, i.height + r),
                  n &&
                    nr(n, function () {
                      (n.curOp.forceUpdate = !0),
                        Ao(n, i, r),
                        dn(n, "lineWidgetChanged", n, e, Je(i));
                    }));
              }),
              De(Fo);
            var Eo = 0,
              Lo = function (e, t) {
                (this.lines = []),
                  (this.type = t),
                  (this.doc = e),
                  (this.id = ++Eo);
              };
            function To(e, t, n, i, r) {
              if (i && i.shared)
                return (function (e, t, n, i, r) {
                  (i = _(i)).shared = !1;
                  var o = [To(e, t, n, i, r)],
                    a = o[0],
                    l = i.widgetNode;
                  return (
                    Rr(e, function (e) {
                      l && (i.widgetNode = l.cloneNode(!0)),
                        o.push(To(e, ct(e, t), ct(e, n), i, r));
                      for (var s = 0; s < e.linked.length; ++s)
                        if (e.linked[s].isParent) return;
                      a = Y(o);
                    }),
                    new Mo(o, a)
                  );
                })(e, t, n, i, r);
              if (e.cm && !e.cm.curOp) return ir(e.cm, To)(e, t, n, i, r);
              var o = new Lo(e, r),
                a = rt(t, n);
              if (
                (i && _(i, o, !1), a > 0 || (0 == a && !1 !== o.clearWhenEmpty))
              )
                return o;
              if (
                (o.replacedWith &&
                  ((o.collapsed = !0),
                  (o.widgetNode = M(
                    "span",
                    [o.replacedWith],
                    "CodeMirror-widget"
                  )),
                  i.handleMouseEvents ||
                    o.widgetNode.setAttribute("cm-ignore-events", "true"),
                  i.insertLeft && (o.widgetNode.insertLeft = !0)),
                o.collapsed)
              ) {
                if (
                  _t(e, t.line, t, n, o) ||
                  (t.line != n.line && _t(e, n.line, t, n, o))
                )
                  throw new Error(
                    "Inserting collapsed marker partially overlapping an existing one"
                  );
                St = !0;
              }
              o.addToHistory &&
                Ur(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
              var l,
                s = t.line,
                u = e.cm;
              if (
                (e.iter(s, n.line + 1, function (i) {
                  u &&
                    o.collapsed &&
                    !u.options.lineWrapping &&
                    Wt(i) == u.display.maxLine &&
                    (l = !0),
                    o.collapsed && s != t.line && Qe(i, 0),
                    (function (e, t, n) {
                      var i =
                        n &&
                        window.WeakSet &&
                        (n.markedSpans || (n.markedSpans = new WeakSet()));
                      i && e.markedSpans && i.has(e.markedSpans)
                        ? e.markedSpans.push(t)
                        : ((e.markedSpans = e.markedSpans
                            ? e.markedSpans.concat([t])
                            : [t]),
                          i && i.add(e.markedSpans)),
                        t.marker.attachLine(e);
                    })(
                      i,
                      new Ft(
                        o,
                        s == t.line ? t.ch : null,
                        s == n.line ? n.ch : null
                      ),
                      e.cm && e.cm.curOp
                    ),
                    ++s;
                }),
                o.collapsed &&
                  e.iter(t.line, n.line + 1, function (t) {
                    Ut(e, t) && Qe(t, 0);
                  }),
                o.clearOnEnter &&
                  pe(o, "beforeCursorEnter", function () {
                    return o.clear();
                  }),
                o.readOnly &&
                  ((kt = !0),
                  (e.history.done.length || e.history.undone.length) &&
                    e.clearHistory()),
                o.collapsed && ((o.id = ++Eo), (o.atomic = !0)),
                u)
              ) {
                if ((l && (u.curOp.updateMaxLine = !0), o.collapsed))
                  pi(u, t.line, n.line + 1);
                else if (
                  o.className ||
                  o.startStyle ||
                  o.endStyle ||
                  o.css ||
                  o.attributes ||
                  o.title
                )
                  for (var c = t.line; c <= n.line; c++) mi(u, c, "text");
                o.atomic && ao(u.doc), dn(u, "markerAdded", u, o);
              }
              return o;
            }
            (Lo.prototype.clear = function () {
              if (!this.explicitlyCleared) {
                var e = this.doc.cm,
                  t = e && !e.curOp;
                if ((t && Ki(e), be(this, "clear"))) {
                  var n = this.find();
                  n && dn(this, "clear", n.from, n.to);
                }
                for (
                  var i = null, r = null, o = 0;
                  o < this.lines.length;
                  ++o
                ) {
                  var a = this.lines[o],
                    l = At(a.markedSpans, this);
                  e && !this.collapsed
                    ? mi(e, Je(a), "text")
                    : e &&
                      (null != l.to && (r = Je(a)),
                      null != l.from && (i = Je(a))),
                    (a.markedSpans = Et(a.markedSpans, l)),
                    null == l.from &&
                      this.collapsed &&
                      !Ut(this.doc, a) &&
                      e &&
                      Qe(a, ai(e.display));
                }
                if (e && this.collapsed && !e.options.lineWrapping)
                  for (var s = 0; s < this.lines.length; ++s) {
                    var u = Wt(this.lines[s]),
                      c = Vt(u);
                    c > e.display.maxLineLength &&
                      ((e.display.maxLine = u),
                      (e.display.maxLineLength = c),
                      (e.display.maxLineChanged = !0));
                  }
                null != i && e && this.collapsed && pi(e, i, r + 1),
                  (this.lines.length = 0),
                  (this.explicitlyCleared = !0),
                  this.atomic &&
                    this.doc.cantEdit &&
                    ((this.doc.cantEdit = !1), e && ao(e.doc)),
                  e && dn(e, "markerCleared", e, this, i, r),
                  t && Zi(e),
                  this.parent && this.parent.clear();
              }
            }),
              (Lo.prototype.find = function (e, t) {
                var n, i;
                null == e && "bookmark" == this.type && (e = 1);
                for (var r = 0; r < this.lines.length; ++r) {
                  var o = this.lines[r],
                    a = At(o.markedSpans, this);
                  if (
                    null != a.from &&
                    ((n = it(t ? o : Je(o), a.from)), -1 == e)
                  )
                    return n;
                  if (null != a.to && ((i = it(t ? o : Je(o), a.to)), 1 == e))
                    return i;
                }
                return n && { from: n, to: i };
              }),
              (Lo.prototype.changed = function () {
                var e = this,
                  t = this.find(-1, !0),
                  n = this,
                  i = this.doc.cm;
                t &&
                  i &&
                  nr(i, function () {
                    var r = t.line,
                      o = Je(t.line),
                      a = On(i, o);
                    if (
                      (a &&
                        (Wn(a),
                        (i.curOp.selectionChanged = i.curOp.forceUpdate = !0)),
                      (i.curOp.updateMaxLine = !0),
                      !Ut(n.doc, r) && null != n.height)
                    ) {
                      var l = n.height;
                      n.height = null;
                      var s = kn(n) - l;
                      s && Qe(r, r.height + s);
                    }
                    dn(i, "markerChanged", i, e);
                  });
              }),
              (Lo.prototype.attachLine = function (e) {
                if (!this.lines.length && this.doc.cm) {
                  var t = this.doc.cm.curOp;
                  (t.maybeHiddenMarkers &&
                    -1 != q(t.maybeHiddenMarkers, this)) ||
                    (
                      t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])
                    ).push(this);
                }
                this.lines.push(e);
              }),
              (Lo.prototype.detachLine = function (e) {
                if (
                  (this.lines.splice(q(this.lines, e), 1),
                  !this.lines.length && this.doc.cm)
                ) {
                  var t = this.doc.cm.curOp;
                  (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(
                    this
                  );
                }
              }),
              De(Lo);
            var Mo = function (e, t) {
              (this.markers = e), (this.primary = t);
              for (var n = 0; n < e.length; ++n) e[n].parent = this;
            };
            function Bo(e) {
              return e.findMarks(
                it(e.first, 0),
                e.clipPos(it(e.lastLine())),
                function (e) {
                  return e.parent;
                }
              );
            }
            function No(e) {
              for (
                var t = function (t) {
                    var n = e[t],
                      i = [n.primary.doc];
                    Rr(n.primary.doc, function (e) {
                      return i.push(e);
                    });
                    for (var r = 0; r < n.markers.length; r++) {
                      var o = n.markers[r];
                      -1 == q(i, o.doc) &&
                        ((o.parent = null), n.markers.splice(r--, 1));
                    }
                  },
                  n = 0;
                n < e.length;
                n++
              )
                t(n);
            }
            (Mo.prototype.clear = function () {
              if (!this.explicitlyCleared) {
                this.explicitlyCleared = !0;
                for (var e = 0; e < this.markers.length; ++e)
                  this.markers[e].clear();
                dn(this, "clear");
              }
            }),
              (Mo.prototype.find = function (e, t) {
                return this.primary.find(e, t);
              }),
              De(Mo);
            var Oo = 0,
              Io = function (e, t, n, i, r) {
                if (!(this instanceof Io)) return new Io(e, t, n, i, r);
                null == n && (n = 0),
                  So.call(this, [new ko([new Kt("", null)])]),
                  (this.first = n),
                  (this.scrollTop = this.scrollLeft = 0),
                  (this.cantEdit = !1),
                  (this.cleanGeneration = 1),
                  (this.modeFrontier = this.highlightFrontier = n);
                var o = it(n, 0);
                (this.sel = Lr(o)),
                  (this.history = new Wr(null)),
                  (this.id = ++Oo),
                  (this.modeOption = t),
                  (this.lineSep = i),
                  (this.direction = "rtl" == r ? "rtl" : "ltr"),
                  (this.extend = !1),
                  "string" == typeof e && (e = this.splitLines(e)),
                  Hr(this, { from: o, to: o, text: e }),
                  io(this, Lr(o), $);
              };
            (Io.prototype = ee(So.prototype, {
              constructor: Io,
              iter: function (e, t, n) {
                n
                  ? this.iterN(e - this.first, t - e, n)
                  : this.iterN(this.first, this.first + this.size, e);
              },
              insert: function (e, t) {
                for (var n = 0, i = 0; i < t.length; ++i) n += t[i].height;
                this.insertInner(e - this.first, t, n);
              },
              remove: function (e, t) {
                this.removeInner(e - this.first, t);
              },
              getValue: function (e) {
                var t = Ye(this, this.first, this.first + this.size);
                return !1 === e ? t : t.join(e || this.lineSeparator());
              },
              setValue: or(function (e) {
                var t = it(this.first, 0),
                  n = this.first + this.size - 1;
                po(
                  this,
                  {
                    from: t,
                    to: it(n, Ke(this, n).text.length),
                    text: this.splitLines(e),
                    origin: "setValue",
                    full: !0,
                  },
                  !0
                ),
                  this.cm && Ii(this.cm, 0, 0),
                  io(this, Lr(t), $);
              }),
              replaceRange: function (e, t, n, i) {
                yo(this, e, (t = ct(this, t)), (n = n ? ct(this, n) : t), i);
              },
              getRange: function (e, t, n) {
                var i = Ze(this, ct(this, e), ct(this, t));
                return !1 === n
                  ? i
                  : "" === n
                  ? i.join("")
                  : i.join(n || this.lineSeparator());
              },
              getLine: function (e) {
                var t = this.getLineHandle(e);
                return t && t.text;
              },
              getLineHandle: function (e) {
                if (tt(this, e)) return Ke(this, e);
              },
              getLineNumber: function (e) {
                return Je(e);
              },
              getLineHandleVisualStart: function (e) {
                return "number" == typeof e && (e = Ke(this, e)), Wt(e);
              },
              lineCount: function () {
                return this.size;
              },
              firstLine: function () {
                return this.first;
              },
              lastLine: function () {
                return this.first + this.size - 1;
              },
              clipPos: function (e) {
                return ct(this, e);
              },
              getCursor: function (e) {
                var t = this.sel.primary();
                return null == e || "head" == e
                  ? t.head
                  : "anchor" == e
                  ? t.anchor
                  : "end" == e || "to" == e || !1 === e
                  ? t.to()
                  : t.from();
              },
              listSelections: function () {
                return this.sel.ranges;
              },
              somethingSelected: function () {
                return this.sel.somethingSelected();
              },
              setCursor: or(function (e, t, n) {
                to(
                  this,
                  ct(this, "number" == typeof e ? it(e, t || 0) : e),
                  null,
                  n
                );
              }),
              setSelection: or(function (e, t, n) {
                to(this, ct(this, e), ct(this, t || e), n);
              }),
              extendSelection: or(function (e, t, n) {
                Qr(this, ct(this, e), t && ct(this, t), n);
              }),
              extendSelections: or(function (e, t) {
                Jr(this, dt(this, e), t);
              }),
              extendSelectionsBy: or(function (e, t) {
                Jr(this, dt(this, Q(this.sel.ranges, e)), t);
              }),
              setSelections: or(function (e, t, n) {
                if (e.length) {
                  for (var i = [], r = 0; r < e.length; r++)
                    i[r] = new Ar(
                      ct(this, e[r].anchor),
                      ct(this, e[r].head || e[r].anchor)
                    );
                  null == t && (t = Math.min(e.length - 1, this.sel.primIndex)),
                    io(this, Er(this.cm, i, t), n);
                }
              }),
              addSelection: or(function (e, t, n) {
                var i = this.sel.ranges.slice(0);
                i.push(new Ar(ct(this, e), ct(this, t || e))),
                  io(this, Er(this.cm, i, i.length - 1), n);
              }),
              getSelection: function (e) {
                for (var t, n = this.sel.ranges, i = 0; i < n.length; i++) {
                  var r = Ze(this, n[i].from(), n[i].to());
                  t = t ? t.concat(r) : r;
                }
                return !1 === e ? t : t.join(e || this.lineSeparator());
              },
              getSelections: function (e) {
                for (
                  var t = [], n = this.sel.ranges, i = 0;
                  i < n.length;
                  i++
                ) {
                  var r = Ze(this, n[i].from(), n[i].to());
                  !1 !== e && (r = r.join(e || this.lineSeparator())),
                    (t[i] = r);
                }
                return t;
              },
              replaceSelection: function (e, t, n) {
                for (var i = [], r = 0; r < this.sel.ranges.length; r++)
                  i[r] = e;
                this.replaceSelections(i, t, n || "+input");
              },
              replaceSelections: or(function (e, t, n) {
                for (
                  var i = [], r = this.sel, o = 0;
                  o < r.ranges.length;
                  o++
                ) {
                  var a = r.ranges[o];
                  i[o] = {
                    from: a.from(),
                    to: a.to(),
                    text: this.splitLines(e[o]),
                    origin: n,
                  };
                }
                for (
                  var l =
                      t &&
                      "end" != t &&
                      (function (e, t, n) {
                        for (
                          var i = [], r = it(e.first, 0), o = r, a = 0;
                          a < t.length;
                          a++
                        ) {
                          var l = t[a],
                            s = Nr(l.from, r, o),
                            u = Nr(Tr(l), r, o);
                          if (((r = l.to), (o = u), "around" == n)) {
                            var c = e.sel.ranges[a],
                              d = rt(c.head, c.anchor) < 0;
                            i[a] = new Ar(d ? u : s, d ? s : u);
                          } else i[a] = new Ar(s, s);
                        }
                        return new Fr(i, e.sel.primIndex);
                      })(this, i, t),
                    s = i.length - 1;
                  s >= 0;
                  s--
                )
                  po(this, i[s]);
                l ? no(this, l) : this.cm && Oi(this.cm);
              }),
              undo: or(function () {
                go(this, "undo");
              }),
              redo: or(function () {
                go(this, "redo");
              }),
              undoSelection: or(function () {
                go(this, "undo", !0);
              }),
              redoSelection: or(function () {
                go(this, "redo", !0);
              }),
              setExtending: function (e) {
                this.extend = e;
              },
              getExtending: function () {
                return this.extend;
              },
              historySize: function () {
                for (
                  var e = this.history, t = 0, n = 0, i = 0;
                  i < e.done.length;
                  i++
                )
                  e.done[i].ranges || ++t;
                for (var r = 0; r < e.undone.length; r++)
                  e.undone[r].ranges || ++n;
                return { undo: t, redo: n };
              },
              clearHistory: function () {
                var e = this;
                (this.history = new Wr(this.history)),
                  Rr(
                    this,
                    function (t) {
                      return (t.history = e.history);
                    },
                    !0
                  );
              },
              markClean: function () {
                this.cleanGeneration = this.changeGeneration(!0);
              },
              changeGeneration: function (e) {
                return (
                  e &&
                    (this.history.lastOp =
                      this.history.lastSelOp =
                      this.history.lastOrigin =
                        null),
                  this.history.generation
                );
              },
              isClean: function (e) {
                return this.history.generation == (e || this.cleanGeneration);
              },
              getHistory: function () {
                return {
                  done: Zr(this.history.done),
                  undone: Zr(this.history.undone),
                };
              },
              setHistory: function (e) {
                var t = (this.history = new Wr(this.history));
                (t.done = Zr(e.done.slice(0), null, !0)),
                  (t.undone = Zr(e.undone.slice(0), null, !0));
              },
              setGutterMarker: or(function (e, t, n) {
                return wo(this, e, "gutter", function (e) {
                  var i = e.gutterMarkers || (e.gutterMarkers = {});
                  return (
                    (i[t] = n), !n && re(i) && (e.gutterMarkers = null), !0
                  );
                });
              }),
              clearGutter: or(function (e) {
                var t = this;
                this.iter(function (n) {
                  n.gutterMarkers &&
                    n.gutterMarkers[e] &&
                    wo(t, n, "gutter", function () {
                      return (
                        (n.gutterMarkers[e] = null),
                        re(n.gutterMarkers) && (n.gutterMarkers = null),
                        !0
                      );
                    });
                });
              }),
              lineInfo: function (e) {
                var t;
                if ("number" == typeof e) {
                  if (!tt(this, e)) return null;
                  if (((t = e), !(e = Ke(this, e)))) return null;
                } else if (null == (t = Je(e))) return null;
                return {
                  line: t,
                  handle: e,
                  text: e.text,
                  gutterMarkers: e.gutterMarkers,
                  textClass: e.textClass,
                  bgClass: e.bgClass,
                  wrapClass: e.wrapClass,
                  widgets: e.widgets,
                };
              },
              addLineClass: or(function (e, t, n) {
                return wo(
                  this,
                  e,
                  "gutter" == t ? "gutter" : "class",
                  function (e) {
                    var i =
                      "text" == t
                        ? "textClass"
                        : "background" == t
                        ? "bgClass"
                        : "gutter" == t
                        ? "gutterClass"
                        : "wrapClass";
                    if (e[i]) {
                      if (S(n).test(e[i])) return !1;
                      e[i] += " " + n;
                    } else e[i] = n;
                    return !0;
                  }
                );
              }),
              removeLineClass: or(function (e, t, n) {
                return wo(
                  this,
                  e,
                  "gutter" == t ? "gutter" : "class",
                  function (e) {
                    var i =
                        "text" == t
                          ? "textClass"
                          : "background" == t
                          ? "bgClass"
                          : "gutter" == t
                          ? "gutterClass"
                          : "wrapClass",
                      r = e[i];
                    if (!r) return !1;
                    if (null == n) e[i] = null;
                    else {
                      var o = r.match(S(n));
                      if (!o) return !1;
                      var a = o.index + o[0].length;
                      e[i] =
                        r.slice(0, o.index) +
                          (o.index && a != r.length ? " " : "") +
                          r.slice(a) || null;
                    }
                    return !0;
                  }
                );
              }),
              addLineWidget: or(function (e, t, n) {
                return (function (e, t, n, i) {
                  var r = new Fo(e, n, i),
                    o = e.cm;
                  return (
                    o && r.noHScroll && (o.display.alignWidgets = !0),
                    wo(e, t, "widget", function (t) {
                      var n = t.widgets || (t.widgets = []);
                      if (
                        (null == r.insertAt
                          ? n.push(r)
                          : n.splice(
                              Math.min(n.length, Math.max(0, r.insertAt)),
                              0,
                              r
                            ),
                        (r.line = t),
                        o && !Ut(e, t))
                      ) {
                        var i = Gt(t) < e.scrollTop;
                        Qe(t, t.height + kn(r)),
                          i && Ni(o, r.height),
                          (o.curOp.forceUpdate = !0);
                      }
                      return !0;
                    }),
                    o &&
                      dn(
                        o,
                        "lineWidgetAdded",
                        o,
                        r,
                        "number" == typeof t ? t : Je(t)
                      ),
                    r
                  );
                })(this, e, t, n);
              }),
              removeLineWidget: function (e) {
                e.clear();
              },
              markText: function (e, t, n) {
                return To(
                  this,
                  ct(this, e),
                  ct(this, t),
                  n,
                  (n && n.type) || "range"
                );
              },
              setBookmark: function (e, t) {
                var n = {
                  replacedWith: t && (null == t.nodeType ? t.widget : t),
                  insertLeft: t && t.insertLeft,
                  clearWhenEmpty: !1,
                  shared: t && t.shared,
                  handleMouseEvents: t && t.handleMouseEvents,
                };
                return To(this, (e = ct(this, e)), e, n, "bookmark");
              },
              findMarksAt: function (e) {
                var t = [],
                  n = Ke(this, (e = ct(this, e)).line).markedSpans;
                if (n)
                  for (var i = 0; i < n.length; ++i) {
                    var r = n[i];
                    (null == r.from || r.from <= e.ch) &&
                      (null == r.to || r.to >= e.ch) &&
                      t.push(r.marker.parent || r.marker);
                  }
                return t;
              },
              findMarks: function (e, t, n) {
                (e = ct(this, e)), (t = ct(this, t));
                var i = [],
                  r = e.line;
                return (
                  this.iter(e.line, t.line + 1, function (o) {
                    var a = o.markedSpans;
                    if (a)
                      for (var l = 0; l < a.length; l++) {
                        var s = a[l];
                        (null != s.to && r == e.line && e.ch >= s.to) ||
                          (null == s.from && r != e.line) ||
                          (null != s.from && r == t.line && s.from >= t.ch) ||
                          (n && !n(s.marker)) ||
                          i.push(s.marker.parent || s.marker);
                      }
                    ++r;
                  }),
                  i
                );
              },
              getAllMarks: function () {
                var e = [];
                return (
                  this.iter(function (t) {
                    var n = t.markedSpans;
                    if (n)
                      for (var i = 0; i < n.length; ++i)
                        null != n[i].from && e.push(n[i].marker);
                  }),
                  e
                );
              },
              posFromIndex: function (e) {
                var t,
                  n = this.first,
                  i = this.lineSeparator().length;
                return (
                  this.iter(function (r) {
                    var o = r.text.length + i;
                    if (o > e) return (t = e), !0;
                    (e -= o), ++n;
                  }),
                  ct(this, it(n, t))
                );
              },
              indexFromPos: function (e) {
                var t = (e = ct(this, e)).ch;
                if (e.line < this.first || e.ch < 0) return 0;
                var n = this.lineSeparator().length;
                return (
                  this.iter(this.first, e.line, function (e) {
                    t += e.text.length + n;
                  }),
                  t
                );
              },
              copy: function (e) {
                var t = new Io(
                  Ye(this, this.first, this.first + this.size),
                  this.modeOption,
                  this.first,
                  this.lineSep,
                  this.direction
                );
                return (
                  (t.scrollTop = this.scrollTop),
                  (t.scrollLeft = this.scrollLeft),
                  (t.sel = this.sel),
                  (t.extend = !1),
                  e &&
                    ((t.history.undoDepth = this.history.undoDepth),
                    t.setHistory(this.getHistory())),
                  t
                );
              },
              linkedDoc: function (e) {
                e || (e = {});
                var t = this.first,
                  n = this.first + this.size;
                null != e.from && e.from > t && (t = e.from),
                  null != e.to && e.to < n && (n = e.to);
                var i = new Io(
                  Ye(this, t, n),
                  e.mode || this.modeOption,
                  t,
                  this.lineSep,
                  this.direction
                );
                return (
                  e.sharedHist && (i.history = this.history),
                  (this.linked || (this.linked = [])).push({
                    doc: i,
                    sharedHist: e.sharedHist,
                  }),
                  (i.linked = [
                    { doc: this, isParent: !0, sharedHist: e.sharedHist },
                  ]),
                  (function (e, t) {
                    for (var n = 0; n < t.length; n++) {
                      var i = t[n],
                        r = i.find(),
                        o = e.clipPos(r.from),
                        a = e.clipPos(r.to);
                      if (rt(o, a)) {
                        var l = To(e, o, a, i.primary, i.primary.type);
                        i.markers.push(l), (l.parent = i);
                      }
                    }
                  })(i, Bo(this)),
                  i
                );
              },
              unlinkDoc: function (e) {
                if ((e instanceof Ma && (e = e.doc), this.linked))
                  for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                      this.linked.splice(t, 1), e.unlinkDoc(this), No(Bo(this));
                      break;
                    }
                  }
                if (e.history == this.history) {
                  var n = [e.id];
                  Rr(
                    e,
                    function (e) {
                      return n.push(e.id);
                    },
                    !0
                  ),
                    (e.history = new Wr(null)),
                    (e.history.done = Zr(this.history.done, n)),
                    (e.history.undone = Zr(this.history.undone, n));
                }
              },
              iterLinkedDocs: function (e) {
                Rr(this, e);
              },
              getMode: function () {
                return this.mode;
              },
              getEditor: function () {
                return this.cm;
              },
              splitLines: function (e) {
                return this.lineSep ? e.split(this.lineSep) : Oe(e);
              },
              lineSeparator: function () {
                return this.lineSep || "\n";
              },
              setDirection: or(function (e) {
                var t;
                ("rtl" != e && (e = "ltr"), e != this.direction) &&
                  ((this.direction = e),
                  this.iter(function (e) {
                    return (e.order = null);
                  }),
                  this.cm &&
                    nr((t = this.cm), function () {
                      _r(t), pi(t);
                    }));
              }),
            })),
              (Io.prototype.eachLine = Io.prototype.iter);
            var zo = 0;
            function Ho(e) {
              var t = this;
              if ((Ro(t), !xe(t, e) && !Sn(t.display, e))) {
                Ce(e), a && (zo = +new Date());
                var n = hi(t, e, !0),
                  i = e.dataTransfer.files;
                if (n && !t.isReadOnly())
                  if (i && i.length && window.FileReader && window.File)
                    for (
                      var r = i.length,
                        o = Array(r),
                        l = 0,
                        s = function () {
                          ++l == r &&
                            ir(t, function () {
                              var e = {
                                from: (n = ct(t.doc, n)),
                                to: n,
                                text: t.doc.splitLines(
                                  o
                                    .filter(function (e) {
                                      return null != e;
                                    })
                                    .join(t.doc.lineSeparator())
                                ),
                                origin: "paste",
                              };
                              po(t.doc, e),
                                no(t.doc, Lr(ct(t.doc, n), ct(t.doc, Tr(e))));
                            })();
                        },
                        u = function (e, n) {
                          if (
                            t.options.allowDropFileTypes &&
                            -1 == q(t.options.allowDropFileTypes, e.type)
                          )
                            s();
                          else {
                            var i = new FileReader();
                            (i.onerror = function () {
                              return s();
                            }),
                              (i.onload = function () {
                                var e = i.result;
                                /[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[n] = e),
                                  s();
                              }),
                              i.readAsText(e);
                          }
                        },
                        c = 0;
                      c < i.length;
                      c++
                    )
                      u(i[c], c);
                  else {
                    if (t.state.draggingText && t.doc.sel.contains(n) > -1)
                      return (
                        t.state.draggingText(e),
                        void setTimeout(function () {
                          return t.display.input.focus();
                        }, 20)
                      );
                    try {
                      var d = e.dataTransfer.getData("Text");
                      if (d) {
                        var h;
                        if (
                          (t.state.draggingText &&
                            !t.state.draggingText.copy &&
                            (h = t.listSelections()),
                          ro(t.doc, Lr(n, n)),
                          h)
                        )
                          for (var f = 0; f < h.length; ++f)
                            yo(t.doc, "", h[f].anchor, h[f].head, "drag");
                        t.replaceSelection(d, "around", "paste"),
                          t.display.input.focus();
                      }
                    } catch (e) {}
                  }
              }
            }
            function Ro(e) {
              e.display.dragCursor &&
                (e.display.lineSpace.removeChild(e.display.dragCursor),
                (e.display.dragCursor = null));
            }
            function Po(e) {
              if (document.getElementsByClassName) {
                for (
                  var t = document.getElementsByClassName("CodeMirror"),
                    n = [],
                    i = 0;
                  i < t.length;
                  i++
                ) {
                  var r = t[i].CodeMirror;
                  r && n.push(r);
                }
                n.length &&
                  n[0].operation(function () {
                    for (var t = 0; t < n.length; t++) e(n[t]);
                  });
              }
            }
            var _o = !1;
            function Wo() {
              var e;
              _o ||
                (pe(window, "resize", function () {
                  null == e &&
                    (e = setTimeout(function () {
                      (e = null), Po(jo);
                    }, 100));
                }),
                pe(window, "blur", function () {
                  return Po(Ei);
                }),
                (_o = !0));
            }
            function jo(e) {
              var t = e.display;
              (t.cachedCharWidth =
                t.cachedTextHeight =
                t.cachedPaddingH =
                  null),
                (t.scrollbarsClipped = !1),
                e.setSize();
            }
            for (
              var qo = {
                  3: "Pause",
                  8: "Backspace",
                  9: "Tab",
                  13: "Enter",
                  16: "Shift",
                  17: "Ctrl",
                  18: "Alt",
                  19: "Pause",
                  20: "CapsLock",
                  27: "Esc",
                  32: "Space",
                  33: "PageUp",
                  34: "PageDown",
                  35: "End",
                  36: "Home",
                  37: "Left",
                  38: "Up",
                  39: "Right",
                  40: "Down",
                  44: "PrintScrn",
                  45: "Insert",
                  46: "Delete",
                  59: ";",
                  61: "=",
                  91: "Mod",
                  92: "Mod",
                  93: "Mod",
                  106: "*",
                  107: "=",
                  109: "-",
                  110: ".",
                  111: "/",
                  145: "ScrollLock",
                  173: "-",
                  186: ";",
                  187: "=",
                  188: ",",
                  189: "-",
                  190: ".",
                  191: "/",
                  192: "`",
                  219: "[",
                  220: "\\",
                  221: "]",
                  222: "'",
                  224: "Mod",
                  63232: "Up",
                  63233: "Down",
                  63234: "Left",
                  63235: "Right",
                  63272: "Delete",
                  63273: "Home",
                  63275: "End",
                  63276: "PageUp",
                  63277: "PageDown",
                  63302: "Insert",
                },
                Uo = 0;
              Uo < 10;
              Uo++
            )
              qo[Uo + 48] = qo[Uo + 96] = String(Uo);
            for (var $o = 65; $o <= 90; $o++) qo[$o] = String.fromCharCode($o);
            for (var Go = 1; Go <= 12; Go++)
              qo[Go + 111] = qo[Go + 63235] = "F" + Go;
            var Vo = {};
            function Xo(e) {
              var t,
                n,
                i,
                r,
                o = e.split(/-(?!$)/);
              e = o[o.length - 1];
              for (var a = 0; a < o.length - 1; a++) {
                var l = o[a];
                if (/^(cmd|meta|m)$/i.test(l)) r = !0;
                else if (/^a(lt)?$/i.test(l)) t = !0;
                else if (/^(c|ctrl|control)$/i.test(l)) n = !0;
                else {
                  if (!/^s(hift)?$/i.test(l))
                    throw new Error("Unrecognized modifier name: " + l);
                  i = !0;
                }
              }
              return (
                t && (e = "Alt-" + e),
                n && (e = "Ctrl-" + e),
                r && (e = "Cmd-" + e),
                i && (e = "Shift-" + e),
                e
              );
            }
            function Ko(e) {
              var t = {};
              for (var n in e)
                if (e.hasOwnProperty(n)) {
                  var i = e[n];
                  if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                  if ("..." == i) {
                    delete e[n];
                    continue;
                  }
                  for (var r = Q(n.split(" "), Xo), o = 0; o < r.length; o++) {
                    var a = void 0,
                      l = void 0;
                    o == r.length - 1
                      ? ((l = r.join(" ")), (a = i))
                      : ((l = r.slice(0, o + 1).join(" ")), (a = "..."));
                    var s = t[l];
                    if (s) {
                      if (s != a)
                        throw new Error("Inconsistent bindings for " + l);
                    } else t[l] = a;
                  }
                  delete e[n];
                }
              for (var u in t) e[u] = t[u];
              return e;
            }
            function Zo(e, t, n, i) {
              var r = (t = ea(t)).call ? t.call(e, i) : t[e];
              if (!1 === r) return "nothing";
              if ("..." === r) return "multi";
              if (null != r && n(r)) return "handled";
              if (t.fallthrough) {
                if (
                  "[object Array]" !=
                  Object.prototype.toString.call(t.fallthrough)
                )
                  return Zo(e, t.fallthrough, n, i);
                for (var o = 0; o < t.fallthrough.length; o++) {
                  var a = Zo(e, t.fallthrough[o], n, i);
                  if (a) return a;
                }
              }
            }
            function Yo(e) {
              var t = "string" == typeof e ? e : qo[e.keyCode];
              return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
            }
            function Qo(e, t, n) {
              var i = e;
              return (
                t.altKey && "Alt" != i && (e = "Alt-" + e),
                (w ? t.metaKey : t.ctrlKey) && "Ctrl" != i && (e = "Ctrl-" + e),
                (w ? t.ctrlKey : t.metaKey) && "Mod" != i && (e = "Cmd-" + e),
                !n && t.shiftKey && "Shift" != i && (e = "Shift-" + e),
                e
              );
            }
            function Jo(e, t) {
              if (h && 34 == e.keyCode && e.char) return !1;
              var n = qo[e.keyCode];
              return (
                null != n &&
                !e.altGraphKey &&
                (3 == e.keyCode && e.code && (n = e.code), Qo(n, e, t))
              );
            }
            function ea(e) {
              return "string" == typeof e ? Vo[e] : e;
            }
            function ta(e, t) {
              for (var n = e.doc.sel.ranges, i = [], r = 0; r < n.length; r++) {
                for (var o = t(n[r]); i.length && rt(o.from, Y(i).to) <= 0; ) {
                  var a = i.pop();
                  if (rt(a.from, o.from) < 0) {
                    o.from = a.from;
                    break;
                  }
                }
                i.push(o);
              }
              nr(e, function () {
                for (var t = i.length - 1; t >= 0; t--)
                  yo(e.doc, "", i[t].from, i[t].to, "+delete");
                Oi(e);
              });
            }
            function na(e, t, n) {
              var i = le(e.text, t + n, n);
              return i < 0 || i > e.text.length ? null : i;
            }
            function ia(e, t, n) {
              var i = na(e, t.ch, n);
              return null == i
                ? null
                : new it(t.line, i, n < 0 ? "after" : "before");
            }
            function ra(e, t, n, i, r) {
              if (e) {
                "rtl" == t.doc.direction && (r = -r);
                var o = he(n, t.doc.direction);
                if (o) {
                  var a,
                    l = r < 0 ? Y(o) : o[0],
                    s = r < 0 == (1 == l.level) ? "after" : "before";
                  if (l.level > 0 || "rtl" == t.doc.direction) {
                    var u = In(t, n);
                    a = r < 0 ? n.text.length - 1 : 0;
                    var c = zn(t, u, a).top;
                    (a = se(
                      function (e) {
                        return zn(t, u, e).top == c;
                      },
                      r < 0 == (1 == l.level) ? l.from : l.to - 1,
                      a
                    )),
                      "before" == s && (a = na(n, a, 1));
                  } else a = r < 0 ? l.to : l.from;
                  return new it(i, a, s);
                }
              }
              return new it(
                i,
                r < 0 ? n.text.length : 0,
                r < 0 ? "before" : "after"
              );
            }
            (Vo.basic = {
              Left: "goCharLeft",
              Right: "goCharRight",
              Up: "goLineUp",
              Down: "goLineDown",
              End: "goLineEnd",
              Home: "goLineStartSmart",
              PageUp: "goPageUp",
              PageDown: "goPageDown",
              Delete: "delCharAfter",
              Backspace: "delCharBefore",
              "Shift-Backspace": "delCharBefore",
              Tab: "defaultTab",
              "Shift-Tab": "indentAuto",
              Enter: "newlineAndIndent",
              Insert: "toggleOverwrite",
              Esc: "singleSelection",
            }),
              (Vo.pcDefault = {
                "Ctrl-A": "selectAll",
                "Ctrl-D": "deleteLine",
                "Ctrl-Z": "undo",
                "Shift-Ctrl-Z": "redo",
                "Ctrl-Y": "redo",
                "Ctrl-Home": "goDocStart",
                "Ctrl-End": "goDocEnd",
                "Ctrl-Up": "goLineUp",
                "Ctrl-Down": "goLineDown",
                "Ctrl-Left": "goGroupLeft",
                "Ctrl-Right": "goGroupRight",
                "Alt-Left": "goLineStart",
                "Alt-Right": "goLineEnd",
                "Ctrl-Backspace": "delGroupBefore",
                "Ctrl-Delete": "delGroupAfter",
                "Ctrl-S": "save",
                "Ctrl-F": "find",
                "Ctrl-G": "findNext",
                "Shift-Ctrl-G": "findPrev",
                "Shift-Ctrl-F": "replace",
                "Shift-Ctrl-R": "replaceAll",
                "Ctrl-[": "indentLess",
                "Ctrl-]": "indentMore",
                "Ctrl-U": "undoSelection",
                "Shift-Ctrl-U": "redoSelection",
                "Alt-U": "redoSelection",
                fallthrough: "basic",
              }),
              (Vo.emacsy = {
                "Ctrl-F": "goCharRight",
                "Ctrl-B": "goCharLeft",
                "Ctrl-P": "goLineUp",
                "Ctrl-N": "goLineDown",
                "Ctrl-A": "goLineStart",
                "Ctrl-E": "goLineEnd",
                "Ctrl-V": "goPageDown",
                "Shift-Ctrl-V": "goPageUp",
                "Ctrl-D": "delCharAfter",
                "Ctrl-H": "delCharBefore",
                "Alt-Backspace": "delWordBefore",
                "Ctrl-K": "killLine",
                "Ctrl-T": "transposeChars",
                "Ctrl-O": "openLine",
              }),
              (Vo.macDefault = {
                "Cmd-A": "selectAll",
                "Cmd-D": "deleteLine",
                "Cmd-Z": "undo",
                "Shift-Cmd-Z": "redo",
                "Cmd-Y": "redo",
                "Cmd-Home": "goDocStart",
                "Cmd-Up": "goDocStart",
                "Cmd-End": "goDocEnd",
                "Cmd-Down": "goDocEnd",
                "Alt-Left": "goGroupLeft",
                "Alt-Right": "goGroupRight",
                "Cmd-Left": "goLineLeft",
                "Cmd-Right": "goLineRight",
                "Alt-Backspace": "delGroupBefore",
                "Ctrl-Alt-Backspace": "delGroupAfter",
                "Alt-Delete": "delGroupAfter",
                "Cmd-S": "save",
                "Cmd-F": "find",
                "Cmd-G": "findNext",
                "Shift-Cmd-G": "findPrev",
                "Cmd-Alt-F": "replace",
                "Shift-Cmd-Alt-F": "replaceAll",
                "Cmd-[": "indentLess",
                "Cmd-]": "indentMore",
                "Cmd-Backspace": "delWrappedLineLeft",
                "Cmd-Delete": "delWrappedLineRight",
                "Cmd-U": "undoSelection",
                "Shift-Cmd-U": "redoSelection",
                "Ctrl-Up": "goDocStart",
                "Ctrl-Down": "goDocEnd",
                fallthrough: ["basic", "emacsy"],
              }),
              (Vo.default = y ? Vo.macDefault : Vo.pcDefault);
            var oa = {
              selectAll: ho,
              singleSelection: function (e) {
                return e.setSelection(
                  e.getCursor("anchor"),
                  e.getCursor("head"),
                  $
                );
              },
              killLine: function (e) {
                return ta(e, function (t) {
                  if (t.empty()) {
                    var n = Ke(e.doc, t.head.line).text.length;
                    return t.head.ch == n && t.head.line < e.lastLine()
                      ? { from: t.head, to: it(t.head.line + 1, 0) }
                      : { from: t.head, to: it(t.head.line, n) };
                  }
                  return { from: t.from(), to: t.to() };
                });
              },
              deleteLine: function (e) {
                return ta(e, function (t) {
                  return {
                    from: it(t.from().line, 0),
                    to: ct(e.doc, it(t.to().line + 1, 0)),
                  };
                });
              },
              delLineLeft: function (e) {
                return ta(e, function (e) {
                  return { from: it(e.from().line, 0), to: e.from() };
                });
              },
              delWrappedLineLeft: function (e) {
                return ta(e, function (t) {
                  var n = e.charCoords(t.head, "div").top + 5;
                  return {
                    from: e.coordsChar({ left: 0, top: n }, "div"),
                    to: t.from(),
                  };
                });
              },
              delWrappedLineRight: function (e) {
                return ta(e, function (t) {
                  var n = e.charCoords(t.head, "div").top + 5,
                    i = e.coordsChar(
                      { left: e.display.lineDiv.offsetWidth + 100, top: n },
                      "div"
                    );
                  return { from: t.from(), to: i };
                });
              },
              undo: function (e) {
                return e.undo();
              },
              redo: function (e) {
                return e.redo();
              },
              undoSelection: function (e) {
                return e.undoSelection();
              },
              redoSelection: function (e) {
                return e.redoSelection();
              },
              goDocStart: function (e) {
                return e.extendSelection(it(e.firstLine(), 0));
              },
              goDocEnd: function (e) {
                return e.extendSelection(it(e.lastLine()));
              },
              goLineStart: function (e) {
                return e.extendSelectionsBy(
                  function (t) {
                    return aa(e, t.head.line);
                  },
                  { origin: "+move", bias: 1 }
                );
              },
              goLineStartSmart: function (e) {
                return e.extendSelectionsBy(
                  function (t) {
                    return la(e, t.head);
                  },
                  { origin: "+move", bias: 1 }
                );
              },
              goLineEnd: function (e) {
                return e.extendSelectionsBy(
                  function (t) {
                    return (function (e, t) {
                      var n = Ke(e.doc, t),
                        i = (function (e) {
                          for (var t; (t = Rt(e)); ) e = t.find(1, !0).line;
                          return e;
                        })(n);
                      i != n && (t = Je(i));
                      return ra(!0, e, n, t, -1);
                    })(e, t.head.line);
                  },
                  { origin: "+move", bias: -1 }
                );
              },
              goLineRight: function (e) {
                return e.extendSelectionsBy(function (t) {
                  var n = e.cursorCoords(t.head, "div").top + 5;
                  return e.coordsChar(
                    { left: e.display.lineDiv.offsetWidth + 100, top: n },
                    "div"
                  );
                }, V);
              },
              goLineLeft: function (e) {
                return e.extendSelectionsBy(function (t) {
                  var n = e.cursorCoords(t.head, "div").top + 5;
                  return e.coordsChar({ left: 0, top: n }, "div");
                }, V);
              },
              goLineLeftSmart: function (e) {
                return e.extendSelectionsBy(function (t) {
                  var n = e.cursorCoords(t.head, "div").top + 5,
                    i = e.coordsChar({ left: 0, top: n }, "div");
                  return i.ch < e.getLine(i.line).search(/\S/)
                    ? la(e, t.head)
                    : i;
                }, V);
              },
              goLineUp: function (e) {
                return e.moveV(-1, "line");
              },
              goLineDown: function (e) {
                return e.moveV(1, "line");
              },
              goPageUp: function (e) {
                return e.moveV(-1, "page");
              },
              goPageDown: function (e) {
                return e.moveV(1, "page");
              },
              goCharLeft: function (e) {
                return e.moveH(-1, "char");
              },
              goCharRight: function (e) {
                return e.moveH(1, "char");
              },
              goColumnLeft: function (e) {
                return e.moveH(-1, "column");
              },
              goColumnRight: function (e) {
                return e.moveH(1, "column");
              },
              goWordLeft: function (e) {
                return e.moveH(-1, "word");
              },
              goGroupRight: function (e) {
                return e.moveH(1, "group");
              },
              goGroupLeft: function (e) {
                return e.moveH(-1, "group");
              },
              goWordRight: function (e) {
                return e.moveH(1, "word");
              },
              delCharBefore: function (e) {
                return e.deleteH(-1, "codepoint");
              },
              delCharAfter: function (e) {
                return e.deleteH(1, "char");
              },
              delWordBefore: function (e) {
                return e.deleteH(-1, "word");
              },
              delWordAfter: function (e) {
                return e.deleteH(1, "word");
              },
              delGroupBefore: function (e) {
                return e.deleteH(-1, "group");
              },
              delGroupAfter: function (e) {
                return e.deleteH(1, "group");
              },
              indentAuto: function (e) {
                return e.indentSelection("smart");
              },
              indentMore: function (e) {
                return e.indentSelection("add");
              },
              indentLess: function (e) {
                return e.indentSelection("subtract");
              },
              insertTab: function (e) {
                return e.replaceSelection("\t");
              },
              insertSoftTab: function (e) {
                for (
                  var t = [],
                    n = e.listSelections(),
                    i = e.options.tabSize,
                    r = 0;
                  r < n.length;
                  r++
                ) {
                  var o = n[r].from(),
                    a = W(e.getLine(o.line), o.ch, i);
                  t.push(Z(i - (a % i)));
                }
                e.replaceSelections(t);
              },
              defaultTab: function (e) {
                e.somethingSelected()
                  ? e.indentSelection("add")
                  : e.execCommand("insertTab");
              },
              transposeChars: function (e) {
                return nr(e, function () {
                  for (
                    var t = e.listSelections(), n = [], i = 0;
                    i < t.length;
                    i++
                  )
                    if (t[i].empty()) {
                      var r = t[i].head,
                        o = Ke(e.doc, r.line).text;
                      if (o)
                        if (
                          (r.ch == o.length && (r = new it(r.line, r.ch - 1)),
                          r.ch > 0)
                        )
                          (r = new it(r.line, r.ch + 1)),
                            e.replaceRange(
                              o.charAt(r.ch - 1) + o.charAt(r.ch - 2),
                              it(r.line, r.ch - 2),
                              r,
                              "+transpose"
                            );
                        else if (r.line > e.doc.first) {
                          var a = Ke(e.doc, r.line - 1).text;
                          a &&
                            ((r = new it(r.line, 1)),
                            e.replaceRange(
                              o.charAt(0) +
                                e.doc.lineSeparator() +
                                a.charAt(a.length - 1),
                              it(r.line - 1, a.length - 1),
                              r,
                              "+transpose"
                            ));
                        }
                      n.push(new Ar(r, r));
                    }
                  e.setSelections(n);
                });
              },
              newlineAndIndent: function (e) {
                return nr(e, function () {
                  for (
                    var t = e.listSelections(), n = t.length - 1;
                    n >= 0;
                    n--
                  )
                    e.replaceRange(
                      e.doc.lineSeparator(),
                      t[n].anchor,
                      t[n].head,
                      "+input"
                    );
                  t = e.listSelections();
                  for (var i = 0; i < t.length; i++)
                    e.indentLine(t[i].from().line, null, !0);
                  Oi(e);
                });
              },
              openLine: function (e) {
                return e.replaceSelection("\n", "start");
              },
              toggleOverwrite: function (e) {
                return e.toggleOverwrite();
              },
            };
            function aa(e, t) {
              var n = Ke(e.doc, t),
                i = Wt(n);
              return i != n && (t = Je(i)), ra(!0, e, i, t, 1);
            }
            function la(e, t) {
              var n = aa(e, t.line),
                i = Ke(e.doc, n.line),
                r = he(i, e.doc.direction);
              if (!r || 0 == r[0].level) {
                var o = Math.max(n.ch, i.text.search(/\S/)),
                  a = t.line == n.line && t.ch <= o && t.ch;
                return it(n.line, a ? 0 : o, n.sticky);
              }
              return n;
            }
            function sa(e, t, n) {
              if ("string" == typeof t && !(t = oa[t])) return !1;
              e.display.input.ensurePolled();
              var i = e.display.shift,
                r = !1;
              try {
                e.isReadOnly() && (e.state.suppressEdits = !0),
                  n && (e.display.shift = !1),
                  (r = t(e) != U);
              } finally {
                (e.display.shift = i), (e.state.suppressEdits = !1);
              }
              return r;
            }
            var ua = new j();
            function ca(e, t, n, i) {
              var r = e.state.keySeq;
              if (r) {
                if (Yo(t)) return "handled";
                if (
                  (/\'$/.test(t)
                    ? (e.state.keySeq = null)
                    : ua.set(50, function () {
                        e.state.keySeq == r &&
                          ((e.state.keySeq = null), e.display.input.reset());
                      }),
                  da(e, r + " " + t, n, i))
                )
                  return !0;
              }
              return da(e, t, n, i);
            }
            function da(e, t, n, i) {
              var r = (function (e, t, n) {
                for (var i = 0; i < e.state.keyMaps.length; i++) {
                  var r = Zo(t, e.state.keyMaps[i], n, e);
                  if (r) return r;
                }
                return (
                  (e.options.extraKeys && Zo(t, e.options.extraKeys, n, e)) ||
                  Zo(t, e.options.keyMap, n, e)
                );
              })(e, t, i);
              return (
                "multi" == r && (e.state.keySeq = t),
                "handled" == r && dn(e, "keyHandled", e, t, n),
                ("handled" != r && "multi" != r) || (Ce(n), ki(e)),
                !!r
              );
            }
            function ha(e, t) {
              var n = Jo(t, !0);
              return (
                !!n &&
                (t.shiftKey && !e.state.keySeq
                  ? ca(e, "Shift-" + n, t, function (t) {
                      return sa(e, t, !0);
                    }) ||
                    ca(e, n, t, function (t) {
                      if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion)
                        return sa(e, t);
                    })
                  : ca(e, n, t, function (t) {
                      return sa(e, t);
                    }))
              );
            }
            var fa = null;
            function pa(e) {
              var t = this;
              if (
                !(
                  (e.target && e.target != t.display.input.getField()) ||
                  ((t.curOp.focus = N(H(t))), xe(t, e))
                )
              ) {
                a && l < 11 && 27 == e.keyCode && (e.returnValue = !1);
                var i = e.keyCode;
                t.display.shift = 16 == i || e.shiftKey;
                var r = ha(t, e);
                h &&
                  ((fa = r ? i : null),
                  r ||
                    88 != i ||
                    ze ||
                    !(y ? e.metaKey : e.ctrlKey) ||
                    t.replaceSelection("", null, "cut")),
                  n &&
                    !y &&
                    !r &&
                    46 == i &&
                    e.shiftKey &&
                    !e.ctrlKey &&
                    document.execCommand &&
                    document.execCommand("cut"),
                  18 != i ||
                    /\bCodeMirror-crosshair\b/.test(
                      t.display.lineDiv.className
                    ) ||
                    (function (e) {
                      var t = e.display.lineDiv;
                      function n(e) {
                        (18 != e.keyCode && e.altKey) ||
                          (A(t, "CodeMirror-crosshair"),
                          ge(document, "keyup", n),
                          ge(document, "mouseover", n));
                      }
                      O(t, "CodeMirror-crosshair"),
                        pe(document, "keyup", n),
                        pe(document, "mouseover", n);
                    })(t);
              }
            }
            function ma(e) {
              16 == e.keyCode && (this.doc.sel.shift = !1), xe(this, e);
            }
            function ga(e) {
              var t = this;
              if (
                !(
                  (e.target && e.target != t.display.input.getField()) ||
                  Sn(t.display, e) ||
                  xe(t, e) ||
                  (e.ctrlKey && !e.altKey) ||
                  (y && e.metaKey)
                )
              ) {
                var n = e.keyCode,
                  i = e.charCode;
                if (h && n == fa) return (fa = null), void Ce(e);
                if (!h || (e.which && !(e.which < 10)) || !ha(t, e)) {
                  var r = String.fromCharCode(null == i ? n : i);
                  "\b" != r &&
                    ((function (e, t, n) {
                      return ca(e, "'" + n + "'", t, function (t) {
                        return sa(e, t, !0);
                      });
                    })(t, e, r) ||
                      t.display.input.onKeyPress(e));
                }
              }
            }
            var va,
              xa,
              ya = function (e, t, n) {
                (this.time = e), (this.pos = t), (this.button = n);
              };
            function ba(e) {
              var t = this,
                n = t.display;
              if (!(xe(t, e) || (n.activeTouch && n.input.supportsTouch())))
                if ((n.input.ensurePolled(), (n.shift = e.shiftKey), Sn(n, e)))
                  s ||
                    ((n.scroller.draggable = !1),
                    setTimeout(function () {
                      return (n.scroller.draggable = !0);
                    }, 100));
                else if (!wa(t, e)) {
                  var i = hi(t, e),
                    r = Ae(e),
                    o = i
                      ? (function (e, t) {
                          var n = +new Date();
                          return xa && xa.compare(n, e, t)
                            ? ((va = xa = null), "triple")
                            : va && va.compare(n, e, t)
                            ? ((xa = new ya(n, e, t)), (va = null), "double")
                            : ((va = new ya(n, e, t)), (xa = null), "single");
                        })(i, r)
                      : "single";
                  R(t).focus(),
                    1 == r && t.state.selectingText && t.state.selectingText(e),
                    (i &&
                      (function (e, t, n, i, r) {
                        var o = "Click";
                        "double" == i
                          ? (o = "Double" + o)
                          : "triple" == i && (o = "Triple" + o);
                        return ca(
                          e,
                          Qo(
                            (o =
                              (1 == t ? "Left" : 2 == t ? "Middle" : "Right") +
                              o),
                            r
                          ),
                          r,
                          function (t) {
                            if (("string" == typeof t && (t = oa[t]), !t))
                              return !1;
                            var i = !1;
                            try {
                              e.isReadOnly() && (e.state.suppressEdits = !0),
                                (i = t(e, n) != U);
                            } finally {
                              e.state.suppressEdits = !1;
                            }
                            return i;
                          }
                        );
                      })(t, r, i, o, e)) ||
                      (1 == r
                        ? i
                          ? (function (e, t, n, i) {
                              a
                                ? setTimeout(P(Si, e), 0)
                                : (e.curOp.focus = N(H(e)));
                              var r,
                                o = (function (e, t, n) {
                                  var i = e.getOption("configureMouse"),
                                    r = i ? i(e, t, n) : {};
                                  if (null == r.unit) {
                                    var o = b
                                      ? n.shiftKey && n.metaKey
                                      : n.altKey;
                                    r.unit = o
                                      ? "rectangle"
                                      : "single" == t
                                      ? "char"
                                      : "double" == t
                                      ? "word"
                                      : "line";
                                  }
                                  (null == r.extend || e.doc.extend) &&
                                    (r.extend = e.doc.extend || n.shiftKey);
                                  null == r.addNew &&
                                    (r.addNew = y ? n.metaKey : n.ctrlKey);
                                  null == r.moveOnDrag &&
                                    (r.moveOnDrag = !(y
                                      ? n.altKey
                                      : n.ctrlKey));
                                  return r;
                                })(e, n, i),
                                u = e.doc.sel;
                              e.options.dragDrop &&
                              Te &&
                              !e.isReadOnly() &&
                              "single" == n &&
                              (r = u.contains(t)) > -1 &&
                              (rt((r = u.ranges[r]).from(), t) < 0 ||
                                t.xRel > 0) &&
                              (rt(r.to(), t) > 0 || t.xRel < 0)
                                ? (function (e, t, n, i) {
                                    var r = e.display,
                                      o = !1,
                                      u = ir(e, function (t) {
                                        s && (r.scroller.draggable = !1),
                                          (e.state.draggingText = !1),
                                          e.state.delayingBlurEvent &&
                                            (e.hasFocus()
                                              ? (e.state.delayingBlurEvent = !1)
                                              : Fi(e)),
                                          ge(
                                            r.wrapper.ownerDocument,
                                            "mouseup",
                                            u
                                          ),
                                          ge(
                                            r.wrapper.ownerDocument,
                                            "mousemove",
                                            c
                                          ),
                                          ge(r.scroller, "dragstart", d),
                                          ge(r.scroller, "drop", u),
                                          o ||
                                            (Ce(t),
                                            i.addNew ||
                                              Qr(
                                                e.doc,
                                                n,
                                                null,
                                                null,
                                                i.extend
                                              ),
                                            (s && !f) || (a && 9 == l)
                                              ? setTimeout(function () {
                                                  r.wrapper.ownerDocument.body.focus(
                                                    { preventScroll: !0 }
                                                  ),
                                                    r.input.focus();
                                                }, 20)
                                              : r.input.focus());
                                      }),
                                      c = function (e) {
                                        o =
                                          o ||
                                          Math.abs(t.clientX - e.clientX) +
                                            Math.abs(t.clientY - e.clientY) >=
                                            10;
                                      },
                                      d = function () {
                                        return (o = !0);
                                      };
                                    s && (r.scroller.draggable = !0);
                                    (e.state.draggingText = u),
                                      (u.copy = !i.moveOnDrag),
                                      pe(r.wrapper.ownerDocument, "mouseup", u),
                                      pe(
                                        r.wrapper.ownerDocument,
                                        "mousemove",
                                        c
                                      ),
                                      pe(r.scroller, "dragstart", d),
                                      pe(r.scroller, "drop", u),
                                      (e.state.delayingBlurEvent = !0),
                                      setTimeout(function () {
                                        return r.input.focus();
                                      }, 20),
                                      r.scroller.dragDrop &&
                                        r.scroller.dragDrop();
                                  })(e, i, t, o)
                                : (function (e, t, n, i) {
                                    a && Fi(e);
                                    var r = e.display,
                                      o = e.doc;
                                    Ce(t);
                                    var l,
                                      s,
                                      u = o.sel,
                                      c = u.ranges;
                                    i.addNew && !i.extend
                                      ? ((s = o.sel.contains(n)),
                                        (l = s > -1 ? c[s] : new Ar(n, n)))
                                      : ((l = o.sel.primary()),
                                        (s = o.sel.primIndex));
                                    if ("rectangle" == i.unit)
                                      i.addNew || (l = new Ar(n, n)),
                                        (n = hi(e, t, !0, !0)),
                                        (s = -1);
                                    else {
                                      var d = Da(e, n, i.unit);
                                      l = i.extend
                                        ? Yr(l, d.anchor, d.head, i.extend)
                                        : d;
                                    }
                                    i.addNew
                                      ? -1 == s
                                        ? ((s = c.length),
                                          io(o, Er(e, c.concat([l]), s), {
                                            scroll: !1,
                                            origin: "*mouse",
                                          }))
                                        : c.length > 1 &&
                                          c[s].empty() &&
                                          "char" == i.unit &&
                                          !i.extend
                                        ? (io(
                                            o,
                                            Er(
                                              e,
                                              c
                                                .slice(0, s)
                                                .concat(c.slice(s + 1)),
                                              0
                                            ),
                                            { scroll: !1, origin: "*mouse" }
                                          ),
                                          (u = o.sel))
                                        : eo(o, s, l, G)
                                      : ((s = 0),
                                        io(o, new Fr([l], 0), G),
                                        (u = o.sel));
                                    var h = n;
                                    function f(t) {
                                      if (0 != rt(h, t))
                                        if (((h = t), "rectangle" == i.unit)) {
                                          for (
                                            var r = [],
                                              a = e.options.tabSize,
                                              c = W(
                                                Ke(o, n.line).text,
                                                n.ch,
                                                a
                                              ),
                                              d = W(
                                                Ke(o, t.line).text,
                                                t.ch,
                                                a
                                              ),
                                              f = Math.min(c, d),
                                              p = Math.max(c, d),
                                              m = Math.min(n.line, t.line),
                                              g = Math.min(
                                                e.lastLine(),
                                                Math.max(n.line, t.line)
                                              );
                                            m <= g;
                                            m++
                                          ) {
                                            var v = Ke(o, m).text,
                                              x = X(v, f, a);
                                            f == p
                                              ? r.push(
                                                  new Ar(it(m, x), it(m, x))
                                                )
                                              : v.length > x &&
                                                r.push(
                                                  new Ar(
                                                    it(m, x),
                                                    it(m, X(v, p, a))
                                                  )
                                                );
                                          }
                                          r.length || r.push(new Ar(n, n)),
                                            io(
                                              o,
                                              Er(
                                                e,
                                                u.ranges.slice(0, s).concat(r),
                                                s
                                              ),
                                              { origin: "*mouse", scroll: !1 }
                                            ),
                                            e.scrollIntoView(t);
                                        } else {
                                          var y,
                                            b = l,
                                            D = Da(e, t, i.unit),
                                            C = b.anchor;
                                          rt(D.anchor, C) > 0
                                            ? ((y = D.head),
                                              (C = st(b.from(), D.anchor)))
                                            : ((y = D.anchor),
                                              (C = lt(b.to(), D.head)));
                                          var w = u.ranges.slice(0);
                                          (w[s] = (function (e, t) {
                                            var n = t.anchor,
                                              i = t.head,
                                              r = Ke(e.doc, n.line);
                                            if (
                                              0 == rt(n, i) &&
                                              n.sticky == i.sticky
                                            )
                                              return t;
                                            var o = he(r);
                                            if (!o) return t;
                                            var a = ce(o, n.ch, n.sticky),
                                              l = o[a];
                                            if (l.from != n.ch && l.to != n.ch)
                                              return t;
                                            var s,
                                              u =
                                                a +
                                                ((l.from == n.ch) ==
                                                (1 != l.level)
                                                  ? 0
                                                  : 1);
                                            if (0 == u || u == o.length)
                                              return t;
                                            if (i.line != n.line)
                                              s =
                                                (i.line - n.line) *
                                                  ("ltr" == e.doc.direction
                                                    ? 1
                                                    : -1) >
                                                0;
                                            else {
                                              var c = ce(o, i.ch, i.sticky),
                                                d =
                                                  c - a ||
                                                  (i.ch - n.ch) *
                                                    (1 == l.level ? -1 : 1);
                                              s =
                                                c == u - 1 || c == u
                                                  ? d < 0
                                                  : d > 0;
                                            }
                                            var h = o[u + (s ? -1 : 0)],
                                              f = s == (1 == h.level),
                                              p = f ? h.from : h.to,
                                              m = f ? "after" : "before";
                                            return n.ch == p && n.sticky == m
                                              ? t
                                              : new Ar(new it(n.line, p, m), i);
                                          })(e, new Ar(ct(o, C), y))),
                                            io(o, Er(e, w, s), G);
                                        }
                                    }
                                    var p = r.wrapper.getBoundingClientRect(),
                                      m = 0;
                                    function g(t) {
                                      var n = ++m,
                                        a = hi(e, t, !0, "rectangle" == i.unit);
                                      if (a)
                                        if (0 != rt(a, h)) {
                                          (e.curOp.focus = N(H(e))), f(a);
                                          var l = Mi(r, o);
                                          (a.line >= l.to || a.line < l.from) &&
                                            setTimeout(
                                              ir(e, function () {
                                                m == n && g(t);
                                              }),
                                              150
                                            );
                                        } else {
                                          var s =
                                            t.clientY < p.top
                                              ? -20
                                              : t.clientY > p.bottom
                                              ? 20
                                              : 0;
                                          s &&
                                            setTimeout(
                                              ir(e, function () {
                                                m == n &&
                                                  ((r.scroller.scrollTop += s),
                                                  g(t));
                                              }),
                                              50
                                            );
                                        }
                                    }
                                    function v(t) {
                                      (e.state.selectingText = !1),
                                        (m = 1 / 0),
                                        t && (Ce(t), r.input.focus()),
                                        ge(
                                          r.wrapper.ownerDocument,
                                          "mousemove",
                                          x
                                        ),
                                        ge(
                                          r.wrapper.ownerDocument,
                                          "mouseup",
                                          y
                                        ),
                                        (o.history.lastSelOrigin = null);
                                    }
                                    var x = ir(e, function (e) {
                                        0 !== e.buttons && Ae(e) ? g(e) : v(e);
                                      }),
                                      y = ir(e, v);
                                    (e.state.selectingText = y),
                                      pe(
                                        r.wrapper.ownerDocument,
                                        "mousemove",
                                        x
                                      ),
                                      pe(r.wrapper.ownerDocument, "mouseup", y);
                                  })(e, i, t, o);
                            })(t, i, o, e)
                          : Fe(e) == n.scroller && Ce(e)
                        : 2 == r
                        ? (i && Qr(t.doc, i),
                          setTimeout(function () {
                            return n.input.focus();
                          }, 20))
                        : 3 == r &&
                          (k ? t.display.input.onContextMenu(e) : Fi(t)));
                }
            }
            function Da(e, t, n) {
              if ("char" == n) return new Ar(t, t);
              if ("word" == n) return e.findWordAt(t);
              if ("line" == n)
                return new Ar(it(t.line, 0), ct(e.doc, it(t.line + 1, 0)));
              var i = n(e, t);
              return new Ar(i.from, i.to);
            }
            function Ca(e, t, n, i) {
              var r, o;
              if (t.touches)
                (r = t.touches[0].clientX), (o = t.touches[0].clientY);
              else
                try {
                  (r = t.clientX), (o = t.clientY);
                } catch (e) {
                  return !1;
                }
              if (
                r >= Math.floor(e.display.gutters.getBoundingClientRect().right)
              )
                return !1;
              i && Ce(t);
              var a = e.display,
                l = a.lineDiv.getBoundingClientRect();
              if (o > l.bottom || !be(e, n)) return ke(t);
              o -= l.top - a.viewOffset;
              for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                var u = a.gutters.childNodes[s];
                if (u && u.getBoundingClientRect().right >= r)
                  return (
                    ve(
                      e,
                      n,
                      e,
                      et(e.doc, o),
                      e.display.gutterSpecs[s].className,
                      t
                    ),
                    ke(t)
                  );
              }
            }
            function wa(e, t) {
              return Ca(e, t, "gutterClick", !0);
            }
            function ka(e, t) {
              Sn(e.display, t) ||
                (function (e, t) {
                  if (!be(e, "gutterContextMenu")) return !1;
                  return Ca(e, t, "gutterContextMenu", !1);
                })(e, t) ||
                xe(e, t, "contextmenu") ||
                k ||
                e.display.input.onContextMenu(t);
            }
            function Sa(e) {
              (e.display.wrapper.className =
                e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
                e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
                qn(e);
            }
            ya.prototype.compare = function (e, t, n) {
              return (
                this.time + 400 > e && 0 == rt(t, this.pos) && n == this.button
              );
            };
            var Fa = {
                toString: function () {
                  return "CodeMirror.Init";
                },
              },
              Aa = {},
              Ea = {};
            function La(e, t, n) {
              if (!t != !(n && n != Fa)) {
                var i = e.display.dragFunctions,
                  r = t ? pe : ge;
                r(e.display.scroller, "dragstart", i.start),
                  r(e.display.scroller, "dragenter", i.enter),
                  r(e.display.scroller, "dragover", i.over),
                  r(e.display.scroller, "dragleave", i.leave),
                  r(e.display.scroller, "drop", i.drop);
              }
            }
            function Ta(e) {
              e.options.lineWrapping
                ? (O(e.display.wrapper, "CodeMirror-wrap"),
                  (e.display.sizer.style.minWidth = ""),
                  (e.display.sizerWidth = null))
                : (A(e.display.wrapper, "CodeMirror-wrap"), Xt(e)),
                di(e),
                pi(e),
                qn(e),
                setTimeout(function () {
                  return Ui(e);
                }, 100);
            }
            function Ma(e, t) {
              var n = this;
              if (!(this instanceof Ma)) return new Ma(e, t);
              (this.options = t = t ? _(t) : {}), _(Aa, t, !1);
              var i = t.value;
              "string" == typeof i
                ? (i = new Io(i, t.mode, null, t.lineSeparator, t.direction))
                : t.mode && (i.modeOption = t.mode),
                (this.doc = i);
              var r = new Ma.inputStyles[t.inputStyle](this),
                o = (this.display = new br(e, i, r, t));
              for (var u in ((o.wrapper.CodeMirror = this),
              Sa(this),
              t.lineWrapping &&
                (this.display.wrapper.className += " CodeMirror-wrap"),
              Vi(this),
              (this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: -1,
                cutIncoming: -1,
                selectingText: !1,
                draggingText: !1,
                highlight: new j(),
                keySeq: null,
                specialChars: null,
              }),
              t.autofocus && !x && o.input.focus(),
              a &&
                l < 11 &&
                setTimeout(function () {
                  return n.display.input.reset(!0);
                }, 20),
              (function (e) {
                var t = e.display;
                pe(t.scroller, "mousedown", ir(e, ba)),
                  pe(
                    t.scroller,
                    "dblclick",
                    a && l < 11
                      ? ir(e, function (t) {
                          if (!xe(e, t)) {
                            var n = hi(e, t);
                            if (n && !wa(e, t) && !Sn(e.display, t)) {
                              Ce(t);
                              var i = e.findWordAt(n);
                              Qr(e.doc, i.anchor, i.head);
                            }
                          }
                        })
                      : function (t) {
                          return xe(e, t) || Ce(t);
                        }
                  );
                pe(t.scroller, "contextmenu", function (t) {
                  return ka(e, t);
                }),
                  pe(t.input.getField(), "contextmenu", function (n) {
                    t.scroller.contains(n.target) || ka(e, n);
                  });
                var n,
                  i = { end: 0 };
                function r() {
                  t.activeTouch &&
                    ((n = setTimeout(function () {
                      return (t.activeTouch = null);
                    }, 1e3)),
                    ((i = t.activeTouch).end = +new Date()));
                }
                function o(e) {
                  if (1 != e.touches.length) return !1;
                  var t = e.touches[0];
                  return t.radiusX <= 1 && t.radiusY <= 1;
                }
                function s(e, t) {
                  if (null == t.left) return !0;
                  var n = t.left - e.left,
                    i = t.top - e.top;
                  return n * n + i * i > 400;
                }
                pe(t.scroller, "touchstart", function (r) {
                  if (!xe(e, r) && !o(r) && !wa(e, r)) {
                    t.input.ensurePolled(), clearTimeout(n);
                    var a = +new Date();
                    (t.activeTouch = {
                      start: a,
                      moved: !1,
                      prev: a - i.end <= 300 ? i : null,
                    }),
                      1 == r.touches.length &&
                        ((t.activeTouch.left = r.touches[0].pageX),
                        (t.activeTouch.top = r.touches[0].pageY));
                  }
                }),
                  pe(t.scroller, "touchmove", function () {
                    t.activeTouch && (t.activeTouch.moved = !0);
                  }),
                  pe(t.scroller, "touchend", function (n) {
                    var i = t.activeTouch;
                    if (
                      i &&
                      !Sn(t, n) &&
                      null != i.left &&
                      !i.moved &&
                      new Date() - i.start < 300
                    ) {
                      var o,
                        a = e.coordsChar(t.activeTouch, "page");
                      (o =
                        !i.prev || s(i, i.prev)
                          ? new Ar(a, a)
                          : !i.prev.prev || s(i, i.prev.prev)
                          ? e.findWordAt(a)
                          : new Ar(
                              it(a.line, 0),
                              ct(e.doc, it(a.line + 1, 0))
                            )),
                        e.setSelection(o.anchor, o.head),
                        e.focus(),
                        Ce(n);
                    }
                    r();
                  }),
                  pe(t.scroller, "touchcancel", r),
                  pe(t.scroller, "scroll", function () {
                    t.scroller.clientHeight &&
                      (Ri(e, t.scroller.scrollTop),
                      _i(e, t.scroller.scrollLeft, !0),
                      ve(e, "scroll", e));
                  }),
                  pe(t.scroller, "mousewheel", function (t) {
                    return Sr(e, t);
                  }),
                  pe(t.scroller, "DOMMouseScroll", function (t) {
                    return Sr(e, t);
                  }),
                  pe(t.wrapper, "scroll", function () {
                    return (t.wrapper.scrollTop = t.wrapper.scrollLeft = 0);
                  }),
                  (t.dragFunctions = {
                    enter: function (t) {
                      xe(e, t) || Se(t);
                    },
                    over: function (t) {
                      xe(e, t) ||
                        (!(function (e, t) {
                          var n = hi(e, t);
                          if (n) {
                            var i = document.createDocumentFragment();
                            Di(e, n, i),
                              e.display.dragCursor ||
                                ((e.display.dragCursor = T(
                                  "div",
                                  null,
                                  "CodeMirror-cursors CodeMirror-dragcursors"
                                )),
                                e.display.lineSpace.insertBefore(
                                  e.display.dragCursor,
                                  e.display.cursorDiv
                                )),
                              L(e.display.dragCursor, i);
                          }
                        })(e, t),
                        Se(t));
                    },
                    start: function (t) {
                      return (function (e, t) {
                        if (
                          a &&
                          (!e.state.draggingText || +new Date() - zo < 100)
                        )
                          Se(t);
                        else if (
                          !xe(e, t) &&
                          !Sn(e.display, t) &&
                          (t.dataTransfer.setData("Text", e.getSelection()),
                          (t.dataTransfer.effectAllowed = "copyMove"),
                          t.dataTransfer.setDragImage && !f)
                        ) {
                          var n = T(
                            "img",
                            null,
                            null,
                            "position: fixed; left: 0; top: 0;"
                          );
                          (n.src =
                            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                            h &&
                              ((n.width = n.height = 1),
                              e.display.wrapper.appendChild(n),
                              (n._top = n.offsetTop)),
                            t.dataTransfer.setDragImage(n, 0, 0),
                            h && n.parentNode.removeChild(n);
                        }
                      })(e, t);
                    },
                    drop: ir(e, Ho),
                    leave: function (t) {
                      xe(e, t) || Ro(e);
                    },
                  });
                var u = t.input.getField();
                pe(u, "keyup", function (t) {
                  return ma.call(e, t);
                }),
                  pe(u, "keydown", ir(e, pa)),
                  pe(u, "keypress", ir(e, ga)),
                  pe(u, "focus", function (t) {
                    return Ai(e, t);
                  }),
                  pe(u, "blur", function (t) {
                    return Ei(e, t);
                  });
              })(this),
              Wo(),
              Ki(this),
              (this.curOp.forceUpdate = !0),
              Pr(this, i),
              (t.autofocus && !x) || this.hasFocus()
                ? setTimeout(function () {
                    n.hasFocus() && !n.state.focused && Ai(n);
                  }, 20)
                : Ei(this),
              Ea))
                Ea.hasOwnProperty(u) && Ea[u](this, t[u], Fa);
              gr(this), t.finishInit && t.finishInit(this);
              for (var c = 0; c < Ba.length; ++c) Ba[c](this);
              Zi(this),
                s &&
                  t.lineWrapping &&
                  "optimizelegibility" ==
                    getComputedStyle(o.lineDiv).textRendering &&
                  (o.lineDiv.style.textRendering = "auto");
            }
            (Ma.defaults = Aa), (Ma.optionHandlers = Ea);
            var Ba = [];
            function Na(e, t, n, i) {
              var r,
                o = e.doc;
              null == n && (n = "add"),
                "smart" == n &&
                  (o.mode.indent ? (r = gt(e, t).state) : (n = "prev"));
              var a = e.options.tabSize,
                l = Ke(o, t),
                s = W(l.text, null, a);
              l.stateAfter && (l.stateAfter = null);
              var u,
                c = l.text.match(/^\s*/)[0];
              if (i || /\S/.test(l.text)) {
                if (
                  "smart" == n &&
                  ((u = o.mode.indent(r, l.text.slice(c.length), l.text)) ==
                    U ||
                    u > 150)
                ) {
                  if (!i) return;
                  n = "prev";
                }
              } else (u = 0), (n = "not");
              "prev" == n
                ? (u = t > o.first ? W(Ke(o, t - 1).text, null, a) : 0)
                : "add" == n
                ? (u = s + e.options.indentUnit)
                : "subtract" == n
                ? (u = s - e.options.indentUnit)
                : "number" == typeof n && (u = s + n),
                (u = Math.max(0, u));
              var d = "",
                h = 0;
              if (e.options.indentWithTabs)
                for (var f = Math.floor(u / a); f; --f) (h += a), (d += "\t");
              if ((h < u && (d += Z(u - h)), d != c))
                return (
                  yo(o, d, it(t, 0), it(t, c.length), "+input"),
                  (l.stateAfter = null),
                  !0
                );
              for (var p = 0; p < o.sel.ranges.length; p++) {
                var m = o.sel.ranges[p];
                if (m.head.line == t && m.head.ch < c.length) {
                  var g = it(t, c.length);
                  eo(o, p, new Ar(g, g));
                  break;
                }
              }
            }
            Ma.defineInitHook = function (e) {
              return Ba.push(e);
            };
            var Oa = null;
            function Ia(e) {
              Oa = e;
            }
            function za(e, t, n, i, r) {
              var o = e.doc;
              (e.display.shift = !1), i || (i = o.sel);
              var a = +new Date() - 200,
                l = "paste" == r || e.state.pasteIncoming > a,
                s = Oe(t),
                u = null;
              if (l && i.ranges.length > 1)
                if (Oa && Oa.text.join("\n") == t) {
                  if (i.ranges.length % Oa.text.length == 0) {
                    u = [];
                    for (var c = 0; c < Oa.text.length; c++)
                      u.push(o.splitLines(Oa.text[c]));
                  }
                } else
                  s.length == i.ranges.length &&
                    e.options.pasteLinesPerSelection &&
                    (u = Q(s, function (e) {
                      return [e];
                    }));
              for (
                var d = e.curOp.updateInput, h = i.ranges.length - 1;
                h >= 0;
                h--
              ) {
                var f = i.ranges[h],
                  p = f.from(),
                  m = f.to();
                f.empty() &&
                  (n && n > 0
                    ? (p = it(p.line, p.ch - n))
                    : e.state.overwrite && !l
                    ? (m = it(
                        m.line,
                        Math.min(Ke(o, m.line).text.length, m.ch + Y(s).length)
                      ))
                    : l &&
                      Oa &&
                      Oa.lineWise &&
                      Oa.text.join("\n") == s.join("\n") &&
                      (p = m = it(p.line, 0)));
                var g = {
                  from: p,
                  to: m,
                  text: u ? u[h % u.length] : s,
                  origin:
                    r ||
                    (l ? "paste" : e.state.cutIncoming > a ? "cut" : "+input"),
                };
                po(e.doc, g), dn(e, "inputRead", e, g);
              }
              t && !l && Ra(e, t),
                Oi(e),
                e.curOp.updateInput < 2 && (e.curOp.updateInput = d),
                (e.curOp.typing = !0),
                (e.state.pasteIncoming = e.state.cutIncoming = -1);
            }
            function Ha(e, t) {
              var n = e.clipboardData && e.clipboardData.getData("Text");
              if (n)
                return (
                  e.preventDefault(),
                  t.isReadOnly() ||
                    t.options.disableInput ||
                    !t.hasFocus() ||
                    nr(t, function () {
                      return za(t, n, 0, null, "paste");
                    }),
                  !0
                );
            }
            function Ra(e, t) {
              if (e.options.electricChars && e.options.smartIndent)
                for (var n = e.doc.sel, i = n.ranges.length - 1; i >= 0; i--) {
                  var r = n.ranges[i];
                  if (
                    !(
                      r.head.ch > 100 ||
                      (i && n.ranges[i - 1].head.line == r.head.line)
                    )
                  ) {
                    var o = e.getModeAt(r.head),
                      a = !1;
                    if (o.electricChars) {
                      for (var l = 0; l < o.electricChars.length; l++)
                        if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                          a = Na(e, r.head.line, "smart");
                          break;
                        }
                    } else
                      o.electricInput &&
                        o.electricInput.test(
                          Ke(e.doc, r.head.line).text.slice(0, r.head.ch)
                        ) &&
                        (a = Na(e, r.head.line, "smart"));
                    a && dn(e, "electricInput", e, r.head.line);
                  }
                }
            }
            function Pa(e) {
              for (
                var t = [], n = [], i = 0;
                i < e.doc.sel.ranges.length;
                i++
              ) {
                var r = e.doc.sel.ranges[i].head.line,
                  o = { anchor: it(r, 0), head: it(r + 1, 0) };
                n.push(o), t.push(e.getRange(o.anchor, o.head));
              }
              return { text: t, ranges: n };
            }
            function _a(e, t, n, i) {
              e.setAttribute("autocorrect", n ? "" : "off"),
                e.setAttribute("autocapitalize", i ? "" : "off"),
                e.setAttribute("spellcheck", !!t);
            }
            function Wa() {
              var e = T(
                  "textarea",
                  null,
                  null,
                  "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"
                ),
                t = T(
                  "div",
                  [e],
                  null,
                  "overflow: hidden; position: relative; width: 3px; height: 0px;"
                );
              return (
                s ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
                g && (e.style.border = "1px solid black"),
                _a(e),
                t
              );
            }
            function ja(e, t, n, i, r) {
              var o = t,
                a = n,
                l = Ke(e, t.line),
                s = r && "rtl" == e.direction ? -n : n;
              function u(o) {
                var a, u;
                if ("codepoint" == i) {
                  var c = l.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
                  if (isNaN(c)) a = null;
                  else {
                    var d =
                      n > 0 ? c >= 55296 && c < 56320 : c >= 56320 && c < 57343;
                    a = new it(
                      t.line,
                      Math.max(
                        0,
                        Math.min(l.text.length, t.ch + n * (d ? 2 : 1))
                      ),
                      -n
                    );
                  }
                } else
                  a = r
                    ? (function (e, t, n, i) {
                        var r = he(t, e.doc.direction);
                        if (!r) return ia(t, n, i);
                        n.ch >= t.text.length
                          ? ((n.ch = t.text.length), (n.sticky = "before"))
                          : n.ch <= 0 && ((n.ch = 0), (n.sticky = "after"));
                        var o = ce(r, n.ch, n.sticky),
                          a = r[o];
                        if (
                          "ltr" == e.doc.direction &&
                          a.level % 2 == 0 &&
                          (i > 0 ? a.to > n.ch : a.from < n.ch)
                        )
                          return ia(t, n, i);
                        var l,
                          s = function (e, n) {
                            return na(t, e instanceof it ? e.ch : e, n);
                          },
                          u = function (n) {
                            return e.options.lineWrapping
                              ? ((l = l || In(e, t)), ti(e, t, l, n))
                              : { begin: 0, end: t.text.length };
                          },
                          c = u("before" == n.sticky ? s(n, -1) : n.ch);
                        if ("rtl" == e.doc.direction || 1 == a.level) {
                          var d = (1 == a.level) == i < 0,
                            h = s(n, d ? 1 : -1);
                          if (
                            null != h &&
                            (d
                              ? h <= a.to && h <= c.end
                              : h >= a.from && h >= c.begin)
                          ) {
                            var f = d ? "before" : "after";
                            return new it(n.line, h, f);
                          }
                        }
                        var p = function (e, t, i) {
                            for (
                              var o = function (e, t) {
                                return t
                                  ? new it(n.line, s(e, 1), "before")
                                  : new it(n.line, e, "after");
                              };
                              e >= 0 && e < r.length;
                              e += t
                            ) {
                              var a = r[e],
                                l = t > 0 == (1 != a.level),
                                u = l ? i.begin : s(i.end, -1);
                              if (a.from <= u && u < a.to) return o(u, l);
                              if (
                                ((u = l ? a.from : s(a.to, -1)),
                                i.begin <= u && u < i.end)
                              )
                                return o(u, l);
                            }
                          },
                          m = p(o + i, i, c);
                        if (m) return m;
                        var g = i > 0 ? c.end : s(c.begin, -1);
                        return null == g ||
                          (i > 0 && g == t.text.length) ||
                          !(m = p(i > 0 ? 0 : r.length - 1, i, u(g)))
                          ? null
                          : m;
                      })(e.cm, l, t, n)
                    : ia(l, t, n);
                if (null == a) {
                  if (
                    o ||
                    (u = t.line + s) < e.first ||
                    u >= e.first + e.size ||
                    ((t = new it(u, t.ch, t.sticky)), !(l = Ke(e, u)))
                  )
                    return !1;
                  t = ra(r, e.cm, l, t.line, s);
                } else t = a;
                return !0;
              }
              if ("char" == i || "codepoint" == i) u();
              else if ("column" == i) u(!0);
              else if ("word" == i || "group" == i)
                for (
                  var c = null,
                    d = "group" == i,
                    h = e.cm && e.cm.getHelper(t, "wordChars"),
                    f = !0;
                  !(n < 0) || u(!f);
                  f = !1
                ) {
                  var p = l.text.charAt(t.ch) || "\n",
                    m = ie(p, h)
                      ? "w"
                      : d && "\n" == p
                      ? "n"
                      : !d || /\s/.test(p)
                      ? null
                      : "p";
                  if ((!d || f || m || (m = "s"), c && c != m)) {
                    n < 0 && ((n = 1), u(), (t.sticky = "after"));
                    break;
                  }
                  if ((m && (c = m), n > 0 && !u(!f))) break;
                }
              var g = uo(e, t, o, a, !0);
              return ot(o, g) && (g.hitSide = !0), g;
            }
            function qa(e, t, n, i) {
              var r,
                o,
                a = e.doc,
                l = t.left;
              if ("page" == i) {
                var s = Math.min(
                    e.display.wrapper.clientHeight,
                    R(e).innerHeight || a(e).documentElement.clientHeight
                  ),
                  u = Math.max(s - 0.5 * ai(e.display), 3);
                r = (n > 0 ? t.bottom : t.top) + n * u;
              } else "line" == i && (r = n > 0 ? t.bottom + 3 : t.top - 3);
              for (; (o = Jn(e, l, r)).outside; ) {
                if (n < 0 ? r <= 0 : r >= a.height) {
                  o.hitSide = !0;
                  break;
                }
                r += 5 * n;
              }
              return o;
            }
            var Ua = function (e) {
              (this.cm = e),
                (this.lastAnchorNode =
                  this.lastAnchorOffset =
                  this.lastFocusNode =
                  this.lastFocusOffset =
                    null),
                (this.polling = new j()),
                (this.composing = null),
                (this.gracePeriod = !1),
                (this.readDOMTimeout = null);
            };
            function $a(e, t) {
              var n = On(e, t.line);
              if (!n || n.hidden) return null;
              var i = Ke(e.doc, t.line),
                r = Bn(n, i, t.line),
                o = he(i, e.doc.direction),
                a = "left";
              o && (a = ce(o, t.ch) % 2 ? "right" : "left");
              var l = Pn(r.map, t.ch, a);
              return (l.offset = "right" == l.collapse ? l.end : l.start), l;
            }
            function Ga(e, t) {
              return t && (e.bad = !0), e;
            }
            function Va(e, t, n) {
              var i;
              if (t == e.display.lineDiv) {
                if (!(i = e.display.lineDiv.childNodes[n]))
                  return Ga(e.clipPos(it(e.display.viewTo - 1)), !0);
                (t = null), (n = 0);
              } else
                for (i = t; ; i = i.parentNode) {
                  if (!i || i == e.display.lineDiv) return null;
                  if (i.parentNode && i.parentNode == e.display.lineDiv) break;
                }
              for (var r = 0; r < e.display.view.length; r++) {
                var o = e.display.view[r];
                if (o.node == i) return Xa(o, t, n);
              }
            }
            function Xa(e, t, n) {
              var i = e.text.firstChild,
                r = !1;
              if (!t || !B(i, t)) return Ga(it(Je(e.line), 0), !0);
              if (t == i && ((r = !0), (t = i.childNodes[n]), (n = 0), !t)) {
                var o = e.rest ? Y(e.rest) : e.line;
                return Ga(it(Je(o), o.text.length), r);
              }
              var a = 3 == t.nodeType ? t : null,
                l = t;
              for (
                a ||
                1 != t.childNodes.length ||
                3 != t.firstChild.nodeType ||
                ((a = t.firstChild), n && (n = a.nodeValue.length));
                l.parentNode != i;

              )
                l = l.parentNode;
              var s = e.measure,
                u = s.maps;
              function c(t, n, i) {
                for (var r = -1; r < (u ? u.length : 0); r++)
                  for (
                    var o = r < 0 ? s.map : u[r], a = 0;
                    a < o.length;
                    a += 3
                  ) {
                    var l = o[a + 2];
                    if (l == t || l == n) {
                      var c = Je(r < 0 ? e.line : e.rest[r]),
                        d = o[a] + i;
                      return (
                        (i < 0 || l != t) && (d = o[a + (i ? 1 : 0)]), it(c, d)
                      );
                    }
                  }
              }
              var d = c(a, l, n);
              if (d) return Ga(d, r);
              for (
                var h = l.nextSibling, f = a ? a.nodeValue.length - n : 0;
                h;
                h = h.nextSibling
              ) {
                if ((d = c(h, h.firstChild, 0)))
                  return Ga(it(d.line, d.ch - f), r);
                f += h.textContent.length;
              }
              for (var p = l.previousSibling, m = n; p; p = p.previousSibling) {
                if ((d = c(p, p.firstChild, -1)))
                  return Ga(it(d.line, d.ch + m), r);
                m += p.textContent.length;
              }
            }
            (Ua.prototype.init = function (e) {
              var t = this,
                n = this,
                i = n.cm,
                r = (n.div = e.lineDiv);
              function o(e) {
                for (var t = e.target; t; t = t.parentNode) {
                  if (t == r) return !0;
                  if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break;
                }
                return !1;
              }
              function a(e) {
                if (o(e) && !xe(i, e)) {
                  if (i.somethingSelected())
                    Ia({ lineWise: !1, text: i.getSelections() }),
                      "cut" == e.type && i.replaceSelection("", null, "cut");
                  else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = Pa(i);
                    Ia({ lineWise: !0, text: t.text }),
                      "cut" == e.type &&
                        i.operation(function () {
                          i.setSelections(t.ranges, 0, $),
                            i.replaceSelection("", null, "cut");
                        });
                  }
                  if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var a = Oa.text.join("\n");
                    if (
                      (e.clipboardData.setData("Text", a),
                      e.clipboardData.getData("Text") == a)
                    )
                      return void e.preventDefault();
                  }
                  var l = Wa(),
                    s = l.firstChild;
                  i.display.lineSpace.insertBefore(
                    l,
                    i.display.lineSpace.firstChild
                  ),
                    (s.value = Oa.text.join("\n"));
                  var u = N(r.ownerDocument);
                  z(s),
                    setTimeout(function () {
                      i.display.lineSpace.removeChild(l),
                        u.focus(),
                        u == r && n.showPrimarySelection();
                    }, 50);
                }
              }
              (r.contentEditable = !0),
                _a(
                  r,
                  i.options.spellcheck,
                  i.options.autocorrect,
                  i.options.autocapitalize
                ),
                pe(r, "paste", function (e) {
                  !o(e) ||
                    xe(i, e) ||
                    Ha(e, i) ||
                    (l <= 11 &&
                      setTimeout(
                        ir(i, function () {
                          return t.updateFromDOM();
                        }),
                        20
                      ));
                }),
                pe(r, "compositionstart", function (e) {
                  t.composing = { data: e.data, done: !1 };
                }),
                pe(r, "compositionupdate", function (e) {
                  t.composing || (t.composing = { data: e.data, done: !1 });
                }),
                pe(r, "compositionend", function (e) {
                  t.composing &&
                    (e.data != t.composing.data && t.readFromDOMSoon(),
                    (t.composing.done = !0));
                }),
                pe(r, "touchstart", function () {
                  return n.forceCompositionEnd();
                }),
                pe(r, "input", function () {
                  t.composing || t.readFromDOMSoon();
                }),
                pe(r, "copy", a),
                pe(r, "cut", a);
            }),
              (Ua.prototype.screenReaderLabelChanged = function (e) {
                e
                  ? this.div.setAttribute("aria-label", e)
                  : this.div.removeAttribute("aria-label");
              }),
              (Ua.prototype.prepareSelection = function () {
                var e = bi(this.cm, !1);
                return (e.focus = N(this.div.ownerDocument) == this.div), e;
              }),
              (Ua.prototype.showSelection = function (e, t) {
                e &&
                  this.cm.display.view.length &&
                  ((e.focus || t) && this.showPrimarySelection(),
                  this.showMultipleSelections(e));
              }),
              (Ua.prototype.getSelection = function () {
                return this.cm.display.wrapper.ownerDocument.getSelection();
              }),
              (Ua.prototype.showPrimarySelection = function () {
                var e = this.getSelection(),
                  t = this.cm,
                  i = t.doc.sel.primary(),
                  r = i.from(),
                  o = i.to();
                if (
                  t.display.viewTo == t.display.viewFrom ||
                  r.line >= t.display.viewTo ||
                  o.line < t.display.viewFrom
                )
                  e.removeAllRanges();
                else {
                  var a = Va(t, e.anchorNode, e.anchorOffset),
                    l = Va(t, e.focusNode, e.focusOffset);
                  if (
                    !a ||
                    a.bad ||
                    !l ||
                    l.bad ||
                    0 != rt(st(a, l), r) ||
                    0 != rt(lt(a, l), o)
                  ) {
                    var s = t.display.view,
                      u = (r.line >= t.display.viewFrom && $a(t, r)) || {
                        node: s[0].measure.map[2],
                        offset: 0,
                      },
                      c = o.line < t.display.viewTo && $a(t, o);
                    if (!c) {
                      var d = s[s.length - 1].measure,
                        h = d.maps ? d.maps[d.maps.length - 1] : d.map;
                      c = {
                        node: h[h.length - 1],
                        offset: h[h.length - 2] - h[h.length - 3],
                      };
                    }
                    if (u && c) {
                      var f,
                        p = e.rangeCount && e.getRangeAt(0);
                      try {
                        f = F(u.node, u.offset, c.offset, c.node);
                      } catch (e) {}
                      f &&
                        (!n && t.state.focused
                          ? (e.collapse(u.node, u.offset),
                            f.collapsed || (e.removeAllRanges(), e.addRange(f)))
                          : (e.removeAllRanges(), e.addRange(f)),
                        p && null == e.anchorNode
                          ? e.addRange(p)
                          : n && this.startGracePeriod()),
                        this.rememberSelection();
                    } else e.removeAllRanges();
                  }
                }
              }),
              (Ua.prototype.startGracePeriod = function () {
                var e = this;
                clearTimeout(this.gracePeriod),
                  (this.gracePeriod = setTimeout(function () {
                    (e.gracePeriod = !1),
                      e.selectionChanged() &&
                        e.cm.operation(function () {
                          return (e.cm.curOp.selectionChanged = !0);
                        });
                  }, 20));
              }),
              (Ua.prototype.showMultipleSelections = function (e) {
                L(this.cm.display.cursorDiv, e.cursors),
                  L(this.cm.display.selectionDiv, e.selection);
              }),
              (Ua.prototype.rememberSelection = function () {
                var e = this.getSelection();
                (this.lastAnchorNode = e.anchorNode),
                  (this.lastAnchorOffset = e.anchorOffset),
                  (this.lastFocusNode = e.focusNode),
                  (this.lastFocusOffset = e.focusOffset);
              }),
              (Ua.prototype.selectionInEditor = function () {
                var e = this.getSelection();
                if (!e.rangeCount) return !1;
                var t = e.getRangeAt(0).commonAncestorContainer;
                return B(this.div, t);
              }),
              (Ua.prototype.focus = function () {
                "nocursor" != this.cm.options.readOnly &&
                  ((this.selectionInEditor() &&
                    N(this.div.ownerDocument) == this.div) ||
                    this.showSelection(this.prepareSelection(), !0),
                  this.div.focus());
              }),
              (Ua.prototype.blur = function () {
                this.div.blur();
              }),
              (Ua.prototype.getField = function () {
                return this.div;
              }),
              (Ua.prototype.supportsTouch = function () {
                return !0;
              }),
              (Ua.prototype.receivedFocus = function () {
                var e = this,
                  t = this;
                this.selectionInEditor()
                  ? setTimeout(function () {
                      return e.pollSelection();
                    }, 20)
                  : nr(this.cm, function () {
                      return (t.cm.curOp.selectionChanged = !0);
                    }),
                  this.polling.set(this.cm.options.pollInterval, function e() {
                    t.cm.state.focused &&
                      (t.pollSelection(),
                      t.polling.set(t.cm.options.pollInterval, e));
                  });
              }),
              (Ua.prototype.selectionChanged = function () {
                var e = this.getSelection();
                return (
                  e.anchorNode != this.lastAnchorNode ||
                  e.anchorOffset != this.lastAnchorOffset ||
                  e.focusNode != this.lastFocusNode ||
                  e.focusOffset != this.lastFocusOffset
                );
              }),
              (Ua.prototype.pollSelection = function () {
                if (
                  null == this.readDOMTimeout &&
                  !this.gracePeriod &&
                  this.selectionChanged()
                ) {
                  var e = this.getSelection(),
                    t = this.cm;
                  if (
                    v &&
                    c &&
                    this.cm.display.gutterSpecs.length &&
                    (function (e) {
                      for (var t = e; t; t = t.parentNode)
                        if (/CodeMirror-gutter-wrapper/.test(t.className))
                          return !0;
                      return !1;
                    })(e.anchorNode)
                  )
                    return (
                      this.cm.triggerOnKeyDown({
                        type: "keydown",
                        keyCode: 8,
                        preventDefault: Math.abs,
                      }),
                      this.blur(),
                      void this.focus()
                    );
                  if (!this.composing) {
                    this.rememberSelection();
                    var n = Va(t, e.anchorNode, e.anchorOffset),
                      i = Va(t, e.focusNode, e.focusOffset);
                    n &&
                      i &&
                      nr(t, function () {
                        io(t.doc, Lr(n, i), $),
                          (n.bad || i.bad) && (t.curOp.selectionChanged = !0);
                      });
                  }
                }
              }),
              (Ua.prototype.pollContent = function () {
                null != this.readDOMTimeout &&
                  (clearTimeout(this.readDOMTimeout),
                  (this.readDOMTimeout = null));
                var e,
                  t,
                  n,
                  i = this.cm,
                  r = i.display,
                  o = i.doc.sel.primary(),
                  a = o.from(),
                  l = o.to();
                if (
                  (0 == a.ch &&
                    a.line > i.firstLine() &&
                    (a = it(a.line - 1, Ke(i.doc, a.line - 1).length)),
                  l.ch == Ke(i.doc, l.line).text.length &&
                    l.line < i.lastLine() &&
                    (l = it(l.line + 1, 0)),
                  a.line < r.viewFrom || l.line > r.viewTo - 1)
                )
                  return !1;
                a.line == r.viewFrom || 0 == (e = fi(i, a.line))
                  ? ((t = Je(r.view[0].line)), (n = r.view[0].node))
                  : ((t = Je(r.view[e].line)),
                    (n = r.view[e - 1].node.nextSibling));
                var s,
                  u,
                  c = fi(i, l.line);
                if (
                  (c == r.view.length - 1
                    ? ((s = r.viewTo - 1), (u = r.lineDiv.lastChild))
                    : ((s = Je(r.view[c + 1].line) - 1),
                      (u = r.view[c + 1].node.previousSibling)),
                  !n)
                )
                  return !1;
                for (
                  var d = i.doc.splitLines(
                      (function (e, t, n, i, r) {
                        var o = "",
                          a = !1,
                          l = e.doc.lineSeparator(),
                          s = !1;
                        function u(e) {
                          return function (t) {
                            return t.id == e;
                          };
                        }
                        function c() {
                          a && ((o += l), s && (o += l), (a = s = !1));
                        }
                        function d(e) {
                          e && (c(), (o += e));
                        }
                        function h(t) {
                          if (1 == t.nodeType) {
                            var n = t.getAttribute("cm-text");
                            if (n) return void d(n);
                            var o,
                              f = t.getAttribute("cm-marker");
                            if (f) {
                              var p = e.findMarks(
                                it(i, 0),
                                it(r + 1, 0),
                                u(+f)
                              );
                              return void (
                                p.length &&
                                (o = p[0].find(0)) &&
                                d(Ze(e.doc, o.from, o.to).join(l))
                              );
                            }
                            if ("false" == t.getAttribute("contenteditable"))
                              return;
                            var m = /^(pre|div|p|li|table|br)$/i.test(
                              t.nodeName
                            );
                            if (
                              !/^br$/i.test(t.nodeName) &&
                              0 == t.textContent.length
                            )
                              return;
                            m && c();
                            for (var g = 0; g < t.childNodes.length; g++)
                              h(t.childNodes[g]);
                            /^(pre|p)$/i.test(t.nodeName) && (s = !0),
                              m && (a = !0);
                          } else
                            3 == t.nodeType &&
                              d(
                                t.nodeValue
                                  .replace(/\u200b/g, "")
                                  .replace(/\u00a0/g, " ")
                              );
                        }
                        for (; h(t), t != n; ) (t = t.nextSibling), (s = !1);
                        return o;
                      })(i, n, u, t, s)
                    ),
                    h = Ze(i.doc, it(t, 0), it(s, Ke(i.doc, s).text.length));
                  d.length > 1 && h.length > 1;

                )
                  if (Y(d) == Y(h)) d.pop(), h.pop(), s--;
                  else {
                    if (d[0] != h[0]) break;
                    d.shift(), h.shift(), t++;
                  }
                for (
                  var f = 0,
                    p = 0,
                    m = d[0],
                    g = h[0],
                    v = Math.min(m.length, g.length);
                  f < v && m.charCodeAt(f) == g.charCodeAt(f);

                )
                  ++f;
                for (
                  var x = Y(d),
                    y = Y(h),
                    b = Math.min(
                      x.length - (1 == d.length ? f : 0),
                      y.length - (1 == h.length ? f : 0)
                    );
                  p < b &&
                  x.charCodeAt(x.length - p - 1) ==
                    y.charCodeAt(y.length - p - 1);

                )
                  ++p;
                if (1 == d.length && 1 == h.length && t == a.line)
                  for (
                    ;
                    f &&
                    f > a.ch &&
                    x.charCodeAt(x.length - p - 1) ==
                      y.charCodeAt(y.length - p - 1);

                  )
                    f--, p++;
                (d[d.length - 1] = x
                  .slice(0, x.length - p)
                  .replace(/^\u200b+/, "")),
                  (d[0] = d[0].slice(f).replace(/\u200b+$/, ""));
                var D = it(t, f),
                  C = it(s, h.length ? Y(h).length - p : 0);
                return d.length > 1 || d[0] || rt(D, C)
                  ? (yo(i.doc, d, D, C, "+input"), !0)
                  : void 0;
              }),
              (Ua.prototype.ensurePolled = function () {
                this.forceCompositionEnd();
              }),
              (Ua.prototype.reset = function () {
                this.forceCompositionEnd();
              }),
              (Ua.prototype.forceCompositionEnd = function () {
                this.composing &&
                  (clearTimeout(this.readDOMTimeout),
                  (this.composing = null),
                  this.updateFromDOM(),
                  this.div.blur(),
                  this.div.focus());
              }),
              (Ua.prototype.readFromDOMSoon = function () {
                var e = this;
                null == this.readDOMTimeout &&
                  (this.readDOMTimeout = setTimeout(function () {
                    if (((e.readDOMTimeout = null), e.composing)) {
                      if (!e.composing.done) return;
                      e.composing = null;
                    }
                    e.updateFromDOM();
                  }, 80));
              }),
              (Ua.prototype.updateFromDOM = function () {
                var e = this;
                (!this.cm.isReadOnly() && this.pollContent()) ||
                  nr(this.cm, function () {
                    return pi(e.cm);
                  });
              }),
              (Ua.prototype.setUneditable = function (e) {
                e.contentEditable = "false";
              }),
              (Ua.prototype.onKeyPress = function (e) {
                0 == e.charCode ||
                  this.composing ||
                  (e.preventDefault(),
                  this.cm.isReadOnly() ||
                    ir(this.cm, za)(
                      this.cm,
                      String.fromCharCode(
                        null == e.charCode ? e.keyCode : e.charCode
                      ),
                      0
                    ));
              }),
              (Ua.prototype.readOnlyChanged = function (e) {
                this.div.contentEditable = String("nocursor" != e);
              }),
              (Ua.prototype.onContextMenu = function () {}),
              (Ua.prototype.resetPosition = function () {}),
              (Ua.prototype.needsContentAttribute = !0);
            var Ka = function (e) {
              (this.cm = e),
                (this.prevInput = ""),
                (this.pollingFast = !1),
                (this.polling = new j()),
                (this.hasSelection = !1),
                (this.composing = null),
                (this.resetting = !1);
            };
            (Ka.prototype.init = function (e) {
              var t = this,
                n = this,
                i = this.cm;
              this.createField(e);
              var r = this.textarea;
              function o(e) {
                if (!xe(i, e)) {
                  if (i.somethingSelected())
                    Ia({ lineWise: !1, text: i.getSelections() });
                  else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = Pa(i);
                    Ia({ lineWise: !0, text: t.text }),
                      "cut" == e.type
                        ? i.setSelections(t.ranges, null, $)
                        : ((n.prevInput = ""),
                          (r.value = t.text.join("\n")),
                          z(r));
                  }
                  "cut" == e.type && (i.state.cutIncoming = +new Date());
                }
              }
              e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild),
                g && (r.style.width = "0px"),
                pe(r, "input", function () {
                  a && l >= 9 && t.hasSelection && (t.hasSelection = null),
                    n.poll();
                }),
                pe(r, "paste", function (e) {
                  xe(i, e) ||
                    Ha(e, i) ||
                    ((i.state.pasteIncoming = +new Date()), n.fastPoll());
                }),
                pe(r, "cut", o),
                pe(r, "copy", o),
                pe(e.scroller, "paste", function (t) {
                  if (!Sn(e, t) && !xe(i, t)) {
                    if (!r.dispatchEvent)
                      return (
                        (i.state.pasteIncoming = +new Date()), void n.focus()
                      );
                    var o = new Event("paste");
                    (o.clipboardData = t.clipboardData), r.dispatchEvent(o);
                  }
                }),
                pe(e.lineSpace, "selectstart", function (t) {
                  Sn(e, t) || Ce(t);
                }),
                pe(r, "compositionstart", function () {
                  var e = i.getCursor("from");
                  n.composing && n.composing.range.clear(),
                    (n.composing = {
                      start: e,
                      range: i.markText(e, i.getCursor("to"), {
                        className: "CodeMirror-composing",
                      }),
                    });
                }),
                pe(r, "compositionend", function () {
                  n.composing &&
                    (n.poll(), n.composing.range.clear(), (n.composing = null));
                });
            }),
              (Ka.prototype.createField = function (e) {
                (this.wrapper = Wa()),
                  (this.textarea = this.wrapper.firstChild);
              }),
              (Ka.prototype.screenReaderLabelChanged = function (e) {
                e
                  ? this.textarea.setAttribute("aria-label", e)
                  : this.textarea.removeAttribute("aria-label");
              }),
              (Ka.prototype.prepareSelection = function () {
                var e = this.cm,
                  t = e.display,
                  n = e.doc,
                  i = bi(e);
                if (e.options.moveInputWithCursor) {
                  var r = Zn(e, n.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    a = t.lineDiv.getBoundingClientRect();
                  (i.teTop = Math.max(
                    0,
                    Math.min(t.wrapper.clientHeight - 10, r.top + a.top - o.top)
                  )),
                    (i.teLeft = Math.max(
                      0,
                      Math.min(
                        t.wrapper.clientWidth - 10,
                        r.left + a.left - o.left
                      )
                    ));
                }
                return i;
              }),
              (Ka.prototype.showSelection = function (e) {
                var t = this.cm.display;
                L(t.cursorDiv, e.cursors),
                  L(t.selectionDiv, e.selection),
                  null != e.teTop &&
                    ((this.wrapper.style.top = e.teTop + "px"),
                    (this.wrapper.style.left = e.teLeft + "px"));
              }),
              (Ka.prototype.reset = function (e) {
                if (!(this.contextMenuPending || (this.composing && e))) {
                  var t = this.cm;
                  if (((this.resetting = !0), t.somethingSelected())) {
                    this.prevInput = "";
                    var n = t.getSelection();
                    (this.textarea.value = n),
                      t.state.focused && z(this.textarea),
                      a && l >= 9 && (this.hasSelection = n);
                  } else
                    e ||
                      ((this.prevInput = this.textarea.value = ""),
                      a && l >= 9 && (this.hasSelection = null));
                  this.resetting = !1;
                }
              }),
              (Ka.prototype.getField = function () {
                return this.textarea;
              }),
              (Ka.prototype.supportsTouch = function () {
                return !1;
              }),
              (Ka.prototype.focus = function () {
                if (
                  "nocursor" != this.cm.options.readOnly &&
                  (!x || N(this.textarea.ownerDocument) != this.textarea)
                )
                  try {
                    this.textarea.focus();
                  } catch (e) {}
              }),
              (Ka.prototype.blur = function () {
                this.textarea.blur();
              }),
              (Ka.prototype.resetPosition = function () {
                this.wrapper.style.top = this.wrapper.style.left = 0;
              }),
              (Ka.prototype.receivedFocus = function () {
                this.slowPoll();
              }),
              (Ka.prototype.slowPoll = function () {
                var e = this;
                this.pollingFast ||
                  this.polling.set(this.cm.options.pollInterval, function () {
                    e.poll(), e.cm.state.focused && e.slowPoll();
                  });
              }),
              (Ka.prototype.fastPoll = function () {
                var e = !1,
                  t = this;
                (t.pollingFast = !0),
                  t.polling.set(20, function n() {
                    t.poll() || e
                      ? ((t.pollingFast = !1), t.slowPoll())
                      : ((e = !0), t.polling.set(60, n));
                  });
              }),
              (Ka.prototype.poll = function () {
                var e = this,
                  t = this.cm,
                  n = this.textarea,
                  i = this.prevInput;
                if (
                  this.contextMenuPending ||
                  this.resetting ||
                  !t.state.focused ||
                  (Ie(n) && !i && !this.composing) ||
                  t.isReadOnly() ||
                  t.options.disableInput ||
                  t.state.keySeq
                )
                  return !1;
                var r = n.value;
                if (r == i && !t.somethingSelected()) return !1;
                if (
                  (a && l >= 9 && this.hasSelection === r) ||
                  (y && /[\uf700-\uf7ff]/.test(r))
                )
                  return t.display.input.reset(), !1;
                if (t.doc.sel == t.display.selForContextMenu) {
                  var o = r.charCodeAt(0);
                  if ((8203 != o || i || (i = "​"), 8666 == o))
                    return this.reset(), this.cm.execCommand("undo");
                }
                for (
                  var s = 0, u = Math.min(i.length, r.length);
                  s < u && i.charCodeAt(s) == r.charCodeAt(s);

                )
                  ++s;
                return (
                  nr(t, function () {
                    za(
                      t,
                      r.slice(s),
                      i.length - s,
                      null,
                      e.composing ? "*compose" : null
                    ),
                      r.length > 1e3 || r.indexOf("\n") > -1
                        ? (n.value = e.prevInput = "")
                        : (e.prevInput = r),
                      e.composing &&
                        (e.composing.range.clear(),
                        (e.composing.range = t.markText(
                          e.composing.start,
                          t.getCursor("to"),
                          { className: "CodeMirror-composing" }
                        )));
                  }),
                  !0
                );
              }),
              (Ka.prototype.ensurePolled = function () {
                this.pollingFast && this.poll() && (this.pollingFast = !1);
              }),
              (Ka.prototype.onKeyPress = function () {
                a && l >= 9 && (this.hasSelection = null), this.fastPoll();
              }),
              (Ka.prototype.onContextMenu = function (e) {
                var t = this,
                  n = t.cm,
                  i = n.display,
                  r = t.textarea;
                t.contextMenuPending && t.contextMenuPending();
                var o = hi(n, e),
                  u = i.scroller.scrollTop;
                if (o && !h) {
                  n.options.resetSelectionOnContextMenu &&
                    -1 == n.doc.sel.contains(o) &&
                    ir(n, io)(n.doc, Lr(o), $);
                  var c,
                    d = r.style.cssText,
                    f = t.wrapper.style.cssText,
                    p = t.wrapper.offsetParent.getBoundingClientRect();
                  if (
                    ((t.wrapper.style.cssText = "position: static"),
                    (r.style.cssText =
                      "position: absolute; width: 30px; height: 30px;\n      top: " +
                      (e.clientY - p.top - 5) +
                      "px; left: " +
                      (e.clientX - p.left - 5) +
                      "px;\n      z-index: 1000; background: " +
                      (a ? "rgba(255, 255, 255, .05)" : "transparent") +
                      ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
                    s && (c = r.ownerDocument.defaultView.scrollY),
                    i.input.focus(),
                    s && r.ownerDocument.defaultView.scrollTo(null, c),
                    i.input.reset(),
                    n.somethingSelected() || (r.value = t.prevInput = " "),
                    (t.contextMenuPending = v),
                    (i.selForContextMenu = n.doc.sel),
                    clearTimeout(i.detectingSelectAll),
                    a && l >= 9 && g(),
                    k)
                  ) {
                    Se(e);
                    var m = function () {
                      ge(window, "mouseup", m), setTimeout(v, 20);
                    };
                    pe(window, "mouseup", m);
                  } else setTimeout(v, 50);
                }
                function g() {
                  if (null != r.selectionStart) {
                    var e = n.somethingSelected(),
                      o = "​" + (e ? r.value : "");
                    (r.value = "⇚"),
                      (r.value = o),
                      (t.prevInput = e ? "" : "​"),
                      (r.selectionStart = 1),
                      (r.selectionEnd = o.length),
                      (i.selForContextMenu = n.doc.sel);
                  }
                }
                function v() {
                  if (
                    t.contextMenuPending == v &&
                    ((t.contextMenuPending = !1),
                    (t.wrapper.style.cssText = f),
                    (r.style.cssText = d),
                    a &&
                      l < 9 &&
                      i.scrollbars.setScrollTop((i.scroller.scrollTop = u)),
                    null != r.selectionStart)
                  ) {
                    (!a || (a && l < 9)) && g();
                    var e = 0,
                      o = function () {
                        i.selForContextMenu == n.doc.sel &&
                        0 == r.selectionStart &&
                        r.selectionEnd > 0 &&
                        "​" == t.prevInput
                          ? ir(n, ho)(n)
                          : e++ < 10
                          ? (i.detectingSelectAll = setTimeout(o, 500))
                          : ((i.selForContextMenu = null), i.input.reset());
                      };
                    i.detectingSelectAll = setTimeout(o, 200);
                  }
                }
              }),
              (Ka.prototype.readOnlyChanged = function (e) {
                e || this.reset(),
                  (this.textarea.disabled = "nocursor" == e),
                  (this.textarea.readOnly = !!e);
              }),
              (Ka.prototype.setUneditable = function () {}),
              (Ka.prototype.needsContentAttribute = !1),
              (function (e) {
                var t = e.optionHandlers;
                function n(n, i, r, o) {
                  (e.defaults[n] = i),
                    r &&
                      (t[n] = o
                        ? function (e, t, n) {
                            n != Fa && r(e, t, n);
                          }
                        : r);
                }
                (e.defineOption = n),
                  (e.Init = Fa),
                  n(
                    "value",
                    "",
                    function (e, t) {
                      return e.setValue(t);
                    },
                    !0
                  ),
                  n(
                    "mode",
                    null,
                    function (e, t) {
                      (e.doc.modeOption = t), Or(e);
                    },
                    !0
                  ),
                  n("indentUnit", 2, Or, !0),
                  n("indentWithTabs", !1),
                  n("smartIndent", !0),
                  n(
                    "tabSize",
                    4,
                    function (e) {
                      Ir(e), qn(e), pi(e);
                    },
                    !0
                  ),
                  n("lineSeparator", null, function (e, t) {
                    if (((e.doc.lineSep = t), t)) {
                      var n = [],
                        i = e.doc.first;
                      e.doc.iter(function (e) {
                        for (var r = 0; ; ) {
                          var o = e.text.indexOf(t, r);
                          if (-1 == o) break;
                          (r = o + t.length), n.push(it(i, o));
                        }
                        i++;
                      });
                      for (var r = n.length - 1; r >= 0; r--)
                        yo(e.doc, t, n[r], it(n[r].line, n[r].ch + t.length));
                    }
                  }),
                  n(
                    "specialChars",
                    /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,
                    function (e, t, n) {
                      (e.state.specialChars = new RegExp(
                        t.source + (t.test("\t") ? "" : "|\t"),
                        "g"
                      )),
                        n != Fa && e.refresh();
                    }
                  ),
                  n(
                    "specialCharPlaceholder",
                    tn,
                    function (e) {
                      return e.refresh();
                    },
                    !0
                  ),
                  n("electricChars", !0),
                  n(
                    "inputStyle",
                    x ? "contenteditable" : "textarea",
                    function () {
                      throw new Error(
                        "inputStyle can not (yet) be changed in a running editor"
                      );
                    },
                    !0
                  ),
                  n(
                    "spellcheck",
                    !1,
                    function (e, t) {
                      return (e.getInputField().spellcheck = t);
                    },
                    !0
                  ),
                  n(
                    "autocorrect",
                    !1,
                    function (e, t) {
                      return (e.getInputField().autocorrect = t);
                    },
                    !0
                  ),
                  n(
                    "autocapitalize",
                    !1,
                    function (e, t) {
                      return (e.getInputField().autocapitalize = t);
                    },
                    !0
                  ),
                  n("rtlMoveVisually", !D),
                  n("wholeLineUpdateBefore", !0),
                  n(
                    "theme",
                    "default",
                    function (e) {
                      Sa(e), yr(e);
                    },
                    !0
                  ),
                  n("keyMap", "default", function (e, t, n) {
                    var i = ea(t),
                      r = n != Fa && ea(n);
                    r && r.detach && r.detach(e, i),
                      i.attach && i.attach(e, r || null);
                  }),
                  n("extraKeys", null),
                  n("configureMouse", null),
                  n("lineWrapping", !1, Ta, !0),
                  n(
                    "gutters",
                    [],
                    function (e, t) {
                      (e.display.gutterSpecs = vr(t, e.options.lineNumbers)),
                        yr(e);
                    },
                    !0
                  ),
                  n(
                    "fixedGutter",
                    !0,
                    function (e, t) {
                      (e.display.gutters.style.left = t
                        ? ui(e.display) + "px"
                        : "0"),
                        e.refresh();
                    },
                    !0
                  ),
                  n(
                    "coverGutterNextToScrollbar",
                    !1,
                    function (e) {
                      return Ui(e);
                    },
                    !0
                  ),
                  n(
                    "scrollbarStyle",
                    "native",
                    function (e) {
                      Vi(e),
                        Ui(e),
                        e.display.scrollbars.setScrollTop(e.doc.scrollTop),
                        e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
                    },
                    !0
                  ),
                  n(
                    "lineNumbers",
                    !1,
                    function (e, t) {
                      (e.display.gutterSpecs = vr(e.options.gutters, t)), yr(e);
                    },
                    !0
                  ),
                  n("firstLineNumber", 1, yr, !0),
                  n(
                    "lineNumberFormatter",
                    function (e) {
                      return e;
                    },
                    yr,
                    !0
                  ),
                  n("showCursorWhenSelecting", !1, yi, !0),
                  n("resetSelectionOnContextMenu", !0),
                  n("lineWiseCopyCut", !0),
                  n("pasteLinesPerSelection", !0),
                  n("selectionsMayTouch", !1),
                  n("readOnly", !1, function (e, t) {
                    "nocursor" == t && (Ei(e), e.display.input.blur()),
                      e.display.input.readOnlyChanged(t);
                  }),
                  n("screenReaderLabel", null, function (e, t) {
                    (t = "" === t ? null : t),
                      e.display.input.screenReaderLabelChanged(t);
                  }),
                  n(
                    "disableInput",
                    !1,
                    function (e, t) {
                      t || e.display.input.reset();
                    },
                    !0
                  ),
                  n("dragDrop", !0, La),
                  n("allowDropFileTypes", null),
                  n("cursorBlinkRate", 530),
                  n("cursorScrollMargin", 0),
                  n("cursorHeight", 1, yi, !0),
                  n("singleCursorHeightPerLine", !0, yi, !0),
                  n("workTime", 100),
                  n("workDelay", 100),
                  n("flattenSpans", !0, Ir, !0),
                  n("addModeClass", !1, Ir, !0),
                  n("pollInterval", 100),
                  n("undoDepth", 200, function (e, t) {
                    return (e.doc.history.undoDepth = t);
                  }),
                  n("historyEventDelay", 1250),
                  n(
                    "viewportMargin",
                    10,
                    function (e) {
                      return e.refresh();
                    },
                    !0
                  ),
                  n("maxHighlightLength", 1e4, Ir, !0),
                  n("moveInputWithCursor", !0, function (e, t) {
                    t || e.display.input.resetPosition();
                  }),
                  n("tabindex", null, function (e, t) {
                    return (e.display.input.getField().tabIndex = t || "");
                  }),
                  n("autofocus", null),
                  n(
                    "direction",
                    "ltr",
                    function (e, t) {
                      return e.doc.setDirection(t);
                    },
                    !0
                  ),
                  n("phrases", null);
              })(Ma),
              (function (e) {
                var t = e.optionHandlers,
                  n = (e.helpers = {});
                (e.prototype = {
                  constructor: e,
                  focus: function () {
                    R(this).focus(), this.display.input.focus();
                  },
                  setOption: function (e, n) {
                    var i = this.options,
                      r = i[e];
                    (i[e] == n && "mode" != e) ||
                      ((i[e] = n),
                      t.hasOwnProperty(e) && ir(this, t[e])(this, n, r),
                      ve(this, "optionChange", this, e));
                  },
                  getOption: function (e) {
                    return this.options[e];
                  },
                  getDoc: function () {
                    return this.doc;
                  },
                  addKeyMap: function (e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](ea(e));
                  },
                  removeKeyMap: function (e) {
                    for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                      if (t[n] == e || t[n].name == e)
                        return t.splice(n, 1), !0;
                  },
                  addOverlay: rr(function (t, n) {
                    var i = t.token ? t : e.getMode(this.options, t);
                    if (i.startState)
                      throw new Error("Overlays may not be stateful.");
                    !(function (e, t, n) {
                      for (var i = 0, r = n(t); i < e.length && n(e[i]) <= r; )
                        i++;
                      e.splice(i, 0, t);
                    })(
                      this.state.overlays,
                      {
                        mode: i,
                        modeSpec: t,
                        opaque: n && n.opaque,
                        priority: (n && n.priority) || 0,
                      },
                      function (e) {
                        return e.priority;
                      }
                    ),
                      this.state.modeGen++,
                      pi(this);
                  }),
                  removeOverlay: rr(function (e) {
                    for (
                      var t = this.state.overlays, n = 0;
                      n < t.length;
                      ++n
                    ) {
                      var i = t[n].modeSpec;
                      if (i == e || ("string" == typeof e && i.name == e))
                        return (
                          t.splice(n, 1), this.state.modeGen++, void pi(this)
                        );
                    }
                  }),
                  indentLine: rr(function (e, t, n) {
                    "string" != typeof t &&
                      "number" != typeof t &&
                      (t =
                        null == t
                          ? this.options.smartIndent
                            ? "smart"
                            : "prev"
                          : t
                          ? "add"
                          : "subtract"),
                      tt(this.doc, e) && Na(this, e, t, n);
                  }),
                  indentSelection: rr(function (e) {
                    for (
                      var t = this.doc.sel.ranges, n = -1, i = 0;
                      i < t.length;
                      i++
                    ) {
                      var r = t[i];
                      if (r.empty())
                        r.head.line > n &&
                          (Na(this, r.head.line, e, !0),
                          (n = r.head.line),
                          i == this.doc.sel.primIndex && Oi(this));
                      else {
                        var o = r.from(),
                          a = r.to(),
                          l = Math.max(n, o.line);
                        n =
                          Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) +
                          1;
                        for (var s = l; s < n; ++s) Na(this, s, e);
                        var u = this.doc.sel.ranges;
                        0 == o.ch &&
                          t.length == u.length &&
                          u[i].from().ch > 0 &&
                          eo(this.doc, i, new Ar(o, u[i].to()), $);
                      }
                    }
                  }),
                  getTokenAt: function (e, t) {
                    return Dt(this, e, t);
                  },
                  getLineTokens: function (e, t) {
                    return Dt(this, it(e), t, !0);
                  },
                  getTokenTypeAt: function (e) {
                    e = ct(this.doc, e);
                    var t,
                      n = mt(this, Ke(this.doc, e.line)),
                      i = 0,
                      r = (n.length - 1) / 2,
                      o = e.ch;
                    if (0 == o) t = n[2];
                    else
                      for (;;) {
                        var a = (i + r) >> 1;
                        if ((a ? n[2 * a - 1] : 0) >= o) r = a;
                        else {
                          if (!(n[2 * a + 1] < o)) {
                            t = n[2 * a + 2];
                            break;
                          }
                          i = a + 1;
                        }
                      }
                    var l = t ? t.indexOf("overlay ") : -1;
                    return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1);
                  },
                  getModeAt: function (t) {
                    var n = this.doc.mode;
                    return n.innerMode
                      ? e.innerMode(n, this.getTokenAt(t).state).mode
                      : n;
                  },
                  getHelper: function (e, t) {
                    return this.getHelpers(e, t)[0];
                  },
                  getHelpers: function (e, t) {
                    var i = [];
                    if (!n.hasOwnProperty(t)) return i;
                    var r = n[t],
                      o = this.getModeAt(e);
                    if ("string" == typeof o[t]) r[o[t]] && i.push(r[o[t]]);
                    else if (o[t])
                      for (var a = 0; a < o[t].length; a++) {
                        var l = r[o[t][a]];
                        l && i.push(l);
                      }
                    else
                      o.helperType && r[o.helperType]
                        ? i.push(r[o.helperType])
                        : r[o.name] && i.push(r[o.name]);
                    for (var s = 0; s < r._global.length; s++) {
                      var u = r._global[s];
                      u.pred(o, this) && -1 == q(i, u.val) && i.push(u.val);
                    }
                    return i;
                  },
                  getStateAfter: function (e, t) {
                    var n = this.doc;
                    return gt(
                      this,
                      (e = ut(n, null == e ? n.first + n.size - 1 : e)) + 1,
                      t
                    ).state;
                  },
                  cursorCoords: function (e, t) {
                    var n = this.doc.sel.primary();
                    return Zn(
                      this,
                      null == e
                        ? n.head
                        : "object" == typeof e
                        ? ct(this.doc, e)
                        : e
                        ? n.from()
                        : n.to(),
                      t || "page"
                    );
                  },
                  charCoords: function (e, t) {
                    return Kn(this, ct(this.doc, e), t || "page");
                  },
                  coordsChar: function (e, t) {
                    return Jn(this, (e = Xn(this, e, t || "page")).left, e.top);
                  },
                  lineAtHeight: function (e, t) {
                    return (
                      (e = Xn(this, { top: e, left: 0 }, t || "page").top),
                      et(this.doc, e + this.display.viewOffset)
                    );
                  },
                  heightAtLine: function (e, t, n) {
                    var i,
                      r = !1;
                    if ("number" == typeof e) {
                      var o = this.doc.first + this.doc.size - 1;
                      e < this.doc.first
                        ? (e = this.doc.first)
                        : e > o && ((e = o), (r = !0)),
                        (i = Ke(this.doc, e));
                    } else i = e;
                    return (
                      Vn(this, i, { top: 0, left: 0 }, t || "page", n || r)
                        .top + (r ? this.doc.height - Gt(i) : 0)
                    );
                  },
                  defaultTextHeight: function () {
                    return ai(this.display);
                  },
                  defaultCharWidth: function () {
                    return li(this.display);
                  },
                  getViewport: function () {
                    return {
                      from: this.display.viewFrom,
                      to: this.display.viewTo,
                    };
                  },
                  addWidget: function (e, t, n, i, r) {
                    var o,
                      a,
                      l,
                      s = this.display,
                      u = (e = Zn(this, ct(this.doc, e))).bottom,
                      c = e.left;
                    if (
                      ((t.style.position = "absolute"),
                      t.setAttribute("cm-ignore-events", "true"),
                      this.display.input.setUneditable(t),
                      s.sizer.appendChild(t),
                      "over" == i)
                    )
                      u = e.top;
                    else if ("above" == i || "near" == i) {
                      var d = Math.max(s.wrapper.clientHeight, this.doc.height),
                        h = Math.max(
                          s.sizer.clientWidth,
                          s.lineSpace.clientWidth
                        );
                      ("above" == i || e.bottom + t.offsetHeight > d) &&
                      e.top > t.offsetHeight
                        ? (u = e.top - t.offsetHeight)
                        : e.bottom + t.offsetHeight <= d && (u = e.bottom),
                        c + t.offsetWidth > h && (c = h - t.offsetWidth);
                    }
                    (t.style.top = u + "px"),
                      (t.style.left = t.style.right = ""),
                      "right" == r
                        ? ((c = s.sizer.clientWidth - t.offsetWidth),
                          (t.style.right = "0px"))
                        : ("left" == r
                            ? (c = 0)
                            : "middle" == r &&
                              (c = (s.sizer.clientWidth - t.offsetWidth) / 2),
                          (t.style.left = c + "px")),
                      n &&
                        ((o = this),
                        (a = {
                          left: c,
                          top: u,
                          right: c + t.offsetWidth,
                          bottom: u + t.offsetHeight,
                        }),
                        null != (l = Bi(o, a)).scrollTop && Ri(o, l.scrollTop),
                        null != l.scrollLeft && _i(o, l.scrollLeft));
                  },
                  triggerOnKeyDown: rr(pa),
                  triggerOnKeyPress: rr(ga),
                  triggerOnKeyUp: ma,
                  triggerOnMouseDown: rr(ba),
                  execCommand: function (e) {
                    if (oa.hasOwnProperty(e)) return oa[e].call(null, this);
                  },
                  triggerElectric: rr(function (e) {
                    Ra(this, e);
                  }),
                  findPosH: function (e, t, n, i) {
                    var r = 1;
                    t < 0 && ((r = -1), (t = -t));
                    for (
                      var o = ct(this.doc, e), a = 0;
                      a < t && !(o = ja(this.doc, o, r, n, i)).hitSide;
                      ++a
                    );
                    return o;
                  },
                  moveH: rr(function (e, t) {
                    var n = this;
                    this.extendSelectionsBy(function (i) {
                      return n.display.shift || n.doc.extend || i.empty()
                        ? ja(n.doc, i.head, e, t, n.options.rtlMoveVisually)
                        : e < 0
                        ? i.from()
                        : i.to();
                    }, V);
                  }),
                  deleteH: rr(function (e, t) {
                    var n = this.doc.sel,
                      i = this.doc;
                    n.somethingSelected()
                      ? i.replaceSelection("", null, "+delete")
                      : ta(this, function (n) {
                          var r = ja(i, n.head, e, t, !1);
                          return e < 0
                            ? { from: r, to: n.head }
                            : { from: n.head, to: r };
                        });
                  }),
                  findPosV: function (e, t, n, i) {
                    var r = 1,
                      o = i;
                    t < 0 && ((r = -1), (t = -t));
                    for (var a = ct(this.doc, e), l = 0; l < t; ++l) {
                      var s = Zn(this, a, "div");
                      if (
                        (null == o ? (o = s.left) : (s.left = o),
                        (a = qa(this, s, r, n)).hitSide)
                      )
                        break;
                    }
                    return a;
                  },
                  moveV: rr(function (e, t) {
                    var n = this,
                      i = this.doc,
                      r = [],
                      o =
                        !this.display.shift &&
                        !i.extend &&
                        i.sel.somethingSelected();
                    if (
                      (i.extendSelectionsBy(function (a) {
                        if (o) return e < 0 ? a.from() : a.to();
                        var l = Zn(n, a.head, "div");
                        null != a.goalColumn && (l.left = a.goalColumn),
                          r.push(l.left);
                        var s = qa(n, l, e, t);
                        return (
                          "page" == t &&
                            a == i.sel.primary() &&
                            Ni(n, Kn(n, s, "div").top - l.top),
                          s
                        );
                      }, V),
                      r.length)
                    )
                      for (var a = 0; a < i.sel.ranges.length; a++)
                        i.sel.ranges[a].goalColumn = r[a];
                  }),
                  findWordAt: function (e) {
                    var t = Ke(this.doc, e.line).text,
                      n = e.ch,
                      i = e.ch;
                    if (t) {
                      var r = this.getHelper(e, "wordChars");
                      ("before" != e.sticky && i != t.length) || !n ? ++i : --n;
                      for (
                        var o = t.charAt(n),
                          a = ie(o, r)
                            ? function (e) {
                                return ie(e, r);
                              }
                            : /\s/.test(o)
                            ? function (e) {
                                return /\s/.test(e);
                              }
                            : function (e) {
                                return !/\s/.test(e) && !ie(e);
                              };
                        n > 0 && a(t.charAt(n - 1));

                      )
                        --n;
                      for (; i < t.length && a(t.charAt(i)); ) ++i;
                    }
                    return new Ar(it(e.line, n), it(e.line, i));
                  },
                  toggleOverwrite: function (e) {
                    (null != e && e == this.state.overwrite) ||
                      ((this.state.overwrite = !this.state.overwrite)
                        ? O(this.display.cursorDiv, "CodeMirror-overwrite")
                        : A(this.display.cursorDiv, "CodeMirror-overwrite"),
                      ve(this, "overwriteToggle", this, this.state.overwrite));
                  },
                  hasFocus: function () {
                    return this.display.input.getField() == N(H(this));
                  },
                  isReadOnly: function () {
                    return !(!this.options.readOnly && !this.doc.cantEdit);
                  },
                  scrollTo: rr(function (e, t) {
                    Ii(this, e, t);
                  }),
                  getScrollInfo: function () {
                    var e = this.display.scroller;
                    return {
                      left: e.scrollLeft,
                      top: e.scrollTop,
                      height:
                        e.scrollHeight - Ln(this) - this.display.barHeight,
                      width: e.scrollWidth - Ln(this) - this.display.barWidth,
                      clientHeight: Mn(this),
                      clientWidth: Tn(this),
                    };
                  },
                  scrollIntoView: rr(function (e, t) {
                    null == e
                      ? ((e = { from: this.doc.sel.primary().head, to: null }),
                        null == t && (t = this.options.cursorScrollMargin))
                      : "number" == typeof e
                      ? (e = { from: it(e, 0), to: null })
                      : null == e.from && (e = { from: e, to: null }),
                      e.to || (e.to = e.from),
                      (e.margin = t || 0),
                      null != e.from.line
                        ? (function (e, t) {
                            zi(e), (e.curOp.scrollToPos = t);
                          })(this, e)
                        : Hi(this, e.from, e.to, e.margin);
                  }),
                  setSize: rr(function (e, t) {
                    var n = this,
                      i = function (e) {
                        return "number" == typeof e || /^\d+$/.test(String(e))
                          ? e + "px"
                          : e;
                      };
                    null != e && (this.display.wrapper.style.width = i(e)),
                      null != t && (this.display.wrapper.style.height = i(t)),
                      this.options.lineWrapping && jn(this);
                    var r = this.display.viewFrom;
                    this.doc.iter(r, this.display.viewTo, function (e) {
                      if (e.widgets)
                        for (var t = 0; t < e.widgets.length; t++)
                          if (e.widgets[t].noHScroll) {
                            mi(n, r, "widget");
                            break;
                          }
                      ++r;
                    }),
                      (this.curOp.forceUpdate = !0),
                      ve(this, "refresh", this);
                  }),
                  operation: function (e) {
                    return nr(this, e);
                  },
                  startOperation: function () {
                    return Ki(this);
                  },
                  endOperation: function () {
                    return Zi(this);
                  },
                  refresh: rr(function () {
                    var e = this.display.cachedTextHeight;
                    pi(this),
                      (this.curOp.forceUpdate = !0),
                      qn(this),
                      Ii(this, this.doc.scrollLeft, this.doc.scrollTop),
                      fr(this.display),
                      (null == e ||
                        Math.abs(e - ai(this.display)) > 0.5 ||
                        this.options.lineWrapping) &&
                        di(this),
                      ve(this, "refresh", this);
                  }),
                  swapDoc: rr(function (e) {
                    var t = this.doc;
                    return (
                      (t.cm = null),
                      this.state.selectingText && this.state.selectingText(),
                      Pr(this, e),
                      qn(this),
                      this.display.input.reset(),
                      Ii(this, e.scrollLeft, e.scrollTop),
                      (this.curOp.forceScroll = !0),
                      dn(this, "swapDoc", this, t),
                      t
                    );
                  }),
                  phrase: function (e) {
                    var t = this.options.phrases;
                    return t && Object.prototype.hasOwnProperty.call(t, e)
                      ? t[e]
                      : e;
                  },
                  getInputField: function () {
                    return this.display.input.getField();
                  },
                  getWrapperElement: function () {
                    return this.display.wrapper;
                  },
                  getScrollerElement: function () {
                    return this.display.scroller;
                  },
                  getGutterElement: function () {
                    return this.display.gutters;
                  },
                }),
                  De(e),
                  (e.registerHelper = function (t, i, r) {
                    n.hasOwnProperty(t) || (n[t] = e[t] = { _global: [] }),
                      (n[t][i] = r);
                  }),
                  (e.registerGlobalHelper = function (t, i, r, o) {
                    e.registerHelper(t, i, o),
                      n[t]._global.push({ pred: r, val: o });
                  });
              })(Ma);
            var Za = "iter insert remove copy getEditor constructor".split(" ");
            for (var Ya in Io.prototype)
              Io.prototype.hasOwnProperty(Ya) &&
                q(Za, Ya) < 0 &&
                (Ma.prototype[Ya] = (function (e) {
                  return function () {
                    return e.apply(this.doc, arguments);
                  };
                })(Io.prototype[Ya]));
            return (
              De(Io),
              (Ma.inputStyles = { textarea: Ka, contenteditable: Ua }),
              (Ma.defineMode = function (e) {
                Ma.defaults.mode || "null" == e || (Ma.defaults.mode = e),
                  _e.apply(this, arguments);
              }),
              (Ma.defineMIME = function (e, t) {
                Pe[e] = t;
              }),
              Ma.defineMode("null", function () {
                return {
                  token: function (e) {
                    return e.skipToEnd();
                  },
                };
              }),
              Ma.defineMIME("text/plain", "null"),
              (Ma.defineExtension = function (e, t) {
                Ma.prototype[e] = t;
              }),
              (Ma.defineDocExtension = function (e, t) {
                Io.prototype[e] = t;
              }),
              (Ma.fromTextArea = function (e, t) {
                if (
                  (((t = t ? _(t) : {}).value = e.value),
                  !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex),
                  !t.placeholder &&
                    e.placeholder &&
                    (t.placeholder = e.placeholder),
                  null == t.autofocus)
                ) {
                  var n = N(e.ownerDocument);
                  t.autofocus =
                    n == e ||
                    (null != e.getAttribute("autofocus") && n == document.body);
                }
                function i() {
                  e.value = l.getValue();
                }
                var r;
                if (
                  e.form &&
                  (pe(e.form, "submit", i), !t.leaveSubmitMethodAlone)
                ) {
                  var o = e.form;
                  r = o.submit;
                  try {
                    var a = (o.submit = function () {
                      i(), (o.submit = r), o.submit(), (o.submit = a);
                    });
                  } catch (e) {}
                }
                (t.finishInit = function (n) {
                  (n.save = i),
                    (n.getTextArea = function () {
                      return e;
                    }),
                    (n.toTextArea = function () {
                      (n.toTextArea = isNaN),
                        i(),
                        e.parentNode.removeChild(n.getWrapperElement()),
                        (e.style.display = ""),
                        e.form &&
                          (ge(e.form, "submit", i),
                          t.leaveSubmitMethodAlone ||
                            "function" != typeof e.form.submit ||
                            (e.form.submit = r));
                    });
                }),
                  (e.style.display = "none");
                var l = Ma(function (t) {
                  return e.parentNode.insertBefore(t, e.nextSibling);
                }, t);
                return l;
              }),
              (function (e) {
                (e.off = ge),
                  (e.on = pe),
                  (e.wheelEventPixels = kr),
                  (e.Doc = Io),
                  (e.splitLines = Oe),
                  (e.countColumn = W),
                  (e.findColumn = X),
                  (e.isWordChar = ne),
                  (e.Pass = U),
                  (e.signal = ve),
                  (e.Line = Kt),
                  (e.changeEnd = Tr),
                  (e.scrollbarModel = Gi),
                  (e.Pos = it),
                  (e.cmpPos = rt),
                  (e.modes = Re),
                  (e.mimeModes = Pe),
                  (e.resolveMode = We),
                  (e.getMode = je),
                  (e.modeExtensions = qe),
                  (e.extendMode = Ue),
                  (e.copyState = $e),
                  (e.startState = Ve),
                  (e.innerMode = Ge),
                  (e.commands = oa),
                  (e.keyMap = Vo),
                  (e.keyName = Jo),
                  (e.isModifierKey = Yo),
                  (e.lookupKey = Zo),
                  (e.normalizeKeyMap = Ko),
                  (e.StringStream = Xe),
                  (e.SharedTextMarker = Mo),
                  (e.TextMarker = Lo),
                  (e.LineWidget = Fo),
                  (e.e_preventDefault = Ce),
                  (e.e_stopPropagation = we),
                  (e.e_stop = Se),
                  (e.addClass = O),
                  (e.contains = B),
                  (e.rmClass = A),
                  (e.keyNames = qo);
              })(Ma),
              (Ma.version = "5.65.9"),
              Ma
            );
          });
        },
        {},
      ],
      11: [
        function (e, t, n) {
          var i;
          (i = function (e) {
            "use strict";
            var t =
              /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
            e.defineMode(
              "gfm",
              function (n, i) {
                var r = 0,
                  o = {
                    startState: function () {
                      return { code: !1, codeBlock: !1, ateSpace: !1 };
                    },
                    copyState: function (e) {
                      return {
                        code: e.code,
                        codeBlock: e.codeBlock,
                        ateSpace: e.ateSpace,
                      };
                    },
                    token: function (e, n) {
                      if (((n.combineTokens = null), n.codeBlock))
                        return e.match(/^```+/)
                          ? ((n.codeBlock = !1), null)
                          : (e.skipToEnd(), null);
                      if (
                        (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/))
                      )
                        return e.skipToEnd(), (n.codeBlock = !0), null;
                      if ("`" === e.peek()) {
                        e.next();
                        var o = e.pos;
                        e.eatWhile("`");
                        var a = 1 + e.pos - o;
                        return (
                          n.code
                            ? a === r && (n.code = !1)
                            : ((r = a), (n.code = !0)),
                          null
                        );
                      }
                      if (n.code) return e.next(), null;
                      if (e.eatSpace()) return (n.ateSpace = !0), null;
                      if (
                        (e.sol() || n.ateSpace) &&
                        ((n.ateSpace = !1), !1 !== i.gitHubSpice)
                      ) {
                        if (
                          e.match(
                            /^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/
                          )
                        )
                          return (n.combineTokens = !0), "link";
                        if (
                          e.match(
                            /^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/
                          )
                        )
                          return (n.combineTokens = !0), "link";
                      }
                      return e.match(t) &&
                        "](" != e.string.slice(e.start - 2, e.start) &&
                        (0 == e.start ||
                          /\W/.test(e.string.charAt(e.start - 1)))
                        ? ((n.combineTokens = !0), "link")
                        : (e.next(), null);
                    },
                    blankLine: function (e) {
                      return (e.code = !1), null;
                    },
                  },
                  a = { taskLists: !0, strikethrough: !0, emoji: !0 };
                for (var l in i) a[l] = i[l];
                return (a.name = "markdown"), e.overlayMode(e.getMode(n, a), o);
              },
              "markdown"
            ),
              e.defineMIME("text/x-gfm", "gfm");
          }),
            "object" == typeof n && "object" == typeof t
              ? i(
                  e("../../lib/codemirror"),
                  e("../markdown/markdown"),
                  e("../../addon/mode/overlay")
                )
              : i(CodeMirror);
        },
        {
          "../../addon/mode/overlay": 7,
          "../../lib/codemirror": 10,
          "../markdown/markdown": 12,
        },
      ],
      12: [
        function (e, t, n) {
          var i;
          (i = function (e) {
            "use strict";
            e.defineMode(
              "markdown",
              function (t, n) {
                var i = e.getMode(t, "text/html"),
                  r = "null" == i.name;
                void 0 === n.highlightFormatting &&
                  (n.highlightFormatting = !1),
                  void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0),
                  void 0 === n.taskLists && (n.taskLists = !1),
                  void 0 === n.strikethrough && (n.strikethrough = !1),
                  void 0 === n.emoji && (n.emoji = !1),
                  void 0 === n.fencedCodeBlockHighlighting &&
                    (n.fencedCodeBlockHighlighting = !0),
                  void 0 === n.fencedCodeBlockDefaultMode &&
                    (n.fencedCodeBlockDefaultMode = "text/plain"),
                  void 0 === n.xml && (n.xml = !0),
                  void 0 === n.tokenTypeOverrides &&
                    (n.tokenTypeOverrides = {});
                var o = {
                  header: "header",
                  code: "comment",
                  quote: "quote",
                  list1: "variable-2",
                  list2: "variable-3",
                  list3: "keyword",
                  hr: "hr",
                  image: "image",
                  imageAltText: "image-alt-text",
                  imageMarker: "image-marker",
                  formatting: "formatting",
                  linkInline: "link",
                  linkEmail: "link",
                  linkText: "link",
                  linkHref: "string",
                  em: "em",
                  strong: "strong",
                  strikethrough: "strikethrough",
                  emoji: "builtin",
                };
                for (var a in o)
                  o.hasOwnProperty(a) &&
                    n.tokenTypeOverrides[a] &&
                    (o[a] = n.tokenTypeOverrides[a]);
                var l = /^([*\-_])(?:\s*\1){2,}\s*$/,
                  s = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
                  u = /^\[(x| )\](?=\s)/i,
                  c = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                  d = /^ {0,3}(?:\={1,}|-{2,})\s*$/,
                  h = /^[^#!\[\]*_\\<>` "'(~:]+/,
                  f = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/,
                  p = /^\s*\[[^\]]+?\]:.*$/,
                  m =
                    /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/;
                function g(e, t, n) {
                  return (t.f = t.inline = n), n(e, t);
                }
                function v(e, t, n) {
                  return (t.f = t.block = n), n(e, t);
                }
                function x(t) {
                  if (
                    ((t.linkTitle = !1),
                    (t.linkHref = !1),
                    (t.linkText = !1),
                    (t.em = !1),
                    (t.strong = !1),
                    (t.strikethrough = !1),
                    (t.quote = 0),
                    (t.indentedCode = !1),
                    t.f == b)
                  ) {
                    var n = r;
                    if (!n) {
                      var o = e.innerMode(i, t.htmlState);
                      n =
                        "xml" == o.mode.name &&
                        null === o.state.tagStart &&
                        !o.state.context &&
                        o.state.tokenize.isInText;
                    }
                    n && ((t.f = k), (t.block = y), (t.htmlState = null));
                  }
                  return (
                    (t.trailingSpace = 0),
                    (t.trailingSpaceNewLine = !1),
                    (t.prevLine = t.thisLine),
                    (t.thisLine = { stream: null }),
                    null
                  );
                }
                function y(i, r) {
                  var a,
                    h = i.column() === r.indentation,
                    m = !(a = r.prevLine.stream) || !/\S/.test(a.string),
                    v = r.indentedCode,
                    x = r.prevLine.hr,
                    y = !1 !== r.list,
                    b = (r.listStack[r.listStack.length - 1] || 0) + 3;
                  r.indentedCode = !1;
                  var w = r.indentation;
                  if (
                    null === r.indentationDiff &&
                    ((r.indentationDiff = r.indentation), y)
                  ) {
                    for (
                      r.list = null;
                      w < r.listStack[r.listStack.length - 1];

                    )
                      r.listStack.pop(),
                        r.listStack.length
                          ? (r.indentation =
                              r.listStack[r.listStack.length - 1])
                          : (r.list = !1);
                    !1 !== r.list &&
                      (r.indentationDiff =
                        w - r.listStack[r.listStack.length - 1]);
                  }
                  var k = !(
                      m ||
                      x ||
                      r.prevLine.header ||
                      (y && v) ||
                      r.prevLine.fencedCodeEnd
                    ),
                    S =
                      (!1 === r.list || x || m) &&
                      r.indentation <= b &&
                      i.match(l),
                    F = null;
                  if (
                    r.indentationDiff >= 4 &&
                    (v || r.prevLine.fencedCodeEnd || r.prevLine.header || m)
                  )
                    return i.skipToEnd(), (r.indentedCode = !0), o.code;
                  if (i.eatSpace()) return null;
                  if (
                    h &&
                    r.indentation <= b &&
                    (F = i.match(c)) &&
                    F[1].length <= 6
                  )
                    return (
                      (r.quote = 0),
                      (r.header = F[1].length),
                      (r.thisLine.header = !0),
                      n.highlightFormatting && (r.formatting = "header"),
                      (r.f = r.inline),
                      C(r)
                    );
                  if (r.indentation <= b && i.eat(">"))
                    return (
                      (r.quote = h ? 1 : r.quote + 1),
                      n.highlightFormatting && (r.formatting = "quote"),
                      i.eatSpace(),
                      C(r)
                    );
                  if (
                    !S &&
                    !r.setext &&
                    h &&
                    r.indentation <= b &&
                    (F = i.match(s))
                  ) {
                    var A = F[1] ? "ol" : "ul";
                    return (
                      (r.indentation = w + i.current().length),
                      (r.list = !0),
                      (r.quote = 0),
                      r.listStack.push(r.indentation),
                      (r.em = !1),
                      (r.strong = !1),
                      (r.code = !1),
                      (r.strikethrough = !1),
                      n.taskLists && i.match(u, !1) && (r.taskList = !0),
                      (r.f = r.inline),
                      n.highlightFormatting &&
                        (r.formatting = ["list", "list-" + A]),
                      C(r)
                    );
                  }
                  return h && r.indentation <= b && (F = i.match(f, !0))
                    ? ((r.quote = 0),
                      (r.fencedEndRE = new RegExp(F[1] + "+ *$")),
                      (r.localMode =
                        n.fencedCodeBlockHighlighting &&
                        (function (n) {
                          if (e.findModeByName) {
                            var i = e.findModeByName(n);
                            i && (n = i.mime || i.mimes[0]);
                          }
                          var r = e.getMode(t, n);
                          return "null" == r.name ? null : r;
                        })(F[2] || n.fencedCodeBlockDefaultMode)),
                      r.localMode && (r.localState = e.startState(r.localMode)),
                      (r.f = r.block = D),
                      n.highlightFormatting && (r.formatting = "code-block"),
                      (r.code = -1),
                      C(r))
                    : r.setext ||
                      (!(
                        (k && y) ||
                        r.quote ||
                        !1 !== r.list ||
                        r.code ||
                        S ||
                        p.test(i.string)
                      ) &&
                        (F = i.lookAhead(1)) &&
                        (F = F.match(d)))
                    ? (r.setext
                        ? ((r.header = r.setext),
                          (r.setext = 0),
                          i.skipToEnd(),
                          n.highlightFormatting && (r.formatting = "header"))
                        : ((r.header = "=" == F[0].charAt(0) ? 1 : 2),
                          (r.setext = r.header)),
                      (r.thisLine.header = !0),
                      (r.f = r.inline),
                      C(r))
                    : S
                    ? (i.skipToEnd(), (r.hr = !0), (r.thisLine.hr = !0), o.hr)
                    : "[" === i.peek()
                    ? g(i, r, E)
                    : g(i, r, r.inline);
                }
                function b(t, n) {
                  var o = i.token(t, n.htmlState);
                  if (!r) {
                    var a = e.innerMode(i, n.htmlState);
                    (("xml" == a.mode.name &&
                      null === a.state.tagStart &&
                      !a.state.context &&
                      a.state.tokenize.isInText) ||
                      (n.md_inside && t.current().indexOf(">") > -1)) &&
                      ((n.f = k), (n.block = y), (n.htmlState = null));
                  }
                  return o;
                }
                function D(e, t) {
                  var i,
                    r = t.listStack[t.listStack.length - 1] || 0,
                    a = t.indentation < r,
                    l = r + 3;
                  return t.fencedEndRE &&
                    t.indentation <= l &&
                    (a || e.match(t.fencedEndRE))
                    ? (n.highlightFormatting && (t.formatting = "code-block"),
                      a || (i = C(t)),
                      (t.localMode = t.localState = null),
                      (t.block = y),
                      (t.f = k),
                      (t.fencedEndRE = null),
                      (t.code = 0),
                      (t.thisLine.fencedCodeEnd = !0),
                      a ? v(e, t, t.block) : i)
                    : t.localMode
                    ? t.localMode.token(e, t.localState)
                    : (e.skipToEnd(), o.code);
                }
                function C(e) {
                  var t = [];
                  if (e.formatting) {
                    t.push(o.formatting),
                      "string" == typeof e.formatting &&
                        (e.formatting = [e.formatting]);
                    for (var i = 0; i < e.formatting.length; i++)
                      t.push(o.formatting + "-" + e.formatting[i]),
                        "header" === e.formatting[i] &&
                          t.push(
                            o.formatting +
                              "-" +
                              e.formatting[i] +
                              "-" +
                              e.header
                          ),
                        "quote" === e.formatting[i] &&
                          (!n.maxBlockquoteDepth ||
                          n.maxBlockquoteDepth >= e.quote
                            ? t.push(
                                o.formatting +
                                  "-" +
                                  e.formatting[i] +
                                  "-" +
                                  e.quote
                              )
                            : t.push("error"));
                  }
                  if (e.taskOpen)
                    return t.push("meta"), t.length ? t.join(" ") : null;
                  if (e.taskClosed)
                    return t.push("property"), t.length ? t.join(" ") : null;
                  if (
                    (e.linkHref
                      ? t.push(o.linkHref, "url")
                      : (e.strong && t.push(o.strong),
                        e.em && t.push(o.em),
                        e.strikethrough && t.push(o.strikethrough),
                        e.emoji && t.push(o.emoji),
                        e.linkText && t.push(o.linkText),
                        e.code && t.push(o.code),
                        e.image && t.push(o.image),
                        e.imageAltText && t.push(o.imageAltText, "link"),
                        e.imageMarker && t.push(o.imageMarker)),
                    e.header && t.push(o.header, o.header + "-" + e.header),
                    e.quote &&
                      (t.push(o.quote),
                      !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote
                        ? t.push(o.quote + "-" + e.quote)
                        : t.push(o.quote + "-" + n.maxBlockquoteDepth)),
                    !1 !== e.list)
                  ) {
                    var r = (e.listStack.length - 1) % 3;
                    r
                      ? 1 === r
                        ? t.push(o.list2)
                        : t.push(o.list3)
                      : t.push(o.list1);
                  }
                  return (
                    e.trailingSpaceNewLine
                      ? t.push("trailing-space-new-line")
                      : e.trailingSpace &&
                        t.push(
                          "trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")
                        ),
                    t.length ? t.join(" ") : null
                  );
                }
                function w(e, t) {
                  if (e.match(h, !0)) return C(t);
                }
                function k(t, r) {
                  var a = r.text(t, r);
                  if (void 0 !== a) return a;
                  if (r.list) return (r.list = null), C(r);
                  if (r.taskList)
                    return (
                      " " === t.match(u, !0)[1]
                        ? (r.taskOpen = !0)
                        : (r.taskClosed = !0),
                      n.highlightFormatting && (r.formatting = "task"),
                      (r.taskList = !1),
                      C(r)
                    );
                  if (
                    ((r.taskOpen = !1),
                    (r.taskClosed = !1),
                    r.header && t.match(/^#+$/, !0))
                  )
                    return (
                      n.highlightFormatting && (r.formatting = "header"), C(r)
                    );
                  var l = t.next();
                  if (r.linkTitle) {
                    r.linkTitle = !1;
                    var s = l;
                    "(" === l && (s = ")");
                    var c =
                      "^\\s*(?:[^" +
                      (s = (s + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) +
                      "\\\\]+|\\\\\\\\|\\\\.)" +
                      s;
                    if (t.match(new RegExp(c), !0)) return o.linkHref;
                  }
                  if ("`" === l) {
                    var d = r.formatting;
                    n.highlightFormatting && (r.formatting = "code"),
                      t.eatWhile("`");
                    var h = t.current().length;
                    if (0 != r.code || (r.quote && 1 != h)) {
                      if (h == r.code) {
                        var f = C(r);
                        return (r.code = 0), f;
                      }
                      return (r.formatting = d), C(r);
                    }
                    return (r.code = h), C(r);
                  }
                  if (r.code) return C(r);
                  if ("\\" === l && (t.next(), n.highlightFormatting)) {
                    var p = C(r),
                      g = o.formatting + "-escape";
                    return p ? p + " " + g : g;
                  }
                  if ("!" === l && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1))
                    return (
                      (r.imageMarker = !0),
                      (r.image = !0),
                      n.highlightFormatting && (r.formatting = "image"),
                      C(r)
                    );
                  if (
                    "[" === l &&
                    r.imageMarker &&
                    t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)
                  )
                    return (
                      (r.imageMarker = !1),
                      (r.imageAltText = !0),
                      n.highlightFormatting && (r.formatting = "image"),
                      C(r)
                    );
                  if ("]" === l && r.imageAltText) {
                    n.highlightFormatting && (r.formatting = "image");
                    var p = C(r);
                    return (
                      (r.imageAltText = !1),
                      (r.image = !1),
                      (r.inline = r.f = F),
                      p
                    );
                  }
                  if ("[" === l && !r.image)
                    return (
                      (r.linkText && t.match(/^.*?\]/)) ||
                        ((r.linkText = !0),
                        n.highlightFormatting && (r.formatting = "link")),
                      C(r)
                    );
                  if ("]" === l && r.linkText) {
                    n.highlightFormatting && (r.formatting = "link");
                    var p = C(r);
                    return (
                      (r.linkText = !1),
                      (r.inline = r.f =
                        t.match(/\(.*?\)| ?\[.*?\]/, !1) ? F : k),
                      p
                    );
                  }
                  if (
                    "<" === l &&
                    t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)
                  )
                    return (
                      (r.f = r.inline = S),
                      n.highlightFormatting && (r.formatting = "link"),
                      (p = C(r)) ? (p += " ") : (p = ""),
                      p + o.linkInline
                    );
                  if ("<" === l && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1))
                    return (
                      (r.f = r.inline = S),
                      n.highlightFormatting && (r.formatting = "link"),
                      (p = C(r)) ? (p += " ") : (p = ""),
                      p + o.linkEmail
                    );
                  if (
                    n.xml &&
                    "<" === l &&
                    t.match(
                      /^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
                      !1
                    )
                  ) {
                    var x = t.string.indexOf(">", t.pos);
                    if (-1 != x) {
                      var y = t.string.substring(t.start, x);
                      /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(y) &&
                        (r.md_inside = !0);
                    }
                    return (
                      t.backUp(1), (r.htmlState = e.startState(i)), v(t, r, b)
                    );
                  }
                  if (n.xml && "<" === l && t.match(/^\/\w*?>/))
                    return (r.md_inside = !1), "tag";
                  if ("*" === l || "_" === l) {
                    for (
                      var D = 1,
                        w = 1 == t.pos ? " " : t.string.charAt(t.pos - 2);
                      D < 3 && t.eat(l);

                    )
                      D++;
                    var A = t.peek() || " ",
                      E =
                        !/\s/.test(A) &&
                        (!m.test(A) || /\s/.test(w) || m.test(w)),
                      L =
                        !/\s/.test(w) &&
                        (!m.test(w) || /\s/.test(A) || m.test(A)),
                      T = null,
                      M = null;
                    if (
                      (D % 2 &&
                        (r.em || !E || ("*" !== l && L && !m.test(w))
                          ? r.em != l ||
                            !L ||
                            ("*" !== l && E && !m.test(A)) ||
                            (T = !1)
                          : (T = !0)),
                      D > 1 &&
                        (r.strong || !E || ("*" !== l && L && !m.test(w))
                          ? r.strong != l ||
                            !L ||
                            ("*" !== l && E && !m.test(A)) ||
                            (M = !1)
                          : (M = !0)),
                      null != M || null != T)
                    )
                      return (
                        n.highlightFormatting &&
                          (r.formatting =
                            null == T
                              ? "strong"
                              : null == M
                              ? "em"
                              : "strong em"),
                        !0 === T && (r.em = l),
                        !0 === M && (r.strong = l),
                        (f = C(r)),
                        !1 === T && (r.em = !1),
                        !1 === M && (r.strong = !1),
                        f
                      );
                  } else if (" " === l && (t.eat("*") || t.eat("_"))) {
                    if (" " === t.peek()) return C(r);
                    t.backUp(1);
                  }
                  if (n.strikethrough)
                    if ("~" === l && t.eatWhile(l)) {
                      if (r.strikethrough)
                        return (
                          n.highlightFormatting &&
                            (r.formatting = "strikethrough"),
                          (f = C(r)),
                          (r.strikethrough = !1),
                          f
                        );
                      if (t.match(/^[^\s]/, !1))
                        return (
                          (r.strikethrough = !0),
                          n.highlightFormatting &&
                            (r.formatting = "strikethrough"),
                          C(r)
                        );
                    } else if (" " === l && t.match("~~", !0)) {
                      if (" " === t.peek()) return C(r);
                      t.backUp(2);
                    }
                  if (
                    n.emoji &&
                    ":" === l &&
                    t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)
                  ) {
                    (r.emoji = !0),
                      n.highlightFormatting && (r.formatting = "emoji");
                    var B = C(r);
                    return (r.emoji = !1), B;
                  }
                  return (
                    " " === l &&
                      (t.match(/^ +$/, !1)
                        ? r.trailingSpace++
                        : r.trailingSpace && (r.trailingSpaceNewLine = !0)),
                    C(r)
                  );
                }
                function S(e, t) {
                  if (">" === e.next()) {
                    (t.f = t.inline = k),
                      n.highlightFormatting && (t.formatting = "link");
                    var i = C(t);
                    return i ? (i += " ") : (i = ""), i + o.linkInline;
                  }
                  return e.match(/^[^>]+/, !0), o.linkInline;
                }
                function F(e, t) {
                  if (e.eatSpace()) return null;
                  var i,
                    r = e.next();
                  return "(" === r || "[" === r
                    ? ((t.f = t.inline =
                        ((i = "(" === r ? ")" : "]"),
                        function (e, t) {
                          if (e.next() === i) {
                            (t.f = t.inline = k),
                              n.highlightFormatting &&
                                (t.formatting = "link-string");
                            var r = C(t);
                            return (t.linkHref = !1), r;
                          }
                          return e.match(A[i]), (t.linkHref = !0), C(t);
                        })),
                      n.highlightFormatting && (t.formatting = "link-string"),
                      (t.linkHref = !0),
                      C(t))
                    : "error";
                }
                var A = {
                  ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                  "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/,
                };
                function E(e, t) {
                  return e.match(/^([^\]\\]|\\.)*\]:/, !1)
                    ? ((t.f = L),
                      e.next(),
                      n.highlightFormatting && (t.formatting = "link"),
                      (t.linkText = !0),
                      C(t))
                    : g(e, t, k);
                }
                function L(e, t) {
                  if (e.match("]:", !0)) {
                    (t.f = t.inline = T),
                      n.highlightFormatting && (t.formatting = "link");
                    var i = C(t);
                    return (t.linkText = !1), i;
                  }
                  return e.match(/^([^\]\\]|\\.)+/, !0), o.linkText;
                }
                function T(e, t) {
                  return e.eatSpace()
                    ? null
                    : (e.match(/^[^\s]+/, !0),
                      void 0 === e.peek()
                        ? (t.linkTitle = !0)
                        : e.match(
                            /^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
                            !0
                          ),
                      (t.f = t.inline = k),
                      o.linkHref + " url");
                }
                var M = {
                  startState: function () {
                    return {
                      f: y,
                      prevLine: { stream: null },
                      thisLine: { stream: null },
                      block: y,
                      htmlState: null,
                      indentation: 0,
                      inline: k,
                      text: w,
                      formatting: !1,
                      linkText: !1,
                      linkHref: !1,
                      linkTitle: !1,
                      code: 0,
                      em: !1,
                      strong: !1,
                      header: 0,
                      setext: 0,
                      hr: !1,
                      taskList: !1,
                      list: !1,
                      listStack: [],
                      quote: 0,
                      trailingSpace: 0,
                      trailingSpaceNewLine: !1,
                      strikethrough: !1,
                      emoji: !1,
                      fencedEndRE: null,
                    };
                  },
                  copyState: function (t) {
                    return {
                      f: t.f,
                      prevLine: t.prevLine,
                      thisLine: t.thisLine,
                      block: t.block,
                      htmlState: t.htmlState && e.copyState(i, t.htmlState),
                      indentation: t.indentation,
                      localMode: t.localMode,
                      localState: t.localMode
                        ? e.copyState(t.localMode, t.localState)
                        : null,
                      inline: t.inline,
                      text: t.text,
                      formatting: !1,
                      linkText: t.linkText,
                      linkTitle: t.linkTitle,
                      linkHref: t.linkHref,
                      code: t.code,
                      em: t.em,
                      strong: t.strong,
                      strikethrough: t.strikethrough,
                      emoji: t.emoji,
                      header: t.header,
                      setext: t.setext,
                      hr: t.hr,
                      taskList: t.taskList,
                      list: t.list,
                      listStack: t.listStack.slice(0),
                      quote: t.quote,
                      indentedCode: t.indentedCode,
                      trailingSpace: t.trailingSpace,
                      trailingSpaceNewLine: t.trailingSpaceNewLine,
                      md_inside: t.md_inside,
                      fencedEndRE: t.fencedEndRE,
                    };
                  },
                  token: function (e, t) {
                    if (((t.formatting = !1), e != t.thisLine.stream)) {
                      if (((t.header = 0), (t.hr = !1), e.match(/^\s*$/, !0)))
                        return x(t), null;
                      if (
                        ((t.prevLine = t.thisLine),
                        (t.thisLine = { stream: e }),
                        (t.taskList = !1),
                        (t.trailingSpace = 0),
                        (t.trailingSpaceNewLine = !1),
                        !t.localState && ((t.f = t.block), t.f != b))
                      ) {
                        var n = e
                          .match(/^\s*/, !0)[0]
                          .replace(/\t/g, "    ").length;
                        if (
                          ((t.indentation = n),
                          (t.indentationDiff = null),
                          n > 0)
                        )
                          return null;
                      }
                    }
                    return t.f(e, t);
                  },
                  innerMode: function (e) {
                    return e.block == b
                      ? { state: e.htmlState, mode: i }
                      : e.localState
                      ? { state: e.localState, mode: e.localMode }
                      : { state: e, mode: M };
                  },
                  indent: function (t, n, r) {
                    return t.block == b && i.indent
                      ? i.indent(t.htmlState, n, r)
                      : t.localState && t.localMode.indent
                      ? t.localMode.indent(t.localState, n, r)
                      : e.Pass;
                  },
                  blankLine: x,
                  getType: C,
                  blockCommentStart: "\x3c!--",
                  blockCommentEnd: "--\x3e",
                  closeBrackets: "()[]{}''\"\"``",
                  fold: "markdown",
                };
                return M;
              },
              "xml"
            ),
              e.defineMIME("text/markdown", "markdown"),
              e.defineMIME("text/x-markdown", "markdown");
          }),
            "object" == typeof n && "object" == typeof t
              ? i(e("../../lib/codemirror"), e("../xml/xml"), e("../meta"))
              : i(CodeMirror);
        },
        { "../../lib/codemirror": 10, "../meta": 13, "../xml/xml": 14 },
      ],
      13: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            e.modeInfo = [
              {
                name: "APL",
                mime: "text/apl",
                mode: "apl",
                ext: ["dyalog", "apl"],
              },
              {
                name: "PGP",
                mimes: [
                  "application/pgp",
                  "application/pgp-encrypted",
                  "application/pgp-keys",
                  "application/pgp-signature",
                ],
                mode: "asciiarmor",
                ext: ["asc", "pgp", "sig"],
              },
              {
                name: "ASN.1",
                mime: "text/x-ttcn-asn",
                mode: "asn.1",
                ext: ["asn", "asn1"],
              },
              {
                name: "Asterisk",
                mime: "text/x-asterisk",
                mode: "asterisk",
                file: /^extensions\.conf$/i,
              },
              {
                name: "Brainfuck",
                mime: "text/x-brainfuck",
                mode: "brainfuck",
                ext: ["b", "bf"],
              },
              {
                name: "C",
                mime: "text/x-csrc",
                mode: "clike",
                ext: ["c", "h", "ino"],
              },
              {
                name: "C++",
                mime: "text/x-c++src",
                mode: "clike",
                ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
                alias: ["cpp"],
              },
              {
                name: "Cobol",
                mime: "text/x-cobol",
                mode: "cobol",
                ext: ["cob", "cpy", "cbl"],
              },
              {
                name: "C#",
                mime: "text/x-csharp",
                mode: "clike",
                ext: ["cs"],
                alias: ["csharp", "cs"],
              },
              {
                name: "Clojure",
                mime: "text/x-clojure",
                mode: "clojure",
                ext: ["clj", "cljc", "cljx"],
              },
              {
                name: "ClojureScript",
                mime: "text/x-clojurescript",
                mode: "clojure",
                ext: ["cljs"],
              },
              {
                name: "Closure Stylesheets (GSS)",
                mime: "text/x-gss",
                mode: "css",
                ext: ["gss"],
              },
              {
                name: "CMake",
                mime: "text/x-cmake",
                mode: "cmake",
                ext: ["cmake", "cmake.in"],
                file: /^CMakeLists\.txt$/,
              },
              {
                name: "CoffeeScript",
                mimes: [
                  "application/vnd.coffeescript",
                  "text/coffeescript",
                  "text/x-coffeescript",
                ],
                mode: "coffeescript",
                ext: ["coffee"],
                alias: ["coffee", "coffee-script"],
              },
              {
                name: "Common Lisp",
                mime: "text/x-common-lisp",
                mode: "commonlisp",
                ext: ["cl", "lisp", "el"],
                alias: ["lisp"],
              },
              {
                name: "Cypher",
                mime: "application/x-cypher-query",
                mode: "cypher",
                ext: ["cyp", "cypher"],
              },
              {
                name: "Cython",
                mime: "text/x-cython",
                mode: "python",
                ext: ["pyx", "pxd", "pxi"],
              },
              {
                name: "Crystal",
                mime: "text/x-crystal",
                mode: "crystal",
                ext: ["cr"],
              },
              { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] },
              {
                name: "CQL",
                mime: "text/x-cassandra",
                mode: "sql",
                ext: ["cql"],
              },
              { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] },
              {
                name: "Dart",
                mimes: ["application/dart", "text/x-dart"],
                mode: "dart",
                ext: ["dart"],
              },
              {
                name: "diff",
                mime: "text/x-diff",
                mode: "diff",
                ext: ["diff", "patch"],
              },
              { name: "Django", mime: "text/x-django", mode: "django" },
              {
                name: "Dockerfile",
                mime: "text/x-dockerfile",
                mode: "dockerfile",
                file: /^Dockerfile$/,
              },
              {
                name: "DTD",
                mime: "application/xml-dtd",
                mode: "dtd",
                ext: ["dtd"],
              },
              {
                name: "Dylan",
                mime: "text/x-dylan",
                mode: "dylan",
                ext: ["dylan", "dyl", "intr"],
              },
              { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" },
              { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] },
              {
                name: "edn",
                mime: "application/edn",
                mode: "clojure",
                ext: ["edn"],
              },
              {
                name: "Eiffel",
                mime: "text/x-eiffel",
                mode: "eiffel",
                ext: ["e"],
              },
              { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] },
              {
                name: "Embedded JavaScript",
                mime: "application/x-ejs",
                mode: "htmlembedded",
                ext: ["ejs"],
              },
              {
                name: "Embedded Ruby",
                mime: "application/x-erb",
                mode: "htmlembedded",
                ext: ["erb"],
              },
              {
                name: "Erlang",
                mime: "text/x-erlang",
                mode: "erlang",
                ext: ["erl"],
              },
              { name: "Esper", mime: "text/x-esper", mode: "sql" },
              {
                name: "Factor",
                mime: "text/x-factor",
                mode: "factor",
                ext: ["factor"],
              },
              { name: "FCL", mime: "text/x-fcl", mode: "fcl" },
              {
                name: "Forth",
                mime: "text/x-forth",
                mode: "forth",
                ext: ["forth", "fth", "4th"],
              },
              {
                name: "Fortran",
                mime: "text/x-fortran",
                mode: "fortran",
                ext: ["f", "for", "f77", "f90", "f95"],
              },
              {
                name: "F#",
                mime: "text/x-fsharp",
                mode: "mllike",
                ext: ["fs"],
                alias: ["fsharp"],
              },
              { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] },
              {
                name: "Gherkin",
                mime: "text/x-feature",
                mode: "gherkin",
                ext: ["feature"],
              },
              {
                name: "GitHub Flavored Markdown",
                mime: "text/x-gfm",
                mode: "gfm",
                file: /^(readme|contributing|history)\.md$/i,
              },
              { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] },
              {
                name: "Groovy",
                mime: "text/x-groovy",
                mode: "groovy",
                ext: ["groovy", "gradle"],
                file: /^Jenkinsfile$/,
              },
              {
                name: "HAML",
                mime: "text/x-haml",
                mode: "haml",
                ext: ["haml"],
              },
              {
                name: "Haskell",
                mime: "text/x-haskell",
                mode: "haskell",
                ext: ["hs"],
              },
              {
                name: "Haskell (Literate)",
                mime: "text/x-literate-haskell",
                mode: "haskell-literate",
                ext: ["lhs"],
              },
              { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] },
              {
                name: "HXML",
                mime: "text/x-hxml",
                mode: "haxe",
                ext: ["hxml"],
              },
              {
                name: "ASP.NET",
                mime: "application/x-aspx",
                mode: "htmlembedded",
                ext: ["aspx"],
                alias: ["asp", "aspx"],
              },
              {
                name: "HTML",
                mime: "text/html",
                mode: "htmlmixed",
                ext: ["html", "htm", "handlebars", "hbs"],
                alias: ["xhtml"],
              },
              { name: "HTTP", mime: "message/http", mode: "http" },
              { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] },
              {
                name: "Pug",
                mime: "text/x-pug",
                mode: "pug",
                ext: ["jade", "pug"],
                alias: ["jade"],
              },
              {
                name: "Java",
                mime: "text/x-java",
                mode: "clike",
                ext: ["java"],
              },
              {
                name: "Java Server Pages",
                mime: "application/x-jsp",
                mode: "htmlembedded",
                ext: ["jsp"],
                alias: ["jsp"],
              },
              {
                name: "JavaScript",
                mimes: [
                  "text/javascript",
                  "text/ecmascript",
                  "application/javascript",
                  "application/x-javascript",
                  "application/ecmascript",
                ],
                mode: "javascript",
                ext: ["js"],
                alias: ["ecmascript", "js", "node"],
              },
              {
                name: "JSON",
                mimes: ["application/json", "application/x-json"],
                mode: "javascript",
                ext: ["json", "map"],
                alias: ["json5"],
              },
              {
                name: "JSON-LD",
                mime: "application/ld+json",
                mode: "javascript",
                ext: ["jsonld"],
                alias: ["jsonld"],
              },
              { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] },
              {
                name: "Jinja2",
                mime: "text/jinja2",
                mode: "jinja2",
                ext: ["j2", "jinja", "jinja2"],
              },
              {
                name: "Julia",
                mime: "text/x-julia",
                mode: "julia",
                ext: ["jl"],
                alias: ["jl"],
              },
              {
                name: "Kotlin",
                mime: "text/x-kotlin",
                mode: "clike",
                ext: ["kt"],
              },
              { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] },
              {
                name: "LiveScript",
                mime: "text/x-livescript",
                mode: "livescript",
                ext: ["ls"],
                alias: ["ls"],
              },
              { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] },
              {
                name: "Markdown",
                mime: "text/x-markdown",
                mode: "markdown",
                ext: ["markdown", "md", "mkd"],
              },
              { name: "mIRC", mime: "text/mirc", mode: "mirc" },
              { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" },
              {
                name: "Mathematica",
                mime: "text/x-mathematica",
                mode: "mathematica",
                ext: ["m", "nb", "wl", "wls"],
              },
              {
                name: "Modelica",
                mime: "text/x-modelica",
                mode: "modelica",
                ext: ["mo"],
              },
              {
                name: "MUMPS",
                mime: "text/x-mumps",
                mode: "mumps",
                ext: ["mps"],
              },
              { name: "MS SQL", mime: "text/x-mssql", mode: "sql" },
              {
                name: "mbox",
                mime: "application/mbox",
                mode: "mbox",
                ext: ["mbox"],
              },
              { name: "MySQL", mime: "text/x-mysql", mode: "sql" },
              {
                name: "Nginx",
                mime: "text/x-nginx-conf",
                mode: "nginx",
                file: /nginx.*\.conf$/i,
              },
              {
                name: "NSIS",
                mime: "text/x-nsis",
                mode: "nsis",
                ext: ["nsh", "nsi"],
              },
              {
                name: "NTriples",
                mimes: [
                  "application/n-triples",
                  "application/n-quads",
                  "text/n-triples",
                ],
                mode: "ntriples",
                ext: ["nt", "nq"],
              },
              {
                name: "Objective-C",
                mime: "text/x-objectivec",
                mode: "clike",
                ext: ["m"],
                alias: ["objective-c", "objc"],
              },
              {
                name: "Objective-C++",
                mime: "text/x-objectivec++",
                mode: "clike",
                ext: ["mm"],
                alias: ["objective-c++", "objc++"],
              },
              {
                name: "OCaml",
                mime: "text/x-ocaml",
                mode: "mllike",
                ext: ["ml", "mli", "mll", "mly"],
              },
              {
                name: "Octave",
                mime: "text/x-octave",
                mode: "octave",
                ext: ["m"],
              },
              { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] },
              {
                name: "Pascal",
                mime: "text/x-pascal",
                mode: "pascal",
                ext: ["p", "pas"],
              },
              { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] },
              {
                name: "Perl",
                mime: "text/x-perl",
                mode: "perl",
                ext: ["pl", "pm"],
              },
              {
                name: "PHP",
                mimes: [
                  "text/x-php",
                  "application/x-httpd-php",
                  "application/x-httpd-php-open",
                ],
                mode: "php",
                ext: ["php", "php3", "php4", "php5", "php7", "phtml"],
              },
              { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] },
              {
                name: "Plain Text",
                mime: "text/plain",
                mode: "null",
                ext: ["txt", "text", "conf", "def", "list", "log"],
              },
              {
                name: "PLSQL",
                mime: "text/x-plsql",
                mode: "sql",
                ext: ["pls"],
              },
              { name: "PostgreSQL", mime: "text/x-pgsql", mode: "sql" },
              {
                name: "PowerShell",
                mime: "application/x-powershell",
                mode: "powershell",
                ext: ["ps1", "psd1", "psm1"],
              },
              {
                name: "Properties files",
                mime: "text/x-properties",
                mode: "properties",
                ext: ["properties", "ini", "in"],
                alias: ["ini", "properties"],
              },
              {
                name: "ProtoBuf",
                mime: "text/x-protobuf",
                mode: "protobuf",
                ext: ["proto"],
              },
              {
                name: "Python",
                mime: "text/x-python",
                mode: "python",
                ext: ["BUILD", "bzl", "py", "pyw"],
                file: /^(BUCK|BUILD)$/,
              },
              {
                name: "Puppet",
                mime: "text/x-puppet",
                mode: "puppet",
                ext: ["pp"],
              },
              { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] },
              {
                name: "R",
                mime: "text/x-rsrc",
                mode: "r",
                ext: ["r", "R"],
                alias: ["rscript"],
              },
              {
                name: "reStructuredText",
                mime: "text/x-rst",
                mode: "rst",
                ext: ["rst"],
                alias: ["rst"],
              },
              { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" },
              {
                name: "RPM Spec",
                mime: "text/x-rpm-spec",
                mode: "rpm",
                ext: ["spec"],
              },
              {
                name: "Ruby",
                mime: "text/x-ruby",
                mode: "ruby",
                ext: ["rb"],
                alias: ["jruby", "macruby", "rake", "rb", "rbx"],
              },
              {
                name: "Rust",
                mime: "text/x-rustsrc",
                mode: "rust",
                ext: ["rs"],
              },
              { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] },
              {
                name: "Sass",
                mime: "text/x-sass",
                mode: "sass",
                ext: ["sass"],
              },
              {
                name: "Scala",
                mime: "text/x-scala",
                mode: "clike",
                ext: ["scala"],
              },
              {
                name: "Scheme",
                mime: "text/x-scheme",
                mode: "scheme",
                ext: ["scm", "ss"],
              },
              { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] },
              {
                name: "Shell",
                mimes: ["text/x-sh", "application/x-sh"],
                mode: "shell",
                ext: ["sh", "ksh", "bash"],
                alias: ["bash", "sh", "zsh"],
                file: /^PKGBUILD$/,
              },
              {
                name: "Sieve",
                mime: "application/sieve",
                mode: "sieve",
                ext: ["siv", "sieve"],
              },
              {
                name: "Slim",
                mimes: ["text/x-slim", "application/x-slim"],
                mode: "slim",
                ext: ["slim"],
              },
              {
                name: "Smalltalk",
                mime: "text/x-stsrc",
                mode: "smalltalk",
                ext: ["st"],
              },
              {
                name: "Smarty",
                mime: "text/x-smarty",
                mode: "smarty",
                ext: ["tpl"],
              },
              { name: "Solr", mime: "text/x-solr", mode: "solr" },
              {
                name: "SML",
                mime: "text/x-sml",
                mode: "mllike",
                ext: ["sml", "sig", "fun", "smackspec"],
              },
              {
                name: "Soy",
                mime: "text/x-soy",
                mode: "soy",
                ext: ["soy"],
                alias: ["closure template"],
              },
              {
                name: "SPARQL",
                mime: "application/sparql-query",
                mode: "sparql",
                ext: ["rq", "sparql"],
                alias: ["sparul"],
              },
              {
                name: "Spreadsheet",
                mime: "text/x-spreadsheet",
                mode: "spreadsheet",
                alias: ["excel", "formula"],
              },
              { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] },
              { name: "SQLite", mime: "text/x-sqlite", mode: "sql" },
              {
                name: "Squirrel",
                mime: "text/x-squirrel",
                mode: "clike",
                ext: ["nut"],
              },
              {
                name: "Stylus",
                mime: "text/x-styl",
                mode: "stylus",
                ext: ["styl"],
              },
              {
                name: "Swift",
                mime: "text/x-swift",
                mode: "swift",
                ext: ["swift"],
              },
              { name: "sTeX", mime: "text/x-stex", mode: "stex" },
              {
                name: "LaTeX",
                mime: "text/x-latex",
                mode: "stex",
                ext: ["text", "ltx", "tex"],
                alias: ["tex"],
              },
              {
                name: "SystemVerilog",
                mime: "text/x-systemverilog",
                mode: "verilog",
                ext: ["v", "sv", "svh"],
              },
              { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] },
              {
                name: "Textile",
                mime: "text/x-textile",
                mode: "textile",
                ext: ["textile"],
              },
              {
                name: "TiddlyWiki",
                mime: "text/x-tiddlywiki",
                mode: "tiddlywiki",
              },
              { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" },
              {
                name: "TOML",
                mime: "text/x-toml",
                mode: "toml",
                ext: ["toml"],
              },
              { name: "Tornado", mime: "text/x-tornado", mode: "tornado" },
              {
                name: "troff",
                mime: "text/troff",
                mode: "troff",
                ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              },
              {
                name: "TTCN",
                mime: "text/x-ttcn",
                mode: "ttcn",
                ext: ["ttcn", "ttcn3", "ttcnpp"],
              },
              {
                name: "TTCN_CFG",
                mime: "text/x-ttcn-cfg",
                mode: "ttcn-cfg",
                ext: ["cfg"],
              },
              {
                name: "Turtle",
                mime: "text/turtle",
                mode: "turtle",
                ext: ["ttl"],
              },
              {
                name: "TypeScript",
                mime: "application/typescript",
                mode: "javascript",
                ext: ["ts"],
                alias: ["ts"],
              },
              {
                name: "TypeScript-JSX",
                mime: "text/typescript-jsx",
                mode: "jsx",
                ext: ["tsx"],
                alias: ["tsx"],
              },
              { name: "Twig", mime: "text/x-twig", mode: "twig" },
              {
                name: "Web IDL",
                mime: "text/x-webidl",
                mode: "webidl",
                ext: ["webidl"],
              },
              { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] },
              {
                name: "VBScript",
                mime: "text/vbscript",
                mode: "vbscript",
                ext: ["vbs"],
              },
              {
                name: "Velocity",
                mime: "text/velocity",
                mode: "velocity",
                ext: ["vtl"],
              },
              {
                name: "Verilog",
                mime: "text/x-verilog",
                mode: "verilog",
                ext: ["v"],
              },
              {
                name: "VHDL",
                mime: "text/x-vhdl",
                mode: "vhdl",
                ext: ["vhd", "vhdl"],
              },
              {
                name: "Vue.js Component",
                mimes: ["script/x-vue", "text/x-vue"],
                mode: "vue",
                ext: ["vue"],
              },
              {
                name: "XML",
                mimes: ["application/xml", "text/xml"],
                mode: "xml",
                ext: ["xml", "xsl", "xsd", "svg"],
                alias: ["rss", "wsdl", "xsd"],
              },
              {
                name: "XQuery",
                mime: "application/xquery",
                mode: "xquery",
                ext: ["xy", "xquery"],
              },
              {
                name: "Yacas",
                mime: "text/x-yacas",
                mode: "yacas",
                ext: ["ys"],
              },
              {
                name: "YAML",
                mimes: ["text/x-yaml", "text/yaml"],
                mode: "yaml",
                ext: ["yaml", "yml"],
                alias: ["yml"],
              },
              { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] },
              {
                name: "mscgen",
                mime: "text/x-mscgen",
                mode: "mscgen",
                ext: ["mscgen", "mscin", "msc"],
              },
              { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] },
              {
                name: "msgenny",
                mime: "text/x-msgenny",
                mode: "mscgen",
                ext: ["msgenny"],
              },
              {
                name: "WebAssembly",
                mime: "text/webassembly",
                mode: "wast",
                ext: ["wat", "wast"],
              },
            ];
            for (var t = 0; t < e.modeInfo.length; t++) {
              var n = e.modeInfo[t];
              n.mimes && (n.mime = n.mimes[0]);
            }
            (e.findModeByMIME = function (t) {
              t = t.toLowerCase();
              for (var n = 0; n < e.modeInfo.length; n++) {
                var i = e.modeInfo[n];
                if (i.mime == t) return i;
                if (i.mimes)
                  for (var r = 0; r < i.mimes.length; r++)
                    if (i.mimes[r] == t) return i;
              }
              return /\+xml$/.test(t)
                ? e.findModeByMIME("application/xml")
                : /\+json$/.test(t)
                ? e.findModeByMIME("application/json")
                : void 0;
            }),
              (e.findModeByExtension = function (t) {
                t = t.toLowerCase();
                for (var n = 0; n < e.modeInfo.length; n++) {
                  var i = e.modeInfo[n];
                  if (i.ext)
                    for (var r = 0; r < i.ext.length; r++)
                      if (i.ext[r] == t) return i;
                }
              }),
              (e.findModeByFileName = function (t) {
                for (var n = 0; n < e.modeInfo.length; n++) {
                  var i = e.modeInfo[n];
                  if (i.file && i.file.test(t)) return i;
                }
                var r = t.lastIndexOf("."),
                  o = r > -1 && t.substring(r + 1, t.length);
                if (o) return e.findModeByExtension(o);
              }),
              (e.findModeByName = function (t) {
                t = t.toLowerCase();
                for (var n = 0; n < e.modeInfo.length; n++) {
                  var i = e.modeInfo[n];
                  if (i.name.toLowerCase() == t) return i;
                  if (i.alias)
                    for (var r = 0; r < i.alias.length; r++)
                      if (i.alias[r].toLowerCase() == t) return i;
                }
              });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../lib/codemirror")
              : CodeMirror
          );
        },
        { "../lib/codemirror": 10 },
      ],
      14: [
        function (e, t, n) {
          (function (e) {
            "use strict";
            var t = {
                autoSelfClosers: {
                  area: !0,
                  base: !0,
                  br: !0,
                  col: !0,
                  command: !0,
                  embed: !0,
                  frame: !0,
                  hr: !0,
                  img: !0,
                  input: !0,
                  keygen: !0,
                  link: !0,
                  meta: !0,
                  param: !0,
                  source: !0,
                  track: !0,
                  wbr: !0,
                  menuitem: !0,
                },
                implicitlyClosed: {
                  dd: !0,
                  li: !0,
                  optgroup: !0,
                  option: !0,
                  p: !0,
                  rp: !0,
                  rt: !0,
                  tbody: !0,
                  td: !0,
                  tfoot: !0,
                  th: !0,
                  tr: !0,
                },
                contextGrabbers: {
                  dd: { dd: !0, dt: !0 },
                  dt: { dd: !0, dt: !0 },
                  li: { li: !0 },
                  option: { option: !0, optgroup: !0 },
                  optgroup: { optgroup: !0 },
                  p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0,
                  },
                  rp: { rp: !0, rt: !0 },
                  rt: { rp: !0, rt: !0 },
                  tbody: { tbody: !0, tfoot: !0 },
                  td: { td: !0, th: !0 },
                  tfoot: { tbody: !0 },
                  th: { td: !0, th: !0 },
                  thead: { tbody: !0, tfoot: !0 },
                  tr: { tr: !0 },
                },
                doNotIndent: { pre: !0 },
                allowUnquoted: !0,
                allowMissing: !0,
                caseFold: !0,
              },
              n = {
                autoSelfClosers: {},
                implicitlyClosed: {},
                contextGrabbers: {},
                doNotIndent: {},
                allowUnquoted: !1,
                allowMissing: !1,
                allowMissingTagName: !1,
                caseFold: !1,
              };
            e.defineMode("xml", function (i, r) {
              var o,
                a,
                l = i.indentUnit,
                s = {},
                u = r.htmlMode ? t : n;
              for (var c in u) s[c] = u[c];
              for (var c in r) s[c] = r[c];
              function d(e, t) {
                function n(n) {
                  return (t.tokenize = n), n(e, t);
                }
                var i = e.next();
                return "<" == i
                  ? e.eat("!")
                    ? e.eat("[")
                      ? e.match("CDATA[")
                        ? n(f("atom", "]]>"))
                        : null
                      : e.match("--")
                      ? n(f("comment", "--\x3e"))
                      : e.match("DOCTYPE", !0, !0)
                      ? (e.eatWhile(/[\w\._\-]/), n(p(1)))
                      : null
                    : e.eat("?")
                    ? (e.eatWhile(/[\w\._\-]/),
                      (t.tokenize = f("meta", "?>")),
                      "meta")
                    : ((o = e.eat("/") ? "closeTag" : "openTag"),
                      (t.tokenize = h),
                      "tag bracket")
                  : "&" == i
                  ? (
                      e.eat("#")
                        ? e.eat("x")
                          ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";")
                          : e.eatWhile(/[\d]/) && e.eat(";")
                        : e.eatWhile(/[\w\.\-:]/) && e.eat(";")
                    )
                    ? "atom"
                    : "error"
                  : (e.eatWhile(/[^&<]/), null);
              }
              function h(e, t) {
                var n,
                  i,
                  r = e.next();
                if (">" == r || ("/" == r && e.eat(">")))
                  return (
                    (t.tokenize = d),
                    (o = ">" == r ? "endTag" : "selfcloseTag"),
                    "tag bracket"
                  );
                if ("=" == r) return (o = "equals"), null;
                if ("<" == r) {
                  (t.tokenize = d),
                    (t.state = y),
                    (t.tagName = t.tagStart = null);
                  var a = t.tokenize(e, t);
                  return a ? a + " tag error" : "tag error";
                }
                return /[\'\"]/.test(r)
                  ? ((t.tokenize =
                      ((n = r),
                      (i = function (e, t) {
                        for (; !e.eol(); )
                          if (e.next() == n) {
                            t.tokenize = h;
                            break;
                          }
                        return "string";
                      }),
                      (i.isInAttribute = !0),
                      i)),
                    (t.stringStartCol = e.column()),
                    t.tokenize(e, t))
                  : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
                    "word");
              }
              function f(e, t) {
                return function (n, i) {
                  for (; !n.eol(); ) {
                    if (n.match(t)) {
                      i.tokenize = d;
                      break;
                    }
                    n.next();
                  }
                  return e;
                };
              }
              function p(e) {
                return function (t, n) {
                  for (var i; null != (i = t.next()); ) {
                    if ("<" == i)
                      return (n.tokenize = p(e + 1)), n.tokenize(t, n);
                    if (">" == i) {
                      if (1 == e) {
                        n.tokenize = d;
                        break;
                      }
                      return (n.tokenize = p(e - 1)), n.tokenize(t, n);
                    }
                  }
                  return "meta";
                };
              }
              function m(e) {
                return e && e.toLowerCase();
              }
              function g(e, t, n) {
                (this.prev = e.context),
                  (this.tagName = t || ""),
                  (this.indent = e.indented),
                  (this.startOfLine = n),
                  (s.doNotIndent.hasOwnProperty(t) ||
                    (e.context && e.context.noIndent)) &&
                    (this.noIndent = !0);
              }
              function v(e) {
                e.context && (e.context = e.context.prev);
              }
              function x(e, t) {
                for (var n; ; ) {
                  if (!e.context) return;
                  if (
                    ((n = e.context.tagName),
                    !s.contextGrabbers.hasOwnProperty(m(n)) ||
                      !s.contextGrabbers[m(n)].hasOwnProperty(m(t)))
                  )
                    return;
                  v(e);
                }
              }
              function y(e, t, n) {
                return "openTag" == e
                  ? ((n.tagStart = t.column()), b)
                  : "closeTag" == e
                  ? D
                  : y;
              }
              function b(e, t, n) {
                return "word" == e
                  ? ((n.tagName = t.current()), (a = "tag"), k)
                  : s.allowMissingTagName && "endTag" == e
                  ? ((a = "tag bracket"), k(e, 0, n))
                  : ((a = "error"), b);
              }
              function D(e, t, n) {
                if ("word" == e) {
                  var i = t.current();
                  return (
                    n.context &&
                      n.context.tagName != i &&
                      s.implicitlyClosed.hasOwnProperty(m(n.context.tagName)) &&
                      v(n),
                    (n.context && n.context.tagName == i) ||
                    !1 === s.matchClosing
                      ? ((a = "tag"), C)
                      : ((a = "tag error"), w)
                  );
                }
                return s.allowMissingTagName && "endTag" == e
                  ? ((a = "tag bracket"), C(e, 0, n))
                  : ((a = "error"), w);
              }
              function C(e, t, n) {
                return "endTag" != e ? ((a = "error"), C) : (v(n), y);
              }
              function w(e, t, n) {
                return (a = "error"), C(e, 0, n);
              }
              function k(e, t, n) {
                if ("word" == e) return (a = "attribute"), S;
                if ("endTag" == e || "selfcloseTag" == e) {
                  var i = n.tagName,
                    r = n.tagStart;
                  return (
                    (n.tagName = n.tagStart = null),
                    "selfcloseTag" == e ||
                    s.autoSelfClosers.hasOwnProperty(m(i))
                      ? x(n, i)
                      : (x(n, i), (n.context = new g(n, i, r == n.indented))),
                    y
                  );
                }
                return (a = "error"), k;
              }
              function S(e, t, n) {
                return "equals" == e
                  ? F
                  : (s.allowMissing || (a = "error"), k(e, 0, n));
              }
              function F(e, t, n) {
                return "string" == e
                  ? A
                  : "word" == e && s.allowUnquoted
                  ? ((a = "string"), k)
                  : ((a = "error"), k(e, 0, n));
              }
              function A(e, t, n) {
                return "string" == e ? A : k(e, 0, n);
              }
              return (
                (d.isInText = !0),
                {
                  startState: function (e) {
                    var t = {
                      tokenize: d,
                      state: y,
                      indented: e || 0,
                      tagName: null,
                      tagStart: null,
                      context: null,
                    };
                    return null != e && (t.baseIndent = e), t;
                  },
                  token: function (e, t) {
                    if (
                      (!t.tagName && e.sol() && (t.indented = e.indentation()),
                      e.eatSpace())
                    )
                      return null;
                    o = null;
                    var n = t.tokenize(e, t);
                    return (
                      (n || o) &&
                        "comment" != n &&
                        ((a = null),
                        (t.state = t.state(o || n, e, t)),
                        a && (n = "error" == a ? n + " error" : a)),
                      n
                    );
                  },
                  indent: function (t, n, i) {
                    var r = t.context;
                    if (t.tokenize.isInAttribute)
                      return t.tagStart == t.indented
                        ? t.stringStartCol + 1
                        : t.indented + l;
                    if (r && r.noIndent) return e.Pass;
                    if (t.tokenize != h && t.tokenize != d)
                      return i ? i.match(/^(\s*)/)[0].length : 0;
                    if (t.tagName)
                      return !1 !== s.multilineTagIndentPastTag
                        ? t.tagStart + t.tagName.length + 2
                        : t.tagStart + l * (s.multilineTagIndentFactor || 1);
                    if (s.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
                    var o = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                    if (o && o[1])
                      for (; r; ) {
                        if (r.tagName == o[2]) {
                          r = r.prev;
                          break;
                        }
                        if (!s.implicitlyClosed.hasOwnProperty(m(r.tagName)))
                          break;
                        r = r.prev;
                      }
                    else if (o)
                      for (; r; ) {
                        var a = s.contextGrabbers[m(r.tagName)];
                        if (!a || !a.hasOwnProperty(m(o[2]))) break;
                        r = r.prev;
                      }
                    for (; r && r.prev && !r.startOfLine; ) r = r.prev;
                    return r ? r.indent + l : t.baseIndent || 0;
                  },
                  electricInput: /<\/[\s\w:]+>$/,
                  blockCommentStart: "\x3c!--",
                  blockCommentEnd: "--\x3e",
                  configuration: s.htmlMode ? "html" : "xml",
                  helperType: s.htmlMode ? "html" : "xml",
                  skipAttribute: function (e) {
                    e.state == F && (e.state = k);
                  },
                  xmlCurrentTag: function (e) {
                    return e.tagName
                      ? { name: e.tagName, close: "closeTag" == e.type }
                      : null;
                  },
                  xmlCurrentContext: function (e) {
                    for (var t = [], n = e.context; n; n = n.prev)
                      t.push(n.tagName);
                    return t.reverse();
                  },
                }
              );
            }),
              e.defineMIME("text/xml", "xml"),
              e.defineMIME("application/xml", "xml"),
              e.mimeModes.hasOwnProperty("text/html") ||
                e.defineMIME("text/html", { name: "xml", htmlMode: !0 });
          })(
            "object" == typeof n && "object" == typeof t
              ? e("../../lib/codemirror")
              : CodeMirror
          );
        },
        { "../../lib/codemirror": 10 },
      ],
      15: [
        function (e, t, n) {
          !(function (e, i) {
            "object" == typeof n && void 0 !== t
              ? i(n)
              : i(
                  ((e =
                    "undefined" != typeof globalThis
                      ? globalThis
                      : e || self).marked = {})
                );
          })(this, function (e) {
            "use strict";
            function t(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  "value" in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i);
              }
            }
            function n(e, t) {
              (null == t || t > e.length) && (t = e.length);
              for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
              return i;
            }
            function i(e, t) {
              var i =
                ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
              if (i) return (i = i.call(e)).next.bind(i);
              if (
                Array.isArray(e) ||
                (i = (function (e, t) {
                  if (e) {
                    if ("string" == typeof e) return n(e, t);
                    var i = Object.prototype.toString.call(e).slice(8, -1);
                    return (
                      "Object" === i &&
                        e.constructor &&
                        (i = e.constructor.name),
                      "Map" === i || "Set" === i
                        ? Array.from(e)
                        : "Arguments" === i ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                        ? n(e, t)
                        : void 0
                    );
                  }
                })(e)) ||
                (t && e && "number" == typeof e.length)
              ) {
                i && (e = i);
                var r = 0;
                return function () {
                  return r >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[r++] };
                };
              }
              throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            }
            function r() {
              return {
                async: !1,
                baseUrl: null,
                breaks: !1,
                extensions: null,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: null,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartLists: !1,
                smartypants: !1,
                tokenizer: null,
                walkTokens: null,
                xhtml: !1,
              };
            }
            e.defaults = {
              async: !1,
              baseUrl: null,
              breaks: !1,
              extensions: null,
              gfm: !0,
              headerIds: !0,
              headerPrefix: "",
              highlight: null,
              langPrefix: "language-",
              mangle: !0,
              pedantic: !1,
              renderer: null,
              sanitize: !1,
              sanitizer: null,
              silent: !1,
              smartLists: !1,
              smartypants: !1,
              tokenizer: null,
              walkTokens: null,
              xhtml: !1,
            };
            var o = /[&<>"']/,
              a = /[&<>"']/g,
              l = /[<>"']|&(?!#?\w+;)/,
              s = /[<>"']|&(?!#?\w+;)/g,
              u = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
              },
              c = function (e) {
                return u[e];
              };
            function d(e, t) {
              if (t) {
                if (o.test(e)) return e.replace(a, c);
              } else if (l.test(e)) return e.replace(s, c);
              return e;
            }
            var h = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
            function f(e) {
              return e.replace(h, function (e, t) {
                return "colon" === (t = t.toLowerCase())
                  ? ":"
                  : "#" === t.charAt(0)
                  ? "x" === t.charAt(1)
                    ? String.fromCharCode(parseInt(t.substring(2), 16))
                    : String.fromCharCode(+t.substring(1))
                  : "";
              });
            }
            var p = /(^|[^\[])\^/g;
            function m(e, t) {
              (e = "string" == typeof e ? e : e.source), (t = t || "");
              var n = {
                replace: function (t, i) {
                  return (
                    (i = (i = i.source || i).replace(p, "$1")),
                    (e = e.replace(t, i)),
                    n
                  );
                },
                getRegex: function () {
                  return new RegExp(e, t);
                },
              };
              return n;
            }
            var g = /[^\w:]/g,
              v = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
            function x(e, t, n) {
              if (e) {
                var i;
                try {
                  i = decodeURIComponent(f(n)).replace(g, "").toLowerCase();
                } catch (e) {
                  return null;
                }
                if (
                  0 === i.indexOf("javascript:") ||
                  0 === i.indexOf("vbscript:") ||
                  0 === i.indexOf("data:")
                )
                  return null;
              }
              t &&
                !v.test(n) &&
                (n = (function (e, t) {
                  y[" " + e] ||
                    (b.test(e)
                      ? (y[" " + e] = e + "/")
                      : (y[" " + e] = F(e, "/", !0)));
                  var n = -1 === (e = y[" " + e]).indexOf(":");
                  return "//" === t.substring(0, 2)
                    ? n
                      ? t
                      : e.replace(D, "$1") + t
                    : "/" === t.charAt(0)
                    ? n
                      ? t
                      : e.replace(C, "$1") + t
                    : e + t;
                })(t, n));
              try {
                n = encodeURI(n).replace(/%25/g, "%");
              } catch (e) {
                return null;
              }
              return n;
            }
            var y = {},
              b = /^[^:]+:\/*[^/]*$/,
              D = /^([^:]+:)[\s\S]*$/,
              C = /^([^:]+:\/*[^/]*)[\s\S]*$/;
            var w = { exec: function () {} };
            function k(e) {
              for (var t, n, i = 1; i < arguments.length; i++)
                for (n in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }
            function S(e, t) {
              var n = e
                  .replace(/\|/g, function (e, t, n) {
                    for (var i = !1, r = t; --r >= 0 && "\\" === n[r]; ) i = !i;
                    return i ? "|" : " |";
                  })
                  .split(/ \|/),
                i = 0;
              if (
                (n[0].trim() || n.shift(),
                n.length > 0 && !n[n.length - 1].trim() && n.pop(),
                n.length > t)
              )
                n.splice(t);
              else for (; n.length < t; ) n.push("");
              for (; i < n.length; i++)
                n[i] = n[i].trim().replace(/\\\|/g, "|");
              return n;
            }
            function F(e, t, n) {
              var i = e.length;
              if (0 === i) return "";
              for (var r = 0; r < i; ) {
                var o = e.charAt(i - r - 1);
                if (o !== t || n) {
                  if (o === t || !n) break;
                  r++;
                } else r++;
              }
              return e.slice(0, i - r);
            }
            function A(e) {
              e &&
                e.sanitize &&
                !e.silent &&
                console.warn(
                  "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
                );
            }
            function E(e, t) {
              if (t < 1) return "";
              for (var n = ""; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e);
              return n + e;
            }
            function L(e, t, n, i) {
              var r = t.href,
                o = t.title ? d(t.title) : null,
                a = e[1].replace(/\\([\[\]])/g, "$1");
              if ("!" !== e[0].charAt(0)) {
                i.state.inLink = !0;
                var l = {
                  type: "link",
                  raw: n,
                  href: r,
                  title: o,
                  text: a,
                  tokens: i.inlineTokens(a),
                };
                return (i.state.inLink = !1), l;
              }
              return { type: "image", raw: n, href: r, title: o, text: d(a) };
            }
            var T = (function () {
                function t(t) {
                  this.options = t || e.defaults;
                }
                var n = t.prototype;
                return (
                  (n.space = function (e) {
                    var t = this.rules.block.newline.exec(e);
                    if (t && t[0].length > 0)
                      return { type: "space", raw: t[0] };
                  }),
                  (n.code = function (e) {
                    var t = this.rules.block.code.exec(e);
                    if (t) {
                      var n = t[0].replace(/^ {1,4}/gm, "");
                      return {
                        type: "code",
                        raw: t[0],
                        codeBlockStyle: "indented",
                        text: this.options.pedantic ? n : F(n, "\n"),
                      };
                    }
                  }),
                  (n.fences = function (e) {
                    var t = this.rules.block.fences.exec(e);
                    if (t) {
                      var n = t[0],
                        i = (function (e, t) {
                          var n = e.match(/^(\s+)(?:```)/);
                          if (null === n) return t;
                          var i = n[1];
                          return t
                            .split("\n")
                            .map(function (e) {
                              var t = e.match(/^\s+/);
                              return null === t
                                ? e
                                : t[0].length >= i.length
                                ? e.slice(i.length)
                                : e;
                            })
                            .join("\n");
                        })(n, t[3] || "");
                      return {
                        type: "code",
                        raw: n,
                        lang: t[2] ? t[2].trim() : t[2],
                        text: i,
                      };
                    }
                  }),
                  (n.heading = function (e) {
                    var t = this.rules.block.heading.exec(e);
                    if (t) {
                      var n = t[2].trim();
                      if (/#$/.test(n)) {
                        var i = F(n, "#");
                        this.options.pedantic
                          ? (n = i.trim())
                          : (i && !/ $/.test(i)) || (n = i.trim());
                      }
                      return {
                        type: "heading",
                        raw: t[0],
                        depth: t[1].length,
                        text: n,
                        tokens: this.lexer.inline(n),
                      };
                    }
                  }),
                  (n.hr = function (e) {
                    var t = this.rules.block.hr.exec(e);
                    if (t) return { type: "hr", raw: t[0] };
                  }),
                  (n.blockquote = function (e) {
                    var t = this.rules.block.blockquote.exec(e);
                    if (t) {
                      var n = t[0].replace(/^ *>[ \t]?/gm, "");
                      return {
                        type: "blockquote",
                        raw: t[0],
                        tokens: this.lexer.blockTokens(n, []),
                        text: n,
                      };
                    }
                  }),
                  (n.list = function (e) {
                    var t = this.rules.block.list.exec(e);
                    if (t) {
                      var n,
                        r,
                        o,
                        a,
                        l,
                        s,
                        u,
                        c,
                        d,
                        h,
                        f,
                        p,
                        m = t[1].trim(),
                        g = m.length > 1,
                        v = {
                          type: "list",
                          raw: "",
                          ordered: g,
                          start: g ? +m.slice(0, -1) : "",
                          loose: !1,
                          items: [],
                        };
                      (m = g ? "\\d{1,9}\\" + m.slice(-1) : "\\" + m),
                        this.options.pedantic && (m = g ? m : "[*+-]");
                      for (
                        var x = new RegExp(
                          "^( {0,3}" + m + ")((?:[\t ][^\\n]*)?(?:\\n|$))"
                        );
                        e &&
                        ((p = !1), (t = x.exec(e))) &&
                        !this.rules.block.hr.test(e);

                      ) {
                        if (
                          ((n = t[0]),
                          (e = e.substring(n.length)),
                          (c = t[2].split("\n", 1)[0]),
                          (d = e.split("\n", 1)[0]),
                          this.options.pedantic
                            ? ((a = 2), (f = c.trimLeft()))
                            : ((a = (a = t[2].search(/[^ ]/)) > 4 ? 1 : a),
                              (f = c.slice(a)),
                              (a += t[1].length)),
                          (s = !1),
                          !c &&
                            /^ *$/.test(d) &&
                            ((n += d + "\n"),
                            (e = e.substring(d.length + 1)),
                            (p = !0)),
                          !p)
                        )
                          for (
                            var y = new RegExp(
                                "^ {0," +
                                  Math.min(3, a - 1) +
                                  "}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))"
                              ),
                              b = new RegExp(
                                "^ {0," +
                                  Math.min(3, a - 1) +
                                  "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"
                              ),
                              D = new RegExp(
                                "^ {0," + Math.min(3, a - 1) + "}(?:```|~~~)"
                              ),
                              C = new RegExp(
                                "^ {0," + Math.min(3, a - 1) + "}#"
                              );
                            e &&
                            ((c = h = e.split("\n", 1)[0]),
                            this.options.pedantic &&
                              (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                            !D.test(c)) &&
                            !C.test(c) &&
                            !y.test(c) &&
                            !b.test(e);

                          ) {
                            if (c.search(/[^ ]/) >= a || !c.trim())
                              f += "\n" + c.slice(a);
                            else {
                              if (s) break;
                              f += "\n" + c;
                            }
                            s || c.trim() || (s = !0),
                              (n += h + "\n"),
                              (e = e.substring(h.length + 1));
                          }
                        v.loose ||
                          (u
                            ? (v.loose = !0)
                            : /\n *\n *$/.test(n) && (u = !0)),
                          this.options.gfm &&
                            (r = /^\[[ xX]\] /.exec(f)) &&
                            ((o = "[ ] " !== r[0]),
                            (f = f.replace(/^\[[ xX]\] +/, ""))),
                          v.items.push({
                            type: "list_item",
                            raw: n,
                            task: !!r,
                            checked: o,
                            loose: !1,
                            text: f,
                          }),
                          (v.raw += n);
                      }
                      (v.items[v.items.length - 1].raw = n.trimRight()),
                        (v.items[v.items.length - 1].text = f.trimRight()),
                        (v.raw = v.raw.trimRight());
                      var w = v.items.length;
                      for (l = 0; l < w; l++) {
                        (this.lexer.state.top = !1),
                          (v.items[l].tokens = this.lexer.blockTokens(
                            v.items[l].text,
                            []
                          ));
                        var k = v.items[l].tokens.filter(function (e) {
                            return "space" === e.type;
                          }),
                          S = k.every(function (e) {
                            for (
                              var t, n = 0, r = i(e.raw.split(""));
                              !(t = r()).done;

                            ) {
                              if (("\n" === t.value && (n += 1), n > 1))
                                return !0;
                            }
                            return !1;
                          });
                        !v.loose &&
                          k.length &&
                          S &&
                          ((v.loose = !0), (v.items[l].loose = !0));
                      }
                      return v;
                    }
                  }),
                  (n.html = function (e) {
                    var t = this.rules.block.html.exec(e);
                    if (t) {
                      var n = {
                        type: "html",
                        raw: t[0],
                        pre:
                          !this.options.sanitizer &&
                          ("pre" === t[1] ||
                            "script" === t[1] ||
                            "style" === t[1]),
                        text: t[0],
                      };
                      if (this.options.sanitize) {
                        var i = this.options.sanitizer
                          ? this.options.sanitizer(t[0])
                          : d(t[0]);
                        (n.type = "paragraph"),
                          (n.text = i),
                          (n.tokens = this.lexer.inline(i));
                      }
                      return n;
                    }
                  }),
                  (n.def = function (e) {
                    var t = this.rules.block.def.exec(e);
                    if (t)
                      return (
                        t[3] && (t[3] = t[3].substring(1, t[3].length - 1)),
                        {
                          type: "def",
                          tag: t[1].toLowerCase().replace(/\s+/g, " "),
                          raw: t[0],
                          href: t[2],
                          title: t[3],
                        }
                      );
                  }),
                  (n.table = function (e) {
                    var t = this.rules.block.table.exec(e);
                    if (t) {
                      var n = {
                        type: "table",
                        header: S(t[1]).map(function (e) {
                          return { text: e };
                        }),
                        align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        rows:
                          t[3] && t[3].trim()
                            ? t[3].replace(/\n[ \t]*$/, "").split("\n")
                            : [],
                      };
                      if (n.header.length === n.align.length) {
                        n.raw = t[0];
                        var i,
                          r,
                          o,
                          a,
                          l = n.align.length;
                        for (i = 0; i < l; i++)
                          /^ *-+: *$/.test(n.align[i])
                            ? (n.align[i] = "right")
                            : /^ *:-+: *$/.test(n.align[i])
                            ? (n.align[i] = "center")
                            : /^ *:-+ *$/.test(n.align[i])
                            ? (n.align[i] = "left")
                            : (n.align[i] = null);
                        for (l = n.rows.length, i = 0; i < l; i++)
                          n.rows[i] = S(n.rows[i], n.header.length).map(
                            function (e) {
                              return { text: e };
                            }
                          );
                        for (l = n.header.length, r = 0; r < l; r++)
                          n.header[r].tokens = this.lexer.inline(
                            n.header[r].text
                          );
                        for (l = n.rows.length, r = 0; r < l; r++)
                          for (a = n.rows[r], o = 0; o < a.length; o++)
                            a[o].tokens = this.lexer.inline(a[o].text);
                        return n;
                      }
                    }
                  }),
                  (n.lheading = function (e) {
                    var t = this.rules.block.lheading.exec(e);
                    if (t)
                      return {
                        type: "heading",
                        raw: t[0],
                        depth: "=" === t[2].charAt(0) ? 1 : 2,
                        text: t[1],
                        tokens: this.lexer.inline(t[1]),
                      };
                  }),
                  (n.paragraph = function (e) {
                    var t = this.rules.block.paragraph.exec(e);
                    if (t) {
                      var n =
                        "\n" === t[1].charAt(t[1].length - 1)
                          ? t[1].slice(0, -1)
                          : t[1];
                      return {
                        type: "paragraph",
                        raw: t[0],
                        text: n,
                        tokens: this.lexer.inline(n),
                      };
                    }
                  }),
                  (n.text = function (e) {
                    var t = this.rules.block.text.exec(e);
                    if (t)
                      return {
                        type: "text",
                        raw: t[0],
                        text: t[0],
                        tokens: this.lexer.inline(t[0]),
                      };
                  }),
                  (n.escape = function (e) {
                    var t = this.rules.inline.escape.exec(e);
                    if (t) return { type: "escape", raw: t[0], text: d(t[1]) };
                  }),
                  (n.tag = function (e) {
                    var t = this.rules.inline.tag.exec(e);
                    if (t)
                      return (
                        !this.lexer.state.inLink && /^<a /i.test(t[0])
                          ? (this.lexer.state.inLink = !0)
                          : this.lexer.state.inLink &&
                            /^<\/a>/i.test(t[0]) &&
                            (this.lexer.state.inLink = !1),
                        !this.lexer.state.inRawBlock &&
                        /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
                          ? (this.lexer.state.inRawBlock = !0)
                          : this.lexer.state.inRawBlock &&
                            /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
                            (this.lexer.state.inRawBlock = !1),
                        {
                          type: this.options.sanitize ? "text" : "html",
                          raw: t[0],
                          inLink: this.lexer.state.inLink,
                          inRawBlock: this.lexer.state.inRawBlock,
                          text: this.options.sanitize
                            ? this.options.sanitizer
                              ? this.options.sanitizer(t[0])
                              : d(t[0])
                            : t[0],
                        }
                      );
                  }),
                  (n.link = function (e) {
                    var t = this.rules.inline.link.exec(e);
                    if (t) {
                      var n = t[2].trim();
                      if (!this.options.pedantic && /^</.test(n)) {
                        if (!/>$/.test(n)) return;
                        var i = F(n.slice(0, -1), "\\");
                        if ((n.length - i.length) % 2 == 0) return;
                      } else {
                        var r = (function (e, t) {
                          if (-1 === e.indexOf(t[1])) return -1;
                          for (var n = e.length, i = 0, r = 0; r < n; r++)
                            if ("\\" === e[r]) r++;
                            else if (e[r] === t[0]) i++;
                            else if (e[r] === t[1] && --i < 0) return r;
                          return -1;
                        })(t[2], "()");
                        if (r > -1) {
                          var o =
                            (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + r;
                          (t[2] = t[2].substring(0, r)),
                            (t[0] = t[0].substring(0, o).trim()),
                            (t[3] = "");
                        }
                      }
                      var a = t[2],
                        l = "";
                      if (this.options.pedantic) {
                        var s = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(a);
                        s && ((a = s[1]), (l = s[3]));
                      } else l = t[3] ? t[3].slice(1, -1) : "";
                      return (
                        (a = a.trim()),
                        /^</.test(a) &&
                          (a =
                            this.options.pedantic && !/>$/.test(n)
                              ? a.slice(1)
                              : a.slice(1, -1)),
                        L(
                          t,
                          {
                            href: a
                              ? a.replace(this.rules.inline._escapes, "$1")
                              : a,
                            title: l
                              ? l.replace(this.rules.inline._escapes, "$1")
                              : l,
                          },
                          t[0],
                          this.lexer
                        )
                      );
                    }
                  }),
                  (n.reflink = function (e, t) {
                    var n;
                    if (
                      (n = this.rules.inline.reflink.exec(e)) ||
                      (n = this.rules.inline.nolink.exec(e))
                    ) {
                      var i = (n[2] || n[1]).replace(/\s+/g, " ");
                      if (!(i = t[i.toLowerCase()]) || !i.href) {
                        var r = n[0].charAt(0);
                        return { type: "text", raw: r, text: r };
                      }
                      return L(n, i, n[0], this.lexer);
                    }
                  }),
                  (n.emStrong = function (e, t, n) {
                    void 0 === n && (n = "");
                    var i = this.rules.inline.emStrong.lDelim.exec(e);
                    if (
                      i &&
                      (!i[3] ||
                        !n.match(
                          /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/
                        ))
                    ) {
                      var r = i[1] || i[2] || "";
                      if (
                        !r ||
                        (r &&
                          ("" === n || this.rules.inline.punctuation.exec(n)))
                      ) {
                        var o,
                          a,
                          l = i[0].length - 1,
                          s = l,
                          u = 0,
                          c =
                            "*" === i[0][0]
                              ? this.rules.inline.emStrong.rDelimAst
                              : this.rules.inline.emStrong.rDelimUnd;
                        for (
                          c.lastIndex = 0, t = t.slice(-1 * e.length + l);
                          null != (i = c.exec(t));

                        )
                          if (
                            (o = i[1] || i[2] || i[3] || i[4] || i[5] || i[6])
                          )
                            if (((a = o.length), i[3] || i[4])) s += a;
                            else if (
                              !((i[5] || i[6]) && l % 3) ||
                              (l + a) % 3
                            ) {
                              if (!((s -= a) > 0)) {
                                if (
                                  ((a = Math.min(a, a + s + u)),
                                  Math.min(l, a) % 2)
                                ) {
                                  var d = e.slice(1, l + i.index + a);
                                  return {
                                    type: "em",
                                    raw: e.slice(0, l + i.index + a + 1),
                                    text: d,
                                    tokens: this.lexer.inlineTokens(d),
                                  };
                                }
                                var h = e.slice(2, l + i.index + a - 1);
                                return {
                                  type: "strong",
                                  raw: e.slice(0, l + i.index + a + 1),
                                  text: h,
                                  tokens: this.lexer.inlineTokens(h),
                                };
                              }
                            } else u += a;
                      }
                    }
                  }),
                  (n.codespan = function (e) {
                    var t = this.rules.inline.code.exec(e);
                    if (t) {
                      var n = t[2].replace(/\n/g, " "),
                        i = /[^ ]/.test(n),
                        r = /^ /.test(n) && / $/.test(n);
                      return (
                        i && r && (n = n.substring(1, n.length - 1)),
                        (n = d(n, !0)),
                        { type: "codespan", raw: t[0], text: n }
                      );
                    }
                  }),
                  (n.br = function (e) {
                    var t = this.rules.inline.br.exec(e);
                    if (t) return { type: "br", raw: t[0] };
                  }),
                  (n.del = function (e) {
                    var t = this.rules.inline.del.exec(e);
                    if (t)
                      return {
                        type: "del",
                        raw: t[0],
                        text: t[2],
                        tokens: this.lexer.inlineTokens(t[2]),
                      };
                  }),
                  (n.autolink = function (e, t) {
                    var n,
                      i,
                      r = this.rules.inline.autolink.exec(e);
                    if (r)
                      return (
                        (i =
                          "@" === r[2]
                            ? "mailto:" +
                              (n = d(this.options.mangle ? t(r[1]) : r[1]))
                            : (n = d(r[1]))),
                        {
                          type: "link",
                          raw: r[0],
                          text: n,
                          href: i,
                          tokens: [{ type: "text", raw: n, text: n }],
                        }
                      );
                  }),
                  (n.url = function (e, t) {
                    var n;
                    if ((n = this.rules.inline.url.exec(e))) {
                      var i, r;
                      if ("@" === n[2])
                        r =
                          "mailto:" +
                          (i = d(this.options.mangle ? t(n[0]) : n[0]));
                      else {
                        var o;
                        do {
                          (o = n[0]),
                            (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
                        } while (o !== n[0]);
                        (i = d(n[0])),
                          (r = "www." === n[1] ? "http://" + i : i);
                      }
                      return {
                        type: "link",
                        raw: n[0],
                        text: i,
                        href: r,
                        tokens: [{ type: "text", raw: i, text: i }],
                      };
                    }
                  }),
                  (n.inlineText = function (e, t) {
                    var n,
                      i = this.rules.inline.text.exec(e);
                    if (i)
                      return (
                        (n = this.lexer.state.inRawBlock
                          ? this.options.sanitize
                            ? this.options.sanitizer
                              ? this.options.sanitizer(i[0])
                              : d(i[0])
                            : i[0]
                          : d(this.options.smartypants ? t(i[0]) : i[0])),
                        { type: "text", raw: i[0], text: n }
                      );
                  }),
                  t
                );
              })(),
              M = {
                newline: /^(?: *(?:\n|$))+/,
                code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
                fences:
                  /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
                hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
                heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
                blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
                list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
                html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
                def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
                table: w,
                lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
                _paragraph:
                  /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
                text: /^[^\n]+/,
                _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
                _title:
                  /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
              };
            (M.def = m(M.def)
              .replace("label", M._label)
              .replace("title", M._title)
              .getRegex()),
              (M.bullet = /(?:[*+-]|\d{1,9}[.)])/),
              (M.listItemStart = m(/^( *)(bull) */)
                .replace("bull", M.bullet)
                .getRegex()),
              (M.list = m(M.list)
                .replace(/bull/g, M.bullet)
                .replace(
                  "hr",
                  "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
                )
                .replace("def", "\\n+(?=" + M.def.source + ")")
                .getRegex()),
              (M._tag =
                "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
              (M._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
              (M.html = m(M.html, "i")
                .replace("comment", M._comment)
                .replace("tag", M._tag)
                .replace(
                  "attribute",
                  / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
                )
                .getRegex()),
              (M.paragraph = m(M._paragraph)
                .replace("hr", M.hr)
                .replace("heading", " {0,3}#{1,6} ")
                .replace("|lheading", "")
                .replace("|table", "")
                .replace("blockquote", " {0,3}>")
                .replace(
                  "fences",
                  " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n"
                )
                .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                .replace(
                  "html",
                  "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
                )
                .replace("tag", M._tag)
                .getRegex()),
              (M.blockquote = m(M.blockquote)
                .replace("paragraph", M.paragraph)
                .getRegex()),
              (M.normal = k({}, M)),
              (M.gfm = k({}, M.normal, {
                table:
                  "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
              })),
              (M.gfm.table = m(M.gfm.table)
                .replace("hr", M.hr)
                .replace("heading", " {0,3}#{1,6} ")
                .replace("blockquote", " {0,3}>")
                .replace("code", " {4}[^\\n]")
                .replace(
                  "fences",
                  " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n"
                )
                .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                .replace(
                  "html",
                  "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
                )
                .replace("tag", M._tag)
                .getRegex()),
              (M.gfm.paragraph = m(M._paragraph)
                .replace("hr", M.hr)
                .replace("heading", " {0,3}#{1,6} ")
                .replace("|lheading", "")
                .replace("table", M.gfm.table)
                .replace("blockquote", " {0,3}>")
                .replace(
                  "fences",
                  " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n"
                )
                .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                .replace(
                  "html",
                  "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
                )
                .replace("tag", M._tag)
                .getRegex()),
              (M.pedantic = k({}, M.normal, {
                html: m(
                  "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))"
                )
                  .replace("comment", M._comment)
                  .replace(
                    /tag/g,
                    "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
                  )
                  .getRegex(),
                def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                heading: /^(#{1,6})(.*)(?:\n+|$)/,
                fences: w,
                paragraph: m(M.normal._paragraph)
                  .replace("hr", M.hr)
                  .replace("heading", " *#{1,6} *[^\n]")
                  .replace("lheading", M.lheading)
                  .replace("blockquote", " {0,3}>")
                  .replace("|fences", "")
                  .replace("|list", "")
                  .replace("|html", "")
                  .getRegex(),
              }));
            var B = {
              escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
              autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
              url: w,
              tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
              link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
              reflink: /^!?\[(label)\]\[(ref)\]/,
              nolink: /^!?\[(ref)\](?:\[\])?/,
              reflinkSearch: "reflink|nolink(?!\\()",
              emStrong: {
                lDelim:
                  /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
                rDelimAst:
                  /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
                rDelimUnd:
                  /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
              },
              code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
              br: /^( {2,}|\\)\n(?!\s*$)/,
              del: w,
              text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
              punctuation: /^([\spunctuation])/,
            };
            function N(e) {
              return e
                .replace(/---/g, "—")
                .replace(/--/g, "–")
                .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
                .replace(/'/g, "’")
                .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
                .replace(/"/g, "”")
                .replace(/\.{3}/g, "…");
            }
            function O(e) {
              var t,
                n,
                i = "",
                r = e.length;
              for (t = 0; t < r; t++)
                (n = e.charCodeAt(t)),
                  Math.random() > 0.5 && (n = "x" + n.toString(16)),
                  (i += "&#" + n + ";");
              return i;
            }
            (B._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
              (B.punctuation = m(B.punctuation)
                .replace(/punctuation/g, B._punctuation)
                .getRegex()),
              (B.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
              (B.escapedEmSt = /\\\*|\\_/g),
              (B._comment = m(M._comment)
                .replace("(?:--\x3e|$)", "--\x3e")
                .getRegex()),
              (B.emStrong.lDelim = m(B.emStrong.lDelim)
                .replace(/punct/g, B._punctuation)
                .getRegex()),
              (B.emStrong.rDelimAst = m(B.emStrong.rDelimAst, "g")
                .replace(/punct/g, B._punctuation)
                .getRegex()),
              (B.emStrong.rDelimUnd = m(B.emStrong.rDelimUnd, "g")
                .replace(/punct/g, B._punctuation)
                .getRegex()),
              (B._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
              (B._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
              (B._email =
                /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
              (B.autolink = m(B.autolink)
                .replace("scheme", B._scheme)
                .replace("email", B._email)
                .getRegex()),
              (B._attribute =
                /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
              (B.tag = m(B.tag)
                .replace("comment", B._comment)
                .replace("attribute", B._attribute)
                .getRegex()),
              (B._label =
                /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
              (B._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
              (B._title =
                /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
              (B.link = m(B.link)
                .replace("label", B._label)
                .replace("href", B._href)
                .replace("title", B._title)
                .getRegex()),
              (B.reflink = m(B.reflink)
                .replace("label", B._label)
                .replace("ref", M._label)
                .getRegex()),
              (B.nolink = m(B.nolink).replace("ref", M._label).getRegex()),
              (B.reflinkSearch = m(B.reflinkSearch, "g")
                .replace("reflink", B.reflink)
                .replace("nolink", B.nolink)
                .getRegex()),
              (B.normal = k({}, B)),
              (B.pedantic = k({}, B.normal, {
                strong: {
                  start: /^__|\*\*/,
                  middle:
                    /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                  endAst: /\*\*(?!\*)/g,
                  endUnd: /__(?!_)/g,
                },
                em: {
                  start: /^_|\*/,
                  middle:
                    /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
                  endAst: /\*(?!\*)/g,
                  endUnd: /_(?!_)/g,
                },
                link: m(/^!?\[(label)\]\((.*?)\)/)
                  .replace("label", B._label)
                  .getRegex(),
                reflink: m(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                  .replace("label", B._label)
                  .getRegex(),
              })),
              (B.gfm = k({}, B.normal, {
                escape: m(B.escape).replace("])", "~|])").getRegex(),
                _extended_email:
                  /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                _backpedal:
                  /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
                del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
                text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
              })),
              (B.gfm.url = m(B.gfm.url, "i")
                .replace("email", B.gfm._extended_email)
                .getRegex()),
              (B.breaks = k({}, B.gfm, {
                br: m(B.br).replace("{2,}", "*").getRegex(),
                text: m(B.gfm.text)
                  .replace("\\b_", "\\b_| {2,}\\n")
                  .replace(/\{2,\}/g, "*")
                  .getRegex(),
              }));
            var I = (function () {
                function n(t) {
                  (this.tokens = []),
                    (this.tokens.links = Object.create(null)),
                    (this.options = t || e.defaults),
                    (this.options.tokenizer =
                      this.options.tokenizer || new T()),
                    (this.tokenizer = this.options.tokenizer),
                    (this.tokenizer.options = this.options),
                    (this.tokenizer.lexer = this),
                    (this.inlineQueue = []),
                    (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
                  var n = { block: M.normal, inline: B.normal };
                  this.options.pedantic
                    ? ((n.block = M.pedantic), (n.inline = B.pedantic))
                    : this.options.gfm &&
                      ((n.block = M.gfm),
                      this.options.breaks
                        ? (n.inline = B.breaks)
                        : (n.inline = B.gfm)),
                    (this.tokenizer.rules = n);
                }
                (n.lex = function (e, t) {
                  return new n(t).lex(e);
                }),
                  (n.lexInline = function (e, t) {
                    return new n(t).inlineTokens(e);
                  });
                var i,
                  r,
                  o,
                  a = n.prototype;
                return (
                  (a.lex = function (e) {
                    var t;
                    for (
                      e = e.replace(/\r\n|\r/g, "\n"),
                        this.blockTokens(e, this.tokens);
                      (t = this.inlineQueue.shift());

                    )
                      this.inlineTokens(t.src, t.tokens);
                    return this.tokens;
                  }),
                  (a.blockTokens = function (e, t) {
                    var n,
                      i,
                      r,
                      o,
                      a = this;
                    for (
                      void 0 === t && (t = []),
                        e = this.options.pedantic
                          ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "")
                          : e.replace(/^( *)(\t+)/gm, function (e, t, n) {
                              return t + "    ".repeat(n.length);
                            });
                      e;

                    )
                      if (
                        !(
                          this.options.extensions &&
                          this.options.extensions.block &&
                          this.options.extensions.block.some(function (i) {
                            return (
                              !!(n = i.call({ lexer: a }, e, t)) &&
                              ((e = e.substring(n.raw.length)), t.push(n), !0)
                            );
                          })
                        )
                      )
                        if ((n = this.tokenizer.space(e)))
                          (e = e.substring(n.raw.length)),
                            1 === n.raw.length && t.length > 0
                              ? (t[t.length - 1].raw += "\n")
                              : t.push(n);
                        else if ((n = this.tokenizer.code(e)))
                          (e = e.substring(n.raw.length)),
                            !(i = t[t.length - 1]) ||
                            ("paragraph" !== i.type && "text" !== i.type)
                              ? t.push(n)
                              : ((i.raw += "\n" + n.raw),
                                (i.text += "\n" + n.text),
                                (this.inlineQueue[
                                  this.inlineQueue.length - 1
                                ].src = i.text));
                        else if ((n = this.tokenizer.fences(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.heading(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.hr(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.blockquote(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.list(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.html(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.def(e)))
                          (e = e.substring(n.raw.length)),
                            !(i = t[t.length - 1]) ||
                            ("paragraph" !== i.type && "text" !== i.type)
                              ? this.tokens.links[n.tag] ||
                                (this.tokens.links[n.tag] = {
                                  href: n.href,
                                  title: n.title,
                                })
                              : ((i.raw += "\n" + n.raw),
                                (i.text += "\n" + n.raw),
                                (this.inlineQueue[
                                  this.inlineQueue.length - 1
                                ].src = i.text));
                        else if ((n = this.tokenizer.table(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.lheading(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if (
                          ((r = e),
                          this.options.extensions &&
                            this.options.extensions.startBlock &&
                            (function () {
                              var t = 1 / 0,
                                n = e.slice(1),
                                i = void 0;
                              a.options.extensions.startBlock.forEach(function (
                                e
                              ) {
                                "number" ==
                                  typeof (i = e.call({ lexer: this }, n)) &&
                                  i >= 0 &&
                                  (t = Math.min(t, i));
                              }),
                                t < 1 / 0 &&
                                  t >= 0 &&
                                  (r = e.substring(0, t + 1));
                            })(),
                          this.state.top && (n = this.tokenizer.paragraph(r)))
                        )
                          (i = t[t.length - 1]),
                            o && "paragraph" === i.type
                              ? ((i.raw += "\n" + n.raw),
                                (i.text += "\n" + n.text),
                                this.inlineQueue.pop(),
                                (this.inlineQueue[
                                  this.inlineQueue.length - 1
                                ].src = i.text))
                              : t.push(n),
                            (o = r.length !== e.length),
                            (e = e.substring(n.raw.length));
                        else if ((n = this.tokenizer.text(e)))
                          (e = e.substring(n.raw.length)),
                            (i = t[t.length - 1]) && "text" === i.type
                              ? ((i.raw += "\n" + n.raw),
                                (i.text += "\n" + n.text),
                                this.inlineQueue.pop(),
                                (this.inlineQueue[
                                  this.inlineQueue.length - 1
                                ].src = i.text))
                              : t.push(n);
                        else if (e) {
                          var l = "Infinite loop on byte: " + e.charCodeAt(0);
                          if (this.options.silent) {
                            console.error(l);
                            break;
                          }
                          throw new Error(l);
                        }
                    return (this.state.top = !0), t;
                  }),
                  (a.inline = function (e, t) {
                    return (
                      void 0 === t && (t = []),
                      this.inlineQueue.push({ src: e, tokens: t }),
                      t
                    );
                  }),
                  (a.inlineTokens = function (e, t) {
                    var n,
                      i,
                      r,
                      o = this;
                    void 0 === t && (t = []);
                    var a,
                      l,
                      s,
                      u = e;
                    if (this.tokens.links) {
                      var c = Object.keys(this.tokens.links);
                      if (c.length > 0)
                        for (
                          ;
                          null !=
                          (a =
                            this.tokenizer.rules.inline.reflinkSearch.exec(u));

                        )
                          c.includes(
                            a[0].slice(a[0].lastIndexOf("[") + 1, -1)
                          ) &&
                            (u =
                              u.slice(0, a.index) +
                              "[" +
                              E("a", a[0].length - 2) +
                              "]" +
                              u.slice(
                                this.tokenizer.rules.inline.reflinkSearch
                                  .lastIndex
                              ));
                    }
                    for (
                      ;
                      null !=
                      (a = this.tokenizer.rules.inline.blockSkip.exec(u));

                    )
                      u =
                        u.slice(0, a.index) +
                        "[" +
                        E("a", a[0].length - 2) +
                        "]" +
                        u.slice(
                          this.tokenizer.rules.inline.blockSkip.lastIndex
                        );
                    for (
                      ;
                      null !=
                      (a = this.tokenizer.rules.inline.escapedEmSt.exec(u));

                    )
                      u =
                        u.slice(0, a.index) +
                        "++" +
                        u.slice(
                          this.tokenizer.rules.inline.escapedEmSt.lastIndex
                        );
                    for (; e; )
                      if (
                        (l || (s = ""),
                        (l = !1),
                        !(
                          this.options.extensions &&
                          this.options.extensions.inline &&
                          this.options.extensions.inline.some(function (i) {
                            return (
                              !!(n = i.call({ lexer: o }, e, t)) &&
                              ((e = e.substring(n.raw.length)), t.push(n), !0)
                            );
                          })
                        ))
                      )
                        if ((n = this.tokenizer.escape(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.tag(e)))
                          (e = e.substring(n.raw.length)),
                            (i = t[t.length - 1]) &&
                            "text" === n.type &&
                            "text" === i.type
                              ? ((i.raw += n.raw), (i.text += n.text))
                              : t.push(n);
                        else if ((n = this.tokenizer.link(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if (
                          (n = this.tokenizer.reflink(e, this.tokens.links))
                        )
                          (e = e.substring(n.raw.length)),
                            (i = t[t.length - 1]) &&
                            "text" === n.type &&
                            "text" === i.type
                              ? ((i.raw += n.raw), (i.text += n.text))
                              : t.push(n);
                        else if ((n = this.tokenizer.emStrong(e, u, s)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.codespan(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.br(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.del(e)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if ((n = this.tokenizer.autolink(e, O)))
                          (e = e.substring(n.raw.length)), t.push(n);
                        else if (
                          this.state.inLink ||
                          !(n = this.tokenizer.url(e, O))
                        ) {
                          if (
                            ((r = e),
                            this.options.extensions &&
                              this.options.extensions.startInline &&
                              (function () {
                                var t = 1 / 0,
                                  n = e.slice(1),
                                  i = void 0;
                                o.options.extensions.startInline.forEach(
                                  function (e) {
                                    "number" ==
                                      typeof (i = e.call({ lexer: this }, n)) &&
                                      i >= 0 &&
                                      (t = Math.min(t, i));
                                  }
                                ),
                                  t < 1 / 0 &&
                                    t >= 0 &&
                                    (r = e.substring(0, t + 1));
                              })(),
                            (n = this.tokenizer.inlineText(r, N)))
                          )
                            (e = e.substring(n.raw.length)),
                              "_" !== n.raw.slice(-1) && (s = n.raw.slice(-1)),
                              (l = !0),
                              (i = t[t.length - 1]) && "text" === i.type
                                ? ((i.raw += n.raw), (i.text += n.text))
                                : t.push(n);
                          else if (e) {
                            var d = "Infinite loop on byte: " + e.charCodeAt(0);
                            if (this.options.silent) {
                              console.error(d);
                              break;
                            }
                            throw new Error(d);
                          }
                        } else (e = e.substring(n.raw.length)), t.push(n);
                    return t;
                  }),
                  (i = n),
                  (o = [
                    {
                      key: "rules",
                      get: function () {
                        return { block: M, inline: B };
                      },
                    },
                  ]),
                  (r = null) && t(i.prototype, r),
                  o && t(i, o),
                  Object.defineProperty(i, "prototype", { writable: !1 }),
                  n
                );
              })(),
              z = (function () {
                function t(t) {
                  this.options = t || e.defaults;
                }
                var n = t.prototype;
                return (
                  (n.code = function (e, t, n) {
                    var i = (t || "").match(/\S*/)[0];
                    if (this.options.highlight) {
                      var r = this.options.highlight(e, i);
                      null != r && r !== e && ((n = !0), (e = r));
                    }
                    return (
                      (e = e.replace(/\n$/, "") + "\n"),
                      i
                        ? '<pre><code class="' +
                          this.options.langPrefix +
                          d(i, !0) +
                          '">' +
                          (n ? e : d(e, !0)) +
                          "</code></pre>\n"
                        : "<pre><code>" + (n ? e : d(e, !0)) + "</code></pre>\n"
                    );
                  }),
                  (n.blockquote = function (e) {
                    return "<blockquote>\n" + e + "</blockquote>\n";
                  }),
                  (n.html = function (e) {
                    return e;
                  }),
                  (n.heading = function (e, t, n, i) {
                    return this.options.headerIds
                      ? "<h" +
                          t +
                          ' id="' +
                          (this.options.headerPrefix + i.slug(n)) +
                          '">' +
                          e +
                          "</h" +
                          t +
                          ">\n"
                      : "<h" + t + ">" + e + "</h" + t + ">\n";
                  }),
                  (n.hr = function () {
                    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
                  }),
                  (n.list = function (e, t, n) {
                    var i = t ? "ol" : "ul";
                    return (
                      "<" +
                      i +
                      (t && 1 !== n ? ' start="' + n + '"' : "") +
                      ">\n" +
                      e +
                      "</" +
                      i +
                      ">\n"
                    );
                  }),
                  (n.listitem = function (e) {
                    return "<li>" + e + "</li>\n";
                  }),
                  (n.checkbox = function (e) {
                    return (
                      "<input " +
                      (e ? 'checked="" ' : "") +
                      'disabled="" type="checkbox"' +
                      (this.options.xhtml ? " /" : "") +
                      "> "
                    );
                  }),
                  (n.paragraph = function (e) {
                    return "<p>" + e + "</p>\n";
                  }),
                  (n.table = function (e, t) {
                    return (
                      t && (t = "<tbody>" + t + "</tbody>"),
                      "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
                    );
                  }),
                  (n.tablerow = function (e) {
                    return "<tr>\n" + e + "</tr>\n";
                  }),
                  (n.tablecell = function (e, t) {
                    var n = t.header ? "th" : "td";
                    return (
                      (t.align
                        ? "<" + n + ' align="' + t.align + '">'
                        : "<" + n + ">") +
                      e +
                      "</" +
                      n +
                      ">\n"
                    );
                  }),
                  (n.strong = function (e) {
                    return "<strong>" + e + "</strong>";
                  }),
                  (n.em = function (e) {
                    return "<em>" + e + "</em>";
                  }),
                  (n.codespan = function (e) {
                    return "<code>" + e + "</code>";
                  }),
                  (n.br = function () {
                    return this.options.xhtml ? "<br/>" : "<br>";
                  }),
                  (n.del = function (e) {
                    return "<del>" + e + "</del>";
                  }),
                  (n.link = function (e, t, n) {
                    if (
                      null ===
                      (e = x(this.options.sanitize, this.options.baseUrl, e))
                    )
                      return n;
                    var i = '<a href="' + d(e) + '"';
                    return (
                      t && (i += ' title="' + t + '"'), (i += ">" + n + "</a>")
                    );
                  }),
                  (n.image = function (e, t, n) {
                    if (
                      null ===
                      (e = x(this.options.sanitize, this.options.baseUrl, e))
                    )
                      return n;
                    var i = '<img src="' + e + '" alt="' + n + '"';
                    return (
                      t && (i += ' title="' + t + '"'),
                      (i += this.options.xhtml ? "/>" : ">")
                    );
                  }),
                  (n.text = function (e) {
                    return e;
                  }),
                  t
                );
              })(),
              H = (function () {
                function e() {}
                var t = e.prototype;
                return (
                  (t.strong = function (e) {
                    return e;
                  }),
                  (t.em = function (e) {
                    return e;
                  }),
                  (t.codespan = function (e) {
                    return e;
                  }),
                  (t.del = function (e) {
                    return e;
                  }),
                  (t.html = function (e) {
                    return e;
                  }),
                  (t.text = function (e) {
                    return e;
                  }),
                  (t.link = function (e, t, n) {
                    return "" + n;
                  }),
                  (t.image = function (e, t, n) {
                    return "" + n;
                  }),
                  (t.br = function () {
                    return "";
                  }),
                  e
                );
              })(),
              R = (function () {
                function e() {
                  this.seen = {};
                }
                var t = e.prototype;
                return (
                  (t.serialize = function (e) {
                    return e
                      .toLowerCase()
                      .trim()
                      .replace(/<[!\/a-z].*?>/gi, "")
                      .replace(
                        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
                        ""
                      )
                      .replace(/\s/g, "-");
                  }),
                  (t.getNextSafeSlug = function (e, t) {
                    var n = e,
                      i = 0;
                    if (this.seen.hasOwnProperty(n)) {
                      i = this.seen[e];
                      do {
                        n = e + "-" + ++i;
                      } while (this.seen.hasOwnProperty(n));
                    }
                    return t || ((this.seen[e] = i), (this.seen[n] = 0)), n;
                  }),
                  (t.slug = function (e, t) {
                    void 0 === t && (t = {});
                    var n = this.serialize(e);
                    return this.getNextSafeSlug(n, t.dryrun);
                  }),
                  e
                );
              })(),
              P = (function () {
                function t(t) {
                  (this.options = t || e.defaults),
                    (this.options.renderer = this.options.renderer || new z()),
                    (this.renderer = this.options.renderer),
                    (this.renderer.options = this.options),
                    (this.textRenderer = new H()),
                    (this.slugger = new R());
                }
                (t.parse = function (e, n) {
                  return new t(n).parse(e);
                }),
                  (t.parseInline = function (e, n) {
                    return new t(n).parseInline(e);
                  });
                var n = t.prototype;
                return (
                  (n.parse = function (e, t) {
                    void 0 === t && (t = !0);
                    var n,
                      i,
                      r,
                      o,
                      a,
                      l,
                      s,
                      u,
                      c,
                      d,
                      h,
                      p,
                      m,
                      g,
                      v,
                      x,
                      y,
                      b,
                      D,
                      C = "",
                      w = e.length;
                    for (n = 0; n < w; n++)
                      if (
                        ((d = e[n]),
                        !(
                          this.options.extensions &&
                          this.options.extensions.renderers &&
                          this.options.extensions.renderers[d.type]
                        ) ||
                          (!1 ===
                            (D = this.options.extensions.renderers[d.type].call(
                              { parser: this },
                              d
                            )) &&
                            [
                              "space",
                              "hr",
                              "heading",
                              "code",
                              "table",
                              "blockquote",
                              "list",
                              "html",
                              "paragraph",
                              "text",
                            ].includes(d.type)))
                      )
                        switch (d.type) {
                          case "space":
                            continue;
                          case "hr":
                            C += this.renderer.hr();
                            continue;
                          case "heading":
                            C += this.renderer.heading(
                              this.parseInline(d.tokens),
                              d.depth,
                              f(this.parseInline(d.tokens, this.textRenderer)),
                              this.slugger
                            );
                            continue;
                          case "code":
                            C += this.renderer.code(d.text, d.lang, d.escaped);
                            continue;
                          case "table":
                            for (
                              u = "", s = "", o = d.header.length, i = 0;
                              i < o;
                              i++
                            )
                              s += this.renderer.tablecell(
                                this.parseInline(d.header[i].tokens),
                                { header: !0, align: d.align[i] }
                              );
                            for (
                              u += this.renderer.tablerow(s),
                                c = "",
                                o = d.rows.length,
                                i = 0;
                              i < o;
                              i++
                            ) {
                              for (
                                s = "", a = (l = d.rows[i]).length, r = 0;
                                r < a;
                                r++
                              )
                                s += this.renderer.tablecell(
                                  this.parseInline(l[r].tokens),
                                  { header: !1, align: d.align[r] }
                                );
                              c += this.renderer.tablerow(s);
                            }
                            C += this.renderer.table(u, c);
                            continue;
                          case "blockquote":
                            (c = this.parse(d.tokens)),
                              (C += this.renderer.blockquote(c));
                            continue;
                          case "list":
                            for (
                              h = d.ordered,
                                p = d.start,
                                m = d.loose,
                                o = d.items.length,
                                c = "",
                                i = 0;
                              i < o;
                              i++
                            )
                              (x = (v = d.items[i]).checked),
                                (y = v.task),
                                (g = ""),
                                v.task &&
                                  ((b = this.renderer.checkbox(x)),
                                  m
                                    ? v.tokens.length > 0 &&
                                      "paragraph" === v.tokens[0].type
                                      ? ((v.tokens[0].text =
                                          b + " " + v.tokens[0].text),
                                        v.tokens[0].tokens &&
                                          v.tokens[0].tokens.length > 0 &&
                                          "text" ===
                                            v.tokens[0].tokens[0].type &&
                                          (v.tokens[0].tokens[0].text =
                                            b +
                                            " " +
                                            v.tokens[0].tokens[0].text))
                                      : v.tokens.unshift({
                                          type: "text",
                                          text: b,
                                        })
                                    : (g += b)),
                                (g += this.parse(v.tokens, m)),
                                (c += this.renderer.listitem(g, y, x));
                            C += this.renderer.list(c, h, p);
                            continue;
                          case "html":
                            C += this.renderer.html(d.text);
                            continue;
                          case "paragraph":
                            C += this.renderer.paragraph(
                              this.parseInline(d.tokens)
                            );
                            continue;
                          case "text":
                            for (
                              c = d.tokens
                                ? this.parseInline(d.tokens)
                                : d.text;
                              n + 1 < w && "text" === e[n + 1].type;

                            )
                              c +=
                                "\n" +
                                ((d = e[++n]).tokens
                                  ? this.parseInline(d.tokens)
                                  : d.text);
                            C += t ? this.renderer.paragraph(c) : c;
                            continue;
                          default:
                            var k =
                              'Token with "' + d.type + '" type was not found.';
                            if (this.options.silent)
                              return void console.error(k);
                            throw new Error(k);
                        }
                      else C += D || "";
                    return C;
                  }),
                  (n.parseInline = function (e, t) {
                    t = t || this.renderer;
                    var n,
                      i,
                      r,
                      o = "",
                      a = e.length;
                    for (n = 0; n < a; n++)
                      if (
                        ((i = e[n]),
                        !(
                          this.options.extensions &&
                          this.options.extensions.renderers &&
                          this.options.extensions.renderers[i.type]
                        ) ||
                          (!1 ===
                            (r = this.options.extensions.renderers[i.type].call(
                              { parser: this },
                              i
                            )) &&
                            [
                              "escape",
                              "html",
                              "link",
                              "image",
                              "strong",
                              "em",
                              "codespan",
                              "br",
                              "del",
                              "text",
                            ].includes(i.type)))
                      )
                        switch (i.type) {
                          case "escape":
                          case "text":
                            o += t.text(i.text);
                            break;
                          case "html":
                            o += t.html(i.text);
                            break;
                          case "link":
                            o += t.link(
                              i.href,
                              i.title,
                              this.parseInline(i.tokens, t)
                            );
                            break;
                          case "image":
                            o += t.image(i.href, i.title, i.text);
                            break;
                          case "strong":
                            o += t.strong(this.parseInline(i.tokens, t));
                            break;
                          case "em":
                            o += t.em(this.parseInline(i.tokens, t));
                            break;
                          case "codespan":
                            o += t.codespan(i.text);
                            break;
                          case "br":
                            o += t.br();
                            break;
                          case "del":
                            o += t.del(this.parseInline(i.tokens, t));
                            break;
                          default:
                            var l =
                              'Token with "' + i.type + '" type was not found.';
                            if (this.options.silent)
                              return void console.error(l);
                            throw new Error(l);
                        }
                      else o += r || "";
                    return o;
                  }),
                  t
                );
              })();
            function _(e, t, n) {
              if (null == e)
                throw new Error(
                  "marked(): input parameter is undefined or null"
                );
              if ("string" != typeof e)
                throw new Error(
                  "marked(): input parameter is of type " +
                    Object.prototype.toString.call(e) +
                    ", string expected"
                );
              if (
                ("function" == typeof t && ((n = t), (t = null)),
                A((t = k({}, _.defaults, t || {}))),
                n)
              ) {
                var i,
                  r = t.highlight;
                try {
                  i = I.lex(e, t);
                } catch (e) {
                  return n(e);
                }
                var o = function (e) {
                  var o;
                  if (!e)
                    try {
                      t.walkTokens && _.walkTokens(i, t.walkTokens),
                        (o = P.parse(i, t));
                    } catch (t) {
                      e = t;
                    }
                  return (t.highlight = r), e ? n(e) : n(null, o);
                };
                if (!r || r.length < 3) return o();
                if ((delete t.highlight, !i.length)) return o();
                var a = 0;
                return (
                  _.walkTokens(i, function (e) {
                    "code" === e.type &&
                      (a++,
                      setTimeout(function () {
                        r(e.text, e.lang, function (t, n) {
                          if (t) return o(t);
                          null != n &&
                            n !== e.text &&
                            ((e.text = n), (e.escaped = !0)),
                            0 === --a && o();
                        });
                      }, 0));
                  }),
                  void (0 === a && o())
                );
              }
              function l(e) {
                if (
                  ((e.message +=
                    "\nPlease report this to https://github.com/markedjs/marked."),
                  t.silent)
                )
                  return (
                    "<p>An error occurred:</p><pre>" +
                    d(e.message + "", !0) +
                    "</pre>"
                  );
                throw e;
              }
              try {
                var s = I.lex(e, t);
                if (t.walkTokens) {
                  if (t.async)
                    return Promise.all(_.walkTokens(s, t.walkTokens))
                      .then(function () {
                        return P.parse(s, t);
                      })
                      .catch(l);
                  _.walkTokens(s, t.walkTokens);
                }
                return P.parse(s, t);
              } catch (e) {
                l(e);
              }
            }
            (_.options = _.setOptions =
              function (t) {
                var n;
                return k(_.defaults, t), (n = _.defaults), (e.defaults = n), _;
              }),
              (_.getDefaults = r),
              (_.defaults = e.defaults),
              (_.use = function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                var i,
                  r = k.apply(void 0, [{}].concat(t)),
                  o = _.defaults.extensions || {
                    renderers: {},
                    childTokens: {},
                  };
                t.forEach(function (e) {
                  if (
                    (e.extensions &&
                      ((i = !0),
                      e.extensions.forEach(function (e) {
                        if (!e.name) throw new Error("extension name required");
                        if (e.renderer) {
                          var t = o.renderers ? o.renderers[e.name] : null;
                          o.renderers[e.name] = t
                            ? function () {
                                for (
                                  var n = arguments.length,
                                    i = new Array(n),
                                    r = 0;
                                  r < n;
                                  r++
                                )
                                  i[r] = arguments[r];
                                var o = e.renderer.apply(this, i);
                                return !1 === o && (o = t.apply(this, i)), o;
                              }
                            : e.renderer;
                        }
                        if (e.tokenizer) {
                          if (
                            !e.level ||
                            ("block" !== e.level && "inline" !== e.level)
                          )
                            throw new Error(
                              "extension level must be 'block' or 'inline'"
                            );
                          o[e.level]
                            ? o[e.level].unshift(e.tokenizer)
                            : (o[e.level] = [e.tokenizer]),
                            e.start &&
                              ("block" === e.level
                                ? o.startBlock
                                  ? o.startBlock.push(e.start)
                                  : (o.startBlock = [e.start])
                                : "inline" === e.level &&
                                  (o.startInline
                                    ? o.startInline.push(e.start)
                                    : (o.startInline = [e.start])));
                        }
                        e.childTokens &&
                          (o.childTokens[e.name] = e.childTokens);
                      })),
                    e.renderer &&
                      (function () {
                        var t = _.defaults.renderer || new z(),
                          n = function (n) {
                            var i = t[n];
                            t[n] = function () {
                              for (
                                var r = arguments.length,
                                  o = new Array(r),
                                  a = 0;
                                a < r;
                                a++
                              )
                                o[a] = arguments[a];
                              var l = e.renderer[n].apply(t, o);
                              return !1 === l && (l = i.apply(t, o)), l;
                            };
                          };
                        for (var i in e.renderer) n(i);
                        r.renderer = t;
                      })(),
                    e.tokenizer &&
                      (function () {
                        var t = _.defaults.tokenizer || new T(),
                          n = function (n) {
                            var i = t[n];
                            t[n] = function () {
                              for (
                                var r = arguments.length,
                                  o = new Array(r),
                                  a = 0;
                                a < r;
                                a++
                              )
                                o[a] = arguments[a];
                              var l = e.tokenizer[n].apply(t, o);
                              return !1 === l && (l = i.apply(t, o)), l;
                            };
                          };
                        for (var i in e.tokenizer) n(i);
                        r.tokenizer = t;
                      })(),
                    e.walkTokens)
                  ) {
                    var t = _.defaults.walkTokens;
                    r.walkTokens = function (n) {
                      var i = [];
                      return (
                        i.push(e.walkTokens.call(this, n)),
                        t && (i = i.concat(t.call(this, n))),
                        i
                      );
                    };
                  }
                  i && (r.extensions = o), _.setOptions(r);
                });
              }),
              (_.walkTokens = function (e, t) {
                for (
                  var n,
                    r = [],
                    o = function () {
                      var e = n.value;
                      switch (((r = r.concat(t.call(_, e))), e.type)) {
                        case "table":
                          for (var o, a = i(e.header); !(o = a()).done; ) {
                            var l = o.value;
                            r = r.concat(_.walkTokens(l.tokens, t));
                          }
                          for (var s, u = i(e.rows); !(s = u()).done; )
                            for (var c, d = i(s.value); !(c = d()).done; ) {
                              var h = c.value;
                              r = r.concat(_.walkTokens(h.tokens, t));
                            }
                          break;
                        case "list":
                          r = r.concat(_.walkTokens(e.items, t));
                          break;
                        default:
                          _.defaults.extensions &&
                          _.defaults.extensions.childTokens &&
                          _.defaults.extensions.childTokens[e.type]
                            ? _.defaults.extensions.childTokens[e.type].forEach(
                                function (n) {
                                  r = r.concat(_.walkTokens(e[n], t));
                                }
                              )
                            : e.tokens &&
                              (r = r.concat(_.walkTokens(e.tokens, t)));
                      }
                    },
                    a = i(e);
                  !(n = a()).done;

                )
                  o();
                return r;
              }),
              (_.parseInline = function (e, t) {
                if (null == e)
                  throw new Error(
                    "marked.parseInline(): input parameter is undefined or null"
                  );
                if ("string" != typeof e)
                  throw new Error(
                    "marked.parseInline(): input parameter is of type " +
                      Object.prototype.toString.call(e) +
                      ", string expected"
                  );
                A((t = k({}, _.defaults, t || {})));
                try {
                  var n = I.lexInline(e, t);
                  return (
                    t.walkTokens && _.walkTokens(n, t.walkTokens),
                    P.parseInline(n, t)
                  );
                } catch (e) {
                  if (
                    ((e.message +=
                      "\nPlease report this to https://github.com/markedjs/marked."),
                    t.silent)
                  )
                    return (
                      "<p>An error occurred:</p><pre>" +
                      d(e.message + "", !0) +
                      "</pre>"
                    );
                  throw e;
                }
              }),
              (_.Parser = P),
              (_.parser = P.parse),
              (_.Renderer = z),
              (_.TextRenderer = H),
              (_.Lexer = I),
              (_.lexer = I.lex),
              (_.Tokenizer = T),
              (_.Slugger = R),
              (_.parse = _);
            var W = _.options,
              j = _.setOptions,
              q = _.use,
              U = _.walkTokens,
              $ = _.parseInline,
              G = _,
              V = P.parse,
              X = I.lex;
            (e.Lexer = I),
              (e.Parser = P),
              (e.Renderer = z),
              (e.Slugger = R),
              (e.TextRenderer = H),
              (e.Tokenizer = T),
              (e.getDefaults = r),
              (e.lexer = X),
              (e.marked = _),
              (e.options = W),
              (e.parse = G),
              (e.parseInline = $),
              (e.parser = V),
              (e.setOptions = j),
              (e.use = q),
              (e.walkTokens = U),
              Object.defineProperty(e, "__esModule", { value: !0 });
          });
        },
        {},
      ],
      16: [
        function (e, t, n) {
          (function (n) {
            (function () {
              var i;
              !(function () {
                "use strict";
                (i = function (e, t, i, r) {
                  (r = r || {}),
                    (this.dictionary = null),
                    (this.rules = {}),
                    (this.dictionaryTable = {}),
                    (this.compoundRules = []),
                    (this.compoundRuleCodes = {}),
                    (this.replacementTable = []),
                    (this.flags = r.flags || {}),
                    (this.memoized = {}),
                    (this.loaded = !1);
                  var o,
                    a,
                    l,
                    s,
                    u,
                    c = this;
                  function d(e, t) {
                    var n = c._readFile(e, null, r.asyncLoad);
                    r.asyncLoad
                      ? n.then(function (e) {
                          t(e);
                        })
                      : t(n);
                  }
                  function h(e) {
                    (t = e), i && p();
                  }
                  function f(e) {
                    (i = e), t && p();
                  }
                  function p() {
                    for (
                      c.rules = c._parseAFF(t),
                        c.compoundRuleCodes = {},
                        a = 0,
                        s = c.compoundRules.length;
                      a < s;
                      a++
                    ) {
                      var e = c.compoundRules[a];
                      for (l = 0, u = e.length; l < u; l++)
                        c.compoundRuleCodes[e[l]] = [];
                    }
                    for (a in ("ONLYINCOMPOUND" in c.flags &&
                      (c.compoundRuleCodes[c.flags.ONLYINCOMPOUND] = []),
                    (c.dictionaryTable = c._parseDIC(i)),
                    c.compoundRuleCodes))
                      0 === c.compoundRuleCodes[a].length &&
                        delete c.compoundRuleCodes[a];
                    for (a = 0, s = c.compoundRules.length; a < s; a++) {
                      var n = c.compoundRules[a],
                        o = "";
                      for (l = 0, u = n.length; l < u; l++) {
                        var d = n[l];
                        d in c.compoundRuleCodes
                          ? (o += "(" + c.compoundRuleCodes[d].join("|") + ")")
                          : (o += d);
                      }
                      c.compoundRules[a] = new RegExp(o, "i");
                    }
                    (c.loaded = !0),
                      r.asyncLoad && r.loadedCallback && r.loadedCallback(c);
                  }
                  return (
                    e &&
                      ((c.dictionary = e),
                      t && i
                        ? p()
                        : "undefined" != typeof window &&
                          "chrome" in window &&
                          "extension" in window.chrome &&
                          "getURL" in window.chrome.extension
                        ? ((o = r.dictionaryPath
                            ? r.dictionaryPath
                            : "typo/dictionaries"),
                          t ||
                            d(
                              chrome.extension.getURL(
                                o + "/" + e + "/" + e + ".aff"
                              ),
                              h
                            ),
                          i ||
                            d(
                              chrome.extension.getURL(
                                o + "/" + e + "/" + e + ".dic"
                              ),
                              f
                            ))
                        : ((o = r.dictionaryPath
                            ? r.dictionaryPath
                            : void 0 !== n
                            ? n + "/dictionaries"
                            : "./dictionaries"),
                          t || d(o + "/" + e + "/" + e + ".aff", h),
                          i || d(o + "/" + e + "/" + e + ".dic", f))),
                    this
                  );
                }).prototype = {
                  load: function (e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    return this;
                  },
                  _readFile: function (t, n, i) {
                    if (
                      ((n = n || "utf8"), "undefined" != typeof XMLHttpRequest)
                    ) {
                      var r,
                        o = new XMLHttpRequest();
                      return (
                        o.open("GET", t, i),
                        i &&
                          (r = new Promise(function (e, t) {
                            (o.onload = function () {
                              200 === o.status
                                ? e(o.responseText)
                                : t(o.statusText);
                            }),
                              (o.onerror = function () {
                                t(o.statusText);
                              });
                          })),
                        o.overrideMimeType &&
                          o.overrideMimeType("text/plain; charset=" + n),
                        o.send(null),
                        i ? r : o.responseText
                      );
                    }
                    if (void 0 !== e) {
                      var a = e("fs");
                      try {
                        if (a.existsSync(t)) return a.readFileSync(t, n);
                        console.log("Path " + t + " does not exist.");
                      } catch (e) {
                        return console.log(e), "";
                      }
                    }
                  },
                  _parseAFF: function (e) {
                    var t,
                      n,
                      i,
                      r,
                      o,
                      a,
                      l,
                      s = {},
                      u = e.split(/\r?\n/);
                    for (r = 0, a = u.length; r < a; r++)
                      if ((t = (t = this._removeAffixComments(u[r])).trim())) {
                        var c = t.split(/\s+/),
                          d = c[0];
                        if ("PFX" == d || "SFX" == d) {
                          var h = c[1],
                            f = c[2],
                            p = [];
                          for (
                            o = r + 1, l = r + 1 + (n = parseInt(c[3], 10));
                            o < l;
                            o++
                          ) {
                            var m = (i = u[o].split(/\s+/))[2],
                              g = i[3].split("/"),
                              v = g[0];
                            "0" === v && (v = "");
                            var x = this.parseRuleCodes(g[1]),
                              y = i[4],
                              b = {};
                            (b.add = v),
                              x.length > 0 && (b.continuationClasses = x),
                              "." !== y &&
                                (b.match =
                                  "SFX" === d
                                    ? new RegExp(y + "$")
                                    : new RegExp("^" + y)),
                              "0" != m &&
                                (b.remove =
                                  "SFX" === d ? new RegExp(m + "$") : m),
                              p.push(b);
                          }
                          (s[h] = {
                            type: d,
                            combineable: "Y" == f,
                            entries: p,
                          }),
                            (r += n);
                        } else if ("COMPOUNDRULE" === d) {
                          for (
                            o = r + 1, l = r + 1 + (n = parseInt(c[1], 10));
                            o < l;
                            o++
                          )
                            (i = (t = u[o]).split(/\s+/)),
                              this.compoundRules.push(i[1]);
                          r += n;
                        } else
                          "REP" === d
                            ? 3 === (i = t.split(/\s+/)).length &&
                              this.replacementTable.push([i[1], i[2]])
                            : (this.flags[d] = c[1]);
                      }
                    return s;
                  },
                  _removeAffixComments: function (e) {
                    return e.match(/^\s*#/, "") ? "" : e;
                  },
                  _parseDIC: function (e) {
                    var t = (e = this._removeDicComments(e)).split(/\r?\n/),
                      n = {};
                    function i(e, t) {
                      n.hasOwnProperty(e) || (n[e] = null),
                        t.length > 0 &&
                          (null === n[e] && (n[e] = []), n[e].push(t));
                    }
                    for (var r = 1, o = t.length; r < o; r++) {
                      var a = t[r];
                      if (a) {
                        var l = a.split("/", 2),
                          s = l[0];
                        if (l.length > 1) {
                          var u = this.parseRuleCodes(l[1]);
                          ("NEEDAFFIX" in this.flags &&
                            -1 != u.indexOf(this.flags.NEEDAFFIX)) ||
                            i(s, u);
                          for (var c = 0, d = u.length; c < d; c++) {
                            var h = u[c],
                              f = this.rules[h];
                            if (f)
                              for (
                                var p = this._applyRule(s, f),
                                  m = 0,
                                  g = p.length;
                                m < g;
                                m++
                              ) {
                                var v = p[m];
                                if ((i(v, []), f.combineable))
                                  for (var x = c + 1; x < d; x++) {
                                    var y = u[x],
                                      b = this.rules[y];
                                    if (b && b.combineable && f.type != b.type)
                                      for (
                                        var D = this._applyRule(v, b),
                                          C = 0,
                                          w = D.length;
                                        C < w;
                                        C++
                                      ) {
                                        i(D[C], []);
                                      }
                                  }
                              }
                            h in this.compoundRuleCodes &&
                              this.compoundRuleCodes[h].push(s);
                          }
                        } else i(s.trim(), []);
                      }
                    }
                    return n;
                  },
                  _removeDicComments: function (e) {
                    return (e = e.replace(/^\t.*$/gm, ""));
                  },
                  parseRuleCodes: function (e) {
                    if (e) {
                      if ("FLAG" in this.flags) {
                        if ("long" === this.flags.FLAG) {
                          for (var t = [], n = 0, i = e.length; n < i; n += 2)
                            t.push(e.substr(n, 2));
                          return t;
                        }
                        return "num" === this.flags.FLAG
                          ? e.split(",")
                          : "UTF-8" === this.flags.FLAG
                          ? Array.from(e)
                          : e.split("");
                      }
                      return e.split("");
                    }
                    return [];
                  },
                  _applyRule: function (e, t) {
                    for (
                      var n = t.entries, i = [], r = 0, o = n.length;
                      r < o;
                      r++
                    ) {
                      var a = n[r];
                      if (!a.match || e.match(a.match)) {
                        var l = e;
                        if (
                          (a.remove && (l = l.replace(a.remove, "")),
                          "SFX" === t.type ? (l += a.add) : (l = a.add + l),
                          i.push(l),
                          "continuationClasses" in a)
                        )
                          for (
                            var s = 0, u = a.continuationClasses.length;
                            s < u;
                            s++
                          ) {
                            var c = this.rules[a.continuationClasses[s]];
                            c && (i = i.concat(this._applyRule(l, c)));
                          }
                      }
                    }
                    return i;
                  },
                  check: function (e) {
                    if (!this.loaded) throw "Dictionary not loaded.";
                    var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                    if (this.checkExact(t)) return !0;
                    if (t.toUpperCase() === t) {
                      var n = t[0] + t.substring(1).toLowerCase();
                      if (this.hasFlag(n, "KEEPCASE")) return !1;
                      if (this.checkExact(n)) return !0;
                      if (this.checkExact(t.toLowerCase())) return !0;
                    }
                    var i = t[0].toLowerCase() + t.substring(1);
                    if (i !== t) {
                      if (this.hasFlag(i, "KEEPCASE")) return !1;
                      if (this.checkExact(i)) return !0;
                    }
                    return !1;
                  },
                  checkExact: function (e) {
                    if (!this.loaded) throw "Dictionary not loaded.";
                    var t,
                      n,
                      i = this.dictionaryTable[e];
                    if (void 0 === i) {
                      if (
                        "COMPOUNDMIN" in this.flags &&
                        e.length >= this.flags.COMPOUNDMIN
                      )
                        for (t = 0, n = this.compoundRules.length; t < n; t++)
                          if (e.match(this.compoundRules[t])) return !0;
                    } else {
                      if (null === i) return !0;
                      if ("object" == typeof i)
                        for (t = 0, n = i.length; t < n; t++)
                          if (!this.hasFlag(e, "ONLYINCOMPOUND", i[t]))
                            return !0;
                    }
                    return !1;
                  },
                  hasFlag: function (e, t, n) {
                    if (!this.loaded) throw "Dictionary not loaded.";
                    return !(
                      !(t in this.flags) ||
                      (void 0 === n &&
                        (n = Array.prototype.concat.apply(
                          [],
                          this.dictionaryTable[e]
                        )),
                      !n || -1 === n.indexOf(this.flags[t]))
                    );
                  },
                  alphabet: "",
                  suggest: function (e, t) {
                    if (!this.loaded) throw "Dictionary not loaded.";
                    if (((t = t || 5), this.memoized.hasOwnProperty(e))) {
                      var n = this.memoized[e].limit;
                      if (t <= n || this.memoized[e].suggestions.length < n)
                        return this.memoized[e].suggestions.slice(0, t);
                    }
                    if (this.check(e)) return [];
                    for (
                      var i = 0, r = this.replacementTable.length;
                      i < r;
                      i++
                    ) {
                      var o = this.replacementTable[i];
                      if (-1 !== e.indexOf(o[0])) {
                        var a = e.replace(o[0], o[1]);
                        if (this.check(a)) return [a];
                      }
                    }
                    var l = this;
                    function s(e, t) {
                      var n,
                        i,
                        r,
                        o,
                        a = {},
                        s = l.alphabet.length;
                      if ("string" == typeof e) {
                        var u = e;
                        (e = {})[u] = !0;
                      }
                      for (var u in e)
                        for (n = 0, r = u.length + 1; n < r; n++) {
                          var c = [u.substring(0, n), u.substring(n)];
                          if (
                            (c[1] &&
                              ((o = c[0] + c[1].substring(1)),
                              (t && !l.check(o)) ||
                                (o in a ? (a[o] += 1) : (a[o] = 1))),
                            c[1].length > 1 &&
                              c[1][1] !== c[1][0] &&
                              ((o =
                                c[0] + c[1][1] + c[1][0] + c[1].substring(2)),
                              (t && !l.check(o)) ||
                                (o in a ? (a[o] += 1) : (a[o] = 1))),
                            c[1])
                          ) {
                            var d =
                              c[1].substring(0, 1).toUpperCase() ===
                              c[1].substring(0, 1)
                                ? "uppercase"
                                : "lowercase";
                            for (i = 0; i < s; i++) {
                              var h = l.alphabet[i];
                              "uppercase" === d && (h = h.toUpperCase()),
                                h != c[1].substring(0, 1) &&
                                  ((o = c[0] + h + c[1].substring(1)),
                                  (t && !l.check(o)) ||
                                    (o in a ? (a[o] += 1) : (a[o] = 1)));
                            }
                          }
                          if (c[1])
                            for (i = 0; i < s; i++) {
                              (d =
                                c[0].substring(-1).toUpperCase() ===
                                  c[0].substring(-1) &&
                                c[1].substring(0, 1).toUpperCase() ===
                                  c[1].substring(0, 1)
                                  ? "uppercase"
                                  : "lowercase"),
                                (h = l.alphabet[i]);
                              "uppercase" === d && (h = h.toUpperCase()),
                                (o = c[0] + h + c[1]),
                                (t && !l.check(o)) ||
                                  (o in a ? (a[o] += 1) : (a[o] = 1));
                            }
                        }
                      return a;
                    }
                    return (
                      (l.alphabet = "abcdefghijklmnopqrstuvwxyz"),
                      (this.memoized[e] = {
                        suggestions: (function (e) {
                          var n,
                            i = s(e),
                            r = s(i, !0);
                          for (var o in i)
                            l.check(o) &&
                              (o in r ? (r[o] += i[o]) : (r[o] = i[o]));
                          var a = [];
                          for (n in r) r.hasOwnProperty(n) && a.push([n, r[n]]);
                          a.sort(function (e, t) {
                            var n = e[1],
                              i = t[1];
                            return n < i
                              ? -1
                              : n > i
                              ? 1
                              : t[0].localeCompare(e[0]);
                          }).reverse();
                          var u = [],
                            c = "lowercase";
                          e.toUpperCase() === e
                            ? (c = "uppercase")
                            : e.substr(0, 1).toUpperCase() +
                                e.substr(1).toLowerCase() ===
                                e && (c = "capitalized");
                          var d = t;
                          for (n = 0; n < Math.min(d, a.length); n++)
                            "uppercase" === c
                              ? (a[n][0] = a[n][0].toUpperCase())
                              : "capitalized" === c &&
                                (a[n][0] =
                                  a[n][0].substr(0, 1).toUpperCase() +
                                  a[n][0].substr(1)),
                              l.hasFlag(a[n][0], "NOSUGGEST") ||
                              -1 != u.indexOf(a[n][0])
                                ? d++
                                : u.push(a[n][0]);
                          return u;
                        })(e),
                        limit: t,
                      }),
                      this.memoized[e].suggestions
                    );
                  },
                };
              })(),
                void 0 !== t && (t.exports = i);
            }.call(this));
          }.call(this, "/node_modules/typo-js"));
        },
        { fs: 1 },
      ],
      17: [
        function (e, t, n) {
          var i = e("codemirror");
          (i.commands.tabAndIndentMarkdownList = function (e) {
            var t = e.listSelections()[0].head;
            if (!1 !== e.getStateAfter(t.line).list)
              e.execCommand("indentMore");
            else if (e.options.indentWithTabs) e.execCommand("insertTab");
            else {
              var n = Array(e.options.tabSize + 1).join(" ");
              e.replaceSelection(n);
            }
          }),
            (i.commands.shiftTabAndUnindentMarkdownList = function (e) {
              var t = e.listSelections()[0].head;
              if (!1 !== e.getStateAfter(t.line).list)
                e.execCommand("indentLess");
              else if (e.options.indentWithTabs) e.execCommand("insertTab");
              else {
                var n = Array(e.options.tabSize + 1).join(" ");
                e.replaceSelection(n);
              }
            });
        },
        { codemirror: 10 },
      ],
      18: [
        function (e, t, n) {
          "use strict";
          var i = e("codemirror");
          e("codemirror/addon/edit/continuelist.js"),
            e("./codemirror/tablist"),
            e("codemirror/addon/display/fullscreen.js"),
            e("codemirror/mode/markdown/markdown.js"),
            e("codemirror/addon/mode/overlay.js"),
            e("codemirror/addon/display/placeholder.js"),
            e("codemirror/addon/display/autorefresh.js"),
            e("codemirror/addon/selection/mark-selection.js"),
            e("codemirror/addon/search/searchcursor.js"),
            e("codemirror/mode/gfm/gfm.js"),
            e("codemirror/mode/xml/xml.js");
          var r = e("codemirror-spell-checker"),
            o = e("marked").marked,
            a = /Mac/.test(navigator.platform),
            l = new RegExp(/(<a.*?https?:\/\/.*?[^a]>)+?/g),
            s = {
              toggleBold: x,
              toggleItalic: y,
              drawLink: O,
              toggleHeadingSmaller: w,
              toggleHeadingBigger: k,
              drawImage: I,
              toggleBlockquote: C,
              toggleOrderedList: B,
              toggleUnorderedList: M,
              toggleCodeBlock: D,
              togglePreview: U,
              toggleStrikethrough: b,
              toggleHeading1: S,
              toggleHeading2: F,
              toggleHeading3: A,
              toggleHeading4: E,
              toggleHeading5: L,
              toggleHeading6: T,
              cleanBlock: N,
              drawTable: P,
              drawHorizontalRule: _,
              undo: W,
              redo: j,
              toggleSideBySide: q,
              toggleFullScreen: v,
            },
            u = {
              toggleBold: "Cmd-B",
              toggleItalic: "Cmd-I",
              drawLink: "Cmd-K",
              toggleHeadingSmaller: "Cmd-H",
              toggleHeadingBigger: "Shift-Cmd-H",
              toggleHeading1: "Ctrl+Alt+1",
              toggleHeading2: "Ctrl+Alt+2",
              toggleHeading3: "Ctrl+Alt+3",
              toggleHeading4: "Ctrl+Alt+4",
              toggleHeading5: "Ctrl+Alt+5",
              toggleHeading6: "Ctrl+Alt+6",
              cleanBlock: "Cmd-E",
              drawImage: "Cmd-Alt-I",
              toggleBlockquote: "Cmd-'",
              toggleOrderedList: "Cmd-Alt-L",
              toggleUnorderedList: "Cmd-L",
              toggleCodeBlock: "Cmd-Alt-C",
              togglePreview: "Cmd-P",
              toggleSideBySide: "F9",
              toggleFullScreen: "F11",
            },
            c = function () {
              var e,
                t = !1;
              return (
                (e = navigator.userAgent || navigator.vendor || window.opera),
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                  e
                ) ||
                  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
                    e.substr(0, 4)
                  )) &&
                  (t = !0),
                t
              );
            };
          function d(e) {
            return (e = a
              ? e.replace("Ctrl", "Cmd")
              : e.replace("Cmd", "Ctrl"));
          }
          function h(e, t, n, i) {
            var r = f(e, !1, t, n, "button", i);
            r.classList.add("easymde-dropdown"),
              (r.onclick = function () {
                r.focus();
              });
            var o = document.createElement("div");
            o.className = "easymde-dropdown-content";
            for (var a = 0; a < e.children.length; a++) {
              var l,
                s = e.children[a];
              (l = f(
                "string" == typeof s && s in te ? te[s] : s,
                !0,
                t,
                n,
                "button",
                i
              )).addEventListener(
                "click",
                function (e) {
                  e.stopPropagation();
                },
                !1
              ),
                o.appendChild(l);
            }
            return r.appendChild(o), r;
          }
          function f(e, t, n, i, r, o) {
            e = e || {};
            var l = document.createElement(r);
            if (e.attributes)
              for (var u in e.attributes)
                Object.prototype.hasOwnProperty.call(e.attributes, u) &&
                  l.setAttribute(u, e.attributes[u]);
            var c = o.options.toolbarButtonClassPrefix
              ? o.options.toolbarButtonClassPrefix + "-"
              : "";
            (l.className = c + e.name),
              l.setAttribute("type", r),
              (n = null == n || n),
              e.text && (l.innerText = e.text),
              e.name && e.name in i && (s[e.name] = e.action),
              e.title &&
                n &&
                ((l.title = (function (e, t, n) {
                  var i,
                    r = e;
                  t &&
                    n[
                      (i = (function (e) {
                        for (var t in s) if (s[t] === e) return t;
                        return null;
                      })(t))
                    ] &&
                    (r += " (" + d(n[i]) + ")");
                  return r;
                })(e.title, e.action, i)),
                a &&
                  ((l.title = l.title.replace("Ctrl", "⌘")),
                  (l.title = l.title.replace("Alt", "⌥")))),
              e.title && l.setAttribute("aria-label", e.title),
              e.noDisable && l.classList.add("no-disable"),
              e.noMobile && l.classList.add("no-mobile");
            var h = [];
            void 0 !== e.className && (h = e.className.split(" "));
            for (var f = [], p = 0; p < h.length; p++) {
              var m = h[p];
              m.match(/^fa([srlb]|(-[\w-]*)|$)/)
                ? f.push(m)
                : l.classList.add(m);
            }
            if (((l.tabIndex = -1), f.length > 0)) {
              for (
                var g = document.createElement("i"), v = 0;
                v < f.length;
                v++
              ) {
                var x = f[v];
                g.classList.add(x);
              }
              l.appendChild(g);
            }
            return (
              void 0 !== e.icon && (l.innerHTML = e.icon),
              e.action &&
                t &&
                ("function" == typeof e.action
                  ? (l.onclick = function (t) {
                      t.preventDefault(), e.action(o);
                    })
                  : "string" == typeof e.action &&
                    (l.onclick = function (t) {
                      t.preventDefault(), window.open(e.action, "_blank");
                    })),
              l
            );
          }
          function p() {
            var e = document.createElement("i");
            return (e.className = "separator"), (e.innerHTML = "|"), e;
          }
          function m(e, t) {
            t = t || e.getCursor("start");
            var n = e.getTokenAt(t);
            if (!n.type) return {};
            for (
              var i, r, o = n.type.split(" "), a = {}, l = 0;
              l < o.length;
              l++
            )
              "strong" === (i = o[l])
                ? (a.bold = !0)
                : "variable-2" === i
                ? ((r = e.getLine(t.line)),
                  /^\s*\d+\.\s/.test(r)
                    ? (a["ordered-list"] = !0)
                    : (a["unordered-list"] = !0))
                : "atom" === i
                ? (a.quote = !0)
                : "em" === i
                ? (a.italic = !0)
                : "quote" === i
                ? (a.quote = !0)
                : "strikethrough" === i
                ? (a.strikethrough = !0)
                : "comment" === i
                ? (a.code = !0)
                : "link" !== i || a.image
                ? "image" === i
                  ? (a.image = !0)
                  : i.match(/^header(-[1-6])?$/) &&
                    (a[i.replace("header", "heading")] = !0)
                : (a.link = !0);
            return a;
          }
          var g = "";
          function v(e) {
            var t = e.codemirror;
            t.setOption("fullScreen", !t.getOption("fullScreen")),
              t.getOption("fullScreen")
                ? ((g = document.body.style.overflow),
                  (document.body.style.overflow = "hidden"))
                : (document.body.style.overflow = g);
            var n = t.getWrapperElement(),
              i = n.nextSibling;
            if (i.classList.contains("editor-preview-active-side"))
              if (!1 === e.options.sideBySideFullscreen) {
                var r = n.parentNode;
                t.getOption("fullScreen")
                  ? r.classList.remove("sided--no-fullscreen")
                  : r.classList.add("sided--no-fullscreen");
              } else q(e);
            (e.options.onToggleFullScreen &&
              e.options.onToggleFullScreen(t.getOption("fullScreen") || !1),
            void 0 !== e.options.maxHeight &&
              (t.getOption("fullScreen")
                ? (t.getScrollerElement().style.removeProperty("height"),
                  i.style.removeProperty("height"))
                : ((t.getScrollerElement().style.height = e.options.maxHeight),
                  e.setPreviewMaxHeight())),
            e.toolbar_div.classList.toggle("fullscreen"),
            e.toolbarElements && e.toolbarElements.fullscreen) &&
              e.toolbarElements.fullscreen.classList.toggle("active");
          }
          function x(e) {
            K(e, "bold", e.options.blockStyles.bold);
          }
          function y(e) {
            K(e, "italic", e.options.blockStyles.italic);
          }
          function b(e) {
            K(e, "strikethrough", "~~");
          }
          function D(e) {
            var t = e.options.blockStyles.code;
            function n(e) {
              if ("object" != typeof e)
                throw (
                  "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " +
                  typeof e +
                  ": " +
                  e
                );
              return (
                e.styles &&
                e.styles[2] &&
                -1 !== e.styles[2].indexOf("formatting-code-block")
              );
            }
            function i(e) {
              return e.state.base.base || e.state.base;
            }
            function r(e, t, r, o, a) {
              (r = r || e.getLineHandle(t)),
                (o = o || e.getTokenAt({ line: t, ch: 1 })),
                (a =
                  a ||
                  (!!r.text &&
                    e.getTokenAt({ line: t, ch: r.text.length - 1 })));
              var l = o.type ? o.type.split(" ") : [];
              return a && i(a).indentedCode
                ? "indented"
                : -1 !== l.indexOf("comment") &&
                    (i(o).fencedChars || i(a).fencedChars || n(r)
                      ? "fenced"
                      : "single");
            }
            var o,
              a,
              l,
              s = e.codemirror,
              u = s.getCursor("start"),
              c = s.getCursor("end"),
              d = s.getTokenAt({ line: u.line, ch: u.ch || 1 }),
              h = s.getLineHandle(u.line),
              f = r(s, u.line, h, d);
            if ("single" === f) {
              var p = h.text.slice(0, u.ch).replace("`", ""),
                m = h.text.slice(u.ch).replace("`", "");
              s.replaceRange(
                p + m,
                { line: u.line, ch: 0 },
                { line: u.line, ch: 99999999999999 }
              ),
                u.ch--,
                u !== c && c.ch--,
                s.setSelection(u, c),
                s.focus();
            } else if ("fenced" === f)
              if (u.line !== c.line || u.ch !== c.ch) {
                for (o = u.line; o >= 0 && !n((h = s.getLineHandle(o))); o--);
                var g,
                  v,
                  x,
                  y,
                  b = i(s.getTokenAt({ line: o, ch: 1 })).fencedChars;
                n(s.getLineHandle(u.line))
                  ? ((g = ""), (v = u.line))
                  : n(s.getLineHandle(u.line - 1))
                  ? ((g = ""), (v = u.line - 1))
                  : ((g = b + "\n"), (v = u.line)),
                  n(s.getLineHandle(c.line))
                    ? ((x = ""), (y = c.line), 0 === c.ch && (y += 1))
                    : 0 !== c.ch && n(s.getLineHandle(c.line + 1))
                    ? ((x = ""), (y = c.line + 1))
                    : ((x = b + "\n"), (y = c.line + 1)),
                  0 === c.ch && (y -= 1),
                  s.operation(function () {
                    s.replaceRange(
                      x,
                      { line: y, ch: 0 },
                      { line: y + (x ? 0 : 1), ch: 0 }
                    ),
                      s.replaceRange(
                        g,
                        { line: v, ch: 0 },
                        { line: v + (g ? 0 : 1), ch: 0 }
                      );
                  }),
                  s.setSelection(
                    { line: v + (g ? 1 : 0), ch: 0 },
                    { line: y + (g ? 1 : -1), ch: 0 }
                  ),
                  s.focus();
              } else {
                var D = u.line;
                if (
                  (n(s.getLineHandle(u.line)) &&
                    ("fenced" === r(s, u.line + 1)
                      ? ((o = u.line), (D = u.line + 1))
                      : ((a = u.line), (D = u.line - 1))),
                  void 0 === o)
                )
                  for (o = D; o >= 0 && !n((h = s.getLineHandle(o))); o--);
                if (void 0 === a)
                  for (
                    l = s.lineCount(), a = D;
                    a < l && !n((h = s.getLineHandle(a)));
                    a++
                  );
                s.operation(function () {
                  s.replaceRange(
                    "",
                    { line: o, ch: 0 },
                    { line: o + 1, ch: 0 }
                  ),
                    s.replaceRange(
                      "",
                      { line: a - 1, ch: 0 },
                      { line: a, ch: 0 }
                    );
                }),
                  s.focus();
              }
            else if ("indented" === f) {
              if (u.line !== c.line || u.ch !== c.ch)
                (o = u.line), (a = c.line), 0 === c.ch && a--;
              else {
                for (o = u.line; o >= 0; o--)
                  if (
                    !(h = s.getLineHandle(o)).text.match(/^\s*$/) &&
                    "indented" !== r(s, o, h)
                  ) {
                    o += 1;
                    break;
                  }
                for (l = s.lineCount(), a = u.line; a < l; a++)
                  if (
                    !(h = s.getLineHandle(a)).text.match(/^\s*$/) &&
                    "indented" !== r(s, a, h)
                  ) {
                    a -= 1;
                    break;
                  }
              }
              var C = s.getLineHandle(a + 1),
                w = C && s.getTokenAt({ line: a + 1, ch: C.text.length - 1 });
              w &&
                i(w).indentedCode &&
                s.replaceRange("\n", { line: a + 1, ch: 0 });
              for (var k = o; k <= a; k++) s.indentLine(k, "subtract");
              s.focus();
            } else {
              var S = u.line === c.line && u.ch === c.ch && 0 === u.ch,
                F = u.line !== c.line;
              S || F
                ? (function (e, t, n, i) {
                    var r = t.line + 1,
                      o = n.line + 1,
                      a = t.line !== n.line,
                      l = i + "\n",
                      s = "\n" + i;
                    a && o++,
                      a && 0 === n.ch && ((s = i + "\n"), o--),
                      $(e, !1, [l, s]),
                      e.setSelection({ line: r, ch: 0 }, { line: o, ch: 0 });
                  })(s, u, c, t)
                : $(s, !1, ["`", "`"]);
            }
          }
          function C(e) {
            V(e.codemirror, "quote");
          }
          function w(e) {
            G(e.codemirror, "smaller");
          }
          function k(e) {
            G(e.codemirror, "bigger");
          }
          function S(e) {
            G(e.codemirror, void 0, 1);
          }
          function F(e) {
            G(e.codemirror, void 0, 2);
          }
          function A(e) {
            G(e.codemirror, void 0, 3);
          }
          function E(e) {
            G(e.codemirror, void 0, 4);
          }
          function L(e) {
            G(e.codemirror, void 0, 5);
          }
          function T(e) {
            G(e.codemirror, void 0, 6);
          }
          function M(e) {
            var t = e.codemirror,
              n = "*";
            ["-", "+", "*"].includes(e.options.unorderedListStyle) &&
              (n = e.options.unorderedListStyle),
              V(t, "unordered-list", n);
          }
          function B(e) {
            V(e.codemirror, "ordered-list");
          }
          function N(e) {
            !(function (e) {
              if (
                e
                  .getWrapperElement()
                  .lastChild.classList.contains("editor-preview-active")
              )
                return;
              for (
                var t,
                  n = e.getCursor("start"),
                  i = e.getCursor("end"),
                  r = n.line;
                r <= i.line;
                r++
              )
                (t = (t = e.getLine(r)).replace(
                  /^[ ]*([# ]+|\*|-|[> ]+|[0-9]+(.|\)))[ ]*/,
                  ""
                )),
                  e.replaceRange(
                    t,
                    { line: r, ch: 0 },
                    { line: r, ch: 99999999999999 }
                  );
            })(e.codemirror);
          }
          function O(e) {
            var t = e.options,
              n = "https://";
            if (t.promptURLs) {
              var i = prompt(t.promptTexts.link, n);
              if (!i) return !1;
              n = z(i);
            }
            X(e, "link", t.insertTexts.link, n);
          }
          function I(e) {
            var t = e.options,
              n = "https://";
            if (t.promptURLs) {
              var i = prompt(t.promptTexts.image, n);
              if (!i) return !1;
              n = z(i);
            }
            X(e, "image", t.insertTexts.image, n);
          }
          function z(e) {
            return encodeURI(e).replace(/([\\()])/g, "\\$1");
          }
          function H(e) {
            e.openBrowseFileWindow();
          }
          function R(e, t) {
            var n = e.codemirror,
              i = m(n),
              r = e.options,
              o = t.substr(t.lastIndexOf("/") + 1),
              a = o
                .substring(o.lastIndexOf(".") + 1)
                .replace(/\?.*$/, "")
                .toLowerCase();
            if (
              [
                "png",
                "jpg",
                "jpeg",
                "gif",
                "svg",
                "apng",
                "avif",
                "webp",
              ].includes(a)
            )
              $(n, i.image, r.insertTexts.uploadedImage, t);
            else {
              var l = r.insertTexts.link;
              (l[0] = "[" + o), $(n, i.link, l, t);
            }
            e.updateStatusBar(
              "upload-image",
              e.options.imageTexts.sbOnUploaded.replace("#image_name#", o)
            ),
              setTimeout(function () {
                e.updateStatusBar("upload-image", e.options.imageTexts.sbInit);
              }, 1e3);
          }
          function P(e) {
            var t = e.codemirror,
              n = m(t),
              i = e.options;
            $(t, n.table, i.insertTexts.table);
          }
          function _(e) {
            var t = e.codemirror,
              n = m(t),
              i = e.options;
            $(t, n.image, i.insertTexts.horizontalRule);
          }
          function W(e) {
            var t = e.codemirror;
            t.undo(), t.focus();
          }
          function j(e) {
            var t = e.codemirror;
            t.redo(), t.focus();
          }
          function q(e) {
            var t = e.codemirror,
              n = t.getWrapperElement(),
              i = n.nextSibling,
              r = e.toolbarElements && e.toolbarElements["side-by-side"],
              o = !1,
              a = n.parentNode;
            i.classList.contains("editor-preview-active-side")
              ? (!1 === e.options.sideBySideFullscreen &&
                  a.classList.remove("sided--no-fullscreen"),
                i.classList.remove("editor-preview-active-side"),
                r && r.classList.remove("active"),
                n.classList.remove("CodeMirror-sided"))
              : (setTimeout(function () {
                  t.getOption("fullScreen") ||
                    (!1 === e.options.sideBySideFullscreen
                      ? a.classList.add("sided--no-fullscreen")
                      : v(e)),
                    i.classList.add("editor-preview-active-side");
                }, 1),
                r && r.classList.add("active"),
                n.classList.add("CodeMirror-sided"),
                (o = !0));
            var l = n.lastChild;
            if (l.classList.contains("editor-preview-active")) {
              l.classList.remove("editor-preview-active");
              var s = e.toolbarElements.preview,
                u = e.toolbar_div;
              s.classList.remove("active"),
                u.classList.remove("disabled-for-preview");
            }
            if (
              (t.sideBySideRenderingFunction ||
                (t.sideBySideRenderingFunction = function () {
                  var t = e.options.previewRender(e.value(), i);
                  null != t && (i.innerHTML = t);
                }),
              o)
            ) {
              var c = e.options.previewRender(e.value(), i);
              null != c && (i.innerHTML = c),
                t.on("update", t.sideBySideRenderingFunction);
            } else t.off("update", t.sideBySideRenderingFunction);
            t.refresh();
          }
          function U(e) {
            var t = e.codemirror,
              n = t.getWrapperElement(),
              i = e.toolbar_div,
              r = !!e.options.toolbar && e.toolbarElements.preview,
              o = n.lastChild;
            if (
              (t
                .getWrapperElement()
                .nextSibling.classList.contains("editor-preview-active-side") &&
                q(e),
              !o || !o.classList.contains("editor-preview-full"))
            ) {
              if (
                (((o = document.createElement("div")).className =
                  "editor-preview-full"),
                e.options.previewClass)
              )
                if (Array.isArray(e.options.previewClass))
                  for (var a = 0; a < e.options.previewClass.length; a++)
                    o.classList.add(e.options.previewClass[a]);
                else
                  "string" == typeof e.options.previewClass &&
                    o.classList.add(e.options.previewClass);
              n.appendChild(o);
            }
            o.classList.contains("editor-preview-active")
              ? (o.classList.remove("editor-preview-active"),
                r &&
                  (r.classList.remove("active"),
                  i.classList.remove("disabled-for-preview")))
              : (setTimeout(function () {
                  o.classList.add("editor-preview-active");
                }, 1),
                r &&
                  (r.classList.add("active"),
                  i.classList.add("disabled-for-preview")));
            var l = e.options.previewRender(e.value(), o);
            null !== l && (o.innerHTML = l);
          }
          function $(e, t, n, i) {
            if (
              !e
                .getWrapperElement()
                .lastChild.classList.contains("editor-preview-active")
            ) {
              var r,
                o = n[0],
                a = n[1],
                l = {},
                s = {};
              Object.assign(l, e.getCursor("start")),
                Object.assign(s, e.getCursor("end")),
                i && ((o = o.replace("#url#", i)), (a = a.replace("#url#", i))),
                t
                  ? ((o = (r = e.getLine(l.line)).slice(0, l.ch)),
                    (a = r.slice(l.ch)),
                    e.replaceRange(o + a, { line: l.line, ch: 0 }))
                  : ((r = e.getSelection()),
                    e.replaceSelection(o + r + a),
                    (l.ch += o.length),
                    l !== s && (s.ch += o.length)),
                e.setSelection(l, s),
                e.focus();
            }
          }
          function G(e, t, n) {
            if (
              !e
                .getWrapperElement()
                .lastChild.classList.contains("editor-preview-active")
            ) {
              for (
                var i = e.getCursor("start"),
                  r = e.getCursor("end"),
                  o = i.line;
                o <= r.line;
                o++
              )
                !(function (i) {
                  var r = e.getLine(i),
                    o = r.search(/[^#]/);
                  (r =
                    void 0 !== t
                      ? o <= 0
                        ? "bigger" == t
                          ? "###### " + r
                          : "# " + r
                        : 6 == o && "smaller" == t
                        ? r.substr(7)
                        : 1 == o && "bigger" == t
                        ? r.substr(2)
                        : "bigger" == t
                        ? r.substr(1)
                        : "#" + r
                      : o <= 0
                      ? "#".repeat(n) + " " + r
                      : o == n
                      ? r.substr(o + 1)
                      : "#".repeat(n) + " " + r.substr(o + 1)),
                    e.replaceRange(
                      r,
                      { line: i, ch: 0 },
                      { line: i, ch: 99999999999999 }
                    );
                })(o);
              e.focus();
            }
          }
          function V(e, t, n) {
            if (
              !e
                .getWrapperElement()
                .lastChild.classList.contains("editor-preview-active")
            ) {
              for (
                var i = /^(\s*)(\*|-|\+|\d*\.)(\s+)/,
                  r = /^\s*/,
                  o = m(e),
                  a = e.getCursor("start"),
                  l = e.getCursor("end"),
                  s = {
                    quote: /^(\s*)>\s+/,
                    "unordered-list": i,
                    "ordered-list": i,
                  },
                  u = function (e, t, o) {
                    var a = i.exec(t),
                      l = (function (e, t) {
                        return {
                          quote: ">",
                          "unordered-list": n,
                          "ordered-list": "%%i.",
                        }[e].replace("%%i", t);
                      })(e, c);
                    return (
                      null !== a
                        ? ((function (e, t) {
                            var i = new RegExp(
                              {
                                quote: ">",
                                "unordered-list": "\\" + n,
                                "ordered-list": "\\d+.",
                              }[e]
                            );
                            return t && i.test(t);
                          })(e, a[2]) && (l = ""),
                          (t =
                            a[1] +
                            l +
                            a[3] +
                            t.replace(r, "").replace(s[e], "$1")))
                        : 0 == o && (t = l + " " + t),
                      t
                    );
                  },
                  c = 1,
                  d = a.line;
                d <= l.line;
                d++
              )
                !(function (n) {
                  var i = e.getLine(n);
                  o[t]
                    ? (i = i.replace(s[t], "$1"))
                    : ("unordered-list" == t && (i = u("ordered-list", i, !0)),
                      (i = u(t, i, !1)),
                      (c += 1)),
                    e.replaceRange(
                      i,
                      { line: n, ch: 0 },
                      { line: n, ch: 99999999999999 }
                    );
                })(d);
              e.focus();
            }
          }
          function X(e, t, n, i) {
            if (e.codemirror && !e.isPreviewActive()) {
              var r = e.codemirror,
                o = m(r)[t];
              if (o) {
                var a = r.getCursor("start"),
                  l = r.getCursor("end"),
                  s = r.getLine(a.line),
                  u = s.slice(0, a.ch),
                  c = s.slice(a.ch);
                "link" == t
                  ? (u = u.replace(/(.*)[^!]\[/, "$1"))
                  : "image" == t && (u = u.replace(/(.*)!\[$/, "$1")),
                  (c = c.replace(/]\(.*?\)/, "")),
                  r.replaceRange(
                    u + c,
                    { line: a.line, ch: 0 },
                    { line: a.line, ch: 99999999999999 }
                  ),
                  (a.ch -= n[0].length),
                  a !== l && (l.ch -= n[0].length),
                  r.setSelection(a, l),
                  r.focus();
              } else $(r, o, n, i);
            }
          }
          function K(e, t, n, i) {
            if (e.codemirror && !e.isPreviewActive()) {
              i = void 0 === i ? n : i;
              var r,
                o = e.codemirror,
                a = m(o),
                l = n,
                s = i,
                u = o.getCursor("start"),
                c = o.getCursor("end");
              a[t]
                ? ((l = (r = o.getLine(u.line)).slice(0, u.ch)),
                  (s = r.slice(u.ch)),
                  "bold" == t
                    ? ((l = l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "")),
                      (s = s.replace(/(\*\*|__)/, "")))
                    : "italic" == t
                    ? ((l = l.replace(/(\*|_)(?![\s\S]*(\*|_))/, "")),
                      (s = s.replace(/(\*|_)/, "")))
                    : "strikethrough" == t &&
                      ((l = l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "")),
                      (s = s.replace(/(\*\*|~~)/, ""))),
                  o.replaceRange(
                    l + s,
                    { line: u.line, ch: 0 },
                    { line: u.line, ch: 99999999999999 }
                  ),
                  "bold" == t || "strikethrough" == t
                    ? ((u.ch -= 2), u !== c && (c.ch -= 2))
                    : "italic" == t && ((u.ch -= 1), u !== c && (c.ch -= 1)))
                : ((r = o.getSelection()),
                  "bold" == t
                    ? (r = (r = r.split("**").join("")).split("__").join(""))
                    : "italic" == t
                    ? (r = (r = r.split("*").join("")).split("_").join(""))
                    : "strikethrough" == t && (r = r.split("~~").join("")),
                  o.replaceSelection(l + r + s),
                  (u.ch += n.length),
                  (c.ch = u.ch + r.length)),
                o.setSelection(u, c),
                o.focus();
            }
          }
          function Z(e, t) {
            if (Math.abs(e) < 1024) return "" + e + t[0];
            var n = 0;
            do {
              (e /= 1024), ++n;
            } while (Math.abs(e) >= 1024 && n < t.length);
            return "" + e.toFixed(1) + t[n];
          }
          function Y(e, t) {
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) &&
                (t[n] instanceof Array
                  ? (e[n] = t[n].concat(e[n] instanceof Array ? e[n] : []))
                  : null !== t[n] &&
                    "object" == typeof t[n] &&
                    t[n].constructor === Object
                  ? (e[n] = Y(e[n] || {}, t[n]))
                  : (e[n] = t[n]));
            return e;
          }
          function Q(e) {
            for (var t = 1; t < arguments.length; t++) e = Y(e, arguments[t]);
            return e;
          }
          function J(e) {
            var t = e.match(
                /[a-zA-Z0-9_\u00A0-\u02AF\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
              ),
              n = 0;
            if (null === t) return n;
            for (var i = 0; i < t.length; i++)
              t[i].charCodeAt(0) >= 19968 ? (n += t[i].length) : (n += 1);
            return n;
          }
          var ee = {
              bold: "fa fa-bold",
              italic: "fa fa-italic",
              strikethrough: "fa fa-strikethrough",
              heading: "fa fa-header fa-heading",
              "heading-smaller": "fa fa-header fa-heading header-smaller",
              "heading-bigger": "fa fa-header fa-heading header-bigger",
              "heading-1": "fa fa-header fa-heading header-1",
              "heading-2": "fa fa-header fa-heading header-2",
              "heading-3": "fa fa-header fa-heading header-3",
              code: "fa fa-code",
              quote: "fa fa-quote-left",
              "ordered-list": "fa fa-list-ol",
              "unordered-list": "fa fa-list-ul",
              "clean-block": "fa fa-eraser",
              link: "fa fa-link",
              image: "fa fa-image",
              "upload-image": "fa fa-image",
              table: "fa fa-table",
              "horizontal-rule": "fa fa-minus",
              preview: "fa fa-eye",
              "side-by-side": "fa fa-columns",
              fullscreen: "fa fa-arrows-alt",
              guide: "fa fa-question-circle",
              undo: "fa fa-undo",
              redo: "fa fa-repeat fa-redo",
            },
            te = {
              bold: {
                name: "bold",
                action: x,
                className: ee.bold,
                title: "Bold",
                default: !0,
              },
              italic: {
                name: "italic",
                action: y,
                className: ee.italic,
                title: "Italic",
                default: !0,
              },
              strikethrough: {
                name: "strikethrough",
                action: b,
                className: ee.strikethrough,
                title: "Strikethrough",
              },
              heading: {
                name: "heading",
                action: w,
                className: ee.heading,
                title: "Heading",
                default: !0,
              },
              "heading-smaller": {
                name: "heading-smaller",
                action: w,
                className: ee["heading-smaller"],
                title: "Smaller Heading",
              },
              "heading-bigger": {
                name: "heading-bigger",
                action: k,
                className: ee["heading-bigger"],
                title: "Bigger Heading",
              },
              "heading-1": {
                name: "heading-1",
                action: S,
                className: ee["heading-1"],
                title: "Big Heading",
              },
              "heading-2": {
                name: "heading-2",
                action: F,
                className: ee["heading-2"],
                title: "Medium Heading",
              },
              "heading-3": {
                name: "heading-3",
                action: A,
                className: ee["heading-3"],
                title: "Small Heading",
              },
              "separator-1": { name: "separator-1" },
              code: {
                name: "code",
                action: D,
                className: ee.code,
                title: "Code",
              },
              quote: {
                name: "quote",
                action: C,
                className: ee.quote,
                title: "Quote",
                default: !0,
              },
              "unordered-list": {
                name: "unordered-list",
                action: M,
                className: ee["unordered-list"],
                title: "Generic List",
                default: !0,
              },
              "ordered-list": {
                name: "ordered-list",
                action: B,
                className: ee["ordered-list"],
                title: "Numbered List",
                default: !0,
              },
              "clean-block": {
                name: "clean-block",
                action: N,
                className: ee["clean-block"],
                title: "Clean block",
              },
              "separator-2": { name: "separator-2" },
              link: {
                name: "link",
                action: O,
                className: ee.link,
                title: "Create Link",
                default: !0,
              },
              image: {
                name: "image",
                action: I,
                className: ee.image,
                title: "Insert Image",
                default: !0,
              },
              "upload-image": {
                name: "upload-image",
                action: H,
                className: ee["upload-image"],
                title: "Import an image",
              },
              table: {
                name: "table",
                action: P,
                className: ee.table,
                title: "Insert Table",
              },
              "horizontal-rule": {
                name: "horizontal-rule",
                action: _,
                className: ee["horizontal-rule"],
                title: "Insert Horizontal Line",
              },
              "separator-3": { name: "separator-3" },
              preview: {
                name: "preview",
                action: U,
                className: ee.preview,
                noDisable: !0,
                title: "Toggle Preview",
                default: !0,
              },
              "side-by-side": {
                name: "side-by-side",
                action: q,
                className: ee["side-by-side"],
                noDisable: !0,
                noMobile: !0,
                title: "Toggle Side by Side",
                default: !0,
              },
              fullscreen: {
                name: "fullscreen",
                action: v,
                className: ee.fullscreen,
                noDisable: !0,
                noMobile: !0,
                title: "Toggle Fullscreen",
                default: !0,
              },
              "separator-4": { name: "separator-4" },
              guide: {
                name: "guide",
                action: "https://www.markdownguide.org/basic-syntax/",
                className: ee.guide,
                noDisable: !0,
                title: "Markdown Guide",
                default: !0,
              },
              "separator-5": { name: "separator-5" },
              undo: {
                name: "undo",
                action: W,
                className: ee.undo,
                noDisable: !0,
                title: "Undo",
              },
              redo: {
                name: "redo",
                action: j,
                className: ee.redo,
                noDisable: !0,
                title: "Redo",
              },
            },
            ne = {
              link: ["[", "](#url#)"],
              image: ["![", "](#url#)"],
              uploadedImage: ["![](#url#)", ""],
              table: [
                "",
                "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n",
              ],
              horizontalRule: ["", "\n\n-----\n\n"],
            },
            ie = { link: "URL for the link:", image: "URL of the image:" },
            re = {
              locale: "en-US",
              format: { hour: "2-digit", minute: "2-digit" },
            },
            oe = { bold: "**", code: "```", italic: "*" },
            ae = {
              sbInit:
                "Attach files by drag and dropping or pasting from clipboard.",
              sbOnDragEnter: "Drop image to upload it.",
              sbOnDrop: "Uploading image #images_names#...",
              sbProgress: "Uploading #file_name#: #progress#%",
              sbOnUploaded: "Uploaded #image_name#",
              sizeUnits: " B, KB, MB",
            },
            le = {
              noFileGiven: "You must select a file.",
              typeNotAllowed: "This image type is not allowed.",
              fileTooLarge:
                "Image #image_name# is too big (#image_size#).\nMaximum file size is #image_max_size#.",
              importError:
                "Something went wrong when uploading the image #image_name#.",
            };
          function se(e) {
            (e = e || {}).parent = this;
            var t = !0;
            if (
              (!1 === e.autoDownloadFontAwesome && (t = !1),
              !0 !== e.autoDownloadFontAwesome)
            )
              for (var n = document.styleSheets, i = 0; i < n.length; i++)
                n[i].href &&
                  n[i].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") >
                    -1 &&
                  (t = !1);
            if (t) {
              var r = document.createElement("link");
              (r.rel = "stylesheet"),
                (r.href =
                  "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"),
                document.getElementsByTagName("head")[0].appendChild(r);
            }
            if (e.element) this.element = e.element;
            else if (null === e.element)
              return void console.log("EasyMDE: Error. No element was found.");
            if (void 0 === e.toolbar)
              for (var o in ((e.toolbar = []), te))
                Object.prototype.hasOwnProperty.call(te, o) &&
                  (-1 != o.indexOf("separator-") && e.toolbar.push("|"),
                  (!0 === te[o].default ||
                    (e.showIcons &&
                      e.showIcons.constructor === Array &&
                      -1 != e.showIcons.indexOf(o))) &&
                    e.toolbar.push(o));
            if (
              (Object.prototype.hasOwnProperty.call(e, "previewClass") ||
                (e.previewClass = "editor-preview"),
              Object.prototype.hasOwnProperty.call(e, "status") ||
                ((e.status = ["autosave", "lines", "words", "cursor"]),
                e.uploadImage && e.status.unshift("upload-image")),
              e.previewRender ||
                (e.previewRender = function (e) {
                  return this.parent.markdown(e);
                }),
              (e.parsingConfig = Q(
                { highlightFormatting: !0 },
                e.parsingConfig || {}
              )),
              (e.insertTexts = Q({}, ne, e.insertTexts || {})),
              (e.promptTexts = Q({}, ie, e.promptTexts || {})),
              (e.blockStyles = Q({}, oe, e.blockStyles || {})),
              null != e.autosave &&
                (e.autosave.timeFormat = Q(
                  {},
                  re,
                  e.autosave.timeFormat || {}
                )),
              (e.iconClassMap = Q({}, ee, e.iconClassMap || {})),
              (e.shortcuts = Q({}, u, e.shortcuts || {})),
              (e.maxHeight = e.maxHeight || void 0),
              (e.direction = e.direction || "ltr"),
              void 0 !== e.maxHeight
                ? (e.minHeight = e.maxHeight)
                : (e.minHeight = e.minHeight || "300px"),
              (e.errorCallback =
                e.errorCallback ||
                function (e) {
                  alert(e);
                }),
              (e.uploadImage = e.uploadImage || !1),
              (e.imageMaxSize = e.imageMaxSize || 2097152),
              (e.imageAccept =
                e.imageAccept ||
                "image/png, image/jpeg, image/gif, image/avif"),
              (e.imageTexts = Q({}, ae, e.imageTexts || {})),
              (e.errorMessages = Q({}, le, e.errorMessages || {})),
              (e.imagePathAbsolute = e.imagePathAbsolute || !1),
              (e.imageCSRFName = e.imageCSRFName || "csrfmiddlewaretoken"),
              (e.imageCSRFHeader = e.imageCSRFHeader || !1),
              null != e.autosave &&
                null != e.autosave.unique_id &&
                "" != e.autosave.unique_id &&
                (e.autosave.uniqueId = e.autosave.unique_id),
              e.overlayMode &&
                void 0 === e.overlayMode.combine &&
                (e.overlayMode.combine = !0),
              (this.options = e),
              this.render(),
              !e.initialValue ||
                (this.options.autosave &&
                  !0 === this.options.autosave.foundSavedValue) ||
                this.value(e.initialValue),
              e.uploadImage)
            ) {
              var a = this;
              this.codemirror.on("dragenter", function (e, t) {
                a.updateStatusBar(
                  "upload-image",
                  a.options.imageTexts.sbOnDragEnter
                ),
                  t.stopPropagation(),
                  t.preventDefault();
              }),
                this.codemirror.on("dragend", function (e, t) {
                  a.updateStatusBar(
                    "upload-image",
                    a.options.imageTexts.sbInit
                  ),
                    t.stopPropagation(),
                    t.preventDefault();
                }),
                this.codemirror.on("dragleave", function (e, t) {
                  a.updateStatusBar(
                    "upload-image",
                    a.options.imageTexts.sbInit
                  ),
                    t.stopPropagation(),
                    t.preventDefault();
                }),
                this.codemirror.on("dragover", function (e, t) {
                  a.updateStatusBar(
                    "upload-image",
                    a.options.imageTexts.sbOnDragEnter
                  ),
                    t.stopPropagation(),
                    t.preventDefault();
                }),
                this.codemirror.on("drop", function (t, n) {
                  n.stopPropagation(),
                    n.preventDefault(),
                    e.imageUploadFunction
                      ? a.uploadImagesUsingCustomFunction(
                          e.imageUploadFunction,
                          n.dataTransfer.files
                        )
                      : a.uploadImages(n.dataTransfer.files);
                }),
                this.codemirror.on("paste", function (t, n) {
                  e.imageUploadFunction
                    ? a.uploadImagesUsingCustomFunction(
                        e.imageUploadFunction,
                        n.clipboardData.files
                      )
                    : a.uploadImages(n.clipboardData.files);
                });
            }
          }
          function ue() {
            if ("object" != typeof localStorage) return !1;
            try {
              localStorage.setItem("smde_localStorage", 1),
                localStorage.removeItem("smde_localStorage");
            } catch (e) {
              return !1;
            }
            return !0;
          }
          (se.prototype.uploadImages = function (e, t, n) {
            if (0 !== e.length) {
              for (var i = [], r = 0; r < e.length; r++)
                i.push(e[r].name), this.uploadImage(e[r], t, n);
              this.updateStatusBar(
                "upload-image",
                this.options.imageTexts.sbOnDrop.replace(
                  "#images_names#",
                  i.join(", ")
                )
              );
            }
          }),
            (se.prototype.uploadImagesUsingCustomFunction = function (e, t) {
              if (0 !== t.length) {
                for (var n = [], i = 0; i < t.length; i++)
                  n.push(t[i].name),
                    this.uploadImageUsingCustomFunction(e, t[i]);
                this.updateStatusBar(
                  "upload-image",
                  this.options.imageTexts.sbOnDrop.replace(
                    "#images_names#",
                    n.join(", ")
                  )
                );
              }
            }),
            (se.prototype.updateStatusBar = function (e, t) {
              if (this.gui.statusbar) {
                var n = this.gui.statusbar.getElementsByClassName(e);
                1 === n.length
                  ? (this.gui.statusbar.getElementsByClassName(
                      e
                    )[0].textContent = t)
                  : 0 === n.length
                  ? console.log(
                      "EasyMDE: status bar item " + e + " was not found."
                    )
                  : console.log(
                      "EasyMDE: Several status bar items named " +
                        e +
                        " was found."
                    );
              }
            }),
            (se.prototype.markdown = function (e) {
              if (o) {
                var t;
                if (
                  ((t =
                    this.options &&
                    this.options.renderingConfig &&
                    this.options.renderingConfig.markedOptions
                      ? this.options.renderingConfig.markedOptions
                      : {}),
                  this.options &&
                  this.options.renderingConfig &&
                  !1 === this.options.renderingConfig.singleLineBreaks
                    ? (t.breaks = !1)
                    : (t.breaks = !0),
                  this.options &&
                    this.options.renderingConfig &&
                    !0 === this.options.renderingConfig.codeSyntaxHighlighting)
                ) {
                  var n = this.options.renderingConfig.hljs || window.hljs;
                  n &&
                    (t.highlight = function (e, t) {
                      return t && n.getLanguage(t)
                        ? n.highlight(t, e).value
                        : n.highlightAuto(e).value;
                    });
                }
                o.setOptions(t);
                var i = o.parse(e);
                return (
                  this.options.renderingConfig &&
                    "function" ==
                      typeof this.options.renderingConfig.sanitizerFunction &&
                    (i = this.options.renderingConfig.sanitizerFunction.call(
                      this,
                      i
                    )),
                  (i = (function (e) {
                    for (
                      var t = new DOMParser().parseFromString(e, "text/html"),
                        n = t.getElementsByTagName("li"),
                        i = 0;
                      i < n.length;
                      i++
                    )
                      for (var r = n[i], o = 0; o < r.children.length; o++) {
                        var a = r.children[o];
                        a instanceof HTMLInputElement &&
                          "checkbox" === a.type &&
                          ((r.style.marginLeft = "-1.5em"),
                          (r.style.listStyleType = "none"));
                      }
                    return t.documentElement.innerHTML;
                  })(
                    (i = (function (e) {
                      for (var t; null !== (t = l.exec(e)); ) {
                        var n = t[0];
                        if (-1 === n.indexOf("target=")) {
                          var i = n.replace(/>$/, ' target="_blank">');
                          e = e.replace(n, i);
                        }
                      }
                      return e;
                    })(i))
                  ))
                );
              }
            }),
            (se.prototype.render = function (e) {
              if (
                (e ||
                  (e =
                    this.element ||
                    document.getElementsByTagName("textarea")[0]),
                !this._rendered || this._rendered !== e)
              ) {
                this.element = e;
                var t,
                  n,
                  o = this.options,
                  a = this,
                  l = {};
                for (var u in o.shortcuts)
                  null !== o.shortcuts[u] &&
                    null !== s[u] &&
                    (function (e) {
                      l[d(o.shortcuts[e])] = function () {
                        var t = s[e];
                        "function" == typeof t
                          ? t(a)
                          : "string" == typeof t && window.open(t, "_blank");
                      };
                    })(u);
                if (
                  ((l.Enter = "newlineAndIndentContinueMarkdownList"),
                  (l.Tab = "tabAndIndentMarkdownList"),
                  (l["Shift-Tab"] = "shiftTabAndUnindentMarkdownList"),
                  (l.Esc = function (e) {
                    e.getOption("fullScreen") && v(a);
                  }),
                  (this.documentOnKeyDown = function (e) {
                    27 == (e = e || window.event).keyCode &&
                      a.codemirror.getOption("fullScreen") &&
                      v(a);
                  }),
                  document.addEventListener(
                    "keydown",
                    this.documentOnKeyDown,
                    !1
                  ),
                  o.overlayMode
                    ? (i.defineMode("overlay-mode", function (e) {
                        return i.overlayMode(
                          i.getMode(
                            e,
                            !1 !== o.spellChecker ? "spell-checker" : "gfm"
                          ),
                          o.overlayMode.mode,
                          o.overlayMode.combine
                        );
                      }),
                      (t = "overlay-mode"),
                      ((n = o.parsingConfig).gitHubSpice = !1))
                    : (((t = o.parsingConfig).name = "gfm"),
                      (t.gitHubSpice = !1)),
                  !1 !== o.spellChecker &&
                    ((t = "spell-checker"),
                    ((n = o.parsingConfig).name = "gfm"),
                    (n.gitHubSpice = !1),
                    "function" == typeof o.spellChecker
                      ? o.spellChecker({ codeMirrorInstance: i })
                      : r({ codeMirrorInstance: i })),
                  (this.codemirror = i.fromTextArea(e, {
                    mode: t,
                    backdrop: n,
                    theme: null != o.theme ? o.theme : "easymde",
                    tabSize: null != o.tabSize ? o.tabSize : 2,
                    indentUnit: null != o.tabSize ? o.tabSize : 2,
                    indentWithTabs: !1 !== o.indentWithTabs,
                    lineNumbers: !0 === o.lineNumbers,
                    autofocus: !0 === o.autofocus,
                    extraKeys: l,
                    direction: o.direction,
                    lineWrapping: !1 !== o.lineWrapping,
                    allowDropFileTypes: ["text/plain"],
                    placeholder:
                      o.placeholder || e.getAttribute("placeholder") || "",
                    styleSelectedText:
                      null != o.styleSelectedText ? o.styleSelectedText : !c(),
                    scrollbarStyle:
                      null != o.scrollbarStyle ? o.scrollbarStyle : "native",
                    configureMouse: function (e, t, n) {
                      return { addNew: !1 };
                    },
                    inputStyle:
                      null != o.inputStyle
                        ? o.inputStyle
                        : c()
                        ? "contenteditable"
                        : "textarea",
                    spellcheck:
                      null == o.nativeSpellcheck || o.nativeSpellcheck,
                    autoRefresh: null != o.autoRefresh && o.autoRefresh,
                  })),
                  (this.codemirror.getScrollerElement().style.minHeight =
                    o.minHeight),
                  void 0 !== o.maxHeight &&
                    (this.codemirror.getScrollerElement().style.height =
                      o.maxHeight),
                  !0 === o.forceSync)
                ) {
                  var h = this.codemirror;
                  h.on("change", function () {
                    h.save();
                  });
                }
                this.gui = {};
                var f = document.createElement("div");
                f.classList.add("EasyMDEContainer"),
                  f.setAttribute("role", "application");
                var p = this.codemirror.getWrapperElement();
                p.parentNode.insertBefore(f, p),
                  f.appendChild(p),
                  !1 !== o.toolbar && (this.gui.toolbar = this.createToolbar()),
                  !1 !== o.status &&
                    (this.gui.statusbar = this.createStatusbar()),
                  null != o.autosave &&
                    !0 === o.autosave.enabled &&
                    (this.autosave(),
                    this.codemirror.on("change", function () {
                      clearTimeout(a._autosave_timeout),
                        (a._autosave_timeout = setTimeout(function () {
                          a.autosave();
                        }, a.options.autosave.submit_delay ||
                          a.options.autosave.delay ||
                          1e3));
                    }));
                var m = this;
                this.codemirror.on("update", function () {
                  o.previewImagesInEditor &&
                    f
                      .querySelectorAll(".cm-image-marker")
                      .forEach(function (e) {
                        var t = e.parentElement;
                        if (
                          t.innerText.match(/^!\[.*?\]\(.*\)/g) &&
                          !t.hasAttribute("data-img-src")
                        ) {
                          var n = t.innerText.match("\\((.*)\\)");
                          if (
                            (window.EMDEimagesCache ||
                              (window.EMDEimagesCache = {}),
                            n && n.length >= 2)
                          ) {
                            var i = n[1];
                            if (o.imagesPreviewHandler) {
                              var r = o.imagesPreviewHandler(n[1]);
                              "string" == typeof r && (i = r);
                            }
                            if (window.EMDEimagesCache[i])
                              x(t, window.EMDEimagesCache[i]);
                            else {
                              var a = document.createElement("img");
                              (a.onload = function () {
                                (window.EMDEimagesCache[i] = {
                                  naturalWidth: a.naturalWidth,
                                  naturalHeight: a.naturalHeight,
                                  url: i,
                                }),
                                  x(t, window.EMDEimagesCache[i]);
                              }),
                                (a.src = i);
                            }
                          }
                        }
                      });
                }),
                  (this.gui.sideBySide = this.createSideBySide()),
                  (this._rendered = this.element),
                  (!0 === o.autofocus || e.autofocus) &&
                    this.codemirror.focus();
                var g = this.codemirror;
                setTimeout(
                  function () {
                    g.refresh();
                  }.bind(g),
                  0
                );
              }
              function x(e, t) {
                var n, i;
                e.setAttribute("data-img-src", t.url),
                  e.setAttribute(
                    "style",
                    "--bg-image:url(" +
                      t.url +
                      ");--width:" +
                      t.naturalWidth +
                      "px;--height:" +
                      ((n = t.naturalWidth),
                      (i = t.naturalHeight),
                      n <
                      window
                        .getComputedStyle(
                          document.querySelector(".CodeMirror-sizer")
                        )
                        .width.replace("px", "")
                        ? i + "px"
                        : (i / n) * 100 + "%")
                  ),
                  m.codemirror.setSize();
              }
            }),
            (se.prototype.cleanup = function () {
              document.removeEventListener("keydown", this.documentOnKeyDown);
            }),
            (se.prototype.autosave = function () {
              if (ue()) {
                var e = this;
                if (
                  null == this.options.autosave.uniqueId ||
                  "" == this.options.autosave.uniqueId
                )
                  return void console.log(
                    "EasyMDE: You must set a uniqueId to use the autosave feature"
                  );
                !0 !== this.options.autosave.binded &&
                  (null != e.element.form &&
                    null != e.element.form &&
                    e.element.form.addEventListener("submit", function () {
                      clearTimeout(e.autosaveTimeoutId),
                        (e.autosaveTimeoutId = void 0),
                        localStorage.removeItem(
                          "smde_" + e.options.autosave.uniqueId
                        );
                    }),
                  (this.options.autosave.binded = !0)),
                  !0 !== this.options.autosave.loaded &&
                    ("string" ==
                      typeof localStorage.getItem(
                        "smde_" + this.options.autosave.uniqueId
                      ) &&
                      "" !=
                        localStorage.getItem(
                          "smde_" + this.options.autosave.uniqueId
                        ) &&
                      (this.codemirror.setValue(
                        localStorage.getItem(
                          "smde_" + this.options.autosave.uniqueId
                        )
                      ),
                      (this.options.autosave.foundSavedValue = !0)),
                    (this.options.autosave.loaded = !0));
                var t = e.value();
                "" !== t
                  ? localStorage.setItem(
                      "smde_" + this.options.autosave.uniqueId,
                      t
                    )
                  : localStorage.removeItem(
                      "smde_" + this.options.autosave.uniqueId
                    );
                var n = document.getElementById("autosaved");
                if (null != n && null != n && "" != n) {
                  var i = new Date(),
                    r = new Intl.DateTimeFormat(
                      [this.options.autosave.timeFormat.locale, "en-US"],
                      this.options.autosave.timeFormat.format
                    ).format(i),
                    o =
                      null == this.options.autosave.text
                        ? "Autosaved: "
                        : this.options.autosave.text;
                  n.innerHTML = o + r;
                }
              } else
                console.log(
                  "EasyMDE: localStorage not available, cannot autosave"
                );
            }),
            (se.prototype.clearAutosavedValue = function () {
              if (ue()) {
                if (
                  null == this.options.autosave ||
                  null == this.options.autosave.uniqueId ||
                  "" == this.options.autosave.uniqueId
                )
                  return void console.log(
                    "EasyMDE: You must set a uniqueId to clear the autosave value"
                  );
                localStorage.removeItem(
                  "smde_" + this.options.autosave.uniqueId
                );
              } else
                console.log(
                  "EasyMDE: localStorage not available, cannot autosave"
                );
            }),
            (se.prototype.openBrowseFileWindow = function (e, t) {
              var n = this,
                i = this.gui.toolbar.getElementsByClassName("imageInput")[0];
              i.click(),
                i.addEventListener("change", function r(o) {
                  n.options.imageUploadFunction
                    ? n.uploadImagesUsingCustomFunction(
                        n.options.imageUploadFunction,
                        o.target.files
                      )
                    : n.uploadImages(o.target.files, e, t),
                    i.removeEventListener("change", r);
                });
            }),
            (se.prototype.uploadImage = function (e, t, n) {
              var i = this;
              function r(e) {
                i.updateStatusBar("upload-image", e),
                  setTimeout(function () {
                    i.updateStatusBar(
                      "upload-image",
                      i.options.imageTexts.sbInit
                    );
                  }, 1e4),
                  n && "function" == typeof n && n(e),
                  i.options.errorCallback(e);
              }
              function o(t) {
                var n = i.options.imageTexts.sizeUnits.split(",");
                return t
                  .replace("#image_name#", e.name)
                  .replace("#image_size#", Z(e.size, n))
                  .replace("#image_max_size#", Z(i.options.imageMaxSize, n));
              }
              if (
                ((t =
                  t ||
                  function (e) {
                    R(i, e);
                  }),
                e.size > this.options.imageMaxSize)
              )
                r(o(this.options.errorMessages.fileTooLarge));
              else {
                var a = new FormData();
                a.append("image", e),
                  i.options.imageCSRFToken &&
                    !i.options.imageCSRFHeader &&
                    a.append(i.options.imageCSRFName, i.options.imageCSRFToken);
                var l = new XMLHttpRequest();
                (l.upload.onprogress = function (t) {
                  if (t.lengthComputable) {
                    var n = "" + Math.round((100 * t.loaded) / t.total);
                    i.updateStatusBar(
                      "upload-image",
                      i.options.imageTexts.sbProgress
                        .replace("#file_name#", e.name)
                        .replace("#progress#", n)
                    );
                  }
                }),
                  l.open("POST", this.options.imageUploadEndpoint),
                  i.options.imageCSRFToken &&
                    i.options.imageCSRFHeader &&
                    l.setRequestHeader(
                      i.options.imageCSRFName,
                      i.options.imageCSRFToken
                    ),
                  (l.onload = function () {
                    try {
                      var e = JSON.parse(this.responseText);
                    } catch (e) {
                      return (
                        console.error(
                          "EasyMDE: The server did not return a valid json."
                        ),
                        void r(o(i.options.errorMessages.importError))
                      );
                    }
                    200 === this.status &&
                    e &&
                    !e.error &&
                    e.data &&
                    e.data.filePath
                      ? t(
                          (i.options.imagePathAbsolute
                            ? ""
                            : window.location.origin + "/") + e.data.filePath
                        )
                      : e.error && e.error in i.options.errorMessages
                      ? r(o(i.options.errorMessages[e.error]))
                      : e.error
                      ? r(o(e.error))
                      : (console.error(
                          "EasyMDE: Received an unexpected response after uploading the image." +
                            this.status +
                            " (" +
                            this.statusText +
                            ")"
                        ),
                        r(o(i.options.errorMessages.importError)));
                  }),
                  (l.onerror = function (e) {
                    console.error(
                      "EasyMDE: An unexpected error occurred when trying to upload the image." +
                        e.target.status +
                        " (" +
                        e.target.statusText +
                        ")"
                    ),
                      r(i.options.errorMessages.importError);
                  }),
                  l.send(a);
              }
            }),
            (se.prototype.uploadImageUsingCustomFunction = function (e, t) {
              var n = this;
              e.apply(this, [
                t,
                function (e) {
                  R(n, e);
                },
                function (e) {
                  var i = (function (e) {
                    var i = n.options.imageTexts.sizeUnits.split(",");
                    return e
                      .replace("#image_name#", t.name)
                      .replace("#image_size#", Z(t.size, i))
                      .replace(
                        "#image_max_size#",
                        Z(n.options.imageMaxSize, i)
                      );
                  })(e);
                  n.updateStatusBar("upload-image", i),
                    setTimeout(function () {
                      n.updateStatusBar(
                        "upload-image",
                        n.options.imageTexts.sbInit
                      );
                    }, 1e4),
                    n.options.errorCallback(i);
                },
              ]);
            }),
            (se.prototype.setPreviewMaxHeight = function () {
              var e = this.codemirror.getWrapperElement(),
                t = e.nextSibling,
                n = parseInt(window.getComputedStyle(e).paddingTop),
                i = parseInt(window.getComputedStyle(e).borderTopWidth),
                r =
                  (
                    parseInt(this.options.maxHeight) +
                    2 * n +
                    2 * i
                  ).toString() + "px";
              t.style.height = r;
            }),
            (se.prototype.createSideBySide = function () {
              var e = this.codemirror,
                t = e.getWrapperElement(),
                n = t.nextSibling;
              if (!n || !n.classList.contains("editor-preview-side")) {
                if (
                  (((n = document.createElement("div")).className =
                    "editor-preview-side"),
                  this.options.previewClass)
                )
                  if (Array.isArray(this.options.previewClass))
                    for (var i = 0; i < this.options.previewClass.length; i++)
                      n.classList.add(this.options.previewClass[i]);
                  else
                    "string" == typeof this.options.previewClass &&
                      n.classList.add(this.options.previewClass);
                t.parentNode.insertBefore(n, t.nextSibling);
              }
              if (
                (void 0 !== this.options.maxHeight &&
                  this.setPreviewMaxHeight(),
                !1 === this.options.syncSideBySidePreviewScroll)
              )
                return n;
              var r = !1,
                o = !1;
              return (
                e.on("scroll", function (e) {
                  if (r) r = !1;
                  else {
                    o = !0;
                    var t =
                        e.getScrollInfo().height -
                        e.getScrollInfo().clientHeight,
                      i = parseFloat(e.getScrollInfo().top) / t,
                      a = (n.scrollHeight - n.clientHeight) * i;
                    n.scrollTop = a;
                  }
                }),
                (n.onscroll = function () {
                  if (o) o = !1;
                  else {
                    r = !0;
                    var t = n.scrollHeight - n.clientHeight,
                      i = parseFloat(n.scrollTop) / t,
                      a =
                        (e.getScrollInfo().height -
                          e.getScrollInfo().clientHeight) *
                        i;
                    e.scrollTo(0, a);
                  }
                }),
                n
              );
            }),
            (se.prototype.createToolbar = function (e) {
              if ((e = e || this.options.toolbar) && 0 !== e.length) {
                var t;
                for (t = 0; t < e.length; t++)
                  null != te[e[t]] && (e[t] = te[e[t]]);
                var n = document.createElement("div");
                (n.className = "editor-toolbar"),
                  n.setAttribute("role", "toolbar");
                var i = this,
                  r = {};
                for (i.toolbar = e, t = 0; t < e.length; t++)
                  if (
                    ("guide" != e[t].name ||
                      !1 !== i.options.toolbarGuideIcon) &&
                    !(
                      (i.options.hideIcons &&
                        -1 != i.options.hideIcons.indexOf(e[t].name)) ||
                      (("fullscreen" == e[t].name ||
                        "side-by-side" == e[t].name) &&
                        c())
                    )
                  ) {
                    if ("|" === e[t]) {
                      for (var o = !1, a = t + 1; a < e.length; a++)
                        "|" === e[a] ||
                          (i.options.hideIcons &&
                            -1 != i.options.hideIcons.indexOf(e[a].name)) ||
                          (o = !0);
                      if (!o) continue;
                    }
                    !(function (e) {
                      var t;
                      if (
                        ((t =
                          "|" === e
                            ? p()
                            : e.children
                            ? h(
                                e,
                                i.options.toolbarTips,
                                i.options.shortcuts,
                                i
                              )
                            : f(
                                e,
                                !0,
                                i.options.toolbarTips,
                                i.options.shortcuts,
                                "button",
                                i
                              )),
                        (r[e.name || e] = t),
                        n.appendChild(t),
                        "upload-image" === e.name)
                      ) {
                        var o = document.createElement("input");
                        (o.className = "imageInput"),
                          (o.type = "file"),
                          (o.multiple = !0),
                          (o.name = "image"),
                          (o.accept = i.options.imageAccept),
                          (o.style.display = "none"),
                          (o.style.opacity = 0),
                          n.appendChild(o);
                      }
                    })(e[t]);
                  }
                (i.toolbar_div = n), (i.toolbarElements = r);
                var l = this.codemirror;
                l.on("cursorActivity", function () {
                  var e = m(l);
                  for (var t in r)
                    !(function (t) {
                      var n = r[t];
                      e[t]
                        ? n.classList.add("active")
                        : "fullscreen" != t &&
                          "side-by-side" != t &&
                          n.classList.remove("active");
                    })(t);
                });
                var s = l.getWrapperElement();
                return s.parentNode.insertBefore(n, s), n;
              }
            }),
            (se.prototype.createStatusbar = function (e) {
              e = e || this.options.status;
              var t = this.options,
                n = this.codemirror;
              if (e && 0 !== e.length) {
                var i,
                  r,
                  o,
                  a,
                  l = [];
                for (i = 0; i < e.length; i++)
                  if (
                    ((r = void 0),
                    (o = void 0),
                    (a = void 0),
                    "object" == typeof e[i])
                  )
                    l.push({
                      className: e[i].className,
                      defaultValue: e[i].defaultValue,
                      onUpdate: e[i].onUpdate,
                      onActivity: e[i].onActivity,
                    });
                  else {
                    var s = e[i];
                    "words" === s
                      ? ((a = function (e) {
                          e.innerHTML = J(n.getValue());
                        }),
                        (r = function (e) {
                          e.innerHTML = J(n.getValue());
                        }))
                      : "lines" === s
                      ? ((a = function (e) {
                          e.innerHTML = n.lineCount();
                        }),
                        (r = function (e) {
                          e.innerHTML = n.lineCount();
                        }))
                      : "cursor" === s
                      ? ((a = function (e) {
                          e.innerHTML = "1:1";
                        }),
                        (o = function (e) {
                          var t = n.getCursor(),
                            i = t.line + 1,
                            r = t.ch + 1;
                          e.innerHTML = i + ":" + r;
                        }))
                      : "autosave" === s
                      ? (a = function (e) {
                          null != t.autosave &&
                            !0 === t.autosave.enabled &&
                            e.setAttribute("id", "autosaved");
                        })
                      : "upload-image" === s &&
                        (a = function (e) {
                          e.innerHTML = t.imageTexts.sbInit;
                        }),
                      l.push({
                        className: s,
                        defaultValue: a,
                        onUpdate: r,
                        onActivity: o,
                      });
                  }
                var u = document.createElement("div");
                for (
                  u.className = "editor-statusbar", i = 0;
                  i < l.length;
                  i++
                ) {
                  var c = l[i],
                    d = document.createElement("span");
                  (d.className = c.className),
                    "function" == typeof c.defaultValue && c.defaultValue(d),
                    "function" == typeof c.onUpdate &&
                      this.codemirror.on(
                        "update",
                        (function (e, t) {
                          return function () {
                            t.onUpdate(e);
                          };
                        })(d, c)
                      ),
                    "function" == typeof c.onActivity &&
                      this.codemirror.on(
                        "cursorActivity",
                        (function (e, t) {
                          return function () {
                            t.onActivity(e);
                          };
                        })(d, c)
                      ),
                    u.appendChild(d);
                }
                var h = this.codemirror.getWrapperElement();
                return h.parentNode.insertBefore(u, h.nextSibling), u;
              }
            }),
            (se.prototype.value = function (e) {
              var t = this.codemirror;
              if (void 0 === e) return t.getValue();
              if ((t.getDoc().setValue(e), this.isPreviewActive())) {
                var n = t.getWrapperElement().lastChild,
                  i = this.options.previewRender(e, n);
                null !== i && (n.innerHTML = i);
              }
              return this;
            }),
            (se.toggleBold = x),
            (se.toggleItalic = y),
            (se.toggleStrikethrough = b),
            (se.toggleBlockquote = C),
            (se.toggleHeadingSmaller = w),
            (se.toggleHeadingBigger = k),
            (se.toggleHeading1 = S),
            (se.toggleHeading2 = F),
            (se.toggleHeading3 = A),
            (se.toggleHeading4 = E),
            (se.toggleHeading5 = L),
            (se.toggleHeading6 = T),
            (se.toggleCodeBlock = D),
            (se.toggleUnorderedList = M),
            (se.toggleOrderedList = B),
            (se.cleanBlock = N),
            (se.drawLink = O),
            (se.drawImage = I),
            (se.drawUploadedImage = H),
            (se.drawTable = P),
            (se.drawHorizontalRule = _),
            (se.undo = W),
            (se.redo = j),
            (se.togglePreview = U),
            (se.toggleSideBySide = q),
            (se.toggleFullScreen = v),
            (se.prototype.toggleBold = function () {
              x(this);
            }),
            (se.prototype.toggleItalic = function () {
              y(this);
            }),
            (se.prototype.toggleStrikethrough = function () {
              b(this);
            }),
            (se.prototype.toggleBlockquote = function () {
              C(this);
            }),
            (se.prototype.toggleHeadingSmaller = function () {
              w(this);
            }),
            (se.prototype.toggleHeadingBigger = function () {
              k(this);
            }),
            (se.prototype.toggleHeading1 = function () {
              S(this);
            }),
            (se.prototype.toggleHeading2 = function () {
              F(this);
            }),
            (se.prototype.toggleHeading3 = function () {
              A(this);
            }),
            (se.prototype.toggleHeading4 = function () {
              E(this);
            }),
            (se.prototype.toggleHeading5 = function () {
              L(this);
            }),
            (se.prototype.toggleHeading6 = function () {
              T(this);
            }),
            (se.prototype.toggleCodeBlock = function () {
              D(this);
            }),
            (se.prototype.toggleUnorderedList = function () {
              M(this);
            }),
            (se.prototype.toggleOrderedList = function () {
              B(this);
            }),
            (se.prototype.cleanBlock = function () {
              N(this);
            }),
            (se.prototype.drawLink = function () {
              O(this);
            }),
            (se.prototype.drawImage = function () {
              I(this);
            }),
            (se.prototype.drawUploadedImage = function () {
              H(this);
            }),
            (se.prototype.drawTable = function () {
              P(this);
            }),
            (se.prototype.drawHorizontalRule = function () {
              _(this);
            }),
            (se.prototype.undo = function () {
              W(this);
            }),
            (se.prototype.redo = function () {
              j(this);
            }),
            (se.prototype.togglePreview = function () {
              U(this);
            }),
            (se.prototype.toggleSideBySide = function () {
              q(this);
            }),
            (se.prototype.toggleFullScreen = function () {
              v(this);
            }),
            (se.prototype.isPreviewActive = function () {
              return this.codemirror
                .getWrapperElement()
                .lastChild.classList.contains("editor-preview-active");
            }),
            (se.prototype.isSideBySideActive = function () {
              return this.codemirror
                .getWrapperElement()
                .nextSibling.classList.contains("editor-preview-active-side");
            }),
            (se.prototype.isFullscreenActive = function () {
              return this.codemirror.getOption("fullScreen");
            }),
            (se.prototype.getState = function () {
              return m(this.codemirror);
            }),
            (se.prototype.toTextArea = function () {
              var e = this.codemirror,
                t = e.getWrapperElement(),
                n = t.parentNode;
              n &&
                (this.gui.toolbar && n.removeChild(this.gui.toolbar),
                this.gui.statusbar && n.removeChild(this.gui.statusbar),
                this.gui.sideBySide && n.removeChild(this.gui.sideBySide)),
                n.parentNode.insertBefore(t, n),
                n.remove(),
                e.toTextArea(),
                this.autosaveTimeoutId &&
                  (clearTimeout(this.autosaveTimeoutId),
                  (this.autosaveTimeoutId = void 0),
                  this.clearAutosavedValue());
            }),
            (t.exports = se);
        },
        {
          "./codemirror/tablist": 17,
          codemirror: 10,
          "codemirror-spell-checker": 2,
          "codemirror/addon/display/autorefresh.js": 3,
          "codemirror/addon/display/fullscreen.js": 4,
          "codemirror/addon/display/placeholder.js": 5,
          "codemirror/addon/edit/continuelist.js": 6,
          "codemirror/addon/mode/overlay.js": 7,
          "codemirror/addon/search/searchcursor.js": 8,
          "codemirror/addon/selection/mark-selection.js": 9,
          "codemirror/mode/gfm/gfm.js": 11,
          "codemirror/mode/markdown/markdown.js": 12,
          "codemirror/mode/xml/xml.js": 14,
          marked: 15,
        },
      ],
    },
    {},
    [18]
  )(18);
});
