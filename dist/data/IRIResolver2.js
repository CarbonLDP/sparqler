"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../iri/utils");
var IRIToken_1 = require("../tokens/IRIToken");
var PrefixedNameToken_1 = require("../tokens/PrefixedNameToken");
var IRIResolver2 = (function () {
    function IRIResolver2(base, vocab) {
        var _newTarget = this.constructor;
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (_newTarget === IRIResolver2)
            Object.freeze(this);
    }
    IRIResolver2.prototype.resolve = function (relativeIRI, vocab) {
        if (utils_1.isPrefixed(relativeIRI))
            return this.resolvePrefixed(relativeIRI);
        return this.resolveIRI(relativeIRI, vocab);
    };
    IRIResolver2.prototype.resolveIRI = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        if (vocab && this._vocab && utils_1.isRelative(relativeIRI))
            relativeIRI = this._vocab + relativeIRI;
        return new IRIToken_1.IRIToken(relativeIRI);
    };
    IRIResolver2.prototype.resolvePrefixed = function (prefixedName) {
        var token = new PrefixedNameToken_1.PrefixedNameToken(prefixedName);
        var used = this._prefixes.get(token.namespace);
        if (used === void 0)
            throw new Error("The prefix \"" + token.namespace + "\" has not been declared.");
        if (!used)
            this._prefixes.set(token.namespace, true);
        return token;
    };
    return IRIResolver2;
}());
exports.IRIResolver2 = IRIResolver2;

//# sourceMappingURL=IRIResolver2.js.map
