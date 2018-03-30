import { Container, } from "./../Container";
import { fromDecorator, subFinishDecorator, subWhereDecorator, } from "./";
import { ALL, DISTINCT, REDUCED, SELECT, VAR_SYMBOL, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function _select(self, tokens, variables) {
    if (variables && variables.length === 0)
        throw new Error("Need to provide al least one variable.");
    if (variables)
        variables.forEach(function (variable) { return tokens.push(VAR_SYMBOL, new StringLiteral(variable)); });
    var container = new Container(self, tokens);
    if (self._finishDecorator === subFinishDecorator)
        return subWhereDecorator(container, {});
    return fromDecorator(container, {});
}
function select() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [SELECT], variables);
}
function selectDistinct() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [SELECT, DISTINCT], variables);
}
function selectReduced() {
    var variables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        variables[_i] = arguments[_i];
    }
    return _select(this, [SELECT, REDUCED], variables);
}
function selectAll() {
    return _select(this, [SELECT, ALL]);
}
function selectAllDistinct() {
    return _select(this, [SELECT, DISTINCT, ALL]);
}
function selectAllReduced() {
    return _select(this, [SELECT, REDUCED, ALL]);
}
export function selectDecorator(container, object) {
    return Object.assign(object, {
        select: select.bind(container),
        selectDistinct: selectDistinct.bind(container),
        selectReduced: selectReduced.bind(container),
        selectAll: selectAll.bind(container),
        selectAllDistinct: selectAllDistinct.bind(container),
        selectAllReduced: selectAllReduced.bind(container),
    });
}

//# sourceMappingURL=select.js.map