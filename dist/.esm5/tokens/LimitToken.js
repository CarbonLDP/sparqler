var LimitToken = (function () {
    function LimitToken(value) {
        this.token = "limit";
        this.value = value;
    }
    LimitToken.prototype.toString = function () {
        return "LIMIT " + this.value;
    };
    return LimitToken;
}());
export { LimitToken };

//# sourceMappingURL=LimitToken.js.map
