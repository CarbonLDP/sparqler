"use strict";
var Tokens_1 = require("../Patterns/Tokens");
var Identifier_1 = require("../Tokens/Identifier");
var NewLineSymbol_1 = require("../Tokens/NewLineSymbol");
function getBlockTokens(patterns) {
    var tokens = this.getTokens(patterns);
    var openToken = Tokens_1.OPEN_SINGLE_BLOCK;
    var closeToken = Tokens_1.CLOSE_SINGLE_BLOCK;
    if (this.isMultiLine(tokens)) {
        openToken = Tokens_1.OPEN_MULTI_BLOCK;
        closeToken = Tokens_1.CLOSE_MULTI_BLOCK;
    }
    return [openToken].concat(tokens, [closeToken]);
}
exports.getBlockTokens = getBlockTokens;
function getTokens(patterns) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    var triplesTokens = [];
    var lastToken = void 0;
    patterns.forEach(function (graphPattern, index) {
        var tokens = graphPattern.getPattern();
        if (lastToken === Tokens_1.TRIPLE_SEPARATOR && (tokens[0] instanceof Identifier_1.Identifier || tokens[0] === Tokens_1.OPEN_MULTI_BLOCK || tokens[0] === Tokens_1.OPEN_SINGLE_BLOCK))
            triplesTokens.pop();
        triplesTokens.push.apply(triplesTokens, tokens);
        lastToken = tokens[tokens.length - 1];
        if (index < patterns.length - 1 && lastToken !== Tokens_1.CLOSE_MULTI_BLOCK && lastToken !== Tokens_1.CLOSE_SINGLE_BLOCK) {
            triplesTokens.push(lastToken = Tokens_1.TRIPLE_SEPARATOR);
        }
    });
    return triplesTokens;
}
exports.getTokens = getTokens;
function isMultiLine(tokens) {
    return tokens.find(function (token) { return token instanceof NewLineSymbol_1.NewLineSymbol && [".", ";", ",", ""].indexOf(token["value"]) !== -1; }) !== void 0;
}
exports.isMultiLine = isMultiLine;

//# sourceMappingURL=Patterns.js.map
