import { Container } from "./../Container";
import { selectDecorator } from "./";
import { IRIResolver } from "./../../iri/IRIResolver";
import { BASE, CLOSE_IRI, OPEN_IRI, PREFIX, PREFIX_SYMBOL, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function base(iri) {
    const tokens = [BASE, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
    const container = new Container(this, tokens);
    return queryDecorator(container, {});
}
function vocab(iri) {
    const iriResolver = new IRIResolver(this._iriResolver, iri);
    const container = new Container(this, null, iriResolver);
    return queryDecorator(container, {});
}
function prefix(name, iri) {
    const iriResolver = new IRIResolver(this._iriResolver);
    const previousIndex = iriResolver._prefixes.has(name) ?
        this._tokens.findIndex(token => token instanceof StringLiteral && token["value"] === name) :
        -1;
    iriResolver._prefixes.set(name, false);
    const tokens = [PREFIX, new StringLiteral(name), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
    const container = new Container(this, tokens, iriResolver);
    if (previousIndex !== -1) {
        container._tokens.splice(previousIndex - 1, 6);
    }
    return queryDecorator(container, {});
}
export function queryDecorator(container, object) {
    return Object.assign(selectDecorator(container, object), {
        base: base.bind(container),
        vocab: vocab.bind(container),
        prefix: prefix.bind(container),
    });
}

//# sourceMappingURL=query.js.map
