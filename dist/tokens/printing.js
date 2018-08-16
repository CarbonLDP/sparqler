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
    if (spaces === void 0)
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
function getTokenContainerString(_a) {
    var spaces = _a.spaces, tags = _a.tags, tokensSeparator = _a.tokensSeparator, tokens = _a.tokens;
    if (!tokens.length)
        return tags.open + tags.close;
    var generalSeparator = getSeparator(spaces);
    var tokensSpaces = addSpaces(spaces, exports.INDENTATION_SPACES);
    var strArrayTokens = tokens.map(function (token, index, array) {
        var strToken = token.toString(tokensSpaces);
        if (!tokensSeparator || index === array.length - 1)
            return strToken;
        if (tokensSeparator === "." && token.token !== "subject")
            return strToken;
        return strToken + tokensSeparator;
    });
    if (strArrayTokens.length === 1 && !strArrayTokens[0].includes("\n"))
        return tags.open + " " + strArrayTokens + " " + tags.close;
    var tokensIndent = getIndentation(tokensSpaces);
    var strTokens = strArrayTokens
        .map(function (x) { return tokensIndent + x; })
        .join(generalSeparator);
    var indent = getIndentation(spaces);
    return tags.open +
        generalSeparator + strTokens + generalSeparator +
        indent + tags.close;
}
exports.getTokenContainerString = getTokenContainerString;

//# sourceMappingURL=printing.js.map
