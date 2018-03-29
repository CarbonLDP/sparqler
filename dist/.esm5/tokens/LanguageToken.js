var LANGUAGE_REGEX = /^[a-zA-Z]+(-[a-zA-Z0-9]+)*$/;
export function isLanguageTag(tag) {
    return LANGUAGE_REGEX.test(tag);
}
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
export { LanguageToken };

//# sourceMappingURL=LanguageToken.js.map
