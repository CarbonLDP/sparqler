var BaseToken = (function () {
    function BaseToken(iri) {
        this.token = "base";
        this.iri = iri;
    }
    BaseToken.prototype.toString = function () {
        return "BASE " + this.iri;
    };
    return BaseToken;
}());
export { BaseToken };

//# sourceMappingURL=BaseToken.js.map
