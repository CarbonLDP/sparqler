"use strict";
var ObjectPattern = require("../Utils/ObjectPattern");
var Tokens_1 = require("../Patterns/Tokens");
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (propertyIRIOrVariable, valueOrValues) {
        var _this = this;
        var property = (typeof propertyIRIOrVariable === "string" || propertyIRIOrVariable instanceof String)
            ? this.resolver._resolveIRI(propertyIRIOrVariable, true)
            : propertyIRIOrVariable.getSelfTokens();
        valueOrValues = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
        if (this.patternTokens.length > 0)
            property.unshift(Tokens_1.SAME_SUBJECT_SEPARATOR);
        (_a = this.patternTokens).push.apply(_a, property);
        valueOrValues.forEach(function (value, index) {
            (_a = _this.patternTokens).push.apply(_a, ObjectPattern.serialize(value));
            if (index < valueOrValues.length - 1)
                _this.patternTokens.push(Tokens_1.SAME_PROPERTY_SEPARATOR);
            var _a;
        });
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        this.interfaces = {
            addPattern: {
                and: this.has.bind(this),
            },
        };
    };
    ;
    return TriplesPattern;
}());
exports.TriplesPattern = TriplesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map
