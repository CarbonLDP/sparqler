"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("sparqler/clauses/Container");
var decorators_1 = require("sparqler/clauses/decorators");
var utils_1 = require("sparqler/clauses/utils");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
function _select(self, tokens, variables) {
    if (variables && variables.length === 0)
        throw new Error("Need to provide al least one variable.");
    if (variables)
        variables.forEach(function (variable) { return tokens.push(tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(variable)); });
    var container = new Container_1.Container(self, tokens);
    if (self._finishDecorator === decorators_1.subFinishDecorator)
        return decorators_1.subWhereDecorator(container, {});
    return decorators_1.fromDecorator(container, {});
}
function select() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT], variables);
}
function selectDistinct() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT], variables);
}
function selectReduced() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED], variables);
}
function selectAll() {
    return _select(this, [tokens_1.SELECT, tokens_1.ALL]);
}
function selectAllDistinct() {
    return _select(this, [tokens_1.SELECT, tokens_1.DISTINCT, tokens_1.ALL]);
}
function selectAllReduced() {
    return _select(this, [tokens_1.SELECT, tokens_1.REDUCED, tokens_1.ALL]);
}
function selectDecorator(container, object) {
    return utils_1.genericDecorator({
        select: select,
        selectDistinct: selectDistinct,
        selectReduced: selectReduced,
        selectAll: selectAll,
        selectAllDistinct: selectAllDistinct,
        selectAllReduced: selectAllReduced,
    }, container, object);
}
exports.selectDecorator = selectDecorator;

//# sourceMappingURL=select.js.map
