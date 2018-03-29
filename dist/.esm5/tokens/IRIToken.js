var IRIToken = (function () {
    function IRIToken(value) {
        this.token = "iri";
        this.value = value;
    }
    IRIToken.prototype.toString = function () {
        return "<" + this.value + ">";
    };
    return IRIToken;
}());
export { IRIToken };

//# sourceMappingURL=IRIToken.js.map
