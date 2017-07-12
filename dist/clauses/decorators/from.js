"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var tokens_1 = require("sparqler/patterns/tokens");
function _from(self, tokens, iri) {
    tokens.push.apply(tokens, self._iriResolver.resolve(iri));
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

//# sourceMappingURL=from.js.map
