"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionalToken = (function () {
    function OptionalToken() {
        this.token = "optional";
        this.patterns = [];
    }
    OptionalToken.prototype.addPattern = function (pattern) {
        this.patterns.push(pattern);
        return this;
    };
    OptionalToken.prototype.toString = function () {
        return "OPTIONAL { " + this.patterns.join(". ") + " }";
    };
    return OptionalToken;
}());
exports.OptionalToken = OptionalToken;

//# sourceMappingURL=OptionalToken.js.map
