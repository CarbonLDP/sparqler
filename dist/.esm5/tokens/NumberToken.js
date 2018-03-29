var NumberToken = (function () {
    function NumberToken(value) {
        this.token = "number";
        this.value = value;
    }
    NumberToken.prototype.toString = function () {
        return "" + this.value;
    };
    return NumberToken;
}());
export { NumberToken };

//# sourceMappingURL=NumberToken.js.map
