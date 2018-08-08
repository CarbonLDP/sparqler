"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderToken = (function () {
    function OrderToken(condition, flow) {
        this.token = "order";
        this.condition = condition;
        if (flow)
            this.flow = flow;
    }
    OrderToken.prototype.toString = function (spaces) {
        return "ORDER BY " + (this.flow ?
            this.flow + "( " + this.condition + " )" :
            "" + this.condition);
    };
    return OrderToken;
}());
exports.OrderToken = OrderToken;

//# sourceMappingURL=OrderToken.js.map
