import { getPrefixedParts, isPrefixed, resolve, } from "./utils";
import { PREFIX_SYMBOL } from "./../patterns/tokens";
import { StringLiteral, } from "./../tokens";
export class IRIResolver {
    constructor(base, vocab) {
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (new.target === IRIResolver)
            Object.freeze(this);
    }
    resolve(relativeIRI, vocab = false) {
        let tokens;
        if (isPrefixed(relativeIRI)) {
            const [prefix, prefixIRI] = getPrefixedParts(relativeIRI);
            const used = this._prefixes.get(prefix);
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
    }
}

//# sourceMappingURL=IRIResolver.js.map
