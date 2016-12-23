"use strict";
var IRIUtils = require("./Utils/IRI");
var PatternsUtils = require("./Utils/Patterns");
var PatternBuilder_1 = require("./PatternBuilder");
var Token_1 = require("./Tokens/Token");
var Identifier_1 = require("./Tokens/Identifier");
var StringLiteral_1 = require("./Tokens/StringLiteral");
var RightSymbol_1 = require("./Tokens/RightSymbol");
var NumberLiteral_1 = require("./Tokens/NumberLiteral");
var Tokens_1 = require("./Patterns/Tokens");
var NewLineSymbol_1 = require("./Tokens/NewLineSymbol");
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

//# sourceMappingURL=SPARQLER.js.map
