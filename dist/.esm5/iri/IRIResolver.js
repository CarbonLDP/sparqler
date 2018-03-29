import { getPrefixedParts, isPrefixed, resolve, } from "./utils";
import { PREFIX_SYMBOL } from "./../patterns/tokens";
import { StringLiteral, } from "./../tokens";
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
        if (isPrefixed(relativeIRI)) {
            var _a = getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
            var used = this._prefixes.get(prefix);
            if (used === void 0)
                throw new Error("The used prefix has not been declared");
            tokens = [new StringLiteral(prefix), PREFIX_SYMBOL, new StringLiteral(prefixIRI)];
            if (!used)
                this._prefixes.set(prefix, true);
        }
        else {
            tokens = resolve(relativeIRI, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return IRIResolver;
}());
export { IRIResolver };

//# sourceMappingURL=IRIResolver.js.map
