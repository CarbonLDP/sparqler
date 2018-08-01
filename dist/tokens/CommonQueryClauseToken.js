"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WhereToken_1 = require("./WhereToken");
var CommonQueryClauseToken = (function () {
    function CommonQueryClauseToken() {
        this.where = new WhereToken_1.WhereToken();
        this.modifiers = [];
    }
    CommonQueryClauseToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this.where.groupPattern.patterns).push.apply(_a, patterns);
        return this;
    };
    CommonQueryClauseToken.prototype.addModifier = function () {
        var modifier = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifier[_i] = arguments[_i];
        }
        var _a;
        (_a = this.modifiers).push.apply(_a, modifier);
        return this;
    };
    return CommonQueryClauseToken;
}());
exports.CommonQueryClauseToken = CommonQueryClauseToken;

//# sourceMappingURL=CommonQueryClauseToken.js.map
