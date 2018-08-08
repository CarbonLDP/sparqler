"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var MinusPatternToken = (function () {
    function MinusPatternToken() {
        this.token = "minusPattern";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    MinusPatternToken.prototype.toString = function (spaces) {
        return "MINUS " + this.groupPattern.toString(spaces);
    };
    return MinusPatternToken;
}());
exports.MinusPatternToken = MinusPatternToken;

//# sourceMappingURL=MinusPatternToken.js.map
