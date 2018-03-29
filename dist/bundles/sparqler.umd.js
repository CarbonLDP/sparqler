(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('sparqler', ['exports'], factory) :
    (factory((global.sparqler = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var EMPTY_SEPARATOR = "";
    var SPACE_SEPARATOR = " ";
    var NEW_LINE_SEPARATOR = "\n";
    var TokenFormat;
    (function (TokenFormat) {
        TokenFormat[TokenFormat["PRETTY"] = 0] = "PRETTY";
        TokenFormat[TokenFormat["COMPACT"] = 1] = "COMPACT";
    })(TokenFormat || (TokenFormat = {}));
    var Token = (function () {
        function Token(value) {
            this.value = value;
        }
        Token.prototype.getTokenValue = function (format, nextToken) {
            var separator = EMPTY_SEPARATOR;
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

    var NewLineSymbol = (function (_super) {
        __extends(NewLineSymbol, _super);
        function NewLineSymbol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewLineSymbol.prototype.getPrettySeparator = function (nextToken) {
            if (nextToken instanceof NewLineSymbol) {
                if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                    return SPACE_SEPARATOR;
            }
            return NEW_LINE_SEPARATOR;
        };
        NewLineSymbol.prototype.getCompactSeparator = function (nextToken) {
            return EMPTY_SEPARATOR;
        };
        return NewLineSymbol;
    }(Token));

    var Operator = (function (_super) {
        __extends(Operator, _super);
        function Operator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Operator.prototype.getPrettySeparator = function (nextToken) {
            return EMPTY_SEPARATOR;
        };
        Operator.prototype.getCompactSeparator = function (nextToken) {
            return EMPTY_SEPARATOR;
        };
        return Operator;
    }(Token));

    var LeftSymbol = (function (_super) {
        __extends(LeftSymbol, _super);
        function LeftSymbol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LeftSymbol.prototype.getPrettySeparator = function (nextToken) {
            if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier)
                return SPACE_SEPARATOR;
            return EMPTY_SEPARATOR;
        };
        LeftSymbol.prototype.getCompactSeparator = function (nextToken) {
            return EMPTY_SEPARATOR;
        };
        return LeftSymbol;
    }(Token));

    var RightSymbol = (function (_super) {
        __extends(RightSymbol, _super);
        function RightSymbol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightSymbol.prototype.getPrettySeparator = function (nextToken) {
            if (nextToken instanceof Identifier && nextToken["value"] !== "UNDEF")
                return NEW_LINE_SEPARATOR;
            if (nextToken instanceof NewLineSymbol) {
                if (["}", "]", ")"].indexOf(nextToken["value"]) !== -1) {
                    return NEW_LINE_SEPARATOR;
                }
            }
            if (nextToken instanceof LeftSymbol) {
                if (nextToken["value"] === "(")
                    return NEW_LINE_SEPARATOR;
            }
            if (nextToken instanceof Operator)
                return EMPTY_SEPARATOR;
            return SPACE_SEPARATOR;
        };
        RightSymbol.prototype.getCompactSeparator = function (nextToken) {
            return EMPTY_SEPARATOR;
        };
        return RightSymbol;
    }(Token));

    var StringLiteral = (function (_super) {
        __extends(StringLiteral, _super);
        function StringLiteral() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringLiteral.prototype.getPrettySeparator = function (nextToken) {
            if ((nextToken instanceof Identifier && nextToken["value"] !== "AS") || (nextToken instanceof NewLineSymbol && (nextToken["value"] === ")" || nextToken["value"] === "}")))
                return NEW_LINE_SEPARATOR;
            if (nextToken instanceof Operator || (nextToken instanceof RightSymbol && nextToken["value"] !== ")"))
                return EMPTY_SEPARATOR;
            return SPACE_SEPARATOR;
        };
        StringLiteral.prototype.getCompactSeparator = function (nextToken) {
            if (this.constructor === nextToken.constructor || nextToken instanceof Identifier)
                return SPACE_SEPARATOR;
            return EMPTY_SEPARATOR;
        };
        return StringLiteral;
    }(Token));

    var Identifier = (function (_super) {
        __extends(Identifier, _super);
        function Identifier() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Identifier.prototype.getPrettySeparator = function (nextToken) {
            if (this.value === "UNION")
                return NEW_LINE_SEPARATOR;
            return SPACE_SEPARATOR;
        };
        Identifier.prototype.getCompactSeparator = function (nextToken) {
            if (this.constructor === nextToken.constructor || nextToken instanceof StringLiteral)
                return SPACE_SEPARATOR;
            return EMPTY_SEPARATOR;
        };
        return Identifier;
    }(Token));

    var NumberLiteral = (function (_super) {
        __extends(NumberLiteral, _super);
        function NumberLiteral(value) {
            return _super.call(this, value + "") || this;
        }
        NumberLiteral.prototype.getPrettySeparator = function (nextToken) {
            if (nextToken instanceof Identifier)
                return NEW_LINE_SEPARATOR;
            if (nextToken instanceof Operator || nextToken instanceof RightSymbol)
                return EMPTY_SEPARATOR;
            return SPACE_SEPARATOR;
        };
        NumberLiteral.prototype.getCompactSeparator = function (nextToken) {
            if (this.constructor === nextToken.constructor)
                return SPACE_SEPARATOR;
            return EMPTY_SEPARATOR;
        };
        return NumberLiteral;
    }(Token));

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
        BlankNodeToken.prototype.toString = function () {
            if (this.label)
                return this.label;
            return "[]";
        };
        return BlankNodeToken;
    }());

    var NAME_REGEX = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
    var VariableToken = (function () {
        function VariableToken(name) {
            this.token = "variable";
            if (!NAME_REGEX.test(name))
                throw new Error("Invalid variable name");
            this.name = name;
        }
        VariableToken.prototype.toString = function () {
            return "?" + this.name;
        };
        return VariableToken;
    }());

    var IRIToken = (function () {
        function IRIToken(value) {
            this.token = "iri";
            this.value = value;
        }
        IRIToken.prototype.toString = function () {
            return "<" + this.value + ">";
        };
        return IRIToken;
    }());

    function isAbsolute(iri) {
        return iri.indexOf(":") !== -1;
    }
    function hasProtocol(iri) {
        return iri.indexOf("://") !== -1;
    }
    function isRelative(iri) {
        return !isAbsolute(iri);
    }
    function isIRI(iri) {
        return hasProtocol(iri) || !isAbsolute(iri);
    }
    var bNodeRegex = /^_:/;
    function isBNodeLabel(label) {
        return bNodeRegex.test(label);
    }
    var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
    var softPrefixRegex = /^(?!_:)[^]*?:/;
    var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
    function isPrefixed(iri) {
        return softPrefixRegex.test(iri) && !hasProtocol(iri);
    }
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
    function resolve(iri, vocab) {
        var tokens = [new StringLiteral(iri)];
        if (isIRI(iri)) {
            if (isRelative(iri) && vocab)
                iri = vocab + iri;
            tokens = [OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
        }
        return tokens;
    }

    var NAMESPACE_REGEX = /^([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?$/;
    var PrefixedNameToken = (function () {
        function PrefixedNameToken(prefixedOrNamespace, localName) {
            this.token = "prefixedName";
            var namespace = prefixedOrNamespace;
            if (localName === void 0) {
                if (!isPrefixed(prefixedOrNamespace))
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
            if (ln2)
                preSanitation += ln3.replace(/([.])/g, "\\$1");
            this.localName = preSanitation.replace(/([~!$&'|()*+,;=/?#@%])/g, "\\$1");
            var _a;
        }
        PrefixedNameToken.prototype.toString = function () {
            return this.namespace + ":" + this.localName;
        };
        return PrefixedNameToken;
    }());

    var NumberToken = (function () {
        function NumberToken(value) {
            this.token = "number";
            this.value = value;
        }
        NumberToken.prototype.toString = function () {
            return "" + this.value;
        };
        return NumberToken;
    }());

    var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
    function isLanguageTag(tag) {
        return LANGUAGE_REGEX.test(tag);
    }
    var LanguageToken = (function () {
        function LanguageToken(tag) {
            this.token = "language";
            if (!isLanguageTag(tag))
                throw new Error("Invalid language tag.");
            this.tag = tag;
        }
        LanguageToken.prototype.toString = function () {
            return "@" + this.tag;
        };
        return LanguageToken;
    }());

    var BooleanToken = (function () {
        function BooleanToken(value) {
            this.token = "boolean";
            this.value = value;
        }
        BooleanToken.prototype.toString = function () {
            return "" + this.value;
        };
        return BooleanToken;
    }());

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
        IRIResolver.prototype.resolve = function (relativeIRI, vocab) {
            if (vocab === void 0) { vocab = false; }
            var tokens;
            if (isPrefixed(relativeIRI)) {
                var _a = getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
                var used = this._prefixes.get(prefix);
                if (used === void 0)
                    throw new Error("The used prefix has not been declared");
                tokens = [new StringLiteral(prefix), PREFIX_SYMBOL, new StringLiteral(prefixIRI)];
                if (!used)
                    this._prefixes.set(prefix, true);
            }
            else {
                tokens = resolve(relativeIRI, vocab ? this._vocab : void 0);
            }
            return tokens;
        };
        return IRIResolver;
    }());



    var index = /*#__PURE__*/Object.freeze({
        IRIResolver: IRIResolver,
        isAbsolute: isAbsolute,
        hasProtocol: hasProtocol,
        isRelative: isRelative,
        isIRI: isIRI,
        isBNodeLabel: isBNodeLabel,
        isPrefixed: isPrefixed,
        getPrefixedParts: getPrefixedParts,
        resolve: resolve
    });

    var StringToken = (function () {
        function StringToken(value) {
            this.token = "string";
            this.value = value;
        }
        StringToken.prototype.toString = function () {
            return "\"" + this.value + "\"";
        };
        return StringToken;
    }());

    var LiteralToken = (function () {
        function LiteralToken(value) {
            this.token = "literal";
            if (value === void 0)
                return;
            this.setValue(value);
        }
        LiteralToken.prototype.setValue = function (value) {
            if (this.value && this.value.value === value)
                return;
            this.value = typeof value === "boolean" ? new BooleanToken(value) :
                typeof value === "number" ? new NumberToken(value) :
                    new StringToken(value);
            return this;
        };
        LiteralToken.prototype.setType = function (type) {
            if (!this.value)
                throw new Error("Must set a value before a type.");
            if (this.value.token !== "string")
                this.value = new StringToken("" + this.value);
            this.type = typeof type === "string" ? isPrefixed(type) ?
                new PrefixedNameToken(type) : new IRIToken(type) : type;
            return this;
        };
        LiteralToken.prototype.setLanguage = function (language) {
            if (!this.value || this.value.token !== "string")
                throw new Error("Non-string value can't have a language.");
            this.type = void 0;
            this.language = new LanguageToken(language);
            return this;
        };
        LiteralToken.prototype.toString = function () {
            if (this.language)
                return "" + this.value + this.language;
            if (this.type)
                return this.value + "^^" + this.type;
            return "" + this.value;
        };
        return LiteralToken;
    }());

    var ValuesToken = (function () {
        function ValuesToken() {
            this.token = "values";
            this.variables = [];
            this.values = [];
        }
        ValuesToken.prototype.addValues = function (variable) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            this.variables.push(variable);
            this.values.push(values);
            return this;
        };
        ValuesToken.prototype.toString = function () {
            var variables = this.variables.length ? this.variables.length === 1 ? this.variables.join(" ") :
                "( " + this.variables.join(" ") + " )" : "()";
            var values = this.variables.length ? this.variables.length === 1 ? this.values[0] :
                this.values.map(function (varValues) { return "( " + varValues.join(" ") + " )"; }) : ["()"];
            return "VALUES " + variables + " { " + values.join(" ") + " }";
        };
        return ValuesToken;
    }());

    var SubjectToken = (function () {
        function SubjectToken(subject) {
            this.token = "subject";
            this.subject = subject;
            this.predicates = [];
        }
        SubjectToken.prototype.addPredicate = function (predicate) {
            this.predicates.push(predicate);
            return this;
        };
        SubjectToken.prototype.toString = function () {
            return this.subject + " " + this.predicates.join("; ");
        };
        return SubjectToken;
    }());

    var PredicateToken = (function () {
        function PredicateToken(predicate) {
            this.token = "predicate";
            this.predicate = predicate;
            this.objects = [];
        }
        PredicateToken.prototype.addObject = function (object) {
            this.objects.push(object);
            return this;
        };
        PredicateToken.prototype.toString = function () {
            return this.predicate + " " + this.objects.join(", ");
        };
        return PredicateToken;
    }());

    var joinPatterns = function (patterns) {
        return patterns
            .map(function (pattern) {
            if (pattern.token === "select")
                return "{ " + pattern + " }";
            return pattern;
        })
            .join(". ");
    };

    var OptionalToken = (function () {
        function OptionalToken() {
            this.token = "optional";
            this.patterns = [];
        }
        OptionalToken.prototype.addPattern = function () {
            var pattern = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pattern[_i] = arguments[_i];
            }
            (_a = this.patterns).push.apply(_a, pattern);
            return this;
            var _a;
        };
        OptionalToken.prototype.toString = function () {
            return "OPTIONAL { " + joinPatterns(this.patterns) + " }";
        };
        return OptionalToken;
    }());

    var GraphToken = (function () {
        function GraphToken(graph) {
            this.token = "graph";
            this.graph = graph;
            this.patterns = [];
        }
        GraphToken.prototype.addPattern = function () {
            var pattern = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pattern[_i] = arguments[_i];
            }
            (_a = this.patterns).push.apply(_a, pattern);
            return this;
            var _a;
        };
        GraphToken.prototype.toString = function () {
            return "GRAPH " + this.graph + " { " + joinPatterns(this.patterns) + " }";
        };
        return GraphToken;
    }());

    var BindToken = (function () {
        function BindToken(expression, variable) {
            this.token = "bind";
            this.expression = expression;
            this.variable = variable;
        }
        BindToken.prototype.toString = function () {
            return "BIND(" + this.expression + " AS " + this.variable + ")";
        };
        return BindToken;
    }());

    var FilterToken = (function () {
        function FilterToken(constraint) {
            this.token = "filter";
            this.constraint = constraint;
        }
        FilterToken.prototype.toString = function () {
            return "FILTER( " + this.constraint + " )";
        };
        return FilterToken;
    }());

    var PrefixToken = (function () {
        function PrefixToken(namespace, iri) {
            this.token = "prefix";
            this.namespace = namespace;
            this.iri = iri;
        }
        PrefixToken.prototype.toString = function () {
            return "PREFIX " + this.namespace + ": " + this.iri;
        };
        return PrefixToken;
    }());

    var ConstructToken = (function () {
        function ConstructToken() {
            this.token = "construct";
            this.triples = [];
            this.patterns = [];
            this.modifiers = [];
        }
        ConstructToken.prototype.addTriple = function () {
            var triple = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                triple[_i] = arguments[_i];
            }
            (_a = this.triples).push.apply(_a, triple);
            return this;
            var _a;
        };
        ConstructToken.prototype.addPattern = function () {
            var patterns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                patterns[_i] = arguments[_i];
            }
            (_a = this.patterns).push.apply(_a, patterns);
            return this;
            var _a;
        };
        ConstructToken.prototype.addModifier = function () {
            var modifiers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modifiers[_i] = arguments[_i];
            }
            (_a = this.modifiers).push.apply(_a, modifiers);
            return this;
            var _a;
        };
        ConstructToken.prototype.toString = function () {
            var query = "CONSTRUCT { " + this.triples.join(". ") + " } WHERE { " + joinPatterns(this.patterns) + " }";
            if (this.modifiers.length)
                query += " " + this.modifiers.join(" ");
            return query;
        };
        return ConstructToken;
    }());

    var SelectToken = (function () {
        function SelectToken(modifier) {
            this.token = "select";
            this.modifier = modifier;
            this.variables = [];
            this.patterns = [];
            this.modifiers = [];
        }
        SelectToken.prototype.addVariable = function () {
            var variables = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                variables[_i] = arguments[_i];
            }
            (_a = this.variables).push.apply(_a, variables);
            return this;
            var _a;
        };
        SelectToken.prototype.addPattern = function () {
            var patterns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                patterns[_i] = arguments[_i];
            }
            (_a = this.patterns).push.apply(_a, patterns);
            return this;
            var _a;
        };
        SelectToken.prototype.addModifier = function () {
            var modifier = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                modifier[_i] = arguments[_i];
            }
            (_a = this.modifiers).push.apply(_a, modifier);
            return this;
            var _a;
        };
        SelectToken.prototype.toString = function () {
            var query = "SELECT";
            if (this.modifier)
                query += " " + this.modifier;
            if (this.variables.length)
                query += " " + this.variables.join(" ");
            query += " WHERE { " + joinPatterns(this.patterns) + " }";
            if (this.modifiers.length)
                query += " " + this.modifiers.join(" ");
            return query;
        };
        return SelectToken;
    }());

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

    var OrderToken = (function () {
        function OrderToken(condition, flow) {
            this.token = "order";
            this.condition = condition;
            if (flow)
                this.flow = flow;
        }
        OrderToken.prototype.toString = function () {
            return "ORDER BY " + (this.flow ?
                this.flow + "( " + this.condition + " )" :
                "" + this.condition);
        };
        return OrderToken;
    }());

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

    var OffsetToken = (function () {
        function OffsetToken(value) {
            this.token = "offset";
            this.value = value;
        }
        OffsetToken.prototype.toString = function () {
            return "OFFSET " + this.value;
        };
        return OffsetToken;
    }());

    var QueryToken = (function () {
        function QueryToken(query, values) {
            this.token = "query";
            this.prologues = [];
            this.query = query;
            this.values = values;
        }
        QueryToken.prototype.addPrologues = function () {
            var prologues = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                prologues[_i] = arguments[_i];
            }
            (_a = this.prologues).push.apply(_a, prologues);
            return this;
            var _a;
        };
        QueryToken.prototype.toString = function () {
            var query = this.prologues.join(" ");
            if (this.prologues.length)
                query += " ";
            query += this.query;
            if (this.values)
                query += " " + this.values;
            return query;
        };
        return QueryToken;
    }());

    var CollectionToken = (function () {
        function CollectionToken() {
            this.token = "collection";
            this.objects = [];
        }
        CollectionToken.prototype.addObject = function (object) {
            this.objects.push(object);
            return this;
        };
        CollectionToken.prototype.toString = function () {
            if (!this.objects.length)
                return "()";
            return "( " + this.objects.join(" ") + " )";
        };
        return CollectionToken;
    }());



    var index$1 = /*#__PURE__*/Object.freeze({
        Identifier: Identifier,
        LeftSymbol: LeftSymbol,
        NewLineSymbol: NewLineSymbol,
        NumberLiteral: NumberLiteral,
        Operator: Operator,
        RightSymbol: RightSymbol,
        StringLiteral: StringLiteral,
        EMPTY_SEPARATOR: EMPTY_SEPARATOR,
        SPACE_SEPARATOR: SPACE_SEPARATOR,
        NEW_LINE_SEPARATOR: NEW_LINE_SEPARATOR,
        get TokenFormat () { return TokenFormat; },
        Token: Token,
        BlankNodeToken: BlankNodeToken,
        VariableToken: VariableToken,
        IRIToken: IRIToken,
        PrefixedNameToken: PrefixedNameToken,
        NumberToken: NumberToken,
        isLanguageTag: isLanguageTag,
        LanguageToken: LanguageToken,
        BooleanToken: BooleanToken,
        LiteralToken: LiteralToken,
        StringToken: StringToken,
        ValuesToken: ValuesToken,
        SubjectToken: SubjectToken,
        PredicateToken: PredicateToken,
        OptionalToken: OptionalToken,
        GraphToken: GraphToken,
        BindToken: BindToken,
        FilterToken: FilterToken,
        PrefixToken: PrefixToken,
        ConstructToken: ConstructToken,
        SelectToken: SelectToken,
        BaseToken: BaseToken,
        OrderToken: OrderToken,
        LimitToken: LimitToken,
        OffsetToken: OffsetToken,
        QueryToken: QueryToken,
        CollectionToken: CollectionToken
    });

    var VAR_SYMBOL = new LeftSymbol("?");
    var PREFIX_SYMBOL = new Operator(":");
    var OFF_TYPE = new Operator("^^");
    var LANG_SYMBOL = new Operator("@");
    var ALL = new RightSymbol("*");
    var OPEN_IRI = new LeftSymbol("<");
    var CLOSE_IRI = new RightSymbol(">");
    var OPEN_QUOTE = new LeftSymbol("\"");
    var CLOSE_QUOTE = new RightSymbol("\"");
    var GRAPH_PATTERN_SEPARATOR = new NewLineSymbol(".");
    var SAME_SUBJECT_SEPARATOR = new NewLineSymbol(";");
    var SAME_PROPERTY_SEPARATOR = new NewLineSymbol(",");
    var EMPTY_SEPARATOR$1 = new NewLineSymbol("");
    var OPEN_MULTI_BLOCK = new NewLineSymbol("{");
    var CLOSE_MULTI_BLOCK = new NewLineSymbol("}");
    var OPEN_SINGLE_BLOCK = new LeftSymbol("{");
    var CLOSE_SINGLE_BLOCK = new RightSymbol("}");
    var OPEN_MULTI_BN = new NewLineSymbol("[");
    var CLOSE_MULTI_BN = new NewLineSymbol("]");
    var OPEN_SINGLE_BN = new LeftSymbol("[");
    var CLOSE_SINGLE_BN = new RightSymbol("]");
    var OPEN_MULTI_LIST = new NewLineSymbol("(");
    var CLOSE_MULTI_LIST = new NewLineSymbol(")");
    var OPEN_SINGLE_LIST = new LeftSymbol("(");
    var CLOSE_SINGLE_LIST = new RightSymbol(")");
    var BASE = new Identifier("BASE");
    var PREFIX = new Identifier("PREFIX");
    var SELECT = new Identifier("SELECT");
    var FROM = new Identifier("FROM");
    var NAMED = new Identifier("NAMED");
    var WHERE = new Identifier("WHERE");
    var GROUP = new Identifier("GROUP");
    var BY = new Identifier("BY");
    var HAVING = new Identifier("HAVING");
    var ORDER = new Identifier("ORDER");
    var LIMIT = new Identifier("LIMIT");
    var OFFSET = new Identifier("OFFSET");
    var GRAPH = new Identifier("GRAPH");
    var OPTIONAL = new Identifier("OPTIONAL");
    var UNION = new Identifier("UNION");
    var MINUS = new Identifier("MINUS");
    var VALUES = new Identifier("VALUES");
    var UNDEF = new Identifier("UNDEF");
    var DISTINCT = new Identifier("DISTINCT");
    var REDUCED = new Identifier("REDUCED");
    var SERVICE = new Identifier("SERVICE");
    var SILENT = new Identifier("SILENT");
    var BIND = new Identifier("BIND");
    var AS = new Identifier("AS");
    var FILTER = new Identifier("FILTER");

    function toCompactString() {
        var tokens = this._tokens
            .filter(function (token) { return token !== WHERE; });
        var maxTokens = [SELECT];
        var baseTokens;
        for (var index = 0, token = tokens[index]; token && maxTokens.indexOf(token) === -1; ++index, token = tokens[index]) {
            if (token === PREFIX) {
                var nextToken = tokens[index + 1];
                if (!this._iriResolver._prefixes.get(nextToken["value"])) {
                    tokens.splice(index, 6);
                    --index;
                }
            }
            else if (token === BASE) {
                baseTokens = tokens.splice(index, 4);
                --index;
            }
        }
        if (baseTokens) {
            var baseString = baseTokens.reduce(function (res, token, index, thisArray) {
                var nextToken = thisArray[index + 1];
                return res + token.getTokenValue(TokenFormat.PRETTY, nextToken);
            }, "") + "\n";
            tokens.unshift(new StringLiteral(baseString));
        }
        return tokens.reduce(function (res, token, index, thisArray) {
            var nextToken = thisArray[index + 1];
            if (nextToken === EMPTY_SEPARATOR$1)
                nextToken = thisArray[index + 2];
            return res + token.getTokenValue(TokenFormat.COMPACT, nextToken);
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
            var tokenString = token.getTokenValue(TokenFormat.PRETTY, nextToken);
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
            if ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST].indexOf(token) !== -1) {
                stack.push(actual);
                actual = {
                    token: token,
                    indentation: actual.indentation + 4,
                    subject: 0,
                    property: 0,
                    spaces: token === OPEN_MULTI_BLOCK ? 0 : token === OPEN_MULTI_BN ? 1 : 2,
                };
            }
            else if ([CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                if (nextToken && !(nextToken instanceof NewLineSymbol)) {
                    var parent = actual;
                    while ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST].indexOf(parent.token) === -1)
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
            else if ([SAME_SUBJECT_SEPARATOR, SAME_PROPERTY_SEPARATOR, CLOSE_MULTI_LIST].indexOf(token) !== -1) {
                var parent = actual;
                while ([OPEN_MULTI_BLOCK, OPEN_MULTI_BN, OPEN_MULTI_LIST, CLOSE_MULTI_LIST, CLOSE_MULTI_BN].indexOf(parent.token) === -1)
                    parent = stack.pop();
                stack.push(parent);
                if (token === SAME_SUBJECT_SEPARATOR) {
                    actual = {
                        token: token,
                        indentation: parent.indentation + actual.subject,
                        subject: actual.subject,
                        property: 0,
                        spaces: 1,
                    };
                }
                else if (token === SAME_PROPERTY_SEPARATOR) {
                    actual = {
                        token: token,
                        indentation: parent.indentation + actual.subject + actual.property,
                        subject: actual.subject,
                        property: actual.property,
                        spaces: 2,
                    };
                }
            }
            else if (token === GRAPH_PATTERN_SEPARATOR) {
                while (actual.token !== OPEN_MULTI_BLOCK)
                    actual = stack.pop();
                actual.spaces = 0;
                actual.subject = 0;
                actual.property = 0;
            }
            if (nextToken === CLOSE_MULTI_BLOCK) {
                while (actual.token !== OPEN_MULTI_BLOCK)
                    actual = stack.pop();
                actual = stack.pop();
            }
            else if (nextToken === CLOSE_MULTI_BN) {
                while (actual.token !== OPEN_MULTI_BN)
                    actual = stack.pop();
                actual = stack.pop();
            }
            else if (nextToken === CLOSE_MULTI_LIST) {
                while (actual.token !== OPEN_MULTI_LIST)
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
        return Object.assign(object, {
            toCompactString: toCompactString.bind(container),
            toPrettyString: toPrettyString.bind(container),
            toString: toPrettyString.bind(container),
        });
    }

    function getPattern() {
        return [OPEN_MULTI_BLOCK].concat(this._tokens, [CLOSE_MULTI_BLOCK]);
    }
    function subFinishDecorator(container, object) {
        return Object.assign(object, {
            getPattern: getPattern.bind(container),
        });
    }

    var Container = (function () {
        function Container(containerOrFunction, newTokens, iriResolver) {
            var _newTarget = this.constructor;
            var container = containerOrFunction instanceof Function ?
                void 0 : containerOrFunction;
            var finishDecorator$$1 = containerOrFunction instanceof Function
                ? containerOrFunction : finishDecorator;
            this._iriResolver = finishDecorator$$1 !== subFinishDecorator ? !iriResolver ? container ? container._iriResolver ?
                new IRIResolver(container._iriResolver) : void 0 : new IRIResolver() : iriResolver : void 0;
            var previousTokens = container ? container._tokens : [];
            if (!newTokens)
                newTokens = [];
            this._tokens = previousTokens.concat(newTokens);
            this._finishDecorator = container
                ? container._finishDecorator
                : finishDecorator$$1;
            if (_newTarget === Container)
                Object.freeze(this);
        }
        return Container;
    }());

    function _from(self, tokens, iri) {
        var iriResolver = new IRIResolver(self._iriResolver);
        tokens.push.apply(tokens, iriResolver.resolve(iri));
        var container = new Container(self, tokens, iriResolver);
        return fromDecorator$$1(container, {});
    }
    function from(iri) {
        return _from(this, [FROM], iri);
    }
    function fromNamed(iri) {
        return _from(this, [FROM, NAMED], iri);
    }
    function fromDecorator$$1(container, object) {
        return Object.assign(whereDecorator$$1(container, object), {
            from: from.bind(container),
            fromNamed: fromNamed.bind(container),
        });
    }

    function groupBy(rawCondition) {
        var tokens = [GROUP, BY, new StringLiteral(rawCondition)];
        var container = new Container(this, tokens);
        return this._finishDecorator(container, havingDecorator$$1(container, {}));
    }
    function groupDecorator$$1(container, object) {
        return Object.assign(havingDecorator$$1(container, object), {
            groupBy: groupBy.bind(container),
        });
    }

    function having(rawCondition) {
        var tokens = [HAVING, new StringLiteral(rawCondition)];
        var container = new Container(this, tokens);
        return this._finishDecorator(container, orderDecorator$$1(container, {}));
    }
    function havingDecorator$$1(container, object) {
        return Object.assign(orderDecorator$$1(container, object), {
            having: having.bind(container),
        });
    }

    var NotTriplesPattern = (function () {
        function NotTriplesPattern(tokens) {
            this.patternTokens = tokens;
        }
        NotTriplesPattern.prototype.getPattern = function () {
            return this.patternTokens;
        };
        return NotTriplesPattern;
    }());

    var NAMESPACE = "http://www.w3.org/2001/XMLSchema#";
    var dateTime = NAMESPACE + "dateTime";
    var integer = NAMESPACE + "integer";
    var float = NAMESPACE + "float";
    var boolean = NAMESPACE + "boolean";
    var string = NAMESPACE + "string";

    var XSD = /*#__PURE__*/Object.freeze({
        NAMESPACE: NAMESPACE,
        dateTime: dateTime,
        integer: integer,
        float: float,
        boolean: boolean,
        string: string
    });

    function serialize(object) {
        if (typeof object === "string" || object instanceof String) {
            if (object === PatternBuilder.undefined)
                return [UNDEF];
            return [OPEN_QUOTE, new StringLiteral(object), CLOSE_QUOTE];
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
    function addType(value, type) {
        if (type in XSD)
            type = XSD[type];
        return [OPEN_QUOTE, new StringLiteral(value), CLOSE_QUOTE, OFF_TYPE, OPEN_IRI, new StringLiteral(type), CLOSE_IRI];
    }

    var ValuesPattern$$1 = (function (_super) {
        __extends(ValuesPattern$$1, _super);
        function ValuesPattern$$1(resolver, variables) {
            var _this = _super.call(this, [VALUES]) || this;
            _this.init();
            _this.resolver = resolver;
            _this.length = variables.length;
            if (_this.length === 1) {
                (_a = _this.patternTokens).push.apply(_a, variables[0].getSelfTokens().concat([OPEN_SINGLE_BLOCK]));
            }
            else {
                _this.patternTokens.push(OPEN_SINGLE_LIST);
                variables.forEach(function (variable) {
                    return (_a = _this.patternTokens).push.apply(_a, variable.getSelfTokens());
                    var _a;
                });
                _this.patternTokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
            }
            return _this;
            var _a;
        }
        ValuesPattern$$1.prototype.has = function () {
            var _this = this;
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            if (this.length !== values.length)
                throw new Error("InvalidArgumentError: The number of variables and values are different.");
            if (this.length === 1) {
                (_a = this.patternTokens).push.apply(_a, serialize(values[0]));
            }
            else {
                this.patternTokens.push(OPEN_SINGLE_LIST);
                values.forEach(function (value) {
                    return (_a = _this.patternTokens).push.apply(_a, serialize(value));
                    var _a;
                });
                this.patternTokens.push(CLOSE_SINGLE_LIST);
            }
            return this.interfaces.addPattern;
            var _a;
        };
        ValuesPattern$$1.prototype.getPattern = function () {
            if (this.length === 1) {
                this.patternTokens.push(CLOSE_SINGLE_BLOCK);
            }
            else {
                this.patternTokens.push(CLOSE_MULTI_BLOCK);
            }
            return this.patternTokens;
        };
        ValuesPattern$$1.prototype.init = function () {
            var _this = this;
            this.interfaces = {
                addPattern: {
                    and: this.has.bind(this),
                    getPattern: function () { return _this.getPattern(); },
                },
            };
        };
        return ValuesPattern$$1;
    }(NotTriplesPattern));

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
                        _this.patternTokens.push(SAME_SUBJECT_SEPARATOR);
                        return _this._addPattern(property, objects);
                    },
                },
            };
        };
        TriplesPattern.prototype._addPattern = function (property, objects) {
            var tokens = (typeof property === "string")
                ? this._resolvePath(property)
                : property.getSelfTokens();
            objects = Array.isArray(objects) ? objects : [objects];
            objects.forEach(function (value, index, array) {
                tokens.push.apply(tokens, serialize(value));
                if (index < array.length - 1)
                    tokens.push(SAME_PROPERTY_SEPARATOR);
            });
            (_a = this.patternTokens).push.apply(_a, tokens);
            return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
            var _a;
        };
        TriplesPattern.prototype._resolvePath = function (propertyPath) {
            var _this = this;
            var tokens = propertyPath
                .split(/(<.*?>)/).reduce(function (array, part) {
                if (part.startsWith("<")) {
                    array.push(part);
                }
                else {
                    array.push.apply(array, part.split(/([|/^?*+!()])/));
                }
                return array;
            }, [])
                .reduce(function (array, part) {
                if (!part)
                    return array;
                if (TriplesPattern.PATH_OPERATORS.indexOf(part) !== -1) {
                    array.push(new Operator(part));
                }
                else if (part === "a") {
                    array.push(new StringLiteral(part));
                }
                else {
                    if (part.startsWith("<") && part.endsWith(">"))
                        part = part.slice(1, -1);
                    array.push.apply(array, _this.resolver.resolve(part, true));
                }
                return array;
            }, []);
            if (tokens[0] instanceof Operator)
                tokens.unshift(new LeftSymbol(""));
            if (tokens[tokens.length - 1] instanceof Operator)
                tokens.push(new RightSymbol(""));
            return tokens;
        };
        TriplesPattern.PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
        return TriplesPattern;
    }());

    var BlankNode = (function (_super) {
        __extends(BlankNode, _super);
        function BlankNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlankNode.prototype.getSelfTokens = function () {
            if (!this.patternTokens.find(function (token) { return token === SAME_SUBJECT_SEPARATOR || token === SAME_PROPERTY_SEPARATOR; }))
                return [OPEN_SINGLE_BN].concat(this.patternTokens, [CLOSE_SINGLE_BN]);
            return [OPEN_MULTI_BN].concat(this.patternTokens, [CLOSE_MULTI_BN]);
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
    }(TriplesPattern));

    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(resolver, values) {
            var _this = _super.call(this, resolver) || this;
            var tokens = [];
            values.forEach(function (value, index) {
                tokens.push.apply(tokens, serialize(value));
                if (index < values.length - 1)
                    tokens.push(EMPTY_SEPARATOR$1);
            });
            var isSingle = values.length <= 1 && !tokens.find(function (token) { return token instanceof NewLineSymbol; });
            _this.elementTokens = [
                isSingle ? OPEN_SINGLE_LIST : OPEN_MULTI_LIST
            ].concat(tokens, [
                isSingle ? CLOSE_SINGLE_LIST : CLOSE_MULTI_LIST,
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
    }(TriplesPattern));

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
    }(TriplesPattern));

    var Literal = (function (_super) {
        __extends(Literal, _super);
        function Literal(resolver, value) {
            var _this = _super.call(this, resolver) || this;
            _this.value = value + "";
            return _this;
        }
        return Literal;
    }(TriplesSubject));
    var RDFLiteral = (function (_super) {
        __extends(RDFLiteral, _super);
        function RDFLiteral(resolver, value) {
            var _this = _super.call(this, resolver, value) || this;
            _this.elementTokens = [OPEN_QUOTE, new StringLiteral(value), CLOSE_QUOTE];
            return _this;
        }
        RDFLiteral.prototype.ofType = function (type) {
            this.elementTokens = addType(this.value, type);
            return this;
        };
        RDFLiteral.prototype.withLanguage = function (language) {
            this.elementTokens = [OPEN_QUOTE, new StringLiteral(this.value), CLOSE_QUOTE, LANG_SYMBOL, new StringLiteral(language)];
            return this;
        };
        return RDFLiteral;
    }(Literal));
    var NumericLiteral = (function (_super) {
        __extends(NumericLiteral, _super);
        function NumericLiteral(resolver, value) {
            var _this = _super.call(this, resolver, value) || this;
            var type = Number.isInteger(value) ? "integer" : "float";
            _this.elementTokens = addType(_this.value, type);
            return _this;
        }
        return NumericLiteral;
    }(Literal));
    var BooleanLiteral = (function (_super) {
        __extends(BooleanLiteral, _super);
        function BooleanLiteral(resolver, value) {
            var _this = _super.call(this, resolver, value) || this;
            _this.elementTokens = addType(_this.value, "boolean");
            return _this;
        }
        return BooleanLiteral;
    }(Literal));

    var Resource = (function (_super) {
        __extends(Resource, _super);
        function Resource(resolver, iri) {
            var _this = _super.call(this, resolver) || this;
            _this.elementTokens = resolver.resolve(iri);
            return _this;
        }
        return Resource;
    }(TriplesSubject));

    var nameRegex = /^((?:[0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))((?:[0-9A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]))*$/;
    var Variable = (function (_super) {
        __extends(Variable, _super);
        function Variable(resolver, name) {
            var _this = this;
            if (!nameRegex.test(name))
                throw new Error("Invalid variable name");
            _this = _super.call(this, resolver) || this;
            _this.elementTokens = [VAR_SYMBOL, new StringLiteral(name)];
            return _this;
        }
        return Variable;
    }(TriplesSubject));

    function getBlockTokens(patterns) {
        var tokens = this.getTokens(patterns);
        var openToken = OPEN_SINGLE_BLOCK;
        var closeToken = CLOSE_SINGLE_BLOCK;
        if (this.isMultiLine(tokens)) {
            openToken = OPEN_MULTI_BLOCK;
            closeToken = CLOSE_MULTI_BLOCK;
        }
        return [openToken].concat(tokens, [closeToken]);
    }

    var PatternBuilder = (function () {
        function PatternBuilder(iriResolver) {
            this.iriResolver = iriResolver;
            selectDecorator$$1(new Container(subFinishDecorator), this);
        }
        Object.defineProperty(PatternBuilder, "undefined", {
            get: function () { return "UNDEF"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PatternBuilder.prototype, "undefined", {
            get: function () { return PatternBuilder.undefined; },
            enumerable: true,
            configurable: true
        });
        PatternBuilder.prototype.resource = function (iri) {
            return new Resource(this.iriResolver, iri);
        };
        PatternBuilder.prototype.var = function (name) {
            return new Variable(this.iriResolver, name);
        };
        PatternBuilder.prototype.literal = function (value) {
            if (typeof value === "string" || value instanceof String)
                return new RDFLiteral(this.iriResolver, value);
            if (typeof value === "number" || value instanceof Number)
                return new NumericLiteral(this.iriResolver, value);
            if (typeof value === "boolean" || value instanceof Boolean)
                return new BooleanLiteral(this.iriResolver, value);
            throw new Error("No valid value of a literal was provided.");
        };
        PatternBuilder.prototype.collection = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            if (values.length === 0)
                throw Error("The collection needs at least one value.");
            return new Collection(this.iriResolver, values);
        };
        PatternBuilder.prototype.blankNode = function () {
            return new BlankNode(this.iriResolver);
        };
        PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
            var graph = (typeof iriOrVariable === "string")
                ? this.iriResolver.resolve(iriOrVariable)
                : iriOrVariable.getSelfTokens();
            var patternTokens = getBlockTokens(patterns);
            return new NotTriplesPattern([GRAPH].concat(graph, patternTokens));
        };
        PatternBuilder.prototype.optional = function (patterns) {
            var patternTokens = getBlockTokens(patterns);
            return new NotTriplesPattern([OPTIONAL].concat(patternTokens));
        };
        PatternBuilder.prototype.union = function (patterns1, patterns2) {
            var leftPatternTokens = getBlockTokens(patterns1);
            var rightPatternTokens = getBlockTokens(patterns2);
            return new NotTriplesPattern(leftPatternTokens.concat([UNION], rightPatternTokens));
        };
        PatternBuilder.prototype.minus = function () {
            var patterns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                patterns[_i] = arguments[_i];
            }
            var patternTokens = getBlockTokens(patterns);
            return new NotTriplesPattern([MINUS].concat(patternTokens));
        };
        PatternBuilder.prototype.values = function () {
            var variables = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                variables[_i] = arguments[_i];
            }
            return new ValuesPattern$$1(this.iriResolver, variables);
        };
        PatternBuilder.prototype.service = function (resource, patterns) {
            var serviceTokens = typeof resource === "string" ?
                this.iriResolver.resolve(resource) :
                resource.getSelfTokens();
            var patternTokens = getBlockTokens(patterns);
            return new NotTriplesPattern([SERVICE].concat(serviceTokens, patternTokens));
        };
        PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
            var serviceTokens = typeof resource === "string" ?
                this.iriResolver.resolve(resource) :
                resource.getSelfTokens();
            var patternTokens = getBlockTokens(patterns);
            return new NotTriplesPattern([SERVICE, SILENT].concat(serviceTokens, patternTokens));
        };
        PatternBuilder.prototype.bind = function (rawExpression, variable) {
            variable = typeof variable === "string" ? this.var(variable) : variable;
            var patternTokens = [BIND, OPEN_SINGLE_LIST, new StringLiteral(rawExpression), AS].concat(variable.getSelfTokens(), [CLOSE_SINGLE_LIST]);
            return new NotTriplesPattern(patternTokens);
        };
        PatternBuilder.prototype.filter = function (rawConstraint) {
            return new NotTriplesPattern([FILTER, new StringLiteral(rawConstraint)]);
        };
        return PatternBuilder;
    }());



    var index$2 = /*#__PURE__*/Object.freeze({
        PatternBuilder: PatternBuilder
    });

    function values(variableOrVariables, valuesOrBuilder) {
        var isSingle = !Array.isArray(variableOrVariables);
        var variables = (isSingle ?
            [variableOrVariables] : variableOrVariables)
            .map(function (name) { return new Variable(null, name); });
        var tokens = [VALUES];
        if (isSingle) {
            tokens.push.apply(tokens, variables[0].getSelfTokens().concat([OPEN_SINGLE_BLOCK]));
        }
        else {
            tokens.push(OPEN_SINGLE_LIST);
            variables.forEach(function (variable) { return tokens.push.apply(tokens, variable.getSelfTokens()); });
            tokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
        }
        var iriResolver = void 0;
        var rawValues = typeof valuesOrBuilder === "function" ?
            valuesOrBuilder(new PatternBuilder(iriResolver = new IRIResolver(this._iriResolver))) :
            valuesOrBuilder;
        var values = isSingle ?
            Array.isArray(rawValues) ? rawValues.map(function (value) { return [value]; }) : [[rawValues]] :
            Array.isArray(rawValues[0]) ? rawValues : [rawValues];
        values.forEach(function (valuesRow) {
            if (isSingle) {
                tokens.push.apply(tokens, serialize(valuesRow[0]));
            }
            else {
                tokens.push(OPEN_SINGLE_LIST);
                valuesRow.forEach(function (value) { return tokens.push.apply(tokens, serialize(value)); });
                tokens.push(CLOSE_SINGLE_LIST);
            }
        });
        tokens.push(isSingle ? CLOSE_SINGLE_BLOCK : CLOSE_MULTI_BLOCK);
        var container = new Container(this, tokens, iriResolver);
        return this._finishDecorator(container, {});
    }
    function valuesDecorator(container, object) {
        return Object.assign(object, {
            values: values.bind(container),
        });
    }

    var CurrentMethod;
    (function (CurrentMethod) {
        CurrentMethod[CurrentMethod["LIMIT"] = 0] = "LIMIT";
        CurrentMethod[CurrentMethod["OFFSET"] = 1] = "OFFSET";
    })(CurrentMethod || (CurrentMethod = {}));
    var LimitOffsetContainer = (function (_super) {
        __extends(LimitOffsetContainer, _super);
        function LimitOffsetContainer(previousContainer, newTokens, currentMethod) {
            var _this = _super.call(this, previousContainer, newTokens) || this;
            _this._offsetUsed = currentMethod === CurrentMethod.OFFSET;
            _this._limitUsed = currentMethod === CurrentMethod.LIMIT;
            Object.freeze(_this);
            return _this;
        }
        return LimitOffsetContainer;
    }(Container));
    function limit(limit) {
        var tokens = [LIMIT, new NumberLiteral(limit)];
        if (this._offsetUsed) {
            var container_1 = new Container(this, tokens);
            return this._finishDecorator(container_1, valuesDecorator(container_1, {}));
        }
        var container = new LimitOffsetContainer(this, tokens, CurrentMethod.LIMIT);
        return this._finishDecorator(container, offsetDecorator(container, {}));
    }
    function offset(offset) {
        var tokens = [OFFSET, new NumberLiteral(offset)];
        if (this._limitUsed) {
            var container_2 = new Container(this, tokens);
            return this._finishDecorator(container_2, valuesDecorator(container_2, {}));
        }
        var container = new LimitOffsetContainer(this, tokens, CurrentMethod.OFFSET);
        return this._finishDecorator(container, limitDecorator(container, {}));
    }
    function limitDecorator(container, object) {
        return Object.assign(valuesDecorator(container, object), {
            limit: limit.bind(container),
        });
    }
    function offsetDecorator(container, object) {
        return Object.assign(valuesDecorator(container, object), {
            offset: offset.bind(container),
        });
    }
    function limitOffsetDecorator(container, object) {
        return Object.assign(valuesDecorator(container, object), {
            limit: limit.bind(container),
            offset: offset.bind(container),
        });
    }

    function orderBy$$1(rawCondition) {
        var tokens = [ORDER, BY, new StringLiteral(rawCondition)];
        var container = new Container(this, tokens);
        return this._finishDecorator(container, limitOffsetDecorator(container, {}));
    }
    function orderDecorator$$1(container, object) {
        return Object.assign(limitOffsetDecorator(container, object), {
            orderBy: orderBy$$1.bind(container),
        });
    }

    function base(iri) {
        var tokens = [BASE, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
        var container = new Container(this, tokens);
        return queryDecorator$$1(container, {});
    }
    function vocab(iri) {
        var iriResolver = new IRIResolver(this._iriResolver, iri);
        var container = new Container(this, null, iriResolver);
        return queryDecorator$$1(container, {});
    }
    function prefix(name, iri) {
        var iriResolver = new IRIResolver(this._iriResolver);
        var previousIndex = iriResolver._prefixes.has(name) ?
            this._tokens.findIndex(function (token) { return token instanceof StringLiteral && token["value"] === name; }) :
            -1;
        iriResolver._prefixes.set(name, false);
        var tokens = [PREFIX, new StringLiteral(name), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
        var container = new Container(this, tokens, iriResolver);
        if (previousIndex !== -1) {
            container._tokens.splice(previousIndex - 1, 6);
        }
        return queryDecorator$$1(container, {});
    }
    function queryDecorator$$1(container, object) {
        return Object.assign(selectDecorator$$1(container, object), {
            base: base.bind(container),
            vocab: vocab.bind(container),
            prefix: prefix.bind(container),
        });
    }

    function _select(self, tokens, variables) {
        if (variables && variables.length === 0)
            throw new Error("Need to provide al least one variable.");
        if (variables)
            variables.forEach(function (variable) { return tokens.push(VAR_SYMBOL, new StringLiteral(variable)); });
        var container = new Container(self, tokens);
        if (self._finishDecorator === subFinishDecorator)
            return subWhereDecorator$$1(container, {});
        return fromDecorator$$1(container, {});
    }
    function select() {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return _select(this, [SELECT], variables);
    }
    function selectDistinct() {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return _select(this, [SELECT, DISTINCT], variables);
    }
    function selectReduced() {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return _select(this, [SELECT, REDUCED], variables);
    }
    function selectAll() {
        return _select(this, [SELECT, ALL]);
    }
    function selectAllDistinct() {
        return _select(this, [SELECT, DISTINCT, ALL]);
    }
    function selectAllReduced() {
        return _select(this, [SELECT, REDUCED, ALL]);
    }
    function selectDecorator$$1(container, object) {
        return Object.assign(object, {
            select: select.bind(container),
            selectDistinct: selectDistinct.bind(container),
            selectReduced: selectReduced.bind(container),
            selectAll: selectAll.bind(container),
            selectAllDistinct: selectAllDistinct.bind(container),
            selectAllReduced: selectAllReduced.bind(container),
        });
    }

    function subWhere(patterns) {
        var tokens = [WHERE].concat(getBlockTokens(patterns));
        var container = new Container(this, tokens);
        return this._finishDecorator(container, groupDecorator$$1(container, {}));
    }
    function where(patternFunction) {
        var iriResolver = new IRIResolver(this._iriResolver);
        var patterns = patternFunction(new PatternBuilder(iriResolver));
        var tokens = [WHERE].concat(getBlockTokens(patterns));
        var container = new Container(this, tokens, iriResolver);
        return this._finishDecorator(container, groupDecorator$$1(container, {}));
    }
    function whereDecorator$$1(container, object) {
        return Object.assign(object, {
            where: where.bind(container),
        });
    }
    function subWhereDecorator$$1(container, object) {
        return Object.assign(object, {
            where: subWhere.bind(container),
        });
    }

    var SPARQLER = (function () {
        function SPARQLER(finishDecorator$$1) {
            var container = new Container(finishDecorator$$1);
            return queryDecorator$$1(container, this);
        }
        return SPARQLER;
    }());



    var index$3 = /*#__PURE__*/Object.freeze({
        Container: Container
    });

    exports.clauses = index$3;
    exports.iri = index;
    exports.patterns = index$2;
    exports.tokens = index$1;
    exports.SPARQLER = SPARQLER;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sparqler.umd.js.map
