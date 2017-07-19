"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("sparqler/clauses/Container");
var decorators_1 = require("sparqler/clauses/decorators");
var utils_1 = require("sparqler/clauses/utils");
var IRIResolver_1 = require("sparqler/iri/IRIResolver");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
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
    iriResolver._prefixes.set(name, false);
    var tokens = [tokens_1.PREFIX, new tokens_2.StringLiteral(name), tokens_1.PREFIX_SYMBOL, tokens_1.OPEN_IRI, new tokens_2.StringLiteral(iri), tokens_1.CLOSE_IRI];
    var container = new Container_1.Container(this, tokens, iriResolver);
    return queryDecorator(container, {});
}
function queryDecorator(container, object) {
    return utils_1.genericDecorator({ base: base, vocab: vocab, prefix: prefix }, container, decorators_1.selectDecorator(container, object));
}
exports.queryDecorator = queryDecorator;

//# sourceMappingURL=query.js.map
