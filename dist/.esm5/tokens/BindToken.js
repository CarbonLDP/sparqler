var BindToken = (function () {
    function BindToken(expression, variable) {
        this.token = "bind";
        this.expression = expression;
        this.variable = variable;
    }
    BindToken.prototype.toString = function () {
        return "BIND(" + this.expression + " AS " + this.variable + ")";
    };
    return BindToken;
}());
export { BindToken };

//# sourceMappingURL=BindToken.js.map
