"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LiteralToken_1 = require("./../tokens/LiteralToken");
var XSD = require("./XSD");
var StringLiteral_1 = require("../tokens/StringLiteral");
var tokens_1 = require("../patterns/tokens");
var PatternBuilder_1 = require("../patterns/PatternBuilder");
function serialize(object) {
    if (typeof object === "string" || object instanceof String) {
        if (object === PatternBuilder_1.PatternBuilder.undefined)
            return [tokens_1.UNDEF];
        return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(object), tokens_1.CLOSE_QUOTE];
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
    return [tokens_1.OPEN_QUOTE, new StringLiteral_1.StringLiteral(value), tokens_1.CLOSE_QUOTE, tokens_1.OFF_TYPE, tokens_1.OPEN_IRI, new StringLiteral_1.StringLiteral(type), tokens_1.CLOSE_IRI];
}
exports.addType = addType;
function convertValue(value) {
    if (value instanceof Date)
        return new LiteralToken_1.LiteralToken(value.toISOString())
            .setType(XSD.dateTime);
    if (typeof value === "object")
        return "UNDEF";
    if (typeof value === "string") {
        if (value === "UNDEF")
            return value;
        return new LiteralToken_1.LiteralToken(value);
    }
    return new LiteralToken_1.LiteralToken(value);
}
exports.convertValue = convertValue;

//# sourceMappingURL=ObjectPattern.js.map
