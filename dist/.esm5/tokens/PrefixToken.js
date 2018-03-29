var PrefixToken = (function () {
    function PrefixToken(namespace, iri) {
        this.token = "prefix";
        this.namespace = namespace;
        this.iri = iri;
    }
    PrefixToken.prototype.toString = function () {
        return "PREFIX " + this.namespace + ": " + this.iri;
    };
    return PrefixToken;
}());
export { PrefixToken };

//# sourceMappingURL=PrefixToken.js.map
