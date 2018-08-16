"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
var LanguageToken = (function () {
    function LanguageToken(tag) {
        this.token = "language";
        if (!LANGUAGE_REGEX.test(tag))
            throw new Error("\"" + tag + "\" is an invalid language tag.");
        this.tag = tag;
    }
    LanguageToken.prototype.toString = function (spaces) {
        return "@" + this.tag;
    };
    return LanguageToken;
}());
exports.LanguageToken = LanguageToken;

//# sourceMappingURL=LanguageToken.js.map
