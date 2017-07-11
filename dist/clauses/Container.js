"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finish_1 = require("sparqler/clauses/decorators/finish");
var tokens_1 = require("sparqler/patterns/tokens");
var StringLiteral_1 = require("sparqler/tokens/StringLiteral");
var IRI_1 = require("sparqler/utils/IRI");
function genericDecorator(properties, base, object) {
    for (var _i = 0, _a = Object.keys(properties); _i < _a.length; _i++) {
        var key = _a[_i];
        properties[key] = properties[key].bind(base);
    }
    return Object.assign(object, properties);
}
exports.genericDecorator = genericDecorator;
var Resolver = (function () {
    function Resolver(base, vocab) {
        var _newTarget = this.constructor;
        this._prefixes = base
            ? new Map(base._prefixes.entries())
            : new Map();
        this._vocab = vocab ? vocab : base ? base._vocab : void 0;
        if (_newTarget === Resolver)
            Object.freeze(this);
    }
    Resolver.prototype._resolveIRI = function (relativeIRI, vocab) {
        if (vocab === void 0) { vocab = false; }
        var tokens;
        if (IRI_1.isPrefixed(relativeIRI)) {
            var _a = IRI_1.getPrefixedParts(relativeIRI), prefix = _a[0], prefixIRI = _a[1];
            var used = this._prefixes.get(prefix);
            if (used === void 0)
                throw new Error("IllegalArgumentError: The used prefix has not been declared");
            tokens = [new StringLiteral_1.StringLiteral(prefix), tokens_1.PREFIX_SYMBOL, new StringLiteral_1.StringLiteral(prefixIRI)];
            if (!used)
                this._prefixes.set(prefix, true);
        }
        else {
            tokens = IRI_1.resolve(relativeIRI, vocab ? this._vocab : void 0);
        }
        return tokens;
    };
    return Resolver;
}());
exports.Resolver = Resolver;
var Container = (function () {
    function Container(previousContainerOrFinishDecorator, newTokens, iriResolver) {
        var _newTarget = this.constructor;
        var container = previousContainerOrFinishDecorator instanceof Function
            ? void 0
            : previousContainerOrFinishDecorator;
        var finishDecorator = previousContainerOrFinishDecorator instanceof Function
            ? previousContainerOrFinishDecorator
            : finish_1.finishDecorator;
        this._iriResolver = iriResolver
            ? iriResolver : container
            ? new Resolver(container._iriResolver)
            : new Resolver();
        var previousTokens = container ? container._tokens : [];
        this._tokens = newTokens
            ? previousTokens.concat(newTokens)
            : previousTokens;
        this._finishDecorator = container
            ? container._finishDecorator
            : finishDecorator;
        if (_newTarget === Container)
            Object.freeze(this);
    }
    return Container;
}());
exports.Container = Container;
exports.default = Container;

//# sourceMappingURL=Container.js.map
