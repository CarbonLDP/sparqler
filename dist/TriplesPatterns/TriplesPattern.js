"use strict";
var ObjectPattern = require("../Utils/ObjectPattern");
var Tokens_1 = require("../Patterns/Tokens");
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (property, values) {
        this.patternTokens = [];
        return this._addPattern(property, values);
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: function (property, values) {
                    _this.patternTokens.push(Tokens_1.SAME_SUBJECT_SEPARATOR);
                    return _this._addPattern(property, values);
                },
            },
        };
    };
    ;
    TriplesPattern.prototype._addPattern = function (property, values) {
        var tokens = (typeof property === "string" || property instanceof String)
            ? this.resolver._resolveIRI(property, true)
            : property.getSelfTokens();
        values = Array.isArray(values) ? values : [values];
        values.forEach(function (value, index) {
            tokens.push.apply(tokens, ObjectPattern.serialize(value));
            if (index < values.length - 1)
                tokens.push(Tokens_1.SAME_PROPERTY_SEPARATOR);
        });
        (_a = this.patternTokens).push.apply(_a, tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map
