var OrderToken = (function () {
    function OrderToken(condition, flow) {
        this.token = "order";
        this.condition = condition;
        if (flow)
            this.flow = flow;
    }
    OrderToken.prototype.toString = function () {
        return "ORDER BY " + (this.flow ?
            this.flow + "( " + this.condition + " )" :
            "" + this.condition);
    };
    return OrderToken;
}());
export { OrderToken };

//# sourceMappingURL=OrderToken.js.map
