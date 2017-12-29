"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.LimitToken = LimitToken;

//# sourceMappingURL=LimitToken.js.map
