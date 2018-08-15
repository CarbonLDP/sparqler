"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var bNodeRegex = /^_:/;
function isBNodeLabel(label) {
    return bNodeRegex.test(label);
}
exports.isBNodeLabel = isBNodeLabel;
var prefixRegex = /([A-Za-z](([A-Za-z_\-0-9]|\.)*[A-Za-z_\-0-9])?)?:/;
var softPrefixRegex = /^(?!_:)[^]*?:/;
var prefixNormalizeRegex = /([_~.\-!$&'|()*+,;=/?#@%])/g;
function isPrefixed(iri) {
    return softPrefixRegex.test(iri) && !hasProtocol(iri);
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

//# sourceMappingURL=utils.js.map
