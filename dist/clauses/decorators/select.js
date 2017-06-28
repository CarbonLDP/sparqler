"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clauses_1 = require("sparqler/clauses");
var decorators_1 = require("sparqler/clauses/decorators");
var tokens_1 = require("sparqler/patterns/tokens");
var tokens_2 = require("sparqler/tokens");
var SubSelectContainer = (function (_super) {
    __extends(SubSelectContainer, _super);
    function SubSelectContainer(previousContainer, tokens) {
        var _this = _super.call(this, previousContainer, tokens) || this;
        _this._finishDecorator = decorators_1.graphPatternDecorator;
        Object.freeze(_this);
        return _this;
    }
    return SubSelectContainer;
}(clauses_1.Container));
exports.SubSelectContainer = SubSelectContainer;
function _select(self, tokens, variables) {
    if (variables && variables.length === 0)
        throw new Error("IllegalArgumentError: Need to provide al least one variable.");
    if (variables)
        variables.forEach(function (variable) { return tokens.push(tokens_1.VAR_SYMBOL, new tokens_2.StringLiteral(variable)); });
    var container = new clauses_1.Container(self, tokens);
    if (self._finishDecorator === decorators_1.graphPatternDecorator)
        return decorators_1.whereDecorator(container, {});
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
    return clauses_1.genericDecorator({
        select: select,
        selectDistinct: selectDistinct,
        selectReduced: selectReduced,
        selectAll: selectAll,
        selectAllDistinct: selectAllDistinct,
        selectAllReduced: selectAllReduced,
    }, container, object);
}
exports.selectDecorator = selectDecorator;
function subSelectDecorator(container, object) {
    return clauses_1.genericDecorator({
        select: select,
        selectDistinct: selectDistinct,
        selectReduced: selectReduced,
        selectAll: selectAll,
        selectAllDistinct: selectAllDistinct,
        selectAllReduced: selectAllReduced,
    }, container, object);
}
exports.subSelectDecorator = subSelectDecorator;

//# sourceMappingURL=select.js.map
