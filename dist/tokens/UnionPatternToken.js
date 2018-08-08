"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnionPatternToken = (function () {
    function UnionPatternToken() {
        this.token = "unionPattern";
        this.groupPatterns = [];
    }
    UnionPatternToken.prototype.toString = function (spaces) {
        return this
            .groupPatterns
            .map(function (x) { return x.toString(spaces); })
            .join(" UNION ");
    };
    return UnionPatternToken;
}());
exports.UnionPatternToken = UnionPatternToken;

//# sourceMappingURL=UnionPatternToken.js.map
