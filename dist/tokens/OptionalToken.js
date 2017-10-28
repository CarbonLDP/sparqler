"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionalToken = (function () {
    function OptionalToken() {
        this.token = "optional";
        this.patterns = [];
    }
    OptionalToken.prototype.addPattern = function () {
        var pattern = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pattern[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, pattern);
        return this;
        var _a;
    };
    OptionalToken.prototype.toString = function () {
        return "OPTIONAL { " + this.patterns.join(". ") + " }";
    };
    return OptionalToken;
}());
exports.OptionalToken = OptionalToken;

//# sourceMappingURL=OptionalToken.js.map
