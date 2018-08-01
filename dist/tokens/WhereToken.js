"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var WhereToken = (function () {
    function WhereToken() {
        this.token = "where";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    WhereToken.prototype.toString = function () {
        return "WHERE " + this.groupPattern;
    };
    return WhereToken;
}());
exports.WhereToken = WhereToken;

//# sourceMappingURL=WhereToken.js.map
