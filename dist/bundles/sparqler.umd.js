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
var QueryUnitContainer_1 = __webpack_require__(87);
var QueryToken_1 = __webpack_require__(45);
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
var utils_1 = __webpack_require__(47);
var BaseToken_1 = __webpack_require__(41);
var IRIToken_1 = __webpack_require__(19);
var PrefixToken_1 = __webpack_require__(35);
var SelectClause_1 = __webpack_require__(48);
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
var IRIToken_1 = __webpack_require__(19);
var PrefixedNameToken_1 = __webpack_require__(20);
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
var StringLiteral_1 = __webpack_require__(7);
var tokens_1 = __webpack_require__(14);
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
function resolve(iri, vocab) {
    var tokens = [new StringLiteral_1.StringLiteral(iri)];
    if (isIRI(iri)) {
        if (isRelative(iri) && vocab)
            iri = vocab + iri;
        tokens = [tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(iri), tokens_1.CLOSE_IRI];
    }
    return tokens;
}
exports.resolve = resolve;


/***/ }),
/* 7 */
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
var Identifier_1 = __webpack_require__(8);
var NewLineSymbol_1 = __webpack_require__(10);
var Operator_1 = __webpack_require__(11);
var RightSymbol_1 = __webpack_require__(12);
var Token_1 = __webpack_require__(9);
var StringLiteral = (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLiteral.prototype.getPrettySeparator = function (nextToken) {
        if ((nextToken instanceof Identifier_1.Identifier && nextToken["value"] !== "AS") || (nextToken instanceof NewLineSymbol_1.NewLineSymbol && (nextToken["value"] === ")" || nextToken["value"] === "}")))
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || (nextToken instanceof RightSymbol_1.RightSymbol && nextToken["value"] !== ")"))
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    StringLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return StringLiteral;
}(Token_1.Token));
exports.StringLiteral = StringLiteral;
exports.default = StringLiteral;


/***/ }),
/* 8 */
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
var StringLiteral_1 = __webpack_require__(7);
var Token_1 = __webpack_require__(9);
var Identifier = (function (_super) {
    __extends(Identifier, _super);
    function Identifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Identifier.prototype.getPrettySeparator = function (nextToken) {
        if (this.value === "UNION")
            return Token_1.NEW_LINE_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    Identifier.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof StringLiteral_1.StringLiteral)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return Identifier;
}(Token_1.Token));
exports.Identifier = Identifier;
exports.default = Identifier;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_SEPARATOR = "";
exports.SPACE_SEPARATOR = " ";
exports.NEW_LINE_SEPARATOR = "\n";
var TokenFormat;
(function (TokenFormat) {
    TokenFormat[TokenFormat["PRETTY"] = 0] = "PRETTY";
    TokenFormat[TokenFormat["COMPACT"] = 1] = "COMPACT";
})(TokenFormat = exports.TokenFormat || (exports.TokenFormat = {}));
var Token = (function () {
    function Token(value) {
        this.value = value;
    }
    ;
    Token.prototype.getTokenValue = function (format, nextToken) {
        var separator = exports.EMPTY_SEPARATOR;
        if (nextToken !== void 0) {
            switch (format) {
                case TokenFormat.PRETTY:
                    separator = this.getPrettySeparator(nextToken);
                    break;
                case TokenFormat.COMPACT:
                    separator = this.getCompactSeparator(nextToken);
                    break;
            }
        }
        return this.value + separator;
    };
    return Token;
}());
exports.Token = Token;
exports.default = Token;


/***/ }),
/* 10 */
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
var Token_1 = __webpack_require__(9);
var NewLineSymbol = (function (_super) {
    __extends(NewLineSymbol, _super);
    function NewLineSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewLineSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof NewLineSymbol) {
            if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                return Token_1.SPACE_SEPARATOR;
        }
        return Token_1.NEW_LINE_SEPARATOR;
    };
    NewLineSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return NewLineSymbol;
}(Token_1.Token));
exports.NewLineSymbol = NewLineSymbol;
exports.default = NewLineSymbol;


/***/ }),
/* 11 */
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
var Token_1 = __webpack_require__(9);
var Operator = (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Operator.prototype.getPrettySeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    Operator.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return Operator;
}(Token_1.Token));
exports.Operator = Operator;
exports.default = Operator;


/***/ }),
/* 12 */
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
var Identifier_1 = __webpack_require__(8);
var LeftSymbol_1 = __webpack_require__(13);
var NewLineSymbol_1 = __webpack_require__(10);
var Operator_1 = __webpack_require__(11);
var Token_1 = __webpack_require__(9);
var RightSymbol = (function (_super) {
    __extends(RightSymbol, _super);
    function RightSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier && nextToken["value"] !== "UNDEF")
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof NewLineSymbol_1.NewLineSymbol) {
            if (["}", "]", ")"].indexOf(nextToken["value"]) !== -1) {
                return Token_1.NEW_LINE_SEPARATOR;
            }
        }
        if (nextToken instanceof LeftSymbol_1.LeftSymbol) {
            if (nextToken["value"] === "(")
                return Token_1.NEW_LINE_SEPARATOR;
        }
        if (nextToken instanceof Operator_1.Operator)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    RightSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return RightSymbol;
}(Token_1.Token));
exports.RightSymbol = RightSymbol;
exports.default = RightSymbol;


/***/ }),
/* 13 */
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
var Identifier_1 = __webpack_require__(8);
var Token_1 = __webpack_require__(9);
var LeftSymbol = (function (_super) {
    __extends(LeftSymbol, _super);
    function LeftSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    LeftSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return LeftSymbol;
}(Token_1.Token));
exports.LeftSymbol = LeftSymbol;
exports.default = LeftSymbol;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(15);
exports.VAR_SYMBOL = new tokens_1.LeftSymbol("?");
exports.PREFIX_SYMBOL = new tokens_1.Operator(":");
exports.OFF_TYPE = new tokens_1.Operator("^^");
exports.LANG_SYMBOL = new tokens_1.Operator("@");
exports.ALL = new tokens_1.RightSymbol("*");
exports.OPEN_IRI = new tokens_1.LeftSymbol("<");
exports.CLOSE_IRI = new tokens_1.RightSymbol(">");
exports.OPEN_QUOTE = new tokens_1.LeftSymbol("\"");
exports.CLOSE_QUOTE = new tokens_1.RightSymbol("\"");
exports.GRAPH_PATTERN_SEPARATOR = new tokens_1.NewLineSymbol(".");
exports.SAME_SUBJECT_SEPARATOR = new tokens_1.NewLineSymbol(";");
exports.SAME_PROPERTY_SEPARATOR = new tokens_1.NewLineSymbol(",");
exports.EMPTY_SEPARATOR = new tokens_1.NewLineSymbol("");
exports.OPEN_MULTI_BLOCK = new tokens_1.NewLineSymbol("{");
exports.CLOSE_MULTI_BLOCK = new tokens_1.NewLineSymbol("}");
exports.OPEN_SINGLE_BLOCK = new tokens_1.LeftSymbol("{");
exports.CLOSE_SINGLE_BLOCK = new tokens_1.RightSymbol("}");
exports.OPEN_MULTI_BN = new tokens_1.NewLineSymbol("[");
exports.CLOSE_MULTI_BN = new tokens_1.NewLineSymbol("]");
exports.OPEN_SINGLE_BN = new tokens_1.LeftSymbol("[");
exports.CLOSE_SINGLE_BN = new tokens_1.RightSymbol("]");
exports.OPEN_MULTI_LIST = new tokens_1.NewLineSymbol("(");
exports.CLOSE_MULTI_LIST = new tokens_1.NewLineSymbol(")");
exports.OPEN_SINGLE_LIST = new tokens_1.LeftSymbol("(");
exports.CLOSE_SINGLE_LIST = new tokens_1.RightSymbol(")");
exports.BASE = new tokens_1.Identifier("BASE");
exports.PREFIX = new tokens_1.Identifier("PREFIX");
exports.SELECT = new tokens_1.Identifier("SELECT");
exports.FROM = new tokens_1.Identifier("FROM");
exports.NAMED = new tokens_1.Identifier("NAMED");
exports.WHERE = new tokens_1.Identifier("WHERE");
exports.GROUP = new tokens_1.Identifier("GROUP");
exports.BY = new tokens_1.Identifier("BY");
exports.HAVING = new tokens_1.Identifier("HAVING");
exports.ORDER = new tokens_1.Identifier("ORDER");
exports.LIMIT = new tokens_1.Identifier("LIMIT");
exports.OFFSET = new tokens_1.Identifier("OFFSET");
exports.GRAPH = new tokens_1.Identifier("GRAPH");
exports.OPTIONAL = new tokens_1.Identifier("OPTIONAL");
exports.UNION = new tokens_1.Identifier("UNION");
exports.MINUS = new tokens_1.Identifier("MINUS");
exports.VALUES = new tokens_1.Identifier("VALUES");
exports.UNDEF = new tokens_1.Identifier("UNDEF");
exports.DISTINCT = new tokens_1.Identifier("DISTINCT");
exports.REDUCED = new tokens_1.Identifier("REDUCED");
exports.SERVICE = new tokens_1.Identifier("SERVICE");
exports.SILENT = new tokens_1.Identifier("SILENT");
exports.BIND = new tokens_1.Identifier("BIND");
exports.AS = new tokens_1.Identifier("AS");
exports.FILTER = new tokens_1.Identifier("FILTER");


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));
__export(__webpack_require__(13));
__export(__webpack_require__(10));
__export(__webpack_require__(16));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(7));
__export(__webpack_require__(9));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(20));
__export(__webpack_require__(21));
__export(__webpack_require__(22));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));
__export(__webpack_require__(28));
__export(__webpack_require__(29));
__export(__webpack_require__(30));
__export(__webpack_require__(32));
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(36));
__export(__webpack_require__(39));
__export(__webpack_require__(41));
__export(__webpack_require__(42));
__export(__webpack_require__(43));
__export(__webpack_require__(44));
__export(__webpack_require__(45));
__export(__webpack_require__(46));


/***/ }),
/* 16 */
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
var Identifier_1 = __webpack_require__(8);
var Operator_1 = __webpack_require__(11);
var RightSymbol_1 = __webpack_require__(12);
var Token_1 = __webpack_require__(9);
var NumberLiteral = (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        return _super.call(this, value + "") || this;
    }
    NumberLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier)
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || nextToken instanceof RightSymbol_1.RightSymbol)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    NumberLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return NumberLiteral;
}(Token_1.Token));
exports.NumberLiteral = NumberLiteral;
exports.default = NumberLiteral;


/***/ }),
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(6);
var BooleanToken_1 = __webpack_require__(23);
var IRIToken_1 = __webpack_require__(19);
var LanguageToken_1 = __webpack_require__(22);
var NumberToken_1 = __webpack_require__(21);
var PrefixedNameToken_1 = __webpack_require__(20);
var StringToken_1 = __webpack_require__(25);
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(31);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
var GroupPatternToken = (function () {
    function GroupPatternToken() {
        this.token = "groupPattern";
        this.patterns = [];
    }
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(31);
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
var CommonQueryClauseToken_1 = __webpack_require__(37);
var printing_1 = __webpack_require__(27);
var ConstructToken = (function (_super) {
    __extends(ConstructToken, _super);
    function ConstructToken() {
        var _this = _super.call(this) || this;
        _this.token = "construct";
        _this.triples = [];
        return _this;
    }
    ConstructToken.prototype.addTriple = function () {
        var triple = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triple[_i] = arguments[_i];
        }
        var _a;
        (_a = this.triples).push.apply(_a, triple);
        return this;
    };
    ConstructToken.prototype.toString = function (spaces) {
        var triples = printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "{", close: "}" },
            tokensSeparator: ".",
            tokens: this.triples,
        });
        var separator = printing_1.getSeparator(spaces);
        var query = "CONSTRUCT " +
            triples + separator +
            this.where.toString(spaces);
        if (this.modifiers.length)
            query += separator + this.modifiers.join(separator);
        return query;
    };
    return ConstructToken;
}(CommonQueryClauseToken_1.CommonQueryClauseToken));
exports.ConstructToken = ConstructToken;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WhereToken_1 = __webpack_require__(38);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(31);
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
/* 39 */
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
var CommonSelectToken_1 = __webpack_require__(40);
var printing_1 = __webpack_require__(27);
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
/* 40 */
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
var CommonQueryClauseToken_1 = __webpack_require__(37);
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
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


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var utils_1 = __webpack_require__(47);
var SelectToken_1 = __webpack_require__(39);
var VariableToken_1 = __webpack_require__(18);
var FromClause_1 = __webpack_require__(50);
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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(47);
var FromToken_1 = __webpack_require__(51);
var WhereClause_1 = __webpack_require__(52);
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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(47);
var PatternBuilder2_1 = __webpack_require__(53);
var WhereToken_1 = __webpack_require__(38);
var GroupClause_1 = __webpack_require__(57);
function _getPatterns(iriResolver, patternFunction) {
    var patternOrPatterns = patternFunction(PatternBuilder2_1.PatternBuilder2.create(iriResolver));
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var Factory_1 = __webpack_require__(4);
var SubSelectPattern_1 = __webpack_require__(54);
var NotTriplePatternBuilder_1 = __webpack_require__(71);
var TriplePatternBuilder_1 = __webpack_require__(81);
exports.PatternBuilder2 = {
    create: function (iriResolver) {
        var container = new Container_1.Container({
            iriResolver: iriResolver,
            targetToken: { token: "none" },
        });
        return exports.PatternBuilder2
            .createFrom(container, {});
    },
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(TriplePatternBuilder_1.TriplePatternBuilder.createFrom, NotTriplePatternBuilder_1.NotTriplePatternBuilder.createFrom, SubSelectPattern_1.SubSelectPattern.createFrom)(container, object);
    },
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var SubSelectToken_1 = __webpack_require__(55);
var VariableToken_1 = __webpack_require__(18);
var WherePattern_1 = __webpack_require__(56);
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
/* 55 */
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
var CommonSelectToken_1 = __webpack_require__(40);
var printing_1 = __webpack_require__(27);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupClause_1 = __webpack_require__(57);
var utils_1 = __webpack_require__(47);
var WhereToken_1 = __webpack_require__(38);
var FinishPattern_1 = __webpack_require__(69);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupToken_1 = __webpack_require__(58);
var HavingClause_1 = __webpack_require__(59);
var SolutionModifierClause_1 = __webpack_require__(64);
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
/* 58 */
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HavingToken_1 = __webpack_require__(60);
var OrderClause_1 = __webpack_require__(61);
var SolutionModifierClause_1 = __webpack_require__(64);
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken_1 = __webpack_require__(42);
var LimitOffsetClause_1 = __webpack_require__(62);
var SolutionModifierClause_1 = __webpack_require__(64);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __webpack_require__(4);
var LimitClause_1 = __webpack_require__(63);
var OffsetClause_1 = __webpack_require__(65);
var ValuesClause_1 = __webpack_require__(66);
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LimitToken_1 = __webpack_require__(43);
var SolutionModifierClause_1 = __webpack_require__(64);
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(47);
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken_1 = __webpack_require__(44);
var SolutionModifierClause_1 = __webpack_require__(64);
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(47);
var PatternBuilder2_1 = __webpack_require__(53);
var utils_2 = __webpack_require__(67);
var ValuesToken_1 = __webpack_require__(26);
var VariableToken_1 = __webpack_require__(18);
function _normalizeVariables(variableOrVariables) {
    var variables = Array.isArray(variableOrVariables) ? variableOrVariables : [variableOrVariables];
    return variables.map(function (x) { return new VariableToken_1.VariableToken(x); });
}
function _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(PatternBuilder2_1.PatternBuilder2.create(iriResolver)) :
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LiteralToken_1 = __webpack_require__(24);
var XSD = __webpack_require__(68);
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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FinishClause_1 = __webpack_require__(2);
var Factory_1 = __webpack_require__(4);
var Pattern_1 = __webpack_require__(70);
exports.FinishPattern = {
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(Pattern_1.Pattern.createFrom, FinishClause_1.FinishClause.createFrom)(container, object);
    },
};


/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var BindToken_1 = __webpack_require__(33);
var FilterToken_1 = __webpack_require__(34);
var GraphToken_1 = __webpack_require__(32);
var GroupPatternToken_1 = __webpack_require__(31);
var MinusPatternToken_1 = __webpack_require__(72);
var OptionalToken_1 = __webpack_require__(30);
var ServicePatternToken_1 = __webpack_require__(73);
var ValuesToken_1 = __webpack_require__(26);
var VariableToken_1 = __webpack_require__(18);
var Undefined_1 = __webpack_require__(74);
var GroupPattern_1 = __webpack_require__(75);
var MultipleValuesPattern_1 = __webpack_require__(79);
var NotTriplePattern_1 = __webpack_require__(77);
var SingleValuesPattern_1 = __webpack_require__(80);
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
function getOptionalFn(container) {
    return function (patterns) {
        var token = new OptionalToken_1.OptionalToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        token.addPattern.apply(token, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getMinusFn(container) {
    return function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
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
exports.NotTriplePatternBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            undefined: Undefined_1.Undefined,
            graph: getGraphFn(container),
            group: getGroupFn(container),
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(31);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = __webpack_require__(31);
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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Undefined = "UNDEF";


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var GroupPatternToken_1 = __webpack_require__(31);
var UnionPatternToken_1 = __webpack_require__(76);
var NotTriplePattern_1 = __webpack_require__(77);
var UnionPattern_1 = __webpack_require__(78);
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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pattern_1 = __webpack_require__(70);
exports.NotTriplePattern = {
    createFrom: Pattern_1.Pattern.createFrom,
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var utils_1 = __webpack_require__(47);
var GroupPatternToken_1 = __webpack_require__(31);
var NotTriplePattern_1 = __webpack_require__(77);
function getUnionFn(container) {
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
            union: getUnionFn(container),
        }));
    },
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(47);
var utils_2 = __webpack_require__(67);
var NotTriplePattern_1 = __webpack_require__(77);
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
        return exports.MultipleValuesPatternAnd.createFrom(newContainer, {});
    };
}
exports.MultipleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.MultipleValuesPatternAnd = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(47);
var utils_2 = __webpack_require__(67);
var NotTriplePattern_1 = __webpack_require__(77);
function getHasFn(container) {
    return function (value) {
        var values = container.targetToken.values.slice();
        if (!values.length)
            values.push([]);
        values[0] = values[0].concat(utils_2.convertValue(value));
        var targetToken = utils_1.cloneElement(container.targetToken, { values: values });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.SingleValuesPatternAnd.createFrom(newContainer, {});
    };
}
exports.SingleValuesPattern = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    },
};
exports.SingleValuesPatternAnd = {
    createFrom: function (container, object) {
        return NotTriplePattern_1.NotTriplePattern.createFrom(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    },
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(49);
var Factory_1 = __webpack_require__(4);
var BlankNodePropertyToken_1 = __webpack_require__(82);
var BlankNodeToken_1 = __webpack_require__(17);
var CollectionToken_1 = __webpack_require__(46);
var LiteralToken_1 = __webpack_require__(24);
var SubjectToken_1 = __webpack_require__(28);
var VariableToken_1 = __webpack_require__(18);
var Pattern_1 = __webpack_require__(70);
var utils_1 = __webpack_require__(67);
var BlankNodeBuilder_1 = __webpack_require__(83);
var RDFLiteral_1 = __webpack_require__(84);
var TriplePatternHas_1 = __webpack_require__(85);
function _getPatternContainer(container, token) {
    return new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: new SubjectToken_1.SubjectToken(token),
    });
}
function _getPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return TriplePatternHas_1.TriplePatternHas.createFrom(patternContainer, {});
}
function _getReadyPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return Factory_1.Factory.createFrom(TriplePatternHas_1.TriplePatternHas.createFrom, Pattern_1.Pattern.createFrom)(patternContainer, {});
}
function getResourceFn(container) {
    return function (iri) {
        var token = container.iriResolver.resolve(iri);
        return _getPattern(container, token);
    };
}
function getVarFn(container) {
    return function (name) {
        var token = new VariableToken_1.VariableToken(name);
        return _getPattern(container, token);
    };
}
function getLiteralFn(container) {
    return function (value) {
        var token = new LiteralToken_1.LiteralToken(value);
        if (typeof value !== "string")
            return _getPattern(container, token);
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
        return _getReadyPattern(container, token);
    };
}
function _getBlankNode(container, label) {
    if (label && !label.startsWith("_:"))
        label = "_:" + label;
    var token = new BlankNodeToken_1.BlankNodeToken(label);
    return _getPattern(container, token);
}
function _getBlankNodeProperty(container, builderFn) {
    var token = new BlankNodePropertyToken_1.BlankNodePropertyToken();
    var newContainer = new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: token,
    });
    var builder = BlankNodeBuilder_1.BlankNodeBuilder.createFrom(newContainer, {});
    builderFn(builder);
    if (token.properties.length < 1)
        throw new Error("At least one property must be specified with the provided BlankNodeBuilder.");
    return _getReadyPattern(container, token);
}
function getBlankNodeFn(container) {
    return function (labelOrBuilderFn) {
        if (typeof labelOrBuilderFn === "function")
            return _getBlankNodeProperty(container, labelOrBuilderFn);
        return _getBlankNode(container, labelOrBuilderFn);
    };
}
exports.TriplePatternBuilder = {
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = __webpack_require__(27);
var BlankNodePropertyToken = (function () {
    function BlankNodePropertyToken() {
        this.token = "blankNodeProperty";
        this.properties = [];
    }
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PropertyToken_1 = __webpack_require__(29);
var utils_1 = __webpack_require__(67);
function getHasFn(container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_1._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_1.convertValue));
        container.targetToken.properties
            .push(propertyToken);
        return exports.BlankNodeBuilderAnd.createFrom(container, {});
    };
}
exports.BlankNodeBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            has: getHasFn(container),
        });
    }
};
exports.BlankNodeBuilderAnd = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            and: getHasFn(container),
        });
    }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(47);
var LanguageToken_1 = __webpack_require__(22);
var XSD = __webpack_require__(68);
var TriplePatternHas_1 = __webpack_require__(85);
function getWithTypeFn(container) {
    return function (type) {
        if (type in XSD)
            type = XSD[type];
        var iriType = container.iriResolver.resolve(type, true);
        var subject = utils_1.cloneElement(container.targetToken.subject, { type: iriType });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TriplePatternHas_1.TriplePatternHas.createFrom(newContainer, {});
    };
}
function getWithLanguageFn(container) {
    return function (language) {
        var langToken = new LanguageToken_1.LanguageToken(language);
        var subject = utils_1.cloneElement(container.targetToken.subject, { language: langToken });
        var targetToken = utils_1.cloneElement(container.targetToken, { subject: subject });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return TriplePatternHas_1.TriplePatternHas.createFrom(newContainer, {});
    };
}
exports.RDFLiteral = {
    createFrom: function (container, object) {
        return TriplePatternHas_1.TriplePatternHas.createFrom(container, Object.assign(object, {
            withType: getWithTypeFn(container),
            withLanguage: getWithLanguageFn(container),
        }));
    },
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(47);
var PropertyToken_1 = __webpack_require__(29);
var Pattern_1 = __webpack_require__(70);
var utils_2 = __webpack_require__(67);
var TriplePattern_1 = __webpack_require__(86);
function getHasFn(container) {
    return function (property, objects) {
        var verbToken = (typeof property === "string")
            ? utils_2._resolvePath(container, property)
            : property.getSubject();
        var propertyToken = new PropertyToken_1.PropertyToken(verbToken);
        objects = Array.isArray(objects) ? objects : [objects];
        propertyToken.addObject.apply(propertyToken, objects.map(utils_2.convertValue));
        var properties = container.targetToken.properties.concat(propertyToken);
        var targetToken = utils_1.cloneElement(container.targetToken, { properties: properties });
        var newContainer = utils_1.cloneElement(container, { targetToken: targetToken });
        return exports.TriplePatternAnd.createFrom(newContainer, {});
    };
}
exports.TriplePatternHas = {
    createFrom: function (container, object) {
        return TriplePattern_1.TriplePattern.createFrom(container, Object.assign(object, {
            has: getHasFn(container),
        }));
    }
};
exports.TriplePatternAnd = {
    createFrom: function (container, object) {
        return Factory_1.Factory.createFrom(Pattern_1.Pattern.createFrom, TriplePattern_1.TriplePattern.createFrom)(container, Object.assign(object, {
            and: getHasFn(container),
        }));
    }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TriplePattern = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            getSubject: function () { return container.targetToken.subject; },
        });
    }
};


/***/ }),
/* 87 */
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
var Container_1 = __webpack_require__(49);
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


/***/ })
/******/ ]);
});