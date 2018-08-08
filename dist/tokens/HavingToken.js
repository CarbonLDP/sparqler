"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HavingToken = (function () {
    function HavingToken(rawCondition) {
        this.token = "having";
        this.rawCondition = rawCondition;
    }
    HavingToken.prototype.toString = function (spaces) {
        return "HAVING " + this.rawCondition;
    };
    return HavingToken;
}());
exports.HavingToken = HavingToken;

//# sourceMappingURL=HavingToken.js.map
