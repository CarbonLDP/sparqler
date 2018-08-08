"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIToken = (function () {
    function IRIToken(value) {
        this.token = "iri";
        this.value = value;
    }
    IRIToken.prototype.toString = function (spaces) {
        return "<" + this.value + ">";
    };
    return IRIToken;
}());
exports.IRIToken = IRIToken;

//# sourceMappingURL=IRIToken.js.map
