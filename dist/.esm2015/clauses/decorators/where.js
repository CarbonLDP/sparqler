import { Container } from "./../Container";
import { groupDecorator } from "./";
import { IRIResolver } from "./../../iri/IRIResolver";
import { PatternBuilder, } from "./../../patterns";
import { WHERE } from "./../../patterns/tokens";
import { getBlockTokens } from "./../../utils/Patterns";
function subWhere(patterns) {
    const tokens = [WHERE, ...getBlockTokens(patterns)];
    const container = new Container(this, tokens);
    return this._finishDecorator(container, groupDecorator(container, {}));
}
function where(patternFunction) {
    const iriResolver = new IRIResolver(this._iriResolver);
    const patterns = patternFunction(new PatternBuilder(iriResolver));
    const tokens = [WHERE, ...getBlockTokens(patterns)];
    const container = new Container(this, tokens, iriResolver);
    return this._finishDecorator(container, groupDecorator(container, {}));
}
export function whereDecorator(container, object) {
    return Object.assign(object, {
        where: where.bind(container),
    });
}
export function subWhereDecorator(container, object) {
    return Object.assign(object, {
        where: subWhere.bind(container),
    });
}

//# sourceMappingURL=where.js.map
