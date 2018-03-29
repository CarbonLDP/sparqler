import { Container } from "./../Container";
import { whereDecorator } from "./";
import { IRIResolver } from "./../../iri/IRIResolver";
import { FROM, NAMED, } from "./../../patterns/tokens";
function _from(self, tokens, iri) {
    var iriResolver = new IRIResolver(self._iriResolver);
    tokens.push.apply(tokens, iriResolver.resolve(iri));
    var container = new Container(self, tokens, iriResolver);
    return fromDecorator(container, {});
}
function from(iri) {
    return _from(this, [FROM], iri);
}
function fromNamed(iri) {
    return _from(this, [FROM, NAMED], iri);
}
export function fromDecorator(container, object) {
    return Object.assign(whereDecorator(container, object), {
        from: from.bind(container),
        fromNamed: fromNamed.bind(container),
    });
}

//# sourceMappingURL=from.js.map
