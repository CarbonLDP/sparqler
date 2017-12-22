"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../patterns/tokens");
var tokens_2 = require("../tokens");
var utils_1 = require("./utils");
var IRIResolver = (function () {
    function IRIResolver(base, vocab) {
        var _newTarget = this.constructor;
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (_newTarget === IRIResolver)
            Object.freeze(this);
    }
    IRIResolver.prototype.resolve = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (utils_1.isPrefixed(relativeIRI)) {
            var _a = utils_1.getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
            var used = this._prefixes.get(prefix);
            if (used === void 0)
                throw new Error("The used prefix has not been declared");
            tokens = [new tokens_2.StringLiteral(prefix), tokens_1.PREFIX_SYMBOL, new tokens_2.StringLiteral(prefixIRI)];
            if (!used)
                this._prefixes.set(prefix, true);
        }
        else {
            tokens = utils_1.resolve(relativeIRI, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return IRIResolver;
}());
exports.IRIResolver = IRIResolver;

//# sourceMappingURL=IRIResolver.js.map
