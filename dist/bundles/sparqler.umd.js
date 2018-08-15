(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SPARQLER"] = factory();
	else
		root["SPARQLER"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(1);
module.exports = index_1.SPARQLER;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FinishClause_1 = __webpack_require__(2);
var QueryClause_1 = __webpack_require__(3);
var IRIResolver_1 = __webpack_require__(5);
var QueryUnitContainer_1 = __webpack_require__(75);
var QueryToken_1 = __webpack_require__(76);
var SPARQLER = (function () {
    function SPARQLER(finishSelectFactory) {
        if (finishSelectFactory === void 0) { finishSelectFactory = FinishClause_1.FinishClause.createFrom; }
        var container = new QueryUnitContainer_1.QueryUnitContainer({
            iriResolver: new IRIResolver_1.IRIResolver(),
            targetToken: new QueryToken_1.QueryToken(void 0),
            selectFinishClauseFactory: finishSelectFactory,
        });
        return QueryClause_1.QueryClause.createFrom(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishClause = {
    createFrom: function (container, object) {
        var toPrettyString = function () {
            return container.targetToken.toString(0);
        };
        return Object.assign(object, {
            toCompactString: function () { return container.targetToken.toString(); },
            toPrettyString: toPrettyString,
            toString: toPrettyString,
        });
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __webpack_require__(4);
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(9);
var BaseToken_1 = __webpack_require__(10);
var IRIToken_1 = __webpack_require__(7);
var PrefixToken_1 = __webpack_require__(11);
var SelectClause_1 = __webpack_require__(12);
function base(iri) {
    var token = new BaseToken_1.BaseToken(new IRIToken_1.IRIToken(iri));
    var prologues = this.targetToken
        .prologues.concat(token);
    var queryToken = utils_1.cloneElement(this.targetToken, { prologues: prologues });
    var container = utils_1.cloneElement(this, { targetToken: queryToken });
    return exports.QueryClause.createFrom(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this.iriResolver, iri);
    var container = utils_1.cloneElement(this, { iriResolver: iriResolver });
    return exports.QueryClause.createFrom(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this.iriResolver);
    var prologues = this.targetToken.prologues.slice();
    if (iriResolver.prefixes.has(name)) {
        var index = prologues
            .findIndex(function (token) { return token.token === "prefix" && token.namespace === name; });
        if (index !== -1)
            prologues.splice(index, 1);
    }
    prologues.push(new PrefixToken_1.PrefixToken(name, new IRIToken_1.IRIToken(iri)));
    iriResolver.prefixes.set(name, false);
    var queryToken = utils_1.cloneElement(this.targetToken, { prologues: prologues });
    var container = utils_1.cloneElement(this, {
        iriResolver: iriResolver,
        targetToken: queryToken,
    });
    return exports.QueryClause.createFrom(container, {});
}
exports.QueryClause = {
    createFrom: function (container, object) {
        var selectFactory = SelectClause_1.SelectClause
            .createFrom.bind(null, container.selectFinishClauseFactory);
        return Factory_1.Factory.createFrom(selectFactory)(container, Object.assign(object, {
            base: base.bind(container),
            vocab: vocab.bind(container),
            prefix: prefix.bind(container),
        }));
    },
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = {
    createFrom: function () {
        var factories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            factories[_i] = arguments[_i];
        }
        return function (container, object) {
            return factories
                .reduce(function (target, factoryFn) { return factoryFn(container, target); }, object);
        };
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(6);
var IRIToken_1 = __webpack_require__(7);
var PrefixedNameToken_1 = __webpack_require__(8);
var IRIResolver = (function () {
    function IRIResolver(base, vocab) {
        var _newTarget = this.constructor;
        this.prefixes = base
            ? new Map(base.prefixes.entries())
            : new Map();
        this.vocab = vocab
            ? vocab
            : base && base.vocab;
        if (_newTarget === IRIResolver)
            Object.freeze(this);
    }
    IRIResolver.prototype.resolve = function (relativeIRI, vocab) {
        if (utils_1.isPrefixed(relativeIRI))
            return this.resolvePrefixed(relativeIRI);
        return this.resolveIRI(relativeIRI, vocab);
    };
    IRIResolver.prototype.resolveIRI = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        if (vocab && this.vocab && utils_1.isRelative(relativeIRI))
            relativeIRI = this.vocab + relativeIRI;
        return new IRIToken_1.IRIToken(relativeIRI);
    };
    IRIResolver.prototype.resolvePrefixed = function (prefixedName) {
        var token = new PrefixedNameToken_1.PrefixedNameToken(prefixedName);
        var used = this.prefixes.get(token.namespace);
        if (used === void 0)
            throw new Error("The prefix \"" + token.namespace + "\" has not been declared.");
        if (!used)
            this.prefixes.set(token.namespace, true);
        return token;
    };
    return IRIResolver;
}());
exports.IRIResolver = IRIResolver;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isAbsolute(iri) {
    return iri.indexOf(":") !== -1;
}
exports.isAbsolute = isAbsolute;
function hasProtocol(iri) {
    return iri.indexOf("://") !== -1;
}
exports.hasProtocol = hasProtocol;
function isRelative(iri) {
    return !isAbsolute(iri);
}
exports.isRelative = isRelative;
function isIRI(iri) {
    return hasProtocol(iri) || !isAbsolute(iri);
}
exports.isIRI = isIRI;
var bNodeRegex = /^_:/;
function isBNodeLabel(label) {
    return bNodeRegex.test(label);
}
exports.isBNodeLabel = isBNodeLabel;
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var softPrefixRegex = /^(?!_:)[^]*?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return softPrefixRegex.test(iri) && !hasProtocol(iri);
}
exports.isPrefixed = isPrefixed;
function getPrefixedParts(iri) {
    var parts = prefixRegex.exec(iri);
    if (parts === null || hasProtocol(iri))
        return null;
    var prefix = parts[1] || "";
    var local = iri.substr(prefix.length + 1).replace(prefixNormalizeRegex, "\\$1");
    return [
        prefix,
        local,
    ];
}
exports.getPrefixedParts = getPrefixedParts;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIToken = (function () {
    function IRIToken(value) {
        this.token = "iri";
        this.value = value;
    }
    IRIToken.prototype.toString = function (spaces) {
        return "<" + this.value + ">";
    };
    return IRIToken;
}());
exports.IRIToken = IRIToken;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(6);
var NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
var PrefixedNameToken = (function () {
    function PrefixedNameToken(prefixedOrNamespace, localName) {
        var _a;
        this.token = "prefixedName";
        var namespace = prefixedOrNamespace;
        if (localName === void 0) {
            if (!utils_1.isPrefixed(prefixedOrNamespace))
                throw new Error("Invalid prefixed name.");
            _a = prefixedOrNamespace.split(/:(.*)/), namespace = _a[0], localName = _a[1];
        }
        if (!NAMESPACE_REGEX.test(namespace))
            throw new Error("Invalid prefixed namespace.");
        this.namespace = namespace;
        var _b = localName.split(/^(.)(?:(.*)?(.))?$/), ln1 = _b[1], ln2 = _b[2], ln3 = _b[3];
        var preSanitation = "";
        if (ln1)
            preSanitation += ln1.replace(/([\-.])/g, "\\$1");
        if (ln2)
            preSanitation += ln2;
        if (ln3)
            preSanitation += ln3.replace(/([.])/g, "\\$1");
        this.localName = preSanitation.replace(/([~!$&'|()*+,;=/?#@%])/g, "\\$1");
    }
    PrefixedNameToken.prototype.toString = function (spaces) {
        return this.namespace + ":" + this.localName;
    };
    return PrefixedNameToken;
}());
exports.PrefixedNameToken = PrefixedNameToken;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function cloneElement(element, newValues) {
    if (newValues === void 0) { newValues = {}; }
    var base = Object.create(Object.getPrototypeOf(element));
    var clone = Object
        .assign(base, element, newValues);
    return Object.freeze(clone);
}
exports.cloneElement = cloneElement;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseToken = (function () {
    function BaseToken(iri) {
        this.token = "base";
        this.iri = iri;
    }
    BaseToken.prototype.toString = function () {
        return "BASE " + this.iri;
    };
    return BaseToken;
}());
exports.BaseToken = BaseToken;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function (spaces) {
        return "PREFIX " + this.namespace + ": " + this.iri;
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var utils_1 = __webpack_require__(9);
var SelectToken_1 = __webpack_require__(14);
var VariableToken_1 = __webpack_require__(20);
var FromClause_1 = __webpack_require__(21);
function getSelectFn(genericFactory, container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var queryClause = new SelectToken_1.SelectToken(modifier);
        if (variables.length)
            queryClause.addVariable.apply(queryClause, variables.map(function (x) { return new VariableToken_1.VariableToken(x); }));
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: queryClause });
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: queryToken,
        });
        return FromClause_1.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.SelectClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            select: getSelectFn(genericFactory, container),
            selectDistinct: getSelectFn(genericFactory, container, "DISTINCT"),
            selectReduced: getSelectFn(genericFactory, container, "REDUCED"),
            selectAll: function () { return getSelectFn(genericFactory, container)(); },
            selectAllDistinct: function () { return getSelectFn(genericFactory, container, "DISTINCT")(); },
            selectAllReduced: function () { return getSelectFn(genericFactory, container, "REDUCED")(); },
        });
    },
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container = (function () {
    function Container(data) {
        var _newTarget = this.constructor;
        this.iriResolver = data.iriResolver;
        this.targetToken = data.targetToken;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommonSelectToken_1 = __webpack_require__(15);
var printing_1 = __webpack_require__(19);
var SelectToken = (function (_super) {
    __extends(SelectToken, _super);
    function SelectToken(modifier, dataset) {
        var _this = _super.call(this, modifier) || this;
        _this.token = "select";
        _this.dataset = dataset;
        return _this;
    }
    SelectToken.prototype.toString = function (spaces) {
        var query = _super.prototype.toString.call(this, spaces);
        var separator = printing_1.getSeparator(spaces);
        if (this.dataset)
            query += separator + this.dataset;
        query += separator + this.where.toString(spaces);
        if (this.modifiers.length)
            query += separator + this.modifiers.join(separator);
        return query;
    };
    return SelectToken;
}(CommonSelectToken_1.CommonSelectToken));
exports.SelectToken = SelectToken;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommonQueryClauseToken_1 = __webpack_require__(16);
var CommonSelectToken = (function (_super) {
    __extends(CommonSelectToken, _super);
    function CommonSelectToken(modifier) {
        var _this = _super.call(this) || this;
        _this.modifier = modifier;
        _this.variables = [];
        return _this;
    }
    CommonSelectToken.prototype.addVariable = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        (_a = this.variables).push.apply(_a, variables);
        return this;
    };
    CommonSelectToken.prototype.toString = function (spaces) {
        var query = "SELECT";
        if (this.modifier)
            query += " " + this.modifier;
        query += this.variables.length ?
            " " + this.variables.join(" ") :
            " *";
        return query;
    };
    return CommonSelectToken;
}(CommonQueryClauseToken_1.CommonQueryClauseToken));
exports.CommonSelectToken = CommonSelectToken;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WhereToken_1 = __webpack_require__(17);
var CommonQueryClauseToken = (function () {
    function CommonQueryClauseToken() {
        this.where = new WhereToken_1.WhereToken();
        this.modifiers = [];
    }
    CommonQueryClauseToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this.where.groupPattern.patterns).push.apply(_a, patterns);
        return this;
    };
    CommonQueryClauseToken.prototype.addModifier = function () {
        var modifier = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifier[_i] = arguments[_i];
        }
        var _a;
        (_a = this.modifiers).push.apply(_a, modifier);
        return this;
    };
    return CommonQueryClauseToken;
}());
exports.CommonQueryClauseToken = CommonQueryClauseToken;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(18);
var WhereToken = (function () {
    function WhereToken() {
        this.token = "where";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    WhereToken.prototype.toString = function (spaces) {
        var identifier = spaces === void 0 ? "" : "WHERE ";
        return identifier + this.groupPattern.toString(spaces);
    };
    return WhereToken;
}());
exports.WhereToken = WhereToken;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var GroupPatternToken = (function () {
    function GroupPatternToken() {
        this.token = "groupPattern";
        this.patterns = [];
    }
    GroupPatternToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
    };
    GroupPatternToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "{", close: "}" },
            tokensSeparator: ".",
            tokens: this.patterns,
        });
    };
    return GroupPatternToken;
}());
exports.GroupPatternToken = GroupPatternToken;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INDENTATION_SPACES = 4;
function getSeparator(spaces) {
    if (spaces === void 0)
        return " ";
    return "\n";
}
exports.getSeparator = getSeparator;
function getIndentation(spaces, extra) {
    if (spaces === void 0)
        return "";
    if (extra)
        spaces += extra;
    return " ".repeat(spaces);
}
exports.getIndentation = getIndentation;
function addSpaces(spaces, extra) {
    if (spaces === void 0)
        return spaces;
    return spaces + extra;
}
exports.addSpaces = addSpaces;
function getTokenContainerString(data) {
    if (!data.tokens.length)
        return data.tags.open + data.tags.close;
    var separator = getSeparator(data.spaces);
    var tokensSpaces = addSpaces(data.spaces, exports.INDENTATION_SPACES);
    var tokensSeparator = data.tokensSeparator ? data.tokensSeparator + separator : separator;
    var tokens = data.tokens
        .map(function (tokens) { return tokens.toString(tokensSpaces); });
    if (tokens.length === 1 && !tokens[0].includes("\n"))
        return data.tags.open + " " + tokens[0] + " " + data.tags.close;
    var indent = getIndentation(data.spaces);
    var tokensIndent = getIndentation(tokensSpaces);
    return data.tags.open + separator +
        tokens
            .map(function (x) { return tokensIndent + x; })
            .join(tokensSeparator) + separator +
        indent + data.tags.close;
}
exports.getTokenContainerString = getTokenContainerString;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NAME_REGEX = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
var VariableToken = (function () {
    function VariableToken(name) {
        this.token = "variable";
        if (!NAME_REGEX.test(name))
            throw new Error("Invalid variable name");
        this.name = name;
    }
    VariableToken.prototype.toString = function (spaces) {
        return "?" + this.name;
    };
    return VariableToken;
}());
exports.VariableToken = VariableToken;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(9);
var FromToken_1 = __webpack_require__(22);
var WhereClause_1 = __webpack_require__(23);
function getFromFn(genericFactory, container, named) {
    return function (iri) {
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var queryClause = utils_1.cloneElement(container.targetToken.queryClause, {
            dataset: new FromToken_1.FromToken(iriResolver.resolve(iri), named)
        });
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: queryClause });
        var newContainer = utils_1.cloneElement(container, {
            iriResolver: iriResolver,
            targetToken: queryToken,
        });
        return exports.FromClause.createFrom(genericFactory, newContainer, {});
    };
}
exports.FromClause = {
    createFrom: function (genericFactory, container, object) {
        return WhereClause_1.WhereClause.createFrom(genericFactory, container, Object.assign(object, {
            from: getFromFn(genericFactory, container),
            fromNamed: getFromFn(genericFactory, container, true),
        }));
    },
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FromToken = (function () {
    function FromToken(source, named) {
        if (named === void 0) { named = false; }
        this.token = "from";
        this.source = source;
        this.named = named;
    }
    FromToken.prototype.toString = function (spaces) {
        var str = "FROM ";
        if (this.named)
            str += "NAMED ";
        return str + this.source;
    };
    return FromToken;
}());
exports.FromToken = FromToken;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(9);
var PatternBuilder_1 = __webpack_require__(24);
var WhereToken_1 = __webpack_require__(17);
var GroupClause_1 = __webpack_require__(28);
function _getPatterns(iriResolver, patternFunction) {
    var patternOrPatterns = patternFunction(PatternBuilder_1.PatternBuilder.create(iriResolver));
    var patterns = Array.isArray(patternOrPatterns) ? patternOrPatterns : [patternOrPatterns];
    return patterns.map(function (x) { return x.getPattern(); });
}
function getWhereFn(genericFactory, container) {
    return function (patternFunction) {
        var _a;
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var patterns = _getPatterns(iriResolver, patternFunction);
        var query = (_a = utils_1.cloneElement(container.targetToken.queryClause, { where: new WhereToken_1.WhereToken() })).addPattern.apply(_a, patterns);
        var queryToken = utils_1.cloneElement(container.targetToken, { queryClause: query });
        var newContainer = utils_1.cloneElement(container, { iriResolver: iriResolver, targetToken: queryToken });
        var groupClause = GroupClause_1.GroupClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, groupClause);
    };
}
exports.WhereClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            where: getWhereFn(genericFactory, container),
        });
    },
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var Factory_1 = __webpack_require__(4);
var SubSelectPattern_1 = __webpack_require__(25);
var NotTriplePatternsBuilder_1 = __webpack_require__(51);
var TriplePatternsBuilder_1 = __webpack_require__(64);
exports.PatternBuilder = {
    create: function (iriResolver) {
        var container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: void 0,
        });
        return exports.PatternBuilder
            .createFrom(container, {});
    },
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(TriplePatternsBuilder_1.TriplePatternsBuilder.createFrom, NotTriplePatternsBuilder_1.NotTriplePatternsBuilder.createFrom, SubSelectPattern_1.SubSelectPattern.createFrom)(container, object);
    },
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var SubSelectToken_1 = __webpack_require__(26);
var VariableToken_1 = __webpack_require__(20);
var WherePattern_1 = __webpack_require__(27);
function getSelectFn(container, modifier) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var targetToken = new SubSelectToken_1.SubSelectToken(modifier);
        if (variables.length)
            targetToken.addVariable.apply(targetToken, variables.map(function (x) { return new VariableToken_1.VariableToken(x); }));
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: targetToken
        });
        return WherePattern_1.WherePattern.createFrom(newContainer, {});
    };
}
exports.SubSelectPattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            select: getSelectFn(container),
            selectDistinct: getSelectFn(container, "DISTINCT"),
            selectReduced: getSelectFn(container, "REDUCED"),
            selectAll: function () { return getSelectFn(container)(); },
            selectAllDistinct: function () { return getSelectFn(container, "DISTINCT")(); },
            selectAllReduced: function () { return getSelectFn(container, "REDUCED")(); },
        });
    },
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommonSelectToken_1 = __webpack_require__(15);
var printing_1 = __webpack_require__(19);
var SubSelectToken = (function (_super) {
    __extends(SubSelectToken, _super);
    function SubSelectToken(modifier, values) {
        var _this = _super.call(this, modifier) || this;
        _this.token = "subSelect";
        _this.values = values;
        return _this;
    }
    SubSelectToken.prototype.toString = function (spaces) {
        var subSpaces = printing_1.addSpaces(spaces, printing_1.INDENTATION_SPACES);
        var subIndent = printing_1.getIndentation(subSpaces);
        var separator = printing_1.getSeparator(spaces);
        var query = _super.prototype.toString.call(this, spaces) + separator +
            subIndent + this.where.toString(subSpaces);
        if (this.modifiers.length)
            query += separator + this.modifiers
                .map(function (x) { return subIndent + x; })
                .join(separator);
        if (this.values)
            query += separator + subIndent + this.values;
        var indent = printing_1.getIndentation(spaces);
        return "{" + separator + subIndent +
            query + separator +
            indent + "}";
    };
    return SubSelectToken;
}(CommonSelectToken_1.CommonSelectToken));
exports.SubSelectToken = SubSelectToken;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupClause_1 = __webpack_require__(28);
var utils_1 = __webpack_require__(9);
var WhereToken_1 = __webpack_require__(17);
var FinishPattern_1 = __webpack_require__(49);
function getWhereFn(container) {
    return function (patterns) {
        var _a;
        var where = new WhereToken_1.WhereToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = where.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var targetToken = utils_1.cloneElement(container.targetToken, { where: where });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        var groupClause = GroupClause_1.GroupClause.createFrom(FinishPattern_1.FinishPattern.createFrom, newContainer, {});
        return FinishPattern_1.FinishPattern.createFrom(newContainer, groupClause);
    };
}
exports.WherePattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            where: getWhereFn(container),
        });
    },
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupToken_1 = __webpack_require__(29);
var HavingClause_1 = __webpack_require__(30);
var SolutionModifierClause_1 = __webpack_require__(37);
function getGroupByFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new GroupToken_1.GroupToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var havingClause = HavingClause_1.HavingClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, havingClause);
    };
}
exports.GroupClause = {
    createFrom: function (genericFactory, container, object) {
        return HavingClause_1.HavingClause.createFrom(genericFactory, container, Object.assign(object, {
            groupBy: getGroupByFn(genericFactory, container),
        }));
    },
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupToken = (function () {
    function GroupToken(rawCondition) {
        this.token = "group";
        this.rawCondition = rawCondition;
    }
    GroupToken.prototype.toString = function (spaces) {
        return "GROUP BY " + this.rawCondition;
    };
    return GroupToken;
}());
exports.GroupToken = GroupToken;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HavingToken_1 = __webpack_require__(31);
var OrderClause_1 = __webpack_require__(32);
var SolutionModifierClause_1 = __webpack_require__(37);
function getHavingFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new HavingToken_1.HavingToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var orderClause = OrderClause_1.OrderClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, orderClause);
    };
}
exports.HavingClause = {
    createFrom: function (genericFactory, container, object) {
        return OrderClause_1.OrderClause.createFrom(genericFactory, container, Object.assign(object, {
            having: getHavingFn(genericFactory, container),
        }));
    },
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HavingToken = (function () {
    function HavingToken(rawCondition) {
        this.token = "having";
        this.rawCondition = rawCondition;
    }
    HavingToken.prototype.toString = function (spaces) {
        return "HAVING " + this.rawCondition;
    };
    return HavingToken;
}());
exports.HavingToken = HavingToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken_1 = __webpack_require__(33);
var LimitOffsetClause_1 = __webpack_require__(34);
var SolutionModifierClause_1 = __webpack_require__(37);
function getOrderByFn(genericFactory, container) {
    return function (rawCondition) {
        var token = new OrderToken_1.OrderToken(rawCondition);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        var limitOffsetClause = LimitOffsetClause_1.LimitOffsetClause.createFrom(genericFactory, newContainer, {});
        return genericFactory(newContainer, limitOffsetClause);
    };
}
exports.OrderClause = {
    createFrom: function (genericFactory, container, object) {
        return LimitOffsetClause_1.LimitOffsetClause.createFrom(genericFactory, container, Object.assign(object, {
            orderBy: getOrderByFn(genericFactory, container),
        }));
    }
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken = (function () {
    function OrderToken(condition, flow) {
        this.token = "order";
        this.condition = condition;
        if (flow)
            this.flow = flow;
    }
    OrderToken.prototype.toString = function (spaces) {
        return "ORDER BY " + (this.flow ?
            this.flow + "( " + this.condition + " )" :
            "" + this.condition);
    };
    return OrderToken;
}());
exports.OrderToken = OrderToken;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __webpack_require__(4);
var LimitClause_1 = __webpack_require__(35);
var OffsetClause_1 = __webpack_require__(38);
var ValuesClause_1 = __webpack_require__(40);
function _getLimitFactory(valuesFactory) {
    var offsetValuesFactory = OffsetClause_1.OffsetClause
        .createFrom.bind(null, valuesFactory);
    return function (container1, object1) { return LimitClause_1.LimitClause
        .createFrom(Factory_1.Factory.createFrom(offsetValuesFactory, valuesFactory), container1, object1); };
}
function _getOffsetFactory(valuesFactory) {
    var limitValuesFactory = LimitClause_1.LimitClause
        .createFrom.bind(null, valuesFactory);
    return function (container1, object1) { return OffsetClause_1.OffsetClause
        .createFrom(Factory_1.Factory.createFrom(valuesFactory, limitValuesFactory), container1, object1); };
}
exports.LimitOffsetClause = {
    createFrom: function (genericFactory, container, object) {
        var valuesFactory = ValuesClause_1.ValuesClause
            .createFrom.bind(null, genericFactory);
        var genericAndValuesFactory = Factory_1.Factory.createFrom(genericFactory, valuesFactory);
        return Factory_1.Factory.createFrom(_getLimitFactory(genericAndValuesFactory), _getOffsetFactory(genericAndValuesFactory), valuesFactory)(container, object);
    },
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LimitToken_1 = __webpack_require__(36);
var SolutionModifierClause_1 = __webpack_require__(37);
function getLimitFn(genericFactory, container) {
    return function (limit) {
        var token = new LimitToken_1.LimitToken(limit);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        return genericFactory(newContainer, {});
    };
}
exports.LimitClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            limit: getLimitFn(genericFactory, container),
        });
    },
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LimitToken = (function () {
    function LimitToken(value) {
        this.token = "limit";
        this.value = value;
    }
    LimitToken.prototype.toString = function () {
        return "LIMIT " + this.value;
    };
    return LimitToken;
}());
exports.LimitToken = LimitToken;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(9);
function cloneSolutionModifierContainer(container, token) {
    var targetToken = container.targetToken.token === "query" ?
        _cloneFromQuery(container.targetToken, token) :
        _cloneFromClause(container.targetToken, token);
    return utils_1.cloneElement(container, { targetToken: targetToken });
}
exports.cloneSolutionModifierContainer = cloneSolutionModifierContainer;
function _cloneFromClause(clauseToken, token) {
    var modifiers = clauseToken.modifiers.concat(token);
    return utils_1.cloneElement(clauseToken, { modifiers: modifiers });
}
function _cloneFromQuery(queryToken, token) {
    var queryClause = _cloneFromClause(queryToken.queryClause, token);
    return utils_1.cloneElement(queryToken, { queryClause: queryClause });
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken_1 = __webpack_require__(39);
var SolutionModifierClause_1 = __webpack_require__(37);
function getOffsetFn(genericFactory, container) {
    return function (offset) {
        var token = new OffsetToken_1.OffsetToken(offset);
        var newContainer = SolutionModifierClause_1.cloneSolutionModifierContainer(container, token);
        return genericFactory(newContainer, {});
    };
}
exports.OffsetClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            offset: getOffsetFn(genericFactory, container),
        });
    },
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken = (function () {
    function OffsetToken(value) {
        this.token = "offset";
        this.value = value;
    }
    OffsetToken.prototype.toString = function (spaces) {
        return "OFFSET " + this.value;
    };
    return OffsetToken;
}());
exports.OffsetToken = OffsetToken;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(9);
var PatternBuilder_1 = __webpack_require__(24);
var utils_2 = __webpack_require__(41);
var ValuesToken_1 = __webpack_require__(48);
var VariableToken_1 = __webpack_require__(20);
function _normalizeVariables(variableOrVariables) {
    var variables = Array.isArray(variableOrVariables) ? variableOrVariables : [variableOrVariables];
    return variables.map(function (x) { return new VariableToken_1.VariableToken(x); });
}
function _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(PatternBuilder_1.PatternBuilder.create(iriResolver)) :
        valuesOrBuilder;
    if (!Array.isArray(rawValues))
        return [[rawValues]];
    if (isSingle)
        rawValues.map(function (value) { return [value]; });
    if (rawValues.some(Array.isArray))
        return rawValues;
    return [rawValues];
}
function createValuesFn(genericFactory, container) {
    return function (variableOrVariables, valuesOrBuilder) {
        var token = new ValuesToken_1.ValuesToken();
        var variables = _normalizeVariables(variableOrVariables);
        token.addVariables.apply(token, variables);
        var isSingle = !Array.isArray(variableOrVariables);
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var values = _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle);
        values.forEach(function (valuesRow) { return token.addValues.apply(token, valuesRow.map(utils_2.convertValue)); });
        var targetToken = utils_1.cloneElement(container.targetToken, { values: token });
        var newContainer = utils_1.cloneElement(container, { iriResolver: iriResolver, targetToken: targetToken });
        return genericFactory(newContainer, {});
    };
}
exports.ValuesClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            values: createValuesFn(genericFactory, container),
        });
    },
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LiteralToken_1 = __webpack_require__(42);
var XSD = __webpack_require__(47);
function convertValue(value) {
    if (value instanceof Date)
        return new LiteralToken_1.LiteralToken(value.toISOString())
            .setType(XSD.dateTime);
    if (typeof value === "object")
        return value.getSubject();
    if (typeof value === "string") {
        if (value === "UNDEF")
            return value;
        return new LiteralToken_1.LiteralToken(value);
    }
    return new LiteralToken_1.LiteralToken(value);
}
exports.convertValue = convertValue;
var PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
function _resolvePath(container, propertyPath) {
    var parsedPath = propertyPath
        .split(/(<.*?>)/)
        .reduce(function (array, part) {
        if (part.startsWith("<")) {
            array.push(part);
        }
        else {
            array.push.apply(array, part.split(/([|/^?*+!()])/));
        }
        return array;
    }, [])
        .map(function (part) {
        if (!part)
            return;
        if (PATH_OPERATORS.indexOf(part) !== -1) {
            return part;
        }
        else if (part === "a") {
            return part;
        }
        else {
            if (part.startsWith("<") && part.endsWith(">"))
                part = part.slice(1, -1);
            return container.iriResolver.resolve(part, true);
        }
    })
        .join("");
    return parsedPath;
}
exports._resolvePath = _resolvePath;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(6);
var BooleanToken_1 = __webpack_require__(43);
var IRIToken_1 = __webpack_require__(7);
var LanguageToken_1 = __webpack_require__(44);
var NumberToken_1 = __webpack_require__(45);
var PrefixedNameToken_1 = __webpack_require__(8);
var StringToken_1 = __webpack_require__(46);
var LiteralToken = (function () {
    function LiteralToken(value) {
        this.token = "literal";
        if (value === void 0)
            return;
        this.setValue(value);
    }
    LiteralToken.prototype.setValue = function (value) {
        if (this.value && this.value.value === value)
            return this;
        this.value = typeof value === "boolean" ? new BooleanToken_1.BooleanToken(value) :
            typeof value === "number" ? new NumberToken_1.NumberToken(value) :
                new StringToken_1.StringToken(value);
        return this;
    };
    LiteralToken.prototype.setType = function (type) {
        if (!this.value)
            throw new Error("Must set a value before a type.");
        if (this.value.token !== "string")
            this.value = new StringToken_1.StringToken("" + this.value);
        this.type = typeof type === "string" ? utils_1.isPrefixed(type) ?
            new PrefixedNameToken_1.PrefixedNameToken(type) : new IRIToken_1.IRIToken(type) : type;
        return this;
    };
    LiteralToken.prototype.setLanguage = function (language) {
        if (!this.value || this.value.token !== "string")
            throw new Error("Non-string value can't have a language.");
        this.type = void 0;
        this.language = new LanguageToken_1.LanguageToken(language);
        return this;
    };
    LiteralToken.prototype.toString = function (spaces) {
        if (this.language)
            return "" + this.value + this.language;
        if (this.type)
            return this.value + "^^" + this.type;
        return "" + this.value;
    };
    return LiteralToken;
}());
exports.LiteralToken = LiteralToken;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BooleanToken = (function () {
    function BooleanToken(value) {
        this.token = "boolean";
        this.value = value;
    }
    BooleanToken.prototype.toString = function (spaces) {
        return "" + this.value;
    };
    return BooleanToken;
}());
exports.BooleanToken = BooleanToken;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
function isLanguageTag(tag) {
    return LANGUAGE_REGEX.test(tag);
}
exports.isLanguageTag = isLanguageTag;
var LanguageToken = (function () {
    function LanguageToken(tag) {
        this.token = "language";
        if (!isLanguageTag(tag))
            throw new Error("Invalid language tag.");
        this.tag = tag;
    }
    LanguageToken.prototype.toString = function (spaces) {
        return "@" + this.tag;
    };
    return LanguageToken;
}());
exports.LanguageToken = LanguageToken;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NumberToken = (function () {
    function NumberToken(value) {
        this.token = "number";
        this.value = value;
    }
    NumberToken.prototype.toString = function (spaces) {
        return "" + this.value;
    };
    return NumberToken;
}());
exports.NumberToken = NumberToken;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringToken = (function () {
    function StringToken(value) {
        this.token = "string";
        this.value = value;
    }
    StringToken.prototype.toString = function (spaces) {
        return "\"" + this.value + "\"";
    };
    return StringToken;
}());
exports.StringToken = StringToken;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMESPACE = "http://www.w3.org/2001/XMLSchema#";
exports.dateTime = exports.NAMESPACE + "dateTime";
exports.integer = exports.NAMESPACE + "integer";
exports.float = exports.NAMESPACE + "float";
exports.boolean = exports.NAMESPACE + "boolean";
exports.string = exports.NAMESPACE + "string";


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var ValuesToken = (function () {
    function ValuesToken() {
        this.token = "values";
        this.variables = [];
        this.values = [];
    }
    ValuesToken.prototype.addVariables = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        (_a = this.variables).push.apply(_a, variables);
        return this;
    };
    ValuesToken.prototype.addValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values.push(values);
        return this;
    };
    ValuesToken.prototype.toString = function (spaces) {
        var variables = this._getVariablesStr();
        var values = this._getValuesStr(spaces);
        return "VALUES " + variables + " " + values;
    };
    ValuesToken.prototype._getVariablesStr = function () {
        if (!this.variables.length)
            return "()";
        var variables = this.variables.join(" ");
        if (this.variables.length === 1)
            return variables;
        return "( " + variables + " )";
    };
    ValuesToken.prototype._getValuesStr = function (spaces) {
        if (!this.values.length)
            return "{}";
        if (this.variables.length === 1) {
            var values = this.values
                .filter(function (x) { return x.length; })
                .map(function (x) { return x[0]; })
                .join(" ");
            if (!values)
                return "{}";
            return "{ " + values + " }";
        }
        var subIndent = printing_1.getIndentation(spaces, printing_1.INDENTATION_SPACES);
        var separator = printing_1.getSeparator(spaces);
        var indent = printing_1.getIndentation(spaces);
        return "{" + separator +
            this.values
                .map(function (values) {
                var valuesStr = values.length ?
                    "( " + values.join(" ") + " )" : "()";
                return subIndent + valuesStr;
            })
                .join(separator) + separator +
            indent + "}";
    };
    return ValuesToken;
}());
exports.ValuesToken = ValuesToken;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FinishClause_1 = __webpack_require__(2);
var Factory_1 = __webpack_require__(4);
var Pattern_1 = __webpack_require__(50);
exports.FinishPattern = {
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(Pattern_1.Pattern.createFrom, FinishClause_1.FinishClause.createFrom)(container, object);
    },
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            getPattern: function () { return container.targetToken; },
        });
    },
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnionPatternToken_1 = __webpack_require__(52);
var Container_1 = __webpack_require__(13);
var BindToken_1 = __webpack_require__(53);
var FilterToken_1 = __webpack_require__(54);
var GraphToken_1 = __webpack_require__(55);
var GroupPatternToken_1 = __webpack_require__(18);
var MinusPatternToken_1 = __webpack_require__(56);
var OptionalToken_1 = __webpack_require__(57);
var ServicePatternToken_1 = __webpack_require__(58);
var ValuesToken_1 = __webpack_require__(48);
var VariableToken_1 = __webpack_require__(20);
var GroupPattern_1 = __webpack_require__(59);
var MultipleValuesPattern_1 = __webpack_require__(62);
var NotTriplePattern_1 = __webpack_require__(60);
var SingleValuesPattern_1 = __webpack_require__(63);
var UnionPattern_1 = __webpack_require__(61);
function _getPatternContainer(container, targetToken) {
    return new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: targetToken,
    });
}
function _getPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return NotTriplePattern_1.NotTriplePattern.createFrom(patternContainer, {});
}
function getGraphFn(container) {
    return function (iriOrVariable, patterns) {
        var varOrIRI = typeof iriOrVariable === "string" ?
            container.iriResolver.resolve(iriOrVariable) :
            iriOrVariable.getSubject();
        var token = new GraphToken_1.GraphToken(varOrIRI);
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        token.addPattern.apply(token, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getGroupFn(container) {
    return function (patterns) {
        var _a;
        var token = new GroupPatternToken_1.GroupPatternToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = token.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var patternContainer = _getPatternContainer(container, token);
        return GroupPattern_1.GroupPattern.createFrom(patternContainer, {});
    };
}
function getUnionFn(container) {
    return function (patterns) {
        var token = new UnionPatternToken_1.UnionPatternToken();
        var patternContainer = _getPatternContainer(container, token);
        var unionPattern = UnionPattern_1.UnionPattern
            .createFrom(patternContainer, {});
        return unionPattern.and(patterns);
    };
}
function getOptionalFn(container) {
    return function (patterns) {
        var token = new OptionalToken_1.OptionalToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        token.addPattern.apply(token, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getMinusFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var token = new MinusPatternToken_1.MinusPatternToken();
        (_a = token.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getServiceFn(container, modifier) {
    return function (resource, patterns) {
        var _a;
        var varOrIRI = typeof resource === "string" ?
            container.iriResolver.resolve(resource) :
            resource.getSubject();
        var token = new ServicePatternToken_1.ServicePatternToken(varOrIRI, modifier);
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = token.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getFilterFn(container) {
    return function (rawConstraint) {
        var token = new FilterToken_1.FilterToken(rawConstraint);
        return _getPattern(container, token);
    };
}
function getBindFn(container) {
    return function (rawExpression, variable) {
        var parsedVar = typeof variable === "string" ?
            new VariableToken_1.VariableToken(variable) :
            variable.getSubject();
        var token = new BindToken_1.BindToken(rawExpression, parsedVar);
        return _getPattern(container, token);
    };
}
function getValuesFn(container) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        var token = new ValuesToken_1.ValuesToken();
        (_a = token.variables).push.apply(_a, variables.map(function (x) { return x.getSubject(); }));
        var patternContainer = _getPatternContainer(container, token);
        if (variables.length === 1)
            return SingleValuesPattern_1.SingleValuesPattern
                .createFrom(patternContainer, {});
        return MultipleValuesPattern_1.MultipleValuesPattern
            .createFrom(patternContainer, {});
    };
}
exports.NotTriplePatternsBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            undefined: "UNDEF",
            graph: getGraphFn(container),
            group: getGroupFn(container),
            union: getUnionFn(container),
            optional: getOptionalFn(container),
            minus: getMinusFn(container),
            service: getServiceFn(container),
            serviceSilent: getServiceFn(container, "SILENT"),
            filter: getFilterFn(container),
            bind: getBindFn(container),
            values: getValuesFn(container),
        });
    },
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnionPatternToken = (function () {
    function UnionPatternToken() {
        this.token = "unionPattern";
        this.groupPatterns = [];
    }
    UnionPatternToken.prototype.toString = function (spaces) {
        return this
            .groupPatterns
            .map(function (x) { return x.toString(spaces); })
            .join(" UNION ");
    };
    return UnionPatternToken;
}());
exports.UnionPatternToken = UnionPatternToken;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindToken = (function () {
    function BindToken(expression, variable) {
        this.token = "bind";
        this.expression = expression;
        this.variable = variable;
    }
    BindToken.prototype.toString = function (spaces) {
        return "BIND(" + this.expression + " AS " + this.variable + ")";
    };
    return BindToken;
}());
exports.BindToken = BindToken;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FilterToken = (function () {
    function FilterToken(constraint) {
        this.token = "filter";
        this.constraint = constraint;
    }
    FilterToken.prototype.toString = function (spaces) {
        return "FILTER( " + this.constraint + " )";
    };
    return FilterToken;
}());
exports.FilterToken = FilterToken;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(18);
var GraphToken = (function () {
    function GraphToken(graph) {
        this.token = "graph";
        this.graph = graph;
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    GraphToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        var _a;
        (_a = this.groupPattern.patterns).push.apply(_a, pattern);
        return this;
    };
    GraphToken.prototype.toString = function (spaces) {
        return "GRAPH " + this.graph + " " + this.groupPattern.toString(spaces);
    };
    return GraphToken;
}());
exports.GraphToken = GraphToken;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(18);
var MinusPatternToken = (function () {
    function MinusPatternToken() {
        this.token = "minusPattern";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    MinusPatternToken.prototype.toString = function (spaces) {
        return "MINUS " + this.groupPattern.toString(spaces);
    };
    return MinusPatternToken;
}());
exports.MinusPatternToken = MinusPatternToken;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(18);
var OptionalToken = (function () {
    function OptionalToken() {
        this.token = "optional";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    OptionalToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        var _a;
        (_a = this.groupPattern.patterns).push.apply(_a, pattern);
        return this;
    };
    OptionalToken.prototype.toString = function (spaces) {
        return "OPTIONAL " + this.groupPattern.toString(spaces);
    };
    return OptionalToken;
}());
exports.OptionalToken = OptionalToken;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(18);
var ServicePatternToken = (function () {
    function ServicePatternToken(resource, modifier) {
        this.token = "servicePattern";
        this.modifier = modifier;
        this.resource = resource;
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    ServicePatternToken.prototype.toString = function (spaces) {
        var query = "SERVICE ";
        if (this.modifier)
            query += "SILENT ";
        query += this.resource + " " + this.groupPattern.toString(spaces);
        return query;
    };
    return ServicePatternToken;
}());
exports.ServicePatternToken = ServicePatternToken;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var GroupPatternToken_1 = __webpack_require__(18);
var UnionPatternToken_1 = __webpack_require__(52);
var NotTriplePattern_1 = __webpack_require__(60);
var UnionPattern_1 = __webpack_require__(61);
function getUnionFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var newGroupToken = new GroupPatternToken_1.GroupPatternToken();
        (_a = newGroupToken.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var unionToken = new UnionPatternToken_1.UnionPatternToken();
        unionToken.groupPatterns.push(container.targetToken, newGroupToken);
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: unionToken,
        });
        return UnionPattern_1.UnionPattern.createFrom(newContainer, {});
    };
}
exports.GroupPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            union: getUnionFn(container),
        }));
    }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pattern_1 = __webpack_require__(50);
exports.NotTriplePattern = {
    createFrom: Pattern_1.Pattern.createFrom,
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var utils_1 = __webpack_require__(9);
var GroupPatternToken_1 = __webpack_require__(18);
var NotTriplePattern_1 = __webpack_require__(60);
function getAndFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var newGroupToken = new GroupPatternToken_1.GroupPatternToken();
        (_a = newGroupToken.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var groupPatterns = container.targetToken.groupPatterns.concat(newGroupToken);
        var unionToken = utils_1.cloneElement(container.targetToken, { groupPatterns: groupPatterns });
        var newContainer = new Container_1.Container({
            iriResolver: container.iriResolver,
            targetToken: unionToken,
        });
        return exports.UnionPattern.createFrom(newContainer, {});
    };
}
exports.UnionPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getAndFn(container),
        }));
    },
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(9);
var utils_2 = __webpack_require__(41);
var NotTriplePattern_1 = __webpack_require__(60);
function getHasFn(container) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var parsedValues = container.targetToken.values.slice();
        parsedValues.push(values.map(utils_2.convertValue));
        var targetToken = utils_1.cloneElement(container.targetToken, { values: parsedValues });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.MultipleValuesPatternMore.createFrom(newContainer, {});
    };
}
exports.MultipleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.MultipleValuesPatternMore = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(9);
var utils_2 = __webpack_require__(41);
var NotTriplePattern_1 = __webpack_require__(60);
function getHasFn(container) {
    return function (value) {
        var values = container.targetToken.values.slice();
        if (!values.length)
            values.push([]);
        values[0] = values[0].concat(utils_2.convertValue(value));
        var targetToken = utils_1.cloneElement(container.targetToken, { values: values });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.SingleValuesPatternMore.createFrom(newContainer, {});
    };
}
exports.SingleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.SingleValuesPatternMore = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var Factory_1 = __webpack_require__(4);
var BlankNodePropertyToken_1 = __webpack_require__(65);
var BlankNodeToken_1 = __webpack_require__(66);
var CollectionToken_1 = __webpack_require__(67);
var LiteralToken_1 = __webpack_require__(42);
var SubjectToken_1 = __webpack_require__(68);
var VariableToken_1 = __webpack_require__(20);
var Pattern_1 = __webpack_require__(50);
var utils_1 = __webpack_require__(41);
var BlankNodeBuilder_1 = __webpack_require__(69);
var RDFLiteral_1 = __webpack_require__(72);
var TripleSubject_1 = __webpack_require__(73);
function _getPatternContainer(container, token) {
    return new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: new SubjectToken_1.SubjectToken(token),
    });
}
function _getTripleSubject(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return TripleSubject_1.TripleSubject.createFrom(patternContainer, {});
}
function _getNodeSubject(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return Factory_1.Factory.createFrom(TripleSubject_1.TripleSubject.createFrom, Pattern_1.Pattern.createFrom)(patternContainer, {});
}
function getResourceFn(container) {
    return function (iri) {
        var token = container.iriResolver.resolve(iri);
        return _getTripleSubject(container, token);
    };
}
function getVarFn(container) {
    return function (name) {
        var token = new VariableToken_1.VariableToken(name);
        return _getTripleSubject(container, token);
    };
}
function getLiteralFn(container) {
    return function (value) {
        var token = new LiteralToken_1.LiteralToken(value);
        if (typeof value !== "string")
            return _getTripleSubject(container, token);
        var patternContainer = _getPatternContainer(container, token);
        return RDFLiteral_1.RDFLiteral.createFrom(patternContainer, {});
    };
}
function getCollectionFn(container) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var _a;
        var token = (_a = new CollectionToken_1.CollectionToken()).addObject.apply(_a, values.map(utils_1.convertValue));
        return _getNodeSubject(container, token);
    };
}
function _getBlankNode(container, label) {
    if (label && !label.startsWith("_:"))
        label = "_:" + label;
    var token = new BlankNodeToken_1.BlankNodeToken(label);
    return _getTripleSubject(container, token);
}
function _getBlankNodeProperty(container, builderFn) {
    var token = new BlankNodePropertyToken_1.BlankNodePropertyToken();
    var builderContainer = new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: token,
    });
    var builder = BlankNodeBuilder_1.BlankNodeBuilder.createFrom(builderContainer, {});
    builderFn(builder);
    if (token.properties.length < 1)
        throw new Error("At least one property must be specified by the self builder.");
    return _getNodeSubject(container, token);
}
function getBlankNodeFn(container) {
    return function (labelOrBuilderFn) {
        if (typeof labelOrBuilderFn === "function")
            return _getBlankNodeProperty(container, labelOrBuilderFn);
        return _getBlankNode(container, labelOrBuilderFn);
    };
}
exports.TriplePatternsBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            resource: getResourceFn(container),
            var: getVarFn(container),
            literal: getLiteralFn(container),
            collection: getCollectionFn(container),
            blankNode: getBlankNodeFn(container),
        });
    },
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var BlankNodePropertyToken = (function () {
    function BlankNodePropertyToken() {
        this.token = "blankNodeProperty";
        this.properties = [];
    }
    BlankNodePropertyToken.prototype.addProperty = function (property) {
        this.properties.push(property);
        return this;
    };
    BlankNodePropertyToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "[", close: "]" },
            tokensSeparator: ";",
            tokens: this.properties,
        });
    };
    return BlankNodePropertyToken;
}());
exports.BlankNodePropertyToken = BlankNodePropertyToken;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LABEL_REGEX = /^_:[A-Za-z0-9_]([A-Za-z0-9_\-.]*[A-Za-z0-9_\-])?$/;
var BlankNodeToken = (function () {
    function BlankNodeToken(label) {
        this.token = "blankNode";
        if (!label)
            return;
        if (!LABEL_REGEX.test(label))
            throw new Error("Invalid blank node label.");
        this.label = label;
    }
    BlankNodeToken.prototype.toString = function (spaces) {
        if (this.label)
            return this.label;
        return "[]";
    };
    return BlankNodeToken;
}());
exports.BlankNodeToken = BlankNodeToken;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var CollectionToken = (function () {
    function CollectionToken() {
        this.token = "collection";
        this.objects = [];
    }
    CollectionToken.prototype.addObject = function () {
        var object = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            object[_i] = arguments[_i];
        }
        var _a;
        (_a = this.objects).push.apply(_a, object);
        return this;
    };
    CollectionToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "(", close: ")" },
            tokens: this.objects,
        });
    };
    return CollectionToken;
}());
exports.CollectionToken = CollectionToken;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var SubjectToken = (function () {
    function SubjectToken(subject) {
        this.token = "subject";
        this.subject = subject;
        this.properties = [];
    }
    SubjectToken.prototype.addPredicate = function (predicate) {
        this.properties.push(predicate);
        return this;
    };
    SubjectToken.prototype.toString = function (spaces) {
        var query = this.subject.toString(spaces);
        var separator = !this.properties.length ? ""
            : (this.subject.token === "collection" || this.subject.token === "blankNodeProperty")
                && query.includes("\n") ? "\n"
                : " ";
        var subSpaces = separator === " " ?
            printing_1.addSpaces(spaces, query.length + 1) :
            printing_1.addSpaces(spaces, printing_1.INDENTATION_SPACES);
        var subIndent = printing_1.getIndentation(subSpaces);
        var properties = this.properties
            .map(function (property) { return property.toString(subSpaces); })
            .join(";" + printing_1.getSeparator(spaces) + subIndent);
        if (separator === "\n")
            separator += subIndent;
        return query + separator + properties;
    };
    return SubjectToken;
}());
exports.SubjectToken = SubjectToken;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PropertyBuilder_1 = __webpack_require__(70);
var emptyGenericFactory = function (container, object) { return object; };
exports.BlankNodeBuilder = {
    createFrom: function (container, object) {
        return PropertyBuilder_1.PropertyBuilder.createFrom(emptyGenericFactory, container, object);
    }
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(9);
var PropertyToken_1 = __webpack_require__(71);
var utils_2 = __webpack_require__(41);
function _cloneContainer(container, propertyToken) {
    var properties = container.targetToken.properties.concat(propertyToken);
    var targetToken = utils_1.cloneElement(container.targetToken, { properties: properties });
    return utils_1.cloneElement(container, { targetToken: targetToken });
}
function _updateContainer(container, propertyToken) {
    container.targetToken.properties.push(propertyToken);
    return container;
}
function getHasFn(genericFactory, container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_2._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_2.convertValue));
        var newContainer = container.targetToken.token === "subject" ?
            _cloneContainer(container, propertyToken) :
            _updateContainer(container, propertyToken);
        var genericObject = genericFactory(newContainer, {});
        return exports.PropertyBuilderMore.createFrom(genericFactory, newContainer, genericObject);
    };
}
exports.PropertyBuilder = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            has: getHasFn(genericFactory, container),
        });
    }
};
exports.PropertyBuilderMore = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            and: getHasFn(genericFactory, container),
        });
    }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var PropertyToken = (function () {
    function PropertyToken(verb) {
        this.token = "property";
        this.verb = verb;
        this.objects = [];
    }
    PropertyToken.prototype.addObject = function () {
        var object = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            object[_i] = arguments[_i];
        }
        var _a;
        (_a = this.objects).push.apply(_a, object);
        return this;
    };
    PropertyToken.prototype.toString = function (spaces) {
        var separator = printing_1.getSeparator(spaces);
        var verb = "" + this.verb;
        var objectSpaces = printing_1.addSpaces(spaces, verb.length + 1);
        var objectIndent = printing_1.getIndentation(objectSpaces);
        var objects = this.objects
            .map(function (object) {
            if (object.token === "collection" || object.token === "blankNodeProperty")
                return object.toString(spaces);
            return object.toString(objectSpaces);
        })
            .join("," + separator + objectIndent);
        return verb + " " + objects;
    };
    return PropertyToken;
}());
exports.PropertyToken = PropertyToken;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(9);
var LanguageToken_1 = __webpack_require__(44);
var XSD = __webpack_require__(47);
var TripleSubject_1 = __webpack_require__(73);
function getWithTypeFn(container) {
    return function (type) {
        if (type in XSD)
            type = XSD[type];
        var iriType = container.iriResolver.resolve(type, true);
        var subject = utils_1.cloneElement(container.targetToken.subject, { type: iriType });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TripleSubject_1.TripleSubject.createFrom(newContainer, {});
    };
}
function getWithLanguageFn(container) {
    return function (language) {
        var langToken = new LanguageToken_1.LanguageToken(language);
        var subject = utils_1.cloneElement(container.targetToken.subject, { language: langToken });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TripleSubject_1.TripleSubject.createFrom(newContainer, {});
    };
}
exports.RDFLiteral = {
    createFrom: function (container, object) {
        return TripleSubject_1.TripleSubject.createFrom(container, Object.assign(object, {
            withType: getWithTypeFn(container),
            withLanguage: getWithLanguageFn(container),
        }));
    },
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PropertyBuilder_1 = __webpack_require__(70);
var TriplePattern_1 = __webpack_require__(74);
exports.TripleSubject = {
    createFrom: function (container, object) {
        var triplePatternFactory = TriplePattern_1.TriplePattern.createFrom;
        return PropertyBuilder_1.PropertyBuilder.createFrom(triplePatternFactory, container, Object.assign(object, {
            getSubject: function () { return container.targetToken.subject; },
        }));
    }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pattern_1 = __webpack_require__(50);
exports.TriplePattern = {
    createFrom: Pattern_1.Pattern.createFrom,
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(13);
var QueryUnitContainer = (function (_super) {
    __extends(QueryUnitContainer, _super);
    function QueryUnitContainer(data) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, data) || this;
        _this.selectFinishClauseFactory = data.selectFinishClauseFactory;
        if (_newTarget === QueryUnitContainer)
            Object.freeze(_this);
        return _this;
    }
    return QueryUnitContainer;
}(Container_1.Container));
exports.QueryUnitContainer = QueryUnitContainer;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(19);
var QueryToken = (function () {
    function QueryToken(query, values) {
        this.token = "query";
        this.prologues = [];
        this.queryClause = query;
        this.values = values;
    }
    QueryToken.prototype.addPrologues = function () {
        var prologues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prologues[_i] = arguments[_i];
        }
        var _a;
        (_a = this.prologues).push.apply(_a, prologues);
        return this;
    };
    QueryToken.prototype.toString = function (spaces) {
        var separator = printing_1.getSeparator(spaces);
        var query = this.prologues
            .map(function (prologue) {
            if (prologue.token === "base")
                return prologue + "\n";
            return prologue + separator;
        })
            .join("");
        if (this.queryClause)
            query += this.queryClause.toString(spaces);
        if (this.values)
            query += separator + this.values.toString(spaces);
        return query;
    };
    return QueryToken;
}());
exports.QueryToken = QueryToken;


/***/ })
/******/ ]);
});