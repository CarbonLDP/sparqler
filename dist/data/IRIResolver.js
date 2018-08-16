"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../iri/utils");
var IRIRefToken_1 = require("../tokens/IRIRefToken");
var PrefixedNameToken_1 = require("../tokens/PrefixedNameToken");
var IRIResolver = (function () {
    function IRIResolver(base, vocab) {
        var _newTarget = this.constructor;
        this.prefixes = base
            ? new Map(base.prefixes.entries())
            : new Map();
        this.vocab = vocab
            ? vocab
            : base && base.vocab;
        if (_newTarget === IRIResolver)
            Object.freeze(this);
    }
    IRIResolver.prototype.resolve = function (relativeIRI, vocab) {
        if (utils_1.isPrefixed(relativeIRI))
            return this.resolvePrefixed(relativeIRI);
        return this.resolveIRIRef(relativeIRI, vocab);
    };
    IRIResolver.prototype.resolveIRIRef = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        if (vocab && this.vocab && utils_1.isRelative(relativeIRI))
            relativeIRI = this.vocab + relativeIRI;
        return new IRIRefToken_1.IRIRefToken(relativeIRI);
    };
    IRIResolver.prototype.resolvePrefixed = function (prefixedName) {
        var token = new PrefixedNameToken_1.PrefixedNameToken(prefixedName);
        var used = this.prefixes.get(token.namespace);
        if (used === void 0)
            throw new Error("The prefix \"" + token.namespace + "\" has not been declared.");
        if (!used)
            this.prefixes.set(token.namespace, true);
        return token;
    };
    return IRIResolver;
}());
exports.IRIResolver = IRIResolver;

//# sourceMappingURL=IRIResolver.js.map
