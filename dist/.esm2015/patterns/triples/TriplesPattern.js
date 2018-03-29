import { SAME_PROPERTY_SEPARATOR, SAME_SUBJECT_SEPARATOR, } from "./../tokens";
import { LeftSymbol, Operator, RightSymbol, StringLiteral, } from "./../../tokens";
import { serialize } from "./../../utils/ObjectPattern";
export class TriplesPattern {
    constructor(resolver) {
        this.resolver = resolver;
        this.patternTokens = [];
        this.init();
    }
    has(property, objects) {
        this.patternTokens = [];
        return this._addPattern(property, objects);
    }
    getSelfTokens() {
        return this.elementTokens;
    }
    init() {
        this.interfaces = {
            addPattern: {
                and: (property, objects) => {
                    this.patternTokens.push(SAME_SUBJECT_SEPARATOR);
                    return this._addPattern(property, objects);
                },
            },
        };
    }
    ;
    _addPattern(property, objects) {
        let tokens = (typeof property === "string")
            ? this._resolvePath(property)
            : property.getSelfTokens();
        objects = Array.isArray(objects) ? objects : [objects];
        objects.forEach((value, index, array) => {
            tokens.push(...serialize(value));
            if (index < array.length - 1)
                tokens.push(SAME_PROPERTY_SEPARATOR);
        });
        this.patternTokens.push(...tokens);
        return Object.assign({}, this.interfaces.addPattern, this.interfaces.graphPattern);
    }
    _resolvePath(propertyPath) {
        const tokens = propertyPath
            .split(/(<.*?>)/).reduce((array, part) => {
            if (part.startsWith("<")) {
                array.push(part);
            }
            else {
                array.push(...part.split(/([|/^?*+!()])/));
            }
            return array;
        }, [])
            .reduce((array, part) => {
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
                array.push(...this.resolver.resolve(part, true));
            }
            return array;
        }, []);
        if (tokens[0] instanceof Operator)
            tokens.unshift(new LeftSymbol(""));
        if (tokens[tokens.length - 1] instanceof Operator)
            tokens.push(new RightSymbol(""));
        return tokens;
    }
}
TriplesPattern.PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
export default TriplesPattern;

//# sourceMappingURL=TriplesPattern.js.map
