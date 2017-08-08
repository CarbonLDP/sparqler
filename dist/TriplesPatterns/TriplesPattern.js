"use strict";
var ObjectPattern = require("../Utils/ObjectPattern");
var Tokens_1 = require("../Patterns/Tokens");
var Operator_1 = require("../Tokens/Operator");
var StringLiteral_1 = require("../Tokens/StringLiteral");
var RightSymbol_1 = require("../Tokens/RightSymbol");
var LeftSymbol_1 = require("../Tokens/LeftSymbol");
var TriplesPattern = (function () {
    function TriplesPattern(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    TriplesPattern.prototype.has = function (property, objects) {
        this.patternTokens = [];
        return this._addPattern(property, objects);
    };
    TriplesPattern.prototype.getSelfTokens = function () {
        return this.elementTokens;
    };
    TriplesPattern.prototype.init = function () {
        var _this = this;
        this.interfaces = {
            addPattern: {
                and: function (property, objects) {
                    _this.patternTokens.push(Tokens_1.SAME_SUBJECT_SEPARATOR);
                    return _this._addPattern(property, objects);
                },
            },
        };
    };
    ;
    TriplesPattern.prototype._addPattern = function (property, objects) {
        var tokens = (typeof property === "string")
            ? this._resolvePath(property)
            : property.getSelfTokens();
        objects = Array.isArray(objects) ? objects : [objects];
        objects.forEach(function (value, index, array) {
            tokens.push.apply(tokens, ObjectPattern.serialize(value));
            if (index < array.length - 1)
                tokens.push(Tokens_1.SAME_PROPERTY_SEPARATOR);
        });
        (_a = this.patternTokens).push.apply(_a, tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
        var _a;
    };
    TriplesPattern.prototype._resolvePath = function (propertyPath) {
        var _this = this;
        var tokens = propertyPath
            .split(/(<.*?>)/).reduce(function (array, part) {
            if (part.startsWith("<")) {
                array.push(part);
            }
            else {
                array.push.apply(array, part.split(/([|/^?*+!()])/));
            }
            return array;
        }, [])
            .reduce(function (array, part) {
            if (!part)
                return array;
            if (TriplesPattern.PATH_OPERATORS.indexOf(part) !== -1) {
                array.push(new Operator_1.Operator(part));
            }
            else if (part === "a") {
                array.push(new StringLiteral_1.StringLiteral(part));
            }
            else {
                if (part.startsWith("<") && part.endsWith(">"))
                    part = part.slice(1, -1);
                array.push.apply(array, _this.resolver._resolveIRI(part, true));
            }
            return array;
        }, []);
        if (tokens[0] instanceof Operator_1.Operator)
            tokens.unshift(new LeftSymbol_1.LeftSymbol(""));
        if (tokens[tokens.length - 1] instanceof Operator_1.Operator)
            tokens.push(new RightSymbol_1.RightSymbol(""));
        return tokens;
    };
    return TriplesPattern;
}());
TriplesPattern.PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
exports.TriplesPattern = TriplesPattern;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map
