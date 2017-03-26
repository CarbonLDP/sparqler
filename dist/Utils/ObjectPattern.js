"use strict";
var XSD = require("./XSD");
var StringLiteral_1 = require("../Tokens/StringLiteral");
var Tokens_1 = require("../Patterns/Tokens");
var PatternBuilder_1 = require("../PatternBuilder");
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [Tokens_1.UNDEF];
        return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), Tokens_1.CLOSE_QUOTE];
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
exports.serialize = serialize;
function addType(value, type) {
    if (type in XSD)
        type = XSD[type];
    return [Tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), Tokens_1.CLOSE_QUOTE, Tokens_1.OFF_TYPE, Tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), Tokens_1.CLOSE_IRI];
}
exports.addType = addType;

//# sourceMappingURL=ObjectPattern.js.map
