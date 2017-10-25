"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrefixToken = (function () {
    function PrefixToken(name, iri) {
        this.token = "prefix";
        this.name = name;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function () {
        return "PREFIX " + this.name + ": " + this.iri;
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;

//# sourceMappingURL=PrefixToken.js.map
