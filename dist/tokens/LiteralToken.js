"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LiteralToken = (function () {
    function LiteralToken(value) {
        this.token = "literal";
        this.value = value;
    }
    LiteralToken.prototype.toString = function (spaces) {
        return JSON.stringify(this.value);
    };
    return LiteralToken;
}());
exports.LiteralToken = LiteralToken;

//# sourceMappingURL=LiteralToken.js.map
