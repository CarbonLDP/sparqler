"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BooleanToken = (function () {
    function BooleanToken(value) {
        this.token = "boolean";
        this.value = value;
    }
    BooleanToken.prototype.toString = function () {
        return "" + this.value;
    };
    return BooleanToken;
}());
exports.BooleanToken = BooleanToken;

//# sourceMappingURL=BooleanToken.js.map
