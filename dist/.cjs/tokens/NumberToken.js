"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.NumberToken = NumberToken;

//# sourceMappingURL=NumberToken.js.map
