"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("./../iri");
var BooleanToken_1 = require("./BooleanToken");
var IRIToken_1 = require("./IRIToken");
var LanguageToken_1 = require("./LanguageToken");
var NumberToken_1 = require("./NumberToken");
var PrefixedNameToken_1 = require("./PrefixedNameToken");
var StringToken_1 = require("./StringToken");
var LiteralToken = (function () {
    function LiteralToken(value) {
        this.token = "literal";
        if (value === void 0)
            return;
        this.setValue(value);
    }
    LiteralToken.prototype.setValue = function (value) {
        if (this.value && this.value.value === value)
            return;
        this.value = typeof value === "boolean" ? new BooleanToken_1.BooleanToken(value) :
            typeof value === "number" ? new NumberToken_1.NumberToken(value) :
                new StringToken_1.StringToken(value);
    };
    LiteralToken.prototype.setType = function (type) {
        if (!this.value)
            throw new Error("Must set a value before a type.");
        if (this.value.token !== "string")
            this.value = new StringToken_1.StringToken("" + this.value);
        this.type = typeof type === "string" ? iri_1.isPrefixed(type) ?
            new PrefixedNameToken_1.PrefixedNameToken(type) : new IRIToken_1.IRIToken(type) : type;
    };
    LiteralToken.prototype.setLanguage = function (language) {
        if (!this.value || this.value.token !== "string")
            throw new Error("Non-string value can't have a language.");
        this.type = void 0;
        this.language = new LanguageToken_1.LanguageToken(language);
    };
    LiteralToken.prototype.toString = function () {
        if (this.language)
            return "" + this.value + this.language;
        if (this.type)
            return this.value + "^^" + this.type;
        return "" + this.value;
    };
    return LiteralToken;
}());
exports.LiteralToken = LiteralToken;

//# sourceMappingURL=LiteralToken.js.map
