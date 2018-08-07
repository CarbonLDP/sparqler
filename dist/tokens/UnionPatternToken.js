"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnionPatternToken = (function () {
    function UnionPatternToken() {
        this.token = "unionPattern";
        this.groupPatterns = [];
    }
    UnionPatternToken.prototype.toString = function () {
        return this
            .groupPatterns
            .join("UNION ");
    };
    return UnionPatternToken;
}());
exports.UnionPatternToken = UnionPatternToken;

//# sourceMappingURL=UnionPatternToken.js.map
