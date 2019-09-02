"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIToken_1 = require("../tokens/IRIToken");
var LiteralToken_1 = require("../tokens/LiteralToken");
var RDFLiteralToken_1 = require("../tokens/RDFLiteralToken");
var XSD_1 = require("../utils/XSD");
exports._transformNatives = function (value) {
    return value instanceof Date
        ? new RDFLiteralToken_1.RDFLiteralToken(value.toISOString(), IRIToken_1.getIRIToken(XSD_1.XSD.dateTime))
        : new LiteralToken_1.LiteralToken(value);
};
exports._is = function (value, property) {
    return typeof value === "object" && !!value && property in value;
};
exports._getBaseTransformer = function (property) {
    return function (nativeTransformer) {
        return function (value) { return exports._is(value, property)
            ? value[property]()
            : exports._is(value, "token")
                ? value
                : nativeTransformer(value); };
    };
};
