"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken = (function () {
    function GroupPatternToken() {
        this.token = "groupPattern";
        this.patterns = [];
    }
    GroupPatternToken.prototype.toString = function () {
        return "{ " + this.patterns.join(". ") + " }";
    };
    return GroupPatternToken;
}());
exports.GroupPatternToken = GroupPatternToken;

//# sourceMappingURL=GroupPatternToken.js.map
