"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./../Container");
var _1 = require("./");
var IRIResolver_1 = require("./../../iri/IRIResolver");
var tokens_1 = require("./../../patterns/tokens");
var tokens_2 = require("./../../tokens");
function base(iri) {
    var tokens = [tokens_1.BASE, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new Container_1.Container(this, tokens);
    return queryDecorator(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver, iri);
    var container = new Container_1.Container(this, null, iriResolver);
    return queryDecorator(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var previousIndex = iriResolver._prefixes.has(name) ?
        this._tokens.findIndex(function (token) { return token instanceof tokens_2.StringLiteral && token["value"] === name; }) :
        -1;
    iriResolver._prefixes.set(name, false);
    var tokens = [tokens_1.PREFIX, new tokens_2.StringLiteral(name), tokens_1.PREFIX_SYMBOL, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new Container_1.Container(this, tokens, iriResolver);
    if (previousIndex !== -1) {
        container._tokens.splice(previousIndex - 1, 6);
    }
    return queryDecorator(container, {});
}
function queryDecorator(container, object) {
    return Object.assign(_1.selectDecorator(container, object), {
        base: base.bind(container),
        vocab: vocab.bind(container),
        prefix: prefix.bind(container),
    });
}
exports.queryDecorator = queryDecorator;

//# sourceMappingURL=query.js.map
