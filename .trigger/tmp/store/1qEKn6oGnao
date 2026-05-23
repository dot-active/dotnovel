import {
  Anthropic
} from "./chunk-XESYJX2U.mjs";
import {
  task
} from "./chunk-HEYDU7WQ.mjs";
import "./chunk-CACV3OXU.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toESM,
  init_esm
} from "./chunk-3C3LT5K7.mjs";

// node_modules/@prisma/client/runtime/library.js
var require_library = __commonJS({
  "node_modules/@prisma/client/runtime/library.js"(exports, module) {
    "use strict";
    init_esm();
    var eu = Object.create;
    var Nr = Object.defineProperty;
    var tu = Object.getOwnPropertyDescriptor;
    var ru = Object.getOwnPropertyNames;
    var nu = Object.getPrototypeOf;
    var iu = Object.prototype.hasOwnProperty;
    var Z = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "Z");
    var Ut = /* @__PURE__ */ __name((e, t) => {
      for (var r in t) Nr(e, r, { get: t[r], enumerable: true });
    }, "Ut");
    var ho = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of ru(t)) !iu.call(e, i) && i !== r && Nr(e, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = tu(t, i)) || n.enumerable });
      return e;
    }, "ho");
    var k = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? eu(nu(e)) : {}, ho(t || !e || !e.__esModule ? Nr(r, "default", { value: e, enumerable: true }) : r, e)), "k");
    var ou = /* @__PURE__ */ __name((e) => ho(Nr({}, "__esModule", { value: true }), e), "ou");
    var jo = Z((pf, Zn) => {
      "use strict";
      var v2 = Zn.exports;
      Zn.exports.default = v2;
      var D = "\x1B[", Ht2 = "\x1B]", ft = "\x07", Jr = ";", qo = process.env.TERM_PROGRAM === "Apple_Terminal";
      v2.cursorTo = (e, t) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        return typeof t != "number" ? D + (e + 1) + "G" : D + (t + 1) + ";" + (e + 1) + "H";
      };
      v2.cursorMove = (e, t) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        let r = "";
        return e < 0 ? r += D + -e + "D" : e > 0 && (r += D + e + "C"), t < 0 ? r += D + -t + "A" : t > 0 && (r += D + t + "B"), r;
      };
      v2.cursorUp = (e = 1) => D + e + "A";
      v2.cursorDown = (e = 1) => D + e + "B";
      v2.cursorForward = (e = 1) => D + e + "C";
      v2.cursorBackward = (e = 1) => D + e + "D";
      v2.cursorLeft = D + "G";
      v2.cursorSavePosition = qo ? "\x1B7" : D + "s";
      v2.cursorRestorePosition = qo ? "\x1B8" : D + "u";
      v2.cursorGetPosition = D + "6n";
      v2.cursorNextLine = D + "E";
      v2.cursorPrevLine = D + "F";
      v2.cursorHide = D + "?25l";
      v2.cursorShow = D + "?25h";
      v2.eraseLines = (e) => {
        let t = "";
        for (let r = 0; r < e; r++) t += v2.eraseLine + (r < e - 1 ? v2.cursorUp() : "");
        return e && (t += v2.cursorLeft), t;
      };
      v2.eraseEndLine = D + "K";
      v2.eraseStartLine = D + "1K";
      v2.eraseLine = D + "2K";
      v2.eraseDown = D + "J";
      v2.eraseUp = D + "1J";
      v2.eraseScreen = D + "2J";
      v2.scrollUp = D + "S";
      v2.scrollDown = D + "T";
      v2.clearScreen = "\x1Bc";
      v2.clearTerminal = process.platform === "win32" ? `${v2.eraseScreen}${D}0f` : `${v2.eraseScreen}${D}3J${D}H`;
      v2.beep = ft;
      v2.link = (e, t) => [Ht2, "8", Jr, Jr, t, ft, e, Ht2, "8", Jr, Jr, ft].join("");
      v2.image = (e, t = {}) => {
        let r = `${Ht2}1337;File=inline=1`;
        return t.width && (r += `;width=${t.width}`), t.height && (r += `;height=${t.height}`), t.preserveAspectRatio === false && (r += ";preserveAspectRatio=0"), r + ":" + e.toString("base64") + ft;
      };
      v2.iTerm = { setCwd: /* @__PURE__ */ __name((e = process.cwd()) => `${Ht2}50;CurrentDir=${e}${ft}`, "setCwd"), annotation: /* @__PURE__ */ __name((e, t = {}) => {
        let r = `${Ht2}1337;`, n = typeof t.x < "u", i = typeof t.y < "u";
        if ((n || i) && !(n && i && typeof t.length < "u")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        return e = e.replace(/\|/g, ""), r += t.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", t.length > 0 ? r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join("|") : r += e, r + ft;
      }, "annotation") };
    });
    var Xn = Z((df, Vo) => {
      "use strict";
      Vo.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
      };
    });
    var Go = Z((mf, Uo) => {
      "use strict";
      var Gu = __require("os"), Bo = __require("tty"), de = Xn(), { env: Q } = process, Qe2;
      de("no-color") || de("no-colors") || de("color=false") || de("color=never") ? Qe2 = 0 : (de("color") || de("colors") || de("color=true") || de("color=always")) && (Qe2 = 1);
      "FORCE_COLOR" in Q && (Q.FORCE_COLOR === "true" ? Qe2 = 1 : Q.FORCE_COLOR === "false" ? Qe2 = 0 : Qe2 = Q.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(Q.FORCE_COLOR, 10), 3));
      function ei(e) {
        return e === 0 ? false : { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
      }
      __name(ei, "ei");
      function ti(e, t) {
        if (Qe2 === 0) return 0;
        if (de("color=16m") || de("color=full") || de("color=truecolor")) return 3;
        if (de("color=256")) return 2;
        if (e && !t && Qe2 === void 0) return 0;
        let r = Qe2 || 0;
        if (Q.TERM === "dumb") return r;
        if (process.platform === "win32") {
          let n = Gu.release().split(".");
          return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in Q) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in Q) || Q.CI_NAME === "codeship" ? 1 : r;
        if ("TEAMCITY_VERSION" in Q) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Q.TEAMCITY_VERSION) ? 1 : 0;
        if (Q.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in Q) {
          let n = parseInt((Q.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (Q.TERM_PROGRAM) {
            case "iTerm.app":
              return n >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        return /-256(color)?$/i.test(Q.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(Q.TERM) || "COLORTERM" in Q ? 1 : r;
      }
      __name(ti, "ti");
      function Qu(e) {
        let t = ti(e, e && e.isTTY);
        return ei(t);
      }
      __name(Qu, "Qu");
      Uo.exports = { supportsColor: Qu, stdout: ei(ti(true, Bo.isatty(1))), stderr: ei(ti(true, Bo.isatty(2))) };
    });
    var Wo = Z((ff, Jo2) => {
      "use strict";
      var Ju = Go(), gt = Xn();
      function Qo(e) {
        if (/^\d{3,4}$/.test(e)) {
          let r = /(\d{1,2})(\d{2})/.exec(e);
          return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) };
        }
        let t = (e || "").split(".").map((r) => parseInt(r, 10));
        return { major: t[0], minor: t[1], patch: t[2] };
      }
      __name(Qo, "Qo");
      function ri(e) {
        let { env: t } = process;
        if ("FORCE_HYPERLINK" in t) return !(t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0);
        if (gt("no-hyperlink") || gt("no-hyperlinks") || gt("hyperlink=false") || gt("hyperlink=never")) return false;
        if (gt("hyperlink=true") || gt("hyperlink=always") || "NETLIFY" in t) return true;
        if (!Ju.supportsColor(e) || e && !e.isTTY || process.platform === "win32" || "CI" in t || "TEAMCITY_VERSION" in t) return false;
        if ("TERM_PROGRAM" in t) {
          let r = Qo(t.TERM_PROGRAM_VERSION);
          switch (t.TERM_PROGRAM) {
            case "iTerm.app":
              return r.major === 3 ? r.minor >= 1 : r.major > 3;
            case "WezTerm":
              return r.major >= 20200620;
            case "vscode":
              return r.major > 1 || r.major === 1 && r.minor >= 72;
          }
        }
        if ("VTE_VERSION" in t) {
          if (t.VTE_VERSION === "0.50.0") return false;
          let r = Qo(t.VTE_VERSION);
          return r.major > 0 || r.minor >= 50;
        }
        return false;
      }
      __name(ri, "ri");
      Jo2.exports = { supportsHyperlink: ri, stdout: ri(process.stdout), stderr: ri(process.stderr) };
    });
    var Ko = Z((gf, Kt) => {
      "use strict";
      var Wu = jo(), ni = Wo(), Ho = /* @__PURE__ */ __name((e, t, { target: r = "stdout", ...n } = {}) => ni[r] ? Wu.link(e, t) : n.fallback === false ? e : typeof n.fallback == "function" ? n.fallback(e, t) : `${e} (​${t}​)`, "Ho");
      Kt.exports = (e, t, r = {}) => Ho(e, t, r);
      Kt.exports.stderr = (e, t, r = {}) => Ho(e, t, { target: "stderr", ...r });
      Kt.exports.isSupported = ni.stdout;
      Kt.exports.stderr.isSupported = ni.stderr;
    });
    var oi = Z((Rf, Hu) => {
      Hu.exports = { name: "@prisma/engines-version", version: "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var si = Z((Wr) => {
      "use strict";
      Object.defineProperty(Wr, "__esModule", { value: true });
      Wr.enginesVersion = void 0;
      Wr.enginesVersion = oi().prisma.enginesVersion;
    });
    var Xo = Z((Gf, Yu) => {
      Yu.exports = { name: "dotenv", version: "16.0.3", description: "Loads environment variables from .env file", main: "lib/main.js", types: "lib/main.d.ts", exports: { ".": { require: "./lib/main.js", types: "./lib/main.d.ts", default: "./lib/main.js" }, "./config": "./config.js", "./config.js": "./config.js", "./lib/env-options": "./lib/env-options.js", "./lib/env-options.js": "./lib/env-options.js", "./lib/cli-options": "./lib/cli-options.js", "./lib/cli-options.js": "./lib/cli-options.js", "./package.json": "./package.json" }, scripts: { "dts-check": "tsc --project tests/types/tsconfig.json", lint: "standard", "lint-readme": "standard-markdown", pretest: "npm run lint && npm run dts-check", test: "tap tests/*.js --100 -Rspec", prerelease: "npm test", release: "standard-version" }, repository: { type: "git", url: "git://github.com/motdotla/dotenv.git" }, keywords: ["dotenv", "env", ".env", "environment", "variables", "config", "settings"], readmeFilename: "README.md", license: "BSD-2-Clause", devDependencies: { "@types/node": "^17.0.9", decache: "^4.6.1", dtslint: "^3.7.0", sinon: "^12.0.1", standard: "^16.0.4", "standard-markdown": "^7.1.0", "standard-version": "^9.3.2", tap: "^15.1.6", tar: "^6.1.11", typescript: "^4.5.4" }, engines: { node: ">=12" } };
    });
    var ts = Z((Qf, Kr) => {
      "use strict";
      var Zu = __require("fs"), es = __require("path"), Xu = __require("os"), ec = Xo(), tc = ec.version, rc = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
      function nc(e) {
        let t = {}, r = e.toString();
        r = r.replace(/\r\n?/mg, `
`);
        let n;
        for (; (n = rc.exec(r)) != null; ) {
          let i = n[1], o = n[2] || "";
          o = o.trim();
          let s = o[0];
          o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), t[i] = o;
        }
        return t;
      }
      __name(nc, "nc");
      function ci(e) {
        console.log(`[dotenv@${tc}][DEBUG] ${e}`);
      }
      __name(ci, "ci");
      function ic(e) {
        return e[0] === "~" ? es.join(Xu.homedir(), e.slice(1)) : e;
      }
      __name(ic, "ic");
      function oc(e) {
        let t = es.resolve(process.cwd(), ".env"), r = "utf8", n = !!(e && e.debug), i = !!(e && e.override);
        e && (e.path != null && (t = ic(e.path)), e.encoding != null && (r = e.encoding));
        try {
          let o = Hr.parse(Zu.readFileSync(t, { encoding: r }));
          return Object.keys(o).forEach(function(s) {
            Object.prototype.hasOwnProperty.call(process.env, s) ? (i === true && (process.env[s] = o[s]), n && ci(i === true ? `"${s}" is already defined in \`process.env\` and WAS overwritten` : `"${s}" is already defined in \`process.env\` and was NOT overwritten`)) : process.env[s] = o[s];
          }), { parsed: o };
        } catch (o) {
          return n && ci(`Failed to load ${t} ${o.message}`), { error: o };
        }
      }
      __name(oc, "oc");
      var Hr = { config: oc, parse: nc };
      Kr.exports.config = Hr.config;
      Kr.exports.parse = Hr.parse;
      Kr.exports = Hr;
    });
    var as = Z((Zf, ss2) => {
      "use strict";
      ss2.exports = (e) => {
        let t = e.match(/^[ \t]*(?=\S)/gm);
        return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0;
      };
    });
    var us = Z((Xf, ls2) => {
      "use strict";
      var uc = as();
      ls2.exports = (e) => {
        let t = uc(e);
        if (t === 0) return e;
        let r = new RegExp(`^[ \\t]{${t}}`, "gm");
        return e.replace(r, "");
      };
    });
    var fi = Z((og, cs) => {
      "use strict";
      cs.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var fs = Z((lg, ms2) => {
      "use strict";
      ms2.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var bi = Z((ug, gs2) => {
      "use strict";
      var yc = fs();
      gs2.exports = (e) => typeof e == "string" ? e.replace(yc(), "") : e;
    });
    var hs = Z((dg, Zr) => {
      "use strict";
      Zr.exports = (e = {}) => {
        let t;
        if (e.repoUrl) t = e.repoUrl;
        else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let r = new URL(`${t}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
        for (let i of n) {
          let o = e[i];
          if (o !== void 0) {
            if (i === "labels" || i === "projects") {
              if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
              o = o.join(",");
            }
            r.searchParams.set(i, o);
          }
        }
        return r.toString();
      };
      Zr.exports.default = Zr.exports;
    });
    var Ai = Z((Th, $s) => {
      "use strict";
      $s.exports = /* @__PURE__ */ function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        __name(e, "e");
        return function(t, r) {
          if (t === r) return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a2 = 0, l, u, c, p2, d, f, g, h, O2, T, S2, C, E2 = [];
          for (l = 0; l < i; l++) E2.push(l + 1), E2.push(t.charCodeAt(s + l));
          for (var me = E2.length - 1; a2 < o - 3; ) for (O2 = r.charCodeAt(s + (u = a2)), T = r.charCodeAt(s + (c = a2 + 1)), S2 = r.charCodeAt(s + (p2 = a2 + 2)), C = r.charCodeAt(s + (d = a2 + 3)), f = a2 += 4, l = 0; l < me; l += 2) g = E2[l], h = E2[l + 1], u = e(g, u, c, O2, h), c = e(u, c, p2, T, h), p2 = e(c, p2, d, S2, h), f = e(p2, d, f, C, h), E2[l] = f, d = p2, p2 = c, c = u, u = g;
          for (; a2 < o; ) for (O2 = r.charCodeAt(s + (u = a2)), f = ++a2, l = 0; l < me; l += 2) g = E2[l], E2[l] = f = e(g, u, f, O2, E2[l + 1]), u = g;
          return f;
        };
      }();
    });
    var Nm = {};
    Ut(Nm, { Debug: /* @__PURE__ */ __name(() => Gn, "Debug"), Decimal: /* @__PURE__ */ __name(() => xe, "Decimal"), Extensions: /* @__PURE__ */ __name(() => jn, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => Dt, "MetricsClient"), NotFoundError: /* @__PURE__ */ __name(() => Le, "NotFoundError"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => R, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => V, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => le, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => B, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => J, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => Vn, "Public"), Sql: /* @__PURE__ */ __name(() => oe, "Sql"), defineDmmfProperty: /* @__PURE__ */ __name(() => ua, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => wt, "deserializeJsonResponse"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => la, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => ma, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Yl, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => In, "getRuntime"), join: /* @__PURE__ */ __name(() => da, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Zl, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => ca, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => yn, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => ji, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => vn, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => Pn, "skip"), sqltag: /* @__PURE__ */ __name(() => Vi, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => Xl, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => tr, "warnOnce") });
    module.exports = ou(Nm);
    var jn = {};
    Ut(jn, { defineExtension: /* @__PURE__ */ __name(() => yo, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => bo, "getExtensionContext") });
    function yo(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(yo, "yo");
    function bo(e) {
      return e;
    }
    __name(bo, "bo");
    var Vn = {};
    Ut(Vn, { validator: /* @__PURE__ */ __name(() => Eo, "validator") });
    function Eo(...e) {
      return (t) => t;
    }
    __name(Eo, "Eo");
    var Mr = {};
    Ut(Mr, { $: /* @__PURE__ */ __name(() => To, "$"), bgBlack: /* @__PURE__ */ __name(() => gu, "bgBlack"), bgBlue: /* @__PURE__ */ __name(() => Eu, "bgBlue"), bgCyan: /* @__PURE__ */ __name(() => xu, "bgCyan"), bgGreen: /* @__PURE__ */ __name(() => yu, "bgGreen"), bgMagenta: /* @__PURE__ */ __name(() => wu, "bgMagenta"), bgRed: /* @__PURE__ */ __name(() => hu, "bgRed"), bgWhite: /* @__PURE__ */ __name(() => Pu, "bgWhite"), bgYellow: /* @__PURE__ */ __name(() => bu, "bgYellow"), black: /* @__PURE__ */ __name(() => pu, "black"), blue: /* @__PURE__ */ __name(() => rt, "blue"), bold: /* @__PURE__ */ __name(() => H, "bold"), cyan: /* @__PURE__ */ __name(() => De, "cyan"), dim: /* @__PURE__ */ __name(() => Oe, "dim"), gray: /* @__PURE__ */ __name(() => Gt, "gray"), green: /* @__PURE__ */ __name(() => qe, "green"), grey: /* @__PURE__ */ __name(() => fu, "grey"), hidden: /* @__PURE__ */ __name(() => uu, "hidden"), inverse: /* @__PURE__ */ __name(() => lu, "inverse"), italic: /* @__PURE__ */ __name(() => au, "italic"), magenta: /* @__PURE__ */ __name(() => du, "magenta"), red: /* @__PURE__ */ __name(() => ce, "red"), reset: /* @__PURE__ */ __name(() => su, "reset"), strikethrough: /* @__PURE__ */ __name(() => cu, "strikethrough"), underline: /* @__PURE__ */ __name(() => X, "underline"), white: /* @__PURE__ */ __name(() => mu, "white"), yellow: /* @__PURE__ */ __name(() => ke, "yellow") });
    var Bn;
    var wo;
    var xo;
    var Po;
    var vo = true;
    typeof process < "u" && ({ FORCE_COLOR: Bn, NODE_DISABLE_COLORS: wo, NO_COLOR: xo, TERM: Po } = process.env || {}, vo = process.stdout && process.stdout.isTTY);
    var To = { enabled: !wo && xo == null && Po !== "dumb" && (Bn != null && Bn !== "0" || vo) };
    function M(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !To.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(M, "M");
    var su = M(0, 0);
    var H = M(1, 22);
    var Oe = M(2, 22);
    var au = M(3, 23);
    var X = M(4, 24);
    var lu = M(7, 27);
    var uu = M(8, 28);
    var cu = M(9, 29);
    var pu = M(30, 39);
    var ce = M(31, 39);
    var qe = M(32, 39);
    var ke = M(33, 39);
    var rt = M(34, 39);
    var du = M(35, 39);
    var De = M(36, 39);
    var mu = M(37, 39);
    var Gt = M(90, 39);
    var fu = M(90, 39);
    var gu = M(40, 49);
    var hu = M(41, 49);
    var yu = M(42, 49);
    var bu = M(43, 49);
    var Eu = M(44, 49);
    var wu = M(45, 49);
    var xu = M(46, 49);
    var Pu = M(47, 49);
    var vu = 100;
    var Ro = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Qt = [];
    var Co = Date.now();
    var Tu = 0;
    var Un = typeof process < "u" ? process.env : {};
    globalThis.DEBUG ??= Un.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= Un.DEBUG_COLORS ? Un.DEBUG_COLORS === "true" : true;
    var Jt = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, "log"), formatters: {} };
    function Ru(e) {
      let t = { color: Ro[Tu++ % Ro.length], enabled: Jt.enabled(e), namespace: e, log: Jt.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a2 } = t;
        if (n.length !== 0 && Qt.push([o, ...n]), Qt.length > vu && Qt.shift(), Jt.enabled(o) || i) {
          let l = n.map((c) => typeof c == "string" ? c : Cu(c)), u = `+${Date.now() - Co}ms`;
          Co = Date.now(), globalThis.DEBUG_COLORS ? a2(Mr[s](H(o)), ...l, Mr[s](u)) : a2(o, ...l, u);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => t[i] = o, "set") });
    }
    __name(Ru, "Ru");
    var Gn = new Proxy(Ru, { get: /* @__PURE__ */ __name((e, t) => Jt[t], "get"), set: /* @__PURE__ */ __name((e, t, r) => Jt[t] = r, "set") });
    function Cu(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    __name(Cu, "Cu");
    function So(e = 7500) {
      let t = Qt.map(([r, ...n]) => `${r} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
      return t.length < e ? t : t.slice(-e);
    }
    __name(So, "So");
    function Ao() {
      Qt.length = 0;
    }
    __name(Ao, "Ao");
    var L = Gn;
    var Io = k(__require("fs"));
    function Qn() {
      let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
      if (!(e && Io.default.existsSync(e)) && process.arch === "ia32") throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)');
    }
    __name(Qn, "Qn");
    var Jn = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    var $r = "libquery_engine";
    function qr(e, t) {
      let r = t === "url";
      return e.includes("windows") ? r ? "query_engine.dll.node" : `query_engine-${e}.dll.node` : e.includes("darwin") ? r ? `${$r}.dylib.node` : `${$r}-${e}.dylib.node` : r ? `${$r}.so.node` : `${$r}-${e}.so.node`;
    }
    __name(qr, "qr");
    var _o = k(__require("child_process"));
    var zn = k(__require("fs/promises"));
    var Gr = k(__require("os"));
    var _e = Symbol.for("@ts-pattern/matcher");
    var Su = Symbol.for("@ts-pattern/isVariadic");
    var Vr = "@ts-pattern/anonymous-select-key";
    var Wn = /* @__PURE__ */ __name((e) => !!(e && typeof e == "object"), "Wn");
    var jr = /* @__PURE__ */ __name((e) => e && !!e[_e], "jr");
    var Ee = /* @__PURE__ */ __name((e, t, r) => {
      if (jr(e)) {
        let n = e[_e](), { matched: i, selections: o } = n.match(t);
        return i && o && Object.keys(o).forEach((s) => r(s, o[s])), i;
      }
      if (Wn(e)) {
        if (!Wn(t)) return false;
        if (Array.isArray(e)) {
          if (!Array.isArray(t)) return false;
          let n = [], i = [], o = [];
          for (let s of e.keys()) {
            let a2 = e[s];
            jr(a2) && a2[Su] ? o.push(a2) : o.length ? i.push(a2) : n.push(a2);
          }
          if (o.length) {
            if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
            if (t.length < n.length + i.length) return false;
            let s = t.slice(0, n.length), a2 = i.length === 0 ? [] : t.slice(-i.length), l = t.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
            return n.every((u, c) => Ee(u, s[c], r)) && i.every((u, c) => Ee(u, a2[c], r)) && (o.length === 0 || Ee(o[0], l, r));
          }
          return e.length === t.length && e.every((s, a2) => Ee(s, t[a2], r));
        }
        return Object.keys(e).every((n) => {
          let i = e[n];
          return (n in t || jr(o = i) && o[_e]().matcherType === "optional") && Ee(i, t[n], r);
          var o;
        });
      }
      return Object.is(t, e);
    }, "Ee");
    var Ge = /* @__PURE__ */ __name((e) => {
      var t, r, n;
      return Wn(e) ? jr(e) ? (t = (r = (n = e[_e]()).getSelectionKeys) == null ? void 0 : r.call(n)) != null ? t : [] : Array.isArray(e) ? Wt(e, Ge) : Wt(Object.values(e), Ge) : [];
    }, "Ge");
    var Wt = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => r.concat(t(n)), []), "Wt");
    function pe(e) {
      return Object.assign(e, { optional: /* @__PURE__ */ __name(() => Au(e), "optional"), and: /* @__PURE__ */ __name((t) => j(e, t), "and"), or: /* @__PURE__ */ __name((t) => Iu(e, t), "or"), select: /* @__PURE__ */ __name((t) => t === void 0 ? Oo(e) : Oo(t, e), "select") });
    }
    __name(pe, "pe");
    function Au(e) {
      return pe({ [_e]: () => ({ match: /* @__PURE__ */ __name((t) => {
        let r = {}, n = /* @__PURE__ */ __name((i, o) => {
          r[i] = o;
        }, "n");
        return t === void 0 ? (Ge(e).forEach((i) => n(i, void 0)), { matched: true, selections: r }) : { matched: Ee(e, t, n), selections: r };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => Ge(e), "getSelectionKeys"), matcherType: "optional" }) });
    }
    __name(Au, "Au");
    function j(...e) {
      return pe({ [_e]: () => ({ match: /* @__PURE__ */ __name((t) => {
        let r = {}, n = /* @__PURE__ */ __name((i, o) => {
          r[i] = o;
        }, "n");
        return { matched: e.every((i) => Ee(i, t, n)), selections: r };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => Wt(e, Ge), "getSelectionKeys"), matcherType: "and" }) });
    }
    __name(j, "j");
    function Iu(...e) {
      return pe({ [_e]: () => ({ match: /* @__PURE__ */ __name((t) => {
        let r = {}, n = /* @__PURE__ */ __name((i, o) => {
          r[i] = o;
        }, "n");
        return Wt(e, Ge).forEach((i) => n(i, void 0)), { matched: e.some((i) => Ee(i, t, n)), selections: r };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => Wt(e, Ge), "getSelectionKeys"), matcherType: "or" }) });
    }
    __name(Iu, "Iu");
    function I(e) {
      return { [_e]: () => ({ match: /* @__PURE__ */ __name((t) => ({ matched: !!e(t) }), "match") }) };
    }
    __name(I, "I");
    function Oo(...e) {
      let t = typeof e[0] == "string" ? e[0] : void 0, r = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
      return pe({ [_e]: () => ({ match: /* @__PURE__ */ __name((n) => {
        let i = { [t ?? Vr]: n };
        return { matched: r === void 0 || Ee(r, n, (o, s) => {
          i[o] = s;
        }), selections: i };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => [t ?? Vr].concat(r === void 0 ? [] : Ge(r)), "getSelectionKeys") }) });
    }
    __name(Oo, "Oo");
    function ye(e) {
      return typeof e == "number";
    }
    __name(ye, "ye");
    function je(e) {
      return typeof e == "string";
    }
    __name(je, "je");
    function Ve(e) {
      return typeof e == "bigint";
    }
    __name(Ve, "Ve");
    var Km = pe(I(function(e) {
      return true;
    }));
    var Be = /* @__PURE__ */ __name((e) => Object.assign(pe(e), { startsWith: /* @__PURE__ */ __name((t) => {
      return Be(j(e, (r = t, I((n) => je(n) && n.startsWith(r)))));
      var r;
    }, "startsWith"), endsWith: /* @__PURE__ */ __name((t) => {
      return Be(j(e, (r = t, I((n) => je(n) && n.endsWith(r)))));
      var r;
    }, "endsWith"), minLength: /* @__PURE__ */ __name((t) => Be(j(e, ((r) => I((n) => je(n) && n.length >= r))(t))), "minLength"), length: /* @__PURE__ */ __name((t) => Be(j(e, ((r) => I((n) => je(n) && n.length === r))(t))), "length"), maxLength: /* @__PURE__ */ __name((t) => Be(j(e, ((r) => I((n) => je(n) && n.length <= r))(t))), "maxLength"), includes: /* @__PURE__ */ __name((t) => {
      return Be(j(e, (r = t, I((n) => je(n) && n.includes(r)))));
      var r;
    }, "includes"), regex: /* @__PURE__ */ __name((t) => {
      return Be(j(e, (r = t, I((n) => je(n) && !!n.match(r)))));
      var r;
    }, "regex") }), "Be");
    var zm = Be(I(je));
    var be = /* @__PURE__ */ __name((e) => Object.assign(pe(e), { between: /* @__PURE__ */ __name((t, r) => be(j(e, ((n, i) => I((o) => ye(o) && n <= o && i >= o))(t, r))), "between"), lt: /* @__PURE__ */ __name((t) => be(j(e, ((r) => I((n) => ye(n) && n < r))(t))), "lt"), gt: /* @__PURE__ */ __name((t) => be(j(e, ((r) => I((n) => ye(n) && n > r))(t))), "gt"), lte: /* @__PURE__ */ __name((t) => be(j(e, ((r) => I((n) => ye(n) && n <= r))(t))), "lte"), gte: /* @__PURE__ */ __name((t) => be(j(e, ((r) => I((n) => ye(n) && n >= r))(t))), "gte"), int: /* @__PURE__ */ __name(() => be(j(e, I((t) => ye(t) && Number.isInteger(t)))), "int"), finite: /* @__PURE__ */ __name(() => be(j(e, I((t) => ye(t) && Number.isFinite(t)))), "finite"), positive: /* @__PURE__ */ __name(() => be(j(e, I((t) => ye(t) && t > 0))), "positive"), negative: /* @__PURE__ */ __name(() => be(j(e, I((t) => ye(t) && t < 0))), "negative") }), "be");
    var Ym = be(I(ye));
    var Ue = /* @__PURE__ */ __name((e) => Object.assign(pe(e), { between: /* @__PURE__ */ __name((t, r) => Ue(j(e, ((n, i) => I((o) => Ve(o) && n <= o && i >= o))(t, r))), "between"), lt: /* @__PURE__ */ __name((t) => Ue(j(e, ((r) => I((n) => Ve(n) && n < r))(t))), "lt"), gt: /* @__PURE__ */ __name((t) => Ue(j(e, ((r) => I((n) => Ve(n) && n > r))(t))), "gt"), lte: /* @__PURE__ */ __name((t) => Ue(j(e, ((r) => I((n) => Ve(n) && n <= r))(t))), "lte"), gte: /* @__PURE__ */ __name((t) => Ue(j(e, ((r) => I((n) => Ve(n) && n >= r))(t))), "gte"), positive: /* @__PURE__ */ __name(() => Ue(j(e, I((t) => Ve(t) && t > 0))), "positive"), negative: /* @__PURE__ */ __name(() => Ue(j(e, I((t) => Ve(t) && t < 0))), "negative") }), "Ue");
    var Zm = Ue(I(Ve));
    var Xm = pe(I(function(e) {
      return typeof e == "boolean";
    }));
    var ef = pe(I(function(e) {
      return typeof e == "symbol";
    }));
    var tf = pe(I(function(e) {
      return e == null;
    }));
    var rf = pe(I(function(e) {
      return e != null;
    }));
    var Hn = { matched: false, value: void 0 };
    function mt(e) {
      return new Kn(e, Hn);
    }
    __name(mt, "mt");
    var Kn = class e {
      static {
        __name(this, "e");
      }
      constructor(t, r) {
        this.input = void 0, this.state = void 0, this.input = t, this.state = r;
      }
      with(...t) {
        if (this.state.matched) return this;
        let r = t[t.length - 1], n = [t[0]], i;
        t.length === 3 && typeof t[1] == "function" ? i = t[1] : t.length > 2 && n.push(...t.slice(1, t.length - 1));
        let o = false, s = {}, a2 = /* @__PURE__ */ __name((u, c) => {
          o = true, s[u] = c;
        }, "a"), l = !n.some((u) => Ee(u, this.input, a2)) || i && !i(this.input) ? Hn : { matched: true, value: r(o ? Vr in s ? s[Vr] : s : this.input, this.input) };
        return new e(this.input, l);
      }
      when(t, r) {
        if (this.state.matched) return this;
        let n = !!t(this.input);
        return new e(this.input, n ? { matched: true, value: r(this.input, this.input) } : Hn);
      }
      otherwise(t) {
        return this.state.matched ? this.state.value : t(this.input);
      }
      exhaustive() {
        if (this.state.matched) return this.state.value;
        let t;
        try {
          t = JSON.stringify(this.input);
        } catch {
          t = this.input;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${t}`);
      }
      run() {
        return this.exhaustive();
      }
      returnType() {
        return this;
      }
    };
    var Fo = __require("util");
    var Ou = { warn: ke("prisma:warn") };
    var ku = { warn: /* @__PURE__ */ __name(() => !process.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Br(e, ...t) {
      ku.warn() && console.warn(`${Ou.warn} ${e}`, ...t);
    }
    __name(Br, "Br");
    var Du = (0, Fo.promisify)(_o.default.exec);
    var te = L("prisma:get-platform");
    var _u = ["1.0.x", "1.1.x", "3.0.x"];
    async function Lo() {
      let e = Gr.default.platform(), t = process.arch;
      if (e === "freebsd") {
        let s = await Qr("freebsd-version");
        if (s && s.trim().length > 0) {
          let l = /^(\d+)\.?/.exec(s);
          if (l) return { platform: "freebsd", targetDistro: `freebsd${l[1]}`, arch: t };
        }
      }
      if (e !== "linux") return { platform: e, arch: t };
      let r = await Lu(), n = await Uu(), i = Mu({ arch: t, archFromUname: n, familyDistro: r.familyDistro }), { libssl: o } = await $u(i);
      return { platform: "linux", libssl: o, arch: t, archFromUname: n, ...r };
    }
    __name(Lo, "Lo");
    function Fu(e) {
      let t = /^ID="?([^"\n]*)"?$/im, r = /^ID_LIKE="?([^"\n]*)"?$/im, n = t.exec(e), i = n && n[1] && n[1].toLowerCase() || "", o = r.exec(e), s = o && o[1] && o[1].toLowerCase() || "", a2 = mt({ id: i, idLike: s }).with({ id: "alpine" }, ({ id: l }) => ({ targetDistro: "musl", familyDistro: l, originalDistro: l })).with({ id: "raspbian" }, ({ id: l }) => ({ targetDistro: "arm", familyDistro: "debian", originalDistro: l })).with({ id: "nixos" }, ({ id: l }) => ({ targetDistro: "nixos", originalDistro: l, familyDistro: "nixos" })).with({ id: "debian" }, { id: "ubuntu" }, ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).with({ id: "rhel" }, { id: "centos" }, { id: "fedora" }, ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).when(({ idLike: l }) => l.includes("debian") || l.includes("ubuntu"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).when(({ idLike: l }) => i === "arch" || l.includes("arch"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "arch", originalDistro: l })).when(({ idLike: l }) => l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).otherwise(({ id: l }) => ({ targetDistro: void 0, familyDistro: void 0, originalDistro: l }));
      return te(`Found distro info:
${JSON.stringify(a2, null, 2)}`), a2;
    }
    __name(Fu, "Fu");
    async function Lu() {
      let e = "/etc/os-release";
      try {
        let t = await zn.default.readFile(e, { encoding: "utf-8" });
        return Fu(t);
      } catch {
        return { targetDistro: void 0, familyDistro: void 0, originalDistro: void 0 };
      }
    }
    __name(Lu, "Lu");
    function Nu(e) {
      let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
      if (t) {
        let r = `${t[1]}.x`;
        return No(r);
      }
    }
    __name(Nu, "Nu");
    function ko(e) {
      let t = /libssl\.so\.(\d)(\.\d)?/.exec(e);
      if (t) {
        let r = `${t[1]}${t[2] ?? ".0"}.x`;
        return No(r);
      }
    }
    __name(ko, "ko");
    function No(e) {
      let t = (() => {
        if ($o(e)) return e;
        let r = e.split(".");
        return r[1] = "0", r.join(".");
      })();
      if (_u.includes(t)) return t;
    }
    __name(No, "No");
    function Mu(e) {
      return mt(e).with({ familyDistro: "musl" }, () => (te('Trying platform-specific paths for "alpine"'), ["/lib"])).with({ familyDistro: "debian" }, ({ archFromUname: t }) => (te('Trying platform-specific paths for "debian" (and "ubuntu")'), [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`])).with({ familyDistro: "rhel" }, () => (te('Trying platform-specific paths for "rhel"'), ["/lib64", "/usr/lib64"])).otherwise(({ familyDistro: t, arch: r, archFromUname: n }) => (te(`Don't know any platform-specific paths for "${t}" on ${r} (${n})`), []));
    }
    __name(Mu, "Mu");
    async function $u(e) {
      let t = 'grep -v "libssl.so.0"', r = await Do(e);
      if (r) {
        te(`Found libssl.so file using platform-specific paths: ${r}`);
        let o = ko(r);
        if (te(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "libssl-specific-path" };
      }
      te('Falling back to "ldconfig" and other generic paths');
      let n = await Qr(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`);
      if (n || (n = await Do(["/lib64", "/usr/lib64", "/lib"])), n) {
        te(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
        let o = ko(n);
        if (te(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "ldconfig" };
      }
      let i = await Qr("openssl version -v");
      if (i) {
        te(`Found openssl binary with version: ${i}`);
        let o = Nu(i);
        if (te(`The parsed openssl version is: ${o}`), o) return { libssl: o, strategy: "openssl-binary" };
      }
      return te("Couldn't find any version of libssl or OpenSSL in the system"), {};
    }
    __name($u, "$u");
    async function Do(e) {
      for (let t of e) {
        let r = await qu(t);
        if (r) return r;
      }
    }
    __name(Do, "Do");
    async function qu(e) {
      try {
        return (await zn.default.readdir(e)).find((r) => r.startsWith("libssl.so.") && !r.startsWith("libssl.so.0"));
      } catch (t) {
        if (t.code === "ENOENT") return;
        throw t;
      }
    }
    __name(qu, "qu");
    async function nt() {
      let { binaryTarget: e } = await Mo();
      return e;
    }
    __name(nt, "nt");
    function ju(e) {
      return e.binaryTarget !== void 0;
    }
    __name(ju, "ju");
    async function Yn() {
      let { memoized: e, ...t } = await Mo();
      return t;
    }
    __name(Yn, "Yn");
    var Ur = {};
    async function Mo() {
      if (ju(Ur)) return Promise.resolve({ ...Ur, memoized: true });
      let e = await Lo(), t = Vu(e);
      return Ur = { ...e, binaryTarget: t }, { ...Ur, memoized: false };
    }
    __name(Mo, "Mo");
    function Vu(e) {
      let { platform: t, arch: r, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a2 } = e;
      t === "linux" && !["x64", "arm64"].includes(r) && Br(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures (detected "${r}" instead). If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
      let l = "1.1.x";
      if (t === "linux" && i === void 0) {
        let c = mt({ familyDistro: s }).with({ familyDistro: "debian" }, () => "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(() => "Please manually install OpenSSL and try installing Prisma again.");
        Br(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
      }
      let u = "debian";
      if (t === "linux" && o === void 0 && te(`Distro is "${a2}". Falling back to Prisma engines built for "${u}".`), t === "darwin" && r === "arm64") return "darwin-arm64";
      if (t === "darwin") return "darwin";
      if (t === "win32") return "windows";
      if (t === "freebsd") return o;
      if (t === "openbsd") return "openbsd";
      if (t === "netbsd") return "netbsd";
      if (t === "linux" && o === "nixos") return "linux-nixos";
      if (t === "linux" && r === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
      if (t === "linux" && r === "arm") return `linux-arm-openssl-${i || l}`;
      if (t === "linux" && o === "musl") {
        let c = "linux-musl";
        return !i || $o(i) ? c : `${c}-openssl-${i}`;
      }
      return t === "linux" && o && i ? `${o}-openssl-${i}` : (t !== "linux" && Br(`Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
    }
    __name(Vu, "Vu");
    async function Bu(e) {
      try {
        return await e();
      } catch {
        return;
      }
    }
    __name(Bu, "Bu");
    function Qr(e) {
      return Bu(async () => {
        let t = await Du(e);
        return te(`Command "${e}" successfully returned "${t.stdout}"`), t.stdout;
      });
    }
    __name(Qr, "Qr");
    async function Uu() {
      return typeof Gr.default.machine == "function" ? Gr.default.machine() : (await Qr("uname -m"))?.trim();
    }
    __name(Uu, "Uu");
    function $o(e) {
      return e.startsWith("1.");
    }
    __name($o, "$o");
    var zo = k(Ko());
    function ii(e) {
      return (0, zo.default)(e, e, { fallback: X });
    }
    __name(ii, "ii");
    var Ku = k(si());
    var $ = k(__require("path"));
    var zu = k(si());
    var Lf = L("prisma:engines");
    function Yo() {
      return $.default.join(__dirname, "../");
    }
    __name(Yo, "Yo");
    var Nf = "libquery-engine";
    $.default.join(__dirname, "../query-engine-darwin");
    $.default.join(__dirname, "../query-engine-darwin-arm64");
    $.default.join(__dirname, "../query-engine-debian-openssl-1.0.x");
    $.default.join(__dirname, "../query-engine-debian-openssl-1.1.x");
    $.default.join(__dirname, "../query-engine-debian-openssl-3.0.x");
    $.default.join(__dirname, "../query-engine-linux-static-x64");
    $.default.join(__dirname, "../query-engine-linux-static-arm64");
    $.default.join(__dirname, "../query-engine-rhel-openssl-1.0.x");
    $.default.join(__dirname, "../query-engine-rhel-openssl-1.1.x");
    $.default.join(__dirname, "../query-engine-rhel-openssl-3.0.x");
    $.default.join(__dirname, "../libquery_engine-darwin.dylib.node");
    $.default.join(__dirname, "../libquery_engine-darwin-arm64.dylib.node");
    $.default.join(__dirname, "../libquery_engine-debian-openssl-1.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-debian-openssl-1.1.x.so.node");
    $.default.join(__dirname, "../libquery_engine-debian-openssl-3.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
    $.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-linux-musl.so.node");
    $.default.join(__dirname, "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-rhel-openssl-1.0.x.so.node");
    $.default.join(__dirname, "../libquery_engine-rhel-openssl-1.1.x.so.node");
    $.default.join(__dirname, "../libquery_engine-rhel-openssl-3.0.x.so.node");
    $.default.join(__dirname, "../query_engine-windows.dll.node");
    var ai = k(__require("fs"));
    var Zo = L("chmodPlusX");
    function li(e) {
      if (process.platform === "win32") return;
      let t = ai.default.statSync(e), r = t.mode | 64 | 8 | 1;
      if (t.mode === r) {
        Zo(`Execution permissions of ${e} are fine`);
        return;
      }
      let n = r.toString(8).slice(-3);
      Zo(`Have to call chmodPlusX on ${e}`), ai.default.chmodSync(e, n);
    }
    __name(li, "li");
    function ui(e) {
      let t = e.e, r = /* @__PURE__ */ __name((a2) => `Prisma cannot find the required \`${a2}\` system library in your system`, "r"), n = t.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${ii("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${Oe(e.id)}\`).`, s = mt({ message: t.message, code: t.code }).with({ code: "ENOENT" }, () => "File does not exist.").when(({ message: a2 }) => n && a2.includes("libz"), () => `${r("libz")}. Please install it and try again.`).when(({ message: a2 }) => n && a2.includes("libgcc_s"), () => `${r("libgcc_s")}. Please install it and try again.`).when(({ message: a2 }) => n && a2.includes("libssl"), () => {
        let a2 = e.platformInfo.libssl ? `openssl-${e.platformInfo.libssl}` : "openssl";
        return `${r("libssl")}. Please install ${a2} and try again.`;
      }).when(({ message: a2 }) => a2.includes("GLIBC"), () => `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a2 }) => e.platformInfo.platform === "linux" && a2.includes("symbol not found"), () => `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(() => `The Prisma engines do not seem to be compatible with your system. ${i}`);
      return `${o}
${s}

Details: ${t.message}`;
    }
    __name(ui, "ui");
    var di = k(ts());
    var zr = k(__require("fs"));
    var ht = k(__require("path"));
    function rs(e) {
      let t = e.ignoreProcessEnv ? {} : process.env, r = /* @__PURE__ */ __name((n) => n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function(o, s) {
        let a2 = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
        if (!a2) return o;
        let l = a2[1], u, c;
        if (l === "\\") c = a2[0], u = c.replace("\\$", "$");
        else {
          let p2 = a2[2];
          c = a2[0].substring(l.length), u = Object.hasOwnProperty.call(t, p2) ? t[p2] : e.parsed[p2] || "", u = r(u);
        }
        return o.replace(c, u);
      }, n) ?? n, "r");
      for (let n in e.parsed) {
        let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n];
        e.parsed[n] = r(i);
      }
      for (let n in e.parsed) t[n] = e.parsed[n];
      return e;
    }
    __name(rs, "rs");
    var pi = L("prisma:tryLoadEnv");
    function zt({ rootEnvPath: e, schemaEnvPath: t }, r = { conflictCheck: "none" }) {
      let n = ns(e);
      r.conflictCheck !== "none" && sc(n, t, r.conflictCheck);
      let i = null;
      return is(n?.path, t) || (i = ns(t)), !n && !i && pi("No Environment variables loaded"), i?.dotenvResult.error ? console.error(ce(H("Schema Env Error: ")) + i.dotenvResult.error) : { message: [n?.message, i?.message].filter(Boolean).join(`
`), parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed } };
    }
    __name(zt, "zt");
    function sc(e, t, r) {
      let n = e?.dotenvResult.parsed, i = !is(e?.path, t);
      if (n && t && i && zr.default.existsSync(t)) {
        let o = di.default.parse(zr.default.readFileSync(t)), s = [];
        for (let a2 in o) n[a2] === o[a2] && s.push(a2);
        if (s.length > 0) {
          let a2 = ht.default.relative(process.cwd(), e.path), l = ht.default.relative(process.cwd(), t);
          if (r === "error") {
            let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${X(a2)} and ${X(l)}
Conflicting env vars:
${s.map((c) => `  ${H(c)}`).join(`
`)}

We suggest to move the contents of ${X(l)} to ${X(a2)} to consolidate your env vars.
`;
            throw new Error(u);
          } else if (r === "warn") {
            let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c) => H(c)).join(", ")} in ${X(a2)} and ${X(l)}
Env vars from ${X(l)} overwrite the ones from ${X(a2)}
      `;
            console.warn(`${ke("warn(prisma)")} ${u}`);
          }
        }
      }
    }
    __name(sc, "sc");
    function ns(e) {
      if (ac(e)) {
        pi(`Environment variables loaded from ${e}`);
        let t = di.default.config({ path: e, debug: process.env.DOTENV_CONFIG_DEBUG ? true : void 0 });
        return { dotenvResult: rs(t), message: Oe(`Environment variables loaded from ${ht.default.relative(process.cwd(), e)}`), path: e };
      } else pi(`Environment variables not found at ${e}`);
      return null;
    }
    __name(ns, "ns");
    function is(e, t) {
      return e && t && ht.default.resolve(e) === ht.default.resolve(t);
    }
    __name(is, "is");
    function ac(e) {
      return !!(e && zr.default.existsSync(e));
    }
    __name(ac, "ac");
    var os = "library";
    function Yt(e) {
      let t = lc();
      return t || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : os);
    }
    __name(Yt, "Yt");
    function lc() {
      let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name(lc, "lc");
    var Je;
    ((t) => {
      let e;
      ((E2) => (E2.findUnique = "findUnique", E2.findUniqueOrThrow = "findUniqueOrThrow", E2.findFirst = "findFirst", E2.findFirstOrThrow = "findFirstOrThrow", E2.findMany = "findMany", E2.create = "create", E2.createMany = "createMany", E2.createManyAndReturn = "createManyAndReturn", E2.update = "update", E2.updateMany = "updateMany", E2.upsert = "upsert", E2.delete = "delete", E2.deleteMany = "deleteMany", E2.groupBy = "groupBy", E2.count = "count", E2.aggregate = "aggregate", E2.findRaw = "findRaw", E2.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(Je ||= {});
    var Zt = k(__require("path"));
    function mi(e) {
      return Zt.default.sep === Zt.default.posix.sep ? e : e.split(Zt.default.sep).join(Zt.default.posix.sep);
    }
    __name(mi, "mi");
    var ps = k(fi());
    function hi(e) {
      return String(new gi(e));
    }
    __name(hi, "hi");
    var gi = class {
      static {
        __name(this, "gi");
      }
      constructor(t) {
        this.config = t;
      }
      toString() {
        let { config: t } = this, r = t.provider.fromEnvVar ? `env("${t.provider.fromEnvVar}")` : t.provider.value, n = JSON.parse(JSON.stringify({ provider: r, binaryTargets: cc(t.binaryTargets) }));
        return `generator ${t.name} {
${(0, ps.default)(pc(n), 2)}
}`;
      }
    };
    function cc(e) {
      let t;
      if (e.length > 0) {
        let r = e.find((n) => n.fromEnvVar !== null);
        r ? t = `env("${r.fromEnvVar}")` : t = e.map((n) => n.native ? "native" : n.value);
      } else t = void 0;
      return t;
    }
    __name(cc, "cc");
    function pc(e) {
      let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0);
      return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${dc(n)}`).join(`
`);
    }
    __name(pc, "pc");
    function dc(e) {
      return JSON.parse(JSON.stringify(e, (t, r) => Array.isArray(r) ? `[${r.map((n) => JSON.stringify(n)).join(", ")}]` : JSON.stringify(r)));
    }
    __name(dc, "dc");
    var er = {};
    Ut(er, { error: /* @__PURE__ */ __name(() => gc, "error"), info: /* @__PURE__ */ __name(() => fc, "info"), log: /* @__PURE__ */ __name(() => mc, "log"), query: /* @__PURE__ */ __name(() => hc, "query"), should: /* @__PURE__ */ __name(() => ds, "should"), tags: /* @__PURE__ */ __name(() => Xt, "tags"), warn: /* @__PURE__ */ __name(() => yi, "warn") });
    var Xt = { error: ce("prisma:error"), warn: ke("prisma:warn"), info: De("prisma:info"), query: rt("prisma:query") };
    var ds = { warn: /* @__PURE__ */ __name(() => !process.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function mc(...e) {
      console.log(...e);
    }
    __name(mc, "mc");
    function yi(e, ...t) {
      ds.warn() && console.warn(`${Xt.warn} ${e}`, ...t);
    }
    __name(yi, "yi");
    function fc(e, ...t) {
      console.info(`${Xt.info} ${e}`, ...t);
    }
    __name(fc, "fc");
    function gc(e, ...t) {
      console.error(`${Xt.error} ${e}`, ...t);
    }
    __name(gc, "gc");
    function hc(e, ...t) {
      console.log(`${Xt.query} ${e}`, ...t);
    }
    __name(hc, "hc");
    function Yr(e, t) {
      if (!e) throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(Yr, "Yr");
    function Fe(e, t) {
      throw new Error(t);
    }
    __name(Fe, "Fe");
    function Ei(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(Ei, "Ei");
    var wi = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {}), "wi");
    function yt(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(yt, "yt");
    function xi(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(xi, "xi");
    function w(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(w, "w");
    var ys = /* @__PURE__ */ new Set();
    var tr = /* @__PURE__ */ __name((e, t, ...r) => {
      ys.has(e) || (ys.add(e), yi(t, ...r));
    }, "tr");
    var V = class extends Error {
      static {
        __name(this, "V");
      }
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    w(V, "PrismaClientKnownRequestError");
    var Le = class extends V {
      static {
        __name(this, "Le");
      }
      constructor(t, r) {
        super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
      }
    };
    w(Le, "NotFoundError");
    var R = class e extends Error {
      static {
        __name(this, "e");
      }
      constructor(t, r, n) {
        super(t), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    w(R, "PrismaClientInitializationError");
    var le = class extends Error {
      static {
        __name(this, "le");
      }
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    w(le, "PrismaClientRustPanicError");
    var B = class extends Error {
      static {
        __name(this, "B");
      }
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    w(B, "PrismaClientUnknownRequestError");
    var J = class extends Error {
      static {
        __name(this, "J");
      }
      constructor(r, { clientVersion: n }) {
        super(r);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    w(J, "PrismaClientValidationError");
    var bt = 9e15;
    var ze = 1e9;
    var Pi = "0123456789abcdef";
    var tn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var rn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var vi = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -bt, maxE: bt, crypto: false };
    var xs;
    var Ne;
    var x = true;
    var on = "[DecimalError] ";
    var Ke = on + "Invalid argument: ";
    var Ps = on + "Precision limit exceeded";
    var vs = on + "crypto unavailable";
    var Ts = "[object Decimal]";
    var ee = Math.floor;
    var G = Math.pow;
    var bc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var Ec = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var wc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var Rs = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var ge = 1e7;
    var b = 7;
    var xc = 9007199254740991;
    var Pc = tn.length - 1;
    var Ti = rn.length - 1;
    var m = { toStringTag: Ts };
    m.absoluteValue = m.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), y(e);
    };
    m.ceil = function() {
      return y(new this.constructor(this), this.e + 1, 2);
    };
    m.clampedTo = m.clamp = function(e, t) {
      var r, n = this, i = n.constructor;
      if (e = new i(e), t = new i(t), !e.s || !t.s) return new i(NaN);
      if (e.gt(t)) throw Error(Ke + t);
      return r = n.cmp(e), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n);
    };
    m.comparedTo = m.cmp = function(e) {
      var t, r, n, i, o = this, s = o.d, a2 = (e = new o.constructor(e)).d, l = o.s, u = e.s;
      if (!s || !a2) return !l || !u ? NaN : l !== u ? l : s === a2 ? 0 : !s ^ l < 0 ? 1 : -1;
      if (!s[0] || !a2[0]) return s[0] ? l : a2[0] ? -u : 0;
      if (l !== u) return l;
      if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
      for (n = s.length, i = a2.length, t = 0, r = n < i ? n : i; t < r; ++t) if (s[t] !== a2[t]) return s[t] > a2[t] ^ l < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
    };
    m.cosine = m.cos = function() {
      var e, t, r = this, n = r.constructor;
      return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + b, n.rounding = 1, r = vc(n, Os(n, r)), n.precision = e, n.rounding = t, y(Ne == 2 || Ne == 3 ? r.neg() : r, e, t, true)) : new n(1) : new n(NaN);
    };
    m.cubeRoot = m.cbrt = function() {
      var e, t, r, n, i, o, s, a2, l, u, c = this, p2 = c.constructor;
      if (!c.isFinite() || c.isZero()) return new p2(c);
      for (x = false, o = c.s * G(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (r = K(c.d), e = c.e, (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? "0" : "00"), o = G(r, 1 / 3), e = ee((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? r = "5e" + e : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e), n = new p2(r), n.s = c.s) : n = new p2(o.toString()), s = (e = p2.precision) + 3; ; ) if (a2 = n, l = a2.times(a2).times(a2), u = l.plus(c), n = N(u.plus(c).times(a2), u.plus(l), s + 2, 1), K(a2.d).slice(0, s) === (r = K(n.d)).slice(0, s)) if (r = r.slice(s - 3, s + 1), r == "9999" || !i && r == "4999") {
        if (!i && (y(a2, e + 1, 0), a2.times(a2).times(a2).eq(c))) {
          n = a2;
          break;
        }
        s += 4, i = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (y(n, e + 1, 1), t = !n.times(n).times(n).eq(c));
        break;
      }
      return x = true, y(n, e, p2.rounding, t);
    };
    m.decimalPlaces = m.dp = function() {
      var e, t = this.d, r = NaN;
      if (t) {
        if (e = t.length - 1, r = (e - ee(this.e / b)) * b, e = t[e], e) for (; e % 10 == 0; e /= 10) r--;
        r < 0 && (r = 0);
      }
      return r;
    };
    m.dividedBy = m.div = function(e) {
      return N(this, new this.constructor(e));
    };
    m.dividedToIntegerBy = m.divToInt = function(e) {
      var t = this, r = t.constructor;
      return y(N(t, new r(e), 0, 1, 1), r.precision, r.rounding);
    };
    m.equals = m.eq = function(e) {
      return this.cmp(e) === 0;
    };
    m.floor = function() {
      return y(new this.constructor(this), this.e + 1, 3);
    };
    m.greaterThan = m.gt = function(e) {
      return this.cmp(e) > 0;
    };
    m.greaterThanOrEqualTo = m.gte = function(e) {
      var t = this.cmp(e);
      return t == 1 || t === 0;
    };
    m.hyperbolicCosine = m.cosh = function() {
      var e, t, r, n, i, o = this, s = o.constructor, a2 = new s(1);
      if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
      if (o.isZero()) return a2;
      r = s.precision, n = s.rounding, s.precision = r + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), t = (1 / an(4, e)).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), o = Et(s, 1, o.times(t), new s(1), true);
      for (var l, u = e, c = new s(8); u--; ) l = o.times(o), o = a2.minus(l.times(c.minus(l.times(c))));
      return y(o, s.precision = r, s.rounding = n, true);
    };
    m.hyperbolicSine = m.sinh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      if (!i.isFinite() || i.isZero()) return new o(i);
      if (t = o.precision, r = o.rounding, o.precision = t + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = Et(o, 2, i, i, true);
      else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / an(5, e)), i = Et(o, 2, i, i, true);
        for (var s, a2 = new o(5), l = new o(16), u = new o(20); e--; ) s = i.times(i), i = i.times(a2.plus(s.times(l.times(s).plus(u))));
      }
      return o.precision = t, o.rounding = r, y(i, t, r, true);
    };
    m.hyperbolicTangent = m.tanh = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, N(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s);
    };
    m.inverseCosine = m.acos = function() {
      var e, t = this, r = t.constructor, n = t.abs().cmp(1), i = r.precision, o = r.rounding;
      return n !== -1 ? n === 0 ? t.isNeg() ? fe(r, i, o) : new r(0) : new r(NaN) : t.isZero() ? fe(r, i + 4, o).times(0.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = fe(r, i + 4, o).times(0.5), r.precision = i, r.rounding = o, e.minus(t));
    };
    m.inverseHyperbolicCosine = m.acosh = function() {
      var e, t, r = this, n = r.constructor;
      return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, x = false, r = r.times(r).minus(1).sqrt().plus(r), x = true, n.precision = e, n.rounding = t, r.ln()) : new n(r);
    };
    m.inverseHyperbolicSine = m.asinh = function() {
      var e, t, r = this, n = r.constructor;
      return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, x = false, r = r.times(r).plus(1).sqrt().plus(r), x = true, n.precision = e, n.rounding = t, r.ln());
    };
    m.inverseHyperbolicTangent = m.atanh = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, t = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? y(new o(i), e, t, true) : (o.precision = r = n - i.e, i = N(i.plus(1), new o(1).minus(i), r + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = t, i.times(0.5))) : new o(NaN);
    };
    m.inverseSine = m.asin = function() {
      var e, t, r, n, i = this, o = i.constructor;
      return i.isZero() ? new o(i) : (t = i.abs().cmp(1), r = o.precision, n = o.rounding, t !== -1 ? t === 0 ? (e = fe(o, r + 4, n).times(0.5), e.s = i.s, e) : new o(NaN) : (o.precision = r + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = r, o.rounding = n, i.times(2)));
    };
    m.inverseTangent = m.atan = function() {
      var e, t, r, n, i, o, s, a2, l, u = this, c = u.constructor, p2 = c.precision, d = c.rounding;
      if (u.isFinite()) {
        if (u.isZero()) return new c(u);
        if (u.abs().eq(1) && p2 + 4 <= Ti) return s = fe(c, p2 + 4, d).times(0.25), s.s = u.s, s;
      } else {
        if (!u.s) return new c(NaN);
        if (p2 + 4 <= Ti) return s = fe(c, p2 + 4, d).times(0.5), s.s = u.s, s;
      }
      for (c.precision = a2 = p2 + 10, c.rounding = 1, r = Math.min(28, a2 / b + 2 | 0), e = r; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
      for (x = false, t = Math.ceil(a2 / b), n = 1, l = u.times(u), s = new c(u), i = u; e !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[t] !== void 0) for (e = t; s.d[e] === o.d[e] && e--; ) ;
      return r && (s = s.times(2 << r - 1)), x = true, y(s, c.precision = p2, c.rounding = d, true);
    };
    m.isFinite = function() {
      return !!this.d;
    };
    m.isInteger = m.isInt = function() {
      return !!this.d && ee(this.e / b) > this.d.length - 2;
    };
    m.isNaN = function() {
      return !this.s;
    };
    m.isNegative = m.isNeg = function() {
      return this.s < 0;
    };
    m.isPositive = m.isPos = function() {
      return this.s > 0;
    };
    m.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    m.lessThan = m.lt = function(e) {
      return this.cmp(e) < 0;
    };
    m.lessThanOrEqualTo = m.lte = function(e) {
      return this.cmp(e) < 1;
    };
    m.logarithm = m.log = function(e) {
      var t, r, n, i, o, s, a2, l, u = this, c = u.constructor, p2 = c.precision, d = c.rounding, f = 5;
      if (e == null) e = new c(10), t = true;
      else {
        if (e = new c(e), r = e.d, e.s < 0 || !r || !r[0] || e.eq(1)) return new c(NaN);
        t = e.eq(10);
      }
      if (r = u.d, u.s < 0 || !r || !r[0] || u.eq(1)) return new c(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
      if (t) if (r.length > 1) o = true;
      else {
        for (i = r[0]; i % 10 === 0; ) i /= 10;
        o = i !== 1;
      }
      if (x = false, a2 = p2 + f, s = He(u, a2), n = t ? nn(c, a2 + 10) : He(e, a2), l = N(s, n, a2, 1), rr(l.d, i = p2, d)) do
        if (a2 += 10, s = He(u, a2), n = t ? nn(c, a2 + 10) : He(e, a2), l = N(s, n, a2, 1), !o) {
          +K(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = y(l, p2 + 1, 0));
          break;
        }
      while (rr(l.d, i += 10, d));
      return x = true, y(l, p2, d);
    };
    m.minus = m.sub = function(e) {
      var t, r, n, i, o, s, a2, l, u, c, p2, d, f = this, g = f.constructor;
      if (e = new g(e), !f.d || !e.d) return !f.s || !e.s ? e = new g(NaN) : f.d ? e.s = -e.s : e = new g(e.d || f.s !== e.s ? f : NaN), e;
      if (f.s != e.s) return e.s = -e.s, f.plus(e);
      if (u = f.d, d = e.d, a2 = g.precision, l = g.rounding, !u[0] || !d[0]) {
        if (d[0]) e.s = -e.s;
        else if (u[0]) e = new g(f);
        else return new g(l === 3 ? -0 : 0);
        return x ? y(e, a2, l) : e;
      }
      if (r = ee(e.e / b), c = ee(f.e / b), u = u.slice(), o = c - r, o) {
        for (p2 = o < 0, p2 ? (t = u, o = -o, s = d.length) : (t = d, r = c, s = u.length), n = Math.max(Math.ceil(a2 / b), s) + 2, o > n && (o = n, t.length = 1), t.reverse(), n = o; n--; ) t.push(0);
        t.reverse();
      } else {
        for (n = u.length, s = d.length, p2 = n < s, p2 && (s = n), n = 0; n < s; n++) if (u[n] != d[n]) {
          p2 = u[n] < d[n];
          break;
        }
        o = 0;
      }
      for (p2 && (t = u, u = d, d = t, e.s = -e.s), s = u.length, n = d.length - s; n > 0; --n) u[s++] = 0;
      for (n = d.length; n > o; ) {
        if (u[--n] < d[n]) {
          for (i = n; i && u[--i] === 0; ) u[i] = ge - 1;
          --u[i], u[n] += ge;
        }
        u[n] -= d[n];
      }
      for (; u[--s] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --r;
      return u[0] ? (e.d = u, e.e = sn(u, r), x ? y(e, a2, l) : e) : new g(l === 3 ? -0 : 0);
    };
    m.modulo = m.mod = function(e) {
      var t, r = this, n = r.constructor;
      return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? y(new n(r), n.precision, n.rounding) : (x = false, n.modulo == 9 ? (t = N(r, e.abs(), 0, 3, 1), t.s *= e.s) : t = N(r, e, 0, n.modulo, 1), t = t.times(e), x = true, r.minus(t));
    };
    m.naturalExponential = m.exp = function() {
      return Ri(this);
    };
    m.naturalLogarithm = m.ln = function() {
      return He(this);
    };
    m.negated = m.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, y(e);
    };
    m.plus = m.add = function(e) {
      var t, r, n, i, o, s, a2, l, u, c, p2 = this, d = p2.constructor;
      if (e = new d(e), !p2.d || !e.d) return !p2.s || !e.s ? e = new d(NaN) : p2.d || (e = new d(e.d || p2.s === e.s ? p2 : NaN)), e;
      if (p2.s != e.s) return e.s = -e.s, p2.minus(e);
      if (u = p2.d, c = e.d, a2 = d.precision, l = d.rounding, !u[0] || !c[0]) return c[0] || (e = new d(p2)), x ? y(e, a2, l) : e;
      if (o = ee(p2.e / b), n = ee(e.e / b), u = u.slice(), i = o - n, i) {
        for (i < 0 ? (r = u, i = -i, s = c.length) : (r = c, n = o, s = u.length), o = Math.ceil(a2 / b), s = o > s ? o + 1 : s + 1, i > s && (i = s, r.length = 1), r.reverse(); i--; ) r.push(0);
        r.reverse();
      }
      for (s = u.length, i = c.length, s - i < 0 && (i = s, r = c, c = u, u = r), t = 0; i; ) t = (u[--i] = u[i] + c[i] + t) / ge | 0, u[i] %= ge;
      for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop();
      return e.d = u, e.e = sn(u, n), x ? y(e, a2, l) : e;
    };
    m.precision = m.sd = function(e) {
      var t, r = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ke + e);
      return r.d ? (t = Cs(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
    };
    m.round = function() {
      var e = this, t = e.constructor;
      return y(new t(e), e.e + 1, t.rounding);
    };
    m.sine = m.sin = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + b, n.rounding = 1, r = Rc(n, Os(n, r)), n.precision = e, n.rounding = t, y(Ne > 2 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    m.squareRoot = m.sqrt = function() {
      var e, t, r, n, i, o, s = this, a2 = s.d, l = s.e, u = s.s, c = s.constructor;
      if (u !== 1 || !a2 || !a2[0]) return new c(!u || u < 0 && (!a2 || a2[0]) ? NaN : a2 ? s : 1 / 0);
      for (x = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (t = K(a2), (t.length + l) % 2 == 0 && (t += "0"), u = Math.sqrt(t), l = ee((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? t = "5e" + l : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + l), n = new c(t)) : n = new c(u.toString()), r = (l = c.precision) + 3; ; ) if (o = n, n = o.plus(N(s, o, r + 2, 1)).times(0.5), K(o.d).slice(0, r) === (t = K(n.d)).slice(0, r)) if (t = t.slice(r - 3, r + 1), t == "9999" || !i && t == "4999") {
        if (!i && (y(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        r += 4, i = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (y(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
      }
      return x = true, y(n, l, c.rounding, e);
    };
    m.tangent = m.tan = function() {
      var e, t, r = this, n = r.constructor;
      return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = N(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, y(Ne == 2 || Ne == 4 ? r.neg() : r, e, t, true)) : new n(NaN);
    };
    m.times = m.mul = function(e) {
      var t, r, n, i, o, s, a2, l, u, c = this, p2 = c.constructor, d = c.d, f = (e = new p2(e)).d;
      if (e.s *= c.s, !d || !d[0] || !f || !f[0]) return new p2(!e.s || d && !d[0] && !f || f && !f[0] && !d ? NaN : !d || !f ? e.s / 0 : e.s * 0);
      for (r = ee(c.e / b) + ee(e.e / b), l = d.length, u = f.length, l < u && (o = d, d = f, f = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
      for (n = u; --n >= 0; ) {
        for (t = 0, i = l + n; i > n; ) a2 = o[i] + f[n] * d[i - n - 1] + t, o[i--] = a2 % ge | 0, t = a2 / ge | 0;
        o[i] = (o[i] + t) % ge | 0;
      }
      for (; !o[--s]; ) o.pop();
      return t ? ++r : o.shift(), e.d = o, e.e = sn(o, r), x ? y(e, p2.precision, p2.rounding) : e;
    };
    m.toBinary = function(e, t) {
      return Si(this, 2, e, t);
    };
    m.toDecimalPlaces = m.toDP = function(e, t) {
      var r = this, n = r.constructor;
      return r = new n(r), e === void 0 ? r : (ie(e, 0, ze), t === void 0 ? t = n.rounding : ie(t, 0, 8), y(r, e + r.e + 1, t));
    };
    m.toExponential = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = we(n, true) : (ie(e, 0, ze), t === void 0 ? t = i.rounding : ie(t, 0, 8), n = y(new i(n), e + 1, t), r = we(n, true, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    m.toFixed = function(e, t) {
      var r, n, i = this, o = i.constructor;
      return e === void 0 ? r = we(i) : (ie(e, 0, ze), t === void 0 ? t = o.rounding : ie(t, 0, 8), n = y(new o(i), e + i.e + 1, t), r = we(n, false, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
    };
    m.toFraction = function(e) {
      var t, r, n, i, o, s, a2, l, u, c, p2, d, f = this, g = f.d, h = f.constructor;
      if (!g) return new h(f);
      if (u = r = new h(1), n = l = new h(0), t = new h(n), o = t.e = Cs(g) - f.e - 1, s = o % b, t.d[0] = G(10, s < 0 ? b + s : s), e == null) e = o > 0 ? t : u;
      else {
        if (a2 = new h(e), !a2.isInt() || a2.lt(u)) throw Error(Ke + a2);
        e = a2.gt(t) ? o > 0 ? t : u : a2;
      }
      for (x = false, a2 = new h(K(g)), c = h.precision, h.precision = o = g.length * b * 2; p2 = N(a2, t, 0, 1, 1), i = r.plus(p2.times(n)), i.cmp(e) != 1; ) r = n, n = i, i = u, u = l.plus(p2.times(i)), l = i, i = t, t = a2.minus(p2.times(i)), a2 = i;
      return i = N(e.minus(r), n, 0, 1, 1), l = l.plus(i.times(u)), r = r.plus(i.times(n)), l.s = u.s = f.s, d = N(u, n, o, 1).minus(f).abs().cmp(N(l, r, o, 1).minus(f).abs()) < 1 ? [u, n] : [l, r], h.precision = c, x = true, d;
    };
    m.toHexadecimal = m.toHex = function(e, t) {
      return Si(this, 16, e, t);
    };
    m.toNearest = function(e, t) {
      var r = this, n = r.constructor;
      if (r = new n(r), e == null) {
        if (!r.d) return r;
        e = new n(1), t = n.rounding;
      } else {
        if (e = new n(e), t === void 0 ? t = n.rounding : ie(t, 0, 8), !r.d) return e.s ? r : e;
        if (!e.d) return e.s && (e.s = r.s), e;
      }
      return e.d[0] ? (x = false, r = N(r, e, 0, t, 1).times(e), x = true, y(r)) : (e.s = r.s, r = e), r;
    };
    m.toNumber = function() {
      return +this;
    };
    m.toOctal = function(e, t) {
      return Si(this, 8, e, t);
    };
    m.toPower = m.pow = function(e) {
      var t, r, n, i, o, s, a2 = this, l = a2.constructor, u = +(e = new l(e));
      if (!a2.d || !e.d || !a2.d[0] || !e.d[0]) return new l(G(+a2, u));
      if (a2 = new l(a2), a2.eq(1)) return a2;
      if (n = l.precision, o = l.rounding, e.eq(1)) return y(a2, n, o);
      if (t = ee(e.e / b), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= xc) return i = Ss(l, a2, r, n), e.s < 0 ? new l(1).div(i) : y(i, n, o);
      if (s = a2.s, s < 0) {
        if (t < e.d.length - 1) return new l(NaN);
        if (e.d[t] & 1 || (s = 1), a2.e == 0 && a2.d[0] == 1 && a2.d.length == 1) return a2.s = s, a2;
      }
      return r = G(+a2, u), t = r == 0 || !isFinite(r) ? ee(u * (Math.log("0." + K(a2.d)) / Math.LN10 + a2.e + 1)) : new l(r + "").e, t > l.maxE + 1 || t < l.minE - 1 ? new l(t > 0 ? s / 0 : 0) : (x = false, l.rounding = a2.s = 1, r = Math.min(12, (t + "").length), i = Ri(e.times(He(a2, n + r)), n), i.d && (i = y(i, n + 5, 1), rr(i.d, n, o) && (t = n + 10, i = y(Ri(e.times(He(a2, t + r)), t), t + 5, 1), +K(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = y(i, n + 1, 0)))), i.s = s, x = true, l.rounding = o, y(i, n, o));
    };
    m.toPrecision = function(e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0 ? r = we(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (ie(e, 1, ze), t === void 0 ? t = i.rounding : ie(t, 0, 8), n = y(new i(n), e, t), r = we(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r;
    };
    m.toSignificantDigits = m.toSD = function(e, t) {
      var r = this, n = r.constructor;
      return e === void 0 ? (e = n.precision, t = n.rounding) : (ie(e, 1, ze), t === void 0 ? t = n.rounding : ie(t, 0, 8)), y(new n(r), e, t);
    };
    m.toString = function() {
      var e = this, t = e.constructor, r = we(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + r : r;
    };
    m.truncated = m.trunc = function() {
      return y(new this.constructor(this), this.e + 1, 1);
    };
    m.valueOf = m.toJSON = function() {
      var e = this, t = e.constructor, r = we(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
      return e.isNeg() ? "-" + r : r;
    };
    function K(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++) n = e[t] + "", r = b - n.length, r && (o += We(r)), o += n;
        s = e[t], n = s + "", r = b - n.length, r && (o += We(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(K, "K");
    function ie(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(Ke + e);
    }
    __name(ie, "ie");
    function rr(e, t, r, n) {
      var i, o, s, a2;
      for (o = e[0]; o >= 10; o /= 10) --t;
      return --t < 0 ? (t += b, i = 0) : (i = Math.ceil((t + 1) / b), t %= b), o = G(10, b - t), a2 = e[i] % o | 0, n == null ? t < 3 ? (t == 0 ? a2 = a2 / 100 | 0 : t == 1 && (a2 = a2 / 10 | 0), s = r < 4 && a2 == 99999 || r > 3 && a2 == 49999 || a2 == 5e4 || a2 == 0) : s = (r < 4 && a2 + 1 == o || r > 3 && a2 + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == G(10, t - 2) - 1 || (a2 == o / 2 || a2 == 0) && (e[i + 1] / o / 100 | 0) == 0 : t < 4 ? (t == 0 ? a2 = a2 / 1e3 | 0 : t == 1 ? a2 = a2 / 100 | 0 : t == 2 && (a2 = a2 / 10 | 0), s = (n || r < 4) && a2 == 9999 || !n && r > 3 && a2 == 4999) : s = ((n || r < 4) && a2 + 1 == o || !n && r > 3 && a2 + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == G(10, t - 3) - 1, s;
    }
    __name(rr, "rr");
    function en(e, t, r) {
      for (var n, i = [0], o, s = 0, a2 = e.length; s < a2; ) {
        for (o = i.length; o--; ) i[o] *= t;
        for (i[0] += Pi.indexOf(e.charAt(s++)), n = 0; n < i.length; n++) i[n] > r - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / r | 0, i[n] %= r);
      }
      return i.reverse();
    }
    __name(en, "en");
    function vc(e, t) {
      var r, n, i;
      if (t.isZero()) return t;
      n = t.d.length, n < 32 ? (r = Math.ceil(n / 3), i = (1 / an(4, r)).toString()) : (r = 16, i = "2.3283064365386962890625e-10"), e.precision += r, t = Et(e, 1, t.times(i), new e(1));
      for (var o = r; o--; ) {
        var s = t.times(t);
        t = s.times(s).minus(s).times(8).plus(1);
      }
      return e.precision -= r, t;
    }
    __name(vc, "vc");
    var N = /* @__PURE__ */ function() {
      function e(n, i, o) {
        var s, a2 = 0, l = n.length;
        for (n = n.slice(); l--; ) s = n[l] * i + a2, n[l] = s % o | 0, a2 = s / o | 0;
        return a2 && n.unshift(a2), n;
      }
      __name(e, "e");
      function t(n, i, o, s) {
        var a2, l;
        if (o != s) l = o > s ? 1 : -1;
        else for (a2 = l = 0; a2 < o; a2++) if (n[a2] != i[a2]) {
          l = n[a2] > i[a2] ? 1 : -1;
          break;
        }
        return l;
      }
      __name(t, "t");
      function r(n, i, o, s) {
        for (var a2 = 0; o--; ) n[o] -= a2, a2 = n[o] < i[o] ? 1 : 0, n[o] = a2 * s + n[o] - i[o];
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      __name(r, "r");
      return function(n, i, o, s, a2, l) {
        var u, c, p2, d, f, g, h, O2, T, S2, C, E2, me, ae, Bt2, U2, ne, Ie, z2, dt, Lr = n.constructor, qn = n.s == i.s ? 1 : -1, Y = n.d, _2 = i.d;
        if (!Y || !Y[0] || !_2 || !_2[0]) return new Lr(!n.s || !i.s || (Y ? _2 && Y[0] == _2[0] : !_2) ? NaN : Y && Y[0] == 0 || !_2 ? qn * 0 : qn / 0);
        for (l ? (f = 1, c = n.e - i.e) : (l = ge, f = b, c = ee(n.e / f) - ee(i.e / f)), z2 = _2.length, ne = Y.length, T = new Lr(qn), S2 = T.d = [], p2 = 0; _2[p2] == (Y[p2] || 0); p2++) ;
        if (_2[p2] > (Y[p2] || 0) && c--, o == null ? (ae = o = Lr.precision, s = Lr.rounding) : a2 ? ae = o + (n.e - i.e) + 1 : ae = o, ae < 0) S2.push(1), g = true;
        else {
          if (ae = ae / f + 2 | 0, p2 = 0, z2 == 1) {
            for (d = 0, _2 = _2[0], ae++; (p2 < ne || d) && ae--; p2++) Bt2 = d * l + (Y[p2] || 0), S2[p2] = Bt2 / _2 | 0, d = Bt2 % _2 | 0;
            g = d || p2 < ne;
          } else {
            for (d = l / (_2[0] + 1) | 0, d > 1 && (_2 = e(_2, d, l), Y = e(Y, d, l), z2 = _2.length, ne = Y.length), U2 = z2, C = Y.slice(0, z2), E2 = C.length; E2 < z2; ) C[E2++] = 0;
            dt = _2.slice(), dt.unshift(0), Ie = _2[0], _2[1] >= l / 2 && ++Ie;
            do
              d = 0, u = t(_2, C, z2, E2), u < 0 ? (me = C[0], z2 != E2 && (me = me * l + (C[1] || 0)), d = me / Ie | 0, d > 1 ? (d >= l && (d = l - 1), h = e(_2, d, l), O2 = h.length, E2 = C.length, u = t(h, C, O2, E2), u == 1 && (d--, r(h, z2 < O2 ? dt : _2, O2, l))) : (d == 0 && (u = d = 1), h = _2.slice()), O2 = h.length, O2 < E2 && h.unshift(0), r(C, h, E2, l), u == -1 && (E2 = C.length, u = t(_2, C, z2, E2), u < 1 && (d++, r(C, z2 < E2 ? dt : _2, E2, l))), E2 = C.length) : u === 0 && (d++, C = [0]), S2[p2++] = d, u && C[0] ? C[E2++] = Y[U2] || 0 : (C = [Y[U2]], E2 = 1);
            while ((U2++ < ne || C[0] !== void 0) && ae--);
            g = C[0] !== void 0;
          }
          S2[0] || S2.shift();
        }
        if (f == 1) T.e = c, xs = g;
        else {
          for (p2 = 1, d = S2[0]; d >= 10; d /= 10) p2++;
          T.e = p2 + c * f - 1, y(T, a2 ? o + T.e + 1 : o, s, g);
        }
        return T;
      };
    }();
    function y(e, t, r, n) {
      var i, o, s, a2, l, u, c, p2, d, f = e.constructor;
      e: if (t != null) {
        if (p2 = e.d, !p2) return e;
        for (i = 1, a2 = p2[0]; a2 >= 10; a2 /= 10) i++;
        if (o = t - i, o < 0) o += b, s = t, c = p2[d = 0], l = c / G(10, i - s - 1) % 10 | 0;
        else if (d = Math.ceil((o + 1) / b), a2 = p2.length, d >= a2) if (n) {
          for (; a2++ <= d; ) p2.push(0);
          c = l = 0, i = 1, o %= b, s = o - b + 1;
        } else break e;
        else {
          for (c = a2 = p2[d], i = 1; a2 >= 10; a2 /= 10) i++;
          o %= b, s = o - b + i, l = s < 0 ? 0 : c / G(10, i - s - 1) % 10 | 0;
        }
        if (n = n || t < 0 || p2[d + 1] !== void 0 || (s < 0 ? c : c % G(10, i - s - 1)), u = r < 4 ? (l || n) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || n || r == 6 && (o > 0 ? s > 0 ? c / G(10, i - s) : 0 : p2[d - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !p2[0]) return p2.length = 0, u ? (t -= e.e + 1, p2[0] = G(10, (b - t % b) % b), e.e = -t || 0) : p2[0] = e.e = 0, e;
        if (o == 0 ? (p2.length = d, a2 = 1, d--) : (p2.length = d + 1, a2 = G(10, b - o), p2[d] = s > 0 ? (c / G(10, i - s) % G(10, s) | 0) * a2 : 0), u) for (; ; ) if (d == 0) {
          for (o = 1, s = p2[0]; s >= 10; s /= 10) o++;
          for (s = p2[0] += a2, a2 = 1; s >= 10; s /= 10) a2++;
          o != a2 && (e.e++, p2[0] == ge && (p2[0] = 1));
          break;
        } else {
          if (p2[d] += a2, p2[d] != ge) break;
          p2[d--] = 0, a2 = 1;
        }
        for (o = p2.length; p2[--o] === 0; ) p2.pop();
      }
      return x && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
    }
    __name(y, "y");
    function we(e, t, r) {
      if (!e.isFinite()) return Is(e);
      var n, i = e.e, o = K(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + We(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + We(-i - 1) + o, r && (n = r - s) > 0 && (o += We(n))) : i >= s ? (o += We(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + We(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += We(n))), o;
    }
    __name(we, "we");
    function sn(e, t) {
      var r = e[0];
      for (t *= b; r >= 10; r /= 10) t++;
      return t;
    }
    __name(sn, "sn");
    function nn(e, t, r) {
      if (t > Pc) throw x = true, r && (e.precision = r), Error(Ps);
      return y(new e(tn), t, 1, true);
    }
    __name(nn, "nn");
    function fe(e, t, r) {
      if (t > Ti) throw Error(Ps);
      return y(new e(rn), t, r, true);
    }
    __name(fe, "fe");
    function Cs(e) {
      var t = e.length - 1, r = t * b + 1;
      if (t = e[t], t) {
        for (; t % 10 == 0; t /= 10) r--;
        for (t = e[0]; t >= 10; t /= 10) r++;
      }
      return r;
    }
    __name(Cs, "Cs");
    function We(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    __name(We, "We");
    function Ss(e, t, r, n) {
      var i, o = new e(1), s = Math.ceil(n / b + 4);
      for (x = false; ; ) {
        if (r % 2 && (o = o.times(t), Es(o.d, s) && (i = true)), r = ee(r / 2), r === 0) {
          r = o.d.length - 1, i && o.d[r] === 0 && ++o.d[r];
          break;
        }
        t = t.times(t), Es(t.d, s);
      }
      return x = true, o;
    }
    __name(Ss, "Ss");
    function bs(e) {
      return e.d[e.d.length - 1] & 1;
    }
    __name(bs, "bs");
    function As(e, t, r) {
      for (var n, i = new e(t[0]), o = 0; ++o < t.length; ) if (n = new e(t[o]), n.s) i[r](n) && (i = n);
      else {
        i = n;
        break;
      }
      return i;
    }
    __name(As, "As");
    function Ri(e, t) {
      var r, n, i, o, s, a2, l, u = 0, c = 0, p2 = 0, d = e.constructor, f = d.rounding, g = d.precision;
      if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (t == null ? (x = false, l = g) : l = t, a2 = new d(0.03125); e.e > -2; ) e = e.times(a2), p2 += 5;
      for (n = Math.log(G(2, p2)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = s = new d(1), d.precision = l; ; ) {
        if (o = y(o.times(e), l, 1), r = r.times(++c), a2 = s.plus(N(o, r, l, 1)), K(a2.d).slice(0, l) === K(s.d).slice(0, l)) {
          for (i = p2; i--; ) s = y(s.times(s), l, 1);
          if (t == null) if (u < 3 && rr(s.d, l - n, f, u)) d.precision = l += 10, r = o = a2 = new d(1), c = 0, u++;
          else return y(s, d.precision = g, f, x = true);
          else return d.precision = g, s;
        }
        s = a2;
      }
    }
    __name(Ri, "Ri");
    function He(e, t) {
      var r, n, i, o, s, a2, l, u, c, p2, d, f = 1, g = 10, h = e, O2 = h.d, T = h.constructor, S2 = T.rounding, C = T.precision;
      if (h.s < 0 || !O2 || !O2[0] || !h.e && O2[0] == 1 && O2.length == 1) return new T(O2 && !O2[0] ? -1 / 0 : h.s != 1 ? NaN : O2 ? 0 : h);
      if (t == null ? (x = false, c = C) : c = t, T.precision = c += g, r = K(O2), n = r.charAt(0), Math.abs(o = h.e) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) h = h.times(e), r = K(h.d), n = r.charAt(0), f++;
        o = h.e, n > 1 ? (h = new T("0." + r), o++) : h = new T(n + "." + r.slice(1));
      } else return u = nn(T, c + 2, C).times(o + ""), h = He(new T(n + "." + r.slice(1)), c - g).plus(u), T.precision = C, t == null ? y(h, C, S2, x = true) : h;
      for (p2 = h, l = s = h = N(h.minus(1), h.plus(1), c, 1), d = y(h.times(h), c, 1), i = 3; ; ) {
        if (s = y(s.times(d), c, 1), u = l.plus(N(s, new T(i), c, 1)), K(u.d).slice(0, c) === K(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(nn(T, c + 2, C).times(o + ""))), l = N(l, new T(f), c, 1), t == null) if (rr(l.d, c - g, S2, a2)) T.precision = c += g, u = s = h = N(p2.minus(1), p2.plus(1), c, 1), d = y(h.times(h), c, 1), i = a2 = 1;
        else return y(l, T.precision = C, S2, x = true);
        else return T.precision = C, l;
        l = u, i += 2;
      }
    }
    __name(He, "He");
    function Is(e) {
      return String(e.s * e.s / 0);
    }
    __name(Is, "Is");
    function Ci(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; n++) ;
      for (i = t.length; t.charCodeAt(i - 1) === 48; --i) ;
      if (t = t.slice(n, i), t) {
        if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % b, r < 0 && (n += b), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= b; n < i; ) e.d.push(+t.slice(n, n += b));
          t = t.slice(n), n = b - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        e.d.push(+t), x && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else e.e = 0, e.d = [0];
      return e;
    }
    __name(Ci, "Ci");
    function Tc(e, t) {
      var r, n, i, o, s, a2, l, u, c;
      if (t.indexOf("_") > -1) {
        if (t = t.replace(/(\d)_(?=\d)/g, "$1"), Rs.test(t)) return Ci(e, t);
      } else if (t === "Infinity" || t === "NaN") return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (Ec.test(t)) r = 16, t = t.toLowerCase();
      else if (bc.test(t)) r = 2;
      else if (wc.test(t)) r = 8;
      else throw Error(Ke + t);
      for (o = t.search(/p/i), o > 0 ? (l = +t.slice(o + 1), t = t.substring(2, o)) : t = t.slice(2), o = t.indexOf("."), s = o >= 0, n = e.constructor, s && (t = t.replace(".", ""), a2 = t.length, o = a2 - o, i = Ss(n, new n(r), o, o * 2)), u = en(t, r, ge), c = u.length - 1, o = c; u[o] === 0; --o) u.pop();
      return o < 0 ? new n(e.s * 0) : (e.e = sn(u, c), e.d = u, x = false, s && (e = N(e, i, a2 * 4)), l && (e = e.times(Math.abs(l) < 54 ? G(2, l) : it.pow(2, l))), x = true, e);
    }
    __name(Tc, "Tc");
    function Rc(e, t) {
      var r, n = t.d.length;
      if (n < 3) return t.isZero() ? t : Et(e, 2, t, t);
      r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : r | 0, t = t.times(1 / an(5, r)), t = Et(e, 2, t, t);
      for (var i, o = new e(5), s = new e(16), a2 = new e(20); r--; ) i = t.times(t), t = t.times(o.plus(i.times(s.times(i).minus(a2))));
      return t;
    }
    __name(Rc, "Rc");
    function Et(e, t, r, n, i) {
      var o, s, a2, l, u = 1, c = e.precision, p2 = Math.ceil(c / b);
      for (x = false, l = r.times(r), a2 = new e(n); ; ) {
        if (s = N(a2.times(l), new e(t++ * t++), c, 1), a2 = i ? n.plus(s) : n.minus(s), n = N(s.times(l), new e(t++ * t++), c, 1), s = a2.plus(n), s.d[p2] !== void 0) {
          for (o = p2; s.d[o] === a2.d[o] && o--; ) ;
          if (o == -1) break;
        }
        o = a2, a2 = n, n = s, s = o, u++;
      }
      return x = true, s.d.length = p2 + 1, s;
    }
    __name(Et, "Et");
    function an(e, t) {
      for (var r = e; --t; ) r *= e;
      return r;
    }
    __name(an, "an");
    function Os(e, t) {
      var r, n = t.s < 0, i = fe(e, e.precision, 1), o = i.times(0.5);
      if (t = t.abs(), t.lte(o)) return Ne = n ? 4 : 1, t;
      if (r = t.divToInt(i), r.isZero()) Ne = n ? 3 : 2;
      else {
        if (t = t.minus(r.times(i)), t.lte(o)) return Ne = bs(r) ? n ? 2 : 3 : n ? 4 : 1, t;
        Ne = bs(r) ? n ? 1 : 4 : n ? 3 : 2;
      }
      return t.minus(i).abs();
    }
    __name(Os, "Os");
    function Si(e, t, r, n) {
      var i, o, s, a2, l, u, c, p2, d, f = e.constructor, g = r !== void 0;
      if (g ? (ie(r, 1, ze), n === void 0 ? n = f.rounding : ie(n, 0, 8)) : (r = f.precision, n = f.rounding), !e.isFinite()) c = Is(e);
      else {
        for (c = we(e), s = c.indexOf("."), g ? (i = 2, t == 16 ? r = r * 4 - 3 : t == 8 && (r = r * 3 - 2)) : i = t, s >= 0 && (c = c.replace(".", ""), d = new f(1), d.e = c.length - s, d.d = en(we(d), 10, i), d.e = d.d.length), p2 = en(c, 10, i), o = l = p2.length; p2[--l] == 0; ) p2.pop();
        if (!p2[0]) c = g ? "0p+0" : "0";
        else {
          if (s < 0 ? o-- : (e = new f(e), e.d = p2, e.e = o, e = N(e, d, r, n, 0, i), p2 = e.d, o = e.e, u = xs), s = p2[r], a2 = i / 2, u = u || p2[r + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a2 || s === a2 && (n === 4 || u || n === 6 && p2[r - 1] & 1 || n === (e.s < 0 ? 8 : 7)), p2.length = r, u) for (; ++p2[--r] > i - 1; ) p2[r] = 0, r || (++o, p2.unshift(1));
          for (l = p2.length; !p2[l - 1]; --l) ;
          for (s = 0, c = ""; s < l; s++) c += Pi.charAt(p2[s]);
          if (g) {
            if (l > 1) if (t == 16 || t == 8) {
              for (s = t == 16 ? 4 : 3, --l; l % s; l++) c += "0";
              for (p2 = en(c, i, t), l = p2.length; !p2[l - 1]; --l) ;
              for (s = 1, c = "1."; s < l; s++) c += Pi.charAt(p2[s]);
            } else c = c.charAt(0) + "." + c.slice(1);
            c = c + (o < 0 ? "p" : "p+") + o;
          } else if (o < 0) {
            for (; ++o; ) c = "0" + c;
            c = "0." + c;
          } else if (++o > l) for (o -= l; o--; ) c += "0";
          else o < l && (c = c.slice(0, o) + "." + c.slice(o));
        }
        c = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + c;
      }
      return e.s < 0 ? "-" + c : c;
    }
    __name(Si, "Si");
    function Es(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    __name(Es, "Es");
    function Cc(e) {
      return new this(e).abs();
    }
    __name(Cc, "Cc");
    function Sc(e) {
      return new this(e).acos();
    }
    __name(Sc, "Sc");
    function Ac(e) {
      return new this(e).acosh();
    }
    __name(Ac, "Ac");
    function Ic(e, t) {
      return new this(e).plus(t);
    }
    __name(Ic, "Ic");
    function Oc(e) {
      return new this(e).asin();
    }
    __name(Oc, "Oc");
    function kc(e) {
      return new this(e).asinh();
    }
    __name(kc, "kc");
    function Dc(e) {
      return new this(e).atan();
    }
    __name(Dc, "Dc");
    function _c(e) {
      return new this(e).atanh();
    }
    __name(_c, "_c");
    function Fc(e, t) {
      e = new this(e), t = new this(t);
      var r, n = this.precision, i = this.rounding, o = n + 4;
      return !e.s || !t.s ? r = new this(NaN) : !e.d && !t.d ? (r = fe(this, o, 1).times(t.s > 0 ? 0.25 : 0.75), r.s = e.s) : !t.d || e.isZero() ? (r = t.s < 0 ? fe(this, n, i) : new this(0), r.s = e.s) : !e.d || t.isZero() ? (r = fe(this, o, 1).times(0.5), r.s = e.s) : t.s < 0 ? (this.precision = o, this.rounding = 1, r = this.atan(N(e, t, o, 1)), t = fe(this, o, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(N(e, t, o, 1)), r;
    }
    __name(Fc, "Fc");
    function Lc(e) {
      return new this(e).cbrt();
    }
    __name(Lc, "Lc");
    function Nc(e) {
      return y(e = new this(e), e.e + 1, 2);
    }
    __name(Nc, "Nc");
    function Mc(e, t, r) {
      return new this(e).clamp(t, r);
    }
    __name(Mc, "Mc");
    function $c(e) {
      if (!e || typeof e != "object") throw Error(on + "Object expected");
      var t, r, n, i = e.defaults === true, o = ["precision", 1, ze, "rounding", 0, 8, "toExpNeg", -bt, 0, "toExpPos", 0, bt, "maxE", 0, bt, "minE", -bt, 0, "modulo", 0, 9];
      for (t = 0; t < o.length; t += 3) if (r = o[t], i && (this[r] = vi[r]), (n = e[r]) !== void 0) if (ee(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(Ke + r + ": " + n);
      if (r = "crypto", i && (this[r] = vi[r]), (n = e[r]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r] = true;
      else throw Error(vs);
      else this[r] = false;
      else throw Error(Ke + r + ": " + n);
      return this;
    }
    __name($c, "$c");
    function qc(e) {
      return new this(e).cos();
    }
    __name(qc, "qc");
    function jc(e) {
      return new this(e).cosh();
    }
    __name(jc, "jc");
    function ks(e) {
      var t, r, n;
      function i(o) {
        var s, a2, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, ws(o)) {
          u.s = o.s, x ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
          return;
        }
        if (l = typeof o, l === "number") {
          if (o === 0) {
            u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
            return;
          }
          if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
            for (s = 0, a2 = o; a2 >= 10; a2 /= 10) s++;
            x ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
            return;
          } else if (o * 0 !== 0) {
            o || (u.s = NaN), u.e = NaN, u.d = null;
            return;
          }
          return Ci(u, o.toString());
        } else if (l !== "string") throw Error(Ke + o);
        return (a2 = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a2 === 43 && (o = o.slice(1)), u.s = 1), Rs.test(o) ? Ci(u, o) : Tc(u, o);
      }
      __name(i, "i");
      if (i.prototype = m, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = $c, i.clone = ks, i.isDecimal = ws, i.abs = Cc, i.acos = Sc, i.acosh = Ac, i.add = Ic, i.asin = Oc, i.asinh = kc, i.atan = Dc, i.atanh = _c, i.atan2 = Fc, i.cbrt = Lc, i.ceil = Nc, i.clamp = Mc, i.cos = qc, i.cosh = jc, i.div = Vc, i.exp = Bc, i.floor = Uc, i.hypot = Gc, i.ln = Qc, i.log = Jc, i.log10 = Hc, i.log2 = Wc, i.max = Kc, i.min = zc, i.mod = Yc, i.mul = Zc, i.pow = Xc, i.random = ep, i.round = tp, i.sign = rp, i.sin = np, i.sinh = ip, i.sqrt = op, i.sub = sp, i.sum = ap, i.tan = lp, i.tanh = up, i.trunc = cp, e === void 0 && (e = {}), e && e.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(ks, "ks");
    function Vc(e, t) {
      return new this(e).div(t);
    }
    __name(Vc, "Vc");
    function Bc(e) {
      return new this(e).exp();
    }
    __name(Bc, "Bc");
    function Uc(e) {
      return y(e = new this(e), e.e + 1, 3);
    }
    __name(Uc, "Uc");
    function Gc() {
      var e, t, r = new this(0);
      for (x = false, e = 0; e < arguments.length; ) if (t = new this(arguments[e++]), t.d) r.d && (r = r.plus(t.times(t)));
      else {
        if (t.s) return x = true, new this(1 / 0);
        r = t;
      }
      return x = true, r.sqrt();
    }
    __name(Gc, "Gc");
    function ws(e) {
      return e instanceof it || e && e.toStringTag === Ts || false;
    }
    __name(ws, "ws");
    function Qc(e) {
      return new this(e).ln();
    }
    __name(Qc, "Qc");
    function Jc(e, t) {
      return new this(e).log(t);
    }
    __name(Jc, "Jc");
    function Wc(e) {
      return new this(e).log(2);
    }
    __name(Wc, "Wc");
    function Hc(e) {
      return new this(e).log(10);
    }
    __name(Hc, "Hc");
    function Kc() {
      return As(this, arguments, "lt");
    }
    __name(Kc, "Kc");
    function zc() {
      return As(this, arguments, "gt");
    }
    __name(zc, "zc");
    function Yc(e, t) {
      return new this(e).mod(t);
    }
    __name(Yc, "Yc");
    function Zc(e, t) {
      return new this(e).mul(t);
    }
    __name(Zc, "Zc");
    function Xc(e, t) {
      return new this(e).pow(t);
    }
    __name(Xc, "Xc");
    function ep(e) {
      var t, r, n, i, o = 0, s = new this(1), a2 = [];
      if (e === void 0 ? e = this.precision : ie(e, 1, ze), n = Math.ceil(e / b), this.crypto) if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = t[o], i >= 429e7 ? t[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a2[o++] = i % 1e7;
      else if (crypto.randomBytes) {
        for (t = crypto.randomBytes(n *= 4); o < n; ) i = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(t, o) : (a2.push(i % 1e7), o += 4);
        o = n / 4;
      } else throw Error(vs);
      else for (; o < n; ) a2[o++] = Math.random() * 1e7 | 0;
      for (n = a2[--o], e %= b, n && e && (i = G(10, b - e), a2[o] = (n / i | 0) * i); a2[o] === 0; o--) a2.pop();
      if (o < 0) r = 0, a2 = [0];
      else {
        for (r = -1; a2[0] === 0; r -= b) a2.shift();
        for (n = 1, i = a2[0]; i >= 10; i /= 10) n++;
        n < b && (r -= b - n);
      }
      return s.e = r, s.d = a2, s;
    }
    __name(ep, "ep");
    function tp(e) {
      return y(e = new this(e), e.e + 1, this.rounding);
    }
    __name(tp, "tp");
    function rp(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    __name(rp, "rp");
    function np(e) {
      return new this(e).sin();
    }
    __name(np, "np");
    function ip(e) {
      return new this(e).sinh();
    }
    __name(ip, "ip");
    function op(e) {
      return new this(e).sqrt();
    }
    __name(op, "op");
    function sp(e, t) {
      return new this(e).sub(t);
    }
    __name(sp, "sp");
    function ap() {
      var e = 0, t = arguments, r = new this(t[e]);
      for (x = false; r.s && ++e < t.length; ) r = r.plus(t[e]);
      return x = true, y(r, this.precision, this.rounding);
    }
    __name(ap, "ap");
    function lp(e) {
      return new this(e).tan();
    }
    __name(lp, "lp");
    function up(e) {
      return new this(e).tanh();
    }
    __name(up, "up");
    function cp(e) {
      return y(e = new this(e), e.e + 1, 1);
    }
    __name(cp, "cp");
    m[Symbol.for("nodejs.util.inspect.custom")] = m.toString;
    m[Symbol.toStringTag] = "Decimal";
    var it = m.constructor = ks(vi);
    tn = new it(tn);
    rn = new it(rn);
    var xe = it;
    function wt(e) {
      return e === null ? e : Array.isArray(e) ? e.map(wt) : typeof e == "object" ? pp(e) ? dp(e) : yt(e, wt) : e;
    }
    __name(wt, "wt");
    function pp(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(pp, "pp");
    function dp({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes":
          return Buffer.from(t, "base64");
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new xe(t);
        case "Json":
          return JSON.parse(t);
        default:
          Fe(t, "Unknown tagged value");
      }
    }
    __name(dp, "dp");
    function xt(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(xt, "xt");
    function Pt(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(Pt, "Pt");
    function ln(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(ln, "ln");
    function vt(e) {
      return it.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(vt, "vt");
    var Ms = k(fi());
    var Ns = k(__require("fs"));
    var Ds = { keyword: De, entity: De, value: /* @__PURE__ */ __name((e) => H(rt(e)), "value"), punctuation: rt, directive: De, function: De, variable: /* @__PURE__ */ __name((e) => H(rt(e)), "variable"), string: /* @__PURE__ */ __name((e) => H(qe(e)), "string"), boolean: ke, number: De, comment: Gt };
    var mp = /* @__PURE__ */ __name((e) => e, "mp");
    var un = {};
    var fp = 0;
    var P = { manual: un.Prism && un.Prism.manual, disableWorkerMessageHandler: un.Prism && un.Prism.disableWorkerMessageHandler, util: { encode: /* @__PURE__ */ __name(function(e) {
      if (e instanceof he) {
        let t = e;
        return new he(t.type, P.util.encode(t.content), t.alias);
      } else return Array.isArray(e) ? e.map(P.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
    }, "encode"), type: /* @__PURE__ */ __name(function(e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }, "type"), objId: /* @__PURE__ */ __name(function(e) {
      return e.__id || Object.defineProperty(e, "__id", { value: ++fp }), e.__id;
    }, "objId"), clone: /* @__PURE__ */ __name(function e(t, r) {
      let n, i, o = P.util.type(t);
      switch (r = r || {}, o) {
        case "Object":
          if (i = P.util.objId(t), r[i]) return r[i];
          n = {}, r[i] = n;
          for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r));
          return n;
        case "Array":
          return i = P.util.objId(t), r[i] ? r[i] : (n = [], r[i] = n, t.forEach(function(s, a2) {
            n[a2] = e(s, r);
          }), n);
        default:
          return t;
      }
    }, "e") }, languages: { extend: /* @__PURE__ */ __name(function(e, t) {
      let r = P.util.clone(P.languages[e]);
      for (let n in t) r[n] = t[n];
      return r;
    }, "extend"), insertBefore: /* @__PURE__ */ __name(function(e, t, r, n) {
      n = n || P.languages;
      let i = n[e], o = {};
      for (let a2 in i) if (i.hasOwnProperty(a2)) {
        if (a2 == t) for (let l in r) r.hasOwnProperty(l) && (o[l] = r[l]);
        r.hasOwnProperty(a2) || (o[a2] = i[a2]);
      }
      let s = n[e];
      return n[e] = o, P.languages.DFS(P.languages, function(a2, l) {
        l === s && a2 != e && (this[a2] = o);
      }), o;
    }, "insertBefore"), DFS: /* @__PURE__ */ __name(function e(t, r, n, i) {
      i = i || {};
      let o = P.util.objId;
      for (let s in t) if (t.hasOwnProperty(s)) {
        r.call(t, s, t[s], n || s);
        let a2 = t[s], l = P.util.type(a2);
        l === "Object" && !i[o(a2)] ? (i[o(a2)] = true, e(a2, r, null, i)) : l === "Array" && !i[o(a2)] && (i[o(a2)] = true, e(a2, r, s, i));
      }
    }, "e") }, plugins: {}, highlight: /* @__PURE__ */ __name(function(e, t, r) {
      let n = { code: e, grammar: t, language: r };
      return P.hooks.run("before-tokenize", n), n.tokens = P.tokenize(n.code, n.grammar), P.hooks.run("after-tokenize", n), he.stringify(P.util.encode(n.tokens), n.language);
    }, "highlight"), matchGrammar: /* @__PURE__ */ __name(function(e, t, r, n, i, o, s) {
      for (let h in r) {
        if (!r.hasOwnProperty(h) || !r[h]) continue;
        if (h == s) return;
        let O2 = r[h];
        O2 = P.util.type(O2) === "Array" ? O2 : [O2];
        for (let T = 0; T < O2.length; ++T) {
          let S2 = O2[T], C = S2.inside, E2 = !!S2.lookbehind, me = !!S2.greedy, ae = 0, Bt2 = S2.alias;
          if (me && !S2.pattern.global) {
            let U2 = S2.pattern.toString().match(/[imuy]*$/)[0];
            S2.pattern = RegExp(S2.pattern.source, U2 + "g");
          }
          S2 = S2.pattern || S2;
          for (let U2 = n, ne = i; U2 < t.length; ne += t[U2].length, ++U2) {
            let Ie = t[U2];
            if (t.length > e.length) return;
            if (Ie instanceof he) continue;
            if (me && U2 != t.length - 1) {
              S2.lastIndex = ne;
              var p2 = S2.exec(e);
              if (!p2) break;
              var c = p2.index + (E2 ? p2[1].length : 0), d = p2.index + p2[0].length, a2 = U2, l = ne;
              for (let _2 = t.length; a2 < _2 && (l < d || !t[a2].type && !t[a2 - 1].greedy); ++a2) l += t[a2].length, c >= l && (++U2, ne = l);
              if (t[U2] instanceof he) continue;
              u = a2 - U2, Ie = e.slice(ne, l), p2.index -= ne;
            } else {
              S2.lastIndex = 0;
              var p2 = S2.exec(Ie), u = 1;
            }
            if (!p2) {
              if (o) break;
              continue;
            }
            E2 && (ae = p2[1] ? p2[1].length : 0);
            var c = p2.index + ae, p2 = p2[0].slice(ae), d = c + p2.length, f = Ie.slice(0, c), g = Ie.slice(d);
            let z2 = [U2, u];
            f && (++U2, ne += f.length, z2.push(f));
            let dt = new he(h, C ? P.tokenize(p2, C) : p2, Bt2, p2, me);
            if (z2.push(dt), g && z2.push(g), Array.prototype.splice.apply(t, z2), u != 1 && P.matchGrammar(e, t, r, U2, ne, true, h), o) break;
          }
        }
      }
    }, "matchGrammar"), tokenize: /* @__PURE__ */ __name(function(e, t) {
      let r = [e], n = t.rest;
      if (n) {
        for (let i in n) t[i] = n[i];
        delete t.rest;
      }
      return P.matchGrammar(e, r, t, 0, 0, false), r;
    }, "tokenize"), hooks: { all: {}, add: /* @__PURE__ */ __name(function(e, t) {
      let r = P.hooks.all;
      r[e] = r[e] || [], r[e].push(t);
    }, "add"), run: /* @__PURE__ */ __name(function(e, t) {
      let r = P.hooks.all[e];
      if (!(!r || !r.length)) for (var n = 0, i; i = r[n++]; ) i(t);
    }, "run") }, Token: he };
    P.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
    P.languages.javascript = P.languages.extend("clike", { "class-name": [P.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: true }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: true }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ });
    P.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    P.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: true, greedy: true }, "function-variable": { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: true, inside: P.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: P.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: true, inside: P.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: true, inside: P.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ });
    P.languages.markup && P.languages.markup.tag.addInlined("script", "javascript");
    P.languages.js = P.languages.javascript;
    P.languages.typescript = P.languages.extend("javascript", { keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/, builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/ });
    P.languages.ts = P.languages.typescript;
    function he(e, t, r, n, i) {
      this.type = e, this.content = t, this.alias = r, this.length = (n || "").length | 0, this.greedy = !!i;
    }
    __name(he, "he");
    he.stringify = function(e, t) {
      return typeof e == "string" ? e : Array.isArray(e) ? e.map(function(r) {
        return he.stringify(r, t);
      }).join("") : gp(e.type)(e.content);
    };
    function gp(e) {
      return Ds[e] || mp;
    }
    __name(gp, "gp");
    function _s(e) {
      return hp(e, P.languages.javascript);
    }
    __name(_s, "_s");
    function hp(e, t) {
      return P.tokenize(e, t).map((n) => he.stringify(n)).join("");
    }
    __name(hp, "hp");
    var Fs = k(us());
    function Ls(e) {
      return (0, Fs.default)(e);
    }
    __name(Ls, "Ls");
    var cn = class e {
      static {
        __name(this, "e");
      }
      static read(t) {
        let r;
        try {
          r = Ns.default.readFileSync(t, "utf-8");
        } catch {
          return null;
        }
        return e.fromContent(r);
      }
      static fromContent(t) {
        let r = t.split(/\r?\n/);
        return new e(1, r);
      }
      constructor(t, r) {
        this.firstLineNumber = t, this.lines = r;
      }
      get lastLineNumber() {
        return this.firstLineNumber + this.lines.length - 1;
      }
      mapLineAt(t, r) {
        if (t < this.firstLineNumber || t > this.lines.length + this.firstLineNumber) return this;
        let n = t - this.firstLineNumber, i = [...this.lines];
        return i[n] = r(i[n]), new e(this.firstLineNumber, i);
      }
      mapLines(t) {
        return new e(this.firstLineNumber, this.lines.map((r, n) => t(r, this.firstLineNumber + n)));
      }
      lineAt(t) {
        return this.lines[t - this.firstLineNumber];
      }
      prependSymbolAt(t, r) {
        return this.mapLines((n, i) => i === t ? `${r} ${n}` : `  ${n}`);
      }
      slice(t, r) {
        let n = this.lines.slice(t - 1, r).join(`
`);
        return new e(t, Ls(n).split(`
`));
      }
      highlight() {
        let t = _s(this.toString());
        return new e(this.firstLineNumber, t.split(`
`));
      }
      toString() {
        return this.lines.join(`
`);
      }
    };
    var yp = { red: ce, gray: Gt, dim: Oe, bold: H, underline: X, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var bp = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function Ep({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(Ep, "Ep");
    function wp({ callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i }, o) {
      let s = Ep({ message: t, originalMethod: r, isPanic: n, callArguments: i });
      if (!e || typeof window < "u" || process.env.NODE_ENV === "production") return s;
      let a2 = e.getLocation();
      if (!a2 || !a2.lineNumber || !a2.columnNumber) return s;
      let l = Math.max(1, a2.lineNumber - 3), u = cn.read(a2.fileName)?.slice(l, a2.lineNumber), c = u?.lineAt(a2.lineNumber);
      if (u && c) {
        let p2 = Pp(c), d = xp(c);
        if (!d) return s;
        s.functionName = `${d.code})`, s.location = a2, n || (u = u.mapLineAt(a2.lineNumber, (g) => g.slice(0, d.openingBraceIndex))), u = o.highlightSource(u);
        let f = String(u.lastLineNumber).length;
        if (s.contextLines = u.mapLines((g, h) => o.gray(String(h).padStart(f)) + " " + g).mapLines((g) => o.dim(g)).prependSymbolAt(a2.lineNumber, o.bold(o.red("→"))), i) {
          let g = p2 + f + 1;
          g += 2, s.callArguments = (0, Ms.default)(i, g).slice(g);
        }
      }
      return s;
    }
    __name(wp, "wp");
    function xp(e) {
      let t = Object.keys(Je.ModelAction).join("|"), n = new RegExp(String.raw`\.(${t})\(`).exec(e);
      if (n) {
        let i = n.index + n[0].length, o = e.lastIndexOf(" ", n.index) + 1;
        return { code: e.slice(o, i), openingBraceIndex: i };
      }
      return null;
    }
    __name(xp, "xp");
    function Pp(e) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        if (e.charAt(r) !== " ") return t;
        t++;
      }
      return t;
    }
    __name(Pp, "Pp");
    function vp({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a2 = [""], l = t ? " in" : ":";
      if (n ? (a2.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a2.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a2.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), t && a2.push(s.underline(Tp(t))), i) {
        a2.push("");
        let u = [i.toString()];
        o && (u.push(o), u.push(s.dim(")"))), a2.push(u.join("")), o && a2.push("");
      } else a2.push(""), o && a2.push(o), a2.push("");
      return a2.push(r), a2.join(`
`);
    }
    __name(vp, "vp");
    function Tp(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(Tp, "Tp");
    function Tt(e) {
      let t = e.showColors ? yp : bp, r;
      return r = wp(e, t), vp(r, t);
    }
    __name(Tt, "Tt");
    var Gs = k(Ai());
    function Vs(e, t, r) {
      let n = Bs(e), i = Rp(n), o = Sp(i);
      o ? pn(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(Vs, "Vs");
    function Bs(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Bs(t) : [t]);
    }
    __name(Bs, "Bs");
    function Rp(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: Cp(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(Rp, "Rp");
    function Cp(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(Cp, "Cp");
    function Sp(e) {
      return xi(e, (t, r) => {
        let n = qs(t), i = qs(r);
        return n !== i ? n - i : js(t) - js(r);
      });
    }
    __name(Sp, "Sp");
    function qs(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(qs, "qs");
    function js(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(js, "js");
    var ue = class {
      static {
        __name(this, "ue");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    };
    var Rt = class {
      static {
        __name(this, "Rt");
      }
      constructor(t = 0, r) {
        this.context = r;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = t;
      }
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t?.(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    };
    var dn = class {
      static {
        __name(this, "dn");
      }
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    var mn = /* @__PURE__ */ __name((e) => e, "mn");
    var fn = { bold: mn, red: mn, green: mn, dim: mn, enabled: false };
    var Us = { bold: H, red: ce, green: qe, dim: Oe, enabled: true };
    var Ct = { write(e) {
      e.writeLine(",");
    } };
    var Pe = class {
      static {
        __name(this, "Pe");
      }
      constructor(t) {
        this.contents = t;
        this.isUnderlined = false;
        this.color = (t2) => t2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    var Ye = class {
      static {
        __name(this, "Ye");
      }
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var St = class extends Ye {
      static {
        __name(this, "St");
      }
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new dn(r)), this;
      }
      getField(r) {
        return this.items[r];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(r) {
        if (this.items.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithItems(r);
      }
      writeEmpty(r) {
        let n = new Pe("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(Ct, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var At = class e extends Ye {
      static {
        __name(this, "e");
      }
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(r) {
        this.fields[r.name] = r;
      }
      addSuggestion(r) {
        this.suggestions.push(r);
      }
      getField(r) {
        return this.fields[r];
      }
      getDeepField(r) {
        let [n, ...i] = r, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a2 of i) {
          let l;
          if (s.value instanceof e ? l = s.value.getField(a2) : s.value instanceof St && (l = s.value.getField(Number(a2))), !l) return;
          s = l;
        }
        return s;
      }
      getDeepFieldValue(r) {
        return r.length === 0 ? this : this.getDeepField(r)?.value;
      }
      hasField(r) {
        return !!this.getField(r);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(r) {
        delete this.fields[r];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(r) {
        return this.getField(r)?.value;
      }
      getDeepSubSelectionValue(r) {
        let n = this;
        for (let i of r) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(r) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of r) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a2 = s.getSelectionParent();
          if (!a2) return;
          i = a2;
        }
        return i;
      }
      getSelectionParent() {
        let r = this.getField("select")?.value.asObject();
        if (r) return { kind: "select", value: r };
        let n = this.getField("include")?.value.asObject();
        if (n) return { kind: "include", value: n };
      }
      getSubSelectionValue(r) {
        return this.getSelectionParent()?.value.fields[r].value;
      }
      getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
      }
      write(r) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithContents(r, n);
      }
      asObject() {
        return this;
      }
      writeEmpty(r) {
        let n = new Pe("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(Ct, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var W = class extends Ye {
      static {
        __name(this, "W");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new Pe(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    var nr = class {
      static {
        __name(this, "nr");
      }
      constructor() {
        this.fields = [];
      }
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(Ct, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function pn(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Ip(e, t);
          break;
        case "IncludeOnScalar":
          Op(e, t);
          break;
        case "EmptySelection":
          kp(e, t, r);
          break;
        case "UnknownSelectionField":
          Lp(e, t);
          break;
        case "InvalidSelectionValue":
          Np(e, t);
          break;
        case "UnknownArgument":
          Mp(e, t);
          break;
        case "UnknownInputField":
          $p(e, t);
          break;
        case "RequiredArgumentMissing":
          qp(e, t);
          break;
        case "InvalidArgumentType":
          jp(e, t);
          break;
        case "InvalidArgumentValue":
          Vp(e, t);
          break;
        case "ValueTooLarge":
          Bp(e, t);
          break;
        case "SomeFieldsMissing":
          Up(e, t);
          break;
        case "TooManyFieldsGiven":
          Gp(e, t);
          break;
        case "Union":
          Vs(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name(pn, "pn");
    function Ip(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(Ip, "Ip");
    function Op(e, t) {
      let [r, n] = ir(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new ue(s.name, "true"));
      t.addErrorMessage((s) => {
        let a2 = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a2 += ` on model ${s.bold(i.name)}. ${or(s)}` : a2 += ".", a2 += `
Note that ${s.bold("include")} statements only accept relation fields.`, a2;
      });
    }
    __name(Op, "Op");
    function kp(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          Dp(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          _p(e, t);
          return;
        }
      }
      if (r?.[xt(e.outputType.name)]) {
        Fp(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(kp, "kp");
    function Dp(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new ue(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Dp, "Dp");
    function _p(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), Ws(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${or(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(_p, "_p");
    function Fp(e, t) {
      let r = new nr();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new ue("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = ir(e.selectionPath), a2 = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a2) {
          let l = a2?.value.asObject() ?? new At();
          l.addSuggestion(n), a2.value = l;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Fp, "Fp");
    function Lp(e, t) {
      let r = Hs(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            Ws(n, e.outputType);
            break;
          case "include":
            Qp(n, e.outputType);
            break;
          case "omit":
            Jp(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(or(n)), i.join(" ");
      });
    }
    __name(Lp, "Lp");
    function Np(e, t) {
      let r = Hs(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(Np, "Np");
    function Mp(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Wp(n, e.arguments)), t.addErrorMessage((i) => Qs(i, r, e.arguments.map((o) => o.name)));
    }
    __name(Mp, "Mp");
    function $p(e, t) {
      let [r, n] = ir(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && Ks(o, e.inputType);
      }
      t.addErrorMessage((o) => Qs(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name($p, "$p");
    function Qs(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = Kp(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(or(e)), n.join(" ");
    }
    __name(Qs, "Qs");
    function qp(e, t) {
      let r;
      t.addErrorMessage((l) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = ir(e.argumentPath), s = new nr(), a2 = n.getDeepFieldValue(i)?.asObject();
      if (a2) if (r = a2.getField(o), r && a2.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let l of e.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
        a2.addSuggestion(new ue(o, s).makeRequired());
      } else {
        let l = e.inputTypes.map(Js).join(" | ");
        a2.addSuggestion(new ue(o, l).makeRequired());
      }
    }
    __name(qp, "qp");
    function Js(e) {
      return e.kind === "list" ? `${Js(e.elementType)}[]` : e.name;
    }
    __name(Js, "Js");
    function jp(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = gn("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(jp, "jp");
    function Vp(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = gn("or", e.argument.typeNames.map((a2) => i.green(a2)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(Vp, "Vp");
    function Bp(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Bp, "Bp");
    function Up(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && Ks(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${gn("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(or(i)), o.join(" ");
      });
    }
    __name(Up, "Up");
    function Gp(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${gn("and", i.map((a2) => o.red(a2)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Gp, "Gp");
    function Ws(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new ue(r.name, "true"));
    }
    __name(Ws, "Ws");
    function Qp(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new ue(r.name, "true"));
    }
    __name(Qp, "Qp");
    function Jp(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new ue(r.name, "true"));
    }
    __name(Jp, "Jp");
    function Wp(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new ue(r.name, r.typeNames.join(" | ")));
    }
    __name(Wp, "Wp");
    function Hs(e, t) {
      let [r, n] = ir(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a2 = i.getFieldValue("omit")?.asObject(), l = o?.getField(n);
      return o && l ? { parentKind: "select", parent: o, field: l, fieldName: n } : (l = s?.getField(n), s && l ? { parentKind: "include", field: l, parent: s, fieldName: n } : (l = a2?.getField(n), a2 && l ? { parentKind: "omit", field: l, parent: a2, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(Hs, "Hs");
    function Ks(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new ue(r.name, r.typeNames.join(" | ")));
    }
    __name(Ks, "Ks");
    function ir(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(ir, "ir");
    function or({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(or, "or");
    function gn(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(gn, "gn");
    var Hp = 3;
    function Kp(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, Gs.default)(e, i);
        o > Hp || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Kp, "Kp");
    function zs(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(zs, "zs");
    var sr = class {
      static {
        __name(this, "sr");
      }
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function It(e) {
      return e instanceof sr;
    }
    __name(It, "It");
    var hn = Symbol();
    var Ii = /* @__PURE__ */ new WeakMap();
    var Me = class {
      static {
        __name(this, "Me");
      }
      constructor(t) {
        t === hn ? Ii.set(this, `Prisma.${this._getName()}`) : Ii.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Ii.get(this);
      }
    };
    var ar = class extends Me {
      static {
        __name(this, "ar");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var lr = class extends ar {
      static {
        __name(this, "lr");
      }
    };
    Oi(lr, "DbNull");
    var ur = class extends ar {
      static {
        __name(this, "ur");
      }
    };
    Oi(ur, "JsonNull");
    var cr = class extends ar {
      static {
        __name(this, "cr");
      }
    };
    Oi(cr, "AnyNull");
    var yn = { classes: { DbNull: lr, JsonNull: ur, AnyNull: cr }, instances: { DbNull: new lr(hn), JsonNull: new ur(hn), AnyNull: new cr(hn) } };
    function Oi(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(Oi, "Oi");
    var Ys = ": ";
    var bn = class {
      static {
        __name(this, "bn");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + Ys.length;
      }
      write(t) {
        let r = new Pe(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(Ys).write(this.value);
      }
    };
    var ki = class {
      static {
        __name(this, "ki");
      }
      constructor(t) {
        this.errorMessages = [];
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    };
    function Ot(e) {
      return new ki(Zs(e));
    }
    __name(Ot, "Ot");
    function Zs(e) {
      let t = new At();
      for (let [r, n] of Object.entries(e)) {
        let i = new bn(r, Xs(n));
        t.addField(i);
      }
      return t;
    }
    __name(Zs, "Zs");
    function Xs(e) {
      if (typeof e == "string") return new W(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new W(String(e));
      if (typeof e == "bigint") return new W(`${e}n`);
      if (e === null) return new W("null");
      if (e === void 0) return new W("undefined");
      if (vt(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return Buffer.isBuffer(e) ? new W(`Buffer.alloc(${e.byteLength})`) : new W(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = ln(e) ? e.toISOString() : "Invalid Date";
        return new W(`new Date("${t}")`);
      }
      return e instanceof Me ? new W(`Prisma.${e._getName()}`) : It(e) ? new W(`prisma.${zs(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? zp(e) : typeof e == "object" ? Zs(e) : new W(Object.prototype.toString.call(e));
    }
    __name(Xs, "Xs");
    function zp(e) {
      let t = new St();
      for (let r of e) t.addItem(Xs(r));
      return t;
    }
    __name(zp, "zp");
    function En(e, t) {
      let r = t === "pretty" ? Us : fn, n = e.renderAllMessages(r), i = new Rt(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(En, "En");
    function wn({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a2 = Ot(e);
      for (let p2 of t) pn(p2, a2, s);
      let { message: l, args: u } = En(a2, r), c = Tt({ message: l, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: u });
      throw new J(c, { clientVersion: o });
    }
    __name(wn, "wn");
    var ve = class {
      static {
        __name(this, "ve");
      }
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(t) {
        return this._map.get(t)?.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n) return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    };
    function pr(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(pr, "pr");
    function Te(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(Te, "Te");
    function ta(e, t, r) {
      let n = Te(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : Yp({ ...e, ...ea(t.name, e, t.result.$allModels), ...ea(t.name, e, t.result[n]) });
    }
    __name(ta, "ta");
    function Yp(e) {
      let t = new ve(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return yt(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Yp, "Yp");
    function ea(e, t, r) {
      return r ? yt(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: Zp(t, o, i) })) : {};
    }
    __name(ea, "ea");
    function Zp(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(Zp, "Zp");
    function ra(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(ra, "ra");
    function na(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(na, "na");
    var xn = class {
      static {
        __name(this, "xn");
      }
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new ve();
        this.modelExtensionsCache = new ve();
        this.queryCallbacksCache = new ve();
        this.clientExtensions = pr(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = pr(() => {
          let t2 = this.previous?.getAllBatchQueryCallbacks() ?? [], r2 = this.extension.query?.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => ta(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = Te(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var kt = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new xn(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new xn(t, this.head));
      }
      getAllComputedFields(t) {
        return this.head?.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        return this.head?.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        return this.head?.getAllQueryCallbacks(t, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    var ia = Symbol();
    var dr = class {
      static {
        __name(this, "dr");
      }
      constructor(t) {
        if (t !== ia) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Pn : t;
      }
    };
    var Pn = new dr(ia);
    function Re(e) {
      return e instanceof dr;
    }
    __name(Re, "Re");
    var Xp = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var oa = "explicitly `undefined` values are not allowed";
    function vn({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = kt.empty(), callsite: o, clientMethod: s, errorFormat: a2, clientVersion: l, previewFeatures: u, globalOmit: c }) {
      let p2 = new Di({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a2, clientVersion: l, previewFeatures: u, globalOmit: c });
      return { modelName: e, action: Xp[t], query: mr(r, p2) };
    }
    __name(vn, "vn");
    function mr({ select: e, include: t, ...r } = {}, n) {
      let i;
      return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit), { arguments: aa(r, n), selection: ed(e, t, i, n) };
    }
    __name(mr, "mr");
    function ed(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.isPreviewFeatureOn("omitApi") && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), id(e, n)) : td(n, t, r);
    }
    __name(ed, "ed");
    function td(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && rd(n, t, e), e.isPreviewFeatureOn("omitApi") && nd(n, r, e), n;
    }
    __name(td, "td");
    function rd(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (Re(i)) continue;
        let o = r.nestSelection(n);
        if (_i(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = mr(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = mr(i, o);
      }
    }
    __name(rd, "rd");
    function nd(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = na(i, n);
      for (let [s, a2] of Object.entries(o)) {
        if (Re(a2)) continue;
        _i(a2, r.nestSelection(s));
        let l = r.findField(s);
        n?.[s] && !l || (e[s] = !a2);
      }
    }
    __name(nd, "nd");
    function id(e, t) {
      let r = {}, n = t.getComputedFields(), i = ra(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (Re(s)) continue;
        let a2 = t.nestSelection(o);
        _i(s, a2);
        let l = t.findField(o);
        if (!(n?.[o] && !l)) {
          if (s === false || s === void 0 || Re(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            l?.kind === "object" ? r[o] = mr({}, a2) : r[o] = true;
            continue;
          }
          r[o] = mr(s, a2);
        }
      }
      return r;
    }
    __name(id, "id");
    function sa(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (Pt(e)) {
        if (ln(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (It(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return od(e, t);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: Buffer.from(e).toString("base64") };
      if (sd(e)) return e.values;
      if (vt(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof Me) {
        if (e !== yn.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (ad(e)) return e.toJSON();
      if (typeof e == "object") return aa(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(sa, "sa");
    function aa(e, t) {
      if (e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        Re(i) || (i !== void 0 ? r[n] = sa(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: oa }));
      }
      return r;
    }
    __name(aa, "aa");
    function od(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || Re(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(sa(o, i));
      }
      return r;
    }
    __name(od, "od");
    function sd(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(sd, "sd");
    function ad(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(ad, "ad");
    function _i(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: oa });
    }
    __name(_i, "_i");
    var Di = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        wn({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        return this.modelOrType?.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[xt(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Fe(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    var Dt = class {
      static {
        __name(this, "Dt");
      }
      constructor(t) {
        this._engine = t;
      }
      prometheus(t) {
        return this._engine.metrics({ format: "prometheus", ...t });
      }
      json(t) {
        return this._engine.metrics({ format: "json", ...t });
      }
    };
    function la(e) {
      return { models: Fi(e.models), enums: Fi(e.enums), types: Fi(e.types) };
    }
    __name(la, "la");
    function Fi(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    __name(Fi, "Fi");
    function ua(e, t) {
      let r = pr(() => ld(t));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(ua, "ua");
    function ld(e) {
      return { datamodel: { models: Li(e.models), enums: Li(e.enums), types: Li(e.types) } };
    }
    __name(ld, "ld");
    function Li(e) {
      return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
    }
    __name(Li, "Li");
    var Ni = /* @__PURE__ */ new WeakMap();
    var Tn = "$$PrismaTypedSql";
    var Mi = class {
      static {
        __name(this, "Mi");
      }
      constructor(t, r) {
        Ni.set(this, { sql: t, values: r }), Object.defineProperty(this, Tn, { value: Tn });
      }
      get sql() {
        return Ni.get(this).sql;
      }
      get values() {
        return Ni.get(this).values;
      }
    };
    function ca(e) {
      return (...t) => new Mi(e, t);
    }
    __name(ca, "ca");
    function pa(e) {
      return e != null && e[Tn] === Tn;
    }
    __name(pa, "pa");
    function fr(e) {
      return { ok: false, error: e, map() {
        return fr(e);
      }, flatMap() {
        return fr(e);
      } };
    }
    __name(fr, "fr");
    var $i = class {
      static {
        __name(this, "$i");
      }
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(t) {
        return this.registeredErrors[t];
      }
      registerNewError(t) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: t }, r;
      }
    };
    var qi = /* @__PURE__ */ __name((e) => {
      let t = new $i(), r = Ce(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: Ce(t, e.queryRaw.bind(e)), executeRaw: Ce(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: /* @__PURE__ */ __name(async (...i) => (await r(...i)).map((s) => ud(t, s)), "transactionContext") };
      return e.getConnectionInfo && (n.getConnectionInfo = pd(t, e.getConnectionInfo.bind(e))), n;
    }, "qi");
    var ud = /* @__PURE__ */ __name((e, t) => {
      let r = Ce(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: Ce(e, t.queryRaw.bind(t)), executeRaw: Ce(e, t.executeRaw.bind(t)), startTransaction: /* @__PURE__ */ __name(async (...n) => (await r(...n)).map((o) => cd(e, o)), "startTransaction") };
    }, "ud");
    var cd = /* @__PURE__ */ __name((e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: Ce(e, t.queryRaw.bind(t)), executeRaw: Ce(e, t.executeRaw.bind(t)), commit: Ce(e, t.commit.bind(t)), rollback: Ce(e, t.rollback.bind(t)) }), "cd");
    function Ce(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return fr({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Ce, "Ce");
    function pd(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return fr({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(pd, "pd");
    var Wl = k(oi());
    var Hl = __require("async_hooks");
    var Kl = __require("events");
    var zl = k(__require("fs"));
    var Fr = k(__require("path"));
    var oe = class e {
      static {
        __name(this, "e");
      }
      constructor(t, r) {
        if (t.length - 1 !== r.length) throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
        let n = r.reduce((s, a2) => s + (a2 instanceof e ? a2.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a2 = t[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let l = 0;
            for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
            this.strings[o] += a2;
          } else this.values[o++] = s, this.strings[o] = a2;
        }
      }
      get sql() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function da(e, t = ",", r = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new oe([r, ...Array(e.length - 1).fill(t), n], e);
    }
    __name(da, "da");
    function ji(e) {
      return new oe([e], []);
    }
    __name(ji, "ji");
    var ma = ji("");
    function Vi(e, ...t) {
      return new oe(e, t);
    }
    __name(Vi, "Vi");
    function gr(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(gr, "gr");
    function re(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(re, "re");
    function ot(e) {
      let t = new ve();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(ot, "ot");
    var Rn = { enumerable: true, configurable: true, writable: true };
    function Cn(e) {
      let t = new Set(e);
      return { getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Rn, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
    }
    __name(Cn, "Cn");
    var fa = Symbol.for("nodejs.util.inspect.custom");
    function Se(e, t) {
      let r = dd(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a2 = r.get(s);
        return a2 ? a2.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a2 = r.get(s);
        return a2 ? a2.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = ga(Reflect.ownKeys(o), r), a2 = ga(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a2, ...n])];
      }, set(o, s, a2) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a2));
      }, getOwnPropertyDescriptor(o, s) {
        let a2 = Reflect.getOwnPropertyDescriptor(o, s);
        if (a2 && !a2.configurable) return a2;
        let l = r.get(s);
        return l ? l.getPropertyDescriptor ? { ...Rn, ...l?.getPropertyDescriptor(s) } : Rn : a2;
      }, defineProperty(o, s, a2) {
        return n.add(s), Reflect.defineProperty(o, s, a2);
      } });
      return i[fa] = function() {
        let o = { ...this };
        return delete o[fa], o;
      }, i;
    }
    __name(Se, "Se");
    function dd(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    __name(dd, "dd");
    function ga(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(ga, "ga");
    function _t(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(_t, "_t");
    function Ft(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(Ft, "Ft");
    function ha(e) {
      if (e === void 0) return "";
      let t = Ot(e);
      return new Rt(0, { colors: fn }).write(t).toString();
    }
    __name(ha, "ha");
    var md = "P2037";
    function st({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new V(fd(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new B(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    __name(st, "st");
    function fd(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === md && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(fd, "fd");
    var hr = "<unknown>";
    function ya(e) {
      var t = e.split(`
`);
      return t.reduce(function(r, n) {
        var i = yd(n) || Ed(n) || Pd(n) || Cd(n) || Td(n);
        return i && r.push(i), r;
      }, []);
    }
    __name(ya, "ya");
    var gd = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var hd = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    function yd(e) {
      var t = gd.exec(e);
      if (!t) return null;
      var r = t[2] && t[2].indexOf("native") === 0, n = t[2] && t[2].indexOf("eval") === 0, i = hd.exec(t[2]);
      return n && i != null && (t[2] = i[1], t[3] = i[2], t[4] = i[3]), { file: r ? null : t[2], methodName: t[1] || hr, arguments: r ? [t[2]] : [], lineNumber: t[3] ? +t[3] : null, column: t[4] ? +t[4] : null };
    }
    __name(yd, "yd");
    var bd = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function Ed(e) {
      var t = bd.exec(e);
      return t ? { file: t[2], methodName: t[1] || hr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
    }
    __name(Ed, "Ed");
    var wd = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var xd = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function Pd(e) {
      var t = wd.exec(e);
      if (!t) return null;
      var r = t[3] && t[3].indexOf(" > eval") > -1, n = xd.exec(t[3]);
      return r && n != null && (t[3] = n[1], t[4] = n[2], t[5] = null), { file: t[3], methodName: t[1] || hr, arguments: t[2] ? t[2].split(",") : [], lineNumber: t[4] ? +t[4] : null, column: t[5] ? +t[5] : null };
    }
    __name(Pd, "Pd");
    var vd = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
    function Td(e) {
      var t = vd.exec(e);
      return t ? { file: t[3], methodName: t[1] || hr, arguments: [], lineNumber: +t[4], column: t[5] ? +t[5] : null } : null;
    }
    __name(Td, "Td");
    var Rd = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function Cd(e) {
      var t = Rd.exec(e);
      return t ? { file: t[2], methodName: t[1] || hr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
    }
    __name(Cd, "Cd");
    var Bi = class {
      static {
        __name(this, "Bi");
      }
      getLocation() {
        return null;
      }
    };
    var Ui = class {
      static {
        __name(this, "Ui");
      }
      constructor() {
        this._error = new Error();
      }
      getLocation() {
        let t = this._error.stack;
        if (!t) return null;
        let n = ya(t).find((i) => {
          if (!i.file) return false;
          let o = mi(i.file);
          return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
        });
        return !n || !n.file ? null : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
      }
    };
    function Ze(e) {
      return e === "minimal" ? typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Bi() : new Ui();
    }
    __name(Ze, "Ze");
    var ba = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Lt(e = {}) {
      let t = Ad(e);
      return Object.entries(t).reduce((n, [i, o]) => (ba[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Lt, "Lt");
    function Ad(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(Ad, "Ad");
    function Sn(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(Sn, "Sn");
    function Ea(e, t) {
      let r = Sn(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: Lt })(e);
    }
    __name(Ea, "Ea");
    function Id(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? Lt({ ...r, _count: t }) : Lt({ ...r, _count: { _all: true } });
    }
    __name(Id, "Id");
    function Od(e = {}) {
      return typeof e.select == "object" ? (t) => Sn(e)(t)._count : (t) => Sn(e)(t)._count._all;
    }
    __name(Od, "Od");
    function wa(e, t) {
      return t({ action: "count", unpacker: Od(e), argsMapper: Id })(e);
    }
    __name(wa, "wa");
    function kd(e = {}) {
      let t = Lt(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(kd, "kd");
    function Dd(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(Dd, "Dd");
    function xa(e, t) {
      return t({ action: "groupBy", unpacker: Dd(e), argsMapper: kd })(e);
    }
    __name(xa, "xa");
    function Pa(e, t, r) {
      if (t === "aggregate") return (n) => Ea(n, r);
      if (t === "count") return (n) => wa(n, r);
      if (t === "groupBy") return (n) => xa(n, r);
    }
    __name(Pa, "Pa");
    function va(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = wi(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new sr(e, o, s.type, s.isList, s.kind === "enum");
      }, ...Cn(Object.keys(n)) });
    }
    __name(va, "va");
    var Ta = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "Ta");
    var Gi = /* @__PURE__ */ __name((e, t) => Ta(t).reduce((r, n) => r && r[n], e), "Gi");
    var Ra = /* @__PURE__ */ __name((e, t, r) => Ta(t).reduceRight((n, i, o, s) => Object.assign({}, Gi(e, s.slice(0, o)), { [i]: n }), r), "Ra");
    function _d(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(_d, "_d");
    function Fd(e, t, r) {
      return t === void 0 ? e ?? {} : Ra(t, r, e || true);
    }
    __name(Fd, "Fd");
    function Qi(e, t, r, n, i, o) {
      let a2 = e._runtimeDataModel.models[t].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
      return (l) => {
        let u = Ze(e._errorFormat), c = _d(n, i), p2 = Fd(l, o, c), d = r({ dataPath: c, callsite: u })(p2), f = Ld(e, t);
        return new Proxy(d, { get(g, h) {
          if (!f.includes(h)) return g[h];
          let T = [a2[h].type, r, h], S2 = [c, p2];
          return Qi(e, ...T, ...S2);
        }, ...Cn([...f, ...Object.getOwnPropertyNames(d)]) });
      };
    }
    __name(Qi, "Qi");
    function Ld(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Ld, "Ld");
    function Ca(e, t, r, n) {
      return e === Je.ModelAction.findFirstOrThrow || e === Je.ModelAction.findUniqueOrThrow ? Nd(t, r, n) : n;
    }
    __name(Ca, "Ca");
    function Nd(e, t, r) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Tt({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new J(o, { clientVersion: t });
        }
        return await r(n).catch((o) => {
          throw o instanceof V && o.code === "P2025" ? new Le(`No ${e} found`, t) : o;
        });
      };
    }
    __name(Nd, "Nd");
    var Md = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var $d = ["aggregate", "count", "groupBy"];
    function Ji(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [qd(e, t), Vd(e, t), gr(r), re("name", () => t), re("$name", () => t), re("$parent", () => e._appliedParent)];
      return Se({}, n);
    }
    __name(Ji, "Ji");
    function qd(e, t) {
      let r = Te(t), n = Object.keys(Je.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((l) => e._request(l), "s");
        s = Ca(o, t, e._clientVersion, s);
        let a2 = /* @__PURE__ */ __name((l) => (u) => {
          let c = Ze(e._errorFormat);
          return e._createPrismaPromise((p2) => {
            let d = { args: u, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: p2, callsite: c };
            return s({ ...d, ...l });
          });
        }, "a");
        return Md.includes(o) ? Qi(e, t, a2) : jd(i) ? Pa(e, i, a2) : a2({});
      } };
    }
    __name(qd, "qd");
    function jd(e) {
      return $d.includes(e);
    }
    __name(jd, "jd");
    function Vd(e, t) {
      return ot(re("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return va(t, r);
      }));
    }
    __name(Vd, "Vd");
    function Sa(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(Sa, "Sa");
    var Wi = Symbol();
    function yr(e) {
      let t = [Bd(e), re(Wi, () => e), re("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(gr(r)), Se(e, t);
    }
    __name(yr, "yr");
    function Bd(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(Te), n = [...new Set(t.concat(r))];
      return ot({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Sa(i);
        if (e._runtimeDataModel.models[o] !== void 0) return Ji(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return Ji(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(Bd, "Bd");
    function Aa(e) {
      return e[Wi] ? e[Wi] : e;
    }
    __name(Aa, "Aa");
    function Ia(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return yr(t);
    }
    __name(Ia, "Ia");
    function Oa({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s = [], a2 = [];
      for (let l of Object.values(o)) {
        if (n) {
          if (n[l.name]) continue;
          let u = l.needs.filter((c) => n[c]);
          u.length > 0 && a2.push(_t(u));
        } else if (r) {
          if (!r[l.name]) continue;
          let u = l.needs.filter((c) => !r[c]);
          u.length > 0 && a2.push(_t(u));
        }
        Ud(e, l.needs) && s.push(Gd(l, Se(e, s)));
      }
      return s.length > 0 || a2.length > 0 ? Se(e, [...s, ...a2]) : e;
    }
    __name(Oa, "Oa");
    function Ud(e, t) {
      return t.every((r) => Ei(e, r));
    }
    __name(Ud, "Ud");
    function Gd(e, t) {
      return ot(re(e.name, () => e.compute(t)));
    }
    __name(Gd, "Gd");
    function An({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++) t[s] = An({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && ka({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && ka({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(An, "An");
    function ka({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || Re(s)) continue;
        let l = n.models[r].fields.find((c) => c.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        t[o] = An({ visitor: i, result: t[o], args: u, modelName: l.type, runtimeDataModel: n });
      }
    }
    __name(ka, "ka");
    function Da({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : An({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a2, l, u) => {
        let c = Te(l);
        return Oa({ result: a2, modelName: c, select: u.select, omit: u.select ? void 0 : { ...o?.[c], ...u.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Da, "Da");
    function _a(e) {
      if (e instanceof oe) return Qd(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = br(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = br(e[r]);
      return t;
    }
    __name(_a, "_a");
    function Qd(e) {
      return new oe(e.strings, e.values);
    }
    __name(Qd, "Qd");
    function br(e) {
      if (typeof e != "object" || e == null || e instanceof Me || It(e)) return e;
      if (vt(e)) return new xe(e.toFixed());
      if (Pt(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = br(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: br(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = br(e[r]);
        return t;
      }
      Fe(e, "Unknown value");
    }
    __name(br, "br");
    function La(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: _a(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s, a2 = t) => {
          let l = a2.customDataProxyFetch;
          return a2.customDataProxyFetch = qa(o, l), a2.args = s, La(e, a2, r, n + 1);
        }, "query") });
      });
    }
    __name(La, "La");
    function Na(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return La(e, t, s);
    }
    __name(Na, "Na");
    function Ma(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? $a(r, n, 0, e) : e(r);
      };
    }
    __name(Ma, "Ma");
    function $a(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a2 = e) {
        let l = a2.customDataProxyFetch;
        return a2.customDataProxyFetch = qa(i, l), $a(a2, t, r + 1, n);
      } });
    }
    __name($a, "$a");
    var Fa = /* @__PURE__ */ __name((e) => e, "Fa");
    function qa(e = Fa, t = Fa) {
      return (r) => e(t(r));
    }
    __name(qa, "qa");
    var ja = L("prisma:client");
    var Va = { Vercel: "vercel", "Netlify CI": "netlify" };
    function Ba({ postinstall: e, ciName: t, clientVersion: r }) {
      if (ja("checkPlatformCaching:postinstall", e), ja("checkPlatformCaching:ciName", t), e === true && t && t in Va) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Va[t]}-build`;
        throw console.error(n), new R(n, r);
      }
    }
    __name(Ba, "Ba");
    function Ua(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(Ua, "Ua");
    var Jd = "Cloudflare-Workers";
    var Wd = "node";
    function Ga() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Jd ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Wd ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(Ga, "Ga");
    var Hd = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function In() {
      let e = Ga();
      return { id: e, prettyName: Hd[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(In, "In");
    var Ka = k(__require("fs"));
    var Er = k(__require("path"));
    function On(e) {
      let { runtimeBinaryTarget: t } = e;
      return `Add "${t}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${Kd(e)}`;
    }
    __name(On, "On");
    function Kd(e) {
      let { generator: t, generatorBinaryTargets: r, runtimeBinaryTarget: n } = e, i = { fromEnvVar: null, value: n }, o = [...r, i];
      return hi({ ...t, binaryTargets: o });
    }
    __name(Kd, "Kd");
    function Xe(e) {
      let { runtimeBinaryTarget: t } = e;
      return `Prisma Client could not locate the Query Engine for runtime "${t}".`;
    }
    __name(Xe, "Xe");
    function et(e) {
      let { searchedLocations: t } = e;
      return `The following locations have been searched:
${[...new Set(t)].map((i) => `  ${i}`).join(`
`)}`;
    }
    __name(et, "et");
    function Qa(e) {
      let { runtimeBinaryTarget: t } = e;
      return `${Xe(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${t}".
${On(e)}

${et(e)}`;
    }
    __name(Qa, "Qa");
    function kn(e) {
      return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`;
    }
    __name(kn, "kn");
    function Dn(e) {
      let { errorStack: t } = e;
      return t?.match(/\/\.next|\/next@|\/next\//) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
    }
    __name(Dn, "Dn");
    function Ja(e) {
      let { queryEngineName: t } = e;
      return `${Xe(e)}${Dn(e)}

This is likely caused by a bundler that has not copied "${t}" next to the resulting bundle.
Ensure that "${t}" has been copied next to the bundle or in "${e.expectedLocation}".

${kn("engine-not-found-bundler-investigation")}

${et(e)}`;
    }
    __name(Ja, "Ja");
    function Wa(e) {
      let { runtimeBinaryTarget: t, generatorBinaryTargets: r } = e, n = r.find((i) => i.native);
      return `${Xe(e)}

This happened because Prisma Client was generated for "${n?.value ?? "unknown"}", but the actual deployment required "${t}".
${On(e)}

${et(e)}`;
    }
    __name(Wa, "Wa");
    function Ha(e) {
      let { queryEngineName: t } = e;
      return `${Xe(e)}${Dn(e)}

This is likely caused by tooling that has not copied "${t}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${t}" has been copied to "${e.expectedLocation}".

${kn("engine-not-found-tooling-investigation")}

${et(e)}`;
    }
    __name(Ha, "Ha");
    var zd = L("prisma:client:engines:resolveEnginePath");
    var Yd = /* @__PURE__ */ __name(() => new RegExp("runtime[\\\\/]library\\.m?js$"), "Yd");
    async function za(e, t) {
      let r = { binary: process.env.PRISMA_QUERY_ENGINE_BINARY, library: process.env.PRISMA_QUERY_ENGINE_LIBRARY }[e] ?? t.prismaPath;
      if (r !== void 0) return r;
      let { enginePath: n, searchedLocations: i } = await Zd(e, t);
      if (zd("enginePath", n), n !== void 0 && e === "binary" && li(n), n !== void 0) return t.prismaPath = n;
      let o = await nt(), s = t.generator?.binaryTargets ?? [], a2 = s.some((d) => d.native), l = !s.some((d) => d.value === o), u = __filename.match(Yd()) === null, c = { searchedLocations: i, generatorBinaryTargets: s, generator: t.generator, runtimeBinaryTarget: o, queryEngineName: Ya(e, o), expectedLocation: Er.default.relative(process.cwd(), t.dirname), errorStack: new Error().stack }, p2;
      throw a2 && l ? p2 = Wa(c) : l ? p2 = Qa(c) : u ? p2 = Ja(c) : p2 = Ha(c), new R(p2, t.clientVersion);
    }
    __name(za, "za");
    async function Zd(engineType, config) {
      let binaryTarget = await nt(), searchedLocations = [], dirname = eval("__dirname"), searchLocations = [config.dirname, Er.default.resolve(dirname, ".."), config.generator?.output?.value ?? dirname, Er.default.resolve(dirname, "../../../.prisma/client"), "/tmp/prisma-engines", config.cwd];
      __filename.includes("resolveEnginePath") && searchLocations.push(Yo());
      for (let e of searchLocations) {
        let t = Ya(engineType, binaryTarget), r = Er.default.join(e, t);
        if (searchedLocations.push(e), Ka.default.existsSync(r)) return { enginePath: r, searchedLocations };
      }
      return { enginePath: void 0, searchedLocations };
    }
    __name(Zd, "Zd");
    function Ya(e, t) {
      return e === "library" ? qr(t, "fs") : `query-engine-${t}${t === "windows" ? ".exe" : ""}`;
    }
    __name(Ya, "Ya");
    var Hi = k(bi());
    function Za(e) {
      return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`) : "";
    }
    __name(Za, "Za");
    function Xa(e) {
      return e.split(`
`).map((t) => t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
    }
    __name(Xa, "Xa");
    var el = k(hs());
    function tl({ title: e, user: t = "prisma", repo: r = "prisma", template: n = "bug_report.yml", body: i }) {
      return (0, el.default)({ user: t, repo: r, template: n, title: e, body: i });
    }
    __name(tl, "tl");
    function rl({ version: e, binaryTarget: t, title: r, description: n, engineVersion: i, database: o, query: s }) {
      let a2 = So(6e3 - (s?.length ?? 0)), l = Xa((0, Hi.default)(a2)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = (0, Hi.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? Za(s) : ""}
\`\`\`
`), p2 = tl({ title: r, body: c });
      return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${X(p2)}

If you want the Prisma team to look into it, please open the link above 🙏
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
    }
    __name(rl, "rl");
    function Nt({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a2 = t[o]?.url;
      if (o === void 0 ? i = void 0 : a2 ? i = a2 : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw new R(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new R("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(Nt, "Nt");
    var _n = class extends Error {
      static {
        __name(this, "_n");
      }
      constructor(t, r) {
        super(t), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var se = class extends _n {
      static {
        __name(this, "se");
      }
      constructor(t, r) {
        super(t, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    function A(e, t) {
      return { ...e, isRetryable: t };
    }
    __name(A, "A");
    var Mt = class extends se {
      static {
        __name(this, "Mt");
      }
      constructor(r) {
        super("This request must be retried", A(r, true));
        this.name = "ForcedRetryError";
        this.code = "P5001";
      }
    };
    w(Mt, "ForcedRetryError");
    var at = class extends se {
      static {
        __name(this, "at");
      }
      constructor(r, n) {
        super(r, A(n, false));
        this.name = "InvalidDatasourceError";
        this.code = "P6001";
      }
    };
    w(at, "InvalidDatasourceError");
    var lt = class extends se {
      static {
        __name(this, "lt");
      }
      constructor(r, n) {
        super(r, A(n, false));
        this.name = "NotImplementedYetError";
        this.code = "P5004";
      }
    };
    w(lt, "NotImplementedYetError");
    var q = class extends se {
      static {
        __name(this, "q");
      }
      constructor(t, r) {
        super(t, r), this.response = r.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var ut = class extends q {
      static {
        __name(this, "ut");
      }
      constructor(r) {
        super("Schema needs to be uploaded", A(r, true));
        this.name = "SchemaMissingError";
        this.code = "P5005";
      }
    };
    w(ut, "SchemaMissingError");
    var Ki = "This request could not be understood by the server";
    var wr = class extends q {
      static {
        __name(this, "wr");
      }
      constructor(r, n, i) {
        super(n || Ki, A(r, false));
        this.name = "BadRequestError";
        this.code = "P5000";
        i && (this.code = i);
      }
    };
    w(wr, "BadRequestError");
    var xr = class extends q {
      static {
        __name(this, "xr");
      }
      constructor(r, n) {
        super("Engine not started: healthcheck timeout", A(r, true));
        this.name = "HealthcheckTimeoutError";
        this.code = "P5013";
        this.logs = n;
      }
    };
    w(xr, "HealthcheckTimeoutError");
    var Pr = class extends q {
      static {
        __name(this, "Pr");
      }
      constructor(r, n, i) {
        super(n, A(r, true));
        this.name = "EngineStartupError";
        this.code = "P5014";
        this.logs = i;
      }
    };
    w(Pr, "EngineStartupError");
    var vr = class extends q {
      static {
        __name(this, "vr");
      }
      constructor(r) {
        super("Engine version is not supported", A(r, false));
        this.name = "EngineVersionNotSupportedError";
        this.code = "P5012";
      }
    };
    w(vr, "EngineVersionNotSupportedError");
    var zi = "Request timed out";
    var Tr = class extends q {
      static {
        __name(this, "Tr");
      }
      constructor(r, n = zi) {
        super(n, A(r, false));
        this.name = "GatewayTimeoutError";
        this.code = "P5009";
      }
    };
    w(Tr, "GatewayTimeoutError");
    var Xd = "Interactive transaction error";
    var Rr = class extends q {
      static {
        __name(this, "Rr");
      }
      constructor(r, n = Xd) {
        super(n, A(r, false));
        this.name = "InteractiveTransactionError";
        this.code = "P5015";
      }
    };
    w(Rr, "InteractiveTransactionError");
    var em = "Request parameters are invalid";
    var Cr = class extends q {
      static {
        __name(this, "Cr");
      }
      constructor(r, n = em) {
        super(n, A(r, false));
        this.name = "InvalidRequestError";
        this.code = "P5011";
      }
    };
    w(Cr, "InvalidRequestError");
    var Yi = "Requested resource does not exist";
    var Sr = class extends q {
      static {
        __name(this, "Sr");
      }
      constructor(r, n = Yi) {
        super(n, A(r, false));
        this.name = "NotFoundError";
        this.code = "P5003";
      }
    };
    w(Sr, "NotFoundError");
    var Zi = "Unknown server error";
    var $t = class extends q {
      static {
        __name(this, "$t");
      }
      constructor(r, n, i) {
        super(n || Zi, A(r, true));
        this.name = "ServerError";
        this.code = "P5006";
        this.logs = i;
      }
    };
    w($t, "ServerError");
    var Xi = "Unauthorized, check your connection string";
    var Ar = class extends q {
      static {
        __name(this, "Ar");
      }
      constructor(r, n = Xi) {
        super(n, A(r, false));
        this.name = "UnauthorizedError";
        this.code = "P5007";
      }
    };
    w(Ar, "UnauthorizedError");
    var eo = "Usage exceeded, retry again later";
    var Ir = class extends q {
      static {
        __name(this, "Ir");
      }
      constructor(r, n = eo) {
        super(n, A(r, true));
        this.name = "UsageExceededError";
        this.code = "P5008";
      }
    };
    w(Ir, "UsageExceededError");
    async function tm(e) {
      let t;
      try {
        t = await e.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let r = JSON.parse(t);
        if (typeof r == "string") switch (r) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: r };
          default:
            return { type: "UnknownTextError", body: r };
        }
        if (typeof r == "object" && r !== null) {
          if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
          if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
            let n = Object.values(r)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
          }
        }
        return { type: "UnknownJsonError", body: r };
      } catch {
        return t === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: t };
      }
    }
    __name(tm, "tm");
    async function Or(e, t) {
      if (e.ok) return;
      let r = { clientVersion: t, response: e }, n = await tm(e);
      if (n.type === "QueryEngineError") throw new V(n.body.message, { code: n.body.error_code, clientVersion: t });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new $t(r, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new ut(r);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new vr(r);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new Pr(r, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new R(i, t, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new xr(r, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new Rr(r, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new Cr(r, n.body.InvalidRequestError.reason);
      }
      if (e.status === 401 || e.status === 403) throw new Ar(r, qt(Xi, n));
      if (e.status === 404) return new Sr(r, qt(Yi, n));
      if (e.status === 429) throw new Ir(r, qt(eo, n));
      if (e.status === 504) throw new Tr(r, qt(zi, n));
      if (e.status >= 500) throw new $t(r, qt(Zi, n));
      if (e.status >= 400) throw new wr(r, qt(Ki, n));
    }
    __name(Or, "Or");
    function qt(e, t) {
      return t.type === "EmptyError" ? e : `${e}: ${JSON.stringify(t)}`;
    }
    __name(qt, "qt");
    function nl(e) {
      let t = Math.pow(2, e) * 50, r = Math.ceil(Math.random() * t) - Math.ceil(t / 2), n = t + r;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    __name(nl, "nl");
    var $e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function il(e) {
      let t = new TextEncoder().encode(e), r = "", n = t.byteLength, i = n % 3, o = n - i, s, a2, l, u, c;
      for (let p2 = 0; p2 < o; p2 = p2 + 3) c = t[p2] << 16 | t[p2 + 1] << 8 | t[p2 + 2], s = (c & 16515072) >> 18, a2 = (c & 258048) >> 12, l = (c & 4032) >> 6, u = c & 63, r += $e[s] + $e[a2] + $e[l] + $e[u];
      return i == 1 ? (c = t[o], s = (c & 252) >> 2, a2 = (c & 3) << 4, r += $e[s] + $e[a2] + "==") : i == 2 && (c = t[o] << 8 | t[o + 1], s = (c & 64512) >> 10, a2 = (c & 1008) >> 4, l = (c & 15) << 2, r += $e[s] + $e[a2] + $e[l] + "="), r;
    }
    __name(il, "il");
    function ol(e) {
      if (!!e.generator?.previewFeatures.some((r) => r.toLowerCase().includes("metrics"))) throw new R("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
    }
    __name(ol, "ol");
    function rm(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    __name(rm, "rm");
    function sl(e) {
      return new Date(rm(e));
    }
    __name(sl, "sl");
    var al = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    var kr = class extends se {
      static {
        __name(this, "kr");
      }
      constructor(r, n) {
        super(`Cannot fetch data from service:
${r}`, A(n, true));
        this.name = "RequestError";
        this.code = "P5010";
      }
    };
    w(kr, "RequestError");
    async function ct(e, t, r = (n) => n) {
      let n = t.clientVersion;
      try {
        return typeof fetch == "function" ? await r(fetch)(e, t) : await r(to)(e, t);
      } catch (i) {
        let o = i.message ?? "Unknown error";
        throw new kr(o, { clientVersion: n });
      }
    }
    __name(ct, "ct");
    function im(e) {
      return { ...e.headers, "Content-Type": "application/json" };
    }
    __name(im, "im");
    function om(e) {
      return { method: e.method, headers: im(e) };
    }
    __name(om, "om");
    function sm(e, t) {
      return { text: /* @__PURE__ */ __name(() => Promise.resolve(Buffer.concat(e).toString()), "text"), json: /* @__PURE__ */ __name(() => Promise.resolve().then(() => JSON.parse(Buffer.concat(e).toString())), "json"), ok: t.statusCode >= 200 && t.statusCode <= 299, status: t.statusCode, url: t.url, headers: new ro(t.headers) };
    }
    __name(sm, "sm");
    async function to(e, t = {}) {
      let r = am("https"), n = om(t), i = [], { origin: o } = new URL(e);
      return new Promise((s, a2) => {
        let l = r.request(e, n, (u) => {
          let { statusCode: c, headers: { location: p2 } } = u;
          c >= 301 && c <= 399 && p2 && (p2.startsWith("http") === false ? s(to(`${o}${p2}`, t)) : s(to(p2, t))), u.on("data", (d) => i.push(d)), u.on("end", () => s(sm(i, u))), u.on("error", a2);
        });
        l.on("error", a2), l.end(t.body ?? "");
      });
    }
    __name(to, "to");
    var am = typeof __require < "u" ? __require : () => {
    };
    var ro = class {
      static {
        __name(this, "ro");
      }
      constructor(t = {}) {
        this.headers = /* @__PURE__ */ new Map();
        for (let [r, n] of Object.entries(t)) if (typeof n == "string") this.headers.set(r, n);
        else if (Array.isArray(n)) for (let i of n) this.headers.set(r, i);
      }
      append(t, r) {
        this.headers.set(t, r);
      }
      delete(t) {
        this.headers.delete(t);
      }
      get(t) {
        return this.headers.get(t) ?? null;
      }
      has(t) {
        return this.headers.has(t);
      }
      set(t, r) {
        this.headers.set(t, r);
      }
      forEach(t, r) {
        for (let [n, i] of this.headers) t.call(r, i, n, this);
      }
    };
    var lm = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var ll = L("prisma:client:dataproxyEngine");
    async function um(e, t) {
      let r = al["@prisma/engines-version"], n = t.clientVersion ?? "unknown";
      if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && lm.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        if (e.startsWith("localhost") || e.startsWith("127.0.0.1")) return "0.0.0";
        let [s] = r.split("-") ?? [], [a2, l, u] = s.split("."), c = cm(`<=${a2}.${l}.${u}`), p2 = await ct(c, { clientVersion: n });
        if (!p2.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p2.status} ${p2.statusText}, response body: ${await p2.text() || "<empty body>"}`);
        let d = await p2.text();
        ll("length of body fetched from unpkg.com", d.length);
        let f;
        try {
          f = JSON.parse(d);
        } catch (g) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", d), g;
        }
        return f.version;
      }
      throw new lt("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    __name(um, "um");
    async function ul(e, t) {
      let r = await um(e, t);
      return ll("version", r), r;
    }
    __name(ul, "ul");
    function cm(e) {
      return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
    }
    __name(cm, "cm");
    var cl = 3;
    var no = L("prisma:client:dataproxyEngine");
    var io = class {
      static {
        __name(this, "io");
      }
      constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: t, interactiveTransaction: r } = {}) {
        let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
        this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-transaction-id"] = r.id);
        let i = this.buildCaptureSettings();
        return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
      }
      buildCaptureSettings() {
        let t = [];
        return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
      }
    };
    var Dr = class {
      static {
        __name(this, "Dr");
      }
      constructor(t) {
        this.name = "DataProxyEngine";
        ol(t), this.config = t, this.env = { ...t.env, ...typeof process < "u" ? process.env : {} }, this.inlineSchema = il(t.inlineSchema), this.inlineDatasources = t.inlineDatasources, this.inlineSchemaHash = t.inlineSchemaHash, this.clientVersion = t.clientVersion, this.engineHash = t.engineVersion, this.logEmitter = t.logEmitter, this.tracingHelper = t.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let [t, r] = this.extractHostAndApiKey();
          this.host = t, this.headerBuilder = new io({ apiKey: r, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await ul(t, this.config), no("host", this.host);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(t) {
        t?.logs?.length && t.logs.forEach((r) => {
          switch (r.level) {
            case "debug":
            case "error":
            case "trace":
            case "warn":
            case "info":
              break;
            case "query": {
              let n = typeof r.attributes.query == "string" ? r.attributes.query : "";
              if (!this.tracingHelper.isEnabled()) {
                let [i] = n.split("/* traceparent");
                n = i;
              }
              this.logEmitter.emit("query", { query: n, timestamp: sl(r.timestamp), duration: Number(r.attributes.duration_ms), params: r.attributes.params, target: r.attributes.target });
            }
          }
        }), t?.traces?.length && this.tracingHelper.createEngineSpan({ span: true, spans: t.traces });
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(t) {
        return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${t}`;
      }
      async uploadSchema() {
        let t = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(t, async () => {
          let r = await ct(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          r.ok || no("schema response status", r.status);
          let n = await Or(r, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(t, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: t, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(t, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = Ft(t, n), { batchResult: a2, elapsed: l } = await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r });
        return a2.map((u) => "errors" in u && u.errors.length > 0 ? st(u.errors[0], this.clientVersion, this.config.activeProvider) : { data: u, elapsed: l });
      }
      requestInternal({ body: t, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a2 = await ct(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, interactiveTransaction: i }), body: JSON.stringify(t), clientVersion: this.clientVersion }, n);
          a2.ok || no("graphql response status", a2.status), await this.handleError(await Or(a2, this.clientVersion));
          let l = await a2.json(), u = l.extensions;
          if (u && this.propagateResponseExtensions(u), l.errors) throw l.errors.length === 1 ? st(l.errors[0], this.config.clientVersion, this.config.activeProvider) : new B(l.errors, { clientVersion: this.config.clientVersion });
          return l;
        }, "callback") });
      }
      async transaction(t, r, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[t]} transaction`, callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          if (t === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a2 = await this.url("transaction/start");
            o(a2);
            let l = await ct(a2, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await Or(l, this.clientVersion));
            let u = await l.json(), c = u.extensions;
            c && this.propagateResponseExtensions(c);
            let p2 = u.id, d = u["data-proxy"].endpoint;
            return { id: p2, payload: { endpoint: d } };
          } else {
            let s = `${n.payload.endpoint}/${t}`;
            o(s);
            let a2 = await ct(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await Or(a2, this.clientVersion));
            let u = (await a2.json()).extensions;
            u && this.propagateResponseExtensions(u);
            return;
          }
        }, "callback") });
      }
      extractHostAndApiKey() {
        let t = { clientVersion: this.clientVersion }, r = Object.keys(this.inlineDatasources)[0], n = Nt({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
        try {
          i = new URL(n);
        } catch {
          throw new at(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        }
        let { protocol: o, host: s, searchParams: a2 } = i;
        if (o !== "prisma:" && o !== "prisma+postgres:") throw new at(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
        let l = a2.get("api_key");
        if (l === null || l.length < 1) throw new at(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, t);
        return [s, l];
      }
      metrics() {
        throw new lt("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(t) {
        for (let r = 0; ; r++) {
          let n = /* @__PURE__ */ __name((i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }, "n");
          try {
            return await t.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof se) || !i.isRetryable) throw i;
            if (r >= cl) throw i instanceof Mt ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${cl} failed for ${t.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await nl(r);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(t) {
        if (t instanceof ut) throw await this.uploadSchema(), new Mt({ clientVersion: this.clientVersion, cause: t });
        if (t) throw t;
      }
      applyPendingMigrations() {
        throw new Error("Method not implemented.");
      }
    };
    function pl(e) {
      if (e?.kind === "itx") return e.options.id;
    }
    __name(pl, "pl");
    var so = k(__require("os"));
    var dl = k(__require("path"));
    var oo = Symbol("PrismaLibraryEngineCache");
    function pm() {
      let e = globalThis;
      return e[oo] === void 0 && (e[oo] = {}), e[oo];
    }
    __name(pm, "pm");
    function dm(e) {
      let t = pm();
      if (t[e] !== void 0) return t[e];
      let r = dl.default.toNamespacedPath(e), n = { exports: {} }, i = 0;
      return process.platform !== "win32" && (i = so.default.constants.dlopen.RTLD_LAZY | so.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, r, i), t[e] = n.exports, n.exports;
    }
    __name(dm, "dm");
    var ml = { async loadLibrary(e) {
      let t = await Yn(), r = await za("library", e);
      try {
        return e.tracingHelper.runInChildSpan({ name: "loadLibrary", internal: true }, () => dm(r));
      } catch (n) {
        let i = ui({ e: n, platformInfo: t, id: r });
        throw new R(i, e.clientVersion);
      }
    } };
    var ao;
    var fl = { async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0) throw new R(`The \`adapter\` option for \`PrismaClient\` is required in this context (${In().prettyName})`, t);
      if (n === void 0) throw new R("WASM engine was unexpectedly `undefined`", t);
      ao === void 0 && (ao = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new R("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let a2 = { "./query_engine_bg.js": o }, l = new WebAssembly.Instance(s, a2);
        return o.__wbg_set_wasm(l.exports), o.QueryEngine;
      })());
      let i = await ao;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var mm = "P2036";
    var Ae = L("prisma:client:libraryEngine");
    function fm(e) {
      return e.item_type === "query" && "query" in e;
    }
    __name(fm, "fm");
    function gm(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    __name(gm, "gm");
    var gl = [...Jn, "native"];
    var _r = class {
      static {
        __name(this, "_r");
      }
      constructor(t, r) {
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? ml, t.engineWasm !== void 0 && (this.libraryLoader = r ?? fl), this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, t.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(t.overrideDatasources)[0], i = t.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(t, r, n) {
        await this.start();
        let i = JSON.stringify(r), o;
        if (t === "start") {
          let a2 = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a2, i);
        } else t === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : t === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (hm(s)) {
          let a2 = this.getExternalAdapterError(s);
          throw a2 ? a2.error : new V(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (Ae("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        Qn(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
        {
          if (this.binaryTarget) return this.binaryTarget;
          let t = await nt();
          if (!gl.includes(t)) throw new R(`Unknown ${ce("PRISMA_QUERY_ENGINE_LIBRARY")} ${ce(H(t))}. Possible binaryTargets: ${qe(gl.join(", "))} or a path to the query engine library.
You may have to run ${qe("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
          return t;
        }
      }
      parseEngineResponse(t) {
        if (!t) throw new B("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(t);
        } catch {
          throw new B("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let t = new WeakRef(this), { adapter: r } = this.config;
            r && Ae("Using driver adapter: %O", r), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: process.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              t.deref()?.logger(n);
            }, r);
          } catch (t) {
            let r = t, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new R(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(t) {
        let r = this.parseEngineResponse(t);
        if (r) {
          if ("span" in r) {
            this.config.tracingHelper.createEngineSpan(r);
            return;
          }
          r.level = r?.level.toLowerCase() ?? "unknown", fm(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : gm(r) ? this.loggerRustPanic = new le(lo(this, `${r.message}: ${r.reason} in ${r.file}:${r.line}:${r.column}`), this.config.clientVersion) : this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path });
        }
      }
      parseInitError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      parseRequestError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return Ae(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          Ae("library starting");
          try {
            let r = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, Ae("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new R(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "t");
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return Ae("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), Ae("library stopping");
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, Ae("library stopped");
        }, "t");
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(t) {
        return this.library?.debugPanic(t);
      }
      async request(t, { traceparent: r, interactiveTransaction: n }) {
        Ae(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new B(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof R) throw s;
          if (s.code === "GenericFailure" && s.message?.startsWith("PANIC:")) throw new le(lo(this, s.message), this.config.clientVersion);
          let a2 = this.parseRequestError(s.message);
          throw typeof a2 == "string" ? s : new B(`${a2.message}
${a2.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(t, { transaction: r, traceparent: n }) {
        Ae("requestBatch");
        let i = Ft(t, r);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), pl(r));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new B(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a2, errors: l } = s;
        if (Array.isArray(a2)) return a2.map((u) => u.errors && u.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(u.errors[0]) : { data: u, elapsed: 0 });
        throw l && l.length === 1 ? new Error(l[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(t) {
        if (t.user_facing_error.is_panic) return new le(lo(this, t.user_facing_error.message), this.config.clientVersion);
        let r = this.getExternalAdapterError(t.user_facing_error);
        return r ? r.error : st(t, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(t) {
        if (t.error_code === mm && this.config.adapter) {
          let r = t.meta?.id;
          Yr(typeof r == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(r);
          return Yr(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(t) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(t));
        return t.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function hm(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    __name(hm, "hm");
    function lo(e, t) {
      return rl({ binaryTarget: e.binaryTarget, title: t, version: e.config.clientVersion, engineVersion: e.versionInfo?.commit, database: e.config.activeProvider, query: e.lastQuery });
    }
    __name(lo, "lo");
    function hl({ copyEngine: e = true }, t) {
      let r;
      try {
        r = Nt({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...process.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
      e && n && tr("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = Yt(t.generator), o = n || !e, s = !!t.adapter, a2 = i === "library", l = i === "binary";
      if (o && s || s && false) {
        let u;
        throw e ? r?.startsWith("prisma://") ? u = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : u = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : u = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new J(u.join(`
`), { clientVersion: t.clientVersion });
      }
      if (o) return new Dr(t);
      if (a2) return new _r(t);
      throw new J("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    __name(hl, "hl");
    function Fn({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(Fn, "Fn");
    var yl = /* @__PURE__ */ __name((e) => ({ command: e }), "yl");
    var bl = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "bl");
    function jt(e) {
      try {
        return El(e, "fast");
      } catch {
        return El(e, "slow");
      }
    }
    __name(jt, "jt");
    function El(e, t) {
      return JSON.stringify(e.map((r) => xl(r, t)));
    }
    __name(El, "El");
    function xl(e, t) {
      return Array.isArray(e) ? e.map((r) => xl(r, t)) : typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : Pt(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : xe.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : Buffer.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : ym(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: Buffer.from(e).toString("base64") } : typeof e == "object" && t === "slow" ? Pl(e) : e;
    }
    __name(xl, "xl");
    function ym(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(ym, "ym");
    function Pl(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(wl);
      let t = {};
      for (let r of Object.keys(e)) t[r] = wl(e[r]);
      return t;
    }
    __name(Pl, "Pl");
    function wl(e) {
      return typeof e == "bigint" ? e.toString() : Pl(e);
    }
    __name(wl, "wl");
    var bm = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var vl = bm;
    var Em = /^(\s*alter\s)/i;
    var Tl = L("prisma:client");
    function uo(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Em.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(uo, "uo");
    var co = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (pa(r)) n = r.sql, i = { values: jt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: jt(s || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: jt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: jt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = bl(r), i = { values: jt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return i?.values ? Tl(`prisma.${e}(${n}, ${i.values})`) : Tl(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "co");
    var Rl = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new oe(t, r);
    } };
    var Cl = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    function po(e) {
      return function(r) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ??= Sl(r(o)) : Sl(r(o));
          } catch (s) {
            return Promise.reject(s);
          }
        }, "i");
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(po, "po");
    function Sl(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(Sl, "Sl");
    var Al = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var mo = class {
      static {
        __name(this, "mo");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getGlobalTracingHelper().getTraceParent(t);
      }
      createEngineSpan(t) {
        return this.getGlobalTracingHelper().createEngineSpan(t);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getGlobalTracingHelper().runInChildSpan(t, r);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? Al;
      }
    };
    function Il(e) {
      return e.includes("tracing") ? new mo() : Al;
    }
    __name(Il, "Il");
    function Ol(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(Ol, "Ol");
    function kl(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(kl, "kl");
    var Ln = class {
      static {
        __name(this, "Ln");
      }
      constructor() {
        this._middlewares = [];
      }
      use(t) {
        this._middlewares.push(t);
      }
      get(t) {
        return this._middlewares[t];
      }
      has(t) {
        return !!this._middlewares[t];
      }
      length() {
        return this._middlewares.length;
      }
    };
    var Fl = k(bi());
    function Nn(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(Nn, "Nn");
    function Dl(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(fo(e.query.arguments)), t.push(fo(e.query.selection)), t.join("");
    }
    __name(Dl, "Dl");
    function fo(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${fo(n)})` : r;
      }).join(" ")})`;
    }
    __name(fo, "fo");
    var wm = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function go(e) {
      return wm[e];
    }
    __name(go, "go");
    var Mn = class {
      static {
        __name(this, "Mn");
      }
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, process.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    function pt(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes":
          return Buffer.from(t, "base64");
        case "decimal":
          return new xe(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => pt("bigint", r));
        case "bytes-array":
          return t.map((r) => pt("bytes", r));
        case "decimal-array":
          return t.map((r) => pt("decimal", r));
        case "datetime-array":
          return t.map((r) => pt("datetime", r));
        case "date-array":
          return t.map((r) => pt("date", r));
        case "time-array":
          return t.map((r) => pt("time", r));
        default:
          return t;
      }
    }
    __name(pt, "pt");
    function _l(e) {
      let t = [], r = xm(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[e.columns[s]] = pt(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    __name(_l, "_l");
    function xm(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    __name(xm, "xm");
    var Pm = L("prisma:client:request_handler");
    var $n = class {
      static {
        __name(this, "$n");
      }
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new Mn({ batchLoader: Ma(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a2 = n.map((p2) => p2.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p2) => go(p2.protocolQuery.action));
          return (await this.client._engine.requestBatch(a2, { traceparent: l, transaction: vm(o), containsWrite: u, customDataProxyFetch: i })).map((p2, d) => {
            if (p2 instanceof Error) return p2;
            try {
              return this.mapQueryEngineResult(n[d], p2);
            } catch (f) {
              return f;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? Ll(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: go(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : Dl(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2 } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, t, r);
        return process.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a2 }) {
        if (Pm(t), Tm(t, i) || t instanceof Le) throw t;
        if (t instanceof V && Rm(t)) {
          let u = Nl(t.meta);
          wn({ args: o, errors: [u], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a2 });
        }
        let l = t.message;
        if (n && (l = Tt({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: l })), l = this.sanitizeMessage(l), t.code) {
          let u = s ? { modelName: s, ...t.meta } : t.meta;
          throw new V(l, { code: t.code, clientVersion: this.client._clientVersion, meta: u, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new le(l, this.client._clientVersion);
          if (t instanceof B) throw new B(l, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof R) throw new R(l, this.client._clientVersion);
          if (t instanceof le) throw new le(l, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Fl.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((u) => u !== "select" && u !== "include"), a2 = Gi(o, s), l = i === "queryRaw" ? _l(a2) : wt(a2);
        return n ? n(l) : l;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function vm(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: Ll(e) };
        Fe(e, "Unknown transaction kind");
      }
    }
    __name(vm, "vm");
    function Ll(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(Ll, "Ll");
    function Tm(e, t) {
      return Nn(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Tm, "Tm");
    function Rm(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Rm, "Rm");
    function Nl(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(Nl) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(Nl, "Nl");
    var Ml = "5.22.0";
    var $l = Ml;
    var Ul = k(Ai());
    var F = class extends Error {
      static {
        __name(this, "F");
      }
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    w(F, "PrismaClientConstructorValidationError");
    var ql = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var jl = ["pretty", "colorless", "minimal"];
    var Vl = ["info", "query", "warn", "error"];
    var Sm = { datasources: /* @__PURE__ */ __name((e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new F(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = Vt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new F(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new F(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new F(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new F(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((e, t) => {
      if (e === null) return;
      if (e === void 0) throw new F('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!Fn(t).includes("driverAdapters")) throw new F('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Yt() === "binary") throw new F('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((e) => {
      if (typeof e < "u" && typeof e != "string") throw new F(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new F(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!jl.includes(e)) {
          let t = Vt(e, jl);
          throw new F(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new F(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Vl.includes(r)) {
          let n = Vt(r, Vl);
          throw new F(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = Vt(i, o);
            throw new F(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new F(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new F(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new F(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((e, t) => {
      if (typeof e != "object") throw new F('"omit" option is expected to be an object.');
      if (e === null) throw new F('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = Im(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a2] of Object.entries(i)) {
          let l = o.fields.find((u) => u.name === s);
          if (!l) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (l.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a2 != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new F(Om(e, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new F(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = Vt(r, t);
        throw new F(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function Gl(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!ql.includes(r)) {
          let i = Vt(r, ql);
          throw new F(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Sm[r](n, t);
      }
      if (e.datasourceUrl && e.datasources) throw new F('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(Gl, "Gl");
    function Vt(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = Am(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(Vt, "Vt");
    function Am(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, Ul.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Am, "Am");
    function Im(e, t) {
      return Bl(t.models, e) ?? Bl(t.types, e);
    }
    __name(Im, "Im");
    function Bl(e, t) {
      let r = Object.keys(e).find((n) => xt(n) === t);
      if (r) return e[r];
    }
    __name(Bl, "Bl");
    function Om(e, t) {
      let r = Ot(e);
      for (let o of t) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = En(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Om, "Om");
    function Ql(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a2 = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), l = /* @__PURE__ */ __name((u) => {
          o || (o = true, r(u));
        }, "l");
        for (let u = 0; u < e.length; u++) e[u].then((c) => {
          n[u] = c, a2();
        }, (c) => {
          if (!Nn(c)) {
            l(c);
            return;
          }
          c.batchRequestIdx === u ? l(c) : (i || (i = c), a2());
        });
      });
    }
    __name(Ql, "Ql");
    var tt = L("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var km = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var Dm = Symbol.for("prisma.client.transaction.id");
    var _m = { id: 0, nextId() {
      return ++this.id;
    } };
    function Yl(e) {
      class t {
        static {
          __name(this, "t");
        }
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new Ln();
          this._createPrismaPromise = po();
          this.$extends = Ia;
          e = n?.__internal?.configOverride?.(e) ?? e, Ba(e), n && Gl(n, e);
          let i = new Kl.EventEmitter().on("error", () => {
          });
          this._extensions = kt.empty(), this._previewFeatures = Fn(e), this._clientVersion = e.clientVersion ?? $l, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = Il(this._previewFeatures);
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && Fr.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && Fr.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = qi(n.adapter);
            let l = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== l) throw new R(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new R("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a2 = !s && zt(o, { conflictCheck: "none" }) || e.injectableEdgeEnv?.();
          try {
            let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === true;
            c && L.enable("prisma:client");
            let p2 = Fr.default.resolve(e.dirname, e.relativePath);
            zl.default.existsSync(p2) || (p2 = e.dirname), tt("dirname", e.dirname), tt("relativePath", e.relativePath), tt("cwd", p2);
            let d = u.engine || {};
            if (l.errorFormat ? this._errorFormat = l.errorFormat : process.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: p2, dirname: e.dirname, enableDebugLogs: c, allowTriggerPanic: d.allowTriggerPanic, datamodelPath: Fr.default.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: d.binaryPath ?? void 0, engineEndpoint: d.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && kl(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((f) => typeof f == "string" ? f === "query" : f.level === "query")), env: a2?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: Ua(l, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: l.transactionOptions?.maxWait ?? 2e3, timeout: l.transactionOptions?.timeout ?? 5e3, isolationLevel: l.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: Nt, getBatchRequestPayload: Ft, prismaGraphQLToJSError: st, PrismaClientUnknownRequestError: B, PrismaClientInitializationError: R, PrismaClientKnownRequestError: V, debug: L("prisma:client:accelerateEngine"), engineVersion: Wl.version, clientVersion: e.clientVersion } }, tt("clientVersion", e.clientVersion), this._engine = hl(e, this._engineConfig), this._requestHandler = new $n(this, i), l.log) for (let f of l.log) {
              let g = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
              g && this.$on(g, (h) => {
                er.log(`${er.tags[g] ?? ""}`, h.message || h.query);
              });
            }
            this._metrics = new Dt(this._engine);
          } catch (l) {
            throw l.clientVersion = this._clientVersion, l;
          }
          return this._appliedParent = yr(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Ao();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: co({ clientMethod: i, activeProvider: a2 }), callsite: Ze(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a2] = Jl(n, i);
              return uo(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a2);
            }
            throw new J("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (uo(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new J(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: yl, callsite: Ze(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: co({ clientMethod: i, activeProvider: a2 }), callsite: Ze(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Jl(n, i));
            throw new J("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new J("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = _m.nextId(), s = Ol(n.length), a2 = n.map((l, u) => {
            if (l?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let c = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, p2 = { kind: "batch", id: o, index: u, isolationLevel: c, lock: s };
            return l.requestTransaction?.(p2) ?? l;
          });
          return Ql(a2);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a2 = await this._engine.transaction("start", o, s), l;
          try {
            let u = { kind: "itx", ...a2 };
            l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a2);
          } catch (u) {
            throw await this._engine.transaction("rollback", o, a2).catch(() => {
            }), u;
          }
          return l;
        }
        _createItxClient(n) {
          return yr(Se(Aa(this), [re("_appliedParent", () => this._appliedParent._createItxClient(n)), re("_createPrismaPromise", () => po(n)), re(Dm, () => n.id), _t(vl)]));
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? km, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a2 = -1, l = /* @__PURE__ */ __name(async (u) => {
            let c = this._middlewares.get(++a2);
            if (c) return this._tracingHelper.runInChildSpan(s.middleware, (O2) => c(u, (T) => (O2?.end(), l(T))));
            let { runInTransaction: p2, args: d, ...f } = u, g = { ...n, ...f };
            d && (g.args = i.middlewareArgsToRequestArgs(d)), n.transaction !== void 0 && p2 === false && delete g.transaction;
            let h = await Na(this, g);
            return g.model ? Da({ result: h, modelName: g.model, args: g.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : h;
          }, "l");
          return this._tracingHelper.runInChildSpan(s.operation, () => new Hl.AsyncResource("prisma-client-request").runInAsyncScope(() => l(o)));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a2, model: l, argsMapper: u, transaction: c, unpacker: p2, otelParentCtx: d, customDataProxyFetch: f }) {
          try {
            n = u ? u(n) : n;
            let g = { name: "serialize" }, h = this._tracingHelper.runInChildSpan(g, () => vn({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a2, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return L.enabled("prisma:client") && (tt("Prisma Client call:"), tt(`prisma.${i}(${ha(n)})`), tt("Generated request:"), tt(JSON.stringify(h, null, 2) + `
`)), c?.kind === "batch" && await c.lock, this._requestHandler.request({ protocolQuery: h, modelName: l, action: a2, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: c, unpacker: p2, otelParentCtx: d, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: f });
          } catch (g) {
            throw g.clientVersion = this._clientVersion, g;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new J("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
      }
      return t;
    }
    __name(Yl, "Yl");
    function Jl(e, t) {
      return Fm(e) ? [new oe(e, t), Rl] : [e, Cl];
    }
    __name(Jl, "Jl");
    function Fm(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(Fm, "Fm");
    var Lm = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Zl(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!Lm.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Zl, "Zl");
    function Xl(e) {
      zt(e, { conflictCheck: "warn" });
    }
    __name(Xl, "Xl");
  }
});

// node_modules/.prisma/client/index.js
var require_client = __commonJS({
  "node_modules/.prisma/client/index.js"(exports2) {
    init_esm();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw2,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2
    } = require_library();
    var Prisma = {};
    exports2.Prisma = Prisma;
    exports2.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.22.0",
      engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw2;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    var path = __require("path");
    exports2.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports2.Prisma.NovelScalarFieldEnum = {
      id: "id",
      title: "title",
      author: "author",
      description: "description",
      coverUrl: "coverUrl",
      status: "status",
      publishStatus: "publishStatus",
      isAdult: "isAdult",
      authorId: "authorId",
      sourceLocale: "sourceLocale",
      viewCount: "viewCount",
      favoriteCount: "favoriteCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports2.Prisma.CategoryScalarFieldEnum = {
      id: "id",
      slug: "slug"
    };
    exports2.Prisma.NovelCategoryScalarFieldEnum = {
      novelId: "novelId",
      categoryId: "categoryId"
    };
    exports2.Prisma.NovelTranslationScalarFieldEnum = {
      id: "id",
      novelId: "novelId",
      locale: "locale",
      title: "title",
      description: "description",
      status: "status"
    };
    exports2.Prisma.ChapterScalarFieldEnum = {
      id: "id",
      novelId: "novelId",
      title: "title",
      content: "content",
      order: "order",
      publishStatus: "publishStatus",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports2.Prisma.ChapterTranslationScalarFieldEnum = {
      id: "id",
      chapterId: "chapterId",
      locale: "locale",
      title: "title",
      content: "content",
      status: "status"
    };
    exports2.Prisma.FavoriteScalarFieldEnum = {
      id: "id",
      userId: "userId",
      novelId: "novelId",
      createdAt: "createdAt"
    };
    exports2.Prisma.TranslationRequestScalarFieldEnum = {
      id: "id",
      novelId: "novelId",
      targetLocale: "targetLocale",
      status: "status",
      totalChapters: "totalChapters",
      doneChapters: "doneChapters",
      triggerRunId: "triggerRunId",
      errorMessage: "errorMessage",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports2.Prisma.CommentScalarFieldEnum = {
      id: "id",
      content: "content",
      authorId: "authorId",
      chapterId: "chapterId",
      paragraphIndex: "paragraphIndex",
      parentId: "parentId",
      isReadByAuthor: "isReadByAuthor",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      isDeleted: "isDeleted"
    };
    exports2.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports2.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports2.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports2.NovelStatus = exports2.$Enums.NovelStatus = {
      ONGOING: "ONGOING",
      COMPLETED: "COMPLETED",
      HIATUS: "HIATUS"
    };
    exports2.Prisma.ModelName = {
      Novel: "Novel",
      Category: "Category",
      NovelCategory: "NovelCategory",
      NovelTranslation: "NovelTranslation",
      Chapter: "Chapter",
      ChapterTranslation: "ChapterTranslation",
      Favorite: "Favorite",
      TranslationRequest: "TranslationRequest",
      Comment: "Comment"
    };
    var config2 = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "D:\\creation\\dotnovel\\node_modules\\@prisma\\client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "windows",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "D:\\creation\\dotnovel\\prisma\\schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "5.22.0",
      "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": 'generator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}\n\nmodel Novel {\n  id                  String               @id @default(cuid())\n  title               String\n  author              String\n  description         String?              @db.Text\n  coverUrl            String?\n  status              NovelStatus          @default(ONGOING)\n  publishStatus       String               @default("published")\n  isAdult             Boolean              @default(false)\n  authorId            String?\n  sourceLocale        String               @default("zh-CN")\n  viewCount           Int                  @default(0)\n  favoriteCount       Int                  @default(0)\n  createdAt           DateTime             @default(now())\n  updatedAt           DateTime             @updatedAt\n  chapters            Chapter[]\n  favorites           Favorite[]\n  translations        NovelTranslation[]\n  categories          NovelCategory[]\n  translationRequests TranslationRequest[]\n\n  @@map("novels")\n}\n\nmodel Category {\n  id     String          @id @default(cuid())\n  slug   String          @unique\n  novels NovelCategory[]\n\n  @@map("categories")\n}\n\nmodel NovelCategory {\n  novelId    String\n  categoryId String\n  novel      Novel    @relation(fields: [novelId], references: [id], onDelete: Cascade)\n  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  @@id([novelId, categoryId])\n  @@map("novel_categories")\n}\n\nmodel NovelTranslation {\n  id          String @id @default(cuid())\n  novelId     String\n  locale      String\n  title       String\n  description String @db.Text\n  status      String @default("published")\n  novel       Novel  @relation(fields: [novelId], references: [id], onDelete: Cascade)\n\n  @@unique([novelId, locale])\n  @@map("novel_translations")\n}\n\nmodel Chapter {\n  id            String               @id @default(cuid())\n  novelId       String\n  title         String\n  content       String               @db.Text\n  order         Int\n  publishStatus String               @default("published")\n  createdAt     DateTime             @default(now())\n  updatedAt     DateTime             @updatedAt\n  novel         Novel                @relation(fields: [novelId], references: [id], onDelete: Cascade)\n  translations  ChapterTranslation[]\n  comments      Comment[]\n\n  @@unique([novelId, order])\n  @@map("chapters")\n}\n\nmodel ChapterTranslation {\n  id        String  @id @default(cuid())\n  chapterId String\n  locale    String\n  title     String\n  content   String  @db.Text\n  status    String  @default("published")\n  chapter   Chapter @relation(fields: [chapterId], references: [id], onDelete: Cascade)\n\n  @@unique([chapterId, locale])\n  @@map("chapter_translations")\n}\n\nmodel Favorite {\n  id        String   @id @default(cuid())\n  userId    String\n  novelId   String\n  createdAt DateTime @default(now())\n  novel     Novel    @relation(fields: [novelId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, novelId])\n  @@map("favorites")\n}\n\nmodel TranslationRequest {\n  id            String   @id @default(cuid())\n  novelId       String\n  novel         Novel    @relation(fields: [novelId], references: [id], onDelete: Cascade)\n  targetLocale  String\n  status        String   @default("pending")\n  totalChapters Int      @default(0)\n  doneChapters  Int      @default(0)\n  triggerRunId  String?\n  errorMessage  String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  @@unique([novelId, targetLocale])\n  @@map("translation_requests")\n}\n\nmodel Comment {\n  id             String    @id @default(cuid())\n  content        String    @db.Text\n  authorId       String\n  chapterId      String\n  chapter        Chapter   @relation(fields: [chapterId], references: [id], onDelete: Cascade)\n  paragraphIndex Int\n  parentId       String?\n  parent         Comment?  @relation("replies", fields: [parentId], references: [id])\n  replies        Comment[] @relation("replies")\n  isReadByAuthor Boolean   @default(false)\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime  @updatedAt\n  isDeleted      Boolean   @default(false)\n\n  @@map("comments")\n}\n\nenum NovelStatus {\n  ONGOING\n  COMPLETED\n  HIATUS\n}\n',
      "inlineSchemaHash": "51b18cae520b72e672f8f75e25002c40c1f6d5368fb587d345acb02bd9ffc375",
      "copyEngine": true
    };
    var fs2 = __require("fs");
    config2.dirname = __dirname;
    if (!fs2.existsSync(path.join(__dirname, "schema.prisma"))) {
      const alternativePaths = [
        "node_modules/.prisma/client",
        ".prisma/client"
      ];
      const alternativePath = alternativePaths.find((altPath) => {
        return fs2.existsSync(path.join(process.cwd(), altPath, "schema.prisma"));
      }) ?? alternativePaths[0];
      config2.dirname = path.join(process.cwd(), alternativePath);
      config2.isBundled = true;
    }
    config2.runtimeDataModel = JSON.parse('{"models":{"Novel":{"dbName":"novels","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"author","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"coverUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"NovelStatus","default":"ONGOING","isGenerated":false,"isUpdatedAt":false},{"name":"publishStatus","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"published","isGenerated":false,"isUpdatedAt":false},{"name":"isAdult","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"authorId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"sourceLocale","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"zh-CN","isGenerated":false,"isUpdatedAt":false},{"name":"viewCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"favoriteCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"chapters","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Chapter","relationName":"ChapterToNovel","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"favorites","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Favorite","relationName":"FavoriteToNovel","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"translations","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"NovelTranslation","relationName":"NovelToNovelTranslation","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"categories","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"NovelCategory","relationName":"NovelToNovelCategory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"translationRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TranslationRequest","relationName":"NovelToTranslationRequest","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Category":{"dbName":"categories","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"novels","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"NovelCategory","relationName":"CategoryToNovelCategory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"NovelCategory":{"dbName":"novel_categories","fields":[{"name":"novelId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"categoryId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"novel","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Novel","relationName":"NovelToNovelCategory","relationFromFields":["novelId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryToNovelCategory","relationFromFields":["categoryId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":{"name":null,"fields":["novelId","categoryId"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"NovelTranslation":{"dbName":"novel_translations","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"novelId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"locale","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"published","isGenerated":false,"isUpdatedAt":false},{"name":"novel","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Novel","relationName":"NovelToNovelTranslation","relationFromFields":["novelId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["novelId","locale"]],"uniqueIndexes":[{"name":null,"fields":["novelId","locale"]}],"isGenerated":false},"Chapter":{"dbName":"chapters","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"novelId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"publishStatus","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"published","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"novel","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Novel","relationName":"ChapterToNovel","relationFromFields":["novelId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"translations","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ChapterTranslation","relationName":"ChapterToChapterTranslation","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"comments","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Comment","relationName":"ChapterToComment","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["novelId","order"]],"uniqueIndexes":[{"name":null,"fields":["novelId","order"]}],"isGenerated":false},"ChapterTranslation":{"dbName":"chapter_translations","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"chapterId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"locale","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"published","isGenerated":false,"isUpdatedAt":false},{"name":"chapter","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Chapter","relationName":"ChapterToChapterTranslation","relationFromFields":["chapterId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["chapterId","locale"]],"uniqueIndexes":[{"name":null,"fields":["chapterId","locale"]}],"isGenerated":false},"Favorite":{"dbName":"favorites","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"novelId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"novel","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Novel","relationName":"FavoriteToNovel","relationFromFields":["novelId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["userId","novelId"]],"uniqueIndexes":[{"name":null,"fields":["userId","novelId"]}],"isGenerated":false},"TranslationRequest":{"dbName":"translation_requests","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"novelId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"novel","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Novel","relationName":"NovelToTranslationRequest","relationFromFields":["novelId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"targetLocale","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"totalChapters","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"doneChapters","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"triggerRunId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"errorMessage","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[["novelId","targetLocale"]],"uniqueIndexes":[{"name":null,"fields":["novelId","targetLocale"]}],"isGenerated":false},"Comment":{"dbName":"comments","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"authorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"chapterId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"chapter","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Chapter","relationName":"ChapterToComment","relationFromFields":["chapterId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"paragraphIndex","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"parentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"parent","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Comment","relationName":"replies","relationFromFields":["parentId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"replies","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Comment","relationName":"replies","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"isReadByAuthor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"isDeleted","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"NovelStatus":{"values":[{"name":"ONGOING","dbName":null},{"name":"COMPLETED","dbName":null},{"name":"HIATUS","dbName":null}],"dbName":null}},"types":{}}');
    defineDmmfProperty2(exports2.Prisma, config2.runtimeDataModel);
    config2.engineWasm = void 0;
    var { warnEnvConflicts: warnEnvConflicts2 } = require_library();
    warnEnvConflicts2({
      rootEnvPath: config2.relativeEnvPaths.rootEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.rootEnvPath),
      schemaEnvPath: config2.relativeEnvPaths.schemaEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.schemaEnvPath)
    });
    var PrismaClient2 = getPrismaClient2(config2);
    exports2.PrismaClient = PrismaClient2;
    Object.assign(exports2, Prisma);
    path.join(__dirname, "query_engine-windows.dll.node");
    path.join(process.cwd(), "node_modules/.prisma/client/query_engine-windows.dll.node");
    path.join(__dirname, "schema.prisma");
    path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma");
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports2, module2) {
    init_esm();
    module2.exports = { ...require_client() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports2, module2) {
    init_esm();
    module2.exports = {
      ...require_default()
    };
  }
});

// node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "node_modules/@prisma/debug/dist/index.js"(exports2, module2) {
    "use strict";
    init_esm();
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = /* @__PURE__ */ __name((target, all) => {
      for (var name2 in all)
        __defProp(target, name2, { get: all[name2], enumerable: true });
    }, "__export");
    var __copyProps = /* @__PURE__ */ __name((to3, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to3, key) && key !== except)
            __defProp(to3, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to3;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export(src_exports, {
      Debug: /* @__PURE__ */ __name(() => Debug3, "Debug"),
      clearLogs: /* @__PURE__ */ __name(() => clearLogs, "clearLogs"),
      default: /* @__PURE__ */ __name(() => src_default, "default"),
      getLogs: /* @__PURE__ */ __name(() => getLogs, "getLogs")
    });
    module2.exports = __toCommonJS(src_exports);
    var colors_exports = {};
    __export(colors_exports, {
      $: /* @__PURE__ */ __name(() => $2, "$"),
      bgBlack: /* @__PURE__ */ __name(() => bgBlack, "bgBlack"),
      bgBlue: /* @__PURE__ */ __name(() => bgBlue, "bgBlue"),
      bgCyan: /* @__PURE__ */ __name(() => bgCyan, "bgCyan"),
      bgGreen: /* @__PURE__ */ __name(() => bgGreen, "bgGreen"),
      bgMagenta: /* @__PURE__ */ __name(() => bgMagenta, "bgMagenta"),
      bgRed: /* @__PURE__ */ __name(() => bgRed, "bgRed"),
      bgWhite: /* @__PURE__ */ __name(() => bgWhite, "bgWhite"),
      bgYellow: /* @__PURE__ */ __name(() => bgYellow, "bgYellow"),
      black: /* @__PURE__ */ __name(() => black, "black"),
      blue: /* @__PURE__ */ __name(() => blue, "blue"),
      bold: /* @__PURE__ */ __name(() => bold, "bold"),
      cyan: /* @__PURE__ */ __name(() => cyan, "cyan"),
      dim: /* @__PURE__ */ __name(() => dim, "dim"),
      gray: /* @__PURE__ */ __name(() => gray, "gray"),
      green: /* @__PURE__ */ __name(() => green, "green"),
      grey: /* @__PURE__ */ __name(() => grey, "grey"),
      hidden: /* @__PURE__ */ __name(() => hidden, "hidden"),
      inverse: /* @__PURE__ */ __name(() => inverse, "inverse"),
      italic: /* @__PURE__ */ __name(() => italic, "italic"),
      magenta: /* @__PURE__ */ __name(() => magenta, "magenta"),
      red: /* @__PURE__ */ __name(() => red, "red"),
      reset: /* @__PURE__ */ __name(() => reset, "reset"),
      strikethrough: /* @__PURE__ */ __name(() => strikethrough, "strikethrough"),
      underline: /* @__PURE__ */ __name(() => underline, "underline"),
      white: /* @__PURE__ */ __name(() => white, "white"),
      yellow: /* @__PURE__ */ __name(() => yellow, "yellow")
    });
    var FORCE_COLOR;
    var NODE_DISABLE_COLORS;
    var NO_COLOR;
    var TERM;
    var isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    var $2 = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    function init(x3, y3) {
      let rgx = new RegExp(`\\x1b\\[${y3}m`, "g");
      let open = `\x1B[${x3}m`, close = `\x1B[${y3}m`;
      return function(txt) {
        if (!$2.enabled || txt == null) return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
      };
    }
    __name(init, "init");
    var reset = init(0, 0);
    var bold = init(1, 22);
    var dim = init(2, 22);
    var italic = init(3, 23);
    var underline = init(4, 24);
    var inverse = init(7, 27);
    var hidden = init(8, 28);
    var strikethrough = init(9, 29);
    var black = init(30, 39);
    var red = init(31, 39);
    var green = init(32, 39);
    var yellow = init(33, 39);
    var blue = init(34, 39);
    var magenta = init(35, 39);
    var cyan = init(36, 39);
    var white = init(37, 39);
    var gray = init(90, 39);
    var grey = init(90, 39);
    var bgBlack = init(40, 49);
    var bgRed = init(41, 49);
    var bgGreen = init(42, 49);
    var bgYellow = init(43, 49);
    var bgBlue = init(44, 49);
    var bgMagenta = init(45, 49);
    var bgCyan = init(46, 49);
    var bgWhite = init(47, 49);
    var MAX_ARGS_HISTORY = 100;
    var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var argsHistory = [];
    var lastTimestamp = Date.now();
    var lastColor = 0;
    var processEnv = typeof process !== "undefined" ? process.env : {};
    globalThis.DEBUG ??= processEnv.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
    var topProps = {
      enable(namespace) {
        if (typeof namespace === "string") {
          globalThis.DEBUG = namespace;
        }
      },
      disable() {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
      },
      // this is the core logic to check if logging should happen or not
      enabled(namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
          return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
          return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
          return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
      },
      log: /* @__PURE__ */ __name((...args) => {
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
      }, "log"),
      formatters: {}
      // not implemented
    };
    function debugCreate(namespace) {
      const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: /* @__PURE__ */ __name(() => {
        }, "extend")
        // not implemented
      };
      const debugCall = /* @__PURE__ */ __name((...args) => {
        const { enabled, namespace: namespace2, color, log } = instanceProps;
        if (args.length !== 0) {
          argsHistory.push([namespace2, ...args]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
          argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
          const stringArgs = args.map((arg) => {
            if (typeof arg === "string") {
              return arg;
            }
            return safeStringify(arg);
          });
          const ms2 = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms2));
          } else {
            log(namespace2, ...stringArgs, ms2);
          }
        }
      }, "debugCall");
      return new Proxy(debugCall, {
        get: /* @__PURE__ */ __name((_2, prop) => instanceProps[prop], "get"),
        set: /* @__PURE__ */ __name((_2, prop, value) => instanceProps[prop] = value, "set")
      });
    }
    __name(debugCreate, "debugCreate");
    var Debug3 = new Proxy(debugCreate, {
      get: /* @__PURE__ */ __name((_2, prop) => topProps[prop], "get"),
      set: /* @__PURE__ */ __name((_2, prop, value) => topProps[prop] = value, "set")
    });
    function safeStringify(value, indent = 2) {
      const cache = /* @__PURE__ */ new Set();
      return JSON.stringify(
        value,
        (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
              return `[Circular *]`;
            }
            cache.add(value2);
          } else if (typeof value2 === "bigint") {
            return value2.toString();
          }
          return value2;
        },
        indent
      );
    }
    __name(safeStringify, "safeStringify");
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    __name(getLogs, "getLogs");
    function clearLogs() {
      argsHistory.length = 0;
    }
    __name(clearLogs, "clearLogs");
    var src_default = Debug3;
  }
});

// node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/postgres-array/index.js"(exports2) {
    "use strict";
    init_esm();
    exports2.parse = function(source, transform) {
      return parsePostgresArray(source, transform);
    };
    function parsePostgresArray(source, transform, nested = false) {
      let character = "";
      let quote = false;
      let position = 0;
      let dimension = 0;
      const entries = [];
      let recorded = "";
      const newEntry = /* @__PURE__ */ __name(function(includeEmpty) {
        let entry = recorded;
        if (entry.length > 0 || includeEmpty) {
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null && transform) {
            entry = transform(entry);
          }
          entries.push(entry);
          recorded = "";
        }
      }, "newEntry");
      if (source[0] === "[") {
        while (position < source.length) {
          const char = source[position++];
          if (char === "=") {
            break;
          }
        }
      }
      while (position < source.length) {
        let escaped = false;
        character = source[position++];
        if (character === "\\") {
          character = source[position++];
          escaped = true;
        }
        if (character === "{" && !quote) {
          dimension++;
          if (dimension > 1) {
            const parser = parsePostgresArray(source.substr(position - 1), transform, true);
            entries.push(parser.entries);
            position += parser.position - 2;
          }
        } else if (character === "}" && !quote) {
          dimension--;
          if (!dimension) {
            newEntry();
            if (nested) {
              return {
                entries,
                position
              };
            }
          }
        } else if (character === '"' && !escaped) {
          if (quote) {
            newEntry(true);
          }
          quote = !quote;
        } else if (character === "," && !quote) {
          newEntry();
        } else {
          recorded += character;
        }
      }
      if (dimension !== 0) {
        throw new Error("array dimension not balanced");
      }
      return entries;
    }
    __name(parsePostgresArray, "parsePostgresArray");
  }
});

// src/trigger/translateNovel.ts
init_esm();
var import_client = __toESM(require_default2());

// node_modules/@prisma/adapter-neon/dist/index.mjs
init_esm();

// node_modules/@neondatabase/serverless/index.mjs
init_esm();
var io2 = Object.create;
var Ce2 = Object.defineProperty;
var so2 = Object.getOwnPropertyDescriptor;
var oo2 = Object.getOwnPropertyNames;
var ao2 = Object.getPrototypeOf;
var uo2 = Object.prototype.hasOwnProperty;
var co2 = /* @__PURE__ */ __name((r, e, t) => e in r ? Ce2(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, "co");
var a = /* @__PURE__ */ __name((r, e) => Ce2(r, "name", { value: e, configurable: true }), "a");
var z = /* @__PURE__ */ __name((r, e) => () => (r && (e = r(r = 0)), e), "z");
var I2 = /* @__PURE__ */ __name((r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), "I");
var se2 = /* @__PURE__ */ __name((r, e) => {
  for (var t in e)
    Ce2(r, t, { get: e[t], enumerable: true });
}, "se");
var Tn2 = /* @__PURE__ */ __name((r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function") for (let i of oo2(e)) !uo2.call(r, i) && i !== t && Ce2(r, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = so2(e, i)) || n.enumerable });
  return r;
}, "Tn");
var Te2 = /* @__PURE__ */ __name((r, e, t) => (t = r != null ? io2(ao2(r)) : {}, Tn2(e || !r || !r.__esModule ? Ce2(t, "default", {
  value: r,
  enumerable: true
}) : t, r)), "Te");
var O = /* @__PURE__ */ __name((r) => Tn2(Ce2({}, "__esModule", { value: true }), r), "O");
var _ = /* @__PURE__ */ __name((r, e, t) => co2(r, typeof e != "symbol" ? e + "" : e, t), "_");
var Bn2 = I2((st2) => {
  "use strict";
  p();
  st2.byteLength = lo2;
  st2.toByteArray = po2;
  st2.fromByteArray = go2;
  var ae = [], re2 = [], ho2 = typeof Uint8Array < "u" ? Uint8Array : Array, Rt2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee2 = 0, In2 = Rt2.length; Ee2 < In2; ++Ee2)
    ae[Ee2] = Rt2[Ee2], re2[Rt2.charCodeAt(Ee2)] = Ee2;
  var Ee2, In2;
  re2[45] = 62;
  re2[95] = 63;
  function Pn2(r) {
    var e = r.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r.indexOf("=");
    t === -1 && (t = e);
    var n = t === e ? 0 : 4 - t % 4;
    return [t, n];
  }
  __name(Pn2, "Pn");
  a(
    Pn2,
    "getLens"
  );
  function lo2(r) {
    var e = Pn2(r), t = e[0], n = e[1];
    return (t + n) * 3 / 4 - n;
  }
  __name(lo2, "lo");
  a(lo2, "byteLength");
  function fo2(r, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  __name(fo2, "fo");
  a(fo2, "_byteLength");
  function po2(r) {
    var e, t = Pn2(r), n = t[0], i = t[1], s = new ho2(fo2(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
    for (c = 0; c < u; c += 4) e = re2[r.charCodeAt(c)] << 18 | re2[r.charCodeAt(c + 1)] << 12 | re2[r.charCodeAt(c + 2)] << 6 | re2[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
    return i === 2 && (e = re2[r.charCodeAt(c)] << 2 | re2[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = re2[r.charCodeAt(
      c
    )] << 10 | re2[r.charCodeAt(c + 1)] << 4 | re2[r.charCodeAt(c + 2)] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
  }
  __name(po2, "po");
  a(po2, "toByteArray");
  function yo2(r) {
    return ae[r >> 18 & 63] + ae[r >> 12 & 63] + ae[r >> 6 & 63] + ae[r & 63];
  }
  __name(yo2, "yo");
  a(yo2, "tripletToBase64");
  function mo2(r, e, t) {
    for (var n, i = [], s = e; s < t; s += 3) n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(yo2(n));
    return i.join(
      ""
    );
  }
  __name(mo2, "mo");
  a(mo2, "encodeChunk");
  function go2(r) {
    for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s) i.push(mo2(r, o, o + s > u ? u : o + s));
    return n === 1 ? (e = r[t - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "=")), i.join("");
  }
  __name(go2, "go");
  a(go2, "fromByteArray");
});
var Ln2 = I2((Ft2) => {
  p();
  Ft2.read = function(r, e, t, n, i) {
    var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, h = c >> 1, l = -7, d = t ? i - 1 : 0, b2 = t ? -1 : 1, C = r[e + d];
    for (d += b2, s = C & (1 << -l) - 1, C >>= -l, l += u; l > 0; s = s * 256 + r[e + d], d += b2, l -= 8) ;
    for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = o * 256 + r[e + d], d += b2, l -= 8) ;
    if (s === 0) s = 1 - h;
    else {
      if (s === c) return o ? NaN : (C ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - h;
    }
    return (C ? -1 : 1) * o * Math.pow(2, s - n);
  };
  Ft2.write = function(r, e, t, n, i, s) {
    var o, u, c, h = s * 8 - i - 1, l = (1 << h) - 1, d = l >> 1, b2 = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, C = n ? 0 : s - 1, B2 = n ? 1 : -1, Q = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + d >= 1 ? e += b2 / c : e += b2 * Math.pow(2, 1 - d), e * c >= 2 && (o++, c /= 2), o + d >= l ? (u = 0, o = l) : o + d >= 1 ? (u = (e * c - 1) * Math.pow(
      2,
      i
    ), o = o + d) : (u = e * Math.pow(2, d - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + C] = u & 255, C += B2, u /= 256, i -= 8) ;
    for (o = o << i | u, h += i; h > 0; r[t + C] = o & 255, C += B2, o /= 256, h -= 8) ;
    r[t + C - B2] |= Q * 128;
  };
});
var Kn2 = I2((Le2) => {
  "use strict";
  p();
  var Mt2 = Bn2(), Pe2 = Ln2(), Rn2 = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Le2.Buffer = f;
  Le2.SlowBuffer = vo2;
  Le2.INSPECT_MAX_BYTES = 50;
  var ot2 = 2147483647;
  Le2.kMaxLength = ot2;
  f.TYPED_ARRAY_SUPPORT = wo2();
  !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function wo2() {
    try {
      let r = new Uint8Array(1), e = { foo: a(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(
        r,
        e
      ), r.foo() === 42;
    } catch {
      return false;
    }
  }
  __name(wo2, "wo");
  a(wo2, "typedArraySupport");
  Object.defineProperty(
    f.prototype,
    "parent",
    { enumerable: true, get: a(function() {
      if (f.isBuffer(this)) return this.buffer;
    }, "get") }
  );
  Object.defineProperty(f.prototype, "offset", { enumerable: true, get: a(
    function() {
      if (f.isBuffer(this)) return this.byteOffset;
    },
    "get"
  ) });
  function le2(r) {
    if (r > ot2) throw new RangeError('The value "' + r + '" is invalid for option "size"');
    let e = new Uint8Array(
      r
    );
    return Object.setPrototypeOf(e, f.prototype), e;
  }
  __name(le2, "le");
  a(le2, "createBuffer");
  function f(r, e, t) {
    if (typeof r == "number") {
      if (typeof e == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return Ot2(r);
    }
    return kn2(
      r,
      e,
      t
    );
  }
  __name(f, "f");
  a(f, "Buffer");
  f.poolSize = 8192;
  function kn2(r, e, t) {
    if (typeof r == "string") return So2(
      r,
      e
    );
    if (ArrayBuffer.isView(r)) return xo2(r);
    if (r == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    if (ue2(r, ArrayBuffer) || r && ue2(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue2(r, SharedArrayBuffer) || r && ue2(r.buffer, SharedArrayBuffer)))
      return kt2(r, e, t);
    if (typeof r == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r.valueOf && r.valueOf();
    if (n != null && n !== r) return f.from(n, e, t);
    let i = Eo2(r);
    if (i) return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function") return f.from(r[Symbol.toPrimitive]("string"), e, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
  }
  __name(kn2, "kn");
  a(kn2, "from");
  f.from = function(r, e, t) {
    return kn2(r, e, t);
  };
  Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(
    f,
    Uint8Array
  );
  function Un2(r) {
    if (typeof r != "number") throw new TypeError('"size" argument must be of type number');
    if (r < 0) throw new RangeError('The value "' + r + '" is invalid for option "size"');
  }
  __name(Un2, "Un");
  a(Un2, "assertSize");
  function bo2(r, e, t) {
    return Un2(r), r <= 0 ? le2(r) : e !== void 0 ? typeof t == "string" ? le2(r).fill(e, t) : le2(r).fill(e) : le2(r);
  }
  __name(bo2, "bo");
  a(
    bo2,
    "alloc"
  );
  f.alloc = function(r, e, t) {
    return bo2(r, e, t);
  };
  function Ot2(r) {
    return Un2(r), le2(
      r < 0 ? 0 : Nt2(r) | 0
    );
  }
  __name(Ot2, "Ot");
  a(Ot2, "allocUnsafe");
  f.allocUnsafe = function(r) {
    return Ot2(r);
  };
  f.allocUnsafeSlow = function(r) {
    return Ot2(r);
  };
  function So2(r, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
    let t = On2(r, e) | 0, n = le2(t), i = n.write(r, e);
    return i !== t && (n = n.slice(0, i)), n;
  }
  __name(So2, "So");
  a(So2, "fromString");
  function Dt2(r) {
    let e = r.length < 0 ? 0 : Nt2(r.length) | 0, t = le2(e);
    for (let n = 0; n < e; n += 1) t[n] = r[n] & 255;
    return t;
  }
  __name(Dt2, "Dt");
  a(Dt2, "fromArrayLike");
  function xo2(r) {
    if (ue2(r, Uint8Array)) {
      let e = new Uint8Array(r);
      return kt2(e.buffer, e.byteOffset, e.byteLength);
    }
    return Dt2(r);
  }
  __name(xo2, "xo");
  a(xo2, "fromArrayView");
  function kt2(r, e, t) {
    if (e < 0 || r.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
    if (r.byteLength < e + (t || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && t === void 0 ? n = new Uint8Array(
      r
    ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
      n,
      f.prototype
    ), n;
  }
  __name(kt2, "kt");
  a(kt2, "fromArrayBuffer");
  function Eo2(r) {
    if (f.isBuffer(r)) {
      let e = Nt2(
        r.length
      ) | 0, t = le2(e);
      return t.length === 0 || r.copy(t, 0, 0, e), t;
    }
    if (r.length !== void 0)
      return typeof r.length != "number" || Qt2(r.length) ? le2(0) : Dt2(r);
    if (r.type === "Buffer" && Array.isArray(r.data)) return Dt2(r.data);
  }
  __name(Eo2, "Eo");
  a(Eo2, "fromObject");
  function Nt2(r) {
    if (r >= ot2) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ot2.toString(16) + " bytes");
    return r | 0;
  }
  __name(Nt2, "Nt");
  a(Nt2, "checked");
  function vo2(r) {
    return +r != r && (r = 0), f.alloc(+r);
  }
  __name(vo2, "vo");
  a(vo2, "SlowBuffer");
  f.isBuffer = a(function(e) {
    return e != null && e._isBuffer === true && e !== f.prototype;
  }, "isBuffer");
  f.compare = a(function(e, t) {
    if (ue2(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), ue2(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === t) return 0;
    let n = e.length, i = t.length;
    for (let s = 0, o = Math.min(n, i); s < o; ++s) if (e[s] !== t[s]) {
      n = e[s], i = t[s];
      break;
    }
    return n < i ? -1 : i < n ? 1 : 0;
  }, "compare");
  f.isEncoding = a(function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, "isEncoding");
  f.concat = a(function(e, t) {
    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0) return f.alloc(0);
    let n;
    if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
    let i = f.allocUnsafe(t), s = 0;
    for (n = 0; n < e.length; ++n) {
      let o = e[n];
      if (ue2(o, Uint8Array)) s + o.length > i.length ? (f.isBuffer(
        o
      ) || (o = f.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
      else if (f.isBuffer(
        o
      )) o.copy(i, s);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      s += o.length;
    }
    return i;
  }, "concat");
  function On2(r, e) {
    if (f.isBuffer(r)) return r.length;
    if (ArrayBuffer.isView(r) || ue2(r, ArrayBuffer)) return r.byteLength;
    if (typeof r != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
    let t = r.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && t === 0) return 0;
    let i = false;
    for (; ; ) switch (e) {
      case "ascii":
      case "latin1":
      case "binary":
        return t;
      case "utf8":
      case "utf-8":
        return Ut2(r).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t * 2;
      case "hex":
        return t >>> 1;
      case "base64":
        return Vn2(r).length;
      default:
        if (i) return n ? -1 : Ut2(r).length;
        e = ("" + e).toLowerCase(), i = true;
    }
  }
  __name(On2, "On");
  a(On2, "byteLength");
  f.byteLength = On2;
  function _o2(r, e, t) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e)) return "";
    for (r || (r = "utf8"); ; ) switch (r) {
      case "hex":
        return Mo2(
          this,
          e,
          t
        );
      case "utf8":
      case "utf-8":
        return qn(this, e, t);
      case "ascii":
        return Ro2(
          this,
          e,
          t
        );
      case "latin1":
      case "binary":
        return Fo2(this, e, t);
      case "base64":
        return Bo(
          this,
          e,
          t
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Do2(this, e, t);
      default:
        if (n) throw new TypeError("Unknown encoding: " + r);
        r = (r + "").toLowerCase(), n = true;
    }
  }
  __name(_o2, "_o");
  a(
    _o2,
    "slowToString"
  );
  f.prototype._isBuffer = true;
  function ve2(r, e, t) {
    let n = r[e];
    r[e] = r[t], r[t] = n;
  }
  __name(ve2, "ve");
  a(ve2, "swap");
  f.prototype.swap16 = a(function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e; t += 2) ve2(this, t, t + 1);
    return this;
  }, "swap16");
  f.prototype.swap32 = a(function() {
    let e = this.length;
    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e; t += 4) ve2(this, t, t + 3), ve2(this, t + 1, t + 2);
    return this;
  }, "swap32");
  f.prototype.swap64 = a(function() {
    let e = this.length;
    if (e % 8 !== 0) throw new RangeError(
      "Buffer size must be a multiple of 64-bits"
    );
    for (let t = 0; t < e; t += 8) ve2(this, t, t + 7), ve2(this, t + 1, t + 6), ve2(this, t + 2, t + 5), ve2(this, t + 3, t + 4);
    return this;
  }, "swap64");
  f.prototype.toString = a(function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? qn(
      this,
      0,
      e
    ) : _o2.apply(this, arguments);
  }, "toString");
  f.prototype.toLocaleString = f.prototype.toString;
  f.prototype.equals = a(function(e) {
    if (!f.isBuffer(e)) throw new TypeError(
      "Argument must be a Buffer"
    );
    return this === e ? true : f.compare(this, e) === 0;
  }, "equals");
  f.prototype.inspect = a(function() {
    let e = "", t = Le2.INSPECT_MAX_BYTES;
    return e = this.toString(
      "hex",
      0,
      t
    ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
  }, "inspect");
  Rn2 && (f.prototype[Rn2] = f.prototype.inspect);
  f.prototype.compare = a(function(e, t, n, i, s) {
    if (ue2(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length) throw new RangeError("out of range index");
    if (i >= s && t >= n) return 0;
    if (i >= s) return -1;
    if (t >= n) return 1;
    if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e) return 0;
    let o = s - i, u = n - t, c = Math.min(o, u), h = this.slice(i, s), l = e.slice(t, n);
    for (let d = 0; d < c; ++d)
      if (h[d] !== l[d]) {
        o = h[d], u = l[d];
        break;
      }
    return o < u ? -1 : u < o ? 1 : 0;
  }, "compare");
  function Nn2(r, e, t, n, i) {
    if (r.length === 0) return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Qt2(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
      if (i) return -1;
      t = r.length - 1;
    } else if (t < 0) if (i) t = 0;
    else return -1;
    if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e)) return e.length === 0 ? -1 : Fn2(r, e, t, n, i);
    if (typeof e == "number") return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Fn2(
      r,
      [e],
      t,
      n,
      i
    );
    throw new TypeError("val must be string, number or Buffer");
  }
  __name(Nn2, "Nn");
  a(Nn2, "bidirectionalIndexOf");
  function Fn2(r, e, t, n, i) {
    let s = 1, o = r.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r.length < 2 || e.length < 2) return -1;
      s = 2, o /= 2, u /= 2, t /= 2;
    }
    function c(l, d) {
      return s === 1 ? l[d] : l.readUInt16BE(d * s);
    }
    __name(c, "c");
    a(c, "read");
    let h;
    if (i) {
      let l = -1;
      for (h = t; h < o; h++) if (c(r, h) === c(e, l === -1 ? 0 : h - l)) {
        if (l === -1 && (l = h), h - l + 1 === u) return l * s;
      } else l !== -1 && (h -= h - l), l = -1;
    } else for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
      let l = true;
      for (let d = 0; d < u; d++)
        if (c(r, h + d) !== c(e, d)) {
          l = false;
          break;
        }
      if (l) return h;
    }
    return -1;
  }
  __name(Fn2, "Fn");
  a(Fn2, "arrayIndexOf");
  f.prototype.includes = a(function(e, t, n) {
    return this.indexOf(e, t, n) !== -1;
  }, "includes");
  f.prototype.indexOf = a(function(e, t, n) {
    return Nn2(this, e, t, n, true);
  }, "indexOf");
  f.prototype.lastIndexOf = a(function(e, t, n) {
    return Nn2(this, e, t, n, false);
  }, "lastIndexOf");
  function Ao2(r, e, t, n) {
    t = Number(t) || 0;
    let i = r.length - t;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let s = e.length;
    n > s / 2 && (n = s / 2);
    let o;
    for (o = 0; o < n; ++o) {
      let u = parseInt(e.substr(o * 2, 2), 16);
      if (Qt2(u))
        return o;
      r[t + o] = u;
    }
    return o;
  }
  __name(Ao2, "Ao");
  a(Ao2, "hexWrite");
  function Co2(r, e, t, n) {
    return at2(Ut2(
      e,
      r.length - t
    ), r, t, n);
  }
  __name(Co2, "Co");
  a(Co2, "utf8Write");
  function To2(r, e, t, n) {
    return at2(No2(e), r, t, n);
  }
  __name(To2, "To");
  a(To2, "asciiWrite");
  function Io2(r, e, t, n) {
    return at2(Vn2(e), r, t, n);
  }
  __name(Io2, "Io");
  a(Io2, "base64Write");
  function Po2(r, e, t, n) {
    return at2(qo(e, r.length - t), r, t, n);
  }
  __name(Po2, "Po");
  a(Po2, "ucs2Write");
  f.prototype.write = a(function(e, t, n, i) {
    if (t === void 0) i = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string") i = t, n = this.length, t = 0;
    else if (isFinite(t)) t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s = this.length - t;
    if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError(
      "Attempt to write outside buffer bounds"
    );
    i || (i = "utf8");
    let o = false;
    for (; ; ) switch (i) {
      case "hex":
        return Ao2(this, e, t, n);
      case "utf8":
      case "utf-8":
        return Co2(this, e, t, n);
      case "ascii":
      case "latin1":
      case "binary":
        return To2(this, e, t, n);
      case "base64":
        return Io2(
          this,
          e,
          t,
          n
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Po2(this, e, t, n);
      default:
        if (o) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), o = true;
    }
  }, "write");
  f.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Bo(r, e, t) {
    return e === 0 && t === r.length ? Mt2.fromByteArray(r) : Mt2.fromByteArray(r.slice(e, t));
  }
  __name(Bo, "Bo");
  a(Bo, "base64Slice");
  function qn(r, e, t) {
    t = Math.min(r.length, t);
    let n = [], i = e;
    for (; i < t; ) {
      let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (i + u <= t) {
        let c, h, l, d;
        switch (u) {
          case 1:
            s < 128 && (o = s);
            break;
          case 2:
            c = r[i + 1], (c & 192) === 128 && (d = (s & 31) << 6 | c & 63, d > 127 && (o = d));
            break;
          case 3:
            c = r[i + 1], h = r[i + 2], (c & 192) === 128 && (h & 192) === 128 && (d = (s & 15) << 12 | (c & 63) << 6 | h & 63, d > 2047 && (d < 55296 || d > 57343) && (o = d));
            break;
          case 4:
            c = r[i + 1], h = r[i + 2], l = r[i + 3], (c & 192) === 128 && (h & 192) === 128 && (l & 192) === 128 && (d = (s & 15) << 18 | (c & 63) << 12 | (h & 63) << 6 | l & 63, d > 65535 && d < 1114112 && (o = d));
        }
      }
      o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
    }
    return Lo2(n);
  }
  __name(qn, "qn");
  a(qn, "utf8Slice");
  var Mn2 = 4096;
  function Lo2(r) {
    let e = r.length;
    if (e <= Mn2) return String.fromCharCode.apply(String, r);
    let t = "", n = 0;
    for (; n < e; ) t += String.fromCharCode.apply(String, r.slice(n, n += Mn2));
    return t;
  }
  __name(Lo2, "Lo");
  a(Lo2, "decodeCodePointsArray");
  function Ro2(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i] & 127);
    return n;
  }
  __name(Ro2, "Ro");
  a(Ro2, "asciiSlice");
  function Fo2(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i]);
    return n;
  }
  __name(Fo2, "Fo");
  a(Fo2, "latin1Slice");
  function Mo2(r, e, t) {
    let n = r.length;
    (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
    let i = "";
    for (let s = e; s < t; ++s) i += Qo[r[s]];
    return i;
  }
  __name(Mo2, "Mo");
  a(Mo2, "hexSlice");
  function Do2(r, e, t) {
    let n = r.slice(e, t), i = "";
    for (let s = 0; s < n.length - 1; s += 2) i += String.fromCharCode(n[s] + n[s + 1] * 256);
    return i;
  }
  __name(Do2, "Do");
  a(Do2, "utf16leSlice");
  f.prototype.slice = a(function(e, t) {
    let n = this.length;
    e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
    let i = this.subarray(
      e,
      t
    );
    return Object.setPrototypeOf(i, f.prototype), i;
  }, "slice");
  function N2(r, e, t) {
    if (r % 1 !== 0 || r < 0) throw new RangeError("offset is not uint");
    if (r + e > t) throw new RangeError(
      "Trying to access beyond buffer length"
    );
  }
  __name(N2, "N");
  a(N2, "checkOffset");
  f.prototype.readUintLE = f.prototype.readUIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N2(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); ) i += this[e + o] * s;
    return i;
  }, "readUIntLE");
  f.prototype.readUintBE = f.prototype.readUIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N2(e, t, this.length);
    let i = this[e + --t], s = 1;
    for (; t > 0 && (s *= 256); ) i += this[e + --t] * s;
    return i;
  }, "readUIntBE");
  f.prototype.readUint8 = f.prototype.readUInt8 = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 1, this.length), this[e];
  }, "readUInt8");
  f.prototype.readUint16LE = f.prototype.readUInt16LE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 2, this.length), this[e] | this[e + 1] << 8;
  }, "readUInt16LE");
  f.prototype.readUint16BE = f.prototype.readUInt16BE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, "readUInt16BE");
  f.prototype.readUint32LE = f.prototype.readUInt32LE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  }, "readUInt32LE");
  f.prototype.readUint32BE = f.prototype.readUInt32BE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, "readUInt32BE");
  f.prototype.readBigUInt64LE = me(a(function(e) {
    e = e >>> 0, Be2(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We2(e, this.length - 8);
    let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(s) << BigInt(32));
  }, "readBigUInt64LE"));
  f.prototype.readBigUInt64BE = me(a(function(e) {
    e = e >>> 0, Be2(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We2(e, this.length - 8);
    let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(s);
  }, "readBigUInt64BE"));
  f.prototype.readIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N2(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); )
      i += this[e + o] * s;
    return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
  }, "readIntLE");
  f.prototype.readIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N2(e, t, this.length);
    let i = t, s = 1, o = this[e + --i];
    for (; i > 0 && (s *= 256); ) o += this[e + --i] * s;
    return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
  }, "readIntBE");
  f.prototype.readInt8 = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  }, "readInt8");
  f.prototype.readInt16LE = a(function(e, t) {
    e = e >>> 0, t || N2(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16LE");
  f.prototype.readInt16BE = a(
    function(e, t) {
      e = e >>> 0, t || N2(e, 2, this.length);
      let n = this[e + 1] | this[e] << 8;
      return n & 32768 ? n | 4294901760 : n;
    },
    "readInt16BE"
  );
  f.prototype.readInt32LE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, "readInt32LE");
  f.prototype.readInt32BE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, "readInt32BE");
  f.prototype.readBigInt64LE = me(a(function(e) {
    e = e >>> 0, Be2(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We2(
      e,
      this.length - 8
    );
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  }, "readBigInt64LE"));
  f.prototype.readBigInt64BE = me(a(function(e) {
    e = e >>> 0, Be2(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We2(e, this.length - 8);
    let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(
      this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
    );
  }, "readBigInt64BE"));
  f.prototype.readFloatLE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), Pe2.read(
      this,
      e,
      true,
      23,
      4
    );
  }, "readFloatLE");
  f.prototype.readFloatBE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 4, this.length), Pe2.read(this, e, false, 23, 4);
  }, "readFloatBE");
  f.prototype.readDoubleLE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 8, this.length), Pe2.read(this, e, true, 52, 8);
  }, "readDoubleLE");
  f.prototype.readDoubleBE = a(function(e, t) {
    return e = e >>> 0, t || N2(e, 8, this.length), Pe2.read(this, e, false, 52, 8);
  }, "readDoubleBE");
  function Y(r, e, t, n, i, s) {
    if (!f.isBuffer(
      r
    )) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
    if (t + n > r.length) throw new RangeError(
      "Index out of range"
    );
  }
  __name(Y, "Y");
  a(Y, "checkInt");
  f.prototype.writeUintLE = f.prototype.writeUIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      Y(
        this,
        e,
        t,
        n,
        u,
        0
      );
    }
    let s = 1, o = 0;
    for (this[t] = e & 255; ++o < n && (s *= 256); ) this[t + o] = e / s & 255;
    return t + n;
  }, "writeUIntLE");
  f.prototype.writeUintBE = f.prototype.writeUIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      Y(this, e, t, n, u, 0);
    }
    let s = n - 1, o = 1;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) this[t + s] = e / o & 255;
    return t + n;
  }, "writeUIntBE");
  f.prototype.writeUint8 = f.prototype.writeUInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
  }, "writeUInt8");
  f.prototype.writeUint16LE = f.prototype.writeUInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeUInt16LE");
  f.prototype.writeUint16BE = f.prototype.writeUInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeUInt16BE");
  f.prototype.writeUint32LE = f.prototype.writeUInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      4,
      4294967295,
      0
    ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
  }, "writeUInt32LE");
  f.prototype.writeUint32BE = f.prototype.writeUInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeUInt32BE");
  function Qn2(r, e, t, n, i) {
    $n2(
      e,
      n,
      i,
      r,
      t,
      7
    );
    let s = Number(e & BigInt(4294967295));
    r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
  }
  __name(Qn2, "Qn");
  a(Qn2, "wrtBigUInt64LE");
  function jn2(r, e, t, n, i) {
    $n2(e, n, i, r, t, 7);
    let s = Number(e & BigInt(4294967295));
    r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
  }
  __name(jn2, "jn");
  a(jn2, "wrtBigUInt64BE");
  f.prototype.writeBigUInt64LE = me(a(function(e, t = 0) {
    return Qn2(this, e, t, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64LE"));
  f.prototype.writeBigUInt64BE = me(a(function(e, t = 0) {
    return jn2(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64BE"));
  f.prototype.writeIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t, n, c - 1, -c);
    }
    let s = 0, o = 1, u = 0;
    for (this[t] = e & 255; ++s < n && (o *= 256); ) e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntLE");
  f.prototype.writeIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t, n, c - 1, -c);
    }
    let s = n - 1, o = 1, u = 0;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntBE");
  f.prototype.writeInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      1,
      127,
      -128
    ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
  }, "writeInt8");
  f.prototype.writeInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeInt16LE");
  f.prototype.writeInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeInt16BE");
  f.prototype.writeInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
  }, "writeInt32LE");
  f.prototype.writeInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeInt32BE");
  f.prototype.writeBigInt64LE = me(a(function(e, t = 0) {
    return Qn2(this, e, t, -BigInt(
      "0x8000000000000000"
    ), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  f.prototype.writeBigInt64BE = me(a(function(e, t = 0) {
    return jn2(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64BE"));
  function Wn2(r, e, t, n, i, s) {
    if (t + n > r.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError(
      "Index out of range"
    );
  }
  __name(Wn2, "Wn");
  a(Wn2, "checkIEEE754");
  function Hn2(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Wn2(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe2.write(
      r,
      e,
      t,
      n,
      23,
      4
    ), t + 4;
  }
  __name(Hn2, "Hn");
  a(Hn2, "writeFloat");
  f.prototype.writeFloatLE = a(function(e, t, n) {
    return Hn2(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeFloatLE");
  f.prototype.writeFloatBE = a(function(e, t, n) {
    return Hn2(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeFloatBE");
  function Gn2(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Wn2(
      r,
      e,
      t,
      8,
      17976931348623157e292,
      -17976931348623157e292
    ), Pe2.write(r, e, t, n, 52, 8), t + 8;
  }
  __name(Gn2, "Gn");
  a(Gn2, "writeDouble");
  f.prototype.writeDoubleLE = a(function(e, t, n) {
    return Gn2(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeDoubleLE");
  f.prototype.writeDoubleBE = a(function(e, t, n) {
    return Gn2(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeDoubleBE");
  f.prototype.copy = a(function(e, t, n, i) {
    if (!f.isBuffer(
      e
    )) throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError(
      "sourceEnd out of bounds"
    );
    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
    let s = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
  }, "copy");
  f.prototype.fill = a(function(e, t, n, i) {
    if (typeof e == "string") {
      if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string") throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !f.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
      if (e.length === 1) {
        let o = e.charCodeAt(0);
        (i === "utf8" && o < 128 || i === "latin1") && (e = o);
      }
    } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
    if (n <= t) return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let s;
    if (typeof e == "number") for (s = t; s < n; ++s)
      this[s] = e;
    else {
      let o = f.isBuffer(e) ? e : f.from(e, i), u = o.length;
      if (u === 0) throw new TypeError(
        'The value "' + e + '" is invalid for argument "value"'
      );
      for (s = 0; s < n - t; ++s) this[s + t] = o[s % u];
    }
    return this;
  }, "fill");
  var Ie = {};
  function qt2(r, e, t) {
    var n;
    Ie[r] = (n = class extends t {
      static {
        __name(this, "n");
      }
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: e.apply(this, arguments),
          writable: true,
          configurable: true
        }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
      }
      get code() {
        return r;
      }
      set code(s) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value: s,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${r}]: ${this.message}`;
      }
    }, a(n, "NodeError"), n);
  }
  __name(qt2, "qt");
  a(qt2, "E");
  qt2("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
    return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  qt2("ERR_INVALID_ARG_TYPE", function(r, e) {
    return `The "${r}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  qt2("ERR_OUT_OF_RANGE", function(r, e, t) {
    let n = `The value of "${r}" is out of range.`, i = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Dn2(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Dn2(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function Dn2(r) {
    let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3) e = `_${r.slice(t - 3, t)}${e}`;
    return `${r.slice(
      0,
      t
    )}${e}`;
  }
  __name(Dn2, "Dn");
  a(Dn2, "addNumericalSeparator");
  function ko2(r, e, t) {
    Be2(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && We2(e, r.length - (t + 1));
  }
  __name(ko2, "ko");
  a(ko2, "checkBounds");
  function $n2(r, e, t, n, i, s) {
    if (r > t || r < e) {
      let o = typeof e == "bigint" ? "n" : "", u;
      throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Ie.ERR_OUT_OF_RANGE(
        "value",
        u,
        r
      );
    }
    ko2(n, i, s);
  }
  __name($n2, "$n");
  a($n2, "checkIntBI");
  function Be2(r, e) {
    if (typeof r != "number")
      throw new Ie.ERR_INVALID_ARG_TYPE(e, "number", r);
  }
  __name(Be2, "Be");
  a(Be2, "validateNumber");
  function We2(r, e, t) {
    throw Math.floor(r) !== r ? (Be2(r, t), new Ie.ERR_OUT_OF_RANGE(
      t || "offset",
      "an integer",
      r
    )) : e < 0 ? new Ie.ERR_BUFFER_OUT_OF_BOUNDS() : new Ie.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
  }
  __name(We2, "We");
  a(We2, "boundsError");
  var Uo = /[^+/0-9A-Za-z-_]/g;
  function Oo2(r) {
    if (r = r.split("=")[0], r = r.trim().replace(Uo, ""), r.length < 2) return "";
    for (; r.length % 4 !== 0; ) r = r + "=";
    return r;
  }
  __name(Oo2, "Oo");
  a(Oo2, "base64clean");
  function Ut2(r, e) {
    e = e || 1 / 0;
    let t, n = r.length, i = null, s = [];
    for (let o = 0; o < n; ++o) {
      if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
        if (!i) {
          if (t > 56319) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (o + 1 === n) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (e -= 3) > -1 && s.push(
            239,
            191,
            189
          ), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else i && (e -= 3) > -1 && s.push(
        239,
        191,
        189
      );
      if (i = null, t < 128) {
        if ((e -= 1) < 0) break;
        s.push(t);
      } else if (t < 2048) {
        if ((e -= 2) < 0) break;
        s.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((e -= 3) < 0) break;
        s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((e -= 4) < 0) break;
        s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return s;
  }
  __name(Ut2, "Ut");
  a(
    Ut2,
    "utf8ToBytes"
  );
  function No2(r) {
    let e = [];
    for (let t = 0; t < r.length; ++t) e.push(r.charCodeAt(
      t
    ) & 255);
    return e;
  }
  __name(No2, "No");
  a(No2, "asciiToBytes");
  function qo(r, e) {
    let t, n, i, s = [];
    for (let o = 0; o < r.length && !((e -= 2) < 0); ++o) t = r.charCodeAt(o), n = t >> 8, i = t % 256, s.push(i), s.push(n);
    return s;
  }
  __name(qo, "qo");
  a(qo, "utf16leToBytes");
  function Vn2(r) {
    return Mt2.toByteArray(Oo2(r));
  }
  __name(Vn2, "Vn");
  a(Vn2, "base64ToBytes");
  function at2(r, e, t, n) {
    let i;
    for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
      e[i + t] = r[i];
    return i;
  }
  __name(at2, "at");
  a(at2, "blitBuffer");
  function ue2(r, e) {
    return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
  }
  __name(ue2, "ue");
  a(ue2, "isInstance");
  function Qt2(r) {
    return r !== r;
  }
  __name(Qt2, "Qt");
  a(Qt2, "numberIsNaN");
  var Qo = function() {
    let r = "0123456789abcdef", e = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let i = 0; i < 16; ++i) e[n + i] = r[t] + r[i];
    }
    return e;
  }();
  function me(r) {
    return typeof BigInt > "u" ? jo2 : r;
  }
  __name(me, "me");
  a(me, "defineBigIntMethod");
  function jo2() {
    throw new Error("BigInt not supported");
  }
  __name(jo2, "jo");
  a(jo2, "BufferBigIntNotDefined");
});
var S;
var x2;
var E;
var w2;
var y2;
var m2;
var p = z(() => {
  "use strict";
  S = globalThis, x2 = globalThis.setImmediate ?? ((r) => setTimeout(
    r,
    0
  )), E = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), w2 = globalThis.crypto ?? {};
  w2.subtle ?? (w2.subtle = {});
  y2 = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Kn2().Buffer, m2 = globalThis.process ?? {};
  m2.env ?? (m2.env = {});
  try {
    m2.nextTick(() => {
    });
  } catch {
    let e = Promise.resolve();
    m2.nextTick = e.then.bind(e);
  }
});
var ge2 = I2((nh, jt2) => {
  "use strict";
  p();
  var Re2 = typeof Reflect == "object" ? Reflect : null, zn2 = Re2 && typeof Re2.apply == "function" ? Re2.apply : a(function(e, t, n) {
    return Function.prototype.apply.call(e, t, n);
  }, "ReflectApply"), ut2;
  Re2 && typeof Re2.ownKeys == "function" ? ut2 = Re2.ownKeys : Object.getOwnPropertySymbols ? ut2 = a(function(e) {
    return Object.getOwnPropertyNames(
      e
    ).concat(Object.getOwnPropertySymbols(e));
  }, "ReflectOwnKeys") : ut2 = a(function(e) {
    return Object.getOwnPropertyNames(e);
  }, "ReflectOwnKeys");
  function Wo2(r) {
    console && console.warn && console.warn(r);
  }
  __name(Wo2, "Wo");
  a(Wo2, "ProcessEmitWarning");
  var Zn = Number.isNaN || a(function(e) {
    return e !== e;
  }, "NumberIsNaN");
  function L2() {
    L2.init.call(this);
  }
  __name(L2, "L");
  a(L2, "EventEmitter");
  jt2.exports = L2;
  jt2.exports.once = Vo;
  L2.EventEmitter = L2;
  L2.prototype._events = void 0;
  L2.prototype._eventsCount = 0;
  L2.prototype._maxListeners = void 0;
  var Yn2 = 10;
  function ct2(r) {
    if (typeof r != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
  }
  __name(ct2, "ct");
  a(ct2, "checkListener");
  Object.defineProperty(L2, "defaultMaxListeners", { enumerable: true, get: a(function() {
    return Yn2;
  }, "get"), set: a(function(r) {
    if (typeof r != "number" || r < 0 || Zn(r)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    Yn2 = r;
  }, "set") });
  L2.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  L2.prototype.setMaxListeners = a(
    function(e) {
      if (typeof e != "number" || e < 0 || Zn(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
      return this._maxListeners = e, this;
    },
    "setMaxListeners"
  );
  function Jn2(r) {
    return r._maxListeners === void 0 ? L2.defaultMaxListeners : r._maxListeners;
  }
  __name(Jn2, "Jn");
  a(Jn2, "_getMaxListeners");
  L2.prototype.getMaxListeners = a(function() {
    return Jn2(this);
  }, "getMaxListeners");
  L2.prototype.emit = a(function(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
    var i = e === "error", s = this._events;
    if (s !== void 0) i = i && s.error === void 0;
    else if (!i) return false;
    if (i) {
      var o;
      if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
      var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw u.context = o, u;
    }
    var c = s[e];
    if (c === void 0) return false;
    if (typeof c == "function") zn2(c, this, t);
    else for (var h = c.length, l = ni(c, h), n = 0; n < h; ++n) zn2(
      l[n],
      this,
      t
    );
    return true;
  }, "emit");
  function Xn2(r, e, t, n) {
    var i, s, o;
    if (ct2(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit(
      "newListener",
      e,
      t.listener ? t.listener : t
    ), s = r._events), o = s[e]), o === void 0) o = s[e] = t, ++r._eventsCount;
    else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(
      t
    ) : o.push(t), i = Jn2(r), i > 0 && o.length > i && !o.warned) {
      o.warned = true;
      var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, Wo2(u);
    }
    return r;
  }
  __name(Xn2, "Xn");
  a(Xn2, "_addListener");
  L2.prototype.addListener = a(function(e, t) {
    return Xn2(this, e, t, false);
  }, "addListener");
  L2.prototype.on = L2.prototype.addListener;
  L2.prototype.prependListener = a(function(e, t) {
    return Xn2(this, e, t, true);
  }, "prependListener");
  function Ho() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  __name(Ho, "Ho");
  a(
    Ho,
    "onceWrapper"
  );
  function ei(r, e, t) {
    var n = {
      fired: false,
      wrapFn: void 0,
      target: r,
      type: e,
      listener: t
    }, i = Ho.bind(n);
    return i.listener = t, n.wrapFn = i, i;
  }
  __name(ei, "ei");
  a(ei, "_onceWrap");
  L2.prototype.once = a(function(e, t) {
    return ct2(t), this.on(e, ei(this, e, t)), this;
  }, "once");
  L2.prototype.prependOnceListener = a(function(e, t) {
    return ct2(t), this.prependListener(e, ei(
      this,
      e,
      t
    )), this;
  }, "prependOnceListener");
  L2.prototype.removeListener = a(
    function(e, t) {
      var n, i, s, o, u;
      if (ct2(t), i = this._events, i === void 0) return this;
      if (n = i[e], n === void 0) return this;
      if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
      else if (typeof n != "function") {
        for (s = -1, o = n.length - 1; o >= 0; o--) if (n[o] === t || n[o].listener === t) {
          u = n[o].listener, s = o;
          break;
        }
        if (s < 0) return this;
        s === 0 ? n.shift() : Go2(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, u || t);
      }
      return this;
    },
    "removeListener"
  );
  L2.prototype.off = L2.prototype.removeListener;
  L2.prototype.removeAllListeners = a(function(e) {
    var t, n, i;
    if (n = this._events, n === void 0) return this;
    if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
    if (arguments.length === 0) {
      var s = Object.keys(n), o;
      for (i = 0; i < s.length; ++i) o = s[i], o !== "removeListener" && this.removeAllListeners(o);
      return this.removeAllListeners(
        "removeListener"
      ), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t = n[e], typeof t == "function") this.removeListener(e, t);
    else if (t !== void 0) for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
    return this;
  }, "removeAllListeners");
  function ti(r, e, t) {
    var n = r._events;
    if (n === void 0) return [];
    var i = n[e];
    return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? $o2(i) : ni(i, i.length);
  }
  __name(ti, "ti");
  a(ti, "_listeners");
  L2.prototype.listeners = a(function(e) {
    return ti(this, e, true);
  }, "listeners");
  L2.prototype.rawListeners = a(function(e) {
    return ti(this, e, false);
  }, "rawListeners");
  L2.listenerCount = function(r, e) {
    return typeof r.listenerCount == "function" ? r.listenerCount(e) : ri.call(r, e);
  };
  L2.prototype.listenerCount = ri;
  function ri(r) {
    var e = this._events;
    if (e !== void 0) {
      var t = e[r];
      if (typeof t == "function") return 1;
      if (t !== void 0) return t.length;
    }
    return 0;
  }
  __name(ri, "ri");
  a(ri, "listenerCount");
  L2.prototype.eventNames = a(function() {
    return this._eventsCount > 0 ? ut2(this._events) : [];
  }, "eventNames");
  function ni(r, e) {
    for (var t = new Array(e), n = 0; n < e; ++n) t[n] = r[n];
    return t;
  }
  __name(ni, "ni");
  a(ni, "arrayClone");
  function Go2(r, e) {
    for (; e + 1 < r.length; e++) r[e] = r[e + 1];
    r.pop();
  }
  __name(Go2, "Go");
  a(Go2, "spliceOne");
  function $o2(r) {
    for (var e = new Array(r.length), t = 0; t < e.length; ++t)
      e[t] = r[t].listener || r[t];
    return e;
  }
  __name($o2, "$o");
  a($o2, "unwrapListeners");
  function Vo(r, e) {
    return new Promise(
      function(t, n) {
        function i(o) {
          r.removeListener(e, s), n(o);
        }
        __name(i, "i");
        a(i, "errorListener");
        function s() {
          typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
            arguments
          ));
        }
        __name(s, "s");
        a(s, "resolver"), ii2(r, e, s, { once: true }), e !== "error" && Ko2(r, i, { once: true });
      }
    );
  }
  __name(Vo, "Vo");
  a(Vo, "once");
  function Ko2(r, e, t) {
    typeof r.on == "function" && ii2(r, "error", e, t);
  }
  __name(Ko2, "Ko");
  a(
    Ko2,
    "addErrorHandlerIfEventEmitter"
  );
  function ii2(r, e, t, n) {
    if (typeof r.on == "function")
      n.once ? r.once(e, t) : r.on(e, t);
    else if (typeof r.addEventListener == "function") r.addEventListener(
      e,
      a(/* @__PURE__ */ __name(function i(s) {
        n.once && r.removeEventListener(e, i), t(s);
      }, "i"), "wrapListener")
    );
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
  }
  __name(ii2, "ii");
  a(ii2, "eventTargetAgnosticAddListener");
});
var He2 = {};
se2(He2, { default: /* @__PURE__ */ __name(() => zo2, "default") });
var zo2;
var Ge2 = z(() => {
  "use strict";
  p();
  zo2 = {};
});
function $e2(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, h = 0, l = 0, d = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], b2 = a(
    (A2, g) => A2 >>> g | A2 << 32 - g,
    "rrot"
  ), C = new Uint32Array(64), B2 = new Uint8Array(64), Q = a(() => {
    for (let R2 = 0, $2 = 0; R2 < 16; R2++, $2 += 4) C[R2] = B2[$2] << 24 | B2[$2 + 1] << 16 | B2[$2 + 2] << 8 | B2[$2 + 3];
    for (let R2 = 16; R2 < 64; R2++) {
      let $2 = b2(C[R2 - 15], 7) ^ b2(C[R2 - 15], 18) ^ C[R2 - 15] >>> 3, ce2 = b2(C[R2 - 2], 17) ^ b2(C[R2 - 2], 19) ^ C[R2 - 2] >>> 10;
      C[R2] = C[R2 - 16] + $2 + C[R2 - 7] + ce2 | 0;
    }
    let A2 = e, g = t, P2 = n, K2 = i, k2 = s, j2 = o, ee2 = u, oe2 = c;
    for (let R2 = 0; R2 < 64; R2++) {
      let $2 = b2(
        k2,
        6
      ) ^ b2(k2, 11) ^ b2(k2, 25), ce2 = k2 & j2 ^ ~k2 & ee2, ye2 = oe2 + $2 + ce2 + d[R2] + C[R2] | 0, Se2 = b2(A2, 2) ^ b2(A2, 13) ^ b2(A2, 22), je2 = A2 & g ^ A2 & P2 ^ g & P2, he2 = Se2 + je2 | 0;
      oe2 = ee2, ee2 = j2, j2 = k2, k2 = K2 + ye2 | 0, K2 = P2, P2 = g, g = A2, A2 = ye2 + he2 | 0;
    }
    e = e + A2 | 0, t = t + g | 0, n = n + P2 | 0, i = i + K2 | 0, s = s + k2 | 0, o = o + j2 | 0, u = u + ee2 | 0, c = c + oe2 | 0, l = 0;
  }, "process"), X2 = a((A2) => {
    typeof A2 == "string" && (A2 = new TextEncoder().encode(A2));
    for (let g = 0; g < A2.length; g++) B2[l++] = A2[g], l === 64 && Q();
    h += A2.length;
  }, "add"), de = a(() => {
    if (B2[l++] = 128, l == 64 && Q(), l + 8 > 64) {
      for (; l < 64; ) B2[l++] = 0;
      Q();
    }
    for (; l < 58; ) B2[l++] = 0;
    let A2 = h * 8;
    B2[l++] = A2 / 1099511627776 & 255, B2[l++] = A2 / 4294967296 & 255, B2[l++] = A2 >>> 24, B2[l++] = A2 >>> 16 & 255, B2[l++] = A2 >>> 8 & 255, B2[l++] = A2 & 255, Q();
    let g = new Uint8Array(32);
    return g[0] = e >>> 24, g[1] = e >>> 16 & 255, g[2] = e >>> 8 & 255, g[3] = e & 255, g[4] = t >>> 24, g[5] = t >>> 16 & 255, g[6] = t >>> 8 & 255, g[7] = t & 255, g[8] = n >>> 24, g[9] = n >>> 16 & 255, g[10] = n >>> 8 & 255, g[11] = n & 255, g[12] = i >>> 24, g[13] = i >>> 16 & 255, g[14] = i >>> 8 & 255, g[15] = i & 255, g[16] = s >>> 24, g[17] = s >>> 16 & 255, g[18] = s >>> 8 & 255, g[19] = s & 255, g[20] = o >>> 24, g[21] = o >>> 16 & 255, g[22] = o >>> 8 & 255, g[23] = o & 255, g[24] = u >>> 24, g[25] = u >>> 16 & 255, g[26] = u >>> 8 & 255, g[27] = u & 255, g[28] = c >>> 24, g[29] = c >>> 16 & 255, g[30] = c >>> 8 & 255, g[31] = c & 255, g;
  }, "digest");
  return r === void 0 ? { add: X2, digest: de } : (X2(r), de());
}
__name($e2, "$e");
var si2 = z(
  () => {
    "use strict";
    p();
    a($e2, "sha256");
  }
);
var U;
var Ve2;
var oi2 = z(() => {
  "use strict";
  p();
  U = class U2 {
    static {
      __name(this, "U");
    }
    constructor() {
      _(
        this,
        "_dataLength",
        0
      );
      _(this, "_bufferLength", 0);
      _(this, "_state", new Int32Array(4));
      _(
        this,
        "_buffer",
        new ArrayBuffer(68)
      );
      _(this, "_buffer8");
      _(this, "_buffer32");
      this._buffer8 = new Uint8Array(
        this._buffer,
        0,
        68
      ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t = false) {
      return this.onePassHasher.start().appendByteArray(e).end(t);
    }
    static hashStr(e, t = false) {
      return this.onePassHasher.start().appendStr(e).end(t);
    }
    static hashAsciiStr(e, t = false) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t);
    }
    static _hex(e) {
      let t = U2.hexChars, n = U2.hexOut, i, s, o, u;
      for (u = 0; u < 4; u += 1) for (s = u * 8, i = e[u], o = 0; o < 8; o += 2) n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(i & 15), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], i = e[1], s = e[2], o = e[3];
      n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
      for (o = 0; o < e.length; o += 1) {
        if (s = e.charCodeAt(o), s < 128) t[i++] = s;
        else if (s < 2048) t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319) t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111) throw new Error("Unicode standard supports code points up to U+10FFFF");
          t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e.charCodeAt(o++);
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e[o++];
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, n = e.state, i = this._state, s;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1) this._buffer8[s] = t.charCodeAt(s);
    }
    end(e = false) {
      let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
      this._dataLength += t;
      let o = this._dataLength * 8;
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(U2.buffer32Identity.subarray(s), s), t > 55 && (U2._md5cycle(this._state, i), i.set(U2.buffer32Identity)), o <= 4294967295)
        i[14] = o;
      else {
        let u = o.toString(16).match(/(.*?)(.{0,8})$/);
        if (u === null) return;
        let c = parseInt(
          u[2],
          16
        ), h = parseInt(u[1], 16) || 0;
        i[14] = c, i[15] = h;
      }
      return U2._md5cycle(this._state, i), e ? this._state : U2._hex(this._state);
    }
  };
  a(U, "Md5"), _(U, "stateIdentity", new Int32Array(
    [1732584193, -271733879, -1732584194, 271733878]
  )), _(U, "buffer32Identity", new Int32Array(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )), _(U, "hexChars", "0123456789abcdef"), _(U, "hexOut", []), _(U, "onePassHasher", new U());
  Ve2 = U;
});
var Wt2 = {};
se2(Wt2, { createHash: /* @__PURE__ */ __name(() => Zo2, "createHash"), createHmac: /* @__PURE__ */ __name(() => Jo, "createHmac"), randomBytes: /* @__PURE__ */ __name(() => Yo2, "randomBytes") });
function Yo2(r) {
  return w2.getRandomValues(y2.alloc(r));
}
__name(Yo2, "Yo");
function Zo2(r) {
  if (r === "sha256") return { update: a(
    function(e) {
      return { digest: a(function() {
        return y2.from($e2(e));
      }, "digest") };
    },
    "update"
  ) };
  if (r === "md5") return { update: a(function(e) {
    return { digest: a(function() {
      return typeof e == "string" ? Ve2.hashStr(e) : Ve2.hashByteArray(e);
    }, "digest") };
  }, "update") };
  throw new Error(
    `Hash type '${r}' not supported`
  );
}
__name(Zo2, "Zo");
function Jo(r, e) {
  if (r !== "sha256") throw new Error(
    `Only sha256 is supported (requested: '${r}')`
  );
  return { update: a(function(t) {
    return {
      digest: a(function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
        let n = e.length;
        if (n > 64) e = $e2(e);
        else if (n < 64) {
          let c = new Uint8Array(64);
          c.set(e), e = c;
        }
        let i = new Uint8Array(64), s = new Uint8Array(
          64
        );
        for (let c = 0; c < 64; c++) i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
        let o = new Uint8Array(t.length + 64);
        o.set(i, 0), o.set(t, 64);
        let u = new Uint8Array(96);
        return u.set(s, 0), u.set(
          $e2(o),
          64
        ), y2.from($e2(u));
      }, "digest")
    };
  }, "update") };
}
__name(Jo, "Jo");
var Ht = z(() => {
  "use strict";
  p();
  si2();
  oi2();
  a(Yo2, "randomBytes");
  a(Zo2, "createHash");
  a(Jo, "createHmac");
});
var $t2 = I2((ai2) => {
  "use strict";
  p();
  ai2.parse = function(r, e) {
    return new Gt2(r, e).parse();
  };
  var ht2 = class ht3 {
    static {
      __name(this, "ht");
    }
    constructor(e, t) {
      this.source = e, this.transform = t || Xo2, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e = this.source[this.position++];
      return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
    }
    record(e) {
      this.recorded.push(e);
    }
    newEntry(e) {
      var t;
      (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
        t
      ), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[") for (; !this.isEof(); ) {
        var e = this.nextCharacter();
        if (e.value === "=") break;
      }
    }
    parse(e) {
      var t, n, i;
      for (this.consumeDimensions(); !this.isEof(); ) if (t = this.nextCharacter(), t.value === "{" && !i) this.dimension++, this.dimension > 1 && (n = new ht3(this.source.substr(this.position - 1), this.transform), this.entries.push(
        n.parse(true)
      ), this.position += n.position - 2);
      else if (t.value === "}" && !i) {
        if (this.dimension--, !this.dimension && (this.newEntry(), e)) return this.entries;
      } else t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
        t.value
      );
      if (this.dimension !== 0) throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  a(ht2, "ArrayParser");
  var Gt2 = ht2;
  function Xo2(r) {
    return r;
  }
  __name(Xo2, "Xo");
  a(Xo2, "identity");
});
var Vt2 = I2((Sh, ui2) => {
  p();
  var ea2 = $t2();
  ui2.exports = { create: a(function(r, e) {
    return { parse: a(
      function() {
        return ea2.parse(r, e);
      },
      "parse"
    ) };
  }, "create") };
});
var li2 = I2((vh, hi2) => {
  "use strict";
  p();
  var ta2 = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, ra2 = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, na2 = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, ia2 = /^-?infinity$/;
  hi2.exports = a(function(e) {
    if (ia2.test(e)) return Number(e.replace("i", "I"));
    var t = ta2.exec(e);
    if (!t) return sa2(e) || null;
    var n = !!t[8], i = parseInt(t[1], 10);
    n && (i = ci(i));
    var s = parseInt(
      t[2],
      10
    ) - 1, o = t[3], u = parseInt(t[4], 10), c = parseInt(t[5], 10), h = parseInt(t[6], 10), l = t[7];
    l = l ? 1e3 * parseFloat(l) : 0;
    var d, b2 = oa2(e);
    return b2 != null ? (d = new Date(Date.UTC(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    )), Kt(i) && d.setUTCFullYear(i), b2 !== 0 && d.setTime(d.getTime() - b2)) : (d = new Date(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    ), Kt(i) && d.setFullYear(i)), d;
  }, "parseDate");
  function sa2(r) {
    var e = ra2.exec(r);
    if (e) {
      var t = parseInt(e[1], 10), n = !!e[4];
      n && (t = ci(t));
      var i = parseInt(
        e[2],
        10
      ) - 1, s = e[3], o = new Date(t, i, s);
      return Kt(t) && o.setFullYear(t), o;
    }
  }
  __name(sa2, "sa");
  a(sa2, "getDate");
  function oa2(r) {
    if (r.endsWith("+00")) return 0;
    var e = na2.exec(r.split(" ")[1]);
    if (e) {
      var t = e[1];
      if (t === "Z") return 0;
      var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
        e[3] || 0,
        10
      ) * 60 + parseInt(e[4] || 0, 10);
      return i * n * 1e3;
    }
  }
  __name(oa2, "oa");
  a(oa2, "timeZoneOffset");
  function ci(r) {
    return -(r - 1);
  }
  __name(ci, "ci");
  a(ci, "bcYearToNegativeYear");
  function Kt(r) {
    return r >= 0 && r < 100;
  }
  __name(Kt, "Kt");
  a(
    Kt,
    "is0To99"
  );
});
var pi2 = I2((Ch, fi2) => {
  p();
  fi2.exports = ua2;
  var aa2 = Object.prototype.hasOwnProperty;
  function ua2(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) aa2.call(
        t,
        n
      ) && (r[n] = t[n]);
    }
    return r;
  }
  __name(ua2, "ua");
  a(ua2, "extend");
});
var mi2 = I2((Ph, yi2) => {
  "use strict";
  p();
  var ca2 = pi2();
  yi2.exports = Fe2;
  function Fe2(r) {
    if (!(this instanceof Fe2)) return new Fe2(r);
    ca2(this, xa2(r));
  }
  __name(Fe2, "Fe");
  a(Fe2, "PostgresInterval");
  var ha2 = ["seconds", "minutes", "hours", "days", "months", "years"];
  Fe2.prototype.toPostgres = function() {
    var r = ha2.filter(this.hasOwnProperty, this);
    return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
      var t = this[e] || 0;
      return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t + " " + e;
    }, this).join(" ");
  };
  var la2 = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, fa2 = ["years", "months", "days"], pa2 = ["hours", "minutes", "seconds"];
  Fe2.prototype.toISOString = Fe2.prototype.toISO = function() {
    var r = fa2.map(t, this).join(""), e = pa2.map(t, this).join("");
    return "P" + r + "T" + e;
    function t(n) {
      var i = this[n] || 0;
      return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i + la2[n];
    }
    __name(t, "t");
  };
  var zt2 = "([+-]?\\d+)", da2 = zt2 + "\\s+years?", ya2 = zt2 + "\\s+mons?", ma2 = zt2 + "\\s+days?", ga2 = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", wa2 = new RegExp([
    da2,
    ya2,
    ma2,
    ga2
  ].map(function(r) {
    return "(" + r + ")?";
  }).join("\\s*")), di2 = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
  }, ba2 = ["hours", "minutes", "seconds", "milliseconds"];
  function Sa2(r) {
    var e = r + "000000".slice(r.length);
    return parseInt(
      e,
      10
    ) / 1e3;
  }
  __name(Sa2, "Sa");
  a(Sa2, "parseMilliseconds");
  function xa2(r) {
    if (!r) return {};
    var e = wa2.exec(
      r
    ), t = e[8] === "-";
    return Object.keys(di2).reduce(function(n, i) {
      var s = di2[i], o = e[s];
      return !o || (o = i === "milliseconds" ? Sa2(o) : parseInt(o, 10), !o) || (t && ~ba2.indexOf(i) && (o *= -1), n[i] = o), n;
    }, {});
  }
  __name(xa2, "xa");
  a(xa2, "parse");
});
var wi2 = I2((Rh, gi2) => {
  "use strict";
  p();
  gi2.exports = a(function(e) {
    if (/^\\x/.test(e)) return new y2(
      e.substr(2),
      "hex"
    );
    for (var t = "", n = 0; n < e.length; ) if (e[n] !== "\\") t += e[n], ++n;
    else if (/[0-7]{3}/.test(e.substr(n + 1, 3))) t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
    else {
      for (var i = 1; n + i < e.length && e[n + i] === "\\"; ) i++;
      for (var s = 0; s < Math.floor(i / 2); ++s) t += "\\";
      n += Math.floor(i / 2) * 2;
    }
    return new y2(t, "binary");
  }, "parseBytea");
});
var Ai2 = I2((Dh, _i2) => {
  p();
  var Ke2 = $t2(), ze2 = Vt2(), lt2 = li2(), Si2 = mi2(), xi2 = wi2();
  function ft(r) {
    return a(function(t) {
      return t === null ? t : r(t);
    }, "nullAllowed");
  }
  __name(ft, "ft");
  a(ft, "allowNull");
  function Ei2(r) {
    return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
  }
  __name(Ei2, "Ei");
  a(Ei2, "parseBool");
  function Ea2(r) {
    return r ? Ke2.parse(r, Ei2) : null;
  }
  __name(Ea2, "Ea");
  a(Ea2, "parseBoolArray");
  function va2(r) {
    return parseInt(r, 10);
  }
  __name(va2, "va");
  a(va2, "parseBaseTenInt");
  function Yt2(r) {
    return r ? Ke2.parse(r, ft(va2)) : null;
  }
  __name(Yt2, "Yt");
  a(Yt2, "parseIntegerArray");
  function _a2(r) {
    return r ? Ke2.parse(r, ft(function(e) {
      return vi2(e).trim();
    })) : null;
  }
  __name(_a2, "_a");
  a(_a2, "parseBigIntegerArray");
  var Aa2 = a(function(r) {
    if (!r) return null;
    var e = ze2.create(r, function(t) {
      return t !== null && (t = er2(t)), t;
    });
    return e.parse();
  }, "parsePointArray"), Zt2 = a(function(r) {
    if (!r)
      return null;
    var e = ze2.create(r, function(t) {
      return t !== null && (t = parseFloat(t)), t;
    });
    return e.parse();
  }, "parseFloatArray"), ne = a(function(r) {
    if (!r) return null;
    var e = ze2.create(r);
    return e.parse();
  }, "parseStringArray"), Jt2 = a(function(r) {
    if (!r) return null;
    var e = ze2.create(r, function(t) {
      return t !== null && (t = lt2(t)), t;
    });
    return e.parse();
  }, "parseDateArray"), Ca2 = a(function(r) {
    if (!r) return null;
    var e = ze2.create(r, function(t) {
      return t !== null && (t = Si2(t)), t;
    });
    return e.parse();
  }, "parseIntervalArray"), Ta2 = a(function(r) {
    return r ? Ke2.parse(r, ft(xi2)) : null;
  }, "parseByteAArray"), Xt2 = a(function(r) {
    return parseInt(
      r,
      10
    );
  }, "parseInteger"), vi2 = a(function(r) {
    var e = String(r);
    return /^\d+$/.test(e) ? e : r;
  }, "parseBigInteger"), bi2 = a(
    function(r) {
      return r ? Ke2.parse(r, ft(JSON.parse)) : null;
    },
    "parseJsonArray"
  ), er2 = a(function(r) {
    return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
  }, "parsePoint"), Ia2 = a(function(r) {
    if (r[0] !== "<" && r[1] !== "(") return null;
    for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
      if (n || (e += r[i]), r[i] === ")") {
        n = true;
        continue;
      } else if (!n) continue;
      r[i] !== "," && (t += r[i]);
    }
    var s = er2(e);
    return s.radius = parseFloat(t), s;
  }, "parseCircle"), Pa2 = a(function(r) {
    r(
      20,
      vi2
    ), r(21, Xt2), r(23, Xt2), r(26, Xt2), r(700, parseFloat), r(701, parseFloat), r(16, Ei2), r(
      1082,
      lt2
    ), r(1114, lt2), r(1184, lt2), r(600, er2), r(651, ne), r(718, Ia2), r(1e3, Ea2), r(1001, Ta2), r(
      1005,
      Yt2
    ), r(1007, Yt2), r(1028, Yt2), r(1016, _a2), r(1017, Aa2), r(1021, Zt2), r(1022, Zt2), r(1231, Zt2), r(1014, ne), r(1015, ne), r(1008, ne), r(1009, ne), r(1040, ne), r(1041, ne), r(1115, Jt2), r(
      1182,
      Jt2
    ), r(1185, Jt2), r(1186, Si2), r(1187, Ca2), r(17, xi2), r(114, JSON.parse.bind(JSON)), r(
      3802,
      JSON.parse.bind(JSON)
    ), r(199, bi2), r(3807, bi2), r(3907, ne), r(2951, ne), r(791, ne), r(
      1183,
      ne
    ), r(1270, ne);
  }, "init");
  _i2.exports = { init: Pa2 };
});
var Ti2 = I2((Oh, Ci2) => {
  "use strict";
  p();
  var Z2 = 1e6;
  function Ba2(r) {
    var e = r.readInt32BE(
      0
    ), t = r.readUInt32BE(4), n = "";
    e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
    var i = "", s, o, u, c, h, l;
    {
      if (s = e % Z2, e = e / Z2 >>> 0, o = 4294967296 * s + t, t = o / Z2 >>> 0, u = "" + (o - Z2 * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Z2, e = e / Z2 >>> 0, o = 4294967296 * s + t, t = o / Z2 >>> 0, u = "" + (o - Z2 * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Z2, e = e / Z2 >>> 0, o = 4294967296 * s + t, t = o / Z2 >>> 0, u = "" + (o - Z2 * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    return s = e % Z2, o = 4294967296 * s + t, u = "" + o % Z2, n + u + i;
  }
  __name(Ba2, "Ba");
  a(Ba2, "readInt8");
  Ci2.exports = Ba2;
});
var Ri2 = I2((Qh, Li2) => {
  p();
  var La2 = Ti2(), F2 = a(function(r, e, t, n, i) {
    t = t || 0, n = n || false, i = i || function(C, B2, Q) {
      return C * Math.pow(2, Q) + B2;
    };
    var s = t >> 3, o = a(function(C) {
      return n ? ~C & 255 : C;
    }, "inv"), u = 255, c = 8 - t % 8;
    e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
    var h = 0;
    t % 8 + e >= 8 && (h = i(0, o(r[s]) & u, c));
    for (var l = e + t >> 3, d = s + 1; d < l; d++) h = i(h, o(r[d]), 8);
    var b2 = (e + t) % 8;
    return b2 > 0 && (h = i(h, o(r[l]) >> 8 - b2, b2)), h;
  }, "parseBits"), Bi2 = a(function(r, e, t) {
    var n = Math.pow(2, t - 1) - 1, i = F2(r, 1), s = F2(r, t, 1);
    if (s === 0) return 0;
    var o = 1, u = a(function(h, l, d) {
      h === 0 && (h = 1);
      for (var b2 = 1; b2 <= d; b2++) o /= 2, (l & 1 << d - b2) > 0 && (h += o);
      return h;
    }, "parsePrecisionBits"), c = F2(r, e, t + 1, false, u);
    return s == Math.pow(2, t + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
  }, "parseFloatFromBits"), Ra2 = a(function(r) {
    return F2(r, 1) == 1 ? -1 * (F2(r, 15, 1, true) + 1) : F2(r, 15, 1);
  }, "parseInt16"), Ii2 = a(function(r) {
    return F2(r, 1) == 1 ? -1 * (F2(
      r,
      31,
      1,
      true
    ) + 1) : F2(r, 31, 1);
  }, "parseInt32"), Fa2 = a(function(r) {
    return Bi2(r, 23, 8);
  }, "parseFloat32"), Ma2 = a(function(r) {
    return Bi2(r, 52, 11);
  }, "parseFloat64"), Da2 = a(function(r) {
    var e = F2(r, 16, 32);
    if (e == 49152) return NaN;
    for (var t = Math.pow(1e4, F2(r, 16, 16)), n = 0, i = [], s = F2(r, 16), o = 0; o < s; o++) n += F2(r, 16, 64 + 16 * o) * t, t /= 1e4;
    var u = Math.pow(10, F2(r, 16, 48));
    return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
  }, "parseNumeric"), Pi2 = a(function(r, e) {
    var t = F2(
      e,
      1
    ), n = F2(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
    return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
      return this.usec;
    }, i.setMicroSeconds = function(s) {
      this.usec = s;
    }, i.getUTCMicroSeconds = function() {
      return this.usec;
    }, i;
  }, "parseDate"), Ye2 = a(function(r) {
    for (var e = F2(r, 32), t = F2(r, 32, 32), n = F2(r, 32, 64), i = 96, s = [], o = 0; o < e; o++) s[o] = F2(r, 32, i), i += 32, i += 32;
    var u = a(function(h) {
      var l = F2(r, 32, i);
      if (i += 32, l == 4294967295) return null;
      var d;
      if (h == 23 || h == 20) return d = F2(r, l * 8, i), i += l * 8, d;
      if (h == 25) return d = r.toString(this.encoding, i >> 3, (i += l << 3) >> 3), d;
      console.log("ERROR: ElementType not implemented: " + h);
    }, "parseElement"), c = a(function(h, l) {
      var d = [], b2;
      if (h.length > 1) {
        var C = h.shift();
        for (b2 = 0; b2 < C; b2++) d[b2] = c(h, l);
        h.unshift(
          C
        );
      } else for (b2 = 0; b2 < h[0]; b2++) d[b2] = u(l);
      return d;
    }, "parse");
    return c(s, n);
  }, "parseArray"), ka2 = a(function(r) {
    return r.toString("utf8");
  }, "parseText"), Ua2 = a(function(r) {
    return r === null ? null : F2(r, 8) > 0;
  }, "parseBool"), Oa2 = a(function(r) {
    r(20, La2), r(21, Ra2), r(23, Ii2), r(
      26,
      Ii2
    ), r(1700, Da2), r(700, Fa2), r(701, Ma2), r(16, Ua2), r(1114, Pi2.bind(null, false)), r(1184, Pi2.bind(
      null,
      true
    )), r(1e3, Ye2), r(1007, Ye2), r(1016, Ye2), r(1008, Ye2), r(1009, Ye2), r(25, ka2);
  }, "init");
  Li2.exports = { init: Oa2 };
});
var Mi2 = I2((Hh, Fi2) => {
  p();
  Fi2.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
});
var Xe2 = I2((Je2) => {
  p();
  var Na2 = Ai2(), qa2 = Ri2(), Qa2 = Vt2(), ja2 = Mi2();
  Je2.getTypeParser = Wa2;
  Je2.setTypeParser = Ha2;
  Je2.arrayParser = Qa2;
  Je2.builtins = ja2;
  var Ze2 = { text: {}, binary: {} };
  function Di2(r) {
    return String(
      r
    );
  }
  __name(Di2, "Di");
  a(Di2, "noParse");
  function Wa2(r, e) {
    return e = e || "text", Ze2[e] && Ze2[e][r] || Di2;
  }
  __name(Wa2, "Wa");
  a(
    Wa2,
    "getTypeParser"
  );
  function Ha2(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), Ze2[e][r] = t;
  }
  __name(Ha2, "Ha");
  a(Ha2, "setTypeParser");
  Na2.init(function(r, e) {
    Ze2.text[r] = e;
  });
  qa2.init(function(r, e) {
    Ze2.binary[r] = e;
  });
});
var et2 = I2((zh, tr2) => {
  "use strict";
  p();
  tr2.exports = {
    host: "localhost",
    user: m2.platform === "win32" ? m2.env.USERNAME : m2.env.USER,
    database: void 0,
    password: null,
    connectionString: void 0,
    port: 5432,
    rows: 0,
    binary: false,
    max: 10,
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    statement_timeout: false,
    lock_timeout: false,
    idle_in_transaction_session_timeout: false,
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var Me2 = Xe2(), Ga2 = Me2.getTypeParser(
    20,
    "text"
  ), $a2 = Me2.getTypeParser(1016, "text");
  tr2.exports.__defineSetter__("parseInt8", function(r) {
    Me2.setTypeParser(20, "text", r ? Me2.getTypeParser(23, "text") : Ga2), Me2.setTypeParser(1016, "text", r ? Me2.getTypeParser(1007, "text") : $a2);
  });
});
var tt2 = I2((Zh, Ui2) => {
  "use strict";
  p();
  var Va2 = (Ht(), O(Wt2)), Ka2 = et2();
  function za2(r) {
    var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + e + '"';
  }
  __name(za2, "za");
  a(za2, "escapeElement");
  function ki2(r) {
    for (var e = "{", t = 0; t < r.length; t++) t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + ki2(r[t]) : r[t] instanceof y2 ? e += "\\\\x" + r[t].toString("hex") : e += za2(pt2(r[t]));
    return e = e + "}", e;
  }
  __name(ki2, "ki");
  a(ki2, "arrayString");
  var pt2 = a(function(r, e) {
    if (r == null) return null;
    if (r instanceof y2) return r;
    if (ArrayBuffer.isView(r)) {
      var t = y2.from(r.buffer, r.byteOffset, r.byteLength);
      return t.length === r.byteLength ? t : t.slice(
        r.byteOffset,
        r.byteOffset + r.byteLength
      );
    }
    return r instanceof Date ? Ka2.parseInputDatesAsUTC ? Ja2(r) : Za2(r) : Array.isArray(r) ? ki2(r) : typeof r == "object" ? Ya2(r, e) : r.toString();
  }, "prepareValue");
  function Ya2(r, e) {
    if (r && typeof r.toPostgres == "function") {
      if (e = e || [], e.indexOf(r) !== -1) throw new Error('circular reference detected while preparing "' + r + '" for query');
      return e.push(r), pt2(r.toPostgres(pt2), e);
    }
    return JSON.stringify(r);
  }
  __name(Ya2, "Ya");
  a(Ya2, "prepareObject");
  function G2(r, e) {
    for (r = "" + r; r.length < e; ) r = "0" + r;
    return r;
  }
  __name(G2, "G");
  a(
    G2,
    "pad"
  );
  function Za2(r) {
    var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
    n && (t = Math.abs(t) + 1);
    var i = G2(t, 4) + "-" + G2(r.getMonth() + 1, 2) + "-" + G2(r.getDate(), 2) + "T" + G2(r.getHours(), 2) + ":" + G2(r.getMinutes(), 2) + ":" + G2(r.getSeconds(), 2) + "." + G2(
      r.getMilliseconds(),
      3
    );
    return e < 0 ? (i += "-", e *= -1) : i += "+", i += G2(Math.floor(e / 60), 2) + ":" + G2(e % 60, 2), n && (i += " BC"), i;
  }
  __name(Za2, "Za");
  a(Za2, "dateToString");
  function Ja2(r) {
    var e = r.getUTCFullYear(), t = e < 1;
    t && (e = Math.abs(e) + 1);
    var n = G2(e, 4) + "-" + G2(r.getUTCMonth() + 1, 2) + "-" + G2(r.getUTCDate(), 2) + "T" + G2(r.getUTCHours(), 2) + ":" + G2(r.getUTCMinutes(), 2) + ":" + G2(r.getUTCSeconds(), 2) + "." + G2(r.getUTCMilliseconds(), 3);
    return n += "+00:00", t && (n += " BC"), n;
  }
  __name(Ja2, "Ja");
  a(Ja2, "dateToStringUTC");
  function Xa2(r, e, t) {
    return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
  }
  __name(Xa2, "Xa");
  a(Xa2, "normalizeQueryConfig");
  var rr2 = a(function(r) {
    return Va2.createHash("md5").update(r, "utf-8").digest("hex");
  }, "md5"), eu2 = a(function(r, e, t) {
    var n = rr2(e + r), i = rr2(y2.concat([y2.from(n), t]));
    return "md5" + i;
  }, "postgresMd5PasswordHash");
  Ui2.exports = { prepareValue: a(function(e) {
    return pt2(
      e
    );
  }, "prepareValueWrapper"), normalizeQueryConfig: Xa2, postgresMd5PasswordHash: eu2, md5: rr2 };
});
var ji2 = I2((el2, Qi2) => {
  "use strict";
  p();
  var nr2 = (Ht(), O(Wt2));
  function tu2(r) {
    if (r.indexOf(
      "SCRAM-SHA-256"
    ) === -1) throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e = nr2.randomBytes(18).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
  }
  __name(tu2, "tu");
  a(tu2, "startSession");
  function ru2(r, e, t) {
    if (r.message !== "SASLInitialResponse") throw new Error(
      "SASL: Last message was not SASLInitialResponse"
    );
    if (typeof e != "string") throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
    );
    if (typeof t != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n = su2(t);
    if (n.nonce.startsWith(r.clientNonce)) {
      if (n.nonce.length === r.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i = y2.from(n.salt, "base64"), s = uu2(
      e,
      i,
      n.iteration
    ), o = De2(s, "Client Key"), u = au2(o), c = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, d = c + "," + h + "," + l, b2 = De2(u, d), C = qi2(
      o,
      b2
    ), B2 = C.toString("base64"), Q = De2(s, "Server Key"), X2 = De2(Q, d);
    r.message = "SASLResponse", r.serverSignature = X2.toString("base64"), r.response = l + ",p=" + B2;
  }
  __name(ru2, "ru");
  a(ru2, "continueSession");
  function nu2(r, e) {
    if (r.message !== "SASLResponse") throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e != "string") throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t } = ou2(
      e
    );
    if (t !== r.serverSignature) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  __name(nu2, "nu");
  a(nu2, "finalizeSession");
  function iu2(r) {
    if (typeof r != "string") throw new TypeError("SASL: text must be a string");
    return r.split("").map(
      (e, t) => r.charCodeAt(t)
    ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
  }
  __name(iu2, "iu");
  a(iu2, "isPrintableChars");
  function Oi2(r) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
  }
  __name(Oi2, "Oi");
  a(Oi2, "isBase64");
  function Ni2(r) {
    if (typeof r != "string") throw new TypeError(
      "SASL: attribute pairs text must be a string"
    );
    return new Map(r.split(",").map((e) => {
      if (!/^.=/.test(e)) throw new Error("SASL: Invalid attribute pair entry");
      let t = e[0], n = e.substring(2);
      return [t, n];
    }));
  }
  __name(Ni2, "Ni");
  a(Ni2, "parseAttributePairs");
  function su2(r) {
    let e = Ni2(
      r
    ), t = e.get("r");
    if (t) {
      if (!iu2(t)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n = e.get("s");
    if (n) {
      if (!Oi2(n)) throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
      );
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i = e.get("i");
    if (i) {
      if (!/^[1-9][0-9]*$/.test(i)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s = parseInt(i, 10);
    return { nonce: t, salt: n, iteration: s };
  }
  __name(su2, "su");
  a(su2, "parseServerFirstMessage");
  function ou2(r) {
    let t = Ni2(r).get("v");
    if (t) {
      if (!Oi2(t)) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else throw new Error(
      "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
    );
    return { serverSignature: t };
  }
  __name(ou2, "ou");
  a(ou2, "parseServerFinalMessage");
  function qi2(r, e) {
    if (!y2.isBuffer(r)) throw new TypeError(
      "first argument must be a Buffer"
    );
    if (!y2.isBuffer(e)) throw new TypeError("second argument must be a Buffer");
    if (r.length !== e.length) throw new Error("Buffer lengths must match");
    if (r.length === 0) throw new Error("Buffers cannot be empty");
    return y2.from(r.map((t, n) => r[n] ^ e[n]));
  }
  __name(qi2, "qi");
  a(qi2, "xorBuffers");
  function au2(r) {
    return nr2.createHash(
      "sha256"
    ).update(r).digest();
  }
  __name(au2, "au");
  a(au2, "sha256");
  function De2(r, e) {
    return nr2.createHmac(
      "sha256",
      r
    ).update(e).digest();
  }
  __name(De2, "De");
  a(De2, "hmacSha256");
  function uu2(r, e, t) {
    for (var n = De2(
      r,
      y2.concat([e, y2.from([0, 0, 0, 1])])
    ), i = n, s = 0; s < t - 1; s++) n = De2(r, n), i = qi2(i, n);
    return i;
  }
  __name(uu2, "uu");
  a(uu2, "Hi");
  Qi2.exports = { startSession: tu2, continueSession: ru2, finalizeSession: nu2 };
});
var ir2 = {};
se2(ir2, { join: /* @__PURE__ */ __name(() => cu2, "join") });
function cu2(...r) {
  return r.join("/");
}
__name(cu2, "cu");
var sr2 = z(() => {
  "use strict";
  p();
  a(cu2, "join");
});
var or2 = {};
se2(or2, { stat: /* @__PURE__ */ __name(() => hu2, "stat") });
function hu2(r, e) {
  e(new Error("No filesystem"));
}
__name(hu2, "hu");
var ar2 = z(
  () => {
    "use strict";
    p();
    a(hu2, "stat");
  }
);
var ur2 = {};
se2(ur2, { default: /* @__PURE__ */ __name(() => lu2, "default") });
var lu2;
var cr2 = z(() => {
  "use strict";
  p();
  lu2 = {};
});
var Wi2 = {};
se2(Wi2, { StringDecoder: /* @__PURE__ */ __name(() => hr2, "StringDecoder") });
var lr2;
var hr2;
var Hi2 = z(() => {
  "use strict";
  p();
  lr2 = class lr {
    static {
      __name(this, "lr");
    }
    constructor(e) {
      _(this, "td");
      this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: true });
    }
    end(e) {
      return this.td.decode(e);
    }
  };
  a(lr2, "StringDecoder");
  hr2 = lr2;
});
var Ki2 = I2((hl2, Vi2) => {
  "use strict";
  p();
  var { Transform: fu2 } = (cr2(), O(ur2)), { StringDecoder: pu2 } = (Hi2(), O(Wi2)), we2 = Symbol("last"), dt = Symbol("decoder");
  function du2(r, e, t) {
    let n;
    if (this.overflow) {
      if (n = this[dt].write(r).split(this.matcher), n.length === 1) return t();
      n.shift(), this.overflow = false;
    } else this[we2] += this[dt].write(r), n = this[we2].split(this.matcher);
    this[we2] = n.pop();
    for (let i = 0; i < n.length; i++) try {
      $i2(this, this.mapper(n[i]));
    } catch (s) {
      return t(
        s
      );
    }
    if (this.overflow = this[we2].length > this.maxLength, this.overflow && !this.skipOverflow) {
      t(new Error("maximum buffer reached"));
      return;
    }
    t();
  }
  __name(du2, "du");
  a(du2, "transform");
  function yu2(r) {
    if (this[we2] += this[dt].end(), this[we2]) try {
      $i2(this, this.mapper(this[we2]));
    } catch (e) {
      return r(e);
    }
    r();
  }
  __name(yu2, "yu");
  a(yu2, "flush");
  function $i2(r, e) {
    e !== void 0 && r.push(e);
  }
  __name($i2, "$i");
  a($i2, "push");
  function Gi2(r) {
    return r;
  }
  __name(Gi2, "Gi");
  a(Gi2, "noop");
  function mu2(r, e, t) {
    switch (r = r || /\r?\n/, e = e || Gi2, t = t || {}, arguments.length) {
      case 1:
        typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
        break;
      case 2:
        typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = Gi2);
    }
    t = Object.assign({}, t), t.autoDestroy = true, t.transform = du2, t.flush = yu2, t.readableObjectMode = true;
    let n = new fu2(t);
    return n[we2] = "", n[dt] = new pu2("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
      this._writableState.errorEmitted = false, s(i);
    }, n;
  }
  __name(mu2, "mu");
  a(mu2, "split");
  Vi2.exports = mu2;
});
var Zi2 = I2((pl2, fe2) => {
  "use strict";
  p();
  var zi2 = (sr2(), O(ir2)), gu2 = (cr2(), O(ur2)).Stream, wu2 = Ki2(), Yi2 = (Ge2(), O(He2)), bu2 = 5432, yt2 = m2.platform === "win32", rt2 = m2.stderr, Su2 = 56, xu2 = 7, Eu2 = 61440, vu2 = 32768;
  function _u2(r) {
    return (r & Eu2) == vu2;
  }
  __name(_u2, "_u");
  a(_u2, "isRegFile");
  var ke2 = [
    "host",
    "port",
    "database",
    "user",
    "password"
  ], fr2 = ke2.length, Au2 = ke2[fr2 - 1];
  function pr2() {
    var r = rt2 instanceof gu2 && rt2.writable === true;
    if (r) {
      var e = Array.prototype.slice.call(arguments).concat(`
`);
      rt2.write(Yi2.format.apply(Yi2, e));
    }
  }
  __name(pr2, "pr");
  a(pr2, "warn");
  Object.defineProperty(
    fe2.exports,
    "isWin",
    { get: a(function() {
      return yt2;
    }, "get"), set: a(function(r) {
      yt2 = r;
    }, "set") }
  );
  fe2.exports.warnTo = function(r) {
    var e = rt2;
    return rt2 = r, e;
  };
  fe2.exports.getFileName = function(r) {
    var e = r || m2.env, t = e.PGPASSFILE || (yt2 ? zi2.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : zi2.join(e.HOME || "./", ".pgpass"));
    return t;
  };
  fe2.exports.usePgPass = function(r, e) {
    return Object.prototype.hasOwnProperty.call(m2.env, "PGPASSWORD") ? false : yt2 ? true : (e = e || "<unkn>", _u2(r.mode) ? r.mode & (Su2 | xu2) ? (pr2('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (pr2('WARNING: password file "%s" is not a plain file', e), false));
  };
  var Cu2 = fe2.exports.match = function(r, e) {
    return ke2.slice(0, -1).reduce(function(t, n, i) {
      return i == 1 && Number(r[n] || bu2) === Number(
        e[n]
      ) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
    }, true);
  };
  fe2.exports.getPassword = function(r, e, t) {
    var n, i = e.pipe(wu2());
    function s(c) {
      var h = Tu2(c);
      h && Iu2(h) && Cu2(r, h) && (n = h[Au2], i.end());
    }
    __name(s, "s");
    a(s, "onLine");
    var o = a(function() {
      e.destroy(), t(n);
    }, "onEnd"), u = a(function(c) {
      e.destroy(), pr2("WARNING: error on reading file: %s", c), t(void 0);
    }, "onErr");
    e.on("error", u), i.on("data", s).on("end", o).on("error", u);
  };
  var Tu2 = fe2.exports.parseLine = function(r) {
    if (r.length < 11 || r.match(/^\s+#/)) return null;
    for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(function(l, d, b2) {
      var C = r.substring(d, b2);
      Object.hasOwnProperty.call(
        m2.env,
        "PGPASS_NO_DEESCAPE"
      ) || (C = C.replace(/\\([:\\])/g, "$1")), o[ke2[l]] = C;
    }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
      if (e = r.charAt(h + 1), t = r.charAt(h), u = n == fr2 - 1, u) {
        c(n, i);
        break;
      }
      h >= 0 && e == ":" && t !== "\\" && (c(n, i, h + 1), i = h + 2, n += 1);
    }
    return o = Object.keys(o).length === fr2 ? o : null, o;
  }, Iu2 = fe2.exports.isValidEntry = function(r) {
    for (var e = { 0: function(o) {
      return o.length > 0;
    }, 1: function(o) {
      return o === "*" ? true : (o = Number(o), isFinite(o) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
    }, 2: function(o) {
      return o.length > 0;
    }, 3: function(o) {
      return o.length > 0;
    }, 4: function(o) {
      return o.length > 0;
    } }, t = 0; t < ke2.length; t += 1) {
      var n = e[t], i = r[ke2[t]] || "", s = n(i);
      if (!s) return false;
    }
    return true;
  };
});
var Xi2 = I2((gl2, dr2) => {
  "use strict";
  p();
  var ml2 = (sr2(), O(ir2)), Ji2 = (ar2(), O(or2)), mt2 = Zi2();
  dr2.exports = function(r, e) {
    var t = mt2.getFileName();
    Ji2.stat(t, function(n, i) {
      if (n || !mt2.usePgPass(i, t)) return e(void 0);
      var s = Ji2.createReadStream(t);
      mt2.getPassword(
        r,
        s,
        e
      );
    });
  };
  dr2.exports.warnTo = mt2.warnTo;
});
var wt2 = I2((bl2, es) => {
  "use strict";
  p();
  var Pu2 = Xe2();
  function gt(r) {
    this._types = r || Pu2, this.text = {}, this.binary = {};
  }
  __name(gt, "gt");
  a(gt, "TypeOverrides");
  gt.prototype.getOverrides = function(r) {
    switch (r) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  gt.prototype.setTypeParser = function(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
  };
  gt.prototype.getTypeParser = function(r, e) {
    return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
  };
  es.exports = gt;
});
var ts2 = {};
se2(ts2, { default: /* @__PURE__ */ __name(() => Bu2, "default") });
var Bu2;
var rs2 = z(() => {
  "use strict";
  p();
  Bu2 = {};
});
var ns2 = {};
se2(ns2, { parse: /* @__PURE__ */ __name(() => yr2, "parse") });
function yr2(r, e = false) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    searchParams: d,
    hash: b2
  } = new URL(n);
  s = decodeURIComponent(s), i = decodeURIComponent(
    i
  ), h = decodeURIComponent(h);
  let C = i + ":" + s, B2 = e ? Object.fromEntries(d.entries()) : l;
  return {
    href: r,
    protocol: t,
    auth: C,
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    query: B2,
    hash: b2
  };
}
__name(yr2, "yr");
var mr2 = z(() => {
  "use strict";
  p();
  a(yr2, "parse");
});
var ss = I2((Al2, is2) => {
  "use strict";
  p();
  var Lu2 = (mr2(), O(ns2)), gr2 = (ar2(), O(or2));
  function wr2(r) {
    if (r.charAt(0) === "/") {
      var t = r.split(" ");
      return { host: t[0], database: t[1] };
    }
    var e = Lu2.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
      /\%25(\d\d)/g,
      "%$1"
    ) : r, true), t = e.query;
    for (var n in t) Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
    var i = (e.auth || ":").split(":");
    if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:") return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
    t.host || (t.host = e.hostname);
    var s = e.pathname;
    if (!t.host && s && /^%2f/i.test(s)) {
      var o = s.split("/");
      t.host = decodeURIComponent(
        o[0]
      ), s = o.splice(1).join("/");
    }
    switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = gr2.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = gr2.readFileSync(
      t.sslkey
    ).toString()), t.sslrootcert && (t.ssl.ca = gr2.readFileSync(t.sslrootcert).toString()), t.sslmode) {
      case "disable": {
        t.ssl = false;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        t.ssl.rejectUnauthorized = false;
        break;
      }
    }
    return t;
  }
  __name(wr2, "wr");
  a(wr2, "parse");
  is2.exports = wr2;
  wr2.parse = wr2;
});
var bt2 = I2((Il2, us2) => {
  "use strict";
  p();
  var Ru2 = (rs2(), O(ts2)), as2 = et2(), os2 = ss().parse, V2 = a(
    function(r, e, t) {
      return t === void 0 ? t = m2.env["PG" + r.toUpperCase()] : t === false || (t = m2.env[t]), e[r] || t || as2[r];
    },
    "val"
  ), Fu2 = a(function() {
    switch (m2.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return as2.ssl;
  }, "readSSLConfigFromEnvironment"), Ue2 = a(
    function(r) {
      return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    },
    "quoteParamValue"
  ), ie2 = a(function(r, e, t) {
    var n = e[t];
    n != null && r.push(t + "=" + Ue2(n));
  }, "add"), Sr2 = class Sr {
    static {
      __name(this, "Sr");
    }
    constructor(e) {
      e = typeof e == "string" ? os2(e) : e || {}, e.connectionString && (e = Object.assign({}, e, os2(e.connectionString))), this.user = V2("user", e), this.database = V2("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
        V2("port", e),
        10
      ), this.host = V2("host", e), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: V2("password", e)
      }), this.binary = V2("binary", e), this.options = V2("options", e), this.ssl = typeof e.ssl > "u" ? Fu2() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V2("client_encoding", e), this.replication = V2("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V2("application_name", e, "PGAPPNAME"), this.fallback_application_name = V2("fallback_application_name", e, false), this.statement_timeout = V2("statement_timeout", e, false), this.lock_timeout = V2(
        "lock_timeout",
        e,
        false
      ), this.idle_in_transaction_session_timeout = V2("idle_in_transaction_session_timeout", e, false), this.query_timeout = V2("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m2.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e) {
      var t = [];
      ie2(t, this, "user"), ie2(t, this, "password"), ie2(t, this, "port"), ie2(t, this, "application_name"), ie2(t, this, "fallback_application_name"), ie2(t, this, "connect_timeout"), ie2(
        t,
        this,
        "options"
      );
      var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (ie2(t, n, "sslmode"), ie2(t, n, "sslca"), ie2(t, n, "sslkey"), ie2(t, n, "sslcert"), ie2(t, n, "sslrootcert"), this.database && t.push("dbname=" + Ue2(this.database)), this.replication && t.push("replication=" + Ue2(this.replication)), this.host && t.push("host=" + Ue2(this.host)), this.isDomainSocket) return e(null, t.join(" "));
      this.client_encoding && t.push("client_encoding=" + Ue2(this.client_encoding)), Ru2.lookup(this.host, function(i, s) {
        return i ? e(i, null) : (t.push("hostaddr=" + Ue2(s)), e(null, t.join(" ")));
      });
    }
  };
  a(Sr2, "ConnectionParameters");
  var br2 = Sr2;
  us2.exports = br2;
});
var ls = I2((Ll2, hs2) => {
  "use strict";
  p();
  var Mu2 = Xe2(), cs = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, Er2 = class Er {
    static {
      __name(this, "Er");
    }
    constructor(e, t) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e) {
      var t;
      e.text ? t = cs.exec(e.text) : t = cs.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
        t[2],
        10
      )));
    }
    _parseRowAsArray(e) {
      for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
        var s = e[n];
        s !== null ? t[n] = this._parsers[n](s) : t[n] = null;
      }
      return t;
    }
    parseRow(e) {
      for (var t = {}, n = 0, i = e.length; n < i; n++) {
        var s = e[n], o = this.fields[n].name;
        s !== null ? t[o] = this._parsers[n](
          s
        ) : t[o] = null;
      }
      return t;
    }
    addRow(e) {
      this.rows.push(e);
    }
    addFields(e) {
      this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Mu2.getTypeParser(n.dataTypeID, n.format || "text");
      }
    }
  };
  a(Er2, "Result");
  var xr2 = Er2;
  hs2.exports = xr2;
});
var ys2 = I2((Ml2, ds2) => {
  "use strict";
  p();
  var { EventEmitter: Du2 } = ge2(), fs2 = ls(), ps2 = tt2(), _r2 = class _r extends Du2 {
    static {
      __name(this, "_r");
    }
    constructor(e, t, n) {
      super(), e = ps2.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m2.domain && e.callback && (this.callback = m2.domain.bind(e.callback)), this._result = new fs2(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new fs2(
        this._rowMode,
        this.types
      ), this._results.push(this._result));
    }
    handleRowDescription(e) {
      this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e) {
      let t;
      if (!this._canceledDueToError) {
        try {
          t = this._result.parseRow(e.fields);
        } catch (n) {
          this._canceledDueToError = n;
          return;
        }
        this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
      }
    }
    handleCommandComplete(e, t) {
      this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
    }
    handleEmptyQuery(e) {
      this.rows && e.sync();
    }
    handleError(e, t) {
      if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback) return this.callback(e);
      this.emit("error", e);
    }
    handleReadyForQuery(e) {
      if (this._canceledDueToError) return this.handleError(
        this._canceledDueToError,
        e
      );
      if (this.callback) try {
        this.callback(null, this._results);
      } catch (t) {
        m2.nextTick(() => {
          throw t;
        });
      }
      this.emit("end", this._results);
    }
    submit(e) {
      if (typeof this.text != "string" && typeof this.name != "string") return new Error("A query must have either text or a name. Supplying neither is unsupported.");
      let t = e.parsedStatements[this.name];
      return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
    }
    hasBeenParsed(e) {
      return this.name && e.parsedStatements[this.name];
    }
    handlePortalSuspended(e) {
      this._getRows(e, this.rows);
    }
    _getRows(e, t) {
      e.execute(
        { portal: this.portal, rows: t }
      ), t ? e.flush() : e.sync();
    }
    prepare(e) {
      this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: ps2.prepareValue });
      } catch (t) {
        this.handleError(t, e);
        return;
      }
      e.describe(
        { type: "P", name: this.portal || "" }
      ), this._getRows(e, this.rows);
    }
    handleCopyInResponse(e) {
      e.sendCopyFail("No source stream defined");
    }
    handleCopyData(e, t) {
    }
  };
  a(_r2, "Query");
  var vr2 = _r2;
  ds2.exports = vr2;
});
var ws2 = {};
se2(ws2, { Socket: /* @__PURE__ */ __name(() => _e2, "Socket"), isIP: /* @__PURE__ */ __name(() => ku2, "isIP") });
function ku2(r) {
  return 0;
}
__name(ku2, "ku");
var gs;
var ms;
var v;
var _e2;
var St2 = z(() => {
  "use strict";
  p();
  gs = Te2(ge2(), 1);
  a(ku2, "isIP");
  ms = /^[^.]+\./, v = class v2 extends gs.EventEmitter {
    static {
      __name(this, "v");
    }
    constructor() {
      super(...arguments);
      _(this, "opts", {});
      _(this, "connecting", false);
      _(this, "pending", true);
      _(this, "writable", true);
      _(this, "encrypted", false);
      _(this, "authorized", false);
      _(this, "destroyed", false);
      _(this, "ws", null);
      _(this, "writeBuffer");
      _(this, "tlsState", 0);
      _(
        this,
        "tlsRead"
      );
      _(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return v2.opts.poolQueryViaFetch ?? v2.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(t) {
      v2.opts.poolQueryViaFetch = t;
    }
    static get fetchEndpoint() {
      return v2.opts.fetchEndpoint ?? v2.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(t) {
      v2.opts.fetchEndpoint = t;
    }
    static get fetchConnectionCache() {
      return true;
    }
    static set fetchConnectionCache(t) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return v2.opts.fetchFunction ?? v2.defaults.fetchFunction;
    }
    static set fetchFunction(t) {
      v2.opts.fetchFunction = t;
    }
    static get webSocketConstructor() {
      return v2.opts.webSocketConstructor ?? v2.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(t) {
      v2.opts.webSocketConstructor = t;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? v2.webSocketConstructor;
    }
    set webSocketConstructor(t) {
      this.opts.webSocketConstructor = t;
    }
    static get wsProxy() {
      return v2.opts.wsProxy ?? v2.defaults.wsProxy;
    }
    static set wsProxy(t) {
      v2.opts.wsProxy = t;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? v2.wsProxy;
    }
    set wsProxy(t) {
      this.opts.wsProxy = t;
    }
    static get coalesceWrites() {
      return v2.opts.coalesceWrites ?? v2.defaults.coalesceWrites;
    }
    static set coalesceWrites(t) {
      v2.opts.coalesceWrites = t;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? v2.coalesceWrites;
    }
    set coalesceWrites(t) {
      this.opts.coalesceWrites = t;
    }
    static get useSecureWebSocket() {
      return v2.opts.useSecureWebSocket ?? v2.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(t) {
      v2.opts.useSecureWebSocket = t;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? v2.useSecureWebSocket;
    }
    set useSecureWebSocket(t) {
      this.opts.useSecureWebSocket = t;
    }
    static get forceDisablePgSSL() {
      return v2.opts.forceDisablePgSSL ?? v2.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(t) {
      v2.opts.forceDisablePgSSL = t;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? v2.forceDisablePgSSL;
    }
    set forceDisablePgSSL(t) {
      this.opts.forceDisablePgSSL = t;
    }
    static get disableSNI() {
      return v2.opts.disableSNI ?? v2.defaults.disableSNI;
    }
    static set disableSNI(t) {
      v2.opts.disableSNI = t;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? v2.disableSNI;
    }
    set disableSNI(t) {
      this.opts.disableSNI = t;
    }
    static get pipelineConnect() {
      return v2.opts.pipelineConnect ?? v2.defaults.pipelineConnect;
    }
    static set pipelineConnect(t) {
      v2.opts.pipelineConnect = t;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? v2.pipelineConnect;
    }
    set pipelineConnect(t) {
      this.opts.pipelineConnect = t;
    }
    static get subtls() {
      return v2.opts.subtls ?? v2.defaults.subtls;
    }
    static set subtls(t) {
      v2.opts.subtls = t;
    }
    get subtls() {
      return this.opts.subtls ?? v2.subtls;
    }
    set subtls(t) {
      this.opts.subtls = t;
    }
    static get pipelineTLS() {
      return v2.opts.pipelineTLS ?? v2.defaults.pipelineTLS;
    }
    static set pipelineTLS(t) {
      v2.opts.pipelineTLS = t;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? v2.pipelineTLS;
    }
    set pipelineTLS(t) {
      this.opts.pipelineTLS = t;
    }
    static get rootCerts() {
      return v2.opts.rootCerts ?? v2.defaults.rootCerts;
    }
    static set rootCerts(t) {
      v2.opts.rootCerts = t;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? v2.rootCerts;
    }
    set rootCerts(t) {
      this.opts.rootCerts = t;
    }
    wsProxyAddrForHost(t, n) {
      let i = this.wsProxy;
      if (i === void 0) throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
    }
    setNoDelay() {
      return this;
    }
    setKeepAlive() {
      return this;
    }
    ref() {
      return this;
    }
    unref() {
      return this;
    }
    connect(t, n, i) {
      this.connecting = true, i && this.once("connect", i);
      let s = a(() => {
        this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), o = a((c, h = false) => {
        c.binaryType = "arraybuffer", c.addEventListener("error", (l) => {
          this.emit("error", l), this.emit("close");
        }), c.addEventListener("message", (l) => {
          if (this.tlsState === 0) {
            let d = y2.from(l.data);
            this.emit(
              "data",
              d
            );
          }
        }), c.addEventListener("close", () => {
          this.emit("close");
        }), h ? s() : c.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u;
      try {
        u = this.wsProxyAddrForHost(n, typeof t == "string" ? parseInt(t, 10) : t);
      } catch (c) {
        this.emit("error", c), this.emit("close");
        return;
      }
      try {
        let h = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0) this.ws = new this.webSocketConstructor(h), o(this.ws);
        else try {
          this.ws = new WebSocket(
            h
          ), o(this.ws);
        } catch {
          this.ws = new __unstable_WebSocket(h), o(this.ws);
        }
      } catch (c) {
        let l = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(l, { headers: { Upgrade: "websocket" } }).then((d) => {
          if (this.ws = d.webSocket, this.ws == null) throw c;
          this.ws.accept(), o(
            this.ws,
            true
          );
        }).catch((d) => {
          this.emit("error", new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${d.message}`)), this.emit("close");
        });
      }
    }
    async startTls(t) {
      if (this.subtls === void 0) throw new Error("For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information.");
      this.tlsState = 1;
      let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(
        i
      ), o = this.rawWrite.bind(this), [u, c] = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit(
        "secureConnection",
        this
      ), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let t = await this.tlsRead();
        if (t === void 0) break;
        {
          let n = y2.from(t);
          this.emit("data", n);
        }
      }
    }
    rawWrite(t) {
      if (!this.coalesceWrites) {
        this.ws.send(t);
        return;
      }
      if (this.writeBuffer === void 0) this.writeBuffer = t, setTimeout(
        () => {
          this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
        },
        0
      );
      else {
        let n = new Uint8Array(this.writeBuffer.length + t.length);
        n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
      }
    }
    write(t, n = "utf8", i = (s) => {
    }) {
      return t.length === 0 ? (i(), true) : (typeof t == "string" && (t = y2.from(t, n)), this.tlsState === 0 ? (this.rawWrite(t), i()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(
          t,
          n,
          i
        );
      }) : (this.tlsWrite(t), i()), true);
    }
    end(t = y2.alloc(0), n = "utf8", i = () => {
    }) {
      return this.write(t, n, () => {
        this.ws.close(), i();
      }), this;
    }
    destroy() {
      return this.destroyed = true, this.end();
    }
  };
  a(v, "Socket"), _(v, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: a((t, n, i) => {
      let s;
      return i?.jwtAuth ? s = t.replace(ms, "apiauth.") : s = t.replace(ms, "api."), "https://" + s + "/sql";
    }, "fetchEndpoint"),
    fetchConnectionCache: true,
    fetchFunction: void 0,
    webSocketConstructor: void 0,
    wsProxy: a((t) => t + "/v2", "wsProxy"),
    useSecureWebSocket: true,
    forceDisablePgSSL: true,
    coalesceWrites: true,
    pipelineConnect: "password",
    subtls: void 0,
    rootCerts: "",
    pipelineTLS: false,
    disableSNI: false
  }), _(v, "opts", {});
  _e2 = v;
});
var Xr = I2((T) => {
  "use strict";
  p();
  Object.defineProperty(T, "__esModule", { value: true });
  T.NoticeMessage = T.DataRowMessage = T.CommandCompleteMessage = T.ReadyForQueryMessage = T.NotificationResponseMessage = T.BackendKeyDataMessage = T.AuthenticationMD5Password = T.ParameterStatusMessage = T.ParameterDescriptionMessage = T.RowDescriptionMessage = T.Field = T.CopyResponse = T.CopyDataMessage = T.DatabaseError = T.copyDone = T.emptyQuery = T.replicationStart = T.portalSuspended = T.noData = T.closeComplete = T.bindComplete = T.parseComplete = void 0;
  T.parseComplete = { name: "parseComplete", length: 5 };
  T.bindComplete = { name: "bindComplete", length: 5 };
  T.closeComplete = { name: "closeComplete", length: 5 };
  T.noData = { name: "noData", length: 5 };
  T.portalSuspended = { name: "portalSuspended", length: 5 };
  T.replicationStart = { name: "replicationStart", length: 4 };
  T.emptyQuery = { name: "emptyQuery", length: 4 };
  T.copyDone = { name: "copyDone", length: 4 };
  var Nr2 = class Nr extends Error {
    static {
      __name(this, "Nr");
    }
    constructor(e, t, n) {
      super(
        e
      ), this.length = t, this.name = n;
    }
  };
  a(Nr2, "DatabaseError");
  var Ar2 = Nr2;
  T.DatabaseError = Ar2;
  var qr2 = class qr {
    static {
      __name(this, "qr");
    }
    constructor(e, t) {
      this.length = e, this.chunk = t, this.name = "copyData";
    }
  };
  a(qr2, "CopyDataMessage");
  var Cr2 = qr2;
  T.CopyDataMessage = Cr2;
  var Qr2 = class Qr {
    static {
      __name(this, "Qr");
    }
    constructor(e, t, n, i) {
      this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
    }
  };
  a(Qr2, "CopyResponse");
  var Tr2 = Qr2;
  T.CopyResponse = Tr2;
  var jr2 = class jr {
    static {
      __name(this, "jr");
    }
    constructor(e, t, n, i, s, o, u) {
      this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
    }
  };
  a(jr2, "Field");
  var Ir2 = jr2;
  T.Field = Ir2;
  var Wr = class Wr {
    static {
      __name(this, "Wr");
    }
    constructor(e, t) {
      this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
        this.fieldCount
      );
    }
  };
  a(Wr, "RowDescriptionMessage");
  var Pr2 = Wr;
  T.RowDescriptionMessage = Pr2;
  var Hr = class Hr {
    static {
      __name(this, "Hr");
    }
    constructor(e, t) {
      this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  a(Hr, "ParameterDescriptionMessage");
  var Br2 = Hr;
  T.ParameterDescriptionMessage = Br2;
  var Gr2 = class Gr {
    static {
      __name(this, "Gr");
    }
    constructor(e, t, n) {
      this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
    }
  };
  a(Gr2, "ParameterStatusMessage");
  var Lr = Gr2;
  T.ParameterStatusMessage = Lr;
  var $r2 = class $r {
    static {
      __name(this, "$r");
    }
    constructor(e, t) {
      this.length = e, this.salt = t, this.name = "authenticationMD5Password";
    }
  };
  a($r2, "AuthenticationMD5Password");
  var Rr2 = $r2;
  T.AuthenticationMD5Password = Rr2;
  var Vr2 = class Vr {
    static {
      __name(this, "Vr");
    }
    constructor(e, t, n) {
      this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
    }
  };
  a(
    Vr2,
    "BackendKeyDataMessage"
  );
  var Fr2 = Vr2;
  T.BackendKeyDataMessage = Fr2;
  var Kr = class Kr {
    static {
      __name(this, "Kr");
    }
    constructor(e, t, n, i) {
      this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
    }
  };
  a(Kr, "NotificationResponseMessage");
  var Mr2 = Kr;
  T.NotificationResponseMessage = Mr2;
  var zr2 = class zr {
    static {
      __name(this, "zr");
    }
    constructor(e, t) {
      this.length = e, this.status = t, this.name = "readyForQuery";
    }
  };
  a(zr2, "ReadyForQueryMessage");
  var Dr2 = zr2;
  T.ReadyForQueryMessage = Dr2;
  var Yr2 = class Yr {
    static {
      __name(this, "Yr");
    }
    constructor(e, t) {
      this.length = e, this.text = t, this.name = "commandComplete";
    }
  };
  a(Yr2, "CommandCompleteMessage");
  var kr2 = Yr2;
  T.CommandCompleteMessage = kr2;
  var Zr = class Zr {
    static {
      __name(this, "Zr");
    }
    constructor(e, t) {
      this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
    }
  };
  a(Zr, "DataRowMessage");
  var Ur2 = Zr;
  T.DataRowMessage = Ur2;
  var Jr = class Jr {
    static {
      __name(this, "Jr");
    }
    constructor(e, t) {
      this.length = e, this.message = t, this.name = "notice";
    }
  };
  a(Jr, "NoticeMessage");
  var Or2 = Jr;
  T.NoticeMessage = Or2;
});
var bs2 = I2((xt2) => {
  "use strict";
  p();
  Object.defineProperty(xt2, "__esModule", { value: true });
  xt2.Writer = void 0;
  var tn2 = class tn {
    static {
      __name(this, "tn");
    }
    constructor(e = 256) {
      this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = y2.allocUnsafe(e);
    }
    ensure(e) {
      var t = this.buffer.length - this.offset;
      if (t < e) {
        var n = this.buffer, i = n.length + (n.length >> 1) + e;
        this.buffer = y2.allocUnsafe(
          i
        ), n.copy(this.buffer);
      }
    }
    addInt32(e) {
      return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addInt16(e) {
      return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addCString(e) {
      if (!e) this.ensure(1);
      else {
        var t = y2.byteLength(e);
        this.ensure(t + 1), this.buffer.write(
          e,
          this.offset,
          "utf-8"
        ), this.offset += t;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e = "") {
      var t = y2.byteLength(e);
      return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
    }
    add(e) {
      return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
    }
    join(e) {
      if (e) {
        this.buffer[this.headerPosition] = e;
        let t = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(t, this.headerPosition + 1);
      }
      return this.buffer.slice(e ? 0 : 5, this.offset);
    }
    flush(e) {
      var t = this.join(e);
      return this.offset = 5, this.headerPosition = 0, this.buffer = y2.allocUnsafe(this.size), t;
    }
  };
  a(tn2, "Writer");
  var en2 = tn2;
  xt2.Writer = en2;
});
var xs2 = I2((vt2) => {
  "use strict";
  p();
  Object.defineProperty(vt2, "__esModule", { value: true });
  vt2.serialize = void 0;
  var rn2 = bs2(), M2 = new rn2.Writer(), Uu2 = a((r) => {
    M2.addInt16(3).addInt16(
      0
    );
    for (let n of Object.keys(r)) M2.addCString(n).addCString(r[n]);
    M2.addCString("client_encoding").addCString("UTF8");
    var e = M2.addCString("").flush(), t = e.length + 4;
    return new rn2.Writer().addInt32(t).add(e).flush();
  }, "startup"), Ou2 = a(() => {
    let r = y2.allocUnsafe(8);
    return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
  }, "requestSsl"), Nu2 = a((r) => M2.addCString(r).flush(112), "password"), qu2 = a(function(r, e) {
    return M2.addCString(r).addInt32(
      y2.byteLength(e)
    ).addString(e), M2.flush(112);
  }, "sendSASLInitialResponseMessage"), Qu = a(
    function(r) {
      return M2.addString(r).flush(112);
    },
    "sendSCRAMClientFinalMessage"
  ), ju2 = a(
    (r) => M2.addCString(r).flush(81),
    "query"
  ), Ss2 = [], Wu = a((r) => {
    let e = r.name || "";
    e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t = r.types || Ss2;
    for (var n = t.length, i = M2.addCString(e).addCString(r.text).addInt16(n), s = 0; s < n; s++) i.addInt32(t[s]);
    return M2.flush(80);
  }, "parse"), Oe2 = new rn2.Writer(), Hu = a(function(r, e) {
    for (let t = 0; t < r.length; t++) {
      let n = e ? e(r[t], t) : r[t];
      n == null ? (M2.addInt16(0), Oe2.addInt32(-1)) : n instanceof y2 ? (M2.addInt16(1), Oe2.addInt32(n.length), Oe2.add(n)) : (M2.addInt16(0), Oe2.addInt32(y2.byteLength(
        n
      )), Oe2.addString(n));
    }
  }, "writeValues"), Gu = a((r = {}) => {
    let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || Ss2, s = i.length;
    return M2.addCString(e).addCString(t), M2.addInt16(s), Hu(i, r.valueMapper), M2.addInt16(s), M2.add(Oe2.flush()), M2.addInt16(n ? 1 : 0), M2.flush(66);
  }, "bind"), $u2 = y2.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Vu2 = a((r) => {
    if (!r || !r.portal && !r.rows) return $u2;
    let e = r.portal || "", t = r.rows || 0, n = y2.byteLength(e), i = 4 + n + 1 + 4, s = y2.allocUnsafe(1 + i);
    return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
  }, "execute"), Ku2 = a((r, e) => {
    let t = y2.allocUnsafe(16);
    return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
      r,
      8
    ), t.writeInt32BE(e, 12), t;
  }, "cancel"), nn2 = a(
    (r, e) => {
      let n = 4 + y2.byteLength(e) + 1, i = y2.allocUnsafe(1 + n);
      return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
    },
    "cstringMessage"
  ), zu2 = M2.addCString("P").flush(68), Yu = M2.addCString("S").flush(68), Zu = a((r) => r.name ? nn2(68, `${r.type}${r.name || ""}`) : r.type === "P" ? zu2 : Yu, "describe"), Ju = a(
    (r) => {
      let e = `${r.type}${r.name || ""}`;
      return nn2(67, e);
    },
    "close"
  ), Xu = a((r) => M2.add(r).flush(
    100
  ), "copyData"), ec = a((r) => nn2(102, r), "copyFail"), Et2 = a((r) => y2.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), tc = Et2(72), rc = Et2(83), nc = Et2(88), ic = Et2(99), sc2 = {
    startup: Uu2,
    password: Nu2,
    requestSsl: Ou2,
    sendSASLInitialResponseMessage: qu2,
    sendSCRAMClientFinalMessage: Qu,
    query: ju2,
    parse: Wu,
    bind: Gu,
    execute: Vu2,
    describe: Zu,
    close: Ju,
    flush: a(() => tc, "flush"),
    sync: a(
      () => rc,
      "sync"
    ),
    end: a(() => nc, "end"),
    copyData: Xu,
    copyDone: a(() => ic, "copyDone"),
    copyFail: ec,
    cancel: Ku2
  };
  vt2.serialize = sc2;
});
var Es2 = I2((_t2) => {
  "use strict";
  p();
  Object.defineProperty(_t2, "__esModule", { value: true });
  _t2.BufferReader = void 0;
  var oc = y2.allocUnsafe(0), on2 = class on {
    static {
      __name(this, "on");
    }
    constructor(e = 0) {
      this.offset = e, this.buffer = oc, this.encoding = "utf-8";
    }
    setBuffer(e, t) {
      this.offset = e, this.buffer = t;
    }
    int16() {
      let e = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, e;
    }
    byte() {
      let e = this.buffer[this.offset];
      return this.offset++, e;
    }
    int32() {
      let e = this.buffer.readInt32BE(this.offset);
      return this.offset += 4, e;
    }
    string(e) {
      let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
      return this.offset += e, t;
    }
    cstring() {
      let e = this.offset, t = e;
      for (; this.buffer[t++] !== 0; ) ;
      return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
    }
    bytes(e) {
      let t = this.buffer.slice(this.offset, this.offset + e);
      return this.offset += e, t;
    }
  };
  a(on2, "BufferReader");
  var sn2 = on2;
  _t2.BufferReader = sn2;
});
var As2 = I2((At2) => {
  "use strict";
  p();
  Object.defineProperty(At2, "__esModule", { value: true });
  At2.Parser = void 0;
  var D = Xr(), ac2 = Es2(), an2 = 1, uc = 4, vs2 = an2 + uc, _s2 = y2.allocUnsafe(0), cn2 = class cn {
    static {
      __name(this, "cn");
    }
    constructor(e) {
      if (this.buffer = _s2, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new ac2.BufferReader(), e?.mode === "binary") throw new Error("Binary mode not supported yet");
      this.mode = e?.mode || "text";
    }
    parse(e, t) {
      this.mergeBuffer(e);
      let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
      for (; i + vs2 <= n; ) {
        let s = this.buffer[i], o = this.buffer.readUInt32BE(
          i + an2
        ), u = an2 + o;
        if (u + i <= n) {
          let c = this.handlePacket(i + vs2, s, o, this.buffer);
          t(c), i += u;
        } else
          break;
      }
      i === n ? (this.buffer = _s2, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
    }
    mergeBuffer(e) {
      if (this.bufferLength > 0) {
        let t = this.bufferLength + e.byteLength;
        if (t + this.bufferOffset > this.buffer.byteLength) {
          let i;
          if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) i = this.buffer;
          else {
            let s = this.buffer.byteLength * 2;
            for (; t >= s; ) s *= 2;
            i = y2.allocUnsafe(s);
          }
          this.buffer.copy(
            i,
            0,
            this.bufferOffset,
            this.bufferOffset + this.bufferLength
          ), this.buffer = i, this.bufferOffset = 0;
        }
        e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
      } else this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
    }
    handlePacket(e, t, n, i) {
      switch (t) {
        case 50:
          return D.bindComplete;
        case 49:
          return D.parseComplete;
        case 51:
          return D.closeComplete;
        case 110:
          return D.noData;
        case 115:
          return D.portalSuspended;
        case 99:
          return D.copyDone;
        case 87:
          return D.replicationStart;
        case 73:
          return D.emptyQuery;
        case 68:
          return this.parseDataRowMessage(
            e,
            n,
            i
          );
        case 67:
          return this.parseCommandCompleteMessage(e, n, i);
        case 90:
          return this.parseReadyForQueryMessage(e, n, i);
        case 65:
          return this.parseNotificationMessage(
            e,
            n,
            i
          );
        case 82:
          return this.parseAuthenticationResponse(e, n, i);
        case 83:
          return this.parseParameterStatusMessage(e, n, i);
        case 75:
          return this.parseBackendKeyData(e, n, i);
        case 69:
          return this.parseErrorMessage(e, n, i, "error");
        case 78:
          return this.parseErrorMessage(
            e,
            n,
            i,
            "notice"
          );
        case 84:
          return this.parseRowDescriptionMessage(e, n, i);
        case 116:
          return this.parseParameterDescriptionMessage(e, n, i);
        case 71:
          return this.parseCopyInMessage(
            e,
            n,
            i
          );
        case 72:
          return this.parseCopyOutMessage(e, n, i);
        case 100:
          return this.parseCopyData(
            e,
            n,
            i
          );
        default:
          return new D.DatabaseError("received invalid response: " + t.toString(
            16
          ), n, "error");
      }
    }
    parseReadyForQueryMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.string(1);
      return new D.ReadyForQueryMessage(t, i);
    }
    parseCommandCompleteMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring();
      return new D.CommandCompleteMessage(
        t,
        i
      );
    }
    parseCopyData(e, t, n) {
      let i = n.slice(e, e + (t - 4));
      return new D.CopyDataMessage(
        t,
        i
      );
    }
    parseCopyInMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyInResponse");
    }
    parseCopyOutMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyOutResponse");
    }
    parseCopyMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new D.CopyResponse(t, i, s, o);
      for (let c = 0; c < o; c++) u.columnTypes[c] = this.reader.int16();
      return u;
    }
    parseNotificationMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
      return new D.NotificationResponseMessage(t, i, s, o);
    }
    parseRowDescriptionMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new D.RowDescriptionMessage(t, i);
      for (let o = 0; o < i; o++) s.fields[o] = this.parseField();
      return s;
    }
    parseField() {
      let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
      return new D.Field(e, t, n, i, s, o, u);
    }
    parseParameterDescriptionMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int16(), s = new D.ParameterDescriptionMessage(t, i);
      for (let o = 0; o < i; o++) s.dataTypeIDs[o] = this.reader.int32();
      return s;
    }
    parseDataRowMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new Array(i);
      for (let o = 0; o < i; o++) {
        let u = this.reader.int32();
        s[o] = u === -1 ? null : this.reader.string(u);
      }
      return new D.DataRowMessage(
        t,
        s
      );
    }
    parseParameterStatusMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring(), s = this.reader.cstring();
      return new D.ParameterStatusMessage(t, i, s);
    }
    parseBackendKeyData(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.int32();
      return new D.BackendKeyDataMessage(t, i, s);
    }
    parseAuthenticationResponse(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = { name: "authenticationOk", length: t };
      switch (i) {
        case 0:
          break;
        case 3:
          s.length === 8 && (s.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (s.length === 12) {
            s.name = "authenticationMD5Password";
            let u = this.reader.bytes(4);
            return new D.AuthenticationMD5Password(t, u);
          }
          break;
        case 10:
          s.name = "authenticationSASL", s.mechanisms = [];
          let o;
          do
            o = this.reader.cstring(), o && s.mechanisms.push(o);
          while (o);
          break;
        case 11:
          s.name = "authenticationSASLContinue", s.data = this.reader.string(t - 8);
          break;
        case 12:
          s.name = "authenticationSASLFinal", s.data = this.reader.string(t - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + i);
      }
      return s;
    }
    parseErrorMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = {}, o = this.reader.string(1);
      for (; o !== "\0"; ) s[o] = this.reader.cstring(), o = this.reader.string(1);
      let u = s.M, c = i === "notice" ? new D.NoticeMessage(
        t,
        u
      ) : new D.DatabaseError(u, t, i);
      return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
    }
  };
  a(cn2, "Parser");
  var un2 = cn2;
  At2.Parser = un2;
});
var hn2 = I2((be2) => {
  "use strict";
  p();
  Object.defineProperty(be2, "__esModule", { value: true });
  be2.DatabaseError = be2.serialize = be2.parse = void 0;
  var cc2 = Xr();
  Object.defineProperty(
    be2,
    "DatabaseError",
    { enumerable: true, get: a(function() {
      return cc2.DatabaseError;
    }, "get") }
  );
  var hc2 = xs2();
  Object.defineProperty(be2, "serialize", { enumerable: true, get: a(function() {
    return hc2.serialize;
  }, "get") });
  var lc2 = As2();
  function fc2(r, e) {
    let t = new lc2.Parser();
    return r.on("data", (n) => t.parse(n, e)), new Promise((n) => r.on("end", () => n()));
  }
  __name(fc2, "fc");
  a(fc2, "parse");
  be2.parse = fc2;
});
var Cs2 = {};
se2(Cs2, { connect: /* @__PURE__ */ __name(() => pc2, "connect") });
function pc2({ socket: r, servername: e }) {
  return r.startTls(e), r;
}
__name(pc2, "pc");
var Ts2 = z(() => {
  "use strict";
  p();
  a(pc2, "connect");
});
var pn2 = I2((of, Bs2) => {
  "use strict";
  p();
  var Is2 = (St2(), O(ws2)), dc2 = ge2().EventEmitter, {
    parse: yc,
    serialize: q2
  } = hn2(), Ps2 = q2.flush(), mc2 = q2.sync(), gc2 = q2.end(), fn2 = class fn extends dc2 {
    static {
      __name(this, "fn");
    }
    constructor(e) {
      super(), e = e || {}, this.stream = e.stream || new Is2.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
      var t = this;
      this.on("newListener", function(n) {
        n === "message" && (t._emitMessage = true);
      });
    }
    connect(e, t) {
      var n = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
        e,
        t
      ), this.stream.once("connect", function() {
        n._keepAlive && n.stream.setKeepAlive(
          true,
          n._keepAliveInitialDelayMillis
        ), n.emit("connect");
      });
      let i = a(function(s) {
        n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
      }, "reportStreamError");
      if (this.stream.on("error", i), this.stream.on("close", function() {
        n.emit("end");
      }), !this.ssl) return this.attachListeners(this.stream);
      this.stream.once("data", function(s) {
        var o = s.toString("utf8");
        switch (o) {
          case "S":
            break;
          case "N":
            return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
          default:
            return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var u = (Ts2(), O(Cs2));
        let c = { socket: n.stream };
        n.ssl !== true && (Object.assign(
          c,
          n.ssl
        ), "key" in n.ssl && (c.key = n.ssl.key)), Is2.isIP(t) === 0 && (c.servername = t);
        try {
          n.stream = u.connect(c);
        } catch (h) {
          return n.emit("error", h);
        }
        n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
      });
    }
    attachListeners(e) {
      e.on("end", () => {
        this.emit("end");
      }), yc(e, (t) => {
        var n = t.name === "error" ? "errorMessage" : t.name;
        this._emitMessage && this.emit("message", t), this.emit(n, t);
      });
    }
    requestSsl() {
      this.stream.write(q2.requestSsl());
    }
    startup(e) {
      this.stream.write(q2.startup(e));
    }
    cancel(e, t) {
      this._send(q2.cancel(e, t));
    }
    password(e) {
      this._send(q2.password(e));
    }
    sendSASLInitialResponseMessage(e, t) {
      this._send(q2.sendSASLInitialResponseMessage(
        e,
        t
      ));
    }
    sendSCRAMClientFinalMessage(e) {
      this._send(q2.sendSCRAMClientFinalMessage(e));
    }
    _send(e) {
      return this.stream.writable ? this.stream.write(e) : false;
    }
    query(e) {
      this._send(q2.query(
        e
      ));
    }
    parse(e) {
      this._send(q2.parse(e));
    }
    bind(e) {
      this._send(q2.bind(e));
    }
    execute(e) {
      this._send(q2.execute(e));
    }
    flush() {
      this.stream.writable && this.stream.write(Ps2);
    }
    sync() {
      this._ending = true, this._send(Ps2), this._send(mc2);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      if (this._ending = true, !this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(gc2, () => {
        this.stream.end();
      });
    }
    close(e) {
      this._send(q2.close(e));
    }
    describe(e) {
      this._send(q2.describe(e));
    }
    sendCopyFromChunk(e) {
      this._send(q2.copyData(e));
    }
    endCopyFrom() {
      this._send(q2.copyDone());
    }
    sendCopyFail(e) {
      this._send(q2.copyFail(e));
    }
  };
  a(fn2, "Connection");
  var ln2 = fn2;
  Bs2.exports = ln2;
});
var Fs2 = I2((hf, Rs2) => {
  "use strict";
  p();
  var wc2 = ge2().EventEmitter, cf = (Ge2(), O(He2)), bc2 = tt2(), dn2 = ji2(), Sc2 = Xi2(), xc2 = wt2(), Ec2 = bt2(), Ls2 = ys2(), vc2 = et2(), _c2 = pn2(), yn2 = class yn extends wc2 {
    static {
      __name(this, "yn");
    }
    constructor(e) {
      super(), this.connectionParameters = new Ec2(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
      var t = e || {};
      this._Promise = t.Promise || S.Promise, this._types = new xc2(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new _c2({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || vc2.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e) {
      let t = a(
        (n) => {
          m2.nextTick(() => {
            n.handleError(e, this.connection);
          });
        },
        "enqueueError"
      );
      this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
    }
    _connect(e) {
      var t = this, n = this.connection;
      if (this._connectionCallback = e, this._connecting || this._connected) {
        let i = new Error("Client has already been connected. You cannot reuse a client.");
        m2.nextTick(() => {
          e(i);
        });
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n._ending = true, n.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
        t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
      }), n.on("sslconnect", function() {
        n.startup(t.getStartupConf());
      }), this._attachListeners(n), n.once("end", () => {
        let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
          i
        )), m2.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(e) {
      if (e) {
        this._connect(e);
        return;
      }
      return new this._Promise((t, n) => {
        this._connect((i) => {
          i ? n(i) : t();
        });
      });
    }
    _attachListeners(e) {
      e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
        "errorMessage",
        this._handleErrorMessage.bind(this)
      ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
        "emptyQuery",
        this._handleEmptyQuery.bind(this)
      ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e) {
      let t = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(
        () => this.password()
      ).then((n) => {
        if (n !== void 0) {
          if (typeof n != "string") {
            t.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = n;
        } else this.connectionParameters.password = this.password = null;
        e();
      }).catch((n) => {
        t.emit("error", n);
      }) : this.password !== null ? e() : Sc2(
        this.connectionParameters,
        (n) => {
          n !== void 0 && (this.connectionParameters.password = this.password = n), e();
        }
      );
    }
    _handleAuthCleartextPassword(e) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(e) {
      this._checkPgPass(() => {
        let t = bc2.postgresMd5PasswordHash(
          this.user,
          this.password,
          e.salt
        );
        this.connection.password(t);
      });
    }
    _handleAuthSASL(e) {
      this._checkPgPass(() => {
        this.saslSession = dn2.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e) {
      dn2.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
        this.saslSession.response
      );
    }
    _handleAuthSASLFinal(e) {
      dn2.finalizeSession(
        this.saslSession,
        e.data
      ), this.saslSession = null;
    }
    _handleBackendKeyData(e) {
      this.processID = e.processID, this.secretKey = e.secretKey;
    }
    _handleReadyForQuery(e) {
      this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: t } = this;
      this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(e) {
      if (!this._connectionError) {
        if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback) return this._connectionCallback(e);
        this.emit("error", e);
      }
    }
    _handleErrorEvent(e) {
      if (this._connecting) return this._handleErrorWhileConnecting(e);
      this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
    }
    _handleErrorMessage(e) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(e);
      let t = this.activeQuery;
      if (!t) {
        this._handleErrorEvent(
          e
        );
        return;
      }
      this.activeQuery = null, t.handleError(e, this.connection);
    }
    _handleRowDescription(e) {
      this.activeQuery.handleRowDescription(e);
    }
    _handleDataRow(e) {
      this.activeQuery.handleDataRow(
        e
      );
    }
    _handlePortalSuspended(e) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(e) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(e) {
      this.activeQuery.handleCommandComplete(e, this.connection);
    }
    _handleParseComplete(e) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(e) {
      this.activeQuery.handleCopyInResponse(
        this.connection
      );
    }
    _handleCopyData(e) {
      this.activeQuery.handleCopyData(e, this.connection);
    }
    _handleNotification(e) {
      this.emit("notification", e);
    }
    _handleNotice(e) {
      this.emit("notice", e);
    }
    getStartupConf() {
      var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
      return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
        e.statement_timeout,
        10
      ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
        e.idle_in_transaction_session_timeout,
        10
      ))), e.options && (t.options = e.options), t;
    }
    cancel(e, t) {
      if (e.activeQuery === t) {
        var n = this.connection;
        this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
          n.cancel(
            e.processID,
            e.secretKey
          );
        });
      } else e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
    }
    setTypeParser(e, t, n) {
      return this._types.setTypeParser(e, t, n);
    }
    getTypeParser(e, t) {
      return this._types.getTypeParser(e, t);
    }
    escapeIdentifier(e) {
      return '"' + e.replace(
        /"/g,
        '""'
      ) + '"';
    }
    escapeLiteral(e) {
      for (var t = false, n = "'", i = 0; i < e.length; i++) {
        var s = e[i];
        s === "'" ? n += s + s : s === "\\" ? (n += s + s, t = true) : n += s;
      }
      return n += "'", t === true && (n = " E" + n), n;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
        this.readyForQuery = false, this.hasExecuted = true;
        let e = this.activeQuery.submit(this.connection);
        e && m2.nextTick(() => {
          this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
        });
      } else this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(e, t, n) {
      var i, s, o, u, c;
      if (e == null) throw new TypeError("Client was passed a null or undefined query");
      return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Ls2(
        e,
        t,
        n
      ), i.callback || (s = new this._Promise((h, l) => {
        i.callback = (d, b2) => d ? l(d) : h(b2);
      }))), o && (c = i.callback, u = setTimeout(() => {
        var h = new Error("Query read timeout");
        m2.nextTick(
          () => {
            i.handleError(h, this.connection);
          }
        ), c(h), i.callback = () => {
        };
        var l = this.queryQueue.indexOf(i);
        l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
      }, o), i.callback = (h, l) => {
        clearTimeout(u), c(h, l);
      }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m2.nextTick(() => {
        i.handleError(
          new Error("Client was closed and is not queryable"),
          this.connection
        );
      }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m2.nextTick(
        () => {
          i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        }
      ), s);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(e) {
      if (this._ending = true, !this.connection._connecting) if (e) e();
      else return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e) this.connection.once("end", e);
      else return new this._Promise((t) => {
        this.connection.once("end", t);
      });
    }
  };
  a(yn2, "Client");
  var Ct2 = yn2;
  Ct2.Query = Ls2;
  Rs2.exports = Ct2;
});
var Us2 = I2((pf, ks2) => {
  "use strict";
  p();
  var Ac2 = ge2().EventEmitter, Ms2 = a(function() {
  }, "NOOP"), Ds2 = a(
    (r, e) => {
      let t = r.findIndex(e);
      return t === -1 ? void 0 : r.splice(t, 1)[0];
    },
    "removeWhere"
  ), wn2 = class wn {
    static {
      __name(this, "wn");
    }
    constructor(e, t, n) {
      this.client = e, this.idleListener = t, this.timeoutId = n;
    }
  };
  a(wn2, "IdleItem");
  var mn2 = wn2, bn2 = class bn {
    static {
      __name(this, "bn");
    }
    constructor(e) {
      this.callback = e;
    }
  };
  a(bn2, "PendingItem");
  var Ne2 = bn2;
  function Cc2() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  __name(Cc2, "Cc");
  a(Cc2, "throwOnDoubleRelease");
  function Tt2(r, e) {
    if (e) return { callback: e, result: void 0 };
    let t, n, i = a(function(o, u) {
      o ? t(o) : n(u);
    }, "cb"), s = new r(function(o, u) {
      n = o, t = u;
    }).catch((o) => {
      throw Error.captureStackTrace(
        o
      ), o;
    });
    return { callback: i, result: s };
  }
  __name(Tt2, "Tt");
  a(Tt2, "promisify");
  function Tc2(r, e) {
    return a(
      /* @__PURE__ */ __name(function t(n) {
        n.client = e, e.removeListener("error", t), e.on("error", () => {
          r.log("additional client error after disconnection due to error", n);
        }), r._remove(e), r.emit("error", n, e);
      }, "t"),
      "idleListener"
    );
  }
  __name(Tc2, "Tc");
  a(Tc2, "makeIdleListener");
  var Sn2 = class Sn extends Ac2 {
    static {
      __name(this, "Sn");
    }
    constructor(e, t) {
      super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
        this.options,
        "password",
        { configurable: true, enumerable: false, writable: true, value: e.password }
      ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || t || It2().Client, this.Promise = this.options.Promise || S.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log(
          "pulse queue on ending"
        ), this._idle.length && this._idle.slice().map((t) => {
          this._remove(
            t.client
          );
        }), this._clients.length || (this.ended = true, this._endCallback());
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull()) return;
      let e = this._pendingQueue.shift();
      if (this._idle.length) {
        let t = this._idle.pop();
        clearTimeout(t.timeoutId);
        let n = t.client;
        n.ref && n.ref();
        let i = t.idleListener;
        return this._acquireClient(n, e, i, false);
      }
      if (!this._isFull()) return this.newClient(e);
      throw new Error("unexpected condition");
    }
    _remove(e) {
      let t = Ds2(this._idle, (n) => n.client === e);
      t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
    }
    connect(e) {
      if (this.ending) {
        let i = new Error("Cannot use a pool after calling end on the pool");
        return e ? e(i) : this.Promise.reject(
          i
        );
      }
      let t = Tt2(this.Promise, e), n = t.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m2.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new Ne2(t.callback)), n;
        let i = a((u, c, h) => {
          clearTimeout(
            o
          ), t.callback(u, c, h);
        }, "queueCallback"), s = new Ne2(i), o = setTimeout(() => {
          Ds2(
            this._pendingQueue,
            (u) => u.callback === i
          ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return this._pendingQueue.push(s), n;
      }
      return this.newClient(new Ne2(t.callback)), n;
    }
    newClient(e) {
      let t = new this.Client(this.options);
      this._clients.push(t);
      let n = Tc2(this, t);
      this.log("checking client timeout");
      let i, s = false;
      this.options.connectionTimeoutMillis && (i = setTimeout(() => {
        this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
        if (i && clearTimeout(i), t.on("error", n), o) this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
          o,
          void 0,
          Ms2
        );
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                t,
                new Ne2((h, l, d) => d()),
                n,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u.unref(), t.once(
              "end",
              () => clearTimeout(u)
            );
          }
          return this._acquireClient(t, e, n, true);
        }
      });
    }
    _acquireClient(e, t, n, i) {
      i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
        e,
        e.release
      ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
        if (s) return e.release(s), t.callback(s, void 0, Ms2);
        t.callback(void 0, e, e.release);
      }) : t.callback(
        void 0,
        e,
        e.release
      );
    }
    _releaseOnce(e, t) {
      let n = false;
      return (i) => {
        n && Cc2(), n = true, this._release(
          e,
          t,
          i
        );
      };
    }
    _release(e, t, n) {
      if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
        e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
        return;
      }
      if (this._expired.has(e)) {
        this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
        return;
      }
      let s;
      this.options.idleTimeoutMillis && (s = setTimeout(() => {
        this.log("remove idle client"), this._remove(e);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new mn2(e, t, s)), this._pulseQueue();
    }
    query(e, t, n) {
      if (typeof e == "function") {
        let s = Tt2(this.Promise, e);
        return x2(function() {
          return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s.result;
      }
      typeof t == "function" && (n = t, t = void 0);
      let i = Tt2(this.Promise, n);
      return n = i.callback, this.connect((s, o) => {
        if (s)
          return n(s);
        let u = false, c = a((h) => {
          u || (u = true, o.release(h), n(h));
        }, "onError");
        o.once("error", c), this.log("dispatching query");
        try {
          o.query(e, t, (h, l) => {
            if (this.log("query dispatched"), o.removeListener("error", c), !u) return u = true, o.release(h), h ? n(h) : n(
              void 0,
              l
            );
          });
        } catch (h) {
          return o.release(h), n(h);
        }
      }), i.result;
    }
    end(e) {
      if (this.log("ending"), this.ending) {
        let n = new Error("Called end on pool more than once");
        return e ? e(n) : this.Promise.reject(n);
      }
      this.ending = true;
      let t = Tt2(this.Promise, e);
      return this._endCallback = t.callback, this._pulseQueue(), t.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  };
  a(Sn2, "Pool");
  var gn2 = Sn2;
  ks2.exports = gn2;
});
var Os2 = {};
se2(Os2, { default: /* @__PURE__ */ __name(() => Ic2, "default") });
var Ic2;
var Ns2 = z(() => {
  "use strict";
  p();
  Ic2 = {};
});
var qs2 = I2((gf, Pc2) => {
  Pc2.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
    "buffer-writer": "2.0.0",
    "packet-reader": "1.0.0",
    "pg-connection-string": "^2.5.0",
    "pg-pool": "^3.5.2",
    "pg-protocol": "^1.5.0",
    "pg-types": "^2.1.0",
    pgpass: "1.x"
  }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
    "pg-native": { optional: true }
  }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
});
var Ws2 = I2((wf, js2) => {
  "use strict";
  p();
  var Qs2 = ge2().EventEmitter, Bc2 = (Ge2(), O(He2)), xn2 = tt2(), qe2 = js2.exports = function(r, e, t) {
    Qs2.call(this), r = xn2.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
      n === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  Bc2.inherits(
    qe2,
    Qs2
  );
  var Lc2 = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  qe2.prototype.handleError = function(r) {
    var e = this.native.pq.resultErrorFields();
    if (e) for (var t in e) {
      var n = Lc2[t] || t;
      r[n] = e[t];
    }
    this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
  };
  qe2.prototype.then = function(r, e) {
    return this._getPromise().then(r, e);
  };
  qe2.prototype.catch = function(r) {
    return this._getPromise().catch(r);
  };
  qe2.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
      this._once("end", r), this._once(
        "error",
        e
      );
    }.bind(this)), this._promise);
  };
  qe2.prototype.submit = function(r) {
    this.state = "running";
    var e = this;
    this.native = r.native, r.native.arrayMode = this._arrayMode;
    var t = a(
      function(s, o, u) {
        if (r.native.arrayMode = false, x2(function() {
          e.emit("_done");
        }), s) return e.handleError(s);
        e._emitRowEvents && (u.length > 1 ? o.forEach((c, h) => {
          c.forEach((l) => {
            e.emit(
              "row",
              l,
              u[h]
            );
          });
        }) : o.forEach(function(c) {
          e.emit("row", c, u);
        })), e.state = "end", e.emit(
          "end",
          u
        ), e.callback && e.callback(null, u);
      },
      "after"
    );
    if (m2.domain && (t = m2.domain.bind(
      t
    )), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
        "You supplied %s (%s)",
        this.name,
        this.name.length
      ), console.error("This can cause conflicts and silent errors executing queries"));
      var n = (this.values || []).map(xn2.prepareValue);
      if (r.namedQueries[this.name]) {
        if (this.text && r.namedQueries[this.name] !== this.text) {
          let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t(s);
        }
        return r.native.execute(this.name, n, t);
      }
      return r.native.prepare(
        this.name,
        this.text,
        n.length,
        function(s) {
          return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
        }
      );
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        let s = new Error("Query values must be an array");
        return t(s);
      }
      var i = this.values.map(xn2.prepareValue);
      r.native.query(this.text, i, t);
    } else r.native.query(this.text, t);
  };
});
var Vs2 = I2((Ef, $s) => {
  "use strict";
  p();
  var Rc2 = (Ns2(), O(Os2)), Fc2 = wt2(), xf = qs2(), Hs2 = ge2().EventEmitter, Mc2 = (Ge2(), O(He2)), Dc2 = bt2(), Gs2 = Ws2(), J2 = $s.exports = function(r) {
    Hs2.call(this), r = r || {}, this._Promise = r.Promise || S.Promise, this._types = new Fc2(r.types), this.native = new Rc2({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e = this.connectionParameters = new Dc2(
      r
    );
    this.user = e.user, Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: e.password
    }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
  };
  J2.Query = Gs2;
  Mc2.inherits(J2, Hs2);
  J2.prototype._errorAllQueries = function(r) {
    let e = a(
      (t) => {
        m2.nextTick(() => {
          t.native = this.native, t.handleError(r);
        });
      },
      "enqueueError"
    );
    this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
  };
  J2.prototype._connect = function(r) {
    var e = this;
    if (this._connecting) {
      m2.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
      if (t) return r(
        t
      );
      e.native.connect(n, function(i) {
        if (i) return e.native.end(), r(i);
        e._connected = true, e.native.on("error", function(s) {
          e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
        }), e.native.on("notification", function(s) {
          e.emit("notification", { channel: s.relname, payload: s.extra });
        }), e.emit("connect"), e._pulseQueryQueue(true), r();
      });
    });
  };
  J2.prototype.connect = function(r) {
    if (r) {
      this._connect(r);
      return;
    }
    return new this._Promise(
      (e, t) => {
        this._connect((n) => {
          n ? t(n) : e();
        });
      }
    );
  };
  J2.prototype.query = function(r, e, t) {
    var n, i, s, o, u;
    if (r == null) throw new TypeError("Client was passed a null or undefined query");
    if (typeof r.submit == "function") s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
    else if (s = this.connectionParameters.query_timeout, n = new Gs2(r, e, t), !n.callback) {
      let c, h;
      i = new this._Promise((l, d) => {
        c = l, h = d;
      }), n.callback = (l, d) => l ? h(l) : c(d);
    }
    return s && (u = n.callback, o = setTimeout(() => {
      var c = new Error("Query read timeout");
      m2.nextTick(() => {
        n.handleError(c, this.connection);
      }), u(c), n.callback = () => {
      };
      var h = this._queryQueue.indexOf(n);
      h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
    }, s), n.callback = (c, h) => {
      clearTimeout(o), u(c, h);
    }), this._queryable ? this._ending ? (n.native = this.native, m2.nextTick(() => {
      n.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i) : (this._queryQueue.push(
      n
    ), this._pulseQueryQueue(), i) : (n.native = this.native, m2.nextTick(() => {
      n.handleError(
        new Error("Client has encountered a connection error and is not queryable")
      );
    }), i);
  };
  J2.prototype.end = function(r) {
    var e = this;
    this._ending = true, this._connected || this.once(
      "connect",
      this.end.bind(this, r)
    );
    var t;
    return r || (t = new this._Promise(function(n, i) {
      r = a((s) => s ? i(s) : n(), "cb");
    })), this.native.end(function() {
      e._errorAllQueries(new Error(
        "Connection terminated"
      )), m2.nextTick(() => {
        e.emit("end"), r && r();
      });
    }), t;
  };
  J2.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  J2.prototype._pulseQueryQueue = function(r) {
    if (this._connected && !this._hasActiveQuery()) {
      var e = this._queryQueue.shift();
      if (!e) {
        r || this.emit("drain");
        return;
      }
      this._activeQuery = e, e.submit(this);
      var t = this;
      e.once(
        "_done",
        function() {
          t._pulseQueryQueue();
        }
      );
    }
  };
  J2.prototype.cancel = function(r) {
    this._activeQuery === r ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
  };
  J2.prototype.ref = function() {
  };
  J2.prototype.unref = function() {
  };
  J2.prototype.setTypeParser = function(r, e, t) {
    return this._types.setTypeParser(r, e, t);
  };
  J2.prototype.getTypeParser = function(r, e) {
    return this._types.getTypeParser(r, e);
  };
});
var En2 = I2((Af, Ks2) => {
  "use strict";
  p();
  Ks2.exports = Vs2();
});
var It2 = I2((Tf, nt2) => {
  "use strict";
  p();
  var kc2 = Fs2(), Uc2 = et2(), Oc2 = pn2(), Nc2 = Us2(), { DatabaseError: qc2 } = hn2(), Qc2 = a((r) => {
    var e;
    return e = class extends Nc2 {
      static {
        __name(this, "e");
      }
      constructor(n) {
        super(n, r);
      }
    }, a(e, "BoundPool"), e;
  }, "poolFactory"), vn2 = a(function(r) {
    this.defaults = Uc2, this.Client = r, this.Query = this.Client.Query, this.Pool = Qc2(this.Client), this._pools = [], this.Connection = Oc2, this.types = Xe2(), this.DatabaseError = qc2;
  }, "PG");
  typeof m2.env.NODE_PG_FORCE_NATIVE < "u" ? nt2.exports = new vn2(En2()) : (nt2.exports = new vn2(kc2), Object.defineProperty(nt2.exports, "native", { configurable: true, enumerable: false, get() {
    var r = null;
    try {
      r = new vn2(En2());
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") throw e;
    }
    return Object.defineProperty(nt2.exports, "native", { value: r }), r;
  } }));
});
p();
var Bt = Te2(It2());
St2();
p();
St2();
mr2();
var Zs2 = Te2(tt2());
var Js2 = Te2(wt2());
function jc2(r) {
  return r instanceof y2 ? "\\x" + r.toString("hex") : r;
}
__name(jc2, "jc");
a(jc2, "encodeBuffersAsBytea");
var Pt2 = class Pt3 extends Error {
  static {
    __name(this, "Pt");
  }
  constructor(t) {
    super(t);
    _(
      this,
      "name",
      "NeonDbError"
    );
    _(this, "severity");
    _(this, "code");
    _(this, "detail");
    _(this, "hint");
    _(this, "position");
    _(this, "internalPosition");
    _(this, "internalQuery");
    _(this, "where");
    _(this, "schema");
    _(this, "table");
    _(this, "column");
    _(this, "dataType");
    _(
      this,
      "constraint"
    );
    _(this, "file");
    _(this, "line");
    _(this, "routine");
    _(this, "sourceError");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Pt3);
  }
};
a(Pt2, "NeonDbError");
var pe2 = Pt2;
var zs2 = "transaction() expects an array of queries, or a function returning an array of queries";
var Wc2 = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Xs2(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
  deferrable: o,
  queryCallback: u,
  resultCallback: c,
  authToken: h
} = {}) {
  if (!r) throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let l;
  try {
    l = yr2(r);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r));
  }
  let { protocol: d, username: b2, hostname: C, port: B2, pathname: Q } = l;
  if (d !== "postgres:" && d !== "postgresql:" || !b2 || !C || !Q) throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function X2(A2, ...g) {
    let P2, K2;
    if (typeof A2 == "string") P2 = A2, K2 = g[1], g = g[0] ?? [];
    else {
      P2 = "";
      for (let j2 = 0; j2 < A2.length; j2++)
        P2 += A2[j2], j2 < g.length && (P2 += "$" + (j2 + 1));
    }
    g = g.map((j2) => jc2((0, Zs2.prepareValue)(j2)));
    let k2 = {
      query: P2,
      params: g
    };
    return u && u(k2), Hc2(de, k2, K2);
  }
  __name(X2, "X");
  a(X2, "resolve"), X2.transaction = async (A2, g) => {
    if (typeof A2 == "function" && (A2 = A2(X2)), !Array.isArray(A2)) throw new Error(zs2);
    A2.forEach(
      (k2) => {
        if (k2[Symbol.toStringTag] !== "NeonQueryPromise") throw new Error(zs2);
      }
    );
    let P2 = A2.map((k2) => k2.parameterizedQuery), K2 = A2.map((k2) => k2.opts ?? {});
    return de(P2, K2, g);
  };
  async function de(A2, g, P2) {
    let { fetchEndpoint: K2, fetchFunction: k2 } = _e2, j2 = Array.isArray(A2) ? { queries: A2 } : A2, ee2 = n ?? {}, oe2 = e ?? false, R2 = t ?? false, $2 = i, ce2 = s, ye2 = o;
    P2 !== void 0 && (P2.fetchOptions !== void 0 && (ee2 = {
      ...ee2,
      ...P2.fetchOptions
    }), P2.arrayMode !== void 0 && (oe2 = P2.arrayMode), P2.fullResults !== void 0 && (R2 = P2.fullResults), P2.isolationLevel !== void 0 && ($2 = P2.isolationLevel), P2.readOnly !== void 0 && (ce2 = P2.readOnly), P2.deferrable !== void 0 && (ye2 = P2.deferrable)), g !== void 0 && !Array.isArray(
      g
    ) && g.fetchOptions !== void 0 && (ee2 = { ...ee2, ...g.fetchOptions });
    let Se2 = h;
    !Array.isArray(
      g
    ) && g?.authToken !== void 0 && (Se2 = g.authToken);
    let je2 = typeof K2 == "function" ? K2(C, B2, { jwtAuth: Se2 !== void 0 }) : K2, he2 = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" }, it2 = await Gc2(Se2);
    it2 && (he2.Authorization = `Bearer ${it2}`), Array.isArray(
      A2
    ) && ($2 !== void 0 && (he2["Neon-Batch-Isolation-Level"] = $2), ce2 !== void 0 && (he2["Neon-Batch-Read-Only"] = String(ce2)), ye2 !== void 0 && (he2["Neon-Batch-Deferrable"] = String(ye2)));
    let te2;
    try {
      te2 = await (k2 ?? fetch)(je2, {
        method: "POST",
        body: JSON.stringify(j2),
        headers: he2,
        ...ee2
      });
    } catch (W2) {
      let H2 = new pe2(`Error connecting to database: ${W2.message}`);
      throw H2.sourceError = W2, H2;
    }
    if (te2.ok) {
      let W2 = await te2.json();
      if (Array.isArray(A2)) {
        let H2 = W2.results;
        if (!Array.isArray(H2)) throw new pe2("Neon internal error: unexpected result format");
        return H2.map((Ae2, xe2) => {
          let Lt2 = g[xe2] ?? {}, ro2 = Lt2.arrayMode ?? oe2, no2 = Lt2.fullResults ?? R2;
          return Ys2(Ae2, {
            arrayMode: ro2,
            fullResults: no2,
            parameterizedQuery: A2[xe2],
            resultCallback: c,
            types: Lt2.types
          });
        });
      } else {
        let H2 = g ?? {}, Ae2 = H2.arrayMode ?? oe2, xe2 = H2.fullResults ?? R2;
        return Ys2(
          W2,
          { arrayMode: Ae2, fullResults: xe2, parameterizedQuery: A2, resultCallback: c, types: H2.types }
        );
      }
    } else {
      let { status: W2 } = te2;
      if (W2 === 400) {
        let H2 = await te2.json(), Ae2 = new pe2(H2.message);
        for (let xe2 of Wc2)
          Ae2[xe2] = H2[xe2] ?? void 0;
        throw Ae2;
      } else {
        let H2 = await te2.text();
        throw new pe2(`Server error (HTTP status ${W2}): ${H2}`);
      }
    }
  }
  __name(de, "de");
  return a(de, "execute"), X2;
}
__name(Xs2, "Xs");
a(Xs2, "neon");
function Hc2(r, e, t) {
  return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t, then: a(
    (n, i) => r(e, t).then(n, i),
    "then"
  ), catch: a((n) => r(e, t).catch(n), "catch"), finally: a((n) => r(
    e,
    t
  ).finally(n), "finally") };
}
__name(Hc2, "Hc");
a(Hc2, "createNeonQueryPromise");
function Ys2(r, {
  arrayMode: e,
  fullResults: t,
  parameterizedQuery: n,
  resultCallback: i,
  types: s
}) {
  let o = new Js2.default(
    s
  ), u = r.fields.map((l) => l.name), c = r.fields.map((l) => o.getTypeParser(l.dataTypeID)), h = e === true ? r.rows.map((l) => l.map((d, b2) => d === null ? null : c[b2](d))) : r.rows.map((l) => Object.fromEntries(
    l.map((d, b2) => [u[b2], d === null ? null : c[b2](d)])
  ));
  return i && i(n, r, h, { arrayMode: e, fullResults: t }), t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = h, r._parsers = c, r._types = o, r) : h;
}
__name(Ys2, "Ys");
a(Ys2, "processQueryResult");
async function Gc2(r) {
  if (typeof r == "string") return r;
  if (typeof r == "function") try {
    return await Promise.resolve(r());
  } catch (e) {
    let t = new pe2("Error getting auth token.");
    throw e instanceof Error && (t = new pe2(`Error getting auth token: ${e.message}`)), t;
  }
}
__name(Gc2, "Gc");
a(Gc2, "getAuthToken");
var to2 = Te2(bt2());
var Qe = Te2(It2());
var An2 = class An3 extends Bt.Client {
  static {
    __name(this, "An");
  }
  constructor(t) {
    super(t);
    this.config = t;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(t) {
    let { neonConfig: n } = this;
    n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || m2.env.PGHOST !== void 0, s = m2.env.USER ?? m2.env.USERNAME;
    if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null) throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
    if (!u && !n.pipelineConnect) return o;
    let h = this.connection;
    if (u && h.on("connect", () => h.stream.emit("data", "S")), c) {
      h.removeAllListeners(
        "authenticationCleartextPassword"
      ), h.removeAllListeners("readyForQuery"), h.once(
        "readyForQuery",
        () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
      );
      let l = this.ssl ? "sslconnect" : "connect";
      h.on(l, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o;
  }
  async _handleAuthSASLContinue(t) {
    let n = this.saslSession, i = this.password, s = t.data;
    if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string") throw new Error("SASL: protocol error");
    let o = Object.fromEntries(s.split(",").map((te2) => {
      if (!/^.=/.test(te2)) throw new Error("SASL: Invalid attribute pair entry");
      let W2 = te2[0], H2 = te2.substring(2);
      return [W2, H2];
    })), u = o.r, c = o.s, h = o.i;
    if (!u || !/^[!-+--~]+$/.test(u)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!h || !/^[1-9][0-9]*$/.test(h)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!u.startsWith(n.clientNonce)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
    );
    if (u.length === n.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let l = parseInt(h, 10), d = y2.from(c, "base64"), b2 = new TextEncoder(), C = b2.encode(i), B2 = await w2.subtle.importKey("raw", C, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), Q = new Uint8Array(await w2.subtle.sign("HMAC", B2, y2.concat([d, y2.from(
      [0, 0, 0, 1]
    )]))), X2 = Q;
    for (var de = 0; de < l - 1; de++) Q = new Uint8Array(await w2.subtle.sign(
      "HMAC",
      B2,
      Q
    )), X2 = y2.from(X2.map((te2, W2) => X2[W2] ^ Q[W2]));
    let A2 = X2, g = await w2.subtle.importKey(
      "raw",
      A2,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), P2 = new Uint8Array(await w2.subtle.sign("HMAC", g, b2.encode("Client Key"))), K2 = await w2.subtle.digest(
      "SHA-256",
      P2
    ), k2 = "n=*,r=" + n.clientNonce, j2 = "r=" + u + ",s=" + c + ",i=" + l, ee2 = "c=biws,r=" + u, oe2 = k2 + "," + j2 + "," + ee2, R2 = await w2.subtle.importKey(
      "raw",
      K2,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var $2 = new Uint8Array(await w2.subtle.sign("HMAC", R2, b2.encode(oe2))), ce2 = y2.from(P2.map((te2, W2) => P2[W2] ^ $2[W2])), ye2 = ce2.toString("base64");
    let Se2 = await w2.subtle.importKey(
      "raw",
      A2,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), je2 = await w2.subtle.sign(
      "HMAC",
      Se2,
      b2.encode("Server Key")
    ), he2 = await w2.subtle.importKey("raw", je2, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var it2 = y2.from(await w2.subtle.sign(
      "HMAC",
      he2,
      b2.encode(oe2)
    ));
    n.message = "SASLResponse", n.serverSignature = it2.toString("base64"), n.response = ee2 + ",p=" + ye2, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
a(An2, "NeonClient");
var _n2 = An2;
function $c2(r, e) {
  if (e) return {
    callback: e,
    result: void 0
  };
  let t, n, i = a(function(o, u) {
    o ? t(o) : n(u);
  }, "cb"), s = new r(function(o, u) {
    n = o, t = u;
  });
  return { callback: i, result: s };
}
__name($c2, "$c");
a($c2, "promisify");
var Cn2 = class Cn3 extends Bt.Pool {
  static {
    __name(this, "Cn");
  }
  constructor() {
    super(...arguments);
    _(this, "Client", _n2);
    _(this, "hasFetchUnsupportedListeners", false);
  }
  on(t, n) {
    return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
  }
  query(t, n, i) {
    if (!_e2.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
      return super.query(t, n, i);
    typeof n == "function" && (i = n, n = void 0);
    let s = $c2(
      this.Promise,
      i
    );
    i = s.callback;
    try {
      let o = new to2.default(this.options), u = encodeURIComponent, c = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, l = typeof t == "string" ? t : t.text, d = n ?? t.values ?? [];
      Xs2(h, { fullResults: true, arrayMode: t.rowMode === "array" })(l, d, { types: t.types ?? this.options?.types }).then((C) => i(void 0, C)).catch((C) => i(
        C
      ));
    } catch (o) {
      i(o);
    }
    return s.result;
  }
};
a(Cn2, "NeonPool");
var export_ClientBase = Qe.ClientBase;
var export_Connection = Qe.Connection;
var export_DatabaseError = Qe.DatabaseError;
var export_Query = Qe.Query;
var export_defaults = Qe.defaults;
var export_types = Qe.types;

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_esm();
var import_debug = __toESM(require_dist(), 1);
function ok(value) {
  return {
    ok: true,
    value,
    map(fn2) {
      return ok(fn2(value));
    },
    flatMap(fn2) {
      return fn2(value);
    }
  };
}
__name(ok, "ok");
function err(error) {
  return {
    ok: false,
    error,
    map() {
      return err(error);
    },
    flatMap() {
      return err(error);
    }
  };
}
__name(err, "err");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};

// node_modules/@prisma/adapter-neon/dist/index.mjs
var import_postgres_array = __toESM(require_postgres_array(), 1);
var name = "@prisma/adapter-neon";
var { builtins: ScalarColumnType, getTypeParser } = export_types;
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var _UnsupportedNativeDataType = class _UnsupportedNativeDataType2 extends Error {
  static {
    __name(this, "_UnsupportedNativeDataType");
  }
  constructor(code) {
    super();
    this.type = _UnsupportedNativeDataType2.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
};
_UnsupportedNativeDataType.typeNames = {
  16: "bool",
  17: "bytea",
  18: "char",
  19: "name",
  20: "int8",
  21: "int2",
  22: "int2vector",
  23: "int4",
  24: "regproc",
  25: "text",
  26: "oid",
  27: "tid",
  28: "xid",
  29: "cid",
  30: "oidvector",
  32: "pg_ddl_command",
  71: "pg_type",
  75: "pg_attribute",
  81: "pg_proc",
  83: "pg_class",
  114: "json",
  142: "xml",
  194: "pg_node_tree",
  269: "table_am_handler",
  325: "index_am_handler",
  600: "point",
  601: "lseg",
  602: "path",
  603: "box",
  604: "polygon",
  628: "line",
  650: "cidr",
  700: "float4",
  701: "float8",
  705: "unknown",
  718: "circle",
  774: "macaddr8",
  790: "money",
  829: "macaddr",
  869: "inet",
  1033: "aclitem",
  1042: "bpchar",
  1043: "varchar",
  1082: "date",
  1083: "time",
  1114: "timestamp",
  1184: "timestamptz",
  1186: "interval",
  1266: "timetz",
  1560: "bit",
  1562: "varbit",
  1700: "numeric",
  1790: "refcursor",
  2202: "regprocedure",
  2203: "regoper",
  2204: "regoperator",
  2205: "regclass",
  2206: "regtype",
  2249: "record",
  2275: "cstring",
  2276: "any",
  2277: "anyarray",
  2278: "void",
  2279: "trigger",
  2280: "language_handler",
  2281: "internal",
  2283: "anyelement",
  2287: "_record",
  2776: "anynonarray",
  2950: "uuid",
  2970: "txid_snapshot",
  3115: "fdw_handler",
  3220: "pg_lsn",
  3310: "tsm_handler",
  3361: "pg_ndistinct",
  3402: "pg_dependencies",
  3500: "anyenum",
  3614: "tsvector",
  3615: "tsquery",
  3642: "gtsvector",
  3734: "regconfig",
  3769: "regdictionary",
  3802: "jsonb",
  3831: "anyrange",
  3838: "event_trigger",
  3904: "int4range",
  3906: "numrange",
  3908: "tsrange",
  3910: "tstzrange",
  3912: "daterange",
  3926: "int8range",
  4072: "jsonpath",
  4089: "regnamespace",
  4096: "regrole",
  4191: "regcollation",
  4451: "int4multirange",
  4532: "nummultirange",
  4533: "tsmultirange",
  4534: "tstzmultirange",
  4535: "datemultirange",
  4536: "int8multirange",
  4537: "anymultirange",
  4538: "anycompatiblemultirange",
  4600: "pg_brin_bloom_summary",
  4601: "pg_brin_minmax_multi_summary",
  5017: "pg_mcv_list",
  5038: "pg_snapshot",
  5069: "xid8",
  5077: "anycompatible",
  5078: "anycompatiblearray",
  5079: "anycompatiblenonarray",
  5080: "anycompatiblerange"
};
var UnsupportedNativeDataType = _UnsupportedNativeDataType;
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= 1e4) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
__name(normalize_array, "normalize_array");
function normalize_numeric(numeric) {
  return numeric;
}
__name(normalize_numeric, "normalize_numeric");
function normalize_date(date) {
  return date;
}
__name(normalize_date, "normalize_date");
function normalize_timestamp(time) {
  return time;
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestampz(time) {
  return time.split("+")[0];
}
__name(normalize_timestampz, "normalize_timestampz");
function normalize_time(time) {
  return time;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time) {
  return time.split("+")[0];
}
__name(normalize_timez, "normalize_timez");
function normalize_money(money) {
  return money.slice(1);
}
__name(normalize_money, "normalize_money");
function normalize_xml(xml) {
  return xml;
}
__name(normalize_xml, "normalize_xml");
function toJson(json) {
  return json;
}
__name(toJson, "toJson");
function encodeBuffer(buffer) {
  return Array.from(new Uint8Array(buffer));
}
__name(encodeBuffer, "encodeBuffer");
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var parseBytesArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function normalizeByteaArray(serializedBytesArray) {
  const buffers = parseBytesArray(serializedBytesArray);
  return buffers.map((buf) => buf ? encodeBuffer(buf) : null);
}
__name(normalizeByteaArray, "normalizeByteaArray");
function convertBytes(serializedBytes) {
  const buffer = parsePgBytes(serializedBytes);
  return encodeBuffer(buffer);
}
__name(convertBytes, "convertBytes");
function normalizeBit(bit) {
  return bit;
}
__name(normalizeBit, "normalizeBit");
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestampz,
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ScalarColumnType.JSONB]: toJson,
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
var debug = (0, import_debug.Debug)("prisma:driver-adapter:neon");
var NeonQueryable = class {
  static {
    __name(this, "NeonQueryable");
  }
  constructor() {
    this.provider = "postgres";
    this.adapterName = name;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);
    const res = await this.performIO(query);
    if (!res.ok) {
      return err(res.error);
    }
    const { fields, rows } = res.value;
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        return err({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    return ok({
      columnNames,
      columnTypes,
      rows
    });
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);
    return (await this.performIO(query)).map((r) => r.rowCount ?? 0);
  }
};
var PrismaNeonHTTP = class extends NeonQueryable {
  static {
    __name(this, "PrismaNeonHTTP");
  }
  constructor(client) {
    super();
    this.client = client;
  }
  async performIO(query) {
    const { sql, args: values } = query;
    return ok(
      await this.client(sql, values, {
        arrayMode: true,
        fullResults: true
      })
    );
  }
  transactionContext() {
    return Promise.reject(new Error("Transactions are not supported in HTTP mode"));
  }
};

// src/trigger/translateNovel.ts
export_types.setTypeParser(export_types.builtins.TIMESTAMP, (v2) => v2);
export_types.setTypeParser(export_types.builtins.TIMESTAMPTZ, (v2) => v2);
export_types.setTypeParser(export_types.builtins.DATE, (v2) => v2);
function createPrisma() {
  const sql = Xs2(process.env.DATABASE_URL);
  const adapter = new PrismaNeonHTTP(sql);
  return new import_client.PrismaClient({ adapter });
}
__name(createPrisma, "createPrisma");
var LOCALE_NAMES = {
  "zh-CN": "简体中文",
  "zh-TW": "繁体中文",
  "en": "English",
  "ja": "日本語",
  "ko": "한국어",
  "es": "Español"
};
var translateNovel = task({
  id: "translate-novel",
  maxDuration: 3600,
  run: /* @__PURE__ */ __name(async (payload) => {
    const { translationRequestId, novelId, targetLocale } = payload;
    const prisma = createPrisma();
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const targetLang = LOCALE_NAMES[targetLocale] ?? targetLocale;
    async function translate(text) {
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: `你是专业小说翻译，将内容翻译成${targetLang}，保持文学风格，只输出翻译结果。`,
        messages: [{ role: "user", content: text }]
      });
      const block = msg.content[0];
      return block.type === "text" ? block.text : "";
    }
    __name(translate, "translate");
    try {
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: "processing" }
      });
      const novel = await prisma.novel.findUniqueOrThrow({
        where: { id: novelId },
        include: {
          translations: { where: { locale: { not: targetLocale }, status: "published" }, take: 1 },
          chapters: {
            where: { publishStatus: "published" },
            orderBy: { order: "asc" },
            include: {
              translations: { where: { locale: { not: targetLocale }, status: "published" }, take: 1 }
            }
          }
        }
      });
      const srcNovelTr = novel.translations[0];
      if (!srcNovelTr) throw new Error("No published novel translation found as source");
      const chapters = novel.chapters.filter((c) => c.translations.length > 0);
      const totalChapters = chapters.length;
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { totalChapters }
      });
      const [translatedTitle, translatedDesc] = await Promise.all([
        translate(srcNovelTr.title),
        translate(srcNovelTr.description)
      ]);
      await prisma.novelTranslation.upsert({
        where: { novelId_locale: { novelId, locale: targetLocale } },
        create: { novelId, locale: targetLocale, title: translatedTitle, description: translatedDesc, status: "draft" },
        update: { title: translatedTitle, description: translatedDesc, status: "draft" }
      });
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        const srcTr = chapter.translations[0];
        const [tTitle, tContent] = await Promise.all([
          translate(srcTr.title),
          translate(srcTr.content)
        ]);
        await prisma.chapterTranslation.upsert({
          where: { chapterId_locale: { chapterId: chapter.id, locale: targetLocale } },
          create: { chapterId: chapter.id, locale: targetLocale, title: tTitle, content: tContent, status: "draft" },
          update: { title: tTitle, content: tContent, status: "draft" }
        });
        await prisma.translationRequest.update({
          where: { id: translationRequestId },
          data: { doneChapters: i + 1 }
        });
      }
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: "completed" }
      });
    } catch (err2) {
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: "failed", errorMessage: err2 instanceof Error ? err2.message : String(err2) }
      });
      throw err2;
    }
  }, "run")
});
export {
  translateNovel
};
/*! Bundled license information:

@prisma/client/runtime/library.js:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.4.3
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)

@neondatabase/serverless/index.mjs:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=translateNovel.mjs.map
