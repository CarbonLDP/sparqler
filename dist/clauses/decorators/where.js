"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./../Container");
var _1 = require("./");
var IRIResolver_1 = require("./../../iri/IRIResolver");
var patterns_1 = require("./../../patterns");
var tokens_1 = require("./../../patterns/tokens");
var Patterns_1 = require("./../../utils/Patterns");
function subWhere(patterns) {
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, _1.groupDecorator(container, {}));
}
function where(patternFunction) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var patterns = patternFunction(new patterns_1.PatternBuilder(iriResolver));
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, _1.groupDecorator(container, {}));
}
function whereDecorator(container, object) {
    return Object.assign(object, {
        where: where.bind(container),
    });
}
exports.whereDecorator = whereDecorator;
function subWhereDecorator(container, object) {
    return Object.assign(object, {
        where: subWhere.bind(container),
    });
}
exports.subWhereDecorator = subWhereDecorator;

//# sourceMappingURL=where.js.map
