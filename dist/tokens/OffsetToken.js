"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OffsetToken = (function () {
    function OffsetToken(value) {
        this.token = "offset";
        this.value = value;
    }
    OffsetToken.prototype.toString = function (spaces) {
        return "OFFSET " + this.value;
    };
    return OffsetToken;
}());
exports.OffsetToken = OffsetToken;

//# sourceMappingURL=OffsetToken.js.map
