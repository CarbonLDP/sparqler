"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupToken = (function () {
    function GroupToken(rawCondition) {
        this.token = "group";
        this.rawCondition = rawCondition;
    }
    GroupToken.prototype.toString = function () {
        return "GROUP BY " + this.rawCondition;
    };
    return GroupToken;
}());
exports.GroupToken = GroupToken;

//# sourceMappingURL=GroupToken.js.map
