"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var IRIResolver_1 = require("sparqler/iri/IRIResolver");
var patterns_1 = require("sparqler/patterns");
var tokens_1 = require("sparqler/patterns/tokens");
var Patterns_1 = require("sparqler/utils/Patterns");
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

//# sourceMappingURL=where.js.map