"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INDENTATION_SPACES = 4;
function getSeparator(spaces) {
    if (spaces === void 0)
        return " ";
    return "\n";
}
exports.getSeparator = getSeparator;
function getIndentation(spaces, extra) {
    if (!spaces)
        return "";
    if (extra)
        spaces += extra;
    return " ".repeat(spaces);
}
exports.getIndentation = getIndentation;
function addSpaces(spaces, extra) {
    if (spaces === void 0)
        return spaces;
    return spaces + extra;
}
exports.addSpaces = addSpaces;
function getTokenContainerString(data) {
    if (!data.tokens.length)
        return data.tags.open + data.tags.close;
    var separator = getSeparator(data.spaces);
    var tokensSpaces = addSpaces(data.spaces, exports.INDENTATION_SPACES);
    var tokensSeparator = data.tokensSeparator ? data.tokensSeparator + separator : separator;
    var tokens = data.tokens
        .map(function (tokens) { return tokens.toString(tokensSpaces); });
    if (tokens.length === 1 && !tokens[0].includes("\n"))
        return data.tags.open + " " + tokens[0] + " " + data.tags.close;
    var indent = getIndentation(data.spaces);
    var tokensIndent = getIndentation(tokensSpaces);
    return data.tags.open + separator +
        tokens
            .map(function (x) { return tokensIndent + x; })
            .join(tokensSeparator) + separator +
        indent + data.tags.close;
}
exports.getTokenContainerString = getTokenContainerString;

//# sourceMappingURL=printing.js.map
