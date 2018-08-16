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
function isBNodeLabel(label) {
    return /^_:/.test(label);
}
exports.isBNodeLabel = isBNodeLabel;
function isPrefixed(iri) {
    return /^(?!_:)[^]*?:/.test(iri) && !hasProtocol(iri);
}
exports.isPrefixed = isPrefixed;

//# sourceMappingURL=utils.js.map
