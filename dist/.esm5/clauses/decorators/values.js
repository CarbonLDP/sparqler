import { Container } from "./../Container";
import { IRIResolver } from "./../../iri/IRIResolver";
import { PatternBuilder, } from "./../../patterns";
import { CLOSE_MULTI_BLOCK, CLOSE_SINGLE_BLOCK, CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK, OPEN_SINGLE_BLOCK, OPEN_SINGLE_LIST, VALUES, } from "./../../patterns/tokens";
import { Variable, } from "./../../patterns/triples";
import { serialize } from "./../../utils/ObjectPattern";
function values(variableOrVariables, valuesOrBuilder) {
    var isSingle = !Array.isArray(variableOrVariables);
    var variables = (isSingle ?
        [variableOrVariables] : variableOrVariables)
        .map(function (name) { return new Variable(null, name); });
    var tokens = [VALUES];
    if (isSingle) {
        tokens.push.apply(tokens, variables[0].getSelfTokens().concat([OPEN_SINGLE_BLOCK]));
    }
    else {
        tokens.push(OPEN_SINGLE_LIST);
        variables.forEach(function (variable) { return tokens.push.apply(tokens, variable.getSelfTokens()); });
        tokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
    }
    var iriResolver = void 0;
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(new PatternBuilder(iriResolver = new IRIResolver(this._iriResolver))) :
        valuesOrBuilder;
    var values = isSingle ?
        Array.isArray(rawValues) ? rawValues.map(function (value) { return [value]; }) : [[rawValues]] :
        Array.isArray(rawValues[0]) ? rawValues : [rawValues];
    values.forEach(function (valuesRow) {
        if (isSingle) {
            tokens.push.apply(tokens, serialize(valuesRow[0]));
        }
        else {
            tokens.push(OPEN_SINGLE_LIST);
            valuesRow.forEach(function (value) { return tokens.push.apply(tokens, serialize(value)); });
            tokens.push(CLOSE_SINGLE_LIST);
        }
    });
    tokens.push(isSingle ? CLOSE_SINGLE_BLOCK : CLOSE_MULTI_BLOCK);
    var container = new Container(this, tokens, iriResolver);
    return this._finishDecorator(container, {});
}
export function valuesDecorator(container, object) {
    return Object.assign(object, {
        values: values.bind(container),
    });
}

//# sourceMappingURL=values.js.map
