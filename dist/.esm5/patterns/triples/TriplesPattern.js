import { SAME_PROPERTY_SEPARATOR, SAME_SUBJECT_SEPARATOR, } from "./../tokens";
import { LeftSymbol, Operator, RightSymbol, StringLiteral, } from "./../../tokens";
import { serialize } from "./../../utils/ObjectPattern";
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
                    _this.patternTokens.push(SAME_SUBJECT_SEPARATOR);
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
            tokens.push.apply(tokens, serialize(value));
            if (index < array.length - 1)
                tokens.push(SAME_PROPERTY_SEPARATOR);
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
                array.push(new Operator(part));
            }
            else if (part === "a") {
                array.push(new StringLiteral(part));
            }
            else {
                if (part.startsWith("<") && part.endsWith(">"))
                    part = part.slice(1, -1);
                array.push.apply(array, _this.resolver.resolve(part, true));
            }
            return array;
        }, []);
        if (tokens[0] instanceof Operator)
            tokens.unshift(new LeftSymbol(""));
        if (tokens[tokens.length - 1] instanceof Operator)
            tokens.push(new RightSymbol(""));
        return tokens;
    };
    TriplesPattern.PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
    return TriplesPattern;
}());
export { TriplesPattern };
export default TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map
