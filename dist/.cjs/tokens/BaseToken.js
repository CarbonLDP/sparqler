"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseToken = (function () {
    function BaseToken(iri) {
        this.token = "base";
        this.iri = iri;
    }
    BaseToken.prototype.toString = function () {
        return "BASE " + this.iri;
    };
    return BaseToken;
}());
exports.BaseToken = BaseToken;

//# sourceMappingURL=BaseToken.js.map
