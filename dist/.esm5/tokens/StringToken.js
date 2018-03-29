var StringToken = (function () {
    function StringToken(value) {
        this.token = "string";
        this.value = value;
    }
    StringToken.prototype.toString = function () {
        return "\"" + this.value + "\"";
    };
    return StringToken;
}());
export { StringToken };

//# sourceMappingURL=StringToken.js.map
