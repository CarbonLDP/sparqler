"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var WhereToken = (function () {
    function WhereToken() {
        this.token = "where";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    WhereToken.prototype.toString = function (spaces) {
        var identifier = spaces === void 0 ? "" : "WHERE ";
        return identifier + this.groupPattern.toString(spaces);
    };
    return WhereToken;
}());
exports.WhereToken = WhereToken;

//# sourceMappingURL=WhereToken.js.map
