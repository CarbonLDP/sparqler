"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstructToken = (function () {
    function ConstructToken() {
        this.token = "construct";
        this.triples = [];
        this.patterns = [];
    }
    ConstructToken.prototype.addTriples = function () {
        var triple = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triple[_i] = arguments[_i];
        }
        (_a = this.triples).push.apply(_a, triple);
        return this;
        var _a;
    };
    ConstructToken.prototype.addPatterns = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        (_a = this.patterns).push.apply(_a, patterns);
        return this;
        var _a;
    };
    ConstructToken.prototype.toString = function () {
        return "CONSTRUCT { " + this.triples.join(". ") + " } WHERE { " + this.patterns.join(". ") + " } ";
    };
    return ConstructToken;
}());
exports.ConstructToken = ConstructToken;

//# sourceMappingURL=ConstructToken.js.map
