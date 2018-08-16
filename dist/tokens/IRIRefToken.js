"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIRefToken = (function () {
    function IRIRefToken(value) {
        this.token = "iri";
        this.value = value;
    }
    IRIRefToken.prototype.toString = function (spaces) {
        return "<" + this.value + ">";
    };
    return IRIRefToken;
}());
exports.IRIRefToken = IRIRefToken;

//# sourceMappingURL=IRIRefToken.js.map
