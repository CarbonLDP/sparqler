var OffsetToken = (function () {
    function OffsetToken(value) {
        this.token = "offset";
        this.value = value;
    }
    OffsetToken.prototype.toString = function () {
        return "OFFSET " + this.value;
    };
    return OffsetToken;
}());
export { OffsetToken };

//# sourceMappingURL=OffsetToken.js.map
