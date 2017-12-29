"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
function isLanguageTag(tag) {
    return LANGUAGE_REGEX.test(tag);
}
exports.isLanguageTag = isLanguageTag;
var LanguageToken = (function () {
    function LanguageToken(tag) {
        this.token = "language";
        if (!isLanguageTag(tag))
            throw new Error("Invalid language tag.");
        this.tag = tag;
    }
    LanguageToken.prototype.toString = function () {
        return "@" + this.tag;
    };
    return LanguageToken;
}());
exports.LanguageToken = LanguageToken;

//# sourceMappingURL=LanguageToken.js.map
