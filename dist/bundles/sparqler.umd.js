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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var RightSymbol_1 = __webpack_require__(6);
var LeftSymbol_1 = __webpack_require__(12);
var NewLineSymbol_1 = __webpack_require__(4);
var Operator_1 = __webpack_require__(5);
var Identifier_1 = __webpack_require__(2);
exports.VAR_SYMBOL = new LeftSymbol_1.LeftSymbol("?");
exports.PREFIX_SYMBOL = new Operator_1.Operator(":");
exports.OFF_TYPE = new Operator_1.Operator("^^");
exports.LANG_SYMBOL = new Operator_1.Operator("@");
exports.OPEN_IRI = new LeftSymbol_1.LeftSymbol("<");
exports.CLOSE_IRI = new RightSymbol_1.RightSymbol(">");
exports.OPEN_QUOTE = new LeftSymbol_1.LeftSymbol("\"");
exports.CLOSE_QUOTE = new RightSymbol_1.RightSymbol("\"");
exports.TRIPLE_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(".");
exports.SAME_SUBJECT_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(";");
exports.SAME_PROPERTY_SEPARATOR = new NewLineSymbol_1.NewLineSymbol(",");
exports.EMPTY_SEPARATOR = new NewLineSymbol_1.NewLineSymbol("");
exports.OPEN_MULTI_BLOCK = new NewLineSymbol_1.NewLineSymbol("{");
exports.CLOSE_MULTI_BLOCK = new NewLineSymbol_1.NewLineSymbol("}");
exports.OPEN_SINGLE_BLOCK = new LeftSymbol_1.LeftSymbol("{");
exports.CLOSE_SINGLE_BLOCK = new RightSymbol_1.RightSymbol("}");
exports.OPEN_MULTI_BN = new NewLineSymbol_1.NewLineSymbol("[");
exports.CLOSE_MULTI_BN = new NewLineSymbol_1.NewLineSymbol("]");
exports.OPEN_SINGLE_BN = new LeftSymbol_1.LeftSymbol("[");
exports.CLOSE_SINGLE_BN = new RightSymbol_1.RightSymbol("]");
exports.OPEN_MULTI_LIST = new NewLineSymbol_1.NewLineSymbol("(");
exports.CLOSE_MULTI_LIST = new NewLineSymbol_1.NewLineSymbol(")");
exports.OPEN_SINGLE_LIST = new LeftSymbol_1.LeftSymbol("(");
exports.CLOSE_SINGLE_LIST = new RightSymbol_1.RightSymbol(")");
exports.GRAPH = new Identifier_1.Identifier("GRAPH");
exports.OPTIONAL = new Identifier_1.Identifier("OPTIONAL");
exports.UNION = new Identifier_1.Identifier("UNION");
exports.MINUS = new Identifier_1.Identifier("MINUS");
exports.VALUES = new Identifier_1.Identifier("VALUES");
exports.UNDEF = new Identifier_1.Identifier("UNDEF");


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

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
        var separator = exports.SPACE_SEPARATOR;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Token;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var StringLiteral_1 = __webpack_require__(3);
var Identifier = (function (_super) {
    __extends(Identifier, _super);
    function Identifier() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Identifier;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var Identifier_1 = __webpack_require__(2);
var Operator_1 = __webpack_require__(5);
var RightSymbol_1 = __webpack_require__(6);
var NewLineSymbol_1 = __webpack_require__(4);
var StringLiteral = (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral() {
        return _super.apply(this, arguments) || this;
    }
    StringLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier || (nextToken instanceof NewLineSymbol_1.NewLineSymbol && nextToken["value"] === ")"))
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringLiteral;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var NewLineSymbol = (function (_super) {
    __extends(NewLineSymbol, _super);
    function NewLineSymbol() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewLineSymbol;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var Operator = (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Operator;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var Identifier_1 = __webpack_require__(2);
var Operator_1 = __webpack_require__(5);
var NewLineSymbol_1 = __webpack_require__(4);
var LeftSymbol_1 = __webpack_require__(12);
var RightSymbol = (function (_super) {
    __extends(RightSymbol, _super);
    function RightSymbol() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RightSymbol;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var XSD = __webpack_require__(23);
var StringLiteral_1 = __webpack_require__(3);
var Tokens_1 = __webpack_require__(0);
var PatternBuilder_1 = __webpack_require__(11);
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [Tokens_1.UNDEF];
        return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), Tokens_1.CLOSE_QUOTE];
    }
    if (typeof object === "number" || object instanceof Number) {
        if (Number.isInteger(object.valueOf()))
            return addType(object + "", "integer");
        return addType(object + "", "float");
    }
    if (typeof object === "boolean" || object instanceof Boolean)
        return addType(object + "", "boolean");
    if (object instanceof Date)
        return addType(object.toISOString(), "dateTime");
    return object.getSelfTokens();
}
exports.serialize = serialize;
function addType(value, type) {
    if (type in XSD)
        type = XSD[type];
    return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), Tokens_1.CLOSE_QUOTE, Tokens_1.OFF_TYPE, Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), Tokens_1.CLOSE_IRI];
}
exports.addType = addType;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var ObjectPattern = __webpack_require__(7);
var Tokens_1 = __webpack_require__(0);
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (propertyIRIOrVariable, valueOrValues) {
        var _this = this;
        var property = (typeof propertyIRIOrVariable === "string" || propertyIRIOrVariable instanceof String)
            ? this.resolver._resolveIRI(propertyIRIOrVariable, true)
            : propertyIRIOrVariable.getSelfTokens();
        valueOrValues = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
        if (this.patternTokens.length > 0)
            property.unshift(Tokens_1.SAME_SUBJECT_SEPARATOR);
        (_a = this.patternTokens).push.apply(_a, property);
        valueOrValues.forEach(function (value, index) {
            (_a = _this.patternTokens).push.apply(_a, ObjectPattern.serialize(value));
            if (index < valueOrValues.length - 1)
                _this.patternTokens.push(Tokens_1.SAME_PROPERTY_SEPARATOR);
            var _a;
        });
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
            },
        };
    };
    ;
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesPattern;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesPattern_1 = __webpack_require__(8);
var TriplesSubject = (function (_super) {
    __extends(TriplesSubject, _super);
    function TriplesSubject() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesSubject;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotTriplesPattern;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var Literals_1 = __webpack_require__(19);
var Resource_1 = __webpack_require__(20);
var Variable_1 = __webpack_require__(21);
var BlankNode_1 = __webpack_require__(17);
var Collection_1 = __webpack_require__(18);
var NotTriplesPattern_1 = __webpack_require__(10);
var Tokens_1 = __webpack_require__(0);
var Utils = __webpack_require__(13);
var ValuesPattern_1 = __webpack_require__(15);
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
        return new Resource_1.Resource(this.resolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new Variable_1.Variable(this.resolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new Literals_1.RDFLiteral(this.resolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new Literals_1.NumericLiteral(this.resolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new Literals_1.BooleanLiteral(this.resolver, value);
        throw new Error("InvalidArgumentError: No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("InvalidArgumentError: The collection needs at least one value.");
        return new Collection_1.Collection(this.resolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new BlankNode_1.BlankNode(this.resolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.resolver._resolveIRI(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Utils.getBlockTokens(patterns1);
        var rightPatternTokens = Utils.getBlockTokens(patterns2);
        return new NotTriplesPattern_1.NotTriplesPattern(leftPatternTokens.concat([Tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new ValuesPattern_1.ValuesPattern(this.resolver, variables);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PatternBuilder;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var Identifier_1 = __webpack_require__(2);
var LeftSymbol = (function (_super) {
    __extends(LeftSymbol, _super);
    function LeftSymbol() {
        return _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeftSymbol;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var Tokens_1 = __webpack_require__(0);
var Identifier_1 = __webpack_require__(2);
function getBlockTokens(patterns) {
    var tokens = getTokens(patterns);
    var openToken = Tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = Tokens_1.CLOSE_SINGLE_BLOCK;
    if (isMultiLine(tokens)) {
        openToken = Tokens_1.OPEN_MULTI_BLOCK;
        closeToken = Tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patterns.forEach(function (graphPattern, index) {
        var tokens = graphPattern.getPattern();
        if (lastToken === Tokens_1.TRIPLE_SEPARATOR && (tokens[0] instanceof Identifier_1.Identifier || tokens[0] === Tokens_1.OPEN_MULTI_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < patterns.length - 1 && lastToken !== Tokens_1.CLOSE_MULTI_BLOCK) {
            lastToken = Tokens_1.TRIPLE_SEPARATOR;
            triplesTokens.push(Tokens_1.TRIPLE_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return [".", ";", ","].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var IRIUtils = __webpack_require__(22);
var PatternsUtils = __webpack_require__(13);
var PatternBuilder_1 = __webpack_require__(11);
var Token_1 = __webpack_require__(1);
var Identifier_1 = __webpack_require__(2);
var StringLiteral_1 = __webpack_require__(3);
var RightSymbol_1 = __webpack_require__(6);
var NumberLiteral_1 = __webpack_require__(16);
var Tokens_1 = __webpack_require__(0);
var NewLineSymbol_1 = __webpack_require__(4);
var SPARQLER = (function () {
    function SPARQLER() {
        this._prefixes = new Map();
        this.initInterfaces();
    }
    SPARQLER.prototype.base = function (iri) {
        this._base = iri;
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype.vocab = function (iri) {
        this._vocab = iri;
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype.prefix = function (name, iri) {
        this._prefixes.set(name, {
            iri: iri,
            used: false,
        });
        return this.interfaces.queryClause;
    };
    SPARQLER.prototype.select = function () {
        var _this = this;
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        if (variables.length === 0)
            throw new Error("IllegalArgumentError: Need to provide al least one variable.");
        this._selects = [new Identifier_1.Identifier("SELECT")];
        variables.forEach(function (variable) { return _this._selects.push(Tokens_1.VAR_SYMBOL, new StringLiteral_1.StringLiteral(variable)); });
        return Object.assign({}, this.interfaces.whereClause, this.interfaces.fromClause);
    };
    SPARQLER.prototype.selectAll = function () {
        this._selects = [new Identifier_1.Identifier("SELECT"), new RightSymbol_1.RightSymbol("*")];
        return Object.assign({}, this.interfaces.whereClause, this.interfaces.fromClause);
    };
    SPARQLER.prototype.from = function (iri) {
        this._from = [new Identifier_1.Identifier("FROM")].concat(this._resolveIRI(iri));
        return this.interfaces.whereClause;
    };
    SPARQLER.prototype.fromNamed = function (iri) {
        this._from = [new Identifier_1.Identifier("FROM"), new Identifier_1.Identifier("NAMED")].concat(this._resolveIRI(iri));
        return this.interfaces.whereClause;
    };
    SPARQLER.prototype.where = function (patternFunction) {
        var result = patternFunction(new PatternBuilder_1.PatternBuilder(this));
        this._where = [new Identifier_1.Identifier("WHERE")].concat(PatternsUtils.getBlockTokens(result));
        return Object.assign({}, this.interfaces.groupClause, this.interfaces.havingClause, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.groupBy = function (rawCondition) {
        this._group = [new Identifier_1.Identifier("GROUP"), new Identifier_1.Identifier("BY"), new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.havingClause, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.having = function (rawCondition) {
        this._having = [new Identifier_1.Identifier("HAVING"), new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.orderClause, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.orderBy = function (rawCondition) {
        this._order = [new Identifier_1.Identifier("ORDER"), new Identifier_1.Identifier("BY"), new StringLiteral_1.StringLiteral(rawCondition)];
        return Object.assign({}, this.interfaces.limitClause, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.limit = function (limit) {
        this._limit = [new Identifier_1.Identifier("LIMIT"), new NumberLiteral_1.NumberLiteral(limit)];
        if (this._offset)
            return this.interfaces.finishClause;
        return Object.assign({}, this.interfaces.offsetClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.offset = function (offset) {
        this._offset = [new Identifier_1.Identifier("OFFSET"), new NumberLiteral_1.NumberLiteral(offset)];
        if (this._limit)
            return this.interfaces.finishClause;
        return Object.assign({}, this.interfaces.limitClause, this.interfaces.finishClause);
    };
    SPARQLER.prototype.constructQuery = function (format) {
        var tokens = [];
        tokens.push(new Identifier_1.Identifier("BASE"), Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(this._base), Tokens_1.CLOSE_IRI);
        this._prefixes.forEach(function (prefixInfo, prefix) {
            if (prefixInfo.used || format === Token_1.TokenFormat.PRETTY)
                tokens.push(new Identifier_1.Identifier("PREFIX"), new StringLiteral_1.StringLiteral(prefix + ":"), Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(prefixInfo.iri), Tokens_1.CLOSE_IRI);
        });
        tokens.push.apply(tokens, this._selects);
        if (this._from)
            tokens.push.apply(tokens, this._from);
        tokens.push.apply(tokens, this._where);
        if (this._order)
            tokens.push.apply(tokens, this._order);
        if (this._having)
            tokens.push.apply(tokens, this._having);
        if (this._group)
            tokens.push.apply(tokens, this._group);
        if (this._limit)
            tokens.push.apply(tokens, this._limit);
        if (this._offset)
            tokens.push.apply(tokens, this._offset);
        if (format === Token_1.TokenFormat.COMPACT) {
            return tokens.reduce(function (res, token, index) {
                var nextToken = tokens[index + 1];
                if (nextToken === Tokens_1.EMPTY_SEPARATOR)
                    nextToken = tokens[index + 2];
                return res + token.getTokenValue(format, nextToken);
            }, "");
        }
        else if (format === Token_1.TokenFormat.PRETTY) {
            var stack_1 = [];
            var actual_1 = {
                token: null,
                indentation: 0,
                subject: 0,
                property: 0,
                spaces: 0
            };
            return tokens.reduce(function (res, token, index) {
                var nextToken = tokens[index + 1];
                var tokenString = token.getTokenValue(format, nextToken);
                if (actual_1.spaces === 0) {
                    actual_1.subject += tokenString.length;
                    if (tokenString.endsWith(" "))
                        actual_1.spaces++;
                }
                else if (actual_1.spaces === 1) {
                    actual_1.property += tokenString.length;
                    if (tokenString.endsWith(" "))
                        actual_1.spaces++;
                }
                if ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST].indexOf(token) !== -1) {
                    stack_1.push(actual_1);
                    actual_1 = {
                        token: token,
                        indentation: actual_1.indentation + 4,
                        subject: 0,
                        property: 0,
                        spaces: token === Tokens_1.OPEN_MULTI_BLOCK ? 0 : token === Tokens_1.OPEN_MULTI_BN ? 1 : 2,
                    };
                }
                else if ([Tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                    if (!(nextToken instanceof NewLineSymbol_1.NewLineSymbol)) {
                        var parent_1 = actual_1;
                        while ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST].indexOf(parent_1.token) === -1)
                            parent_1 = stack_1.pop();
                        stack_1.push(parent_1);
                        actual_1 = {
                            token: token,
                            indentation: parent_1.indentation + 4,
                            subject: 0,
                            property: 0,
                            spaces: 1
                        };
                    }
                }
                else if ([Tokens_1.SAME_SUBJECT_SEPARATOR, Tokens_1.SAME_PROPERTY_SEPARATOR, Tokens_1.CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                    var parent_2 = actual_1;
                    while ([Tokens_1.OPEN_MULTI_BLOCK, Tokens_1.OPEN_MULTI_BN, Tokens_1.OPEN_MULTI_LIST, Tokens_1.CLOSE_MULTI_LIST, Tokens_1.CLOSE_MULTI_BN].indexOf(parent_2.token) === -1)
                        parent_2 = stack_1.pop();
                    stack_1.push(parent_2);
                    if (token === Tokens_1.SAME_SUBJECT_SEPARATOR) {
                        actual_1 = {
                            token: token,
                            indentation: parent_2.indentation + actual_1.subject,
                            subject: actual_1.subject,
                            property: 0,
                            spaces: 1
                        };
                    }
                    else if (token === Tokens_1.SAME_PROPERTY_SEPARATOR) {
                        actual_1 = {
                            token: token,
                            indentation: parent_2.indentation + actual_1.subject + actual_1.property,
                            subject: actual_1.subject,
                            property: actual_1.property,
                            spaces: 2
                        };
                    }
                }
                else if (token === Tokens_1.TRIPLE_SEPARATOR) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BLOCK)
                        actual_1 = stack_1.pop();
                    actual_1.spaces = 0;
                    actual_1.subject = 0;
                    actual_1.property = 0;
                }
                if (nextToken === Tokens_1.CLOSE_MULTI_BLOCK) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BLOCK)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                else if (nextToken === Tokens_1.CLOSE_MULTI_BN) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_BN)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                else if (nextToken === Tokens_1.CLOSE_MULTI_LIST) {
                    while (actual_1.token !== Tokens_1.OPEN_MULTI_LIST)
                        actual_1 = stack_1.pop();
                    actual_1 = stack_1.pop();
                }
                if (tokenString.endsWith("\n")) {
                    tokenString = tokenString + " ".repeat(actual_1.indentation);
                }
                return res + tokenString;
            }, "");
        }
    };
    SPARQLER.prototype.toCompactString = function () {
        return this.constructQuery(Token_1.TokenFormat.COMPACT);
    };
    SPARQLER.prototype.toString = function () {
        return this.toCompactString();
    };
    SPARQLER.prototype.toPrettyString = function () {
        return this.constructQuery(Token_1.TokenFormat.PRETTY);
    };
    SPARQLER.prototype.initInterfaces = function () {
        this.interfaces = {
            queryClause: {
                base: this.base.bind(this),
                vocab: this.vocab.bind(this),
                prefix: this.prefix.bind(this),
                select: this.select.bind(this),
                selectAll: this.selectAll.bind(this),
            },
            fromClause: {
                from: this.from.bind(this),
                fromNamed: this.fromNamed.bind(this),
            },
            whereClause: {
                where: this.where.bind(this),
            },
            groupClause: {
                groupBy: this.groupBy.bind(this),
            },
            havingClause: {
                having: this.having.bind(this),
            },
            orderClause: {
                orderBy: this.orderBy.bind(this),
            },
            limitClause: {
                limit: this.limit.bind(this),
            },
            offsetClause: {
                offset: this.offset.bind(this),
            },
            finishClause: {
                toCompactString: this.toCompactString.bind(this),
                toPrettyString: this.toPrettyString.bind(this),
            },
        };
    };
    SPARQLER.prototype._resolveIRI = function (iri, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (IRIUtils.isPrefixed(iri)) {
            var parts = IRIUtils.getPrefixedParts(iri);
            if (parts === null)
                return;
            var prefixInfo = this._prefixes.get(parts[0]);
            if (prefixInfo === void 0)
                throw new Error("IllegalArgumentError: The used prefix has not been declared");
            tokens = [new StringLiteral_1.StringLiteral(parts[0]), Tokens_1.PREFIX_SYMBOL, new StringLiteral_1.StringLiteral(parts[1])];
            prefixInfo.used = true;
        }
        else {
            tokens = IRIUtils.resolve(iri, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return SPARQLER;
}());
exports.SPARQLER = SPARQLER;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SPARQLER;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotTriplesPattern_1 = __webpack_require__(10);
var Tokens_1 = __webpack_require__(0);
var ObjectPattern = __webpack_require__(7);
var ValuesPattern = (function (_super) {
    __extends(ValuesPattern, _super);
    function ValuesPattern(resolver, variables) {
        var _this = _super.call(this, [Tokens_1.VALUES]) || this;
        _this.init();
        _this.resolver = resolver;
        _this.isSingle = variables.length === 1;
        if (_this.isSingle) {
            (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([Tokens_1.OPEN_SINGLE_BLOCK]));
        }
        else {
            _this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            variables.forEach(function (variable) {
                return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                var _a;
            });
            _this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST, Tokens_1.OPEN_MULTI_BLOCK);
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
        if (this.isSingle) {
            (_a = this.patternTokens).push.apply(_a, ObjectPattern.serialize(values[0]));
        }
        else {
            this.patternTokens.push(Tokens_1.OPEN_SINGLE_LIST);
            values.forEach(function (value) {
                return (_a = _this.patternTokens).push.apply(_a, ObjectPattern.serialize(value));
                var _a;
            });
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_LIST);
        }
        return this.interfaces.addPattern;
        var _a;
    };
    ValuesPattern.prototype.getPattern = function () {
        if (this.isSingle) {
            this.patternTokens.push(Tokens_1.CLOSE_SINGLE_BLOCK);
        }
        else {
            this.patternTokens.push(Tokens_1.CLOSE_MULTI_BLOCK);
        }
        return this.patternTokens;
    };
    ValuesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
                getPattern: function () { return _this.getPattern(); },
            }
        };
    };
    return ValuesPattern;
}(NotTriplesPattern_1.NotTriplesPattern));
exports.ValuesPattern = ValuesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValuesPattern;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = __webpack_require__(1);
var Identifier_1 = __webpack_require__(2);
var Operator_1 = __webpack_require__(5);
var RightSymbol_1 = __webpack_require__(6);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NumberLiteral;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = __webpack_require__(0);
var TriplesPattern_1 = __webpack_require__(8);
var BlankNode = (function (_super) {
    __extends(BlankNode, _super);
    function BlankNode() {
        return _super.apply(this, arguments) || this;
    }
    BlankNode.prototype.getSelfTokens = function () {
        if (!this.patternTokens.find(function (token) { return token === Tokens_1.SAME_SUBJECT_SEPARATOR || token === Tokens_1.SAME_PROPERTY_SEPARATOR; }))
            return [Tokens_1.OPEN_SINGLE_BN].concat(this.patternTokens, [Tokens_1.CLOSE_SINGLE_BN]);
        return [Tokens_1.OPEN_MULTI_BN].concat(this.patternTokens, [Tokens_1.CLOSE_MULTI_BN]);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlankNode;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tokens_1 = __webpack_require__(0);
var TriplesPattern_1 = __webpack_require__(8);
var ObjectPattern = __webpack_require__(7);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(resolver, values) {
        var _this = _super.call(this, resolver) || this;
        if (values.length === 1) {
            _this.elementTokens = [Tokens_1.OPEN_SINGLE_LIST];
        }
        else {
            _this.elementTokens = [Tokens_1.OPEN_MULTI_LIST];
        }
        values.forEach(function (value, index) {
            (_a = _this.elementTokens).push.apply(_a, ObjectPattern.serialize(value));
            if (index < values.length - 1)
                _this.elementTokens.push(Tokens_1.EMPTY_SEPARATOR);
            var _a;
        });
        if (values.length === 1) {
            _this.elementTokens.push(Tokens_1.CLOSE_SINGLE_LIST);
        }
        else {
            _this.elementTokens.push(Tokens_1.CLOSE_MULTI_LIST);
        }
        return _this;
    }
    Collection.prototype.getPattern = function () {
        return this.elementTokens.concat(this.patternTokens);
    };
    Collection.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.interfaces.graphPattern = {
            getPattern: function () { return _this.getPattern(); },
            getSelfTokens: function () { return _this.elementTokens; },
        };
    };
    return Collection;
}(TriplesPattern_1.TriplesPattern));
exports.Collection = Collection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Collection;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(9);
var ObjectPattern = __webpack_require__(7);
var StringLiteral_1 = __webpack_require__(3);
var Tokens_1 = __webpack_require__(0);
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
        _this.elementTokens = [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), Tokens_1.CLOSE_QUOTE];
        return _this;
    }
    RDFLiteral.prototype.ofType = function (type) {
        this.elementTokens = ObjectPattern.addType(this.value, type);
        return this;
    };
    ;
    RDFLiteral.prototype.withLanguage = function (language) {
        this.elementTokens = [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(this.value), Tokens_1.CLOSE_QUOTE, Tokens_1.LANG_SYMBOL, new StringLiteral_1.StringLiteral(language)];
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
        _this.elementTokens = ObjectPattern.addType(_this.value, type);
        return _this;
    }
    return NumericLiteral;
}(Literal));
exports.NumericLiteral = NumericLiteral;
var BooleanLiteral = (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(resolver, value) {
        var _this = _super.call(this, resolver, value) || this;
        _this.elementTokens = ObjectPattern.addType(_this.value, "boolean");
        return _this;
    }
    return BooleanLiteral;
}(Literal));
exports.BooleanLiteral = BooleanLiteral;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Literal;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(9);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resource;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TriplesSubject_1 = __webpack_require__(9);
var StringLiteral_1 = __webpack_require__(3);
var Tokens_1 = __webpack_require__(0);
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(resolver, name) {
        var _this = _super.call(this, resolver) || this;
        _this.elementTokens = [Tokens_1.VAR_SYMBOL, new StringLiteral_1.StringLiteral(name)];
        return _this;
    }
    return Variable;
}(TriplesSubject_1.TriplesSubject));
exports.Variable = Variable;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Variable;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var StringLiteral_1 = __webpack_require__(3);
var Tokens_1 = __webpack_require__(0);
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
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/;
function isPrefixed(iri) {
    return iri.match(prefixRegex) && !hasProtocol(iri);
}
exports.isPrefixed = isPrefixed;
function getPrefixedParts(iri) {
    var parts = prefixRegex.exec(iri);
    if (parts === null)
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
        tokens = [Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(iri), Tokens_1.CLOSE_IRI];
    }
    return tokens;
}
exports.resolve = resolve;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var ns = "http://www.w3.org/2001/XMLSchema#";
exports.dateTime = ns + "dateTime";
exports.integer = ns + "integer";
exports.float = ns + "float";
exports.boolean = ns + "boolean";
exports.string = ns + "string";


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
var SPARQLER_1 = __webpack_require__( 14 );
(function( root, factory ) {
	if( true ) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ !(function webpackMissingModule() { var e = new Error("Cannot find module \"b\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {
		// Browser globals
		root.amdWeb = factory( root.b );
	}
}( this, function( b ) {
	return SPARQLER_1.default;
} ));


/***/ }
/******/ ]);
});