"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
var GroupPatternToken = (function () {
    function GroupPatternToken() {
        this.token = "groupPattern";
        this.patterns = [];
    }
    GroupPatternToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
    };
    GroupPatternToken.prototype.toString = function (spaces) {
        return printing_1.getTokenContainerString({
            spaces: spaces,
            tags: { open: "{", close: "}" },
            tokensSeparator: ".",
            tokens: this.patterns,
        });
    };
    return GroupPatternToken;
}());
exports.GroupPatternToken = GroupPatternToken;

//# sourceMappingURL=GroupPatternToken.js.map
