import {
  Tl,
  my,
  w
} from "./chunk-OEUT75ZI.js";

// node_modules/mermaid/dist/infoDiagram-6cbe7c6f.js
var O = function() {
  var a = function(u, t, e, n) {
    for (e = e || {}, n = u.length; n--; e[u[n]] = t)
      ;
    return e;
  }, f = [6, 9, 10], m = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, info: 4, document: 5, EOF: 6, line: 7, statement: 8, NL: 9, showInfo: 10, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "info", 6: "EOF", 9: "NL", 10: "showInfo" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 1], [7, 1], [8, 1]],
    performAction: function(t, e, n, s, r, i, d) {
      switch (i.length - 1, r) {
        case 1:
          return s;
        case 4:
          break;
        case 6:
          s.setInfo(true);
          break;
      }
    },
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, a(f, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: 6, 9: [1, 7], 10: [1, 8] }, { 1: [2, 1] }, a(f, [2, 3]), a(f, [2, 4]), a(f, [2, 5]), a(f, [2, 6])],
    defaultActions: { 4: [2, 1] },
    parseError: function(t, e) {
      if (e.recoverable)
        this.trace(t);
      else {
        var n = new Error(t);
        throw n.hash = e, n;
      }
    },
    parse: function(t) {
      var e = this, n = [0], s = [], r = [null], i = [], d = this.table, $ = "", v = 0, L = 0, N = 2, T = 1, R = i.slice.call(arguments, 1), o = Object.create(this.lexer), p = { yy: {} };
      for (var E in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, E) && (p.yy[E] = this.yy[E]);
      o.setInput(t, p.yy), p.yy.lexer = o, p.yy.parser = this, typeof o.yylloc > "u" && (o.yylloc = {});
      var I = o.yylloc;
      i.push(I);
      var z = o.options && o.options.ranges;
      typeof p.yy.parseError == "function" ? this.parseError = p.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function U() {
        var y;
        return y = s.pop() || o.lex() || T, typeof y != "number" && (y instanceof Array && (s = y, y = s.pop()), y = e.symbols_[y] || y), y;
      }
      for (var l, g, h, w2, _ = {}, b, c, F, S; ; ) {
        if (g = n[n.length - 1], this.defaultActions[g] ? h = this.defaultActions[g] : ((l === null || typeof l > "u") && (l = U()), h = d[g] && d[g][l]), typeof h > "u" || !h.length || !h[0]) {
          var A = "";
          S = [];
          for (b in d[g])
            this.terminals_[b] && b > N && S.push("'" + this.terminals_[b] + "'");
          o.showPosition ? A = "Parse error on line " + (v + 1) + `:
` + o.showPosition() + `
Expecting ` + S.join(", ") + ", got '" + (this.terminals_[l] || l) + "'" : A = "Parse error on line " + (v + 1) + ": Unexpected " + (l == T ? "end of input" : "'" + (this.terminals_[l] || l) + "'"), this.parseError(A, {
            text: o.match,
            token: this.terminals_[l] || l,
            line: o.yylineno,
            loc: I,
            expected: S
          });
        }
        if (h[0] instanceof Array && h.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + g + ", token: " + l);
        switch (h[0]) {
          case 1:
            n.push(l), r.push(o.yytext), i.push(o.yylloc), n.push(h[1]), l = null, L = o.yyleng, $ = o.yytext, v = o.yylineno, I = o.yylloc;
            break;
          case 2:
            if (c = this.productions_[h[1]][1], _.$ = r[r.length - c], _._$ = {
              first_line: i[i.length - (c || 1)].first_line,
              last_line: i[i.length - 1].last_line,
              first_column: i[i.length - (c || 1)].first_column,
              last_column: i[i.length - 1].last_column
            }, z && (_._$.range = [
              i[i.length - (c || 1)].range[0],
              i[i.length - 1].range[1]
            ]), w2 = this.performAction.apply(_, [
              $,
              L,
              v,
              p.yy,
              h[1],
              r,
              i
            ].concat(R)), typeof w2 < "u")
              return w2;
            c && (n = n.slice(0, -1 * c * 2), r = r.slice(0, -1 * c), i = i.slice(0, -1 * c)), n.push(this.productions_[h[1]][0]), r.push(_.$), i.push(_._$), F = d[n[n.length - 2]][n[n.length - 1]], n.push(F);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
  }, k = function() {
    var u = {
      EOF: 1,
      parseError: function(e, n) {
        if (this.yy.parser)
          this.yy.parser.parseError(e, n);
        else
          throw new Error(e);
      },
      // resets the lexer, sets new input
      setInput: function(t, e) {
        return this.yy = e || this.yy || {}, this._input = t, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var t = this._input[0];
        this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t;
        var e = t.match(/(?:\r\n?|\n).*/g);
        return e ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t;
      },
      // unshifts one char (or a string) into the input
      unput: function(t) {
        var e = t.length, n = t.split(/(?:\r\n?|\n)/g);
        this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e), this.offset -= e;
        var s = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
        var r = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: n ? (n.length === s.length ? this.yylloc.first_column : 0) + s[s.length - n.length].length - n[0].length : this.yylloc.first_column - e
        }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - e]), this.yyleng = this.yytext.length, this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        return this._more = true, this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
        if (this.options.backtrack_lexer)
          this._backtrack = true;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      },
      // retain first n characters of the match
      less: function(t) {
        this.unput(this.match.slice(t));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var t = this.matched.substr(0, this.matched.length - this.match.length);
        return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var t = this.match;
        return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var t = this.pastInput(), e = new Array(t.length + 1).join("-");
        return t + this.upcomingInput() + `
` + e + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(t, e) {
        var n, s, r;
        if (this.options.backtrack_lexer && (r = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (r.yylloc.range = this.yylloc.range.slice(0))), s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
        }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(t[0].length), this.matched += t[0], n = this.performAction.call(this, this.yy, this, e, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), n)
          return n;
        if (this._backtrack) {
          for (var i in r)
            this[i] = r[i];
          return false;
        }
        return false;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var t, e, n, s;
        this._more || (this.yytext = "", this.match = "");
        for (var r = this._currentRules(), i = 0; i < r.length; i++)
          if (n = this._input.match(this.rules[r[i]]), n && (!e || n[0].length > e[0].length)) {
            if (e = n, s = i, this.options.backtrack_lexer) {
              if (t = this.test_match(n, r[i]), t !== false)
                return t;
              if (this._backtrack) {
                e = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return e ? (t = this.test_match(e, r[s]), t !== false ? t : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var e = this.next();
        return e || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(e) {
        this.conditionStack.push(e);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var e = this.conditionStack.length - 1;
        return e > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(e) {
        return e = this.conditionStack.length - 1 - Math.abs(e || 0), e >= 0 ? this.conditionStack[e] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(e) {
        this.begin(e);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": true },
      performAction: function(e, n, s, r) {
        switch (s) {
          case 0:
            return 4;
          case 1:
            return 9;
          case 2:
            return "space";
          case 3:
            return 10;
          case 4:
            return 6;
          case 5:
            return "TXT";
        }
      },
      rules: [/^(?:info\b)/i, /^(?:[\s\n\r]+)/i, /^(?:[\s]+)/i, /^(?:showInfo\b)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { INITIAL: { rules: [0, 1, 2, 3, 4, 5], inclusive: true } }
    };
    return u;
  }();
  m.lexer = k;
  function x() {
    this.yy = {};
  }
  return x.prototype = m, m.Parser = x, new x();
}();
O.parser = O;
var B = O;
var j = {
  info: false
};
var P = j.info;
var V = (a) => {
  P = a;
};
var W = () => P;
var X = () => {
  P = j.info;
};
var q = {
  clear: X,
  setInfo: V,
  getInfo: W
};
var C = (a, f, m) => {
  w.debug(`rendering info diagram
` + a);
  const k = my(f);
  Tl(k, 100, 400, true), k.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${m}`);
};
var G = { draw: C };
var J = {
  parser: B,
  db: q,
  renderer: G
};
export {
  J as diagram
};
//# sourceMappingURL=infoDiagram-6cbe7c6f-C2USHBCW.js.map
