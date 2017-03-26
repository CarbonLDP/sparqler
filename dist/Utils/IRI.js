"use strict";
var StringLiteral_1 = require("../Tokens/StringLiteral");
var Tokens_1 = require("../Patterns/Tokens");
function isAbsolute(iri) {
    return iri.indexOf(":") !== -1;
}
exports.isAbsolute = isAbsolute;
function hasProtocol(iri) {
    return iri.indexOf("://") !== -1;
}
exports.hasProtocol = hasProtocol;
function isRelative(iri) {
    return !isAbsolute(iri);
}
exports.isRelative = isRelative;
function isIRI(iri) {
    return hasProtocol(iri) || !isAbsolute(iri);
}
exports.isIRI = isIRI;
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return !!iri.match(prefixRegex) && !hasProtocol(iri);
}
exports.isPrefixed = isPrefixed;
function getPrefixedParts(iri) {
    var parts = prefixRegex.exec(iri);
    if (parts === null || hasProtocol(iri))
        return null;
    var prefix = parts[1] || "";
    var local = iri.substr(prefix.length + 1).replace(prefixNormalizeRegex, "\\$1");
    return [
        prefix,
        local,
    ];
}
exports.getPrefixedParts = getPrefixedParts;
function resolve(iri, vocab) {
    var tokens = [new StringLiteral_1.StringLiteral(iri)];
    if (isIRI(iri)) {
        if (isRelative(iri) && vocab)
            iri = vocab + iri;
        tokens = [Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(iri), Tokens_1.CLOSE_IRI];
    }
    return tokens;
}
exports.resolve = resolve;

//# sourceMappingURL=IRI.js.map
