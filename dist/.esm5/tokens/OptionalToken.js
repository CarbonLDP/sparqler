import { joinPatterns } from "./utils";
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
        return "OPTIONAL { " + joinPatterns(this.patterns) + " }";
    };
    return OptionalToken;
}());
export { OptionalToken };

//# sourceMappingURL=OptionalToken.js.map
