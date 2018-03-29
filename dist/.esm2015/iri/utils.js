import { StringLiteral } from "../tokens/StringLiteral";
import { OPEN_IRI, CLOSE_IRI, } from "../patterns/tokens";
export function isAbsolute(iri) {
    return iri.indexOf(":") !== -1;
}
export function hasProtocol(iri) {
    return iri.indexOf("://") !== -1;
}
export function isRelative(iri) {
    return !isAbsolute(iri);
}
export function isIRI(iri) {
    return hasProtocol(iri) || !isAbsolute(iri);
}
const bNodeRegex = /^_:/;
export function isBNodeLabel(label) {
    return bNodeRegex.test(label);
}
const prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
const softPrefixRegex = /^(?!_:)[^]*?:/;
const prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
export function isPrefixed(iri) {
    return softPrefixRegex.test(iri) && !hasProtocol(iri);
}
export function getPrefixedParts(iri) {
    let parts = prefixRegex.exec(iri);
    if (parts === null || hasProtocol(iri))
        return null;
    let prefix = parts[1] || "";
    let local = iri.substr(prefix.length + 1).replace(prefixNormalizeRegex, "\\$1");
    return [
        prefix,
        local,
    ];
}
export function resolve(iri, vocab) {
    let tokens = [new StringLiteral(iri)];
    if (isIRI(iri)) {
        if (isRelative(iri) && vocab)
            iri = vocab + iri;
        tokens = [OPEN_IRI, new StringLiteral(iri), CLOSE_IRI];
    }
    return tokens;
}

//# sourceMappingURL=utils.js.map
