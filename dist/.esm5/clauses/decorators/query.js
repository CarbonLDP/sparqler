import { Container } from "./../Container";
import { selectDecorator } from "./";
import { IRIResolver } from "./../../iri/IRIResolver";
import { BASE, CLOSE_IRI, OPEN_IRI, PREFIX, PREFIX_SYMBOL, } from "./../../patterns/tokens";
import { StringLiteral, } from "./../../tokens";
function base(iri) {
    var tokens = [BASE, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
    var container = new Container(this, tokens);
    return queryDecorator(container, {});
}
function vocab(iri) {
    var iriResolver = new IRIResolver(this._iriResolver, iri);
    var container = new Container(this, null, iriResolver);
    return queryDecorator(container, {});
}
function prefix(name, iri) {
    var iriResolver = new IRIResolver(this._iriResolver);
    var previousIndex = iriResolver._prefixes.has(name) ?
        this._tokens.findIndex(function (token) { return token instanceof StringLiteral && token["value"] === name; }) :
        -1;
    iriResolver._prefixes.set(name, false);
    var tokens = [PREFIX, new StringLiteral(name), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
    var container = new Container(this, tokens, iriResolver);
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
