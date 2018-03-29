import * as XSD from "./XSD";
import { StringLiteral } from "../tokens/StringLiteral";
import { OPEN_QUOTE, CLOSE_QUOTE, CLOSE_IRI, OPEN_IRI, OFF_TYPE, UNDEF } from "../patterns/tokens";
import { PatternBuilder } from "../patterns/PatternBuilder";
export function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder.undefined)
            return [UNDEF];
        return [OPEN_QUOTE, new StringLiteral(object), CLOSE_QUOTE];
    }
    if (typeof object === "number" || object instanceof Number) {
        if (Number.isInteger(object.valueOf()))
            return this.addType(object + "", "integer");
        return this.addType(object + "", "float");
    }
    if (typeof object === "boolean" || object instanceof Boolean)
        return this.addType(object + "", "boolean");
    if (object instanceof Date)
        return this.addType(object.toISOString(), "dateTime");
    return object.getSelfTokens();
}
export function addType(value, type) {
    if (type in XSD)
        type = XSD[type];
    return [OPEN_QUOTE, new StringLiteral(value), CLOSE_QUOTE, OFF_TYPE, OPEN_IRI, new StringLiteral(type), CLOSE_IRI];
}

//# sourceMappingURL=ObjectPattern.js.map
