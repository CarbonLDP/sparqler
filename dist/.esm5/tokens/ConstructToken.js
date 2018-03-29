import { joinPatterns } from "./utils";
var ConstructToken = (function () {
    function ConstructToken() {
        this.token = "construct";
        this.triples = [];
        this.patterns = [];
        this.modifiers = [];
    }
    ConstructToken.prototype.addTriple = function () {
        var triple = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triple[_i] = arguments[_i];
        }
        (_a = this.triples).push.apply(_a, triple);
        return this;
        var _a;
    };
    ConstructToken.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    ConstructToken.prototype.addModifier = function () {
        var modifiers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modifiers[_i] = arguments[_i];
        }
        (_a = this.modifiers).push.apply(_a, modifiers);
        return this;
        var _a;
    };
    ConstructToken.prototype.toString = function () {
        var query = "CONSTRUCT { " + this.triples.join(". ") + " } WHERE { " + joinPatterns(this.patterns) + " }";
        if (this.modifiers.length)
            query += " " + this.modifiers.join(" ");
        return query;
    };
    return ConstructToken;
}());
export { ConstructToken };

//# sourceMappingURL=ConstructToken.js.map
