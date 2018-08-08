"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupPatternToken_1 = require("./GroupPatternToken");
var OptionalToken = (function () {
    function OptionalToken() {
        this.token = "optional";
        this.groupPattern = new GroupPatternToken_1.GroupPatternToken();
    }
    OptionalToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        var _a;
        (_a = this.groupPattern.patterns).push.apply(_a, pattern);
        return this;
    };
    OptionalToken.prototype.toString = function (spaces) {
        return "OPTIONAL " + this.groupPattern.toString(spaces);
    };
    return OptionalToken;
}());
exports.OptionalToken = OptionalToken;

//# sourceMappingURL=OptionalToken.js.map
