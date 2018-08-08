"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function (spaces) {
        return "PREFIX " + this.namespace + ": " + this.iri;
    };
    return PrefixToken;
}());
exports.PrefixToken = PrefixToken;

//# sourceMappingURL=PrefixToken.js.map
