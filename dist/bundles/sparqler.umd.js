(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SPARQLER"] = factory();
	else
		root["SPARQLER"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(1);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(17));
__export(__webpack_require__(12));
__export(__webpack_require__(42));
__export(__webpack_require__(8));
__export(__webpack_require__(13));
__export(__webpack_require__(9));
__export(__webpack_require__(4));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));
__export(__webpack_require__(31));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
__export(__webpack_require__(22));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));
__export(__webpack_require__(27));
__export(__webpack_require__(28));
__export(__webpack_require__(29));
__export(__webpack_require__(30));


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StringLiteral_1 = __webpack_require__(9);
var Token_1 = __webpack_require__(4);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var ObjectPattern_1 = __webpack_require__(10);
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (property, objects) {
        this.patternTokens = [];
        return this._addPattern(property, objects);
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: function (property, objects) {
                    _this.patternTokens.push(tokens_1.SAME_SUBJECT_SEPARATOR);
                    return _this._addPattern(property, objects);
                },
            },
        };
    };
    ;
    TriplesPattern.prototype._addPattern = function (property, values) {
        var tokens = (typeof property === "string" || property instanceof String)
            ? this.resolver._resolveIRI(property, true)
            : property.getSelfTokens();
        values = Array.isArray(values) ? values : [values];
        values.forEach(function (value, index, array) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(value));
            if (index < array.length - 1)
                tokens.push(tokens_1.SAME_PROPERTY_SEPARATOR);
        });
        (_a = this.patternTokens).push.apply(_a, tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
exports.default = TriplesPattern;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TriplesPattern_1 = __webpack_require__(6);
var TriplesSubject = (function (_super) {
    __extends(TriplesSubject, _super);
    function TriplesSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TriplesSubject.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () {
                return _this.getSelfTokens().concat(_this.patternTokens);
            },
        };
    };
    return TriplesSubject;
}(TriplesPattern_1.TriplesPattern));
exports.TriplesSubject = TriplesSubject;
exports.default = TriplesSubject;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __webpack_require__(4);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(5);
var NewLineSymbol_1 = __webpack_require__(12);
var Operator_1 = __webpack_require__(8);
var RightSymbol_1 = __webpack_require__(13);
var Token_1 = __webpack_require__(4);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var XSD = __webpack_require__(43);
var StringLiteral_1 = __webpack_require__(9);
var tokens_1 = __webpack_require__(0);
var PatternBuilder_1 = __webpack_require__(15);
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [tokens_1.UNDEF];
        return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), tokens_1.CLOSE_QUOTE];
    }
    if (typeof object === "number" || object instanceof Number) {
        if (Number.isInteger(object.valueOf()))
            return this.addType(object + "", "integer");
        return this.addType(object + "", "float");
    }
    if (typeof object === "boolean" || object instanceof Boolean)
        return this.addType(object + "", "boolean");
    if (object instanceof Date)
        return this.addType(object.toISOString(), "dateTime");
    return object.getSelfTokens();
}
exports.serialize = serialize;
function addType(value, type) {
    if (type in XSD)
        type = XSD[type];
    return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), tokens_1.CLOSE_QUOTE, tokens_1.OFF_TYPE, tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), tokens_1.CLOSE_IRI];
}
exports.addType = addType;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(32);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var IRIResolver = (function () {
    function IRIResolver(base, vocab) {
        var _newTarget = this.constructor;
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (_newTarget === IRIResolver)
            Object.freeze(this);
    }
    IRIResolver.prototype._resolveIRI = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (utils_1.isPrefixed(relativeIRI)) {
            var _a = utils_1.getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
            var used = this._prefixes.get(prefix);
            if (used === void 0)
                throw new Error("IllegalArgumentError: The used prefix has not been declared");
            tokens = [new tokens_2.StringLiteral(prefix), tokens_1.PREFIX_SYMBOL, new tokens_2.StringLiteral(prefixIRI)];
            if (!used)
                this._prefixes.set(prefix, true);
        }
        else {
            tokens = utils_1.resolve(relativeIRI, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return IRIResolver;
}());
exports.IRIResolver = IRIResolver;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __webpack_require__(4);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(5);
var LeftSymbol_1 = __webpack_require__(17);
var NewLineSymbol_1 = __webpack_require__(12);
var Operator_1 = __webpack_require__(8);
var Token_1 = __webpack_require__(4);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function toCompactString() {
    var _this = this;
    var ignore = 0;
    return this._tokens.reduce(function (res, token, index, tokens) {
        if (ignore) {
            --ignore;
            return res;
        }
        if (token === tokens_1.WHERE)
            return res;
        var nextToken = tokens[index + 1];
        if (token === tokens_1.PREFIX && !_this._iriResolver._prefixes.get(nextToken["value"])) {
            ignore = 5;
            return res;
        }
        if (nextToken === tokens_1.EMPTY_SEPARATOR)
            nextToken = tokens[index + 2];
        return res + token.getTokenValue(tokens_2.TokenFormat.COMPACT, nextToken);
    }, "");
}
function toPrettyString() {
    var stack = [];
    var actual = {
        token: null,
        indentation: 0,
        subject: 0,
        property: 0,
        spaces: 0,
    };
    return this._tokens.reduce(function (res, token, index, tokens) {
        var nextToken = tokens[index + 1];
        var tokenString = token.getTokenValue(tokens_2.TokenFormat.PRETTY, nextToken);
        if (actual.spaces === 0) {
            actual.subject += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        else if (actual.spaces === 1) {
            actual.property += tokenString.length;
            if (tokenString.endsWith(" "))
                actual.spaces++;
        }
        if ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(token) !== -1) {
            stack.push(actual);
            actual = {
                token: token,
                indentation: actual.indentation + 4,
                subject: 0,
                property: 0,
                spaces: token === tokens_1.OPEN_MULTI_BLOCK ? 0 : token === tokens_1.OPEN_MULTI_BN ? 1 : 2,
            };
        }
        else if ([tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            if (nextToken && !(nextToken instanceof tokens_2.NewLineSymbol)) {
                var parent = actual;
                while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST].indexOf(parent.token) === -1)
                    parent = stack.pop();
                stack.push(parent);
                actual = {
                    token: token,
                    indentation: parent.indentation + 4,
                    subject: 0,
                    property: 0,
                    spaces: 1,
                };
            }
        }
        else if ([tokens_1.SAME_SUBJECT_SEPARATOR, tokens_1.SAME_PROPERTY_SEPARATOR, tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
            var parent = actual;
            while ([tokens_1.OPEN_MULTI_BLOCK, tokens_1.OPEN_MULTI_BN, tokens_1.OPEN_MULTI_LIST, tokens_1.CLOSE_MULTI_LIST, tokens_1.CLOSE_MULTI_BN].indexOf(parent.token) === -1)
                parent = stack.pop();
            stack.push(parent);
            if (token === tokens_1.SAME_SUBJECT_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject,
                    subject: actual.subject,
                    property: 0,
                    spaces: 1,
                };
            }
            else if (token === tokens_1.SAME_PROPERTY_SEPARATOR) {
                actual = {
                    token: token,
                    indentation: parent.indentation + actual.subject + actual.property,
                    subject: actual.subject,
                    property: actual.property,
                    spaces: 2,
                };
            }
        }
        else if (token === tokens_1.GRAPH_PATTERN_SEPARATOR) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual.spaces = 0;
            actual.subject = 0;
            actual.property = 0;
        }
        if (nextToken === tokens_1.CLOSE_MULTI_BLOCK) {
            while (actual.token !== tokens_1.OPEN_MULTI_BLOCK)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_BN) {
            while (actual.token !== tokens_1.OPEN_MULTI_BN)
                actual = stack.pop();
            actual = stack.pop();
        }
        else if (nextToken === tokens_1.CLOSE_MULTI_LIST) {
            while (actual.token !== tokens_1.OPEN_MULTI_LIST)
                actual = stack.pop();
            actual = stack.pop();
        }
        if (tokenString.endsWith("\n")) {
            tokenString = tokenString + " ".repeat(actual.indentation);
        }
        return res + tokenString;
    }, "");
}
function finishDecorator(container, object) {
    return clauses_1.genericDecorator({
        toCompactString: toCompactString,
        toPrettyString: toPrettyString,
        toString: toPrettyString,
    }, container, object);
}
exports.finishDecorator = finishDecorator;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var notTriples_1 = __webpack_require__(16);
var tokens_1 = __webpack_require__(0);
var triples_1 = __webpack_require__(41);
var tokens_2 = __webpack_require__(1);
var Patterns_1 = __webpack_require__(18);
var PatternBuilder = (function () {
    function PatternBuilder(resolver) {
        this.resolver = resolver;
    }
    Object.defineProperty(PatternBuilder, "undefined", {
        get: function () { return "UNDEF"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatternBuilder.prototype, "undefined", {
        get: function () { return PatternBuilder.undefined; },
        enumerable: true,
        configurable: true
    });
    ;
    PatternBuilder.prototype.resource = function (iri) {
        return new triples_1.Resource(this.resolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new triples_1.Variable(this.resolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new triples_1.RDFLiteral(this.resolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new triples_1.NumericLiteral(this.resolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new triples_1.BooleanLiteral(this.resolver, value);
        throw new Error("InvalidArgumentError: No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("InvalidArgumentError: The collection needs at least one value.");
        return new triples_1.Collection(this.resolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new triples_1.BlankNode(this.resolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.resolver._resolveIRI(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Patterns_1.getBlockTokens(patterns1);
        var rightPatternTokens = Patterns_1.getBlockTokens(patterns2);
        return new notTriples_1.NotTriplesPattern(leftPatternTokens.concat([tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new notTriples_1.ValuesPattern(this.resolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.SERVICE, tokens_1.SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [tokens_1.BIND, tokens_1.OPEN_SINGLE_LIST, new tokens_2.StringLiteral(rawExpression), tokens_1.AS].concat(variable.getSelfTokens(), [tokens_1.CLOSE_SINGLE_LIST]);
        return new notTriples_1.NotTriplesPattern(patternTokens);
    };
    PatternBuilder.prototype.filter = function (rawConstraint) {
        return new notTriples_1.NotTriplesPattern([tokens_1.FILTER, new tokens_2.StringLiteral(rawConstraint)]);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
exports.default = PatternBuilder;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(34));
__export(__webpack_require__(35));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(5);
var Token_1 = __webpack_require__(4);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = tokens_1.CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = tokens_1.OPEN_MULTI_BLOCK;
        closeToken = tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    var patternArray = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patternArray.forEach(function (graphPattern, index, array) {
        var tokens = graphPattern.getPattern();
        if (lastToken === tokens_1.GRAPH_PATTERN_SEPARATOR && (tokens[0] instanceof tokens_2.Identifier || tokens[0] === tokens_1.OPEN_MULTI_BLOCK || tokens[0] === tokens_1.OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < array.length - 1 && lastToken !== tokens_1.CLOSE_MULTI_BLOCK && lastToken !== tokens_1.CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = tokens_1.GRAPH_PATTERN_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof tokens_2.NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var SPARQLER = (function () {
    function SPARQLER(finishDecorator) {
        var container = new clauses_1.Container(finishDecorator);
        return decorators_1.queryDecorator(container, this);
    }
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
exports.default = SPARQLER;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var SPARQLER_1 = __webpack_require__(19);
module.exports = SPARQLER_1.SPARQLER;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var finish_1 = __webpack_require__(14);
var IRIResolver_1 = __webpack_require__(11);
var Container = (function () {
    function Container(previousContainerOrFinishDecorator, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = previousContainerOrFinishDecorator instanceof Function
            ? void 0
            : previousContainerOrFinishDecorator;
        var finishDecorator = previousContainerOrFinishDecorator instanceof Function
            ? previousContainerOrFinishDecorator
            : finish_1.finishDecorator;
        this._iriResolver = iriResolver
            ? iriResolver : container
            ? new IRIResolver_1.IRIResolver(container._iriResolver)
            : new IRIResolver_1.IRIResolver();
        var previousTokens = container ? container._tokens : [];
        this._tokens = newTokens
            ? previousTokens.concat(newTokens)
            : previousTokens;
        this._finishDecorator = container
            ? container._finishDecorator
            : finishDecorator;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;
exports.default = Container;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var tokens_1 = __webpack_require__(0);
function _from(self, tokens, iri) {
    tokens.push.apply(tokens, self._iriResolver._resolveIRI(iri));
    var container = new clauses_1.Container(self, tokens);
    return decorators_1.whereDecorator(container, {});
}
function from(iri) {
    return _from(this, [tokens_1.FROM], iri);
}
function fromNamed(iri) {
    return _from(this, [tokens_1.FROM, tokens_1.NAMED], iri);
}
function fromDecorator(container, object) {
    return clauses_1.genericDecorator({ from: from, fromNamed: fromNamed }, container, decorators_1.whereDecorator(container, object));
}
exports.fromDecorator = fromDecorator;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
function getPattern() {
    return this._tokens;
}
function graphPatternDecorator(container, object) {
    return clauses_1.genericDecorator({ getPattern: getPattern }, container, object);
}
exports.graphPatternDecorator = graphPatternDecorator;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function groupBy(rawCondition) {
    var tokens = [tokens_1.GROUP, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new clauses_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.havingDecorator(container, {}));
}
function groupDecorator(container, object) {
    return clauses_1.genericDecorator({ groupBy: groupBy }, container, decorators_1.havingDecorator(container, object));
}
exports.groupDecorator = groupDecorator;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function having(rawCondition) {
    var tokens = [tokens_1.HAVING, new tokens_2.StringLiteral(rawCondition)];
    var container = new clauses_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.orderDecorator(container, {}));
}
function havingDecorator(container, object) {
    return clauses_1.genericDecorator({ having: having }, container, decorators_1.orderDecorator(container, object));
}
exports.havingDecorator = havingDecorator;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var LimitContainer = (function (_super) {
    __extends(LimitContainer, _super);
    function LimitContainer(previousContainer, newTokens, offsetUsed) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._offsetUsed = offsetUsed;
        Object.freeze(_this);
        return _this;
    }
    return LimitContainer;
}(clauses_1.Container));
exports.LimitContainer = LimitContainer;
var OffsetContainer = (function (_super) {
    __extends(OffsetContainer, _super);
    function OffsetContainer(previousContainer, newTokens, limitUsed) {
        var _this = _super.call(this, previousContainer, newTokens) || this;
        _this._limitUsed = limitUsed;
        Object.freeze(_this);
        return _this;
    }
    return OffsetContainer;
}(clauses_1.Container));
exports.OffsetContainer = OffsetContainer;
function limit(limit) {
    var tokens = [tokens_1.LIMIT, new tokens_2.NumberLiteral(limit)];
    if (this._offsetUsed) {
        var container_1 = new clauses_1.Container(this, tokens);
        return this._finishDecorator(container_1, {});
    }
    var container = new OffsetContainer(this, tokens, true);
    return this._finishDecorator(container, offsetBuilderDecorator(container, {}));
}
exports.limit = limit;
function offset(offset) {
    var tokens = [tokens_1.OFFSET, new tokens_2.NumberLiteral(offset)];
    if (this._limitUsed) {
        var container_2 = new clauses_1.Container(this, tokens);
        return this._finishDecorator(container_2, {});
    }
    var container = new LimitContainer(this, tokens, true);
    return this._finishDecorator(container, limitBuilderDecorator(container, {}));
}
exports.offset = offset;
function limitBuilderDecorator(container, object) {
    return clauses_1.genericDecorator({ limit: limit }, container, object);
}
exports.limitBuilderDecorator = limitBuilderDecorator;
function offsetBuilderDecorator(container, object) {
    return clauses_1.genericDecorator({ offset: offset }, container, object);
}
exports.offsetBuilderDecorator = offsetBuilderDecorator;
function limitOffsetDecorator(container, object) {
    return clauses_1.genericDecorator({
        limit: limit,
        offset: offset,
    }, container, object);
}
exports.limitOffsetDecorator = limitOffsetDecorator;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function orderBy(rawCondition) {
    var tokens = [tokens_1.ORDER, tokens_1.BY, new tokens_2.StringLiteral(rawCondition)];
    var container = new clauses_1.Container(this, tokens);
    return this._finishDecorator(container, decorators_1.limitOffsetDecorator(container, {}));
}
exports.orderBy = orderBy;
function orderDecorator(container, object) {
    return clauses_1.genericDecorator({ orderBy: orderBy }, container, decorators_1.limitOffsetDecorator(container, object));
}
exports.orderDecorator = orderDecorator;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var IRIResolver_1 = __webpack_require__(11);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
function base(iri) {
    var tokens = [tokens_1.BASE, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new clauses_1.Container(this, tokens);
    return queryDecorator(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver, iri);
    var container = new clauses_1.Container(this, null, iriResolver);
    return queryDecorator(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    iriResolver._prefixes.set(name, false);
    var tokens = [tokens_1.PREFIX, new tokens_2.StringLiteral(name), tokens_1.PREFIX_SYMBOL, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new clauses_1.Container(this, tokens, iriResolver);
    return queryDecorator(container, {});
}
function queryDecorator(container, object) {
    return clauses_1.genericDecorator({ base: base, vocab: vocab, prefix: prefix }, container, decorators_1.selectDecorator(container, object));
}
exports.queryDecorator = queryDecorator;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var SubSelectContainer = (function (_super) {
    __extends(SubSelectContainer, _super);
    function SubSelectContainer(previousContainer, tokens) {
        var _this = _super.call(this, previousContainer, tokens) || this;
        _this._finishDecorator = decorators_1.graphPatternDecorator;
        Object.freeze(_this);
        return _this;
    }
    return SubSelectContainer;
}(clauses_1.Container));
exports.SubSelectContainer = SubSelectContainer;
function _select(self, tokens, variables) {
    if (variables && variables.length === 0)
        throw new Error("IllegalArgumentError: Need to provide al least one variable.");
    if (variables)
        variables.forEach(function (variable) { return tokens.push(tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(variable)); });
    var container = new clauses_1.Container(self, tokens);
    if (self._finishDecorator === decorators_1.graphPatternDecorator)
        return decorators_1.whereDecorator(container, {});
    return decorators_1.fromDecorator(container, {});
}
function select() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT], variables);
}
function selectDistinct() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT], variables);
}
function selectReduced() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED], variables);
}
function selectAll() {
    return _select(this, [tokens_1.SELECT, tokens_1.ALL]);
}
function selectAllDistinct() {
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT, tokens_1.ALL]);
}
function selectAllReduced() {
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED, tokens_1.ALL]);
}
function selectDecorator(container, object) {
    return clauses_1.genericDecorator({
        select: select,
        selectDistinct: selectDistinct,
        selectReduced: selectReduced,
        selectAll: selectAll,
        selectAllDistinct: selectAllDistinct,
        selectAllReduced: selectAllReduced,
    }, container, object);
}
exports.selectDecorator = selectDecorator;
function subSelectDecorator(container, object) {
    return clauses_1.genericDecorator({
        select: select,
        selectDistinct: selectDistinct,
        selectReduced: selectReduced,
        selectAll: selectAll,
        selectAllDistinct: selectAllDistinct,
        selectAllReduced: selectAllReduced,
    }, container, object);
}
exports.subSelectDecorator = subSelectDecorator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = __webpack_require__(2);
var decorators_1 = __webpack_require__(3);
var IRIResolver_1 = __webpack_require__(11);
var patterns_1 = __webpack_require__(33);
var tokens_1 = __webpack_require__(0);
var Patterns_1 = __webpack_require__(18);
function where(patternFunction) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var result = patternFunction(new patterns_1.PatternBuilder(iriResolver));
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(result));
    var container = new clauses_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, decorators_1.groupDecorator(container, {}));
}
function whereDecorator(container, object) {
    return clauses_1.genericDecorator({ where: where }, container, decorators_1.groupDecorator(container, object));
}
exports.whereDecorator = whereDecorator;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function genericDecorator(properties, container, object) {
    for (var _i = 0, _a = Object.keys(properties); _i < _a.length; _i++) {
        var key = _a[_i];
        properties[key] = properties[key].bind(container);
    }
    return Object.assign(object, properties);
}
exports.genericDecorator = genericDecorator;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringLiteral_1 = __webpack_require__(9);
var tokens_1 = __webpack_require__(0);
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
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return !!iri.match(prefixRegex) && !hasProtocol(iri);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(15));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NotTriplesPattern = (function () {
    function NotTriplesPattern(tokens) {
        this.patternTokens = tokens;
    }
    NotTriplesPattern.prototype.getPattern = function () {
        return this.patternTokens;
    };
    return NotTriplesPattern;
}());
exports.NotTriplesPattern = NotTriplesPattern;
exports.default = NotTriplesPattern;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var notTriples_1 = __webpack_require__(16);
var tokens_1 = __webpack_require__(0);
var ObjectPattern_1 = __webpack_require__(10);
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.length = variables.length;
        if (_this.length === 1) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST, tokens_1.OPEN_MULTI_BLOCK);
        }
        return _this;
        var _a;
    }
    ValuesPattern.prototype.has = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (this.length !== values.length)
            throw new Error("InvalidArgumentError: The number of variables and values are different.");
        if (this.length === 1) {
            (_a = this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(values[0]));
        }
        else {
            this.patternTokens.push(tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern_1.serialize(value));
                var _a;
            });
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.length === 1) {
            this.patternTokens.push(tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(tokens_1.CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            },
        };
    };
    return ValuesPattern;
}(notTriples_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
exports.default = ValuesPattern;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var TriplesPattern_1 = __webpack_require__(6);
var BlankNode = (function (_super) {
    __extends(BlankNode, _super);
    function BlankNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === tokens_1.SAME_SUBJECT_SEPARATOR || token === tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [tokens_1.CLOSE_SINGLE_BN]);
        return [tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [tokens_1.CLOSE_MULTI_BN]);
    };
    BlankNode.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getSelfTokens(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return BlankNode;
}(TriplesPattern_1.TriplesPattern));
exports.BlankNode = BlankNode;
exports.default = BlankNode;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var ObjectPattern_1 = __webpack_require__(10);
var TriplesPattern_1 = __webpack_require__(6);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        var tokens = [];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(value));
            if (index < values.length - 1)
                tokens.push(tokens_1.EMPTY_SEPARATOR);
        });
        var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof tokens_2.NewLineSymbol; });
        _this.elementTokens = [
            isSingle ? tokens_1.OPEN_SINGLE_LIST : tokens_1.OPEN_MULTI_LIST
        ].concat(tokens, [
            isSingle ? tokens_1.CLOSE_SINGLE_LIST : tokens_1.CLOSE_MULTI_LIST,
        ]);
        return _this;
    }
    Collection.prototype.getPattern = function () {
        return this.getSelfTokens().concat(this.patternTokens);
    };
    Collection.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getPattern(); },
            getSelfTokens: function () { return _this.getSelfTokens(); },
        };
    };
    return Collection;
}(TriplesPattern_1.TriplesPattern));
exports.Collection = Collection;
exports.default = Collection;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var ObjectPattern_1 = __webpack_require__(10);
var TriplesSubject_1 = __webpack_require__(7);
var Literal = (function (_super) {
    __extends(Literal, _super);
    function Literal(resolver, value) {
        var _this = _super.call(this, resolver) || this;
        _this.value = value + "";
        return _this;
    }
    return Literal;
}(TriplesSubject_1.TriplesSubject));
exports.Literal = Literal;
var RDFLiteral = (function (_super) {
    __extends(RDFLiteral, _super);
    function RDFLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = [tokens_1.OPEN_QUOTE, new tokens_2.StringLiteral(value), tokens_1.CLOSE_QUOTE];
        return _this;
    }
    RDFLiteral.prototype.ofType = function (type) {
        this.elementTokens = ObjectPattern_1.addType(this.value, type);
        return this;
    };
    ;
    RDFLiteral.prototype.withLanguage = function (language) {
        this.elementTokens = [tokens_1.OPEN_QUOTE, new tokens_2.StringLiteral(this.value), tokens_1.CLOSE_QUOTE, tokens_1.LANG_SYMBOL, new tokens_2.StringLiteral(language)];
        return this;
    };
    ;
    return RDFLiteral;
}(Literal));
exports.RDFLiteral = RDFLiteral;
var NumericLiteral = (function (_super) {
    __extends(NumericLiteral, _super);
    function NumericLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        var type = Number.isInteger(value) ? "integer" : "float";
        _this.elementTokens = ObjectPattern_1.addType(_this.value, type);
        return _this;
    }
    return NumericLiteral;
}(Literal));
exports.NumericLiteral = NumericLiteral;
var BooleanLiteral = (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = ObjectPattern_1.addType(_this.value, "boolean");
        return _this;
    }
    return BooleanLiteral;
}(Literal));
exports.BooleanLiteral = BooleanLiteral;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TriplesSubject_1 = __webpack_require__(7);
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(resolver, iri) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = resolver._resolveIRI(iri);
        return _this;
    }
    return Resource;
}(TriplesSubject_1.TriplesSubject));
exports.Resource = Resource;
exports.default = Resource;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __webpack_require__(0);
var tokens_2 = __webpack_require__(1);
var TriplesSubject_1 = __webpack_require__(7);
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = [tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
exports.default = Variable;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(36));
__export(__webpack_require__(37));
__export(__webpack_require__(38));
__export(__webpack_require__(39));
__export(__webpack_require__(6));
__export(__webpack_require__(7));
__export(__webpack_require__(40));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier_1 = __webpack_require__(5);
var Operator_1 = __webpack_require__(8);
var RightSymbol_1 = __webpack_require__(13);
var Token_1 = __webpack_require__(4);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMESPACE = "http://www.w3.org/2001/XMLSchema#";
exports.dateTime = exports.NAMESPACE + "dateTime";
exports.integer = exports.NAMESPACE + "integer";
exports.float = exports.NAMESPACE + "float";
exports.boolean = exports.NAMESPACE + "boolean";
exports.string = exports.NAMESPACE + "string";


/***/ })
/******/ ]);
});