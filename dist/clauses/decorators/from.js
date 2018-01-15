"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../../iri/IRIResolver");
var tokens_1 = require("../../patterns/tokens");
var Container_1 = require("../Container");
var utils_1 = require("./utils");
var where_1 = require("./where");
function _from(self, tokens, iri) {
    var iriResolver = new IRIResolver_1.IRIResolver(self._iriResolver);
    tokens.push.apply(tokens, iriResolver.resolve(iri));
    var container = new Container_1.Container(self, tokens, iriResolver);
    return fromDecorator(container, {});
}
function from(iri) {
    return _from(this, [tokens_1.FROM], iri);
}
function fromNamed(iri) {
    return _from(this, [tokens_1.FROM, tokens_1.NAMED], iri);
}
function fromDecorator(container, object) {
    return utils_1.genericDecorator({ from: from, fromNamed: fromNamed }, container, where_1.whereDecorator(container, object));
}
exports.fromDecorator = fromDecorator;

//# sourceMappingURL=from.js.map
