"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../patterns/tokens");
var tokens_2 = require("../tokens");
function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = tokens_1.CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = tokens_1.OPEN_MULTI_BLOCK;
        closeToken = tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    var patternArray = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patternArray.forEach(function (graphPattern, index, array) {
        var tokens = graphPattern.getPattern();
        if (lastToken === tokens_1.GRAPH_PATTERN_SEPARATOR && (tokens[0] instanceof tokens_2.Identifier || tokens[0] === tokens_1.OPEN_MULTI_BLOCK || tokens[0] === tokens_1.OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < array.length - 1 && lastToken !== tokens_1.CLOSE_MULTI_BLOCK && lastToken !== tokens_1.CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = tokens_1.GRAPH_PATTERN_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof tokens_2.NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;

//# sourceMappingURL=Patterns.js.map
