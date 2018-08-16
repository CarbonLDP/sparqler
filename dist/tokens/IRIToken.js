"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../iri/utils");
var IRIRefToken_1 = require("./IRIRefToken");
var PrefixedNameToken_1 = require("./PrefixedNameToken");
function getIRIToken(iri) {
    if (utils_1.isPrefixed(iri))
        return new PrefixedNameToken_1.PrefixedNameToken(iri);
    return new IRIRefToken_1.IRIRefToken(iri);
}
exports.getIRIToken = getIRIToken;

//# sourceMappingURL=IRIToken.js.map
