"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringToken = (function () {
    function StringToken(value) {
        this.token = "string";
        this.value = value;
    }
    StringToken.prototype.toString = function () {
        return "\"" + this.value + "\"";
    };
    return StringToken;
}());
exports.StringToken = StringToken;

//# sourceMappingURL=StringToken.js.map
