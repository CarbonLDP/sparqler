"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../../iri/IRIResolver");
var PatternBuilder_1 = require("../../patterns/PatternBuilder");
var tokens_1 = require("../../patterns/tokens");
var Patterns_1 = require("../../utils/Patterns");
var Container_1 = require("../Container");
var utils_1 = require("../utils");
var group_1 = require("./group");
function subWhere(patterns) {
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens);
    return this._finishDecorator(container, group_1.groupDecorator(container, {}));
}
function where(patternFunction) {
    var iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver);
    var patterns = patternFunction(new PatternBuilder_1.PatternBuilder(iriResolver));
    var tokens = [tokens_1.WHERE].concat(Patterns_1.getBlockTokens(patterns));
    var container = new Container_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, group_1.groupDecorator(container, {}));
}
function whereDecorator(container, object) {
    return utils_1.genericDecorator({ where: where }, container, object);
}
exports.whereDecorator = whereDecorator;
function subWhereDecorator(container, object) {
    return utils_1.genericDecorator({ where: subWhere }, container, object);
}
exports.subWhereDecorator = subWhereDecorator;

//# sourceMappingURL=where.js.map
