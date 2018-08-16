"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIToken_1 = require("../tokens/IRIToken");
var LiteralToken_1 = require("../tokens/LiteralToken");
var RDFLiteralToken_1 = require("../tokens/RDFLiteralToken");
var XSD = require("../utils/XSD");
function convertValue(value) {
    if (value instanceof Date)
        return new RDFLiteralToken_1.RDFLiteralToken(value.toISOString(), IRIToken_1.getIRIToken(XSD.dateTime));
    if (typeof value === "object")
        return value.getSubject();
    if (typeof value === "string") {
        if (value === "UNDEF")
            return value;
        return new LiteralToken_1.LiteralToken(value);
    }
    return new LiteralToken_1.LiteralToken(value);
}
exports.convertValue = convertValue;
var PATH_OPERATORS = ["|", "/", "^", "?", "*", "+", "!", "(", ")"];
function _resolvePath(container, propertyPath) {
    var parsedPath = propertyPath
        .split(/(<.*?>)/)
        .reduce(function (array, part) {
        if (part.startsWith("<")) {
            array.push(part);
        }
        else {
            array.push.apply(array, part.split(/([|/^?*+!()])/));
        }
        return array;
    }, [])
        .map(function (part) {
        if (!part)
            return;
        if (PATH_OPERATORS.indexOf(part) !== -1) {
            return part;
        }
        else if (part === "a") {
            return part;
        }
        else {
            if (part.startsWith("<") && part.endsWith(">"))
                part = part.slice(1, -1);
            return container.iriResolver.resolve(part, true);
        }
    })
        .join("");
    return parsedPath;
}
exports._resolvePath = _resolvePath;

//# sourceMappingURL=utils.js.map
