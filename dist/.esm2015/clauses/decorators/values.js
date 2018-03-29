import { Container } from "./../Container";
import { IRIResolver } from "./../../iri/IRIResolver";
import { PatternBuilder, } from "./../../patterns";
import { CLOSE_MULTI_BLOCK, CLOSE_SINGLE_BLOCK, CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK, OPEN_SINGLE_BLOCK, OPEN_SINGLE_LIST, VALUES, } from "./../../patterns/tokens";
import { Variable, } from "./../../patterns/triples";
import { serialize } from "./../../utils/ObjectPattern";
function values(variableOrVariables, valuesOrBuilder) {
    const isSingle = !Array.isArray(variableOrVariables);
    const variables = (isSingle ?
        [variableOrVariables] : variableOrVariables)
        .map(name => new Variable(null, name));
    const tokens = [VALUES];
    if (isSingle) {
        tokens.push(...variables[0].getSelfTokens(), OPEN_SINGLE_BLOCK);
    }
    else {
        tokens.push(OPEN_SINGLE_LIST);
        variables.forEach(variable => tokens.push(...variable.getSelfTokens()));
        tokens.push(CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK);
    }
    let iriResolver = void 0;
    const rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(new PatternBuilder(iriResolver = new IRIResolver(this._iriResolver))) :
        valuesOrBuilder;
    const values = isSingle ?
        Array.isArray(rawValues) ? rawValues.map(value => [value]) : [[rawValues]] :
        Array.isArray(rawValues[0]) ? rawValues : [rawValues];
    values.forEach((valuesRow) => {
        if (isSingle) {
            tokens.push(...serialize(valuesRow[0]));
        }
        else {
            tokens.push(OPEN_SINGLE_LIST);
            valuesRow.forEach(value => tokens.push(...serialize(value)));
            tokens.push(CLOSE_SINGLE_LIST);
        }
    });
    tokens.push(isSingle ? CLOSE_SINGLE_BLOCK : CLOSE_MULTI_BLOCK);
    const container = new Container(this, tokens, iriResolver);
    return this._finishDecorator(container, {});
}
export function valuesDecorator(container, object) {
    return Object.assign(object, {
        values: values.bind(container),
    });
}

//# sourceMappingURL=values.js.map
